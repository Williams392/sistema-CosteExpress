import { Component, ViewChild } from '@angular/core';
import { Bus } from '../../../../core/model/bus';
import { Chofer } from '../../../../core/model/chofer';
import { BusService } from '../../../../core/services/bus.service';
import { ChoferService } from '../../../../core/services/chofer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Itinerario } from '../../../../core/model/itinerario';
import { ItinerarioService } from '../../../../core/services/itinerario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro-lista',
  templateUrl: './registro-lista.component.html',
  styleUrl: './registro-lista.component.css'
})
export class RegistroListaComponent {

  @ViewChild('itinerarioForm', { static: false }) itinerarioForm: NgForm;

  paginatedItinerarios: Itinerario[];
  pageSize = 9; // Tamaño de página
  currentPage = 1; // Página actual
  totalPages: number;
  pages: number[];


  buses: Bus[];
  choferes: Chofer[];
  //bus: Bus = new Bus();

  itinerarios: Itinerario[];
  itinerario: Itinerario = new Itinerario();

  selectedBus: Bus = new Bus();
  selectedChofer: Chofer = new Chofer();

  busToDeleteId: number; // Variable para almacenar el ID del bus a eliminar

  constructor(
    private itinerarioServicio: ItinerarioService,
    private busServicio: BusService, 
    private choferServicio: ChoferService, 
    private enrutador: Router
  ){}

  // Carga los itinerarios,etc al iniciar el componente
  ngOnInit(){
    this.obtenerBuses();
    //this.obtenerChoferes();
    this.obtenerChoferes();
    this.obtenerItinerarios();
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

  obtenerChoferes() {
    this.choferServicio.obtenerChoferesLista().subscribe((datos) => {
      this.choferes = datos;
    });
  }

  obtenerItinerarios() {
    this.itinerarioServicio.obtenerItinerariosLista().subscribe(datos => {
      this.itinerarios = datos;
      this.totalPages = Math.ceil(this.itinerarios.length / this.pageSize);
      this.updatePages();
      this.irAlaPagina(1);
    });
  }

  // El select:
  alCambiarBus(event: Event) {
    this.itinerario.nombreBus = this.selectedBus;
    this.itinerario.asientos = this.selectedBus.cantidadAsientos;
  }

  alCambiarChofer(event: Event) {
    this.itinerario.nombreChofer = this.selectedChofer;
  }

  onSubmit() {
    this.guardarItinerario();
  }

  guardarItinerario() {
    if (this.itinerarioForm.valid) {
      this.itinerarioServicio.agregarItinerario(this.itinerario).subscribe({
        next: (datos) => {
          Swal.fire('Itinerario guardado', 'Itinerario Registrado con éxito en el sistema', 'success');
          this.cerrarModalIti();
          //this.limpiarFormulario();
          this.cancelar();
          this.obtenerItinerarios(); // Actualiza la lista de itinerarios
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos requeridos', 'error');
    }
  }

  cerrarModalIti() {
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
  }

    // ------------------------------------------
  // Acciones:

  editarBus(id: number) {
    this.enrutador.navigate(['crucero/admin/RegistroViaje-editar', id]);
  }
  
  cancelar(): void {
    this.itinerario = new Itinerario(); // Limpiar el objeto itinerario
    this.selectedBus = new Bus(); // Limpiar la selección de bus
    this.selectedChofer = new Chofer(); // Limpiar la selección de chofer
    this.itinerarioForm.resetForm(); // Resetear el formulario
  }

  // ------------------------------------------
  // Para el Paginacion:

  
  limpiarFormulario() {
    this.itinerario = new Itinerario();
    this.selectedBus = new Bus();
    this.selectedChofer = new Chofer();
  }

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
    this.paginatedItinerarios = this.itinerarios.slice(startIndex, endIndex);
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

}

// ------------------------------------------

  // Para el select del bus:
  // alCambiarBus(event: Event) {
     // this.bus.nombreBus = this.selectedBus.nombreBus;
     // this.bus.nroPlaca = this.selectedBus.nroPlaca;
     // this.bus.cantidadAsientos = this.selectedBus.cantidadAsientos;
  // }

  // ------------------------------------------

  // onSubmit(){
    //this.guardarBus();
  // }


  // guardarBus() {
  //   // Guardamos this.bus en el servicio
  //   this.busServicio.agregarBus(this.bus).subscribe({
  //     next: (datos) => {
  //       // Cerramos el modal después de agregar el bus
  //       const modalElement = document.getElementById('agregarBusModal');
  //       if (modalElement) {
  //         modalElement.classList.remove('show');
  //         modalElement.style.display = 'none';
  //       }
  //       document.body.classList.remove('modal-open');
  //       const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
  //       if (modalBackdrop) {
  //         modalBackdrop.remove();
  //       }
  //       Swal.fire('Bus guardado', 'Bus Registrado con exito en el sistema', 'success')
  //       // Limpiamos el formulario y actualizamos la lista de buses
  //       this.bus = new Bus();
  //       this.obtenerBuses(); // Actualizamos la lista de buses después de guardar
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }


  //choferes: Chofer[]; // para obtener la lista de choferes
  //selectedBus: Bus;

  // obtenerChoferes(){
  //   this.choferServicio.obtenerChoferesLista().subscribe
  //   (datos => {
  //     this.choferes = datos
  //   })
  // }