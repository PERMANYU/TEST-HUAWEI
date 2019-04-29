<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData"></component>
    </keep-alive>
</template>

<script>
    export default {
        name: 'propety',
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
        },
        components:{
            list: () => import('./group/list'),
            history: () => import('./group/history'),
            account: () => import('./group/history/account.vue')
        }
    }
</script>
<style scoped lang="scss">

</style>
