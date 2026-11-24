import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BLOG_POSTS } from './blog-posts';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="chapter">
      <div class="max-w-[1200px] mx-auto">

        <div class="head">
          <h2>Blog</h2>
          <p>Insights on AI-native chip design, EDA, and semiconductor engineering from the CaretEDA team.</p>
        </div>

        <div id="post-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a *ngFor="let post of (expanded ? posts : posts.slice(0, 3))"
             [routerLink]="['/blogs', post.slug]"
             class="lift flex flex-col bg-card border border-line rounded-2xl overflow-hidden">
            <div class="w-full aspect-[16/9] bg-deep overflow-hidden" *ngIf="post.image">
              <img loading="lazy" [src]="post.image" alt="" class="w-full h-full object-cover">
            </div>
            <div class="flex flex-col flex-1 p-6">
              <p class="micro tabular mb-3">{{ post.date }} · {{ post.readTime }}</p>
              <h3 class="text-ink font-medium text-xl leading-snug mb-3">{{ post.title }}</h3>
              <p class="text-ink-2 text-[15px] leading-relaxed line-clamp-3">{{ post.summary }}</p>
            </div>
          </a>
        </div>

        <button class="more-posts" aria-controls="post-grid" [attr.aria-expanded]="expanded" (click)="expanded = !expanded">
          {{ expanded ? 'Show fewer posts' : 'Show more' }} <span aria-hidden="true">{{ expanded ? '−' : '+' }}</span>
        </button>
      </div>
    </section>
  `
})
export class BlogListComponent {

  expanded = false;
  posts = BLOG_POSTS;
}