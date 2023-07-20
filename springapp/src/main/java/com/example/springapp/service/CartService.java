package com.example.springapp.service;


import com.example.springapp.model.Cart;
import com.example.springapp.model.Product;
import com.example.springapp.model.User;
import com.example.springapp.repo.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;

    public void addCartProduct(User user, Product product, int quantity) {
        Cart cart = new Cart(user,product,quantity);
        cartRepository.save(cart);
    }

    public List<Cart> getCartProducts(User user) {
        return cartRepository.findByBuyerAndIsDeletedFalse(user);
    }

    public void deleteCartProduct(Integer cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow();
        cartRepository.delete(cart);
    }

    public boolean hasUser(User user, Integer cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow();
        return Objects.equals(cart.getBuyer().getId(), user.getId());
    }

    public void updateCartProduct(Integer cartId, Integer quantity) {
        Cart cart = cartRepository.findById(cartId).orElseThrow();
        cart.setQuantity(quantity);
        cartRepository.save(cart);
    }
}
