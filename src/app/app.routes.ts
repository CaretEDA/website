import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// Only the home page is in the main bundle. Detail pages (blog posts, news, careers, demos)
// load on first visit, so the home page doesn't download every article's full text.
export const routes: Routes = [
  { path: '',                component: HomeComponent },
  { path: 'about', pathMatch: 'full', redirectTo: '/#about' },
  { path: 'team', pathMatch: 'full', redirectTo: '/#team' },
  // Hidden page, as on careteda.com: reachable by URL, not linked from the menu or homepage.
  { path: 'demos',           loadComponent: () => import('./demos/demos.component').then(m => m.DemosComponent) },
  { path: 'news', pathMatch: 'full', redirectTo: '/#news' },
  { path: 'news/2026-08-release-neevsemi-partnership', loadComponent: () => import('./news/news-neevsemi-partnership.component').then(m => m.NewsNeevsemiPartnershipComponent) },
  { path: 'news/dac-2026',   loadComponent: () => import('./news/news-dac2026.component').then(m => m.NewsDac2026Component) },
  { path: 'news/technical-advisors', loadComponent: () => import('./news/news-detail.component').then(m => m.NewsDetailComponent) },
  { path: 'news/bit-mesra-award', loadComponent: () => import('./news/news-bit-mesra-award.component').then(m => m.NewsBitMesraAwardComponent) },
  { path: 'startup-program', pathMatch: 'full', redirectTo: '/#startup-program' },
  { path: 'blogs', pathMatch: 'full', redirectTo: '/#blogs' },
  { path: 'blogs/:slug',     loadComponent: () => import('./blog/blog-detail.component').then(m => m.BlogDetailComponent) },
  { path: 'ifaq', pathMatch: 'full', redirectTo: '/#ifaq' },
  { path: 'careers', pathMatch: 'full', redirectTo: '/#careers' },
  { path: 'careers/:slug',   loadComponent: () => import('./careers/careers-detail.component').then(m => m.CareersDetailComponent) },
  { path: '**',              redirectTo: '' },
];
