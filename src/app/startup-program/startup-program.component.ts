import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-startup-program',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="chapter">
      <div>
        <div class="program">
          <div class="head">
            <h2>Startup program</h2>
            <p>Join the next generation of silicon innovators. Apply to get access to CaretEDA's commercially supported open-source EDA stack and agentic modules.</p>
            <div class="actions" *ngIf="!applying" style="margin-top: 16px">
              <button type="button" class="action primary" (click)="openApplication()">Open application <span class="arrow" aria-hidden="true">→</span></button>
            </div>
          </div>
          <!-- Facts from the July 2026 DAC announcement -->
          <ul class="program-facts">
            <li><span class="micro">01</span><div><b>Open-source EDA stack</b><span>Simulation, logic synthesis, formal verification and physical synthesis, commercially supported.</span></div></li>
            <li><span class="micro">02</span><div><b>Agentic modules</b><span>CaretEDA's agentic modules, opened to early-stage chip design companies.</span></div></li>
            <li><span class="micro">03</span><div><b>One short application</b><span>Our team reviews each application and gets back to you.</span></div></li>
          </ul>
        </div>

        <div *ngIf="applying" class="form-card" id="program-form">
          <div *ngIf="isSuccess" class="text-center py-12" role="status">
            <div class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style="background:#dcfce7">
              <svg class="w-7 h-7" style="color:#16a34a" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 class="text-2xl font-medium text-ink mb-3">Application submitted</h3>
            <p class="text-ink-2 text-lg max-w-[32rem] mx-auto">Thank you for your interest in the CaretEDA Startup Program. Our team will review your application and get back to you shortly.</p>
          </div>

          <form *ngIf="!isSuccess" (submit)="onSubmit($event)" class="flex flex-col gap-6">
            <input type="hidden" name="access_key" value="d69a89ae-51cd-44a7-a562-a33184045f2f">
            <input type="hidden" name="subject" value="New Startup program">
            <input type="hidden" name="from_name" value="CaretEDA Website">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="field"><label for="sp-name">Name</label>
                <input id="sp-name" type="text" name="Name" class="input" required maxlength="30" autocomplete="name" placeholder="Jane Doe"></div>
              <div class="field"><label for="sp-email">Business email</label>
                <input id="sp-email" type="email" name="Business_Email" class="input" required maxlength="50" autocomplete="email" placeholder="jane@company.com"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="field"><label for="sp-title">Title</label>
                <input id="sp-title" type="text" name="Title" class="input" required maxlength="30" autocomplete="organization-title" placeholder="CEO / Founder"></div>
              <div class="field"><label for="sp-company">Company name</label>
                <input id="sp-company" type="text" name="Company_Name" class="input" required maxlength="30" autocomplete="organization" placeholder="Company name"></div>
            </div>

            <div class="field"><label for="sp-site">Company website</label>
              <div class="affix"><span>https://</span><input id="sp-site" type="text" name="Company_Website" class="input" required maxlength="100" autocomplete="url" placeholder="www.company.com"></div></div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="field"><label for="sp-li">Personal LinkedIn</label>
                <div class="affix"><span>https://</span><input id="sp-li" type="text" name="Personal_LinkedIn" class="input" required maxlength="100" placeholder="linkedin.com/in/janedoe"></div></div>
              <div class="field"><label for="sp-cli">Company LinkedIn</label>
                <div class="affix"><span>https://</span><input id="sp-cli" type="text" name="Company_LinkedIn" class="input" required maxlength="100" placeholder="linkedin.com/company/careteda"></div></div>
            </div>

            <div class="field"><label for="sp-address">Company address</label>
              <textarea id="sp-address" name="Company_Address" rows="3" class="input" required maxlength="200" autocomplete="street-address" placeholder="Street, city, state"></textarea></div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="field"><label for="sp-size">Number of employees</label>
                <select id="sp-size" name="Number_of_Employees" class="input" required>
                  <option value="1-10">1 - 10</option>
                  <option value="11-50">11 - 50</option>
                  <option value="51-200">51 - 200</option>
                  <option value="200+">200+</option>
                </select></div>
              <div class="field"><label for="sp-years">Years in business (approx)</label>
                <input id="sp-years" type="number" name="Years_in_Business" min="0" max="500" class="input" required placeholder="e.g. 2"></div>
            </div>

            <div class="mt-2 flex justify-center"><div id="hcaptcha-container"></div></div>

            <p *ngIf="errorMessage" class="text-sm text-center" style="color:#dc2626" role="alert">{{ errorMessage }}</p>
            <button type="submit" [disabled]="isSubmitting" class="action primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isSubmitting ? 'Submitting…' : 'Submit application' }}
            </button>
          </form>
        </div>
      </div>
    </section>
`
})
export class StartupProgramComponent {
  isSubmitting = false;
  isSuccess = false;
  errorMessage = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) {}

  applying = false;

  openApplication() {
    this.applying = true;
    this.cdr.detectChanges();
    if (isPlatformBrowser(this.platformId)) {
      // The button disappears once clicked, so hand keyboard and screen-reader focus to the first field.
      document.getElementById('sp-name')?.focus();

      
      const renderCaptcha = () => {
        if ((window as any).hcaptcha) {
          const container = document.getElementById('hcaptcha-container');
          if (container && container.childNodes.length === 0) {
            (window as any).hcaptcha.render(container, {
              theme: 'light',
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
