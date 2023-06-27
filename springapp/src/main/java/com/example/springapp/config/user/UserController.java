package com.example.springapp.config.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.springapp.model.User;
import javax.persistence.PostRemove;
import com.example.springapp.service.UserService;

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

    @PostMapping("/api/auth/login")
    public String loginUser(@RequestBody UserLoginDto loginDetails){
        if(userService.checkUserNameExists(loginDetails.getEmail())){
            if(userService.verifyUser(loginDetails.getEmail(),loginDetails.getPassword())){
                return userService.generateToke(loginDetails.getEmail(),loginDetails.getPassword());
            }else {
                return "Password Invalid";
            }
        }else {
            return "User Not exist";
        }
    }


}
