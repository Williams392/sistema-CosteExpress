package sb.backend.admin.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sb.backend.admin.modelo.Pasajero;

@Repository
public interface PasajeroRepositorio extends JpaRepository<Pasajero, Integer>{
}
