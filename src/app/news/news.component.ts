import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="chapter">
      <div class="max-w-[1000px] mx-auto">

        <div class="head"><h2>News</h2>
        <p>The latest announcements from CaretEDA.</p></div>

        <div class="flex flex-col gap-6">

          <a [routerLink]="['/news', '2026-08-release-neevsemi-partnership']"
             class="order-0 lift block bg-card border border-line rounded-2xl p-6 md:p-8">
            <p class="micro tabular mb-3">September 8, 2026</p>
            <h3 class="text-ink font-medium text-lg md:text-2xl leading-snug mb-3">CaretEDA Announces 2026.08 Release and NeevSemi Partnership</h3>
            <p class="text-ink-2 text-sm md:text-base leading-relaxed mb-4">New Spec-to-Netlist&trade; capabilities, Verilator 5.050 and OpenROAD 26Q3 in CaretEDA's open-source EDA stack, and a preferred partnership with NeevSemi.</p>
            <span class="text-link text-sm">Read more <span class="arrow" aria-hidden="true">→</span></span>
          </a>

          <!-- Press release — BIT Mesra Distinguished Alumna Award (August 2026) -->
          <a [routerLink]="['/news', 'bit-mesra-award']"
             class="order-0 lift block bg-card border border-line rounded-2xl p-6 md:p-8">
            <p class="micro tabular mb-3">August 31, 2026</p>
            <h3 class="text-ink font-medium text-lg md:text-2xl leading-snug mb-3">
              CaretEDA Co-Founder and CEO Sashi Obilisetty Receives BIT Mesra Distinguished Alumna Award 2026
            </h3>
            <p class="text-ink-2 text-sm md:text-base leading-relaxed mb-4">
              Electronics and Communication Engineering alumna honored for contributions to engineering, technology and entrepreneurship at BIT Mesra&#8217;s 72nd Foundation Day.
            </p>
            <span class="text-link text-sm">Read more <span class="arrow" aria-hidden="true">→</span></span>
          </a>

          <!-- Press release — DAC 2026 (July 2026) -->
          <a [routerLink]="['/news', 'dac-2026']"
             class="order-1 lift block bg-card border border-line rounded-2xl p-6 md:p-8">
            <p class="micro tabular mb-3">July 24, 2026</p>
            <h3 class="text-ink font-medium text-lg md:text-2xl leading-snug mb-3">
              CaretEDA Announces Commercially Available End-to-End Opensource EDA Stack, and Launches Startup Program
            </h3>
            <p class="text-ink-2 text-sm md:text-base leading-relaxed mb-4">
              2026.08 Release Delivers the Opensource EDA Stack Spanning Simulation, Logic Synthesis, Formal Verification, and Physical Synthesis; New Startup Program Opens CaretEDA&#8217;s Opensource EDA Stack and Agentic Modules to Early-Stage Chip Design Companies.
            </p>
            <span class="text-link text-sm">Read more <span class="arrow" aria-hidden="true">→</span></span>
          </a>

          <!-- Press release — new Technical Advisors (June 2026) -->
          <a [routerLink]="['/news', 'technical-advisors']"
             class="order-2 lift block bg-card border border-line rounded-2xl p-6 md:p-8">
            <p class="micro tabular mb-3">June 22, 2026</p>
            <h3 class="text-ink font-medium text-lg md:text-2xl leading-snug mb-3">
              CaretEDA Adds Two Semiconductor Veterans to Technical Advisory Board
            </h3>
            <p class="text-ink-2 text-sm md:text-base leading-relaxed mb-4">
              Nithya Raghavan and Sridhar Narayanan join as Technical Advisors, bringing deep EDA knowledge and extensive chip design expertise to CaretEDA&#8217;s agentic chip design platform.
            </p>
            <span class="text-link text-sm">Read more <span class="arrow" aria-hidden="true">→</span></span>
          </a>

          <!-- LinkedIn launch post (Feb 2026) -->
          <a *ngFor="let item of news"
             [href]="item.link" target="_blank" rel="noopener noreferrer"
             class="order-3 lift block bg-card border border-line rounded-2xl p-6 md:p-8">
            <p class="micro tabular mb-3">{{ item.date }}</p>
            <h3 class="text-ink font-medium text-lg md:text-2xl leading-snug mb-3">{{ item.title }}</h3>
            <p class="text-ink-2 text-sm md:text-base leading-relaxed mb-4">{{ item.summary }}</p>
            <span class="inline-flex items-center gap-1.5 text-accent-ink text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Read on LinkedIn →
            </span>
          </a>

        </div>

      </div>
    </section>
  `
})
export class NewsComponent {


  news: { date: string; title: string; summary: string; link?: string }[] = [
    {
      date: 'February 2026',
      title: 'Announcing the launch of CaretEDA',
      summary: 'Co-founder & CEO Sashi Obilisetty shares the vision behind CaretEDA — end-to-end, AI-first design systems that learn your flow, protect your IP, scale with your team, and continuously accelerate the path from idea to silicon.',
      link: 'https://www.linkedin.com/posts/sashi-obilisetty-009720_semiconductors-chipdesign-eda-share-7423916221449936896-aNY6/'
    }
  ];
}
