import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="min-h-screen bg-black text-white pt-28 pb-20 px-4 md:px-8">
      <div class="text-center w-full max-w-[900px] mx-auto">

        <div class="text-left mb-10">
          <a [routerLink]="['/']" class="inline-flex items-center gap-2 text-white/40 hover:text-[#2563EB] text-sm no-underline transition-colors">
            ← Back to Home
          </a>
        </div>

        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-tr from-white to-[#2563EB] bg-clip-text text-transparent">Careers</h1>
        <p class="text-white/70 text-base md:text-xl mb-16 max-w-[600px] mx-auto leading-relaxed">
          We're here to prove that bright minds with shared purpose can reshape entire industries.
        </p>

        <!-- Job card -->
        <div class="bg-[#0f1a30]/70 border border-[#2563EB]/25 rounded-2xl p-6 md:p-10 text-left transition-all duration-300 hover:border-[#2563EB]/50 hover:bg-[#0f1a30]/90 backdrop-blur-sm mb-8">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 class="text-white font-bold text-xl md:text-2xl mb-2">Senior Hardware Design &amp; Verification Engineer</h3>
              <p class="text-[#2563EB] text-sm font-medium">Bengaluru, India</p>
            </div>
            <a [routerLink]="['/careers', 'senior-hardware-engineer']"
               class="inline-flex items-center bg-[#2563EB] text-white text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-full no-underline transition-all duration-300 hover:bg-[#1D4ED8] whitespace-nowrap flex-shrink-0 cursor-pointer">
              View Role →
            </a>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold px-3 py-1 rounded-full">Customer-Facing</span>
            <span class="bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold px-3 py-1 rounded-full">RTL + Simulation</span>
            <span class="bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold px-3 py-1 rounded-full">AI-Assisted EDA</span>
          </div>
        </div>

        <div class="bg-[#0f1a30]/50 border border-white/15 rounded-2xl p-8 text-center">
          <p class="text-white/70 text-sm mb-4">Don't see the right role? We're always looking for exceptional talent.</p>
          <a href="mailto:careers@careteda.com?subject=General%20Career%20Enquiry"
             class="inline-flex items-center gap-2 text-[#2563EB] text-sm font-semibold no-underline hover:underline cursor-pointer">
            Send us your profile →
          </a>
        </div>

      </div>
    </section>
  `
})
export class CareersComponent implements OnInit {
  ngOnInit() { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }
}
