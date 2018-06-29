<template>
  <div id="app">
    <loading v-show="bLoading"></loading>
    <navbar v-show="bNav"></navbar>
    <transition
      enter-active-class="animated rollIn"
      leave-active-class="animated rollOut"
    >
    <router-view/>
    </transition>
    <footbar v-show="bFoot"></footbar>
  </div>
</template>
<script>
import navbar from './components/navbar'
import footbar from './components/footbar'
import home from './components/home'
import loading from './loading/components/loading'
import {mapGetters} from 'vuex'
import floor_class from './components/floor_class'
import goods_allocation from './components/goods_allocation'
import repair_details from './components/repair_details'
import book_recovery from './components/book_recovery'
export default {
  components:{
    navbar,footbar,home,floor_class,goods_allocation,repair_details,book_recovery
  },
  watch:{
    $route(){
      // console.log('watch 变化了',this.$route.path);
      this.checkRoute(this.$route.path)
    }
  },
  computed:mapGetters([
     'bNav','bFoot',"bLoading"
  ]),
  mounted(){
    // console.log('mounted',this.$route.path);
    this.checkRoute(this.$route.path)
     this.$store.dispatch('SHOW_LOADING');
        setTimeout(()=>{
            this.$http(
            "http://localhost:8080/index.html"
        ).then(
            res=>{
              this.$store.dispatch('HIDE_LOADING');
              this.list = res.data
            }
        )
        },2000);
  },
  methods:{
    checkRoute(path){
      if(/\/|home|my_order|my|worker_join/.test(path)){
        this.$store.dispatch('SHOW_NAV');
        this.$store.dispatch('SHOW_FOOT');
      }
      if(/user/.test(path)){
        this.$store.dispatch('HIDE_NAV');
        this.$store.dispatch('SHOW_FOOT');
      }
      if(/login|reg|repaire_details/.test(path)){
        this.$store.dispatch('SHOW_NAV');
        this.$store.dispatch('HIDE_FOOT');
      }
    }
  }
}
</script>

<style>
</style>
