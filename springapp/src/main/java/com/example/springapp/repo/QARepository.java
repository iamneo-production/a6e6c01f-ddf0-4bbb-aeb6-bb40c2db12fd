package com.example.springapp.repo;

import com.example.springapp.model.Product;
import com.example.springapp.model.QA;
import com.example.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QARepository extends JpaRepository<QA,Integer>{
        List<QA> findByBuyer(User user);

    List<QA> findAllByProduct(Product product);

    @Query(value = "SELECT qa.id, qa.question, qa.answer, qa.status, qa.buyer_id, qa.product_id,qa.created_at,qa.is_deleted,qa.updated_at " +
            "FROM qa " +
            "JOIN product ON product.id = qa.product_id " +
            "WHERE product.seller_id = ?1" , nativeQuery = true)
    List<QA> findAllBySellerId(int sellerId);
}
