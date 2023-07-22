package com.example.springapp.controller;

import com.example.springapp.BaseResponseDTO;
import com.example.springapp.config.jwt.JwtTokenProvider;
import com.example.springapp.config.user.UserRepository;
import com.example.springapp.dto.request.CartRequestDto;
import com.example.springapp.model.Cart;
import com.example.springapp.model.Product;
import com.example.springapp.model.User;
import com.example.springapp.service.CartService;
import com.example.springapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartController {
    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CartService cartService;

    @Autowired
    ProductService productService;

    @PostMapping("/api/cart")
    public ResponseEntity<BaseResponseDTO> addCartProduct(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestBody CartRequestDto cartRequestDto){
        try{
            User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(tokenProvider.getTokenFromHeader(token))).orElseThrow();
            Product product = productService.getProductById(cartRequestDto.getProductId());
            cartService.addCartProduct(user,product,cartRequestDto.getQuantity());
            return ResponseEntity.ok(new BaseResponseDTO("success"));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }

    @GetMapping("/api/cart")
    public ResponseEntity<BaseResponseDTO> getCartProducts(@RequestHeader(value = "Authorization", defaultValue = "") String token){
        try{
            User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(tokenProvider.getTokenFromHeader(token))).orElseThrow();
            List<Cart> cartList = cartService.getCartProducts(user);
            return ResponseEntity.ok(new BaseResponseDTO("success",cartList));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }

    @DeleteMapping("/api/cart")
    public ResponseEntity<BaseResponseDTO> deleteCartProduct(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestParam String cartId){
        try{
            User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(tokenProvider.getTokenFromHeader(token))).orElseThrow();
            if(cartService.hasUser(user,Integer.valueOf(cartId))){
                cartService.deleteCartProduct(Integer.valueOf(cartId));
                return ResponseEntity.ok(new BaseResponseDTO("success"));
            }else {
                return ResponseEntity.ok(new BaseResponseDTO("something went wrong"));
            }
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }

    @PutMapping("/api/cart")
    public ResponseEntity<BaseResponseDTO> updateCartProduct(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestParam String cartId,@RequestParam String quantity){
        try{
            User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(tokenProvider.getTokenFromHeader(token))).orElseThrow();
            if(cartService.hasUser(user,Integer.valueOf(cartId))){
                cartService.updateCartProduct(Integer.valueOf(cartId),Integer.valueOf(quantity));
                return ResponseEntity.ok(new BaseResponseDTO("success"));
            }else {
                return ResponseEntity.ok(new BaseResponseDTO("something went wrong"));
            }
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }
}
