<template>
	<Dialog dialogTitle="群组子产品详情" :dialogSize="dialogSize" :showConfirmBtn="false" ref="groupProdDialog">
		<div class="group-prod-dialog">
			<Scroll isShowBottom>
				<div class="content">
					<div class="app__table">
						<Row class="app__table-thead">
							<Col :span="tableItem.span" v-for="(tableItem,tableIndex) in TreeSimplekeys" :key='tableIndex'>{{tableItem.name}}</Col>
						</Row>
					</div>
					
					<TreeSimple v-for="(childItem,childIndex) in childArray" :key="childIndex" :folder="childItem" :keys="TreeSimplekeys" childrenStr="childProdInst">

					</TreeSimple>
				</div>
			</Scroll>
		</div>
		
	</Dialog>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				dialogSize:{
					max: 1200,
					min: 1200
				},
				TreeSimplekeys:[{
					key: 'accNum',
					name: '设备号',
					span: 2
				},{
					key: 'prodInstId',
					name: '产品实例ID',
					span: 2
				},{
					key: 'addressDesc',
					name: '安装地址',
					span: 2
				},{
					key: 'firstFinishDate',
					name: '开通日期',
					span: 1
				},{
					key: 'ownerCustId',
					name: '客户标识',
					span: 1
				},{
					key: 'ownerCustName',
					name: '客户名称',
					span: 2
				},{
					key: 'prodId',
					name: '产品标识',
					span: 1
				},{
					key: 'prodName',
					name: '产品名称',
					span: 2
				},{
					key: 'statusCd',
					name: '状态',
					span: 1
				},{
					key: 'useCustId',
					name: '使用客户标识',
					span: 2
				},{
					key: 'useCustName',
					name: '使用客户名称',
					span: 2
				},{
					key: 'acctId',
					name: '账户标识',
					span: 1
				},{
					key: 'payCustId',
					name: '付费客户标识',
					span: 2
				},{
					key: 'payCustName',
					name: '付费客户名称',
					span: 2
				},{
					key: 'contactAddr',
					name: '账单地址',
					span: 1
				}],
				childArray: []
			}
		},
		methods:{
			show(){
				

				this.$refs.groupProdDialog.show();
			},
			getSubProd(item){
				this.$axios.get(this.$api.subGroupProd.format({prodInstId: item.prodInstId}),{

				}).then( res => {
					
					this.childArray = res.data || [];

					this.$refs.groupProdDialog.show();
				}).catch( err => {
					this.$message.error({message: err.response.data.message})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.group-prod-dialog{
		padding: 20px;

		.content{
			width: 2000px;
		}
	}
</style>