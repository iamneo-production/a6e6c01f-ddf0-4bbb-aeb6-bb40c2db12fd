package com.example.springapp.controller;

import com.example.springapp.config.jwt.JwtTokenProvider;
import com.example.springapp.model.User;
import com.example.springapp.config.user.UserRepository;
import com.example.springapp.service.ProductService;
import com.example.springapp.model.Product;
import com.example.springapp.model.Purchase;
import com.example.springapp.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;
import com.example.springapp.model.Product;

@RestController
public class PurchaseController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    private final PurchaseService purchaseService;
    @Autowired
    private ProductService productService;

    @Autowired
    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    // Test Case
    @GetMapping("/purchase")
    public ResponseEntity<List<Purchase>> getAllPurchase() {
        List<Purchase> purchases = purchaseService.getAllPurchases();
        return ResponseEntity.ok(purchases);
    }

    // Test Case
    @GetMapping("/purchase/{id}")
    public ResponseEntity<Purchase> getPurchaseById(@PathVariable int id) {
        Purchase purchase = purchaseService.getPurchaseById(id);
        return ResponseEntity.ok(purchase);
    }

    // Test Case
    @GetMapping("/purchase/buyer/{buyerId}")
    public ResponseEntity<List<Map<String, Object>>> getPurchaseByBuyerId(@PathVariable int buyerId) {
        List<Map<String, Object>> result = purchaseService.getPurchaseByBuyerId(buyerId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/purchase")
    public ResponseEntity<Purchase> makePurchase(@RequestHeader(value = "Authorization") String token,
            @RequestBody Purchase purchase) {
        User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(token)).orElseThrow();
        purchaseService.makePurchase(purchase, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(purchase);
    }

}
