package com.siply.backend.model.exceptions;

public class InvalidInputException extends RuntimeException{
    public InvalidInputException() {
        super("Input must be at least one character long.");
    }

}
