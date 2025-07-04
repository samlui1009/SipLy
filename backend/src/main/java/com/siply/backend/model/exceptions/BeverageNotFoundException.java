package com.siply.backend.model.exceptions;

public class BeverageNotFoundException extends RuntimeException {
    
    public BeverageNotFoundException(String name) {
        super("Beverage not found" + name);
    }
}
