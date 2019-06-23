import {InjectionToken} from '@angular/core';

export interface AppConfig {
  apiEndpoint: string;
  posterEndpoint: string;

}

export const OMDB_CONFIG: AppConfig = {
    apiEndpoint: 'https://www.omdbapi.com/?apikey=5f6a5ccd&',
    posterEndpoint: 'https://img.omdbapi.com/?apikey=5f6a5ccd&',
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
