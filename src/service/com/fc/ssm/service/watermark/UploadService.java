package com.fc.ssm.service.watermark;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.fc.ssm.entity.Watermark;

public interface UploadService {
	public Watermark uploadImg(MultipartFile file,Watermark watermark,HttpServletRequest request) throws Exception;
}
