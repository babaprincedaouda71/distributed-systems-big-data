package bf.baba.accountservice.entity;

import lombok.Getter;

@Getter
public class TransferData {
    private String fromAccount;
    private String toAccount;
    private double amount;
}
