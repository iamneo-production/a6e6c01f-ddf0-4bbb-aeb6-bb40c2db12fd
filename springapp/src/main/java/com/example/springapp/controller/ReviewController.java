package com.example.springapp.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;
import com.example.springapp.model.Product;


@RestController
public class ReviewController {
    //Test Case
    @GetMapping("/review/product")
    public ResponseEntity<List<Product>> getReviewByProductId(){
        List<Product> purchases = new ArrayList<>();
        return ResponseEntity.ok(purchases);
    }

    //Test Case
    @GetMapping("/review/seller")
    public ResponseEntity<List<Product>> getReviewBySellerId(){
        List<Product> purchases = new ArrayList<>();
        return ResponseEntity.ok(purchases);
    }

    //Test Case
    @GetMapping("/review")
    public ResponseEntity<List<Product>> getReviewAll(){
        List<Product> purchases = new ArrayList<>();
        return ResponseEntity.ok(purchases);
    }
}
