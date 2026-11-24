import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
              <h3 class="text-ink font-medium text-lg leading-snug mb-3">{{ post.title }}</h3>
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
  posts = [
    {
      "slug": "verified-gates",
      "image": "assets/blogs/verified-gates-hero.jpg",
      "date": "October 2026",
      "readTime": "6 min read",
      "title": "From 160 Gates a Day to Verified Gates",
      "summary": "Gates per engineer-day never really measured gates — it measured verified gates, and agents that generate RTL for free are forcing the industry to say so plainly."
    },
    {
      "slug": "verilator-5-050",
      "image": "assets/blogs/verilator-5-050-hero.jpeg",
      "date": "September 2026",
      "readTime": "4 min read",
      "title": "Unlimited. Full-Featured. Perfect for the Agentic Loop.",
      "summary": "How Verilator 5.050 closes the cost, functionality, and performance gaps at once — measured across sixteen public and UVM designs."
    },
    {
      slug: '2026-08-release',
      image: 'assets/blogs/2026-08-release-hero.jpg',
      date: 'September 2026',
      readTime: '4 min read',
      title: 'CaretEDA’s 2026.08 Release: From RTL to Physical Reality',
      summary: 'CaretEDA\'s second release brings OpenROAD into the Spec-to-Netlist™ platform, updates Verilator, and introduces new partnerships, bridging the gap from RTL generation to physical implementation.'
    },
    {
      slug: 'chip-design-over-mcp',
      image: 'assets/blogs/mcp-data-flow.webp',
      date: 'August 2026',
      readTime: '< 5 min read',
      title: 'Chip Design over MCP: Drive It from Claude, Codex, and Copilot',
      summary: 'Caret now exposes both its goal-driven hardware agents and its EDA tools through MCP, putting them inside your IDE and CI pipeline — turning AI from a side-window assistant into an engineering teammate.'
    },
    {
      slug: 'dac2026-oss-blog',
      image: 'assets/blogs/dac2026-oss-hero.svg',
      date: 'July 2026',
      readTime: '5 min read',
      title: 'Open Source EDA Has Arrived. Now It Needs a Partner You Can Call.',
      summary: 'Why the open source EDA stack is ready for production chip design, and how CaretEDA is closing the adoption gap with commercial Service Level Agreements.'
    },
    {
      slug: 'spec-bottleneck',
      image: 'assets/blogs/spec-bottleneck-hero.png',
      date: 'July 2026',
      readTime: '7 min read',
      title: 'The Spec Is the Bottleneck, Not the Silicon',
      summary: 'Why agentic chip design breaks when ambiguous specs are silently resolved, and why formalization has to sit before RTL generation.'
    },
    {
      slug: 'verilator',
      image: 'assets/blogs/verilator-image1.jpg',
      date: 'May 2026',
      readTime: '5 min read',
      title: 'Verilator: The Open-Source Simulator Reshaping Chip Design',
      summary: 'How a tool born at Digital Equipment Corporation in 1994 ended up at the center of chip verification for Tesla, Google, AMD, and NVIDIA.'
    },
    {
      slug: 'code-generation',
      image: 'assets/blogs/code-generation-perspective.jpg',
      date: 'April 2026',
      readTime: '5 min read',
      title: 'Generating SystemVerilog Is Easy. Generating Hardware Is Not.',
      summary: 'LLMs can produce RTL that compiles and simulates — but hardware is a contract with physics, and physics does not accept plausible drafts.'
    },
    {
      slug: 'silicon-imperative',
      image: 'assets/blogs/silicon-imperative.jpg',
      date: 'March 2026',
      readTime: '5 min read',
      title: 'The Silicon Imperative',
      summary: 'Rising chip design complexity, shrinking tapeout cycles, and why the $775B semiconductor market is making AI-driven design a strategic necessity.'
    },
  ];
}