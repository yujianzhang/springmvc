package com.fc.ssm.service.watermark.impl;

import java.awt.AlphaComposite;
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
@Service("imageMarkServiceSingle")
public class ImageMarkServiceSingle implements MarkService{

	@Override
	public String watermark(File file,String fileName,String path,HttpServletRequest request) {
		String logoFileName = "logo_" + fileName;
		OutputStream os = null;
		// String files = Thread.currentThread().getContextClassLoader().getResource("/").getPath()+"/";
		String files = request.getSession().getServletContext().getRealPath("/image");
		String logoPath = files + "/" +LOGO;
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
			
			
			File fileLogo = new File(logoPath);
			Image logo = ImageIO.read(fileLogo);
			int width1 = logo.getWidth(null);
			int height1 = logo.getHeight(null);
			int widthDiff = width - width1;
			int hightDiff = height - height1;
			int x = X;
			int y = Y;
			if(x > widthDiff){
				x = widthDiff;
			}
			if(y > hightDiff){
				y = hightDiff;
			}
			g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, ALPHA));
			g.drawImage(logo, x, y, null);
			g.dispose();
			// 创建图像编码工具类
			os = new FileOutputStream(path + logoFileName);
			JPEGImageEncoder en = JPEGCodec.createJPEGEncoder(os);
			// 使用图像编码工具类，输出缓存图像到目标文件
			en.encode(bufferedImage);
		} catch (Exception e) {
			e.printStackTrace();
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

}
