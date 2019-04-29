import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)

const Home = () => import( /* webpackChunkName: "home" */ '@/components/pages/home');
const newHome = () => import( /* webpackChunkName: "new-home" */ '@/components/pages/new-home');

const Main = () => import( /* webpackChunkName: "main" */ '@/components/pages/index');
const Login = () => import( /* webpackChunkName: "login" */ '@/components/pages/login');

// 客户分配
const DistributionClient = () => import( /* webpackChunkName: "distribution-client" */ '@/components/pages/distribution-client');
// 客户数据管理
const CustomerManage = () => import( /* webpackChunkName: "customer-manage" */ '@/components/pages/customer-data-manage');
// 重点客户查询
const KeyCustomer = () => import( /* webpackChunkName: "key-customer" */ '@/components/pages/key-customer');
// 客户树
const ClientTree = () => import( /* webpackChunkName: "client-tree" */ '@/components/pages/client-tree');
// 批量导入
const BlukImport = () => import( /* webpackChunkName: "bluk-import" */ '@/components/pages/bluk-import');
// 客户引擎
const ClientEngine = () => import( /* webpackChunkName: "client-egine" */ '@/components/pages/client-engine');
// 账户管理
const AccountManagement = () => import( /* webpackChunkName: "account-management" */ '@/components/pages/account-management');

// 公客客户
const ClientPublic = () => import( /* webpackChunkName: "bluk-import" */ '@/components/pages/client-public');

//客户资产
const Asset = () => import( /* webpackChunkName: "asset" */ '@/components/pages/asset');
//号码归属地查询
const NumAscription = () => import( /* webpackChunkName: "num-ascription" */ '@/components/pages/num-ascription');
//政企白名单
const specialCustomer = () => import( /* webpackChunkName: "special-customer" */ '@/components/pages/special-customer');
//97退单
const returnOrder = () => import( /* webpackChunkName: "return-order" */ '@/components/pages/return-order');

//空白页面跳转
const Blank = () => import( /* webpackChunkName: "blank" */ '@/components/pages/blank');

//全新首页
//首页2
const CustAcct = () => import( /* webpackChunkName: "custacct" */ '@/components/pages/custacct')

const router = new Router({
    routes: [{
            path: '/home',
            name: 'Home',
            component: newHome
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path:'/custacct',
            name:'CustAcct',
            component: CustAcct
        },{
            path: '/blank',
            name:'Blank',
            component: Blank
        },
        {
            path: '/',
            name: 'Main',
            redirect: '/login',
            component: Main,
            children:[{
                path:'distribution-client',
                name:'DistributionClient',
                component: DistributionClient
            },{
                path: 'key-customer',
                name:'KeyCustomer',
                component: KeyCustomer
            },{
                path: 'customer-manage',
                name:'CustomerManage',
                component: CustomerManage
            },{
                path: 'client-tree',
                name:'ClientTree',
                component: ClientTree
            },{
                path: 'bluk-import',
                name:'BlukImport',
                component: BlukImport
            },{
                path: 'client-engine',
                name:'ClientEngine',
                component: ClientEngine
            },{
                path: 'account-management',
                name:'AccountManagement',
                component: AccountManagement
            },{
                path: 'client-public',
                name:'ClientPublic',
                component: ClientPublic
            },{
                path: 'asset/:menu_type',
                name:'asset',
                component: Asset
            },{
                path: 'num-ascription',
                name:'numAscription',
                component: NumAscription
            },{
                path: 'special-customer',
                name:'specialCustomer',
                component: specialCustomer
            },{
                path: 'return-order',
                name:'returnOrder',
                component: returnOrder
            }]
        }]
})

router.beforeEach((to, from, next) => {
    //全局前置守卫

    //登录页面不做权限验证
    if(to.name === 'Login'){
        next();
        return
    }

    //首页无权限时不刷新
    let isAutoHome = from.name === null && to.name !== 'Home'
    //第一次进入系统时调用权限
    if(from.name === null || from.name === 'Login'){
        Vue.prototype.$user.getAuthority(Vue,router,to,next,isAutoHome);
    }else{
        if(Vue.prototype.$user.isValidLogin()){
            next();
        }else{
            next({ path: `/home` });
        }
    }
})

router.afterEach((to, from) => {
    //全局后置钩子
})

export default router;
