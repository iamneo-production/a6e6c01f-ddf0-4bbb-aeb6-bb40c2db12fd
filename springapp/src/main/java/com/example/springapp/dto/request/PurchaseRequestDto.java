package com.example.springapp.dto.request;

import java.util.List;

public class PurchaseRequestDto {
    private List<Integer> cartIds;

    private String paymentMethod;

    public List<Integer> getCartIds() {
        return cartIds;
    }

    public void setCartIds(List<Integer> cartIds) {
        this.cartIds = cartIds;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
