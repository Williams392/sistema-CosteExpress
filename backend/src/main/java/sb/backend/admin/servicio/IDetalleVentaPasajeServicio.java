package sb.backend.admin.servicio;

import sb.backend.admin.modelo.DetalleVentaPasaje;

import java.util.List;

public interface IDetalleVentaPasajeServicio {

    public List<DetalleVentaPasaje> listarDetalleVentaPasaje();
    public DetalleVentaPasaje buscarDetalleVentaPasajePorId(Integer idDetalleVentaPasaje);
    public DetalleVentaPasaje guardarDetalleVentaPasaje(DetalleVentaPasaje detalleVentaPasaje);
    public void eliminarDetalleVentaPasajePorId(Integer idDetalleVentaPasaje);

}
