<template>
	<div class="main-table">
		<div class="require-state">
		    <Row class="search-row">
		        <Col :span="3" class="require-statelabel">
		            <i class="icon-all"></i>
		            <i :class="['icon-down',downFlag?'active':'']" @click="toggleDown()"></i>
		            <DropSel :obj="tabs" :text="tabInfo.label" @change="dropChange"></DropSel>
		        </Col>
		
		        <Col :span="5">
		            <Search placeholder="请输入销售品名称" @search="search" ref="searchInput"></Search>
		        </Col>
		    </Row>
		</div>
		<div class="main">
			<Scroll class="app__table" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title" ref="listScroll">
				<DragGroup class="m-title app__table-thead" inline :titleList="tableTitleData" @dragchange="dragchange">
					<DragItem :class="['m-item']" :width="item.width" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+index">
						<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)" />
						<span>{{item.name}}</span>

						<!--表头下拉框筛选-->
						<!--<ColSel class="col-search">-->
						<!--<div>-->
						<!--<Input></Input>-->
						<!--</div>-->
						<!--</ColSel>-->
					</DragItem>

					<Col :class="['m-item']" :width="tableTitleOperationObj.width">
					<span>操作</span>
					</Col>
				</DragGroup>

				<Row :class="['m-item app__table-item']" inline v-for="(item,index) in offerPage" :key="'requirement' + index">
					<Col class="goods-name" :width="titleItem.width" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
					<span>{{adjustTabelItemText(item,titleItem.param)}}</span>
					</Col>

					<Col :width="tableTitleOperationObj.width">
					<!--有升版没处理-->
					<span class="span" @click="downOffer(item)">下架</span>
					</Col>
				</Row>
				<Row v-if="!offerPage.length" class="app__data-none">
					<Col :span="24"><span>当前无数据!</span></Col>
				</Row>
			</Scroll>
		</div>
		<div class="footer">
			<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
			</Pagination>
		</div>

		<!--操作确认框-->
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>

	</div>
</template>

<script>
	export default {
		name: 'havedone',
		data() {
			return {
				downFlag: false,
				tabs: [
				    {
				        label: '全部记录',
				        value: '2000'
				    },{
				        label: '我的销售品',
				        value: ''
				    }
				],
				tabInfo:{
				    label: '我的销售品',
				    value: ''
				},
				checkboxData: [],
				pageInfo: {
					pageIndex: 1,
					pageSize: 20,
					rowCount: 0
				},
				tableTitleCheckboxObj: {
					name: '',
					param: '',
					wp: 0.0416,
					width: 200,
					part: ""
				},
				tableTitleData: [{
					name: '销售品名称',
					param: 'offerSysName',
					wp: 0.2083,
					width: 200
				}, {
					name: '销售品编码',
					param: 'offerNbr',
					wp: 0.2083,
					width: 200
				}, {
					name: '销售品类型',
					param: 'commodityType',
					wp: 0.2083,
					width: 200
				}, {
					name: '状态',
					param: 'statusCd',
					wp: 0.2083,
					width: 200
				}],
				tableTitleOperationObj: {
					name: '操作',
					param: 'operation',
					wp: 0.165,
					width: 200,
					part: ""
				},
				offerPage: [],
				searchObj: {
					offerName: '',
					offerSysName: '',
					offerInnerNbr: '',
					statusCd: '',
					staff: this.$user.getInfo().id, //工号
				},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				tipType: '',
				attrForm: {}, //存储被操作的销售品信息
				requirementId: null, //升版的需求单id
				tipSelData: {}
			}
		},
		mounted() {
			this.adjustTableWidth();
			this.gatTabData();
		},
		methods: {
			toggleDown() {
				this.downFlag = !this.downFlag
			},
			dropChange(val){
			    this.tabInfo = val;
			    this.$refs.haveDone.tabChange(val);
			},
			//获取销售品列表
			gatTabData(page,name) {
					this.pageInfo.pageIndex = page;
            this.$axios
                .get(this.$api.DownOfferList, {
                    params: {
						offerSysName: name,
                       statusCd: '1000',
					   page: 1,
					   limit: 20
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        this.offerPage = res.data.offerPage.content
                            ? res.data.offerPage.content
                            : [];
                        this.pageInfo.rowCount= res.data.offerPage.total;
						this.$nextTick(() => {
							this.$refs.listScroll.init();
						})
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(res => {
                    this.$message.error({ message: res.data.msg });
                });

			},

			pageChange(page,name) {
				this.pageInfo.pageIndex = page;
				this.gatTabData(1,name);
			},
			search(val) {
				this.pageChange(1,val);
			},
			dragchange(val) {
				this.tableTitleData = val;
			},
			adjustTableWidth() {
				this.tableTitleCheckboxObj.width = this.$el.getBoundingClientRect().width * this.tableTitleCheckboxObj.wp;
				this.tableTitleOperationObj.width = this.$el.getBoundingClientRect().width * this.tableTitleOperationObj.wp;
				this.tableTitleData.map(item => {
					item.width = this.$el.getBoundingClientRect().width * item.wp;
				})
			},
			pullMove(w, item) {
				item.width = w;
			},
			pullEnd() {
				this.$refs.listScroll.initScroll();
			},
			getCommodityType(type) {
				return {
					'10': '销售品',
					'30': '组合销售品',
					'40': '可选包',
					'50': '促销',
					'60': '关联包',
					'70': '加装包'
				}[type];
			},
			//获取销售品分类
			getOfferType(type) {
				switch(type) {
					case '10':
						return '基础销售品';
					case '11':
						return '套餐销售品';
					case '12':
						return '可选包';
					case '13':
						return '促销';
					default:
						return "未知";
				}
			},
			//获取销售品状态
			getStatusCd(type) {
				switch(type) {
					case '1000':
						return '有效';
					case '1200':
						return '未生效';
					case '1300':
						return '已归档';
					case '1400':
						return '停止销售';
					case '1500':
						return '停止服务';
					case '1600':
						return '销售品下线';
					default:
						return "未知";
				}
			},

			adjustTabelItemText(item, param) { //计算显示
				let val = item[param];
				switch(param) {
					case 'statusCd':
						return this.getStatusCd(val);
					case 'commodityType':
						return this.getCommodityType(val);
					default:
						return val;
				}
			},
			downOffer(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认下架？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			//点击确认操作
			tipConfirm() {
				this.$axios.put(this.$api.replace(this.$api.DownOffer, ['{offerId}'], [this.tipSelData.offerId]), {
					
				}).then(res => {
					if(res.data.success) {
						this.gatTabData();
						this.$refs.tip.hide();
						this.$message.success({ message: '下架成功！' });
					} else {
						this.$message.error({ message: '操作失败！' })
					}
				}).catch(error => {
					this.$message.error({ message: '服务器异常！' })
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.main-table {
		height: 100%;
		padding-bottom: 50px;
		.require-state {
			height: 50px;
			line-height: 50px;
			font-size: 14px;
			color: #333;
			position: relative;
			z-index: 3;
			.require-statelabel {
				float: left;
				height: 30px;
				line-height: 30px;
				padding: 5px 0 0 20px;
				.icon-all {
					position: absolute;
					display: block;
					width: 18px;
					height: 18px;
					margin-top: 6px;
					margin-right: 8px;
					background: url(./images/all.png) no-repeat center;
					background-size: 18px 18px;
				}
				.drop-sel {
		            min-width: 100px;
					padding: 0 20px 0 20px;
				}
				.alllabel {
					display: inline-block;
					float: left;
					margin-right: 6px;
					cursor: pointer;
				}
				.icon-down {
					position: absolute;
					display: block;
					width: 12px;
					height: 12px;
					margin-top: 10px;
					left: 110px;
					background: url(./images/down.png) no-repeat center;
					background-size: 10px 6px;
				}
				.down-menu {
					position: absolute;
					top: 40px;
					left: 0;
					z-index: 2;
					width: 100%;
					background-color: #fff;
					display: none;
					border: 1px solid #F3F3F3;
					border-radius: 5px;
					.tab {
						display: block;
						float: left;
						width: 100%;
						height: 30px;
						margin-top: 10px;
						text-decoration: none;
						line-height: 30px;
						color: #323232;
						text-align: center;
						&:hover {
							background-color: #dff1fc;
						}
					}
					&.active {
						display: block;
					}
				}
			}
			.search-row {
				padding-top: 5px;
		
		        .btn-box{
		            text-align: right;
		            padding-right: 10px;
		        }
			}
		}
		.main {
			width: 100%;
			height: 90%;
			.m-title {
				.col.m-t-name {
					border-right: 1px solid $mainColor;
				}
			}
			.m-item {
				.goods-name {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
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
		.footer {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			box-shadow: 0 -2px 0 #f1f5fa;
			.pagination {
				height: 50px;
			}
		}
	}
	
	.span {
		color: $mainColor;
		padding-right: 10px;
		cursor: pointer;
	}
	
	.l-d-header {
		display: inline-block;
		width: 100%;
		padding-bottom: 20px;
		border-bottom: 10px solid #f8f8f8;
		.d-h-title {
			width: 100%;
			height: 50px;
			line-height: 50px;
			.h-t-left {
				margin-left: 50px;
				padding-left: 30px;
				float: left;
				font-size: 16px;
				font-weight: bold;
				background: url(images/sideslip_icon.png) no-repeat;
				background-position: 0;
			}
			.h-t-right {
				float: right;
				margin-right: 40px;
			}
		}
		.d-h-info {
			padding-left: 50px;
		}
	}
	
	.require-info {
		width: 100%;
		padding-left: 20px;
		padding-top: 20px;
	}
</style>