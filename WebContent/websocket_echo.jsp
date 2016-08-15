<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>echo</title>
    <script type="text/javascript">
    	var ws = null;//一个ws代表一个管道
    	function setConnected(connected) {
            document.getElementById('echo').disabled = !connected;
        }
    	function connect() {
            var target = "ws://localhost:8080/springmvc/websocket/echo";
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
            // 注册onopen事件
           ws.onopen = function () {
           		setConnected(true);
                alert('Info: WebSocket connection opened.');
            };
            // 注册onmessage事件
            ws.onmessage = function (event) {
                alert('Received: ' + event.data);
            };
            // 注册onclose事件
            ws.onclose = function () {
                alert('Info: WebSocket connection closed.');
            };
        }
        function echo() {
            if (ws != null) {
                var message = document.getElementById('message').value;
                alert('Sent: ' + message);
                ws.send(message);
            } else {
                alert('WebSocket connection not established, please connect.');
            }
        }
    </script>
  </head>
  
  <body>
 	 <button id="connect" onclick="connect();">Connect</button>
 	 <button id="echo" onclick="echo();" disabled="disabled">Echo message</button>
 	 <textarea id="message" style="width: 350px">Here is a message!</textarea>
  </body>
</html>
