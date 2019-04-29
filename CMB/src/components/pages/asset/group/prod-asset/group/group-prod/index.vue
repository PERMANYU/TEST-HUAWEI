<template>
	<div class="group-prod">
		<span class="btn" @click="groupProdClick">转入群组资产</span>

		<Dialog dialogTitle="二级群产品信息" :dialogSize="dialogSize" ref="groupProdDialog">
			<div class="group-prod-dialog">
				<div class="app__title-2">
					<span class="app__title-name">基本信息</span>
				</div>
				<div class="secondary-info">
					<Row>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">产品标识：</span>
							<span class="app__lt-text">{{secondaryGroupObj.prodId}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">产品名称：</span>
							<span class="app__lt-text">{{secondaryGroupObj.prodName}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">销售品标识：</span>
							<span class="app__lt-text">{{secondaryGroupObj.offerId}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">销售品名称：</span>
							<span class="app__lt-text">{{secondaryGroupObj.offerName}}</span>
						</Col>
					</Row>

					<Row>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">客户标识：</span>
							<span class="app__lt-text">{{secondaryGroupObj.custId}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">客户名称：</span>
							<span class="app__lt-text">{{secondaryGroupObj.ownerCustName}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">客户类型：</span>
							<span class="app__lt-text">{{secondaryGroupObj.custType}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">客户子类型：</span>
							<span class="app__lt-text">{{secondaryGroupObj.custSubType}}</span>
						</Col>
					</Row>
					<Row>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">设备号：</span>
							<span class="app__lt-text">{{secondaryGroupObj.accNum}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">付费客户标识：</span>
							<span class="app__lt-text">{{secondaryGroupObj.payCustId}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">付费客户名称：</span>
							<span class="app__lt-text">{{secondaryGroupObj.payCustName}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">账单地址：</span>
							<span class="app__lt-text">{{secondaryGroupObj.contactAddr}}</span>
						</Col>
					</Row>
					<Row>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">使用客户标识：</span>
							<span class="app__lt-text">{{secondaryGroupObj.useCustId}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">使用客户名称：</span>
							<span class="app__lt-text">{{secondaryGroupObj.useCustName}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">安装地址：</span>
							<span class="app__lt-text">{{secondaryGroupObj.addressDesc}}</span>
						</Col>
						<Col class="app__lt" :span="6">
							<span class="app__lt-label">开通日期：</span>
							<span class="app__lt-text">{{secondaryGroupObj.firstFinishDate}}</span>
						</Col>
					</Row>
					<Row>
						<Col class="app__lt" :span="24">
							<span class="app__lt-label">状态：</span>
							<span class="app__lt-text">{{secondaryGroupObj.statusCd}}</span>
						</Col>
					</Row>
				</div>
				<div class="app__title-2">
					<span class="app__title-name">群组产品成员</span>
				</div>
				<div class="secondary-member">
					<Scroll class="app__table" fixedTopClassName="app__table-thead" fixedLeftClassName="app__data-none" isShowRight isShowBottom>
						<Row class="app__table-thead" inline>
							<Col :width="tableItem.width" v-for="(tableItem,tableIndex) in tableConfig" :key='tableIndex'>{{tableItem.name}}</Col>
						</Row>
						<Row :class="['app__table-item',item.rowActive ? 'active' : '']" 
							v-for="(item,index) in secondaryGroupMember" 
							:key="index" 
							@click.native="rowClick(item)"
							inline>
							<Col :width="tableItem.width" 
							v-for="(tableItem,tableIndex) in tableConfig" 
							:key='tableIndex'>{{item[tableItem.param]}}</Col>
						</Row>
						<div v-if="!secondaryGroupMember.length" class="app__data-none">
							<span>暂无数据</span>
						</div>
					</Scroll>
				</div>
			</div>
		</Dialog>

		<subProd ref="subProdRef" />
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			componentData: {}
		},
		data(){
			return{
				dialogSize:{
					max: 1200
				},
				secondaryGroupObj:{},
				tableConfig:[{
					param: 'prodInstId',
					name: '产品实例标识',
					width: 180
				},{
					param: 'prodName',
					name: '产品名称',
					width: 180
				},{
					param: 'offerId',
					name: '销售品标识',
					width: 180
				},{
					param: 'offerName',
					name: '销售品名称',
					width: 180
				},{
					param: 'custId',
					name: '客户标识',
					width: 180
				},{
					param: 'ownerCustName',
					name: '客户名称',
					width: 180
				},{
					param: 'custType',
					name: '客户类型',
					width: 180
				},{
					param: 'custSubType',
					name: '客户子类型',
					width: 180
				},{
					param: 'accNum',
					name: '设备号',
					width: 180
				},{
					param: 'payCustId',
					name: '付费客户标识',
					width: 180
				},{
					param: 'payCustName',
					name: '付费客户名称',
					width: 180
				},{
					param: 'contactAddr',
					name: '账单地址',
					width: 180
				},{
					param: 'useCustId',
					name: '使用客户标识',
					width: 180
				},{
					param: 'useCustName',
					name: '使用客户名称',
					width: 180
				},{
					param: 'addressDesc',
					name: '安装地址',
					width: 180
				},{
					param: 'firstFinishDate',
					name: '开通日期',
					width: 180
				},{
					param: 'statusCd',
					name: '状态',
					width: 180
				}],
				secondaryGroupMember:[]
			}
		},
		methods:{
			groupProdClick(){
				this.getSecondaryGroup();
			},
			getSecondaryGroup(){ //获取详情
				this.$axios.get(this.$api.SecondaryGroup,{
					params:{
						prodInstId: this.componentData.prodInstId //this.componentData.prodInstId '7374273231'
					}
				}).then( res => {

					this.secondaryGroupObj = res.data;
					this.$refs.groupProdDialog.show();

					this.getSecondaryGroupMember();
				}).catch( err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			getSecondaryGroupMember(){ //获取群组成员列表
				this.secondaryGroupMember = [];
				this.$axios.get(this.$api.SecondaryGroupMember,{
					params:{
						prodInstId: this.componentData.prodInstId
					}
				}).then( res => {
					this.secondaryGroupMember = res.data || [];
				}).catch( err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			rowClick(item){ //群组成员点击
				this.$refs.subProdRef.getSubProd(item);
			}
		},
		components:{
			subProd: () => import('./group/sub-prod'),
		}
	}
</script>

<style scoped lang="scss">
	.group-prod{
		position: absolute;
		display: inline-block;
		top: 70px;
		right: 20px;

		.btn{
			display: inline-block;
			padding: 0 15px;
			height: 30px;
			line-height: 30px;
			border-radius: 15px;
			color: #fff;
			background-color: #5a8af2;
			cursor: pointer;
		}
    }

    .group-prod-dialog{
    	padding: 20px;

    	.secondary-info{
    		.col{
    			padding: 8px 0;
    		}
    	}

    	.secondary-member{
    		height: 240px;
    	}
    }
</style>