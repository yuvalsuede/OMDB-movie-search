import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {API} from '../../services/api.service';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {IMovie} from '../../interfaces/movie.interface';

@Injectable()
export class SearchService {

  constructor(private http: HttpService,
              private api: API) {
  }

  getMoviesByNameAndYear(name: string, year: string, page: string ): Observable<IMovie> {
    return this.http.get(this.api.resolve(`${this.api.endPoints.movies}&s=${name}&page=${page}&y=${year}`)).pipe(
      map((res) => {
        return this.http.extractData(res);
      }),
      catchError(err => this.http.handleError(err)));
  }
}
