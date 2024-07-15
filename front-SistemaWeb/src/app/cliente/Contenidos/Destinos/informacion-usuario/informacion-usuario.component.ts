import { Component, OnInit } from '@angular/core';
import { Itinerario } from '../../../../core/model/itinerario';
import { Router } from '@angular/router';
import { VentaPasaje } from '../../../../core/model/ventaPasaje';
import { VentaPasajeService } from '../../../../core/services/ventaPasaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion-usuario',
  templateUrl: './informacion-usuario.component.html',
  styleUrl: './informacion-usuario.component.css'
})
export class InformacionUsuarioComponent implements OnInit {
  itinerario: Itinerario;
  selectedSeats: number[];
  totalPrice: number;
  ventaPasaje: VentaPasaje = new VentaPasaje();

  constructor(private router: Router, private ventaPasajeService: VentaPasajeService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.itinerario = navigation.extras.state['itinerario'] as Itinerario;
      this.selectedSeats = navigation.extras.state['asientos'] as number[];
      this.totalPrice = navigation.extras.state['total'] as number;
    } else {
      this.router.navigate(['cliente/seleccion-asiento']);
    }
  }

  ngOnInit(): void {
    if (!this.itinerario || !this.selectedSeats) {
      this.router.navigate(['cliente/seleccion-asiento']);
    }
  }

  comprarPasaje(): void {
    this.ventaPasaje.itinerario = this.itinerario;
    this.ventaPasaje.asiento = this.selectedSeats.join(',');
    this.ventaPasajeService.agregarVenta(this.ventaPasaje).subscribe(
      (ventaCreada) => {
        Swal.fire('Venta de pasaje', 'Pasaje comprado con éxito', 'success').then(() => {
          this.router.navigate(['cliente/Inicio']);
        });
      },
      (error) => {
        console.error('Error al crear la venta:', error);
      }
    );
  }
}
