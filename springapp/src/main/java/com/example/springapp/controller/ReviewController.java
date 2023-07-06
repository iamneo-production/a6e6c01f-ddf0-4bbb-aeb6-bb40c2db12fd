package com.example.springapp.controller;

import com.example.springapp.model.Review;
import com.example.springapp.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;
import com.example.springapp.model.Product;

@RestController
public class ReviewController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Test Case
    @GetMapping("/review/product/{productId}")
    public ResponseEntity<List<Review>> getReviewByProductId(@PathVariable int productId) {
        List<Review> reviews = reviewService.getReviewByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    // Test Case
    @GetMapping("/review/seller/{sellerId}")
    public ResponseEntity<List<Review>> getReviewBySellerId(@PathVariable int sellerId) {
        List<Review> reviews = reviewService.getReviewBySellerId(sellerId);
        return ResponseEntity.ok(reviews);
    }

    // Test Case
    @GetMapping("/review")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/review/{purchaseId}")
    public ResponseEntity<String> postReview(@PathVariable int purchaseId, @RequestBody Review review) {
        reviewService.postReview(purchaseId, review);
        return ResponseEntity.status(HttpStatus.CREATED).body("Review posted successfully");
    }

    @GetMapping("/review/purchase/{purchaseId}")
    public ResponseEntity<Review> getReviewByPurchaseId(@PathVariable int purchaseId) {
        Review review = reviewService.getReviewByPurchaseId(purchaseId);
        return ResponseEntity.ok(review);
    }

    @PutMapping("/review/{purchaseId}")
    public ResponseEntity<String> updateReview(@PathVariable int purchaseId, @RequestBody Review review) {
        reviewService.updateReview(purchaseId, review);
        return ResponseEntity.ok("Review updated successfully");
    }
}
