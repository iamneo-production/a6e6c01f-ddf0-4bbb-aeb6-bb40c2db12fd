package com.example.springapp.controller;

import com.example.springapp.BaseResponseDTO;
import com.example.springapp.config.jwt.JwtTokenProvider;
import com.example.springapp.dto.request.ProductRequestDto;
import com.example.springapp.model.User;
import com.example.springapp.config.user.UserRepository;
import com.example.springapp.model.Product;
import com.example.springapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.Optional;


@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    UserRepository userRepository;
    @GetMapping(value = "/api/products")
    @CrossOrigin(origins = "http://localhost:8081/")
    public List<Product> getProducts(@RequestParam(value = "category", required = false) String cat){

        return productService.getProducts(cat);
    }

    @GetMapping(value = "/api/products/{productId}")
    @CrossOrigin(origins = "http://localhost:8081/")
    public Optional<Product> getProductById(@PathVariable("productId") Integer productId){
        return productService.getProductById(productId); }

    @GetMapping(value = "/api/products/{sellerId}")
    public List<Product> getProductBySellerId(@PathVariable("sellerId") Integer sellerId){
        return productService.getProductBySellerId(sellerId); }

    @PostMapping(value = "/api/seller/products")
    public ResponseEntity<BaseResponseDTO> createProduct(@RequestHeader(value = "Authorization") String token , @ModelAttribute ProductRequestDto productRequestDto) throws IOException {
        try{
            User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(tokenProvider.getTokenFromHeader(token))).orElseThrow();
            return ResponseEntity.ok(new BaseResponseDTO("success",productService.createProduct(productRequestDto,user)));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponseDTO("failed"));
        }
    }

    @PutMapping(value = "/api/seller/products")
    @CrossOrigin(origins = "http://localhost:8081/")
    public Product updateProduct(@RequestBody Product incomingProduct){
        return productService.updateProduct(incomingProduct); }

    @DeleteMapping(value = "/api/seller/products/{productId}")
    public String deleteProductById(@PathVariable Integer productId){
        return productService.deleteProductById(productId); }



    //Test Case
    @GetMapping("/product")
    public ResponseEntity<List<Product>> getAllProduct(){
        List<Product> products = new ArrayList<>();
        return ResponseEntity.ok(products);
    }

    //Test Case
    @GetMapping("/product/{id}")
    public ResponseEntity<List<Product>> getAccountById(@PathVariable Integer id){
        List<Product> products = new ArrayList<>();
        return ResponseEntity.ok(products);
    }


    //Search API
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String query) {
        return productService.searchProducts(query);
    }

}
