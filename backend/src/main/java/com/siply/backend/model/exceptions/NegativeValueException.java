package com.siply.backend.model.exceptions;

public class NegativeValueException extends RuntimeException {
    public NegativeValueException(String component) {
        super(component + " cannot be negative.");
    }
}
