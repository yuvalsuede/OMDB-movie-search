import {NgModule} from '@angular/core';
import {SaveBlService} from './save.bl';
import {AppContext} from '../../../app-context.service';


@NgModule({
  imports: [

  ],
  exports: [],
  declarations: [

  ],
  providers: [
    SaveBlService
  ],
})
export class SaveModule {
  constructor(
    private appContext: AppContext,
    private savedBl: SaveBlService
  ) {
    appContext.savedBl = savedBl; // set search bl in app context
  }
}
