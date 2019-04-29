<template>
	<div class="main">
		<div class="home">
			<Header></Header>
			<div class="search">
				<Input v-model="offerName" placeholder="请输入销售品名称" @keyup.enter.native="searchClick"></Input>
				<i class="iconfont icon-sousuo1130" @click="searchClick"></i>
			</div>
		</div>
		<div class="pane">
			<div class="p-title">
				<div :class="['p-t-block',offerType=='db' ? 'active' : '']" @click="offerPaneBlockClick('db')">
					<i class="iconfont icon-yiban1201"></i>
					<span>待办需求单</span>
				</div>
				<div :class="['p-t-block',offerType=='yb' ? 'active' : '']" @click="offerPaneBlockClick('yb')">
					<i class="iconfont icon-daiban1201"></i>
					<span>已办需求单</span>
				</div>
				<div class="p-t-more">
					<i class="iconfont icon-gengduo1130"></i>
				</div>
			</div>
			<div class="p-content">
				<div class="p-search">
					<i class="iconfont icon-sousuo1130"></i>
					<Input placeholder="请输入需求单名称" v-model="searchObj.requirementName"></Input>
					<span class="p-s-go" @click="searchreq"></span>
				</div>
				<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="listScroll">
					<Row class="app__table-thead">
						<Col :span="5">需求单名称</Col>
						<Col :span="5">需求单编码</Col>
						<Col :span="5">需求单类型</Col>
						<Col :span="5">创建时间</Col>
						<Col :span="4">操作</Col>
					</Row>

					<Row :class="['app__table-item']" v-if="requirementList.length>0" v-for="(item,index) in requirementList" :key="index">
						<Col :span="5" class="col-name">{{item.requirementName}}</Col>
						<Col :span="5">{{item.requirementCode}}</Col>
						<Col :span="5">{{item.requestType=="10"?"产品":item.requestType=="11"?"销售品":item.requestType=="12"?"目录":"转售销售品"}}</Col>
						<Col :span="5">{{item.createDate | datetime}}</Col>
						<Col :span="4">
						<span class="span" v-if="offerType=='db'" @click="itemSel(item)">处理</span>
						<span class="span" v-if="offerType=='yb'" @click="itemSel(item)">查看</span>
						</Col>
					</Row>
					<Row v-if="!requirementList.length" class="app__data-none">
						<Col :span="24"><span>当前无数据!</span></Col>
					</Row>
				</Scroll>
			</div>
			<div class="p-footer" v-if="requirementList.length>0">
				<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
				</Pagination>
			</div>
		</div>

	</div>
</template>

<script type="text/javascript">
	import Header from '@/components/common/page-header';
	export default {
		data() {
			return {
				isShow: true,
				isSee: false,
				pageInfo: {
					pageIndex: 1, // 当前页
					pageSize: 20, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},
				offerType: 'db',
				offerName:'',
				requirementArray: {
					requirementName: '名称',
					requirementCode: '编码',
					requirementType: '已完成',
					creatTime: '2018-12-03'
				},
				searchObj: {
					requirementName: ''
				},
				statusCd: "1201",
				requirementList: []
			}
		},
		components: {
			Header
		},
		mounted() {
			this.initData();
		},
		methods: {
			//待办需求单列表
			initData() {
				this.$axios.get(this.$api.Dairequirement, {
					params: {
						requirementName: this.searchObj.requirementName,
						requestType: '',
						statusCd: this.statusCd,
						userId: this.$user.getInfo().id,
						limit: this.pageInfo.pageSize,
						page: this.pageInfo.pageIndex
					}
				}).then(res => {
					if(res.data.success === true) {
						if(res.data.requirements) {
							this.requirementList = res.data.requirements.content;
							this.pageInfo.rowCount = res.data.requirements.total;

							this.$nextTick(() => {
								this.$refs.listScroll.init();
							})
						} else {
							this.requirementList = []
						}
					} else {
						this.$message.error({ "message": "查询失败！" })
					}
				})
			},
			searchreq() {
				this.initData()
			},
			itemSel(item) { //详情
				let routeName = '';
				if(item.requestType == '10'){ //产品
					if(item.reqFlowStatus == '11'){//配置
						routeName = 'prodCatalog';
					}else if(item.reqFlowStatus == '15'){
						routeName = 'requirementProdInfo';
					}else{
						routeName = this.offerType=='yb' ? 'requirementProdInfo' : 'prodApproval';
					}
				}else{//销售品
					if (this.offerType == "db") {
					routeName = 'info';
					} else{
					routeName = 'requirementInfo';
					}
				}

				this.$router.push({ name: 'RemainDone', params: { route: routeName, val: item }})
			},
			backlog() {
				this.isShow = true;
				this.isSee = false;
			},
			haveDone() {
				this.isSee = true;
				this.isShow = false;
			},
			pageChange(val) {
				this.pageInfo.pageIndex = page;
				this.initData();
			},
			offerPaneBlockClick(val) {
				this.offerType = val;
				if(val == 'db') {
					this.statusCd = "1201"
				} else {
					this.statusCd = "1001"
				}
				this.initData();
			},
			searchClick(){
				this.$router.push({ name: 'Goods', params:{offerName: this.offerName}});
			}
		}
	}
</script>

<style scoped lang="scss">
	.main {
		width: 100%;
		height: 100%;
		background: #fafafa;
		.home {
			height: 260px;
			margin-bottom: 15px;
			background: url(./images/wenzi.png) no-repeat 66% center, url(./images/bg.png) no-repeat center;
			.header {
				background: transparent;
			}
			.search {
				position: absolute;
				top: 160px;
				right: 25%;
				width: 604px;
				height: 56px !important;
				background: url(./images/ssk.png) no-repeat center;
				/deep/ input {
					width: 100%;
					height: 43px;
					border: 0;
					border-radius: 0 10px 0 10px;
					font-size: 16px;
					padding:0 40px 0 30px;

					&:focus{
						border: 0 !important;
					}
				}

				.icon-sousuo1130{
					position: absolute;
					top: 10px;
					right: 10px;
					font-size: 20px;
					color: $mainColor;
					cursor: pointer;
				}
			}
		}
		.pane {
			width: 100%;
			height: calc(100% - 275px);
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
					width: 50%;
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
	
	.col-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>