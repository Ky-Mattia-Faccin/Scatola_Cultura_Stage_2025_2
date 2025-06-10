/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './components/app/app.config';
import { AppComponent } from './components/app/app.component';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, appConfig,)
  .catch((err) => console.error(err));
