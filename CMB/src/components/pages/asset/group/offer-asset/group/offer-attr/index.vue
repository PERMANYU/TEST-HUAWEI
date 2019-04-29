<template>
	<div>
		<div class="app__table">
			<Row class="app__table-thead">
				<Col :span="8">
					<span>属性名称</span>
				</Col>
				<Col :span="8">
					<span>数据类型</span>
				</Col>
				<Col :span="8">
					<span>属性值</span>
				</Col>
			</Row>

			<Row class="app__table-item" v-for="(item,index) in attrList" :key="index">
				<Col :span="8">
					<span>{{item.xxxxx}}</span>
				</Col>
				<Col :span="8">
					<span>{{item.xxxxx}}</span>
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
		methods:{
			init(item){
				this.getAssetData(item.offerInstId);
			},
			getAssetData(offerInstId){ //获取产品详情
                this.$axios.get(this.$api.Asset, {
                    params: {
                        offerInstId
                    }
                }).then(res => {
                	let mainData = res.data.prodInsts.find(item => item.commodityType == '10');

                	this.attrList = mainData.offerInstAttr;

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