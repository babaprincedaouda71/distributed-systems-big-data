package bf.baba.accountservice.mapper;

import bf.baba.accountservice.dto.AccountDTO;
import bf.baba.accountservice.entity.Account;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class AccountMapper {
    private final ModelMapper modelMapper = new ModelMapper();

    public AccountDTO fromAccount(Account account){
        return modelMapper.map(account, AccountDTO.class);
    }

    public Account fromAccountDTTO(AccountDTO accountDTO){
        return modelMapper.map(accountDTO, Account.class);
    }
}
