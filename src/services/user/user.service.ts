import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Global from '../../config/Global'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public api: string

  constructor(private _http: HttpClient) {
    this.api = Global.api
  }

  // Consumir Servicio
  getUsers = (): Observable<any> => {
    return this._http.get(`${this.api}prueba-tecnica-sf/user`)
  }
}
