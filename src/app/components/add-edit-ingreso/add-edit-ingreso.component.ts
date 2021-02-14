import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inventario } from 'src/app/models/inventario';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { TipoDocumentoService } from 'src/app/service/tipo-documento.service';
import { TipoDocumento } from '../../models/tipodocumento';

import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { element } from 'protractor';
import { Proveedor } from '../../models/proveedor';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { Console } from 'console';
import { Ingreso } from 'src/app/models/ingreso';
import { IngresoService } from '../../service/ingreso.service';
import { DetalleIngreso } from '../../models/detalleIngreso';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


@Component({
  selector: 'app-add-edit-ingreso',
  templateUrl: './add-edit-ingreso.component.html',
  styleUrls: ['./add-edit-ingreso.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary'} ,
   //provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
  }]
})

export class AddEditIngresoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'precio', 'cantidad', 'importe', 'acciones'];
  dataSource = new MatTableDataSource();

  myForm: FormGroup;
  listInventario: Inventario[]= []; listTipoDocumento: TipoDocumento[]=[];
  listProducto: Producto[] = [];    listProveedor: Proveedor[] = [];
  loading= false;

  inventarioId: any;
  productoId:number;

  stockInv: number;
  cantidadIngreso: number;
  precio: number;
  nomProd: string;

  importe: number;

  productoCap: Producto;
  listRegistro: any[]=[];
  listaDetalle: DetalleIngreso[]= [];
  fdia = new Date();

  totalSD= 0; totalD=0;  impaux = 0; totalSDAux= 0;
  itemDetalle: DetalleIngreso;   idIngreso: any;    ingreso:any ={};

  constructor(private fb: FormBuilder,
              private tipoDocumentoService: TipoDocumentoService,
              private productoService: ProductoService,
              private proveedorService: ProveedorService,
              private ingresoService: IngresoService,
              private toastr: ToastrService,
              private router: Router,
              private snackBar: MatSnackBar,
              private aRoute : ActivatedRoute,
             )
  {
    this.myForm = this.fb.group({
      nota:[''],
      fechaCreacion: [this.fdia, [Validators.required]],
      impuesto: 0.13,
      totalSD:[''],
      totalD:[''],
      total:[''],
      estado:'Habilitado',

      inventarioId:['', [Validators.required]],
      tipoDocumentoId:['', [Validators.required]],
      productoId:['', [Validators.required]],
      proveedorId:['', [Validators.required]],
      nIngreso:['', [Validators.required]],

      cantidadSal:['', [Validators.required]],
      cantidad:['', [Validators.required]],
      precio:['', [Validators.required]],

      detalle: this.fb.array([])

    });
    this.idIngreso = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getInventario();
    this.getTipoDocumento();
    this.getProducto();
    this.getProveedor();
    if( this.idIngreso !== undefined){
      //this.accion= "Editar";
      console.log( this.idIngreso);
      this.buscar();
    }

  }

  addIngreso():void{
    if(this.idIngreso !== undefined){
      //this.editar(categoria);
    }else{
      this.add();
    }
  }

  add(): void{

    const arrayDetalle = this.listRegistro;
    arrayDetalle.forEach((element, index) => {
        const item:DetalleIngreso={
          precio: element.precio,
          cantidad: element.cantidad,
          importe: element.importe,
          productoId: element.productoId,
          ingresoId: element.ingresoId
        }
        this.listaDetalle.push(item);
    })

    const ingreso: Ingreso={
      nota: this.myForm.get('nota').value,
      fechaIngreso: this.myForm.get('fechaCreacion').value,
      impuesto: 0.13,
      totalSD: this.myForm.get('totalSD').value,
      totalD: this.myForm.get('totalD').value,
      total: this.myForm.get('total').value,
      estado: 'Habilitado',
      inventarioId: this.myForm.get('inventarioId').value,
      tipoDocumentoId: this.myForm.get('tipoDocumentoId').value,
      proveedorId: this.myForm.get('proveedorId').value,
      listDetalleIngreso: this.listaDetalle
    }

    this.loading =true;
    this.ingresoService.add(ingreso).subscribe(data =>{
      this.toastr.success('El ingreso fue registrado con exito', 'Ingreso');
      this.router.navigate(['/dashboard/listIngreso/']);
      this.loading =false;
    }, error => {
      this.toastr.error('Oppss ocurrio un error!', 'Error'),
      this.router.navigate(['/dashboard/listIngreso/']);
      this.loading =false;
    })

  }

  getInventario(): void{
    this.loading =true;
    this.productoService.GetAllInventario().subscribe(data=>{
    this.listInventario =data;
    if(this.listInventario.length>0){
      const toSelect = this.listInventario.find(c => c.id == 1).id;
      this.myForm.get('inventarioId').setValue(toSelect);
    }
    }, error =>{
      this.toastr.error('Fallo al obtener inventarios!', 'Error');
      this.loading =false;
    });
  }

  getTipoDocumento(): void{
    this.loading =true;
    this.tipoDocumentoService.getIngreso(1).subscribe(data=>{
      this.listTipoDocumento =data;
      if(this.listTipoDocumento.length>0){
        const toSelect = this.listTipoDocumento.find(c => c.id == 1).id;
        this.myForm.get('tipoDocumentoId').setValue(toSelect);
      }
    }, error =>{
      this.toastr.error('Fallo al obtener tipo documentos!', 'Error');
      this.loading =false;
    });
  }

  getProducto(): void{
    this.loading =true;
    this.productoService.getAll().subscribe(data=>{
      this.listProducto =data;
      }, error =>{
        this.toastr.error('Fallo al obtener productos!', 'Error');
        this.loading =false;
      });
  }

  getProveedor(): void{
    this.loading =true;
    this.proveedorService.getAll().subscribe(data=>{
      this.listProveedor =data;
      if(this.listProveedor.length>0){
        const toSelect = this.listProveedor.find(c => c.id == 1).id;
        this.myForm.get('proveedorId').setValue(toSelect);
      }
      }, error =>{
        this.toastr.error('Fallo al obtener proveedores!', 'Error');
        this.loading =false;
      });
  }

  getProductoIndex(id: number, nombre: string, precio: number, stock : number): void{
    if(this.listProducto.length>0)
    {
      this.myForm.patchValue({
        precio: precio,
      })

      this.productoId = id;
      this.stockInv = stock;
      //this.precio = precio
      this.nomProd = nombre;
    }
  }

  addDetail(): void{
    this.cantidadIngreso = this.myForm.get('cantidadSal').value;
    this.precio = this.myForm.get('precio').value

    if(this.cantidadIngreso>0){
        this.importe = this.precio  *  this.cantidadIngreso;
        const prod ={
          productoId: this.productoId,
          nombre: this.nomProd,
          precio: this.precio,
          cantidad: this.myForm.get('cantidadSal').value,
          importe : this.importe
        }

        this.listRegistro.push(prod);
        this.dataSource = new MatTableDataSource(this.listRegistro);

        this.calcularTotal();

        this.resetForm();
    }else{

    }
    this.myForm.patchValue({
      precio: 0,
      stock:0
    })
  }

  resetForm() {
    this.productoId = 0;
    this.stockInv = 0.00;
    this.cantidadIngreso = 0.00;
    this.nomProd ='';
    this.importe = 0.00;

    this.myForm.patchValue({
      cantidadSal: 0
    });

  }

  calcularTotal(){
    if(this.listRegistro.length>0){
      //obtenmos el array de respuestas
      const arrayDetalle = this.listRegistro;
      console.log(arrayDetalle);

      arrayDetalle.forEach((element, index) => {
        this.impaux= 0;
        this.impaux= (element.precio  * element.cantidad);

        if(this.totalSD == 0){
          this.totalSD =  this.impaux;
          console.log(this.totalSD);

        }else{
          const totDesc =this.myForm.get('totalSD').value;
          this.totalSD =  totDesc +  this.impaux;
        }
      });

      this.myForm.patchValue({
        totalSD: this.totalSD,
        totalD: (this.totalSD* 0.13).toFixed(2),
        total: (this.totalSD- (this.totalSD* 0.13)).toFixed(2)
      })
    }
  }

  calcularBaja(){
    if(this.listRegistro.length>0){
      this.totalSD =0;
      const arrayDetalle = this.listRegistro;

      arrayDetalle.forEach((element, index) => {
        this.impaux= 0;
        this.impaux= (element.precio  * element.cantidad);
        const totDesc =this.myForm.get('totalSD').value;
        this.totalSD +=   this.impaux;
      });

      this.myForm.patchValue({
        totalSD: this.totalSD,
        totalD: (this.totalSD* 0.13).toFixed(2),
        total: (this.totalSD- (this.totalSD * 0.13)).toFixed(2)
      })
    }else{
      this.myForm.patchValue({
        totalSD: 0,
        totalD: 0,
        total: 0
      })
      this.totalSD =0;
    }
  }

  eliminarItem(index: number){
    this.listRegistro.splice(index, 1);
    this.calcularBaja();
    this.dataSource = new MatTableDataSource(this.listRegistro);
  }

  buscar(): void{
    this.loading =true;
    this.ingresoService.get(this.idIngreso).subscribe(data =>{
     this.loading =false;
     this.ingreso = data;
     this.myForm.patchValue({
       nota: this.ingreso.nota,
       fechaCreacion : this.ingreso.fechaIngreso,
       totalSD : this.ingreso.totalSD,
       totalD : this.ingreso.totalD,
       total : this.ingreso.total,
       inventarioId: this.ingreso.inventarioId ,
       tipoDocumentoId: this.ingreso.tipoDocumentoId ,
       proveedorId: this.ingreso.proveedorId ,
       nIngreso: this.ingreso.id ,
       //detalle: this.ingreso.listDetalleIngreso
     });
    })

    this.ingresoService.GetDetaill(this.idIngreso).subscribe(data=>{
      const arrayDetalle = data;
      arrayDetalle.forEach((element, index) => {
          const prod={
            productoId:element.productoId,
            nombre: element.producto.nombre,
            precio: element.precio,
            cantidad: element.cantidad,
            importe: element.importe,
          }
          this.listRegistro.push(prod);
      })
      this.dataSource = new MatTableDataSource(this.listRegistro);
    })
  }


}
