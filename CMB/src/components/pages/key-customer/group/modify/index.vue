<template>
	<transition name="fade">
		<div class="add">
			<Scroll :isShowRight="true" ref="scroll" class="self-adaption">
				<div class="a-header">
					<div class="a-title">重点客户</div>
					<div class="a-close" @click="btnBack()"></div>
				</div>		
				<Form labelWidth="180px" labelAlign="left" class="cus-main">
					<!--基本信息-->
					<div class="cus-box">
						<div class="cus-title cus-basic">基本信息</div>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="客户标识：" :requiredIcon="true" :errorMessage="errors.first('custId')">
									<Input name="custId" disabled v-validate="'required'" data-vv-as="客户标识" v-model="customerObj.custId" placeholder="请选择客户标识"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="管理单位及区局：" :requiredIcon="true" :errorMessage="errors.first('xParentBureauName')">
                                     <Select
                                        name="xParentBureauName"
                                        :data="xParentBureauNameData"
                                        v-validate="'required'"
                                        data-vv-as="管理单位及区局"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue" 
                                        v-model="customerObj.companyBureau">
                                    </Select>
									<!-- <Input name="companyBureau" disabled v-model="customerObj.companyBureau"></Input> -->
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="成为vip时间：">
									<Input disabled :value="customerObj.becomeVipDate | getLocalTime"></Input>
								</FormItem>
							</Col>
						</Row>
					</div>
					<!--VIP客户信息-->
					<div class="cus-box">
						<div class="cus-title cus-vip">VIP客户信息</div>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="VIP客户姓名：" :requiredIcon="true" :errorMessage="errors.first('custVipName')">
									<Input name="custVipName" placeholder="请输入VIP客户姓名（长度30字以内）" v-validate="'required'" data-vv-as="VIP客户姓名" v-model="customerObj.custVipName"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="VIP客户单位：" :requiredIcon="true" :errorMessage="errors.first('custEmployer')">
									<Input name="custEmployer" data-vv-as="VIP客户单位" v-validate="'required'" placeholder="请输入VIP客户单位" v-model="customerObj.custEmployer"></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="VIP客户职务：" :requiredIcon="true" :errorMessage="errors.first('custPosition')">
									<Input name="custPosition" data-vv-as="VIP客户职务" v-validate="'required'" placeholder="请输入VIP客户职务" v-model="customerObj.custPosition"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="VIP客户联系人姓名：" :requiredIcon="true" :errorMessage="errors.first('custContactName')">
									<Input name="custContactName" data-vv-as="VIP客户联系人姓名" v-validate="'required'" placeholder="请输入VIP客户联系人姓名" v-model="customerObj.custContactName"></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="VIP客户联系人单位：" :requiredIcon="true" :errorMessage="errors.first('custContactEmployer')">
									<Input name="custContactEmployer" data-vv-as="VIP客户联系人单位" v-validate="'required'" placeholder="请输入VIP客户联系人单位" v-model="customerObj.custContactEmployer"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="VIP客户联系人职务：" :requiredIcon="true" :errorMessage="errors.first('custContactPosition')">
									<Input name="custContactPosition" data-vv-as="VIP客户联系人职务" v-validate="'required'" placeholder="请输入VIP客户联系人职务" v-model="customerObj.custContactPosition"></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="VIP客户联系人Email：" :requiredIcon="true" :errorMessage="errors.first('custContactEMail')">
									<Input name="custContactEMail" data-vv-as="VIP客户联系人Email" v-validate="'required|email'" placeholder="请输入VIP客户联系人Email" v-model="customerObj.custContactEMail"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="VIP客户类别：" :requiredIcon="true" :errorMessage="errors.first('custVipType')">
									<Input name="custVipType" data-vv-as="VIP客户类别" v-validate="'required'" placeholder="请输入VIP客户类别" v-model="customerObj.custVipType"></Input>
								</FormItem>
							</Col>
						</Row>
					</div>
					<!--首席客户经理信息-->
					<div class="cus-box">
						<div class="cus-title cus-group">首席客户经理信息</div>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="首席客户经理姓名：" :requiredIcon="true" :errorMessage="errors.first('firstCustManagerName')">
									<Select	name="firstCustManagerName"
											data-vv-as="首席客户经理姓名"
											v-validate="'required'" 
											:isSearch="true"
											@load="loadList(arguments[0], 1)"
											@change="firstCustManegerChange"
											v-model="customerObj.firstCustManegerId"
											dataLabelStr="firstCustManagerName"
											dataValueStr="firstCustManegerId"
											:data="firstCustomerManager">
									</Select>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="首席客户经理单位：" :requiredIcon="true" :errorMessage="errors.first('firstCustManagerEmployer')">
									<Input name="firstCustManagerEmployer" data-vv-as="首席客户经理单位" v-validate="'required'" v-model="customerObj.firstCustManagerEmployer"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="1">
								<FormItem labelText="首席客户经理职务：" :requiredIcon="true" :errorMessage="errors.first('firstCustManagerPosition')">
									<Input name="firstCustManagerPosition" data-vv-as="首席客户经理职务" v-validate="'required'" v-model="customerObj.firstCustManagerPosition"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="首席客户经理联系电话：" :requiredIcon="true" :errorMessage="errors.first('firstCustManagerPhone')">
									<Input name="firstCustManagerPhone" data-vv-as="首席客户经理联系电话" v-validate="'required|mobile'" v-model="customerObj.firstCustManagerPhone"></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="首席客户经理联系人职务：" :requiredIcon="true" :errorMessage="errors.first('firstCustManagerContactPosition')">
									<Input name="firstCustManagerContactPosition" data-vv-as="首席客户经理联系人职务" v-validate="'required'" v-model="customerObj.firstCustManagerContactPosition"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="首席客户经理联系人Email：" :requiredIcon="true" :errorMessage="errors.first('firstCustManagerContactEmail')">
									<Input name="firstCustManagerContactEmail" data-vv-as="首席客户经理联系人Email" v-validate="'required|email'" v-model="customerObj.firstCustManagerContactEmail"></Input>
								</FormItem>
							</Col>
                            <Col :span="10" :offset="1">
								<FormItem labelText="首席客户经理联系人姓名：" :requiredIcon="true" :errorMessage="errors.first('firstCustManagerContactName')">
									<Input name="firstCustManagerContactName" placeholder="请输入首席客户经理联系人姓名" data-vv-as="首席客户经理联系人姓名" v-validate="'required'" v-model="customerObj.firstCustManagerContactName"></Input>
								</FormItem>
							</Col>
                            <Col :span="10" :offset="2">
								<FormItem labelText="首席客户经理联系人电话：" :requiredIcon="true" :errorMessage="errors.first('firstCustManagerContactPhone')">
									<Input name="firstCustManagerContactPhone" data-vv-as="首席客户经理联系人电话" v-validate="'required|mobile'" v-model.trim="customerObj.firstCustManagerContactPhone"></Input>
								</FormItem>
							</Col>
						</Row>
					</div>
					<!--客户经理信息-->
					<div class="cus-box">
						<div class="cus-title cus-grouper">客户经理信息</div>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="客户经理姓名：" :requiredIcon="true" :errorMessage="errors.first('secondContactName')">
									<Select	name="secondContactName"
											data-vv-as="请输入客户经理姓名" v-validate="'required'" 
											:isSearch="true"
											@load="loadList(arguments[0], 2)"
											@change="custManegerChange"
											v-model="customerObj.custManegerId"
											dataLabelStr="custManagerName"
											dataValueStr="custManegerId"
											:data="secondCustomerManager">
									</Select>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="客户经理电话：" :requiredIcon="true" :errorMessage="errors.first('custManagerTel')">
									<Input name="custManagerTel" data-vv-as="客户经理电话" v-validate="'required|mobile'" placeholder="请输入客户经理电话" v-model.trim="customerObj.custManagerTel"></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="客户经理Email：" :requiredIcon="true" :errorMessage="errors.first('custManagerEmail')">
									<Input name="custManagerEmail" data-vv-as="客户经理Email" v-validate="'required|email'" placeholder="请输入客户经理Email" v-model="customerObj.custManagerEmail"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="客户经理单位：" :requiredIcon="true" :errorMessage="errors.first('custManagerCompany')">
									<Input name="custManagerCompany" data-vv-as="客户经理单位" v-validate="'required'"  placeholder="请输入客户经理单位" v-model="customerObj.custManagerCompany"></Input>
								</FormItem>
							</Col>
						</Row>
					</div>
				</Form>
			</Scroll>
			<div class="a-operation">
				<div class="btn-page-box">
					<span class="app__btn app__btn-back" @click="btnBack()">返回</span>
					<span class="app__btn app__btn-save" @click="mainBtnSave()">保存</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 5,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 1      // 总条数
                },
                xParentBureauNameData: [],
				customerObj: {},
				firstCustomerManager: [],		// 首席客户经理下拉选择的数据		
                secondCustomerManager: [],		// 客户经理下拉数据
                isAddSuccess: false
			}
		},
		mounted () {
			this.getMainData();
            this.customerObj = JSON.parse(JSON.stringify(this.$parent.currentData));

			this.firstCustomerManager.push({
				firstCustManegerId: this.customerObj.firstCustManegerId,
				firstCustManagerName: this.customerObj.firstCustManagerName
			})
			
			this.secondCustomerManager.push({
				custManagerName: this.customerObj.custManagerName,
				custManegerId: this.customerObj.custManegerId
            })
            
		},
		methods:{
			// 获取区局主数据
            getMainData () {
                // 区局
                this.$getjsons.getJson("CHN-SH-0003").then(res => {
                    this.xParentBureauNameData = res.data.attrSpecDetail.attrValueList
                })
            },
			// 关闭
			btnBack(){
				this.$emit('componentView','list');
			},

			// 智能搜索客户经理列表
			loadList (val, num) {
				this.$axios.get(this.$api.CustomerManage, {
					params: {
						"staffName": val,
						"offset": this.pageInfo.pageIndex,
                        "limit": this.pageInfo.pageSize,
                        "OrgId": this.$user.getOrgId()
					}
				}).then((res) => {
					if (res.data) {
						let data = res.data;
						let firstCustomerManagers = data.staffRole;

						let secondCustomerManagers = data.staffRole;

						if (num === 1) {
							firstCustomerManagers.filter((item) => {
								item.firstCustManagerName = item.staffName;
								item.firstCustManegerId = item.staffId;						
							})
							this.firstCustomerManager = firstCustomerManagers;
						} else {
							secondCustomerManagers.filter((item) => {
								item.custManagerName = item.staffName;
								item.custManegerId = item.staffId;
							})
							this.secondCustomerManager = secondCustomerManagers
						}					
					}
				}).catch(err => {
                    this.$message.warning({"message": err.response.data.message})
                })
			},

			//保存
			mainBtnSave() {
				this.$validator.validateAll().then((result) => {
                    if(!result){
                        return
                    } else {
						this.addCustomerForm()
					}
                })
			},

			// 修改
			addCustomerForm () {
				this.$axios.put(this.$api.keyCustomer + `/${this.customerObj.custVipId}`, {
					"custId": this.customerObj.custId,
					"companyBureau": this.customerObj.companyBureau,
					"becomeVipDate": this.customerObj.becomeVipDate,
					"custVipName": this.customerObj.custVipName,
					"custEmployer": this.customerObj.custEmployer,
					"custPosition": this.customerObj.custPosition,
					"custContactName":this.customerObj.custContactName,
					"custContactEmployer":this.customerObj.custContactEmployer,
					"custContactPosition": this.customerObj.custContactPosition,
					"custContactEMail": this.customerObj.custContactEMail,
					"custVipType": this.customerObj.custVipType,
					"createStaff": this.customerObj.createStaff,
					"statusCd": this.customerObj.statusCd,
                    "custManegerId": this.customerObj.custManegerId,
                    "custManagerEmail": this.customerObj.custManagerEmail,
                    "custManagerTel": this.customerObj.custManagerTel,
                    "staffCode": this.customerObj.staffCode,
					"firstCustManegerId": this.customerObj.firstCustManegerId,
					"custVipId": this.customerObj.custVipId,
					"updateStaff": this.customerObj.updateStaff,
					"updateDate": this.customerObj.updateDate,
					"firstCustManagerContactName": this.customerObj.firstCustManagerContactName,
                    "firstCustManagerContactEmail": this.customerObj.firstCustManagerContactEmail,
                    "firstCustManagerPhone": this.customerObj.firstCustManagerPhone,
					"firstCustManagerEmployer": this.customerObj.firstCustManagerEmployer,
					"firstCustManagerContactPosition": this.customerObj.firstCustManagerContactPosition,
					"firstCustManagerPosition": this.customerObj.firstCustManagerPosition,
                    "firstCustManagerContactPhone": this.customerObj.firstCustManagerContactPhone,
                    "firstCustManagerName": this.customerObj.firstCustManagerName
				}).then((res) => {
					if (res.data) {
                        this.$message.success({message: '修改成功'});
                        this.isAddSuccess = true;
                        this.$emit('componentView','list', res.data);
					} else {
						this.$message.success({message: '修改失败'})
					}
				}).catch(err => {
                    this.$message.warning({"message": err.response.data.message})
                })
			},

			// 首席客户经理下拉切换
			firstCustManegerChange(item){
                this.customerObj.firstCustManegerId = item.staffId;
				this.customerObj.firstCustManagerName = item.staffName;
				this.customerObj.firstCustManagerEmployer = item.attrValue
				this.customerObj.firstCustManagerPosition = item.sysPostName
			},

			// 客户经理下拉切换
			custManegerChange (item) {
                this.customerObj.staffCode = item.staffCode;
				this.customerObj.custManagerCompany = item.sysPostName
			},

			dragchange(val){
				this.tableTitleData = val;
			},
		}
			
	}
</script>

<style scoped lang="scss">
	$color-gray: #f6f6f6;
	.fade-enter-active, .fade-leave-active{
		transition: all .3s ease;
	}
	.fade-enter-active, .fade-leave-active{
		transition: all .3s ease;
	}

	.fade-enter, .fade-leave-to{
		top: -100% !important;
	}

	.add{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding-bottom: 50px;
		z-index: 201;
		background-color: #fdfdfd;
		.self-adaption {
			padding: 20px 40px 0 !important;
		}
		.a-header{
			width: 100%;
			height: 50px;
			line-height: 50px;
			border: 1px solid #fafafa;
			text-align: center;
			color: #333940;
			background: #ffffff;

			.a-title{
				display: inline-block;
				padding-left: 30px;
				font-size: 16px;
			}

			.a-close{
				position: absolute;
				width: 30px;
				height: 30px;
				top: 11px;
				right: 11px;
				cursor: pointer;
				background: url(./images/close.png) no-repeat center;
			}
		}
		
		.cus-main{
			margin-top: 8px;
			padding: 20px 40px;
			border: solid 1px #f4f7fa;
			background: #ffffff;
			.cus-box{
				padding: 0 20px;
				margin-bottom: 14px;
				background-color: #fdfefe;
				border: solid 1px #f8fafc;
				.cus-title{
				    display: inline-block;
				    height: 60px;
				    line-height: 60px;
				    padding-left: 40px;
				    font-size: 14px;
				    color: #00c0ff;
				    background-repeat: no-repeat;
				    background-position: center left;
				}
				.cus-basic{
					background-image: url(./images/basic.png);
				}
				.cus-vip{
					background-image: url(./images/vip.png);
				}
				.cus-group{
					background-image: url(./images/group.png);
				}
				.cus-grouper{
					background-image: url(./images/grouper.png);
				}
			}
		}
		.a-operation{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #fff;
			box-shadow: 0 -2px 1px #f1f5fa;

			.btn-page-box{
				text-align: right;
				padding-right: 20px;

				span{
					margin-left: 20px;
				}
			}
		}
	}

	.add-header {
		.search {
			padding-left: 19px;		
			height: 40px;
			line-height: 40px;
			.app__btn {
				width: 60px;
			}
		}
	}
	.manager-header {
		padding: 10px 0 0 0;
	}
	.manager-top {
		padding: 10px 20px 20px !important;
	}

	.m-title{
		font-weight: bold;
		text-align: center;
		background-color: #f8fcff;
		border-top: 1px solid #00c0ff;
		box-shadow: 0 1px 1px #f1f5fa;
		
		.col.m-t-name{
			border-right: 1px solid #00c0ff;
		}

		.col{
			border-right: 1px solid #f1f5fa;

			&.draging{
				position: relative;

				&:after{
					content: '';
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					width: 2px;
					height: 20px;
					background-color: #00c0ff;
				}
			}
		}
	}
	.row {
		text-align: center;
	}
</style>