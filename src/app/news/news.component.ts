import { Component, ElementRef, Injector, PLATFORM_ID, afterNextRender, computed, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NEWS_ITEMS } from './news-items';
import { DateRange, filterByRange, monthsWithItems, rangeLabel } from '../shared/date-filter';
import { DateFilterComponent } from '../shared/date-filter.component';
import { ListJumpComponent } from '../shared/list-jump.component';
import { nextLimit, revealSection } from '../shared/list-batches';

/**
 * The newest item spans the full width and the rest sit two to a row (one column on phones), so the list
 * opens with the lead item plus one row, and each "Show more" adds two rows: the count stays odd and the
 * last row is always full.
 */
const FIRST = 3;
const BATCH = 4;

/**
 * News section, built like the Blog list: the newest three items, "Show more" adds two rows at a time in the
 * page itself, a date filter narrows the list, and the ↑/↓ capsule jumps to the heading or the end while a
 * long list is on screen.
 */
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterModule, NgTemplateOutlet, DateFilterComponent, ListJumpComponent],
  template: `
    <section class="chapter">
      <div class="max-w-[1000px] mx-auto">

        <div #head class="head-row list-head">
          <div class="head">
            <h2>News</h2>
            <p>The latest announcements from CaretEDA.</p>
          </div>
          <app-date-filter class="date-filter" panelId="news-filter" noun="news" [months]="months" [(range)]="range" />
        </div>

        <p class="filter-result" aria-live="polite">
          @if (filtering()) {
            <span>{{ filtered().length }} {{ filtered().length === 1 ? 'item' : 'items' }} · {{ rangeText() }}</span>
          }
        </p>

        <!-- Items come from news-items.ts, newest first -->
        <div #list id="news-list" class="news-list">
          @for (item of visible(); track item.title) {
            @if (item.route) {
              <a [routerLink]="item.route" class="news-card lift block bg-card border border-line rounded-2xl p-6">
                <ng-container *ngTemplateOutlet="body; context: { $implicit: item }" />
                <span class="text-link text-sm">Read more <span class="arrow" aria-hidden="true"></span></span>
              </a>
            } @else if (item.link) {
              <a [href]="item.link" target="_blank" rel="noopener noreferrer"
                 class="news-card lift block bg-card border border-line rounded-2xl p-6">
                <ng-container *ngTemplateOutlet="body; context: { $implicit: item }" />
                <span class="inline-flex items-center gap-2 text-accent-ink text-xs font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Read on LinkedIn <span class="arrow" aria-hidden="true"></span>
                </span>
              </a>
            }
          }
        </div>
        @if (!filtered().length) {
          <p class="filter-empty">No news in this range.</p>
        }

        <div #end class="list-actions">
          @if (filtered().length > first) {
            <button class="more-posts" aria-controls="news-list" [attr.aria-expanded]="allShown()" (click)="more()">
              {{ allShown() ? 'Show less' : 'Show more' }} <span aria-hidden="true">{{ allShown() ? '−' : '+' }}</span>
            </button>
            <span class="micro tabular list-count">Showing {{ visible().length }} of {{ filtered().length }}</span>
          }
          @if (filtering()) {
            <button type="button" class="text-link filter-clear" (click)="clear()">Clear filter</button>
          }
        </div>

        <ng-template #body let-item>
          <p class="micro tabular mb-3">{{ item.date }}</p>
          <h3 class="text-ink font-medium text-lg md:text-xl leading-snug mb-3">{{ item.title }}</h3>
          <p class="text-ink-2 text-sm md:text-base leading-relaxed mb-4">{{ item.summary }}</p>
        </ng-template>
      </div>

      @if (visible().length > first) {
        <app-list-jump label="news list" [start]="head" [list]="list" [end]="end" />
      }
    </section>
  `,
})
export class NewsComponent {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly injector = inject(Injector);

  readonly first = FIRST;
  readonly months = monthsWithItems(NEWS_ITEMS);

  readonly range = signal<DateRange>({ kind: 'all' });
  readonly filtered = computed(() => filterByRange(NEWS_ITEMS, this.range()));
  readonly filtering = computed(() => this.range().kind !== 'all');
  readonly rangeText = computed(() => rangeLabel(this.range()));

  readonly limit = signal(FIRST);
  readonly visible = computed(() => this.filtered().slice(0, this.limit()));
  readonly allShown = computed(() => this.limit() >= this.filtered().length);

  private readonly head = viewChild.required<ElementRef<HTMLElement>>('head');

  constructor() {
    // A new filter starts again from the first three.
    effect(() => { this.range(); untracked(() => this.limit.set(FIRST)); });
  }

  more(): void {
    if (this.allShown()) { this.collapse(); return; }
    this.limit.update(n => nextLimit(n, 1, BATCH));
  }

  clear(): void { this.range.set({ kind: 'all' }); }

  /** Back to three items; brings the heading into view when it is above the screen. */
  private collapse(): void {
    this.limit.set(FIRST);
    if (this.browser) afterNextRender(() => revealSection(this.head().nativeElement), { injector: this.injector });
  }
}
