package sb.backend.admin.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sb.backend.admin.modelo.Itinerario;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ItinerarioRepositorio extends JpaRepository<Itinerario, Integer> {

    @Query("SELECT i FROM Itinerario i WHERE i.origen = :origen AND i.destino = :destino AND i.fecha_viaje = :fechaViaje")
    List<Itinerario> findByOrigenAndDestinoAndFechaViaje(
            @Param("origen") String origen,
            @Param("destino") String destino,
            @Param("fechaViaje") LocalDate fechaViaje
    );

    // Método para encontrar itinerarios por id y obtener los asientos disponibles
    @Query("SELECT i.asientos FROM Itinerario i WHERE i.idItinerario = :idItinerario")
    List<Integer> findAsientosByIdItinerario(@Param("idItinerario") Integer idItinerario);

}











