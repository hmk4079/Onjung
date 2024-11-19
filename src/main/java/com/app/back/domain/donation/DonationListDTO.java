package com.app.back.domain.donation;

import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.PostVO;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class DonationListDTO {
    private List<DonationDTO> donations;
    private Pagination pagination;
}
