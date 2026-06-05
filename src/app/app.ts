import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html'
})
export class App {
  title = 'CaretEDA';
  activeSection: string = 'home';
  isScrolled: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  expandedBios: { [key: string]: boolean } = {};

  toggleBio(memberId: string) {
    this.expandedBios[memberId] = !this.expandedBios[memberId];
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      this.isScrolled = scrollPosition > 50;

      // Determine active section
      const contactSection = document.getElementById('contact');
      const teamSection = document.getElementById('team');

      const offset = window.innerWidth < 768 ? window.innerHeight * 0.4 : 200;

      if (contactSection && contactSection.getBoundingClientRect().top <= offset) {
        this.activeSection = 'contact';
      } else if (teamSection && teamSection.getBoundingClientRect().top <= offset) {
        this.activeSection = 'team';
      } else {
        this.activeSection = 'home';
      }
    }
  }

  scrollTo(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Set active immediately for better UX
        this.activeSection = sectionId;
      }
    }
  }
}
