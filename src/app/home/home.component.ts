import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../shared/scroll.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentSection = 0;
  readonly sectionIds = ['home', 'blog', 'advisors'];
  readonly slides = [0, 1, 2];
  private timer: any = null;
  private initTimer: any = null;
  private resumeTimer: any = null;
  private scrollFn?: () => void;
  private wheelFn?: () => void;
  private touchFn?: () => void;
  private isAutoScrolling = false;

  constructor(
    private scrollService: ScrollService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollService.pendingSection) {
        const section = this.scrollService.pendingSection;
        this.scrollService.pendingSection = null;
        setTimeout(() => {
          const el = document.getElementById(section);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }

      this.scrollFn = () => this.updateActiveSection();
      window.addEventListener('scroll', this.scrollFn, { passive: true });

      this.wheelFn = () => this.onManualScroll();
      this.touchFn = () => this.onManualScroll();
      window.addEventListener('wheel', this.wheelFn, { passive: true });
      window.addEventListener('touchmove', this.touchFn, { passive: true });

      this.startAutoplay();
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
    if (this.resumeTimer !== null) clearTimeout(this.resumeTimer);
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollFn)  window.removeEventListener('scroll',    this.scrollFn);
      if (this.wheelFn)   window.removeEventListener('wheel',     this.wheelFn);
      if (this.touchFn)   window.removeEventListener('touchmove', this.touchFn);
    }
  }

  // Past zone = scrolled past the DOM-lowest auto-scroll section (blog, which sits below advisors)
  private isPastZone(): boolean {
    let maxThreshold = 0;
    for (const id of this.sectionIds) {
      const el = document.getElementById(id);
      if (el) maxThreshold = Math.max(maxThreshold, el.offsetTop + el.offsetHeight * 0.7);
    }
    return window.scrollY > maxThreshold;
  }

  updateActiveSection() {
    if (this.isAutoScrolling) return;
    const scrollY = window.scrollY + window.innerHeight * 0.4;

    // Sort by actual DOM position (offsetTop) descending so we find the
    // deepest section the user has scrolled past — regardless of sectionIds order
    const sorted = this.sectionIds
      .map((id, idx) => ({ idx, top: document.getElementById(id)?.offsetTop ?? 0 }))
      .sort((a, b) => b.top - a.top);

    for (const s of sorted) {
      if (s.top <= scrollY) {
        if (this.currentSection !== s.idx) {
          this.currentSection = s.idx;
          this.cdr.detectChanges();
        }
        return;
      }
    }
    if (this.currentSection !== 0) {
      this.currentSection = 0;
      this.cdr.detectChanges();
    }
  }

  onManualScroll() {
    if (this.isAutoScrolling) return;

    this.stopAutoplay();

    if (this.resumeTimer !== null) {
      clearTimeout(this.resumeTimer);
      this.resumeTimer = null;
    }

    this.resumeTimer = setTimeout(() => {
      this.resumeTimer = null;
      if (!this.isPastZone()) this.startAutoplay();
    }, 1500);
  }

  startAutoplay() {
    this.stopAutoplay();

    const doScroll = () => {
      if (this.isPastZone()) { this.stopAutoplay(); return; }
      const next = (this.currentSection + 1) % this.sectionIds.length;
      this.currentSection = next;
      this.cdr.detectChanges(); // ensure dot updates immediately
      this.scrollToSection(next);
    };

    // First scroll after 2 s, then every 4 s
    this.initTimer = setTimeout(() => {
      this.initTimer = null;
      doScroll();
      this.timer = setInterval(doScroll, 4000);
    }, 2000);
  }

  stopAutoplay() {
    if (this.timer !== null)     { clearInterval(this.timer);     this.timer = null; }
    if (this.initTimer !== null) { clearTimeout(this.initTimer);  this.initTimer = null; }
  }

  scrollToSection(index: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById(this.sectionIds[index]);
    if (el) {
      this.isAutoScrolling = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { this.isAutoScrolling = false; }, 1500);
    }
  }

  goToSection(index: number) {
    this.currentSection = index;
    this.scrollToSection(index);
    this.startAutoplay();
  }
}
