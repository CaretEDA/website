import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-careers-detail',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="job">
      <div class="job-wrap">
        <a [routerLink]="['/']" fragment="careers" class="back-link"><span class="arrow-back" aria-hidden="true"></span> Back to careers</a>

        <header class="job-head">
          <div>
            <h1>Senior Hardware Design &amp; Verification Engineer</h1>
            <p class="micro">Bengaluru, India</p>
            <div class="tags"><span>Customer-facing</span><span>RTL + simulation</span><span>AI-assisted EDA</span></div>
          </div>
          <a class="action primary shrink-0" [href]="applyHref">Apply now <span class="arrow" aria-hidden="true"></span></a>
        </header>

        <section class="job-section">
          <h2>About the company</h2>
          <div class="job-prose">
            <p>Semiconductors are becoming the foundation of every major technological leap, from AI to energy to autonomy. The chip design community is at a rare inflection point: decades of incremental progress are giving way to AI-native workflows, open ecosystems, and open-source EDA that has matured across simulation, logic synthesis, physical design and verification.</p>
            <p>The next step in productivity won't come from isolated tools. It will come from end-to-end, AI-first design systems that learn your flow, protect your IP, scale with your team, and shorten the path from idea to silicon. That belief is why CaretEDA exists.</p>
            <p>We are an agentic-first organization, bringing agentic AI to EDA. We are 100% hands-on, and we measure success by how many customers we make successful.</p>
          </div>
        </section>

        <section class="job-section">
          <h2>About the role</h2>
          <div class="job-prose">
            <p>CaretEDA is seeking Senior Hardware Design &amp; Verification Engineers in Bengaluru who will work directly with customers adopting our Spec-to-Netlist™ AI-native design platform.</p>
            <p>This role blends deep technical understanding (RTL, simulation, chip development) with customer-facing clarity, helping engineering teams integrate, validate, and scale AI-assisted design workflows inside their existing environments.</p>
            <p>You will collaborate with global engineering, product, and customer teams to ensure smooth deployments, build reproducible debug scenarios, and help customers get the most out of CaretEDA's multi-agent, AI-driven design flows.</p>
          </div>
        </section>

        <section class="job-section">
          <h2>Key responsibilities</h2>
          <div class="job-groups">
            @for (g of responsibilities; track g.title) {
              <div>
                <h3>{{ g.title }}</h3>
                <ul class="job-list">@for (item of g.items; track item) { <li>{{ item }}</li> }</ul>
              </div>
            }
          </div>
        </section>

        <section class="job-section job-quals">
          <div>
            <h2>Required qualifications</h2>
            <ul class="job-list">@for (item of required; track item) { <li>{{ item }}</li> }</ul>
          </div>
          <div>
            <h2>Preferred qualifications</h2>
            <ul class="job-list">@for (item of preferred; track item) { <li>{{ item }}</li> }</ul>
          </div>
        </section>

        <div class="job-cta">
          <p>Ready to make a real impact in the semiconductor industry?</p>
          <a class="action primary" [href]="applyHref">Send your resume to careers&#64;careteda.com</a>
        </div>
      </div>
    </section>
  `
})
export class CareersDetailComponent implements OnInit {
  readonly applyHref = 'mailto:careers@careteda.com?subject=Application%20-%20Senior%20Hardware%20Design%20%26%20Verification%20Engineer';

  readonly responsibilities = [
    { title: 'Customer deployment & technical guidance', items: [
      'Work closely with customer design and DV teams to integrate Spec-to-Netlist™ into their existing flows.',
      'Understand customer architecture specs, RTL conventions, verification environments, and toolchains.',
      'Help customers structure their inputs (specs, constraints, design intent) for optimal AI-assisted generation.',
      'Provide hands-on support during onboarding, pilot projects, and production rollouts.',
    ] },
    { title: 'Simulation & debug expertise', items: [
      'Reproduce customer issues using event-driven/cycle-based simulators and synthesis tools.',
      'Build minimal, shareable testcases to isolate tool behavior or AI-generated RTL issues.',
      'Analyze waveforms, debug corner cases, and validate correctness of tool behavior.',
    ] },
    { title: 'Champion AI-assisted EDA workflows', items: [
      'Use AI-based tools to accelerate RTL review, testbench generation, debug and root-cause analysis, and coverage exploration.',
      'Provide structured feedback to improve AI-assisted flows and automation quality.',
    ] },
    { title: 'Open-source ecosystem fluency', items: [
      'Navigate and understand large public SystemVerilog codebases such as OpenTitan, Ibex, SweRV, etc.',
      'Build clean, shareable debug environments.',
    ] },
    { title: 'Customer collaboration & communication', items: [
      'Work directly with customers to understand their design and verification challenges.',
      'Provide clear, structured guidance and help them adopt AI-assisted workflows.',
      'Communicate technical findings effectively to both engineers and managers.',
    ] },
  ];

  readonly required = [
    'BTech / MTech / MS in EE, CE, CS or related field.',
    '5–10 years of experience in RTL design, simulation, or mixed design-DV roles.',
    'Strong SystemVerilog skills (design + testbench familiarity).',
    'Hands-on experience with at least one major commercial simulator.',
    'Solid understanding of the full chip development process.',
    'Excellent communication skills and ability to work with global teams.',
  ];

  readonly preferred = [
    'Experience with RISC-V or open-source silicon projects.',
    'Understanding of GenAI and agentic flows; hands-on experience a big advantage.',
    'Exposure to linting, synthesis, or formal verification.',
    'Experience with AI-assisted EDA tools or automation frameworks.',
    'Ability to create clean, reproducible testcases and debug environments.',
    'Prior customer-facing or cross-functional experience.',
  ];

  ngOnInit() { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }
}
