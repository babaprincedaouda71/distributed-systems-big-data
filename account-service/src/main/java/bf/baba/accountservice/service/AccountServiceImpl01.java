package bf.baba.accountservice.service;

import bf.baba.accountservice.dto.AccountDTO;
import bf.baba.accountservice.entity.Account;
import bf.baba.accountservice.entity.TransferData;
import bf.baba.accountservice.mapper.AccountMapper;
import bf.baba.accountservice.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class AccountServiceImpl01 implements AccountService {
    private AccountRepository accountRepository;
    private AccountMapper accountMapper;
    @Override
    public AccountDTO createAccount(AccountDTO accountDTO) {
        Account account = accountMapper.fromAccountDTTO(accountDTO);
        account.setAccountId(UUID.randomUUID().toString());
        account.setCustomer_id(accountDTO.getCustomer_id());
        account.setOpeningDate(LocalDate.now());
        Account savedAccount = accountRepository.save(account);
        return accountMapper.fromAccount(savedAccount);
    }

    @Override
    public List<AccountDTO> getAll() {
        List<Account> all = accountRepository.findAll();
        List<AccountDTO> accountDTOList = new ArrayList<>();
        all.forEach(account -> {
            AccountDTO accountDTO = accountMapper.fromAccount(account);
            accountDTOList.add(accountDTO);
        });
        return accountDTOList;
    }

    @Override
    public AccountDTO findById(String accountId) {
        Account account = accountRepository.findById(accountId).get();
        return accountMapper.fromAccount(account);
    }

    @Override
    public void deleteAccount(String accountId) {
        Account account = accountRepository.findById(accountId).get();
        accountRepository.delete(account);
    }

    @Override
    public void deleteAccountsByCustomerId(long customerId) {
        accountRepository.deleteAccountsByCustomerId(customerId);
    }

    @Override
    public boolean transfer(TransferData transferData) {
        AccountDTO fromAccount = findById(transferData.getFromAccount());
        AccountDTO toAccount = findById(transferData.getToAccount());
        if (fromAccount.getBalance() >= transferData.getAmount()){
            fromAccount.setBalance(fromAccount.getBalance() - transferData.getAmount());
            toAccount.setBalance(toAccount.getBalance() + transferData.getAmount());
            accountRepository.save(accountMapper.fromAccountDTTO(toAccount));
            accountRepository.save(accountMapper.fromAccountDTTO(fromAccount));
        }
        return true;
    }

    @Override
    public boolean withdraw(AccountDTO accountDTO, double amount) {
        AccountDTO account = findById(accountDTO.getId());
        account.setBalance(account.getBalance() - amount);
        return true;
    }
}
