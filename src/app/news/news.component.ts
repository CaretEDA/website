import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NEWS_ITEMS } from './news-items';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="chapter">
      <div class="max-w-[1000px] mx-auto">

        <div class="head"><h2>News</h2>
        <p>The latest announcements from CaretEDA.</p></div>

        <!-- Items come from news-items.ts, newest first; the first one spans the full width -->
        <div class="flex flex-col gap-6">
          <ng-container *ngFor="let item of news">
            <a *ngIf="item.route" [routerLink]="item.route"
               class="lift block bg-card border border-line rounded-2xl p-6">
              <ng-container *ngTemplateOutlet="body; context: { $implicit: item }"></ng-container>
              <span class="text-link text-sm">Read more <span class="arrow" aria-hidden="true"></span></span>
            </a>
            <a *ngIf="!item.route && item.link" [href]="item.link" target="_blank" rel="noopener noreferrer"
               class="lift block bg-card border border-line rounded-2xl p-6">
              <ng-container *ngTemplateOutlet="body; context: { $implicit: item }"></ng-container>
              <span class="inline-flex items-center gap-2 text-accent-ink text-xs font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Read on LinkedIn <span class="arrow" aria-hidden="true"></span>
              </span>
            </a>
          </ng-container>
        </div>

        <ng-template #body let-item>
          <p class="micro tabular mb-3">{{ item.date }}</p>
          <h3 class="text-ink font-medium text-lg md:text-2xl leading-snug mb-3">{{ item.title }}</h3>
          <p class="text-ink-2 text-sm md:text-base leading-relaxed mb-4">{{ item.summary }}</p>
        </ng-template>

      </div>
    </section>
  `
})
export class NewsComponent {
  news = NEWS_ITEMS;
}
