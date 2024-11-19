package com.app.back.service.support;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.support.SupportDTO;

import java.util.List;

public interface SupportService {

    public List<SupportDTO> getLatest10Supports();

    public void updateCurrentPointAndCheckGoal(SupportDTO supportDTO);


}
