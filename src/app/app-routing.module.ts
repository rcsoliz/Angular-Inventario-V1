import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditCategoriaComponent } from './components/add-edit-categoria/add-edit-categoria.component';
import { AddEditEmpleadoComponent } from './components/add-edit-empleado/add-edit-empleado.component';
import { AddEditGestionComponent } from './components/add-edit-gestion/add-edit-gestion.component';
import { AddEditInventarioComponent } from './components/add-edit-inventario/add-edit-inventario.component';
import { AddEditMarcaComponent } from './components/add-edit-marca/add-edit-marca.component';
import { AddEditProductoComponent } from './components/add-edit-producto/add-edit-producto.component';
import { AddEditUnidadComponent } from './components/add-edit-unidad/add-edit-unidad.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListCategoriaComponent } from './components/list-categoria/list-categoria.component';
import { ListEmpleadoComponent } from './components/list-empleado/list-empleado.component';
import { ListGestionComponent } from './components/list-gestion/list-gestion.component';
import { ListInventarioComponent } from './components/list-inventario/list-inventario.component';
import { ListMarcaComponent } from './components/list-marca/list-marca.component';
import { ListProductoComponent } from './components/list-producto/list-producto.component';
import { ListUnidadComponent } from './components/list-unidad/list-unidad.component';
import { ParTabControlComponent } from './components/par-tab-control/par-tab-control.component';
import { AddEditIngresoComponent } from './components/add-edit-ingreso/add-edit-ingreso.component';

import { ListIngresoComponent } from './components/list-ingreso/list-ingreso.component';

const routes: Routes = [
  //{path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
    //{ path: 'dashboard', component: DashboardComponent, children:[
    { path: 'dashboard', component: DashboardComponent, children:[
    { path: 'listEmplaedo', component: ListEmpleadoComponent},
    { path: 'add', component: AddEditEmpleadoComponent},
    { path: 'edit/:id', component: AddEditEmpleadoComponent},

    { path: 'listCategoria', component: ParTabControlComponent},
    { path: 'addCategoria', component: AddEditCategoriaComponent},
    { path: 'editCategoria/:id', component: AddEditCategoriaComponent},

    { path: 'listUnidad', component: ParTabControlComponent},
    { path: 'addUnidad', component: AddEditUnidadComponent},
    { path: 'editUnidad/:id', component: AddEditUnidadComponent},

    { path: 'listMarca', component: ListMarcaComponent},
    { path: 'addMarca', component: AddEditMarcaComponent},
    { path: 'editMarca/:id', component: AddEditMarcaComponent},

    { path: 'listGestion', component: ListGestionComponent},
    { path: 'addGestion', component: AddEditGestionComponent},
    { path: 'editGestion/:id', component: AddEditGestionComponent},

    { path: 'listInventario', component: ListInventarioComponent},
    { path: 'addInventario', component: AddEditInventarioComponent},
    { path: 'editInventario/:id', component: AddEditInventarioComponent},

    { path: 'listProducto', component: ListProductoComponent},
    { path: 'addProducto', component: AddEditProductoComponent},
    { path: 'editProducto/:id', component: AddEditProductoComponent},

    { path: 'listIngreso', component: ListIngresoComponent},
    { path: 'addIngreso', component: AddEditIngresoComponent},
    { path: 'editIngreso/:id', component: AddEditIngresoComponent},

  ]},
  { path: '**', component: ListEmpleadoComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
