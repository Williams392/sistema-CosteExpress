package sb.backend.admin.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Itinerario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idItinerario;

    private String origen;
    private String destino;
    private LocalDate fecha_viaje;
    private Double asientos; // Stock de 40 asientos disponibles:
    private String horaSalida;
    private String horaRetorno;
    private Double precio;

    @ElementCollection
    private List<Integer> asientosOcupados  = new ArrayList<>(); // Lista de asientos disponibles

    @ManyToOne
    @JoinColumn(name = "idBus")
    private Bus nombreBus;

    @ManyToOne
    @JoinColumn(name = "idChofer")
    private Chofer nombreChofer;

}

//private String fecha_viaje;
//@ManyToOne
//@JoinColumn(name = "idTipoServicio")
//private TipoServicio tipoServicio; // nombre y precio
