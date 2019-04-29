<template>
	<div class="prod-child">
		<ul>
			<li class="c-item" v-for="(item,index) in subProdArray" @click="prodNameClick(item)">
				<span>{{item.prodName}}</span>
			</li>
		</ul>

		<Dialog dialogTitle="产品属性" :dialogSize="dialogSize" :showConfirmBtn="false" ref="prodAttrDialog">
			<Scroll>
				<div class="prod-attr-dialog app__table">
					<Row class="app__table-thead">
						<Col :span="8">
							<span>属性名称</span>
						</Col>
						<Col :span="8">
							<span>属性值</span>
						</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in dialogItem.prodInstAttr || []" :key="index">
						<Col :span="8">
							<span>{{item.attrName}}</span>
						</Col>
						<Col :span="8">
							<span>{{item.attrValue}}</span>
						</Col>
						<Col :span="8">
							<span class="operation" v-if="item.attrId == '10001451206'" @click="attrValueSel(item)">查询</span>
						</Col>
					</Row>
					<div v-if="!dialogItem.prodInstAttr || !dialogItem.prodInstAttr.length" class="app__data-none">
						<span>暂无数据</span>
					</div>
				</div>
			</Scroll>
		</Dialog>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				dialogSize:{
					max: 1200,
					min: 1200
				},
				subProdArray: [],
				dialogItem: {}
			}
		},
		methods:{
			init(item){
				this.getSubProd(item.prodInstId);
			},
			getSubProd(prodInstId){ //获取子产品信息
				this.subProdArray = [];
				this.$axios.get(this.$api.subGroupProd.format({prodInstId}),{

				}).then( res => {
					this.subProdArray = res.data || [];

					this.$nextTick( () => {
						this.$emit('initEnd')
					})
				}).catch( err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			prodNameClick(item){ //产品点击显示产品属性
				this.dialogItem = item;
				this.$refs.prodAttrDialog.show();
			},
			attrValueSel(item){ //特定属性点击后查询
				this.$router.push({ name: 'Blank', params:{accNum: item.attrValue} });
			}
		}
	}
</script>

<style scoped lang="scss">
	.prod-child{
		.c-item{
			position: relative;
			display: inline-block;
			padding: 0 20px 0 30px;
			margin-bottom: 20px;
			height: 40px;
			line-height: 40px;
			margin-right: 20px;
			border: 1px dotted #eee;
			background-color: #fff;
			vertical-align: middle;
			color: #8e9aae;
			cursor: pointer;

			&:hover{
				color: #5a8af2;
			}

			&:after{
				content: '';
				position: absolute;
				display: inline-block;
				top: 18px;
				left: 20px;
				width: 4px;
				height: 4px;
				border-radius: 50%;
				background-color: #5a8af2;
			}
		}

		.prod-attr-dialog{
			padding: 20px;

			.operation{
				color: #5a8af2;
				cursor: pointer;
			}
		}
	}
</style>