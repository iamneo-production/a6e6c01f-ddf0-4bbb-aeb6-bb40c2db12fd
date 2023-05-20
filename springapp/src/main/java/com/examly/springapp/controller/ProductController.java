package com.examly.springapp.controller;

import com.examly.springapp.entity.Product;
import com.examly.springapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/products")
    public List<Product> getProducts(@RequestParam(value = "category", required = false) String cat){

        return productService.getProducts(cat);
    }

    @RequestMapping(value = "/products", method = RequestMethod.POST)
    public Product createProduct(@RequestBody Product product){
       return productService.createProduct(product);
    }

    @RequestMapping(value = "/products/{productId}")
    public Optional<Product> getProductById(@PathVariable("productId") Integer productId){
        return productService.getProductById(productId); }

    @RequestMapping(value = "/products", method = RequestMethod.PUT)
    public Product updateProduct(@RequestBody Product incomingProduct){
        return productService.updateProduct(incomingProduct); }

    @RequestMapping(value = "/products/{productId}", method = RequestMethod.DELETE)
    public String deleteProductById(@PathVariable Integer productId){
        return productService.deleteProductById(productId); }
}
