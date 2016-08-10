package com.fc.ssm.service.watermark;

import java.awt.Color;
import java.awt.Font;
import java.io.File;

import javax.servlet.http.HttpServletRequest;

public interface MarkService {
	
	public static final String MARK_TEXT = "意大利代购";
	public static final String FONT_NAME = "微软雅黑";
	public static final int FONT_STYLE = Font.BOLD;
	public static final int FONT_SIZE = 20;
	public static final Color MARK_COLOR = Color.green;
	
	public static final int X = 10;
	public static final int Y = 10;
	public static final float ALPHA = 0.3F;
	
	public static final String LOGO = "logo.png";
	
	public String watermark(File file,String fileName,String path,HttpServletRequest request);
}
