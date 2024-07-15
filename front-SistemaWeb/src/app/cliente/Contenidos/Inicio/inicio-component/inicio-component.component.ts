import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Itinerario } from '../../../../core/model/itinerario';
import { ItinerarioService } from '../../../../core/services/itinerario.service';

@Component({
  selector: 'app-inicio-component',
  templateUrl: './inicio-component.component.html',
  styleUrls: ['./inicio-component.component.css']

})
export class InicioComponentComponent implements OnInit {

  origen: string;
  destino: string;
  fechaViaje: string;
  itinerarios: Itinerario[];


  constructor(
    private itinerarioService: ItinerarioService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  buscarItinerarios(): void {
    console.log('Origen:', this.origen);
    console.log('Destino:', this.destino);
    console.log('Fecha de Viaje:', this.fechaViaje);
  
    this.itinerarioService.filtrarItinerarios(this.origen, this.destino, this.fechaViaje)
      .subscribe(data => {
        this.itinerarios = data;
        this.router.navigate(['cliente/Horario'], { state: { itinerarios: this.itinerarios } });
      }, error => {
        console.error('Error al obtener itinerarios filtrados', error);
      });
  }
  
}








 // buscarItinerarios(): void {
  //   this.itinerarioService.filtrarItinerarios(this.origen, this.destino, this.fechaViaje)
  //     .subscribe(data => {
  //       this.itinerarios = data;
  //       // Navega a la ruta Horario después de obtener los itinerarios
  //       this.router.navigate(['cliente/Horario']);
  //     }, error => {
  //       console.error('Error al obtener itinerarios filtrados', error);
  //     });
  // }