import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inventario } from '../models/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl= environment.endpoint;
    this.myApiUrl="/api/inventario/";
  }

  get(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  GetAllGestion(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAllGestion");
  }

  getAll(): Observable<any>{
    return this.http.get(this.myAppUrl +  this.myApiUrl + "GetAll");
  }

  add(inventario: Inventario): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, inventario);
  }

  update(id: number, inventario: Inventario): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, inventario);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

}
