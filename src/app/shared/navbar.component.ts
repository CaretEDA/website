import { AfterViewInit, Component, DestroyRef, HostListener, Inject, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
    <a class="skip" href="#main-content">Skip to content</a>
    <header class="mast" [class.away]="hidden() && !menuOpen()">
      <div class="wrap mast-row">
        <a class="brand" routerLink="/" fragment="home" (click)="close()" aria-label="CaretEDA home">
          <img src="assets/careteda-logo-64.png" alt="" width="32" height="32"><span>CaretEDA</span>
        </a>
        <nav class="main-links" aria-label="Primary">
          @for (item of primary; track item.id) {
            <a routerLink="/" [fragment]="item.id" (click)="close()" [attr.aria-current]="active() === item.id ? 'location' : null">
              <span class="caret" aria-hidden="true"></span>{{ item.label }}
            </a>
          }
        </nav>
        <div class="mast-actions">
          <a class="nav-quiet" routerLink="/" fragment="startup-program" (click)="close()">Startup program</a>
          <button #themeSwitch class="theme-toggle" type="button" role="switch" aria-label="Dark theme" title="Dark theme" [attr.aria-checked]="theme.theme() === 'dark'" (click)="theme.toggle(themeSwitch)"><span class="theme-toggle__track" aria-hidden="true"><span class="theme-toggle__thumb"></span></span></button>
          <a class="nav-contact" routerLink="/" fragment="contact" (click)="close()">Contact us</a>
          <button class="menu-toggle" type="button" (click)="menuOpen.set(!menuOpen())" [attr.aria-expanded]="menuOpen()" aria-controls="section-menu" [attr.aria-label]="menuOpen() ? 'Close menu' : 'Open menu'"><span></span><span></span></button>
        </div>
      </div>
      <nav class="menu-panel" id="section-menu" aria-label="All sections" [hidden]="!menuOpen()">
        @for (item of sections; track item.id) {
          <a routerLink="/" [fragment]="item.id" (click)="close()" [attr.aria-current]="active() === item.id ? 'location' : null">{{ item.label }}</a>
        }
      </nav>
    </header>
    @if (showTop()) { <button class="to-top" type="button" aria-label="Back to top" title="Back to top" (click)="top()"><span class="icon icon--top" aria-hidden="true"></span></button> }
  `
})
export class NavbarComponent implements AfterViewInit {
  readonly primary = [
    { id: 'blogs', label: 'Blog' },
    { id: 'news', label: 'News' }, { id: 'team', label: 'Team' }, { id: 'ifaq', label: 'IFAQ' }, { id: 'careers', label: 'Careers' },
    { id: 'about', label: 'About' },
  ];
  readonly sections = [
    { id: 'home', label: 'Home' }, ...this.primary,
    { id: 'startup-program', label: 'Startup program' }, { id: 'contact', label: 'Contact' },
  ];
  readonly hidden = signal(false);
  readonly menuOpen = signal(false);
  readonly showTop = signal(false);
  /** The section currently in the reading band; drives the caret marker. */
  readonly active = signal<string | null>(null);
  private previousY = 0;
  private observer?: IntersectionObserver;
  readonly theme = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) return;
    // A thin band a little above the middle of the viewport: whichever section crosses it is "current".
    this.observer = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
    }, { rootMargin: '-40% 0px -55% 0px' });
    this.observe();
    const sub = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => setTimeout(() => this.observe()));
    this.destroyRef.onDestroy(() => { sub.unsubscribe(); this.observer?.disconnect(); });
  }

  private observe() {
    this.observer?.disconnect();
    this.active.set(null);
    for (const s of this.sections) {
      const el = document.getElementById(s.id);
      if (el) this.observer?.observe(el);
    }
  }

  @HostListener('window:scroll')
  updateScroll() {
    const y = Math.max(0, window.scrollY);
    this.showTop.set(y > 640);
    if (y < 80 || Math.abs(y - this.previousY) >= 4) {
      this.hidden.set(y > 80 && y > this.previousY);
      this.previousY = y;
    }
  }

  @HostListener('document:keydown.escape')
  escape() {
    if (this.menuOpen()) {
      this.close();
      document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
    }
  }
  close() { this.menuOpen.set(false); }
  top() {
    document.getElementById('main-content')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
}
