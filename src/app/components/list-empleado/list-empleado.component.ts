import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { EmpleadoService } from 'src/app/service/empleado.service';
import { Empleado } from 'src/app/models/empleado';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellidos', 'correo', 'telefono', 'fechaIngreso', 'estadoCivil', 'sexo', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listEmpleado: Empleado[] =[];
  loading= false;

  constructor(private empleadoService: EmpleadoService,
              private toastr: ToastrService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.getListEmpleado();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListEmpleado(): void{
    this.loading =true;
    this.empleadoService.getListEmpleado().subscribe(data =>{
      this.loading =false;
      this.listEmpleado =data;
      this.dataSource = new MatTableDataSource(this.listEmpleado);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error =>{
       this.loading= false;
       this.toastr.error('Paso un error al obtener empleados','Error');
    });
  }

  eliminarEmpleado(id: number){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: 'Esta seguro que desea eliminar el empleado?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar'){
        this.loading =true
        this.empleadoService.eliminarEmpleado(id).subscribe(data =>{
          this.snackBar.open('El empleado fue eliminado con exito!!!', '', {
            duration: 2000
          });
          this.getListEmpleado();
          this.loading=false;
          }, error=>{
            this.loading = false;
            this.toastr.error('Fallo al elminar el registro', 'Error');
          })
      }
    });
  }
}
