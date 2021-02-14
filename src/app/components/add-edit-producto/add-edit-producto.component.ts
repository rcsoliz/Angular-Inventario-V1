import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Inventario } from 'src/app/models/inventario';
import { Marca } from 'src/app/models/marca';
import { Producto } from 'src/app/models/producto';
import { Unidad } from 'src/app/models/unidad';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-add-edit-producto',
  templateUrl: './add-edit-producto.component.html',
  styleUrls: ['./add-edit-producto.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditProductoComponent implements OnInit {
  myForm: FormGroup;
  loading= false;
  idProducto: any;
  accion= "Crear";
  producto: any ={};
  listMarca: Marca[]=[];
  listUnidad: Unidad[]=[];
  listCategoria: Categoria[]=[];
  listInventario: Inventario[]=[];

  constructor(private fb: FormBuilder,
              private productoService: ProductoService,
              private toastr: ToastrService,
              private router: Router,
              private snackBar: MatSnackBar,
              private aRoute : ActivatedRoute) {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      descripcion: [''],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      marcaId:['', [Validators.required]],
      unidadId:['', [Validators.required]],
      categoriaId:['', [Validators.required]],
      inventarioId:['', [Validators.required]],
      fechaCreacion:['', [Validators.required]],
      estado:['', [Validators.required, Validators.maxLength(15)]]
    });
    this.idProducto = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getUnidad();
    this.getMarca();
    this.getCategoria();
    this.getInventario();
    if(this.idProducto !== undefined){
      this.accion ="Editar";
      this.esEditar();
    }
  }

  add(): void{
    const producto: Producto= {
      id: 0,
      nombre: this.myForm.get('nombre').value,
      descripcion: this.myForm.get('descripcion').value,
      precio: this.myForm.get('precio').value,
      stock: this.myForm.get('stock').value,
      fechaCreacion: this.myForm.get('fechaCreacion').value,
      estado: this.myForm.get('estado').value,
      marcaId: this.myForm.get('marcaId').value,
      unidadId: this.myForm.get('unidadId').value,
      categoriaId: this.myForm.get('categoriaId').value,
      inventarioId: this.myForm.get('inventarioId').value
    }
    if(this.idProducto !==undefined){
      this.editar(producto);
    }else{
      this.agregar(producto);
    }
  }

  agregar(producto: Producto): void{
    this.loading =true;
    this.productoService.add(producto).subscribe(data => {
      this.snackBar.open('El producto fue registrada con exito!', 'Producto', {
        duration : 2000
      });
      this.router.navigate(['/dashboard/listProducto']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Fallor al agregar!', 'Error');
      this.router.navigate(['/dashboard/listProducto']);
      this.loading =false;
    })
  }

  editar(producto: Producto): void{
    this.productoService.update(this.idProducto, producto).subscribe(data =>{
      this.snackBar.open('El producto fue actulizada con exito!', 'Producto', {
        duration: 2000
      });
      this.router.navigate(['/dashboard/listProducto']);
      this.loading =false;
    }, error =>{
      this.toastr.error('Fallo al actualizar!', 'Error');
      this.router.navigate(['/dashboard/listProducto']);
      this.loading =false;
    });
  }

  esEditar(): void{
    this.loading =false;
    this.productoService.get(this.idProducto).subscribe(data =>{
      this.producto = data;
      this.loading =false;
      this.myForm.patchValue({
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        precio : this.producto.precio,
        stock: this.producto.stock,
        fechaCreacion: this.producto.fechaCreacion,
        estado: this.producto.estado,
        marcaId : this.producto.marcaId,
        unidadId : this.producto.unidadId,
        categoriaId : this.producto.categoriaId,
        inventarioId : this.producto.inventarioId
      });
    })
  }

  getMarca(): void{
    this.loading =true;
    this.productoService.GetAllMarca().subscribe(data=>{
      this.listMarca =data;
    }, error =>{
      this.toastr.error('Fallo al obtener marcas!', 'Error');
      this.loading =false;
    });
  }

  getUnidad(): void{
    this.loading =true;
    this.productoService.GetAllUnidad().subscribe(data=>{
      this.listUnidad =data;
    }, error =>{
      this.toastr.error('Fallo al obtener unidades de medida!', 'Error');
      this.loading =false;
    });
  }

  getCategoria(): void{
    this.loading =true;
    this.productoService.GetAllMarca().subscribe(data=>{
      this.listCategoria =data;
    }, error =>{
      this.toastr.error('Fallo al obtener categorias!', 'Error');
      this.loading =false;
    });
  }

  getInventario(): void{
    this.loading =true;
    this.productoService.GetAllInventario().subscribe(data=>{
      this.listInventario =data;
    }, error =>{
      this.toastr.error('Fallo al obtener inventarios!', 'Error');
      this.loading =false;
    });
  }

}
