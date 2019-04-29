<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData"></component>
    </keep-alive>
</template>

<script>
    export default {
        name: 'business-object',
        data() {
            return {
                componentIncludeList:['list'],
                currentView:'list',
                currentData:{}
            }
        },
        watch:{
             currentView(to,from){
                if(to === 'list'){
                    this.removeComponentInclude('list');
                }else{
                    this.addComponentInclude('list')
                }
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
        },
        components:{
            list: () => import('./group/list'),
            add: () => import('./group/add'),
            updata: () => import('./group/updata')
        }
    }
</script>
<style scoped lang="scss">

</style>
