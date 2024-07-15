package sb.backend.admin.servicio;

import sb.backend.admin.modelo.TipoServicio;

import java.util.List;

public interface ITipoSServicio {

    List<TipoServicio> listarTipoServicio();
    TipoServicio buscarTipoServicioPorId(Integer idTipoServicio);
    TipoServicio guardarTipoServicio(TipoServicio tipoServicio);
    void eliminarTipoServicioPorId(Integer idTipoServicio);
}

