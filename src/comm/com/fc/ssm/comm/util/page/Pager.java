package com.fc.ssm.comm.util.page;

import java.io.Serializable;
import java.util.List;

public class Pager<T> implements Serializable {
	private static final long serialVersionUID = -3465980691279860012L;

	private int pageSize; // 每页显示多少条记录

	private int currentPage; // 当前第几页数据

	private int totalRecord; // 一共多少条记录

	private int totalPage; // 一共多少页记录

	private List<T> dataList; // 要显示的数据

	public Pager() {
	}

	public Pager(int pageSize, int currentPage, int totalRecord, int totalPage, List<T> dataList) {
		super();
		this.pageSize = pageSize;
		this.currentPage = currentPage;
		this.totalRecord = totalRecord;
		this.totalPage = totalPage;
		this.dataList = dataList;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalRecord() {
		return totalRecord;
	}

	public void setTotalRecord(int totalRecord) {
		this.totalRecord = totalRecord;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public List<T> getDataList() {
		return dataList;
	}

	public void setDataList(List<T> dataList) {
		this.dataList = dataList;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

}
