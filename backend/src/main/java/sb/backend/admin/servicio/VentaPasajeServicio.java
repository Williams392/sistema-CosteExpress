package sb.backend.admin.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sb.backend.admin.excepcion.RecursoNoEncontradoExcepcion;
import sb.backend.admin.modelo.VentaPasaje;
import sb.backend.admin.repositorio.VentaPasajeRepositorio;

import java.util.List;

@Service
public class VentaPasajeServicio implements IVentaPasajeServicio{
    @Autowired
    private VentaPasajeRepositorio ventaPasajeRepositorio;

    @Override
    public List<VentaPasaje> listarVentas() {
        return this.ventaPasajeRepositorio.findAll();
    }


    //public VentaPasaje buscarVentaPorId(Integer idVenta) {
        //return this.ventaPasajeRepositorio.findById(idVenta).orElse(null);
    //}

    @Override
    public VentaPasaje buscarVentaPorId(Integer id) {
        return ventaPasajeRepositorio.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoExcepcion("VentaPasaje no encontrada con id: " + id));
    }

    @Override
    public VentaPasaje guardarVenta(VentaPasaje ventaPasaje) {
        return this.ventaPasajeRepositorio.save(ventaPasaje);
    }

    @Override
    public void eliminarVentaPorId(Integer idVenta) {
        this.ventaPasajeRepositorio.deleteById(idVenta);
    }

}
