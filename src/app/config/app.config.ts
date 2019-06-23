import {InjectionToken} from '@angular/core';

export interface AppConfig {
  apiEndpoint: string;
  posterEndpoint: string;

}

export const OMDB_CONFIG: AppConfig = {
    apiEndpoint: 'http://www.omdbapi.com/?apikey=5f6a5ccd&',
    posterEndpoint: 'http://img.omdbapi.com/?apikey=5f6a5ccd&',
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
