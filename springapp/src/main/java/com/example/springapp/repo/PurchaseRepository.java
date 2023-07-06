package com.example.springapp.repo;

import com.example.springapp.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> getPurchaseDetailsByBuyerId(int buyerId);

    List<Purchase> findByBuyerId(long buyerId);

    List<Purchase> findById(long id);

    Optional<Purchase> findById(int id);

}
