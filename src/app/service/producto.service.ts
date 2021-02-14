import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl= environment.endpoint;
    this.myApiUrl="/api/producto/";
  }

  get(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  GetAllMarca(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAllMarca");
  }

  GetAllUnidad(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAllUnidad");
  }

  GetAllCategoria(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAllCategoria");
  }

  GetAllInventario(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAllInventario");
  }

  getAll(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAll");
  }

  add(producto: Producto): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, producto);
  }

  update(id: number, producto: Producto): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, producto);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

}
