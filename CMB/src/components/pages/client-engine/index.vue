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
        watch:{
            currentView(to,from){
                if (to === 'list' && this.$refs.currentComponent.isAddSuccess) {
                    this.$nextTick( () => {
                        this.$refs.currentComponent.getListData()
                    })
                }
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
            add: () => import('./group/add'),
            detail: () => import('./group/groups/detail')
        }
    }
</script>
<style scoped lang="scss">

</style>
