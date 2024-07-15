package sb.backend.admin.servicio;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import sb.backend.admin.modelo.TipoServicio;
import sb.backend.admin.repositorio.TipoServicioRepositorio;

import java.util.List;

@Service
public class TipoSServicio implements ITipoSServicio {

    @Autowired
    private TipoServicioRepositorio tipoServicioRepositorio;

    @Override
    public List<TipoServicio> listarTipoServicio() {
        return this.tipoServicioRepositorio.findAll();
    }

    @Override
    public TipoServicio buscarTipoServicioPorId(Integer idTipoServicio) {
        return this.tipoServicioRepositorio.findById(idTipoServicio).orElse(null);
    }

    @Override
    public TipoServicio guardarTipoServicio(TipoServicio tipoServicio) {
        return this.tipoServicioRepositorio.save(tipoServicio);
    }

    @Override
    public void eliminarTipoServicioPorId(Integer idTipoServicio) {
        this.tipoServicioRepositorio.deleteById(idTipoServicio);
    }
}