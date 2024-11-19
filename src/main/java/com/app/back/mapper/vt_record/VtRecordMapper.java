package com.app.back.mapper.vt_record;

import com.app.back.domain.vt_record.VtRecordDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface VtRecordMapper {

    public void insert(VtRecordDTO vtRecordDTO);
    public VtRecordDTO selectById(Long id);
    public List<VtRecordDTO> selectAll();
    public void update(VtRecordDTO vtRecordDTO);
    public void deleteById(Long id);

    public List<VtRecordDTO> selectByMemberId(@Param("memberId") Long memberId);
    public List<VtRecordDTO> selectByMemberIdAndDateRange(
            @Param("memberId") Long memberId,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate
    );


    public int selectTotalVtTimeByMemberId(Long memberId);

    public int selectVtCountByMemberId(Long memberId);
}
