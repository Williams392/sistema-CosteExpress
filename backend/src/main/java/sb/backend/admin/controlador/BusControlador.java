package sb.backend.admin.controlador;

import sb.backend.admin.excepcion.RecursoNoEncontradoExcepcion;
import sb.backend.admin.modelo.Bus;
import sb.backend.admin.servicio.BusServicio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
//http://localhost:8080/transporte-app
@RequestMapping("transporte-api")
@CrossOrigin(value = "http://localhost:4200")

public class BusControlador {
    private static final Logger logger = LoggerFactory.getLogger(BusControlador.class);

    @Autowired
    private BusServicio busServicio;

    @GetMapping("/buses")
    public List<Bus> obtenerBuses(){
        List<Bus> buses = this.busServicio.listarBuses();
        logger.info("Buses obtenidos");
        buses.forEach((bus -> logger.info(bus.toString())));
        return buses;
    }

    @PostMapping("/buses")
    public Bus agregarBus(@RequestBody Bus bus){
        logger.info("Bus a agregar " + bus);
        return this.busServicio.guardarBus(bus);
    }

    @GetMapping("/buses/{id}")
    public ResponseEntity<Bus> obtenerBusPorId(@PathVariable int id){
        Bus bus = this.busServicio.buscarBusPorId(id);
        if(bus != null)
            return ResponseEntity.ok(bus);
        else
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
    }

    @PutMapping("/buses/{id}")
    public ResponseEntity<Bus> actualizarBus(@PathVariable int id, @RequestBody Bus busRecibido) {
        Bus bus = this.busServicio.buscarBusPorId(id);
        if (bus == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
        bus.setNombreBus(busRecibido.getNombreBus());
        bus.setNroPlaca(busRecibido.getNroPlaca());
        bus.setCantidadAsientos(busRecibido.getCantidadAsientos());
        bus.setAno_fabricacion(busRecibido.getAno_fabricacion());
        bus.setMarca(busRecibido.getMarca());
        bus.setEstado(busRecibido.getEstado());
        bus.setColor(busRecibido.getColor());
        //chofer.setBus(choferRecibido.getBus());
        bus.setChofer(busRecibido.getChofer());
        this.busServicio.guardarBus(bus);
        return ResponseEntity.ok(bus);
    }

    @DeleteMapping("/buses/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarBus(@PathVariable int id){
        Bus bus = busServicio.buscarBusPorId(id);
        if (bus == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
        this.busServicio.eliminarBusPorId(bus.getIdBus());
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
