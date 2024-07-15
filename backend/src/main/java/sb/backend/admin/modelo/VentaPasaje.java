package sb.backend.admin.modelo;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VentaPasaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idVenta;

    private String origen;
    private String destino;
    private String fechaViaje;
    private String horaPartida;
    private String horaLlegada;
    private String asiento;

    private String tipoDocumento;
    private String numeroDocumento;
    private String nombres;
    private String apellidos;
    private String fechaNacimiento;
    private String genero;

    private Double precio;

    @ManyToOne
    @JoinColumn(name = "idItinerario")
    private Itinerario itinerario;

}