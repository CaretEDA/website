import { Component, ElementRef, Injector, PLATFORM_ID, afterNextRender, computed, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BLOG_POSTS } from './blog-posts';
import { DateRange, filterByRange, monthsWithItems, rangeLabel } from '../shared/date-filter';
import { DateFilterComponent } from '../shared/date-filter.component';
import { ListJumpComponent } from '../shared/list-jump.component';
import { gridColumns, nextLimit, revealSection } from '../shared/list-batches';

/** Cards shown before "Show more". */
const FIRST = 3;

/**
 * Blog section. Three posts; each "Show more" adds the next two rows (6 cards at three columns, 4 at two,
 * 3 on phones), in the page itself, so there is one scroll: the page's. Once every post is shown the button
 * reads "Show fewer posts". While the list is longer than three and on screen, the ↑/↓ capsule jumps to the
 * Blog heading or to the end of the list. A date filter narrows the list; everything above works on it.
 */
@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterModule, DateFilterComponent, ListJumpComponent],
  template: `
    <section class="chapter">
      <div class="max-w-[1200px] mx-auto">

        <div #head class="head-row list-head">
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
        @if (!filtered().length) {
          <p class="filter-empty">No posts in this range.</p>
        }

        <div #end class="list-actions">
          @if (filtered().length > first) {
            <button class="more-posts" aria-controls="post-grid" [attr.aria-expanded]="allShown()" (click)="more()">
              {{ allShown() ? 'Show fewer posts' : 'Show more' }} <span aria-hidden="true">{{ allShown() ? '−' : '+' }}</span>
            </button>
            <span class="micro tabular list-count">Showing {{ visible().length }} of {{ filtered().length }}</span>
          }
          @if (filtering()) {
            <button type="button" class="text-link filter-clear" (click)="clear()">Clear filter</button>
          }
        </div>
      </div>

      @if (visible().length > first) {
        <app-list-jump label="blog list" [start]="head" [list]="grid" [end]="end" />
      }
    </section>
  `,
})
export class BlogListComponent {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly injector = inject(Injector);

  readonly first = FIRST;
  readonly months = monthsWithItems(BLOG_POSTS);

  readonly range = signal<DateRange>({ kind: 'all' });
  readonly filtered = computed(() => filterByRange(BLOG_POSTS, this.range()));
  readonly filtering = computed(() => this.range().kind !== 'all');
  readonly rangeText = computed(() => rangeLabel(this.range()));

  readonly limit = signal(FIRST);
  readonly visible = computed(() => this.filtered().slice(0, this.limit()));
  readonly allShown = computed(() => this.limit() >= this.filtered().length);

  private readonly head = viewChild.required<ElementRef<HTMLElement>>('head');
  private readonly grid = viewChild.required<ElementRef<HTMLElement>>('grid');

  constructor() {
    // A new filter starts again from the first three.
    effect(() => { this.range(); untracked(() => this.limit.set(FIRST)); });
  }

  more(): void {
    if (this.allShown()) { this.collapse(); return; }
    this.limit.update(n => nextLimit(n, gridColumns(this.grid().nativeElement), FIRST));
  }

  clear(): void { this.range.set({ kind: 'all' }); }

  /** Back to three cards; brings the heading into view when it is above the screen. */
  private collapse(): void {
    this.limit.set(FIRST);
    if (this.browser) afterNextRender(() => revealSection(this.head().nativeElement), { injector: this.injector });
  }
}
