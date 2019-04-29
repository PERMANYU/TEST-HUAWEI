<template>
	<transition name="fade">
		<div class="add">
			<Scroll :isShowRight="true" ref="scroll" class="self-adaption">
				<div class="a-header">
					<div class="a-title">子客户误归</div>
					<div class="a-close" @click="btnBack()"></div>
				</div>

				
				<div class="client-wrap">
					<!-- 根客户S -->
					<div class="identical-block">
						<div class="distribution-header">
							<div class="header-left">
                                <div class="app__title-1">
                                    <span class="app__title-name">根客户</span>
                                </div>
							</div>
							<div class="header-right">
								<div class="app__btn app__btn-add" @click="addClick(0)">选择根客户</div>
							</div>
						</div>

						<div class="distribution-top">
							<Scroll class="app__table" :isShowBottom="true" :isShowRight="true" fixedLeftClassName="m-middle" fixedTopClassName="m-title" ref="listScroll">
								<Row class="m-title app__table-thead">
									<Col :span="title.span" v-for="(title, index) in tableRootTitleData" :key="index">
										<span>{{title.name}}</span>
									</Col>
									<Col :span="2">
										<span>操作</span>
									</Col>
								</Row>
								<Row :class="['m-item app__table-item']" v-for="(item, index) in selectedClientListData" :key="index">
                                    <Col :span="4"><span>{{item.custNumber}}</span></Col>
                                    <Col :span="6"><span>{{item.custName}}</span></Col>
                                    <Col :span="4"><span>{{item.xParentBureauName}}</span></Col>
                                    <Col :span="4"><span>{{item.groupDivided2}}</span></Col>
                                    <Col :span="4"><span>{{item.custTreeLevel}}</span></Col>
									
									<Col :span="2" v-if="selectedClientListData.length">
										<span class="delete-icon" @click="deletes(index, 0)"></span>
									</Col>
								</Row>
								<div v-if="!selectedClientListData.length" class="app__data-none m-middle">
									<span>当前无数据 请先选择根客户</span>
								</div>
							</Scroll>
						</div>
					</div>			
					<!-- 根客户E -->

					<!-- 子客户S -->
					<div class="identical-block other-mgtop">
						<div class="distribution-header">
							<div class="header-left">
                                <div class="app__title-1">
                                    <span class="app__title-name">子客户</span>
                                </div>
							</div>
							<div class="header-right">
								<div class="app__btn app__btn-add" @click="addClick(1)">选择子客户</div>
							</div>
						</div>

						<div class="distribution-top">
							<Scroll class="app__table" :isShowBottom="true" :isShowRight="true" fixedLeftClassName="m-middle" fixedTopClassName="m-title" ref="listScroll">
								<Row class="m-title app__table-thead">
									<Col :span="title.span"  v-for="(title, index) in tableChildrenTitleData" :key="index">
										<span>{{title.name}}</span>
									</Col>
									<Col :span="2">
										<span>操作</span>
									</Col>
								</Row>
								<Row :class="['m-item app__table-item']" v-for="(item, index) in targetClientListData" :key="index">
                                    <Col :span="3"><span>{{item.custNumber}}</span></Col>
                                    <Col :span="4"><span>{{item.custName}}</span></Col>
                                    <Col :span="3"><span>{{item.xParentBureauName}}</span></Col>
                                    <Col :span="3"><span>{{item.groupDivided2}}</span></Col>
                                    <Col :span="3"><span>{{item.custTreeLevel}}</span></Col>
                                    <Col :span="3"><span>{{item.createStaff}}</span></Col>
                                    <Col :span="3"><span>{{item.createDate | getTime}}</span></Col>
									
									<Col :span="2" v-if="targetClientListData.length">
										<span class="delete-icon" @click="deletes(index, 1)"></span>
									</Col>
								</Row>
								<div v-if="!targetClientListData.length" class="app__data-none m-middle">
									<span>当前无数据 请先选择子客户</span>
								</div>
							</Scroll>
						</div>
					</div>
					<!-- 子客户E -->

					<div class="form-content">					
							<Form labelWidth="110px">
								<Row>
                                    <Col :span="9">
                                        <FormItem labelText="提交人组织：">
                                            <Input disabled :value="userOrgs.orgName"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col :span="9" :offset="6">
                                        <FormItem labelText="提交人角色：">
                                            <Input disabled :value="sysRoles.sysRoleName"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
									<Col :span="9">
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
                                    <Col :span="9" :offset="6">
                                        <FormItem labelText="审核人部门：">
                                            <Input disabled :value="staffObj.deptName"></Input>
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
				
			</Scroll>
			<div class="a-operation">
				<div class="btn-page-box">
					<span class="app__btn app__btn-back" @click="btnBack()">返回</span>
					<span class="app__btn app__btn-save" @click="btnSave()">提交申请</span>
				</div>
			</div>

			<!-- 一级搜索弹窗S -->
			<Dialog ref="firstSearch" :dialogTitle="dialogTitle" :dialogSize="addDialogSize" :showConfirmBtn="false">
				<div class="search-padding">
					<div class="add-header-second">
						<Row>
							<Col :span="18">
								<Search placeholder="请输入客户标识" @search="allSearch"></Search>
							</Col>
						</Row>
					</div>
				</div>
			</Dialog>
			<!-- 一级搜索弹窗E -->


			<!-- 二级搜索S -->
			<Dialog ref="secondSearch" :dialogTitle="dialogTitle" @confirm="secondBtnSave">
				<div class="search-padding">
					<Row>
						<Col :span="12">
							<Search placeholder="请输入客户标识" @search="handleSearch"></Search>
						</Col>
					</Row>

					<div class="distribution-top">
						<div class="app__table">
							<Row :class="['m-item app__table-thead']">
								<Col :span="11">
									<span>根客户名称</span>
								</Col>
								<Col :span="5">
									<span>客户标识</span>
								</Col>
								<Col :span="3">
									<span>所属分区</span>
								</Col>
								<Col :span="5">
									<span>集团分群二层</span>
								</Col>
							</Row>
						</div>

						<Scroll :isShowRight="true" ref="scroll">
							<Tree v-for="(item,index) in treeData" 
									:folder="item" v-model="treeModel"
									:key="index" 
									:childrenStr="'childerNode'"
									:initLevel="1" 
									:selLevel="1"
									:levelStr="'custTreeLevel'" 
									:keys="objData">
							</Tree>
						</Scroll>
						<div v-if="!treeData.length" class="app__data-none">
							<span>当前无数据</span>
						</div>
					</div>
				</div>
			</Dialog>
			<!-- 二级搜索E -->

			<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
		</div>
	</transition>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				tipInfo: {
                	iconType: 3,
                	msg:'',
                	showBtn:{
                		clear: true,
                		save: true
                	}
                },
                tableRootTitleData: [       // 根客户的title
                    {
                        name:'根客户标识',
                        param:'custNumber',
                        span: 4,
                        width: 120
                    },{
                        name:'根客户名称',
                        param:'custName',
                        span: 6,
                        width: 200
                    },{
                        name:'所属区局',
                        param:'subBureau',
                        span: 4,
                        width: 80
                    },{
                        name:'根客户集团分群二层',
                        param:'groupDivided2',
                        span: 4,
                        width: 200
                    },{
                        name:'根客户等级',
                        param:'level',
                        span: 4,
                        width: 120
                    }
                ],
                tableChildrenTitleData:[    // 子客户的title
                    {
                        name:'子客户标识',
                        param:'managerName',
                        span: 3
                    },{
                        name:'子客户名称',
                        param:'managerPost',
                        span: 4
                    },{
                        name:'子客户所属区局',
                        param:'managerDepartment',
                        span: 3
                    },{
                        name:'子客户集团分群二层',
                        param:'managerDepartment',
                        span: 3
                    },{
                        name:'子客户等级',
                        param:'managerDepartment',
                        span: 3
                    },{
                        name:'创建人',
                        param:'managerDepartment',
                        span: 3
                    },{
                        name:'创建时间',
                        param:'createDate',
                        span: 3
                    }
                ],
                dialogTitle: '请选择客户',
                addDialogSize: {
                	max: 521
                },
                staffName: '',
                staffBranch: '',
                objData: [{
                	key: 'custName',
                	span: 11
                },{
                	key: 'custNumber',
                	span: 5
                },{
                	key: 'xParentBureauName',
                	span: 3
                },{
                	key: 'groupDivided2',
                	span: 5
				}],

				// ----------- 已选客户列表 ----------
				selectedClientListData: [],		// 已选客户列表数据
				
				// ----------- 目标客户 --------------
				targetClientListData: [],		// 目标客户列表数据
				errorMsg: '',


				// ----------- 目标客户、已选客户列表共用 --------------
				flags: null,							// 	表示点选的是哪一个添加
				firstSearchVal: '',					// 一级搜索的值
				secondSearchText: '',				// 二级搜索的值
				customerManagerItemData: [],		// 客户管理数据
				treeData: [],
				secondTreeData: [],
				treeModel:{},
				childStr: 'childerNode',
				deleteObj: {
					currentIndex: '',				// 当前下标
					currentType: ''					// 当前点击的是哪一个的删除
				},
				userOrgs: this.$user.getUserOrgs(),    //组织
                sysRoles: this.$user.getSysRoles(),  //角色
				auditorData: [],				// 审核人数组
				staffObj: {},					// 审核人对象存储
				remark: '',						// 备注
				isAddSuccess: false
            }
        },
        mounted() {
            this.staffDetail();
        },
        methods:{
			// 关闭
			btnBack(){
				this.$emit('componentView','list');
			},

			// 新增客户
			addClick (index) {
				this.$refs.firstSearch.show();
				/* 
				**	0: 已选客户列表
				**	1：目标客户
				*/
				if (index === 0) {
					this.flags = true
				} else if (index === 1) {
					this.flags = false
				}
			},

			// 一级搜索
			allSearch (data) {
                this.treeData = []
				this.checkSearchData(data)
			},

			// 二级搜索
			handleSearch (data) {
                this.treeData = []
				this.checkSearchData(data)
			},

			// 一级、二级搜索共用方法
			checkSearchData (val) {
				if (val === '') {
					this.$message.warning({message: '请输入客户标识'});
					return
				} else {
					this.$refs.firstSearch.hide();
					this.$refs.secondSearch.show();
					this.getTreeData(val);
					val = ''
				}
			},

			// 查询客户树
			getTreeData (custNumber, flag = false) {
				this.$axios.get(this.$api.clientTreeChildNode, {
					params: {
						custId : '',
                        custNumber: custNumber
					}
				}).then((res) => {
					if(flag){
                        if (res.data[0].customer !== null) {
                            // 表示查不到客户树，但是却查得到当前客户
                            let noTreeData = res.data[0].customer

                                noTreeData['custTreeNodeName'] = noTreeData.custName
                                noTreeData['subBureau'] = noTreeData.xParentBureauName
                            this.secondTreeData.push(noTreeData)
                        } else {
                            this.secondTreeData = res.data;
                        }
						if (this.flags) {
							// 表示执行的是已选客户
							this.selectedClientListData = this.secondTreeData.filter( item => {
								if(!item.parentNode) item.parentNode = {};
								return true;
							})
						} else {
							this.targetClientListData = this.secondTreeData.filter( item => {
								if(!item.parentNode) item.parentNode = {};
								return true;
							})
						}
					} else {
                        if (res.data[0].customer !== null) {
                            // 表示查不到客户树，但是却查得到当前客户
                            let noTreeData = res.data[0].customer

                                noTreeData['custTreeNodeName'] = noTreeData.custName
                                noTreeData['subBureau'] = noTreeData.xParentBureauName
                            this.treeData.push(noTreeData)
                        } else {
                            this.treeData = res.data;
                        }					
					}	
				}).catch(err => {
                    this.$message.error({"message": err.message})
                })
			},

			// 删除
			deletes (index, type) {
				this.tipInfo.msg = `确认要删除吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
				this.tipConfirmType = 'del';
				this.deleteObj.currentIndex = index;
				this.deleteObj.currentType = type;
			},

			// 确认删除
			tipConfirm () {
				if (this.deleteObj.currentType === 0) {
					// 表示已选择客户列表的删除按钮
					this.selectedClientListData.splice(this.currentIndex, 1);
					// delete this.selectedClientListData
				} else {
					// 表示目标客户删除
					// delete this.targetClientListData
					this.targetClientListData.splice(this.currentIndex, 1);
				}
				this.$refs.tip.hide();
			},

			// 二级搜索的保存
			secondBtnSave () {
                if (this.treeModel.custNumber !== undefined) {
                    let custNumber = this.treeModel.custNumber
                    this.secondTreeData = []
                    this.targetClientListData = []
                    this.getTreeData(custNumber,true)
                    
                    this.$refs.secondSearch.hide();
                } else {
                    this.$message.warning({"message": "请选择一条数据"})
                }
			},

			// 提交申请
			btnSave () {
                let userStorage = this.$user.getUserStorage();
                if (userStorage) {
                    if (!this.selectedClientListData.length) {
                        this.$message.warning({"message": "请选择客户"})
                    }else if (!this.targetClientListData.length) {
                        this.$message.warning({"message": "请选择目标客户"})
                    } else {
                        // if(this.remark != ''){
                        //     this.$message.warning({"message": "请填写审核意见"});
                        //     return;
                        // }
                        this.$validator.validateAll().then((result) => {
                            if(!result) {
                                return
                            } else {
                                this.$axios.post(this.$api.ApplicationForm, {
                                    "applyOrderNum": '',
                                    "applyOrderRemark": '',
                                    "applyOrderType": "A",
                                    "orgId": this.$user.getOrgId(),
                                    "roleId": this.$user.getSysRoleId(),
                                    "roleCode": this.$user.getSysRoleCode(),
                                    "targetRegionName": "",
                                    "targetRegionId": "",
                                    "createStaffName": userStorage.staffName,
                                    "statusCd": userStorage.statusCd,
                                    "statusDate": this.selectedClientListData[0].statusDate,
                                    "createDate": this.selectedClientListData[0].createDate,
                                    "createStaff": userStorage.staffId,
                                    "updateDate": this.selectedClientListData[0].updateDate,
                                    "updateStaff": userStorage.staffId,
                                    "result": "",
                                    "checkStaffId": this.staffObj.id,
                                    "checkStaffName": this.staffObj.name,
                                    "checkStaffDepartId": this.staffObj.deptId,
                                    "checkStaffDepartName": this.staffObj.deptName,
                                    "custRelApplyOrderId": '',
                                    "remark": this.remark,
                                    "result": '',
                                    "custRelApplyOrderAttrs": [
                                        {
                                            "applyOrderNum": '',
                                            "type": "",
                                            "rootCustId": this.selectedClientListData[0].custId,
                                            "rootCustName": this.selectedClientListData[0].custName,
                                            "rootCustRegionId": this.selectedClientListData[0].targetRegionName,
                                            "rootCustRegionName": this.selectedClientListData[0].xParentBureauName,
                                            "rootCustGroup": this.selectedClientListData[0].groupDivided2,
                                            "rootCustLevel": this.selectedClientListData[0].custTreeLevel,
                                            "childCustId": this.targetClientListData[0].custId,
                                            "childCustName": this.targetClientListData[0].custName,
                                            "childCustRegionId": this.targetClientListData[0].targetRegionName,
                                            "childCustRegionName": this.targetClientListData[0].xParentBureauName,
                                            "childCustGroup": this.targetClientListData[0].groupDivided2,
                                            "childCustLevel": this.targetClientListData[0].custTreeLevel,
                                            "statusCd": this.selectedClientListData[0].statusCd,
                                            "statusDate": this.selectedClientListData[0].statusDate,
                                            "createDate": this.selectedClientListData[0].createDate,
                                            "createStaff": this.selectedClientListData[0].createStaff,
                                            "updateDate":  this.selectedClientListData[0].updateDate,
                                            "updateStaff":  userStorage.staffId,
                                            "custRelApplyOrderAttrId": '',
                                            "custRelApplyOrderId": ''
                                        }
                                    ]
                                }).then((res) => {
                                    if (res.data.applyOrderNum) {
                                        this.$message.success({"message": "申请单提交成功！"});
                                        this.$emit('componentView','list');
                                        this.isAddSuccess = true;
                                    }else{
                                        this.$message.error({"message": "申请单提交失败！"})
                                    }
                                }).catch(err => {
                                    this.$message.error({"message": err.response.data.message})
                                })
                            }
                        })
                    }
                } else {
                    this.$message.error({"message": "提交失败"})
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
                    this.staffObj = {
                        id: this.auditorData[0].id,
                        name: this.auditorData[0].name,
                        deptId: this.auditorData[0].deptId,
                        deptName: this.auditorData[0].deptName,
                    }   
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
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
						top: 56px;
						left: 45px;
						width: 95.5%;
						border-bottom: 1px solid $color-gray;
					}
				}
			}
			.other-mgtop {
				margin-top: 16px;
			}
			.form-content {
				margin: 20px 0;
				.error {
					color: #ff0000;
				}
			}
		}

		.add-header, .add-header-second {
			padding: 30px 30px 20px;
			border: 1px solid #f4f7fb;
			background: #fdfdfd;
			.search {
				padding-left: 19px;		
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

		.m-item{
			text-align: center;

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
	.main .content {
		.search-padding {
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