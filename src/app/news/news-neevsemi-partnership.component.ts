import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news-neevsemi-partnership',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="min-h-screen text-ink pt-28 pb-32 px-4 md:px-8">
      <article class="max-w-[820px] mx-auto">
        <a [routerLink]="['/news']" class="inline-flex items-center gap-2 text-accent-ink text-sm font-medium hover:underline no-underline mb-10"><span class="arrow-back" aria-hidden="true"></span> Back to News</a>
        <p class="text-ink-3 text-xs font-medium mb-3">For immediate release &middot; September 8, 2026</p>
        <h1 class="text-3xl md:text-5xl font-medium leading-tight mb-5 pb-2 text-ink">CaretEDA Announces 2026.08 Release and NeevSemi Partnership</h1>
        <p class="text-ink-3 text-base md:text-lg leading-relaxed mb-10">New capabilities added to Spec-to-Netlist&trade; platform; OpenROAD physical synthesis tool suite now available as part of open-source EDA stack</p>

        <p class="text-ink-2 text-base leading-relaxed mb-6"><span class="font-medium">CAMPBELL, CA AND BENGALURU, INDIA</span> &mdash; CaretEDA today announced immediate availability of the CaretEDA 2026.08 release, the company's second release following its first release in May 2026. The release advances CaretEDA's mission to make agentic chip design practical for engineering teams by bringing several new functionalities in its flagship Spec-to-Netlist&trade; platform and an improved open-source EDA stack that includes Version 5.050 of Verilator and Version 26Q3 of OpenROAD.</p>

        <h2 class="text-ink font-medium text-xl md:text-2xl mt-12 mb-4">The 2026.08 Release</h2>
        <p class="text-ink-2 text-base leading-relaxed mb-4">The 2026.08 release focuses on three areas:</p>
        <ul class="list-disc list-outside ml-6 text-ink-2 text-base leading-relaxed mb-6 space-y-2">
          <li>Expanded capabilities in its flagship Spec-to-Netlist platform, helping teams move from intent to implementation with results that can stand up to engineering review.</li>
          <li>Verilator Version 5.050 in CaretEDA's open-source EDA stack, continuing CaretEDA's commitment to commercially support open-source infrastructure for chip design.</li>
          <li>OpenROAD availability in CaretEDA's EDA stack, extending the foundation for future physical design workflows in agentic chip design.</li>
        </ul>
        <p class="text-ink-2 text-base leading-relaxed mb-6">CaretEDA's agentic-first approach is built on a simple operating principle: agents become useful when they can work with explicit goals, the right context, real tools, and evidence that engineers can inspect. The company is building workflows where agents can help carry chip design tasks forward while keeping human engineering judgment at the center of decisions that matter.</p>

        <h2 class="text-ink font-medium text-xl md:text-2xl mt-12 mb-4">NeevSemi Joins the CaretEDA Ecosystem</h2>
        <p class="text-ink-2 text-base leading-relaxed mb-6">CaretEDA also announced that NeevSemi has joined the CaretEDA ecosystem as a preferred partner. The companies will work together to extend semiconductor engineering expertise, giving customers and other ecosystem participants opportunities to explore agentic workflows, open-source EDA, and new ways to move from specification toward implementation.</p>
        <blockquote class="border-l-2 border-accent pl-5 my-8 text-ink-2 text-base md:text-lg italic leading-relaxed">&ldquo;2026.08 is an important milestone for CaretEDA. It is our second release since May, and it reflects the way we want to build: agentic-first, grounded in engineering correctness, and connected to the open-source tools that semiconductor teams can inspect, extend, and trust. I am also delighted to welcome NeevSemi as a preferred partner in the CaretEDA ecosystem as we work with customers and builders who are ready to rethink how chip design gets done.&rdquo;<span class="block mt-3 not-italic text-accent-ink text-sm font-medium">&mdash; Sashi Obilisetty, Co-founder and CEO, CaretEDA</span></blockquote>
        <p class="text-ink-2 text-base leading-relaxed mb-6">NeevSemi will be at SEMICON India 2026, taking place September 17&ndash;19, 2026, at Yashobhoomi in New Delhi, where the company will exhibit in the Startup Pavilion. CaretEDA and NeevSemi invite semiconductor companies, engineering leaders, researchers, and technologists attending the event to connect with the NeevSemi and CaretEDA teams and discuss the next generation of chip design workflows.</p>
        <p class="text-ink-2 text-base leading-relaxed mb-10">Companies interested in learning more about CaretEDA 2026.08, including CaretEDA's commercially supported open-source EDA stack, or the CaretEDA Startup Program can visit <a href="https://careteda.com" target="_blank" rel="noopener noreferrer" class="text-accent-ink font-medium hover:underline">careteda.com</a>.</p>

        <h2 class="text-ink font-medium text-lg md:text-xl mb-3">About CaretEDA</h2>
        <p class="text-ink-2 text-base leading-relaxed mb-8">CaretEDA builds AI-native design systems for modern semiconductor teams, with its Spec-to-Netlist&trade; platform serving as a powerful force multiplier across the entire engineering workflow. CaretEDA's commercially supported open-source EDA stack makes it seamless for chip design teams to combine open-source EDA tools with third-party commercial tools within a single agentic workflow. The platform also ships with an extensive library of Agentic Building Blocks: pre-built, composable agents purpose-built for the rigor and complexity of chip design.</p>
        <h2 class="text-ink font-medium text-lg md:text-xl mb-3">About NeevSemi</h2>
        <p class="text-ink-2 text-base leading-relaxed mb-8">NeevSemi is a semiconductor engineering company and preferred partner in the CaretEDA ecosystem. NeevSemi works with semiconductor teams exploring practical ways to build, verify, and advance chip design workflows. For more information, visit <a href="https://www.neevsemi.com" target="_blank" rel="noopener noreferrer" class="text-accent-ink font-medium hover:underline">neevsemi.com</a>.</p>
        <p class="text-ink-3 text-xs leading-relaxed mb-10"><strong>Trademarks</strong><br>CaretEDA and Spec-to-Netlist are trademarks of CaretEDA, Inc. All other trademarks and registered trademarks referenced herein are the property of their respective owners. Use of these names does not imply any affiliation with or endorsement by their respective owners.</p>
        <p class="text-ink-3 text-sm leading-relaxed"><span class="font-medium text-ink-2">Media contact</span><br>Sashi Obilisetty, CEO, <a href="mailto:sashi@careteda.com" class="text-accent-ink hover:underline">sashi&#64;careteda.com</a><br><br>Request a demo at <a href="https://www.careteda.com" target="_blank" rel="noopener noreferrer" class="text-accent-ink hover:underline">www.CaretEDA.com</a></p>
      </article>
    </section>
  `
})
export class NewsNeevsemiPartnershipComponent implements OnInit {
  ngOnInit() { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }
}
