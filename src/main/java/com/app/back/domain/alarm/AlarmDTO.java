package com.app.back.domain.alarm;


import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AlarmDTO {
    private Long id;
    private String alarmContent;
    private Long memberId;
    private String createdDate;
    private boolean isRead;
    private String alarmType;
    private Long postId;


    public AlarmVO toVO(){
        return new AlarmVO(id, alarmContent, memberId, createdDate,isRead,alarmType,postId);
    }

}
