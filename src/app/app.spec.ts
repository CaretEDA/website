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

  it('serves Demos as a hidden page: reachable at /demos, not on the homepage or in the menu', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const page: HTMLElement = fixture.nativeElement;

    await router.navigateByUrl('/');
    await fixture.whenStable();
    expect(page.querySelector('app-demos')).toBeNull();
    const links = [...page.querySelectorAll<HTMLAnchorElement>('header a, nav a')];
    expect(links.some((a) => /demos/i.test(a.getAttribute('href') ?? '') || /^\s*demos\s*$/i.test(a.textContent ?? ''))).toBe(false);

    await router.navigateByUrl('/demos');
    await fixture.whenStable();
    expect(router.url).toBe('/demos');
    expect(page.querySelector('app-demos')).toBeTruthy();
    expect(page.querySelector('app-demos h2, app-demos h1')?.textContent).toContain('Demos');
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
