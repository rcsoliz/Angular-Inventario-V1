import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl= environment.endpoint;
    this.myApiUrl ='/api/proveedor/';
  }

  get(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  getAll(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAll");
  }

  add(proveedor: Proveedor): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, proveedor );
  }

  update(id: number, proveedor: Proveedor): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, proveedor);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
}
