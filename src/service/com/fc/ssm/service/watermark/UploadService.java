package com.fc.ssm.service.watermark;

import org.springframework.web.multipart.MultipartFile;

import com.fc.ssm.entity.Watermark;

public interface UploadService {
	public Watermark uploadImg(MultipartFile file,Watermark watermark) throws Exception;
}
