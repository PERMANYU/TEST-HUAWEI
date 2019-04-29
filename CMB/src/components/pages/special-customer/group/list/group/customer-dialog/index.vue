<template>
	<Dialog dialogTitle="政企客户检索" :dialogSize="customerDialogSize" ref="customerDialog" @confirm="customerDialogConfirm">
		<Scroll :isShowRight="true">
			<div class="customer-log-dialog">
				<ConditionSearch :data="conditionSearchData" @search="conditionSearch"></ConditionSearch>

				<div class="data-list app__table">
					<Row class="app__table-thead">
						<Col :span="tableItem.span" v-for="(tableItem,tableIndex) in tableConfig" :key='tableIndex'>{{tableItem.name}}</Col>
					</Row>

					<Row :class="['app__table-item',custItem.rowActive ? 'active' : '']" 
						v-for="(custItem,custIndex) in custList" 
						:key="custIndex"
						@click.native="rowClick(custItem)">
						<Col :span="tableItem.span" v-for="(tableItem,tableIndex) in tableConfig" :key='tableIndex'>{{custItem[tableItem.param]}}</Col>
					</Row>

					<div v-if="!custList.length" class="app__data-none">
						<span>暂无数据</span>
					</div>
				</div>
			</div>
			
			
		</Scroll>
	</Dialog>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				customerDialogSize:{
					size: 80,
					max: 1200
				},
				conditionSearchData:[{
					iconfont: 'iconkhbs',
					placeholder:'输入客户名称搜索',
					param: 'custName'
				},{
					iconfont: 'iconkhbs',
					placeholder:'输入客户标识',
					param: 'custNumber'
				},{
					iconfont: 'iconshenfenzheng',
					placeholder:'输入证件号码',
					param: 'certNum'
				}],
				conditionSearchObj:{},
				tableConfig:[{
					name:'客户名称',
					param:'custName',
					span:4
				},{
					name:'客户标识',
					param:'custNumber',
					span:4
				},{
					name:'客户类型',
					param:'custType',
					span:3
				},{
					name:'客户子类型',
					param:'custSubType',
					span:3
				},{
					name:'证件类型',
					param:'certType',
					span:4
				},{
					name: '证件号码',
					param: 'certNum',
					span:6
				}],
				custList:[],
				selectCustData:{}
			}
		},
		methods:{
			show(){
				this.custList = [];
				this.selectCustData = {};
				this.$refs.customerDialog.show();
			},
			conditionSearch(obj){
				this.conditionSearchObj = obj;
				this.selectCustData = {};
				this.handleSearch();
			},
			handleSearch(){ //查询政企客户
				this.$axios.get(this.$api.adddClientDistribution, {
					params:{
						certNum: this.conditionSearchObj.certNum || '',
						custName: this.conditionSearchObj.custName || '',
						custNumber: this.conditionSearchObj.custNumber || '',
						custType: '1000'
					}
					
				}).then(res => {
					if (res.data) {
						this.custList = res.data;

						for(let custItem of this.custList){
							this.$set(custItem,'rowActive',false);
						}
					} else {
						this.$message.error({message: "请求失败"})
					}
				}).catch(err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			customerDialogConfirm(){
				this.$emit('confirm',this.selectCustData);
				this.$refs.customerDialog.hide();
			},
			rowClick(item){ //行点击事件
				this.custList.filter( custItem => custItem.rowActive = false);
				this.selectCustData = item;
				item.rowActive = true;
			},
		}
	}
</script>

<style scoped lang="scss">
	.customer-log-dialog{
		padding: 20px;

		.data-list{
			margin: 20px 0 5px;

			.app__table-item{
                cursor: pointer;

                &.active{
                    box-shadow: 2px 3px 4px #bfccde;
                    z-index: 1;
                    border-left: 3px solid #5a8af2;
                    color: #5a8af2;

                    &:before{
                        content: '';
                        position: absolute;
                        top: calc(50% - 6px);
                        left: 0;
                        height: 0;
                        width: 0;
                        border-width: 6px;
                        border-style: solid;
                        border-color: transparent transparent transparent #5a8af2;
                    }
                }
            }
		}
	}
</style>