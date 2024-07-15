package sb.backend.admin.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sb.backend.admin.modelo.VentaPasaje;

@Repository
public interface VentaPasajeRepositorio extends JpaRepository<VentaPasaje, Integer> {
}

