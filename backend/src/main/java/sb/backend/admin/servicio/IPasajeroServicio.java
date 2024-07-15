package sb.backend.admin.servicio;

import sb.backend.admin.modelo.Pasajero;

import java.util.List;

public interface IPasajeroServicio {

    public List<Pasajero> listarPasajero();
    public Pasajero buscarPasajeroPorId(Integer idPasajero);
    public Pasajero guardarPasajero(Pasajero pasajero);
    public void eliminarPasajeroPorId(Integer idPasajero);

}
