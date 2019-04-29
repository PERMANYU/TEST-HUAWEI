<template>
	<div class="share">
		<div class="app__top">
			<span class="app__top-left">成员销售品列表</span>
		</div>
		<Scroll class="app__table__inner offer-rels-table" :isShowBottom="true"  fixedTopClassName="app__table-thead" ref="offerRelsScroll">
			<DragGroup class="app__table-thead" inline :titleList="offerGrpParams" @dragchange="dragchange">
				<DragItem  :width="item.width" :value="item" v-for="(item,index) in offerGrpParams" :key="'offer-param'+index">
					<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>
					<span class="offer-title-name">{{item.name}}</span>
				</DragItem>
			</DragGroup>
			<Row class="app__table-item" inline v-for="(offerRelitem,index) in delmkt(offerBeRelyOnRels)" :key="'offerRel' + index">
				<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in offerGrpParams" :key="'title' + titleIndex">
					<span v-if="titleItem.param == 'effDate' || titleItem.param == 'expDate'">{{adjustTabelItemText(offerRelitem,titleItem.param) | date}}</span>
					<span v-else>{{adjustTabelItemText(offerRelitem,titleItem.param)}}</span>
				</Col>
			</Row>
			<Row v-if="offerBeRelyOnRels.length == 0" class="app__data-none">
				<Col :span="24">
				<span>当前无数据 请先选择销售品</span>
				</Col>
			</Row>
		</Scroll>
		<div class="s-title">
			<div class="app__top">
				<span class="app__top-left">成员销售品组列表</span>
			</div>
		</div>
		<Scroll class="app__table__inner offer-rels-table" :isShowBottom="true"  fixedTopClassName="app__table-thead" ref="offerRelsScroll">
			<DragGroup class="app__table-thead" inline :titleList="offeGrpRelasParams" @dragchange="dragchange">
				<DragItem  :width="item.width" :value="item" v-for="(item,index) in offeGrpRelasParams" :key="'offer-param'+index">
					<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>
					<span class="offer-title-name">{{item.name}}</span>
				</DragItem>
			</DragGroup>
			<Row class="app__table-item" inline v-for="(offerRelitem,index) in delmkt(offeGrpRelas)" :key="'offerRel' + index">
				<Col :width="tableTitleCheckboxObj.width">
					<Checkbox name="Checkbox" v-model="checkArr" :label="offerRelitem"></Checkbox>
				</Col>
				<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in offeGrpRelasParams" :key="'title' + titleIndex">
					<span v-if="titleItem.param == 'effDate' || titleItem.param == 'expDate'">{{adjustTabelItemText(offerRelitem,titleItem.param) | date}}</span>
					<span v-else>{{adjustTabelItemText(offerRelitem,titleItem.param)}}</span>
				</Col>
			
			</Row>
			<Row v-if="offeGrpRelas.length == 0" class="app__data-none">
				<Col :span="24">
				<span>当前无数据 请先选择销售品</span>
				</Col>
			</Row>
		</Scroll>
	</div>
</template>

<script type="text/javascript">
	export default {
		props:{
            componentData:{}
        },
		data() {
			return {				
				offeGrpRelas: [],
				offerBeRelyOnRels: [],
				offerId: '',
				offerGrpParams: [{
					name: '成员销售品编码',
					param: 'zOfferNbr',
					width: 180
				},{
					name: '成员销售品内部名称',
					param: 'zOfferSysName',
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
				offeGrpRelasParams: [{
					name: '成员销售品组编码',
					param: 'zNbr',
					width: 200
				},{
					name: '成员销售品组名称',
					param: 'zName',
					width: 300
				},{
					name: '最大数量',
					param: 'maxNum',
					width: 120
				},{
					name: '最小数量',
					param: 'minNum',
					width: 120
				},{
					name: '默认数量',
					param: 'defaultNum',
					width: 120
				},{
					name: '生效时间',
					param: 'effDate',
					width: 120
				},{
					name: '失效时间',
					param: 'expDate',
					width: 120
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
			this.getData();
		},
		methods: {
			getData() {
				this.$axios.get(this.$api.replace(this.$api.SeeGrpOfferMember, ['{offerId}'], [this.componentData.offerId]), {
					params: {
						//						limit: '10',
						//						page: '1'
					}
				}).then(res => {
					console.log(res,'成员销售列表')
					if(res.data.success == true) {
						this.offeGrpRelas = res.data.offeGrpRelas;
						this.offerBeRelyOnRels = res.data.offerBeRelyOnRels;
					} else {
						this.$message.error({ message: '失败！' });
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.share {
		width: 100%;
		
		.h-a-add {
				margin: 10px 0;
			}
			.app__table__inner {
				.span {
					padding: 0 5px;
					cursor: pointer;
				}
			}
			.s-title {
				margin-top: 20px;
			}
	}
	
	.main {
		padding: 20px;
		.search {
			width: 300px;
			margin-bottom: 20px;
		}
		.y-span {
			display: block;
			margin: 10px 0;
			color: #b6de8f;
		}
	}
</style>