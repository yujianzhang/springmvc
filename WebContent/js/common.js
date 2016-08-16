/**
 * @author wujinglei
 *
 */
Date.prototype.formatt = function(format){ 
var o = { 
"M+" : this.getMonth()+1, //month 
"d+" : this.getDate(), //day 
"h+" : this.getHours(), //hour 
"m+" : this.getMinutes(), //minute 
"s+" : this.getSeconds(), //second 
"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
"S" : this.getMilliseconds() //millisecond 
} 

if(/(y+)/.test(format)) { 
format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
} 

for(var k in o) { 
if(new RegExp("("+ k +")").test(format)) { 
format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
} 
} 
return format; 
} 

//验证导入的文件格式是否正确
jQuery.validator.addMethod("checkFile", function(value,element) {   
	var val = value.substring(value.lastIndexOf(".")+1)
	if(val!="xls" && val!="xlsx"){
        return false;
    }
	return true;
});

String.prototype.startWith=function(str){
    var reg=new RegExp("^"+str);
    return reg.test(this);
}

String.prototype.endWith=function(str){
    var reg=new RegExp(str+"$");
    return reg.test(this);
}

/**
 * jQuery.validator 验证手机号
 */
jQuery.validator.addMethod("isMobile", function(value, element) {
	var length = value.length;
	var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写手机号码");

var pathName = document.location.pathname;
	var index = pathName.substr(1).indexOf("/");
	var contextPath = pathName.substr(0,index+1);

	var cookie_openMenuId = $.cookies.get("openMenuId");
	if(!cookie_openMenuId){
		$.cookies.set("openMenuIds","");
	}
	
	var cookie_activeMenuId = $.cookies.get("activeMenuId");
	if(!cookie_activeMenuId){
		$.cookies.set("activeMenuId","");
	}
	//--START 处理modal出现幻影的问题
	$(document).on("hide.bs.modal",function(evt){
		$(evt.target).empty();
		$(evt.target).removeData("bs.modal");
	});
	$(document).on("hidden.bs.modal",function(evt){
		$(evt.target).empty();
		$(evt.target).removeData("bs.modal");
	});
	//--END
	/**
	 * 全局的ajax访问，处理ajax清求时sesion超时
	 * @author wujinglei
	 */
    $.ajaxSetup({ 
        contentType:"application/x-www-form-urlencoded;charset=utf-8", 
        complete:function(XMLHttpRequest,textStatus){ 
        	var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");
        	if(sessionstatus=="timeout"){ 
        		window.location.replace(contextPath + "/common/sessionOut"); 
        	} 
        } ,
        error: function (xhr, status, e){
//        	console.log(xhr,status);
//        	console.log(e);
        }
	});
	(function($){
	$.jgrid.extend({
	// 高亮指定rowId字体
		setRowHighlight : function (p) {
			if((typeof p=='string')&&p.constructor==String){
				p={rowId:p};
			}
			p = $.extend(true, {rowId:undefined,cls:"",css:{"color":"red"}}, p || {});
			return this.each(function() {
				var $t = this;
				if(!$t.grid) {return;}
				var $tr=$($(this).find("tr[id="+p.rowId+"]"));
				if(p.rowId&&p.css)
				$tr.css(p.css);
				if(p.rowId&&p.cls)
				$tr.addClass(cls);
			});
		},
		removeRowHighlight : function (p) {
			if((typeof p=='string')&&p.constructor==String){
				p={rowId:p};
			}
			p = $.extend(true, {rowId:undefined,cls:"",css:{"color":"#393939"}}, p || {});
			return this.each(function() {
				var $t = this;
				if(!$t.grid) {return;}
				var $tr=$($(this).find("tr[id="+p.rowId+"]"));
				if(p.rowId&&p.css)
				$tr.css(p.css);
				if(p.rowId&&p.cls)
				$tr.addClass(cls);
			});
		}
	});
	})(jQuery);
	/**
	 * 替换jqgrid的分页样式
	 * @author Leo.liu
	 */
	function updatePagerIcons(table) {
		var replacement = {
			'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
			'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
			'ui-icon-seek-next' : 'icon-angle-right bigger-140',
			'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
		};
		$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
			var icon = $(this);
			var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

			if ($class in replacement)
				icon.attr('class', 'ui-icon ' + replacement[$class]);
		})
	}
	
	function getLastMonthDay(year, month){
        var day = new Date(year,month,0);
        return day.format("yyyy-MM-dd");
     }  
	
	function getDateTimePicker(date){
		var d1=new Date(date.replace("-","/").replace("-","/"));
		var a=d1.valueOf();
		var h=6;      //h為小時數
		a=a-(h*3600*1000);  //可加可減
		a=new Date(a);
		var month = (a.getMonth()+1)+"";
		if(month.length==1){
			month = "0"+month;
		}
		var day = a.getDate()+"";
		if(day.length==1){
			day = "0"+day;
		}
		var hour = a.getHours()+"";
		if(hour.length==1){
			hour = "0"+hour;
		}
		var minutes = a.getMinutes()+"";
		if(minutes.length==1){
			minutes = "0"+minutes;
		}
		var seconds = a.getSeconds()+"";
		if(seconds.length==1){
			seconds = "0"+seconds;
		}
		var date=a.getFullYear()+'-'+month+'-'+day+' '
		date+=hour+':'+minutes+':'+seconds;
		return date;
	}
	
	/**
	 * 直接=指定列的值
	 * @param cellvalue
	 * @param options
	 * @param rowObject
	 * @returns
	 */
	function jqGridEqualsTo(cellvalue, options, rowObject){
		if (cellvalue||cellvalue==0){
			var targetName;
			if (typeof(options.colModel.formatoptions) != "undefined"){
				targetName = options.colModel.formatoptions.targetName;
			}
		}
		return rowObject[targetName];
	}
	
	/**
	 * 直接=指定列的值
	 * @param cellvalue
	 * @param options
	 * @param rowObject
	 * @returns
	 */
	function jqGridAnotherName(cellvalue, options, rowObject){
		if (typeof(options.colModel.formatoptions) != "undefined"){
			targetName = options.colModel.formatoptions.targetName;
		}
		return rowObject[targetName];
	}
	
	/**
	 * 计算账单月的显示
	 * @param cellvalue
	 * @param options
	 * @param rowObject
	 * @returns
	 */
	function billCalculationsValue(cellvalue, options, rowObject){
		if (cellvalue == '1'){
			return "未计算";
		}else if(cellvalue == '-1'){
			return "忽略计算";
		}else{
			return cellvalue;
		}
	}
	
	/**
	 * 取出隐藏列表中的数据
	 * @param cellvalue
	 * @param options
	 * @param rowObject
	 * @returns
	 */
	function getHideListValue(cellvalue, options, rowObject){
		if (cellvalue||cellvalue==0){
			var code;
			var targetName;
			if (typeof(options.colModel.formatoptions) != "undefined"){
				code = options.colModel.formatoptions.code;
				targetName = options.colModel.formatoptions.targetName;
			}
			var baseList = $("#hide-" + code);
			if (baseList){
				if (targetName){
					cellvalue = rowObject[targetName];
				}
				var text = $(baseList).find("#hide-" + cellvalue).html();
				if (text){
					return "<span data-id="+cellvalue+">"+text+"</span>";
				}else{
					return cellvalue;
				}
			}else{
				return cellvalue;
			}
		}else{
			return "";
		}
	}
	/**
	 * 取出隐藏数据字典的中的数据
	 * @param value
	 * @param code
	 * @returns
	 */
	function getHideDicListValue(value, code){
		if (value||value==0){
			var baseList = $("#hide-" + code);
			if (baseList){
				var text = $(baseList).find("#hide-" + value).html();
				if (text){
					return text;
				}else{
					return value;
				}
			}else{
				return value;
			}
		}else{
			return "";
		}
	}
	/**
	 * 表格中唯一号做link
	 * @param cellvalue
	 * @param options
	 * @param rowObject
	 * @returns
	 */
	function buildDetail(cellvalue, options, rowObject){
		if (cellvalue||cellvalue==0){
			var url;
			if (typeof(options.colModel.formatoptions) != "undefined"){
				url = options.colModel.formatoptions.url;
			}
			if (url){
				return "<a href='"+url+rowObject.id+"'>"+ cellvalue + "</a>";
			}else{
				return cellvalue;
			}
		}else{
			return "";
		}
	}
	
	/**
	 * 点击表格文字弹出框modal
	 * @author donghaikang
	 */
	function cellClick(cellvalue, options, rowObject){
			if (cellvalue||cellvalue==0){
					return "<a href='#' onclick='clickModal(\"" + rowObject.id + "\")'>"+ cellvalue + "</a>";
			}else{
				return "";
			}
	}

	/**
	 * 替换JQGRID的图标样式
	 * @author Leo.liu
	 */
	function aceSwitch( cellvalue, options, cell ) {
		setTimeout(function(){
			$(cell) .find('input[type=checkbox]')
					.wrap('<label class="inline" />')
				.addClass('ace ace-switch ace-switch-5')
				.after('<span class="lbl"></span>');
		}, 0);
	}
	
	Date.prototype.format =function(format){
		var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
		}
		if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
		(this.getFullYear()+"").substr(4- RegExp.$1.length));
		for(var k in o)if(new RegExp("("+ k +")").test(format))
		format = format.replace(RegExp.$1,
		RegExp.$1.length==1? o[k] :
		("00"+ o[k]).substr((""+ o[k]).length));
		return format;
	}
	
	//时间控件汉化
	$.fn.datepicker.dates['cn'] = {
		    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
		    daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
		    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
		    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		    today: "今天"
	};
	
	function dateFormatter(cellvalue, options, rowObject) {
//		console.log(typeof(cellvalue));
		if(typeof(cellvalue) ==  'string'  )return cellvalue;
		var dateFormat;
		if (typeof(options.colModel.formatoptions) != "undefined"){
			dateFormat = options.colModel.formatoptions.dateFormat;
		}
		var returnValue = "";
		if (cellvalue){
			var dateValue = new Date(cellvalue);
			if (dateFormat){
				returnValue = dateValue.format(dateFormat);
			}else{
				returnValue = dateValue.format("yyyy-MM-dd hh:mm:ss");
			}
		}
		return returnValue;
	}
	
	function statusChange(cellvalue, options, rowObject) {
		var statusCn = '';
		if ($.trim(cellvalue).length > 0) { // 判断元素是否为空
			if (cellvalue == 1) {
				statusCn = '有效';
			} else {
				statusCn = '<font color="red">无效</font>';
			}
		} else {
			statusCn = '<font color="red">无效</font>';
		}
		return statusCn;
	}
	
	String.prototype.endWith=function(str){
		if(str==null||str==""||this.length==0||str.length>this.length)
		  return false;
		if(this.substring(this.length-str.length)==str)
		  return true;
		else
		  return false;
		return true;
	};
	
	//获取数字格式
	function getNumber(obj){
	   if (obj==null) return 0;
	   if (!checkFloat(obj)||obj+""==""){
	    return 0;
	   }else{
	        return parseFloat(""+obj);
	   }
	}
	//检查输入参数是否为浮点数
	function checkFloat(str){
	    var rc=true;
	    oneDecimal=false;
	    if (str+"" == "undefined" || str == null || str==''){
	    	rc=false;
		} else{
		    for(i=0;i<str.length;i++){
		        ch=str.charAt(i);
		        if(i==0 && ch=='-'){
		            continue;
		        }
		        if(ch=="." && !oneDecimal){
		        oneDecimal=true;
		            continue;
		        }
		        if(ch==","){
		            continue;
		        }
		        if ((ch< "0") || (ch >'9')){
	                rc=false;
	                break;
	            }
	        }
	    }
	    return rc;
	}
	
	//201407的校验
	jQuery.validator.addMethod("yyyymm", function(value, element) {
		  return this.optional(element) ||  /^(\d{4})(0\d{1}|1[0-2])$/.test(value);
	});
	
	//小于
	jQuery.validator.addMethod("lt", function(value, element,param) {
		var isremark = true;
		if(value > $(param).val()){
			isremark = false;
		}
		return isremark;
		
	});
	
	//大于
	jQuery.validator.addMethod("gt", function(value, element,param) {
		var isremark = true;
		if(value < $(param).val()){
			isremark = false;
		}
		return isremark;
		
	});
	
	var CommUtils = {
		//取Jqgrid的选中checkbox中的值 
		getJqgridSelected : function(elementId){
			var ids = [];
			var checkboxs = $(document.getElementById(elementId)).find("input[type=checkbox].ace:checked");
			$.each(checkboxs, function (index, element) {
				ids.push($(element).val());
			});
			if (ids.length == 0){
				var radios = $(document.getElementById(elementId)).find("input[type=radio].ace:checked");
				$.each(radios, function (index, element) {
					ids.push($(element).val());
				});
			}
			return ids;
		},
		
		//取Jqgrid的可用checkbox中的值 
		getJqgridEnable : function(elementId){
			var ids = [];
			var checkboxs = $(document.getElementById(elementId)).find("input[type=checkbox].ace").not("input[type=checkbox].ace:disabled");
			$.each(checkboxs, function (index, element) {
				ids.push($(element).val());
			});
			if (ids.length == 0){
				var radios = $(document.getElementById(elementId)).find("input[type=radio].ace").not("input[type=radio].ace:disabled");
				$.each(radios, function (index, element) {
					ids.push($(element).val());
				});
			}
			return ids;
		},
		
		commAlert : function(modalId,msg){
			$(document.getElementById(modalId)).load(contextPath + "/common/alert.jsp",{msg:msg,seconds:'3000',tips:''},'');
		},
		
		commErrorAlert : function(modalId,msg){
			$(document.getElementById(modalId)).load(contextPath + "/common/errorAlert.jsp",
					{	
						msg:msg,
						seconds:'',
						tips:''
					},'');
		},
		
		commConfrim: function (modalId,msg,exec,callBack){
			$(document.getElementById(modalId)).load(contextPath + "/common/confrimRequest.jsp",
					{msg:msg,
					 modalId:modalId,
					 seconds:'0',
					 exec:exec,
					 callBack:callBack}
					,''
			);
		},
		commConfrim1: function (modalId,msg,exec,callBack){
			$(document.getElementById(modalId)).load(contextPath + "/common/confrimRequest1.jsp",
					{msg:msg,
					 modalId:modalId,
					 seconds:'0',
					 exec:exec,
					 callBack:callBack}
					,''
			);
		},
		commConfrim2: function (modalId,msg,exec,callBack){
			$(document.getElementById(modalId)).load(contextPath + "/common/confrimRequest2.jsp",
					{msg:msg,
				modalId:modalId,
				seconds:'0',
				exec:exec,
				callBack:callBack}
			,''
			);
		},
		
		commDelete : function (options){
			options.delIds = options.delIds.join(",");    
			if (!options.gridTableId){
				options.gridTableId = "grid-table";
			}
			if (!options.url){
				options.url = "delete";
			}
			$(document.getElementById(options.modalId)).load(contextPath + "/common/deleteRequest.jsp",
					{msg:options.msg,
					 delIds:options.delIds,
					 modalId:options.modalId,
					 treeId:options.treeId,
					 gridTableId:options.gridTableId,
					 deleteUrl:options.url,
					 seconds:'3000',
					 tips:''}
					,''
			);
		},
		
		commConfrimIds : function (options){
			options.delIds = options.delIds.join(",");    
			if (!options.gridTableId){
				options.gridTableId = "grid-table";
			}
			if (!options.url){
				options.url = "delete";
			}
			$(document.getElementById(options.modalId)).load(contextPath + "/common/confrimIdsRequest.jsp",
					{msg:options.msg,
					 delIds:options.delIds,
					 modalId:options.modalId,
					 treeId:options.treeId,
					 gridTableId:options.gridTableId,
					 deleteUrl:options.url,
					 seconds:'3000',
					 tips:''}
					,''
			);
		},
		changeConfrim : function (options){
			
			$(document.getElementById(options.modalId)).load(contextPath + "/common/changeConfrimRequest.jsp",
					{msg:options.msg,
					 modalId:options.modalId,
					 clickId:options.clickId,
					 tips:''}
					,''
			);
		},
		
		
		commRefreshTree : function (elementId){
			$(document.getElementById(elementId)).jstree("refresh");
		},
		
		messageWarn : function(modalId,msg){
			$(document.getElementById(modalId)).load(contextPath + "/common/messageWarn.jsp",{msg:msg,seconds:'0',tips:''},'');
		},
		
		//hide and show search more
		//wujinglei
		//2014-04-22
		//点击后收缩效果（更多）
		activateSearchMore : function(){
			$(".search-more").click(function(){
				var nextShow = true;
				if ($(".search-more i").attr("class") == "icon-chevron-up"){
					nextShow = false;
				}
				if (nextShow){
					$(".search-more i").attr("class","icon-chevron-up");
					$("#search_more_tip").html("收起");
					$(".search-hide").slideDown(150);
				}else{
					$(".search-more i").attr("class","icon-chevron-down");
					$("#search_more_tip").html("更多");
					$(".search-hide").slideUp(150);
				}
			});
		},
		//省市联动下拉框选择
		initSearchCity:function() {			
			var option1 = '';
			$.getJSON(contextPath+"/system/org/getAllCity",function(tt) {
				var jsonData = $.parseJSON(tt.result);
				$.each(jsonData, function(index, indexItems) {
					option1 += "<option value=" + indexItems.id + ">"+ indexItems.name + "</option>";
				});
				$("#proviceId").append(option1);
				$("#proviceId").bind("change", function() {
				    //selectCity(jsonData);
					var option2 = '';
					var selectedIndex = $("#proviceId :selected").val();
					  
					$("#cityId").empty();
					if($("#proviceId :selected").val() == -1){
						$("#cityId").append("<option value=\"-1\">请选择城市</option>");
					}
					$.each(jsonData, function(index, indexItems) {
						var proName = indexItems.name;
						$.each(indexItems.items, function(index, indexItems) {
						    if (indexItems.superId != selectedIndex) {
						    	return;
						    } else {
						    	  option2 += "<option value=" + indexItems.id + ">"+ indexItems.name + "</option>";
						    }
						});
					});
					$("#cityId").append(option2);
					
					$("#cityId").trigger("change");
				});
			  
				if($("#proviceId").attr("data-value")){
					$("#proviceId").val($("#proviceId").attr("data-value"));
					var option2 = '';
					var selectedIndex = $("#proviceId :selected").val();
					  
					$("#cityId").empty();
					if($("#proviceId :selected").val() == -1){
						$("#cityId").append("<option value=\"-1\">请选择城市</option>");
					}
					$.each(jsonData, function(index, indexItems) {
						var proName = indexItems.name;
						$.each(indexItems.items, function(index, indexItems) {
							if (indexItems.superId != selectedIndex) {
								  return;
							} else {
								  option2 += "<option value=" + indexItems.id + ">"+ indexItems.name + "</option>";
							}
						});
					});
					$("#cityId").append(option2);
					$("#cityId").val($("#cityId").attr("data-value"));
				 }
			 
			});
			 
			function selectCity(data) {
			  
			};
		},
		
		
		//城市下拉列表
		initSearchCityToCache:function() {	
			$.ajax({
				type:'POST',
				url: contextPath + '/system/city/citySelect',
				dataType:'json',
				data:{type:'2'},
				success:function(json){
					$("#input_citySelect1").select2({
						placeholder: "选择城市",
						allowClear: true,
						data:json,
						formatResult: function(city){
							var level = parseInt(city.level) - 1;
							var showStr = "";
							if (level == 0){
								showStr += "<B>";
							}else if(level == 2){
								showStr += "<I>";
							}
							for (var i = 0; i < level; i++) {
								showStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
							}
							showStr += city.text;
							if (level == 0){
								showStr += "</B>";
							}else if(level == 2){
								showStr += "</I>";
							}
							return showStr;
						},
						formatSelection: function(data){
							$("#cityId").val(data.id);
							//$("#input_cityName").val(data.text);
							return data.text;
						},  
						matcher : function(term, text, option){
							if(option && option.level == '2') {
								return text.toUpperCase().indexOf(term.toUpperCase())>=0 || option.pinyin.toUpperCase().indexOf(term.toUpperCase())>=0 ; 
							}
						},
						formatNoMatches: function(){
							return "没有匹配的选项";
						}
					});
				}
			});
			
			$("#input_citySelect1").on('select2-selecting', function(e) {
				if(e.object.level == 1) {
					e.preventDefault();
				}
			});
		},

        drawPie: function(placeholder, data, position){
            function drawPieChart(placeholder, data, position) {
                $.plot(placeholder, data, {
                    series: {
                        pie: {
                            show: true,
                            tilt:0.8,
                            highlight: {
                                opacity: 0.25
                            },
                            stroke: {
                                color: '#fff',
                                width: 2
                            },
                            startAngle: 2
                        }
                    },
                    legend: {
                        show: true,
                        position: position || "ne",
                        labelBoxBorderColor: null,
                        margin:[-30,15]
                    }
                    ,
                    grid: {
                        hoverable: true,
                        clickable: true
                    }
                })
            }
            drawPieChart(placeholder, data);

            placeholder.data('chart', data);
            placeholder.data('draw', drawPieChart);

            var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
            var previousPoint = null;

            placeholder.on('plothover', function (event, pos, item) {
                if(item) {
                    if (previousPoint != item.seriesIndex) {
                        previousPoint = item.seriesIndex;
                        var tip = item.series['label'] + " : " + item.series['percent']+'%';
                        $tooltip.show().children(0).text(tip);
                    }
                    $tooltip.css({top:pos.pageY + 10, left:pos.pageX + 10});
                } else {
                    $tooltip.hide();
                    previousPoint = null;
                }
            });
        },

        /*
         * 得到随机颜色
         */
        getRandomColor: function(){
            return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
        }
	};
	
	
	

	function viewObject(s){
		var strs = '';
		for(var p in s){
			strs +=(p + '===' + s[p] + '\n');
		}
		alert(strs);
		return strs;
	}
	
	
	/*
	 * 以下代码为验证身份证
	 */
	var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子   
	var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X   
	function IdCardValidate(idCard) { 
	    idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格           
	    if (idCard.length == 15) {   
	        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
	    } else if (idCard.length == 18) {   
	        var a_idCard = idCard.split("");                // 得到身份证数组   
	        if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证
	            return true;   
	        }else {   
	            return false;   
	        }   
	    } else {   
	        return false;   
	    }   
	}   
	/**  
	 * 判断身份证号码为18位时最后的验证位是否正确  
	 * @param a_idCard 身份证号码数组  
	 * @return  
	 */  
	function isTrueValidateCodeBy18IdCard(a_idCard) {   
	    var sum = 0;                             // 声明加权求和变量   
	    if (a_idCard[17].toLowerCase() == 'x') {   
	        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
	    }   
	    for ( var i = 0; i < 17; i++) {   
	        sum += Wi[i] * a_idCard[i];            // 加权求和   
	    }   
	    valCodePosition = sum % 11;                // 得到验证码所位置   
	    if (a_idCard[17] == ValideCode[valCodePosition]) {   
	        return true;   
	    } else {   
	        return false;   
	    }   
	}   
	/**  
	  * 验证18位数身份证号码中的生日是否是有效生日  
	  * @param idCard 18位书身份证字符串  
	  * @return  
	  */  
	function isValidityBrithBy18IdCard(idCard18){   
	    var year =  idCard18.substring(6,10);   
	    var month = idCard18.substring(10,12);   
	    var day = idCard18.substring(12,14);   
	    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
	    // 这里用getFullYear()获取年份，避免千年虫问题   
	    if(temp_date.getFullYear()!=parseFloat(year)   
	          ||temp_date.getMonth()!=parseFloat(month)-1   
	          ||temp_date.getDate()!=parseFloat(day)){   
	            return false;   
	    }else{   
	        return true;   
	    }   
	}   
    /**  
     * 验证15位数身份证号码中的生日是否是有效生日  
     * @param idCard15 15位书身份证字符串  
     * @return  
     */  
    function isValidityBrithBy15IdCard(idCard15){   
        var year =  idCard15.substring(6,8);   
        var month = idCard15.substring(8,10);   
        var day = idCard15.substring(10,12);   
        var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
        // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
        if(temp_date.getYear()!=parseFloat(year)   
                ||temp_date.getMonth()!=parseFloat(month)-1   
                ||temp_date.getDate()!=parseFloat(day)){   
                  return false;   
          }else{   
              return true;   
          }   
    }   
    //去掉字符串头尾空格   
    function trim(str) {   
        return str.replace(/(^\s*)|(\s*$)/g, "");   
    } 
	   
	//自定义表单验证身份证的方法，参数param为证件类型
	jQuery.validator.addMethod("checkIdCard", function(value, element,param) {
		var isIDCard = true;
		//如果是身份证，则需要验证
		if($(param.type).val()=='1'){
			isIDCard=IdCardValidate(value);
		}
		return isIDCard;
		
	});
	
	jQuery.validator.addMethod("checkEmpCode", function(value, element) {
		var isEmpCode = true;
		if(value!=null && value!=''){
			//如果唯一号不为空，则需要验证必须为六位或七位的数字
			var reg = new RegExp("^[0-9]{6,7}$");
			if(!reg.test(value)){
				isEmpCode=false;
			}
		}
		return isEmpCode;
		
	});
	
	//15位身份证转为18位身份证
	function conv_id(x){
		if (x.match(/[^0-9]/)) return '';
		var s="0",i,r;
		var id_w=new Array (0,2,4,8,5,10,9,7,3,6,1,2,4,8,5,10,9,7);
		var id_c=new Array ('1','0','X','9','8','7','6','5','4','3','2');
		s=x.substr(0,6);//地区
		s+='19'+x.substr(6,6);//年月日
		s+=x.substr(12,3);//县内编码
		r=0;
		for (i=0;i<17;i++) r+=(s.charCodeAt(i)-48)*id_w[17-i];
		r=id_c[r % 11];
		return s+r;
	}
	
	  //获得date这个日期在n(n小于12)个月前的日期：如date='2015-04-05',n=6,则返回'2014-10-05'
	  function getLastNMonthdy(date,n){
	     var daysInMonth = new Array([0],[31],[28],[31],[30],[31],[30],[31],[31],[30],[31],[30],[31]);   
	     var strYear = date.getFullYear();     
	     var strDay = date.getDate();     
	     var strMonth = date.getMonth()+1;   
	     if(strYear%4 == 0 && strYear%100 != 0){   
	        daysInMonth[2] = 29;   
	     }   
	     if(strMonth - n <= 0)   
	     {   
	        strYear -= 1;   
	        strMonth = strMonth+12-n;   
	     }   
	     else  
	     {   
	        strMonth -= n;   
	     }   
	     strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];   
	     if(strMonth<10)     
	     {     
	        strMonth="0"+strMonth;     
	     }   
	     if(strDay<10)     
	     {     
	        strDay="0"+strDay;     
	     }   
	     datastr = strYear+"-"+strMonth+"-"+strDay;   
	     return datastr;   
	  }   
	  
	  //日期字符串转成日期对象，参数格式为yyyy-MM-dd
	  function stringToDate(input_date){
		 return new Date(input_date.replace(/\-/g,"/"));
	  }
	  
	//根据入职日期，自动计算产品收费开始日期：
	//如：输入2014-04-09，返回2014-04-01
	//   输入2014-04-25，返回2014-05-01
    function tostartDate(input_date){
        var date=input_date.split('-');
        var sf_start='';
        
        //收费起始日期
        if(date[2]<'16'){//上半月
            sf_start=date[0]+'-'+date[1]+'-01';
        }else{//下半月
            //12月
            if(date[1]=='12'){
                var year=parseInt(date[0])+1;
                sf_start=year+'-01-01';
            }else{
                //1~9月
                if(date[1].substr(0,1)=='0'){
                    var mon=parseInt(date[1].substr(1,1))+1;
                    if(mon<10){
                        sf_start=date[0]+'-0'+mon+'-01';
                    }else{
                        sf_start=date[0]+'-'+mon+'-01';
                    }
                }else{//10~11月
                    var mon=parseInt(date[1])+1;
                    sf_start=date[0]+'-'+mon+'-01';
                }
            }
        }
        
        return sf_start;
    
    }
    
    function yearmonthToDate(yearmonth){
    	if(yearmonth.length!=6){
    		return yearmonth
    	}else{
    		var year1 = yearmonth.substr(0,4);
    		var month1 = yearmonth.substr(4,2);
    		
    		return year1+"-"+month1+"-01";
    	}
    }
    
    // yangxu 
    //根据入职日期，自动计算产品收费end日期：
    //如：输入2014-04-09，返回2014-03-31
    //   输入2014-04-25，返回2014-04-30
    function toEndDate(input_date){
    	var date = new Date(input_date);
    	var sf_end='';
    	if(date.getDate()<16){//上半月
    		date.setDate(0);
    	}else{//下半月
			//date.setDate(0);
//    		date.setMonth(date.getMonth()+1);
    		date = new Date(1900+date.getYear(), date.getMonth()+1, 0);
    	}
    	sf_end = date2str(date);
    	return sf_end;
    }
    function date2str(d){
    	var datestr = '';
    	if((d.getMonth()+1)<10){
    		datestr = d.getFullYear()+"-0"+(d.getMonth()+1)+"-"+d.getDate();
    	}else{
    		datestr = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    	}
    	return datestr;
    }
    //获得前一天
    function getLastDay(input_date){
    	var   today=new   Date(input_date);
        var   yesterday_milliseconds=today.getTime()-1000*60*60*24;      
        var   yesterday=new   Date();      
        yesterday.setTime(yesterday_milliseconds);      
           
        var strYear=yesterday.getFullYear();   
        var strDay=yesterday.getDate();   
        var strMonth=yesterday.getMonth()+1;   
        if(strMonth<10)   
        {   
            strMonth="0"+strMonth;   
        }   
        var strYesterday=strYear+"-"+strMonth+"-"+strDay;   
        return strYesterday;
    }
    //获得该日期的最后一天
    function getLastDate(input_date){
    	var   today=new   Date(input_date);
       
        var strYear=today.getFullYear();
        var strMonth=today.getMonth()+1;   
        if(strMonth<10)   
        {   
            strMonth="0"+strMonth;   
        }
        return getLastMonthDay(strYear,strMonth);
    }

/**
 * jQuery.validator 默认消息
 */
jQuery.extend(jQuery.validator.messages, {
	  required: "必填字段",
	  remote: "请修正该字段",
	  email: "请输入正确格式的电子邮件",
	  url: "请输入合法的网址",
	  date: "请输入合法的日期",
	  dateISO: "请输入合法的日期 (ISO).",
	  number: "请输入合法的数字",
	  digits: "只能输入整数",
	  creditcard: "请输入合法的信用卡号",
	  equalTo: "请再次输入相同的值",
	  accept: "请输入拥有合法后缀名的字符串",
//	  maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
	  maxlength: jQuery.validator.format("长度最多是 {0} "),
	  minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
	  rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
	  range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
	  max: jQuery.validator.format("请输入一个最大为{0} 的值"),
	  min: jQuery.validator.format("请输入一个最小为{0} 的值")
	});

/**计算社保产品金额
base 基数 ratio 比例 addMoney 附加金额 iPrecise 精确值 iCarry 进位方式
**/
function calInsurance(base,ratio,addMoney,iPrecisePara,iCarryPara){
     var iPrecise=""+iPrecisePara;
     var iCarry=""+iCarryPara; 
     if (iPrecise=="") iPrecise="2";
     if (iCarry=="") iCarry="1";
     var anMoney=floatRound(base*ratio,5);
     if(parseFloat(iPrecise)<=2){//小数位小于等于2位，不是精确值  
       if(iCarry=="1"){//四舍五入
           }else if(iCarry=="2"){//先四舍五入再见零进整
                 var extStr="0.";
             for(var i=0;i<parseFloat(iPrecise);i++){
                extStr=extStr+"0";
             }
             extStr=extStr+"4";
             var extDouble=parseFloat(extStr);
                 anMoney=anMoney+extDouble;
           }else if(iCarry=="3"){//见零进整
               var tmpMoney=anMoney+"";
               var dotPos=tmpMoney.indexOf(".");
               if (dotPos>=0){//有小数点
                   var preMoney=tmpMoney.substring(0,dotPos+1+parseFloat(iPrecise))+"0";
                   tmpMoney=tmpMoney.substring(dotPos+1+parseFloat(iPrecise));
                   if (tmpMoney!=""){
                       if (parseFloat(tmpMoney)>0){//需要见零进位
                           anMoney=parseFloat(preMoney)+Math.pow(10,-1*parseFloat(iPrecise));       
                       }   
                   }   
               }
           }
           anMoney=floatRound(anMoney,parseFloat(iPrecise));               
           
     }else{  //小数位大于2位，是精确值 
               anMoney=floatRound(anMoney,parseFloat(iPrecise));
     }
     return anMoney+addMoney;
}

//具体页面中计算,入离职用到(陈小佩重新修改)
function calculateInsurance(base,ratio,addMoney,precision,caculateType){
	var addmm = 0;
	if(addMoney!=null && addMoney!=''){
		addmm=parseFloat(addMoney);
 	}
    //计算金额金额   
    if (ratio>=0||addmm>0){
       if (ratio>=0 && base<=0){
    	   return false;
       }else{
   	  
    	   var money=calInsurance(base,ratio,addmm,precision,caculateType);

    	   return money;
       }
     
    }else{
    	return false;
    }
  
}

//四舍五入
function floatRound(myFloat,mfNumber){ 
  if ( mfNumber == 0 ) {
    return Math.round(myFloat); 
  } else { 
    var cutNumber = Math.pow(10,mfNumber); 
    return Math.round((myFloat+0.000000000001) * cutNumber)/cutNumber; 
  } 
}

//jqgrid代码继承
function createGrid(id,option){
	var options = $.extend(true, defaultGridOptions, option);
	jQuery(id).jqGrid(options);
}

var defaultGridOptions = {
		url : 'list',
		datatype : 'json',
		mtype : "POST",
		height : "100%",
		rownumbers: true,
		rownumWidth:30,
		colNames : null,
		colModel : null,
		viewrecords : true,
		rowNum:10,
		rowList:[10,20,30],
		pager : "#grid-pager",
		multiselect: false,
	    multiboxonly: false,
		altRows: true,
		autowidth: true,
		autoScroll: false,
		caption : "用户列表",
		jsonReader : {   
		  root:"result",
		  total:'totalPages',
		  page:'page',
		  records:'records'   
		},
		loadComplete : function() {
			var table = this;
			funcModifyIcons(table);
		}
	};

	function funcAddCheckBox(eTable) {
		var ids = jQuery(eTable).jqGrid('getDataIDs');
		for (var i = 0; i < ids.length; i++) {
			var cl = ids[i];
			checkbox = "<label><input name=\"grid-checkbox\" value=\"" + cl + "\"type=\"checkbox\" class=\"ace\"><span class=\"lbl\"></span></label>";
			jQuery(eTable).jqGrid('setRowData', ids[i], {
				action : checkbox
			});
		}
	}

	function funcGridResize(eTable,option){
	var option =$.extend(true,{a:'.page-content',b:'.ui-jqgrid-bdiv',c:'.main-content .col-xs-12',d:'.ui-jqgrid-bdiv'},option);
		/**
		 * 窗口缩放时，经动态变化宽度
		 */
		$(window).resize(function(){ 
			var winwidth=$(option.a).width(); 	//当前页面的宽度
			$(eTable).setGridWidth(winwidth);
			$(eTable).find(option.b).css('width',winwidth+1);
		});
		
		/**
		 * 点击菜单边框收缩菜单时，动态变化表格宽度
		 */
		$('#sidebar-collapse').click(function(){
			var winwidth=$(option.c).width(); 	//当前窗口中，一行的宽度
			$(eTable).setGridWidth(winwidth);
			$(eTable).find(option.d).css('width',winwidth+1);
		});
	}

	function funcGridComplete() {
		funcAddCheckBox(this);
		funcGridResize(this);
	}
	function funcModifyIcons(eTable) {
		setTimeout(function() {
			updatePagerIcons(eTable);
		}, 0);
	}
	function funcGridCompResize(){
		funcGridResize(this);
//		$(this).setGridWidth("1117px");
	}
	/**
	 *生成客户下拉框
	 * 1、元素 2、ajax参数 3、下拉框参数
	 */
	function generateSelection4Customer(el,ajaxOptions,selectOptions){
		var selectOptions=$.extend(true,{
			placeholder: "选择客户",
			allowClear: true,
			formatResult:function(item){
				var showStr="["+item.customerCode+"]"+item.text+"";
				return showStr;
			},
			matcher : function(term, text, option){
				return text.toUpperCase().indexOf(term.toUpperCase())>=0 || option.customerCode.toUpperCase().indexOf(term.toUpperCase())>=0 ; 
			},
			formatSelection: function(data){
				return data.text;
			},  
			formatNoMatches: function(){
				return "没有匹配的选项";
			}
		},selectOptions);
		var ajaxOptions=$.extend(true,{type:'post',url:contextPath + '/customer/customerSelect',data:{},dataType:'json'},ajaxOptions);
		ajaxOptions=$.extend(true,ajaxOptions,{success:function(json){
		selectOptions.data=json;
		$(el).select2(selectOptions);
		}});
		$.ajax(ajaxOptions);
		return $(el);
}
	/**
	 *生成客户下拉框
	 * 1、元素 2、ajax参数 3、下拉框参数
	 */
	function generateSelection4Agent(el,ajaxOptions,selectOptions){
		var selectOptions=$.extend(true,{
			placeholder: "选择供应商",
			allowClear: true,
			formatResult:function(item){
				var showStr="["+item.agentCode+"]"+item.text+"";
				return showStr;
			},
			matcher : function(term, text, option){
				return text.toUpperCase().indexOf(term.toUpperCase())>=0 || option.agentCode.toUpperCase().indexOf(term.toUpperCase())>=0 ; 
			},
			formatSelection: function(data){
				return data.text;
			},  
			formatNoMatches: function(){
				return "没有匹配的选项";
			}
		},selectOptions);
//		var ajaxOptions=$.extend(true,{type:'post',url:contextPath + '/customeragent/agent/agentSelect',data:{},dataType:'json'},ajaxOptions);
		var ajaxOptions=$.extend(true,{type:'post',url:contextPath + '/customeragent/agent/agentSelect2/db',data:{},dataType:'json'},ajaxOptions);
		ajaxOptions=$.extend(true,ajaxOptions,{success:function(json){
		selectOptions.data=json;
		$(el).select2(selectOptions);
		}});
		$.ajax(ajaxOptions);
		return $(el);
}

function generateSelect2ForCity(select2_id,selectOptions){
	//城市下拉列表 start
	var selectOptions=$.extend(true,{

		placeholder: "请选择",
		formatResult: function(city){
			var level = parseInt(city.level) - 1;
			var showStr = "";
			if (level == 0){
				showStr += "<B>";
				
			}else if(level == 2){
				showStr += "<I>";
				
			}
			for (var i = 0; i < level; i++) {
				showStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			}
			showStr += city.text;
			if (level == 0){
				showStr += "</B>";
			}else if(level == 2){
				showStr += "</I>";
			}
			return showStr;
		},
		formatSelection: function(data){
			return data.text;
		},
		matcher : function(term, text, option){
			return text.toUpperCase().indexOf(term.toUpperCase())>=0 || option.pinyin.toUpperCase().indexOf(term.toUpperCase())>=0 ; 
		},
		formatNoMatches: function(){
			return "没有匹配的选项";
		}
	},selectOptions);
	
	
	$.ajax({
		type:'POST',
		url: contextPath + '/system/city/citySelect',
		dataType:'json',
		data:{type:'2'},
		success:function(json){
			
			selectOptions.data=json;
			$(select2_id).select2(selectOptions);
			$(select2_id).on('select2-selecting', function(e) {
				if(e.object.level == 1) {
					e.preventDefault();
				}
			});
		}
	});
	//城市下拉列表 end
}
	
function generateSelect2ForUsersByRoleCode(select2_id, role_code){
	//负责人下拉列表
	$.ajax({
		type:'POST',
		url: contextPath + '/system/user/select2/byRoleCode',
		dataType:'json',
		async:false,
		data:{roleCode:role_code},
		success:function(json){
			if(json.length>0){
				$("#input_hidden").val(json[0].id);
			}
			$(select2_id).select2({
				placeholder: "选择负责人",
				data:json,
				formatSelection: function(data){
					return data.text;
				},
				formatNoMatches: function(){
					return "没有匹配的选项";
				}
			});
		}
	});
	//新增时需要默认选中一个值时（在input页面增加input_hidden标签，修改时，值不变）
	if($(select2_id).val()==null || $(select2_id).val()==""){
		if ($("#input_hidden").val()){
			$(select2_id).val($("#input_hidden").val()).trigger("change");
		}
	}
}
	//公共调用方法
function MergerGridCell(gridName, CellName) {
	//得到显示到界面的id集合
	var mya = $("#" + gridName + "").getDataIDs();
	//当前显示多少条
	var length = mya.length;
	for (var i = 0; i < length; i++) {
		//从上到下获取一条信息
		var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]);
		//定义合并行数
		var rowSpanTaxCount = 1;
		for (j = i + 1; j <= length; j++) {
			//和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
			var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]);
			if (before[CellName] == end[CellName]) {
				rowSpanTaxCount++;
				$("#" + gridName + "").setCell(mya[j], CellName, '', { display: 'none' });
			} else {
				rowSpanTaxCount = 1;
				break;
			}
			$("#" + CellName + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount);
		}
	}
}
function getSelectionByGrid4Edit(ele,editCols){
	//获取选中行ID
	var rowIds = CommUtils.getJqgridSelected(ele.replace("#",""));
	var selectRows=[];//存储需要处理的数据
	for(var i=0;i<rowIds.length;i++){
		var _rid=rowIds[i];
		var rowData = $(ele).jqGrid('getRowData',_rid);
		selectRows.push(rowData);
	}
	return selectRows;
}

function bodyHeight(){
	var wh = $(document).height();
	var hh = $(document.head).height();
	var bh = parseInt(wh)-parseInt(hh);
	$(".main-container").css("minHeight",bh);
}
//转换日期格式 
function parseISO8601(dateStringInRange) { 
    var isoExp = /^s*(d{4})-(dd)-(dd)s*$/, 
        date = new Date(NaN), month, 
        parts = isoExp.exec(dateStringInRange); 
 
    if(parts) { 
      month = +parts[2]; 
      date.setFullYear(parts[1], month - 1, parts[3]); 
      if(month != date.getMonth() + 1) { 
        date.setTime(NaN); 
      } 
    } 
    return date; 
} 
function getURLQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
    }
function getObjectByForm(idStr){
	var _param={};
	var json = $(idStr).serialize();
	json = json.replace(/\+/g," ");
	var items=json.split("&");
	for(var i=0;i<items.length;i++){
		var item=items[i].split("=");
		_param[item[0]]=decodeURIComponent(item[1]);
	}
	return _param;
}
$.ajaxSetup({dataFilter:function(data,type){
	if(type=="json"){
		var obj=$.parseJSON(data);
		if(obj["status"]=="fail"){
			//alert("服务器异常，异常信息:"+obj["msg"]);
			window.location.href=contextPath+"/common/ajaxFail";
			return ;
		}
	}
	return arguments[0];
},error:function(){
	if(arguments[1]=="parsererror"){

	}else{
		//window.location.href=contextPath+"/common/pageNotFind";
	}
	}
}); 

/*
 * 进度条
 */
var progressModal = {
	// 定义进度条页面所需参数
	"t" : 0,
	"c" : 20,
	"elm": "#progress_modal",
	"runningMsg":"系统正在处理, 请稍后...",
	"successMsg":"处理完成。",
	"dangerMsg":"处理失败。",
	
	create: function(){
		$('body').append("<div id='" + progressModal.elm + "' class='modal fade bs-example-modal-sm' tabindex='-1' data-backdrop='static'>" +
			"<div class='modal-dialog modal-sm'><div class='modal-content'><div class='modal-body'><div class='row'>" +
			"<div class='col-xs-12'><div class='col-xs-8'><h5 id='progress-info'>" + progressModal.runningMsg + "</h5></div>" +
			"<div class='col-xs-10'><div class='progress' data-percent='20%'><div id='progress-bar' class='progress-bar' style='width: 20%;'>" +
			"</div></div></div></div></div></div></div></div></div>");
	},

	// 开启进度条Modal
	open : function() {
		$('body').append("<div id='" + progressModal.elm + "' class='modal fade bs-example-modal-sm' tabindex='-1' data-backdrop='static'>" +
				"<div class='modal-dialog modal-sm'><div class='modal-content'><div class='modal-body'><div class='row'>" +
				"<div class='col-xs-12'><div class='col-xs-8'><h5 id='progress-info'>" + progressModal.runningMsg + "</h5></div>" +
				"<div class='col-xs-10'><div class='progress' data-percent='20%'><div id='progress-bar' class='progress-bar' style='width: 20%;'>" +
				"</div></div></div></div></div></div><div class='modal-footer'><button class='btn btn-primary btn-sm pull-right' onclick='progressModal.close();' >关闭</button></div></div></div></div>");
		$("#" + progressModal.elm).modal("show");
		progressModal.go();
	},

	// 关闭进度条窗口Modal
	close : function() {
		$("#" + progressModal.elm).modal("hide");
		$("#" + progressModal.elm).remove();
		$(".modal-backdrop").remove();
		
	},

	// 成功进度条
	success : function(msg) {
		clearTimeout(progressModal.t);
		// 更改进度条样式 -- 成功
		$(".progress").attr("data-percent", "100%");
		if (!msg){
			msg = progressModal.successMsg;
		}
		$("#progress-info").html(msg).css("color", "#5cb85c");
		$(".progress-bar").addClass("progress-bar-success").css("width", "100%");
	},

	// 失败进度条
	danger : function(msg) {
		clearTimeout(progressModal.t);
		// 更改进度条样式 -- 失败
		$(".progress").attr("data-percent", "70%");
		if (!msg){
			msg = progressModal.dangerMsg;
		}
		$("#progress-info").html(msg).css("color", "#ca5952");
		$("#progress-bar").addClass("progress-bar-danger").css("width", "70%");
	},

	// 启动
	go : function() {
		if (progressModal.c < 90) {
			progressModal.c = progressModal.c + 10;
			var go = progressModal.c + "%";
			$(".progress").attr("data-percent", go);
			$(".progress-bar").css("width", go);
			progressModal.t = setTimeout("progressModal.go()", 1000);
		}
	}

};
	//表单内容转成json对象
	$.fn.serializeObject = function()    
	{    
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
	
	function CurentTime()
    { 
        var now = new Date();
        
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();           //秒
        
        var clock = year + "-";
        
        if(month < 10)
            clock += "0";
        
        clock += month + "-";
        
        if(day < 10)
            clock += "0";
            
        clock += day + " ";
        
        if(hh < 10)
            clock += "0";
            
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm + ":"; 
         
        if (ss < 10) clock += '0'; 
        clock += ss; 
        return(clock); 
}
	
	