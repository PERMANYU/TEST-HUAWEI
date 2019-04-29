<template>
	<div class="check-log">
		<span class="app__btn app__btn-add" @click="assetEditClick">资产修改</span>

		<Dialog dialogTitle="一证五号信息" :dialogSize="checkLogDialogSize" ref="checkLogDialog" @confirm="checkLogDialogConfirm">
			<div class="check-log-dialog">
				<Row>
					<FormItem labelText="产品标识：">
						<span>{{componentData.prodInstId}}</span>
					</FormItem>
				</Row>
				<Row>
					<FormItem labelText="核实结果：">
						<Select :data="yzwhCheckArray" v-model="yzwhCheckNewResult"></Select>
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
				checkLogDialogSize:{
					max: 500
				},
				yzwhCheckArray:[{
					label:'未核实',
					value:'未核实'
				},{
					label:'已通过核实',
					value:'已通过核实'
				},{
					label:'未联系',
					value:'未联系'
				},{
					label:'已核实',
					value:'已核实'
				}],
				yzwhCheckObj: {}, //一证五号验证结果
				yzwhCheckNewResult: '' //一证五号新验证结果
			}
		},
		methods:{
            assetEditClick(){ //资产修改按钮
                this.$axios.get(this.$api.ProdInstCheckLog, {
                    params: {
                        prodInstId: this.componentData.prodInstId,
                        ownerCustId: this.componentData.ownerCustId,
                        statusCd: '1000000'
                    }
                }).then(res => {
                	this.$refs.checkLogDialog.show();

                	this.yzwhCheckObj = res.data[0] || {};

                    this.yzwhCheckNewResult = this.yzwhCheckObj.yzwhCheck || '';
                }).catch(err => {
                    this.$message.error({message: err.response.data.message})
                })
            },
            checkLogDialogConfirm(){ //一证五号确认按钮
            	if(!this.yzwhCheckObj.yzwhCheck && this.yzwhCheckNewResult == ''){
            		this.$refs.checkLogDialog.hide();
            		return;
            	}

            	if(!this.yzwhCheckObj.yzwhCheck){
            		if(this.yzwhCheckNewResult != ''){
            			this.addCheckResult();
            		}
            	}else{
            		if(this.yzwhCheckNewResult == ''){
            			this.deleteCheckResult();
            		}else if(this.yzwhCheckNewResult != this.yzwhCheckObj.yzwhCheck){
            			this.updateCheckResult();
            		}
            	}
            },
            addCheckResult(){ //添加一证五号验证
            	this.$axios.post(this.$api.ProdInstCheckLog, {
                    yzwhCheck: this.yzwhCheckNewResult,
                    prodInstId: this.componentData.prodInstId,
                    ownerCustId: this.componentData.ownerCustId,
                    statusCd: '1000000',
                    createStaff: this.$user.getStaffId(),
                    siebelRowId: '1'
                }).then(res => {
                	this.$refs.checkLogDialog.hide();
                }).catch(err => {
                    this.$message.error({message: err.response.data.message})
                })
            },
            updateCheckResult(){ //修改一证五号验证
            	this.$axios.patch(this.$api.ProdInstCheckLog, {
                    yzwhCheck: this.yzwhCheckNewResult,
                    prodInstId: this.componentData.prodInstId,
                    prodInstCheckLogId: this.yzwhCheckObj.prodInstCheckLogId,
                    ownerCustId: this.componentData.ownerCustId,
                    statusCd: '1000000',
                    updateStaff: this.$user.getStaffId()
                }).then(res => {
                	this.$refs.checkLogDialog.hide();
                }).catch(err => {
                    this.$message.error({message: err.response.data.message})
                })
            },
            deleteCheckResult(){ //删除一证五号验证
            	this.$axios.delete(this.$api.ProdInstCheckLog, {
                    data:{
                        yzwhCheck: this.yzwhCheckObj.yzwhCheck,
                        prodInstCheckLogId: this.yzwhCheckObj.prodInstCheckLogId,
                        prodInstId: this.componentData.prodInstId,
                        ownerCustId: this.componentData.ownerCustId,
                        statusCd: '110000',
                        updateStaff: this.$user.getStaffId()
                    }
                }).then(res => {
                	this.$refs.checkLogDialog.hide();
                }).catch(err => {
                    this.$message.error({message: err.response.data.message})
                })
            }
		}
	}
</script>

<style scoped lang="scss">
	.check-log{
		position: absolute;
		display: inline-block;
		right: 20px;
		top: 0;

		.check-log-dialog{
			padding: 20px;
			min-height: 300px;
		}
		
	}
</style>