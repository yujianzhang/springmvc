<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/common/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
var username = '${sessionScope.username}';
</script>
<script type="text/javascript" src="${contextPath}/js/chat/chatRoom.js"></script>
<title>聊天室</title>
</head>
<body>
	<h3>欢迎 ${sessionScope.username } 使用本系统！！</h3>

	<div  id="content"  style="
		border: 1px solid black; width: 400px; height: 300px;
		float: left;
	"  ></div>
	<div  id="userList"  style="
		border: 1px solid black; width: 100px; height: 300px;
		float:left;
	"  ></div>

	<div  style="clear: both;" >
		<input id="msg"  /><button  onclick="send();"  >send</button>
	</div>
<a href="${contextPath}/items/queryItems">商品列表</a>
<script type="text/javascript">
	$(document).ready(function(){
		chat.loadChatRoomPage();
	});
</script>
</body>
</html>