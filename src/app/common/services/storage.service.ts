
import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

  api = {
    local: {
      get: this._getLocal,
      save: this._saveLocal,
      remove: this._removeLocal,
      clear: this._clearLocal,
      getAppKey: this.getAppKey
    },
    session: {
      get: this._getSession,
      save: this._saveSession,
      remove: this._removeSession,
      clear: this._clearSession,
      getAppKey: this.getAppKey
    }
  };

  private _getLocal(key) {
    return JSON.parse(localStorage.getItem(this.getAppKey(key)));
  }

  private _saveLocal(key, value) {
    return localStorage.setItem(this.getAppKey(key), JSON.stringify(value));
  }

  private _removeLocal(key) {
    return localStorage.removeItem(this.getAppKey(key));
  }

  private _clearLocal() {
    return localStorage.clear();
  }

  private _getSession(key) {
    let data: any;
    try {
      data = JSON.parse(sessionStorage.getItem(this.getAppKey(key)));
    } catch (e) {
      data = sessionStorage.getItem(this.getAppKey(key));
    }
    return data;
  }

  private _saveSession(key, value) {
    return sessionStorage.setItem(this.getAppKey(key), JSON.stringify(value));
  }

  private _removeSession(key) {
    return sessionStorage.removeItem(this.getAppKey(key));
  }

  private _clearSession() {
    return sessionStorage.clear();
  }

  private getAppKey(key) {
    return 'cloudinary_omdb_' + key;
  }
}
