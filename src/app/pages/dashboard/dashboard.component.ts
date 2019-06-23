import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AppContext} from '../../app-context.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard-component',
  template: `
    <div class="scroll-container">
      <app-page-title [title]="AppName"></app-page-title>
      <mat-grid-list [cols]="breakpointCols"
                     [gutterSize]="'20px'"
                     (window:resize)="onResize($event)">
        <mat-grid-tile *ngFor="let movie of Movies" [rowspan]="1.5">
          <app-single-title-component
            [data]="movie">
          </app-single-title-component>
        </mat-grid-tile>
      </mat-grid-list>
    </div>

  `,
  styles: [`
    mat-grid-tile {
      overflow: visible;
    }

    .scroll-container {
      height: 100%;
      width: 100%;
    }
  `]
})

export class DashboardComponent implements OnInit, OnDestroy {

  breakpointCols;
  cardWidth = 400;

  constructor(private host: ElementRef,
              private app: AppContext) {
  }


  ngOnInit() {
    this.calcBreakpoint();
    window.addEventListener('scroll', _.debounce(this.scroll, 500), true);
  }

  onResize(event) {
    this.calcBreakpoint();
  }

  calcBreakpoint() {
    this.breakpointCols = (window.innerWidth > 800) ? window.innerWidth / this.cardWidth : 1;

  }

  get AppName() {
    return this.app.AppName;
  }

  get Movies() {
    return this.app.Movies;
  }

  scroll = (event) => {

    this.app.ScrolledBottom = false;

    const offset = 5000;

    if (event.target.offsetHeight + event.target.scrollTop + offset >= event.target.scrollHeight) {
      // get more results
      this.app.ScrolledBottom = true;
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
}


