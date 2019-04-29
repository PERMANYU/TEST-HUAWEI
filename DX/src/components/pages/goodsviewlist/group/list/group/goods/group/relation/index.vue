<template>
	<div class="relation">
		<div class="app__top">
			<span class="app__top-left">关联关系</span>
		</div>
		<!--<div class="app__table__inner">-->
		<Scroll class="app__table__inner offer-rels-table" :isShowBottom="true"  fixedTopClassName="app__table-thead" ref="offerRelsScroll">
            <DragGroup class="app__table-thead" inline :titleList="tableTitleData" @dragchange="dragchange">
                <DragItem :width="item.width" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+index">
                	<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>
                    <span class="offer-title-name">{{item.name}}</span>
                    <ColSel  :class="[item.param != 'expDate' && item.param != 'effDate' && item.param != 'minNum' && item.param != 'maxNum' ? 'col-search' : 'col-none']"  :showOrder="false" @confirm="Confirmfilter(item)">
                        <Input v-if="item.param != 'relType'" :placeholder="'请输入'+ item.name" v-model="item.part" class="col-radio-div"></Input>
                        <div v-else class="col-radio-div">
                        	<Radio class="col-radio" :label="items" :name="item.param" v-for="(items,index) in item.parent" :key="index" v-model="item.part">
	                            {{items.label}}
	                        </Radio>
                        </div>
                    </ColSel>
                </DragItem>
            </DragGroup>
			<!--<Row :class="['app__table-item']" v-for="(item,index) in offerRels" :key="index">
				<Col :span='3' class="no-wrap" :title="item.zOfferName">{{item.zOfferName ? item.zOfferName : '无'}}</Col>
				<Col :span='3'>{{item.zOfferNbr ? item.zOfferNbr : '无'}}</Col>
				<Col :span='2'>{{item.relType == '140000' ? '松融合' : item.relType == '150000' ? '关联包' : item.relType == '160000' ? '要求' : item.relType == '170000' ? '可选' : item.relType == '200000' ? '互斥' : item.relType == '600000' ? '连续' : '无'}}</Col>
				<Col :span='3' class="no-wrap" :title="item.aOfferName">{{item.aOfferName ? item.aOfferName : '无'}}</Col>
				<Col :span='3'>{{item.aOfferNbr ? item.aOfferNbr : '无'}}</Col>
				<Col :span='2'>{{item.maxNum}}</Col>
				<Col :span='2'>{{item.minNum}}</Col>
				<Col :span='3'>{{item.effDate | date}}</Col>
				<Col :span='3'>{{item.expDate | date}}</Col>
			</Row>-->
			<Row class="app__table-item" inline v-for="(offerRelitem,index) in offerRels" :key="'offerRel' + index">
				<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex" class="no-wrap">
					<span v-if="titleItem.param == 'effDate' || titleItem.param == 'expDate'">{{adjustTabelItemText(offerRelitem,titleItem.param) | date}}</span>
					<span v-else>{{adjustTabelItemText(offerRelitem,titleItem.param)}}</span>
				</Col>
			</Row>
			<Row v-if="offerRels.length == 0" class="app__data-none">
				<Col :span="24">
				<span>当前无数据</span>
				</Col>
			</Row>
		</Scroll>
		<Pagination v-show="offerRels.length > 0" :pageIndex="offerRelsPageInfo.pageIndex" :pageSize="offerRelsPageInfo.pageSize" :rowCount="offerRelsPageInfo.rowCount" :perPages=5 @change="offerRelsPageChange"></Pagination>

	</div>
</template>

<script>
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				relType: [{
					value: '140000',
					label: '松融合'
				}, {
					value: '150000',
					label: '关联包'
				}, {
					value: '160000',
					label: '要求'
				}, {
					value: '170000',
					label: '可选'
				}, {
					value: '200000',
					label: '互斥'
				}, {
					value: '600000',
					label: '接续'
				}],
				folRelType: [{
					value: '600000',
					label: '接续'
                }],	
                tableTitleData:[
//                  {
//                      name:'z端销售品名称',
//                      param:'zOfferName',
//                      span:3,
//                      parent:[]
//                  },
//                  {
//                      name:'z端销售品编码',
//                      param:'zOfferNbr',
//                      span:3,
//                      parent:[]
//                  },
//                  {
//                      name:'关联关系',
//                      param:'relType',
//                      span:2,
//                      parent:[
//                          {
//                              label:'可选依赖',
//                              value:'100000'
//                          },
//                          {
//                              label:'强制依赖',
//                              value:'110000'
//                          },
//                          {
//                              label:'默认依赖',
//                              value:'120000'
//                          },
//                          {
//                              label:'赠送依赖',
//                              value:'130000'
//                          },
//                          {
//                              label:'互斥',
//                              value:'200000'
//                          },
//                          {
//                              label:'升级',
//                              value:'300000'
//                          },
//                          {
//                              label:'替换',
//                              value:'400000'
//                          },
//                          {
//                              label:'推荐',
//                              value:'500000'
//                          },
//                          {
//                              label:'接续',
//                              value:'600000'
//                          },
//                      ]
//                  },
//                  {
//                      name:'A销售品名称',
//                      param:'aOfferName',
//                      span:3,
//                      parent:[]
//                  },
//                  {
//                      name:'A销售品编码',
//                      param:'aOfferNbr',
//                      span:3,
//                      parent:[]
//                  },
//                  {
//                      name:'最大数量',
//                      param:'maxNum',
//                      span:2,
//                      parent:[]
//                  },
//                  {
//                      name:'最小数量',
//                      param:'minNum',
//                      span:2,
//                      parent:[]
//                  },
//                  {
//                      name:'生效时间',
//                      param:'effDate',
//                      span:3,
//                      parent:[]
//                  },
//                  {
//                      name:'失效时间',
//                      param:'expDate',
//                      span:3,
//                      parent:[]
//                  }
					{
					name: 'Z端销售品名称',
					param: 'zOfferSysName',
					width: 300,
					parent:[]
				},{
					name: 'Z端内部编码',
					param: 'zInnerNbr',
					width: 120,
					parent:[]
				},{
					name: '关联关系',
					param: 'relType',
					width: 100,
					parent:[
                            // {
                            //     label:'可选依赖',
                            //     value:'100000'
                            // },
                            // {
                            //     label:'强制依赖',
                            //     value:'110000'
                            // },
                            // {
                            //     label:'默认依赖',
                            //     value:'120000'
                            // },
                            // {
                            //     label:'赠送依赖',
                            //     value:'130000'
                            // },
							{
                                label:'松融合',
                                value:'140000'
                            },
							{
                                label:'关联包',
                                value:'150000'
                            },
							{
                                label:'要求',
                                value:'160000'
                            },
							{
                                label:'可选',
                                value:'170000'
                            },
                            {
                                label:'互斥',
                                value:'200000'
                            },
                            // {
                            //     label:'升级',
                            //     value:'300000'
                            // },
                            // {
                            //     label:'替换',
                            //     value:'400000'
                            // },
                            // {
                            //     label:'推荐',
                            //     value:'500000'
                            // },
                            {
                                label:'接续',
                                value:'600000'
                            },
                        ]
				},{
					name: 'A端销售品名称',
					param: 'aOfferSysName',
					width: 300,
					parent:[]
				},{
					name: 'A端内部编码',
					param: 'aInnerNbr',
					width: 120,
					parent:[]
				},{
					name: '最大数量',
					param: 'maxNum',
					width: 100,
					parent:[]
				},{
					name: '最小数量',
					param: 'minNum',
					width: 100,
					parent:[]
				},{
					name: '默认数量',
					param: 'defaultNum',
					width: 100,
					parent:[]
				},{
					name: '适用构成最大数量',
					param: 'rstrOfferProdRelMaxNum',
					width: 130,
					parent:[]
				},{
					name: '适用构成最小数量',
					param: 'rstrOfferProdRelMinNum',
					width: 130,
					parent:[]
				},{
					name: '适用构成默认数量',
					param: 'rstrOfferProdRelDefNum',
					width: 130,
					parent:[]
				},{
                    name: '适用构成角色限制',
					param: 'rstrOfferProdRoleName',
					width: 130,
					parent:[]
                },{
					name: '生效时间',
					param: 'effDate',
					width: 100,
					parent:[]
				},{
					name: '失效时间',
					param: 'expDate',
					width: 100,
					parent:[]
				},{
					name: '是否同客户', 
					param: 'isCustRstr',
					width: 100,
					parent:[]
				},{
					name: '是否同账户',
					param: 'isAccountRstr',
					width: 100,
					parent:[]
				},{
					name: '是否同地址',
					param: 'isAddressRstr',
					width: 100,
					parent:[]
				}
                ],			
				offerId: '',
				offerRel: {},				
				offerIdArr: [],
				offerRels: [],
				offerRelsPageInfo:{
					pageIndex: 1, // 当前页
					pageSize: 10, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
                },
                searchData: {
                    zOfferName: "", //zOfferName
                    zOfferNbr: "", //zOfferNbr
                    relType: "", //relType
                    aOfferName: "",
                    aOfferNbr: "",
                },	
			}
		},
		mounted() {
			//this.name = this.componentData.offerName;
			//this.nbr = this.componentData.memberCode;
			//this.offerId = this.componentData.offerId;
			this.getOfferRelData(this.searchData);
		},
		methods: {
			getOfferRelData(data) {  
			this.$axios.get(this.$api.replace(this.$api.OfferRel, ['{offerId}'], [this.componentData.offerId]), {
                    params: {
                        statusCd: '1000',
                        zOfferName:data.zOfferName ? data.zOfferName : '',
                        zOfferNbr:data.zOfferNbr ? data.zOfferNbr : '',
                        relType:data.relType ? data.relType : '',
                        aOfferName:data.aOfferName ? data.aOfferName : '',
                        aOfferNbr:data.aOfferNbr ? data.aOfferNbr : '',
                        page: this.offerRelsPageInfo.pageIndex,
						limit: this.offerRelsPageInfo.pageSize
                    }
                }).then(res => {
					if(res.data.success) {
						this.offerRels = res.data.offerRels.content || [];
						this.offerRelsPageInfo.rowCount = res.data.offerRels.total;
					} else {
						this.$message.error({message: res.data.msg});
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			offerRelsPageChange(page){
				this.offerRelsPageInfo.pageIndex = page;
				this.getOfferRelData(this.searchData);
            },
            
            Confirmfilter(val) {//过滤
                let obj = {
                    label: val.name,
                    param: val.param,
                    value: val.part.label || val.part,
                    values: val.part.value || val.part
                };
                this.searchData[val.param] = obj.values;
                this.tableTitleData.find( item => item.param == val.param).part = '';
                this.offerRelsPageInfo.pageIndex = 1;
                this.getOfferRelData(this.searchData);
            },
            dragchange(val) {
            	this.tableTitleData = val;
            },
            pullEnd(){
				this.$refs.offerRelsScroll.initScroll();
			},
			pullMove(w,item){
				item.width = w;
			},
			adjustTabelItemText(item,param){
				let val = item[param];
				if(param == 'relType'){
					val = this.getRelType(val);
				} else if (param == 'isCustRstr') {
					val = this.getIsCustRstr(val)
				} else if (param == 'isAccountRstr') {
					val = this.getIsAccountRstr(val)
				} else if (param == 'isAddressRstr') {
					val = this.getIsAddressRstr(val)
				} 
				return val;
			},
			getRelType(relType){
				return {
					// '100000':'可选依赖',
					// '110000':'强制依赖',
					// '120000':'默认依赖',
					// '130000':'赠送依赖',
					'140000':'松融合',
					'150000':'关联包',
					'160000':'要求',
					'170000':'可选',
					'200000':'互斥',
					// '300000':'升级',
					// '400000':'替换',
					// '500000':'推荐',
					'600000':'接续'
				}[relType];
			},
			getIsCustRstr(isCustRstr) {
				return {
					'0': '否',
					'1': '是'
				}[isCustRstr];
			},
			getIsAccountRstr(isAccountRstr) {
				return {
					'0': '否',
					'1': '是'
				}[isAccountRstr];
			},
			getIsAddressRstr(isAddressRstr) {
				return {
					'0': '否',
					'1': '是'
				}[isAddressRstr];
			}
		}
	}
</script>

<style scoped lang="scss">
	.app__top{
		margin-top: 10px;
	}
	.relation {
		width: 100%;
		.h-a-add {
			margin: 10px 0;
		}
		.app__table__inner {
			.no-wrap {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.span {
				padding: 0 5px;
				cursor: pointer;
			}
		}
		.offer-rels-table{
			min-height: 280px;
			margin-bottom: 20px;
			/deep/ .src-content{
			min-height: 280px;
		}
			.app__table-thead{
			.pull-line{
				z-index: 1;
			}
			.offer-title-name {
				display: block;
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		}

        .col {
            &:hover {
                .col-search {
                    display: block;
                    z-index: 100;
                    .col-radio-div{
                    	width: 300px;
                    	height: 85px;
                    }
                    .col-radio {
                        display: block;
                        margin-bottom: 15px;
                        float: left;
                        margin-right: 10px;
                    }
                }
                .col-none {
                    display:none;
                    .col-radio {
                        display: none;
                    }
                }
            }
        }
	}
	
	.main {
		padding: 20px;
		.search {
			width: 300px;
			margin-bottom: 20px;
		}
		
		
	}
</style>