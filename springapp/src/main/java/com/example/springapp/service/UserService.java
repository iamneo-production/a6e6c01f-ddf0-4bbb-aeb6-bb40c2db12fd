package com.example.springapp.service;

import com.example.springapp.BaseResponseDTO;
import com.example.springapp.config.jwt.JwtTokenProvider;
import com.example.springapp.config.token.Token;
import com.example.springapp.config.token.TokenRepository;
import com.example.springapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.springapp.config.user.UserRepository;

import java.util.Optional;
import java.util.List;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;


@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenRepository tokenRepository;
    @Lazy
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Lazy
    @Autowired
    PasswordEncoder passwordEncoder;

    public boolean verifyUser(String email,String password){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(""));
        return new BCryptPasswordEncoder().matches(password, user.getPassword());
    }

    public boolean checkUserNameExists(String email){
        return userRepository.findByEmail(email).isPresent();
    }

    public boolean checkUserNameExistsForSignup(String email){
        return userRepository.findByEmail(email).isPresent();
    }

    public String generateToken(String email,String password){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);
        Token saveToken = new Token();
        saveToken.setToken(token);
        tokenRepository.save(saveToken);
        return token;
    }


    public boolean createUser(User newUser){
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userRepository.save(newUser);
        return true;
    }
    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(""));
    }


    public boolean validateToken(String token){
        return tokenProvider.validateToken(token);
    }

    public User getUserFromToken(String token){
        return userRepository.findByEmail(tokenProvider.getUsernameFromToken(token)).orElseThrow();
    }

    //Get all user
    public  List<User> findallUser(){
        return userRepository.findUser();
    }
    
    // Get User by Id
    public List<User> getUsersById(String email){
        return userRepository.findByUserid(email);
    }
    // Update User
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User updateUser(User incomingUser) {
        Optional<User> optionalUser = userRepository.findByEmail(incomingUser.getEmail());
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setFirstName(incomingUser.getFirstName());
            existingUser.setLastName(incomingUser.getLastName());
            existingUser.setPassword(passwordEncoder.encode(incomingUser.getPassword()));
            existingUser.setPhone(incomingUser.getPhone());
            existingUser.setRoles(incomingUser.getRoles());

            return userRepository.save(existingUser);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }


}


