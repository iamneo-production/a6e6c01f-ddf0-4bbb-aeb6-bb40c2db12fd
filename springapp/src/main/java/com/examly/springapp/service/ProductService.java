package com.examly.springapp.service;


import com.examly.springapp.entity.Product;
import com.examly.springapp.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Get
    public List<Product> getProducts(String cat){

        List<Product> productList = new ArrayList<>();

        if (cat == null){
            productRepository.findAll().forEach(product -> productList.add(product));

        }
        else{
            return productRepository.findAllByCategory(cat);
        }


        return productList;
    }


    // Create
    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    // Get Product by Id
    public Optional<Product> getProductById(Integer productId){
        return productRepository.findById(productId);
    }

    // Update Product
    public Product updateProduct(Product incomingProduct) {
        return productRepository.save(incomingProduct);
    }

    // Delete Product by Id
    public String deleteProductById(Integer productId) {
        productRepository.deleteById(productId);

        return "Deleted Successfully";
    }
}