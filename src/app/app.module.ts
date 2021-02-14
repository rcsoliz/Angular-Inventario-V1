import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditEmpleadoComponent } from './components/add-edit-empleado/add-edit-empleado.component';
import { ListEmpleadoComponent } from './components/list-empleado/list-empleado.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MensajeConfirmacionComponent } from './components/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { ListCategoriaComponent } from './components/list-categoria/list-categoria.component';
import { AddEditCategoriaComponent } from './components/add-edit-categoria/add-edit-categoria.component';
import { ListUnidadComponent } from './components/list-unidad/list-unidad.component';
import { AddEditUnidadComponent } from './components/add-edit-unidad/add-edit-unidad.component';
import { ListMarcaComponent } from './components/list-marca/list-marca.component';
import { AddEditMarcaComponent } from './components/add-edit-marca/add-edit-marca.component';
import { ListGestionComponent } from './components/list-gestion/list-gestion.component';
import { AddEditGestionComponent } from './components/add-edit-gestion/add-edit-gestion.component';
import { ListInventarioComponent } from './components/list-inventario/list-inventario.component';
import { AddEditInventarioComponent } from './components/add-edit-inventario/add-edit-inventario.component';
import { ListProductoComponent } from './components/list-producto/list-producto.component';
import { AddEditProductoComponent } from './components/add-edit-producto/add-edit-producto.component';
import { InicioComponent } from './components/inicio/inicio.component';

//Import Angular Material Toolbar and its related modules like menu icon, buttons
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { ParTabControlComponent } from './components/par-tab-control/par-tab-control.component';
import { AddEditIngresoComponent } from './components/add-edit-ingreso/add-edit-ingreso.component';
import { ListIngresoComponent } from './components/list-ingreso/list-ingreso.component';


@NgModule({
  declarations: [
    AppComponent,
    AddEditEmpleadoComponent,
    ListEmpleadoComponent,
    NavbarComponent,
    MensajeConfirmacionComponent,
    DashboardComponent,
    HeaderComponent,
    ListCategoriaComponent,
    AddEditCategoriaComponent,
    ListUnidadComponent,
    AddEditUnidadComponent,
    ListMarcaComponent,
    AddEditMarcaComponent,
    ListGestionComponent,
    AddEditGestionComponent,
    ListInventarioComponent,
    AddEditInventarioComponent,
    ListProductoComponent,
    AddEditProductoComponent,
    InicioComponent,
    ParTabControlComponent,
    AddEditIngresoComponent,
    ListIngresoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
