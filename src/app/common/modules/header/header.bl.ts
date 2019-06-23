import {Injectable} from '@angular/core';
import {AppContext} from '../../../app-context.service';

@Injectable()
export class HeaderBlService {

  constructor(private app: AppContext) {

  }

  resetAll() {
    this.app.resetAll();
  }

}
