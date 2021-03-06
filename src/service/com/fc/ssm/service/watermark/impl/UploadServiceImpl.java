package com.fc.ssm.service.watermark.impl;

import java.io.File;
import java.util.Date;
import java.util.ResourceBundle;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fc.ssm.entity.Watermark;
import com.fc.ssm.mapper.watermark.WatermarkMapper;
import com.fc.ssm.service.watermark.MarkService;
import com.fc.ssm.service.watermark.UploadService;
@Transactional
@Service("uploadService")
public class UploadServiceImpl implements UploadService {
	@Autowired
	private WatermarkMapper watermarkMapper;
	@Autowired
	private MarkService markServiceSingle;
	@Autowired
	private MarkService imageMarkServiceSingle;
	@Autowired
	private MarkService markServiceMulti;
	
	@Override
	public Watermark uploadImg(MultipartFile file, Watermark watermark,HttpServletRequest request) throws Exception {
		if (file != null) {
			// 从配置文件中取得上传的路径
			ResourceBundle app = ResourceBundle.getBundle("config/app");
			String path = app.getString("default_img_path");
			// 上传的文件名
			String fileName = file.getOriginalFilename();
			String newFileName = UUID.randomUUID() + fileName.substring(fileName.lastIndexOf("."));
			File newFile = new File(path + newFileName);
			file.transferTo(newFile);
			watermark.setId(UUID.randomUUID().toString());
			watermark.setPic(newFileName);
			watermark.setCreatetime(new Date());
			// 添加文字水印
			// markServiceSingle.watermark(newFile,newFileName,path,request);
			imageMarkServiceSingle.watermark(newFile,newFileName,path,request);
			// markServiceMulti.watermark(newFile,newFileName,path,request);
		}
		
		
		
		watermarkMapper.insert(watermark);
		return watermark;
	}

}
