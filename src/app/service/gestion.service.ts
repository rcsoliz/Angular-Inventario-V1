import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gestion } from '../models/gestion';

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  myAppUrl: string;
  myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl= environment.endpoint;
    this.myApiUrl="/api/gestion/";
  }

  get(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  getAll(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAll");
  }

  add(gestion: Gestion): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, gestion );
  }

  update(id: number, gestion: Gestion): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, gestion);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

}
