import { Chofer } from "./chofer";

export class Bus {
    idBus: number;
    nombreBus: string;
    nroPlaca: string;
    ano_fabricacion: String;
    cantidadAsientos: number;
    chofer: Chofer | null;  // Permitir null para chofer
    marca: string;

    estado: boolean;
    color: string;
}
