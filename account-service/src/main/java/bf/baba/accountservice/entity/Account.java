package bf.baba.accountservice.entity;

import bf.baba.accountservice.enums.AccountType;
import bf.baba.accountservice.model.Customer;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter @Setter @ToString @NoArgsConstructor @AllArgsConstructor @Builder
public class Account {
    @Id
    private String accountId;
    private double balance;
    private LocalDate openingDate;
    private String currency;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    @Transient
    private Customer customer;
    private Long customer_id;
}
