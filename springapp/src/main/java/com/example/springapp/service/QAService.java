package com.example.springapp.service;

import com.example.springapp.model.Cart;
import com.example.springapp.model.Product;
import com.example.springapp.model.QA;
import com.example.springapp.model.User;
import com.example.springapp.repo.ProductRepository;
import com.example.springapp.repo.QARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QAService {

    @Autowired
    QARepository qaRepository;

    @Autowired
    ProductRepository productRepository;

    public void addquestion(User user, Product product, String question) {
        QA qa = new QA(user,product,question);
        qa.setStatus("Unanswered");
        qaRepository.save(qa);
    }

    public void updateqa(Integer qaId, String answer) {
        QA qa = qaRepository.findById(qaId).orElseThrow();
        qa.setAnswer(answer);
        qa.setStatus("Answered");
        qaRepository.save(qa);
    }

    public List<QA> getqa(User user) {
        System.out.println("------seervice-"+user.getEmail());
        return qaRepository.findByBuyer(user);
    }

    public List<QA> getqaByProductId(int productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        return qaRepository.findAllByProduct(product);
    }

    public List<QA> getqaBySellerId(int sellerId) {
        System.out.println("-seller id---"+sellerId);
        try{
            List<QA> all= qaRepository.findAllBySellerId(sellerId);
            return all;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }

    }
}
