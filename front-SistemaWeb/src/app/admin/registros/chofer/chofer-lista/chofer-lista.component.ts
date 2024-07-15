import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chofer } from '../../../../core/model/chofer';
import { ChoferService } from '../../../../core/services/chofer.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chofer-lista',
  templateUrl: './chofer-lista.component.html',
  styleUrl: './chofer-lista.component.css'
})
export class ChoferListaComponent {

  @ViewChild('choferForm', { static: false }) choferForm: NgForm;

  choferes: Chofer[];
  chofer: Chofer = new Chofer();

  paginatedChofer: Chofer[]; // Arreglo para almacenar los buses paginados
  pageSize = 5; // Tamaño de página
  currentPage = 1; // Página actual
  totalPages: number;
  pages: number[];

  constructor(private choferServicio: ChoferService, 
    private enrutador: Router , private snack:MatSnackBar){}

  ngOnInit(){
    this.obtenerChoferes();
  }

  obtenerChoferes(){
    this.choferServicio.obtenerChoferesLista().subscribe
    (datos => {
      this.choferes = datos

      this.totalPages = Math.ceil(this.choferes.length / this.pageSize);
      this.updatePages();
      this.irAlaPagina(1); // Muestra la primera página al carga 
    })
  }
  // ------------------------------------------

  // agregar:
  onSubmit(){
    this.guardarChofer();
  }

  guardarChofer() {
    if (this.choferForm.valid) { // Asegúrate de que tu formulario se llame choferForm
      this.choferServicio.agregarChofer(this.chofer).subscribe({
        next: (datos) => {
          this.obtenerChoferes(); // Asegúrate de que este método actualice la lista de choferes
          Swal.fire('Chofer guardado', 'Chofer registrado con éxito en el sistema', 'success');
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
      this.snack.open("Rellene todos los campos", 'Aceptar', {
        duration: 3000
      });
    }
  }

  // Boton eliminar:
  eliminarChofer(id: number){
    this.choferServicio.eliminarChofer(id).subscribe(
      {
        next: (datos) => {
          this.obtenerChoferes();
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  editarChofer(id: number){
    this.enrutador.navigate(['crucero/admin/registrarChofer', id]);
  }

  cancelar(): void {
    this.chofer = new Chofer(); // Limpiar formulario al cancelar
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
    this.paginatedChofer = this.choferes.slice(startIndex, endIndex);
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
  // Para la ventana Monda eliminar:

  // ------------------------------------------
}

