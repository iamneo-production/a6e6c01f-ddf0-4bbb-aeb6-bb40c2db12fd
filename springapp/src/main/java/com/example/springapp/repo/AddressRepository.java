package com.example.springapp.repo;

import com.example.springapp.model.Address;
import com.example.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository  extends JpaRepository<Address,Integer> {
    List<Address> findAllByBuyer(User user);
}
