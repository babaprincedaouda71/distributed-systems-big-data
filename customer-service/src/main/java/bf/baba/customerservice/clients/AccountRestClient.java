package bf.baba.customerservice.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@FeignClient(name = "ACCOUNT-SERVICE")
public interface AccountRestClient {
    @DeleteMapping("/account/remove/accounts/{customerId}")
    void deleteAccountsByCustomerId(@PathVariable Long customerId);
}
