<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData"></component>
    </keep-alive>
</template>

<script>
    export default {
    	name: 'goodsviewlist',
        data() {
            return {
                componentData: {
                    offerId:this.$route.params.id,
                    requirementId:this.$route.params.reid
                },
                componentIncludeList:['list'],
                currentView:'list',
                currentData:{}
            }
        },
        methods:{
    	 	changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
            }
        },
        components:{
            list: () => import('./group/list'),
            commodity: () => import('@/components/pages/commodity')
        }
    }
</script>
<style scoped lang="scss">
    
</style>
