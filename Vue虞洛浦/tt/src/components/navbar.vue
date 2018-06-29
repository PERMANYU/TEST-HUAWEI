<template>
    <header class="header" id="header">
        <a href="javascript:history.go(-1)" target="_self" class="back">返回</a>
        <a href="javascript:;" v-show="home" class="close" @click="goback">关闭</a>
		<!-- <h1>工人入住</h1> -->
    </header>
</template>

<script>
import store from '../store'
import mapGetters from 'vuex'
export default {
     methods:{
		 home(){},
		 goback(){
			   this.$router.go(-1);
		 }
	 }
}
</script>
<style scoped>
/*-------------header-----------*/
.header {
	position: fixed;
	top: 0;
	left: 0;
	height:2rem;
	line-height:2rem;
	background-color:#1d1d21;
	width:100%;
	display: -moz-box;
	display: -webkit-box;
	display: box;
	-ms-flex-align: center;
	-webkit-align-items: center;
	-webkit-box-align: center;
	align-items: center;
	z-index: 1000;
}
.header a {
	color:#fff;
	font-size:0.7rem;
}
.header a.back {
	background:url(../assets/images/back.png) left center no-repeat;
	background-size:auto 40%;
	padding-left:0.625rem;
	margin:0 0.625rem;
}
</style>
