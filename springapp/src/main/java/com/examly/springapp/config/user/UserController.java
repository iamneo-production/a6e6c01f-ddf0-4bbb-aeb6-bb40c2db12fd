package com.examly.springapp.config.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.PostRemove;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/auth/register")
    public String createUser(@RequestBody User newUser){
        if(userService.createUser(newUser)){
            return "User Created";
        }else {
            return "Something went wrong";
        }
    }

//    @PostMapping("/api/auth/login")
//    public String loginUser(){
//        return null;
//    }


}
