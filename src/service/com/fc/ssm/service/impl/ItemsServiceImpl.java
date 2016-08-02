package com.fc.ssm.service.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fc.ssm.entity.Items;
import com.fc.ssm.entity.ItemsCustomer;
import com.fc.ssm.entity.ItemsQueryVo;
import com.fc.ssm.mapper.item.ItemsMapper;
import com.fc.ssm.mapper.item.ItemsMapperCustomer;
import com.fc.ssm.service.ItemsService;

@Transactional
@Service("itemsService")
public class ItemsServiceImpl implements ItemsService {

	@Autowired
	private ItemsMapperCustomer itemsMapperCustomer;

	@Autowired
	private ItemsMapper itemsMapper;

	@Override
	public List<ItemsCustomer> findItemsList(ItemsQueryVo itemsQueryVo)
			throws Exception {
		return itemsMapperCustomer.findItemsList(itemsQueryVo);
	}

	@Override
	public ItemsCustomer findItemByKey(Integer id) throws Exception {
		Items items = itemsMapper.selectByPrimaryKey(id);
		ItemsCustomer itemsCustomer = new ItemsCustomer();
		if(items!=null){
			BeanUtils.copyProperties(items, itemsCustomer);
		}
		
		return itemsCustomer;
	}

	@Override
	public void updateItems(Integer id,ItemsCustomer itemsCustomer) throws Exception {
		
		itemsCustomer.setId(id);//重复操作也写，更明确
		
		itemsMapper.updateByPrimaryKeyWithBLOBs(itemsCustomer);
		
	}

}
