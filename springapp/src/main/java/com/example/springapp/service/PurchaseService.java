package com.example.springapp.service;

import com.example.springapp.exception.PurchaseNotFoundException;
import com.example.springapp.model.User;
import com.example.springapp.model.Product;
import com.example.springapp.model.Purchase;
import com.example.springapp.model.Review;
import com.example.springapp.repo.PurchaseRepository;
import com.example.springapp.repo.ReviewRepository;
import com.example.springapp.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository, ProductRepository productRepository,
            ReviewRepository reviewRepository) {
        this.purchaseRepository = purchaseRepository;
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }

    public void makePurchase(Purchase purchase, User user) {
        purchase.setBuyer(user); // Update this line
        purchase.setPurchaseDate(new Date());
        purchaseRepository.save(purchase);
    }

    public Purchase getPurchaseById(int id) {
        Optional<Purchase> optionalPurchase = purchaseRepository.findAll().stream()
                .filter(purchase -> purchase.getId() == id)
                .findFirst();

        return optionalPurchase.orElseThrow(() -> new PurchaseNotFoundException("Purchase not found"));
    }

    public List<Map<String, Object>> getPurchaseByBuyerId(int buyerId) {
        List<Purchase> purchases = purchaseRepository.findByBuyerId(buyerId);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Purchase purchase : purchases) {
            int productId = purchase.getProductId();
            Optional<Product> productOptional = productRepository.findById(productId);
            Product product = productOptional.orElse(null);

            if (product != null) {
                Map<String, Object> purchaseMap = new HashMap<>();
                purchaseMap.put("purchaseId", purchase.getId());
                purchaseMap.put("productName", product.getName());
                //purchaseMap.put("productImageUrl", product.getImageUrl());
                purchaseMap.put("productPrice", product.getPrice());
                purchaseMap.put("purchaseDate", purchase.getPurchaseDate());

                // Retrieve review details
                List<Review> reviews = reviewRepository.findByPurchaseId(purchase.getId());
                if (!reviews.isEmpty()) {
                    Review review = reviews.get(0); // Assuming the list contains only one review per purchaseId
                    purchaseMap.put("comment", review.getComment());
                    purchaseMap.put("rating", review.getRating());
                } else {
                    purchaseMap.put("comment", null);
                    purchaseMap.put("rating", null);
                }

                result.add(purchaseMap);
            }
        }

        return result;
    }

    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

}
