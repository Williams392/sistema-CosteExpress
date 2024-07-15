import { Component } from '@angular/core';
import { TipoServicio } from '../../../../core/model/tipoServicio';
import { TipoServicioService } from '../../../../core/services/tipoServicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-servicio-lista',
  templateUrl: './tipo-servicio-lista.component.html',
  styleUrl: './tipo-servicio-lista.component.css'
})
export class TipoServicioListaComponent {
  tipoServicios: TipoServicio[];
  tipoSer: TipoServicio = new TipoServicio();

  tipoServicioToDeleteId: number;

  constructor(private tipoServicio: TipoServicioService) {  }

  ngOnInit(): void {
    this.obtenerTiposServicio();
  }

  obtenerTiposServicio() {
    this.tipoServicio.obtenerTiposServicioLista().subscribe(
      datos => {
        this.tipoServicios = datos;
      },
      error => {
        console.error('Error obteniendo tipos de servicio', error);
      }
    );
  }

  // Método para actualizar el estado del tipo de servicio
  actualizarEstado(tipoServicio: TipoServicio) {
    this.tipoServicio.editarTipoServicio(tipoServicio.idTipoServicio, tipoServicio).subscribe(
      response => {
        console.log('Estado actualizado', response);
      },
      error => {
        console.error('Error actualizando el estado', error);
      }
    );
  }

  onSubmit() {
    this.guardarTipoServicio();
  }

  guardarTipoServicio() {
    this.tipoServicio.agregarTipoServicio(this.tipoSer).subscribe({
      next: (datos) => {
        // Cerrar el modal después de agregar el tipo de servicio
        const modalElement = document.getElementById('agregarTipoServicioModal');
        if (modalElement) {
          modalElement.classList.remove('show');
          modalElement.style.display = 'none';
        }
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (modalBackdrop) {
          modalBackdrop.remove();
        }

        // Limpiar el formulario después de agregar el tipo de servicio
        this.tipoSer = new TipoServicio();
        this.obtenerTiposServicio();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Método para configurar el ID del tipo de servicio a eliminar
  setTipoServicioToDelete(id: number) {
    this.tipoServicioToDeleteId = id;
  }

  // Método para eliminar un tipo de servicio
  eliminarTipoServicio() {
    this.tipoServicio.eliminarTipoServicio(this.tipoServicioToDeleteId).subscribe(
      response => {
        console.log('Tipo de servicio eliminado', response);
        this.obtenerTiposServicio();
      },
      error => {
        console.error('Error eliminando tipo de servicio', error);
      }
    );
  }


  cancelar(): void {
    this.tipoSer = new TipoServicio(); // Limpiar formulario al cancelar
  }

}
