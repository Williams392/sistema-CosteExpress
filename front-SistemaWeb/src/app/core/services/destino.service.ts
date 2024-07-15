import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Destino } from '../model/destino';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {
  // esta mal actualizar <==============================================

  private urlBase = "http://localhost:8080/transporte-api/destinos";

  constructor(private clienteHttp: HttpClient) { }

  // GET-LIST:
  obtenerDestinoLista(): Observable<Destino[]>{
    return this.clienteHttp.get<Destino[]>(this.urlBase);
  }

  // POST:
  agregarDestino(destino: Destino): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, destino);
  }

  // Para editar, estos dos metodos:
  obtenerDestinoId(id: number){
    return this.clienteHttp.get<Destino>(`${this.urlBase}/${id}`);
  }
  editarDestino(id: number, destino: Destino): Observable<Object>{
    return this.clienteHttp.put<Destino>(`${this.urlBase}/${id}`, destino);
  }

  // Eliminar por id -> para el boton:
  eliminarDestino(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }
}
