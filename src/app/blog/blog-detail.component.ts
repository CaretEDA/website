import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  body: string[];
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="min-h-screen bg-black text-white pt-28 pb-20 px-4 md:px-8">
      <div class="max-w-[800px] mx-auto" *ngIf="post">

        <a [routerLink]="['/blogs']" class="inline-flex items-center gap-2 text-white/40 hover:text-[#2563EB] text-sm no-underline transition-colors mb-12">
          ← All Articles
        </a>

        <p class="text-[#2563EB] text-xs uppercase tracking-widest font-semibold mb-4">{{ post.category }} · {{ post.date }} · {{ post.readTime }}</p>

        <h1 class="text-3xl md:text-5xl font-bold mb-8 text-white leading-tight">{{ post.title }}</h1>

        <p class="text-xl text-white/70 leading-relaxed mb-12 border-l-2 border-[#2563EB]/40 pl-6">{{ post.summary }}</p>

        <div class="space-y-6 text-gray-300 text-base leading-relaxed">
          <p *ngFor="let para of post.body">{{ para }}</p>
        </div>

        <div class="mt-16 pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <a [routerLink]="['/blogs']" class="inline-flex items-center gap-2 text-white/40 hover:text-[#2563EB] text-sm no-underline transition-colors">
            ← Back to Blog
          </a>
          <a href="mailto:info@careteda.com?subject=Demo Request"
             class="inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-full no-underline font-semibold text-sm transition-all duration-300 hover:bg-[#1D4ED8]">
            Request a Demo →
          </a>
        </div>

      </div>
    </section>
  `
})
export class BlogDetailComponent implements OnInit {
  post?: BlogPost;

  private posts: { [slug: string]: BlogPost } = {
    'verilator': {
      title: 'Verilator: The Open-Source Simulator Reshaping Chip Design',
      date: 'May 2026', readTime: '5 min read', category: 'Open Source & EDA',
      summary: 'How a tool born at Digital Equipment Corporation in 1994 ended up at the center of chip verification for Tesla, Google, AMD, and NVIDIA.',
      body: [
        'Verilator began as an internal utility at Digital Equipment Corporation in 1994. Wilson Snyder, its creator, needed a fast way to compile Verilog into C++ for simulation. The tool was open-sourced, and for years it remained a niche utility appreciated mostly by academics and hobbyists.',
        'That changed as the semiconductor industry began demanding faster verification cycles. Commercial simulators, while powerful, came with per-seat licensing costs and throughput bottlenecks that made large-scale design exploration expensive. Verilator — which converts synthesisable Verilog and SystemVerilog into cycle-accurate C++ or SystemC — offered something different: speed.',
        'Verilator typically runs 10x–100x faster than traditional event-driven simulators for synthesisable RTL. For teams running millions of regression cycles, that difference is not incremental — it is the difference between overnight runs and multi-day queues. Tesla, Google, AMD, NVIDIA, and dozens of other leading silicon teams now use Verilator as a core part of their verification infrastructure.',
        'At CaretEDA, Verilator is one of several open-source tools we integrate natively into the Spec-to-Netlist™ flow. Our platform orchestrates Verilator alongside OpenROAD, Yosys, and commercial tools — giving engineering teams the throughput of open-source with the reliability of a managed, AI-assisted pipeline.',
        'The lesson Verilator teaches the industry is simple: open-source tools, when properly integrated into a modern workflow, are not a compromise. They are a competitive advantage. CaretEDA is built on that premise.',
      ]
    },
    'code-generation': {
      title: 'Generating SystemVerilog Is Easy. Generating Hardware Is Not.',
      date: 'April 2026', readTime: '5 min read', category: 'AI & Hardware Design',
      summary: 'LLMs can produce RTL that compiles and simulates — but hardware is a contract with physics, and physics does not accept plausible drafts.',
      body: [
        'Large language models are remarkably good at producing SystemVerilog that looks correct. Ask a modern LLM for a 4-bit ripple-carry adder and you will receive clean, well-commented code that compiles on the first try. This has led some observers to conclude that AI has solved RTL generation.',
        'It has not. Hardware description is fundamentally different from software code generation in ways that matter enormously at tapeout.',
        'Software bugs are recoverable. A faulty function can be patched and redeployed in minutes. A faulty cell in a fabricated chip is permanent. Every timing violation, every race condition, every metastability issue that escapes verification becomes a multi-million dollar re-spin. The cost of "plausible but wrong" in hardware design is catastrophic.',
        'LLMs optimise for syntactic plausibility. They produce code that resembles the training distribution. For common, well-documented RTL patterns — FIFOs, arbiters, state machines — they perform well. But hardware verification requires semantic correctness: does this circuit do what the specification intends, under all input conditions, across all corners of the process window?',
        'At CaretEDA, we have built our AI-native platform around this distinction. Our Spec-to-Netlist™ flow does not treat LLM output as a finished artifact. It treats it as a starting point — one that must be formally verified, timing-closed, and validated against the original specification. The AI accelerates the creative work; the verification infrastructure provides the correctness guarantee.',
        'Generating SystemVerilog is easy. Generating hardware is not. We are building the platform that bridges the two.',
      ]
    },
    'silicon-imperative': {
      title: 'The Silicon Imperative',
      date: 'March 2026', readTime: '5 min read', category: 'Industry & Strategy',
      summary: 'Rising chip design complexity, shrinking tapeout cycles, and why the $775B semiconductor market is making AI-native design a strategic necessity.',
      body: [
        'The global semiconductor market is projected to reach $775 billion by 2028. Behind that number is a structural pressure that every chip design team feels: the demand for more capable silicon, delivered faster, with smaller teams.',
        'Advanced nodes have not simplified design — they have compounded it. FinFET and gate-all-around transistors introduce new physical effects that require more sophisticated verification. Power delivery networks at 2nm and below require analysis methodologies that did not exist five years ago. The verification complexity of a modern SoC can exceed the original design complexity by an order of magnitude.',
        'Meanwhile, engineering talent has not scaled proportionally. The global shortage of experienced RTL and verification engineers is well-documented. Teams are being asked to do more with fewer people, in shorter cycles, at higher levels of quality.',
        'This is the silicon imperative: the gap between what the market demands and what current methodologies can deliver. It is not a temporary condition. It is a structural shift driven by end-market forces — AI accelerators, automotive silicon, edge computing, and defense electronics — that will only intensify.',
        'AI-native design tools are the only plausible response at scale. Not AI as an autocomplete for individual engineers, but AI as an autonomous agent embedded in the design flow itself — one that can translate specification intent into verified RTL, orchestrate multi-tool pipelines, and compress iteration cycles from weeks to days.',
        'CaretEDA was founded to address this gap directly. Our Spec-to-Netlist™ platform is not a productivity tool bolted onto existing flows. It is a re-architecture of the design process itself, built for a world where the silicon imperative is not going away.',
      ]
    },
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.post = this.posts[params['slug']];
    });
  }
}
