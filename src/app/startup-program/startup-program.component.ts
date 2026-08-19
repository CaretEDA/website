import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-startup-program',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen bg-black text-white pt-32 pb-32 px-4 md:px-8">
      <div class="max-w-[800px] mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-5 pb-2 bg-gradient-to-tr from-white to-[#2563EB] bg-clip-text text-transparent">
            Startup Program Application
          </h1>
          <p class="text-white/70 text-lg md:text-xl">
            Join the next generation of silicon innovators. Apply below to get access to CaretEDA's commercially supported open-source EDA stack and agentic modules.
          </p>
        </div>

        <div class="bg-[#0d1f3c] border border-[#2563EB]/50 rounded-2xl p-8 md:p-12 shadow-[0_10px_30px_rgba(37,99,235,0.1)] backdrop-blur-md">
          
          <!-- Success Message State -->
          <div *ngIf="isSuccess" class="text-center py-12">
            <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Application Submitted Successfully!</h2>
            <p class="text-white/70 text-lg">Thank you for your interest in the CaretEDA Startup Program. Our team will review your application and get back to you shortly.</p>
          </div>

          <!-- Application Form -->
          <form *ngIf="!isSuccess" (submit)="onSubmit($event)" class="flex flex-col gap-6">
            
            <!-- Web3Forms Configuration -->
            <input type="hidden" name="access_key" value="d69a89ae-51cd-44a7-a562-a33184045f2f">
            <input type="hidden" name="subject" value="New Startup Program Application">
            <input type="hidden" name="from_name" value="CaretEDA Website">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-white/90">Name</label>
                <input type="text" name="Name" class="bg-[#112244] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2563EB] transition-colors" required maxlength="30" placeholder="Jane Doe">
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-white/90">Business Email</label>
                <input type="email" name="Business_Email" class="bg-[#112244] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2563EB] transition-colors" required maxlength="50" placeholder="jane@company.com">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-white/90">Title</label>
                <input type="text" name="Title" class="bg-[#112244] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2563EB] transition-colors" required maxlength="30" placeholder="CEO / Founder">
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-white/90">Company Name</label>
                <input type="text" name="Company_Name" class="bg-[#112244] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2563EB] transition-colors" required maxlength="30" placeholder="Company Name">
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-white/90">Company Website</label>
              <div class="flex bg-[#112244] border border-white/10 rounded-lg overflow-hidden focus-within:border-[#2563EB] transition-colors">
                <span class="px-4 py-3 text-white/50 bg-black/20 border-r border-white/10 select-none">https://</span>
                <input type="text" name="Company_Website" class="flex-1 bg-transparent px-4 py-3 text-white focus:outline-none" required maxlength="100" placeholder="www.company.com">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-white/90">Personal LinkedIn</label>
                <div class="flex bg-[#112244] border border-white/10 rounded-lg overflow-hidden focus-within:border-[#2563EB] transition-colors">
                  <span class="px-4 py-3 text-white/50 bg-black/20 border-r border-white/10 select-none">https://</span>
                  <input type="text" name="Personal_LinkedIn" class="flex-1 bg-transparent px-4 py-3 text-white focus:outline-none" required maxlength="100" placeholder="linkedin.com/in/janedoe">
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-white/90">Company LinkedIn</label>
                <div class="flex bg-[#112244] border border-white/10 rounded-lg overflow-hidden focus-within:border-[#2563EB] transition-colors">
                  <span class="px-4 py-3 text-white/50 bg-black/20 border-r border-white/10 select-none">https://</span>
                  <input type="text" name="Company_LinkedIn" class="flex-1 bg-transparent px-4 py-3 text-white focus:outline-none" required maxlength="100" placeholder="linkedin.com/company/careteda">
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-white/90">Company Address</label>
              <textarea name="Company_Address" rows="3" class="bg-[#112244] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2563EB] transition-colors" required maxlength="200" placeholder="123 Innovation Way, Tech City, CA"></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-white/90">Number of Employees</label>
                <select name="Number_of_Employees" class="bg-[#112244] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2563EB] transition-colors appearance-none" required>
                  <option value="1-10">1 - 10</option>
                  <option value="11-50">11 - 50</option>
                  <option value="51-200">51 - 200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-sm font-semibold text-white/90">Years in Business (approx)</label>
                <input type="number" name="Years_in_Business" min="0" max="500" class="bg-[#112244] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2563EB] transition-colors" required placeholder="e.g. 2">
              </div>
            </div>

            <!-- hCaptcha Widget -->
            <div class="mt-2 flex justify-center">
              <div id="hcaptcha-container"></div>
            </div>

            <div class="mt-4">
              <button type="submit" [disabled]="isSubmitting" class="w-full bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)]">
                {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
              </button>
            </div>
            <p *ngIf="errorMessage" class="text-red-400 text-sm text-center mt-2">{{ errorMessage }}</p>
          </form>
        </div>

      </div>
    </section>
  `
})
export class StartupProgramComponent implements OnInit {
  isSubmitting = false;
  isSuccess = false;
  errorMessage = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      
      const renderCaptcha = () => {
        if ((window as any).hcaptcha) {
          const container = document.getElementById('hcaptcha-container');
          if (container && container.childNodes.length === 0) {
            (window as any).hcaptcha.render(container, {
              sitekey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2'
            });
          }
        }
      };

      // Load hCaptcha script dynamically
      if (!document.getElementById('hcaptcha-script')) {
        const script = document.createElement('script');
        script.id = 'hcaptcha-script';
        script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = renderCaptcha;
        document.head.appendChild(script);
      } else {
        setTimeout(renderCaptcha, 100);
      }
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault(); // Prevents the browser from redirecting
    this.isSubmitting = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Validate Business Email domain
    const email = formData.get('Business_Email') as string;
    if (email) {
      const freeEmailDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
        'aol.com', 'icloud.com', 'protonmail.com', 'mail.com', 'yandex.com'
      ];
      const emailDomain = email.split('@')[1]?.toLowerCase();
      
      if (emailDomain && freeEmailDomains.includes(emailDomain)) {
        this.errorMessage = 'Please provide a valid company email address. Personal email providers are not accepted.';
        this.isSubmitting = false;
        this.cdr.detectChanges();
        return;
      }
    }

    // hCaptcha injects a 'g-recaptcha-response' field for legacy compatibility.
    // Web3Forms sees this and thinks we are trying to use the Pro reCAPTCHA feature.
    // We must explicitly delete it before sending the payload.
    formData.delete('g-recaptcha-response');

    // Ensure URLs always have https:// prepended
    const urlFields = ['Company_Website', 'Personal_LinkedIn', 'Company_LinkedIn'];
    urlFields.forEach(field => {
      let url = formData.get(field) as string;
      if (url) {
        url = url.replace(/^https?:\/\//i, ''); // Strip any accidentally pasted protocol
        formData.set(field, 'https://' + url);
      }
    });

    // Validate LinkedIn URLs
    const personalLinkedIn = formData.get('Personal_LinkedIn') as string;
    const companyLinkedIn = formData.get('Company_LinkedIn') as string;
    
    if (personalLinkedIn && !personalLinkedIn.toLowerCase().includes('linkedin.com/')) {
      this.errorMessage = 'Please provide a valid Personal LinkedIn URL (e.g., linkedin.com/in/janedoe).';
      this.isSubmitting = false;
      this.cdr.detectChanges();
      return;
    }

    if (companyLinkedIn && !companyLinkedIn.toLowerCase().includes('linkedin.com/')) {
      this.errorMessage = 'Please provide a valid Company LinkedIn URL (e.g., linkedin.com/company/careteda).';
      this.isSubmitting = false;
      this.cdr.detectChanges();
      return;
    }

    if (personalLinkedIn && companyLinkedIn && personalLinkedIn.toLowerCase() === companyLinkedIn.toLowerCase()) {
      this.errorMessage = 'Personal LinkedIn and Company LinkedIn URLs cannot be the same.';
      this.isSubmitting = false;
      this.cdr.detectChanges();
      return;
    }

    // Check if CAPTCHA was filled
    const captchaResponse = formData.get('h-captcha-response');
    if (!captchaResponse) {
      this.errorMessage = 'Please complete the CAPTCHA checkbox.';
      this.isSubmitting = false;
      this.cdr.detectChanges();
      return;
    }

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });
      
      const result = await response.json();
      
      if (response.status === 200) {
        this.isSuccess = true;
      } else {
        this.errorMessage = result.message || 'Something went wrong. Please try again.';
      }
    } catch (error) {
      this.errorMessage = 'Network error. Please check your connection and try again.';
    } finally {
      this.isSubmitting = false;
      // Reset hCaptcha if it failed
      if (!this.isSuccess && (window as any).hcaptcha) {
        (window as any).hcaptcha.reset();
      }
      this.cdr.detectChanges();
    }
  }
}
