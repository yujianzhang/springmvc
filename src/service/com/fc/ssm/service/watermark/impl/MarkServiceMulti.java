package com.fc.ssm.service.watermark.impl;

import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.fc.ssm.service.watermark.MarkService;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
@Service("markServiceMulti")
public class MarkServiceMulti implements MarkService{

	@Override
	public String watermark(File file,String fileName,String path,HttpServletRequest request) {
		String logoFileName = "logo_" + fileName;
		OutputStream os = null;
		try {
			// 获取图片的信息
			Image image2 = ImageIO.read(file);
			int width = image2.getWidth(null);
			int height = image2.getHeight(null);
			// 创建图片缓存对象
			BufferedImage bufferedImage = new BufferedImage(width, height,
					BufferedImage.TYPE_INT_RGB);
			// 创建java绘图工具对象
			Graphics2D g = bufferedImage.createGraphics();
			// 使用绘图工具对象将原图绘制到缓存图片对象
			g.drawImage(image2, 0, 0, width, height, null);
			// 使用绘图工具对象将水印绘制到缓存图片
			g.setFont(new Font(FONT_NAME,FONT_STYLE,FONT_SIZE));//文字水印
			g.setColor(MARK_COLOR);
			
			int width1 = FONT_SIZE * getTextLength(MARK_TEXT);
			int height1 = FONT_SIZE;
			
			g.rotate(Math.toRadians(30), bufferedImage.getWidth()/2, bufferedImage.getHeight()/2);
			
			int x = -width/2;
			int y = -height/2;
			
			while(x<width*1.5){
				y = -height/2;
				while(y<height*1.5){
					g.drawString(MARK_TEXT,x,y);
					y+= height1 + 100; 
				}
				x+= width1 + 100;
			}
			
			g.dispose();
			// 创建图像编码工具类
			os = new FileOutputStream(path + logoFileName);
			JPEGImageEncoder en = JPEGCodec.createJPEGEncoder(os);
			// 使用图像编码工具类，输出缓存图像到目标文件
			en.encode(bufferedImage);
		} catch (Exception e) {
		}finally{
			if(os != null){
				try {
					os.close();
				} catch (Exception e2) {
				}
			}
		}

		return path + logoFileName;
	}
	public int getTextLength(String text){
		int length = text.length();
		for (int i = 0; i < text.length(); i++) {
			String s = String.valueOf(text.charAt(i));
			if(s.getBytes().length>1){
				length++;
			}
		}
		length = length%2==0?length/2:length/2+1;
		return length;
	}
}
