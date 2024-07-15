package sb.backend.admin.controlador;

import sb.backend.admin.modelo.Chofer;
import sb.backend.admin.servicio.ChoferServicio;
import sb.backend.admin.excepcion.RecursoNoEncontradoExcepcion;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("transporte-api")
@CrossOrigin(value = "http://localhost:4200")
public class ChoferControlador {

    private static final Logger  logger = LoggerFactory.getLogger(ChoferControlador.class);

    @Autowired
    private ChoferServicio choferServicio;

    @GetMapping("/choferes")
    public List<Chofer> obtenerChoferes(){
        List<Chofer> choferes = this.choferServicio.listarChoferes();
        logger.info("Choferes obtenidos");
        choferes.forEach((chofer -> logger.info(chofer.toString())));
        return choferes;
    }

    @PostMapping("/choferes")
    public Chofer agregarChofer(@RequestBody Chofer chofer){
        logger.info("Chofer a agregar " + chofer);
        return this.choferServicio.guardarChofer(chofer);
    }

    @GetMapping("/choferes/{id}")
    public ResponseEntity<Chofer> obtenerChoferPorId(@PathVariable int id){
        Chofer chofer = this.choferServicio.buscarChoferPorId(id);
        if(chofer != null)
            return ResponseEntity.ok(chofer);
        else
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
    }

    @PutMapping("/choferes/{id}")
    public ResponseEntity<Chofer> actualizarChofer(@PathVariable int id, @RequestBody Chofer choferRecibido) {
        Chofer chofer = this.choferServicio.buscarChoferPorId(id);
        if (chofer == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
        chofer.setNombreChofer(choferRecibido.getNombreChofer());
        chofer.setDireccion(choferRecibido.getDireccion());
        chofer.setNumBrevete(choferRecibido.getNumBrevete());
        //chofer.setBus(choferRecibido.getBus());
        this.choferServicio.guardarChofer(chofer);
        return ResponseEntity.ok(chofer);
    }

    @DeleteMapping("/choferes/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarChofer(@PathVariable int id){
        Chofer chofer = choferServicio.buscarChoferPorId(id);
        if (chofer == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
        this.choferServicio.eliminarChoferPorId(chofer.getIdChofer());
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }

}
