import { Component, Input, OnInit } from '@angular/core';
import { Itinerario } from '../../../../core/model/itinerario';
import { Router } from '@angular/router';
import { ItinerarioService } from '../../../../core/services/itinerario.service';
import { VentaPasajeService } from '../../../../core/services/ventaPasaje.service';

interface Seat {
  number: number;
  selected: boolean;
}

@Component({
  selector: 'app-seleccion-asiento',
  templateUrl: './seleccion-asiento.component.html',
  styleUrl: './seleccion-asiento.component.css'
})
export class SeleccionAsientoComponent implements OnInit {
  
  @Input() itinerario: Itinerario;

  seatsLayout: Seat[][] = [
    [{ number: 1, selected: false }, { number: 2, selected: false }, { number: 3, selected: false }, { number: 4, selected: false }],
    [{ number: 5, selected: false }, { number: 6, selected: false }, { number: 7, selected: false }, { number: 8, selected: false }],
    [{ number: 9, selected: false }, { number: 10, selected: false }, { number: 11, selected: false }, { number: 12, selected: false }],
    [{ number: 13, selected: false }, { number: 14, selected: false }, { number: 15, selected: false }, { number: 16, selected: false }],
    [{ number: 17, selected: false }, { number: 18, selected: false }, { number: 19, selected: false }, { number: 20, selected: false }],
    [{ number: 21, selected: false }, { number: 22, selected: false }, { number: 23, selected: false }, { number: 24, selected: false }],
    [{ number: 25, selected: false }, { number: 26, selected: false }, { number: 27, selected: false }, { number: 28, selected: false }],
    [{ number: 29, selected: false }, { number: 30, selected: false }, { number: 31, selected: false }, { number: 32, selected: false }],
    [{ number: 33, selected: false }, { number: 34, selected: false }, { number: 35, selected: false }, { number: 36, selected: false }],
    [{ number: 37, selected: false }, { number: 38, selected: false }, { number: 39, selected: false }, { number: 40, selected: false }]
  ];

  selectedSeatsCount: number = 0;
  selectedSeats: number[] = [];

  constructor(
    private router: Router,
    private itinerarioService: ItinerarioService
  ) { }

  ngOnInit(): void {
    this.itinerarioService.obtenerAsientosPorItinerario(this.itinerario.idItinerario).subscribe(
      (asientosOcupados: number[]) => {
        asientosOcupados.forEach(asiento => {
          let seat = this.seatsLayout.flat().find(seat => seat.number === asiento);
          if (seat) {
            seat.selected = true;
          }
        });
      }
    );
  }

  toggleSeatSelection(seat: Seat): void {
    seat.selected = !seat.selected;
    this.updateSelectedSeats();
  }

  updateSelectedSeats(): void {
    this.selectedSeats = this.seatsLayout.flat()
      .filter(seat => seat.selected)
      .map(seat => seat.number);
    this.selectedSeatsCount = this.selectedSeats.length;
  }

  siguiente(): void {
    this.router.navigate(['cliente/Usuario'], { state: { 
      itinerario: this.itinerario, 
      asientos: this.selectedSeats } 
    });
  }

}



  // comprarPasaje(itinerario: Itinerario): void {
  //   this.router.navigate(['cliente/Usuario'], { state: { itinerario: this.itinerario, asiento: this.asientoSeleccionado } });
  // }