import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Gestion } from 'src/app/models/gestion';
import { GestionService } from 'src/app/service/gestion.service';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-list-gestion',
  templateUrl: './list-gestion.component.html',
  styleUrls: ['./list-gestion.component.css']
})
export class ListGestionComponent implements OnInit {
  displayedColumns: string[] = ['anio', 'descripcion', 'fechaCreacion', 'estado', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listGestion: Gestion[] =[];
  loading= false;

  constructor(private gestionService: GestionService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll(): void{
    this.loading =true;
    this.gestionService.getAll().subscribe(data =>{
      this.loading =false;
      this.listGestion =data;
      this.dataSource = new MatTableDataSource(this.listGestion);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error =>{
       this.loading= false;
       this.toastr.error('Paso un error al obtener gestiones','Error');
    });
  }

  delete(id: number){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Esta seguro que desea eliminar la gestion?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar'){
        this.loading =true
        this.gestionService.delete(id).subscribe(data =>{
          this.snackBar.open('La gestion fue eliminada con exito!!!', '', {
            duration: 2000
          });
          this.getAll();
          this.loading=false;
          }, error=>{
            this.loading = false;
            this.toastr.error('Fallo al eliminar el registro', 'Error');
          })
      }
    });
  }


}
