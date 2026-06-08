import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  expandedBios: { [key: string]: boolean } = {};

  demoPreviews = [
    { tag: 'Demo · 2 min', title: 'Spec to RTL in Minutes', desc: 'Watch how a natural-language design spec becomes synthesisable RTL through the Spec-to-Netlist™ flow.', delay: '0s' },
    { tag: 'Demo · 3 min', title: 'AI-Assisted Verification Loop', desc: 'See the autonomous verification agent catch and close functional bugs across a real design iteration cycle.', delay: '0.3s' },
    { tag: 'Demo · 2 min', title: 'Open-Source Tool Integration', desc: 'A walkthrough of Verilator, OpenROAD, and other open-source tools running inside a unified CaretEDA cloud flow.', delay: '0.6s' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleBio(id: string) {
    this.expandedBios[id] = !this.expandedBios[id];
  }
}
