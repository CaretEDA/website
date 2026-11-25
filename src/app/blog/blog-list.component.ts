import {
  AfterViewInit, Component, DestroyRef, ElementRef, Injector, PLATFORM_ID, afterNextRender, computed, effect, inject,
  signal, untracked, viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BLOG_POSTS } from './blog-posts';
import { DateRange, filterByRange, monthsWithItems, rangeLabel } from './blog-filter';
import { DateFilterComponent } from './blog-filter.component';

/** Cards shown before "Show more". */
const FIRST = 3;

/**
 * Blog section. Three posts; each "Show more" adds the next two rows (6 cards at three columns, 4 at two,
 * 3 on phones), in the page itself, so there is one scroll: the page's. Once every post is shown the button
 * reads "Show fewer posts". While the list is longer than three and on screen, a small floating capsule at the
 * cards' right edge jumps to the Blog heading (↑) or to the end of the list (↓).
 * A date filter narrows the list; everything above works on the filtered list.
 */
@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterModule, DateFilterComponent],
  template: `
    <section class="chapter">
      <div class="max-w-[1200px] mx-auto">

        <div #head class="head-row blog-head">
          <div class="head">
            <h2>Blog</h2>
            <p>Insights on AI-native chip design, EDA, and semiconductor engineering from the CaretEDA team.</p>
          </div>
          <app-date-filter class="date-filter" panelId="blog-filter" [months]="months" [(range)]="range" />
        </div>

        <p class="filter-result" aria-live="polite">
          @if (filtering()) {
            <span>{{ filtered().length }} {{ filtered().length === 1 ? 'post' : 'posts' }} · {{ rangeText() }}</span>
          }
        </p>

        @if (filtered().length) {
          <div #grid id="post-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (post of visible(); track post.slug) {
              <a [routerLink]="['/blogs', post.slug]"
                 class="post-card lift flex flex-col bg-card border border-line rounded-2xl overflow-hidden">
                @if (post.image) {
                  <div class="w-full aspect-[16/9] bg-deep overflow-hidden">
                    <!-- The 800px card image serves cards up to ~400 CSS px at 2x; wider single-column cards
                         (tablets below 768px) take the full image. 1600w is the heroes' nominal width. -->
                    <img loading="lazy" decoding="async" [src]="post.card || post.image"
                         [attr.srcset]="post.card ? post.card + ' 800w, ' + post.image + ' 1600w' : null"
                         [attr.sizes]="post.card ? '(min-width: 1024px) 384px, (min-width: 768px) calc(50vw - 44px), calc(100vw - 32px)' : null"
                         alt="" class="w-full h-full object-cover">
                  </div>
                }
                <div class="flex flex-col flex-1 p-6">
                  <p class="micro tabular mb-3">{{ post.date }} · {{ post.readTime }}</p>
                  <h3 class="text-ink font-medium text-xl leading-snug mb-3">{{ post.title }}</h3>
                  <p class="text-ink-2 text-[15px] leading-relaxed line-clamp-3">{{ post.summary }}</p>
                </div>
              </a>
            }
          </div>
        } @else {
          <p class="filter-empty">No posts in this range.</p>
        }

        <div #end class="blog-actions">
          @if (filtered().length > first) {
            <button class="more-posts" aria-controls="post-grid" [attr.aria-expanded]="allShown()" (click)="more()">
              {{ allShown() ? 'Show fewer posts' : 'Show more' }} <span aria-hidden="true">{{ allShown() ? '−' : '+' }}</span>
            </button>
            <span class="micro tabular blog-count">Showing {{ visible().length }} of {{ filtered().length }}</span>
          }
          @if (filtering()) {
            <button type="button" class="text-link filter-clear" (click)="clear()">Clear filter</button>
          }
        </div>
      </div>

      <!-- One capsule (↑ over ↓) at the cards' right edge, shown while a long list is on screen.
           A direction with nowhere to go is disabled (dimmed, out of the tab order) so the shape never jumps. -->
      @if (visible().length > first) {
        <div class="blog-jump" [class.is-on]="listInView()" role="group" aria-label="Blog list">
          <button type="button" class="blog-jump__btn blog-jump__start" [disabled]="!headAbove()"
                  aria-label="Back to the top of the blog list" title="Back to the top of the blog list" (click)="jump('start')">
            <span class="arrow" aria-hidden="true"></span>
          </button>
          <button type="button" class="blog-jump__btn blog-jump__end" [disabled]="!endBelow()"
                  aria-label="Jump to the end of the blog list" title="Jump to the end of the blog list" (click)="jump('end')">
            <span class="arrow" aria-hidden="true"></span>
          </button>
        </div>
      }
    </section>
  `,
})
export class BlogListComponent implements AfterViewInit {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  readonly first = FIRST;
  readonly posts = BLOG_POSTS;
  readonly months = monthsWithItems(BLOG_POSTS);

  readonly range = signal<DateRange>({ kind: 'all' });
  readonly filtered = computed(() => filterByRange(this.posts, this.range()));
  readonly filtering = computed(() => this.range().kind !== 'all');
  readonly rangeText = computed(() => rangeLabel(this.range()));

  readonly limit = signal(FIRST);
  readonly visible = computed(() => this.filtered().slice(0, this.limit()));
  readonly allShown = computed(() => this.limit() >= this.filtered().length);

  /** Where the list is on screen, from an IntersectionObserver (no scroll listener). */
  readonly listInView = signal(false);
  readonly headAbove = signal(false);
  readonly endBelow = signal(false);

  private readonly head = viewChild.required<ElementRef<HTMLElement>>('head');
  private readonly end = viewChild.required<ElementRef<HTMLElement>>('end');
  private readonly grid = viewChild<ElementRef<HTMLElement>>('grid');
  private io?: IntersectionObserver;
  private observedGrid?: HTMLElement;

  constructor() {
    // A new filter starts again from the first three.
    effect(() => {
      this.range();
      untracked(() => { this.limit.set(FIRST); this.afterRender(); });
    });
  }

  ngAfterViewInit(): void {
    if (!this.browser || typeof IntersectionObserver !== 'function') return;
    // Observers fire only when an element crosses into or out of their area, so they cost nothing while
    // scrolling in between. The heading and the list's end are watched against the zones above and below
    // the screen (not the screen itself), so a jump straight past the screen (below → above) still reports.
    const above = new IntersectionObserver(([e]) => this.headAbove.set(e.isIntersecting), { rootMargin: '100000px 0px -100% 0px' });
    const below = new IntersectionObserver(([e]) => this.endBelow.set(e.isIntersecting), { rootMargin: '-100% 0px 100000px 0px' });
    // "In view" means the cards fill the middle band of the screen (the 20% around its centre), i.e. the reader
    // is browsing the list. A last row hiding under the fixed nav, or the first row peeking in at the bottom,
    // does not count, so the capsule leaves as soon as the next section (News) takes over the screen.
    this.io = new IntersectionObserver(([e]) => this.listInView.set(e.isIntersecting), { rootMargin: '-40% 0px -40% 0px' });
    above.observe(this.head().nativeElement);
    below.observe(this.end().nativeElement);
    this.observeGrid();
    this.destroyRef.onDestroy(() => { above.disconnect(); below.disconnect(); this.io?.disconnect(); });
  }

  /** The grid is re-created after an empty filter result, so it is re-observed after each render. */
  private observeGrid(): void {
    const g = this.grid()?.nativeElement;
    if (!this.io || g === this.observedGrid) return;
    if (this.observedGrid) this.io.unobserve(this.observedGrid);
    if (g) this.io.observe(g);
    this.observedGrid = g;
    if (!g) this.listInView.set(false);
  }

  more(): void {
    if (this.allShown()) { this.collapse(); return; }
    const cols = this.columns();
    const step = cols === 1 ? FIRST : cols * 2;
    // round up to whole rows, so a 2-column grid never ends a batch on a half-empty row (3 → 8, not 7)
    this.limit.update(n => Math.ceil((n + step) / cols) * cols);
    this.afterRender();
  }

  clear(): void { this.range.set({ kind: 'all' }); }

  /** Columns the grid shows now (3, 2 or 1). Each batch is two rows of them; three cards on one column. */
  private columns(): number {
    const g = this.grid()?.nativeElement;
    const cols = g && typeof getComputedStyle === 'function'
      ? getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length : 1;
    return Math.max(1, cols);
  }

  /** ↑ to the Blog heading (below the nav); ↓ to the end of the list, with "Show more" in view. */
  jump(to: 'start' | 'end'): void {
    const behavior: ScrollBehavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    const headroom = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const top = to === 'start'
      ? this.head().nativeElement.getBoundingClientRect().top - headroom - 16
      : this.end().nativeElement.getBoundingClientRect().bottom + 24 - innerHeight;
    window.scrollBy({ top, behavior });
  }

  /** Back to three cards; brings the heading into view when it is above the screen. */
  private collapse(): void {
    this.limit.set(FIRST);
    this.afterRender(() => {
      const section = this.head().nativeElement.closest('section');
      if (section && section.getBoundingClientRect().top < 0) section.scrollIntoView?.({ block: 'start' });
    });
  }

  private afterRender(then?: () => void): void {
    if (!this.browser) return;
    afterNextRender(() => { this.observeGrid(); then?.(); }, { injector: this.injector });
  }
}
