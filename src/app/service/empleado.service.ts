import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  myUrl:string;
  myApi:string;
  constructor(private http: HttpClient) {
    this.myUrl='http://localhost:49985';
    this.myApi='/api/Empleado/';
   }

   getListEmpleado(): Observable<any>{
     return this.http.get(this.myUrl +  this.myApi + 'GetListEmpleado');
   }

   eliminarEmpleado(id: number): Observable<any>{
     return this.http.delete(this.myUrl +this.myApi + id);
   }

   addEmpleado(empleado: Empleado): Observable<any>{
     return this.http.post(this.myUrl + this.myApi, empleado);
   }

   getEmpleado(index: number): Observable<any>{
     return this.http.get(this.myUrl + this.myApi + index);
   }

   editEmpleado(empleado: Empleado, index: number):Observable<any>{
      empleado.id = index;
      return this.http.put(this.myUrl +this.myApi + index, empleado);// this.myUrl+ this.myApi , empleado + index);
   }
}
