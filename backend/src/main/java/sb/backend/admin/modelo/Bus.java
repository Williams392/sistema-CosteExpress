// 1-bus:
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
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idBus;

    private String nombreBus;
    private String Marca;

    @Column(name = "nroPlaca", nullable = false, unique = true, length = 50)
    private String nroPlaca;
    
    private String ano_fabricacion;
    private Integer cantidadAsientos;

    private Boolean estado; // Añadir este campo
    private String color;

    @ManyToOne
    @JoinColumn(name = "idChofer")
    private Chofer chofer;
}
