import { Component } from '@angular/core';
import { Chofer } from '../../../../core/model/chofer';
import { ChoferService } from '../../../../core/services/chofer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chofer-editar',
  templateUrl: './chofer-editar.component.html',
  styleUrl: './chofer-editar.component.css'
})
export class ChoferEditarComponent {
  chofer: Chofer = new Chofer(); 
  id: number;

  constructor(private busServicio: ChoferService,
    private ruta: ActivatedRoute,
    private enrutador: Router) {}
  
    ngOnInit(){
      this.id = this.ruta.snapshot.params['id'];
      this.busServicio.obtenerChoferId(this.id).subscribe(
        {
          next: (datos) => this.chofer = datos,
          error: (err) => console.log(err)
        }
      )
    }
    onSubmit(){
      this.guardarBus(); 
    }
    
    guardarBus(){
      this.busServicio.editarChofer(this.id, this.chofer).subscribe(
        {
          next: (datos) => this.irChoferLista(),
          error: (err) => console.log(err)
        }
      )
    }

    irChoferLista() {
      this.enrutador.navigate(['crucero/admin/registrarChofer']);
    }

}

