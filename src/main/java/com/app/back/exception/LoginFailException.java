package com.app.back.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
// LoginFailException은 try/catch로 잡을 게 아니라 일부로 발생시키는 것이기 때문에 빨간 줄이 그어지지 않게 
// RuntimeException을 상속받는다. 기억 안나면 java memo로 복습
public class LoginFailException extends RuntimeException {
    public LoginFailException(String message) {
        super(message);
    }
}
