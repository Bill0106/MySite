import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

const platform = platformBrowserDynamic();

enableProdMode(); // Comment this line when in developer mode

platform.bootstrapModule(AppModule);