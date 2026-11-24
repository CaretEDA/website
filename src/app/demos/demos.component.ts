import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="chapter">
      <div>
        <div class="head">
          <h2>Demos</h2>
          <p>Watch Spec-to-Netlist™ in motion, from design intent to silicon-ready output.</p>
        </div>

        <ol class="demo-list">
          <li *ngFor="let demo of demos">
            <h3>{{ demo.title }}</h3>
            <p>{{ demo.desc }}</p>
            <span class="micro tabular">{{ demo.length }} · Coming soon</span>
          </li>
        </ol>

        <div class="demo-cta">
          <div>
            <h3>Want a personalised demo?</h3>
            <p>Book a live session with our engineering team and see Spec-to-Netlist™ applied to your design workload.</p>
          </div>
          <a href="mailto:info@careteda.com?subject=Demo Request" class="action primary shrink-0">Request a demo <span class="arrow" aria-hidden="true"></span></a>
        </div>
      </div>
    </section>
  `
})
export class DemosComponent {
  demos = [
    { length: '2 min', title: 'Spec to RTL in minutes', desc: 'Watch how a natural-language design spec becomes synthesisable RTL through the Spec-to-Netlist™ flow.' },
    { length: '3 min', title: 'AI-assisted verification loop', desc: 'See the autonomous verification agent catch and close functional bugs across a real design iteration cycle.' },
    { length: '2 min', title: 'Open-source tool integration', desc: 'A walkthrough of Verilator, OpenROAD, and other open-source tools running inside a unified CaretEDA cloud flow.' },
    { length: '4 min', title: 'Netlist optimisation pass', desc: 'See the AI agent iterate over timing closure constraints and produce a clean, synthesis-ready netlist automatically.' },
    { length: '3 min', title: 'Multi-tool orchestration', desc: 'CaretEDA orchestrating Yosys, Verilator, and OpenROAD in a single automated pipeline with real-time progress tracking.' },
    { length: '2 min', title: 'Natural language to constraints', desc: 'Convert a plain-English timing and power specification into SDC constraints ready for synthesis.' },
  ];
}
