import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/marca';
import { MarcaService } from 'src/app/service/marca.service';

@Component({
  selector: 'app-add-edit-marca',
  templateUrl: './add-edit-marca.component.html',
  styleUrls: ['./add-edit-marca.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})

export class AddEditMarcaComponent implements OnInit {
  myForm: FormGroup;
  loading= false;
  idMarca: any;
  accion= "Crear";
  marca: any ={};

  constructor(private fb: FormBuilder,
    private marcaService: MarcaService,
    private toastr: ToastrService,
    private router: Router,
    private snackBar: MatSnackBar,
    private aRoute : ActivatedRoute) {

      this.myForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.maxLength(30)]],
        fechaCreacion:['', [Validators.required]],
        estado:['', [Validators.required, Validators.maxLength(15)]]
      });
      this.idMarca = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if(this.idMarca !== undefined){
      this.accion ="Editar";
      this.esEditar();
    }
  }

  add(): void{
    const marca: Marca= {
      id: 0,
      nombre: this.myForm.get('nombre').value,
      fechaCreacion: this.myForm.get('fechaCreacion').value,
      Estado: this.myForm.get('estado').value,
    }
    if(this.idMarca !==undefined){
      this.editar(marca);
    }else{
      this.agregar(marca);
    }
  }

  agregar(marca: Marca): void{
    this.loading =true;
    this.marcaService.add(marca).subscribe(data => {
      this.snackBar.open('La marca fue registrada con exito!', 'Unidad', {
        duration : 2000
      });
      this.router.navigate(['/dashboard/listMarca']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Fallor al agregar!', 'Error');
      this.router.navigate(['/dashboard/listMarca']);
      this.loading =false;
    })
  }

  editar(marca: Marca): void{
    this.marcaService.update(this.idMarca, marca).subscribe(data =>{
      this.snackBar.open('La marca fue actulizada con exito!', 'Marca', {
        duration: 2000
      });
      this.router.navigate(['/dashboard/listMarca']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Fallo al actualizar!', 'Error');
      this.router.navigate(['/dashboard/listMarca']);
      this.loading =false;
    });
  }

  esEditar(): void{
    this.loading =false;
    this.marcaService.get(this.idMarca).subscribe(data =>{
      this.marca = data;
      this.loading =false;
      this.myForm.patchValue({
        nombre: this.marca.nombre,
        fechaCreacion: this.marca.fechaCreacion,
        estado: this.marca.estado,
      });
    })
  }

}
