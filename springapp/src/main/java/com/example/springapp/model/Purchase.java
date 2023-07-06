package com.example.springapp.model;

import com.example.springapp.model.User;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int productId; // Foreign key for Product

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    private Date purchaseDate;

    // Constructors

    public Purchase() {
    }

    public Purchase(int productId, User buyerId, Date purchaseDate) {
        this.productId = productId;
        this.buyer = buyerId;
        this.purchaseDate = purchaseDate;
    }

    // Getters and setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
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
}
