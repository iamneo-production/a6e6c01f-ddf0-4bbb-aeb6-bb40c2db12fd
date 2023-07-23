package com.example.springapp.controller;

import com.example.springapp.BaseResponseDTO;
import com.example.springapp.config.jwt.JwtTokenProvider;
import com.example.springapp.dto.request.ProductRequestDto;
import com.example.springapp.dto.response.SellerDashboardResponse;
import com.example.springapp.model.Purchase;
import com.example.springapp.model.QA;
import com.example.springapp.model.User;
import com.example.springapp.config.user.UserRepository;
import com.example.springapp.model.Product;
import com.example.springapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.example.springapp.service.UserService;

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
    public  ResponseEntity<BaseResponseDTO> getProducts(){
        try {
            return ResponseEntity.ok(new BaseResponseDTO("success", productService.getAllProducts()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }

    @GetMapping(value = "/api/products/product-detail")
    @CrossOrigin(origins = "http://localhost:8081/")
    public ResponseEntity<BaseResponseDTO> getProductById(@RequestParam String productId) {
        try {
            return ResponseEntity.ok(new BaseResponseDTO("success", productService.getProductById(Integer.parseInt(productId))));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }

    @GetMapping(value = "/api/products/category")
    public ResponseEntity<BaseResponseDTO> getProductByCategory(@RequestParam String category){
        try{
            List<Product> products = productService.getProductByCategory(category);
            return ResponseEntity.ok(new BaseResponseDTO("success", products));
        }catch(Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }

    @GetMapping(value = "/api/products/seller")
    public ResponseEntity<BaseResponseDTO> getProductBySellerId(@RequestHeader(value = "Authorization", defaultValue = "") String token){
        try{
            User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(tokenProvider.getTokenFromHeader(token))).orElseThrow();
            List<Product> sellerProductList = productService.getProductBySeller(user);
            return ResponseEntity.ok(new BaseResponseDTO("success",sellerProductList));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
        //return productService.getProductBySellerId(sellerId);
    }
    @GetMapping(value = "/api/auth/selleridd/{id}")
    public ResponseEntity<BaseResponseDTO> getProductBySellerIdd(@PathVariable("id") Integer id){
        try{
            User user = userRepository.findByUseridd(id);
            List<Product> sellerProductList = productService.getProductBySeller(user);
            return ResponseEntity.ok(new BaseResponseDTO("success",sellerProductList));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
        //return productService.getProductBySellerId(sellerId);
    } 

    @PostMapping(value = "/api/seller/products")
    @CrossOrigin(origins = "http://localhost:8081/")
    public ResponseEntity<BaseResponseDTO> createProduct(@RequestHeader(value = "Authorization") String token , @ModelAttribute ProductRequestDto productRequestDto) throws IOException {
        try{
            User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(tokenProvider.getTokenFromHeader(token))).orElseThrow();
            return ResponseEntity.ok(new BaseResponseDTO("success",productService.createProduct(productRequestDto,user)));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponseDTO("failed"));
        }
    }

    @DeleteMapping(value = "/api/seller/product-delete")
    public ResponseEntity<BaseResponseDTO> deleteProductById(@RequestParam String productId){
        try{
            productService.deleteProductById(Integer.parseInt(productId));
            return ResponseEntity.ok(new BaseResponseDTO("success"));
        }catch(Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }

    @GetMapping("/api/seller/dashboard")
    public ResponseEntity<BaseResponseDTO> getProductDashboard(@RequestHeader(value = "Authorization", defaultValue = "") String token) {
        User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(tokenProvider.getTokenFromHeader(token))).orElseThrow();
        Map<String, Object> data = productService.getProductDashboard(user.getId());
        return ResponseEntity.ok(new BaseResponseDTO("success",data));
    }

    @GetMapping("/api/product/reviews")
    public ResponseEntity<BaseResponseDTO> getProductReviews(@RequestParam String productId) {
        List<Map<String, Object>> data = productService.getProductReviews(Integer.parseInt(productId));
        return ResponseEntity.ok(new BaseResponseDTO("success",data));
    }

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
    @GetMapping("/api/search")
    public ResponseEntity<BaseResponseDTO> searchProducts(@RequestParam String query) {
        return ResponseEntity.ok(new BaseResponseDTO("success",productService.searchProducts(query)));
    }

    @PutMapping(value = "/api/seller/products/{productId}")
    @CrossOrigin(origins = "http://localhost:8081/")
    public ResponseEntity<BaseResponseDTO> updateProduct(@PathVariable("productId") Integer productId,
                                                         @ModelAttribute ProductRequestDto productRequestDto) throws IOException {
        try {
            Product updatedProduct = productService.updatingProduct(productId,productRequestDto);
            return ResponseEntity.ok(new BaseResponseDTO("success", updatedProduct));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponseDTO("failed"));
        }
    }

    @PutMapping(value = "/api/seller/product/update-image/{productId}")
    @CrossOrigin(origins = "http://localhost:8081/")
    public ResponseEntity<BaseResponseDTO> updateProductImage(@PathVariable("productId") Integer productId,
                                                         @ModelAttribute ProductRequestDto productRequestDto) throws IOException {
        try {
            Product updatedProduct = productService.updateProductImage(productId,productRequestDto);
            return ResponseEntity.ok(new BaseResponseDTO("success", updatedProduct));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponseDTO("failed"));
        }
    }

}
