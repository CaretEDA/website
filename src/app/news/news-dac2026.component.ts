import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news-dac2026',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="min-h-screen bg-black text-white pt-28 pb-32 px-4 md:px-8">
      <article class="max-w-[820px] mx-auto">

        <a [routerLink]="['/news']" class="inline-flex items-center gap-2 text-[#2563EB] text-sm font-semibold hover:underline no-underline mb-10">
          ← Back to News
        </a>

        <p class="text-[#2563EB] text-xs uppercase tracking-widest font-semibold mb-3">For Immediate Release · July 24, 2026</p>
        <h1 class="text-3xl md:text-5xl font-bold leading-tight mb-5 pb-2 bg-gradient-to-tr from-white to-[#2563EB] bg-clip-text text-transparent">
          CaretEDA Announces Commercially Available End-to-End Opensource EDA Stack, and Launches Startup Program
        </h1>
        <p class="text-white/70 text-base md:text-lg italic leading-relaxed mb-10">
          2026.08 Release Delivers the Opensource EDA Stack Spanning Simulation, Logic Synthesis, Formal Verification, and Physical Synthesis; New Startup Program Opens CaretEDA&#8217;s Opensource EDA Stack and Agentic Modules to Early-Stage Chip Design Companies
        </p>

        <p class="text-white/90 text-base leading-relaxed mb-6">
          <span class="font-semibold">CAMPBELL, CA AND BENGALURU, INDIA</span> &#8212; CaretEDA, Inc., the AI-native Electronic Design Automation company pioneering the Spec-to-Netlist&#8482; platform for agentic chip design automation, today announced three major milestones ahead of the 63rd Design Automation Conference (DAC 2026), taking place July 26&#8211;29 at the Long Beach Convention Center in Long Beach, California: a featured presentation at the Microsoft booth, the upcoming 2026.08 release &#8212; delivering a commercially available Opensource EDA stack covering simulation, logic synthesis, formal verification, and physical synthesis &#8212; and the launch of the CaretEDA Startup Program for early-stage semiconductor companies.
        </p>

        <blockquote class="border-l-2 border-[#2563EB] pl-5 my-8 text-white/85 text-base md:text-lg italic leading-relaxed">
          &#8220;DAC is where the chip design community comes together, and this year we arrive with our most significant release yet. With 2026.08, engineering teams get a commercially available Opensource EDA stack &#8212; spanning simulation, logic synthesis, formal verification, and physical synthesis &#8212; in a single agentic-ready platform. And with our new Startup Program, we are making that same foundation accessible to the next generation of silicon innovators.&#8221;
          <span class="block mt-3 not-italic text-[#2563EB] text-sm font-semibold">&#8212; Sashi Obilisetty, Co-founder and CEO, CaretEDA, Inc.</span>
        </blockquote>

        <h2 class="text-white font-bold text-xl md:text-2xl mt-12 mb-4">Company Presentation at the Microsoft Booth on Tuesday, July 28 at 11:30 AM</h2>
        <p class="text-white/90 text-base leading-relaxed mb-4">
          CaretEDA will deliver a featured presentation at the Microsoft booth on Tuesday, July 28 at 11:30 AM, showcasing how the Spec-to-Netlist&#8482; platform and its library of Agentic Building Blocks (ABBs) bring agentic AI to production chip design flows. The presentation will also cover CaretEDA&#8217;s integration with the Microsoft Discovery Platform. Attendees will see live demonstrations of agentic workflows and learn how design teams can combine Opensource and third-party commercial tools within a single agentic workflow.
        </p>
        <p class="text-white/90 text-base leading-relaxed mb-4">
          Attendees are encouraged to visit www.CaretEDA.com to schedule a meeting with the CaretEDA team during the conference.
        </p>

        <h2 class="text-white font-bold text-xl md:text-2xl mt-12 mb-4">The Opensource EDA Stack in 2026.08 Release</h2>
        <p class="text-white/90 text-base leading-relaxed mb-4">
          The centerpiece of CaretEDA&#8217;s announcements is the 2026.08 release, which for the first time delivers a complete, commercially available Opensource EDA stack within the Spec-to-Netlist&#8482; platform, spanning:
        </p>
        <ul class="list-disc list-outside ml-6 text-white/90 text-base leading-relaxed mb-4 space-y-2">
          <li><strong>Simulation</strong> &#8212; fast, standards-based functional simulation powered by Verilator and integrated directly into agentic verification flows;</li>
          <li><strong>Logic Synthesis</strong> &#8212; quality-of-results-driven synthesis built on Yosys and tightly coupled with the platform&#8217;s agentic optimization loops;</li>
          <li><strong>Formal Verification</strong> &#8212; functional property verification built on SymbiYosys, with agentic flows that assist in property generation and proof closure; and</li>
          <li><strong>Physical Synthesis</strong> &#8212; physically aware implementation powered by OpenROAD that carries designs from RTL toward tape-out-ready netlists.</li>
        </ul>
        <p class="text-white/90 text-base leading-relaxed mb-4">
          With all four stages available within a single platform, engineering teams can run end-to-end flows using CaretEDA&#8217;s own agentic modules or third-party agentic solutions &#8212; without taking on the burden of downloading, building, and maintaining Opensource packages themselves. CaretEDA&#8217;s commercial support for Opensource EDA makes a compelling case for companies looking to leverage Opensource and commercial EDA tools together. The 2026.08 release will be generally available in August 2026.
        </p>

        <h2 class="text-white font-bold text-xl md:text-2xl mt-12 mb-4">The CaretEDA Startup Program</h2>
        <p class="text-white/90 text-base leading-relaxed mb-4">
          CaretEDA also announced the CaretEDA Startup Program, designed to put professional-grade, agentic EDA infrastructure within reach of early-stage chip design companies. Qualifying startups will receive:
        </p>
        <ul class="list-disc list-outside ml-6 text-white/90 text-base leading-relaxed mb-4 space-y-2">
          <li>Full access to CaretEDA&#8217;s commercially supported Opensource EDA stack; and</li>
          <li>A 90-day evaluation license for CaretEDA&#8217;s agentic modules, including its library of Agentic Building Blocks (ABBs).</li>
        </ul>
        <p class="text-white/90 text-base leading-relaxed mb-4">
          The program is open to early-stage semiconductor companies that meet the program&#8217;s eligibility criteria. Interested startups can <a [routerLink]="['/startup-program']" class="text-[#2563EB] font-bold hover:underline">apply here</a>.
        </p>



        <h2 class="text-white font-bold text-lg md:text-xl mb-3">About CaretEDA</h2>
        <p class="text-white/80 text-base leading-relaxed mb-6">
          CaretEDA builds AI-native design systems for modern semiconductor teams, with its Spec-to-Netlist&#8482; platform serving as a powerful force multiplier across the entire engineering workflow. CaretEDA&#8217;s commercially supported Opensource EDA stack makes it seamless for chip design teams to combine Opensource EDA tools with third-party commercial tools within a single agentic workflow. The platform also ships with an extensive library of Agentic Building Blocks: pre-built, composable agents purpose-built for the rigor and complexity of chip design.
        </p>
        <p class="text-white/50 text-xs leading-relaxed mb-10">
          <strong>Trademarks</strong><br>
          CaretEDA and Spec-to-Netlist are trademarks of CaretEDA, Inc. Verilator, Yosys, SymbiYosys, OpenROAD, and Microsoft are trademarks or registered trademarks of their respective owners. All other trademarks and registered trademarks referenced herein are the property of their respective owners. Use of these names does not imply any affiliation with or endorsement by their respective owners.
        </p>

        <p class="text-white/70 text-sm leading-relaxed mt-10">
          <span class="font-semibold text-white/90">Media contact</span><br>
          Sashi Obilisetty, Co-founder &amp; CEO, <a href="mailto:sashi@careteda.com" class="text-[#2563EB] hover:underline">sashi&#64;careteda.com</a><br><br>
          Request a demo at <a href="https://www.careteda.com" target="_blank" rel="noopener noreferrer" class="text-[#2563EB] hover:underline">www.CaretEDA.com</a>
        </p>

      </article>
    </section>
  `
})
export class NewsDac2026Component implements OnInit {
  ngOnInit() { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }
}
