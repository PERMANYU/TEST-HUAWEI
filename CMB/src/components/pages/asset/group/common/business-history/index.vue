<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData" @initEnd="componentInitEnd" :ref="currentView" @mounted="componentMounted"></component>
    </keep-alive>
</template>

<script>
    export default {
        name: 'asset',
        data() {
            return {
                componentIncludeList:['list'],
                currentView:'',
                currentData:{}
            }
        },
        methods:{
            changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
            },
            init(item){
                this.currentView = 'list';
                this.currentData = item;

                if(this.$refs.list) this.$refs.list.init();
            },
            componentMounted(){
                if (this.currentView == 'list') this.$refs.list.init();
            },
            componentInitEnd(){
                this.$emit('initEnd')
            }
        },
        components:{
            list: () => import('./group/list'),
            info: () => import('./group/info')
        }
    }
</script>
<style scoped lang="scss">

</style>
