<template>
	<transition name="fade">
		<div class="info">
            <div class="top">
                <span class="page-close" @click="pageClose"></span>
                <span class="iconfont iconkehuxiangqing"></span>
                <span class="ch">账户详情 </span>
                <span class="en">Account Info</span>
            </div>
            
			<Scroll class="main" :isShowRight="true" ref="viewScroll">
                <!-- 组件信息 -->
				<component :is="mainView" :componentData="mainData"></component>
			</Scroll>
		</div>
	</transition>
	
</template>

<script type="text/javascript">
	export default{
        props:{
            componentData:{}
        },
		data(){
			return{
                mainView: 'basic', //当前展示的组件
                mainData: {}, //当前展示的组件数据
                
			}
		},
        created(){
            this.mainData = this.componentData;
        },
        mounted(){
            
        },
        methods:{
            pageClose(){ //页面关闭
                this.$emit('componentView','list')
            }
        },
        components:{
            basic: () => import('./group/basic'),
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

	.info{
		position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 201;
        min-width: 1000px;
        overflow: hidden;
        background-color: #f7fbfc;
        color: #8e9aae;

        .top{
            width: 100%;
            height: 70px;
            line-height: 70px;
            padding-left: 20px;
            margin-bottom: 10px;
            background-color: #fff;
            color: $mainColor;
            font-size: 18px;
            box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);

            .iconkehuxiangqing{
                font-size: 22px;
            }

            .ch{
                font-weight: bold;
            }
        }

        .page-close{
            position: absolute;
            right: 20px;
            top: 20px;
            width: 30px;
            height: 30px;
            background-image: url(./images/close_page.png);
            cursor: pointer;
            z-index: 1;
        }

        .main{
        	float: right;
        	width: 100%;
        	height: calc(100% - 80px);
            overflow: auto;
        }
	}
</style>