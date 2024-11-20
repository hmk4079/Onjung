package com.app.back.exception;

public class UserNotAuthenticatedException extends Throwable {
    public UserNotAuthenticatedException(String message) {
        super(message);
    }
}
