<template>
    <transition name="fade">
        <div class="product">
            <div class="content" :style="rightStyle">
            <Left @leftClick="leftClick" :componentData="componentData" @changeId="changeView" @mainProdId="getMainProdId"></Left>

            <div class="right">
                <div class="title">
                    <span class="back" @click="pageClose()">返回</span>
                    <span class="t-name">{{currentData.prodName}}</span>
                    <span class="close" @click="pageClose()"></span>
                </div>
                <component :is="currentView" :componentData="currentData" :mainProdId="mainProdId" ref="component"></component>
                <div class="footer">
                    <span class="save" @click="saveClick()">保存</span>
                </div>
            </div>
            </div>
        </div>
    </transition>
</template> 

<script>
    import Left from './business/left.vue';

    export default {
        name: 'product',
        props:{
            componentData:{}
        },
        data() {
            return {
                currentView:'firstFlow',
                currentData:this.componentData,
                mainProdId:'',
                rightStyle:{
                    paddingLeft: '200px'
                }
            }
        },
        methods:{
            stepClick(val){
                this.currentView = val.componentName;
            },
            getMainProdId(val){
                this.mainProdId = val.toString();
            },
            changeView(val){
                this.currentData = val;
            },
            saveClick(){
                this.$refs.component.save();
            },
            leftClick(isOpen){
                isOpen ? this.rightStyle.paddingLeft = '200px' : this.rightStyle.paddingLeft = '60px';
            },
            pageClose(){
                this.$emit('componentView','prodCatalog',this.componentData)
            },
        },
        components:{
            firstFlow: () => import('./group/first-flow'),
            Left
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
      .product{
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

        .back{
            position: absolute;
            left: 10px;
            top: 10px;
            height: 30px;
            line-height: 30px;
            width: 55px;
            padding: 0 10px;
            color: $mainColor;
            border: 1px solid $mainColor;
            border-radius: 4px;
            text-align: right;
            font-size: 12px;
            background-color: #fff;
            cursor: pointer;
            background-image: url(./images/back.png);
            background-repeat: no-repeat;
            background-position: 5px center;

            &:hover{
                color: #fff;
                background-color: $mainColor;
                background-image: url(./images/back_hover.png);
            }
        }

        .close{
            position: absolute;
            display: block;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            background: url(./images/close_page.png) no-repeat center;

            &:hover{
                opacity: .8;
            }
        }

        .right{
            width: 100%;
            height: 100%;
            padding: 60px 0 50px;

            .title{
                position: absolute;
                display: block;
                top: 0;
                left: 0;
                width: 100%;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                text-align: center;
            }

            .step-box{
                position: absolute;
                top: 50px;
                left: 0;
                width: 100%;
                height: 40px;
                line-height: 40px;
                box-sizing: content-box;
                border-bottom: 10px solid #f5f5f5;
                border-top: 1px solid #f5f5f5;

                .step{
                    display: inline-block;
                    padding: 0 20px;
                    cursor: pointer;
                }

            }

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

                .save{
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 20px;
                    border-radius: 4px;
                    background-color: $mainColor;
                    color: #fff;
                    cursor: pointer;

                    &:hover{
                        opacity: .8;
                    }
                }
            }
        }
    }
</style>
