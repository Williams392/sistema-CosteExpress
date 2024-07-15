import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../model/bus';


@Injectable({
  providedIn: 'root'
})
export class BusService {

  private urlBase = "http://localhost:8080/transporte-api/buses";

  constructor(private clienteHttp: HttpClient) { }

  // GET-LIST:
  obtenerBusesLista(): Observable<Bus[]>{
    return this.clienteHttp.get<Bus[]>(this.urlBase);
  }

  // POST:
  agregarBus(bus: Bus): Observable<Object>{
    return this.clienteHttp.post<Bus>(this.urlBase, bus);
  }

  // Para editar, estos dos metodos:
  obtenerBusId(id: number){
    return this.clienteHttp.get<Bus>(`${this.urlBase}/${id}`);
  }
  editarBus(id: number, bus: Bus): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, bus);
  }

  actualizarBus(bus: Bus): Observable<Object> {
    return this.clienteHttp.put(`${this.urlBase}/${bus.idBus}`, bus);
  }

  // Eliminar por id -> para el boton:
  eliminarBus(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}
