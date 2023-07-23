package com.example.springapp.config.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.example.springapp.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String username);

    Optional<User> findById(Long id);
    @Query(value = "SELECT * FROM user U WHERE U.id = :id LIMIT 1", nativeQuery = true)
    User findByUseridd(Integer id);

    @Query(value="SELECT * FROM user U  WHERE U.id=:id", nativeQuery = true)
    List<User> findByUserid(Integer id);

    @Query(value="SELECT * FROM user", nativeQuery = true)
    List<User> findUser();

    

}
