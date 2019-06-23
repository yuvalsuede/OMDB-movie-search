import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SearchService} from './search.service';
import {IMovie} from '../../interfaces/movie.interface';
import * as _ from 'lodash';
import {AppContext, MoviesDataSource} from '../../../app-context.service';

@Injectable()
export class SearchBlService {

  searchFormControl: FormControl;

  _movies: IMovie[] = [];
  _currentPage = 0;
  _results = 0;
  _currentTitle = '';
  _currentYear = '';
  _total = 0;

  constructor(private searchService: SearchService,
              private app: AppContext) {
  }

  get CurrentPage() {
    return this._currentPage;
  }

  set CurrentPage(page: number) {
    this._currentPage = page;
  }

  get CurrentYear() {
    return this._currentYear;
  }

  set CurrentYear(year: string) {
    this._currentYear = year;
  }

  get CurrentTitle() {
    return this._currentTitle;
  }

  set CurrentTitle(title: string) {
    this._currentTitle = title;
  }

  get Results() {
    return this._results;
  }

  set Results(results: number) {
    this._results = results;
  }

  get Movies(): IMovie[] {
    return this._movies;
  }

  set Movies(movies: IMovie[]) {
    this._movies = movies;
  }

  createSearchForm() {
    this.searchFormControl = new FormControl();

    return this.searchFormControl;
  }

  get FilteredOptions() {
    return this.Movies ? this.Movies.slice(0, 5) : [];
  }

  makeDefaultSearch() {
    this.getMoviesByNameAndYear('batman');
  }

  getMoviesByNameAndYear(name: string, year: string = '', page = '1') {

    this.resetSearch();

    this.app.Loading = true; // set app loading; in general, should be a singleton service to handle this

    this.CurrentTitle = name;
    this.CurrentYear = year;

    this.searchService.getMoviesByNameAndYear(name, year, page).subscribe((data) => {
      this.app.Loading = false;

      const success = _.isEqual(_.get(data, 'Response'), 'True');
      if (success) {
        const movies = _.get(data, 'Search');
        this._total += movies.length;
        this.Movies = movies.map(x => {
          return this.fixPoster(x);
        });

        this.CurrentPage = 1;
        this.Results = _.get(data, 'totalResults');

        if (this.Results > this._total) {
          this.getMorePages(); // get one more page.. to pretiffy the view
        }

      } else {
        this.app.MoviesDataSource = MoviesDataSource.ERROR;
      }


    });
  }

  fixPoster(movie) {
    if (!movie.Poster || movie.Poster === 'N/A') {
      movie.Poster = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
    }
    return movie;
  }

  getMorePages() {

    this.app.Loading = true; // set app loading; in general, should be a singleton service to handle this

    // we didn't find a first page with results
    if (!this.CurrentPage || this._total >= this.Results) {
      this.app.Loading = false;
      return;
    }

    const newPage = this.CurrentPage += 1;
    this.searchService.getMoviesByNameAndYear(this.CurrentTitle, this.CurrentYear, `${newPage}`).subscribe((data) => {
      this.app.Loading = false;
      const success = _.isEqual(_.get(data, 'Response'), 'True');

      if (success) {
        const movies: IMovie[] = _.get(data, 'Search');
        this._total += movies.length;
        movies.map(x => {
          return this.fixPoster(x);
        });
        this.Movies = (this.Movies).concat(movies);
        this.CurrentPage = newPage;
      } else {
        this.app.MoviesDataSource = MoviesDataSource.ERROR;
      }


    });
  }

  checkResults() {
    this.getMorePages();
  }

  onSearchChange(value) {
    this.app.MoviesDataSource = MoviesDataSource.SEARCH;
    this.getMoviesByNameAndYear(value);
  }

  resetSearch() {
    this.app.MoviesDataSource = MoviesDataSource.SEARCH;
    this.Results = 0;
    this.CurrentTitle = '';
    this.CurrentPage = 0;
    this.Movies = [];
    this.CurrentYear = '';
  }

  searchByYear(year: string) {
    let name = this.CurrentTitle;
    if (!name) name = 'family'; // some default name, because of the limit
    this.getMoviesByNameAndYear(name, year);
  }

}
