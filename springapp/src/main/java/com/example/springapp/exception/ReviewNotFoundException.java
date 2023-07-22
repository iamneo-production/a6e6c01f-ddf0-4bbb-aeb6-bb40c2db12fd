package com.example.springapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ReviewNotFoundException extends RuntimeException {

    public ReviewNotFoundException() {
        super("Review not found");
    }

    public ReviewNotFoundException(String msg) {
        super(msg);
    }

    public ReviewNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }
}