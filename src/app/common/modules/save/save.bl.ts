import {Injectable} from '@angular/core';
import {AppContext, MoviesDataSource} from '../../../app-context.service';
import {StorageService} from '../../services/storage.service';
import {IMovie} from '../../interfaces/movie.interface';
import * as _ from 'lodash';

@Injectable()
export class SaveBlService {

  _savedMovies: IMovie[];

  constructor(private app: AppContext,
              private storage: StorageService) {

    this.getFromStorage();
  }

  saveMovie(movie) {
    const savedStorage = this.storage.api.local.get('saved_movies');

    let movieList = [];

    if (!savedStorage) {
      movieList.push(movie);
      this.storage.api.local.save('saved_movies', JSON.stringify(movieList));

    } else {
      console.log('found storage')
      movieList = Array.from(JSON.parse(savedStorage));

      const movieIndex = movieList.indexOf(movie);

      if (movieIndex < 0) {
        movieList.push(movie);

        this.storage.api.local.save('saved_movies', JSON.stringify(movieList));

        this.SavedMovies = movieList;
      }

    }


  }

  removeMovie(movie) {

    const savedStorage = this.storage.api.local.get('saved_movies');

    if (savedStorage) {
      const movieList: IMovie[] = Array.from(JSON.parse(savedStorage));
      const movieIndex = _.findIndex(movieList, x => x.imdbID === movie.imdbID);

      if (movieIndex >= 0) {
        movieList.splice(movieIndex, 1 );
        this.SavedMovies = movieList;
        this.storage.api.local.save('saved_movies', JSON.stringify(movieList));

      }

    }
  }

  getFromStorage() {
    const savedStorage = this.storage.api.local.get('saved_movies');

    if (savedStorage) {
      const saved: IMovie[] = Array.from(JSON.parse(savedStorage));
      this.SavedMovies = saved;
    }
  }
  getSavedMovies() {

    this.getFromStorage();
    this.app.MoviesDataSource = MoviesDataSource.SAVE;

  }

  set SavedMovies(movies: IMovie[]) {
    this._savedMovies = movies;
  }

  get SavedMovies() {
    return this._savedMovies;
  }

}
