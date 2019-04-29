<template>
	<div class="main">
		<Header></Header>

		<div class="banner">
			<div class="b-type">
				<i class="iconfont icon-shujuleixing"></i>
				<span>数据类型：</span>
				<span class="active">我的销售品</span>
				<i class="iconfont icon-xiala12"></i>
			</div>
			<div class="b-notice">
				<i class="iconfont icon-gonggao"></i>
				<marquee behavior="scroll" direction="up" height="20" scrollamount="2" onmouseover=this.stop() onmouseout=this.start()>
					<div>
						<span>
							系统上线通知：凯歌高奏辞旧版PPM系统，豪情满怀迎新版CPCP系统
						</span>     
						<span class="info-time">
							2018年12月17号 09:00:00
						</span>
</div>
				</marquee>
				<i class="iconfont icon-gengduo1130" @click="clickInfo"></i>
			</div>
		</div>
		<Row class="task-box">
			<Col class="t-item" :span="6">
			<div class="t-content">
				<div :class="['t-c-count','task-1']">
					<span class="iconfont icon-dengdai"></span>
				</div>
				<div class="t-c-content">
					<h2>{{mytoDoReqCount}}</h2>
					<p>等待处理需求单</p>
				</div>
			</div>
			</Col>
			<Col class="t-item" :span="6">
			<div class="t-content">
				<div :class="['t-c-count','task-2']">
					<span class="iconfont icon-shangjia"></span>
				</div>
				<div class="t-c-content">
					<h2>{{offerOnSaleCount}}</h2>
					<p>在售销售品数量</p>
				</div>
			</div>
			</Col>
			<Col class="t-item" :span="6">
			<div class="t-content">
				<div :class="['t-c-count','task-3']">
					<span class="iconfont icon-tingshou"></span>
				</div>
				<div class="t-c-content">
					<h2>{{offerStopSaleCount}}</h2>
					<p>停售销售品数量</p>
				</div>
			</div>
			</Col>
			<Col class="t-item" :span="6">
			<div class="t-content">
				<div :class="['t-c-count','task-4']">
					<span class="iconfont icon-xiajia"></span>
				</div>
				<div class="t-c-content">
					<h2>{{offerOfflineCount}}</h2>
					<p>下线销售品数量</p>
				</div>
			</div>
			</Col>
		</Row>

		<Row class="list-box">
			<Col class="l-item" :span="12">
			<div class="l-content">
				<div class="pane">
					<div class="p-title">
						<div :class="['p-t-block',requirementType=='db' ? 'active' : '']" @click="requirementPaneBlockClick('db')">
							<i class="iconfont icon-yiban1201"></i>
							<span>待办需求单</span>
							<span class="t-b-count"></span>
						</div>
						<div :class="['p-t-block',requirementType=='yb' ? 'active' : '']" @click="requirementPaneBlockClick('yb')">
							<i class="iconfont icon-daiban1201"></i>
							<span>已办需求单</span>
							<span class="t-b-count"></span>
						</div>
						<div class="p-t-more">
							<i class="iconfont icon-gengduo1130" @click="moreRequire"></i>
						</div>
					</div>
					<div class="p-content">
						<div class="p-search">
							<i class="iconfont icon-sousuo1130"></i>
							<Input placeholder="请输入需求单名称" v-model="searchObj.requirementName"></Input>
							<span class="p-s-go" @click="searchRequirementData"></span>
						</div>
						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="requirementListScroll">
							<Row class="app__table-thead">
								<Col :span="6">需求单名称</Col>
								<Col :span="5">需求单编码</Col>
								<Col :span="3">需求单类型</Col>
								<Col :span="7">创建时间</Col>
								<Col :span="3">操作</Col>
							</Row>

							<Row :class="['app__table-item']" v-for="(item,index) in requirementList" :key="index">
								<Col :span="6" class="col-name">{{item.requirementName}}</Col>
								<Col :span="5">{{item.requirementCode}}</Col>
								<Col :span="3">{{item.requestType=="10"?"产品":item.requestType=="11"?"销售品":item.requestType=="12"?"目录":"转售销售品"}}</Col>
								<Col :span="7">{{item.createDate |　datetime}}</Col>
								<Col :span="3">
								<span class="span" v-if="requirementType=='db'" @click="itemSel(item)">处理</span>
								<span class="span" v-if="requirementType=='yb'" @click="itemSel(item)">查看</span>
								</Col>
							</Row>
							<Row v-if="!requirementList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</Scroll>
					</div>
					<div class="p-footer" v-if="requirementList.length > 0">
						<Pagination :pageIndex="requirementPageInfo.pageIndex" :pageSize="requirementPageInfo.pageSize" :rowCount="requirementPageInfo.rowCount" :perPages=1 :isCenter="true" @change="requirementPageChange"></Pagination>
					</div>
				</div>
			</div>
			</Col>
			<Col class="l-item" :span="12">
			<div class="l-content">
				<div class="pane">
					<div class="p-title">
						<div :class="['p-t-block',offerType=='wfb' ? 'active' : '']" @click="offerPaneBlockClick('wfb')">
							<i class="iconfont icon-weifabu"></i>
							<span>未发布销售品</span>
						</div>
						<div :class="['p-t-block',offerType=='yfb' ? 'active' : '']" @click="offerPaneBlockClick('yfb')">
							<i class="iconfont icon-yifabu"></i>
							<span>已发布销售品</span>
						</div>
						<div class="p-t-more">
							<i class="iconfont icon-gengduo1130" @click="toGoogs"></i>
						</div>
					</div>
					<div class="p-content">
						<div class="p-search">
							<i class="iconfont icon-sousuo1130"></i>
							<Input placeholder="请输入销售品内部名称或内部编码" v-model="searchObj.offerInnerNbr"></Input>
							<span class="p-s-go" @click="searchOfferData"></span>
						</div>
						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="offerListScroll">
							<Row class="app__table-thead">
								<Col :span="12">销售品内部名称</Col>
								<Col :span="8">内部编码</Col>
								<Col :span="4">操作</Col>
							</Row>
							<Row :class="['app__table-item']" v-for="(item,index) in offerList" :key="index">
								<Col :span="12" class="app__cut-txt">{{item.offerSysName}}</Col>
								<Col :span="8">{{item.innerNbr}}</Col>
								<Col :span="4">
								<span class="span" @click="jumpTo(item)">查看</span>
								</Col>
							</Row>
						</Scroll>
					</div>
					<div class="p-footer" v-show="offerList.length > 0">
						<Pagination :pageIndex="offerPageInfo.pageIndex" :pageSize="offerPageInfo.pageSize" :rowCount="offerPageInfo.rowCount" :isCenter="true" :perPages=1 @change="offerPageChange"></Pagination>
					</div>
				</div>
			</div>
			</Col>
		</Row>
	</div>
</template>

<script type="text/javascript">
	import Header from '@/components/common/page-header';
	export default {
		name: 'index2',
		data() {
			return {
				taskBoxArray: [{
					id: '1',
					count: 22,
					name: '等待处理需求单',
					showStep: 0,
					step: 20
				}, {
					id: '2',
					count: 352,
					name: '在售销售品数量',
					showStep: 0,
					step: 80
				}, {
					id: '3',
					count: 2444,
					name: '停售销售品数量',
					showStep: 0,
					step: 10
				}, {
					id: '4',
					count: 122,
					name: '下线销售品数量',
					showStep: 0,
					step: 80
				}],
				mytoDoReqCount:"",
				offerOfflineCount:"",
				offerOnSaleCount:"",
				offerStopSaleCount:"",
				requirementType: 'db', // db yb
				offerType: 'wfb', //yfb wfb
				searchObj: {
					requirementName: '',
					offerSysName: '',
					offerInnerNbr: ''
				},
				requirementStatusCd: "1201",
				offerStatusCd: '1200',
				requirementPageInfo: {
					pageIndex: 1,
					pageSize: 10,
					rowCount: 0
				},
				offerPageInfo: {
					pageIndex: 1,
					pageSize: 10,
					rowCount: 0
				},
				requirementList: [],
				offerList: []
			}
		},
		mounted() {
			this.getRequirementData();
			this.getOfferData();
			this.offerCount()
		},
		methods: {
			//销售品查询数量
			offerCount(){
				this.$axios.get(this.$api.OfferCount, {
					params: {
						userId: this.$user.getInfo().id,
					}
				}).then(res => {
					if(res.data.success === true) {
						if(res.data.offerCount) {
							this.mytoDoReqCount = res.data.offerCount.mytoDoReqCount
							this.offerOfflineCount = res.data.offerCount.offerOfflineCount
							this.offerOnSaleCount = res.data.offerCount.offerOnSaleCount
							this.offerStopSaleCount = res.data.offerCount.offerStopSaleCount
						} 
					} else {
						this.$message.error({ "message": "查询失败！" })
					}
				})
			},
			//待办需求单列表
			getRequirementData() {
				this.$axios.get(this.$api.Dairequirement, {
					params: {
						requirementName: this.searchObj.requirementName,
						requestType: '',
						statusCd: this.requirementStatusCd,
						userId: this.$user.getInfo().id,
						limit: this.requirementPageInfo.pageSize,
						page: this.requirementPageInfo.pageIndex
					}
				}).then(res => {
					if(res.data.success === true) {
						if(res.data.requirements) {
							this.requirementList = res.data.requirements.content;
							this.requirementPageInfo.rowCount = res.data.requirements.total;

							this.$nextTick(() => {
								this.$refs.requirementListScroll.init();
							})
						} else {
							this.requirementList = []
						}
					} else {
						this.$message.error({ "message": "查询失败！" })
					}
				})
			},
			//获取销售品列表
			getOfferData() {
				//判断输入的是销售品内部名称或内部编码
				let testOfferName = this.searchObj.offerSysName,
					testInnerNbr = this.searchObj.offerSysName;
				if(/^(2-)/.test(testOfferName)){
					testOfferName = '';
				}else{
					testInnerNbr = '';
				}


				this.$axios.get(this.$api.OrdOffer, {
					params: {
						offerSysName: testOfferName,
						offerInnerNbr: this.searchObj.offerInnerNbr,
						offerNbr: '',
						statusCd: this.offerStatusCd,
						offerType: '',
						innerNbr: testInnerNbr,
						page: this.offerPageInfo.pageIndex,
						limit: this.offerPageInfo.pageSize,
					}
				}).then(res => {
					if(res.data.success) {
						this.offerPageInfo = {
							pageIndex: res.data.offerPage.page,
							pageSize: res.data.offerPage.limit,
							rowCount: res.data.offerPage.total,
							pageCount: Math.ceil(res.data.offerPage.total / res.data.offerPage.limit)
						};
						this.offerList = res.data.offerPage.content;

						this.$nextTick(() => {
							this.$refs.offerListScroll.init();
						})
					} else {
						this.$message.error({ "message": "销售品列表查询失败！" })
					}
				}).catch(error => {
					this.$message.error({ "message": "服务器异常！" })
				})
			},
			searchRequirementData() {
				this.getRequirementData()
			},
			searchOfferData() {
				this.offerPageInfo.pageIndex = 1;
				this.getOfferData()
			},
            itemSel(item) { //详情
				let routeName = '';
				if(item.requestType == '10'){ //产品
					if(item.reqFlowStatus == '11'){//配置
						routeName = 'prodCatalog';
					}else if(item.reqFlowStatus == '15'){
						routeName = 'requirementProdInfo';
					}else{
						routeName = this.requirementType=='yb' ? 'requirementProdInfo' : 'prodApproval';
					}
				}else{//销售品
					if (this.requirementType == "db" && item.reqFlowStatus) {
						routeName = 'info';
					} else if(!item.reqFlowStatus) {
                        this.$router.push({ name: 'Requirement', params: { route: 'add', val: item }})
                        return
                    } else {
						routeName = 'requirementInfo';
					}
                }

				this.$router.push({ name: 'RemainDone', params: { route: routeName, val: item }})
			},
			clickInfo(){
				this.$message.warning({ "message": "没有其它公告！" })
			},
			//跳转到待办需求单
			moreRequire(){
				this.$router.push({ name: 'RemainDone'})
			},
			toGoogs() {
				this.$router.push({ name: 'Goods'})
			},
			stepImgLoad() {
				this.taskBoxArray.filter(item => {
					item.showStep = item.step;
				})
            },
			requirementPaneBlockClick(val) {
				this.requirementType = val;
				if(val == "db") {
					this.requirementStatusCd = "1201"
				} else {
					this.requirementStatusCd = "1001"
				}
				this.getRequirementData();
			},
			offerPaneBlockClick(val) {
				this.offerType = val;
				if(val == "yfb") {
					this.offerStatusCd = "1000"
				} else {
					this.offerStatusCd = "1200"
				}
				this.getOfferData();
			},
			offerPageChange(page){
				this.offerPageInfo.pageIndex = page;
				this.getOfferData();
			},
			requirementPageChange(page){
				this.requirementPageInfo.pageIndex = page;
				this.getRequirementData();
			},
			jumpTo(item){
				window.open(`${this.$api.WindowOpenServer}/goodsviewlist/${item.offerId}/${item.requirementId}`);
			}
		},
		components: {
			Header
		}
	}
</script>

<style lang="scss" scoped>
/*字符超出隐藏*/
.app__cut-txt {
    overflow: hidden;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
}
	.main {
		width: 100%;
		height: 100%;
		padding-top: 60px;
		background-color: #f8f8f8;
		.banner {
			width: 100%;
			height: 50px;
			padding-top: 10px;
			margin-top: 15px;
			background-color: #fff;
			.b-type {
				width: 230px;
				height: 30px;
				line-height: 30px;
				font-size: 12px;
				text-align: center;
				color: #647283;
				float: left;
				border-right: 1px solid #eee;
				.iconfont {
					font-size: 12px;
				}
				.active {
					color: $mainColor;
				}
			}
			.b-notice {
				width: calc(100% - 260px);
				height: 30px;
				line-height: 30px;
				float: right;
				.icon-gonggao {
					font-size: 12px;
					color: $mainColor;
					float: left;
					margin-right: 10px;
				}
				marquee{
					width: 80%;
					margin-top: 5px;
					font-weight: 200;
					font-size: 12px;
					cursor: pointer;
					&:hover {
						color: $mainColor;
					}
					.info-time{
						margin-left: 50px;
					}
				}
				.icon-gengduo1130 {
					margin-right: 15px;
					color: #d6d9e2;
					float: right;
					cursor: pointer;
					&:hover {
						color: $mainColor;
					}
				}
				.n-name {
					margin: 0 40px 0 10px;
				}
			}
		}
		.task-box {
			margin-top: 15px;
			.t-item {
				padding-left: 15px;
				&:first-child {
					padding-left: 5px;
				}
				.t-content {
					width: 100%;
					height: 100px;
					line-height: normal;
					padding-top: 17px;
					box-shadow: 0px 0px 5px 0px rgba(3, 0, 0, 0.09);
					background-color: #fff;
					.t-c-count {
						width: 80px;
						height: 80px;
						line-height: 60px;
						left: -7px;
						font-size: 26px;
						color: #fff;
						text-align: center;
						float: left;
						background-repeat: no-repeat;
						background-position: center;
						&.task-1 {
							background-image: url(./images/task1.png);
							span{
								font-size: 26px;
							}
						}
						&.task-2 {
							background-image: url(./images/task2.png);
							span{
								font-size: 26px;
							}
						}
						&.task-3 {
							background-image: url(./images/task3.png);
							span{
								font-size: 26px;
							}
						}
						&.task-4 {
							background-image: url(./images/task4.png);
							span{
								font-size: 26px;
							}
						}
					}
					.t-c-content {
						display: inline-block;
						width: calc(100% - 80px);
						height: 80px;
						font-size: 16px;
						color: #254063;
						float: right;
						.c-c-step {
							width: 100%;
							height: 20px;
							margin-top: 10px;
							.c-s-container {
								width: calc(100% - 50px);
								height: 6px;
								margin-top: 10px;
								border-radius: 6px;
								float: left;
								background-color: #f8f8f8;
								img {
									display: block;
									width: 0;
									height: 100%;
									border-radius: 6px;
									transition: all .3s ease;
								}
							}
							.c-s-count {
								width: 40px;
								padding-top: 5px;
								font-size: 12px;
								color: #647283;
								float: right;
							}
						}
					}
				}
			}
		}
		.list-box {
			width: 100%;
			height: calc( 100% - 195px);
			margin-top: 15px;
			.l-item {
				padding-left: 15px;
				&:first-child {
					padding-left: 0;
				}
				.l-content {
					width: 100%;
					height: 100%;
					.pane {
						width: 100%;
						height: 100%;
						background-color: #fff;
						.p-title {
							width: 100%;
							height: 30px;
							line-height: 29px;
							border-top: 1px solid #e9e9e9;
							background-color: #fafafa;
							.p-t-block {
								display: block;
								width: 150px;
								top: 0;
								text-align: center;
								font-size: 12px;
								border-top-left-radius: 4px;
								border-top-right-radius: 4px;
								color: #254063;
								float: left;
								transition: all .3s ease;
								cursor: pointer;
								&.active {
									height: 35px;
									line-height: 32px;
									top: -5px;
									color: $mainColor;
									border-top: 3px solid $mainColor;
									background-color: #fff;
									box-shadow: 1px -1px 1px 0px rgba(3, 0, 0, 0.09);
								}
								.iconfont {
									font-size: 12px;
								}
								.t-b-count {
									color: #ff8f04;
								}
							}
							.p-t-more {
								margin-right: 15px;
								color: #d6d9e2;
								float: right;
								cursor: pointer;
								&:hover {
									color: $mainColor;
								}
							}
						}
						.p-content {
							width: 100%;
							height: calc(100% - 80px);
							padding: 20px 20px 0;
							.span{
								color: $mainColor;
								cursor: pointer;
							}
							.p-search {
								width: 55%;
								height: 36px;
								line-height: 36px;
								.iconfont {
									position: absolute;
									left: 0;
									top: 12px;
									width: 40px;
									height: 16px;
									line-height: normal;
									color: $mainColor;
									font-size: 16px;
									text-align: center;
									border-right: 1px solid #eee;
									z-index: 1;
								}
								/deep/ input {
									height: 36px;
									padding: 0 60px 0 55px;
									border-radius: 0;
								}
								.p-s-go {
									position: absolute;
									right: 0;
									top: 2px;
									width: 54px;
									height: 36px;
									background-image: url(./images/go.png);
									background-repeat: no-repeat;
									background-position: center;
									cursor: pointer;
								}
							}
							.scroll {
								height: calc(100% - 50px) !important;
								margin-top: 14px;
							}
							.icon-xiugai,
							.icon-peizhi {
								cursor: pointer;
							}
						}
						.p-footer {
							height: 50px;
						}
					}
				}
			}
		}
	}
	
	.col-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>