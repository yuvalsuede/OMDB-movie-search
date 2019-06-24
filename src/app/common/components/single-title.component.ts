import {Component, Input, OnInit} from '@angular/core';
import {AppContext} from '../../app-context.service';
import * as _ from 'lodash';
import {SaveBlService} from '../modules/save/save.bl';
import {OMDB_CONFIG} from '../../config/app.config';

@Component({
  selector: 'app-single-title-component',
  template: `
    <a [href]="getIMDBlink(data)" target="_blank">
      <div class="postPhoto" [style.backgroundImage]="getPoster(data)">

      </div>
    </a>

    <div class="postInfo">
      <div class="source-wrapper">
        <span class="source">
          <mat-icon>movie_filter</mat-icon>
        </span>
      </div>
      <div class="title">{{ data.title }}</div>
    </div>

    <div class="postMeta">
      <div class="details">
        <div class="pull-left">
          <mat-icon class="bookmark"
                    matTooltip="Save movie"
                    (click)="saveMovie(data)"
                    [matTooltipPosition]="'above'">{{Bookmark}}
          </mat-icon>
          <a [href]="getIMDBlink(data)" target="_blank">
            <mat-icon class="imdb-link"
                      matTooltip="View on IMDB"
                      [matTooltipPosition]="'above'"
            >open_in_new
            </mat-icon>
          </a>
        </div>
        <div class="pull-right">{{ data.release_date }}</div>
      </div>
    </div>

  `,
  styles: [`

    :host {
      box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.05);
      transition: box-shadow .3s ease-out, transform .3s ease-out, opacity .2s ease-out;
      transition-delay: .1s;
      border-radius: 4px;
      transform: translateZ(0);
      background-color: #fff;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }


    :host:hover {
      opacity: 1 !important;
      box-shadow: rgba(45, 45, 45, 0.05) 0px 2px 2px, rgba(49, 49, 49, 0.05) 0px 4px 4px, rgba(42, 42, 42, 0.05) 0px 8px 8px, rgba(32, 32, 32, 0.05) 0px 16px 16px, rgba(49, 49, 49, 0.05) 0px 32px 32px, rgba(35, 35, 35, 0.05) 0px 64px 64px;
      transform: translate(0, -4px);
      z-index: 999;
    }

    .postPhoto {
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      background-color: transparent;
      position: relative;
      top: 0;
      width: 100%;
      height: 80%;
    }

    .postInfo {
      position: relative;
      bottom: 0;
      height: 41px;
      padding: 30px 15px 20px 15px;
    }

    .source-wrapper {
      position: absolute;
      top: -12px;
      left: 15px;
      z-index: 1;
    }

    .source-wrapper:before {
      position: absolute;
      top: -5px;
      left: -25px;
      content: "";
      display: block;
      width: 76px;
      height: 26px;
      background-position: right top;
      background-repeat: no-repeat;
      background-size: 76px auto;
      background-image: url(../../../assets/images/bubble.svg);
      clip: rect(0px, 76px, 26px, 10px);
      z-index: 0;
    }

    .source {
      position: relative;
      display: block;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 26px auto;
      height: 26px;
      width: 26px;
      border-radius: 50%;
      z-index: 1;
      top: -1px;
      color: #4051b5;
    }

    .title {
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      overflow: hidden;
      white-space: normal;
      letter-spacing: .5px;
      display: -webkit-box;
      color: #bbb;
      text-shadow: none;
      text-transform: capitalize;
    }

    .postMeta {
      font-size: 14px;
      color: #999;
      width: 100%;
      height: 50px;
      border-top: 1px solid #EAF1F6;
      box-sizing: border-box;
      margin-top: -15px;
    }

    .postMeta .details {
      display: block;
      height: 50px;
      padding: 12px 15px;
      box-sizing: border-box;
    }

    .pull-right {
      float: right !important;
    }

    .pull-left {
      float: left !important;
    }

    .bookmark,
    .imdb-link {
      color: #999;
    }

    .bookmark:hover,
    .imdb-link:hover {
      cursor: pointer;
    }
  `]
})

export class SingleTitleComponent implements OnInit {
  @Input() data;

  constructor(private app: AppContext,
              private save: SaveBlService) {

  }

  ngOnInit() {
  }

  saveMovie(movie) {
    if (!this.IsSaved) {
      this.save.saveMovie(movie);
    } else {
      this.save.removeMovie(movie);
    }
  }

  get IsSaved() {
    const saved = this.app.SavedMovies || [];
    const issaved = saved.length && saved.filter(x => x.id === this.data.id).length > 0;
    return issaved;
  }

  getIMDBlink(movie) {

    const tmdbBase = `https://www.themoviedb.org/movie`;

    return `${tmdbBase}/${movie.id}-${movie.title}`;
  }

  get Bookmark() {

    return this.IsSaved ? 'bookmark' : 'bookmark_border';
  }

  getPoster(movie) {
    return movie.use_cloudinary_poster ? `url(${movie.poster_path})` :
      `url(${OMDB_CONFIG.posterEndpoint}/${movie.poster_path})`;
  }


}
