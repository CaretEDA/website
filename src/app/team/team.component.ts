import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Person { id: string; name: string; role: string; photo: string; linkedin: string; bio?: string; more?: string; }

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="chapter">
      <div>
        <div class="head">
          <h2>Team</h2>
          <p>The people building the future of AI-native chip design.</p>
        </div>

        <div class="founders">
          <article class="person" *ngFor="let p of founders">
            <div class="photo"><img loading="lazy" [src]="p.photo" [alt]="p.name" width="144" height="144"></div>
            <h3>{{ p.name }}</h3>
            <p class="role">{{ p.role }}</p>
            <div class="bio">
              <p>{{ p.bio }}</p>
              <p *ngIf="expanded[p.id]" class="bio-more" [id]="'bio-' + p.id">{{ p.more }}</p>
            </div>
            <div class="person-links">
              <button type="button" class="bio-toggle" (click)="toggle(p.id)" [attr.aria-expanded]="!!expanded[p.id]" [attr.aria-controls]="'bio-' + p.id">
                {{ expanded[p.id] ? 'Read less' : 'Read more' }}
              </button>
              <a class="icon-link" [href]="p.linkedin" target="_blank" rel="noopener noreferrer" [attr.aria-label]="p.name + ' on LinkedIn'">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path [attr.d]="li"/></svg>LinkedIn
              </a>
            </div>
          </article>
        </div>

        <h3 class="sub-head">Technical advisors</h3>
        <div class="advisors">
          <div class="advisor" *ngFor="let p of advisors">
            <span class="advisor-photo"><img loading="lazy" [src]="p.photo" [alt]="p.name" width="64" height="64"></span>
            <div>
              <h4>{{ p.name }}</h4>
              <p>{{ p.role }}</p>
              <a class="icon-link" [href]="p.linkedin" target="_blank" rel="noopener noreferrer" [attr.aria-label]="p.name + ' on LinkedIn'">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path [attr.d]="li"/></svg>LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class TeamComponent {
  expanded: Record<string, boolean> = {};
  toggle(id: string) { this.expanded[id] = !this.expanded[id]; }

  readonly li = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';

  readonly founders: Person[] = [
    {
      id: 'sashi', name: 'Sashi Obilisetty', role: 'Co-Founder & CEO', photo: 'assets/team-sashi.jpg',
      linkedin: 'https://www.linkedin.com/in/sashi-obilisetty-009720/',
      bio: 'Sashi Obilisetty is an EDA technologist with extensive entrepreneurial experience. She served as Executive Director of R&D at Synopsys, leading AI organisations and verification teams across a 15+ year tenure.',
      more: 'From 2020 to 2021, Sashi was the Chief Architect for Silicon Solutions at Google Cloud. She previously founded two EDA startups. She is the 2024 Marie Pistilli Women in EDA Award recipient and holds multiple patents in EDA and AI.',
    },
    {
      id: 'radha', name: 'Radha Srinivasan', role: 'Co-Founder & VP Engineering', photo: 'assets/team-radha.jpg',
      linkedin: 'https://www.linkedin.com/in/srinivasradha/',
      bio: 'Radha is a co-founder of CaretEDA focused on AI, cloud workflows, and open-source tools for chip design. She spent almost 20 years at Synopsys across platform engineering, AI, and Silicon Lifecycle Management.',
      more: 'Her technical range spans distributed systems, cloud orchestration, and autonomous design agents. She is an IEEE Senior Member and has chaired the Technical Program Committee for IEEE WINTECHCON.',
    },
    {
      id: 'surajprakash', name: 'Surajprakash Ankush', role: 'Co-Founder & Chief Architect', photo: 'assets/team-surajprakash.jpg',
      linkedin: 'https://www.linkedin.com/in/surajprakash-ankush-02aa0829/',
      bio: 'Surajprakash brings 14 years of engineering experience, specialising in AI-native systems, cloud architecture (Azure & AWS), and DevOps. He has led multiple projects end-to-end with a strong startup mindset.',
      more: 'Deep expertise in Java and Python, Kubernetes/Docker orchestration, and datastores including PostgreSQL, Elasticsearch, and Redis. He combines AI-driven tools with robust cloud infrastructure.',
    },
  ];

  readonly advisors: Person[] = [
    { id: 'nithya', name: 'Nithya Raghavan', role: 'Technical Advisor', photo: 'assets/team-nithya.webp', linkedin: 'https://www.linkedin.com/in/nithyaraghavan/' },
    { id: 'sridhar', name: 'Sridhar Narayanan', role: 'Technical Advisor', photo: 'assets/team-sridhar.jpg', linkedin: 'https://www.linkedin.com/in/sridhar-narayanan-53517b1/' },
  ];
}
