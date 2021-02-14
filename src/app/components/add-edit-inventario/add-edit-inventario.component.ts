import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gestion } from 'src/app/models/gestion';
import { Inventario } from 'src/app/models/inventario';
import { InventarioService } from 'src/app/service/inventario.service';

@Component({
  selector: 'app-add-edit-inventario',
  templateUrl: './add-edit-inventario.component.html',
  styleUrls: ['./add-edit-inventario.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditInventarioComponent implements OnInit {
  myForm: FormGroup;
  loading= false;
  idInventario: any;
  accion= "Crear";
  inventario: any ={};
  listGestion: Gestion[]=[];

  constructor(private fb: FormBuilder,
    private inventarioService: InventarioService,
    private toastr: ToastrService,
    private router: Router,
    private snackBar: MatSnackBar,
    private aRoute : ActivatedRoute) {
      this.myForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.maxLength(30)]],
        descripcion: [''],
        gestionId:['', [Validators.required, Validators.maxLength(4)]],
        fechaCreacion:['', [Validators.required]],
        estado:['', [Validators.required, Validators.maxLength(15)]]
      });
      this.idInventario = this.aRoute.snapshot.params['id'];
    }

  ngOnInit(): void {
    this.getGestion();
    if(this.idInventario !== undefined){
      this.accion ="Editar";
      this.esEditar();
    }
  }

  add(): void{
    const inventario: Inventario= {
      id: 0,
      nombre: this.myForm.get('nombre').value,
      descripcion: this.myForm.get('descripcion').value,
      //anio: this.myForm.get('anio').value,
      fechaCreacion: this.myForm.get('fechaCreacion').value,
      gestionId: this.myForm.get('gestionId').value,
      estado: this.myForm.get('estado').value,
    }
    if(this.idInventario !==undefined){
      this.editar(inventario);
    }else{
      this.agregar(inventario);
    }
  }

  agregar(inventario: Inventario): void{
    this.loading =true;
    this.inventarioService.add(inventario).subscribe(data => {
      this.snackBar.open('El inventario fue registrada con exito!', 'Unidad', {
        duration : 2000
      });
      this.router.navigate(['/dashboard/listInventario']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Fallor al agregar!', 'Error');
      this.router.navigate(['/dashboard/listInventario']);
      this.loading =false;
    })
  }

  editar(inventario: Inventario): void{
    this.inventarioService.update(this.idInventario, inventario).subscribe(data =>{
      this.snackBar.open('El inventario fue actulizada con exito!', 'Marca', {
        duration: 2000
      });
      this.router.navigate(['/dashboard/listInventario']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Fallo al actualizar!', 'Error');
      this.router.navigate(['/dashboard/listInventario']);
      this.loading =false;
    });
  }

  esEditar(): void{
    this.loading =false;
    this.inventarioService.get(this.idInventario).subscribe(data =>{
      this.inventario = data;
      this.loading =false;
      this.myForm.patchValue({
        nombre: this.inventario.nombre,
        descripcion: this.inventario.descripcion,
        fechaCreacion: this.inventario.fechaCreacion,
        estado: this.inventario.estado,
        gestionId : this.inventario.gestionId
      });
    })
  }

  getGestion(): void{
    this.loading =true;
    this.inventarioService.GetAllGestion().subscribe(data=>{
      this.listGestion =data;
      //console.log(this.listGestion);
    }, error =>{
      this.toastr.error('Fallo al obtener gestiones!', 'Error');
      this.loading =false;
    });
  }

}
