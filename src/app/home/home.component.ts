import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef, NgZone } from '@angular/core';
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
  currentSlide = 0;
  readonly slideCount = 3;
  readonly slides = [0, 1, 2];
  private timer: any = null;
  private initTimer: any = null;
  private carouselListener?: (e: Event) => void;

  constructor(
    private scrollService: ScrollService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.scrollService.pendingSlide !== null) {
        this.currentSlide = this.scrollService.pendingSlide;
        this.scrollService.pendingSlide = null;
        this.cdr.detectChanges();
      } else if (this.scrollService.pendingSection) {
        this.scrollService.pendingSection = null;
      }

      this.carouselListener = (e: Event) => {
        this.ngZone.run(() => {
          this.goToSlide((e as CustomEvent).detail);
        });
      };
      window.addEventListener('carousel-goto', this.carouselListener);

      this.startAutoplay();
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
    if (isPlatformBrowser(this.platformId) && this.carouselListener) {
      window.removeEventListener('carousel-goto', this.carouselListener);
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    const doSlide = () => {
      this.currentSlide = (this.currentSlide + 1) % this.slideCount;
      this.cdr.detectChanges();
    };
    // First slide after 2 s, then every 4 s
    this.initTimer = setTimeout(() => {
      this.initTimer = null;
      doSlide();
      this.timer = setInterval(doSlide, 4000);
    }, 2000);
  }

  stopAutoplay() {
    if (this.timer !== null)     { clearInterval(this.timer);    this.timer = null; }
    if (this.initTimer !== null) { clearTimeout(this.initTimer); this.initTimer = null; }
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.cdr.detectChanges();
    this.startAutoplay();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
    this.cdr.detectChanges();
    this.startAutoplay();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slideCount;
    this.cdr.detectChanges();
    this.startAutoplay();
  }
}
