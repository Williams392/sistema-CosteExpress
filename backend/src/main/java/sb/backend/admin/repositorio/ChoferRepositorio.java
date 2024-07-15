package sb.backend.admin.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sb.backend.admin.modelo.Chofer;

@Repository
public interface ChoferRepositorio extends JpaRepository<Chofer, Integer> {
}
