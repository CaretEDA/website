import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="glow-bg min-h-screen bg-black text-white pt-28 pb-40 px-4 md:px-8">
      <div class="max-w-[1000px] mx-auto">

        <h1 class="text-4xl md:text-6xl font-bold mb-4 pb-2 bg-gradient-to-tr from-white to-[#2563EB] bg-clip-text text-transparent">News</h1>
        <p class="text-white/90 text-base md:text-lg mb-12">The latest announcements from CaretEDA.</p>

        <div class="flex flex-col gap-6">

          <!-- LinkedIn launch post (Feb 2026) -->
          <a *ngFor="let item of news"
             [href]="item.link" target="_blank" rel="noopener noreferrer"
             class="order-2 group block no-underline bg-[#0d1f3c] border border-[#2563EB]/50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-[#112244] hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)] backdrop-blur-sm">
            <p class="text-[#2563EB] text-xs uppercase tracking-widest font-semibold mb-3">{{ item.date }}</p>
            <h2 class="text-white font-bold text-lg md:text-2xl leading-snug mb-3 group-hover:text-[#2563EB] transition-colors duration-300">{{ item.title }}</h2>
            <p class="text-white/90 text-sm md:text-base leading-relaxed mb-4">{{ item.summary }}</p>
            <span class="inline-flex items-center gap-1.5 text-[#2563EB] text-xs font-bold uppercase tracking-widest">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Read on LinkedIn →
            </span>
          </a>

          <!-- Press release — new Technical Advisors (June 2026) -->
          <article class="order-1 bg-[#0d1f3c] border border-[#2563EB]/50 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
            <p class="text-[#2563EB] text-xs uppercase tracking-widest font-semibold mb-3">For Immediate Release · June 22, 2026</p>
            <h2 class="text-white font-bold text-xl md:text-3xl leading-snug mb-3">
              CaretEDA Adds Two Semiconductor Veterans to Technical Advisory Board
            </h2>
            <p class="text-white/70 text-sm md:text-base italic leading-relaxed mb-8">
              Nithya Raghavan and Sridhar Narayanan join as Technical Advisors, bringing deep EDA knowledge and extensive chip design expertise to CaretEDA&#8217;s agentic chip design platform.
            </p>

            <p class="text-white/90 text-sm md:text-base leading-relaxed mb-6">
              <span class="font-semibold">CAMPBELL, CA AND BENGALURU, INDIA</span> &#8212; CaretEDA, Inc., the AI-native Electronic Design Automation company pioneering the Spec-to-Netlist&#8482; platform for agentic chip design automation, today announced the appointment of Nithya Raghavan and Sridhar Narayanan to its Technical Advisory Board. Both advisors bring decades of hands-on experience spanning EDA tooling, hardware verification, and semiconductor design flows &#8212; expertise that directly reinforces CaretEDA&#8217;s mission to transform how engineering teams move from specification to verified silicon.
            </p>

            <!-- Collapsible body -->
            <div [class.hidden]="!prExpanded">

            <blockquote class="border-l-2 border-[#2563EB] pl-4 my-6 text-white/85 text-sm md:text-base italic leading-relaxed">
              &#8220;We are building the next generation of agentic EDA infrastructure, and having advisors who have been at the forefront of industry-defining technologies &#8212; from low-power simulation to formal verification standards &#8212; is invaluable. Nithya and Sridhar bring both technical depth and real-world deployment perspective that will accelerate CaretEDA&#8217;s product roadmap.&#8221;
              <span class="block mt-2 not-italic text-[#2563EB] text-xs font-semibold">&#8212; Sashi Obilisetty, Co-founder and CEO, CaretEDA, Inc.</span>
            </blockquote>

            <h3 class="text-white font-bold text-lg md:text-xl mt-8 mb-1">Nithya Raghavan</h3>
            <p class="text-[#2563EB] text-xs uppercase tracking-widest font-semibold mb-3">Technical Advisor, CaretEDA, Inc.</p>
            <p class="text-white/90 text-sm md:text-base leading-relaxed mb-4">
              Nithya Raghavan is a seasoned EDA and semiconductor engineering leader with over two decades of experience in hardware verification, low-power design, and applications engineering. She is currently on the advisory board for RELSYM Solutions, and an executive at SemiX, the academic center for semiconductor education and research in IIT Bombay.
            </p>
            <p class="text-white/90 text-sm md:text-base leading-relaxed mb-4">
              Previously, as Executive Director of Applications Engineering at Synopsys, Nithya led teams focused on hardware-assisted verification &#8212; spanning emulation and prototyping, and the full spectrum of low-power technologies including simulation, static analysis, and assertion-based verification. Prior to Synopsys, Nithya held product and application engineering roles at ArchPro Design Automation &#8212; an EDA startup &#8212; and chip design roles at Cisco Systems and Procket Networks, contributing to VLSI design and software development for high-performance networking platforms.
            </p>
            <p class="text-white/90 text-sm md:text-base leading-relaxed mb-4">
              Nithya holds a B.Tech in Electrical Engineering from IIT, Madras and a Master&#8217;s degree in Electrical and Computer Engineering from the University of California, Davis. As a Technical Advisor to CaretEDA, Nithya will provide strategic guidance on verification methodology integration within agentic design flows and LLM-driven EDA toolchains.
            </p>
            <blockquote class="border-l-2 border-[#2563EB] pl-4 my-6 text-white/85 text-sm md:text-base italic leading-relaxed">
              &#8220;The convergence of AI and EDA is redefining how chips are designed and verified. CaretEDA&#8217;s agentic approach to the Spec-to-Netlist&#8482; flow is exactly the kind of innovation the industry needs, and I look forward to contributing to that journey.&#8221;
              <span class="block mt-2 not-italic text-[#2563EB] text-xs font-semibold">&#8212; Nithya Raghavan</span>
            </blockquote>

            <h3 class="text-white font-bold text-lg md:text-xl mt-8 mb-1">Sridhar Narayanan</h3>
            <p class="text-[#2563EB] text-xs uppercase tracking-widest font-semibold mb-3">Technical Advisor, CaretEDA, Inc.</p>
            <p class="text-white/90 text-sm md:text-base leading-relaxed mb-4">
              Sridhar Narayanan is a seasoned semiconductor technologist, entrepreneur, and educator with deep roots in chip design and EDA. He was the founder of PwrLite, Inc., a startup focused on intelligent power optimization for ASICs and FPGAs that was acquired by Xilinx in 2009. The underlying technology was integrated into Xilinx&#8217;s Vivado&#8482; design suite &#8212; enabling automatic dynamic power reduction across its FPGA product families.
            </p>
            <p class="text-white/90 text-sm md:text-base leading-relaxed mb-4">
              Sridhar was with Apple for seven years, working on multiple generations of Apple SoCs for the iPhone, iPad and Apple Watch. Beyond his entrepreneurial track record, Sridhar brings a strong commitment to education and community. He serves as an Adjunct Professor in Electrical and Systems Engineering at the University of Southern California (USC) Viterbi School of Engineering, where he co-teaches a graduate-level course on VLSI design, helping shape the next generation of chip designers.
            </p>
            <p class="text-white/90 text-sm md:text-base leading-relaxed mb-4">
              At CaretEDA, Sridhar will advise on ASIC design flows, power optimization strategies, design-for-test methodologies and the integration of agentic AI toolchains into real-world semiconductor workflows. Sridhar has a B.Tech from the Indian Institute of Technology (IIT) Madras, and a Ph.D. in Computer Engineering from USC.
            </p>
            <blockquote class="border-l-2 border-[#2563EB] pl-4 my-6 text-white/85 text-sm md:text-base italic leading-relaxed">
              &#8220;Building PwrLite and seeing the technology get absorbed into Xilinx&#8217;s design flow taught me how transformative the right EDA innovation can be. CaretEDA is bringing that same level of foundational disruption to the full chip design flow with AI, and I&#8217;m excited to be part of that effort.&#8221;
              <span class="block mt-2 not-italic text-[#2563EB] text-xs font-semibold">&#8212; Sridhar Narayanan</span>
            </blockquote>

            <h3 class="text-white font-bold text-base md:text-lg mt-8 mb-2">About CaretEDA</h3>
            <p class="text-white/80 text-sm leading-relaxed mb-4">
              CaretEDA builds AI-native design systems for modern semiconductor teams, with its Spec-to-Netlist&#8482; platform serving as a powerful force multiplier across the entire engineering workflow. The platform also ships with an extensive library of Agentic Building Blocks (ABBs): pre-built, composable agents purpose-built for the rigor and complexity of chip design. ABBs enable chip design teams to deploy best-in-class agentic flows from day one. CaretEDA&#8217;s commercially supported open-source EDA stack makes it seamless for chip design teams to combine open-source EDA tools with third-party commercial tools within a single agentic workflow.
            </p>
            <p class="text-white/70 text-sm leading-relaxed">
              <span class="font-semibold text-white/90">Media contact:</span> Sashi Obilisetty, Co-founder &amp; CEO &#183;
              <a href="mailto:sashi@careteda.com" class="text-[#2563EB] hover:underline">sashi&#64;careteda.com</a><br>
              Request a demo at
              <a href="https://www.careteda.com" target="_blank" rel="noopener noreferrer" class="text-[#2563EB] hover:underline">www.CaretEDA.com</a>
            </p>

            </div>
            <!-- /Collapsible body -->

            <button type="button" (click)="prExpanded = !prExpanded"
                    class="mt-6 inline-flex items-center gap-1.5 text-[#2563EB] text-xs font-bold uppercase tracking-widest hover:text-[#1D4ED8] transition-colors">
              {{ prExpanded ? 'View Less' : 'View More' }}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-300" [class.rotate-180]="prExpanded" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </article>

        </div>

      </div>
    </section>
  `
})
export class NewsComponent implements OnInit {
  prExpanded = false;

  ngOnInit() { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }

  news: { date: string; title: string; summary: string; link?: string }[] = [
    {
      date: 'February 2026',
      title: 'Announcing the launch of CaretEDA',
      summary: 'Co-founder & CEO Sashi Obilisetty shares the vision behind CaretEDA — end-to-end, AI-first design systems that learn your flow, protect your IP, scale with your team, and continuously accelerate the path from idea to silicon.',
      link: 'https://www.linkedin.com/posts/sashi-obilisetty-009720_semiconductors-chipdesign-eda-share-7423916221449936896-aNY6/'
    }
  ];
}
