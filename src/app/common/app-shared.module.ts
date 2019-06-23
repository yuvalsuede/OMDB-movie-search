import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppPageTitleComponent} from './components/page-title.component';
import {MaterialSharedModule} from './material-shared.module';
import {SingleTitleComponent} from './components/single-title.component';

const importExportArray = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  FlexLayoutModule,
  MaterialSharedModule,

];

@NgModule({
  imports: [
    ...importExportArray,
  ],
  declarations: [
    AppPageTitleComponent,
    SingleTitleComponent
  ],
  exports: [
    ...importExportArray,
    AppPageTitleComponent,
    SingleTitleComponent
  ],
  providers: [

  ],
})
export class AppSharedModule {
}
