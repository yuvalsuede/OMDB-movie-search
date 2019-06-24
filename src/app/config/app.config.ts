import {InjectionToken} from '@angular/core';

export interface AppConfig {
  apiEndpoint: string;
  posterEndpoint: string;

}

export const OMDB_CONFIG: AppConfig = {
    apiEndpoint: 'https://api.themoviedb.org/3/search/movie?api_key=b11fd90ebca639281dfb75423ff350e0&&language=en-US&',
    posterEndpoint: 'https://image.tmdb.org/t/p/original/',
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
