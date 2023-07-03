package com.example.springapp;

import java.util.List;

public class BaseResponseDTO {
    private Object message;
    private Object data;


    public BaseResponseDTO(Object message, Object data) {
        this.message = message;
        this.data = data;
    }

    public BaseResponseDTO(Object message) {
        this.message = message;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(Object message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}