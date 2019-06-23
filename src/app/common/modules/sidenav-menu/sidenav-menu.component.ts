import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {SearchBlService} from '../search/search.bl';

@Component({
  selector: 'app-sidenav-menu',
  template: `
    <div class="sidenav-row" *ngFor="let year of years"
         (click)="searchByYear(year)">
      <span>{{ year }}</span>
    </div>
    <div class="sidenav-row">
      <span>[ add more years..]</span>
    </div>
  `,
  styles: [`

    .sidenav-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-radius: inherit;
      font-family: Roboto, "Helvetica Neue", sans-serif;
      font-size: 15px;
      font-weight: 400;
      height: 80px;
      cursor: pointer;
      border-bottom: 1px solid #efefef;
      color: #b3b3b3;
    }

    .sidenav-row-inner img {
      margin-right: 10px;
    }

    .sidenav-row:hover {
      background: rgba(0, 0, 0, .04);
    }

    .pad-right {
      padding: 0 24px;
    }

    mat-icon {
      color: #9023c9;
      margin-right: 10px;
    }
  `]
})
export class SidenavMenuComponent implements OnInit {

  // use moment.js in the future to generate years automatically

  years = [
    2019,
    2018,
    2017,
    2016,
    2015

  ];

  constructor(private router: Router,
              private searchBl: SearchBlService) { // we will use router to navigate from sidenav
  }


  ngOnInit() {
  }

  searchByYear(year: string) {
    this.searchBl.searchByYear(year);
  }


}
