package com.fc.ssm.service;

import java.util.List;

import com.fc.ssm.entity.ItemsCustomer;
import com.fc.ssm.entity.ItemsQueryVo;

public interface ItemsService {
	// 商品查询列表
	public List<ItemsCustomer> findItemsList(ItemsQueryVo itemsQueryVo) throws Exception;
	
	public ItemsCustomer findItemByKey(Integer id) throws Exception;
	
	public void updateItems(Integer id,ItemsCustomer itemsCustomer) throws Exception;
	
}
