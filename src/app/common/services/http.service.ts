import {EMPTY as observableEmpty, Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as _ from 'lodash';

export enum ERROR_CODES {
  OK = 200,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500
}

export const ERROR_MESSAGES = {
  Default: 'An Error occurred'
};

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
  }

  get(url: string, showProgress: boolean = false, options?: any): Observable<any> {
    return this.handleResponse(this._http.get(url, options));
  }

  post(url: string, data?: any, showProgress: boolean = false, options?: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.handleResponse(this._http.post(url, body, this.getRequestOptions(options)));
  }

  put(url: string, data?: any, showProgress: boolean = false, options?: any): Observable<any> {
    const body = JSON.stringify(data);

    return this.handleResponse(this._http.put(url, body, this.getRequestOptions(options)));
  }

  delete(url: string, showProgress: boolean = false, options?: any): Observable<any> {
    return this.handleResponse(this._http.delete(url, options));
  }

  getRequestOptions(options: any) {
    options = options || {};
    if (options.headers) {
      options.headers = options.headers.append('Content-Type', 'application/json');
    } else {
      options.headers = new HttpHeaders();
      options.headers = options.headers.append('Content-Type', 'application/json');
    }
    return options;
  }

  handleResponse(observable: Observable<any>, spinner: boolean = true): Observable<any> {
    return observable.pipe(catchError((err) => {
      if (err) {
        console.log(err);
      }
      if (_.isEqual(ERROR_CODES.UNAUTHORIZED, err.status)) {
        return observableEmpty;
      }
      return observableThrowError(err);
    }), finalize(() => {
    }));
  }

  extractData(response: any) {
    if (_.get(response, 'Response') === 'False') {
      const errorMessage = response['Error']; // do something with it

    }
    return response || {};
  }

  handleError(error: any) {

    console.log(error);
    return observableThrowError(error);
  }

}
