<template>
	<div class="special-add">
		<span class="app__btn app__btn-add" @click="addClick">添加</span>

		<Dialog dialogTitle="政企白名单添加" :dialogSize="specialDialogSize" ref="specialDialog" @confirm="specialDialogConfirm" @close="specialDialogClose">
			<Scroll>
				<div class="special-dialog">
					<Form labelWidth="100px">
						<Row>
							<FormItem labelText="客户名称：" requiredIcon :errorMessage="errors.first('custName')">
								<Input readonly @click.native="nameFocus" :value="specialFormObj.custName" name="custName" v-validate="'required'" data-vv-as="客户名称"></Input>
							</FormItem>
						</Row>
						<Row>
							<FormItem labelText="客户标识：" requiredIcon :errorMessage="errors.first('custNumber')">
								<Input disabled :value="specialFormObj.custNumber" name="custNumber" v-validate="'required'" data-vv-as="客户标识"></Input>
							</FormItem>
						</Row>
						<Row v-if="isMod">
							<FormItem labelText="白名单状态：" requiredIcon :errorMessage="errors.first('statusCd')">
								<Select :data="statusCdArray" v-model="specialFormObj.statusCd" name="statusCd" v-validate="'required'" data-vv-as="白名单状态"></Select>
							</FormItem>
						</Row>
						<Row>
							<FormItem labelText="名单类型：" requiredIcon :errorMessage="errors.first('specialType')">
								<Select :data="specialTypeArray" v-model="specialFormObj.specialType" name="specialType" v-validate="'required'" data-vv-as="名单类型"></Select>
							</FormItem>
						</Row>
						<Row>
							<FormItem labelText="生效时间：" requiredIcon :errorMessage="errors.first('effDate')">
								<DatePicker v-model="specialFormObj.effDate" name="effDate" v-validate="`required|before_date:${new Date().format('yyyy-MM-dd')},1`" data-vv-as="生效时间"></DatePicker>
							</FormItem>
						</Row>
						<Row>
							<FormItem labelText="失效时间：" requiredIcon :errorMessage="errors.first('expDate')">
								<DatePicker v-model="specialFormObj.expDate" name="expDate" v-validate="`required|before_date:${new Date(specialFormObj.effDate).format('yyyy-MM-dd')},1`" data-vv-as="失效时间"></DatePicker>
							</FormItem>
						</Row>
					</Form>
				</div>
				
			</Scroll>
		</Dialog>

		<customerDialog ref='customerDialog' @confirm='customerDialogConfirm'/>
	</div>
</template>

<script type="text/javascript">
	import customerDialog from './../customer-dialog'; //客户检索

	export default{
		data(){
			return{
				specialDialogSize:{
					max: 500
				},
				statusCdArray:[{
					label:'有效',
					value:'1000'
				},{
					label:'无效',
					value:'1100'
				}],
				specialTypeArray:[{
					label:'固话',
					value:'1400'
				},{
					label:'移动',
					value:'1500'
				}],
				selectCustData: {},
				specialFormObj: {},
				isMod: false,
				hideCustId: false
			}
		},
		methods:{
			addClick(){ //添加
				this.isMod = false;
				this.specialFormObj = {};
				this.$refs.specialDialog.show();
			},
			modClick(item){ //修改
				this.isMod = true;
				this.specialFormObj = JSON.parse(JSON.stringify(item));
				this.$refs.specialDialog.show();
			},
			specialDialogConfirm(){ //新增白名单弹框确定

				this.$validator.validateAll().then(result => {
					if (result) {
						if(this.isMod){
							this.modSpecial();
						}else{
							this.addSpecial();
						}
					}
				})
				
			},
			addSpecial(){
				this.$axios.post(this.$api.CustSpecialAdd, {
					objId: this.specialFormObj.custId,
					statusCd: this.specialFormObj.statusCd || '1000',
					effDate: this.specialFormObj.effDate,
					expDate: this.specialFormObj.expDate,
					createStaff: this.$user.getStaffId(),
					createDate: new Date(),
					updateStaff: this.$user.getStaffId(),
					updateDate: new Date(),
					specialType: this.specialFormObj.specialType,
					subSpecialType: {'1400':'14000','1500':'15000'}[this.specialFormObj.specialType],
					objType: '1100',
					operSource: 'CRM管理门户',
					operSourceNum: '111'
				}).then(res => {
					this.$message.success({message: '新增成功'})
					this.$refs.specialDialog.hide();
					this.$emit('refresh');
				}).catch(err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			modSpecial(){
				this.$axios.patch(this.$api.CustSpecialDel.format({specialListId: this.specialFormObj.specialListId}), {
					objId: this.specialFormObj.custId,
					statusCd: this.specialFormObj.statusCd,
					effDate: this.specialFormObj.effDate,
					expDate: this.specialFormObj.expDate,
					createStaff: this.$user.getStaffId(),
					createDate: new Date(),
					updateStaff: this.$user.getStaffId(),
					updateDate: new Date(),
					specialType: this.specialFormObj.specialType,
					subSpecialType: {'1400':'14000','1500':'15000'}[this.specialFormObj.specialType],
					objType: '1100',
					operSource: 'CRM管理门户',
					operSourceNum: '111'
				}).then(res => {
					this.$message.success({message: '修改成功'})
					this.$refs.specialDialog.hide();
					this.$emit('refresh');
				}).catch(err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			specialDialogClose(){
				this.specialFormObj = {};
			},
			nameFocus(){ //客户名称点击
				this.$refs.customerDialog.show();
			},
			customerDialogConfirm(item){ //检索客户确定
				this.$set(this.specialFormObj,'custName',item.custName);
				this.$set(this.specialFormObj,'custNumber',item.custNumber);
				this.$set(this.specialFormObj,'custId',item.custId);
				this.$validator.validate('custName', item.custName);
				this.$validator.validate('custNumber', item.custNumber);
				this.selectCustData = item;
			}
		},
		components:{
			customerDialog
		}
	}
</script>

<style scoped lang="scss">
	.special-add{
		position: absolute;
		display: inline-block;
		right: 20px;
		top: 20px;

		.special-dialog{
			padding: 20px;
		}
	}
</style>