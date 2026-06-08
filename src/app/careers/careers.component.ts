import { Component } from '@angular/core';
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
        <p class="text-white/60 text-base md:text-xl mb-16 max-w-[600px] mx-auto leading-relaxed">
          We're here to prove that bright minds with shared purpose can reshape entire industries.
        </p>

        <!-- Job card -->
        <div class="bg-[#0f1a30]/40 border border-[#2563EB]/10 rounded-2xl p-6 md:p-10 text-left transition-all duration-300 hover:border-[#2563EB]/30 hover:bg-[#0f1a30]/60 backdrop-blur-sm mb-8">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 class="text-white font-bold text-xl md:text-2xl mb-2">Senior Hardware Design & Verification Engineer</h3>
              <p class="text-[#2563EB] text-sm font-medium">Bengaluru, India</p>
            </div>
            <a href="mailto:info@careteda.com?subject=Senior Hardware Design and Verification Engineer Application"
               class="inline-block bg-[#2563EB] text-white text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-full no-underline transition-all duration-300 hover:bg-[#1D4ED8] whitespace-nowrap flex-shrink-0">
              Apply Now →
            </a>
          </div>
          <div class="flex flex-wrap gap-2 mb-6">
            <span class="bg-[#2563EB]/8 border border-[#2563EB]/20 text-[#2563EB] text-xs font-semibold px-3 py-1 rounded-full">Customer-Facing</span>
            <span class="bg-[#2563EB]/8 border border-[#2563EB]/20 text-[#2563EB] text-xs font-semibold px-3 py-1 rounded-full">RTL + Simulation</span>
            <span class="bg-[#2563EB]/8 border border-[#2563EB]/20 text-[#2563EB] text-xs font-semibold px-3 py-1 rounded-full">AI-Assisted EDA</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Work directly with semiconductor engineering teams to evaluate and integrate CaretEDA's Spec-to-Netlist™ flow. You'll combine deep hardware design knowledge with hands-on experience in AI-assisted tools to help customers achieve dramatic compression in their tapeout cycles.
          </p>
        </div>

        <div class="bg-[#0f1a30]/40 border border-white/5 rounded-2xl p-8 text-center">
          <p class="text-white/50 text-sm mb-4">Don't see the right role? We're always looking for exceptional talent.</p>
          <a href="mailto:info@careteda.com?subject=General Career Enquiry"
             class="inline-flex items-center gap-2 text-[#2563EB] text-sm font-semibold no-underline hover:underline">
            Send us your profile →
          </a>
        </div>

      </div>
    </section>
  `
})
export class CareersComponent {}
