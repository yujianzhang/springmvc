<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>图片</title>
</head>
<body> 

<c:if test="${watermark.pic !=null}">
				<!-- 
					配置的tomcat虚拟路径 
					server.xml文件：
					<Context docBase="F:\develop\upload\temp" path="/pic" reloadable="false"/>
				-->
				<img src="/pic/${watermark.pic}" width=100 height=100/>
				<br/>
</c:if>

</body>

</html>