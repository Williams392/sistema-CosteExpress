package sb.backend.admin.servicio;

import org.springframework.stereotype.Service;
import sb.backend.admin.modelo.DetalleVentaPasaje;

import java.util.List;

@Service
public class DetalleVentaPasajeServicio implements IDetalleVentaPasajeServicio{
    @Override
    public List<DetalleVentaPasaje> listarDetalleVentaPasaje() {
        return List.of();
    }

    @Override
    public DetalleVentaPasaje buscarDetalleVentaPasajePorId(Integer idDetalleVentaPasaje) {
        return null;
    }

    @Override
    public DetalleVentaPasaje guardarDetalleVentaPasaje(DetalleVentaPasaje detalleVentaPasaje) {
        return null;
    }

    @Override
    public void eliminarDetalleVentaPasajePorId(Integer idDetalleVentaPasaje) {

    }
}
