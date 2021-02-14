import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gestion } from 'src/app/models/gestion';
import { GestionService } from 'src/app/service/gestion.service';

@Component({
  selector: 'app-add-edit-gestion',
  templateUrl: './add-edit-gestion.component.html',
  styleUrls: ['./add-edit-gestion.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditGestionComponent implements OnInit {
  myForm: FormGroup;
  loading= false;
  idGestion: any;
  accion= "Crear";
  gestion: any ={};

  constructor(private fb: FormBuilder,
              private gestionService: GestionService,
              private toastr: ToastrService,
              private router: Router,
              private snackBar: MatSnackBar,
              private aRoute : ActivatedRoute) {
      this.myForm = this.fb.group({
        anio: ['', [Validators.required,
                   Validators.maxLength(4)]],
        fechaCreacion:['', [Validators.required]],
        descripcion: [''],
        estado:['', [Validators.required, Validators.maxLength(15)]]
      });
      this.idGestion = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if(this.idGestion !== undefined){
      this.accion ="Editar";
      this.esEditar();
    }
  }


  add(): void{
    const gestion: Gestion= {
      id: 0,
      anio: this.myForm.get('anio').value,
      descripcion : this.myForm.get('descripcion').value,
      fechaCreacion: this.myForm.get('fechaCreacion').value,
      estado: this.myForm.get('estado').value,
    }
    if(this.idGestion !==undefined){
      this.editar(gestion);
    }else{
      this.agregar(gestion);
    }
  }

  agregar(gestion: Gestion): void{
    this.loading =true;
    this.gestionService.add(gestion).subscribe(data => {
      this.snackBar.open('La gestion fue registrada con exito!', 'Unidad', {
        duration : 2000
      });
      this.router.navigate(['/dashboard/listGestion']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Fallor al agregar!', 'Error');
      this.router.navigate(['/dashboard/listGestion']);
      this.loading =false;
    })
  }

  editar(gestion: Gestion): void{
    this.gestionService.update(this.idGestion, gestion).subscribe(data =>{
      this.snackBar.open('La gestion fue actulizada con exito!', 'Marca', {
        duration: 2000
      });
      this.router.navigate(['/dashboard/listGestion']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Fallo al actualizar!', 'Error');
      this.router.navigate(['/dashboard/listGestion']);
      this.loading =false;
    });
  }

  esEditar(): void{
    this.loading =false;
    this.gestionService.get(this.idGestion).subscribe(data =>{
      this.gestion = data;
      this.loading =false;
      this.myForm.patchValue({
        anio: this.gestion.anio,
        fechaCreacion: this.gestion.fechaCreacion,
        estado: this.gestion.estado,
        descripcion : this.gestion.descripcion
      });
    })
  }


}
