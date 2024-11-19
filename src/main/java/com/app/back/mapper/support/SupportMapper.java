package com.app.back.mapper.support;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.support.SupportDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SupportMapper {

    public List<SupportDTO> selectTop10Supports();
    public void updateCurrentPoint(SupportDTO supportDTO);


}

