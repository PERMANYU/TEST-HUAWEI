<template>
    <div class="main-table">
        <div class="main">  
            <Scroll class="app__table" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title" ref="listScroll">
                <DragGroup class="m-title app__table-thead" inline :titleList="tableTitleData" @dragchange="dragchange">
                    <Col :class="['m-item']" :width="tableTitleCheckboxObj.width">
                    </Col>
                    <DragItem :class="['m-item']" :width="item.width" :value="item" v-for="(item,index) in tableTitleData" :key="'table' + index">
                        <PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)" />
                        <span>{{item.name}}</span>
                    </DragItem>

                    <Col :class="['m-item']" :width="tableTitleOperationObj.width">
                        <span>操作</span>
                    </Col>
                </DragGroup>

                <Row :class="['m-item app__table-item']" inline v-for="(item,index) in suppleList" :key="'requirement' +  index">
                    <Col :width="tableTitleCheckboxObj.width">
                        <Checkbox name="Checkbox" v-model="checkArr" :label="item.offerId" @change="modelChange"></Checkbox>
                    </Col>
                    <Col class="goods-name" :width="titleItem.width" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
                        <span>{{adjustTabelItemText(item,titleItem.param)}}</span>
                    </Col>

                    <Col :width="tableTitleOperationObj.width">
                        <span class="span" @click="itemSee(item)">{{adjustItemText(item)}}</span>
                    </Col>
                </Row> 
                <Row v-if="!suppleList.length" class="app__data-none">
                    <Col :span="24"><span>当前无数据!</span></Col>
                </Row>
                 <Row v-else :class="['m-item app__table-item']" v-for="item in (20 - suppleList.length)" :key="item.index"></Row>
            </Scroll>
        </div>

        <div class="footer">
            <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
            </Pagination>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            text:{
                type: String,
            	default:''
            }
        },
        data() {
            return {
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
					name: '销售品内部名称',
					param: 'offerSysName',
					wp: 0.2083,
					width: 200
				}, {
					name: '内部编码',
					param: 'innerNbr',
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
					wp: 0.125,
					width: 200,
					part: ""
                },
                suppleList:[],//销售品列表 
                checkArr:[],//复选框
                searchObj: {
					offerName: '',
					offerSysName: '',
					offerInnerNbr: '',
					statusCd: '',
				},
            }
        },
        mounted () {
            this.gainSuppleList();
            this.adjustTableWidth();
        },
        methods: {
            gainSuppleList() {
                this.$axios.get(this.$api.Offer,{
                    params: {
                        offerSysName: "",
                        offerInnerNbr: this.searchObj.offerInnerNbr,
                        offerNbr: "",
                        statusCd: "",
                        offerType: "",
                        innerNbr: "",
                        staff: this.text == '全部记录' ? '' : this.text == '我的销售品' ? this.$user.getInfo().id : '', //所有
                        page: this.pageInfo.pageIndex,
                        limit: this.pageInfo.pageSize,
                    }
                }).then( res => {
                    if(res.data.success) {
                        this.suppleList = res.data.offerPage.content;
                        this.$nextTick(() => {
                            this.$refs.listScroll.init();
                        });
                        this.pageInfo = {
                            pageIndex: res.data.offerPage.page,
                            pageSize: res.data.offerPage.limit,
                            rowCount: res.data.offerPage.total
                        }

                    } else {
                        this.$message.error({ message : '销售品列表查询失败'})
                    }
                }).catch( err => {
                    this.$message.error({ message : err.response.data.msg })
                })
            },

            dragchange(val) {
				this.tableTitleData = val;
            },
            pullMove(w, item) {
				item.width = w;
            },
            modelChange() {
				this.$emit('checkArr', this.checkArr)
            },
            adjustTabelItemText(item,param) { //计算显示
                let val = item[param];
                switch (param) {
                    case 'statusCd':
                        return this.getStatusCd(val);
                    case 'commodityType':
                        return this.getCommodityType(val);
                    default:
                        return val
                        break;
                }
            },
            getStatusCd(type) {
                switch (type) {
                    case '1000':
                        return '有效'
                    case '1200':
                        return '未生效'
                    case '1300':
                        return '已归档'
                    case '1400':
                        return '停止销售'
                    case '1500':
                        return '停止服务'
                    case '1600':
                        return '销售品下线'
                    default:
                        return '未知'
                }
            },
            adjustTableWidth() {
				this.tableTitleCheckboxObj.width = this.$el.getBoundingClientRect().width * this.tableTitleCheckboxObj.wp;
				this.tableTitleOperationObj.width = this.$el.getBoundingClientRect().width * this.tableTitleOperationObj.wp;
				this.tableTitleData.map(item => {
					item.width = this.$el.getBoundingClientRect().width * item.wp;
				})
			},
            getCommodityType(type) {
                return {
                    '10': '销售品',
                    '30': '组合销售品',
                    '40': '可选包',
                    '50': '促销',
                    '60': '关联包',
                    '70': '加装包',
                }[type];
            },
            adjustItemText (val) {
                if(this.text == '我的销售品' ) {
                   return val.statusCd == '1200' ? '修改' : '查看'
                } else {
                    return '修改';
                }
            },
            pullEnd() {
				this.$refs.listScroll.initScroll();
			},
            itemSee(val) {  
                this.$emit('goCommodity',val)
            },
            pageChange(page) {
                this.pageInfo.pageIndex = page;
                this.gainSuppleList()
            },
            search(val) {
                this.searchObj.offerInnerNbr = val;
                this.pageChange(1);
            }
        },
    }
</script>

<style lang="scss" scoped>
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
                .span {
                    cursor: pointer;
                    color: $mainColor;
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
</style>