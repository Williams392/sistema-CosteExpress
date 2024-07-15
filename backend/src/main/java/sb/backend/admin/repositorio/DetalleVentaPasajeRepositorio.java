package sb.backend.admin.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sb.backend.admin.modelo.DetalleVentaPasaje;

@Repository
public interface DetalleVentaPasajeRepositorio extends JpaRepository<DetalleVentaPasaje, Integer>{
}
