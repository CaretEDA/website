import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';
export const THEME_KEY = 'careteda-theme';
const THEME_COLORS: Record<Theme, string> = { light: '#f6f7f9', dark: '#07090e' };

/**
 * Light / dark theme. The inline script in index.html sets <html data-theme> before first paint
 * (stored choice, else the OS setting); this service reads that, follows OS changes until the visitor
 * picks a theme, and stores the visitor's pick.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly theme = signal<Theme>('light');

  constructor() {
    if (!this.browser) return;
    const root = document.documentElement;
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    const initial = (root.dataset['theme'] as Theme | undefined) ?? this.stored() ?? (media?.matches ? 'dark' : 'light');
    this.apply(initial);
    media?.addEventListener?.('change', e => { if (!this.stored()) this.apply(e.matches ? 'dark' : 'light'); });
  }

  /**
   * Switch theme. With `from` (the toggle), the new theme grows out of it as a circle until it fills the
   * screen: View Transitions hold a still of the old page, the new theme is applied underneath, and the new
   * snapshot is revealed through an expanding clip-path. Without View Transitions support, or under reduced
   * motion, the switch is instant.
   */
  toggle(from?: Element | null) {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch { /* storage blocked: the switch still works for this visit */ }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || reduce) { this.apply(next); return; }

    // the circle starts at the centre of the toggle (works for mouse, touch and keyboard alike)
    const r = from?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : window.innerWidth / 2;
    const y = r ? r.top + r.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = doc.startViewTransition(() => this.apply(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }, // ease-in-out: the circle visibly grows from the toggle before it sweeps the page
      );
    }).catch(() => { /* transition skipped: the theme is already applied */ });
  }

  private stored(): Theme | null {
    try {
      const v = localStorage.getItem(THEME_KEY);
      return v === 'dark' || v === 'light' ? v : null;
    } catch { return null; }
  }

  private apply(theme: Theme) {
    this.theme.set(theme);
    document.documentElement.dataset['theme'] = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  }
}
