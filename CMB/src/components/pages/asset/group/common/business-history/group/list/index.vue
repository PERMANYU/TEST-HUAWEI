<template>
	<div class="list">
		<div class="app__table">
			<Row class="app__table-thead">
				<Col :span="tableItem.span" v-for="(tableItem,tableIndex) in tableConfig" :key="tableIndex">
					<span>{{tableItem.name}}</span>
				</Col>

				<Col :span="2">
					<span>操作</span>
				</Col>
			</Row>

			<Row class="app__table-item" v-for="(item,index) in customerOrders" :key="index">
				<Col :span="tableItem.span" v-for="(tableItem,tableIndex) in tableConfig" :key="tableIndex">
					<span>{{ getItemParam(item,tableItem.param)}}</span>
				</Col>
				<Col :span="2">
					<span class="operation" @click="detailClick(item)">详情</span>
				</Col>
			</Row>
			<div v-if="!customerOrders.length" class="app__data-none">
				<span>暂无数据</span>
			</div>
		</div>
		<div class="page" v-show="customerOrders.length">
			<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @pageChange="pageChange"></Pagination>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props: {
			componentData: {}
		},
		data(){
			return{
				customerOrders:[],
				pageInfo: {
					pageIndex: 1,    // 当前页
					pageSize: 5,    // 每页条数
					rowCount: 0      // 总条数
				},
				tableConfig:[{
					param:'custOrderNbr',
					name:'订单号',
					span: 4,
					width: 180
				},{
					param:'createDate',
					name:'订单时间',
					span: 4,
					width: 180
				},{
					param:'statusCd',
					name:'订单状态',
					span: 4,
					width: 180
				},{
					param:'verNum',
					name:'版本号',
					span: 4,
					width: 180
				},{
					param:'businessType',
					name:'业务类型',
					span: 3,
					width: 180
				},{
					param:'acceptDate',
					name:'受理时间',
					span: 3,
					width: 180
				}]
			}
		},
		methods:{
			init(item){
				this.getCustomerOrderList();
			},
			getCustomerOrderList(pageIndex = 1){ //获取订单列表
				this.$axios.post(this.$api.QryCustomerOrderList, {
					custId: this.componentData.ownerCustId,
					pageInfo: {
						pageIndex,
						pageSize: 5
					}
				}).then(res => {

					if(res.data.customerOrders && res.data.customerOrders.length){
						this.customerOrders = res.data.customerOrders || [];
						this.pageInfo = res.data.pageInfo;

						this.$nextTick( () => {
							this.$emit('initEnd')
						})
					}else{
						this.$message.error({message: '暂无数据'})
					}
					
				}).catch(err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			pageChange(val){ //分页
				this.getCustomerOrderList(val);
			},
			detailClick(item){ //订单详情查询
				this.$axios.post(this.$api.QryCustomerOrderAllDetail, {
					custOrderNbr: item.custOrderNbr
				}).then(res => {

					this.$emit('componentView','info',res.data);
				}).catch(err => {
					this.$message.error({"message": err.response.data.message})
				})
			},
			getItemParam(item,param){ //获取列表显示
				if(param == 'statusCd'){
					return this.getStatusCd(item[param])
				}

				return item[param];

			},
			getStatusCd(val){
				return {
					'100000': '受理中',
					'101100': '待审核',
					'101200': '待付款',
					'201300': '开通中',
					'300000': '竣工',
					'100004': '作废',
					'200000': '已提交',
					'400000': '异常',
					'201900': '待集团下单',
					'201901': '集团订单处理中',
					'401800': '取消中',
					'201700': '待发送',
					'401700': '已撤单'
				}[val] || '未知';
			}
		}
	}
</script>

<style scoped lang="scss">
	.list{

		.app__data-none{
			background-color: #fff;
		}

		.page{
			height: 50px;
			background-color: #fff;
		}

		.operation{
			cursor: pointer;
		}
	}
</style>