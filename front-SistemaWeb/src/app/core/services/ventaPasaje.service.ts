import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentaPasaje } from '../model/ventaPasaje';


@Injectable({
  providedIn: 'root'
})
export class VentaPasajeService {
  private urlBase = 'http://localhost:8080/venta-pasaje-api/ventas';

  constructor(private clienteHttp: HttpClient) { }

  obtenerVentasLista(): Observable<VentaPasaje[]> {
    return this.clienteHttp.get<VentaPasaje[]>(this.urlBase);
  }

  agregarVenta(ventaPasaje: VentaPasaje): Observable<VentaPasaje> {
    return this.clienteHttp.post<VentaPasaje>(this.urlBase, ventaPasaje);
  }

  obtenerVentaPorId(id: number): Observable<VentaPasaje> {
    return this.clienteHttp.get<VentaPasaje>(`${this.urlBase}/${id}`);
  }

  editarVenta(id: number, ventaPasaje: VentaPasaje): Observable<VentaPasaje> {
    return this.clienteHttp.put<VentaPasaje>(`${this.urlBase}/${id}`, ventaPasaje);
  }

  eliminarVenta(id: number): Observable<void> {
    return this.clienteHttp.delete<void>(`${this.urlBase}/${id}`);
  }
}
