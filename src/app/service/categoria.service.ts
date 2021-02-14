import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  myUrl: string;
  myApi: string;
  constructor(private http:HttpClient) {
    this.myUrl = environment.endpoint;
    this.myApi = '/api/Categoria/';
   }

   getCategoria(id: number): Observable<any>{
     return this.http.get(this.myUrl+ this.myApi + id);
   }

   getAll(): Observable<any>{
     return this.http.get(this.myUrl+ this.myApi + 'GetAll');
   }

   add(categoria: Categoria): Observable<any>{
    return this.http.post(this.myUrl + this.myApi, categoria);
   }

   update(categoria:Categoria, id: number): Observable<any>{
     categoria.id = id;
     return this.http.put(this.myUrl + this.myApi + id, categoria);
   }

   delete(id: number): Observable<any>{
     return this.http.delete(this.myUrl + this.myApi + id);
   }

}
