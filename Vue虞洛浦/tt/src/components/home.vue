<template>
    <div class="container" id="container" style="padding-top: 80px; padding-bottom: 100px;"> 
       <div class="header-bot-item">
        <em>铜陵</em>
        <h2>家帮网</h2>
        <span class="tel"></span>
        </div>
        <!--Banner-->
        <slider></slider>
        <!--家居安装开始-->
        <div class="ind-nav ind-nav1">
        <div class="ind-tit">
            <h2>家居安装</h2> 
        </div>
        <ul class="clearfix">
            <router-link tag="li" to="/floor_class"><div><a href="javascript:;"><i><img src="../assets/images/djaz.png"></i><em>灯具安装</em></a></div></router-link>
            <router-link tag="li" to="/floor_class"><div><a href="javascript:;"><i><img src="../assets/images/dbaz.png"></i><em>地板安装</em></a></div></router-link>
            <router-link tag="li" to="/floor_class"><div><a href="javascript:;"><i><img src="../assets/images/ymaz.png"></i><em>移门安装</em></a></div></router-link>
            <router-link tag="li" to="/floor_class"><div><a href="javascript:;"><i><img src="../assets/images/jjaz.png"></i><em>家具安装</em></a></div></router-link>
            <router-link tag="li" to="/floor_class"><div><a href="javascript:;"><i><img src="../assets/images/wyaz.png"></i><em>卫浴安装</em></a></div></router-link>
            <router-link tag="li" to="/floor_class"><div><a href="javascript:;"><i><img src="../assets/images/qzaz.png"></i><em>墙纸安装</em></a></div></router-link>
            <router-link tag="li" to="/floor_class"><div><a href="javascript:;"><i><img src="../assets/images/ybddaz.png"></i><em>浴霸吊顶安装</em></a></div></router-link>
            <router-link tag="li" to="/floor_class"><div><a href="add-class.html"><i><img src="../assets/images/xczx.png"></i><em>现场增项</em></a></div></router-link>
            <router-link tag="li" to="/floor_class"><div><a href="javascript:void(0)" class="more"><i><img src="../assets/images/more.png"></i><em>更多</em></a></div></router-link>
        </ul>

        </div>
        <!--家居安装结束-->
        <!--家居维修开始-->
        <div class="ind-nav ind-nav2">
        <div class="ind-tit">
        <h2>家居维修</h2>
        </div>
        <ul class="clearfix">
            <router-link tag="li" to="/repair_details"><div><a href="javascripts:;"><i><img src="../assets/images/jjwx.png"></i><em>家具维修</em></a></div></router-link>
            <router-link tag="li" to="/repair_details"><div><a href="javascripts:;"><i><img src="../assets/images/wywx.png"></i><em>卫浴维修</em></a></div></router-link>
            <router-link tag="li" to="/repair_details"><div><a href="javascripts:;"><i><img src="../assets/images/mbxf.png"></i><em>木板修复</em></a></div></router-link>
            <router-link tag="li" to="/repair_details"><div><a href="javascripts:;"><i><img src="../assets/images/djwx.png"></i><em>灯具维修</em></a></div></router-link>
            <router-link tag="li" to="/repair_details"><div><a href="javascripts:;"><i><img src="../assets/images/xsgdst.png"></i><em>下水管道疏通</em></a></div></router-link>
            <router-link tag="li" to="/add_class"><div><a href="javascripts:;"><i><img src="../assets/images/xczx.png"></i><em>现场增项</em></a></div></router-link>
            <router-link tag="li" to=""><div><a href="javascript:void(0)" class="more hide-more"><i><img src="../assets/images//more.png"></i><em>更多</em></a></div></router-link> 
        </ul>
        </div>
        <!--家居维修结束-->

        <!--二手置换 货运配送开始-->
        <div class="ind-item">
        <router-link tag="a" to="/book_recovery">
            <div class="ind-item-img"><img src="../assets/images/eszh.png"></div>
            <div class="ind-item-txt">
                <h3 class="red">二手置换</h3>
                <p>二手物品在线评估、预约上门回收</p>
            </div>
        </router-link>  
        </div>
        <div class="ind-item">
        <router-link tag="a" to="/goods_allocation">
            <div class="ind-item-img"><img src="../assets/images/hyps.png"></div>
            <div class="ind-item-txt">
            <h3 class="green">货运配送</h3>
            <p>少量搬运及拆装搬家，大件物品同城配送</p>
            </div>
        </router-link>  
        </div>
        <!--二手置换 货运配送结束-->
    </div>
</template>

<script>
import slider from './slider'
export default {
     components:{
         slider
     },
}
</script>

<style scoped>
.header-bot-item{ height:1.75rem; line-height:1.75rem; background-color:#fa4b28; color:#fff; width:100%; display: -moz-box; display: -webkit-box; display: box; -ms-flex-align: center; -webkit-align-items: center; -webkit-box-align: center; align-items: center;   }
.header-bot-item em{ font-size:0.7rem; display:block; margin-left:0.625rem; text-align: center;}
.header-bot-item h2{ font-size:0.75rem; text-align:center;-webkit-box-flex: 1;-moz-box-flex: 1;-ms-box-flex: 1; }
.header-bot-item .tel{margin-right:0.625rem; width:0.8rem; height:0.8rem; display:block; background:url(../assets/images/header-bot-tel.jpg) center center no-repeat; background-size:cover;}

.ind-nav{ margin-bottom:0.35rem; position: relative; }
.ind-nav::after { content: ''; height: 1px; width: 100%; background:#ededed; position: absolute; bottom: 0; left: 0;}
.ind-nav .ind-tit{ height:1.85rem; background-color:#FFF; }
.ind-nav .ind-tit h2{height:1.85rem;line-height:2rem;width:4.2rem;color:#fff;font-size:0.7rem;text-align:center;background:url(../assets/images/ind-tit.png) center center no-repeat;background-size:contain; }
.ind-nav ul{height:8rem; border-top:1px solid #efefef;overflow:hidden;  }
.ind-nav ul.intro{ height:auto; }
.ind-nav ul li{float:left;width:25%; height:4rem; box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;border-right:1px solid #ededed;border-bottom:1px solid #ededed;  -webkit-box-align: center;-webkit-align-items: center; align-items: center;display:-moz-box; display:-webkit-box; display:box; }
.ind-nav ul li:last-child{border-right: none;}
.ind-nav ul li div{ margin:0 auto; width: 100%; }
.ind-nav ul li a i,.more i{ width:1.5rem; height:1.5rem; display:block; margin:0 auto 0.3rem;  }
.ind-nav ul li a em,.ind-nav .more{ color:#222222; font-size:0.6rem;text-align:center; display: block;}
.ind-nav .more{ width:25%; position:absolute; bottom:0; right:0; padding: 0.6rem 0; z-index:10; background-color:#fff;border-bottom:1px solid #ededed;}
.ind-nav .add-more{ width:100%; position:static;border-bottom:none; display:block;}
ul.intro li:last-child{ border-right:1px solid #ededed;}
.ind-nav .hide-more{ display:none;}
/*二手置换 货运配送*/
.ind-item a{ padding:0.4rem 0; background-color:#fff;margin-bottom:0.35rem;display:-moz-box; display:-webkit-box; display:box; -ms-flex-align: center; -webkit-align-items: center; -webkit-box-align: center; align-items: center;}
.ind-item .ind-item-img{ height:3rem; width:3rem; margin:0 0.5rem 0 0.8rem; }
.ind-item h3{ font-size:0.7rem; margin-bottom:0.2rem; }
.ind-item h3.red{ color:#ed5a37; }
.ind-item h3.green{ color:#3cad7b; }
.ind-item p{ color:#9d9a9b; font-size:0.6rem; }
</style>
