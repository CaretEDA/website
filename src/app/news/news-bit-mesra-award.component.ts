import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news-bit-mesra-award',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="min-h-screen bg-black text-white pt-28 pb-32 px-4 md:px-8">
      <article class="max-w-[820px] mx-auto">

        <a [routerLink]="['/news']" class="inline-flex items-center gap-2 text-[#2563EB] text-sm font-semibold hover:underline no-underline mb-10">
          ← Back to News
        </a>

        <p class="text-[#2563EB] text-xs uppercase tracking-widest font-semibold mb-3">For Immediate Release · August 31, 2026</p>
        <h1 class="text-3xl md:text-5xl font-bold leading-tight mb-5 pb-2 bg-gradient-to-tr from-white to-[#2563EB] bg-clip-text text-transparent">
          CaretEDA Co-Founder and CEO Sashi Obilisetty Receives BIT Mesra Distinguished Alumna Award 2026
        </h1>
        <p class="text-white/70 text-base md:text-lg italic leading-relaxed mb-10">
          Electronics and Communication Engineering alumna honored for contributions to engineering, technology and entrepreneurship
        </p>

        <div class="flex items-center gap-4 mb-10">
          <img src="assets/sashi-bit-mesra-award.jpg" alt="Sashi Obilisetty"
               class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top border-2 border-[#2563EB]/40 flex-shrink-0">
          <div>
            <p class="text-white font-bold text-lg md:text-xl">Sashi Obilisetty</p>
            <p class="text-[#2563EB] text-xs uppercase tracking-widest font-semibold">Co-founder &amp; CEO, CaretEDA, Inc.</p>
          </div>
        </div>

        <p class="text-white/90 text-base leading-relaxed mb-6">
          <span class="font-semibold">CAMPBELL, CA</span> &#8212; CaretEDA, Inc., the AI-native Electronic Design Automation company pioneering the Spec-to-Netlist&#8482; platform for agentic chip design automation, today announced that Co-founder and CEO Sashi Obilisetty has received the Birla Institute of Technology (BIT), Mesra Distinguished Alumna Award 2026 for Contributions to Engineering, Technology and Entrepreneurship.
        </p>

        <p class="text-white/90 text-base leading-relaxed mb-6">
          The award was presented during BIT Mesra's 72nd Foundation Day celebration on July 15, 2026. Obilisetty, a 1990 graduate in Electronics and Communication Engineering, was recognized for a career spanning semiconductor design, electronic design automation (EDA), artificial intelligence and entrepreneurship.
        </p>

        <blockquote class="border-l-2 border-[#2563EB] pl-5 my-8 text-white/85 text-base md:text-lg italic leading-relaxed">
          &#8220;To be recognized by BIT Mesra is both humbling and energizing. The semiconductor industry is entering an extraordinary new era, and I hope this award encourages more students and alumni to pursue ambitious ideas, build enduring companies and expand what technology can make possible. I wholeheartedly share it with the teachers, classmates, colleagues and teams who have shaped my work,&#8221;
          <span class="block mt-3 not-italic text-[#2563EB] text-sm font-semibold">&#8212; Sashi Obilisetty, Co-founder &amp; CEO, CaretEDA, Inc.</span>
        </blockquote>

        <h2 class="text-white font-bold text-lg md:text-xl mb-3 mt-10">A Career Advancing Semiconductor Design and EDA</h2>
        <p class="text-white/90 text-base leading-relaxed mb-4">
          Obilisetty has built a longstanding career at the forefront of the semiconductor and EDA ecosystem, leading technologies and teams through major shifts in design, verification and artificial intelligence. Before co-founding CaretEDA, she held senior technology and research-and-development leadership roles at Synopsys and served as Chief Architect for Silicon Solutions at Google Cloud. Earlier in her career, she founded two EDA startups focused on verification technology: DualSoft and VeriEZ Solutions.
        </p>
        <p class="text-white/90 text-base leading-relaxed mb-4">
          Her work has spanned design, verification, post-silicon systems and the application of AI to semiconductor engineering. She received the Marie R. Pistilli Women in EDA Achievement Award in 2024.
        </p>

        <h2 class="text-white font-bold text-lg md:text-xl mb-3 mt-10">Recognition at BIT Mesra's 72nd Foundation Day</h2>
        <p class="text-white/90 text-base leading-relaxed mb-4">
          BIT Mesra's 2026 Distinguished Alumni Awards recognized multiple noteworthy recipients whose achievements span leadership, teaching and research, service to society, and contributions to engineering, technology and entrepreneurship. Obilisetty was honored in the Distinguished Alumna category for Contributions to Engineering, Technology and Entrepreneurship.
        </p>
        <p class="text-white/90 text-base leading-relaxed mb-6">
          The Foundation Day program brought together institutional leaders, faculty members, students, alumni and distinguished guests. It also highlighted BIT Mesra's plans for an NVIDIA-powered Centre of Excellence supporting advanced computing, AI research, VLSI, semiconductor technologies and interdisciplinary collaboration.
        </p>

        <blockquote class="border-l-2 border-[#2563EB] pl-5 my-8 text-white/85 text-base md:text-lg italic leading-relaxed">
          &#8220;The Distinguished Alumna Award recognizes not only professional achievement but also the values an alumna carries into the world. Sashi&#8217;s career reflects the curiosity, rigor, and pioneering spirit that BIT Mesra seeks to cultivate in every student,&#8221;
          <span class="block mt-3 not-italic text-[#2563EB] text-sm font-semibold">&#8212; Dr. Shradha Shivani, Dean, Alumni &amp; International Relations, and Professor, Department of Management Studies</span>
        </blockquote>

        <h2 class="text-white font-bold text-lg md:text-xl mb-3 mt-10">About Sashi Obilisetty</h2>
        <p class="text-white/90 text-base leading-relaxed mb-6">
          Sashi Obilisetty is Co-founder and CEO of CaretEDA, Inc. and an EDA technologist and entrepreneur with extensive experience in semiconductor design and verification. Her career has spanned successive generations of EDA technology, from verification startups to cloud silicon solutions and AI-native chip design. She previously held senior roles at Synopsys and Google Cloud, founded DualSoft and VeriEZ Solutions, and holds multiple patents in EDA and AI. Obilisetty earned a bachelor's degree in Electronics and Communication Engineering from BIT Mesra and a master's degree in Computer Engineering from the University of Massachusetts Amherst.
        </p>

        <h2 class="text-white font-bold text-lg md:text-xl mb-3">About CaretEDA</h2>
        <p class="text-white/80 text-base leading-relaxed mb-6">
          CaretEDA builds AI-native design systems for modern semiconductor teams, with its Spec-to-Netlist&#8482; platform serving as a force multiplier across the engineering workflow. CaretEDA's commercially supported open-source EDA stack enables chip design teams to combine open-source tools with third-party commercial tools in a single agentic workflow. The platform also provides Agentic Building Blocks: pre-built, composable agents created for the rigor and complexity of chip design.
        </p>

        <h2 class="text-white font-bold text-lg md:text-xl mb-3">About Birla Institute of Technology, Mesra</h2>
        <p class="text-white/80 text-base leading-relaxed mb-6">
          Established in 1955, Birla Institute of Technology, Mesra is an Indian institution for engineering, technology, science, management and applied research. Its Distinguished Alumni Awards recognize graduates whose work reflects excellence and service across industry, academia, research, entrepreneurship and society.
        </p>

        <p class="text-white/70 text-sm leading-relaxed">
          <span class="font-semibold text-white/90">Media contact:</span> Sashi Obilisetty, Co-founder &amp; CEO, CaretEDA, Inc. &#183;
          <a href="mailto:sashi@careteda.com" class="text-[#2563EB] hover:underline">sashi&#64;careteda.com</a><br>
          Request a demo at
          <a href="https://www.careteda.com" target="_blank" rel="noopener noreferrer" class="text-[#2563EB] hover:underline">www.CaretEDA.com</a>
        </p>

      </article>
    </section>
  `
})
export class NewsBitMesraAwardComponent implements OnInit {
  ngOnInit() { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }
}