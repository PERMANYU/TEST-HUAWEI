<template>
	<LeftDialog ref="leftDialog">
		<div class="title">
			<span class="ch">工单信息</span>
			<span class="en">Worksheet Information</span>
		</div>

		<div class="header">
			<img src="./images/gd.png">
			<div class="h-num-box">
				<div class="gdh">工单号：{{componentData.id}}</div>
				<div class="sbh">设备号：{{componentData.prodInstNum}}</div>
				<div class="khbs">客户标识：{{componentData.custCode}}</div>
			</div>
		</div>

		<div class="content">
			<TabPane :tabs="tabPaneList" :value="tabPaneValue" isAuto>
				<!-- 派单记录 -->
				<template slot="pdjl">
					<Scroll isShowRight>
						<Row class="pd-title" inline>
							<Col :width="100">
							</Col>
							<Col :width="100">
								派单时间
							</Col>
							<Col :width="530">
								派单信息
							</Col>
						</Row>
						<Row class="pd-item" inline v-for="(item,index) in componentData.contactResult || []" :key="index">
							<Col :width="200">
								<div class="pd-date">
									{{componentData.createDate | getLocalTime}}
								</div>
							</Col>
							<Col :width="530">
								<span class="pd-info">
									<Row>
										<Col :span="12">
											目标渠道：{{item.targetChlName}}
										</Col>
										<Col :span="12">
											目标渠道编码：{{item.targetChlCode}}
										</Col>
									</Row>
									<Row>
										<Col :span="12">
											处理人工号：{{componentData.contactStaffNum}}
										</Col>
										<Col :span="12">
											处理人：{{componentData.contactStaffNum}}
										</Col>
									</Row>
									<Row>
										<Col>
											备注：{{componentData.remark}}
										</Col>
									</Row>
								</span>
							</Col>
						</Row>
					</Scroll>
					
				</template>
				<!-- 工单详情 -->
				<template slot="gdxq">
					<div class="gd-info">
						<Row>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">调度单编号：</span>
								<span class="app__lt-text">{{componentData.contactOrderId}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">任务编码：</span>
								<span class="app__lt-text">{{componentData.contactTaskId}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">退单人：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('退单人')}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">创建时间：</span>
								<span class="app__lt-text">{{componentData.createDate | getLocalTime}}</span>
							</Col>
						</Row>
						<Row>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">工单状态：</span>
								<span class="app__lt-text">{{componentData.statusCd}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">设备号：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('设备号')}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">订单编号：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('订单编号')}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">退单原因：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('退单原因')}}</span>
							</Col>
						</Row>
						<Row>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">退单人联系方式：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('退单人联系方式')}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">退单来源系统：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('退单来源系统')}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">当前处理人：</span>
								<span class="app__lt-text">{{componentData.contactStaff}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">订单状态：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('订单状态')}}</span>
							</Col>
						</Row>
						<Row>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">受理区局：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('受理区局')}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">受理分局：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('受理分局')}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">营业厅id：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('营业厅id')}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">受理营业厅：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('受理营业厅')}}</span>
							</Col>
						</Row>
						<Row>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">受理工号：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('受理工号')}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">甩单编号：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('甩单编号')}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">促销工号：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('促销工号')}}</span>
							</Col>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">渠道大类：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('渠道大类')}}</span>
							</Col>
						</Row>
						<Row>
							<Col class="app__lt" :span="6">
								<span class="app__lt-label">渠道小类：</span>
								<span class="app__lt-text">{{getContactTaskExtCha('渠道小类')}}</span>
							</Col>
						</Row>
					</div>
				</template>
			</TabPane>
		</div>
	</LeftDialog>
</template>

<script type="text/javascript">
	export default{
		props:{
			componentData: {}
		},
		data(){
			return{
				tabPaneList: [{
					label: '派单记录',
					value: 'pdjl'
				},{
					label: '工单详情',
					value: 'gdxq'
				}],
				tabPaneValue: 'gdxq'
			}
		},
		methods:{
			show(){
				this.$refs.leftDialog.show();
			},
			getContactTaskExtCha(name){ //获取展示内容
				if(!this.componentData.contactTaskExtChaForJson) return;
				return this.componentData.contactTaskExtChaForJson[name];
			}
		}
	}
</script>

<style scoped lang="scss">
	.left-dialog{
		background-color: #f7fbfc !important;
		padding: 0 10px;

		.title{
			height: 65px;
			line-height: 65px;
			color: #243d73;
			font-size: 18px;
		}

		.header{
			height: 135px;
			background-color: #fff;
			box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);

			img{
				margin-top: 27px;
				margin-left: 20px;
			}

			.h-num-box{
				display: inline-block;
				margin-left: 10px;

				.gdh{
					font-size: 18px;
					color: #243d73;
				}
				.sbh,.khbs{
					margin-top: 10px;
					font-size: 12px;
					color: #8e9aae;
				}
			}
		}

		.content{
			width: 100%;
			height: calc(100% - 210px);
			margin-top: 10px;
			padding: 10px;
			min-height: 200px;
			background-color: #fff;

			.pd-title{
				font-weight: bold;
				color: #243d73;
			}

			.pd-item{
				margin-top: 20px;

				.col{
					vertical-align: top;
					color: #8e9aae;
				}
			}

			.pd-date{
				text-align: right;
				padding-right: 20px;
			}

			.pd-info{
				display: inline-block;
				width: 100%;
				padding: 10px 20px;
				background-color: #eaeef9;

				.col{
					padding: 8px 0;
				}
			}

			.gd-info{
				padding: 0 10px;

				.col{
					padding: 8px 0;
				}
			}
		}
	}
</style>