package sb.backend.admin.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sb.backend.admin.modelo.TipoServicio;
import sb.backend.admin.servicio.ITipoSServicio;
import sb.backend.admin.excepcion.RecursoNoEncontradoExcepcion;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("transporte-api")
@CrossOrigin(value = "http://localhost:4200")
public class TipoServicioControlador {

    @Autowired
    private ITipoSServicio tipoSServicio;

    @GetMapping("/tipos-servicio")
    public List<TipoServicio> obtenerTiposServicio() {
        List<TipoServicio> tiposServicio = tipoSServicio.listarTipoServicio();
        return tiposServicio;
    }

    @PostMapping("/tipos-servicio")
    public TipoServicio agregarTipoServicio(@RequestBody TipoServicio tipoServicio) {
        return tipoSServicio.guardarTipoServicio(tipoServicio);
    }

    @GetMapping("/tipos-servicio/{id}")
    public ResponseEntity<TipoServicio> obtenerTipoServicioPorId(@PathVariable Integer id) {
        TipoServicio tipoServicio = tipoSServicio.buscarTipoServicioPorId(id);
        if (tipoServicio != null)
            return ResponseEntity.ok(tipoServicio);
        else
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);
    }

    @PutMapping("/tipos-servicio/{id}")
    public ResponseEntity<TipoServicio> actualizarTipoServicio(@PathVariable Integer id, @RequestBody TipoServicio tipoServicioRecibido) {
        TipoServicio tipoServicio = tipoSServicio.buscarTipoServicioPorId(id);
        if (tipoServicio == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);

        // Actualizar los campos del tipoServicio con los recibidos
        tipoServicio.setNombre(tipoServicioRecibido.getNombre());
        tipoServicio.setPrecio(tipoServicioRecibido.getPrecio());
        tipoServicio.setEstado(tipoServicioRecibido.getEstado());


        tipoSServicio.guardarTipoServicio(tipoServicio);
        return ResponseEntity.ok(tipoServicio);
    }

    @DeleteMapping("/tipos-servicio/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarTipoServicio(@PathVariable Integer id) {
        TipoServicio tipoServicio = tipoSServicio.buscarTipoServicioPorId(id);
        if (tipoServicio == null)
            throw new RecursoNoEncontradoExcepcion("No se encontró el id " + id);

        tipoSServicio.eliminarTipoServicioPorId(id);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
