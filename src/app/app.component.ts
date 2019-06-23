import {Component} from '@angular/core';
import {AppContext} from './app-context.service';

@Component({
  selector: 'app-root',
  template: `

    <app-header></app-header>

    <mat-sidenav-container class="app-container">
      <mat-sidenav #sidenav mode="side"
                   [(opened)]="opened">
        <app-sidenav-menu></app-sidenav-menu>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="page-wrapper">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>

  `,
  styles: [`
    :host {
      display: flex;
    }
    mat-progress-bar {
      width: 100%;
    }
    .page-wrapper {
      width: 90%;
      position: absolute;
      left: 0;
      right: 0;
      opacity: 1;
      padding: 0px 65px 20px 65px;
      margin: 0 auto;
      min-width: 800px;

    }

    .app-container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding-top: 65px;
    }

    mat-sidenav {
      padding-top: 65px;
      width: 200px;
      background: #fafafa;
    }

    mat-sidenav-content {
      padding: 0 30px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
  `]
})
export class AppComponent {
  title = 'OMDB app';
  opened = true;

  constructor(private app: AppContext) {

  }




}
