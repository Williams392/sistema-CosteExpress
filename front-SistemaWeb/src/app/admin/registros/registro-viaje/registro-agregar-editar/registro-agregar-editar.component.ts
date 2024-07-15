import { Component } from '@angular/core';
import { Chofer } from '../../../../core/model/chofer';
import { ChoferService } from '../../../../core/services/chofer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Itinerario } from '../../../../core/model/itinerario';
import { Bus } from '../../../../core/model/bus';
import { ItinerarioService } from '../../../../core/services/itinerario.service';
import { BusService } from '../../../../core/services/bus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-agregar-editar',
  templateUrl: './registro-agregar-editar.component.html',
  styleUrl: './registro-agregar-editar.component.css'
})
export class RegistroAgregarEditarComponent {
  // chofer: Chofer = new Chofer(); 
  // id: number;

  itinerario: Itinerario = new Itinerario();
  buses: Bus[] = [];
  selectedBus: Bus = new Bus();
  id: number;

  constructor(
    private itinerarioServicio: ItinerarioService,
    private busServicio: BusService,
    private ruta: ActivatedRoute,
    private enrutador: Router
  ) {}
  
  ngOnInit() {
    this.id = this.ruta.snapshot.params['id'];
    this.obtenerItinerario();
    this.obtenerBuses();
  }

  obtenerItinerario() {
    this.itinerarioServicio.obtenerItinerarioPorId(this.id).subscribe({
      next: (datos) => {
        this.itinerario = datos;
        this.selectedBus = this.itinerario.nombreBus;
      },
      error: (err) => console.log(err)
    });
  }

  obtenerBuses() {
    this.busServicio.obtenerBusesLista().subscribe({
      next: (datos) => this.buses = datos,
      error: (err) => console.log(err)
    });
  }

  alCambiarBus(event: Event) {
    this.itinerario.nombreBus = this.selectedBus;
    this.itinerario.asientos = this.selectedBus.cantidadAsientos;
  }

  onSubmit(){
    this.guardarItinerario(); 
  }
    
  guardarItinerario() {
    this.itinerarioServicio.editarItinerario(this.id, this.itinerario).subscribe({
      next: (datos) => {
        Swal.fire('Itinerario actualizado', 'Itinerario actualizado con éxito en el sistema', 'success');
        this.irItinerarioLista();
      },
      error: (err) => console.log(err)
    });
  }

  irItinerarioLista() {
    this.enrutador.navigate(['crucero/admin/RegistroViaje']);
  }

}

