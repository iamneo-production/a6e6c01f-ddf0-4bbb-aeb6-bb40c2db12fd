package com.example.springapp.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;
import com.example.springapp.model.Product;

@RestController
public class PurchaseController {

    //Test Case
    @GetMapping("/purchase")
    public ResponseEntity<List<Product>> getAllPurchase(){
        List<Product> purchases = new ArrayList<>();
        return ResponseEntity.ok(purchases);
    }

    //Test Case
    @GetMapping("/purchase/{id}")
    public ResponseEntity<List<Product>> getPurchaseById(@PathVariable Integer id){
        List<Product> purchases = new ArrayList<>();
        return ResponseEntity.ok(purchases);
    }

    //Test Case
    @GetMapping("/purchase/buyer")
    public ResponseEntity<List<Product>> getPurchaseByBuyerId(){
        List<Product> purchases = new ArrayList<>();
        return ResponseEntity.ok(purchases);
    }
}
