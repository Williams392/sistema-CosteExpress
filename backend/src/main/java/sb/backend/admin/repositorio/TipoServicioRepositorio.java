package sb.backend.admin.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sb.backend.admin.modelo.TipoServicio;

@Repository
public interface TipoServicioRepositorio extends JpaRepository<TipoServicio, Integer>{
}
