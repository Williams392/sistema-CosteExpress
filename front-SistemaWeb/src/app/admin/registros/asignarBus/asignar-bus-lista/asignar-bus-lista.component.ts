import { Component, OnInit } from '@angular/core';
import { Bus } from '../../../../core/model/bus';
import { Chofer } from '../../../../core/model/chofer';
import { BusService } from '../../../../core/services/bus.service';
import { ChoferService } from '../../../../core/services/chofer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-bus-lista',
  templateUrl: './asignar-bus-lista.component.html',
  styleUrl: './asignar-bus-lista.component.css',
})
export class AsignarBusListaComponent implements OnInit {

  buses: Bus[];
  bus: Bus = new Bus();
  choferes: Chofer[]; // para obtener la lista de choferes
  
  //selectedBus: Bus;

  selectedBus: Bus = new Bus();
  selectedChofer: Chofer = new Chofer();

  paginatedBuses: Bus[]; // Arreglo para almacenar los buses paginados
  pageSize = 9; // Tamaño de página
  currentPage = 1; // Página actual
  totalPages: number;
  pages: number[];

  busToDeleteId: number; // Variable para almacenar el ID del bus a eliminar

  constructor(private busServicio: BusService, private choferServicio: ChoferService, private enrutador: Router){}

  ngOnInit(){
    this.obtenerBuses();
    this.obtenerChoferes();
  }

  obtenerBuses(){
    this.busServicio.obtenerBusesLista().subscribe
    (datos => {
      this.buses = datos;
      this.totalPages = Math.ceil(this.buses.length / this.pageSize);
      this.updatePages();
      this.irAlaPagina(1); // Muestra la primera página al carga 
    })
  }

  // ------------------------------------------
  // Para el Pagination:

  updatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  irAlaPagina(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBuses = this.buses.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.irAlaPagina(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.irAlaPagina(this.currentPage + 1);
    }
  }


  // ------------------------------------------

  // Para el select del bus:
  alCambiarBus(event: Event) {
    this.bus.nombreBus = this.selectedBus.nombreBus;
    this.bus.nroPlaca = this.selectedBus.nroPlaca;
    this.bus.cantidadAsientos = this.selectedBus.cantidadAsientos;
  }

  // ------------------------------------------

  obtenerChoferes(){
    this.choferServicio.obtenerChoferesLista().subscribe
    (datos => {
      this.choferes = datos
    })
  }

  onSubmit(){
    this.guardarBus();
  }

  guardarBus() {
    // Guardamos this.bus en el servicio
    this.busServicio.agregarBus(this.bus).subscribe({
      next: (datos) => {
        // Cerramos el modal después de agregar el bus
        const modalElement = document.getElementById('agregarBusModal');
        if (modalElement) {
          modalElement.classList.remove('show');
          modalElement.style.display = 'none';
        }
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
        Swal.fire('Bus guardado', 'Bus Registrado con exito en el sistema', 'success')
        // Limpiamos el formulario y actualizamos la lista de buses
        this.bus = new Bus();
        this.obtenerBuses(); // Actualizamos la lista de buses después de guardar
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  // ------------------------------------------
  // Para la ventana Modal Eliminar:

  setBusToDelete(id: number) {
    this.busToDeleteId = id;
  }

  confirmarEliminar() {
    if (this.busToDeleteId) {
      this.eliminarBus(this.busToDeleteId);
      this.cerrarModal('eliminarBusModal');
    }
  }

  eliminarBus(id: number) {
    this.busServicio.eliminarBus(id).subscribe({
      next: (datos) => {
        this.obtenerBuses();
      },
      error: (error) => {
        console.error('Error al eliminar el bus:', error);
      }
    });
  }

  cerrarModal(idModal: string) {
    const modalElement = document.getElementById(idModal);
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      const backdropElement = document.getElementsByClassName('modal-backdrop')[0];
      if (backdropElement) {
        backdropElement.remove();
      }
    }
  }

  // ------------------------------------------
  // Acciones:

  editarBus(id: number) {
    this.enrutador.navigate(['crucero/admin/asignarBus-editar', id]);
  }
  
  cancelar(): void {
    this.bus = new Bus(); // Limpiar formulario al cancelar
  }

}

