import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoBase } from '../models/tipobase';

@Injectable({
  providedIn: 'root'
})
export class TipoBaseService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl= environment.endpoint;
    this.myApiUrl ='/api/TipoBase/';
  }

  get(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  getAll(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAll");
  }

  add(tipoBase: TipoBase): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, tipoBase );
  }

  update(id: number, tipoBase: TipoBase): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tipoBase);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

}
