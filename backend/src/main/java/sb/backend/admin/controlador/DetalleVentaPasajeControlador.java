package sb.backend.admin.controlador;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sb.backend.admin.modelo.DetalleVentaPasaje;
import sb.backend.admin.servicio.DetalleVentaPasajeServicio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/transporte-api")
@CrossOrigin(value = "http://localhost:4200")
public class DetalleVentaPasajeControlador {

    private static final Logger logger = LoggerFactory.getLogger(DetalleVentaPasajeControlador.class);

    @Autowired
    private DetalleVentaPasajeServicio detalleVentaPasajeServicio;

    @GetMapping("/detalle-venta-pasaje")
    public List<DetalleVentaPasaje> obtenerDetallesVentaPasaje() {
        List<DetalleVentaPasaje> detalles = detalleVentaPasajeServicio.listarDetalleVentaPasaje();
        detalles.forEach(detalle -> {
            logger.info(detalle.toString());
            logger.info("Precio: " + detalle.getIdTipoServicio().getPrecio());
            logger.info("Nombre del servicio: " + detalle.getIdTipoServicio().getNombre());
            logger.info("Origen: " + detalle.getIdItinerario().getOrigen());
            logger.info("Destino: " + detalle.getIdItinerario().getDestino());
        });
        return detalles;
    }

    // Aquí agregar más métodos para manejar POST, PUT, DELETE, etc.
}

