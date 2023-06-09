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

}


