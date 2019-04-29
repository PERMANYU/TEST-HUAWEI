<template>
    <transition name="fade">
        <div class="commodity">
            <div class="content" :style="rightStyle">
                <!--不管有没有关联需求单，左边菜单都要显示-->
                <Left :componentData="componentData" 
                    @leftClick="leftClick" 
                    @flowBack="flowBack" 
                    @bindRequirementId="bindRequirementId"
                    @goodsBasicReInfo="goodsBasicReInfo"
                    v-show="isShow"
                    ref="leftRef"></Left>

                <div class="right">
                    <Title :componentData="componentData" @backClose="pageClose" @bindRequirementId="bindRequirementId"></Title>

                    <Step v-model="currentStep"
                        :componentData="componentData"
                        @change="stepChange"
                        @taskObj="taskObj"
                        ref="stepRef"></Step>
                    <component :is="currentView"
                        :componentData="componentData"
                        :nodes="componentNodes"
                        @componentView="changeView"
                        @saveStatus="saveStatus"
                        ref="component"></component>
                    <div class="footer">
                        <span v-if="currentView != 'release'"  class="btn save" @click="saveClick()">全部保存</span>
                        <span v-else class="btn save" @click="saveClick()">保存</span>
                        <span v-if="currentView != 'release'" class="btn next" @click="nextClick()">下一步</span>
                        <span class="btn back" @click="backClick()">返回</span>
                    </div>
                </div>
            </div>
        </div>

    </transition>
</template>

<script>
    import Left from './business/left.vue';
    import Step from './business/step.vue';
    import Title from './business/title.vue';

    export default {
        name: 'commodity',
        props:{
            componentData:{}
        },
        data() {
            return {
                currentView:'',
                currentData:{},
                currentStep:{},
                isShow:true,
                rightStyle:{
                    paddingLeft: '200px'
                },
                componentNodes:[]
            }
        },
        watch:{
            currentStep(val,old){
                this.componentNodes = val.components;
                this.currentView = val.nodeCode;
            }
        },
        created(){
            let tempOfferName = this.componentData.offerName;
            this.$delete(this.componentData,'offerName');
            this.$set(this.componentData,'offerName',tempOfferName);
            this.$set(this.componentData,'showRightTopClose',true);
        },
        mounted(){
            if(this.$parent.$options.name == 'OfferSupplementary') {
                this.rightStyle = {
                    paddingLeft: '0px'
                };
                this.isShow = false;
            }
        },
        methods:{
            changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
            },
            stepChange(val){
                this.stepClick(val);
            },
            async stepClick(val){
                await this.$refs.component.save().then(result => {
                    if(result){
                        this.currentView = val.nodeCode;
                        this.currentStep = val;
                    }
                })
            },
            async saveClick(isNext = false){
                await this.$refs.component.save().then(result => {
                    if(result){
                        if(isNext) this.$refs.stepRef.next();
                    }
                })
            },
            nextClick(){
                this.saveClick(true);
            },
            backClick(){
                this.pageClose();
            },
            saveStatus(val){
                // val ? this.currentStep.isSave = true : '';
            },
            pageClose(){
            	if(this.componentData.actType == 'MOD'){
            		this.$emit('componentView','change',this.componentData);
            	}else{
            		if(this.componentData.parentPage=='goods' ||　this.$parent.$options.name == 'OfferSupplementary'){
	                    this.$emit('componentView','list');
	                }else if(this.componentData.parentPage=='remainDone'){
	                    if(this.$parent.$options.name == 'remain-done'){
	                        this.$emit('componentView','info',this.componentData)
	                    }else if(this.$parent.$options.name == 'requirement'){
	                        this.$emit('componentView','info2',this.componentData)
	                    }
	                }　else {
	                    this.$emit('componentView','info',this.componentData)
	                }
            	}
            },
            flowBack() {
            	this.$emit('componentView','list');
            },
            leftClick(isOpen){
                isOpen ? this.rightStyle.paddingLeft = '200px' : this.rightStyle.paddingLeft = '60px';
            },
            bindRequirementId(){
            	this.$refs.stepRef.getNodeAndComponent();
            },
            taskObj(item){
            	this.$set(this.componentData,'taskId',item.taskId)
                this.$refs.leftRef.setTask(item);
            },
            goodsBasicReInfo(){
                //同步CRM后重新刷新基本信息
                let component = this.$refs.component;
                 try{
                    if(typeof(eval(component.reBasicInfo)) == "function"){
                        component.reBasicInfo();
                    }
                }catch(e){

                }
            }
        },
        components:{
            channel: () => import('./group/channel'),
            customer: () => import('./group/customer'),
            goods: () => import('./group/goods'),
            ready: () => import('./group/ready'),
            release: () => import('./group/release'),
            sales: () => import('./group/sales'),
            service: () => import('./group/service'),
            validate: () => import('./group/validate'),
            Left,
            Step,
            Title
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

    .commodity{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 201;
        overflow: auto;
        background-color: #fff;

        .content{
            width: 100%;
            height: 100%;
            padding-left: 200px;
            min-width: 1200px;
            transition: .3s all ease;
        }

        .right{
            width: 100%;
            height: 100%;
            padding: 126px 0 50px;

            .footer{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 50px;
                line-height: 50px;
                padding: 0 20px;
                border-top: 1px solid #f5f5f5;
                text-align: right;
                background-color: #fff;

                .btn{
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 20px;
                    margin-right: 10px;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .save{
                    background-color: $mainColor;
                    color: #fff;

                    &:hover{
                        opacity: .8;
                    }
                }

                .next{
                    background-color: #ff9805;
                    color: #fff;

                    &:hover{
                        opacity: .8;
                    }
                }

                .back{
                    background-color: #f5f6fa;
                    color: #5b9cf5;

                    &:hover{
                        background-color: #5b9cf5;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
