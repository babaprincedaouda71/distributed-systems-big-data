package bf.baba.customerservice.web;

import bf.baba.customerservice.dto.CustomerDTO;
import bf.baba.customerservice.repository.CustomerRepository;
import bf.baba.customerservice.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/customer")
public class CustomerRestController {
    private CustomerService customerService;

    @PostMapping("/add")
    public CustomerDTO addCustomer(@RequestBody CustomerDTO customerDTO){
        return customerService.addCustomer(customerDTO);
    }


    @GetMapping("/all")
    public List<CustomerDTO> customerList(){
        return customerService.findAll();
    }


    @GetMapping("/find/{id}")
    public CustomerDTO customer(@PathVariable Long id){
        return customerService.findById(id);
    }


    @DeleteMapping("/remove/{id}")
    public void removeCustomer(@PathVariable Long id){
        customerService.deleteCustomer(id);
    }

    @GetMapping("/findBy/{keyword}")
    public List<CustomerDTO> searchCustomers(@PathVariable String keyword){
        return customerService.searchCustomers(keyword);
    }
}
