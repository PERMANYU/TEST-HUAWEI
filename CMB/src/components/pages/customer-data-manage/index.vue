<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData" ref="currentComponent"></component>
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
        mounted () {
            
        },
        watch:{
            currentView(to,from){
                if (to === 'list' && this.$refs.currentComponent.isAddSuccess) {
                    this.$nextTick( () => {
                        this.$refs.currentComponent.getListData(1)
                    })
                }
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
            alteration: () => import('./group/alteration'), // 客户部门变更
            omit: () => import('./group/omit'), // 子客户遗漏
            return: () => import('./group/return') // 子客户误归
        }
    }
</script>
<style scoped lang="scss">

</style>
