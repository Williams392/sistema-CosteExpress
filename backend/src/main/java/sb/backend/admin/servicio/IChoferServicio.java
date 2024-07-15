package sb.backend.admin.servicio;

import sb.backend.admin.modelo.Chofer;

import java.util.List;

public interface IChoferServicio {
    List<Chofer> listarChoferes();
    Chofer buscarChoferPorId(Integer idChofer);
    Chofer guardarChofer(Chofer chofer);
    void eliminarChoferPorId(Integer idChofer);
}