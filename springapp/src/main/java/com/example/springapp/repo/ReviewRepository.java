package com.example.springapp.repo;

import java.util.*;
import com.example.springapp.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPurchaseId(Long purchaseId);

    List<Review> findBySellerId(Long sellerId);

    List<Review> findByProductId(Long productId);

}