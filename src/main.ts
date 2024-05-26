import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './pages/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
