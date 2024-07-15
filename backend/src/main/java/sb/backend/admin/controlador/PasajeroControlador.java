package sb.backend.admin.controlador;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sb.backend.admin.excepcion.RecursoNoEncontradoExcepcion;
import sb.backend.admin.modelo.Pasajero;
import sb.backend.admin.servicio.PasajeroServicio;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("transporte-api")
@CrossOrigin(value = "http://localhost:4200")
public class PasajeroControlador {

    private static final Logger logger = LoggerFactory.getLogger(PasajeroControlador.class);

    @Autowired
    private PasajeroServicio pasajeroServicio;

    @GetMapping("/pasajeros")
    public List<Pasajero> obtenerPasajeros() {
        List<Pasajero> pasajeros = this.pasajeroServicio.listarPasajero();
        logger.info("Pasajeros obtenidos");
        pasajeros.forEach(pasajero -> logger.info(pasajero.toString()));
        return pasajeros;
    }

    @PostMapping("/pasajeros")
    public Pasajero agregarPasajero(@RequestBody Pasajero pasajero) {
        logger.info("Pasajero a agregar " + pasajero);
        return this.pasajeroServicio.guardarPasajero(pasajero);
    }

    @GetMapping("/pasajeros/{id}")
    public ResponseEntity<Pasajero> obtenerPasajeroPorId(@PathVariable int id) {
        Pasajero pasajero = this.pasajeroServicio.buscarPasajeroPorId(id);
        if (pasajero != null)
            return ResponseEntity.ok(pasajero);
        else
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
    }

    @PutMapping("/pasajeros/{id}")
    public ResponseEntity<Pasajero> actualizarPasajero(@PathVariable int id, @RequestBody Pasajero pasajeroRecibido) {
        Pasajero pasajero = this.pasajeroServicio.buscarPasajeroPorId(id);
        if (pasajero == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
        pasajero.setNombres(pasajeroRecibido.getNombres());
        pasajero.setApellidos(pasajeroRecibido.getApellidos());
        pasajero.setDireccion(pasajeroRecibido.getDireccion());
        pasajero.setDni(pasajeroRecibido.getDni());
        pasajero.setTelefono(pasajeroRecibido.getTelefono());
        pasajero.setEmail(pasajeroRecibido.getEmail());
        pasajero.setFechaNacimiento(pasajeroRecibido.getFechaNacimiento());
        pasajero.setContrasena(pasajeroRecibido.getContrasena());
        pasajero.setEdad(pasajeroRecibido.getEdad());
        pasajero.setSexo(pasajeroRecibido.getSexo());
        pasajero.setIdBus(pasajeroRecibido.getIdBus());
        pasajero.setIdReserva(pasajeroRecibido.getIdReserva());
        this.pasajeroServicio.guardarPasajero(pasajero);
        return ResponseEntity.ok(pasajero);
    }

    @DeleteMapping("/pasajeros/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarPasajero(@PathVariable int id) {
        Pasajero pasajero = pasajeroServicio.buscarPasajeroPorId(id);
        if (pasajero == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
        this.pasajeroServicio.eliminarPasajeroPorId(pasajero.getIdPasajero());
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}

