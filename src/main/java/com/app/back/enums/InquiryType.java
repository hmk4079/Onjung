package com.app.back.enums;

public enum InquiryType {
    NORMAL("일반 문의"), VOLUNTEER("봉사단체 가입 문의");

    private final String displayName;

    // 생성자에서 한글 이름을 매핑
    InquiryType(String displayName) {
        this.displayName = displayName;
    }

    // 한글 이름을 반환하는 메서드
    public String getDisplayName() {
        return displayName;
    }
}
