<template>
	<transition name="fade">
		<div class="info">
			<Scroll>
                <div class="t-header">
                    <i>订单详情</i>
                    <span class="close" @click="pageClose()"></span>
                    <span></span>
                </div>

                <div class="a-v-title">
                    <div class="app__title-1">
                        <span class="app__title-name">基本信息</span>
                    </div>
                </div>

                <div class="detail-content">
                	<Row>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">订单标识：</span>
                            <span class="app__lt-text">{{mainData.custOrderId || '空'}}</span>
                        </Col>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">订单编码：</span>
                            <span class="app__lt-text">{{mainData.custOrderNbr || '空'}}</span>
                        </Col>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">订单类型：</span>
                            <span class="app__lt-text">{{mainData.custOrderType || '空'}}</span>
                        </Col>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">操作类型：</span>
                            <span class="app__lt-text">{{mainData.operType || '空'}}</span>
                        </Col>
                    </Row>

                    <Row>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">初次受理时间：</span>
                            <span class="app__lt-text">{{mainData.acceptDate || '空'}}</span>
                        </Col>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">本地网标识：</span>
                            <span class="app__lt-text">{{mainData.acceptLanId || '空'}}</span>
                        </Col>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">区域标识：</span>
                            <span class="app__lt-text">{{mainData.acceptRegionId || '空'}}</span>
                        </Col>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">鉴权方式：</span>
                            <span class="app__lt-text">{{mainData.authType || '空'}}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">创建时间：</span>
                            <span class="app__lt-text">{{mainData.createDate || '空'}}</span>
                        </Col>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">创建组织标识：</span>
                            <span class="app__lt-text">{{mainData.createOrgId || '空'}}</span>
                        </Col>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">创建组织岗位：</span>
                            <span class="app__lt-text">{{mainData.createPost || '空'}}</span>
                        </Col>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">创建员工：</span>
                            <span class="app__lt-text">{{mainData.createStaff || '空'}}</span>
                        </Col>
                    </Row>

                    <Row>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">渠道标识：</span>
                            <span class="app__lt-text">{{mainData.orderSource || '空'}}</span>
                        </Col>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">优先级：</span>
                            <span class="app__lt-text">{{mainData.priority || '空'}}</span>
                        </Col>
                        <Col class="app__lt" :span="6">
                            <span class="app__lt-label">备注：</span>
                            <span class="app__lt-text">{{mainData.remark || '空'}}</span>
                        </Col>
                    </Row>

                </div>

            </Scroll>
		</div>
	</transition>
</template>

<script type="text/javascript">
	export default{
		props: {
	        componentData: {}
	    },
		data(){
			return{
                mainData: this.componentData.customerOrderDetail
			}
		},
		methods:{
			pageClose(){
				this.$emit('componentView','list');
			}
		}
	}
</script>

<style scoped lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.3s ease;
	}

	.fade-enter,
	.fade-leave-to {
		top: -100% !important;
	}

	.info {
		position: fixed;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding: 20px 20px 40px;
		top: 0;
		left: 0;
		z-index: 202;
		overflow: auto;
		background-color: #fff;

		.t-header {
	        height: 50px;
	        text-align: center;
	        border-bottom: 1px solid #f6f6f6;
	        i {
	            font-size: 16px;
	            font-weight: bold;
	        }
	        .close {
	            position: absolute;
	            display: block;
	            top: 0;
	            right: 10px;
	            width: 30px;
	            height: 30px;
	            cursor: pointer;
	            background: url("~@/assets/images/icon/close_page.png") no-repeat center;

	            &:hover {
	                opacity: 0.8;
	            }
	        }
	    }

        .col{
            padding: 8px 0;
        }

	}
</style>