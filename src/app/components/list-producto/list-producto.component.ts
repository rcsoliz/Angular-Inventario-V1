import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'stock', 'precio',
                                'marca.nombre', 'unidad.nombre',
                                'categoria.nombre', 'inventario.nombre',
                                'fechaCreacion', 'estado',
                                'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listProducto: Producto[] =[];
  loading= false;

  constructor(private productoService: ProductoService,
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
    this.productoService.getAll().subscribe(data =>{
      this.loading =false;
      this.listProducto =data;
      this.dataSource = new MatTableDataSource(this.listProducto);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error=>{
      this.loading = false;
      this.toastr.error('Fallo al obtener productos', 'Error');
    });
  }

  delete(id: number){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Esta seguro que desea eliminar el producto?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar'){
        this.loading =true
        this.productoService.delete(id).subscribe(data =>{
          this.snackBar.open('El producto fue eliminada con exito!!!', '', {
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
