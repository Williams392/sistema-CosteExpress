package sb.backend.admin.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sb.backend.admin.modelo.Itinerario;
import sb.backend.admin.repositorio.ItinerarioRepositorio;

import java.time.LocalDate;
import java.util.List;

@Service
public class ItinerarioServicio implements IItinerarioServicio {

    @Autowired
    private ItinerarioRepositorio itinerarioRepositorio;

    @Override
    public List<Itinerario> listarItinerario() {
        return this.itinerarioRepositorio.findAll();
    }

    @Override
    public Itinerario buscarItinerarioPorId(Integer idDestino) {
        return this.itinerarioRepositorio.findById(idDestino).orElse(null);
    }

    @Override
    public Itinerario guardarItinerario(Itinerario itinerario) {
        return this.itinerarioRepositorio.save(itinerario);
    }

    @Override
    public void eliminarItinerarioPorId(Integer idDestino) {
        this.itinerarioRepositorio.deleteById(idDestino);
    }

    @Override
    public List<Integer> obtenerAsientosPorIdItinerario(Integer idItinerario) {
        return this.itinerarioRepositorio.findAsientosByIdItinerario(idItinerario);
    }

    public List<Itinerario> filtrarItinerarios(String origen, String destino, LocalDate fechaViaje) {
        return itinerarioRepositorio.findByOrigenAndDestinoAndFechaViaje(origen, destino, fechaViaje);
    }
}