//  公告自动轮播
$(function(){
	var sum = 0;
	setInterval(()=>{
		if(sum==-240){
			sum = 0
		}else{
			sum += -48
		}
	$("#notice").children("ul").css({"margin-top":"sum"})
	},1000)
})
