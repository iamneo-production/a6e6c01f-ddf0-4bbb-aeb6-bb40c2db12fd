package com.example.springapp.config.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.example.springapp.model.User;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String username);
  
    List<User> findByUserid(String email);

    List<User> findUser();

    

}
