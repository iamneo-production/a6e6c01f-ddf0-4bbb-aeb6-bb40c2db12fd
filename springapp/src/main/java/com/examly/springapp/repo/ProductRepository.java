package com.examly.springapp.repo;

import com.examly.springapp.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {

    List<Product> findAllByCategory(String cat);

    List<Product> findAllBySeller(Integer sellerId);
}