import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Unidad } from 'src/app/models/unidad';
import { UnidadService } from 'src/app/service/unidad.service';

@Component({
  selector: 'app-add-edit-unidad',
  templateUrl: './add-edit-unidad.component.html',
  styleUrls: ['./add-edit-unidad.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditUnidadComponent implements OnInit {
  myForm: FormGroup;
  loading= false;
  idUnidad: any;
  accion= "Crear";
  unidad: any ={};

  constructor(private fb: FormBuilder,
              private unidadService: UnidadService,
              private toastr: ToastrService,
              private router: Router,
              private snackBar: MatSnackBar,
              private aRoute : ActivatedRoute) {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      descripcion:[''],
      abreviacion:['', [Validators.required, Validators.maxLength(10)]],
      fechaCreacion:['', [Validators.required]],
      estado:['', [Validators.required, Validators.maxLength(15)]]
    });
    this.idUnidad = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if(this.idUnidad !== undefined){
      this.accion ="Editar";
      this.esEditar();
    }
  }

  add(): void{
    const unidad: Unidad= {
      id: 0,
      nombre: this.myForm.get('nombre').value,
      descripcion: this.myForm.get('descripcion').value,
      fechaCreacion: this.myForm.get('fechaCreacion').value,
      Estado: this.myForm.get('estado').value,
      abreviacion: this.myForm.get('abreviacion').value
    }
    if(this.idUnidad !==undefined){
      this.editar(unidad);
    }else{
      this.agregar(unidad);
    }
  }

  agregar(unidad: Unidad): void{
    this.loading =true;
    this.unidadService.add(unidad).subscribe(data => {
      this.snackBar.open('La unidad fue registrada con exito!', 'Unidad', {
        duration : 2000
      });
      this.router.navigate(['/dashboard/listUnidad']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Fallor al agregar!', 'Error');
      this.router.navigate(['/dashboard/listUnidad']);
      this.loading =false;
    })
  }

  editar(unidad: Unidad): void{
    this.unidadService.update(this.idUnidad, unidad).subscribe(data =>{
      this.snackBar.open('La unidad fue actulizada con exito!', 'Unidad', {
        duration: 2000
      });
      this.router.navigate(['/dashboard/listUnidad']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Fallo al actualizar!', 'Error');
      this.router.navigate(['/dashboard/listUnidad']);
      this.loading =false;
    });
  }

  esEditar(): void{
    this.loading =false;
    this.unidadService.get(this.idUnidad).subscribe(data =>{
      this.unidad = data;
      this.loading =false;
      this.myForm.patchValue({
        nombre: this.unidad.nombre,
        fechaCreacion: this.unidad.fechaCreacion,
        descripcion: this.unidad.descripcion,
        abreviacion: this.unidad.abreviacion,
        estado: this.unidad.estado,
      });
    })
  }

}
