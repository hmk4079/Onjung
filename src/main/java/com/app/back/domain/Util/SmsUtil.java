package com.app.back.domain.Util;

import java.util.HashMap;
import java.util.Random;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Component
public class SmsUtil {

    private final String apiKey;
    private final String apiSecret;
    private final String fromNumber;

    public SmsUtil(
            @Value("${sms.api.key}") String apiKey,
            @Value("${sms.api.secret}") String apiSecret,
            @Value("${sms.from.number}") String fromNumber) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.fromNumber = fromNumber;
    }

    public String generateAuthenticationCode() {
        Random random = new Random();
        StringBuilder authenticationCode = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            authenticationCode.append(random.nextInt(10));
        }
        return authenticationCode.toString();
    }

    public String sendAuthenticationCode(String to) {
        String authCode = generateAuthenticationCode();
        String message = "인증번호는 [" + authCode + "] 입니다.";

        Message coolsms = new Message(apiKey, apiSecret);
        HashMap<String, String> params = new HashMap<>();
        params.put("to", to);
        params.put("from", fromNumber);
        params.put("type", "SMS");
        params.put("text", message);
        params.put("app_version", "test app 1.2");

        try {
            JSONObject response = (JSONObject) coolsms.send(params);
            System.out.println("전송 성공: " + response.toString());
            return authCode;
        } catch (CoolsmsException e) {
            System.out.println("전송 실패: " + e.getMessage());
            return null;
        }
    }
}
