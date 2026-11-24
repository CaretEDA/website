import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// A refresh always starts at the very top of the page.
// 1. Stop the browser from restoring the previous scroll position.
// 2. On a reload, drop a leftover section fragment (e.g. #news from a nav click),
//    so the router's anchor scrolling doesn't jump back to that section.
//    Links that open a section directly (not a reload) still work.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
if (nav?.type === 'reload') {
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  window.scrollTo(0, 0);
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
