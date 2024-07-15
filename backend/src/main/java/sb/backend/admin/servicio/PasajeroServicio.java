package sb.backend.admin.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sb.backend.admin.modelo.Pasajero;
import sb.backend.admin.repositorio.PasajeroRepositorio;

import java.util.List;

@Service
public class PasajeroServicio implements IPasajeroServicio {

    @Autowired
    private PasajeroRepositorio pasajeroRepositorio;

    @Override
    public List<Pasajero> listarPasajero() {
        return this.pasajeroRepositorio.findAll();
    }

    @Override
    public Pasajero buscarPasajeroPorId(Integer idPasajero) {
        return this.pasajeroRepositorio.findById(idPasajero).orElse(null);
    }

    @Override
    public Pasajero guardarPasajero(Pasajero pasajero) {
        return this.pasajeroRepositorio.save(pasajero);
    }

    @Override
    public void eliminarPasajeroPorId(Integer idPasajero) {
        this.pasajeroRepositorio.deleteById(idPasajero);
    }
}
