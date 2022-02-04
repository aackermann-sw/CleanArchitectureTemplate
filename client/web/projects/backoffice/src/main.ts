import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppConfigModel } from '@cad-core/models';
import { ConfigService } from '@cad-core/services';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

fetch('/assets/config.json')
  .then((response: Response) => response.json())
  .then((config: AppConfigModel) => {
    const configService = new ConfigService();
    configService.appConfig = config;

    const bootstrapPromise = platformBrowserDynamic([
      { provide: ConfigService, useValue: configService }
    ]).bootstrapModule(AppModule);

    // Logging bootstrap information
    bootstrapPromise.then(success => console.log(`Bootstrap success`)).catch(err => console.error(err));
  });
