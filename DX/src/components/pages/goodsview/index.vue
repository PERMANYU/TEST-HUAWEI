<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" @backClose="pageClose" :componentData="componentData"></component>
    </keep-alive>
</template>

<script>
    export default {
    	name: 'goodsview',
        props:{
            componentData:{}
        },
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
            pageClose() {
                this.$emit('componentView','list',this.componentData)
            },
        },
        components:{
            list: () => import('./group/list'),
            commodity: () => import('@/components/pages/commodity')
        }
    }
</script>
<style scoped lang="scss">
    
</style>
