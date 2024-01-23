package bf.baba.customerservice.service;

import bf.baba.customerservice.clients.AccountRestClient;
import bf.baba.customerservice.dto.CustomerDTO;
import bf.baba.customerservice.entity.Customer;
import bf.baba.customerservice.mapper.CustomerMapper;
import bf.baba.customerservice.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CustomerServiceImpl01 implements CustomerService {
    private CustomerRepository customerRepository;
    private CustomerMapper customerMapper;
    private AccountRestClient accountRestClient;
    @Override
    public CustomerDTO addCustomer(CustomerDTO customerDTO) {
        Customer customer = customerMapper.fromCustomerDTO(customerDTO);
        Customer savedCustomer = customerRepository.save(customer);
        return customerMapper.fromCustomer(savedCustomer);
    }

    @Override
    public List<CustomerDTO> findAll() {
        List<Customer> all = customerRepository.findAll();
        List<CustomerDTO> customerDTOS = new ArrayList<>();
        all.forEach(customer -> {
            CustomerDTO customerDTO = customerMapper.fromCustomer(customer);
            customerDTOS.add(customerDTO);
        });
        return customerDTOS;
    }

    @Override
    public CustomerDTO findById(Long id) {
        Customer customer = customerRepository.findById(id).get();
        return customerMapper.fromCustomer(customer);
    }

    @Override
    public void deleteCustomer(Long id) {
        accountRestClient.deleteAccountsByCustomerId(id);
        CustomerDTO byId = findById(id);
        Customer customer = customerMapper.fromCustomerDTO(byId);
        customerRepository.delete(customer);
    }

    @Override
    public List<CustomerDTO> searchCustomers(String keyword) {
        List<Customer> customers = customerRepository.findByFirstNameContainsOrLastNameContains(keyword);
        List<CustomerDTO> customerDTOS = new ArrayList<>();
        customers.forEach(customer -> {
            customerDTOS.add(customerMapper.fromCustomer(customer));
        });
        return customerDTOS;
    }

    @Override
    public CustomerDTO updateCustomer(Long customerId, CustomerDTO customerDTO) {
        Customer existingCustomer = customerRepository.findById(customerId).get();
        existingCustomer.setEmail(customerDTO.getEmail());
        existingCustomer.setFirstName(customerDTO.getFirstName());
        existingCustomer.setLastName(customerDTO.getLastName());
        Customer updatedCustomer = customerRepository.save(existingCustomer);
        System.out.println(existingCustomer);
        return customerMapper.fromCustomer(updatedCustomer);
    }
}
