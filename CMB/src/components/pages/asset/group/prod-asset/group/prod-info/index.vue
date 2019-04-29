<template>
	<div class="prod-info">
		<Row>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">设备号：</span>
				<span class="app__lt-text">{{mainData.accNum || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">产品：</span>
				<span class="app__lt-text">{{mainData.prodInstName || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">销售品Id：</span>
				<span class="app__lt-text">{{mainData.offerInstId || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">销售品名称（对内）：</span>
				<span class="app__lt-text">{{mainData.offerName || '无'}}</span>
			</Col>
		</Row>

		<Row>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">客户：</span>
				<span class="app__lt-text">{{mainData.ownerCustName || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">根资产设备编号：</span>
				<span class="app__lt-text">{{mainData.custId || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">开通日期：</span>
				<span class="app__lt-text">{{mainData.beginRentDate || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">资产状态：</span>
				<span class="app__lt-text">{{mainData.statusCdName || '无'}}</span>
			</Col>
		</Row>
		<Row>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">客户标识：</span>
				<span class="app__lt-text">{{mainData.ownerCustId || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">账户资料（分账序号）：</span>
				<span class="app__lt-text">{{mainData.xxxxx || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">账户名称：</span>
				<span class="app__lt-text">{{mainData.xxxxx || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">服务客户：</span>
				<span class="app__lt-text">{{mainData.xxxxx || '无'}}</span>
			</Col>
		</Row>
		<Row>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">资费失效日期：</span>
				<span class="app__lt-text">{{mainData.ownerCustId || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">签约捆绑结束日：</span>
				<span class="app__lt-text">{{mainData.xxxxx || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">客户服务等级：</span>
				<span class="app__lt-text">{{mainData.xxxxx || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">销售品名称（对外）：</span>
				<span class="app__lt-text">{{mainData.offerName || '无'}}</span>
			</Col>
		</Row>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				mainData:{}
			}
		},
		methods:{
			init(item){
				this.mainData = item;

				this.$nextTick( () => {
					this.$emit('initEnd')
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.col{
		padding: 8px 0;
	}
</style>