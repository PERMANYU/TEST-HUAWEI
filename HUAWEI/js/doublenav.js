	$(function(){
//			二级菜单
			$("#choosebox>ul>li").children(".bannmen").hide();
			$("#choosebox>ul>li").on("mouseenter",function(){
				$(this).css({"background":"#3d3d3d"})
				.siblings().css({"color":"","background":""}).end()
				$(this).children().eq(1).stop().show().parent()
				.siblings().children().eq(1).stop().hide();
			});
			$("#choosebox>ul>li").on("mouseleave",function(){
				$(this).css({"background":""});
				$(this).children().eq(1).stop().hide(100).parent()
				.siblings().children().eq(1).stop().hide(100);
			})
			
		})