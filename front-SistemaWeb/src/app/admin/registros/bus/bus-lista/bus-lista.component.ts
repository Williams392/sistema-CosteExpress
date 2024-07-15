import { Component, OnInit, ViewChild } from '@angular/core';
import { Bus } from '../../../../core/model/bus';
import { Chofer } from '../../../../core/model/chofer';
import { BusService } from '../../../../core/services/bus.service';
import { ChoferService } from '../../../../core/services/chofer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bus-lista',
  templateUrl: './bus-lista.component.html',
  styleUrl: './bus-lista.component.css'
})
export class BusListaComponent implements OnInit {

  @ViewChild('busForm', { static: false }) busForm: NgForm;

  buses: Bus[];
  bus: Bus = new Bus();

  paginatedBuses: Bus[]; // Arreglo para almacenar los buses paginados
  pageSize = 5; // Tamaño de página
  currentPage = 1; // Página actual
  totalPages: number;
  pages: number[];

  busToDeleteId: number; // Variable para almacenar el ID del bus a eliminar

  constructor(
    private busServicio: BusService, 
    private choferServicio: ChoferService, 
    private enrutador: Router,
    private snack: MatSnackBar 
  ){}

  ngOnInit(){
    this.obtenerBuses();
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

  // Método para actualizar el estado del bus con un Booleano:
  actualizarEstado(bus: Bus) {
    this.busServicio.editarBus(bus.idBus, bus).subscribe(
        response => {
            console.log('Estado actualizado', response);
        },
        error => {
            console.error('Error actualizando el estado', error);
        }
    );
  }

  // ------------------------------------------


  onSubmit(){
    this.guardarBus();
  }

  guardarBus() {
    if (this.busForm.valid) {
      this.busServicio.agregarBus(this.bus).subscribe({
        next: (datos) => {
          // Cerrar el modal después de agregar el bus
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
          Swal.fire('Bus guardado', 'Bus registrado con éxito en el sistema', 'success');
          // Limpiar el formulario después de agregar el bus
          this.bus = new Bus();
          this.obtenerBuses();
        },
        error: (err) => {
          console.log(err);
          this.snack.open("Ha ocurrido un error en el sistema", 'Aceptar', {
            duration: 3000,
          });
        }
      });
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos requeridos', 'error');
      // this.snack.open("Rellene todos los campos", 'Aceptar', {
      //   duration: 3000
      // });
    }
  }
  

  // guardarBus() {
  //   this.busServicio.agregarBus(this.bus).subscribe({
  //     next: (datos) => {
  //       // Cerrar el modal después de agregar el bus
  //       const modalElement = document.getElementById('agregarBusModal');
  //       if (modalElement) {
  //         modalElement.classList.remove('show');
  //         modalElement.style.display = 'none';
  //         Swal.fire('Bus guardado', 'Bus Registrado con exito en el sistema', 'success')
  //       }
  //       document.body.classList.remove('modal-open');
  //       const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
  //       if (modalBackdrop) {
  //         modalBackdrop.remove();
  //       }
  //       Swal.fire('Bus guardado', 'Bus Registrado con exito en el sistema', 'success')
  //       // Limpiar el formulario después de agregar el bus
  //       this.bus = new Bus();
  //       this.obtenerBuses();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }
  
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

  editarBus(id: number) {
    this.enrutador.navigate(['crucero/admin/registrarBus', id]);
  }
  
  cancelar(): void {
    this.bus = new Bus(); // Limpiar formulario al cancelar
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

}

