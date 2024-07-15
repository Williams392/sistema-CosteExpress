package sb.backend.admin.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import sb.backend.admin.modelo.Itinerario;
import sb.backend.admin.servicio.ItinerarioServicio;
import sb.backend.admin.excepcion.RecursoNoEncontradoExcepcion;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("transporte-api")
@CrossOrigin(value = "http://localhost:4200")
public class ItinerarioControlador {
    private static final Logger logger = LoggerFactory.getLogger(ItinerarioControlador.class);

    @Autowired
    private ItinerarioServicio itinerarioServicio;

    @GetMapping("/itinerarios")
    public List<Itinerario> obtenerDestinos() {
        List<Itinerario> itinerarios = this.itinerarioServicio.listarItinerario();
        logger.info("Destinos obtenidos");
        itinerarios.forEach(itinerario -> logger.info(itinerario.toString()));
        return itinerarios;
    }

    @PostMapping("/itinerarios")
    public Itinerario agregarDestino(@RequestBody Itinerario itinerario) {
        logger.info("Destino a agregar " + itinerario);
        return this.itinerarioServicio.guardarItinerario(itinerario);
    }

    @GetMapping("/itinerarios/{id}")
    public ResponseEntity<Itinerario> obtenerDestinoPorId(@PathVariable int id) {
        Itinerario itinerario = this.itinerarioServicio.buscarItinerarioPorId(id);
        if (itinerario != null)
            return ResponseEntity.ok(itinerario);
        else
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
    }

    @PutMapping("/itinerarios/{id}")
    public ResponseEntity<Itinerario> actualizarDestino(@PathVariable int id, @RequestBody Itinerario itinerarioRecibido) {
        Itinerario itinerario = this.itinerarioServicio.buscarItinerarioPorId(id);
        if (itinerario == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
        itinerario.setOrigen(itinerarioRecibido.getOrigen());
        itinerario.setDestino(itinerarioRecibido.getDestino());
        itinerario.setFecha_viaje(itinerarioRecibido.getFecha_viaje());
        itinerario.setAsientos(itinerarioRecibido.getAsientos());
        itinerario.setAsientosOcupados(itinerarioRecibido.getAsientosOcupados());
        itinerario.setHoraSalida(itinerarioRecibido.getHoraSalida());
        itinerario.setHoraRetorno(itinerarioRecibido.getHoraRetorno());
        itinerario.setPrecio(itinerarioRecibido.getPrecio());
        itinerario.setNombreBus(itinerarioRecibido.getNombreBus()); // pk
        itinerario.setNombreChofer(itinerarioRecibido.getNombreChofer()); // pk
        this.itinerarioServicio.guardarItinerario(itinerario);
        return ResponseEntity.ok(itinerario);
    }

    @DeleteMapping("/http://localhost:8080/transporte-api/itinerarios/filtrar/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarDestino(@PathVariable int id) {
        Itinerario itinerario = itinerarioServicio.buscarItinerarioPorId(id);
        if (itinerario == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
        this.itinerarioServicio.eliminarItinerarioPorId(itinerario.getIdItinerario());
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/itinerarios/filtrar")
    public List<Itinerario> filtrarItinerarios(
            @RequestParam String origen,
            @RequestParam String destino,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaViaje) {
        return itinerarioServicio.filtrarItinerarios(origen, destino, fechaViaje);
    }

    // Reservar asientos y actualizar el estado de los asientos:

    @GetMapping("/itinerarios/{id}/asientos")
    public List<Integer> obtenerAsientosPorIdItinerario(@PathVariable int id) {
        return itinerarioServicio.obtenerAsientosPorIdItinerario(id);
    }

    @PostMapping("/itinerarios/{id}/reservar")
    public ResponseEntity<?> reservarAsiento(@PathVariable int id, @RequestBody List<Integer> asientosReservados) {
        Itinerario itinerario = itinerarioServicio.buscarItinerarioPorId(id);
        if (itinerario == null) {
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
        }

        // Obtener los asientos ocupados
        List<Integer> asientosOcupados = itinerario.getAsientosOcupados();

        // Calcular los asientos disponibles restando los ocupados del total
        double asientosDisponibles = itinerario.getAsientos() - asientosOcupados.size();

        // Verificar si hay suficientes asientos disponibles
        if (asientosReservados.size() > asientosDisponibles) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No hay suficientes asientos disponibles");
        }

        // Validar y reservar los asientos solicitados
        for (Integer asiento : asientosReservados) {
            if (!asientosOcupados.contains(asiento) && asiento <= itinerario.getAsientos()) {
                asientosOcupados.add(asiento);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Asiento no disponible o no válido");
            }
        }

        // Actualizar la lista de asientos ocupados en el itinerario
        itinerario.setAsientosOcupados(asientosOcupados);
        itinerarioServicio.guardarItinerario(itinerario);

        return ResponseEntity.ok("Asientos reservados exitosamente");
    }




}
