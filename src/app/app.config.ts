import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Scrolling after navigation is handled in App (smooth to sections, instant elsewhere),
    // so the router's own instant jumps are turned off here. The router still emits Scroll events.
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'disabled' }), withRouterConfig({ onSameUrlNavigation: 'reload' }))
  ]
};
