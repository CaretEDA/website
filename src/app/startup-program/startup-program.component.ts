import { Component, ElementRef, Inject, PLATFORM_ID, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

/** Field ids in the order they appear, so the first error can take the focus. */
const FIELD_ORDER = [
  'sp-name', 'sp-email', 'sp-title', 'sp-li',
  'sp-company', 'sp-site', 'sp-cli', 'sp-size', 'sp-years', 'sp-address', 'sp-captcha',
] as const;
type FieldId = (typeof FIELD_ORDER)[number];

const FREE_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'aol.com', 'icloud.com', 'protonmail.com', 'mail.com', 'yandex.com',
];

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
            <div class="actions" style="margin-top: 16px">
              <button type="button" class="action primary" aria-haspopup="dialog" aria-controls="apply-dialog" (click)="openApplication()">
                Open application <span class="arrow" aria-hidden="true"></span>
              </button>
            </div>
          </div>
          <!-- Facts from the July 2026 DAC announcement -->
          <ul class="program-facts">
            <li><span class="micro">01</span><div><b>Open-source EDA stack</b><span>Simulation, logic synthesis, formal verification and physical synthesis, commercially supported.</span></div></li>
            <li><span class="micro">02</span><div><b>Agentic modules</b><span>CaretEDA's agentic modules, opened to early-stage chip design companies.</span></div></li>
            <li><span class="micro">03</span><div><b>One short application</b><span>Our team reviews each application and gets back to you.</span></div></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Application popup. Native <dialog>: focus stays inside, Esc closes, the page behind is inert.
         Closing never clears what was typed. -->
    <dialog #dialog id="apply-dialog" class="apply-dialog" [class.is-closing]="closing"
            aria-labelledby="apply-title" aria-describedby="apply-desc"
            (cancel)="onCancel($event)" (click)="onBackdropClick($event)">
      <div class="apply-panel">
        <header class="apply-head">
          <div>
            <h2 id="apply-title">Startup program application</h2>
            <p id="apply-desc">{{ isSuccess ? 'Your application is in.' : 'All fields are required. Our team reviews every application.' }}</p>
          </div>
          <button type="button" class="apply-close" (click)="closeApplication()" aria-label="Close application">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </header>

        <!-- Sent: shown only after the form service answered with success -->
        <div *ngIf="isSuccess" class="apply-body apply-done" role="status">
          <span class="apply-done__mark" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
          </span>
          <h3>Application submitted</h3>
          <p>Thank you for your interest in the CaretEDA Startup Program. Our team will review your application and get back to you shortly.</p>
        </div>

        <form *ngIf="!isSuccess" id="apply-form" class="apply-body" novalidate (submit)="onSubmit($event)">
          <input type="hidden" name="access_key" value="d69a89ae-51cd-44a7-a562-a33184045f2f">
          <input type="hidden" name="subject" value="New Startup Program Application">
          <input type="hidden" name="from_name" value="CaretEDA Website">

          <fieldset class="apply-group">
            <legend>About you</legend>
            <div class="apply-grid">
              <div class="field">
                <label for="sp-name">Name</label>
                <input id="sp-name" type="text" name="Name" class="input" maxlength="30" autocomplete="name"
                       [attr.aria-invalid]="errors['sp-name'] ? 'true' : null" [attr.aria-describedby]="errors['sp-name'] ? 'sp-name-error' : null">
                <p class="field__error" id="sp-name-error" *ngIf="errors['sp-name']">{{ errors['sp-name'] }}</p>
              </div>
              <div class="field">
                <label for="sp-email">Business email</label>
                <input id="sp-email" type="email" name="Business_Email" class="input" maxlength="50" autocomplete="email" placeholder="you@company.com"
                       [attr.aria-invalid]="errors['sp-email'] ? 'true' : null" [attr.aria-describedby]="errors['sp-email'] ? 'sp-email-error' : null">
                <p class="field__error" id="sp-email-error" *ngIf="errors['sp-email']">{{ errors['sp-email'] }}</p>
              </div>
              <div class="field">
                <label for="sp-title">Title</label>
                <input id="sp-title" type="text" name="Title" class="input" maxlength="30" autocomplete="organization-title" placeholder="CEO / Founder"
                       [attr.aria-invalid]="errors['sp-title'] ? 'true' : null" [attr.aria-describedby]="errors['sp-title'] ? 'sp-title-error' : null">
                <p class="field__error" id="sp-title-error" *ngIf="errors['sp-title']">{{ errors['sp-title'] }}</p>
              </div>
              <div class="field">
                <label for="sp-li">Personal LinkedIn</label>
                <div class="affix"><span>https://</span>
                  <input id="sp-li" type="text" name="Personal_LinkedIn" class="input" maxlength="100" placeholder="linkedin.com/in/janedoe"
                         [attr.aria-invalid]="errors['sp-li'] ? 'true' : null" [attr.aria-describedby]="errors['sp-li'] ? 'sp-li-error' : null"></div>
                <p class="field__error" id="sp-li-error" *ngIf="errors['sp-li']">{{ errors['sp-li'] }}</p>
              </div>
            </div>
          </fieldset>

          <fieldset class="apply-group">
            <legend>Your company</legend>
            <div class="apply-grid">
              <div class="field">
                <label for="sp-company">Company name</label>
                <input id="sp-company" type="text" name="Company_Name" class="input" maxlength="30" autocomplete="organization"
                       [attr.aria-invalid]="errors['sp-company'] ? 'true' : null" [attr.aria-describedby]="errors['sp-company'] ? 'sp-company-error' : null">
                <p class="field__error" id="sp-company-error" *ngIf="errors['sp-company']">{{ errors['sp-company'] }}</p>
              </div>
              <div class="field">
                <label for="sp-site">Company website</label>
                <div class="affix"><span>https://</span>
                  <input id="sp-site" type="text" name="Company_Website" class="input" maxlength="100" autocomplete="url" placeholder="www.company.com"
                         [attr.aria-invalid]="errors['sp-site'] ? 'true' : null" [attr.aria-describedby]="errors['sp-site'] ? 'sp-site-error' : null"></div>
                <p class="field__error" id="sp-site-error" *ngIf="errors['sp-site']">{{ errors['sp-site'] }}</p>
              </div>
              <div class="field">
                <label for="sp-cli">Company LinkedIn</label>
                <div class="affix"><span>https://</span>
                  <input id="sp-cli" type="text" name="Company_LinkedIn" class="input" maxlength="100" placeholder="linkedin.com/company/yourcompany"
                         [attr.aria-invalid]="errors['sp-cli'] ? 'true' : null" [attr.aria-describedby]="errors['sp-cli'] ? 'sp-cli-error' : null"></div>
                <p class="field__error" id="sp-cli-error" *ngIf="errors['sp-cli']">{{ errors['sp-cli'] }}</p>
              </div>
              <div class="apply-pair">
                <div class="field">
                  <label for="sp-size">Employees</label>
                  <select id="sp-size" name="Number_of_Employees" class="input">
                    <option value="1-10">1 – 10</option>
                    <option value="11-50">11 – 50</option>
                    <option value="51-200">51 – 200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>
                <div class="field">
                  <label for="sp-years">Years in business</label>
                  <input id="sp-years" type="text" inputmode="numeric" name="Years_in_Business" class="input" maxlength="3" placeholder="e.g. 2"
                         [attr.aria-invalid]="errors['sp-years'] ? 'true' : null" [attr.aria-describedby]="errors['sp-years'] ? 'sp-years-error' : null">
                  <p class="field__error" id="sp-years-error" *ngIf="errors['sp-years']">{{ errors['sp-years'] }}</p>
                </div>
              </div>
              <div class="field apply-wide">
                <label for="sp-address">Company address</label>
                <textarea id="sp-address" name="Company_Address" rows="2" class="input" maxlength="200" autocomplete="street-address" placeholder="Street, city, state"
                          [attr.aria-invalid]="errors['sp-address'] ? 'true' : null" [attr.aria-describedby]="errors['sp-address'] ? 'sp-address-error' : null"></textarea>
                <p class="field__error" id="sp-address-error" *ngIf="errors['sp-address']">{{ errors['sp-address'] }}</p>
              </div>
            </div>
          </fieldset>

          <div class="apply-captcha">
            <div id="hcaptcha-container" tabindex="-1" [attr.aria-describedby]="errors['sp-captcha'] ? 'sp-captcha-error' : null"></div>
            <p class="field__error" id="sp-captcha-error" *ngIf="errors['sp-captcha']">{{ errors['sp-captcha'] }}</p>
          </div>
        </form>

        <footer class="apply-foot">
          <p class="form__status" role="status" aria-live="polite">{{ status }}</p>
          <div class="apply-actions" *ngIf="!isSuccess">
            <button type="button" class="action secondary" (click)="closeApplication()">Cancel</button>
            <!-- Visible label "Submit"; screen readers hear "Submit application" (name contains the visible label) -->
            <button type="submit" form="apply-form" class="action primary" [disabled]="isSubmitting">
              <ng-container *ngIf="!isSubmitting">Submit<span class="sr-only"> application</span>
                <span class="icon icon--upload" aria-hidden="true"></span></ng-container>
              <ng-container *ngIf="isSubmitting">Submitting…</ng-container>
            </button>
          </div>
          <div class="apply-actions" *ngIf="isSuccess">
            <button type="button" class="action primary" (click)="closeApplication()">Close</button>
          </div>
        </footer>
      </div>
    </dialog>
`
})
export class StartupProgramComponent {
  @ViewChild('dialog') private dialogRef?: ElementRef<HTMLDialogElement>;

  isSubmitting = false;
  isSuccess = false;
  closing = false;
  /** One status line under the form: progress, error count, or a send failure. */
  status = '';
  errors: Partial<Record<FieldId, string>> = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) {}

  private get browser() { return isPlatformBrowser(this.platformId); }

  openApplication() {
    const dialog = this.dialogRef?.nativeElement;
    if (!dialog || dialog.open) return;
    this.closing = false;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', ''); // very old browsers / test DOM
    if (this.browser) {
      document.documentElement.classList.add('dialog-open');
      this.loadCaptcha();
      // Hand the keyboard to the first field rather than the close button.
      setTimeout(() => (dialog.querySelector('#sp-name') as HTMLElement | null)?.focus(), 0);
    }
    this.cdr.detectChanges();
  }

  closeApplication() {
    const dialog = this.dialogRef?.nativeElement;
    if (!dialog || !dialog.open || this.closing) return;
    this.closing = true; // plays the short exit, then closes; typed values stay
    this.cdr.detectChanges();
    const done = () => {
      this.closing = false;
      if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
      if (this.browser) document.documentElement.classList.remove('dialog-open');
      this.cdr.detectChanges();
    };
    const reduced = this.browser && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !this.browser) done(); else setTimeout(done, 120);
  }

  /** Esc: run our close (with its exit) instead of the instant native one. */
  onCancel(event: Event) {
    event.preventDefault();
    this.closeApplication();
  }

  /** A click on the dim area outside the panel lands on the <dialog> itself. */
  onBackdropClick(event: MouseEvent) {
    if (event.target === this.dialogRef?.nativeElement) this.closeApplication();
  }

  private loadCaptcha() {
    const renderCaptcha = () => {
      const w = window as any;
      const container = document.getElementById('hcaptcha-container');
      if (w.hcaptcha && container && container.childNodes.length === 0) {
        w.hcaptcha.render(container, { theme: 'light', sitekey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2' });
      }
    };
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

  /** Checked on submit only, never while typing. Messages name the field and what to type. */
  private validate(data: FormData): Partial<Record<FieldId, string>> {
    const v = (k: string) => String(data.get(k) ?? '').trim();
    const e: Partial<Record<FieldId, string>> = {};

    if (!v('Name')) e['sp-name'] = 'Enter your name.';

    const email = v('Business_Email');
    const domain = email.split('@')[1]?.toLowerCase();
    if (!email) e['sp-email'] = 'Enter your business email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e['sp-email'] = 'Enter an email address with an @, like you@company.com.';
    else if (domain && FREE_EMAIL_DOMAINS.includes(domain)) e['sp-email'] = 'Use your company email address. Personal email providers are not accepted.';

    if (!v('Title')) e['sp-title'] = 'Enter your title.';

    const strip = (u: string) => u.replace(/^https?:\/\//i, '').toLowerCase();
    const li = strip(v('Personal_LinkedIn'));
    const cli = strip(v('Company_LinkedIn'));
    if (!li) e['sp-li'] = 'Enter your LinkedIn profile.';
    else if (!li.includes('linkedin.com/')) e['sp-li'] = 'Enter a LinkedIn profile URL, like linkedin.com/in/janedoe.';

    if (!v('Company_Name')) e['sp-company'] = 'Enter your company name.';
    if (!v('Company_Website')) e['sp-site'] = 'Enter your company website.';

    if (!cli) e['sp-cli'] = "Enter your company's LinkedIn page.";
    else if (!cli.includes('linkedin.com/')) e['sp-cli'] = 'Enter a LinkedIn company URL, like linkedin.com/company/yourcompany.';
    else if (li && cli === li) e['sp-cli'] = 'Personal LinkedIn and Company LinkedIn URLs cannot be the same.';

    const years = v('Years_in_Business');
    if (!years) e['sp-years'] = 'Enter the number of years.';
    else if (!/^\d{1,3}$/.test(years)) e['sp-years'] = 'Enter a whole number, like 2.';

    if (!v('Company_Address')) e['sp-address'] = 'Enter your company address.';

    if (this.browser && (window as any).hcaptcha && !data.get('h-captcha-response')) {
      e['sp-captcha'] = 'Complete the CAPTCHA check.';
    }
    return e;
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    this.errors = this.validate(formData);
    const failed = FIELD_ORDER.filter((id) => this.errors[id]);
    if (failed.length) {
      this.status = failed.length === 1 ? '1 field needs your attention.' : `${failed.length} fields need your attention.`;
      this.cdr.detectChanges();
      const first = failed[0] === 'sp-captcha' ? document.getElementById('hcaptcha-container') : document.getElementById(failed[0]);
      first?.focus();
      first?.scrollIntoView?.({ block: 'center', behavior: 'smooth' });
      return;
    }

    this.isSubmitting = true;
    this.status = '';
    this.cdr.detectChanges();
    const sendingNote = setTimeout(() => { this.status = 'Sending…'; this.cdr.detectChanges(); }, 300);

    // hCaptcha adds 'g-recaptcha-response' for legacy compatibility; Web3Forms would treat it as
    // its Pro reCAPTCHA feature, so it is removed before sending.
    formData.delete('g-recaptcha-response');
    // Store every URL with https:// in front, whatever was pasted.
    for (const field of ['Company_Website', 'Personal_LinkedIn', 'Company_LinkedIn']) {
      const url = String(formData.get(field) ?? '').trim();
      if (url) formData.set(field, 'https://' + url.replace(/^https?:\/\//i, ''));
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();
      if (response.status === 200) {
        this.isSuccess = true;
        this.status = '';
      } else {
        this.status = result.message || 'Something went wrong. Please try again.';
      }
    } catch {
      this.status = 'Network error. Please check your connection and try again.';
    } finally {
      clearTimeout(sendingNote);
      this.isSubmitting = false;
      if (!this.isSuccess && (window as any).hcaptcha) (window as any).hcaptcha.reset();
      this.cdr.detectChanges();
    }
  }
}
