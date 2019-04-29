import Vue from 'vue';
import Router from 'vue-router';
import { tokenRouter } from './token.js';
Vue.use(Router)


const Home = () => import( /* webpackChunkName: "home" */ '@/components/pages/home');
const Login = () => import( /* webpackChunkName: "login" */ '@/components/pages/login');
const Main = () => import( /* webpackChunkName: "main" */ '@/components/pages/index');
const Blank = () => import( /* webpackChunkName: "main" */ '@/components/pages/blank');
const NewTab = () => import( /* webpackChunkName: "main" */ '@/components/pages/new-tab');

const Product = () => import( /* webpackChunkName: "product" */ '@/components/pages/product');
const Prods = () => import( /* webpackChunkName: "prods" */ '@/components/pages/prods');

const Propety = () => import( /* webpackChunkName: "propety" */ '@/components/pages/propety');
const PropetyView = () => import( /* webpackChunkName: "propety-view" */ '@/components/pages/propety-view');

const Catalog = () => import( /* webpackChunkName: "catalog" */ '@/components/pages/catalog');
const CatalogView = () => import( /* webpackChunkName: "catalog-view" */ '@/components/pages/catalog-view');

const ServiceOffer = () => import( /* webpackChunkName: "service-offer" */ '@/components/pages/service-offer');
const ServiceOfferView = () => import( /* webpackChunkName: "service-offer-view" */ '@/components/pages/service-offer-view');

const Domain = () => import( /* webpackChunkName: "domain" */ '@/components/pages/domain');
const DomainView = () => import( /* webpackChunkName: "domain-view" */ '@/components/pages/domain-view');

const SystemTable = () => import( /* webpackChunkName: "system-table" */ '@/components/pages/system-table');
const SystemTableView = () => import( /* webpackChunkName: "system-table-view" */ '@/components/pages/system-table-view');

const TemplateType = () => import( /* webpackChunkName: "template-type" */ '@/components/pages/template-type');
const TemplateTypeView = () => import( /* webpackChunkName: "template-type-view" */ '@/components/pages/template-type-view');

const TemplateParameter = () => import( /* webpackChunkName: "template-parameter" */ '@/components/pages/template-parameter');
const TemplateParameterView = () => import( /* webpackChunkName: "template-parameter-view" */ '@/components/pages/template-parameter-view');

const TariffTemplate = () => import( /* webpackChunkName: "tariff-template" */ '@/components/pages/tariff-template');
const TariffTemplateView = () => import( /* webpackChunkName: "tariff-template-view" */ '@/components/pages/tariff-template-view');
const BusinessCategories = () => import( /* webpackChunkName: "business-categories" */ '@/components/pages/business-categories');
const BusinessObject = () => import( /* webpackChunkName: "business-object" */ '@/components/pages/business-object');

const Requirement = () => import( /* webpackChunkName: "requirement" */ '@/components/pages/requirement');
const RequirementView = () => import( /* webpackChunkName: "requirement-view" */ '@/components/pages/requirement-view');

//销售品
const goods = () => import( /* webpackChunkName: "goods" */ '@/components/pages/goods');
//待办需求单
const RemainDone = () => import( /* webpackChunkName: "remaindone" */ '@/components/pages/remain-done');
//销售品里查全视图基本信息
const goodsview = () => import( /* webpackChunkName: "goodsview" */ '@/components/pages/goodsview');
const goodsviewlist = () => import( /* webpackChunkName: "goodsview" */ '@/components/pages/goodsviewlist');
//流程管理
const FlowManage = () => import( /* webpackChunkName: "flow-manage" */ '@/components/pages/flow-manage');
//模型管理
const ModelManage = () => import( /* webpackChunkName: "model-manage" */ '@/components/pages/model-manage');
//流程实例
// const ProcessInstance = () => import( /* webpackChunkName: "process-intsance" */ '@/components/pages/process-instance');
//销售品组
const OfferGroup = () => import( /* webpackChunkName: "offer-group" */ '@/components/pages/offer-group');
//清退管理规则
const RepayingManage = () => import( /* webpackChunkName: "repaying-manage" */ '@/components/pages/repaying-manage');

// 可见性管理
const AccessGroup = () => import( /* webpackChunkName: "access-group" */ '@/components/pages/access-group');

// 公允价值
const FairValue = () => import( /* webpackChunkName: "fair-value" */ '@/components/pages/fair-value');
// 礼包管理
const GiftManage = () => import( /* webpackChunkName: "gift-manage" */ '@/components/pages/gift-manage');
// 销售品临时下线
const InsertingCoil = () => import( /* webpackChunkName: "inserting-coil" */ '@/components/pages/inserting-coil');
//销售品补充配置
const OfferSupplementary = () => import(/* webpackChunkName: "offer-supplementary" */ '@/components/pages/offer-supplementary');
//销售品补充配置（显示当前登陆人的销售品）
const OfferCurrent = () => import(/* webpackChunkName: "offer-current" */ '@/components/pages/offer-current');

const router = new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },{
            path: '/login',
            name: 'Login',
            component: Login
        },{
            path: '/goodsview/:id/:reid',
            name: 'goodsview',
            component: goodsview
        },{
            path: '/goodsviewlist/:id/:reid',
            name: 'goodsviewlist',
            component: goodsviewlist
        },{
            path: '/main',
            name: 'Main',
            component: Main,
            children:[{
                path:'blank',
                name:'Blank',
                component: Blank
            },{
                path:'new-tab',
                name:'NewTab',
                component: NewTab
            },{
                path:'propety',
                name:'Propety',
                component: Propety
            },{
                path:'propety-view',
                name:'PropetyView',
                component: PropetyView
            },{
                path:'catalog',
                name:'Catalog',
                component: Catalog
            },{
                path:'catalog-view',
                name:'CatalogView',
                component: CatalogView
            },{
                path:'service-offer',
                name:'ServiceOffer',
                component: ServiceOffer
            },{
                path:'service-offer-view',
                name:'ServiceOfferView',
                component: ServiceOfferView
            },{
                path:'domain',
                name:'Domain',
                component: Domain
            },{
                path:'domain-view',
                name:'DomainView',
                component: DomainView
            },{
                path:'system-table',
                name:'SystemTable',
                component: SystemTable
            },{
                path:'system-table-view',
                name:'SystemTableView',
                component: SystemTableView
            },{
                path:'template-type',
                name:'TemplateType',
                component: TemplateType
            },{
                path:'template-type-view',
                name:'TemplateTypeView',
                component: TemplateTypeView
            },{
                path:'template-parameter',
                name:'TemplateParameter',
                component: TemplateParameter
            },{
                path:'template-parameter-view',
                name:'TemplateParameterView',
                component: TemplateParameterView
            },{
                path:'tariff-template',
                name:'TariffTemplate',
                component: TariffTemplate
            },{
                path:'tariff-template-view',
                name:'TariffTemplateView',
                component: TariffTemplateView
            },{
                path:'product',
                name:'Product',
                component: Product
            },{
                path:'requirement',
                name:'Requirement',
                component: Requirement
            },{
                path:'requirement-view',
                name:'RequirementView',
                component: RequirementView
            },{
                path:'business-categories',
                name:'BusinessCategories',
                component: BusinessCategories
            },{
                path:'business-object',
                name:'BusinessObject',
                component: BusinessObject
            },{
                path:'goods',
                name:'Goods',
                component: goods
            },{
                path:'remain-done',
                name:'RemainDone',
                component: RemainDone
            },{
                path:'access-group',
                name:'AccessGroup',
                component: AccessGroup
            },{
                path:'offer-group',
                name:'OfferGroup',
                component: OfferGroup
            },{
                path:'flow-manage',
                name:'FlowManage',
                component: FlowManage
            },{
                path:'model-manage',
                name:'ModelManage',
                component: ModelManage
            },{
                path:'repaying-manage',
                name:'RepayingManage',
                component: RepayingManage
            },{
                path: 'fair-value',
                name: 'FairValue',
                component: FairValue
            },{
                path:'gift-manage',
                name:'GiftManage',
                component: GiftManage
            },{
                path:'offer-supplementary',
                name:'OfferSupplementary',
                component:OfferSupplementary
            },{
                path:'prods',
                name:'Prods',
                component: Prods
            },{
                path:'inserting-coil',
                name:'InsertingCoil',
                component: InsertingCoil
            },{
                path:'offer-current',
                name:'OfferCurrent',
                component: OfferCurrent
            }]
        }]
})



router.beforeEach((to, from, next) => {
    let token = Vue.prototype.$user.getToken(),
    isValidLogin = Vue.prototype.$user.isValidLogin();
    if(token && !isValidLogin) {
        tokenRouter(token,next);
    } else {
        if(to.name !== 'Login'){
            if(isValidLogin){
                next();
            }else{
                router.push({ path: `/login` })
            }
        }else{
            if(isValidLogin){
                router.push({ path: `/` })
            }else{
                next();
            }
        }
    }
})


router.afterEach((to, from) => {
    //全局后置钩子
    // window.appProgress.end();
})

export default router;
