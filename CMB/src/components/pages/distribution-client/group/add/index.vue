<template>
	<transition name="fade">
		<div class="add">
			<Scroll :isShowRight="true" ref="scroll" class="self-adaption">
				<div class="a-header">
					<div class="a-title">客户重新分配</div>
					<div class="a-close" @click="btnBack()"></div>
				</div>

				
				<div class="client-wrap">
					<!-- 客户S -->
					<div class="identical-block">
						<div class="distribution-header">
							<div class="header-left">
								<div class="app__title-1">
                                    <span class="app__title-name">已选择客户</span>
                                </div>
							</div>
							<div class="header-right">
								<div class="app__btn app__btn-add" @click="addClick()">添加</div>
							</div>
						</div>

						<div class="distribution-top">
							<Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
								<DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
								<Row @dragover.native="dragover($event)">								
									<DragItem :span="item.span" 
										:value="item"
										v-for="(item,index) in tableTitleData"
										:key="index">

										<span>{{item.name}}</span>
									</DragItem>

									<Col :span="1">
										<span>操作</span>
									</Col>
								</Row>
								</DragGroup>
								<Row :class="['m-item app__table-item']" v-for="(table,index) in clientActiveListData" :key="index">
									<Col :span="item.span" class="col-overflow"
										:title="table[item.param]"
										v-for="(item,index) in tableTitleData"
										:key="index">
										<span>{{table[item.param]}}</span>
									</Col>
									<Col :span="1">
										<span class="delete-icon" @click="deleteAddClient(index, 0)"></span>
									</Col>
								</Row>
								<div v-if="!clientActiveListData.length" class="app__data-none">
									<span>当前无数据 请先选择客户</span>
								</div>
							</Scroll>
						</div>
					</div>
					<!-- 客户E -->

					<!-- 客户经理S -->
					<div class="identical-block other-mgtop">
						<div class="distribution-header">
							<div class="header-left">
								<div class="app__big-title-1">
                                    <span class="app__title-name">已选重新分配的客户经理</span>
                                </div>
							</div>
							<div class="header-right">
								<div class="app__btn app__btn-select" @click="selectClick()">选择</div>
							</div>
						</div>

						<div class="distribution-top">
							<Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
								<DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
									<DragItem :span="item.span" 
										:value="item"
										v-for="(item,index) in selCustomerManagerData"
										:key="index">
										<span>{{item.name}}</span>
									</DragItem>
								</DragGroup>
								<Row :class="['m-item app__table-item']" v-for="(data,index) in selCustomerManagerItemData" :key="index">
									<Col :span="item.span" class="col-overflow"
                                        :title="data[item.param]"
										v-for="(item,index) in selCustomerManagerData"
										:key="index">
										<span>{{data[item.param]}}</span>
									</Col>
								</Row>
								<div v-if="!selCustomerManagerItemData.length" class="app__data-none">
									<span>当前无数据 请先选择客户经理</span>
								</div>
							</Scroll>
						</div>
					</div>
					<!-- 客户经理E -->
				</div>
				

			</Scroll>
			<div class="a-operation">
				<div class="btn-page-box">
					<span class="app__btn app__btn-back" @click="btnBack()">返回</span>
					<span class="app__btn app__btn-save" @click="mainBtnSave()">确定分配</span>
				</div>
			</div>

			<!-- 新增弹窗S -->
			<Dialog ref="addClient" :dialogTitle="dialogTitle" :dialogSize="addDialogSize" @confirm="addClientBtn">
				<Scroll :isShowRight="true" ref="scroll">
					<Row>
						<Col :span="12">
							<Search placeholder="请输入客户标识" @search="clientSearch"></Search>
						</Col>
					</Row>

					<div class="distribution-top">
						<div class="app__table">
							<DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
								<Col :span="1">
									<Checkbox @click.native="allCheckboxClick()" :noModel="true" :checked="addClientCheckboxData.length"></Checkbox>
								</Col>
								<DragItem :span="item.span" 
									:value="item"
									v-for="(item,index) in tableTitleData"
									:key="index">

									<span>{{item.name}}</span>
								</DragItem>
							</DragGroup>
							<Row :class="['m-item app__table-item']" v-for="(tables,index) in addClientListData" :key="index" @click.native="currentCheckboxSelect(tables)">
								<Col :span="1">
									<Checkbox :label="tables" v-model="addClientCheckboxData"></Checkbox>
								</Col>
								<Col :span="item.span" class="col-overflow"
									:title="tables[item.param]"
									v-for="(item,index) in tableTitleData"
									:key="index">
									<span>{{tables[item.param]}}</span>
								</Col>
							</Row>
							<div v-if="!addClientListData.length" class="app__data-none">
								<span>当前无数据</span>
							</div>
							<Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange" v-if="addClientListData.length">
							</Pagination>
						</div>
					</div>

					<div class="client-footer">
						<span class="footer-icon"></span>
						<b class="footer-text">已选</b>
					</div>

					<div class="distribution-top">
						<Scroll class="app__table" fixedTopClassName="m-title" ref="listScroll">
							<DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
								<DragItem :span="item.span" 
									:value="item"
									v-for="(item,index) in tableTitleData"
									:key="index">

									<span>{{item.name}}</span>
								</DragItem>

								<Col :span="1">
									<span>操作</span>
								</Col>
							</DragGroup>
							<Row :class="['m-item app__table-item']" v-for="(table, index) in addClientCheckboxData" :key="index">
								<Col :span="item.span"
									v-for="(item,index) in tableTitleData"
									:key="index">
									<span>{{table[item.param]}}</span>
								</Col>
								<Col :span="1">
									<span class="delete-icon" @click="deleteAddClient(index, 1)"></span>
								</Col>
							</Row>
						</Scroll>
					</div>
				</Scroll>
			</Dialog>
			<!-- 新增弹窗E -->
			

			<!-- 选择客户经理S -->
			<Dialog ref="customerManager" :dialogTitle="dialogTitle" :dialogSize="managerDialogSize" @confirm="selectManager">
				<div class="add-header manager-header">
					<Row>
						<Col :span="12">
							<Search placeholder="请输入客户经理工号" @search="managerSearch"></Search>
						</Col>
					</Row>
				</div>

				<div class="manager-top">
					<Scroll class="app__table" fixedTopClassName="m-title" ref="listScroll">
						<DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
							<Col :span="2"></Col>

							<DragItem :span="item.span" 
								:value="item"
								v-for="(item,index) in customerManagerData"
								:key="index">
								<span>{{item.name}}</span>
							</DragItem>
						</DragGroup>
						<Row :class="['m-item app__table-item']" class="list-cursor"
							 v-for="(customer,index) in customerManagerItemData" :key="index" @click.native="selectCurrentList(customer)">
							<Col :span="2">
								<Radio name="customer" :label="customer" v-model="radioData"></Radio>
							</Col>
							<Col :span="item.span"
								:title="customer[item.param]"
								v-for="(item,index) in customerManagerData"
								:key="index">
								<span>{{customer[item.param]}}</span>
							</Col>
						</Row>
						<Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChanges" v-if="customerManagerItemData.length">
						</Pagination>
					</Scroll>
				</div>
			</Dialog>
			<!-- 选择客户经理E -->
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
				tableTitleData:[{
                	name:'客户标识',
                	param:'custNumber',
                	span: 3
                },{
                	name:'客户名称',
                	param:'custName',
                	span: 4
                },{
                	name:'客户区局',
                	param:'xParentBureauName',
                	span: 2
                },{
                	name:'客户集团分群二层',
                	param:'groupDivided2',
                	span: 3
                },{
                	name:'客户等级',
                	param:'customerLevel',
                	span: 2
                },{
					name:'客户经理名称',
                	param:'sysRoleName',
                	span: 3
				},{
					name:'客户经理岗位',
                	param:'sysPostName',
                	span: 3
				},{
					name:'客户经理部门',
                	param:'orgName',
                	span: 3
				}],
				customerManagerData:[{
                	name:'工号',
                	param:'staffCode',
                	span: 4
                },{
                	name:'姓名',
                	param:'staffName',
                	span: 4
                },{
                	name:'所属区局',
                	param:'attrValue',
                	span: 4
                },{
					name:'客户经理部门',
                	param:'orgName',
                	span: 5
				},{
					name:'客户经理职位',
                	param:'sysPostName',
                	span: 5
				}],
				selCustomerManagerData:[{
                	name:'工号',
                	param:'staffCode',
                	span: 4
                },{
                	name:'姓名',
                	param:'staffName',
                	span: 5
                },{
                	name:'所属区局',
                	param:'attrValue',
                	span: 5
                },{
					name:'客户经理部门',
                	param:'orgName',
                	span: 5
				},{
					name:'客户经理职位',
                	param:'sysPostName',
                	span: 5
				}],
				customerManagerItemData: [],
				selCustomerManagerItemData: [],
				radioData: [],
				dialogTitle: '',
				addDialogSize: {
					min: 1200
				},
				managerDialogSize: {
					max: 800
				},

				// -----------------已选客户流程块---------------			
				clientActiveListData: [],		// 已选择客户列表展示数组data				
				customerIdentife: '',			// 搜索的model值
				managerSearchText: '',			// 客户经理搜索的model值
				addClientCheckboxData: [],		// 新增客户复选按钮model数据
				addClientListData: [],			// 新增客户搜索后的data
				deleteObj: {
					currentIndex: '',			// 当前下标
					currentType: ''				// 当前点击的是哪一个的删除
				},
                isAddSuccess: false,
                searchCustomerText: '',         // 客户搜索的值
                searchManageText: ''            // 客户经理搜索的值
			}
		},
		methods:{
			dragchange(val){
				this.tableTitleData = val;
			},
			// 主页保存
			mainBtnSave () {   
				if (!this.clientActiveListData.length) {
					this.$message.warning({"message": "请选择客户"})
				} else if (!this.selCustomerManagerItemData.length) {
					this.$message.warning({"message":  "请选择客户经理"})
				}else {
                    // 循环数组，，拼接字符串
				    let textStr = this.clientActiveListData.map(item => item.custId).join(',');
					let userStorage = this.$user.getUserStorage();
					this.$axios.patch(this.$api.clientDistributionManagerList, {
								"customer": textStr,
								"postnId": this.selCustomerManagerItemData[0].sysPostId,
								"staffId": this.selCustomerManagerItemData[0].staffId,
								"postnName": this.selCustomerManagerItemData[0].staffName,
								"createStaff": Number(userStorage.staffId),
								"createStaffName": userStorage.staffName,
								"updateStaff": Number(userStorage.staffId),
								"remark": '',
								"staffCode": this.selCustomerManagerItemData[0].staffCode
					}).then((res) => {
						if (res.data.result) {
							this.$message.success({"message": "提交成功！"})
							this.$emit('componentView','list');
							this.isAddSuccess = true
						} else {
							this.$message.error({"message": "提交失败！"})
						}
					})
				}
			},

			// 关闭
			btnBack(){
				this.$emit('componentView','list');
			},

			// 新增客户
			addClick () {
				this.$refs.addClient.show();
				this.dialogTitle = '新增';
			},

			// 选择客户经理
			selectClick () {
				this.$refs.customerManager.show();
				this.dialogTitle = '请选择客户经理';
			},

			// 删除
			deleteAddClient (index, type) {
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
					this.clientActiveListData.splice(this.deleteObj.currentIndex, 1);
				} else {
					this.addClientCheckboxData.splice(this.deleteObj.currentIndex, 1);
				}
				this.$refs.tip.hide();
			},

			// 选择客户搜索
			clientSearch (data) {
                this.searchCustomerText = data
                this.getClientInfo(this.searchCustomerText, this.pageInfo.pageIndex)
			},

			// 客户经理搜索
			managerSearch (data) {
                this.searchManageText = data
                this.getCustomerManage(this.searchManageText, this.pageInfo.pageIndex)
            },
            
            // 客户的上下页
            pageChange (index) {
                this.getClientInfo(this.searchCustomerText, index)
            },

            // 客户经理的上下页
            pageChanges (index) {
                this.getCustomerManage(this.searchManageText, index)
            },

			// 查询客户信息
			getClientInfo (custNumber, pageIndex) {
				this.$axios.get(this.$api.adddClientDistribution, {
					params: {
						custId: '',
						custNumber: custNumber ? custNumber : '',
						custName: '',
						sysRoleName: '',
						pageNumber: pageIndex,
						pageSize: this.pageInfo.pageSize
					}
				}).then((res) => {
                    if (res.data.length) {
                        this.addClientListData = res.data
                        this.pageInfo.pageIndex = pageIndex
                    } else {
                        this.$message.warning({message: '暂无数据'})
                    }
				}).catch(err => {
                    this.$message.error({message: err.response.data.message})
                })
			},

			// 查询客户经理
			getCustomerManage (code, pageIndex) {
				this.$axios.get(this.$api.CustomerManage, {
					params: {
                        "staffCode": code || '',
						"offset": pageIndex,
						"limit": this.pageInfo.pageSize
					}
				}).then((res) => {
					if (res.data.staffRole.length) {
                        this.pageInfo.pageIndex = pageIndex
						this.customerManagerItemData = res.data.staffRole;
					} else {
                        this.$message.warning({message: '暂无数据'})
                    }
				}).catch(err => {
                    this.$message.error({message: err.response.data.message})
                })
			},

			// 全选
			allCheckboxClick () {
				if (this.addClientCheckboxData.length == this.addClientListData.length) {
					this.addClientCheckboxData = []
				} else {
					this.addClientCheckboxData = this.addClientListData
				}
			},

			// 新增客户的保存按钮
			addClientBtn () {
				if (this.addClientCheckboxData.length === 0) {
					this.$message.warning({"message": "请选择一条数据"})
				} else {
					this.$refs.addClient.hide();
					this.clientActiveListData.push(...this.addClientCheckboxData)
					this.addClientListData = this.addClientCheckboxData = []
				}
			},

			// 选择客户经理保存
			selectManager () {
				this.selCustomerManagerItemData = [];
				this.selCustomerManagerItemData.push(this.radioData);
				this.$refs.customerManager.hide();
			},

			// 点击列表选定checkbox
			currentCheckboxSelect (data) {
				
			},

			// 点击列表选定Radio
			selectCurrentList (data) {
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
			border: 1px solid #fafafa;
			text-align: center;
			color: #333940;

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
							background-image: url('../add/images/selected_active.png');
							background-repeat: no-repeat;
							background-position: 10px;
							&:hover {
								background-color: #00c0ff;
								color: #fff;
								background-image: url('../add/images/selected.png');
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
			.distribution-top {
				margin: 20px 0;		
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

		.m-title{
			span {
				font-weight: bold;
				color: $mainColor;
			}

			.col.m-t-name{
				border-right: 1px solid #00c0ff;
			}

			.col{
				padding: 12px 0;
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

			// 超出部分隐藏
			.col-overflow {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
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
		.distribution-top {
			margin-top: 10px;
			border-bottom: 1px solid $color-gray;
		}
		.client-footer {
			margin-top: 10px;
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
		.scroll {
			padding: 10px 20px 20px !important;
		}
	}
</style>