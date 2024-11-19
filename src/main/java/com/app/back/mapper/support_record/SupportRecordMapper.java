package com.app.back.mapper.support_record;

import com.app.back.domain.support_record.SupportRecordDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SupportRecordMapper {

    public void insert(SupportRecordDTO supportRecordDTO);
    public SupportRecordDTO selectById(Long id);
    public List<SupportRecordDTO> selectAll();
    public void update(SupportRecordDTO supportRecordDTO);
    public void deleteById(Long id);
    public int selectTotalSupportByMemberId(@Param("memberId") Long memberId);

    public List<SupportRecordDTO> selectByMemberId(@Param("memberId") Long memberId);
    public List<SupportRecordDTO> selectByMemberIdAndDateRange(
            @Param("memberId") Long memberId,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate
    );
}
