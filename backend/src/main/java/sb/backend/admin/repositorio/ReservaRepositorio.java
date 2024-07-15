package sb.backend.admin.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sb.backend.admin.modelo.Reserva;

@Repository
public interface ReservaRepositorio extends JpaRepository<Reserva, Integer>{

}
