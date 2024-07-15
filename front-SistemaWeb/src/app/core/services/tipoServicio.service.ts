// tipo-servicio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoServicio } from '../model/tipoServicio';


@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {

  private urlBase = 'http://localhost:8080/transporte-api/tipos-servicio';

  constructor(private clienteHttp: HttpClient) { }

  // GET-LIST:
  obtenerTiposServicioLista(): Observable<TipoServicio[]> {
    return this.clienteHttp.get<TipoServicio[]>(this.urlBase);
  }

  // POST:
  agregarTipoServicio(tipoServicio: TipoServicio): Observable<Object> {
    return this.clienteHttp.post(this.urlBase, tipoServicio);
  }

  // Para editar, estos dos metodos:
  obtenerTipoServicioId(id: number): Observable<TipoServicio> {
    return this.clienteHttp.get<TipoServicio>(`${this.urlBase}/${id}`);
  }

  editarTipoServicio(id: number, tipoServicio: TipoServicio): Observable<Object> {
    return this.clienteHttp.put(`${this.urlBase}/${id}`, tipoServicio);
  }

  // Eliminar por id -> para el boton:
  eliminarTipoServicio(id: number): Observable<Object> {
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}
