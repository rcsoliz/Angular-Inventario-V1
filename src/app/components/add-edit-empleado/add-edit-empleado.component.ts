import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/service/empleado.service';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditEmpleadoComponent implements OnInit {
  estadosCiviles: any[]=['Soltero', 'Casado', 'Divorciado', 'Viudo'];
  myForm : FormGroup;
  loading = false;
  idEmpleado: any;
  accion='Crear';
  empleado:any ={};

  constructor(private fb: FormBuilder,
              private empleadoService: EmpleadoService,
              private toastr: ToastrService,
              private router: Router,
              public snackBar: MatSnackBar,
              private aRoute:ActivatedRoute) {
    this.myForm = this.fb.group({
      nombre:  ['', [Validators.required, Validators.maxLength(40)]],
      apellidos: ['', [Validators.required, Validators.maxLength(50)]],
      correo:['', [Validators.required, Validators.email]],
      telefono:['', [Validators.required, Validators.maxLength(20)]],
      fechaIngreso:['', [Validators.required]],
      estadoCivil:['', [Validators.required]],
      sexo:['', [Validators.required]],
    });

    this.idEmpleado = this.aRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
    if( this.idEmpleado !== undefined){
      this.accion= "Editar";
      this.esEditar();
    }
  }

  guardarEmpleado():void{
    const empleado: Empleado ={
      id: 0,
      nombre: this.myForm.get('nombre').value,
      apellidos: this.myForm.get('apellidos').value,
      correo: this.myForm.get('correo').value,
      telefono: this.myForm.get('telefono').value,
      fechaIngreso: this.myForm.get('fechaIngreso').value,
      estadoCivil: this.myForm.get('estadoCivil').value,
      sexo: this.myForm.get('sexo').value,
    };

    if(this.idEmpleado !== undefined){
      this.editarEmpleado(empleado);
    }else{
      this.agregar(empleado);
    }
  }

  agregar(empleado: Empleado){
    this.loading =true;
    this.empleadoService.addEmpleado(empleado).subscribe(data =>{
      this.snackBar.open('El empleado fue registrado con exito!!!', 'Empleado', {
        duration: 2000
      });
      this.router.navigate(['/dashboard/listEmplaedo']);
      this.loading =false;
    }, error=>{
      this.toastr.error('Oppss ocurrio un error!', 'Error'),
      this.router.navigate(['/dashboard/listEmplaedo']);
      this.loading =false;
    });
  }

  editarEmpleado(empleado: Empleado){
    this.empleadoService.editEmpleado(empleado, this.idEmpleado).subscribe(data =>{
      this.snackBar.open('El empleado fue actualizado con exito!!!', 'Empleado', {
        duration: 2000
      });
      this.router.navigate(['/dashboard/listEmplaedo']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Oppss ocurrio un error al actualizar!', 'Error'),
      this.router.navigate(['/dashboard/listEmplaedo']);
      this.loading =false;
    })
  }

  esEditar(){
   this.loading =true;
   this.empleadoService.getEmpleado(this.idEmpleado).subscribe(data =>{
    this.empleado =data;
   // console.log(this.empleado);
    this.loading =false;
    this.myForm.patchValue({
      nombre : this.empleado.nombre,
      apellidos : this.empleado.apellidos,
      correo : this.empleado.correo,
      telefono : this.empleado.telefono,
      fechaIngreso : this.empleado.fechaIngreso,
      estadoCivil : this.empleado.estadoCivil,
      sexo : this.empleado.sexo
    });
    })
  }

}
