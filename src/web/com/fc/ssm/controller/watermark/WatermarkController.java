package com.fc.ssm.controller.watermark;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.fc.ssm.entity.Watermark;
import com.fc.ssm.service.watermark.UploadService;

/**
 * 添加水印
 * 
 * @author dell
 * 
 */
@Controller
@RequestMapping("/watermark")
public class WatermarkController {
	@Autowired
	private UploadService uploadService;

	
	@RequestMapping("/uploadImgRedirect")
	public ModelAndView uploadImgRedirect() throws Exception {
		ModelAndView view = new ModelAndView();
		view.setViewName("watermark/uploadImg.jsp");
		return view;
	}
	
	/**
	 * 上传图片
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/uploadImg")
	public ModelAndView uploadImg(MultipartFile file, Watermark watermark) throws Exception {
		Watermark rest = uploadService.uploadImg(file, watermark);
		 ModelAndView view = new ModelAndView();
		 view.setViewName("watermark/success.jsp");
		 view.addObject("watermark",rest);
		 return view;
	}
}
