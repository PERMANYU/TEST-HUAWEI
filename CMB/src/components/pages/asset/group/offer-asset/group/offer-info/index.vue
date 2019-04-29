<template>
	<div class="offer-info">
		<Row>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">设备编号（实例）：</span>
				<span class="app__lt-text">{{mainData.accNum || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">商品名称：</span>
				<span class="app__lt-text">{{mainData.offerInstName || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">根产品资产编码：</span>
				<span class="app__lt-text">{{mainData.accNum || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">客户名称：</span>
				<span class="app__lt-text">{{mainData.xxxxx || '无'}}</span>
			</Col>
		</Row>

		<Row>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">客户标识：</span>
				<span class="app__lt-text">{{mainData.xxxxx || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">客户类型：</span>
				<span class="app__lt-text">{{mainData.xxxxx || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">开通日期：</span>
				<span class="app__lt-text">{{mainData.effDate || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">生效日期：</span>
				<span class="app__lt-text">{{mainData.expDate || '无'}}</span>
			</Col>
		</Row>

		<Row>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">资费生效日期：</span>
				<span class="app__lt-text">{{mainData.xxxxx || '无'}}</span>
			</Col>
			<Col class="app__lt" :span="6">
				<span class="app__lt-label">到期日期：</span>
				<span class="app__lt-text">{{mainData.xxxxx || '无'}}</span>
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