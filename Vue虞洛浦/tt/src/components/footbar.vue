<template>
    <!--footer-->
<footer class="footer" id="footer">
  <ul class="footnav box-flex">
     <router-link tag="li" to="/home"  active-class="active">
     <a href="javascript:;" class="home"><i></i><span class="full-block">首页</span></a>
     </router-link>
     <router-link tag="li" to="/worker_join"  active-class="active">
     <a href="javascript:;" class="foot-worker"><i></i><span class="full-block">工人入驻</span></a>
     </router-link>
     <router-link tag="li" to="/my_order"  active-class="active">
     <a href="javascript:;" class="foot-order" ><i></i><span class="full-block">订单</span></a>
     </router-link>
     <router-link tag="li" to="/my"  active-class="active">
     <a href="javascript:;" class="my"><i></i><span class="full-block">我的</span></a>
     </router-link>
  </ul>
</footer>
<!--footer-end-->

</template>

<script>
export default {

}
</script>

<style scoped>
/*-------------footer-----------*/
/*footer*/
.footer {position:fixed;bottom:0;left:0;width:100%;border-top:1px solid #e9e9e9;background:rgba(255, 255, 255, 1);z-index:9999;}
.footnav{width:100%;display:flex}
.footnav li {-moz-box-flex:1;-webkit-box-flex:1; flex:1;}
.footnav li a { display:inline-block; width:100%; padding:0.3rem 0; }
.footnav li a span{ display:block;width:100%; font-size:0.6rem;color:#b9b9b9;text-align:center;}
.footnav li a i{ display:block; width:1.1rem; height:1.1rem; margin:0 auto; background-position:center center; background-repeat: no-repeat; background-size:contain;}
.footnav li .home i{background-image:url(../assets/images/home.png);}
.footnav li .foot-worker i{background-image:url(../assets/images/worker.png);}
.footnav li .foot-order i{background-image:url(../assets/images/order.png);}
.footnav li .my i{background-image:url(../assets/images/my.png);}
.footnav li.active a span{color:#fa4b28;}
.footnav li.active .home i{background-image:url(../assets/images/home-on.png);}
.footnav li.active .foot-worker i{background-image:url(../assets/images/worker-on.png);}
.footnav li.active .foot-order i{background-image:url(../assets/images/order-on.png);}
.footnav li.active .my i{background-image:url(../assets/images/my-on.png);}
</style>
