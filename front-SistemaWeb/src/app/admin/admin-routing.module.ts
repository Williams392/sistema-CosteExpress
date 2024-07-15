import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusListaComponent } from './registros/bus/bus-lista/bus-lista.component';
import { DashboardComponent } from './dashboard.component';
import { AsignarBusListaComponent } from './registros/asignarBus/asignar-bus-lista/asignar-bus-lista.component';
import { IncioComponent } from './incio/incio.component';
import { AsignarBusEditarComponent } from './registros/asignarBus/asignar-bus-editar/asignar-bus-editar.component';
import { BusEditarComponent } from './registros/bus/bus-editar/bus-editar.component';
import { ChoferListaComponent } from './registros/chofer/chofer-lista/chofer-lista.component';
import { ChoferEditarComponent } from './registros/chofer/chofer-editar/chofer-editar.component';
import { TipoServicioListaComponent } from './registros/tipo-servicio/tipo-servicio-lista/tipo-servicio-lista.component';
import { TipoServicioEditarComponent } from './registros/tipo-servicio/tipo-servicio-editar/tipo-servicio-editar.component';
import { RegistroListaComponent } from './registros/registro-viaje/registro-lista/registro-lista.component';
import { RegistroAgregarEditarComponent } from './registros/registro-viaje/registro-agregar-editar/registro-agregar-editar.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      { path: 'inicioBus',  redirectTo: 'inicioBus', pathMatch: 'full' },
      { path: 'inicioBus', component: IncioComponent },
      { path: 'registroBus', component: BusListaComponent },

      { path: 'asignarBus', component: AsignarBusListaComponent },
      { path: 'asignarBus-editar/:id', component: AsignarBusEditarComponent }, 

      { path: 'registrarBus', component: BusListaComponent },
      { path: 'registrarBus/:id', component: BusEditarComponent },

      { path: 'registrarChofer', component: ChoferListaComponent },
      { path: 'registrarChofer/:id', component: ChoferEditarComponent },

      // { path: 'tipoServicio', component: TipoServicioListaComponent },
      // { path: 'tipoServicio/:id', component: TipoServicioEditarComponent },

      { path: 'RegistroViaje', component: RegistroListaComponent },
      { path: 'RegistroViaje-editar/:id', component: RegistroAgregarEditarComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
