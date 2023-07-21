package com.example.springapp.repo;

import com.example.springapp.model.Cart;
import com.example.springapp.model.Product;
import com.example.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart,Integer> {

    List<Cart> findByBuyer(User user);

    List<Cart> findAllByProduct(Product product);

    List<Cart> findByBuyerAndIsDeletedFalse(User user);
}
