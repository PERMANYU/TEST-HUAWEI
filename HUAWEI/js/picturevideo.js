	$(function(){
			//轮播图
			$("#banner-hotboard").banner({
			items:$("#banner-hotboard .imgbox").children("img"),	//图片标签组
			left:$("#prev1"),						//上一张
			right:$("#next1"),					//下一张
			list:$("#banner-hotboard .list"),						//小标
			autoPlay:true,								//是否自动播放
			speed:2000									//播放的速度
		})
		})
		$(function(){
			//轮播图
			$("#homebanner").banner({
			items:$("#homebanner .imgbox").children("img"),	//图片标签组
			left:$("#prev2"),						//上一张
			right:$("#next2"),					//下一张
			list:$("#homebanner .list"),						//小标
			autoPlay:true,								//是否自动播放
			speed:2000									//播放的速度
		})
	})