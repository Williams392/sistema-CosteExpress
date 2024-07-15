package sb.backend.admin.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sb.backend.admin.excepcion.RecursoNoEncontradoExcepcion;
import sb.backend.admin.modelo.VentaPasaje;
import sb.backend.admin.servicio.VentaPasajeServicio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/transporte-api")
@CrossOrigin(origins = "http://localhost:4200")
public class VentaPasajeControlador {
    private static final Logger logger = LoggerFactory.getLogger(VentaPasajeControlador.class);

    @Autowired
    private VentaPasajeServicio ventaPasajeServicio;

    @GetMapping("/ventas")
    public List<VentaPasaje> obtenerVentas() {
        List<VentaPasaje> ventas = this.ventaPasajeServicio.listarVentas();
        logger.info("Ventas obtenidas");
        ventas.forEach(venta -> logger.info(venta.toString()));
        return ventas;
    }

    @PostMapping("/ventas")
    public VentaPasaje agregarVenta(@RequestBody VentaPasaje ventaPasaje) {
        logger.info("Venta a agregar: " + ventaPasaje);
        return this.ventaPasajeServicio.guardarVenta(ventaPasaje);
    }

    @GetMapping("/ventas/{id}")
    public ResponseEntity<VentaPasaje> obtenerVentaPorId(@PathVariable int id) {
        VentaPasaje ventaPasaje = this.ventaPasajeServicio.buscarVentaPorId(id);
        if (ventaPasaje != null)
            return ResponseEntity.ok(ventaPasaje);
        else
            throw new RecursoNoEncontradoExcepcion("No se encontró la venta con id " + id);
    }

    @PutMapping("/ventas/{id}")
    public ResponseEntity<VentaPasaje> actualizarVenta(@PathVariable int id, @RequestBody VentaPasaje ventaRecibida) {
        VentaPasaje ventaPasaje = this.ventaPasajeServicio.buscarVentaPorId(id);
        if (ventaPasaje == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró la venta con id " + id);
        ventaPasaje.setOrigen(ventaRecibida.getOrigen());
        ventaPasaje.setDestino(ventaRecibida.getDestino());
        ventaPasaje.setFechaViaje(ventaRecibida.getFechaViaje());
        ventaPasaje.setHoraPartida(ventaRecibida.getHoraPartida());
        ventaPasaje.setHoraLlegada(ventaRecibida.getHoraLlegada());
        ventaPasaje.setAsiento(ventaRecibida.getAsiento());
        ventaPasaje.setTipoDocumento(ventaRecibida.getTipoDocumento());
        ventaPasaje.setNumeroDocumento(ventaRecibida.getNumeroDocumento());
        ventaPasaje.setNombres(ventaRecibida.getNombres());
        ventaPasaje.setApellidos(ventaRecibida.getApellidos());
        ventaPasaje.setFechaNacimiento(ventaRecibida.getFechaNacimiento());
        ventaPasaje.setGenero(ventaRecibida.getGenero());
        ventaPasaje.setPrecio(ventaRecibida.getPrecio());
        ventaPasaje.setItinerario(ventaRecibida.getItinerario()); // pk
        this.ventaPasajeServicio.guardarVenta(ventaPasaje);
        return ResponseEntity.ok(ventaPasaje);
    }

    @DeleteMapping("/ventas/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarVenta(@PathVariable int id) {
        VentaPasaje ventaPasaje = ventaPasajeServicio.buscarVentaPorId(id);
        if (ventaPasaje == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró la venta con id " + id);
        this.ventaPasajeServicio.eliminarVentaPorId(ventaPasaje.getIdVenta());
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
