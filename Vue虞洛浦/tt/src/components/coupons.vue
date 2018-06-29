<template>
    <div class="container" id="container" style="padding-top: 45px;"> 

<!-- 滑动选项卡 Start -->
<div id="leftTabBox" class="coupons-tabBox">

    <!--栏目-->
    <ul id="nav" style="top: 45px;">
      <li><span class="selected"><h2>全部</h2></span></li>
      <li><span><h2>已使用</h2></span></li>
      <li><span><h2>未使用</h2></span></li>
      <li><span><h2>已过期</h2></span></li>
    </ul>
    <!--栏目-->
    
    <!--内容-->
    <div id="menu_con" style="margin-top: 45px;">
    <section class="tag" style="display:block">
       <div class="coupons-tabBoxitem">
            <div class="coupons-img coupons-redbg">￥<em>10</em></div>
            <div class="coupons-txt">
              <h3>单笔订单满10元使用</h3>
              <span>有效时间：<br>2015.10.13&nbsp;23:00-2015.12.12&nbsp;24:00</span>
            </div>
       </div>
       <div class="coupons-tabBoxitem">
            <div class="coupons-img coupons-redbg">￥<em>20</em></div>
            <div class="coupons-txt">
              <h3>单笔订单满20元使用</h3>
              <span>有效时间：<br>2015.10.13&nbsp;23:00-2015.12.12&nbsp;24:00</span>
            </div>
       </div>
       <div class="coupons-tabBoxitem">
            <div class="coupons-img coupons-redbg">￥<em>100</em></div>
            <div class="coupons-txt">
              <h3>单笔订单满100元使用</h3>
              <span>有效时间：<br>2015.10.13&nbsp;23:00-2015.12.12&nbsp;24:00</span>
            </div>
       </div>
       <div class="coupons-tabBoxitem">
            <div class="coupons-img coupons-greybg">￥<em>100</em></div>
            <div class="coupons-txt">
              <h3>单笔订单满100元使用</h3>
              <span>有效时间：<br>2015.10.13&nbsp;23:00-2015.12.12&nbsp;24:00</span>
            </div>
       </div>
    </section>
    <!-- 全部 -->
    
    <section class="tag" style="display:none">
       <div class="coupons-tabBoxitem">
          <div class="coupons-img coupons-redbg">￥<em>10</em></div>
          <div class="coupons-txt">
            <h3>单笔订单满10元使用</h3>
              <span>有效时间：<br>2015.10.13&nbsp;23:00-2015.12.12&nbsp;24:00</span>
          </div>
       </div>
       <div class="coupons-tabBoxitem">
          <div class="coupons-img coupons-redbg">￥<em>20</em></div>
          <div class="coupons-txt">
            <h3>单笔订单满20元使用</h3>
              <span>有效时间：<br>2015.10.13&nbsp;23:00-2015.12.12&nbsp;24:00</span>
          </div>
       </div>
    </section>
    <!-- 已使用 -->
    
    <section class="tag" style="display:none">
       <div class="coupons-tabBoxitem">
          <div class="coupons-img coupons-redbg">￥<em>100</em></div>
          <div class="coupons-txt">
            <h3>单笔订单满100元使用</h3>
              <span>有效时间：<br>2015.10.13&nbsp;23:00-2015.12.12&nbsp;24:00</span>
          </div>
       </div>
    </section>
    <!-- 未使用 -->   
    
    <section class="tag" style="display:none">
       <div class="coupons-tabBoxitem">
          <div class="coupons-img coupons-greybg">￥<em>100</em></div>
          <div class="coupons-txt">
            <h3>单笔订单满100元使用</h3>
              <span>有效时间：<br>2015.10.13&nbsp;23:00-2015.12.12&nbsp;24:00</span>
          </div>
       </div>
    </section>
    <!-- 已过期 -->  
  </div>
<!-- 内容结束 -->

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
</script> -->


</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
