package com.fc.ssm.controller.item;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.fc.ssm.entity.Items;
import com.fc.ssm.entity.ItemsCustomer;
import com.fc.ssm.entity.ItemsQueryVo;
import com.fc.ssm.service.ItemsService;

/**
 * 查询商品信息
 * 
 * @author dell
 * 
 */
@Controller
@RequestMapping("/items")
public class ItemsController {

	@Autowired
	private ItemsService itemsService;

	/**
	 * 查询列表
	 * 
	 * @param itemsQueryVo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/queryItems")
	public ModelAndView queryItems(ItemsQueryVo itemsQueryVo) throws Exception {
		List<ItemsCustomer> itemsList = itemsService.findItemsList(itemsQueryVo);
		ModelAndView view = new ModelAndView();
		view.setViewName("items/itemsList.jsp");
		view.addObject("itemsList", itemsList);
		return view;
	}

	/**
	 * 请求数据为json格式(不常用)，返回json数据
	 * 
	 * @param itemsCustomer
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/JsonqueryItems")
	@ResponseBody
	public ItemsCustomer JsonqueryItems(@RequestBody ItemsCustomer itemsCustomer) throws Exception {
		return itemsCustomer;
	}

	/**
	 * 请求key/value数据(常用)，返回json
	 * 
	 * @param itemsCustomer
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/keyvalueQueryItems")
	@ResponseBody
	public ItemsCustomer keyvalueQueryItems(ItemsCustomer itemsCustomer) throws Exception {
		return itemsCustomer;
	}

	/**
	 * REST风格
	 * 
	 * @param name
	 * @param itemid
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/queryViewREST/{name}/{id}")
	@ResponseBody
	public ItemsCustomer queryViewREST(@PathVariable("name") String name,
			@PathVariable("id") int itemid) throws Exception {
		return itemsService.findItemByKey(itemid);
	}

	/**
	 * 跳转修改页面
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/editItemsRedirect")
	public ModelAndView editItemsRedirect(Integer id) throws Exception {
		ItemsCustomer items = itemsService.findItemByKey(id);
		ModelAndView view = new ModelAndView();
		view.setViewName("items/editItems.jsp");
		view.addObject("items", items);
		return view;
	}

	/**
	 * 修改提交
	 * 
	 * @param request
	 * @param itemsCustomer
	 * @param id
	 * @param file
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/editItemsSubmit")
	public String editItemsSubmit(HttpServletRequest request, ItemsCustomer itemsCustomer,
			Integer id, MultipartFile file) throws Exception {
		// post乱码，在web.xml文件配置filter解决
		// get乱码 String name = new
		// String(request.getParameter("username").getBytes("iso8859-1"),"utf-8");

		// 图片数据
		if (file != null) {
			// 从配置文件中取得上传的路径
			ResourceBundle app = ResourceBundle.getBundle("config/app");
			String path = app.getString("default_img_path");
			// 上传的文件名
			String fileName = file.getOriginalFilename();
			String newFileName = UUID.randomUUID() + fileName.substring(fileName.lastIndexOf("."));

			File newFile = new File(path + newFileName);

			file.transferTo(newFile);

			itemsCustomer.setPic(newFileName);
		}
		itemsService.updateItems(id, itemsCustomer);
		return "redirect:queryItems.action";
	}

	/**
	 * 该Controller的所有方法在调用前，先执行此@ModelAttribute方法
	 * 
	 * @return
	 */
	@ModelAttribute("itemtypes")
	public Map<String, String> getItemType() {
		Map<String, String> types = new HashMap<String, String>();
		types.put("101", "数码");
		types.put("102", "书籍");
		return types;
	}

	/**
	 * 测试返回json数据
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/queryItems22")
	@ResponseBody
	public List<Items> queryItems22() throws Exception {
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
		return itemsList;
	}

	/**
	 * 测试返回json数据
	 * 
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/queryItemsJson")
	public void queryItemsJson(HttpServletResponse response) throws Exception {
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
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json;charset=utf-8");
		ObjectMapper objectMapper = new ObjectMapper();
		String json = objectMapper.writeValueAsString(itemsList);
		response.getWriter().write(json);
	}
}
