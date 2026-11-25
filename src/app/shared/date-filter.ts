/**
 * Time-range filter for dated lists: blog posts ("October 2026") and news ("September 8, 2026").
 * Pure functions only, so they are testable with a fixed "today".
 *
 * Dates are month-precise display strings ("October 2026"), read as a month number
 * (year × 12 + month). A post counts when its month overlaps the chosen window: on 25 November
 * "Past month" (25 Oct – 25 Nov) includes October and November.
 */
export type RangePreset = 'all' | 'month' | 'six' | 'year';
export type DateRange = { kind: RangePreset } | { kind: 'custom'; from: number; to: number };
export type RangeKind = DateRange['kind'];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

/** How far back each preset reaches, in whole months before the current one. */
const BACK: Record<Exclude<RangePreset, 'all'>, number> = { month: 1, six: 6, year: 12 };

export const RANGE_OPTIONS: { kind: RangeKind; label: string }[] = [
  { kind: 'all', label: 'All time' },
  { kind: 'month', label: 'Past month' },
  { kind: 'six', label: 'Past 6 months' },
  { kind: 'year', label: 'Past year' },
  { kind: 'custom', label: 'Custom range' },
];

/** "October 2026" (blog) or "September 8, 2026" (news) → year × 12 + month; null for any other format. */
export function postMonth(date: string): number | null {
  const m = /^\s*([A-Za-z]+)\s+(?:\d{1,2},\s*)?(\d{4})\s*$/.exec(date);
  if (!m) return null;
  const i = MONTHS.findIndex(name => name.toLowerCase() === m[1].toLowerCase());
  return i < 0 ? null : Number(m[2]) * 12 + i;
}

export const monthOf = (d: Date): number => d.getFullYear() * 12 + d.getMonth();
export const monthName = (n: number): string => MONTHS[n % 12];
export const monthLabel = (n: number): string => `${MONTHS[n % 12]} ${Math.floor(n / 12)}`;
const shortLabel = (n: number): string => `${MONTHS[n % 12].slice(0, 3)} ${Math.floor(n / 12)}`;

/** Custom ranges keep From ≤ To whatever order the two were picked in. */
export function customRange(a: number, b: number): DateRange {
  return { kind: 'custom', from: Math.min(a, b), to: Math.max(a, b) };
}

/** [first, last] month of the window, or null for "All time". */
export function windowFor(range: DateRange, today: Date): [number, number] | null {
  if (range.kind === 'all') return null;
  if (range.kind === 'custom') return [range.from, range.to];
  const now = monthOf(today);
  return [now - BACK[range.kind], now];
}

export function filterByRange<T extends { date: string }>(items: readonly T[], range: DateRange, today = new Date()): T[] {
  const win = windowFor(range, today);
  if (!win) return [...items];
  return items.filter(item => {
    const m = postMonth(item.date);
    return m !== null && m >= win[0] && m <= win[1];
  });
}

/** The months that have at least one item, newest first: the choices for a custom range. */
export function monthsWithItems(items: readonly { date: string }[]): number[] {
  const set = new Set<number>();
  for (const item of items) { const m = postMonth(item.date); if (m !== null) set.add(m); }
  return [...set].sort((a, b) => b - a);
}

export function rangeLabel(range: DateRange): string {
  if (range.kind !== 'custom') return RANGE_OPTIONS.find(o => o.kind === range.kind)!.label;
  if (range.from === range.to) return monthLabel(range.from);
  const sameYear = Math.floor(range.from / 12) === Math.floor(range.to / 12);
  return sameYear
    ? `${MONTHS[range.from % 12].slice(0, 3)} – ${shortLabel(range.to)}`
    : `${shortLabel(range.from)} – ${shortLabel(range.to)}`;
}
