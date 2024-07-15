// src/app/model/itinerario.ts

import { Bus } from "./bus";
import { Chofer } from "./chofer";

export class Itinerario {
  idItinerario: number;
  origen: string;
  destino: string;
  fecha_viaje: string;
  asientos: number;
  horaSalida: string;
  horaRetorno: string;
  precio: number;

  nombreBus: Bus;
  nombreChofer: Chofer;
}