package com.app.back.exception;

public class ApplicationFailedException extends RuntimeException {
    public ApplicationFailedException(String message) {super(message);}
}