import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import home from '../components/home';
import worker_join from '../components/worker_join'
import my_order from '../components/my_order'
import my from '../components/my'
import repair_details from '../components/repair_details'
import floor_class from '../components/floor_class'
import add_class from '../components/add_class'
import goods_allocation from '../components/goods_allocation'
import book_recovery from '../components/book_recovery'
import order_payment from '../components/order_payment'
import order_schedule1 from '../components/order_schedule1'
import order_evaluation from '../components/order_evaluation'
import personal_data from '../components/personal_data'
import coupons from '../components/coupons'
import login from '../components/login'
import reg from '../components/reg'
export default new Router({
  routes: [
    { path: '/',redirect:"/home"},
    { path: '/home',component:home},
    { path: '/floor_class',component:floor_class},
    { path: '/worker_join',component:worker_join},
    { path: '/repair_details',component:repair_details},
    { path: '/add_class',component:add_class},
    { path: '/my_order',component:my_order},
    { path: '/book_recovery',component:book_recovery},
    { path: '/goods_allocation',component:goods_allocation},
    { path: '/my',component:my},
    { path: '/order_payment',component:order_payment},
    { path: '/order_schedule1',component:order_schedule1},
    { path: '/order_evaluation',component:order_evaluation},
    { path: '/personal_data',component:personal_data},
    { path: '/login',component:login},
    { path: '/coupons',component:coupons},
    { path: '/reg',component:reg},
  ]
})
