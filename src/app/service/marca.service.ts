import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient)
  {
    this.myAppUrl= environment.endpoint;
    this.myApiUrl ='/api/marca/';
  }

  get(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  getAll(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAll");
  }

  add(marca: Marca): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, marca );
  }

  update(id: number, marca: Marca): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, marca);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
}
