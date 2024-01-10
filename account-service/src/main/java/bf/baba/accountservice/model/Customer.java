package bf.baba.accountservice.model;

import lombok.*;

@Getter @Setter @ToString @AllArgsConstructor @NoArgsConstructor
public class Customer {
    private Long id;
    private String firstName;
    private String lasttName;
    private String email;
}
