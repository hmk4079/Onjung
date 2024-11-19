package com.app.back.exception;

public class KakaoLoginFailException extends RuntimeException {
    public KakaoLoginFailException(String message) {
        super(message);
    }
}