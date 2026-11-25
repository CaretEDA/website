import { BLOG_POSTS } from '../blog/blog-posts';
import { NEWS_ITEMS } from '../news/news-items';
import { customRange, filterByRange, monthsWithItems, postMonth, rangeLabel } from './date-filter';

const TODAY = new Date(2026, 10, 25); // 25 November 2026
const ym = (y: number, m: number) => y * 12 + (m - 1);

describe('Date filter', () => {
  it('reads every post date, and the list is newest first', () => {
    // A new post with a date the filter cannot read ("Oct 2026", "2026-10") fails here, not silently.
    const months = BLOG_POSTS.map(p => postMonth(p.date));
    months.forEach((m, i) => expect(m, `${BLOG_POSTS[i].slug}: "${BLOG_POSTS[i].date}"`).not.toBeNull());
    for (let i = 1; i < months.length; i++) expect(months[i]!).toBeLessThanOrEqual(months[i - 1]!);
  });

  it('counts a month that overlaps the window (presets on 25 Nov 2026)', () => {
    expect(postMonth('October 2026')).toBe(ym(2026, 10));
    const count = (kind: 'month' | 'six' | 'year' | 'all') => filterByRange(BLOG_POSTS, { kind }, TODAY).length;
    expect(count('month')).toBe(BLOG_POSTS.filter(p => postMonth(p.date)! >= ym(2026, 10)).length);
    expect(count('six')).toBe(BLOG_POSTS.filter(p => postMonth(p.date)! >= ym(2026, 5)).length);
    expect(count('year')).toBe(BLOG_POSTS.filter(p => postMonth(p.date)! >= ym(2025, 11)).length);
    expect(count('all')).toBe(BLOG_POSTS.length);
  });

  it('filters a custom month range, whichever end is picked first', () => {
    const fwd = filterByRange(BLOG_POSTS, customRange(ym(2026, 7), ym(2026, 9)), TODAY);
    const rev = filterByRange(BLOG_POSTS, customRange(ym(2026, 9), ym(2026, 7)), TODAY);
    expect(rev).toEqual(fwd);
    expect(fwd.length).toBeGreaterThan(0);
    expect(fwd.every(p => /^(July|August|September) 2026$/.test(p.date))).toBe(true);
    expect(customRange(5, 2)).toEqual({ kind: 'custom', from: 2, to: 5 });
  });

  it('offers only months that have posts, newest first, and labels ranges', () => {
    const ms = monthsWithItems(BLOG_POSTS);
    expect(new Set(ms).size).toBe(ms.length);
    expect([...ms].sort((a, b) => b - a)).toEqual(ms);
    expect(rangeLabel({ kind: 'six' })).toBe('Past 6 months');
    expect(rangeLabel(customRange(ym(2026, 7), ym(2026, 9)))).toBe('Jul – Sep 2026');
    expect(rangeLabel(customRange(ym(2025, 11), ym(2026, 2)))).toBe('Nov 2025 – Feb 2026');
    expect(rangeLabel(customRange(ym(2026, 9), ym(2026, 9)))).toBe('September 2026');
  });

  it('works on news dates too (same format), so the filter can be reused there', () => {
    expect(postMonth('September 8, 2026')).toBe(ym(2026, 9));
    NEWS_ITEMS.forEach(n => expect(postMonth(n.date), n.date).not.toBeNull());
  });
});
