import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Inventario } from 'src/app/models/inventario';
import { InventarioService } from 'src/app/service/inventario.service';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-list-inventario',
  templateUrl: './list-inventario.component.html',
  styleUrls: ['./list-inventario.component.css']
})
export class ListInventarioComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'gestion.anio', 'fechaCreacion', 'estado', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listInventario: Inventario[] =[];
  loading= false;

  constructor(private inventarioService: InventarioService,
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
    this.inventarioService.getAll().subscribe(data =>{
      this.loading =false;
      this.listInventario =data;
      this.dataSource = new MatTableDataSource(this.listInventario);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error =>{
       this.loading= false;
       this.toastr.error('Paso un error al obtener inventario','Error');
    });
  }

  delete(id: number){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Esta seguro que desea eliminar el inventario?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar'){
        this.loading =true
        this.inventarioService.delete(id).subscribe(data =>{
          this.snackBar.open('El inventario fue eliminada con exito!!!', '', {
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
