package sb.backend.admin.servicio;

import sb.backend.admin.modelo.Bus;
import sb.backend.admin.modelo.Reserva;

import java.util.List;

public interface IReservaServicio {

    public List<Reserva> listarReserva();
    public Reserva buscarReservaPorId(Integer idReserva);
    public Reserva guardarReserva(Reserva reserva);
    public void eliminarReservaPorId(Integer idReserva);

}
