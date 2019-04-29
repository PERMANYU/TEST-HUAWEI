<template>
	<div class="sales">
		<div class="app__top">
			<span class="app__top-left">关联组关系</span>
		</div>
		<Scroll class="app__table__inner offer-rels-table" :isShowBottom="true"  fixedTopClassName="app__table-thead" ref="offerRelsScroll">
			<DragGroup class="app__table-thead" inline :titleList="offerGrpParams" @dragchange="dragchange">
				<DragItem  :width="item.width" :value="item" v-for="(item,index) in offerGrpParams" :key="'offer-param'+index">
					<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>
					<span class="offer-title-name">{{item.name}}</span>
				</DragItem>
			</DragGroup>
			<Row class="app__table-item" inline v-for="(offerRelitem,index) in delmkt(offerGrpRelaDTOList)" :key="'offerRel' + index">
				<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in offerGrpParams" :key="'title' + titleIndex">
					<span v-if="titleItem.param == 'effDate' || titleItem.param == 'expDate'">{{adjustTabelItemText(offerRelitem,titleItem.param) | date}}</span>
					<span v-else>{{adjustTabelItemText(offerRelitem,titleItem.param)}}</span>
				</Col>
		
			</Row>
			<Row v-if="offerGrpRelaDTOList.length == 0" class="app__data-none">
				<Col :span="24">
				<span>当前无数据</span>
				</Col>
			</Row>
		</Scroll>
		<div class="s-title">
			<div class="app__top">
				<span class="app__top-left">归属组</span>
			</div>
		</div>
		<div class="group">
			<Row>
				<Col :span="4" v-for="(item,index) in offerGrpDTOList" :key="index">{{item.offerGrpName}}</Col>
			</Row>
		</div>
		<Row v-if="offerGrpDTOList.length == 0" class="app__data-none">
			<Col :span="24">
			<span>当前无数据 请先选择销售品组</span>
			</Col>
		</Row>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="更多信息" ref="offerGrpRelaMore" :showBtn="false">
			<div class="main">
				<Form labelWidth="110px">
					<div class="a-info">
						<Row>
							<Col :span="10">
							<FormItem labelText="最大值：">
								<span>{{offerGrpRelaMoreData.maxNum}}</span>
							</FormItem>
							</Col>
							<Col :span="10">
							<FormItem labelText="最小值：">
								<span>{{offerGrpRelaMoreData.minNum}}</span>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10">
							<FormItem labelText="生效时间：">
								<span>{{offerGrpRelaMoreData.effDate | date}}</span>
							</FormItem>
							</Col>
							<Col :span="10">
							<FormItem labelText="失效时间：">
								<span>{{offerGrpRelaMoreData.expDate | date}}</span>
							</FormItem>
							</Col>
						</Row>
					</div>
				</Form>
			</div>
		</Dialog>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				dialogSize: {
					size: 90,
					min: 800,
					max: 1000
				},
				
				offerId: '',
				offerGrpRelaDTOList: [{aName:'dd'}],
				offerGrpDTOList: [{offerGrpName:'55'}],
				offerPage: [],
				offerPageSelected: [],
				
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
				name: '',
				nbr: '',
				offerGrpRelaMoreData: {},
				idTemp: [],
				offerGrpParams: [{
					name: 'Z端销售品或组名称',
					param: 'zName',
					width: 300
				},{
					name: 'Z端销售品或组编码',
					param: 'zNbr',
					width: 150
				},{
					name: '关系类型',
					param: 'relType',
					width: 100
				},{
					name: 'A端销售品或组名称',
					param: 'aName',
					width: 300
				},{
					name: 'A端销售品或组编码',
					param: 'aNbr',
					width: 150
				},{
					name: '最大数量',
					param: 'maxNum',
					width: 100
				},{
					name: '最小数量',
					param: 'minNum',
					width: 100
				},{
					name: '生效时间',
					param: 'effDate',
					width: 100
				},{
					name: '失效时间',
					param: 'expDate',
					width: 100
				}]
			}
        },
        watch: {
            componentData(val) {
                this.getData();
            }
        },
		mounted() {
			//this.offerId = this.componentData.offerId;
			//this.name = this.componentData.offerName;
			//this.nbr = this.componentData.memberCode;
			this.getData();
		},
		methods: {
			getData() {
				this.$axios.get(this.$api.OfferGetList+'/'+this.componentData.offerId+'/offerGrpRela', {
					params: {
						relType:100000
					}
				}).then(res => {
					if(res.data.success == true) {
						console.log(res,'关联组关系')
						this.offerGrpRelaDTOList = res.data.offerGrpRelaDTOList;
						this.offerGrpDTOList = res.data.offerGrpDTOList;
						for(let ele of this.offerGrpRelaDTOList) {
							if(this.offerId == ele.aId) {
								this.idTemp[ele].offerId = ele.zId
							} else {
								this.idTemp.push({
									offerId: ele.aId
								})
							}
						}
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {

				})
			},
			
			offerGrpRelaMore(item) {
				this.$refs.offerGrpRelaMore.show();
				this.offerGrpRelaMoreData = item;
			},
			

			delmkt(arr) {
				return [...arr].filter(item => item.statusCd != '1100');
			},
			dragchange(val){
				this.offerGrpParams = val;
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
				}
				return val;
			},
			getRelType(relType){
				return {
					'140000':'松融合',
					'150000':'关联包',
					'160000':'要求',
					'170000':'可选',
					'200000':'互斥',
					'600000':'接续'
				}[relType];
			},
		}
	}
</script>

<style scoped lang="scss">
	.sales {
		width: 100%;
		.app__top{
			margin-top: 10px;
		}
		.app__table__inner {
			width: 900px;
			.span {
				padding: 0 5px;
				cursor: pointer;
			}
		}
		.s-title {
			margin-top: 20px;
		}
		.group {
			.col {
				background: #eff6fc;
				margin-right: 10px;
				margin-bottom: 10px;
				padding-left: 10px;
				color: $mainColor;
				span {
					display: block;
					width: 8px;
					height: 8px;
					background: url(images/bqsc.png) no-repeat;
					position: absolute;
					right: 10px;
					top: 18px;
					cursor: pointer;
				}
			}
		}
	}
	
	.main {
		padding: 20px;
		.search {
			width: 300px;
			margin: 20px 0;
		}
		.a-info {
			padding-top: 30px;
			margin-bottom: 30px;
		}
	}
</style>