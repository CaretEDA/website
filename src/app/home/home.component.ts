import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../shared/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {
  expandedBios: { [key: string]: boolean } = {};

  demoPreviews = [
    { tag: 'Demo · 2 min', title: 'Spec to RTL in Minutes', desc: 'Watch how a natural-language design spec becomes synthesisable RTL through the Spec-to-Netlist™ flow.', delay: '0s' },
    { tag: 'Demo · 3 min', title: 'AI-Assisted Verification Loop', desc: 'See the autonomous verification agent catch and close functional bugs across a real design iteration cycle.', delay: '0.3s' },
    { tag: 'Demo · 2 min', title: 'Open-Source Tool Integration', desc: 'A walkthrough of Verilator, OpenROAD, and other open-source tools running inside a unified CaretEDA cloud flow.', delay: '0.6s' },
  ];

  constructor(
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.scrollService.pendingSection) {
      const section = this.scrollService.pendingSection;
      this.scrollService.pendingSection = null;
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }

  toggleBio(id: string) {
    this.expandedBios[id] = !this.expandedBios[id];
  }
}
