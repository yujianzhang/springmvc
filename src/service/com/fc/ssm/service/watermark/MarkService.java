package com.fc.ssm.service.watermark;

import java.awt.Color;
import java.awt.Font;
import java.io.File;

public interface MarkService {
	
	public static final String MARK_TEXT = "ZYJ";
	public static final String FONT_NAME = "微软雅黑";
	public static final int FONT_STYLE = Font.BOLD;
	public static final int FONT_SIZE = 120;
	public static final Color MARK_COLOR = Color.BLACK;
	
	public static final int X = 10;
	public static final int Y = 10;
	public static final float ALPHA = 0.3F;
	
	public String watermark(File file,String fileName,String path);
}
