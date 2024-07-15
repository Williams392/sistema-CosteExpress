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
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReserva;

    private String serie;
    private String comprobante;
    private String fechaReserva;
    private String tipoCompra;

    @ManyToOne
    @JoinColumn(name = "idPasajero")
    private Bus idPasajero;

    @ManyToOne
    @JoinColumn(name = "idItinerario")
    private Itinerario idItinerario;

}
