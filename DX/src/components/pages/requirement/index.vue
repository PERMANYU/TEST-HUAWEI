<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData" ref="component"></component>
    </keep-alive>
</template>

<script>
    export default {
    	name: 'requirement',
        data() {
            return {
                componentIncludeList:['list'],
                currentView:'list',
                currentData:{}
            }
        },
        watch:{
            currentView(to,from){
                if(to === 'list' || to === 'result'){
                    this.removeComponentInclude('list')
                }else{
                    this.addComponentInclude('list')
                }
            }
        },
        mounted() {
			if(this.$route.params.route) {
				this.currentView = this.$route.params.route;
				this.currentData = this.$route.params.val;
			}
		},
        methods:{
    	 	changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
            },
            addComponentInclude(val){
                this.componentIncludeList.find( item => item === val) ? '' :
                this.componentIncludeList.push(val);
            },
            removeComponentInclude(val){
                this.componentIncludeList = this.componentIncludeList.filter(item => item !== val);
            },
            globalback(){
                let component = this.$refs.component;
                try{
                    if(typeof(eval(component.globalback)) == "function"){
                        component.globalback();
                    }else{
                        this.$router.push({ path: `/` });
                    }
                }catch(e){
                    this.$router.push({ path: `/` });
                }
            }
        },
        components:{
            list: () => import('./group/list'),
            add: () => import('./group/add'),
            prodAdd: () => import('./group/prod-add'),
            prodApproval: () => import('@/components/pages/product/group/approval'),
            requirementProdInfo: () => import('@/components/pages/requirement/group/prod-info'),
            info: () => import('./group/info'),
            requirementInfo: () => import('./group/requirementInfo'),
            result: () => import('./group/result'),
            prodCatalog: () => import('./group/prod-catalog'),
            commodity: () => import('@/components/pages/commodity'),
            product: () => import('@/components/pages/product'),
            info2: () => import('@/components/pages/remain-done/group/info'),    //点击列表查看跳转待办需求单info
            change: () => import('./group/change'),
            repayAdd: () => import('./group/repay-add'),
            repayInfo: () => import('./group/repay-info'),
            repayDeal: () => import('./group/repay-deal')
        }
    }
</script>
<style scoped lang="scss">

</style>
