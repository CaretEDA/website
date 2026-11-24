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

  toggle() {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch { /* storage blocked: the switch still works for this visit */ }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !reduce) doc.startViewTransition(() => this.apply(next));
    else this.apply(next);
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
