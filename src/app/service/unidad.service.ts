import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unidad } from '../models/unidad';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  myUrl: string;
  myApi: string;
  listUni: Unidad [] =[];
  constructor(private http: HttpClient) {
    this.myUrl=environment.endpoint;
    this.myApi='/api/unidad/';
  }

  get(id: number): Observable<any>{
    return this.http.get(this.myUrl + this.myApi + id);
  }

  getAll(): Observable<any>{
    return this.http.get(this.myUrl + this.myApi + "GetAll");
  }

  add(unidad: Unidad): Observable<any>{
    return this.http.post(this.myUrl + this.myApi, unidad);
  }

  update(id: number, unidad: Unidad): Observable<any>{
    return this.http.put(this.myUrl+ this.myApi + id, unidad);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myUrl + this.myApi + id);
  }

}
