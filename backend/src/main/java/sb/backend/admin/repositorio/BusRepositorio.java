// 2-bus:
package sb.backend.admin.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sb.backend.admin.modelo.Bus;

@Repository
public interface BusRepositorio extends JpaRepository<Bus, Integer> {
}
