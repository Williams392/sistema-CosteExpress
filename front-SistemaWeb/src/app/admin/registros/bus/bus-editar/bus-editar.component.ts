import { Component } from '@angular/core';
import { ChoferService } from '../../../../core/services/chofer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from '../../../../core/model/bus';
import { BusService } from '../../../../core/services/bus.service';

@Component({
  selector: 'app-bus-editar',
  templateUrl: './bus-editar.component.html',
  styleUrl: './bus-editar.component.css'
})
export class BusEditarComponent {
  bus: Bus = new Bus(); 
  id: number;

  constructor(private busServicio: BusService,
    private ruta: ActivatedRoute,
    private enrutador: Router) {}
  
    ngOnInit(){
      this.id = this.ruta.snapshot.params['id'];
      this.busServicio.obtenerBusId(this.id).subscribe(
        {
          next: (datos) => this.bus = datos,
          error: (err) => console.log(err)
        }
      )
    }
    onSubmit(){
      this.guardarBus(); 
    }
    
    guardarBus(){
      this.busServicio.editarBus(this.id, this.bus).subscribe(
        {
          next: (datos) => this.irBusLista(),
          error: (err) => console.log(err)
        }
      )
    }

    irBusLista() {
      this.enrutador.navigate(['crucero/admin/registrarBus']);
    }

}

