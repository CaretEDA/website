import { Component, DestroyRef, computed, PLATFORM_ID, afterNextRender, inject, input, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Floating ↑/↓ capsule for a long list (blog, news): ↑ jumps to the list's heading, ↓ to its end.
 * It shows only while the reader is browsing the list, i.e. while the list fills the middle band of the
 * screen and has somewhere to go; a direction with nowhere to go is disabled (dimmed) so the shape never jumps.
 * Everything comes from IntersectionObservers, so there is no scroll listener.
 * Render it only while the list is long; it watches the elements it is given from then on.
 */
@Component({
  selector: 'app-list-jump',
  standalone: true,
  host: { class: 'list-jump', role: 'group', '[class.is-on]': 'useful()', '[attr.aria-label]': 'label()' },
  template: `
    <button type="button" class="list-jump__btn list-jump__start" [disabled]="!startAbove()"
            [attr.aria-label]="'Back to the top of the ' + label()" [title]="'Back to the top of the ' + label()" (click)="jump('start')">
      <span class="arrow" aria-hidden="true"></span>
    </button>
    <button type="button" class="list-jump__btn list-jump__end" [disabled]="!endBelow()"
            [attr.aria-label]="'Jump to the end of the ' + label()" [title]="'Jump to the end of the ' + label()" (click)="jump('end')">
      <span class="arrow" aria-hidden="true"></span>
    </button>
  `,
})
export class ListJumpComponent {
  /** The list's heading (↑ target), its items, and the row after them ("Show more", ↓ target). */
  readonly start = input.required<HTMLElement>();
  readonly list = input.required<HTMLElement>();
  readonly end = input.required<HTMLElement>();
  /** "blog list", "news list": read out with each button. */
  readonly label = input.required<string>();

  readonly inView = signal(false);
  readonly startAbove = signal(false);
  readonly endBelow = signal(false);
  /** On screen only when there is somewhere to go: a short list that fits the screen needs no capsule. */
  readonly useful = computed(() => this.inView() && (this.startAbove() || this.endBelow()));

  constructor() {
    const destroyRef = inject(DestroyRef);
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    afterNextRender(() => {
      if (typeof IntersectionObserver !== 'function') return;
      const watch = (el: HTMLElement, rootMargin: string, set: (on: boolean) => void) => {
        const io = new IntersectionObserver(([e]) => set(e.isIntersecting), { rootMargin });
        io.observe(el);
        destroyRef.onDestroy(() => io.disconnect());
      };
      // The heading and the end are watched against the zones above and below the screen (not the screen
      // itself), so a jump straight past the screen (below → above) still reports.
      watch(this.start(), '100000px 0px -100% 0px', on => this.startAbove.set(on));
      watch(this.end(), '-100% 0px 100000px 0px', on => this.endBelow.set(on));
      // "Browsing" = the items cross the middle 20% of the screen. A last row under the fixed nav, or the
      // first row peeking in at the bottom, does not count, so the capsule leaves when the next section takes over.
      watch(this.list(), '-40% 0px -40% 0px', on => this.inView.set(on));
    });
  }

  /** ↑ to the heading (below the nav); ↓ to the end of the list, with "Show more" in view. */
  jump(to: 'start' | 'end'): void {
    const behavior: ScrollBehavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    const headroom = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const top = to === 'start'
      ? this.start().getBoundingClientRect().top - headroom - 16
      : this.end().getBoundingClientRect().bottom + 24 - innerHeight;
    window.scrollBy({ top, behavior });
  }
}
