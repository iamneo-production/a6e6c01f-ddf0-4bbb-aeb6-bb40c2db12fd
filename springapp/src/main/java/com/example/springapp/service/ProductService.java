package com.example.springapp.service;


import com.example.springapp.config.user.UserRepository;
import com.example.springapp.dto.request.ProductRequestDto;
import com.example.springapp.dto.response.SellerDashboardResponse;
import com.example.springapp.model.User;
import com.example.springapp.model.Product;
import com.example.springapp.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

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
    public Product createProduct(ProductRequestDto productRequestDto, User seller) throws IOException {
        Product product = new Product(
                productRequestDto.getName(),
                productRequestDto.getDescription(),
                productRequestDto.getPrice(),
                productRequestDto.getQuantity(),
                productRequestDto.getBrand(),
                productRequestDto.getColour(),
                productRequestDto.getImage().getBytes(),
                seller,
                productRequestDto.getCategory()

        );
        return productRepository.save(product);
    }

    // Get Product by Id
    public Product getProductById(Integer productId){
        return productRepository.findById(productId).orElseThrow();
    }

    // Update Product
    public Product updateProduct(Product incomingProduct) {
        return productRepository.save(incomingProduct);
    }

    // Delete Product by Id
    public void deleteProductById(Integer productId) {
        System.out.println(".....");
        System.out.println(productId);
        productRepository.deleteById(productId);
    }

    public List<Product> getProductBySeller(User user) {
        return productRepository.findAllBySeller(user);
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductByCategory(String category) {
        return productRepository.findAllByCategory(category);
    }

    
    public Map<String, Object> getProductDashboard(Long id) {
        List<Object[]> queryResult = productRepository.getSellerDashboard(id);
        Map<String, Object> response = mapToSellerDashboardResponse(queryResult);
        return response;
    }

    public Map<String, Object> mapToSellerDashboardResponse(List<Object[]> queryResult) {
        Object[] row = queryResult.get(0); // Assuming there is only one row in the result
        Map<String, Object> result = new LinkedHashMap<>();

        result.put("total_revenue", row[0]);
        result.put("total_no_products", row[1]);
        result.put("sold_products", row[2]);
        result.put("unsold_products", row[3]);
        result.put("out_of_stock_products", row[4]);
        result.put("total_customers", row[5]);

        return result;
    }
}