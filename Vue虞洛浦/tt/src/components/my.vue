<template>
    <div class="container" id="container" style="padding-top: 47px; padding-bottom: 60px;"> 
        <div class="my-face">
        <div class="my-face-con">
            <div class="my-face-pic"><img src="../assets/images/my-face-pic.jpg"></div>
            <div class="user-box">
            <a >{{user.nikename}}</a>
            <a href="#">注消</a>
            </div>
            <ul class="clear">
            <li>
                <span>{{user.follow}}</span>
                <p>关注</p>
            </li>
            <li>
                <span>{{user.fans}}</span>
                <p class="end">粉丝</p>
            </li>
            </ul>
        </div>
        </div>
        <div class="personal-list">
            <ul>
            <li><a class="my-icon-wddd" href="my-order.html">我的订单</a></li>
            </ul>
            <ul>
            <li><a class="my-icon-grzl" href="personal-data.html">个人资料</a></li>
            <li><a class="my-icon-yhq" href="coupons.html">优惠券</a></li>
            <li><a class="my-icon-wdjf" href="integral.html">我的积分</a></li>
            </ul>
            <ul>
            <li><a class="my-icon-gsjj" href="#">公司简介</a></li>
            <li><a class="my-icon-bzzx" href="#">帮助中心</a></li>
            <li><a class="my-icon-kfzx" href="#">客服咨询<span class="my-tel">400-000-0000</span></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import store from "../store";
export default {
  data() {
    return {
      user: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    /* axios(
           '/static/data/user.json'
        ).then(
            res=>{
                if(res.data.auth){
                    next(vm => {
                        // 通过 `vm` 访问组件实例
                        vm.user=res.data.des
                    })
                }else{
                    next('/login')
                }
            }
        ) */
    // console.log(store.state.userData);
    if (store.state.userData.auth) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm.user = store.state.userData.des;
      });
    } else {
      next("/login");
    }
  }
};
</script>

<style scoped>
.my-face{ height:6.65rem; width:100%;display:-moz-box; display:-webkit-box; display:box; -ms-flex-align: center; -webkit-align-items: center; -webkit-box-align: center; align-items: center; background:url(../assets/images/face-bg.jpg) center center no-repeat; background-size:cover; }
.my-face .my-face-con{ height:5rem; width:5rem; margin:0 auto; position:relative;}
.my-face .my-face-pic{ width:3.75rem; height:3.75rem; margin:0 auto; overflow:hidden; border:2px solid #fff; -moz-border-radius:100%;  -webkit-border-radius:100%; border-radius:100%;}
.my-face-con a{display:inline;font:15px/20px "";color:#000;margin: 0 15px}
.my-face p{ width:100%; text-align:center; color:#fff; font-size:0.7rem; position:absolute; bottom:0; left:0; }
.personal-list ul { margin-bottom:0.25rem; border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5; }
.personal-list ul li { padding:0 5%; height:2.25rem;line-height:2.25rem;border-bottom: 1px solid #e5e5e5;background:url(../assets/images/my-arrow.png) 95% center no-repeat;background-size:0.275rem 0.5rem; }
.personal-list ul li:last-child {border-bottom:none;}
.personal-list ul li a.my-icon-wddd{background-image:url(../assets/images/my-icon-wddd.png);}
.personal-list ul li a.my-icon-ddjd{background-image:url(../assets/images/my-icon-ddjd.png);}
.personal-list ul li a.my-icon-grzl{background-image:url(../assets/images/my-icon-grzl.png);}
.personal-list ul li a.my-icon-yhq{background-image:url(../assets/images/my-icon-yhq.png);}
.personal-list ul li a.my-icon-wdjf{background-image:url(../assets/images/my-icon-wdjf.png);}
.personal-list ul li a.my-icon-gsjj{background-image:url(../assets/images/my-icon-gsjj.png);}
.personal-list ul li a.my-icon-bzzx{background-image:url(../assets/images/my-icon-bzzx.png);}
.personal-list ul li a.my-icon-kfzx{background-image:url(../assets/images/my-icon-kfzx.png);}
.personal-list ul li a {color:#181818;font-size:0.7rem;padding-left:2.5em; background-position:left center; background-repeat:no-repeat; background-size:auto 45%;}
.personal-list ul li a .my-tel{ display:inline-block; margin-right:5%; color:#999999; font-size:0.7rem;float:right;}
/*-------个人资料-------*/
</style>
