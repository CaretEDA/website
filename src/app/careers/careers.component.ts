import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="chapter">
      <div class="careers-grid">
        <div class="head">
          <h2>Careers</h2>
          <p>We're here to prove that bright minds with shared purpose can reshape entire industries.</p>
        </div>

        <div>
          <div class="careers-body">
            <p>
              Semiconductors are becoming the foundation of every major technological leap, from AI to energy to autonomy.
              The chip design community is at a rare inflection point: decades of incremental progress are giving way to
              AI-native workflows, open ecosystems, and open-source EDA that has matured across simulation, logic synthesis,
              physical design and verification.
            </p>
            <p>
              The next step in productivity won't come from isolated tools. It will come from end-to-end, AI-first design
              systems that learn your flow, protect your IP, scale with your team, and shorten the path from idea to silicon.
              That belief is why CaretEDA exists.
            </p>
            <p>
              We are an agentic-first organization, bringing agentic AI to EDA, and we measure success by how many customers
              we make successful. If no open role fits but you believe you can contribute, send your resume with a note to
              <a href="mailto:careers@careteda.com" class="text-link">careers&#64;careteda.com</a>.
            </p>
          </div>

          <a class="role-card lift" [routerLink]="['/careers', 'senior-hardware-engineer']">
            <div>
              <h3>Senior Hardware Design &amp; Verification Engineer</h3>
              <p class="micro">Bengaluru, India</p>
              <div class="tags"><span>Customer-facing</span><span>RTL + simulation</span><span>AI-assisted EDA</span></div>
            </div>
            <span class="action primary shrink-0">View role <span class="arrow" aria-hidden="true">→</span></span>
          </a>
        </div>
      </div>
    </section>
  `
})
export class CareersComponent {
}
