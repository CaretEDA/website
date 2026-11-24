import { Component, DestroyRef, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterOutlet, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './app.html'
})
export class App {
  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const router = inject(Router);
    const pathOf = (url: string) => url.split('#')[0].split('?')[0];
    let previousPath: string | null = null;

    // Section links glide to their section only while you stay on the same page
    // (e.g. clicking "About CaretEDA" on the home page).
    // Arriving from another page — "Back to careers", "Back to Blog", the first load — lands instantly.
    // Back/forward restores the old position and new pages start at the top, both instantly.
    // Reduced-motion users never get the animation.
    const sub = router.events.pipe(filter((e): e is Scroll => e instanceof Scroll)).subscribe(e => {
      const nav = e.routerEvent;
      const path = pathOf('urlAfterRedirects' in nav ? nav.urlAfterRedirects : nav.url);
      const samePage = previousPath === path;
      previousPath = path;
      const instant = !samePage || matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (e.position) {
        const [left, top] = e.position;
        window.scrollTo({ left, top, behavior: 'instant' as ScrollBehavior });
      } else if (e.anchor) {
        const anchor = e.anchor;
        // wait one frame so the target section is rendered
        requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: instant ? 'instant' as ScrollBehavior : 'smooth', block: 'start' }));
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    });
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());
  }
}
