import {NgModule} from '@angular/core';

import {HeaderComponent} from './header.component';
import {AppSharedModule} from '../../app-shared.module';
import {HeaderBlService} from './header.bl';
import {SearchModule} from '../search/search.module';

@NgModule({
  imports: [
    AppSharedModule,
    SearchModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [
    HeaderBlService
  ],
})
export class HeaderModule {

}
