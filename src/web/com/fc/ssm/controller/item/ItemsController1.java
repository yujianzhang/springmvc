package com.fc.ssm.controller.item;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import com.fc.ssm.entity.Items;

/**
 * 方式一：实现controller接口的处理器
 * @author dell
 *
 */
public class ItemsController1 implements Controller{

	@Override
	public ModelAndView handleRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		List<Items> itemsList = new ArrayList<Items>();
		Items item1 = new Items();
		item1.setId(1);
		item1.setName("联想笔记本");
		item1.setPrice(4000f);
		
		Items item2 = new Items();
		item2.setId(1);
		item2.setName("联想笔记本");
		item2.setPrice(4000f);
		itemsList.add(item1);
		itemsList.add(item2);
		ModelAndView view = new ModelAndView();
		view.setViewName("/WEB-INF/jsp/items/itemsList.jsp");
		view.addObject("itemsList", itemsList);
		return view;
	}

}
