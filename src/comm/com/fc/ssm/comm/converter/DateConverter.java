package com.fc.ssm.comm.converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;
/**
 * 日期转换器
 * @author dell
 *
 */
public class DateConverter implements Converter<String, Date>{
	@Override
	public Date convert(String source) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			return df.parse(source);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		// 绑定失败
		return null;
	}

}
