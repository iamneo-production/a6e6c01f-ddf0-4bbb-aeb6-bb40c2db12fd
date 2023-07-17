package com.example.springapp.service;

import com.example.springapp.exception.ReviewNotFoundException;
import com.example.springapp.model.Product;
import com.example.springapp.model.Purchase;
import com.example.springapp.model.Review;
import com.example.springapp.repo.ProductRepository;
import com.example.springapp.repo.PurchaseRepository;
import com.example.springapp.repo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final PurchaseRepository purchaseRepository;
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(
            PurchaseRepository purchaseRepository,
            ProductRepository productRepository,
            ReviewRepository reviewRepository) {
        this.purchaseRepository = purchaseRepository;
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }

    public void postReview(int id, Review review) {
        Optional<Purchase> purchaseOptional = purchaseRepository.findById(id);
        Purchase purchase = purchaseOptional.orElseThrow(() -> new ReviewNotFoundException("Purchase not found"));

        int productId = 1;
        Optional<Product> productOptional = productRepository.findById(productId);
        Product product = productOptional.orElseThrow(() -> new ReviewNotFoundException("Product not found"));

        Review newReview = new Review();
        newReview.setProductId(productId);
        newReview.setSellerId(Math.toIntExact(product.getSeller().getId()));
        newReview.setBuyerId(purchase.getBuyer().getId());
        newReview.setRating(review.getRating());
        newReview.setComment(review.getComment());
        newReview.setPurchaseId(id);

        reviewRepository.save(newReview);
    }

    public Review getReviewByPurchaseId(int purchaseId) {
        List<Review> reviewList = reviewRepository.findByPurchaseId(purchaseId);
        if (reviewList.isEmpty()) {
            throw new ReviewNotFoundException("Review not found");
        }
        return reviewList.get(0);
    }

    public void updateReview(int purchaseId, Review review) {
        Optional<Review> existingReviewOptional = reviewRepository.findByPurchaseId(purchaseId).stream().findFirst();
        if (existingReviewOptional.isEmpty()) {
            throw new ReviewNotFoundException("Review not found");
        }

        Review existingReview = existingReviewOptional.get();
        existingReview.setRating(review.getRating());
        existingReview.setComment(review.getComment());

        reviewRepository.save(existingReview);
    }

    public List<Review> getReviewByProductId(int productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        if (reviews.isEmpty()) {
            throw new ReviewNotFoundException("No reviews found for the product");
        }
        return reviews;
    }

    public List<Review> getReviewBySellerId(int sellerId) {
        List<Review> reviews = reviewRepository.findBySellerId(sellerId);
        if (reviews.isEmpty()) {
            throw new ReviewNotFoundException("No reviews found for the seller");
        }
        return reviews;
    }

    public List<Review> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        if (reviews.isEmpty()) {
            throw new ReviewNotFoundException("No reviews found");
        }
        return reviews;
    }

}
