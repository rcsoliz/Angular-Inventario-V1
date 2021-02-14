import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Ingreso } from 'src/app/models/ingreso';
import { IngresoService } from 'src/app/service/ingreso.service';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-list-ingreso',
  templateUrl: './list-ingreso.component.html',
  styleUrls: ['./list-ingreso.component.css']
})
export class ListIngresoComponent implements OnInit {
  displayedColumns: string[] = ['inventario', 'fechaIngreso', 'proveedor', 'totalSD', 'totalD', 'total', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listIngreso: Ingreso[] =[];
  loading= false;

  constructor(private ingresoService: IngresoService,
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
    this.ingresoService.getAll().subscribe(data =>{
      this.loading =false;
      this.listIngreso =data;
      this.dataSource = new MatTableDataSource(this.listIngreso);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error =>{
       this.loading= false;
       this.toastr.error('Paso un error al obtener ingresos','Error');
    });
  }

  delete(id: number){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Esta seguro que desea eliminar el ingreso?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar'){
        this.loading =true
        this.ingresoService.delete(id).subscribe(data =>{
          this.snackBar.open('El ingreso fue eliminada con exito!!!', '', {
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
