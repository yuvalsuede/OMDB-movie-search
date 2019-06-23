import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderModule} from './common/modules/header/header.module';
import {DashboardModule} from './pages/dashboard/dashboard.module';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSidenavModule
} from '@angular/material';
import {SidenavMenuModule} from './common/modules/sidenav-menu/sidenav-menu.module';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressButtonsModule} from 'mat-progress-buttons';
import {APP_CONFIG, OMDB_CONFIG} from './config/app.config';
import {AppContext} from './app-context.service';
import {API} from './common/services/api.service';
import {CoreModule} from './common/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,

    CoreModule.forRoot(),

    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressButtonsModule.forRoot(),
    MatProgressBarModule,

    AppRoutingModule,

    HeaderModule,

    // pages
    DashboardModule,
    SidenavMenuModule,

  ],
  providers: [
    API,
    AppContext,
    {
      provide: APP_CONFIG,
      useValue: OMDB_CONFIG
    },
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
  ]
})
export class AppModule { }
