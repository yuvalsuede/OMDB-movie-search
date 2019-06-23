import {NgModule} from '@angular/core';

import {SearchComponent} from './search.component';
import {AppSharedModule} from '../../app-shared.module';
import {SearchBlService} from './search.bl';
import {SearchService} from './search.service';
import {END_POINTS} from '../../services/api.service';
import {api} from './search.api';
import {AppContext} from '../../../app-context.service';

@NgModule({
  imports: [
    AppSharedModule
  ],
  exports: [
    SearchComponent
  ],
  declarations: [
    SearchComponent
  ],
  providers: [
    SearchBlService,
    SearchService,
    {
      provide: END_POINTS,
      multi: true,
      useValue: api // use api from search.api.ts
    }

  ],
})
export class SearchModule {
  constructor(
    private appContext: AppContext,
    private searchBl: SearchBlService
  ) {
    appContext.searchBl = searchBl; // set search bl in app context
  }
}
