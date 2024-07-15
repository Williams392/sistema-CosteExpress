// 4-bus:
// automatico se crean los metodos con IBusServicio:

package sb.backend.admin.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sb.backend.admin.repositorio.BusRepositorio;
import sb.backend.admin.modelo.Bus;

import java.util.List;

@Service
public class BusServicio implements IBusServicio{

    @Autowired
    private BusRepositorio busRepositorio;

    @Override
    public List<Bus> listarBuses() {
        return this.busRepositorio.findAll();
    }

    @Override
    public Bus buscarBusPorId(Integer idBus) {
        return this.busRepositorio.findById(idBus).orElse(null);
    }

    @Override
    public Bus guardarBus(Bus bus) {
        return this.busRepositorio.save(bus);
    }

    @Override
    public void eliminarBusPorId(Integer idBus) {
        this.busRepositorio.deleteById(idBus);
    }
}
