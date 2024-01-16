package bf.baba.accountservice.service;

import bf.baba.accountservice.dto.AccountDTO;

import java.util.List;

public interface AccountService {
    AccountDTO createAccount(AccountDTO accountDTO);
    List<AccountDTO> getAll();
    AccountDTO findById(String accountId);
    void deleteAccount(String accountId);
    void deleteAccountsByCustomerId(long customerId);
}
