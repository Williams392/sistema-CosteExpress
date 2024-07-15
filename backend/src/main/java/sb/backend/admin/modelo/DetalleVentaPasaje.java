package sb.backend.admin.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DetalleVentaPasaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDetalleVentaPasaje;

    private String hora;

    @ManyToOne
    @JoinColumn(name = "idItinerario")
    private Itinerario idItinerario;

    @ManyToOne
    @JoinColumn(name = "idTipoServicio")
    private TipoServicio idTipoServicio;

}
