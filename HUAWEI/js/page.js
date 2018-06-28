  
  //f分页效果----------------------------------------------------------------------------------------
  function Page(options,url,num){
	       this.pagelist = options.pagelist;
	       this.left = options.left;
	       this.right = options.right;
	       this.list = options.list;
	       
	       this.num = num;
	       this.url = url;
	       this.index = 0;
	       this.load();
	  }
	  Page.prototype.load=function(){
//	  	获取数据
            var that = this;
        ajaxGet(this.url).then(function(res){
        	that.res = JSON.parse(res);
        	that.init();
        	that.display();
        })
    }    
        Page.prototype.init = function(){
        	var that = this;
        	this.pageNum = Math.ceil(this.res.length/this.num)
        	var str = "";
        	for(var i=1;i<=this.pageNum;i++){
        		str +=`<li>${i}</li>`
        	}
        	this.pagelist.innerHTML = str;
        	
        	this.left.onclick = function(){
        		that.changeIndex("left")
        	}
        	this.right.onclick = function(){
        		that.changeIndex("right")
        	}
        }
      Page.prototype.changeIndex = function(direct){
      	if(direct == "left"){
      		if(this.index == 0){
      			this.index = this.pageNum -1 ;
      		}else{
      			this.index--
      		}
      }else{
      	if(this.index == this.pageNum-1){
      		this.index = 0;
      	}else{
      		this.index++
      	}
      }
      this.display()
 }	  
     Page.prototype.display = function(){
     	 var str = "";
     	 for(var i = this.index*this.num;i<this.num*(1+this.index);i++){
     	 	if(i<this.res.length){
     	 		str += `<li class="grid-items" data-id="${this.res[i].goodsId}">
								<p class="grid-img">
											<img alt="" src="${this.res[i].url}"/>
								</p>
								<div class="grid-title">${this.res[i].name}</div>
								<p class="grid-price">${this.res[i].price}</p>
								<em class='btn-ccc'>加入购物车</em>
							</em>
					   </li>`
     	 	}
     }
     	 this.list.innerHTML = str;
     	 
     	 for(var i=0;i<this.pagelist.children.length;i++){
     	 	  this.pagelist.children[i].className = "";
     	 }
     	 this.pagelist.children[this.index].className = "active";
   }
var ele = {
		        "pagelist":document.getElementById("pageWarp").children[1],
      		     "left":document.getElementById("btnL"),
      		     "right":document.getElementById("btnR"),
      		     "list":document.getElementById("prolist"),
     }
		
      	new Page(ele,"json/list.json",20)
      
      
      
//    购物车----------------------------------------------------------------------------------------
class ShopCar{
			constructor(){
				this.cont = $("#prolist");
				this.init()
			}
			init(){
				var that = this;
				this.cont.on("click","em",function(){
					var index = $(this).parent().attr("data-id");
					that.setcookie(index)
					$("#num").val(index)
				})
			}
			setcookie(id){
				if(!$.cookie("goods")){
					this.goods = [{"id":id,"num":1}];
				}else{
					var str = $.cookie("goods");
					this.goods = JSON.parse(str);
					var onoff = true;
					for(var i=0;i<this.goods.length;i++){
						if(this.goods[i].id == id){
							this.goods[i].num++;
							onoff = false;
						}
					}
					if(onoff){
						this.goods.push({"id":id,"num":1});
					}
				}
				$.cookie("goods",JSON.stringify(this.goods))
			}
		}
		new ShopCar();
//		==========================================
//划过页面所有图片的效果
$(function(){
	$(window).load(function(){
	$("#prolist").on("mouseenter",".grid-items",function(){
		$(this).stop().animate({"margin-top":"-8px"},300,function(){
		   $(this).css({"box-shadow":" 3px 5px 5px #969696"})	
		})
	})
	$("#prolist").on("mouseleave",".grid-items",function(){
		$(this).stop().animate({"margin-top":"0"},300,function(){
			$(this).css({"box-shadow":"1px 1px 1px rgba(0,0,0,0.8)"})
		})
	})
	})
})
//================================================
