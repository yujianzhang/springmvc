<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>查询商品列表</title>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery-2.0.3.min.js"></script>
<script type="text/javascript">
$.fn.serializeObject = function(){  
   var o = {};  
   var a = this.serializeArray();  
   $.each(a, function() {  
       if (o[this.name]) {  
           if (!o[this.name].push) {  
               o[this.name] = [o[this.name]];  
           }  
           o[this.name].push(this.value || '');  
       } else {  
           o[this.name] = this.value || '';  
       }  
   });  
   return o;  
};
function deleteItems(){
	//提交form
	document.itemsForm.action="${pageContext.request.contextPath }/items/deleteItems.action";
	document.itemsForm.submit();
}
function queryItems(){
	//提交form
	document.itemsForm.action="${pageContext.request.contextPath }/items/queryItems.action";
	document.itemsForm.submit();
}

function queryItems_json(){// 请求json，返回json不常用
	$.ajax({
		type:'post',
		url:'${pageContext.request.contextPath }/items/JsonqueryItems.action',
		contentType:'application/json;charset=utf-8',
		data:'{"name":"test"}',
		//data:JSON.stringify($('#itemsForm').serializeObject()),
		success:function(data){
		debugger;
			alert(data.name);
		}
	});
}

function queryItems_keyValue(){// 请求key/value，返回json常用
	$.ajax({
		type:'post',
		url:'${pageContext.request.contextPath }/items/keyvalueQueryItems.action',
		//data:$('#itemsForm').serialize(),
		data:'name="手机"&type="1"',
		success:function(data){
		debugger;
			alert(data.name);
		}
	});
}
</script>
</head>
<body> 
当前用户：${username }，
<c:if test="${username!=null }">
 	<a href="${pageContext.request.contextPath }/user/logout.action">退出</a>
</c:if>
	<form id="itemsForm" name="itemsForm" action="${pageContext.request.contextPath }/items/queryItems.action" method="post">
	查询条件：
	<table width="100%" border=1>
		<tr>
			<td>
			商品名称：<input name="itemsCustomer.name" />
			商品类型：
			<select name="itemtype">
				<c:forEach items="${itemtypes }" var="itemtype">
					<option value="${itemtype.key }">${itemtype.value }</option>		
				</c:forEach>
			</select>
			
			</td>
			<td>
				<input type="button" value="查询" onclick="queryItems()"/>
				<input type="button" value="查询json方式" onclick="queryItems_json()"/>
				<input type="button" value="查询keyvalue方式" onclick="queryItems_keyValue()"/>
				<input type="button" value="批量删除" onclick="deleteItems()"/>
			</td>
		</tr>
	</table>
	商品列表：
	<table width="100%" border=1>
		<tr>
			<td>选择</td>
			<td>商品名称</td>
			<td>商品价格</td>
			<td>生产日期</td>
			<td>商品描述</td>
			<td>操作</td>
		</tr>
		<c:forEach items="${itemsList }" var="item">
		<tr>	
			<td><input type="checkbox" name="items_id" value="${item.id}"/></td>
			<td>${item.name }</td>
			<td>${item.price }</td>
			<td><fmt:formatDate value="${item.createtime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
			<td>${item.detail }</td>
			
			<td><a href="${pageContext.request.contextPath }/items/editItemsRedirect.action?id=${item.id}">修改</a></td>
		
		</tr>
		</c:forEach>
	
	</table>
	</form>
</body>

</html>