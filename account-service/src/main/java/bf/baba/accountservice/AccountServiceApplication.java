package bf.baba.accountservice;

import bf.baba.accountservice.clients.CustomerRestClient;
import bf.baba.accountservice.dto.AccountDTO;
import bf.baba.accountservice.entity.Account;
import bf.baba.accountservice.enums.AccountType;
import bf.baba.accountservice.mapper.AccountMapper;
import bf.baba.accountservice.service.AccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
@EnableFeignClients
public class AccountServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccountServiceApplication.class, args);
	}


	@Bean
	CommandLineRunner start(
			AccountService accountService,
			AccountMapper accountMapper,
			CustomerRestClient customerRestClient){
		return args -> {
			//Add some Accounts
			customerRestClient.allCustomers().forEach(customer -> {
				Account account = Account.builder()
						.accountId(UUID.randomUUID().toString())
						.balance(Double.parseDouble(String.format("%.2f", (Math.random() * 5463))))
						.currency("MAD")
						.accountType(AccountType.CURRENT_ACCOUNT)
						.openingDate(LocalDate.now())
						.customer_id(customer.getId())
						.build();
				AccountDTO accountDTO = accountMapper.fromAccount(account);
				accountService.createAccount(accountDTO);

				Account account1 = Account.builder()
						.accountId(UUID.randomUUID().toString())
						.balance(Double.parseDouble(String.format("%.2f", (Math.random() * 5463))))
						.currency("MAD")
						.accountType(AccountType.SAVING_ACCOUNT)
						.openingDate(LocalDate.now())
						.customer_id(customer.getId())
						.build();
				AccountDTO accountDTO1 = accountMapper.fromAccount(account1);
				accountService.createAccount(accountDTO1);
			});
//			Account account = Account.builder()
//					.accountId(UUID.randomUUID().toString())
//					.balance(Math.random() * 5463)
//					.currency("MAD")
//					.accountType(AccountType.CURRENT_ACCOUNT)
//					.openingDate(LocalDate.now())
//					.customer_id(1L)
//					.build();
//			AccountDTO accountDTO = accountMapper.fromAccount(account);
//			accountService.createAccount(accountDTO);
		};
	}

}
