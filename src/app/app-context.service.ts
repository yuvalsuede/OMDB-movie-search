import {Injectable} from '@angular/core';
import * as _ from 'lodash';

export const enum MoviesDataSource {
  SEARCH = 'SEARCH',
  SAVE = 'SAVE',
  ERROR = 'ERROR'
}

@Injectable({
  providedIn: 'root'
})
export class AppContext {

  _scrolledBottom = false;
  _appLoading = false;
  _moviesDataSource: MoviesDataSource;
  _appError = '';

  searchBl: any;
  savedBl: any;

  constructor() {}

  // we can use any logic for page title or name
  get AppName() {
    switch (this.MoviesDataSource) {
      case MoviesDataSource.SAVE:
        return 'Your saved movies';
        break;
      case MoviesDataSource.SEARCH:

        return 'Movie search' + (this.searchBl.CurrentTitle ? ': ' + this.searchBl.CurrentTitle : '' );
        break;
      case MoviesDataSource.ERROR:
        return this.AppError;
        break;
      default:
        return 'Movie search';
    }
  }

  // list of user saved movies
  get SavedMovies() {
    if (this.savedBl) {
      return this.savedBl.SavedMovies;
    }
    return [];
  }

  // current movies context
  get Movies() {
    switch (this.MoviesDataSource) {
      case MoviesDataSource.SEARCH:
        if (this.searchBl) {
          return this.searchBl.Movies;
        }
        break;
      case MoviesDataSource.SAVE:
        return this.SavedMovies;
        break;
      default:
        return [];
    }
  }

  get ScrolledBottom() {
    return this._scrolledBottom;
  }

  set ScrolledBottom(bottom: boolean) {

    this._scrolledBottom = bottom;

    if (bottom && this.searchBl) {

      this.searchBl.checkResults();
    }
  }

  get Loading() {
    return this._appLoading;
  }

  set Loading(loading: boolean) {
    this._appLoading = loading;
  }

  get MoviesDataSource() {
    return this._moviesDataSource;
  }

  set MoviesDataSource(source: MoviesDataSource) {
    this._moviesDataSource = source;
  }

  set AppError(err: string) {
    this._appError = err;
  }

  get AppError() {
    return this._appError;
  }

  resetAll() {
    if (this.searchBl) {
      this.searchBl.resetForm();
      this.searchBl.resetSearch();
      this.searchBl.makeDefaultSearch();
    }
  }
}
