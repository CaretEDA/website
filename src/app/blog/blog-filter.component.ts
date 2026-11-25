import { Component, ElementRef, HostListener, computed, input, model, signal, viewChild } from '@angular/core';
import { DateRange, RANGE_OPTIONS, RangeKind, customRange, monthLabel, rangeLabel } from './blog-filter';

/**
 * Date filter: a trigger (filter icon + the active range) that opens a small panel with the presets
 * and a custom From / To month range. A choice applies at once. Escape, Done or a click outside closes
 * the panel; Escape and Done return focus to the trigger.
 * Reusable: bind [(range)] and pass the months that have items.
 */
@Component({
  selector: 'app-date-filter',
  standalone: true,
  template: `
    <button #trigger type="button" class="filter-trigger" [class.is-active]="range().kind !== 'all'"
            [attr.aria-expanded]="open()" [attr.aria-controls]="panelId()" (click)="toggle()">
      <span class="icon icon--filter" aria-hidden="true"></span>
      <span class="sr-only">Filter {{ noun() }} by date: </span>{{ label() }}
    </button>
    @if (open()) {
      <div class="filter-panel" [class.is-closing]="closing()" [id]="panelId()">
        <fieldset class="filter-group">
          <legend class="micro">Time range</legend>
          @for (o of options; track o.kind) {
            <label class="filter-option">
              <input type="radio" [name]="panelId() + '-range'" [value]="o.kind"
                     [checked]="range().kind === o.kind" (change)="pick(o.kind)">
              <span>{{ o.label }}</span>
            </label>
          }
        </fieldset>
        @if (custom(); as c) {
          <div class="filter-custom">
            <label class="field">
              <span class="micro">From</span>
              <select class="input" (change)="setFrom($any($event.target).value)">
                @for (m of months(); track m) { <option [value]="m" [selected]="m === c.from">{{ monthLabel(m) }}</option> }
              </select>
            </label>
            <label class="field">
              <span class="micro">To</span>
              <select class="input" (change)="setTo($any($event.target).value)">
                @for (m of months(); track m) { <option [value]="m" [selected]="m === c.to">{{ monthLabel(m) }}</option> }
              </select>
            </label>
          </div>
        }
        <div class="filter-foot">
          @if (range().kind !== 'all') {
            <button type="button" class="filter-reset" (click)="pick('all')">Reset</button>
          }
          <button type="button" class="filter-done" (click)="close(true)">Done</button>
        </div>
      </div>
    }
  `,
})
export class DateFilterComponent {
  readonly range = model.required<DateRange>();
  /** Months that have items, newest first (the custom range choices). */
  readonly months = input.required<number[]>();
  /** What is being filtered, for the screen-reader label ("posts"). */
  readonly noun = input('posts');
  readonly panelId = input('date-filter');

  readonly options = RANGE_OPTIONS;
  readonly monthLabel = monthLabel;
  readonly open = signal(false);
  readonly closing = signal(false);
  readonly label = computed(() => rangeLabel(this.range()));
  readonly custom = computed(() => { const r = this.range(); return r.kind === 'custom' ? r : null; });

  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private closeTimer?: ReturnType<typeof setTimeout>;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  toggle(): void { this.open() && !this.closing() ? this.close(false) : this.show(); }

  pick(kind: RangeKind): void {
    if (kind === 'custom') {
      // Start from the whole span of months that have items, then narrow it.
      const ms = this.months();
      this.range.set(customRange(ms[ms.length - 1], ms[0]));
    } else {
      this.range.set({ kind });
    }
  }

  setFrom(v: string): void { const c = this.custom(); if (c) this.range.set(customRange(Number(v), c.to)); }
  setTo(v: string): void { const c = this.custom(); if (c) this.range.set(customRange(c.from, Number(v))); }

  private show(): void {
    clearTimeout(this.closeTimer);
    this.closing.set(false);
    this.open.set(true);
  }

  /** Exit is quicker than entry (100ms vs 150ms); under reduced motion it is near-instant. */
  close(returnFocus: boolean): void {
    if (!this.open()) return;
    if (returnFocus) this.trigger().nativeElement.focus();
    this.closing.set(true);
    clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => { this.open.set(false); this.closing.set(false); }, 100);
  }

  @HostListener('keydown.escape', ['$event'])
  onEscape(e: Event): void { if (this.open()) { e.stopPropagation(); this.close(true); } }

  @HostListener('document:pointerdown', ['$event'])
  onOutside(e: PointerEvent): void {
    if (this.open() && !this.host.nativeElement.contains(e.target as Node)) this.close(false);
  }
}
