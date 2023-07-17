package com.example.springapp;

import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.example.springapp.model.User;
import com.example.springapp.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RunWith(SpringJUnit4ClassRunner.class) 
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {

	 @Autowired
	    private MockMvc mockMvc;
	
     
     @Test
     public void testGetProductAll() throws Exception {
     	
         mockMvc.perform(get("/product"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     
     @Test
     public void testGetproductById() throws Exception {
     	
         mockMvc.perform(get("/product").param("id", "1"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     @Test
     public void testGetPurchaseAll() throws Exception {
     	
         mockMvc.perform(get("/purchase"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     
     @Test
     public void testGetPurchaseById() throws Exception {
     	
         mockMvc.perform(get("/purchase").param("id", "1"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     @Test
     public void testGetPurchaseByBuyerId() throws Exception {
     	
         mockMvc.perform(get("/purchase/buyer").param("buyerId", "1"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     
     @Test
     public void testGetReviewAll() throws Exception {
     	
         mockMvc.perform(get("/review"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     
     @Test
     public void testGetReviewByProductId() throws Exception {
     	
         mockMvc.perform(get("/review/product").param("productId", "1"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     @Test
     public void testGetReviewBySellerId() throws Exception {
     	
         mockMvc.perform(get("/review/seller").param("sellerId", "1"))
         .andExpect(MockMvcResultMatchers.status().isOk())
         .andDo(print())
         .andExpect(content().contentType("application/json"))
 			.andExpect(jsonPath("$").isArray())
 			.andReturn();
     }
     
     @Test
     public void test_case1() {
     String directoryPath = "src/main/java/com/example/springapp/controller";
      File directory = new File(directoryPath);
      assertTrue(directory.exists() && directory.isDirectory());;
      }


     @Test
     public void test_case2() {
     String filePath = "src/main/java/com/example/springapp/controller/ProductController.java";
      File file = new File(filePath);
      assertTrue(file.exists() && file.isFile());;
      }
    
}
