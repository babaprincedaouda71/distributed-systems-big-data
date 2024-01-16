package bf.baba.accountservice.repository;

import bf.baba.accountservice.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface AccountRepository extends JpaRepository<Account, String> {
    @Modifying
    @Query("delete from Account a where a.customer_id = :customerId")
    void deleteAccountsByCustomerId(Long customerId);
}
