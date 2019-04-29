<template>
	<div class="delegate">
        <!-- 委托管理 -->
        <div class="authorize" @click="authClick()">
            <span class="u-n-hi">委托</span>
        </div>
		<Dialog :dialogSize="dialogSize" class="h-dialog add-flow" dialogTitle="委托" ref="addAuth" initBtn @close="btnCancel()">
			<!-- <template slot="btnBox" class="auth-bottom">
			</template> -->
			<Scroll class="basic-info" ref="listScroll" :isShowRight="true">
				<div class="auth-config">
					<Row class="auth-config-basic">
						<Form labelWidth="120px" labelAlign="left">
							<Col :span="24">
								<FormItem labelText="委托人:">
									<Input readonly :value="authObj.fromDelegateStaffName= $user.getInfo().userStorage.staffName"  name="fromDelegateStaffName" data-vv-as="委托人"></Input>
								</FormItem>
							</Col>
							<Col :span="24">
								<FormItem labelText="被委托人:" :requiredIcon="true" :errorMessage="errors.first('toDelegateName')">
									<Input  name="toDelegateName" v-validate="'required'" data-vv-as="被委托人" v-model="authObj.toDelegateName" @click.native="authNameClick()"></Input>
								</FormItem>
							</Col>
							<Col :span="14" >
								<FormItem labelText="委托时间:" :requiredIcon="true" :errorMessage="errors.first('effDate')">
									<DatePicker v-validate="'required'" v-model="authObj.effDate" name="effDate" placeholder="年/月/日" data-vv-as="开始时间" ></DatePicker>
								</FormItem>
							</Col>
							<Col :span="10" class="auth-date">
								<FormItem labelText="至" :errorMessage="errors.first('expDate')" >
									<DatePicker v-validate="'required'" v-model="authObj.expDate" name="expDate" placeholder="年/月/日" data-vv-as="结束时间" ></DatePicker>
								</FormItem>
							</Col>
						</Form>
						
					</Row>	

					<div class="btn-box">
						<div class="app__btn app__btn-clear" @click="btnCancel()">关闭</div>
						<div class="app__btn app__btn-confirm" @click="authSubmit()">提交</div>
					</div>
				</div>
				
				<div class="auth-history">

					<div v-if="toggleFlag" class="app__btn app__btn-slide" @click="showAuth()">我的历史委托记录</div>
					<div v-else class="app__btn app__btn-show" @click="slideAuth()">我的历史委托记录</div>

					<div class="m-item">
						<div :class="['m-i-sub', toggleFlag ? 'active' : '']">
							<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="afListScroll">
								<Row class="app__table-thead">
									<Col :span="4">委托人</Col>
									<Col :span="4">被委托人</Col>
									<Col :span="7">委托时间</Col>
									<Col :span="4">创建时间</Col>
									<Col :span="5">操作</Col>
								</Row>

								<Row :class="['app__table-item']" v-for="(item,index) in authHisList" :key="index">
									<Col :span="4" class="no-wrap" :title="item.fromDelegateName">{{item.fromDelegateName}}</Col>
									<Col :span="4" class="no-wrap">{{item.toDelegateName}}</Col>
									<Col :span="7">{{item.effDate | date}}至{{item.expDate | date}}</Col>
									<Col :span="4" class="no-wrap">{{item.createDate | date}}</Col>
									<Col :span="5">
										<span class="iconfont icon-xiugai" @click="editAuthHis(item)"></span>
										<span class="iconfont icon-shanchu" @click="delAuthHis(item, index)"></span>
									</Col>
								</Row>
								<Row v-if="!authHisList.length" class="app__data-none">
									<Col :span="24"><span>当前无数据!</span></Col>
								</Row>

								<Pagination  :pageIndex="pageInfoAuthHis.pageIndex" :pageSize="pageInfoAuthHis.pageSize" :rowCount="pageInfoAuthHis.rowCount"  @change="pageChangeAuthHis" :isCenter="true">
								</Pagination>
							</Scroll>
						</div>
					</div>
				</div>
			</Scroll>
		</Dialog>

		<Dialog :dialogSize="dialogSize" class="h-dialog add-staff" dialogTitle="选择被委托人" ref="addBauth"  initBtn>
			<template slot="btnBox">
				<span class="back"  @click="btnBack()">关闭</span>
				<span class="save"  @click="authItemSubmit()">提交</span>
			</template>
			<Scroll class="main" :isShowRight="true">
				<div class="search">
					<Search placeholder="请输入员工名称查询" @search="searchStaffData"></Search>
				</div>
				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="4">员工名称</Col>
						<Col :span="5">员工编号</Col>
						<Col :span="5">员工账号</Col>
						<Col :span="6">区局</Col>
						<Col :span="4">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in staffList" :key="index">
						<Col :span="4" class="no-wrap">{{item.staffName}}</Col>
						<Col :span="5">{{item.staffCode}}</Col>
						<Col :span="5">{{item.staffAccount}}</Col>
						<Col :span="6" class="no-wrap">{{item.regionName}}</Col>
						<Col :span="4">
							<Radio name="Checkbox" :label="item" v-model="authArr"></Radio>
						</Col>
					</Row>
					<Row v-if="staffList.length == 0" class="app__data-none">
						<Col :span="24">
						<span>当前无数据</span>
						</Col>
					</Row>
				</div>
				<Pagination :pageIndex="pageInfoStaff.pageIndex" :pageSize="pageInfoStaff.pageSize" :rowCount="pageInfoStaff.rowCount"  @change="pageChangeStaff" :isCenter="true"></Pagination>
			</Scroll>
		</Dialog>

		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
		
	</div>

</template>

<script>
	import Menu from '@/assets/js/menu';

	export default {
		data() {
			return {
				toggleFlag: true,
				 dialogSize: {
                    size: 60,
                    min: 800,
                    max: 1000
				},
				pageInfoAuthHis: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				pageInfoStaff: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				searchObjStaff: {
					staffCode: '',
					staffName: ''
				},
				taskDelegateId: '', 
				authObj: { // 委托人基本信息
					fromDelegateStaff:'', // 委派人id
					fromDelegateStaffName: '', // 委派人
					toDelegateStaff: '', // 被委派人id
					toDelegateName: '', // 被委派人
					effDate: '',
					expDate: '',
					businessType: '1000,2000,3000'
				},
				authHisList: [], // 委托人历史记录
				staffList: [], // 被委托人列表
				authArr: []  // 选中的被委托人
			}
		},
		mounted() {

		},
		methods: {
			authClick() {
				this.$refs.addAuth.show();
				this.authObj = {};
				this.getAuthHisData();
			},
			getStaffData() {
				this.$axios.get(this.$api.QueryStaffList, {
					params: {
						staffCode: this.searchObjStaff.staffCode,
						staffName: this.searchObjStaff.staffName,
						limit: this.pageInfoStaff.pageSize,
						page: this.pageInfoStaff.pageIndex
					}
				}).then(res => {
					if (res.data.success === true) {
						this.staffList = res.data.staffs.content;
						this.pageInfoStaff.rowCount = res.data.staffs.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常!"})
				})
			},
			
			// 委托历史记录
			getAuthHisData() {
				this.$axios.get(this.$api.QueryDelegatePageList, {
					params: {
						toDelegateStaffId: '',
						fromDelegateStaffId: '',
						limit: this.pageInfoAuthHis.pageSize,
						page: this.pageInfoAuthHis.pageIndex
					}
				}).then(res => {
					if (res.data.success === true) {
						this.authHisList = res.data.flowTaskDelegates.content || [];
						this.pageInfoAuthHis.rowCount = res.data.flowTaskDelegates.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常!"})
				})
			},

			authNameClick() {
				this.$refs.addBauth.show();
				this.searchObjStaff.staffName = '';
				this.getStaffData();
			},
			authItemSubmit() {
				this.$refs.addBauth.hide();
				this.$refs.addAuth.show();
				this.authObj.toDelegateStaff = this.authArr.staffId;
				this.authObj.toDelegateName = this.authArr.staffName;
				this.authObj.fromDelegateStaff = this.$user.getInfo().userStorage.staffId;
				this.authArr = [];
			},
            authSubmit () {
				if (this.authObj.taskDelegateId) {
					this.$validator.validateAll().then(result => {
						if (result) {
							if (new Date(this.authObj.effDate).getTime() > new Date(this.authObj.expDate).getTime()) {
								this.$message.error({message : '开始时间必须小于结束时间！'});
								return;
							}
							this.$axios.post(this.$api.replace(this.$api.TaskDelegate, ['{taskDelegateId}'], [this.authObj.taskDelegateId]), {
								taskDelegateId: this.authObj.taskDelegateId,
								businessType: '1000,2000,3000',
								fromDelegateStaff: this.authObj.fromDelegateStaff,
								toDelegateStaff: this.authObj.toDelegateStaff,
								effDate: this.authObj.effDate ? new Date(this.authObj.effDate) : '',
								expDate: this.authObj.expDate ? new Date(this.authObj.expDate) : ''
							}).then(res => {
								if (res.data.success) {
                                    this.authObj.taskDelegateId = '';
									this.getAuthHisData();
									this.$message.success({message : '修改成功'});
								}
							}).catch(error => {
								this.$message.error({message: error.response.data.msg})
							})
						}
					})

					
				} else {
					this.$validator.validateAll().then(result => {
						if (result) {
							if (new Date(this.authObj.effDate).getTime() > new Date(this.authObj.expDate).getTime()) {
								this.$message.error({message : '开始时间必须小于结束时间！'});
								return;
							}
							this.$axios.post(this.$api.AddDelegate, {
								businessType: '1000,2000,3000',
								fromDelegateStaff: this.authObj.fromDelegateStaff,
								toDelegateStaff: this.authObj.toDelegateStaff,
								effDate: this.authObj.effDate ? new Date(this.authObj.effDate) : '',
								expDate: this.authObj.expDate ? new Date(this.authObj.expDate) : ''

							}).then(res => {
								if (res.data.success) {
                                    this.getAuthHisData();
                                    this.$message.success({message : '添加成功'});
									this.authObj.taskDelegateId = '';
								}
							}).catch(error => {
								this.$message.error({message: error.response.data.msg})
							})
						}
					})
				}
			},
			editAuthHis(item) {
				let	dateYear = new Date().getFullYear(),
					dateMonth = new Date().getMonth() + 1,
					dateDay = new Date().getDate(),
					dateArray = [dateYear,dateMonth,dateDay],
					newDate = dateArray.join("-");
				let itemYear = new Date(item.expDate).getFullYear(),
					itemMonth = new Date(item.expDate).getMonth() + 1,
					itemDay = new Date(item.expDate).getDate(),
					dateArray1 = [itemYear,itemMonth,itemDay],
					itemDate = dateArray1.join("-");
				if (new Date(newDate).getTime() > new Date(itemDate).getTime()) {
					this.$message.warning({message: '当前时间大于结束时间,不可修改!'})
					return
				} else {
					this.authObj = item;
				}
			},
			// 删除委托记录
			delAuthHis(item,index) {
				// 如果当前时间大于结束时间,不容许修改和删除
				let	dateYear = new Date().getFullYear(),
					dateMonth = new Date().getMonth() + 1,
					dateDay = new Date().getDate(),
					dateArray = [dateYear,dateMonth,dateDay],
					newDate = dateArray.join("-");
				let itemYear = new Date(item.expDate).getFullYear(),
					itemMonth = new Date(item.expDate).getMonth() + 1,
					itemDay = new Date(item.expDate).getDate(),
					dateArray1 = [itemYear,itemMonth,itemDay],
					itemDate = dateArray1.join("-");
				if (new Date(newDate).getTime() > new Date(itemDate).getTime()) {
					this.$message.warning({message: '当前时间大于结束时间,不可删除!'})
					return
				} else {
					this.taskDelegateId = item.taskDelegateId
					if(item.taskDelegateId){
						this.tipType = 'DEL';
						this.tipSelData = item;
						this.tipInfo.iconType = 3;
						this.tipInfo.msg = `是否确认删除？`;
						this.tipInfo.showBtn.clear = true;
						this.tipInfo.showBtn.save = true;
						this.$refs.tip.show();
					}
				}
			},

			searchStaffData(val) {
				this.searchObjStaff.staffName = val;
				this.pageInfoStaff.pageIndex = 1;
				this.getStaffData();
			},

			pageChangeAuthHis(page) {
				this.pageInfoAuthHis.pageIndex = page;
				this.getAuthHisData();
				
			},
			pageChangeStaff(page) {
				this.pageInfoStaff.pageIndex = page;
				this.getStaffData();
			},

			showAuth() {
				this.toggleFlag = !this.toggleFlag;
				this.$nextTick(() => {
					this.$refs.addAuth.initHeight();
					this.$refs.listScroll.initScroll();
				})
			},
			slideAuth() {
				this.toggleFlag = !this.toggleFlag;
				this.$nextTick(() => {
					this.$refs.listScroll.initScroll();
					this.$refs.addAuth.setAutoHeight();
				})
			},
			
			btnCancel() {
				this.toggleFlag = true;
				this.$refs.addAuth.hide();
			},
			btnBack() {
				this.$refs.addBauth.hide();
				this.$refs.addAuth.show();
			},

			tipConfirm() {
				if (this.tipType = 'DEL') {
					this.$axios.delete(this.$api.replace(this.$api.TaskDelegate, ['{taskDelegateId}'], [this.taskDelegateId]), {
						params: {
							taskDelegateId: this.taskDelegateId,
						}
					}).then(res => {
						
						if (res.data.success) {
                            this.getAuthHisData();
							this.$message.success({message: '删除成功!'});
						} else {
							this.$message.error({ message : '删除失败'});
						}
						this.$refs.tip.hide();
					}).catch(error => {
						this.$message.error({message: '删除失败!'});
					})
				}
			},
			
		}
	}
</script>
<style scoped lang="scss">
    // 委托管理
	.delegate {
        position: absolute;
		top: 20px;
		left: -10px;
		width: 22%;
		height: 20px;
		
		.authorize {
            max-width: 50px;
            line-height: 20px;
			.u-n-hi {
                cursor: pointer;
				display: inline !important;
				padding: 3px 12px 3px 12px;
				background-color: #ff9307;
                color: #fff;
                border-radius: 3px;
			}


		}
		.add-flow {
			/deep/ .main {
				padding: 40px 0px 5px;
			}
			/deep/ .bottom{
				border-top: none;
				display: none;
			}
			/deep/ .btn-page-box {
				display: none;
			}
			.auth-config {
				.auth-config-basic {
					padding: 30px 30px 0px 30px;
				}
				/deep/ .form-item {
					min-height: 50px;
				}
				.auth-date {
					/deep/ .form-item {
						padding-left: 15px !important;
					}
				}
				.btn-box {
					padding: 10px 35px 0px 10px;
					width: 100%;
					border-top: 1px solid #d5d5d5;
					text-align: right;
				}
			}

			.auth-history {
				text-align: left;
				.m-item {
					display: inline-block;
					width: 100%;
					height: 100%;
					text-align: center;
					cursor: pointer;
					color: #666;
					font-size: 14px;
					vertical-align: top;
					.m-i-sub {
						width: 100%;
						background: #fdfdfd;
						font-size: 12px;
						&.active {
							height: 0px;
							overflow-y: hidden;
						}
					}
				}
					

				.app__btn {
					border: none;
					width: 150px;
					padding: 0;
				}
				.app__btn.app__btn-show {
					padding: 0px;
					background-color: #fff;
					color: #666;
					margin-right: 10px;
					background-image: url(../images/up.png);
					background-repeat: no-repeat;
					background-position: 110px;
					background-size: 20px 20px;
					text-align: left;
					padding-left: 5px;
				}

				.app__btn.app__btn-slide {
					padding: 0px;
					background-color: #fff;
					color: #666;
					margin-right: 10px;
					background-image: url(../images/down.png);
					background-repeat: no-repeat;
					background-position: 110px;
					background-size: 20px 20px;
					text-align: left;
					padding-left: 5px;
				}
			}

		}
		.add-staff {
			.search {
				width: 300px;
			}
			.main {
				padding: 10px;
			}
		}
		.app__table__inner {
			.no-wrap {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.span {
				padding: 0 5px;
				cursor: pointer;
				font-size: 12px;
			}
		}
        .icon-xiugai,
		.icon-shanchu{
			padding: 0 5px;
		}
	}
</style>