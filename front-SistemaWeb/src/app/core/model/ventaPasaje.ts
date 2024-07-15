import { Itinerario } from "./itinerario";

export class VentaPasaje {
    idVenta: number;
    origen: string;
    destino: string;
    fechaViaje: string;
    horaPartida: string;
    horaLlegada: string;
    asiento: string;
    tipoDocumento: string;
    numeroDocumento: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    genero: string;
    precio: number;
    itinerario: Itinerario;
}