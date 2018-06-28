	$(function(){
			//引用footer文件
			$("#footin").load("footer.html")
	});
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
				url:"json/index4.json",
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
			});
			$.ajax({
				type:"get",
				url:"json/index7.json",
				success:function(res){fn(res,6)},
				dataType:"json"
			});
			$.ajax({
				type:"get",
				url:"json/index8.json",
				success:function(res){fn(res,7)},
				dataType:"json"
			});
			$.ajax({
				type:"get",
				url:"json/index9.json",
				success:function(res){fn(res,8)},
				dataType:"json"
			});
			$.ajax({
				type:"get",
				url:"json/index10.json",
				success:function(res){fn(res,9)},
				dataType:"json"
			});
			$.ajax({
				type:"get",
				url:"json/index11.json",
				success:function(res){fn(res,10)},
				dataType:"json"
			});
			$.ajax({
				type:"get",
				url:"json/index12.json",
				success:function(res){fn(res,11)},
				dataType:"json"
			});
		})
		
		function fn(res,sum){
			var str="";		
			for(var i=0; i<res.length; i++){
			if(i<res.length){
				str += `<li class="grid-items">
							<a href="gridslist.html" class="">
								<p class="grid-img">
											<img alt="" src="${res[i].url}">
								</p>
								<div class="grid-title">${res[i].name}</div>
								<p class="grid-tips">${res[i].tip}</p>
								<p class="grid-price">${res[i].price}</p>
							</a>
					   </li>`
			}
		}
		$(".gridlist").eq(sum).html(str)
				}
		

//划过页面所有图片的效果============================
$(function(){
	$(window).load(function(){
	$(".gridlist").on("mouseenter",".grid-items",function(){
		$(this).stop().animate({"margin-top":"-8px"},300,function(){
		   $(this).css({"box-shadow":" 3px 5px 5px #969696"})	
		})
	})
	$(".gridlist").on("mouseleave",".grid-items",function(){
		$(this).stop().animate({"margin-top":"0"},300,function(){
			$(this).css({"box-shadow":"1px 1px 1px rgba(0,0,0,0.8)"})
		})
	})
	})
})
//	====================================	轮播2 =================
$(function(){
	  $(".btnright").on("click",function(){
	     $(this).siblings("ul").stop().animate({"margin-left":"-1200px"},600,function(){
	     	$(".btnleft").on("click",function(){
	     	   $(this).siblings("ul").stop().animate({"margin-left":"0"},600)
	     	})
	     })
	  })
})


//=============================================轮播3 ====================
$(function(){
	 function Fn(options){
	 	this.list = options.list
	 	this.init();
	 }
	 Fn.prototype.init=function(){
	 	var sum = 0;
	 	setInterval(()=>{
	 		if(sum ==-240){
	 			sum=0
	 		}else{
	 			sum-=48
	 		}
//	 		console.log(sum)
        this.list.stop().animate({
        	"margin-top":"sum"
        })
	 	},2000)
	 }
	 
	 
	 
	 
	 
	 new Fn({
	 	list:$("#notice ul")
	 })
})
