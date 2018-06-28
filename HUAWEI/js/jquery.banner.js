;(function($){
	"use strict";
	$.fn.banner = function(options){
//		var items = options.items
		var {items,left,right,list,autoPlay} = options;
		var speed = options.speed || 2000;
		
		this.LOCAL = {
			iNow:0,
			iPrev:items.length-1,
		}
		var that = this;
		if(left != "undefined" && typeof left == "object" && left.length > 0 && right != "undefined" && typeof right == "object" && right.length > 0 ){
//			console.log("有左右按钮")
			left.on("click",function(){
				if(that.LOCAL.iNow == 0){
					that.LOCAL.iNow = items.length-1;
					that.LOCAL.iPrev = 0;
				}else{
					that.LOCAL.iNow--;
					that.LOCAL.iPrev = that.LOCAL.iNow + 1;
				}
//				console.log(that.LOCAL.iPrev,that.LOCAL.iNow)
				that.LOCAL.btnMove(-1)
			})
			
			right.on("click",function(){
				if(that.LOCAL.iNow == items.length-1){
					that.LOCAL.iNow = 0;
					that.LOCAL.iPrev = items.length-1;
				}else{
					that.LOCAL.iNow++;
					that.LOCAL.iPrev = that.LOCAL.iNow-1
				}
//				console.log(that.LOCAL.iPrev,that.LOCAL.iNow)
				that.LOCAL.btnMove(1)
			})
			
			this.LOCAL.btnMove = function(direct){
				items.eq(this.iNow).css({
					left:items.eq(0).width() * direct
				}).stop().animate({
					left:0
				}).end().eq(this.iPrev).css({
					left:0
				}).stop().animate({
					left:-items.eq(0).width() * direct
				})
				
				list.children("li").removeClass("active").eq(this.iNow).addClass("active")
//				if(direct == "left"){
//					items.eq(this.iNow).css({
//						left:-items.eq(0).width()
//					}).stop().animate({
//						left:0
//					}).end().eq(this.iPrev).css({
//						left:0
//					}).stop().animate({
//						left:items.eq(0).width()
//					})
//				}else{
//					items.eq(this.iNow).css({
//						left:items.eq(0).width()
//					}).stop().animate({
//						left:0
//					}).end().eq(this.iPrev).css({
//						left:0
//					}).stop().animate({
//						left:-items.eq(0).width()
//					})
//				}
			}
		}
		if(list != "undefined" && typeof list == "object" && list.length > 0){
			list.children("li").on("click",function(){
				if($(this).index() == that.LOCAL.iNow){}
				
				if($(this).index() > that.LOCAL.iNow){
//					console.log("向左")
					items.eq($(this).index()).css({
						left:items.eq(0).width()
					}).stop().animate({
						left:0
					}).end().eq(that.LOCAL.iNow).css({
						left:0
					}).stop().animate({
						left:-items.eq(0).width()
					})
				}
				if($(this).index() < that.LOCAL.iNow){
//					console.log("向右")
					items.eq($(this).index()).css({
						left:-items.eq(0).width()
					}).stop().animate({
						left:0
					}).end().eq(that.LOCAL.iNow).css({
						left:0
					}).stop().animate({
						left:items.eq(0).width()
					})
				}
				
				list.children("li").removeClass("active").eq($(this).index()).addClass("active")
				that.LOCAL.iNow = $(this).index();
			})
			
			if(autoPlay == "undefined" || autoPlay == true && (left != "undefined" && typeof left == "object" && left.length > 0 && right != "undefined" && typeof right == "object" && right.length > 0)){
				clearInterval(that.LOCAL.timer)
				
				this.LOCAL.timer = setInterval(()=>{
					right.trigger("click");
				},speed)
				
				this.hover(function(){
					clearInterval(that.LOCAL.timer)
				},function(){
					that.LOCAL.timer = setInterval(()=>{
						right.trigger("click");
					},speed)
				})
			}
			
		}	
	}
})(jQuery)
