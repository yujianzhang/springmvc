package com.fc.ssm.mapper.item;

import java.util.List;

import com.fc.ssm.entity.ItemsCustomer;
import com.fc.ssm.entity.ItemsQueryVo;

public interface ItemsMapperCustomer {
	// 商品查询列表
	public List<ItemsCustomer> findItemsList(ItemsQueryVo itemsQueryVo) throws Exception;
	
}
