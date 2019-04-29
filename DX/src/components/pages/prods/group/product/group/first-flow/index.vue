<template>
    <div class="first-flow">
        <div class="step-box">
            <TabBox :tabs="tabs" v-model="tab"></TabBox>
        </div>
        <component :is="currentView" @componentView="changeView" :mainProdId="mainProdId" :componentData="componentData" ref="component"></component>
    </div>
</template>

<script>
    export default {
        name: 'first-flow',
        props:{
            componentData:{},
            mainProdId:''
        },
        data() {
            return {
                currentView:'info',
                currentData:{},
                tabs:[{
                    name:'基本信息',
                    componentName:'info'
                },{
                    name:'产品关系信息',
                    componentName:'rel'
                },{
                    name:'产品业务流程信息',
                    componentName:'flow'
                },{
                    name:'服务标准',
                    componentName:'standard'
                },{
                    name:'产品属性',
                    componentName:'attr'
                },{
                    name:'产品定价',
                    componentName:'prices'
                }],
                tab:'',
            }
        },
        watch:{
            tab(val,old){
                this.stepClick(val);
            },
            currentData(val,old){
            },
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
            attr: () => import('./group/attr'),
            flow: () => import('./group/flow'),
            info: () => import('./group/info'),
            rel: () => import('./group/rel'),
            standard: () => import('./group/standard'),
            prices: () => import('./group/prices')
        }
    }
</script>
<style scoped lang="scss">
    .first-flow{
        width: 100%;
        height: 100%;
        padding-top: 40px;

        .step-box{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #f5f5f5;

            .step{
                display: inline-block;
                padding: 0 10px;
                cursor: pointer;
            }

        }
    }
</style>
