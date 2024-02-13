package bf.baba.accountservice.web;

import bf.baba.accountservice.clients.CustomerRestClient;
import bf.baba.accountservice.dto.AccountDTO;
import bf.baba.accountservice.entity.TransferData;
import bf.baba.accountservice.model.Customer;
import bf.baba.accountservice.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Transactional
@RequestMapping("/account")
public class AccountRestController {
    private AccountService accountService;
    private CustomerRestClient customerRestClient;


    @PostMapping("/add")
    public AccountDTO createAccount(@RequestBody AccountDTO accountDTO){
        return accountService.createAccount(accountDTO);
    }

    @GetMapping("/all")
    public List<AccountDTO> getAll(){
        List<AccountDTO> accountDTOS = accountService.getAll();
        accountDTOS.forEach(accountDTO -> {
            Customer customerById = customerRestClient.findCustomerById(accountDTO.getCustomer_id());
            accountDTO.setCustomer(customerById);
        });
        return accountDTOS;
    }

    @GetMapping("/find/{accountId}")
    public AccountDTO getById(@PathVariable String accountId){
        AccountDTO accountDTO = accountService.findById(accountId);
        Customer customer =  customerRestClient.findCustomerById(accountDTO.getCustomer_id());
        accountDTO.setCustomer(customer);
        return accountDTO;
    }

    @DeleteMapping("/delete/{accountId}")
    public void deleteAccount(@PathVariable String accountId){
        accountService.deleteAccount(accountId);
    }


    @DeleteMapping("/remove/accounts/{customerId}")
    public void deleteAccountsByCustomerId(@PathVariable Long customerId){
        accountService.deleteAccountsByCustomerId(customerId);
    }

    @PostMapping("/transfer")
    public boolean transferAmount(@RequestBody TransferData transferData){
        accountService.transfer(transferData);
        return true;
    }


    @GetMapping("/auth")
    public Authentication authentication(Authentication authentication){
        return authentication;
    }
}
