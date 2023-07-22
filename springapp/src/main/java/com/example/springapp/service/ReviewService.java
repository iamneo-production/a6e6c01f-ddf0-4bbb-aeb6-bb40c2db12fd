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
        Review newReview = new Review();
        newReview.setProductId(purchase.getProductId().getId().longValue());
        newReview.setSellerId(purchase.getProductId().getSeller().getId());
        newReview.setBuyerId(purchase.getBuyer().getId());
        newReview.setRating(review.getRating());
        newReview.setComment(review.getComment());
        newReview.setPurchaseId((long) purchase.getId());
        reviewRepository.save(newReview);
        purchase.setReviewed(true);
        purchaseRepository.save(purchase);
    }

    public Review getReviewByPurchaseId(Long purchaseId) {
        List<Review> reviewList = reviewRepository.findByPurchaseId(purchaseId);
        if (reviewList.isEmpty()) {
            throw new ReviewNotFoundException("Review not found");
        }
        return reviewList.get(0);
    }

    public void updateReview(Long purchaseId, Review review) {
        Optional<Review> existingReviewOptional = reviewRepository.findByPurchaseId(purchaseId).stream().findFirst();
        if (existingReviewOptional.isEmpty()) {
            throw new ReviewNotFoundException("Review not found");
        }

        Review existingReview = existingReviewOptional.get();
        existingReview.setRating(review.getRating());
        existingReview.setComment(review.getComment());

        reviewRepository.save(existingReview);
    }

    public List<Review> getReviewByProductId(Long productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return reviews;
    }

    public List<Review> getReviewBySellerId(Long sellerId) {
        List<Review> reviews = reviewRepository.findBySellerId(sellerId);
        return reviews;
    }

    public List<Review> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return reviews;
    }

}
