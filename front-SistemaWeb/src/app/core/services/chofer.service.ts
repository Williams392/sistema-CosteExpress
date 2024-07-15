import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chofer } from '../model/chofer';


@Injectable({
  providedIn: 'root'
})
export class ChoferService {

  private urlBase = "http://localhost:8080/transporte-api/choferes";

  constructor(private clienteHttp: HttpClient) { }

  // GET-LIST:
  obtenerChoferesLista(): Observable<Chofer[]>{
    return this.clienteHttp.get<Chofer[]>(this.urlBase);
  }

  // POST:
  agregarChofer(chofer: Chofer): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, chofer);
  }

  // Para editar, estos dos metodos:
  obtenerChoferId(id: number){
    return this.clienteHttp.get<Chofer>(`${this.urlBase}/${id}`);
  }
  editarChofer(id: number, chofer: Chofer): Observable<Object>{
    return this.clienteHttp.put<Chofer>(`${this.urlBase}/${id}`, chofer);
  }

  // Eliminar por id -> para el boton:
  eliminarChofer(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}


// Importar el modulo de HttpClient.
