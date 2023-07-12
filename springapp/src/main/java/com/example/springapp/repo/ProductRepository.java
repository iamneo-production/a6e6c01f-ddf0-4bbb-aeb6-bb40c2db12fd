package com.example.springapp.repo;

import com.example.springapp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findAllByCategory(String cat);

    List<Product> findAllBySeller(Integer sellerId);

    List<Product> findByNameContainingIgnoreCase(String name);
}