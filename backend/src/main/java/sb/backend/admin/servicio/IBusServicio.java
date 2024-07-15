// 3-bus:
// Manualmente:

package sb.backend.admin.servicio;
import sb.backend.admin.modelo.Bus;
import java.util.List;

public interface IBusServicio {

    public List<Bus> listarBuses();
    public Bus buscarBusPorId(Integer idBus);
    public Bus guardarBus(Bus bus);
    public void eliminarBusPorId(Integer idBus);

}


