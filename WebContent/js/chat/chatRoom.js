var ws = null;//一个ws代表一个管道
var target = "ws://localhost:8080/springmvc/websocket/chat?username="+username;
function send(){
	var value= $("#msg").val();
	ws.send(value);
}
var chat = {
		loadChatRoomPage : function(){
            if (target == '') {
                alert('Please select server side connection implementation.');
                return;
            }
            if ('WebSocket' in window) {
                ws = new WebSocket(target);
            } else if ('MozWebSocket' in window) {
                ws = new MozWebSocket(target);
            } else {
                alert('WebSocket is not supported by this browser.');
                return;
            }
            ws.onmessage=function(event){
    			eval("var result="+event.data);
    			
    			if(result.alert!=undefined){
    				$("#content").append(result.alert+"<br/>");
    			}
    			
    			if(result.names!=undefined){
    				$("#userList").html("");
    				$(result.names).each(function(){
    					$("#userList").append(this+"<br/>");
    				});
    			}
    			
    			if(result.from!=undefined){
    				$("#content").append(result.from+" "+result.date+
    						" 说：<br/>"+result.sendMsg+"<br/>");
    			}
    			
    		 };
		}
}