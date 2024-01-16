package bf.baba.customerservice.repository;

import bf.baba.customerservice.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query("select c from Customer c where LOWER(c.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(c.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Customer> findByFirstNameContainsOrLastNameContains(String keyword);
}
