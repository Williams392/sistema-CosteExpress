import { Component, Input, OnInit } from '@angular/core';
import { Itinerario } from '../../../../core/model/itinerario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  @Input() itinerarios: Itinerario[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.itinerarios = history.state.itinerarios;
    console.log('Itinerarios recibidos:', this.itinerarios);
  }

  seleccionarItinerario(itinerario: Itinerario): void {
    this.router.navigate(['cliente/Asientos'], { 
      state: { itinerario: itinerario } 
    });
  }

}
