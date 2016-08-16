function numTypeFmatter (cellvalue, options, rowObject){
				    return '<span style="cursor:pointer" onclick="redirect(\''+rowObject.url+'\',\''+rowObject.status+'\')" class="badge badge-danger">'+rowObject.doneNum + '/' +rowObject.allNum + '</span>';
				}

function redirect(url,status){
	//yangxu
	if(status == 4){//已经撤销的
		CommUtils.commAlert("user-input", "已经撤销的任务无需办理！");
		return;
	}
	
	location.href=url;              
	return;
}

var Todo = {
		//点击后收缩效果（更多）
		activateSearchMore : function(){
			$(".search-more").click(function(){
				var nextShow = true;
				if ($(".search-more i").attr("class") == "icon-chevron-up"){
					nextShow = false;
				}
				if (nextShow){
					$(".search-more i").attr("class","icon-chevron-up");
					$(".search-hide").slideDown(150);
				}else{
					$(".search-more i").attr("class","icon-chevron-down");
					$(".search-hide").slideUp(150);
				}
			})
		},
		
		
		
		//列表页面加载方法
		loadPage : function() {
			jQuery("#grid-table").jqGrid({
				url:'list',
				mtype: "POST",
				datatype: 'json',     
				height: '100%',
				rownumbers: true,
				rownumWidth:50,
				colNames:['id','待办任务名','任务类型','进度','状态','创建时间','处理人','处理时间'],
				colModel:[
			    {name:'id',index:'id',width:'90%',hidden:true},
			    {name:'taskName',index:'taskName',width:'200%',editable:false},
			    {name:'type',index:'type',width:'100%',editable:false,formatter: "select", editoptions:{value:"POST:入职办理;POST_BACK:入职办理退回;LEAVE:申报离职;CANCEL_LEAVE:撤销离职;POST_UPDATE:变更审核;LEAVE_BACK:离职办理退回;CANCEL_LEAVE_BACK:撤销离职办理退回"}},
			    {name:'numType',index:'numType',width:'70%',editable:false,formatter:  numTypeFmatter},
			    {name:'status',index:'status',width:'70%',editable:false,formatter: "select", editoptions:{value:"0:未处理;1:处理中;2:已处理;3:已退回;4:已撤销"}},
			    {name:'createDate',index:'CREATE_DATE',width:'120%',formatter:dateFormatter},
			    {name:'operPerson',index:'operPerson',width:'100%',editable:false},
			    {name:'operDate',index:'operDate',width:'120%',editable:false,formatter:dateFormatter},

			    ], 
				viewrecords : true,
				rowNum:10,
				rowList:[10,20,30],
				pager : "#grid-pager",
				multiselect: false,
		        multiboxonly: false,
				altRows: true,
				autowidth: true,
				autoScroll: false,
				caption: "员工列表",
				jsonReader : {   
			      root:"result",
			      total:'totalPages',
			      page:'page',
			      records:'records'   
				},
				loadComplete : function() {
					var table = this;
					setTimeout(function(){
						updatePagerIcons(table);
					}, 0);
				},
				gridComplete : funcGridComplete
			});
			
			
			
			//查询按钮
			$('#search').click(function(){
				$('#search').button('loading');
				var type = $("#type").val();
				var status = $("#status").val();
				var startDate = $("#startDate").val();
				var endDate = $("#endDate").val();
				var taskName = $("#taskName").val();
				Todo.loadSelected(type,status,startDate,endDate,taskName);
				$('#search').button('reset');
				
			});
			
			
			if ($("#startDate").val()){
				$('#startDate').datepicker('setDate',new Date($("#startDate").val()));
			}
			
			if ($("#endDate").val()){
				$('#endDate').datepicker('setDate',new Date($("#endDate").val()));
			}
			
			//生日框弹出日期框
			$('.date-picker').datepicker({
				autoclose : true,
				language: 'cn'
			}).next().on(ace.click_event, function() {
				$(this).prev().focus();
			});
		},
		
		//查询按钮
		loadSelected:function(type,status,startDate,endDate,taskName){
			var json = {
					'type':type,
					'status':status,
					'startDate':startDate,
					'endDate':endDate,
					'taskName':taskName,
					
			};
			jQuery("#grid-table").jqGrid('setGridParam', { postData: json }).jqGrid('setGridParam', { 'page': 1 })
			.trigger("reloadGrid");
		},


		
}