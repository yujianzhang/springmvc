package com.fc.ssm.comm.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

/**
 * 全局异常处理器
 * 
 * @author dell
 * 
 */
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {

	@Override
	public ModelAndView resolveException(HttpServletRequest request, 
										HttpServletResponse response, 
										Object handler,
										Exception ex) {
		ModelAndView view = new ModelAndView();
		String message = "";
		if(ex instanceof RuntimeException){
			message = "未知异常";
		}else{
			message = ex.getMessage();
		}
		view.addObject("message", message);
		view.setViewName("error.jsp");
		return view;
	}

}
