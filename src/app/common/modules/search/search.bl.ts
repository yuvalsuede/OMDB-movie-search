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
  _pages = 0;

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

  get Pages() {
    return this._pages;
  }

  set Pages(pages: number) {
    this._pages = pages;
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
      console.log(data);
      this.app.Loading = false;

      const success = _.get(data, 'results').length;
      if (success) {
        const movies = _.get(data, 'results');
        this.Movies = movies.map(x => {
          return this.fixPoster(x);
        });

        this.CurrentPage = 1;
        this.Pages = _.get(data, 'total_pages');

        if (this.Pages > this.CurrentPage) {
          this.getMorePages(); // get one more page.. to pretiffy the view
        }

      } else {
        this.app.MoviesDataSource = MoviesDataSource.ERROR;
        this.app.AppError = _.get(data, 'Error');
      }


    });
  }

  fixPoster(movie) {
    if (!movie.poster_path) {
      movie.poster_path = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
      movie.use_cloudinary_poster = true;
    }
    return movie;
  }

  getMorePages() {

    this.app.Loading = true; // set app loading; in general, should be a singleton service to handle this

    // we didn't find a first page with results
    if (!this.CurrentPage || this.CurrentPage >= this.Pages) {
      this.app.Loading = false;
      return;
    }

    const newPage = this.CurrentPage += 1;
    this.searchService.getMoviesByNameAndYear(this.CurrentTitle, this.CurrentYear, `${newPage}`).subscribe((data) => {
      this.app.Loading = false;
      const success = _.get(data, 'results').length;

      if (success) {
        const movies: IMovie[] = _.get(data, 'results');
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
    if (!value) {
      this.resetSearch();
      return;
    }
    this.app.MoviesDataSource = MoviesDataSource.SEARCH;
    this.getMoviesByNameAndYear(value);
  }

  resetSearch() {

    this.app.MoviesDataSource = MoviesDataSource.SEARCH;
    this.app.AppError = '';
    this.Pages = 0;
    this.CurrentTitle = '';
    this.CurrentPage = 0;
    this.Movies = [];
    this.CurrentYear = '';

  }
  resetForm() {
    this.searchFormControl.reset('');
  }

  searchByYear(year: string) {
    let name = this.CurrentTitle;
    if (!name) name = 'family'; // some default name, because of the limit
    this.getMoviesByNameAndYear(name, year);
  }

}
