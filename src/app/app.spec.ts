import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { App } from './app';
import { BLOG_POSTS } from './blog/blog-posts';
import { filterByRange } from './blog/blog-filter';
import { NEWS_ITEMS } from './news/news-items';
import { PRESS_FEATURE } from './home/press';
import { THEME_KEY, ThemeService } from './shared/theme.service';

describe('Scrolling homepage', () => {
  beforeEach(() => TestBed.configureTestingModule({imports:[App], providers:[provideRouter(routes)]}));

  it('opens the blog section from its former URL and reveals the complete archive', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/blogs');
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    expect(router.url).toBe('/#blogs');
    expect(page.querySelector('h1')?.textContent?.trim()).toBeTruthy();

    // Count comes from the blog data, so adding a post does not break this test.
    const total = BLOG_POSTS.length;
    expect(total).toBeGreaterThan(3);
    const posts = () => page.querySelectorAll('#post-grid a');
    const more = page.querySelector<HTMLButtonElement>('.more-posts')!;
    expect(posts().length).toBe(3);
    // Each "Show more" adds a batch (two rows) to the page until every post is shown
    let clicks = 0;
    while (more.getAttribute('aria-expanded') !== 'true' && clicks < 50) {
      const before = posts().length;
      more.click(); clicks++;
      await fixture.whenStable();
      expect(posts().length).toBeGreaterThan(before);
    }
    expect(posts().length).toBe(total);
    expect(page.querySelector('#blogs .blog-count')?.textContent).toContain(`Showing ${total} of ${total}`);
    more.click();
    await fixture.whenStable();
    expect(posts().length).toBe(3);

    // Date filter: "Past month" narrows the list (counted from the data, relative to today);
    // Clear filter brings back the first three.
    const trigger = page.querySelector<HTMLButtonElement>('#blogs .filter-trigger')!;
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    trigger.click();
    await fixture.whenStable();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const month = page.querySelector<HTMLInputElement>('#blogs .filter-panel input[value="month"]')!;
    month.click();
    await fixture.whenStable();
    const recent = filterByRange(BLOG_POSTS, { kind: 'month' });
    expect(posts().length).toBe(Math.min(3, recent.length));
    expect(!!page.querySelector('#blogs .more-posts')).toBe(recent.length > 3);
    expect(page.querySelector('#blogs .filter-result')?.textContent).toContain('Past month');
    expect(trigger.textContent).toContain('Past month');
    page.querySelector<HTMLButtonElement>('#blogs .filter-clear')!.click();
    await fixture.whenStable();
    expect(posts().length).toBe(3);
    expect(page.querySelector('#blogs .filter-result')?.textContent?.trim()).toBe('');
  });

  it('shows the newest news item, blog post and press feature in the hero, and no event strip', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    const rail = page.querySelector('.hero .briefing');
    expect(rail).toBeTruthy();
    const cards = [...rail!.querySelectorAll<HTMLAnchorElement>('a.brief')];
    expect(cards.length).toBe(3);
    const titles = cards.map((c) => c.querySelector('.brief__title')?.textContent?.trim());
    expect(titles).toEqual([NEWS_ITEMS[0].title, BLOG_POSTS[0].title, PRESS_FEATURE.title]);
    expect(cards[1].getAttribute('href')).toBe('/blogs/' + BLOG_POSTS[0].slug);
    expect(cards[2].getAttribute('href')).toBe(PRESS_FEATURE.href);
    expect(cards[2].getAttribute('target')).toBe('_blank');
    // The News section renders the same list the hero reads from
    expect(page.querySelectorAll('#news .flex-col > a').length).toBe(NEWS_ITEMS.length);
    expect(page.querySelector('.event-strip')).toBeNull();
    expect(page.querySelector('app-home')?.textContent).not.toContain('SEMICON India 2026');
  });

  it('keeps "Schedule a demo" on the homepage', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    const cta = [...page.querySelectorAll<HTMLAnchorElement>('.hero a')].find((a) => /schedule a demo/i.test(a.textContent ?? ''));
    expect(cta).toBeTruthy();
    expect(cta!.getAttribute('href')).toMatch(/^mailto:info@careteda\.com/);
  });

  it('has no Demos page: /demos falls back to the homepage and nothing links to it', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const page: HTMLElement = fixture.nativeElement;

    await router.navigateByUrl('/demos');
    await fixture.whenStable();
    expect(router.url).toBe('/');
    expect(page.querySelector('app-home')).toBeTruthy();
    expect(page.querySelector('app-demos')).toBeNull();
    const links = [...page.querySelectorAll<HTMLAnchorElement>('a')];
    expect(links.some((a) => /(^|\/)demos(\/|$|#|\?)/i.test(a.getAttribute('href') ?? ''))).toBe(false);
  });

  it('opens the startup program application in a popup that can be closed without losing input', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    const dialog = page.querySelector<HTMLDialogElement>('#apply-dialog')!;
    expect(dialog).toBeTruthy();
    expect(dialog.hasAttribute('open')).toBe(false);

    const open = [...page.querySelectorAll<HTMLButtonElement>('#startup-program button')].find((b) => /open application/i.test(b.textContent ?? ''))!;
    open.click();
    await fixture.whenStable();
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(dialog.querySelector('#apply-title')?.textContent).toContain('Startup program application');
    const submit = dialog.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    expect(submit.textContent?.replace(/\s+/g, ' ').trim()).toBe('Submit application'); // visible "Submit" + screen-reader " application"
    expect(submit.querySelector('.icon--upload')).toBeTruthy();

    // Submitting empty: an error under each required field, a count in the status line, focus on the first
    dialog.querySelector<HTMLFormElement>('#apply-form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(dialog.querySelector('#sp-name-error')?.textContent).toContain('Enter your name');
    expect(dialog.querySelector('#sp-name')?.getAttribute('aria-invalid')).toBe('true');
    expect(dialog.querySelectorAll('.field__error').length).toBeGreaterThan(5);
    expect(dialog.querySelector('.form__status')?.textContent).toMatch(/fields need your attention/);
    expect(document.activeElement?.id).toBe('sp-name');

    // Typed values survive closing and reopening
    const name = dialog.querySelector<HTMLInputElement>('#sp-name')!;
    name.value = 'Jane Doe';
    dialog.querySelector<HTMLButtonElement>('.apply-close')!.click();
    await new Promise((r) => setTimeout(r, 160));
    await fixture.whenStable();
    expect(dialog.hasAttribute('open')).toBe(false);
    open.click();
    await fixture.whenStable();
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(dialog.querySelector<HTMLInputElement>('#sp-name')!.value).toBe('Jane Doe');

    // Esc closes it too
    dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
    await new Promise((r) => setTimeout(r, 160));
    await fixture.whenStable();
    expect(dialog.hasAttribute('open')).toBe(false);
  });

  it('changes the header direction and return control when scrolling', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    async function scroll(y: number) {
      Object.defineProperty(window, 'scrollY', {configurable:true, value:y});
      window.dispatchEvent(new Event('scroll'));
      await fixture.whenStable();
    }
    await scroll(700);
    expect(page.querySelector('header.away')).toBeTruthy();
    expect(page.querySelector('.to-top')).toBeTruthy();
    await scroll(675);
    expect(page.querySelector('header.away')).toBeNull();
    await scroll(0);
    expect(page.querySelector('.to-top')).toBeNull();
  });

  it('switches between light and dark themes from the nav and remembers the choice', async () => {
    localStorage.removeItem(THEME_KEY);
    document.documentElement.setAttribute('data-theme', 'light');
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const toggle = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.theme-toggle')!;
    expect(toggle.getAttribute('role')).toBe('switch');
    expect(toggle.getAttribute('aria-label')).toBe('Dark theme');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(THEME_KEY)).toBe('dark');
    expect(toggle.getAttribute('aria-checked')).toBe('true');
    toggle.click();
    fixture.detectChanges();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    localStorage.removeItem(THEME_KEY);
  });

  it('starts in the stored theme, ahead of the OS setting', () => {
    localStorage.setItem(THEME_KEY, 'dark');
    document.documentElement.removeAttribute('data-theme');
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    localStorage.removeItem(THEME_KEY);
    document.documentElement.setAttribute('data-theme', 'light');
  });
});
