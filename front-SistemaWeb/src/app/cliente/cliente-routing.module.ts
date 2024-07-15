import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponentComponent } from './Contenidos/Inicio/inicio-component/inicio-component.component';
import { NosotrosComponent } from './Contenidos/Nosotros/nosotros/nosotros.component';
import { ContactoComponent } from './Contenidos/Contacto/contacto/contacto.component';
import { HorarioComponent } from './Contenidos/Destinos//horario/horario.component';
import { SeleccionAsientoComponent } from './Contenidos/Destinos/seleccion-asiento/seleccion-asiento.component';
import { InformacionUsuarioComponent } from './Contenidos/Destinos/informacion-usuario/informacion-usuario.component';
import { PagosComponent } from './Contenidos/Destinos/pagos/pagos.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  
  { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
  { path: 'Inicio', component: InicioComponentComponent },
  { path: 'Horario', component: HorarioComponent },

  { path: 'Nosotros', component: NosotrosComponent },
  { path: 'Contacto', component: ContactoComponent },
  { path: 'Login', component: LoginComponent },

  { path: 'Asientos', component: SeleccionAsientoComponent },
  { path: 'Usuario', component: InformacionUsuarioComponent },
  { path: 'Pago', component: PagosComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
