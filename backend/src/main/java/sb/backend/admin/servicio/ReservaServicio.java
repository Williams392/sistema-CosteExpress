package sb.backend.admin.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sb.backend.admin.modelo.Reserva;
import sb.backend.admin.repositorio.ReservaRepositorio;

import java.util.List;

@Service
public class ReservaServicio implements IReservaServicio{

    @Autowired
    private ReservaRepositorio reservaRepositorio;

    @Override
    public List<Reserva> listarReserva() {
        return this.reservaRepositorio.findAll();
    }

    @Override
    public Reserva buscarReservaPorId(Integer idReserva) {
        return this.reservaRepositorio.findById(idReserva).orElse(null);
    }

    @Override
    public Reserva guardarReserva(Reserva reserva) {
        return this.reservaRepositorio.save(reserva);
    }

    @Override
    public void eliminarReservaPorId(Integer idReserva) {
        this.reservaRepositorio.deleteById(idReserva);
    }
}
