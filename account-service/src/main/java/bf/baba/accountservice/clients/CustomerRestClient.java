package bf.baba.accountservice.clients;

import bf.baba.accountservice.model.Customer;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "CUSTOMER-SERVICE")
public interface CustomerRestClient {
    @GetMapping("/customer/find/{customerId}")
    @CircuitBreaker(name = "customerService", fallbackMethod = "getDefaultCustomer")
    Customer findCustomerById(@PathVariable Long customerId);

    @GetMapping("/customer/all")
    @CircuitBreaker(name = "customerService", fallbackMethod = "getAllDefaultCustomers")
    List<Customer> allCustomers();

    default Customer getDefaultCustomer(Long customerId, Exception exception){
        Customer customer = new Customer();
        customer.setId(customerId);
        customer.setFirstName("Not Available");
        customer.setLastName("Not Available");
        customer.setEmail("Not Available");
        return customer;
    }

    default List<Customer> getAllDefaultCustomers(Exception exception){
        return List.of();
    }
}
