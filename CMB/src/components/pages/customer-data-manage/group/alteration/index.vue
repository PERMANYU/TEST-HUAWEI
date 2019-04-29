<template>
	<transition name="fade">
		<div class="add">
			<Scroll :isShowRight="true" ref="scroll" class="self-adaption">
				<div class="a-header">
					<div class="a-title">客户部门变更</div>
					<div class="a-close" @click="btnBack()"></div>
				</div>

				<!-- 客户S -->
				<div class="client-wrap">
					<div class="identical-block">
						<div class="distribution-header">
							<div class="header-left">
                                <div class="app__title-1">
                                    <span class="app__title-name">已选根客户列表</span>
                                </div>
                            </div>
							<div class="header-right">
								<div class="app__btn app__btn-add" @click="addClick()">添加</div>
                                <div class="app__btn app__btn-add" style="display:none" @click="staffAdd()">添加审核人</div>
							</div>
						</div>

						<Scroll class="app__table" :isShowBottom="true" :isShowRight="true" fixedLeftClassName="m-middle" fixedTopClassName="m-title" ref="listScroll">
							<Row class="m-title app__table-thead">
								<!-- <Col :span="1"></Col> -->
								<Col :span="item.span" 
									:value="item"
									v-for="(item,index) in tableTitleData"
									:key="index">
									<span>{{item.name}}</span>
								</Col>

								<Col :span="2">
									<span>操作</span>
								</Col>
							</Row>
							<Row :class="['m-item app__table-item']" v-for="(table,index) in tableItemData" :key="index">
								<Col :span="item.span"
										v-for="(item,index) in tableTitleData"
										:key="index">
									<span v-if="item.param == 'createDate'">{{table[item.param] | getTime}}</span>
									<span v-else>{{table[item.param]}}</span>
								</Col>
								<Col :span="2">
									<span class="delete-icon" @click="deletes(index)"></span>
								</Col>
							</Row>
							<div v-if="tableItemData.length == 0" class="app__data-none">
								<span>当前无数据 请先选择客户</span>
							</div>
						</Scroll>
					</div>

					<div class="form-content">					
						<Form labelWidth="110px">
							<Row>
								<Col :span="9">
									<FormItem labelText="目标区局：" :requiredIcon="true" :errorMessage="errors.first('targetRcObj')">
										<Select name="targetRcObj"
												data-vv-as="目标区局"
												v-validate="'required'"
												v-model="targetRcObj"
												:saveObject="true"
                                                :isNullSel="false"
                                                dataLabelStr="attrValueName"
                                                dataValueStr="attrValue"
												:data="targetRcArr">
										</Select>
									</FormItem>
								</Col>
                                <Col :span="9" :offset="6">
                                    <FormItem labelText="提交人组织：">
										<Input disabled :value="userOrgs.orgName"></Input>
									</FormItem>
                                </Col>
							</Row>
                            <Row>
                                <Col :span="9">
                                    <FormItem labelText="提交人角色：">
                                        <Input disabled :value="sysRoles.sysRoleName"></Input>
                                    </FormItem>
                                </Col>
								<Col :span="9" :offset="6">
									<FormItem labelText="审核人：">
										<Select name="staffObj"
												v-model="staffObj" :saveObject="true"
												dataValueStr="id"
												dataLabelStr="name"
                                                :isNullSel="false"
												:data="auditorData">
										</Select>
									</FormItem>
								</Col>
                            </Row>
                            <Row>
                                <Col :span="9">
                                    <FormItem labelText="审核人部门：">
                                        <Input disabled v-model="staffObj.deptName"></Input>
                                    </FormItem>
                                </Col>
							</Row>
							<Row>
								<Col :span="24">
									<FormItem labelText="备注：" :requiredIcon="true" :errorMessage="errors.first('remark')">
										<Input type="textarea" name="remark" v-validate="'required'" data-vv-as="备注" maxlength="250" placeholder="请填写内容" v-model="remark"></Input>
									</FormItem>
								</Col>
							</Row>
						</Form>
					</div>
				</div>
				<!-- 客户E -->
			</Scroll>
			<div class="a-operation">
				<div class="btn-page-box">
					<span class="app__btn app__btn-back" @click="btnBack()">返回</span>
					<span class="app__btn app__btn-save" @click="btnSave">提交申请</span>
				</div>
			</div>
	

			<!-- 选择客户S -->
			<Dialog ref="selectClient" :dialogTitle="dialogTitle" :dialogSize="clentDialogSize" :initBtn="true">
				<div class="client-padding">
					<div class="add-header">
						<Row>
							<Col :span="12">
								<Search placeholder="请输入客户标识" @search="clientSearch"></Search>
							</Col>
						</Row>
					</div>
					<div class="distribution-top">
						<Scroll  class="app__table" fixedTopClassName="m-title" ref="listScroll">
							<Row class="m-title app__table-thead" :titleList="tableTitleData">		
								<Col :span="2"></Col>
								<Col :span="item.span"
									:value="item"
									v-for="(item,index) in customerManagerData"
									:key="index">
									<span>{{item.name}}</span>
								</Col>
							</Row>
							<Row :class="['m-item app__table-item']" v-for="(customer,index) in customerManagerItemData" :key="index" @click.native="currentRadioSelect(customer)">
									<Col :span="2">
										<Radio name="" :label="customer" v-model="radioDatas"></Radio>
									</Col>
									<Col :span="item.span" class="overflow-style"
                                        :title="customer[item.param]"
										v-for="(item,index) in customerManagerData"
										:key="index">
									<span>{{customer[item.param]}}</span>
								</Col>
							</Row>
							<div v-if="!customerManagerItemData.length" class="app__data-none">
								<span>当前无数据</span>
							</div>
                            <div v-if="customerManagerItemData.length">
                                <Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
                                </Pagination>
                            </div>
						</Scroll>
					</div>
				</div>
                <div slot="btnBox">
                    <span class="back" @click="handleBack">返回</span>
                    <span class="save" @click="selectClientBtn">确定</span>
                </div>
			</Dialog>
			<!-- 选择客户E -->

			<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
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
                },
                tipInfo: {
                	iconType: 3,
                	msg:'',
                	showBtn:{
                		clear: true,
                		save: true
                	}
                },
				currentIndex: '',
				rcErrorMsg: '',
                errorMsg: '',
                checkObj: {
                	authorPosition: ''
                },
                tableTitleData:[{
                	name:'客户标识',
                	param:'custNumber',
                	span: 3
                },{
                	name:'客户名称',
                	param:'custName',
                	span: 5
                },{
                	name:'所属区局',
                	param:'xParentBureauName',
                	span: 2
                },{
                	name:'客户集团分群二层',
                	param:'groupDivided2',
                	span:3
                },{
                	name:'根客户等级',
                	param:'customerLevel',
                	span: 2
                },{
                	name:'目标区局',
                	param:'xParentBureauName',
                	span: 2
                },{
                	name:'创建人',
                	param:'createStaff',
                	span: 2
                },{
                	name:'创建时间',
                	param:'createDate',
                	span: 3
                }],
                tableItemData:[],
                customerManagerData:[{
                	name:'客户标识',
                	param:'custNumber',
                	span: 7
                },{
                	name:'客户名称',
                	param:'custName',
                	span: 10
                },{
                	name:'所属区局',
                	param:'xParentBureauName',
                	span: 5
                }],
                customerManagerItemData:[],
				radioData: [],
				radioDatas: {},
                dialogTitle: '请选择客户',
                clentDialogSize: {
                	max: 600
				},
				targetRcArr: [],					// 目标区局
				targetRcObj: '',    // 区局
				authorPositionArr: [],			// 提交人职位数组
				auditorData: [],				// 审核人数组
				staffObj: {},					// 审核人对象存储
				remark: '',						// 备注
				isAddSuccess: false,
                userOrgs: this.$user.getUserOrgs(),    //组织
                sysRoles: this.$user.getSysRoles(),  //角色
                searchText: '',             // 搜索客户名称
			}
		},
		mounted() {
            this.getMainData();
            this.staffDetail();
            this.$refs.selectClient.show();
		},
		methods:{
            // 获取区局主数据
            getMainData () {
                // 区局
                this.$getjsons.getJson("CHN-SH-0003").then(res => {
                    this.targetRcArr = res.data.attrSpecDetail.attrValueList
                })
            },

			// 关闭
			btnBack(){
				this.$emit('componentView','list');
			},
			// 新增客户
			addClick () {
                this.$refs.selectClient.show();
			},

			// 删除
			deletes (index) {
				this.tipInfo.msg = `确认要删除吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
				this.tipConfirmType = 'del';
				this.currentIndex = index
			},

			// 确认删除
			tipConfirm () {
				this.tableItemData.splice(this.currentIndex, 1);
				this.$refs.tip.hide();
			},

			// 提交申请
			btnSave () {
                if (!this.tableItemData.length) {
                    this.$message.warning({"message": "请选择一条客户"});
                    return;
                }
                // if(this.remark != ''){
                //     this.$message.warning({"message": "请填写审核意见"});
                //     return;
                // }
				this.$validator.validateAll().then((result) => {
                    if(!result){
                        return
                    } else {
                        let userStorage = this.$user.getUserStorage();
						this.$axios.post(this.$api.ApplicationForm, {
							"applyOrderType": "C",
							"targetRegionName": this.targetRcObj.attrValueName,
                            "targetRegionId": this.targetRcObj.attrValue,
                            "orgId": this.$user.getOrgId(),
                            "roleId": this.$user.getSysRoleId(),
                            "roleCode": this.$user.getSysRoleCode(),
							"createStaffName":  userStorage.staffName,
							"statusCd": '1000',
							"statusDate": this.tableItemData[0].statusDate,
							"createDate": this.tableItemData[0].createDate,
							"createStaff": userStorage.staffId,
							"updateDate": this.tableItemData[0].updateDate,
							"updateStaff": userStorage.updateStaff,
							"result": "",
							"remark": this.remark,
							"checkStaffId": this.staffObj.id,
							"checkStaffName": this.staffObj.name,
							"checkStaffDepartId": this.staffObj.deptId,
							"checkStaffDepartName": this.staffObj.deptName,
							"custRelApplyOrderAttrs": [
								{
								"type": "A",
								"rootCustId": this.tableItemData[0].custId,
								"rootCustName": this.tableItemData[0].custName,
								"rootCustRegionId": '',
								"rootCustRegionName": this.tableItemData[0].xParentBureauName,
								"rootCustGroup": this.tableItemData[0].groupDivided2,
								"rootCustLevel": this.tableItemData[0].customerLevel,
								"childCustId": '',
								"childCustName": "",
								"childCustRegionId": '',
								"childCustRegionName": "",
								"childCustGroup": "",
								"childCustLevel": "",
								"statusCd": this.tableItemData[0].statusCd,
								"statusDate": this.tableItemData[0].statusDate,
								"createDate": this.tableItemData[0].createDate,
								"createStaff": this.tableItemData[0].createStaff,
								"updateDate": this.tableItemData[0].updateDate,
								"updateStaff": this.tableItemData[0].updateStaff
								}
							]
                        }).then((res) => {
                            if (res.data.custRelApplyOrderId) {
                                this.$message.success({"message": "申请单提交成功！"})
                                this.isAddSuccess = true;
                                this.$emit('componentView','list');
                            } else {
                                this.$message.error({"message": "申请单提交失败！"})
                            }
                        }).catch(err => {
                            this.$message.error({"message": err.response.data.message})
                        })
					}
                })
			},

			// 搜索
			clientSearch (data) {
                this.searchText = data
                this.getClientInfo();
			},

			// 查询客户信息
			getClientInfo (pageIndex = 1) {
				this.$axios.get(this.$api.adddClientDistribution, {
					params: {
						custId: '',
						custNumber:  this.searchText || '',
						custName: '',
						sysRoleName: '',
						pageNumber: pageIndex,
						pageSize: this.pageInfo.pageSize
					}
				}).then((res) => {
                    if (res.data.length) {
                        this.customerManagerItemData = res.data
                        this.pageInfo.pageIndex = pageIndex
                    } else {
                        this.$message.warning({message: '暂无数据'})
                    }
				}).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
			},
			
			inputFocus (type) {	
				if (type == 'authorPosition') {
					this.errorMsg = ''
				}
            },
            
            // 选择客户弹窗返取消
            handleBack () {
                this.$refs.selectClient.hide();
            },

            // 选择客户弹窗确定
			selectClientBtn () {
                // 判断是否有选择数据
				if (this.radioDatas.custId !== undefined) {
                    this.$refs.selectClient.hide();
					this.tableItemData = [];
					this.tableItemData.push(this.radioDatas);
				} else {
					this.$message.warning({"message": "请选择一条数据"})
					return
				}
			},

			// 审核人信息
			staffDetail (){
				this.$axios.post(this.$api.staffDetail, {
                    "body": {
                        "code": "",
                        "name": "",
                        "type": ""
                    },
                    "page": 0,
                    "size": 200,
                    "sort": "id",
                    "sortType": "desc"
                }).then((res) => {
					this.auditorData = res.data.body.result;
                    if(this.auditorData.length > 0){
                        this.staffObj = {
                            id: this.auditorData[0].id,
                            name: this.auditorData[0].name,
                            deptId: this.auditorData[0].deptId,
                            deptName: this.auditorData[0].deptName,
                        }		
                    }
                    //this.staffAdd();   //新增审核人
                    //this.staffDelete();	//删除审核人
            	}).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
			},

            // 审核人新增
            staffAdd (){
                this.$axios.put(this.$api.staffAdd, {
                    code: "6",
                    name: "测试",
                    type: "1",
                    deptId: "6",
                    deptName: "政企客户中心_数据管理员"
                }).then((res) => {
                    
                    
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            staffDelete (){
                this.$axios.delete(this.$api.staffDelete).then((res) => 
                {
                    
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 分页
            pageChange (val) {
                this.getClientInfo(val)
            },

			// 点击列表选定Radio
			currentRadioSelect (data) {
				this.radioDatas = data;
			}
		}
	}
</script>

<style scoped lang="scss">
	$color-gray: #f6f6f6;
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
		background-color: #fff;
		.self-adaption {
			padding: 20px 40px 0 !important;
		}
		.a-header{
			width: 100%;
			height: 50px;
			line-height: 50px;
			color: #333940;
			text-align: center;
			border: 1px solid #fafafa;

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

		// 客户
		.client-wrap {
			width: 100%;
			margin: 16px auto;
			padding: 20px 35px;
			border: 1px solid $color-gray;
			.identical-block {
				padding: 16px 24px;
				border: 1px solid $color-gray;
				background: #fdfdfd;
			}
			.distribution-header {
				overflow: hidden;
				.header-left {
					float: left;
				}
				.header-right {
					float: right;
					.app__btn-select {
						padding: 0 15px 0 30px;
						background-color: #fff;
						color: #00c0ff;
						border: 1px solid #00c0ff;
						background-image: url('../alteration/images/selected_active.png');
						background-repeat: no-repeat;
						background-position: 10px;
						&:hover {
							background-color: #00c0ff;
							color: #fff;
							background-image: url('../alteration/images/selected.png');
							background-repeat: no-repeat;
							background-position: 10px;
						}
					}
				}
				&::after {
					content: "";
					display: inline-block;
					position: absolute;
					top: 40px;
					left: 45px;
					width: 95.5%;
					border-bottom: 1px solid $color-gray;
				}
			}
			.distribution-top {
				margin-top: 20px;		
			}
			.form-content {
				margin: 20px 0;
				.error {
					color: #ff0000;
				}
			}
		}

		.add-header {
			.search {	
				height: 40px;
				line-height: 40px;
				.app__btn {
					width: 60px;
				}
			}
		}

		.m-title{
            span {
                font-weight: bold;
                color: $mainColor;
            }

			.col.m-t-name{
				border-right: 1px solid #a6c2ff;
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

		.m-item{
			text-align: center;
			cursor: pointer;

			&.double{
				background-color: #f6f7f9;
			}

			.m-i-name{
				color: #00c0ff;
				border-right: 1px solid #00c0ff;
				cursor: pointer;
			}

			.delete-icon {
				display: inline-block;
				width: 14px;
				height: 14px;
				background: url('./images/delete_red.png') no-repeat center;
				cursor: pointer;
			}
            .overflow-style {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: pointer;
            }
		}

		.col{
			&:hover{
				.col-search{
					display: block;
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

	// dialog样式
	.dialog .main .content {
		.client-padding {
			padding: 20px;
		}
		.distribution-top {
			margin-top: 10px;
			border-bottom: 1px solid $color-gray;
		}
		.client-footer {
			margin-top: 27px;
			.footer-icon {
				display: inline-block;
				width: 8px;
				height: 7px;
				background: url('./images/choose.png') no-repeat center;
			}
			.footer-text {
				padding-left: 8px;
				font-size: 14px;
				color: #333940;
			}
		}
	}
</style>
