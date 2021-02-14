import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingreso } from '../models/ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  myUrl: string;
  myApi: string;

  constructor(private http:HttpClient) {
    this.myUrl = environment.endpoint;
    this.myApi = '/api/Ingreso/';
  }

  get(id: number): Observable<any>{
    return this.http.get(this.myUrl+ this.myApi + id);
  }

  GetDetaill(id: number): Observable<any>{
    return this.http.get(this.myUrl+ this.myApi + 'GetDetaill/' + id);
  }

  getAll(): Observable<any>{
    return this.http.get(this.myUrl+ this.myApi + 'GetAll');
  }

  add(ingreso: Ingreso): Observable<any>{
    return this.http.post(this.myUrl + this.myApi, ingreso);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myUrl + this.myApi + id);
  }

}
