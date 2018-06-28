$(function(){
			//引用footer文件
			$("#footin").load("footer.html")
	});
//购物车============================================


class Car{
			constructor(){
				this.tbody = $(".pro-list");
				this.load();
			}
			load(){
				var that = this;
				$.ajax({
					type:"get",
					url:"json/list.json",
					dataType:"json",
					success:function(res){
						that.res = res;
						that.display()
						that.init()
						that.remove()
					}
				});
			}
			display(){
				var str = "";
				this.shop = JSON.parse($.cookie("goods"));
//				console.log($.cookie("goods"))
//				console.log(this.res)
				for(var i=0;i<this.res.length;i++){
					for(var j=0;j<this.shop.length;j++){
						if(this.res[i].goodsId == this.shop[j].id){
	           str  +=   `<ul class="d-flex h-100" data-index="${this.res[i].goodsId}">
							<li class="d-flex"><img src="${this.res[i].url}" alt="" /><p>${this.res[i].name}</p></li>
							<li>${this.res[i].price}</li>
							<li><input type="number" value="${this.shop[j].num}" min="1"></li>
							<li>${this.res[i].price}*${this.shop[j].num}</li>
							<li><a>删除</a></li>
					     </ul>`
						}
					}
				}
				this.tbody.html(str)
			}
			init(){
				var that = this
				this.tbody.on("input","input",function(){
					var index = $(this).parent().parent().attr("data-index")
					that.changeNum($(this),index)
				})
			}
			changeCookie(index,fn){
				var arr = JSON.parse($.cookie("goods"))	
				for(var i=0;i<arr.length;i++){
					if(arr[i].id == index){
						fn(arr,i)
					}
				}
				$.cookie("goods",JSON.stringify(arr))
			}
			changeNum(ele,index){
				this.changeCookie(index,function(arr,i){
					arr[i].num = ele.val();
				})
			}
			remove(){
				var that = this;
				this.tbody.on("click","a",function(){
					var index = $(this).parent().parent().attr("data-index");
					
					that.changeCookie(index,function(arr,i){
						arr.splice(i,1)
					})
					
					$(this).parent().parent().remove()
				})
			}
		}
		new Car()
		

$(function(){
	
})
