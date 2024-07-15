import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { HeaderComponentComponent } from './Header/header-component/header-component.component';
import { InicioComponentComponent } from './Contenidos/Inicio/inicio-component/inicio-component.component';
import { FooterComponentComponent } from './Footer/footer-component/footer-component.component';
import { NosotrosComponent } from './Contenidos/Nosotros/nosotros/nosotros.component';
import { ContactoComponent } from './Contenidos/Contacto/contacto/contacto.component';
import { HorarioComponent } from './Contenidos/Destinos//horario/horario.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SeleccionAsientoComponent } from './Contenidos/Destinos/seleccion-asiento/seleccion-asiento.component';
import { InformacionUsuarioComponent } from './Contenidos/Destinos/informacion-usuario/informacion-usuario.component';
import { PagosComponent } from './Contenidos/Destinos/pagos/pagos.component';
import { LoginComponent } from './login/login.component';

import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    InicioComponentComponent,
    HeaderComponentComponent,
    FooterComponentComponent,
    NosotrosComponent,
    ContactoComponent,
    HorarioComponent,
    LoginComponent,
    
    SeleccionAsientoComponent,
    InformacionUsuarioComponent,
    PagosComponent,
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ]
})
export class ClienteModule { }
