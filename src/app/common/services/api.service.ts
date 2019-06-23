import {Inject, Injectable, InjectionToken} from '@angular/core';
import {OMDB_CONFIG} from '../../config/app.config';

export const END_POINTS = new InjectionToken('END_POINTS');

@Injectable()
export class API {
  endPoints: any;
  private _baseUrl = OMDB_CONFIG.apiEndpoint;

  constructor(@Inject(END_POINTS) private _endPoints) {
    this.endPoints = _endPoints.reduce((acc, current) => {
      return {
        ...current,
        ...acc
      };
    }, {});
  }

  resolve(url: string, params?) {
    if (!params) {
      return `${this._baseUrl}${url}`;
    }
    const resolved = Object.keys(params).reduce((acc, param) => {
      return acc.replace(`:${param}`, params[param]);
    }, url);
    return `${this._baseUrl}${resolved}`;
  }

  resolveFullUrl(url: string, params?) {
    if (!params) {
      return `${url}`;
    }
    const resolved = Object.keys(params).reduce((acc, param) => {
      return acc.replace(`:${param}`, params[param]);
    }, url);

    return `${url}${resolved}`;
  }

}

