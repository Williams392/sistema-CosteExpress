package sb.backend.admin.modelo;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Pasajero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPasajero;

    private String nombres;
    private String apellidos;
    private String direccion;
    private String dni;
    private String telefono;
    private String email;
    private String fechaNacimiento;
    private String contrasena;
    private Double edad;
    private String sexo;

    @ManyToOne
    @JoinColumn(name = "idBus")
    private Bus idBus;

    @ManyToOne
    @JoinColumn(name = "idReserva")
    @JsonIgnore
    private Reserva idReserva;

}
