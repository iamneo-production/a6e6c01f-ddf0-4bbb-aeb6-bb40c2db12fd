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

        Integer productId = incomingProduct.getId(); // Assuming there's an 'id' field in the Product class
        Product existingProduct = productRepository.findById(productId).orElseThrow();

        existingProduct.setName(incomingProduct.getName());
        existingProduct.setDescription(incomingProduct.getDescription());
        existingProduct.setPrice(incomingProduct.getPrice());
        existingProduct.setQuantity(incomingProduct.getQuantity());
        existingProduct.setBrand(incomingProduct.getBrand());
        existingProduct.setColour(incomingProduct.getColour());
        existingProduct.setCategory(incomingProduct.getCategory());

        return productRepository.save(existingProduct);
    }

    public Product updateProductImage(int productId,ProductRequestDto productRequestDto) throws IOException {
        Product existingProduct = productRepository.findById(productId).orElseThrow();
        existingProduct.setImage(productRequestDto.getImage());
        return productRepository.save(existingProduct);
    }

    // Delete Product by Id
    public void deleteProductById(Integer productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        product.setDeleted(true);
        productRepository.save(product);
    }

    public List<Product> getProductBySeller(User user) {
        return productRepository.findAllBySellerAndIsDeletedFalse(user);
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAllByIsDeletedFalse();
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

    public List<Map<String, Object>> getProductReviews(int productId) {
        return convertProductReviews(productRepository.getProductReviews(productId));
    }

    public List<Map<String, Object>> convertProductReviews(List<Object[]> queryResult) {
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] o: queryResult
        ) {
            Map<String, Object> temp = new LinkedHashMap<>();
            temp.put("customer_name", o[0]);
            temp.put("comment", o[1]);
            temp.put("rating", o[2]);
            temp.put("updated_at", o[3]);
            result.add(temp);
        }
        return result;
    }
}