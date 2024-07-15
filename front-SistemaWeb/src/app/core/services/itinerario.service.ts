// src/app/services/itinerario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itinerario } from '../model/itinerario';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {
  private urlBase = "http://localhost:8080/transporte-api/itinerarios";

  constructor(private clienteHttp: HttpClient) { }

  obtenerItinerariosLista(): Observable<Itinerario[]> {
    return this.clienteHttp.get<Itinerario[]>(this.urlBase);
  }

  agregarItinerario(itinerario: Itinerario): Observable<Itinerario> {
    return this.clienteHttp.post<Itinerario>(this.urlBase, itinerario);
  }

  obtenerItinerarioPorId(id: number): Observable<Itinerario> {
    return this.clienteHttp.get<Itinerario>(`${this.urlBase}/${id}`);
  }

  editarItinerario(id: number, itinerario: Itinerario): Observable<Itinerario> {
    return this.clienteHttp.put<Itinerario>(`${this.urlBase}/${id}`, itinerario);
  }

  eliminarItinerario(id: number): Observable<void> {
    return this.clienteHttp.delete<void>(`${this.urlBase}/${id}`);
  }

  // Método para filtrar itinerarios por origen, destino y fecha de viaje
  filtrarItinerarios(origen: string, destino: string, fechaViaje: string): Observable<Itinerario[]> {
    let params = new HttpParams()
      .set('origen', origen)
      .set('destino', destino)
      .set('fechaViaje', fechaViaje);
  
    return this.clienteHttp.get<Itinerario[]>(`${this.urlBase}/filtrar`, { params: params });
  }

  obtenerAsientosPorItinerario(id: number): Observable<number[]> {
    return this.clienteHttp.get<number[]>(`${this.urlBase}/${id}/asientos`);
  }

  reservarAsientos(id: number, asientos: number[]): Observable<any> {
    return this.clienteHttp.post<any>(`${this.urlBase}/${id}/reservar`, asientos);
  }

}
