import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { App } from './app';
import { BlogListComponent } from './blog/blog-list.component';

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
    const total = new BlogListComponent().posts.length;
    expect(total).toBeGreaterThan(3);
    const posts = () => page.querySelectorAll('#post-grid a');
    const more = page.querySelector<HTMLButtonElement>('.more-posts')!;
    expect(posts().length).toBe(3);
    more.click();
    await fixture.whenStable();
    expect(posts().length).toBe(total);
    expect(more.getAttribute('aria-expanded')).toBe('true');
    more.click();
    await fixture.whenStable();
    expect(posts().length).toBe(3);
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
});
