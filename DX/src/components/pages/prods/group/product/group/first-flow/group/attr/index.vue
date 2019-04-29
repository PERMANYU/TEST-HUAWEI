<template>
	<transition name="fade">
        <keep-alive :include="componentIncludeList">
		    <component :is="currentView" @componentView="changeView" :componentData="currentData"  :prodObj="componentData" ref="component"></component>
        </keep-alive>
    </transition>
</template>

<script>
    export default {
        props:{
            componentData:{}
        },
        name: 'attr',
        data() {
            return {
                componentIncludeList:['attrlist'],
                currentView:'attrlist',
                currentData:{},
                tabs:[{
                    name:'产品属性',
                    componentName:'attrlist'
                },{
                    name:'属性添加',
                    componentName:'attradd'
                }],
            }
        },
        watch:{
		},
		mounted(){
			
		},
        methods:{
            changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
            },
            stepClick(val){
                this.currentView = val.componentName;
            },
            save(){
                this.$refs.component.save();
            }
        },
        components:{
            attrlist: () => import('./group/attr_list'),
            attradd: () => import('./group/attr_add')
        }
    }
</script>
<style scoped lang="scss">

	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s ease;
	}

	.fade-enter,
	.fade-leave-to {
		top: -100% !important;
	}
</style>
