import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tipo } from '../models/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl= environment.endpoint;
    this.myApiUrl ='/api/tipo/';
  }
  get(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  getAll(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAll");
  }

  add(tipo: Tipo): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, tipo );
  }

  update(id: number, tipo: Tipo): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tipo);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

}
