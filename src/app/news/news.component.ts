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
          <article *ngFor="let item of news"
                   class="group bg-[#0d1f3c] border border-[#2563EB]/50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-[#112244] hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)] backdrop-blur-sm">
            <p class="text-[#2563EB] text-xs uppercase tracking-widest font-semibold mb-3">{{ item.date }}</p>
            <h2 class="text-white font-bold text-lg md:text-2xl leading-snug mb-3">{{ item.title }}</h2>
            <p class="text-white/90 text-sm md:text-base leading-relaxed">{{ item.summary }}</p>
          </article>
        </div>

      </div>
    </section>
  `
})
export class NewsComponent implements OnInit {
  ngOnInit() { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }

  news = [
    {
      date: 'May 2026',
      title: 'CaretEDA welcomes new Technical Advisors',
      summary: 'We are thrilled to welcome our esteemed Technical Advisors, Nithya Raghavan and Sridhar Narayanan, to the team. Their deep industry expertise, visionary guidance, and battle-tested engineering experience will be instrumental as we scale our technology and shape the future of our platform.'
    }
  ];
}
