<template>
	<div class="income">
		<div class="app__top">
			<span class="app__top-left">本方销售品列表</span>
		</div>
		<Scroll class="app__table__inner offer-rels-table" :isShowBottom="true"  fixedTopClassName="app__table-thead" ref="offerRelsScroll">
			<DragGroup class="app__table-thead" inline :titleList="offerGrpParams" @dragchange="dragchange">
				<DragItem  :width="item.width" :value="item" v-for="(item,index) in offerGrpParams" :key="'offer-param'+index">
					<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>
					<span class="offer-title-name">{{item.name}}</span>
				</DragItem>
			</DragGroup>
			<Row class="app__table-item" inline v-for="(offerRelitem,index) in delmkt(relationOfferRels)" :key="'offerRel' + index">
				<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in offerGrpParams" :key="'title' + titleIndex">
					<span v-if="titleItem.param == 'effDate' || titleItem.param == 'expDate'">{{adjustTabelItemText(offerRelitem,titleItem.param) | date}}</span>
					<span v-else>{{adjustTabelItemText(offerRelitem,titleItem.param)}}</span>
				</Col>
			</Row>
			<Row v-if="relationOfferRels.length == 0" class="app__data-none">
				<Col :span="24">
				<span>当前无数据 请先选择销售品</span>
				</Col>
			</Row>
		</Scroll>
		<div class="s-title">
			<div class="app__top">
				<span class="app__top-left">本方销售品组列表</span>
			</div>
			
		</div>
		<Scroll class="app__table__inner offer-rels-table" :isShowBottom="true"  fixedTopClassName="app__table-thead" ref="offerRelsScroll">
			<DragGroup class="app__table-thead" inline :titleList="offeGrpRelasParams" @dragchange="dragchange">
				<DragItem  :width="item.width" :value="item" v-for="(item,index) in offeGrpRelasParams" :key="'offer-param'+index">
					<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>
					<span class="offer-title-name">{{item.name}}</span>
				</DragItem>
			</DragGroup>
			<Row class="app__table-item" inline v-for="(offerRelitem,index) in delmkt(relationOffeGrpRelas)" :key="'offerRel' + index">
				<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in offeGrpRelasParams" :key="'title' + titleIndex">
					<span v-if="titleItem.param == 'effDate' || titleItem.param == 'expDate'">{{adjustTabelItemText(offerRelitem,titleItem.param) | date}}</span>
					<span v-else>{{adjustTabelItemText(offerRelitem,titleItem.param)}}</span>
				</Col>
			
			</Row>
			<Row v-if="relationOffeGrpRelas.length == 0" class="app__data-none">
				<Col :span="24">
				<span>当前无数据 请先选择销售品</span>
				</Col>
			</Row>
		</Scroll>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {	
				offerId: '',
				relationOfferRels: [],
				relationOffeGrpRelas: [],
				relationOfferRelsTemp: [],
				offerGrpParams: [{
					name: '本方销售品编码',
					param: 'aOfferNbr',
					width: 180
				},{
					name: '本方销售品内部名称',
					param: 'aOfferSysName',
					width: 300
				},{
					name: '最大数量',
					param: 'maxNum',
					width: 100
				},{
					name: '最小数量',
					param: 'minNum',
					width: 100
				},{
					name: '默认数量',
					param: 'defaultNum',
					width: 100
				},{
					name: '适用构成最大值',
					param: 'rstrOfferProdRelMaxNum',
					width: 100
				},{
					name: '适用构成最小值',
					param: 'rstrOfferProdRelMinNum',
					width: 100
				},{
					name: '适用构成默认值',
					param: 'rstrOfferProdRelDefNum',
					width: 100
				},{
					name: '生效时间',
					param: 'effDate',
					width: 100
				},{
					name: '失效时间',
					param: 'expDate',
					width: 100
				},{
					name: '是否同客户',
					param: 'isCustRstr',
					width: 100
				},{
					name: '是否同账户',
					param: 'isAccountRstr',
					width: 100
				},{
					name: '是否同地址',
					param: 'isAddressRstr',
					width: 100
				}],
				tableTitleCheckboxObj: {
					name: '',
					param: '',
					width: 100
				},
				xspIsShow:false,
				offeGrpRelasParams: [{
					name: '本方销售品组编码',
					param: 'aNbr',
					width: 180
				},{
					name: '本方销售品组名称',
					param: 'aName',
					width: 300
				},{
					name: '最大数量',
					param: 'maxNum',
					width: 100
				},{
					name: '最小数量',
					param: 'minNum',
					width: 100
				},{
					name: '默认数量',
					param: 'defaultNum',
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
		mounted() {
			//this.offerId = this.componentData.offerId;
			this.getData();
		},
		methods: {
			getData() {
				this.$axios.get(this.$api.replace(this.$api.RelationOfferRel, ['{offerId}'], [this.componentData.offerId]), {
                    params: {
                        
                    }
                }).then(res => {
					if(res.data.success == true) {
						console.log(res,'本方')
						this.relationOfferRels = res.data.relationOfferRels;
						this.relationOffeGrpRelas = res.data.relationOffeGrpRelas;
					} else {

					}
				}).catch(error => {

				})
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
		}
	}
</script>

<style scoped lang="scss">
	.income {
		width: 100%;		
		.s-title {
			margin-top: 20px;
		}
	}
	
	.main {
		padding: 20px;
	}
</style>