<template>
    <keep-alive :include="componentIncludeList">
        <component :is="currentView" @componentView="changeView" :componentData="currentData" ref="component"></component>
    </keep-alive>
</template>

<script>
    export default {
    	name: 'GiftManage',
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
            info: () => import('./group/info'),
        }
    }
</script>
<style scoped lang="scss">

</style>
