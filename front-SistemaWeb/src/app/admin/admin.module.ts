import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BusEditarComponent } from './registros/bus/bus-editar/bus-editar.component';
import { BusListaComponent } from './registros/bus/bus-lista/bus-lista.component';
import { AsignarBusListaComponent } from './registros/asignarBus/asignar-bus-lista/asignar-bus-lista.component';
import { AsignarBusEditarComponent } from './registros/asignarBus/asignar-bus-editar/asignar-bus-editar.component';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncioComponent } from './incio/incio.component';
import { ChoferListaComponent } from './registros/chofer/chofer-lista/chofer-lista.component';
import { ChoferEditarComponent } from './registros/chofer/chofer-editar/chofer-editar.component';
import { TipoServicioListaComponent } from './registros/tipo-servicio/tipo-servicio-lista/tipo-servicio-lista.component';
import { TipoServicioEditarComponent } from './registros/tipo-servicio/tipo-servicio-editar/tipo-servicio-editar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { RegistroListaComponent } from './registros/registro-viaje/registro-lista/registro-lista.component';
import { RegistroAgregarEditarComponent } from './registros/registro-viaje/registro-agregar-editar/registro-agregar-editar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    BusEditarComponent,
    BusListaComponent,
    AsignarBusListaComponent,
    AsignarBusEditarComponent,
    DashboardComponent,
    IncioComponent,
    ChoferListaComponent,
    ChoferEditarComponent,
    
    TipoServicioListaComponent,
    TipoServicioEditarComponent,

    RegistroListaComponent,
    RegistroAgregarEditarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,  // yo
    ReactiveFormsModule,
    MatButtonModule,
    MatGridListModule,

    MatSnackBarModule
  ]
})
export class AdminModule { }
