package com.example.springapp.repo;

import java.util.*;
import com.example.springapp.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPurchaseId(int purchaseId);

    List<Review> findBySellerId(int sellerId);

    List<Review> findByProductId(int productId);

}