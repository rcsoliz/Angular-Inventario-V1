import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoDocumento } from '../models/tipodocumento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl= environment.endpoint;
    this.myApiUrl ='/api/TipoDocumento/';
  }

  get(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  getIngreso(idInventario: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetIngreso/' + idInventario);
  }

  getEgreso(idInventario: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetEgreso/' + idInventario);
  }

  GetAllTipoBase(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAllTipoBase");
  }

  getAll(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAll");
  }

  add(tipodocumento: TipoDocumento): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, tipodocumento );
  }

  update(id: number, tipodocumento: TipoDocumento): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tipodocumento);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

}
