package com.example.springapp.model;

import com.example.springapp.model.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product; // Foreign key for Product

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    private int quantity;

    private Date purchaseDate;

    private String paymentMethod;

    private  boolean isReviewed;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean isDeleted;

    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private  Date updatedAt;

    // Constructors

    public Purchase() {
    }

    public Purchase(Product product, User buyer, Date purchaseDate, String paymentMethod) {
        this.product = product;
        this.buyer = buyer;
        this.purchaseDate = purchaseDate;
        this.paymentMethod=paymentMethod;
    }

    // Getters and setters


    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Product getProductId() {
        return product;
    }

    public void setProductId(Product product) {
        this.product = product;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

    public Date getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public boolean isReviewed() {
        return isReviewed;
    }

    public void setReviewed(boolean reviewed) {
        isReviewed = reviewed;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
