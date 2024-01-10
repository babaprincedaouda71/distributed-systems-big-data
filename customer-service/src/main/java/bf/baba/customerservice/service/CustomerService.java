package bf.baba.customerservice.service;

import bf.baba.customerservice.dto.CustomerDTO;
import bf.baba.customerservice.entity.Customer;

import java.util.List;

public interface CustomerService {
    CustomerDTO addCustomer(CustomerDTO customerDTO);
    List<CustomerDTO> findAll();
    CustomerDTO findById(Long id);
    void deleteCustomer(Long id);
}
