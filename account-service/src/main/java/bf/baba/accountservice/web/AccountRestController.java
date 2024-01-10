package bf.baba.accountservice.web;

import bf.baba.accountservice.clients.CustomerRestClient;
import bf.baba.accountservice.dto.AccountDTO;
import bf.baba.accountservice.model.Customer;
import bf.baba.accountservice.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
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

    @DeleteMapping("/remove/{accountId}")
    public void deleteAccount(@PathVariable String accountId){
        accountService.deleteAccount(accountId);
    }
}
