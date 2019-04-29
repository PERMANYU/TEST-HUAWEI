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
                        <div class="app__title-1">
                            <span class="app__title-name">基本信息</span>
                        </div>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="客户名称：" :requiredIcon="true" :errorMessage="errors.first('custName')">
									<Input name="custName" ref="input" disabled v-validate="'required'" data-vv-as="客户名称" v-model="formData.custName" placeholder="请选择客户名称"></Input>					
									<span class="customer-add" @click="toDialog"></span>
								</FormItem>								
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="管理单位及区局：" :requiredIcon="true" :errorMessage="errors.first('xParentBureauName')">
									<!-- <Input name="xParentBureauName" v-validate="'required'" data-vv-as="管理单位及区局" disabled v-model="formData.xParentBureauName"></Input> -->
                                    <Select
                                        name="xParentBureauName"
                                        :data="xParentBureauNameData"
                                        v-validate="'required'"
                                        data-vv-as="管理单位及区局" 
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"  
                                        v-model="formData.xParentBureauName"
                                        >
                                    </Select>
								</FormItem>
							</Col>
						</Row>
						<!-- <Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="公客VIP标志：">
									<Input disabled v-model="formData.customerLevel"></Input>
								</FormItem>
							</Col>
						</Row> -->
					</div>
					<!--VIP客户信息-->
					<div class="cus-box">
                        <div class="app__title-1">
                            <span class="app__title-name">VIP客户信息</span>
                        </div>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="VIP客户姓名：" :requiredIcon="true" :errorMessage="errors.first('custVipName')">
									<Input name="custVipName" placeholder="请输入VIP客户姓名（长度30字以内）" v-validate="'required'" data-vv-as="VIP客户姓名" v-model="formData.custVipName"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="VIP客户单位：" :requiredIcon="true" :errorMessage="errors.first('custEmployer')">
									<Input name="custEmployer" data-vv-as="VIP客户单位" v-validate="'required'" placeholder="请输入VIP客户单位" v-model="formData.custEmployer"></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="VIP客户职务：" :requiredIcon="true" :errorMessage="errors.first('custPosition')">
									<Input name="custPosition" data-vv-as="VIP客户职务" v-validate="'required'" placeholder="请输入VIP客户职务" v-model="formData.custPosition"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="VIP客户联系人姓名：" :requiredIcon="true" :errorMessage="errors.first('custContactName')">
									<Input name="custContactName" data-vv-as="VIP客户联系人姓名" v-validate="'required'" placeholder="请输入VIP客户联系人姓名" v-model="formData.custContactName"></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="VIP客户联系人单位：" :requiredIcon="true" :errorMessage="errors.first('custContactEmployer')">
									<Input name="custContactEmployer" data-vv-as="VIP客户联系人单位" v-validate="'required'" placeholder="请输入VIP客户联系人单位" v-model="formData.custContactEmployer"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="VIP客户联系人职务：" :requiredIcon="true" :errorMessage="errors.first('custContactPosition')">
									<Input name="custContactPosition" data-vv-as="VIP客户联系人职务" v-validate="'required'" placeholder="请输入VIP客户联系人职务" v-model="formData.custContactPosition"></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="VIP客户联系人Email：" :requiredIcon="true" :errorMessage="errors.first('custContactEMail')">
									<Input name="custContactEMail" data-vv-as="VIP客户联系人Email" v-validate="'required|email'" placeholder="请输入VIP客户联系人Email" v-model="formData.custContactEMail"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="VIP客户类别：" :requiredIcon="true" :errorMessage="errors.first('custVipType')">
									<Input name="custVipType" data-vv-as="VIP客户类别" v-validate="'required'" placeholder="请输入VIP客户类别" v-model="formData.custVipType"></Input>
								</FormItem>
							</Col>
						</Row>
					</div>
					<!--首席客户经理信息-->
					<div class="cus-box">
                        <div class="app__title-1">
                            <span class="app__title-name">首席客户经理信息</span>
                        </div>
                        <Form>
                            <Row>
                                <Col :span="10" :offset="1">
                                    <FormItem labelText="首席客户经理姓名：" :requiredIcon="true" :errorMessage="errors.first('firstCustManagerName')">
                                        <Select	name="firstCustManagerName"
                                                data-vv-as="首席客户经理姓名"
                                                v-validate="'required'"
                                                :isSearch="true"
                                                @load="loadList"
                                                v-model="firstCustomerObj.firstCustManagerName"
                                                :saveObject="true"
                                                dataLabelStr="staffName"
                                                dataValueStr="staffId"
                                                :data="firstCustomerManager">
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col :span="10" :offset="2">
                                    <FormItem labelText="首席客户经理单位：" :requiredIcon="true" :errorMessage="errors.first('firstCompany')">
                                        <Input name="firstCompany" disabled data-vv-as="首席客户经理单位" v-validate="'required'" v-model="firstCustomerObj.firstCustManagerName.orgName"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="10" :offset="1">
                                    <FormItem labelText="首席客户经理职务：" :requiredIcon="true" :errorMessage="errors.first('firstPosition')">
                                        <Input name="firstPosition" disabled data-vv-as="首席客户经理职务" v-validate="'required'" v-model="firstCustomerObj.firstCustManagerName.sysRoleName"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="10" :offset="2">
                                    <FormItem labelText="首席客户经理联系电话：" :requiredIcon="true" :errorMessage="errors.first('firstCustManagerPhone')">
                                        <Input name="firstCustManagerPhone" placeholder="请输入首席客户经理联系联系电话" data-vv-as="首席客户经理联系电话" v-validate="'required|mobile'" v-model="firstCustomerObj.firstCustManagerName.mobilePhone"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col :span="10" :offset="1">
                                    <FormItem labelText="首席客户经理联系人职务：" :requiredIcon="true" :errorMessage="errors.first('firstContactPositon')">
                                        <Input name="firstContactPositon" placeholder="请输入首席客户经理联系人职务" data-vv-as="首席客户经理联系人职务" v-validate="'required'" v-model="formData.firstContactPositon"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="10" :offset="2">
                                    <FormItem labelText="首席客户经理联系人Email：" :requiredIcon="true" :errorMessage="errors.first('firstContactEmail')">
                                        <Input name="firstContactEmail" placeholder="请输入首席客户经理联系人Email" data-vv-as="首席客户经理联系人Email" v-validate="'required|email'" v-model="formData.firstContactEmail"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="10" :offset="1">
                                    <FormItem labelText="首席客户经理联系人姓名：" :requiredIcon="true" :errorMessage="errors.first('firstContactName')">
                                        <Input name="firstContactName" placeholder="请输入首席客户经理联系人姓名" data-vv-as="首席客户经理联系人姓名" v-validate="'required'" v-model="formData.firstContactName"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="10" :offset="2">
                                    <FormItem labelText="首席客户经理联系人电话：" :requiredIcon="true" :errorMessage="errors.first('firstContactTel')">
                                        <Input name="firstContactTel" placeholder="请输入首席客户经理联系人电话" data-vv-as="首席客户经理联系人电话" v-validate="'required|mobile'" v-model.trim="formData.firstContactTel"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
					</div>
					<!--客户经理信息-->
					<div class="cus-box">
                        <div class="app__title-1">
                            <span class="app__title-name">客户经理信息</span>
                        </div>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="客户经理姓名：" :requiredIcon="true" :errorMessage="errors.first('secondContactName')">
									<Select	name="secondContactName"
											data-vv-as="请输入客户经理姓名" v-validate="'required'"
											:isSearch="true"
											@load="loadList"
											v-model="secondCustomerObj.secondContactName"
											:saveObject="true"
											dataLabelStr="staffName"
											dataValueStr="staffId"
											:data="secondCustomerManager">
									</Select>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="客户经理电话：" :requiredIcon="true" :errorMessage="errors.first('custManagerTel')">
									<Input name="custManagerTel" data-vv-as="客户经理电话" v-validate="'required|mobile'" placeholder="请输入客户经理电话" v-model.trim="secondCustomerObj.secondContactName.mobilePhone"></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" :offset="1">
								<FormItem labelText="客户经理Email：" :requiredIcon="true" :errorMessage="errors.first('custManagerEmail')">
									<Input name="custManagerEmail" data-vv-as="客户经理Email" v-validate="'required|email'" placeholder="请输入客户经理Email" v-model="secondCustomerObj.secondContactName.eMail"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="客户经理单位：" :requiredIcon="true" :errorMessage="errors.first('attrValue')">
									<Input name="attrValue" data-vv-as="客户经理Email" v-validate="'required'" placeholder="请输入客户经理单位" v-model="secondCustomerObj.secondContactName.orgName"></Input>
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

			<!-- 选择客户标识S -->
			<Dialog ref="custDialog" :dialogTitle="dialogTitle" :dialogSize="managerDialogSize" @confirm="confirmCustomer">
				<div class="add-header manager-header">
					<Row>
						<Col :span="12">
							<Search placeholder="请输入客户标识" @search="handleSearch"></Search>
						</Col>
					</Row>
				</div>

				<div class="manager-top">
					<Scroll class="app__table" fixedTopClassName="m-title" ref="listScroll">
						<DragGroup class="m-title app__table-thead" :titleList="customerManagerData" @dragchange="dragchange">
							<Col :span="2"></Col>

							<DragItem :span="item.span" 
								:value="item"
								v-for="(item,index) in customerManagerData"
								:key="index">
								<span>{{item.name}}</span>
							</DragItem>
						</DragGroup>
						<Row :class="['m-item app__table-item']" v-for="(customer,index) in customerManagerItemData" :key="index" @click.native="currentRadioSelect(customer)">
							<Col :span="2">
								<Radio name="customer" :label="customer" v-model="radioData"></Radio>
							</Col>
							<Col :span="item.span" class="col-overflow"
								:title="customer[item.param]"
								v-for="(item,index) in customerManagerData"
								:key="index">
								<span>{{customer[item.param]}}</span>
							</Col>
						</Row>
						<div v-if="!customerManagerItemData.length" class="app__data-none">
							<span>当前无数据 请先选择客户</span>
						</div>
						<Pagination v-if="customerManagerItemData.length" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages="5">
						</Pagination>
					</Scroll>
				</div>
			</Dialog>
			<!-- 选择客户标识E -->
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
				formData:{
					// custId: '',					// 客户标识
					// companyBureau: '',			// 区局
					// customerLevel: '',			// 公客VIP标志
					// custVipName: '',			// VIP客户姓名
					// custEmployer: '',			// VIP客户单位
					// custPosition: '',			// VIP客户职务
					// custContactName: '',		// VIP客户联系人姓名
					// custContactEmployer: '',	// VIP客户联系人单位
					// custContactPosition: '',	// VIP客户联系人职务
					// custContactEMail: '',		// VIP客户联系人Email
                    // firstContactName: '',		// 首席客户经理联系人姓名
                    // firstCustManagerName: '',    // 首席客户经理姓名
                    // firstCustManagerPhone: '',   // 首席客户经理联系电话
					// firstCompany: '',			// 首席客户经理单位
					// firstPosition: '',			// 首席客户经理职务
					// firstContactTel: '',		// 首席客户经理联系人电话
					// firstContactPositon: '',	// 首席客户经理联系人职务
					// firstContactEmail: '',		// 首席客户经理联系人Email
					// custManagerName: '',		// 客户经理姓名
					// custManagerTel: '',			// 客户经理电话
					// custManagerEmail: '',		// 客户经理Email
					// custManagerCompany: ''		// 客户经理单位
				},
				dialogTitle: '请选择客户',
				managerDialogSize: {
					max: 821
				},
				radioData: {},
				firstCustomerObj: {
					firstCustManagerName: ''
				},
				firstCustomerManager: [],		// 首席客户经理下拉选择的数据
				secondCustomerObj: {
					secondContactName: ''
				},			
				secondCustomerManager: [],		// 客户经理下拉数据
				customerManagerData:[{
                	name: '客户名称',
                	param:'custName',
                	span: 6
                },{
                	name:'客户标识',
                	param:'custNumber',
                	span: 4
                },{
                	name:'所属区局',
                	param:'xParentBureauName',
                	span: 4
                },{
					name:'客户类型',
                	param:'custType',
                	span: 3
				},{
					name:'客户地址',
                	param:'custAddr',
                	span: 5
				}],
				isAddSuccess: false,
				customerManagerItemData: [],
			}
		},
        mounted () {
            this.getMainData();
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

			// 打开dialog
			toDialog () {
				this.getClientInfo()
			},

			// 搜索
			handleSearch (data) {
                this.getClientInfo(data);
                data = ''
			},

			// 获取客户列表
			getClientInfo (custNumber) {
				this.$axios.get(this.$api.adddClientDistribution, {
					params: {
                        custId: '',
                        custNumber: custNumber ? custNumber : '',
                        custType: '1100',
						custName: '',
						sysRoleName: '',
						pageNumber: this.pageInfo.pageIndex,
						pageSize: this.pageInfo.pageSize
					}
				}).then((res) => {
                    this.$refs.custDialog.show();
					this.customerManagerItemData = res.data;
				})
			},

			// 确定
			confirmCustomer () {
				if (!this.radioData.custId) {
					this.$message.warning({"message": "请选择一条数据"})
					return
				} else {
					this.$refs.custDialog.hide();
					this.formData = this.radioData
				}
				this.$refs.input.focus();
				setTimeout(() => {
					this.$refs.input.blur();
				}, 100)
			},

			// 智能搜索客户经理列表
			loadList (val) {
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
						this.pageInfo.rowCount = data.pageInfo.rowCount;
						this.firstCustomerManager = data.staffRole;
						this.secondCustomerManager = data.staffRole;
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

			// 新增
			addCustomerForm () {
                let userStorage = this.$user.getUserStorage();
				this.$axios.post(this.$api.keyCustomer, {
					"custId": this.formData.custId,
					"companyBureau": this.formData.xParentBureauName,
					"becomeVipDate": '',
					"custVipName": this.formData.custVipName,
					"custEmployer": this.formData.custEmployer,
					"custPosition": this.formData.custPosition,
					"custContactName": this.formData.custContactName,
					"custContactEmployer": this.formData.custContactEmployer,
					"custContactPosition": this.formData.custContactPosition,
					"custContactEMail": this.formData.custContactEMail,
					"custVipType": this.formData.custVipType,
					"createStaff": userStorage.staffId,
					"statusCd": '1000',
					"remark": "",
                    "custManegerId": this.secondCustomerObj.secondContactName.staffId,
                    "custManagerEmail": this.secondCustomerObj.secondContactName.eMail,
                    "custManagerTel": this.secondCustomerObj.secondContactName.mobilePhone,
                    "staffCode": this.secondCustomerObj.secondContactName.staffCode,
					"firstCustManegerId": this.firstCustomerObj.firstCustManagerName.staffId,
					"statusDate": '',
					"createDate": '',
					"updateDate": '',
					"updateStaff": userStorage.staffId,
					"firstCustManagerContactName": this.formData.firstContactName,
					"firstCustManagerContactEmail": this.formData.firstContactEmail,
                    "firstCustManagerPhone": this.firstCustomerObj.firstCustManagerName.mobilePhone,
					"firstCustManagerEmployer": this.firstCustomerObj.firstCustManagerName.orgName,
					"firstCustManagerContactPosition": this.formData.firstContactPositon,
					"firstCustManagerPosition": this.firstCustomerObj.firstCustManagerName.sysRoleName,
                    "firstCustManagerContactPhone": this.formData.firstContactTel,
                    "firstCustManagerName": this.firstCustomerObj.firstCustManagerName.staffName
				}).then((res) => {
					if (res.data) {
						this.$message.success({message: "新增成功"});
						this.isAddSuccess = true;
						this.$emit('componentView','list', res.data);
					} else {
						this.$message.error({message: "新增失败"})
					}
				}).catch(err => {
                    this.$message.error({"messgae": err.response.data.message})
                })
			},

			dragchange(val){
				this.tableTitleData = val;
			},

			// 点击列表选定Radio
			currentRadioSelect (data) {
				this.radioData = data
			}
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
				.customer-add {
					position: absolute;
					top: 8px;
					right: 6px;
					width: 16px;
					height: 16px;
					background: url('./images/kehu.png') no-repeat;
					background-size: cover;
					cursor: pointer;
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
	.m-item {
		text-align: left;
		cursor: pointer;
		.col-overflow {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	.row {
		text-align: center;
	}
</style>