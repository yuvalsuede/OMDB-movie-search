import {Component, OnInit} from '@angular/core';
import {IMenuItem} from '../../interfaces/menu.interface';
import {HeaderBlService} from './header.bl';
import {SaveBlService} from '../save/save.bl';


@Component({
  selector: 'app-header',
  template: `
    <div class="header-wrapper">
      <div class="header-left">
        <div class="logo" (click)="resetAll()">
          <mat-icon>movie_filter</mat-icon>
        </div>
      </div>
      <div class="header-right">
        <app-search-component></app-search-component>
        <div class="bookmark" (click)="showSaved()"
        ><mat-icon>bookmark</mat-icon></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      z-index: 10;
      min-width: 800px;

    }

    .header-left {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4051b5;
    }

    .header-right {
      display: flex;
      flex-grow: 2;
      padding: 0 50px;
      justify-content: space-between;
    }

    .header-wrapper {
      height: 60px;
      width: 100%;
      position: fixed;
      border-bottom: 1px solid #ededed;
      display: flex;
    }

    .logo {
      transform: scale(2);
    }
    .logo:hover {
      cursor: pointer;
    }
    .bookmark {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  `]
})

export class HeaderComponent implements OnInit {


  constructor(private headerBl: HeaderBlService,
              private saveBl: SaveBlService) {
  }

  ngOnInit() {
  }

  showSaved() {
    this.saveBl.getSavedMovies();

  }

  resetAll() {
    this.headerBl.resetAll();
  }

}
