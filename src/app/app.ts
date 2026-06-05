import { Component, HostListener, Inject, PLATFORM_ID, OnDestroy, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html'
})
export class App implements OnDestroy, AfterViewInit {
  title = 'CaretEDA';
  activeSection: string = 'home';
  isMobileMenuOpen: boolean = false;
  indicatorStyle: { [key: string]: string } = { left: '0px', width: '0px', opacity: '0' };

  navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'demo', label: 'Demo' },
    { id: 'team', label: 'Team' },
    { id: 'blog', label: 'Blog' },
    { id: 'ifaq', label: 'IFAQ' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact Us' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.updateIndicator(), 100);
    }
  }

  updateIndicator() {
    if (!isPlatformBrowser(this.platformId)) return;
    const nav = document.querySelector('.pill-nav-container');
    if (!nav) return;
    const items = nav.querySelectorAll('.nav-pill-item');
    const activeIndex = this.navLinks.findIndex(l => l.id === this.activeSection);
    if (activeIndex >= 0 && items[activeIndex]) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = (items[activeIndex] as HTMLElement).getBoundingClientRect();
      this.indicatorStyle = {
        left: (itemRect.left - navRect.left) + 'px',
        width: itemRect.width + 'px',
        opacity: '1'
      };
    }
  }

  expandedBios: { [key: string]: boolean } = {};
  expandedFaqs: { [key: string]: boolean } = {};

  technologyFaqs = [
    { id: 't1', q: 'What does CaretEDA do?', a: 'CaretEDA delivers an AI-native chip design platform for semiconductor engineering teams. Our Spec-to-Netlist™ flow takes a design from initial specification through to netlist generation — compressing tapeout timelines, improving first-pass quality, and acting as a force multiplier for scarce engineering talent.' },
    { id: 't2', q: 'Is the Spec-to-Netlist™ platform available to evaluate?', a: 'Yes, an early availability version is available to limited customers. Core functionality is stable and evaluation-ready.' },
    { id: 't3', q: 'Which design nodes and tool environments do you support?', a: 'CaretEDA is tool-agnostic by design. Our Tool Optionality pillar integrates open-source and commercial EDA tools side by side, so the platform fits into your existing flow regardless of node or toolchain. Specific compatibility questions are best discussed during a discovery call.' },
  ];

  evaluationFaqs = [
    { id: 'e1', q: 'What does a CaretEDA evaluation look like?', a: 'A typical evaluation runs 6–8 weeks. We jointly agree to timelines & success criterion, hold weekly check-ins, and define the flows you will use, including what components of the solution you will evaluate. For early stages, we offer the ability to evaluate on our cloud-hosted environment; however, we expect most serious evaluations to progress to on-premise soon.' },
    { id: 'e2', q: 'What do you need from us to get started?', a: 'We ask for representative design workloads, one or two internal champions from your design engineering team, and roughly 4–6 hours per week of engineering engagement. Contacts in IT teams will be required to ensure LLM configuration as needed. CaretEDA will provide technical support on tool-related issues during the evaluation.' },
    { id: 'e3', q: 'Is there a cost to evaluate?', a: 'Evaluations are offered at no charge for up to 6 weeks. Our goal is to demonstrate measurable impact — teams using AI-augmented flows have seen design cycle phases compress by up to 40% before any commercial discussion takes place.' },
    { id: 'e4', q: 'How do you measure success?', a: 'Success metrics are agreed before the evaluation begins. Common measures include reduction in iteration cycles, improvement in PPA (power-performance-area) outcomes, schedule compression against a baseline, and engineering hours saved. We track and report against these throughout.' },
  ];

  securityFaqs = [
    { id: 's1', q: 'How is our design IP protected during evaluation?', a: 'Evaluation data is kept strictly within your environment and is never used for model training or shared with any third party.' },
    { id: 's2', q: 'Can we run the evaluation on premises?', a: 'Yes. CaretEDA supports both cloud-hosted and on-premises deployments. For teams with strict IP policies or air-gap requirements, an on-premises evaluation is fully supported and is our preferred approach for leading-edge design work.' },
  ];

  nextStepsFaqs = [
    { id: 'n1', q: 'What does commercial pricing look like?', a: 'Pricing is based on team size and deployment scope. Specific details are best discussed in our discovery call.' },
    { id: 'n2', q: 'What happens after the evaluation?', a: 'We review the results together and discuss whether commercial deployment makes sense for your organization. There is no obligation to proceed.' },
    { id: 'n3', q: 'How do we get started?', a: 'Contact us at info@careteda.com to schedule a 1-hour discovery call. We will qualify the opportunity together and, if there is a fit, agree to evaluation scope and kick off within days.' },
  ];

  toggleBio(memberId: string) {
    this.expandedBios[memberId] = !this.expandedBios[memberId];
  }

  toggleFaq(id: string) {
    this.expandedFaqs[id] = !this.expandedFaqs[id];
  }

  toggleMobileMenu() { this.isMobileMenuOpen = !this.isMobileMenuOpen; }

  ngOnDestroy() {}

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) return;

    const scrollY = window.scrollY + window.innerHeight * 0.4;
    const sections = ['contact', 'careers', 'ifaq', 'blog', 'team', 'demo', 'home'];

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        if (this.activeSection !== id) {
          this.activeSection = id;
          setTimeout(() => this.updateIndicator(), 0);
        }
        return;
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    setTimeout(() => this.updateIndicator(), 0);
  }

  scrollTo(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection = sectionId;
      this.isMobileMenuOpen = false;
      setTimeout(() => this.updateIndicator(), 0);
    }
  }
}
