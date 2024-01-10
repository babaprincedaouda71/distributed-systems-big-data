package bf.baba.customerservice.mapper;

import bf.baba.customerservice.dto.CustomerDTO;
import bf.baba.customerservice.entity.Customer;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class CustomerMapper {
    private final ModelMapper modelMapper = new ModelMapper();

    public CustomerDTO fromCustomer(Customer customer){
        return modelMapper.map(customer, CustomerDTO.class);
    }

    public Customer fromCustomerDTO(CustomerDTO customerDTO){
        return modelMapper.map(customerDTO, Customer.class);
    }
}
