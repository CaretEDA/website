/**
 * Long lists (blog, news) show a few items, then grow by a batch per "Show more".
 * A batch on a grid is two rows, rounded up to whole rows so a batch never ends on a half-empty row
 * (two columns: 3 → 8, not 7). A single column grows by `oneColumn` items.
 */
export function nextLimit(shown: number, columns: number, oneColumn: number): number {
  const cols = Math.max(1, columns);
  const step = cols === 1 ? oneColumn : cols * 2;
  return Math.ceil((shown + step) / cols) * cols;
}

/** Columns a CSS grid shows now (1 for a plain flex/stack list, or outside a browser). */
export function gridColumns(el: HTMLElement | undefined): number {
  if (!el || typeof getComputedStyle !== 'function') return 1;
  const cols = getComputedStyle(el).gridTemplateColumns;
  return !cols || cols === 'none' ? 1 : Math.max(1, cols.split(' ').filter(Boolean).length);
}

/** After collapsing a long list, bring its section back when its top is above the screen. */
export function revealSection(from: HTMLElement): void {
  const section = from.closest('section');
  if (section && section.getBoundingClientRect().top < 0) section.scrollIntoView?.({ block: 'start' });
}
