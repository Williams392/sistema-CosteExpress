package sb.backend.admin.servicio;
import sb.backend.admin.modelo.VentaPasaje;

import java.util.List;

public interface IVentaPasajeServicio {

    List<VentaPasaje> listarVentas();
    VentaPasaje buscarVentaPorId(Integer idVenta);
    VentaPasaje guardarVenta(VentaPasaje ventaPasaje);
    void eliminarVentaPorId(Integer idVenta);

}
