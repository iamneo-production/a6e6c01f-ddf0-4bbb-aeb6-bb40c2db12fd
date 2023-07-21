package com.example.springapp.controller;

import com.example.springapp.BaseResponseDTO;
import com.example.springapp.config.jwt.JwtTokenProvider;
import com.example.springapp.config.user.UserRepository;
import com.example.springapp.dto.request.QARequestDto;
import com.example.springapp.model.Cart;
import com.example.springapp.model.Product;
import com.example.springapp.model.QA;
import com.example.springapp.model.User;
import com.example.springapp.service.ProductService;
import com.example.springapp.service.QAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class QAController {

    @Autowired
    JwtTokenProvider tokenProvider;
    @Autowired
    UserRepository userRepository;

    @Autowired
    QAService qaService;

    @Autowired
    ProductService productService;

    @PostMapping("/api/qa")
    public ResponseEntity<BaseResponseDTO> addQA(@RequestHeader(value = "Authorization", defaultValue = "") String token, @RequestBody QARequestDto qaRequestDto){
        try{
            User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(tokenProvider.getTokenFromHeader(token))).orElseThrow();
            Product product = productService.getProductById(qaRequestDto.getProductId());
            qaService.addquestion(user,product,qaRequestDto.getQuestion());
            return ResponseEntity.ok(new BaseResponseDTO("success"));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }

    @PutMapping("/api/qa")
    public ResponseEntity<BaseResponseDTO> updateQA(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestParam String qaId,@RequestParam String answer){
        try{
            User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(tokenProvider.getTokenFromHeader(token))).orElseThrow();
            qaService.updateqa(Integer.valueOf(qaId),answer);
            return ResponseEntity.ok(new BaseResponseDTO("success"));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }

    @GetMapping("/api/qa")
    public ResponseEntity<BaseResponseDTO> getQA(@RequestHeader(value = "Authorization", defaultValue = "") String token){
        try{
            User user = userRepository.findByEmail(tokenProvider.getUsernameFromToken(tokenProvider.getTokenFromHeader(token))).orElseThrow();
            List<QA> qaList = qaService.getqa(user);
            return ResponseEntity.ok(new BaseResponseDTO("success",qaList));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }

    @GetMapping("/api/qa/product")
    public ResponseEntity<BaseResponseDTO> getQAByProductId(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestParam String productId){
        try{
            List<QA> qaList = qaService.getqaByProductId(Integer.parseInt(productId));
            return ResponseEntity.ok(new BaseResponseDTO("success",qaList));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }

    @GetMapping("/api/qa/seller")
    public ResponseEntity<BaseResponseDTO> getQABySellerId(@RequestHeader(value = "Authorization", defaultValue = "") String token,@RequestParam String sellerId){
        try{
            List<QA> qaList = qaService.getqaBySellerId(Integer.parseInt(sellerId));
            return ResponseEntity.ok(new BaseResponseDTO("success",qaList));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(new BaseResponseDTO("failed"));
        }
    }
}
