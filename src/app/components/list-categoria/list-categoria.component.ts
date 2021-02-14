import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.css']
})
export class ListCategoriaComponent implements OnInit {
  displayedColumns: string[] = ['nombre',  'fechaIngreso', 'descripcion', 'estado', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listCategoria: Categoria[] =[];
  loading= false;

  constructor(private categoriaService: CategoriaService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListCategoria();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListCategoria(): void{
    this.loading =true;
    this.categoriaService.getAll().subscribe(data =>{
      this.loading =false;
      this.listCategoria =data;
      this.dataSource = new MatTableDataSource(this.listCategoria);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error =>{
       this.loading= false;
       this.toastr.error('Paso un error al obtener categorias','Error');
    });
  }

  deleteCategoria(id: number){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Esta seguro que desea eliminar la categoria?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar'){
        this.loading =true
        this.categoriaService.delete(id).subscribe(data =>{
          this.snackBar.open('La categoria fue eliminada con exito!!!', '', {
            duration: 2000
          });
          this.getListCategoria();
          this.loading=false;
          }, error=>{
            this.loading = false;
            this.toastr.error('Fallo al eliminar el registro', 'Error');
          })
      }
    });
  }

}
