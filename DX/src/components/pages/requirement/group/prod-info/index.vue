<template>
	<div class="prod-info">
		<Scroll :isShowRight="true">
			<div class="requirement-box">
				<div class="a-v-title1">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>需求单信息</span>
					</div>
					<div class="h-a-add">
						<div :class="['app__btn',requirementInfoShowFlag ? 'app__btn-show':'app__btn-slide']" 
							@click="requirementInfoShowClick">{{requirementInfoShowFlag ? '更多' : '收起'}}</div>
					</div>
				</div>
				<div :class="['require-info',requirementInfoShowFlag?'active':'']">
					<Row>
						<Form labelWidth="120px" labelAlign="left">
							<Col :span="4">
								<FormItem labelText="需求单编码：" small>
									<span>{{componentData.requirementCode}}</span>
								</FormItem>
							</Col>

							<Col :span="7" :offset="1">
								<FormItem labelText="产品名称：" small>
									<span>{{componentData.requirementName}}</span>
								</FormItem>
							</Col>
							<Col :span="5" :offset="1">
								<FormItem labelText="业务管理部门产品经理：" small>
									<span>{{componentData.contName}}</span>
								</FormItem>
							</Col>
							<Col :span="5" :offset="1">
								<FormItem labelText="业务管理部门产品经理联系电话：" small>
									<span>{{componentData.contTele}}</span>
								</FormItem>
							</Col>
						</Form>
					</Row>
					<Row>
						<Form labelWidth="120px" labelAlign="left">
							<Col :span="4">
								<FormItem labelText="需求单类型：" small>
									<span>{{componentData.requestType == '10' ? '产品' : '销售品'}}</span>
								</FormItem>
							</Col>

                            <Col :span="7 " :offset="1 ">
                                <FormItem labelText="业务运营部门产品经理联系电话：" small>
                                    <span>{{componentData.itTele}}</span>
                                </FormItem>
                            </Col>
							<!-- <Col :span="7" :offset="1">
								<FormItem labelText="预期完工时间：" small>
									<span>{{componentData.expectFinishDate | datetime}}</span>
								</FormItem>
							</Col> -->
							<Col :span="5" :offset="1">
								<FormItem labelText="业务管理部门：" small>
									<span>{{componentData.deptCode}}</span>
								</FormItem>
							</Col>
							<Col :span="5" :offset="1">
								<FormItem labelText="需求单功能类型：" small>
									<span>{{componentData.actType == "ADD"?"新增":componentData.actType == "MOD"?"变更":"下架"}}</span>
								</FormItem>
							</Col>
						</Form>
					</Row>
					<Row>
						<Form labelWidth="120px" labelAlign="left">
							<Col :span="24">
								<FormItem labelText="产品概述：" small>
									<pre v-html="componentData.requirementDesc"></pre>
								</FormItem>
							</Col>
							<Col :span="24" v-if="componentData.documentList && componentData.documentList.length>0">
								<FormItem labelText="附件下载：" small>
									<span class="app__btn app__btn-confirm" @click="requirementDocDialog">附件下载</span>
								</FormItem>
							</Col>
						</Form>
					</Row>
				</div>
			</div>
			<div class="prod-tree">
				<div >
					<div class="content">
						<div class="c-title">
							<div class="right-btn">
								<div class="app__btn app__btn-set " @click="operationSchedule">进度追踪</div>
							</div>
						</div>
						<Row>
							<Col :span="20">
								<!-- <FormItem small labelText="产品名称：">
									<span>{{prodTreeModel.prodName}}</span>
								</FormItem> -->
							</Col>
						</Row>
						<div class="c-title">
							<span class="c-t-name">配置环节完成情况</span>
						</div>
						<Row class="c-step">
							<Col :span="4">基本信息</Col>
							<Col :span="4">产品关系信息</Col>
							<Col :span="4">产品业务流程信息</Col>
							<Col :span="4">服务标准</Col>
							<Col :span="4">产品属性</Col>
							<Col :span="4">产品定价</Col>
						</Row>
						<Row class="c-step-result">
							<Col :span="4" v-for="i in 6" :key="i">
								<i class="iconfont icon-xuanzhong-yuan"></i>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</Scroll>

		<div class="footer">
            <span class="btn back" @click="globalback">返回</span>
        </div>

        <!--下载附件-->
		<Dialog dialogTitle="附件下载" ref="requirementDocRef" :showBtn="false">
			<Scroll :isShowRight="true">
				<div class="app__table__inner dialog-doc-list">
					<Row class="app__table-thead flow">
						<Col :span="6">类型</Col>
                        <Col :span="6">附件名称</Col>
                        <Col :span="4">上传人</Col>
                        <Col :span="4">上传时间</Col>
                        <Col :span="4">操作</Col>
					</Row>
					<Row class="app__table-item" v-for="(item,index) in componentData.documentList" :key="index">
						<Col :span="6">{{item.documentTypeName ? item.documentTypeName : '需求单附件'}}</Col>
                        <Col :span="6">{{item.docName}}</Col>
                        <Col :span="4">{{item.uploadName}}</Col>
                        <Col :span="4">{{item.createDate | date }}</Col>
                        <Col :span="4">
						<span class="iconfont icon-xiazai1128" @click="requirementDocDownload(item)">下载</span>
						</Col>
					</Row>
				</div>

			</Scroll>
		</Dialog>

		<!-- 进度追踪 -->
		<Dialog dialogTitle="进度追踪" :dialogSize="flowScheduleDialogSize" ref="flowSchedule" :showConfirmBtn="false">
			<Scroll :isShowRight="true">
				<div class="app__table dialog-schedule">
					<Row class="app__table-thead">
						<Col :span="6">环节</Col>
						<Col :span="3">操作人</Col>
						<Col :span="5">办理时间</Col>
						<Col :span="5">办理时长</Col>
						<Col :span="3">备注</Col>
						<Col :span="2">状态</Col>
					</Row>
					<Row class="app__table-item" v-for="(item,index) in flowScheduleData" :key="index">
						<Col :span="6">
							<span class="text-content">{{item.taskName}}</span>
						</Col>
						<Col :span="3">
							<span class="text-content">{{item.operator}}</span>
						</Col>
						<Col :title="item.operateDate" :span="5">
							<span class="text-content">{{item.operateDate}}</span>
						</Col>
						<Col :span="5">
							<span class="text-content">{{item.duration}}</span>
						</Col>
						<Col :title="item.operateDesc" :span="3">
							<span class="text-content">{{item.operateDesc}}</span>
						</Col>
						<Col :span="2">{{item.operatorStatus == '1' ? '同意' : item.operatorStatus == '0' ? '回退' : '无'}}</Col>
					</Row>
					<Row v-if="flowScheduleData.length == 0" class="app__data-none">
						<Col :span="24">
						<span>当前无数据</span>
						</Col>
					</Row>
				</div>
			</Scroll>
		</Dialog>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			componentData:{}
		},
		data(){
			return{
				prodTree:{},
				prodTreeKeys:[{
					key:'prodName'
				}],
				prodTreeModel:{},
				requirementInfoShowFlag: true,
				flowScheduleData: [], //追踪记录
				flowScheduleDialogSize: {
					size: 80,
					min: 800,
					max: 600
				}
			}
		},
		mounted(){
			this.getProdTree();
		},
		methods:{
			getProdTree(){
				this.$axios.get(this.$api.QureyOrdProdTree,{
					params: {
						prodId: this.componentData.requirementId,
						createStaff: this.$user.getInfo().id
					}
				}).then( res => {
					if(res.data.success) {
						if(!res.data.products.products[0]) return;
						this.prodTree = res.data.products.products[0]
						this.prodTreeModel = this.prodTree;
					}else{
						this.$message.error({message: res.data.msg})
					}

				}).catch(error => {
					this.$message.error({message: '产品树查询失败'})
				})
			},
			requirementInfoShowClick(){
				this.requirementInfoShowFlag = !this.requirementInfoShowFlag;
			},
			requirementDocDialog(){
				this.$refs.requirementDocRef.show();
			},
			requirementDocDownload(item) {
				window.open(this.$api.Shtelpaasstorage + item.docLink)
			},
			operationSchedule(){
				this.getreRuireData();
			},
			getreRuireData(){
				this.$axios.get(this.$api.FlowScheduleList, {
					params: {
						"objType": "2000",
                        "objId": this.componentData.requirementId,
						"requirementId": this.componentData.requirementId
					}
				}).then(res => {
					if(res.data.success === true) {
						if(res.data.traceList != null){
							this.flowScheduleData = res.data.traceList;

							this.$refs.flowSchedule.show();
						}
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			globalback(){
				this.$emit('componentView','list')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.prod-info{
		width: 100%;
		height: 100%;
		padding-bottom: 50px;
		background-color: #f2f2f2;

		.requirement-box{
			height: 100%;
			padding: 0 20px;
			background-color: #fff;

			.a-v-title1 {
				height: 50px;
				line-height: 50px;
				text-align: right;
				padding-right: 20px;
				.v-t-item {
					display: block;
					width: 80px;
					margin-left: 20px;
					text-align: center;
					color: $mainColor;
					float: left;
				}
				.app__title {
					float: left;
				}
				.h-a-add {
					display: inline-block;
					height: 30px;
					line-height: normal;
				}
			}
			.require-info {
				width: 100%;
				padding: 0 20px 20px;
				&.active {
					height: 110px;
					overflow-y: hidden;
				}
				.m-title {
					.col.m-t-name {
						border-right: 1px solid $mainColor;
					}
				}
				.m-item {
					.m-i-name {
						color: $mainColor;
						border-right: 1px solid $mainColor;
						cursor: pointer;
					}
				}
				.col {
					&:hover {
						.col-search {
							display: block;
						}
					}
				}
			}
		}

		.prod-tree{
			height: 500px;
			margin-top: 10px;
			background-color: #fff;

			.content{
				padding: 20px;

				.c-title{
					width: 100%;
					height: 40px;
					line-height: 40px;
					font-weight: bold;
					border-bottom: 1px solid #f2f2f2;

					.c-t-name{
						display: inline-block;
						height: 20px;
						line-height: 20px;
						padding-left: 8px;
						border-left: 8px solid $mainColor;
					}

					.right-btn{
						float: right;
						.app__btn{
							margin-right: 10px;
						}
					}
				}

				.c-step{
					text-align: center;
					background-color: #f2f2f2;
				}

				.c-step-result{
					text-align: center;
					color: $mainColor;

					.col{
						border:{
							style: solid;
							width: 0 0 1px 1px;
							color: #f2f2f2;
						}

						&:last-child{
							border:{
								style: solid;
								width: 0 1px 1px 1px;
								color: #f2f2f2;
							}
						}
					}
				}
			}
		}

		.dialog-doc-list{
			padding: 20px;
		}

		.dialog-schedule{

        	.text-content{
        		display: inline-block;
        		line-height: normal;
        		vertical-align: middle;
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

         	.btn{
                display: inline-block;
                height: 30px;
                line-height: 30px;
                padding: 0 20px;
                margin-right: 10px;
                border-radius: 4px;
                cursor: pointer;
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
</style>