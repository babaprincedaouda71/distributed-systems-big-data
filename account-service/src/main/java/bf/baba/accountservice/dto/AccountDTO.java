package bf.baba.accountservice.dto;

import bf.baba.accountservice.enums.AccountType;
import bf.baba.accountservice.model.Customer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class AccountDTO {
    private String id;
    private double balance;
    private LocalDate openingDate;
    private String currency;

    private AccountType accountType;
    private Long customer_id;
    private Customer customer;
}
