import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { UnidadService } from 'src/app/service/unidad.service';
import { Unidad } from 'src/app/models/unidad';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-unidad',
  templateUrl: './list-unidad.component.html',
  styleUrls: ['./list-unidad.component.css']
})
export class ListUnidadComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'abreviacion', 'descripcion', 'fechaCreacion' ,'estado', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listUnidad: Unidad[] =[];
  loading= false;

  constructor(private unidadService: UnidadService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUnidad();
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  getUnidad(): void{
    this.loading =true;
    this.unidadService.getAll().subscribe(data =>{
      this.loading =false;
      this.listUnidad = data;
      this.dataSource = new MatTableDataSource(this.listUnidad);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error =>{
      this.loading =false;
      this.toastr.error('Paso un error al obtner las unidades', 'Fallo');
    });
  }

  delete(id: number){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width:'350px',
      data:{mensaje: 'Esta seguro de eliminar la unidad?'}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result ==='aceptar'){
        this.loading =true;
        this.unidadService.delete(id).subscribe(data =>{
          this.snackBar.open('La unidad fue eliminada con exito!', '', {
            duration: 2000
          });
          this.getUnidad();
          this.loading =false;
        }, error =>{
          this.loading =false;
          this.toastr.error('Fallo al eliminar el registro' , 'Error');
        });
      }
    });
  }
}
