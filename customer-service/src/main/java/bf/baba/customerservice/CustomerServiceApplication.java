package bf.baba.customerservice;

import bf.baba.customerservice.config.GlobalConfig;
import bf.baba.customerservice.dto.CustomerDTO;
import bf.baba.customerservice.entity.Customer;
import bf.baba.customerservice.mapper.CustomerMapper;
import bf.baba.customerservice.service.CustomerService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(GlobalConfig.class)
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(CustomerService customerService,
                            CustomerMapper customerMapper){
        return args -> {
            //Add some customers
            Customer customer = Customer.builder()
                    .firstName("Baba")
                    .lastName("Prince")
                    .email("babaprince@gmail.com")
                    .build();
            CustomerDTO customerDTO = customerMapper.fromCustomer(customer);
            customerService.addCustomer(customerDTO);

            Customer customer1 = Customer.builder()
                    .firstName("Abdoul")
                    .lastName("Aziz")
                    .email("abdoulaaziz@gmail.com")
                    .build();
            CustomerDTO customerDTO1 = customerMapper.fromCustomer(customer1);
            customerService.addCustomer(customerDTO1);
        };
    }

}
