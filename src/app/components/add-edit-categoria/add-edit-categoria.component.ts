import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-add-edit-categoria',
  templateUrl: './add-edit-categoria.component.html',
  styleUrls: ['./add-edit-categoria.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditCategoriaComponent implements OnInit {
  myForm : FormGroup;
  loading = false;
  idCategoria: any;
  accion='Crear';
  categoria:any ={};

  constructor(private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    private router: Router,
    public snackBar: MatSnackBar,
    private aRoute:ActivatedRoute) {
      this.myForm = this.fb.group({
        nombre:  ['', [Validators.required, Validators.maxLength(30)]],
        descripcion: ['', [Validators.required, Validators.maxLength(60)]],
        fechaCreacion:['', [Validators.required]],
        estado:['', [Validators.required]],
      });
      this.idCategoria = this.aRoute.snapshot.params['id'];
    }

  ngOnInit(): void {
    if( this.idCategoria !== undefined){
      this.accion= "Editar";
      this.esEditar();
    }
  }

  addCategoria():void{
    const categoria: Categoria ={
      id: 0,
      nombre: this.myForm.get('nombre').value,
      descripcion: this.myForm.get('descripcion').value,
      fechaCreacion: this.myForm.get('fechaCreacion').value,
      estado: this.myForm.get('estado').value,
    };

    if(this.idCategoria !== undefined){
      this.editar(categoria);
    }else{
      this.agregar(categoria);
    }
  }

  agregar(categoria: Categoria){
    this.loading =true;
    this.categoriaService.add(categoria).subscribe(data =>{
      this.snackBar.open('La categoria fue registrada con exito!!!', 'Categoria', {
        duration: 2000
      });
      this.router.navigate(['/dashboard/listCategoria']);
      this.loading =false;
    }, error=>{
      this.toastr.error('Oppss ocurrio un error!', 'Error'),
      this.router.navigate(['/dashboard/listCategoria']);
      this.loading =false;
    });
  }

  editar(categoria: Categoria){
    this.categoriaService.update(categoria, this.idCategoria).subscribe(data =>{
      this.snackBar.open('La categoria fue actualizada con exito!!!', 'Categoria', {
        duration: 2000
      });
      this.router.navigate(['/dashboard/listCategoria']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Oppss ocurrio un error al actualizar!', 'Error'),
      this.router.navigate(['/dashboard/listCategoria']);
      this.loading =false;
    })
  }

  esEditar(){
    this.loading =true;
    this.categoriaService.getCategoria(this.idCategoria).subscribe(data =>{
     this.categoria =data;
     this.loading =false;
     this.myForm.patchValue({
       nombre : this.categoria.nombre,
       descripcion : this.categoria.descripcion,
       fechaCreacion : this.categoria.fechaCreacion,
       estado : this.categoria.estado
     });
     })
   }
}
