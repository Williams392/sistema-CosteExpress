package sb.backend.admin.servicio;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import sb.backend.admin.repositorio.ChoferRepositorio;
import sb.backend.admin.modelo.Chofer;

import java.util.List;

@Service
public class ChoferServicio implements IChoferServicio {

    @Autowired
    private ChoferRepositorio choferRepositorio;

    @Override
    public List<Chofer> listarChoferes() {
        return this.choferRepositorio.findAll();
    }

    @Override
    public Chofer buscarChoferPorId(Integer idChofer) {
        return this.choferRepositorio.findById(idChofer).orElse(null);
    }

    @Override
    public Chofer guardarChofer(Chofer chofer) {
        return this.choferRepositorio.save(chofer);
    }

    @Override
    public void eliminarChoferPorId(Integer idChofer) {
        this.choferRepositorio.deleteById(idChofer);
    }
}
