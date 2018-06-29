<template>
  <div class="container" id="container" style="padding-top: 47px; padding-bottom: 60px;"> 
 <!--我的订单选项卡-->
  <div id="my-order" class="my-order"> 
    <!--栏目-->
    <ul id="nav" style="top: 47px;">
      <li><span class="selected"><h2>全部订单</h2></span></li>
      <li><span><h2>已完成</h2></span></li>
      <li><span><h2>待付款</h2></span></li>
      <li><span><h2>待评价</h2></span></li>
    </ul>
    <!--栏目-->
    
    <!--内容-->
    <div id="menu_con" style="margin-top: 47px;">
    
      <!--全部订单开始-->
      <section class="tag" style="display:block">
      
        <div class="my-order-item">
          <div class="my-order-item-tit clearfix">
          <h3>订单号：888888888</h3>
          <span class="my-order-wait-zf">等待支付</span>
          </div>
          <div class="my-order-item-txt">
            <div class="my-order-time">2015-11-28  13:30</div>
            <div class="my-order-address">合肥市高新区长江路拓基城市广场金座A2002</div>
          </div>
          <div class="my-order-item-btn">
            <div class="pos-r">
              <span class="my-order-item-cancel">取消订单</span>
              <span class="my-order-item-red"><a href="order-payment.html">立即支付</a></span>
            </div>  
          </div>
        </div>
        
        <div class="my-order-item">
          <div class="my-order-item-tit clearfix">
          <h3>订单号：888888888</h3>
          <span class="my-order-acceptance">订单受理中</span>
          </div>
          <div class="my-order-item-txt">
            <div class="my-order-time">2015-11-28  13:30</div>
            <div class="my-order-address">合肥市高新区长江路拓基城市广场金座A2002</div>
          </div>
          <div class="my-order-item-btn">
            <div class="pos-r">
              <span class="my-order-item-cancel">取消订单</span>
              <span class="my-order-item-jindu"><a href="order-schedule1.html">查看进度</a></span>
            </div>  
          </div>
        </div>
        
        <div class="my-order-item">
          <div class="my-order-item-tit clearfix">
          <h3>订单号：888888888</h3>
          <span class="my-order-wait-pj">待评价</span>
          </div>
          <div class="my-order-item-txt">
            <div class="my-order-time">2015-11-28  13:30</div>
            <div class="my-order-address">合肥市高新区长江路拓基城市广场金座A2002</div>
          </div>
          <div class="my-order-item-btn">
            <div class="pos-r">
              <span class="my-order-item-red"><a href="order-evaluation.html">立即评价</a></span>
              <span class="my-order-item-jindu"><a href="order-schedule1.html">查看进度</a></span>
            </div>
          </div>
        </div>
        
        <div class="my-order-item">
          <div class="my-order-item-tit clearfix">
          <h3>订单号：888888888</h3>
          <span class="my-order-over">交易完成</span>
          </div>
          <div class="my-order-item-txt">
            <div class="my-order-time">2015-11-28  13:30</div>
            <div class="my-order-address">合肥市高新区长江路拓基城市广场金座A2002</div>
          </div>
          <div class="my-order-item-btn">
            <div class="pos-r">
<!--              <span class="my-order-item-cancel">取消订单</span>
              <span class="my-order-item-jindu"><a href="order-schedule1.html">查看进度</a></span>-->
            </div>
          </div>
        </div> 
      </section>
      <!--全部订单结束-->
      
      <!--已完成开始-->
      <section class="tag" style="display:none">
        <div class="my-order-item">
          <div class="my-order-item-tit clearfix">
          <h3>订单号：888888888</h3>
          <span class="my-order-over">交易完成</span>
          </div>
          <div class="my-order-item-txt">
            <div class="my-order-time">2015-11-28  13:30</div>
            <div class="my-order-address">合肥市高新区长江路拓基城市广场金座A2002</div>
          </div>
          <div class="my-order-item-btn">
            <div class="pos-r">
<!--              <span class="my-order-item-cancel">取消订单</span>-->
            </div>
          </div>
        </div> 
      </section>
      <!--已完成结束-->
      
      <!--待付款开始-->
      <section class="tag" style="display:none">
        <div class="my-order-item">
          <div class="my-order-item-tit clearfix">
          <h3>订单号：888888888</h3>
          <span class="my-order-wait-zf">等待支付</span>
          </div>
          <div class="my-order-item-txt">
            <div class="my-order-time">2015-11-28  13:30</div>
            <div class="my-order-address">合肥市高新区长江路拓基城市广场金座A2002</div>
          </div>
          <div class="my-order-item-btn">
            <div class="pos-r">
              <span class="my-order-item-cancel">取消订单</span>
              <span class="my-order-item-pay">立即支付</span>
            </div>
          </div>
        </div>
      </section>
      <!--待付款结束-->
      
      <!--待评价开始-->
      <section class="tag" style="display:none">
        <div class="my-order-item">
          <div class="my-order-item-tit clearfix">
          <h3>订单号：888888888</h3>
          <span class="my-order-wait-pj">待评价</span>
          </div>
          <div class="my-order-item-txt">
            <div class="my-order-time">2015-11-28  13:30</div>
            <div class="my-order-address">合肥市高新区长江路拓基城市广场金座A2002</div>
          </div>
          <div class="my-order-item-btn">
            <div class="pos-r">
              <span class="my-order-item-pj">立即评价</span>
              <span class="my-order-item-jindu"><a href="order-schedule1.html">查看进度</a></span>
            </div>  
          </div>
        </div>
      </section>
      <!--待评价结束-->
    </div>
    <!--内容-->
    </div>
</div>
<!-- <script>
var tabs=function(){
    function tag(name,elem){
        return (elem||document).getElementsByTagName(name);
    }
    //获得相应ID的元素
    function id(name){
        return document.getElementById(name);
    }
    function first(elem){
        elem=elem.firstChild;
        return elem&&elem.nodeType==1? elem:next(elem);
    }
    function next(elem){
        do{
            elem=elem.nextSibling;  
        }while(
            elem&&elem.nodeType!=1  
        )
        return elem;
    }
    return {
        set:function(elemId,tabId){
            var elem=tag("li",id(elemId));
            var tabs=tag("section",id(tabId));
            var listNum=elem.length;
            var tabNum=tabs.length;
            for(var i=0;i<listNum;i++){
                    elem[i].onclick=(function(i){
                        return function(){
                            for(var j=0;j<tabNum;j++){
                                if(i==j){
                                    tabs[j].style.display="block";
                                    //alert(elem[j].firstChild);
                                    elem[j].firstChild.className="selected";
                                }
                                else{
                                    tabs[j].style.display="none";
                                    elem[j].firstChild.className="";
                                }
                            }
                        }
                    })(i)
            }
        }
    }
}();
tabs.set("nav","menu_con");//执行
</script> 
<script language="JavaScript">
 $(document).ready(function(){
	$('html,body').animate({scrollTop:'0px'},"fast");
  $("#nav li").click(function(){
	$('html,body').animate({scrollTop: '0px'},"fast");
  });
  });
</script>
我的订单选项卡结束 -->


</template>

<script>
export default {

}
</script>

<style scoped>
.my-order ul{padding:0 0.5rem;}
.my-order #nav{ border-bottom:1px solid #e5e5e5; }
.my-order ul{ display:-moz-box; /* Firefox */display:-webkit-box; /* Safari and Chrome */display:flex;text-align:center;-webkit-box-align: center; align-items: center; } 
.my-order ul a{padding:0.5rem 0; -webkit-box-flex: 1;-moz-box-flex: 1;-ms-box-flex: 1;  font-size:0.7rem; color:#181818; }
.my-order ul a:last-child{ border-right:none; }
.my-order ul li span{ display:block;}
.my-order ul a.selected{ border-bottom:2px solid #fa4b28; color:#fa4b28; }
.my-order-item{ background-color:#fff; margin-bottom:0.3rem; }
.my-order-item-tit{ padding:0 0.5rem; font-size:0.7rem; height:1.5rem; line-height:1.5rem; }
.my-order-item-tit h3{ float:left; }
.my-order-item-tit span{ float:right;}
.my-order-wait-zf{ color:#fa4b28;}
.my-order-acceptance{ color:#fa4b28;}
.my-order-wait-pj{ color:#fa4b28;}
.my-order-over{ color:#fa4b28;}
.my-order-item-txt{ padding:0.5rem; border-top:1px solid #e5e5e5; border-bottom:1px solid #e5e5e5; font-size:0.6rem; color:#666666; }
.my-order-time{ background:url(../assets/images/my-order-time.png) left center no-repeat; background-size:0.9rem 0.9rem; padding-left:1rem; margin-bottom:0.3rem; }
.my-order-name{ background:url(../assets/images/goods_name.png) left center no-repeat; background-size:0.9rem 0.9rem; padding-left:1rem; margin-bottom:0.3rem; }
.my-order-address{ background:url(../assets/images/my-order-address.png) left center no-repeat; background-size:0.9rem 0.9rem; padding-left:1rem; }
.my-order-item-btn{ position:relative; height:2rem; }
.my-order-item-btn span{ display:block; float:left; border:1px solid #fa4b28; width:4.1rem; height:1.3rem; line-height:1.3rem; font-size:0.6rem; color:#fa4b28; margin-left:0.3rem; -moz-border-radius:0.2rem;-webkit-border-radius:0.2rem;border-radius:0.2rem;  }
.my-order-item-btn span.my-order-item-red{border:1px solid #fa4b28;color:#fa4b28;}
.my-order-item-btn span.my-order-item-red a,.my-order-item-btn span.my-order-item-jindu a{ color:#fa4b28;}
.pos-r{ position:absolute; right:0.5rem; top:0.35rem; }
</style>
