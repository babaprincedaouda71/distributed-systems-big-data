package bf.baba.customerservice.model;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    private String accountId;
    private double balance;
    private LocalDate openingDate;
    private String currency;
    private String accountType;
    private Long customer_id;
}
