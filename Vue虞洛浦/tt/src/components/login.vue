<template>
    <div class="content">
        <p class="fhbtn"><a href="javascript:window.history.go(-1);"></a></p>
        <h2></h2>
        <div class="login-box">
            <div class="login">
            <router-link tag="a" to="reg">注册</router-link>
            </div>
        </div>
        <ul>
            <li class="lifirst">
            <input type="text" value="" v-model="yhm" @input="changeIpt" />
            <span>帐号</span>
            </li>
            <li>
            <input type="text" value="" v-model="mima" @input="changeIptt" />
            <span>密码</span>
            </li>
        </ul>
        <div class="footbox">
                <input type="button" value="登 录" class="login-btn" @click="dengl" />
                <a href="javascript:;" class="tishi">忘记密码？</a>
            
        </div>
        </div>
</template>

<script>
import {UPDATE_USER} from '../store/types.js'
import {mapGetters} from "vuex";
// export default {
//     mounted(){
//         this.$http(
//            '/static/data/user.json'
//         ).then(
//             res=>{
//                 console.log(res.data);
//                 this.$store.dispatch(UPDATE_USER,res.data)
//             }
//         )
//     }
// }
export default {
	data(){
		return{
			yhm:'',
			mima:''
		}
	},
	computed:mapGetters([
	"userData"
	]),
	methods:{
        changeIpt(ev){
          this.yhm = ev.srcElement.value
        //   console.log(this.yhm)
		},
		 changeIptt(ev){
          this.mima = ev.srcElement.value
        //   console.log(this.mima)
		},
		dengl(){
			if(this.yhm!=""||this.mima!=""){
			let yhm=this.yhm;
			this.$http({
			url:'http://localhost:3000/login',
			params:{yhm:yhm},
			method:'get',
			withCredentials:true,//跨域凭证
		}).then((res)=>{
			if(res.data.length>0){
             this.$store.dispatch("CuserData",res.data)
			this.$router.push('/my')
			}else{
				alert("用户名或密码错误")
			};
		}).catch((res)=>{
			// console.log(res)
		})
			}else{
				alert("请输入正确的账号和密码")
			}
		}
      },
}
// export default{
  //   data(){
  //     return{
  //       username:'',
  //       password:''
  //     }
  //   },
  //   methods:{
  //     goBack(){
  //       this.$router.go(-1);
  //     },
  //     login(){
  //       this.$http({
  //         url:'http://localhost:3000/login',
  //         params:{
  //           username:this.username,
  //           password:this.password,
  //         },
  //         // withCredentials:true
  //       }).then((res)=>{
  //         console.log(res.data);
  //         if(res.data.error==0){
  //           //路由跳转
  //           console.log('成功可以跳转了');
  //           //存到状态管理，或者直接跳转到user,或者传数据给user
  //           this.$router.push({path:'/user',params:{},query:{}})
  //         }
  //       })
  //     }
  //   }
  // }
</script>

<style>
    body{ background:#f2f4f5;}
    .content{max-width:22rem; margin:0 auto;}
    .content .fhbtn{ padding-top:0.27rem;}
    .content .fhbtn a{ display:block;width:0.23rem;height:0.25rem; background:url(/static/images/headimg.png) no-repeat 0 0; background-size:100%; margin-left:0.3rem;}
    .content h2{width:10rem;height:10rem; background:url(/static/images/headimg.png) no-repeat 0 0; background-size:100%; margin:0 auto; margin-top:3rem;}
    .content .login{width:13.0rem;height:3rem; margin:0 auto; margin-top:1.5rem;}
    .login a{width:13rem;height:1.38rem; font-size:1.35rem; line-height:0.38rem; float:left; color:#4c4f50; text-align:center;}
    .login span{ float:left;height:0.38rem; border-left:1px solid #4c4f50;}
    .content .login-box{ position:relative;}
    .content .login-box .lsolid{width:1.96rem;height:0.18rem; border-bottom:1px solid #4c4f50; position:absolute;top:0;left:0.1rem;}
    .content .login-box .rsolid{width:1.96rem;height:0.18rem; border-bottom:1px solid #4c4f50; position:absolute;top:0;right:0.1rem;}
    .content ul{width:10rem;height:2.92rem; border:0px solid #e5e7e8; background:#fff; margin:0 auto; margin-top:-0.5rem;}
    .content ul li{height:3rem; position:relative;}
    .content ul li.lifirst{border-bottom:1px solid #e5e7e8;}
    .content ul li input{ padding-left:4.24rem;width:20rem;height:100%; font-size:0.4rem;}
    .content ul li span{width:3rem;height:2.49rem; position:absolute;top:0.5rem;left:0.5rem;color:#676868; font-size:1.25rem; line-height:2rem; text-align:center;}
    .content .footbox{width:10rem;height:0.65rem;margin:0 auto; }
    .content .login-btn{width:10rem;height:3rem; background:#4c4f50; color:#fff; text-align:center; line-height:0.65rem; border-radius:8px; display:block; margin-top:4.62rem; font-size:1.28rem;}
    .content .tishi{width:5.4rem; font-size:.7rem; margin-top:1.28rem; display:block;margin-left: 7.28rem;}
  </style>