package com.fc.ssm.controller.websocket;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/chat")
public class ChatController {
	@RequestMapping("/chatRoomRedirect")
	public ModelAndView editItemsRedirect(Integer id) throws Exception {
		ModelAndView view = new ModelAndView();
		view.setViewName("chat/chatRoom.jsp");
		return view;
	}
}
