<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>图片</title>
<style>
*{margin:0;padding:0;font-size:12px}
ul,ol{list-style-type:none}
#show{background:white;height:180px;width:180px;position:relative;overflow:hidden;text-align:center}
#show h2{position:absolute;height:50px;text-align:center;line-height:50px;width:100%;opacity:0.5;background:black;color:white;left:0;bottom:0}
</style>

<script>
function go(){
	var t,tt;
	var _div=document.getElementById("show");
	var obj=_div.getElementsByTagName('h2')[0];
	obj.style.bottom="-50px";
	var change=function(){
		var obj_h=parseInt(obj.style.bottom);
		if(obj_h<0){obj.style.bottom=(obj_h+Math.floor((0-obj_h)*0.1))+"px"}//if
		else{clearInterval(t)}
	} 
	var back=function(){
		var obj_hh=parseInt(obj.style.bottom);
		if(obj_hh>-50){obj.style.bottom=(obj_hh+Math.floor((-50-obj_hh)*0.1))+"px"}
		else{clearInterval(tt)}
	}
 _div.onmouseover=function(){clearInterval(tt);t=setInterval(change,10);}
 _div.onmouseout=function(){clearInterval(t);tt=setInterval(back,10)}
}
window.onload=function(){
	go();
}
</script>

</head>
<body> 

<div id="show">
<h2>加水印</h2>
<c:if test="${watermark.pic !=null}">
	<img src="/pic/logo_${watermark.pic}" width=100 height=100/>
	<img src="/pic/${watermark.pic}" width=100 height=100/>
</c:if>
</div>
</body>

</html>