import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {path:'', redirectTo: 'cliente', pathMatch:'full'},

  {path:'crucero', loadChildren: () =>import('./admin/admin.module').then(m => m.AdminModule)},

  {path:'cliente', loadChildren: () =>import('./cliente/cliente.module').then(m => m.ClienteModule)},

  {path:'auth', loadChildren: () =>import('./auth/auth.module').then(m => m.AuthModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
