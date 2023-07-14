package com.example.springapp.service;

import com.example.springapp.model.Address;
import com.example.springapp.model.User;
import com.example.springapp.repo.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {
    @Autowired
    AddressRepository addressRepository;

    public void addAddress(User user, Address address) {
        address.setBuyer(user);
        addressRepository.save(address);
    }

    public List<Address> getAddress(User user) {
        return addressRepository.findAllByBuyer(user);
    }

    public boolean hasUser(User user, Integer addressId) {
        return addressRepository.findById(addressId).orElseThrow().getBuyer().getId().equals(user.getId());
    }

    public void deleteAddress(Integer addressId) {
        addressRepository.deleteById(addressId);
    }

    public void updateAddress(Address address, Integer addressId) {
        Address temp = addressRepository.findById(addressId).orElseThrow();
        temp.setFlatNo(address.getFlatNo());
        temp.setArea(address.getArea());
        temp.setCity(address.getCity());
        temp.setPincode(address.getPincode());
        temp.setState(address.getState());
        addressRepository.save(temp);
    }
}
