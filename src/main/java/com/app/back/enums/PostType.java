package com.app.back.enums;

public enum PostType {
    VOLUNTEER("봉사모집＆지원"),
    DONATION("기부"),
    SUPPORT("후원"),
    REVIEW("후기"),
    NOTICE("공지사항"),
    INQUIRY("문의");

    private final String displayName;

    // 생성자에서 한글 이름을 매핑
    PostType(String displayName) {
        this.displayName = displayName;
    }

    // 한글 이름을 반환하는 메서드
    public String getDisplayName() {
        return displayName;
    }

}

