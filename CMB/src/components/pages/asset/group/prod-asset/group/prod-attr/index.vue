<template>
	<div class="prod-attr">
		<div class="app__table">
			<Row class="app__table-thead">
				<Col :span="8">
					<span>属性名称</span>
				</Col>
				<Col :span="8">
					<span>属性值</span>
				</Col>
			</Row>

			<Row class="app__table-item" v-for="(item,index) in attrList" :key="index">
				<Col :span="8">
					<span>{{item.attrName}}</span>
				</Col>
				<Col :span="8">
					<span>{{item.attrValue}}</span>
				</Col>
			</Row>
			<div v-if="!attrList.length" class="app__data-none">
				<span>暂无数据</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				attrList:[]
			}
		},
		created(){
			
		},
		methods:{
			init(item){
				this.getAssetData(item.prodInstId);
			},
			getAssetData(prodInstId){ //获取产品详情
                this.$axios.get(this.$api.Asset, {
                    params: {
                        prodInstId
                    }
                }).then(res => {
                	let mainData = res.data.prodInsts.find(item => item.prodFuncType == '101');

                	this.attrList = mainData.prodInstAttr;

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
	.prod-attr{

	}
</style>