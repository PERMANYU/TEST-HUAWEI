<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData" ref="component"></component>
    </keep-alive>
</template>

<script>
    export default {
        name: 'goods',
        data() {
            return {
                componentIncludeList:['list'],
                currentView:'list',
                currentData:{}
            }
        },
        methods:{
            changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
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
            commodity: () => import('@/components/pages/commodity'),
            goodsview: () => import('@/components/pages/goodsview'),
            add: () => import('@/components/pages/requirement/group/add'),
            info: () => import('@/components/pages/requirement/group/info'),
            result: () => import('@/components/pages/requirement/group/result'),
        }
    }
</script>
<style scoped lang="scss">

</style>
