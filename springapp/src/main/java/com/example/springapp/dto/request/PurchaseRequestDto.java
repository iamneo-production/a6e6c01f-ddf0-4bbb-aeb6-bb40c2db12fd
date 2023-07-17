package com.example.springapp.dto.request;

import java.util.List;

public class PurchaseRequestDto {
    private List<Integer> cartIds;

    public List<Integer> getCartIds() {
        return cartIds;
    }

    public void setCartIds(List<Integer> cartIds) {
        this.cartIds = cartIds;
    }
}
