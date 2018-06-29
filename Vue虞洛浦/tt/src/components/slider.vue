<template>
    <swipe class="my-swipe" :speed="100" :auto="1000">
      <swipe-item class="slide1"><img src="http://img0.imgtn.bdimg.com/it/u=1872180945,3331086337&fm=27&gp=0.jpg" alt=""></swipe-item>
      <swipe-item class="slide2"><img src="http://img4.imgtn.bdimg.com/it/u=3323261981,473798735&fm=11&gp=0.jpg" alt=""></swipe-item>
      <swipe-item class="slide3"><img src="http://img3.imgtn.bdimg.com/it/u=2789738946,3211100515&fm=27&gp=0.jpg" alt=""></swipe-item>
    </swipe>
</template>
<script>
  import '../../node_modules/vue-swipe/dist/vue-swipe.css';
  import { Swipe, SwipeItem } from 'vue-swipe';
  export default{
    components: {
      'swipe': Swipe,
      'swipe-item': SwipeItem
    }
  }
</script>
<style lang="">
  .my-swipe {
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }
  
  .slide1 {
    background-color: #0089dc;
    color: #fff;
  }
  
  .slide2 {
    background-color: #ffd705;
    color: #000;
  }
  
  .slide3 {
    background-color: #ff2d4b;
    color: #fff;
  }
</style>