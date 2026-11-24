import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ContentBlock {
  type: 'p' | 'ul' | 'img' | 'html' | 'caption' | 'ref';
  text?: string;
  items?: string[];
  src?: string;
  alt?: string;
  href?: string;
  linkText?: string;
}

interface Section {
  heading?: string;
  image?: string;
  imageAlt?: string;
  paragraphs?: string[];
  bullets?: string[];
  blocks?: ContentBlock[];
}

interface BlogPost {
  title: string;
  subtitle?: string;
  date: string;
  readTime: string;
  wordCount?: string;
  category: string;
  author: string;
  authorRole?: string;
  summary: string;
  heroImage?: string;
  keyTakeaways?: string[];
  sections: Section[];
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="min-h-screen text-ink pt-28 pb-20 px-4 md:px-8">
      <div class="article mx-auto" *ngIf="post">

        <a [routerLink]="['/blogs']" class="back-link mb-10">
          <span class="arrow-back" aria-hidden="true"></span><span class="back-link__text">Back to Blog</span>
        </a>

        <h1 class="text-3xl md:text-5xl font-medium mb-4 text-ink leading-tight">{{ post.title }}</h1>
        <p *ngIf="post.subtitle" class="text-ink-2 text-base md:text-lg mb-6 leading-relaxed">{{ post.subtitle }}</p>
        <div class="mb-8">
          <p class="text-ink text-base font-medium">{{ post.author }}</p>
          <p *ngIf="post.authorRole" class="text-ink-2 text-sm mt-0.5">{{ post.authorRole }}</p>
        </div>

        <!-- Hero Image -->
        <div class="w-full rounded-2xl overflow-hidden mb-8" *ngIf="post.heroImage">
          <img [src]="post.heroImage" [alt]="post.title" class="w-full object-cover">
        </div>

        <!-- Date & Read Time -->
        <div class="mb-10 text-ink-2 text-sm space-y-1">
          <p>{{ post.date }}</p>
          <p><span *ngIf="post.wordCount">{{ post.wordCount }} · </span>{{ post.readTime }}</p>
        </div>

        <!-- Key Takeaways box -->
        <div *ngIf="post.keyTakeaways && post.keyTakeaways.length" class="rounded-xl bg-card border border-line p-6 md:p-8 mb-10">
          <h3 class="text-ink font-medium text-xl mb-5">Key Takeaways</h3>
          <ul class="space-y-4">
            <li *ngFor="let item of post.keyTakeaways" class="text-ink-2 text-base leading-relaxed flex gap-3 items-start">
              <span class="flex-shrink-0 mt-0.5">•</span><span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Sections -->
        <div class="space-y-6">
          <div *ngFor="let section of post.sections" class="space-y-4">

            <h2 *ngIf="section.heading" class="text-xl md:text-2xl font-medium text-ink mt-10">{{ section.heading }}</h2>

            <!-- New blocks format (interleaved paragraphs + bullets) -->
            <ng-container *ngIf="section.blocks && section.blocks.length">
              <ng-container *ngFor="let block of section.blocks">
                <p *ngIf="block.type === 'p'" class="text-ink-2 text-base leading-relaxed">{{ block.text }}</p>
                <ul *ngIf="block.type === 'ul'" class="space-y-2 pl-4">
                  <li *ngFor="let item of block.items" class="text-ink-2 text-base leading-relaxed flex gap-3">
                    <span class="text-accent-ink text-lg font-medium leading-none flex-shrink-0 mt-0.5">●</span>{{ item }}
                  </li>
                </ul>
                <div *ngIf="block.type === 'img'" class="w-full rounded-xl overflow-hidden my-6">
                  <img [src]="block.src" [alt]="block.alt || ''" class="w-full object-cover">
                </div>
                <p *ngIf="block.type === 'caption'" class="text-ink-3 text-sm leading-relaxed italic -mt-2 mb-4">{{ block.text }}</p>
                <p *ngIf="block.type === 'ref'" class="text-ink-2 text-base leading-relaxed">
                  <span>{{ block.text }}</span>
                  <a *ngIf="block.href" [href]="block.href" target="_blank" rel="noopener noreferrer" class="text-accent-ink underline underline-offset-2 break-all hover:text-ink transition-colors">{{ block.linkText || block.href }}</a>
                </p>
                <p *ngIf="block.type === 'html'" class="text-ink-2 text-base leading-relaxed" [innerHTML]="block.text"></p>
              </ng-container>
            </ng-container>

            <!-- Legacy format (paragraphs / bullets / image) -->
            <ng-container *ngIf="!section.blocks || !section.blocks.length">
              <div *ngIf="section.image" class="w-full rounded-xl overflow-hidden my-6">
                <img [src]="section.image" [alt]="section.imageAlt || ''" class="w-full object-cover">
              </div>
              <p *ngFor="let para of section.paragraphs" class="text-ink-2 text-base leading-relaxed">{{ para }}</p>
              <ul *ngIf="section.bullets" class="space-y-2 pl-4">
                <li *ngFor="let bullet of section.bullets" class="text-ink-2 text-base leading-relaxed flex gap-3">
                  <span class="text-accent-ink text-lg font-medium leading-none flex-shrink-0 mt-0.5">●</span>{{ bullet }}
                </li>
              </ul>
            </ng-container>

          </div>
        </div>

        <!-- Footer CTA -->
        <div class="mt-16 pt-12 border-t border-line">
          <a [routerLink]="['/blogs']" class="back-link">
            <span class="arrow-back" aria-hidden="true"></span><span class="back-link__text">Back to Blog</span>
          </a>
        </div>

      </div>
    </section>
  `
})
export class BlogDetailComponent implements OnInit {
  post?: BlogPost;

  private posts: { [slug: string]: BlogPost } = {
    "verified-gates": {
      "title": "From 160 Gates a Day to Verified Gates",
      "subtitle": "The KPIs for chip design look like they are changing. Are they?",
      "date": "October 2026",
      "readTime": "6 min read",
      "wordCount": "1,400 words",
      "category": "Industry & Strategy",
      "author": "Sashi Obilisetty",
      "authorRole": "Co-founder & CEO, CaretEDA, Inc.",
      "heroImage": "assets/blogs/verified-gates-hero.jpg",
      "summary": "Gates per engineer-day never really measured gates — it measured verified gates, and agents that generate RTL for free are forcing the industry to say so plainly.",
      "sections": [
        {
          "blocks": [
            {
              "type": "p",
              "text": "Software learned long ago that lines of code is a poor measure of an engineer. Chip design had its own version, and for a while we took it just as seriously: gates per engineer-day."
            },
            {
              "type": "html",
              "text": "In 1997, the average chip designer produced about 160 gates a day. The industry roadmap put productivity at <a href=\"https://www.design-reuse.com/articles/9065/modeling-total-cost-of-ownership-for-semiconductor-ip.html\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">40,000 gates per engineer-year</a>, which works out to roughly 160 gates per working day, and projected 600,000 by 2007."
            },
            {
              "type": "p",
              "text": "Today an agent can write a few thousand lines of SystemVerilog in minutes. By the old yardstick, that is a productivity miracle. By any yardstick an experienced design lead would accept, it is a pile of unverified text."
            },
            {
              "type": "p",
              "text": "If your team is already using AI to write RTL, and most teams are, the question is worth asking: what should we actually measure?"
            },
            {
              "type": "p",
              "text": "My answer: the unit was never really gates. It was verified gates, and agents are forcing us to say so plainly."
            }
          ]
        },
        {
          "heading": "A Metric That Faded Away",
          "blocks": [
            {
              "type": "p",
              "text": "Nobody formally retired gates per engineer-day. People just stopped quoting it, because it had stopped meaning much."
            },
            {
              "type": "html",
              "text": "Transistor counts were growing 58% a year while designer productivity grew about 21%. The industry closed part of that gap the cheap way: by not designing most of the gates. The 2003 roadmap credited <a href=\"https://www.design-reuse.com/articles/9065/modeling-total-cost-of-ownership-for-semiconductor-ip.html\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">IP reuse with 75% of the projected productivity improvement</a>. Once much of your chip arrives as a licensed block, \"gates per engineer\" stops describing engineering."
            },
            {
              "type": "p",
              "text": "AI brought the measurement question back. In 2023, researchers used GPT-4 to help design an 8-bit processor, and the first benchmarks scored AI-written Verilog on a simple test: did it pass a simulation? By 2026, agents were building complete processor cores from specs a few hundred words long, and the newest benchmarks have started grading the whole result against timing, power, area and physical checks."
            },
            {
              "type": "p",
              "text": "Run the old arithmetic on any of these results and you get an absurd productivity number. Nobody serious quotes it. Generation is becoming a commodity. What stays scarce is confidence that the output is right."
            }
          ]
        },
        {
          "heading": "DARPA IDEA Already Wrote the Better Metric",
          "blocks": [
            {
              "type": "p",
              "text": "In 2018, DARPA's IDEA program set an ambitious target: no-human-in-loop design, 24-hour turnaround, and zero loss of PPA quality. OpenROAD was its flagship. UC San Diego and partners received a multi-year, multi-million-dollar grant to build it."
            },
            {
              "type": "p",
              "text": "Look at how that goal is phrased. It never mentions gates. It has three terms:"
            },
            {
              "type": "html",
              "text": "<ol class=\"space-y-2 list-decimal pl-5 marker:text-accent-ink marker:font-medium\"><li class=\"text-ink-2 text-base leading-relaxed pl-1\">Human attention (no humans in the loop), the scarce input.</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\">Time (24 hours), the schedule.</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\">Quality held constant (no PPA loss), the bar the output must clear.</li></ol>"
            },
            {
              "type": "html",
              "text": "That is a productivity metric. It measures output that meets a quality bar per unit of expert attention, which is exactly what gates per day failed to do. The team's own poster framed the baseline bluntly: <a href=\"https://eri-summit.darpa.mil/docs/ERIPoster_Designs_IDEA_UCSD.pdf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">a layout that took 10+ weeks at a university lab, versus a goal of one day with no humans</a>."
            },
            {
              "type": "html",
              "text": "The program was also realistic about people. The same poster states a principle that still holds: humans are in the loop for good reasons. But the program moved the field. OpenROAD has since been used in <a href=\"https://vlsicad.ucsd.edu/Publications/Conferences/390/c390.pdf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">over 180 tapeouts in SkyWater 130nm</a>, and its autotuning now finds tool configurations better than expert users do."
            },
            {
              "type": "p",
              "text": "The agentic era inherits IDEA's ambition and extends it upstream, from RTL-to-GDS to spec-to-RTL. It should inherit IDEA's measurement discipline too."
            }
          ]
        },
        {
          "heading": "Generated Gates and Verified Gates",
          "blocks": [
            {
              "type": "p",
              "text": "A generated gate is logic an agent has written. A verified gate is logic your team will sign its name to. The difference between them is where nearly all the engineering lives."
            },
            {
              "type": "html",
              "text": "<div class=\"overflow-x-auto my-6\"><table class=\"w-full text-left border-collapse\"><thead class=\"bg-raised border-b border-line-strong\"><tr><th class=\"p-4 font-medium\"></th><th class=\"p-4 font-medium\">Generated gate</th><th class=\"p-4 font-medium\">Verified gate</th></tr></thead><tbody><tr class=\"border-b border-line\"><td class=\"p-4\">Exists when</td><td class=\"p-4\">The RTL compiles</td><td class=\"p-4\">It meets the spec under your signoff bar</td></tr><tr class=\"border-b border-line\"><td class=\"p-4\">Evidence</td><td class=\"p-4\">A file</td><td class=\"p-4\">Coverage closed, formal or equivalence clean, synthesizable, PPA met</td></tr><tr class=\"border-b border-line\"><td class=\"p-4\">Marginal cost with agents</td><td class=\"p-4\">Close to zero</td><td class=\"p-4\">Still dominated by expert review and debug</td></tr><tr><td class=\"p-4\">Who answers for it</td><td class=\"p-4\">Nobody in particular</td><td class=\"p-4\">A named engineer</td></tr></tbody></table></div>"
            },
            {
              "type": "p",
              "text": "What stands out to me is that it was always this way. Even before agents, design engineers spent 49% of their time on verification (sometimes even more!), and verification engineers spent more time debugging than on anything else. Nobody counted a gate that failed regression. The old metric simply assumed the verification had happened, because humans who wrote the RTL also carried the responsibility for it."
            },
            {
              "type": "p",
              "text": "Agents break that assumption. Generation and accountability are now separable, and generation is cheap. A metric that counts generated gates rewards the cheap part and hides the expensive part. Worse, it rewards volume at the exact moment when only 14% of IC/ASIC projects achieved first-silicon success in the 2024 Wilson study, the lowest in 20 years."
            }
          ]
        },
        {
          "heading": "What Recent Research Says About Measuring Agent Output",
          "blocks": [
            {
              "type": "html",
              "text": "Two papers from this year point the same way. A <a href=\"https://arxiv.org/html/2603.11287v1\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">synthesis-in-the-loop study</a> of 32 models found that simulation pass rates overstate hardware quality, and that single attempts trail best-of-five results by up to double digits. A <a href=\"https://arxiv.org/abs/2607.17528\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">benchmark of agents running a full RTL-to-GDS flow</a> found that the execution harness mattered more than the model, with costs varying by up to 141x for similar progress. Neither paper asks how much an agent produces. Both ask how much of it survives a gate, and at what cost. Industry metrics should follow."
            }
          ]
        },
        {
          "heading": "Policies That Make Verified Gates Mean Something",
          "blocks": [
            {
              "type": "p",
              "text": "When agents write RTL, accountability has to be designed in, not assumed. Here are seven policies any team can adopt this quarter."
            },
            {
              "type": "html",
              "text": "<ol class=\"space-y-4 list-decimal pl-5 marker:text-accent-ink marker:font-medium\"><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><strong class=\"text-ink\">Every verified block has a named human owner.</strong> An agent can author a module; only a person can sign it off. The owner&#39;s name goes in the signoff record, not just the commit log.</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><strong class=\"text-ink\">Define the signoff bar before generation starts.</strong> Coverage targets, required formal properties, lint and CDC rules, and PPA budgets are written down per block. A gate counts as verified only against that pre-agreed bar, so nobody moves the goalposts after the fact.</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><strong class=\"text-ink\">No agent grades its own homework.</strong> The agent that wrote the RTL should not also write the only testbench or the only assertions that judge it. Use independent stimulus, formal properties derived from the spec, or a separate agent with no access to the implementation.</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><strong class=\"text-ink\">Log provenance for every artifact.</strong> Record which model, prompt, spec version and tool versions produced each file. When a bug escapes, you need to know whether it came from a person, an agent, or a spec gap.</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><strong class=\"text-ink\">Count interventions, honestly.</strong> Track every time an engineer edits agent output, overrides a decision, or restarts a run. A falling intervention rate is the real evidence of autonomy.</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><strong class=\"text-ink\">Report single-attempt results alongside best-of-n.</strong> The research above shows best-of-five can flatter a system by double-digit points. If your flow samples many candidates, say so, and count that compute as part of the cost.</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><strong class=\"text-ink\">Re-verify reused and regenerated code in context.</strong> Agent-regenerated RTL is new RTL, even if the prompt was unchanged. Treat it like a fresh block until it clears the bar again.</li></ol>"
            },
            {
              "type": "p",
              "text": "None of these is exotic. Most are what good verification leads already demand of human engineers. The change is making them explicit, because an agent will not volunteer the context a human would have carried in their head."
            }
          ]
        },
        {
          "heading": "About CaretEDA",
          "blocks": [
            {
              "type": "html",
              "text": "CaretEDA builds AI-native design systems for modern semiconductor teams, with its Spec-to-Netlist™ platform putting agents to work across the entire engineering workflow. CaretEDA's agents are integrated with commercial EDA stacks as well as an SLA-backed RTL-to-GDS open source stack. Qualifying chip startups can access the stack and agentic tools at no charge for a limited time through the CaretEDA Startup Program at <a href=\"https://careteda.com/startup-program\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">https://careteda.com/startup-program</a>."
            },
            {
              "type": "html",
              "text": "<span class=\"text-ink-3 text-sm italic\">CaretEDA and Spec-to-Netlist are trademarks of CaretEDA, Inc. Verilator, Yosys, SymbiYosys and OpenROAD are open source projects of their respective maintainers.</span>"
            }
          ]
        },
        {
          "heading": "Sources",
          "blocks": [
            {
              "type": "html",
              "text": "<ul class=\"space-y-3 pl-5 list-disc marker:text-accent-ink\"><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><a href=\"https://www.design-reuse.com/articles/9065/modeling-total-cost-of-ownership-for-semiconductor-ip.html\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">Modeling Total Cost of Ownership for Semiconductor IP</a>, Design &amp; Reuse (ITRS productivity and IP reuse figures)</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><a href=\"https://nistep.repo.nii.ac.jp/record/6339/files/NISTEP-STT016E-61.pdf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">NISTEP report on the LSI design crisis</a> (58% vs 21% growth)</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><a href=\"https://openroad-test.readthedocs.io/en/stable/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">OpenROAD documentation</a> and <a href=\"https://jacobsschool.ucsd.edu/news/release?id=2605\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">UCSD news release, July 2018</a></li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><a href=\"https://eri-summit.darpa.mil/docs/ERIPoster_Designs_IDEA_UCSD.pdf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">OpenROAD / IDEA poster, DARPA ERI Summit</a></li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><a href=\"https://vlsicad.ucsd.edu/Publications/Conferences/390/c390.pdf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">The OpenROAD Project: status and outlook</a>, UCSD</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><a href=\"https://arxiv.org/abs/2305.13243\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">GPT-4-assisted 8-bit processor design</a>, arXiv 2305.13243</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><a href=\"https://www.sigasi.com/news/verification-blog/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">Summary of the 2024 Wilson Research Group reports</a>, Sigasi</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><a href=\"https://arxiv.org/html/2603.11287v1\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">Synthesis-in-the-Loop Evaluation of LLMs for RTL Generation</a>, arXiv 2603.11287</li><li class=\"text-ink-2 text-base leading-relaxed pl-1\"><a href=\"https://arxiv.org/abs/2607.17528\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-accent-ink underline underline-offset-2 hover:text-ink transition-colors\">Can AI Agents Really Complete RTL-to-GDS?</a>, arXiv 2607.17528</li></ul>"
            }
          ]
        }
      ]
    },
    "verilator-5-050": {
      "title": "Unlimited. Full-Featured. Perfect for the Agentic Loop.",
      "subtitle": "How Verilator 5.050 closes the cost, functionality, and performance gaps at once — measured across sixteen public and UVM designs",
      "date": "September 2026",
      "readTime": "4 min read",
      "wordCount": "650 words",
      "category": "Company News & Releases",
      "author": "Sashi Obilisetty",
      "authorRole": "Co-founder & CEO, CaretEDA",
      "heroImage": "assets/blogs/verilator-5-050-hero.jpeg",
      "summary": "How Verilator 5.050 closes the cost, functionality, and performance gaps at once — measured across sixteen public and UVM designs.",
      "sections": [
        {
          "blocks": [
            {
              "type": "p",
              "text": "While commercial simulators are fast, and support almost the full subset of SystemVerilog, what they are not is unlimited. Every parallel regression, every branch that wants its own run, every extra job an agentic flow wants to launch competes for a finite pool of seats — and the bill scales upward with how hard you want to push verification, not with how much compute you actually have."
            },
            {
              "type": "p",
              "text": "Verilator has always been the opposite bet: no seats, no per-run cost, scale with compute instead of licenses. For a long time that came with a real tax — gaps in the SystemVerilog subset UVM environments depend on, and simulations that stalled out on designs commercial tools handled without complaint. That tax has been shrinking fast. Since the IEEE-compliant scheduler landed in Verilator 5.0, successive releases have closed language gaps one by one, and as of late 2025 Verilator elaborates upstream UVM 2017-1.0 without patches. Version 5.050 is the clearest evidence yet of where that arc has landed."
            },
            {
              "type": "html",
              "text": "We didn't take that on faith. We ran sixteen public designs (some with UVM testbenches) through Verilator 5.050, compared eight of them directly against 5.042, and tracked what changed when compilation moved from a single core to eight. The results answer the question that actually matters for an agentic verification loop: <strong>can you get unlimited, full-featured, and fast in the same simulator, or is that still three separate simulators?</strong>"
            }
          ]
        },
        {
          "heading": "Multi-core compilation turns hour-long builds into a coffee break",
          "blocks": [
            {
              "type": "p",
              "text": "Verilator translates RTL into C++ and compiles it into a simulator binary, and that compilation step — not simulation itself — was the long pole for our larger UVM designs. Spreading that build across eight cores with --build-jobs cut single-core compile times by 17x to 59x on our three largest UVM environments, turning hour-long builds into single-digit minutes regardless of design size."
            },
            {
              "type": "html",
              "text": "<div class=\"overflow-x-auto my-6\"><table class=\"w-full text-left border-collapse\"><thead class=\"bg-raised border-b border-line-strong\"><tr><th class=\"p-4 font-medium\">Design</th><th class=\"p-4 font-medium\">Single-core compile</th><th class=\"p-4 font-medium\">8-core compile</th><th class=\"p-4 font-medium\">Speedup</th></tr></thead><tbody><tr class=\"border-b border-line\"><td class=\"p-4\">VeeR EL2 (UVM)</td><td class=\"p-4\">51m 55s</td><td class=\"p-4\">1m 0.4s</td><td class=\"p-4 font-medium text-accent-ink\">52×</td></tr><tr class=\"border-b border-line\"><td class=\"p-4\">Ethernet MAC (UVM)</td><td class=\"p-4\">70m 11s</td><td class=\"p-4\">1m 11s</td><td class=\"p-4 font-medium text-accent-ink\">59×</td></tr><tr><td class=\"p-4\">Coral NPU</td><td class=\"p-4\">17m 6s</td><td class=\"p-4\">1m 1s</td><td class=\"p-4 font-medium text-accent-ink\">17×</td></tr></tbody></table></div><p class=\"text-ink-3 text-sm leading-relaxed italic -mt-2 mb-4\">Table 1. Compile time, single core vs. eight cores (--build-jobs), Verilator 5.050.</p>"
            },
            {
              "type": "p",
              "text": "The range matters more than any single number. Multi-core compilation isn't a trick that only pays off on toy designs — it scales down the wait for a 4,600-line Ethernet MAC and a 470,000-line NPU alike, just by different factors depending on how parallelizable the generated C++ is. For a team running regression multiple times a day, that's the difference between a build you wait out and a build you don't notice."
            }
          ]
        },
        {
          "heading": "Designs that used to fail outright now simulate",
          "blocks": [
            {
              "type": "p",
              "text": "Speed only matters if the design compiles in the first place, and that was the harder gap to close. We compared eight designs across the jump from 5.042 to 5.050 — on 5.042, more than half failed to compile or complete simulation; on 5.050, every one of them built and ran clean."
            },
            {
              "type": "p",
              "text": "OpenPiton and Caliptra-RTL are the sharpest examples: both went from a hard compile failure on 5.042 to a completed simulation run on 5.050, on designs Verilator flatly could not touch six releases ago. VeeR EL2's UVM environment, AHB-APB VIP, and the Ethernet MAC UVM testbench compiled on both versions but only started passing simulation on 5.050."
            },
            {
              "type": "html",
              "text": "<div class=\"overflow-x-auto my-6\"><table class=\"w-full text-left border-collapse\"><thead class=\"bg-raised border-b border-line-strong\"><tr><th class=\"p-4 font-medium\">Design</th><th class=\"p-4 font-medium\">Status on 5.042</th><th class=\"p-4 font-medium\">5.050 compile time</th><th class=\"p-4 font-medium\">5.050 simulation</th></tr></thead><tbody><tr class=\"border-b border-line\"><td class=\"p-4\">OpenPiton</td><td class=\"p-4 text-negative\">Failed to compile</td><td class=\"p-4\">1m 58s</td><td class=\"p-4 text-positive\">Successful</td></tr><tr class=\"border-b border-line\"><td class=\"p-4\">Caliptra-RTL</td><td class=\"p-4 text-negative\">Failed to compile</td><td class=\"p-4\">3m 53s</td><td class=\"p-4 text-positive\">Successful</td></tr><tr class=\"border-b border-line\"><td class=\"p-4\">Processor-UVM</td><td class=\"p-4 text-negative\">Failed to compile</td><td class=\"p-4\">1m 8.75s</td><td class=\"p-4 text-positive\">Successful</td></tr><tr class=\"border-b border-line\"><td class=\"p-4\">SDRAM (UVM)</td><td class=\"p-4 text-negative\">Failed to compile</td><td class=\"p-4\">7.743s</td><td class=\"p-4 text-positive\">Successful</td></tr><tr class=\"border-b border-line\"><td class=\"p-4\">VeeR EL2 (UVM)</td><td class=\"p-4 text-amber-700\">Compiled, simulation failed</td><td class=\"p-4\">1m 14.84s</td><td class=\"p-4 text-positive\">Successful</td></tr><tr class=\"border-b border-line\"><td class=\"p-4\">AHB-APB VIP (UVM)</td><td class=\"p-4 text-amber-700\">Compiled, simulation failed</td><td class=\"p-4\">1m 22s</td><td class=\"p-4 text-positive\">Successful</td></tr><tr><td class=\"p-4\">Ethernet MAC (UVM)</td><td class=\"p-4 text-amber-700\">Compiled, simulation failed</td><td class=\"p-4\">1m 11s</td><td class=\"p-4 text-positive\">Successful</td></tr></tbody></table></div><p class=\"text-ink-3 text-sm leading-relaxed italic -mt-2 mb-4\">Table 2. Designs that failed on Verilator 5.042, compiling and simulating on 5.050.</p>"
            }
          ]
        },
        {
          "heading": "UVM at a scale that isn't a toy testbench",
          "blocks": [
            {
              "type": "p",
              "text": "The gap that has kept Verilator out of some production verification flows was never raw speed — it was whether it could carry a real UVM environment. We pushed on that directly with Coral NPU: 471,639 lines of DUT code, 19,680 lines of UVM environment, 613 elaborated modules, and a 764-test regression across two test classes. It compiled, elaborated, and ran the full regression on Verilator 5.050."
            },
            {
              "type": "p",
              "text": "That's not an outlier we're hiding behind. SDRAM ran a 50-test regression clean. The Ethernet MAC UVM testbench elaborated 425 modules across 2,647 generated C++ files and passed. AHB-APB VIP, with 1,463 lines of UVM environment against a 491-line DUT, completed its full regression in 83 seconds on eight cores."
            },
            {
              "type": "p",
              "text": "Verilator new functionality development is on hyperdrive to address pending gaps. Caliptra-RTL's UVM environment needs commercial VIPs we don't have license to run. This is real engineering progress against real designs, not a curated highlight reel."
            }
          ]
        },
        {
          "heading": "An open source stack CaretEDA stands behind",
          "blocks": [
            {
              "type": "p",
              "text": "None of this — faster builds, designs that now compile, UVM environments that now run — removes the work of tracking Verilator's fast-moving development, validating a given version against your design, or having someone to call when a regression breaks three weeks before tapeout. That's the layer CaretEDA adds. Our 2026.08 release ships Verilator 5.050 as part of a commercially supported open source EDA stack — alongside Yosys, SymbiYosys, and OpenROAD — with SLA-backed response commitments and platform-specific packages your team doesn't have to assemble by hand."
            },
            {
              "type": "p",
              "text": "The reason this matters beyond Verilator on its own: Verilator 5.050 sits directly inside our Spec-to-Netlist™ platform's agentic flow. The gains we measured here aren't a separate benchmarking exercise; they're the verification stage every design generated through CaretEDA runs through."
            },
            {
              "type": "p",
              "text": "An agentic design loop lives or dies on how fast it can iterate: generate, verify, learn, regenerate. That loop can't wait in a license queue between cycles, and it can't afford a simulator that stumbles on the UVM environment the design actually needs. Unlimited, full-featured, and fast used to be a pick-two problem. Verilator 5.050 is where that stops being true — and CaretEDA gives you a partner accountable for keeping the whole stack running underneath it."
            }
          ]
        },
        {
          "heading": "Benchmark and source notes",
          "blocks": [
            {
              "type": "p",
              "text": "Compile and simulation timings are from a benchmark set spanning sixteen public and UVM designs on Verilator 5.050, with an eight-design comparison against 5.042. Multi-core figures use Verilator's --build-jobs option on eight cores."
            }
          ]
        },
        {
          "heading": "About CaretEDA",
          "blocks": [
            {
              "type": "p",
              "text": "CaretEDA builds AI-native design systems for modern semiconductor teams, with its Spec-to-Netlist™ platform serving as a powerful force multiplier across the entire engineering workflow. To learn more, apply to the Startup Program, or request a demo, visit www.CaretEDA.com."
            }
          ]
        }
      ]
    },
    '2026-08-release': {
      title: 'CaretEDA’s 2026.08 Release: From RTL to Physical Reality',
      date: 'September 2026',
      readTime: '4 min read',
      wordCount: '576 words',
      category: 'Company News & Releases',
      author: 'Sashi Obilisetty',
      authorRole: 'Co-founder & CEO, CaretEDA, Inc.',
      heroImage: 'assets/blogs/2026-08-release-hero.jpg',
      summary: 'CaretEDA\'s second release brings OpenROAD into the Spec-to-Netlist™ platform, updates Verilator, and introduces new partnerships, bridging the gap from RTL generation to physical implementation.',
      sections: [
        {
          blocks: [
            { type: 'p', text: 'In May, we shipped CaretEDA’s first release. With 2026.08 a few weeks back, we shipped our second. The cadence is deliberate. In a very short time, agentic chip design has moved from an interesting possibility to something designers are beginning to trust as part of real engineering work — and we are building to keep pace.' },
            { type: 'p', text: 'A useful agentic flow has to produce artifacts engineers can inspect, simulate, verify, and connect to implementation. This release brings more of those capabilities to our Spec-to-Netlist™ platform, updates Verilator version in CaretEDA’s Opensource EDA stack, and, most importantly, brings OpenROAD into the path we are building from specification to implementation.' },
            { type: 'p', text: 'OpenROAD is the part I am especially excited about.' },
            { type: 'p', text: 'Physical design is where intent starts becoming physical reality. It is where timing, placement, routing, area, congestion, and power-performance-area constraints stop being downstream concerns and become evidence an engineering team can act on. OpenROAD brings that evidence closer to the agentic design loop, so teams can learn earlier whether generated RTL is moving toward hardware that can actually be implemented.' },
            { type: 'p', text: 'For years, Opensource EDA has been a powerful idea with a practical problem attached to it. Engineers could see the promise, but using the tools inside real schedules still required expertise, integration work, flow maintenance, and someone willing to debug the hard edges. That is the gap CaretEDA is closing. With OpenROAD in the CaretEDA stack, customers get a commercially supported way to explore that next stage: not as a disconnected experiment, but as part of an agentic workflow that can carry context from intent, to generated SystemVerilog, to simulation, to implementation feedback.' },
            { type: 'p', text: 'That support layer is what turns an interesting tool into a usable flow. Customers want the transparency of Opensource and the accountability they expect from a commercial vendor. They need maintained packages, tested combinations, clear escalation paths, and a team that understands what it means when a tool issue threatens a milestone. Commercially supported Opensource EDA gives teams a way to engage with promising tools and solutions, and keep the work moving without turning every Opensource adoption effort into an internal infrastructure project.' },
            { type: 'p', text: 'A little bit about Verilator 5.050, included as part of 2026.08. Compared with the prior release, this version expands SystemVerilog compatibility across assertions, functional coverage, constrained randomization, interfaces and modports, timing behavior, and force/release use cases. It also brings better performance, diagnostics, logging, memory visibility, and tool integration. For teams using SystemVerilog, these improvements are immediate and practical: better simulation coverage, fewer language limitations in serious verification environments, and a tighter connection between generated RTL and the engineering review needed before a design moves forward.' },
            { type: 'html', text: 'Our recent <a href="/blogs/chip-design-over-mcp" class="text-accent-ink underline underline-offset-2 hover:text-ink transition-colors">MCP blog</a> describes another new feature: connecting CaretEDA’s agents and EDA tools to the environments where engineers already work. The goal is to give engineering judgment better loops: faster runs, clearer failures, more useful context, and results that stand up to scrutiny.' },
            { type: 'p', text: 'The 2026.08 release moves the stack forward in a very practical way. More capabilities in our Spec-to-Netlist platform help our multi-agent flows produce better artifacts. Verilator 5.050 helps teams verify those artifacts with broader language and verification support. OpenROAD connects the work to physical implementation. Put together, this is the shape of agentic chip design becoming real engineering infrastructure.' },
            { type: 'p', text: 'Another development worth sharing is a new partnership. NeevSemi has joined the CaretEDA ecosystem as a preferred partner, and together we will extend semiconductor engineering expertise and give teams more ways to move from specification toward implementation. If you will be at SEMICON India 2026 in New Delhi (September 17–19), come find the NeevSemi team in the Startup Pavilion — we would love to talk about where agentic chip design goes next.' },
            { type: 'p', text: 'I want to recognize the Opensource EDA community. The tools we build on reflect years of sustained engineering, and we are grateful to the people who created them and continue to maintain them.' },
            { type: 'p', text: 'CaretEDA 2026.08 is available now. If you are building a chip and want an agentic, commercially supported flow, we would like to work with you. Qualifying startups can also start free through our Startup Program at CaretEDA.com/startups.' },
            { type: 'p', text: 'Let’s go build some silicon.' }
          ]
        },
        {
          blocks: [
            { type: 'caption', text: 'CaretEDA and Spec-to-Netlist™ are trademarks of CaretEDA, Inc. Verilator, Yosys, OpenROAD, and SymbiYosys are open source projects and remain the property of their respective maintainers and contributors. NeevSemi and the NeevSemi logo are trademarks of NeevSemi India Private Limited. All other trademarks are the property of their respective owners.' }
          ]
        }
      ]
    },
    'chip-design-over-mcp': {
      title: 'Chip Design over MCP: Drive It from Claude, Codex, and Copilot',
      date: 'August 2026',
      readTime: '5 min read',
      wordCount: '920 words',
      category: 'AI & Hardware Design',
      author: 'Radha Srinivasan',
      authorRole: 'Co-Founder & VP of Engineering',
      heroImage: 'assets/blogs/mcp-data-flow.webp',
      summary: 'Caret now exposes both its goal-driven hardware agents and its EDA tools through MCP, putting them inside your IDE and CI pipeline.',
      keyTakeaways: [
        'Caret now exposes both its goal-driven hardware agents and Open-source EDA tools through MCP, putting them inside your IDE and your CI pipeline.',
        'The bigger idea: make EDA feel less like infrastructure. Caret turns AI from a side-window assistant into a useful engineering teammate — connected to real tools, constrained by real interfaces, and grounded in real results.',
      ],
      sections: [
        {
          blocks: [
            { type: 'p', text: `At the 63rd Design Automation Conference in Long Beach, California, we showed something that turned heads: a high school student working through a real chip design on the Microsoft Discovery platform. No years spent mastering proprietary GUIs. No memorized shell incantations. He described what he wanted in plain language, and Caret agents did the orchestration.` },
            { type: 'ref', text: '', href: 'https://dac.com/2026', linkText: 'See what happened at DAC 2026' },
            { type: 'p', text: `If a high schooler can drive a design that way, imagine the multiplier for a verification engineer with fifteen years of scar tissue. But that kind of accessibility only works when AI is wired into engineering reality — real tools, real results, no hand-waving in between.` },
            { type: 'p', text: `Caret now speaks Model Context Protocol (MCP), end to end.` },
          ]
        },
        {
          heading: 'What is MCP?',
          blocks: [
            { type: 'p', text: `MCP is an open standard for connecting AI applications to tools and data through one consistent interface. Anthropic — the company behind Claude — created and open-sourced it in November 2024. In December 2025, Anthropic donated MCP to the Linux Foundation's Agentic AI Foundation, placing the protocol under neutral, community-driven governance while continuing to support its evolution.` },
            { type: 'p', text: `In Caret, MCP is not just a tool bridge. It is the contract. An AI client uses it to discover and call both Caret agents and EDA tools. The agents handle goal-driven planning and orchestration. The tools — CYosys, CVerilator, COpenROAD, and commercial simulation, synthesis, and sign-off engines — handle bounded, deterministic execution. MCP is what connects the client to both.` },
            { type: 'ref', text: 'Read the original MCP announcement from Anthropic.', href: 'https://www.anthropic.com/news/model-context-protocol', linkText: 'MCP announcement' },
            { type: 'ref', text: 'Read the Linux Foundation AAIF announcement.', href: 'https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation', linkText: 'AAIF announcement' },
          ]
        },
        {
          heading: 'Caret, Where You Already Work',
          blocks: [
            { type: 'p', text: `You shouldn't have to leave your setup to use powerful EDA tools. Whether you're writing SystemVerilog in VS Code, orchestrating in the cloud, or living in a terminal, you want your tools at your cursor.` },
            { type: 'p', text: `Caret's agents and tools are now fully MCP-compliant. MCP has been called the USB-C of AI, and the comparison holds here: point any MCP client at the Caret server, and the whole stack — open-source EDA tools and agentic capability alike — simply shows up.` },
            { type: 'p', text: 'The integration, layer by layer:' },
            {
              type: 'ul', items: [
                'Client. VS Code with Microsoft Copilot, Claude, Codex, the Microsoft Discovery platform, or your own CLI.',
                'Protocol. Standard MCP over JSON-RPC for discovery, context management, and task communication.',
                'Server and agents. Autonomous, goal-driven Caret agents that own long-running work.',
                'Execution. The EDA toolchain itself, open source and commercial, running directly.',
              ]
            },
          ]
        },
        {
          heading: 'Agents That Stay With the Job',
          blocks: [
            { type: 'p', text: `Standard API calls are stateless. They time out. Verification doesn't care.` },
            { type: 'p', text: `Through MCP, Caret turns your LLM into an active orchestrator. An agent can kick off a long-running simulation, step back, poll the job, and inspect structured results the moment it completes — no engineer sitting there holding its hand. The same bridge lets agents work in parallel: one generating lint fixes while another reads synthesis logs.` },
            { type: 'p', text: `And it works in small steps, not one big leap. A model can emit a lot of HDL in one shot; hardware needs evidence, not faith. Caret breaks the job into generate, run, inspect, correct, continue — each step bounded by an explicit tool interface and an observable result.` },
            {
              type: 'ul', items: [
                'Run a focused check before expanding the change.',
                'Consume structured results instead of reasoning over a wall of terminal text.',
                'Stay inside the tools that were deliberately exposed.',
                'Log every action, so the path from intent to result stays inspectable.',
              ]
            },
          ]
        },
        {
          heading: 'Headless, and Auditable',
          blocks: [
            { type: 'p', text: `MCP isn't just for the IDE. The same interface translates to headless environments — nightly regressions included.` },
            { type: 'p', text: `Instead of engineers starting the morning sifting through thousands of lines of simulation failures, a Caret agent runs natively in the pipeline. When a nightly flow breaks, the agent fetches the failed job, isolates the commit that caused the regression, and appends a structured root-cause analysis before the team wakes up.` },
            { type: 'p', text: `Because MCP acts as a strict execution contract, the pipeline stays authoritative. The agent cannot run arbitrary shell scripts; it can only invoke the Caret tools you have explicitly exposed. Every action is scoped, schema-checked, and logged.` },
          ]
        },
        {
          heading: 'Make EDA Feel Less Like Infrastructure',
          blocks: [
            { type: 'p', text: `Engineers should describe the goal and supervise a transparent, testable workflow — not spend their best hours stitching interfaces together. MCP provides the common language. Caret brings it to chip design.` },
            { type: 'p', text: `That is the whole point: turning AI from a side-window assistant into a useful engineering teammate — connected to real tools, constrained by real interfaces, and grounded in real results.` },
            { type: 'p', text: `The student at DAC was not the story. What he had access to was: a design environment where the hard parts were handled by agents that could actually run the tools, report what happened, and keep going. This environment will soon be available to Caret customers.` },
            { type: 'p', text: `Get Caret 2026.08 and point your MCP client at the Caret MCP server. Then describe what you want built.` },
            { type: 'ref', text: '', href: 'https://careteda.com/startup-program', linkText: 'Check out our startup program' },
          ]
        },
      ]
    },
    'dac2026-oss-blog': {
      title: 'Open Source EDA Has Arrived. Now It Has a Partner You Can Call',
      subtitle: 'A companion post to our DAC 2026 announcement',
      date: 'July 2026',
      readTime: '5 min read',
      wordCount: '800 words',
      category: 'Open Source & EDA',
      author: 'Sashi Obilisetty',
      authorRole: 'Co-founder & CEO, CaretEDA',
      heroImage: 'assets/blogs/dac2026-oss-hero.png',
      summary: 'Why the open source EDA stack is ready for production chip design, and how CaretEDA is closing the adoption gap with commercial Service Level Agreements.',
      sections: [
        {
          paragraphs: [
            'If you needed one moment to mark the arrival of open source EDA on the industry’s main stage, the past few weeks delivered it. Moonshot AI’s Kimi K3 model completed a full chip design flow — architecture, RTL, synthesis, place-and-route, verification — in a single 48-hour autonomous run, using exclusively open source EDA tools on the Nangate 45nm library. The resulting design packed 1.46 million standard cells into 4 mm², closed timing at 100 MHz, and sustained more than 8,700 tokens per second of simulated decode throughput. No proprietary tools were involved anywhere in the flow, and the market noticed: the demonstration triggered a visible reassessment of what open source toolchains — paired with agentic AI — can actually do.',
            'At CaretEDA, we weren’t surprised. The Kimi work is a striking proof point, but it sits atop a decade of steady, serious engineering by the open source EDA community — and a growing track record of real, commercial use.'
          ]
        },
        {
          heading: 'Open source EDA is already doing real work',
          paragraphs: [
            'Consider what the ecosystem looks like today.',
            'Verilator has quietly become one of the most widely deployed simulators in the industry. Semiconductor companies large and small run it at scale for fast, cycle-accurate regression — often alongside, and sometimes instead of, commercial simulators — because for large SystemVerilog designs it is simply very fast and very parallelizable.',
            'Yosys is the de facto open synthesis framework, with extensive Verilog support and an architecture that has made it the foundation for everything from FPGA flows to formal verification. It is used in production flows, taught in universities worldwide, and embedded in countless commercial products and services.',
            'OpenROAD, born out of DARPA’s IDEA program and led by UC San Diego, set out to build the “Linux of EDA” for physical design. It has since demonstrated manufacturable, DRC-clean layout generation in commercial technologies including GlobalFoundries 12nm and TSMC 65nm, and has powered real tapeouts — from the striVe SoC family on SkyWater 130nm to the thousands of community designs enabled by OpenLane and efforts like Tiny Tapeout. Research groups such as ETH Zürich’s PULP team now run fully open flows — Yosys for synthesis, OpenROAD for the backend, Verilator for simulation — all the way through silicon.',
            'SymbiYosys has democratized formal property verification, giving engineering teams an accessible on-ramp to a discipline that is increasingly mandatory as designs grow too complex to verify by simulation alone.',
            'These are not hobbyist projects. They are mature, actively developed tools with commercial-quality internals — and the Kimi K3 demonstration showed that when you put an agentic AI in the driver’s seat, they can carry a design from concept to a verified netlist without a single proprietary license.'
          ]
        },
        {
          heading: 'So why isn’t everyone using them?',
          paragraphs: [
            'Because capability was never the whole story. When we talk to engineering leaders about open source EDA, the hesitation is remarkably consistent, and it has little to do with tool quality.',
            'Who builds and maintains this? Standing up an open source flow means tracking multiple fast-moving repositories, managing dependencies, and validating that a given combination of tool versions actually works together. That is an ongoing engineering tax most design teams don’t want to pay.',
            'Who do I call when it breaks? Tape-outs run on schedules. When a synthesis run produces an unexpected result three weeks before a milestone, “file a GitHub issue and hope” is not an acceptable answer. Community support is generous, but it comes with no guarantees on response time — or any response at all.',
            'Who is accountable? Procurement, legal, and management teams are used to vendor relationships with defined obligations. An open source project, however excellent, offers no counterparty. For many companies, that alone has kept these tools out of production flows.',
            'This is the classic open source adoption gap, and it is the same one that Red Hat closed for Linux a generation ago: the software was ready long before enterprises were ready to trust it. What was missing wasn’t code — it was a commercial partner standing behind the code.'
          ]
        },
        {
          heading: 'Closing the gap: commercially supported open source EDA, with real SLAs',
          paragraphs: [
            'This is precisely what our 2026.08 release delivers. It brings a complete, commercially available open source EDA stack — Verilator for simulation, Yosys for logic synthesis, SymbiYosys for formal verification, and OpenROAD for physical synthesis — into a single, agentic-ready platform: the Spec-to-Netlist™ platform.',
            'And critically, it comes with what open source alone cannot offer: Service Level Agreements. When you adopt the stack through CaretEDA, you get validated, integrated releases instead of assembling and maintaining the toolchain yourself; defined response and resolution commitments when something goes wrong; a single accountable partner your procurement and legal teams can contract with; and continuity — versions that are tested together, maintained together, and supported through your production schedule.',
            'In other words, the long-standing objections to open source adoption — no support, no accountability, no maintenance guarantee — simply stop applying. Teams keep everything that makes open source attractive (transparency, flexibility, freedom from per-seat lock-in, and a thriving innovation community) while gaining the operational assurances they’ve always had with commercial EDA. And because the stack lives inside an agentic platform, teams can orchestrate these tools — alongside third-party commercial tools — through CaretEDA’s Agentic Building Blocks, in exactly the kind of AI-driven flows the Kimi demonstration previewed.'
          ]
        },
        {
          heading: 'Built by people who’ve shipped commercial EDA',
          paragraphs: [
            'Support commitments are only as credible as the people behind them. Our team has spent its careers inside commercial EDA — collectively more than fifty years building, deploying, and supporting the tools that production chip design teams depend on every day. We know what a tape-out schedule feels like from the inside, what “supported” has to mean when a customer’s milestone is on the line, and what it takes to harden a tool for production use. That experience shapes everything about how we’ve packaged, validated, and committed to this stack.'
          ]
        },
        {
          heading: 'Where this goes next',
          paragraphs: [
            'The 2026.08 release will be generally available in August. Alongside it, our new Startup Program gives qualifying early-stage semiconductor companies full access to the commercially supported open source stack, plus a 90-day evaluation of our agentic modules — because the teams with the most to gain from open source EDA are often the ones least able to absorb its maintenance burden.',
            'If you’re at DAC 2026 in Long Beach, come see it in action: we’re presenting at the Microsoft booth on Tuesday, July 28 at 11:30 AM, including live demonstrations of agentic workflows that combine open source and commercial tools in a single flow, and our integration with the Microsoft Discovery Platform.',
            'Open source EDA has proven it can design real chips. With commercial support and real SLAs behind it, it’s ready to design yours.'
          ]
        },
        {
          heading: 'About CaretEDA',
          blocks: [
            { type: 'p', text: 'CaretEDA builds AI-native design systems for modern semiconductor teams, with its Spec-to-Netlist™ platform serving as a powerful force multiplier across the entire engineering workflow. To learn more, schedule a DAC meeting, apply to the startup program or request a demo, visit www.CaretEDA.com.' },
          ]
        },
      ]
    },
    'spec-bottleneck': {
      title: 'The Spec Is the Bottleneck, Not the Silicon',
      date: 'July 2026',
      readTime: '7 min read',
      wordCount: '1,464 words',
      category: 'AI & Hardware Design',
      author: 'Sashi Obilisetty',
      authorRole: 'Co-founder & CEO, CaretEDA, Inc.',
      heroImage: 'assets/blogs/spec-bottleneck-hero.png',
      summary:
        'Why agentic chip design breaks when ambiguous specs are silently resolved, and why formalization has to sit before RTL generation.',
      keyTakeaways: [
        'Fluency is not the same as completeness.',
        'The ambiguity lives in the spec and not in the model.',
        "Human engineers are remarkably good at reading ambiguous specs correctly, and remarkably bad at noticing they're doing it.",
      ],
      sections: [
        {
          blocks: [
            { type: 'p', text: `The agent finished in forty seconds. It read the spec, generated the Verilog, wrote its own testbench, ran simulation, and reported a clean pass. Three weeks later, the chip mis-fired on a transition nobody had tested for. The module was supposed to flag every edge on the input line. It only flagged the rising ones. The spec had said "detect any edge" in one clause and "capture a 0-to-1 transition" in another. The agent picked one reading, built a coherent design around it, and never mentioned that the document disagreed with itself.[2]` },
            { type: 'p', text: `This failure - documented in a systematic analysis across GPT-3.5 Turbo, GPT-4 Turbo, and Qwen-Coder-32B on the VerilogEval benchmark - is classified as an "Unclear Overall Module Functionality" error: an internal spec contradiction where both behaviors are synthesizable, both pass the agent's self-generated tests, and only one matches the golden reference. The study used models from 2023-24; today's frontier models are considerably more capable. The underlying problem is not. A more fluent model resolving an ambiguous spec still resolves it silently - it just does so with greater confidence.` },
          ]
        },
        {
          heading: 'The Wrong Bottleneck',
          blocks: [
            { type: 'p', text: `Almost every conversation about AI in chip design starts with the same metric: how fast can the model generate RTL? Tokens per second, lines per prompt, modules per hour. It is a seductive number because it is easy to measure and easy to put on a slide. It is also the wrong number to optimize, because generation speed has almost nothing to do with where agentic design flows actually break.` },
            { type: 'p', text: `A recent evaluation of frontier language models on RTL generation made the point bluntly: free-form natural language is too ambiguous for automation, especially once specifications grow past a paragraph and start spanning tables, timing diagrams, and cross-referenced sections.[1] The researchers' conclusion wasn't "use a bigger model." It was that the field needs controlled, structured specification formalisms before generation quality can improve in any durable way.` },
            { type: 'p', text: `That conclusion lands differently depending on where you sit. If your roadmap is "ship a better RTL-generation model," it's bad news - it means the bottleneck isn't yours to fix with model quality alone. If your roadmap is Spec-to-Netlist, building the formalization layer underneath generation, it's the whole thesis.` },
          ]
        },
        {
          heading: 'The Ambiguity the Engineer Never Noticed',
          blocks: [
            { type: 'p', text: `Human engineers are remarkably good at reading ambiguous specs correctly, and remarkably bad at noticing they're doing it. Years of tribal knowledge, hallway conversations, and "that's just how we always do resets here" quietly fill every gap in a document before an engineer ever opens an editor. The ambiguity doesn't disappear. It just gets resolved by a human brain fast enough that nobody notices a decision was made at all.` },
            { type: 'p', text: `An agent has none of that tribal context, and unlike a junior engineer, it rarely asks a clarifying question. A study cataloguing errors in LLM-generated RTL sorted the recurring ambiguity failures into a few clear buckets,[2] and each one maps to a real gap in how specs get written today:` },
            {
              type: 'ul', items: [
                `Unclear functional intent: The edge-detector case above is a textbook instance: one part of a description says one thing, a later section says another, and the model never flags the contradiction - it just silently picks a side.`,
                `Ambiguous interface boundaries: Specs frequently under-describe what happens at the edges of an interface: which signal has priority when two conditions overlap, what a width mismatch should do, what "invalid" actually means for a given port. Humans default to convention. Agents default to whatever reading minimizes their own uncertainty, which is not the same thing.`,
                `Missing reset and initialization behavior: Reset polarity, synchronous versus asynchronous behavior, and initial register values are exactly the kind of detail that feels too obvious to write down - right up until it's the line item that fails timing closure or, worse, passes simulation and fails in the lab.`,
              ]
            },
            { type: 'p', text: `None of these are exotic edge cases. They are the ordinary texture of how specifications get written by people who already know what they mean and are writing for other people who will fill in the rest.` },
            { type: 'img', src: 'assets/blogs/spec-bottleneck-ambiguity.png', alt: 'Three ways a specification can become ambiguous' },
            { type: 'caption', text: 'Figure 1. The three recurring ambiguity classes behind LLM-generated RTL errors.' },
          ]
        },
        {
          heading: "Why a Smarter Model Doesn't Fix It",
          blocks: [
            { type: 'p', text: `It's tempting to treat this as a model-capability problem - wait for the next generation of LLMs and the ambiguity will resolve itself. But ambiguity in a spec isn't a knowledge gap the model is missing; it's information that was never in the document in the first place. No amount of additional model capability can recover a decision that no one made.` },
            { type: 'p', text: `This is precisely why multi-agent RTL pipelines have started inserting an explicit translation step between the spec and the code. One architecture for generating hardware from complex, unstructured specification documents - spanning prose, tables, and timing diagrams - routes everything through an intermediate representation before any RTL gets written, precisely because direct spec-to-Verilog generation keeps reproducing the same class of semantic errors.[3] Related work on verified code generation reaches the same architectural conclusion from the formal-verification side: route through a structured, checkable intermediate form before synthesis, rather than generating hardware directly from prose.[4]` },
            { type: 'p', text: `The pattern repeats outside RTL generation, too. In hardware verification, formal methods researchers have spent years building tools that translate natural-language requirements into temporal logic - the formal language that model checkers and assertion engines actually consume. One such framework doesn't just produce a translation; it maps each fragment of the resulting formula back to the exact phrase in the original sentence that produced it, specifically so a human can see where the model resolved an ambiguity and correct it before it propagates anywhere downstream.[5][6]` },
            { type: 'p', text: `Consider a deceptively simple requirement: two requests should never be granted at the same time, and a grant should always eventually follow a request. Stated in a sentence, that sounds complete. Formalized, it's a precise conjunction of mutual-exclusion and eventual-response properties - and the act of formalizing it is what surfaces the question nobody asked out loud: eventually according to what bound? The English sentence was fluent. The formal version is the part that's actually correct, or visibly incomplete.` },
            { type: 'p', text: `Fluency is not the same as completeness. Agents are exceptionally good at the former and indifferent to the latter.` },
            { type: 'img', src: 'assets/blogs/spec-bottleneck-flow.png', alt: 'Where formalization sits in the chip design flow' },
            { type: 'caption', text: 'Figure 2. The formalization layer sits between prose and generation, where ambiguity surfaces once instead of silently downstream.' },
          ]
        },
        {
          heading: 'Formalization Is the Missing Step',
          blocks: [
            { type: 'p', text: `If ambiguity lives in the spec and not in the model, then the highest-leverage place to intervene in an agentic chip design flow isn't the generation step at all. It's the step before it - the one that turns a prose document, however well written, into something with only one possible reading.` },
            { type: 'p', text: `That's a different kind of product than "better RTL generation," and it's worth being precise about what it actually requires. It means structured specification schemas that force a functional description to declare its edge cases instead of implying them. It means an intermediate representation that an agent, a verification engine, and a human reviewer can all inspect and agree on before a single line of RTL gets written. It means traceability from every formalized clause back to the sentence that produced it, so a contradiction surfaces as a flagged question rather than a silent design decision three weeks from a tape-out.` },
            { type: 'p', text: `None of this is about distrusting the model. It's about recognizing that a model faithfully executing an ambiguous instruction will produce a faithfully ambiguous result - confidently, consistently, and without raising its hand. The fix isn't a smarter executor. It's a spec that doesn't need one.` },
            { type: 'p', text: `For a platform built around the idea of going from specification straight to netlist, that reframes the hardest engineering problem on the roadmap. The interesting work was never going to be generating Verilog faster. It's building the formalization layer that makes the spec itself trustworthy enough to generate from - the layer where ambiguity gets caught on a reviewer's screen instead of in a customer's silicon.` },
          ]
        },
        {
          heading: 'About CaretEDA',
          blocks: [
            { type: 'p', text: 'CaretEDA builds AI-native design systems for modern semiconductor teams, with its Spec-to-Netlist™ platform serving as a powerful force multiplier across the entire engineering workflow. To learn more or request a demo, contact info@careteda.com' },
          ]
        },
        {
          heading: 'References',
          blocks: [
            { type: 'ref', text: '[1] A Critical Review and Evaluation of LLMs for RTL Generation. ', href: 'https://www.researchgate.net/publication/400927513_A_Critical_Review_and_Evaluation_of_LLMs_for_RTL_Generation' },
            { type: 'ref', text: '[2] Understanding and Mitigating Errors of LLM-Generated RTL Code. arXiv:2508.05266. ', href: 'https://arxiv.org/pdf/2508.05266' },
            { type: 'ref', text: '[3] Spec2RTL-Agent: Automated Hardware Code Generation from Complex Specifications Using LLM Agent Systems. arXiv:2506.13905. ', href: 'https://arxiv.org/pdf/2506.13905' },
            { type: 'ref', text: '[4] Proof2Silicon: Prompt Repair for Verified Code and Hardware Generation via Reinforcement Learning. arXiv:2509.06239. ', href: 'https://arxiv.org/pdf/2509.06239' },
            { type: 'ref', text: '[5] Cosler, M., Hahn, C., Mendoza, D., Schmitt, F., and Trippel, C. nl2spec: Interactively Translating Unstructured Natural Language to Temporal Logics with Large Language Models. CAV 2023, arXiv:2303.04864. ', href: 'https://arxiv.org/abs/2303.04864' },
            { type: 'ref', text: '[6] SIGARCH Blog: Interactively Translating Unstructured Natural Language to Temporal Logics with nl2spec. ', href: 'https://www.sigarch.org/interactively-translating-unstructured-natural-language-to-temporal-logics-with-nl2spec/' },
          ]
        },
      ]
    },

    'verilator': {
      title: 'Verilator: The Open-Source Simulator Reshaping Chip Design',
      date: 'May 2026',
      readTime: '5 min read',
      wordCount: '1,000 words',
      category: 'Open Source & EDA',
      author: 'Sashi Obilisetti',
      authorRole: 'Co-founder & CEO, CaretEDA',
      heroImage: 'assets/blogs/verilator-image1.jpg',
      summary: 'How a tool born at Digital Equipment Corporation in 1994 ended up at the center of chip verification for some of the world\'s most demanding silicon.',
      sections: [
        {
          paragraphs: [
            'When Tesla set out to validate the neural processing unit (NPU) inside their Full Self-Driving chip, they hit a scaling wall with commercial simulators. Their solution? An open-source tool called Verilator. Their senior director of Autopilot Hardware stated publicly at HotChips 2019 that Verilator was central to proving the quality of their design.',
            'Tesla isn\'t alone. Google, AMD, Microsoft, and NVIDIA all rely on Verilator for the Caliptra Root of Trust project — an open-source silicon root of trust for datacenter-class SoCs. Western Digital has championed it for years, using it to verify their VeeR RISC-V cores and funding much of the tool\'s recent UVM work through the CHIPS Alliance. lowRISC\'s OpenTitan, CERN\'s radiation-tolerant SoC ecosystem, and NXP have all adopted it. The RISC-V community has largely standardized on it.',
          ]
        },
        {
          image: 'assets/blogs/verilator-image2.png',
          imageAlt: 'The Verilator Ecosystem',
          paragraphs: [
            'How did a project born at Digital Equipment Corporation in 1994 end up at the center of chip verification for some of the world\'s most demanding silicon?',
          ]
        },
        {
          heading: 'Why Simulation Matters in Chip Design',
          paragraphs: [
            'A modern SoC can contain billions of transistors and take years to design. Once a chip goes to fabrication, a bug isn\'t something you fix with a patch — it means a respin, months of delay, and enormous financial damage. Simulation is the primary mechanism engineers use to catch those bugs before they become permanent.',
          ]
        },
        {
          image: 'assets/blogs/verilator-image3.png',
          imageAlt: 'The Chip Design Flow',
          paragraphs: [
            'RTL simulation lets designers describe hardware in Verilog or SystemVerilog, then exercise it against testbenches modeling real-world input. The quality and speed of this simulation directly determines how much of the design space a team can explore before committing to silicon. Traditional commercial simulators are powerful but expensive — license costs scale with engineers, cores, and parallel regressions. Verilator, being fully open sourced, lets teams scale with compute instead of licenses.',
          ]
        },
        {
          heading: 'A Brief History of Verilator',
          image: 'assets/blogs/verilator-image4.png',
          imageAlt: 'Verilator Timeline',
          paragraphs: [
            'Verilator was born in 1994 at Digital Equipment Corporation as a Verilog-to-C conversion tool, and was released into the public domain in 1998.',
            'Verilator\'s modern era began in 2001 when Wilson Snyder absorbed it into the Veripool open-source project. Under Snyder\'s ongoing stewardship, the community tore down the legacy codebase, rewrote it entirely in C++, integrated a SystemC mode, and supercharged its execution speeds. In 2022, Verilator 5.0 introduced an IEEE-compliant scheduler and delay semantics, a fundamental architectural change that opened the door to event-driven simulation and UVM support. Today it\'s a community project guided by the CHIPS Alliance under the Linux Foundation.',
          ]
        },
        {
          heading: 'Cycle-Based vs. Event-Driven Simulation',
          paragraphs: [
            'Event-driven simulation is the traditional approach. The simulator maintains an event queue ordered by simulation time. When a signal changes, it schedules downstream events based on propagation delays and IEEE 1800 scheduling semantics. Every delta cycle and intra-assignment delay is faithfully modeled. This gives high fidelity but at significant performance cost.',
            'Cycle-based simulation, Verilator\'s historical approach, evaluates the entire design once per clock edge. Intra-cycle timing is ignored. The result is a model that\'s functionally equivalent at clock boundaries but doesn\'t reproduce what happens between them. Without an event queue or delta cycles to process, it runs dramatically faster.',
          ]
        },
        {
          image: 'assets/blogs/verilator-image5.png',
          imageAlt: 'Event-Driven vs Cycle-Based simulation waveforms',
          paragraphs: [
            'For most design verification — checking pipeline correctness, bus protocol behavior, state machine transitions — cycle-accurate behavior is exactly what you need. Verilator exploits this by compiling to highly optimized C++ that can be multithreaded. The result is performance roughly 100x faster than interpreted simulators, with an additional 2–10x from multithreading. The historical limitation was that cycle-based simulation couldn\'t run UVM testbenches. That has now been largely addressed.',
            'Think of event-driven simulation as a movie director micro-managing every single frame, tracking every actor\'s minor flinch. Cycle-based simulation, by contrast, is like a time-lapse camera taking a single snapshot exactly when the clock strikes the hour. It skips the messy intermediate drama (glitches and delta cycles), allowing Verilator to cross the finish line dramatically faster.',
          ]
        },
        {
          heading: 'Recent Changes: Why Verilator Is More Relevant Than Ever',
          paragraphs: [
            'The past few years have seen remarkable acceleration in Verilator\'s capabilities, driven primarily by Antmicro with Western Digital, Google, and the CHIPS Alliance community.',
          ]
        },
        {
          heading: 'Event-Driven Scheduling & UVM Support',
          paragraphs: [
            'Starting with coroutine-based dynamic scheduling and culminating in the IEEE-compliant scheduler in v5.0, Verilator now handles the constructs UVM requires. As of late 2025, it can elaborate upstream UVM 2017-1.0 without patches. Virtual interfaces, parameterized classes, constrained randomization with SMT solvers, concurrent assertions, and clocking blocks have all been implemented. Antmicro has demonstrated Verilator running axi-vip, a UVM-based verification IP for AXI bus systems.',
          ]
        },
        {
          heading: 'Constrained Randomization & DUT Integration',
          paragraphs: [
            'Verilator now supports constrained random verification through external SMT solvers, covering if-else constraints, inline constraints, rand_mode, solve..before, and randomization of arrays and structs. For DUT integration, the --binary flag generates standalone executables, improved VPI support enables richer verification environments, and Cocotb integration lets teams write Python testbenches with Verilator\'s speed.',
          ]
        },
        {
          heading: 'Performance & SystemVerilog Coverage',
          paragraphs: [
            'Hierarchical verilation, multithreaded model generation, DPI profiling, NUMA-aware threads, and expression coverage have all landed recently. Gaps in generic interfaces, unpacked structs, signal strengths, and covergroups continue to close.',
          ]
        },
        {
          heading: 'Looking Ahead',
          paragraphs: [
            'The technical gap is evaporating. With patchless UVM 2017 support fully live and UVM 2020 firmly on the horizon, the calculus has fundamentally shifted. For modern engineering teams, the combination of raw simulation throughput and zero-cost scaling makes Verilator an indispensable asset. The question is no longer whether you can afford to use open-source verification—it\'s whether you can afford to ignore it.',
          ]
        },
        {
          heading: 'From Open Source to Production-Ready',
          paragraphs: [
            'Open source tools are only as useful as the support behind them. Teams evaluating Verilator for production flows often need guaranteed response times, long-term release stability, and validated builds for their target OS. CaretEDA\'s 2026.05 release includes Verilator with exactly that — SLA-backed support, long-term release maintenance, and platform-specific packages so your verification team can adopt with confidence.',
          ]
        },
        {
          heading: 'About CaretEDA',
          paragraphs: [
            'CaretEDA builds AI-native design systems for modern semiconductor teams, with its Spec-to-Netlist™ platform serving as a powerful force multiplier across the entire engineering workflow. To learn more or request a demo, contact info@careteda.com',
          ]
        },
      ]
    },

    'code-generation': {
      title: 'Generating SystemVerilog Is Easy. Generating Hardware Is Not.',
      date: 'April 2026',
      readTime: '5 min read',
      wordCount: '1,008 words',
      category: 'AI & Hardware Design',
      author: 'Sashi Obilisetty',
      authorRole: 'Co-founder & CEO, CaretEDA',
      heroImage: 'assets/blogs/code-generation-perspective.jpg',
      summary: 'LLMs can produce RTL that compiles and simulates — but hardware is a contract with physics, and physics does not accept plausible drafts.',
      keyTakeaways: [
        'Generating SystemVerilog is not the same as generating manufacturable hardware.',
        '"If it simulates, it works" is a costly fallacy—silicon must survive synthesis, timing closure, verification, and fabrication.',
        'PPA (power, performance, area) is the true objective function, and models need explicit alignment to it.',
      ],
      sections: [
        {
          heading: 'Why AI-Driven Chip Design Demands More Than Code Generation',
          blocks: [
            { type: 'p', text: 'Large language models can generate SystemVerilog today. That milestone has already been crossed. What hasn\'t been crossed—and what continues to confuse even experienced technologists—is the assumption that generating RTL is equivalent to generating hardware. It isn\'t. Bridging that gap requires more than access to a model. Individual practitioners prompting their way to RTL, or organizations grafting software-era AI workflows onto silicon without the verification and synthesis infrastructure to backstop the model, are the ones most likely to fail quietly — and expensively. This distinction matters because the industry is racing to apply software-era AI workflows to silicon. The temptation is understandable: LLMs transformed software productivity almost overnight. Why wouldn\'t the same thing happen in hardware?' },
            { type: 'p', text: 'Because hardware is not software with stricter syntax. Hardware is a contract with physics, and physics does not accept plausible drafts.' },
          ]
        },
        {
          heading: 'The Seductive Fallacy: "If It Simulates, It Works"',
          blocks: [
            { type: 'p', text: 'SystemVerilog is text. Hardware is what survives synthesis, timing closure, verification, and fabrication. An LLM can learn SystemVerilog syntax, idioms, and even common microarchitectural patterns. It can produce RTL that compiles, simulates, and looks convincing to a human reviewer. But none of those properties guarantee that the design can be manufactured—or that it will behave correctly once it is.' },
            { type: 'p', text: 'This is why generating RTL is easy, but generating real hardware is not. The difference is not one of scale or polish. It is structural.' },
          ]
        },
        {
          heading: 'Factors That Actually Determine Hardware Success',
          blocks: []
        },
        {
          heading: 'PPA Is the Objective Function',
          blocks: [
            { type: 'p', text: 'Power, performance, and area are not secondary metrics. They are the outcome that determines whether a chip ships.' },
            { type: 'p', text: 'An LLM can generate RTL that is:' },
            { type: 'ul', items: ['Functionally correct', 'Synthesis-clean', 'Fully verified'] },
            { type: 'p', text: '…and still be unusable because it:' },
            { type: 'ul', items: ['Exceeds the target area by 2–4X', 'Violates power envelope constraints', 'Forces micro-architectural rework at the synthesis or place-and-route stage'] },
            { type: 'p', text: 'This is not a failure of intelligence. It is a failure of objective alignment.' },
            { type: 'p', text: 'Experienced hardware engineers internalize PPA tradeoffs instinctively. Models do not—unless those tradeoffs are explicitly encoded into the generation pipeline.' },
          ]
        },
        {
          heading: 'Domain Priors Are Mandatory, Not Optional',
          blocks: [
            { type: 'p', text: 'Hardware design is governed by accumulated domain knowledge that is rarely explicit in code:' },
            { type: 'ul', items: ['What constitutes a safe clock domain crossing', 'Which constructs are synthesizable versus simulation-only', 'How reset sequencing interacts with power domain boundaries', 'How bus protocols (AXI, AHB, PCIe) behave under backpressure, stall, and error-injection conditions'] },
            { type: 'p', text: 'These are not stylistic conventions. They are invariants.' },
            { type: 'p', text: 'LLMs trained on mixed HDL corpora do not inherently distinguish between:' },
            { type: 'ul', items: ['Behavioral examples and production RTL', 'FPGA-friendly constructs and ASIC-safe ones', 'Tutorial code and million-line SoC design patterns'] },
            { type: 'p', text: 'Without embedded domain priors, a model will generate RTL that looks right and simulates cleanly—and still cannot be manufactured. This is why prompt engineering alone is insufficient. Hardware generation requires structural constraints baked into the generation process, not applied afterward.' },
          ]
        },
        {
          heading: 'Correct-by-Construction Beats Debug-by-Iteration',
          blocks: [
            { type: 'p', text: 'Software tolerates iteration. Hardware punishes it.' },
            { type: 'p', text: 'In software, a bad suggestion costs a failed test. In hardware, the same mistake can cost:' },
            { type: 'ul', items: ['Weeks of synthesis and place-and-route churn', 'A metal-layer engineering change order (ECO)', 'Or a full tape-out re-spin'] },
            { type: 'p', text: 'That asymmetry changes the rules. Hardware flows demand correct-by-construction properties:' },
            { type: 'ul', items: ['No unintended latches', 'No combinational loops', 'No illegal clock domain crossing (CDC) paths', 'No ambiguous reset semantics'] },
            { type: 'p', text: 'These are not things you "test into correctness." They must be structurally impossible. An LLM that emits RTL without enforcing these invariants is not generating hardware. It is generating latent risk.' },
          ]
        },
        {
          heading: 'Timing Is a First-Class Constraint, Not a Post-Hoc Optimization',
          blocks: [
            { type: 'p', text: 'In software, time is abstract. In hardware, time is the design.' },
            { type: 'p', text: 'Two RTL implementations that are functionally identical can differ dramatically in:' },
            { type: 'ul', items: ['Maximum clock frequency', 'Setup and hold margin', 'Sensitivity to PVT (process, voltage, temperature) corners'] },
            { type: 'p', text: 'LLMs do not reason about:' },
            { type: 'ul', items: ['Critical paths', 'Fanout-induced delay and buffer-tree implications', 'Retiming opportunities', 'Physical locality after placement'] },
            { type: 'p', text: 'Yet these factors determine whether a design closes timing—or fails weeks before tape-out.' },
            { type: 'p', text: 'Hardware generation without timing awareness is fundamentally misaligned with the realities of physical implementation.' },
          ]
        },
        {
          heading: 'Specification Fidelity Is Harder Than Code Correctness',
          blocks: [
            { type: 'p', text: 'The hardest problem in hardware is not writing RTL. It is ensuring the RTL means what the specification meant.' },
            { type: 'p', text: 'Natural-language specs are ambiguous. Hardware is not.' },
            { type: 'p', text: 'A single misinterpreted sentence can result in:' },
            { type: 'ul', items: ['A dropped corner case in a state machine or handshake sequence', 'A protocol violation under rare conditions', 'A silicon bug that escapes simulation and is only caught during post-silicon validation—or in the field'] },
            { type: 'p', text: 'Verifying spec-to-RTL fidelity requires formal methods, exhaustive testbenches, and equivalence checking across abstraction levels. Plausible interpretations are not enough. Hardware demands provable ones.' },
          ]
        },
        {
          heading: 'The Takeaway',
          blocks: [
            { type: 'p', text: 'SystemVerilog generation is tractable because it reduces to statistical language modeling—predicting likely token sequences from training corpora.' },
            { type: 'p', text: 'Hardware generation is hard because it is:' },
            { type: 'ul', items: ['Physically constrained', 'Timing-sensitive', 'PPA-driven', 'Verification-heavy', 'Economically unforgiving'] },
            { type: 'p', text: 'The future belongs to tools that internalize this distinction—encoding physical constraints, PPA objectives, and verification requirements directly into the generation pipeline rather than bolting them on after the fact.' },
            { type: 'p', text: 'LLMs are powerful generative engines. But silicon does not ship on plausibility. It ships on correctness—provable, synthesizable, timing-clean correctness.' },
            { type: 'p', text: 'The question is not whether AI can write SystemVerilog. It is whether AI can deliver hardware. That requires teams willing to deeply examine their existing flows, identify and prioritize optimization opportunities, understand real user behaviors, and enable agentic workflows that sustain a competitive edge.' },
          ]
        },
        {
          heading: 'About CaretEDA',
          blocks: [
            { type: 'p', text: 'CaretEDA builds AI-native design systems for modern semiconductor teams, with its Spec-to-Netlist™ platform serving as a powerful force multiplier across the entire engineering workflow. To learn more or request a demo, contact info@careteda.com' },
          ]
        },
      ]
    },

    'silicon-imperative': {
      title: 'The Silicon Imperative',
      subtitle: 'Rising Chip Design Complexity, Shrinking Tapeout Cycles, and the AI Transformation of System Design',
      date: 'March 2026',
      readTime: '5 min read',
      wordCount: '1,000 words',
      category: 'Industry & Strategy',
      author: 'Sashi Obilisetty',
      authorRole: 'Co-founder & CEO, CaretEDA',
      heroImage: 'assets/blogs/silicon-imperative.jpg',
      summary: 'Rising chip design complexity, shrinking tapeout cycles, and why the $775B semiconductor market is making AI-native design a strategic necessity.',
      keyTakeaways: [
        'The global semiconductor market reached $775B in 2024 and is projected to hit $1.6T by 2030 — but design complexity is outpacing productivity gains at every advanced node.',
        'Advanced chip design cycles of 3–5 years are colliding with 12–18 month market windows, making schedule compression an economic imperative, not merely an efficiency goal.',
        'A talent shortfall estimated at one million workers by 2030 is making AI-driven design tools a strategic necessity rather than an optional enhancement.',
        'Organizations that adopt AI-first design will compound advantages in speed to market, design quality, and engineering leverage — while those that wait will find the gap increasingly difficult to close.',
      ],
      sections: [
        {
          heading: 'Silicon Is Everywhere — And Getting Harder to Design',
          paragraphs: [
            'The silicon chip is no longer a niche component buried inside data centers and defense systems. It is the invisible substrate of modern life — embedded in thermostats, satellites, vehicles, and medical devices alike. The global semiconductor market reached approximately $775 billion in 2024, and McKinsey projects it could hit $1.6 trillion by 2030. Deloitte\'s 2026 outlook places annual sales at roughly $975 billion for the current year alone, a historic peak driven overwhelmingly by AI infrastructure demand. This ubiquity is not a passing phase; semiconductors underpin every major technology wave on the horizon, from generative AI and autonomous vehicles to 6G telecommunications and edge computing.',
            'But the very forces driving demand are also driving complexity to unprecedented levels. As structures shrink below five nm, design rule sets expand dramatically, verification burdens multiply, and the number of mask layers needed for fabrication grows disproportionately with each node. McKinsey\'s research has documented this problem bluntly: average design complexity is growing faster than average design productivity, even as the industry increases its reliance on reusable IP. A single leading-edge chip at the 3nm node can cost upward of $500 million in R&D — a figure only a handful of end markets can justify. Few companies worldwide are even capable of designing and manufacturing chips below 14nm, because the requisite skills, capital, and organizational discipline form an extraordinarily high barrier to entry.',
          ]
        },
        {
          heading: 'The Tapeout Timeline Problem',
          paragraphs: [
            'The most consequential pressure facing the industry today is the collision between lengthening design cycles and accelerating market windows. Some advanced designs now take three to five years from concept to first silicon — a timeline that is untenable in markets where product generations turn over in twelve to eighteen months. Deloitte\'s semiconductor outlook has emphasized what the industry calls a "shift-left" imperative: moving quality, validation, and optimization activities earlier in the design process so that downstream iterations shrink and the overall schedule compresses. This is not merely an efficiency preference; it is an economic survival strategy. The semiconductor industry\'s winner-take-all dynamics — documented by McKinsey across multiple semiconductor market studies — mean that the company whose chip reaches market six months ahead of its competitor often captures the vast majority of available segment revenue.',
            'The talent dimension compounds the challenge. Deloitte estimated that the industry needs to add roughly one million skilled workers by 2030. Two years into that forecast, available indicators suggest the gap has continued to widen — the workforce is aging, particularly in the United States and Europe, and the pipeline of new graduates trained in chip design is not keeping pace. Every open engineering position represents potential velocity lost in the tapeout race. AI-driven design tools, already demonstrating the ability to reduce certain design cycle phases by up to 40 percent, are increasingly viewed not as optional enhancements but as the primary mechanism for closing this productivity gap.',
          ]
        },
        {
          heading: 'The Competitive Advantage of AI-First Design',
          paragraphs: [
            'Companies that embed AI into their design workflows — at both the chip and system level — will enjoy compounding advantages. Deloitte reported that semiconductor companies invested approximately $300 million in AI-based design tools in 2023, a figure expected to exceed $500 million by 2026, and 72 percent of semiconductor professionals surveyed believe that generative AI\'s impact on the industry will be high to transformative. Those investments are already translating into measurable returns across several dimensions.',
            'Speed to market is perhaps the most valuable advantage. AI-augmented teams compress tapeout timelines, enabling earlier market entry in an industry where McKinsey has documented that even slightly superior products capture outsize revenue. Design quality improves because AI explores solution spaces orders of magnitude larger than manual methods, yielding better power-performance-area tradeoffs, fewer silicon respins, and higher first-pass yield. Talent leverage grows as AI acts as a force multiplier for scarce engineering teams — Deloitte found that 46 percent of semiconductor leaders are already investing in upskilling programs for AI-driven workflows.',
          ]
        },
        {
          heading: 'Conclusion: Adapt or Fall Behind',
          paragraphs: [
            'Silicon ubiquity is a permanent feature of the technological landscape, and the design complexity that accompanies it will only increase. McKinsey\'s analysis shows that the industry\'s dynamics reward leaders disproportionately, while laggards face margin pressure and market share erosion. AI-driven design is rapidly becoming the dividing line between these two groups. The organizations that treat it as a core strategic capability — not an experimental add-on — will define the next decade of semiconductor and system innovation. Those that wait will find the gap increasingly difficult to close.',
          ]
        },
        {
          heading: 'About CaretEDA',
          blocks: [
            { type: 'html', text: 'CaretEDA builds AI-native design systems for modern semiconductor teams, with its Spec-to-Netlist™ platform serving as a powerful force multiplier across the entire engineering workflow. To learn more or request a demo, contact <a class="text-link" href="mailto:info@careteda.com">info@careteda.com</a>.' },
          ]
        },
        {
          heading: 'Sources and References',
          paragraphs: [
            'McKinsey & Company, "Semiconductor Design and Manufacturing: Achieving Leading-Edge Capabilities," 2020; "What Happens When Chip-Design Complexity Outpaces Development Productivity," McKinsey on Semiconductors; "Hiding in Plain Sight: The Underestimated Size of the Semiconductor Industry," January 2026.',
            'Deloitte, "2025 Global Semiconductor Industry Outlook"; "2026 Semiconductor Industry Outlook," February 2026; "AI in Chip Design," TMT Predictions; "GenAI and the Semiconductor Value Chain"; "Semiconductor Talent Transformation Study," 2025.',
          ]
        },
      ]
    },
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    this.route.params.subscribe(params => {
      this.post = this.posts[params['slug']];
    });
  }
}