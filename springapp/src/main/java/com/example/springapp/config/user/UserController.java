package com.example.springapp.config.user;

import com.example.springapp.BaseResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springapp.model.User;
import com.example.springapp.service.UserService;

import java.util.HashMap;
import java.util.Map;


@RestController
public class UserController {


    @Autowired
    UserService userService;

    @PostMapping("/api/auth/register")
    @CrossOrigin(origins = "http://localhost:8081/")
    public BaseResponseDTO createUser(@RequestBody User newUser){
        if(userService.createUser(newUser)){
            return new BaseResponseDTO("success");
        }else {
            return new BaseResponseDTO("failed");
        }
    }

    @PostMapping("/api/auth/login")
    @CrossOrigin(origins = "http://localhost:8081/")
    public BaseResponseDTO loginUser(@RequestBody UserLoginDto loginDetails){
        if(userService.checkUserNameExists(loginDetails.getEmail())){
            if(userService.verifyUser(loginDetails.getEmail(),loginDetails.getPassword())){
                Map<Object,Object> data = new HashMap<>();
                String token = userService.generateToken(loginDetails.getEmail(),loginDetails.getPassword());
                data.put("token",token);
                User currentUser = userService.loadUserByUsername(loginDetails.getEmail());
                data.put("currentUser",currentUser);
                return new BaseResponseDTO("success",data);
            }else {
                return new BaseResponseDTO("password invalid");
            }
        }else {
            return new BaseResponseDTO("user not exist");
        }
    }

    @GetMapping("/api/auth/validateToken")
    @CrossOrigin(origins = "http://localhost:8081/")
    public ResponseEntity<BaseResponseDTO> home(@RequestHeader(value = "Authorization", defaultValue = "") String token) {
        Map<Object,Object> data = new HashMap<>();
        if(userService.validateToken(token)) {
            data.put("user",userService.getUserFromToken(token));
            return ResponseEntity.ok(new BaseResponseDTO("success",data));
        }
        return new ResponseEntity<>(new BaseResponseDTO("failed",data), HttpStatus.UNAUTHORIZED);
    }
    
}
