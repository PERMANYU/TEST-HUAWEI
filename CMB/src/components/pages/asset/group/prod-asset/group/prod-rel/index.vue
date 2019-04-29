<template>
	<div class="prod-rel">
		<Scroll class="app__table" :isShowBottom="true" fixedLeftClassName="app__data-none">
			<Row class="app__table-thead" inline>
				<Col :width="tableItem.width" v-for="(tableItem,tableIndex) in tableConfig" :key="tableIndex">
					<span>{{tableItem.name}}</span>
				</Col>
			</Row>

			<Row class="app__table-item" v-for="(item,index) in attrList" :key="index" inline>
				<Col :width="tableItem.width" v-for="(tableItem,tableIndex) in tableConfig" :key="tableIndex">
					<span>{{item[tableItem.param]}}</span>
				</Col>
			</Row>
			<div v-if="!attrList.length" class="app__data-none">
				<span>暂无数据</span>
			</div>
		</Scroll>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			componentData:{}
		},
		data(){
			return{
				attrList:[],
				tableConfig:[{
					param:'zProdName',
					name:'产品名称',
					width:180
				},{
					param:'roleName',
					name:'产品角色',
					width:180
				},{
					param:'statusCd',
					name:'状态',
					width:180
				},{
					param:'accNum',
					name:'设备号',
					width:180
				},{
					param:'beginRentDate',
					name:'起租时间',
					width:180
				},{
					param:'stopRentDate',
					name:'到期时间',
					width:180
				},{
					param:'effDate',
					name:'生效时间',
					width:180
				},{
					param:'expDate',
					name:'失效时间',
					width:180
				},{
					param:'stateEffDate',
					name:'停机时间',
					width:180
				},{
					param:'stateExpDate',
					name:'复机时间',
					width:180
				}]
			}
		},
		methods:{
			init(item){
				this.getRelData(item.prodInstId);
			},
			getRelData(prodInstId){ //获取产品详情
                this.$axios.get(this.$api.QueryAssertInfo, {
                    params: {
                        prodInstId
                    }
                }).then(res => {
                	
                	this.attrList = res.data.integrateAssert || [];

                	this.$nextTick( () => {
                		this.$emit('initEnd')
                	})
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            }
		}
	}
</script>

<style scoped lang="scss">

</style>