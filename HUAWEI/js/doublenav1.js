$(function(){
//	耳机菜单2
			$(".sub-b").stop().slideUp(100);
			$("#tab").on("mouseenter","li",function(){
//				console.log($(this).index())
			  $(".sub-b").eq($(this).index()).stop().slideDown(100).siblings(".sub-b").stop().slideUp(100);
			})
			$("#tab").on("mouseleave","li",function(){
//				console.log($(this).index())
			  $(".sub-b").stop().slideUp(100);
			})
		})


$(function(){
			//引用footer文件
//			$("#headin").load("header.html")
			$("#footin").load("footer.html")
	});
	$(function(){
			$(".foot-in").load("footer.html")
		})
			$(function(){
//			数据加载
			$.ajax({
				type:"get",
				url:"json/index1.json",
				success:function(res){fn(res,0)},
				dataType:"json"
			});
			$.ajax({
				type:"get",
				url:"json/index2.json",
				success:function(res){fn(res,1)},
				dataType:"json"
			});
			$.ajax({
				type:"get",
				url:"json/index3.json",
				success:function(res){fn(res,2)},
				dataType:"json"
			});
			$.ajax({
				type:"get",
				url:"json/index7.json",
				success:function(res){fn(res,3)},
				dataType:"json"
			});
			$.ajax({
				type:"get",
				url:"json/index5.json",
				success:function(res){fn(res,4)},
				dataType:"json"
			});
			$.ajax({
				type:"get",
				url:"json/index6.json",
				success:function(res){fn(res,5)},
				dataType:"json"
			})
		})
		
		function fn(res,sum){
			var str="";		
			for(var i=0; i<7; i++){
			if(i<7){
				str += `<li class="grid-items">
							<a class="">
								<p class="grid-img">
											<img alt="" src="${res[i].url}"/>
								</p>
								<div class="grid-title">${res[i].name}</div>
								<p class="grid-price">${res[i].price}</p>
							</a>
					   </li>`
			}
			$(".girdslist").eq(sum).html(str);
		}
	}		