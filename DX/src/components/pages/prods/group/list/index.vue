<template>
	<div class="main-table">
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

				<Row :class="['m-item app__table-item']" inline v-for="(item,index) in qureyOrdProdList" :key="'requirement' + index">
					<Col class="goods-name" :width="titleItem.width" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
					<span>{{adjustTabelItemText(item,titleItem.param)}}</span>
					</Col>

					<Col :width="tableTitleOperationObj.width">
					<!--有升版没处理-->
					<!-- <span class="span" @click="itemDis(item)" v-if="item.statusCd!='1000'&&searchObj.staff!=''">处理</span> -->
					<span class="span" @click="seeDetail(item)">查看</span>
					</Col>
				</Row>
				<Row v-if="!qureyOrdProdList.length" class="app__data-none">
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
					name: '产品名称',
					param: 'prodName',
					wp: 0.2083,
					width: 200
				}, {
					name: '产品编码',
					param: 'prodNbr',
					wp: 0.2083,
					width: 200
				}, {
					name: '产品功能类型',
					param: 'prodFuncType',
					wp: 0.2083,
					width: 200
				}, {
					name: '版本',
					param: 'version',
					wp: 0.2083,
					width: 200
				}],
				tableTitleOperationObj: {
					name: '操作',
					param: 'operation',
					wp: 0.125,
					width: 200,
					part: ""
				},
				qureyOrdProdList: [],
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
			}
		},
		mounted() {
			this.adjustTableWidth();
			this.gatTabData();
		},
		methods: {
			//点击查看
			itemSee(item) {
				this.$emit('goCommodity', item);
			},
			getSeeName(item) {
				if(item.statusCd == "1000") {
					return '查看';
				} else {
					if(!item.flowStatus) return '处理';
					if(this.searchObj.staff != '' && this.searchObj.statusCd == '') {
						return {
							'10': '配置',
							'11': '查看',
							'12': '查看',
							'13': '查看',
							'14': '查看',
							'15': '查看'
						}[item.flowStatus];
					} else {
						return '查看';
					}
				}
			},
			//获取销售品列表
			gatTabData(page,name) {
					this.pageInfo.pageIndex = page;
            this.$axios
                .get(this.$api.QureyOrdRequirementProdList, {
                    params: {
                        prodName:name,
                        parProdId: '',
                        childProdId: '',
                        fitterProdId: '',
                        prodUseType: '',
                        ifIndependentSale: '',
                        page: this.pageInfo.pageIndex,
                        limit: this.pageInfo.pageSize
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        this.qureyOrdProdList = res.data.products.content
                            ? res.data.products.content
                            : [];
                        this.pageInfo.rowCount= res.data.products.total;
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
			//左上角下拉框数据改变
			tabChange(val) {
				if(val.value == '2000') {
					this.searchObj.staff = '';
					this.searchObj.statusCd = '';
				} else {
					this.searchObj.staff = this.$user.getInfo().id;
					this.searchObj.statusCd = '';
				}
				this.pageChange(1);
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
			allCheckboxClick() {

			},
			searchClick() {

			},
			getProdFuncType(type) {
            switch (type) {
                case "101":
                    return "接入类产品";
                case "102":
                    return "功能类产品";
                case "103":
                    return "内容类产品";
                case "104":
                    return "资源类产品";
                case "105":
                    return "服务类产品";
                case "109":
                    return "其他类";
                default:
                    return "未知";
            }
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
					case 'prodFuncType':
						return this.getProdFuncType(val);
					default:
						return val;
				}
			},
			//点击处理
			itemDis(item) {
				this.$emit('goCommodity', item);
			},
			//点击确认操作
			tipConfirm() {
				this.riseGoods();
			},

			//调用销售品升版接口
			riseGoods() {
				this.$axios.get(this.$api.OfferUpgrade, {
					params: {
						offerId: this.attrForm.offerId,
						requirementId: this.requirementId,
					}
				}).then(res => {
					if(res.data.success) {
						//如果detail不为null,就说明升版失败，弹出失败原因，成功则跳到配置页
						if(res.data.detail) {
							this.$message.error({ message: res.data.detail })
						} else {
							this.$refs.tip.hide();
							this.$message.success({ message: '升版成功！' });

							this.$emit('goCommodity', res.data.offer);
						}

					} else {
						this.$message.error({ message: '操作失败！' })
					}
				}).catch(error => {
					this.$message.error({ message: '服务器异常！' })
				})
			},

			//查询销售品关联的需求单id
			getNeedId() {
				this.$axios.get(this.$api.QureyRequirementList, {
					params: {
						offerId: this.attrForm.offerId,
						requestType: '11',
						page: 1,
						limit: 100
					}
				}).then(res => {
					if(res.data.success) {
						if(res.data.requirementPage.content.length !== 0) {
							this.requirementId = res.data.requirementPage.content[0].requirementId;
						}

					} else {
						this.$message.error({ "message": "关联信息查询失败！" })
					}
				}).catch(error => {
					this.$message.error({ "message": "服务器异常！" })
				})
			},
			seeDetail(item) {
				this.$emit('componentView','product',item)
			}
		}
	}
</script>

<style scoped lang="scss">
	.main-table {
		height: 100%;
		padding-bottom: 50px;
		.main {
			width: 100%;
			height: 100%;
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