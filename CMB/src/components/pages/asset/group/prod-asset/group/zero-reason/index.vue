<template>
	<div class="zero-reason">
		<span class="app__btn app__btn-add" @click="zeroReasonClick">零自费原因</span>

		<Dialog dialogTitle="零自费原因" :dialogSize="zeroReasonDialogSize" ref="zeroReasonDialog" @confirm="zeroReasonDialogConfirm">
			<div class="zero-reason-dialog">
				<Row>
					<FormItem labelText="设备号：">
						<span>{{componentData.accNum}}</span>
					</FormItem>
				</Row>
				<Row>
					<FormItem labelText="零自费原因：">
						<Select :data="zeroReasonArray" v-model="curZeroReason.zeroReason"></Select>
					</FormItem>
				</Row>
			</div>
		</Dialog>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			componentData: {}
		},
		data(){
			return{
				zeroReasonDialogSize:{
					max: 500
				},
				curZeroReason: {},
				zeroReasonArray:[{
					label: 'CHECKSUCESS',
					value: '1'
				},{
					label: '其他设备号开账，注明开账设备（全球眼、E通VPN、VPDN）',
					value: '2'
				},{
					label: '有批文',
					value: '3'
				},{
					label: '有框架协议',
					value: '4'
				},{
					label: '重大合作项目，管道资源置零',
					value: '5'
				},{
					label: '集团或外省上单，电路收入录入在长途资费中，本地段无结算收入',
					value: '6'
				},{
					label: '集团或外省电路，有结算收入',
					value: '7'
				},{
					label: '非零资费电路，另行开手工账单，注明开账金额',
					value: '8'
				}]
			}
		},
		methods:{
			zeroReasonClick(){ //零自费原因按钮事件
				this.getZeroReason();
			},
			zeroReasonDialogConfirm(){ //零自费原因确定
				if(this.curZeroReason.prodInstId){
					this.modZeroReason();
				}else{
					this.addZeroReason();
				}
			},
			getZeroReason(){ //获取零自费原因
				this.$axios.get(this.$api.ProdInstExt.format({prodInstId:this.componentData.prodInstId}), {

				}).then(res => {
					this.curZeroReason = res.data || {};

					this.$refs.zeroReasonDialog.show();
				}).catch(err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			addZeroReason(){ //新增零自费原因
				this.$axios.post(this.$api.HandleProdInstExt, {
					prodInstId: this.componentData.prodInstId,
					createStaff: this.$user.getStaffId(),
					updateStaff: this.$user.getStaffId(),
					custId: this.componentData.ownerCustId,
					zeroReason: this.curZeroReason.zeroReason
				}).then(res => {
					this.$message.success({message: '修改成功！'})
					this.$refs.zeroReasonDialog.hide();
				}).catch(err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			modZeroReason(){ //修改零自费原因
				this.$axios.patch(this.$api.ProdInstExt.format({prodInstId:this.componentData.prodInstId}), this.curZeroReason).then(res => {
					this.$message.success({message: '修改成功！'})
					this.$refs.zeroReasonDialog.hide();
				}).catch(err => {
					this.$message.error({message: err.response.data.message})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.zero-reason{
		position: absolute;
		display: inline-block;
		right: 125px;
		top: 0;

		.zero-reason-dialog{
			padding: 20px;
			min-height: 330px;
		}
	}
</style>