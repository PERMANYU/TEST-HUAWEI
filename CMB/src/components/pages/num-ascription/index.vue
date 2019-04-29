<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData"></component>
    </keep-alive>
</template>

<script>
    export default {
        name: 'num-ascription',
        data() {
            return {
                componentIncludeList:['info'],
                currentView:'info',
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
            info: () => import('./group/info')
        }
    }
</script>
<style scoped lang="scss">

</style>
