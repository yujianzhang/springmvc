package com.fc.ssm.mapper.watermark;

import com.fc.ssm.entity.Watermark;
import com.fc.ssm.entity.WatermarkExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface WatermarkMapper {
    int countByExample(WatermarkExample example);

    int deleteByExample(WatermarkExample example);

    int insert(Watermark record);

    int insertSelective(Watermark record);

    List<Watermark> selectByExample(WatermarkExample example);

    int updateByExampleSelective(@Param("record") Watermark record, @Param("example") WatermarkExample example);

    int updateByExample(@Param("record") Watermark record, @Param("example") WatermarkExample example);
}