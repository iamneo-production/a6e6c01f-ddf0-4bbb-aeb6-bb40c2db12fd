package com.example.springapp.service;

import com.example.springapp.exception.PurchaseNotFoundException;
import com.example.springapp.model.*;
import com.example.springapp.repo.CartRepository;
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

    private final CartRepository cartRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository, ProductRepository productRepository,
            ReviewRepository reviewRepository,CartRepository cartRepository) {
        this.purchaseRepository = purchaseRepository;
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.cartRepository = cartRepository;
    }

    public List<Purchase> makePurchase(List<Integer> cartIds, String paymentMethod) {
        List<Purchase> purchases = new ArrayList<>();
        for (Integer cartId: cartIds
             ) {
            Cart cart = cartRepository.findById(cartId).orElseThrow();
            Purchase purchase = new Purchase();
            purchase.setPurchaseDate(new Date());
            purchase.setProductId(cart.getProduct());
            purchase.setQuantity(cart.getQuantity());
            purchase.setPaymentMethod(paymentMethod);
            purchase.setBuyer(cart.getBuyer());
            purchases.add(purchase);
            Product product = cart.getProduct();
            product.setQuantity(product.getQuantity()- purchase.getQuantity());
            cartRepository.delete(cart);
            productRepository.save(product);
        }
        return purchaseRepository.saveAll(purchases);
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
            int productId = 1;
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
                List<Review> reviews = reviewRepository.findByPurchaseId((long)purchase.getId());
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

    public List<Purchase> getPurchaseByBuyer(User user) {
        return purchaseRepository.findAllByBuyer(user);
    }

    public List<Purchase> getPurchaseByProduct(String productId) {
        Product product = productRepository.findById(Integer.parseInt(productId)).orElseThrow();
        return purchaseRepository.findAllByProduct(product);
    }


    
}
