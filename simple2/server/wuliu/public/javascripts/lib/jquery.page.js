/**
 * 2017-09-01
 * desc:pagination
 * @author:gengkai.zhang
 */
 
(function($){
	
	            //css初始化
(function() {
    // flexible.css
    var cssText = "" + "@charset \"utf-8\";.pager-box{height:30px;margin:30px 0;float:right;font-size:15px;line-height:30px;box-sizing:border-box}.pager-box a,.pager-box span{display:inline-block;box-sizing:border-box}.pager-box a{text-decoration:none;color:#333}.pager-box .turndown{width:50px;background-color:#009bfa;text-align:center;margin:0 10px;color:#fff}.pager-box .disabled,.pager-box .nextPage,.pager-box .prevPage{padding:0 10px}.pager-box .disabled,.pager-box .pagecount,.paget-box .countYe{color:#666}.pager-box .disabled{cursor:not-allowed}.countYe input,.pager-box .current,.pager-box .hiding,.pager-box .tcdNumber{text-align:center;width:30px}.pager-box .nextPage:hover,.pager-box .prevPage:hover,.pager-box .tcdNumber:hover{background-color:#d6d7d9}.pager-box .pagecount{height:30px;padding:0 10px}.pager-box .current{background-color:#009bfa;color:#fff}.countYe{margin-left:7px}.countYe input{margin:0 5px}";
    // cssText end
    var styleEl = document.createElement("style");
    document.getElementsByTagName("head")[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText
        } catch(e) {
            styleEl.innerText = cssText;
        }
    }
}());


	function Page(container,fn,args){
		//存参数
		var container=this.container=container||null;
		if(this.container.constructor!=jQuery){
			throw('page插件第一个参数错误，请录入jQuery对象');
		}
		this.fn=fn||function(){};
		if(typeof(this.fn)!="function"){
			throw('page插件第二个参数错误，请录入函数类型对象');
		}
		//存 args里的属性
		var args=this.args=$.extend({
			pageCount:10,//总页码,默认10
			current:1,//当前页码,默认1
			showPrev:true,//是否显示上一页按钮
			showNext:true,//是否显示下一页按钮
			showTurn:true,//是否显示跳转,默认显示
			showSumNum:true,//是否显示总页码
			showNear:2,//显示当前页码前多少页和后多少页，默认2
			pageSwap:true//是否同意调剂,默认是。调剂会最大数量显示页码。例如当前页码之前无页码可以显示。则会增加之后的页码。
		},args||{});
		
		var width=this.width=parseInt(this.container.css('width'))||parseInt(this.container.parent().css('width'));
		var height=this.height=20;//parseInt(this.obj.css('height'));
		
		//建立自己的容器
		this.container.html('<div class="pager-box"></div>');
		this.obj=this.container.children();
		//初始化
		this.init();
	}
	
	Page.prototype.init=function(){
		this.fillHtml();
		this.bindEvent();
	}
	
	//填充DOM
	Page.prototype.fillHtml=function(){
		var args=this.args;
		var obj=this.obj;
		if(args.current>args.pageCount||args.current<1)return;
		obj.empty();
				
		//上一页
		if(args.showPrev){
			if(args.current > 1){
				obj.append('<a href="javascript:;" class="prevPage"> < 上一页</a>');
			}else{
				obj.remove('.prevPage');
				obj.append('<span class="disabled"> < 上一页</span>');
			}
		}
		//中间页码
		if(args.current != 1){
			obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
		}else{
			obj.append('<span class="current">'+1+'</span>');
		}
		
		if(args.current > args.showNear+2){
			obj.append('<span class="hiding">...</span>');
		}
		
		var start = args.current>args.showNear+2?args.current-args.showNear:2,end = args.current+args.showNear>=args.pageCount?args.pageCount-1:args.current+args.showNear;
		
		if(args.pageSwap){
			var dstart=args.current-args.showNear-2;
			var dend=args.pageCount-1-args.current-args.showNear;
			if(dstart<1&&dend>1){
				end+=Math.min(dend,Math.abs(dstart-1));
			}else if(dstart>1&&dend<1){
				start-=Math.min(dstart,Math.abs(dend-1));
			}
		}
		
		for (;start <= end; start++) {
			if(start != args.current){
				obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
			}else{
				obj.append('<span class="current">'+ start +'</span>');
			}
		}
		
		if(args.current + 1 + args.showNear < args.pageCount){
			obj.append('<span class="hiding">...</span>');
		}
		
		if(args.current != args.pageCount&&args.pageCount!=1){
			obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
		}else if(args.current== args.pageCount&&args.pageCount!=1){
			obj.append('<span class="current">'+args.pageCount+'</span>');
		}
		//下一页
		if(args.showNext){
			if(args.current== args.pageCount||args.pageCount==1){
				obj.remove('.nextPage');
				obj.append('<span class="disabled">下一页 > </span>');
			}else{
				obj.append('<a href="javascript:;" class="nextPage">下一页 > </a>');
			}
		}
		
		if(args.showSumNum){
			obj.append('<span class="pagecount">共'+args.pageCount+'页</span>');
		}
		//跳转页码
		if(args.showTurn){
			obj.append('<span class="countYe">到第<input type="text" maxlength='+args.pageCount.toString().length+'>页<a href="javascript:;" class="turndown">确定</a></span>');
		}
		this.fn&&this.fn(args.current);
	};
	
	//绑定事件
	Page.prototype.bindEvent=function(){
		var obj=this.obj;
		var _this=this;
		
			obj.off("click");
			obj.on("click","a.tcdNumber",function(){
				_this.args.current = parseInt($(this).text());
				_this.fillHtml();
			});
			//上一页
			obj.on("click","a.prevPage",function(){
				_this.args.current = parseInt(obj.children("span.current").text())-1;
				_this.fillHtml();
			});
			//下一页
			obj.on("click","a.nextPage",function(){
				_this.args.current = parseInt(obj.children("span.current").text())+1;
				_this.fillHtml();
			});
			//跳转
			obj.on("click","a.turndown",function(){
				var page = _this.args.current = Number(obj.children("span.countYe").children('input').val());
				if(page>_this.args.pageCount){
					alert("页码输入有误，请重新输入！");
					return;
				}
				_this.fillHtml();
			});
		}
		
	//绑定成jQuery插件
	$.fn.createPage=function(fn,args){
		var _this=this;
		new Page(_this,fn,args);
		return this;
	}
})(jQuery);

