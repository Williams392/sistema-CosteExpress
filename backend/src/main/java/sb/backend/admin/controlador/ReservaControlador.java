package sb.backend.admin.controlador;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sb.backend.admin.excepcion.RecursoNoEncontradoExcepcion;
import sb.backend.admin.modelo.Reserva;
import sb.backend.admin.servicio.ReservaServicio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("transporte-api")
@CrossOrigin(value = "http://localhost:4200")
public class ReservaControlador {

    private static final Logger logger = LoggerFactory.getLogger(ReservaControlador.class);

    @Autowired
    private ReservaServicio reservaServicio;

    @GetMapping("/reservas")
    public List<Reserva> obtenerReservas() {
        List<Reserva> reservas = this.reservaServicio.listarReserva();
        logger.info("Reservas obtenidas");
        reservas.forEach(reserva -> logger.info(reserva.toString()));
        return reservas;
    }

    @PostMapping("/reservas")
    public Reserva agregarReserva(@RequestBody Reserva reserva) {
        logger.info("Reserva a agregar " + reserva);
        return this.reservaServicio.guardarReserva(reserva);
    }

    @GetMapping("/reservas/{id}")
    public ResponseEntity<Reserva> obtenerReservaPorId(@PathVariable int id) {
        Reserva reserva = this.reservaServicio.buscarReservaPorId(id);
        if (reserva != null)
            return ResponseEntity.ok(reserva);
        else
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
    }

    @PutMapping("/reservas/{id}")
    public ResponseEntity<Reserva> actualizarReserva(@PathVariable int id, @RequestBody Reserva reservaRecibida) {
        Reserva reserva = this.reservaServicio.buscarReservaPorId(id);
        if (reserva == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
        reserva.setSerie(reservaRecibida.getSerie());
        reserva.setComprobante(reservaRecibida.getComprobante());
        reserva.setFechaReserva(reservaRecibida.getFechaReserva());
        reserva.setTipoCompra(reservaRecibida.getTipoCompra());
        reserva.setIdPasajero(reservaRecibida.getIdPasajero());
        reserva.setIdItinerario(reservaRecibida.getIdItinerario());
        this.reservaServicio.guardarReserva(reserva);
        return ResponseEntity.ok(reserva);
    }

    @DeleteMapping("/reservas/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarReserva(@PathVariable int id) {
        Reserva reserva = reservaServicio.buscarReservaPorId(id);
        if (reserva == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
        this.reservaServicio.eliminarReservaPorId(reserva.getIdReserva());
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}

