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
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Random;

@SpringBootApplication
@EnableConfigurationProperties(GlobalConfig.class)
@EnableFeignClients
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(CustomerService customerService,
                            CustomerMapper customerMapper){
        return args -> {
            //Add some customers
//            Customer customer = Customer.builder()
//                    .firstName("Baba")
//                    .lastName("Prince")
//                    .email("babaprince@gmail.com")
//                    .build();
//            CustomerDTO customerDTO = customerMapper.fromCustomer(customer);
//            customerService.addCustomer(customerDTO);
//
//            Customer customer1 = Customer.builder()
//                    .firstName("Abdoul")
//                    .lastName("Aziz")
//                    .email("abdoulaaziz@gmail.com")
//                    .build();
//            CustomerDTO customerDTO1 = customerMapper.fromCustomer(customer1);
//            customerService.addCustomer(customerDTO1);

            for (int i = 0; i < 5; i++){
                Customer customer2 = generateRandomCustomer();
                CustomerDTO customerDTO2 = customerMapper.fromCustomer(customer2);
                customerService.addCustomer(customerDTO2);
            }
        };
    }

    private Customer generateRandomCustomer() {
        Random random = new Random();
        String[] firstNames = {"Awa", "Alice", "Brama", "Emma", "Daouda", "Olivia", "Jean", "Safiatou", "Miguel", "Stéphane"};
        String[] lastNames = {"Ouédraogo", "Kaboré", "Ouattara", "Coulibaly", "Traoré", "Samne", "Millogo", "Malo", "Son", "Hébié"};
        String[] domains = {"gmail.com", "yahoo.com", "hotmail.com", "icloud.com", "incognito.com"};

        String firstName = firstNames[random.nextInt(firstNames.length)];
        String lastName = lastNames[random.nextInt(lastNames.length)];
        String email = firstName.toLowerCase() + lastName.toLowerCase() + "@" + domains[random.nextInt(domains.length)];

        return Customer.builder()
                .firstName(firstName)
                .lastName(lastName)
                .email(email)
                .build();
    }

}
