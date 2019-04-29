<template>
    <transition name="fade">
        <div class="product">
			<div class="title">
				<span class="t-name">查看访问组</span>
				<span class="close" @click="pageClose()"></span>
			</div>
			
			<!-- 配置访问组基本信息 -->
			<div class="access-info" ref="addAttrName">
				<Scroll class="basic-info" ref="listScroll" :isShowRight="true">
					<div class="c_title">
						<span class="c-t-name">基本信息</span>
					</div>
					<Row>
						<Form labelWidth="120px" labelAlign="left">
							<Col :span="8">
								<FormItem labelText="组名称：">
									<span>{{accessGroupForm.groupName}}</span>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1">
								<FormItem labelText="地区:" >
									<span>{{accessGroupForm.area}}</span>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1">
								<FormItem labelText="组类型:">
									<span v-if="accessGroupForm.groupType=='0'">省个性化组</span>
									<span v-if="accessGroupForm.groupType=='1'">限制组</span>
									<span v-if="accessGroupForm.groupType=='2'">特殊权限组</span>
								</FormItem>
							</Col>
							<Col :span="8">
								<FormItem labelText="生效方式:">
									<span>{{accessGroupForm.effectiveWay == '0' ? '用户指定时间失效': '立即生效'}}</span>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1">
								<FormItem labelText="生效时间:">
									<span>{{accessGroupForm.effectiveDate | date}}</span>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1">
								<FormItem labelText="失效时间:">
									<span>{{accessGroupForm.expiryDate | date}}</span>
								</FormItem>
							</Col>
							<Col>
								<FormItem labelText="描述:">
									<span>{{accessGroupForm.groupDesc}}</span>
								</FormItem>
							</Col>
							
						</Form>
					</Row>				
				</Scroll>
			</div>

			<!-- 访问组成员 tab栏 -->
			<!-- 配置访问组成员 -->
			<div class="access-config"  ref="addAttrValue">
				<div class="basic-info" ref="listScroll" :isShowRight="true">
					<div class="c_title">
						<span class="c-t-name">访问组成员</span>
					</div>

					<!-- 访问组成员tab栏切换列表 -->
					<Row class="list-box">
						<Col class="l-item">
						<div class="l-content">
							<div class="pane">
								<div class="p-title">
									<div :class="['p-t-block',accessGroupType=='qd' ? 'active' : '']" @click="accessPaneBlockClick('qd')">
										<span>渠道成员</span>
										<span class="t-b-count"></span>
									</div>
									<div :class="['p-t-block',accessGroupType=='jy' ? 'active' : '']" @click="accessPaneBlockClick('jy')">
										<span>经营主体成员</span>
										<span class="t-b-count"></span>
									</div>
									<div :class="['p-t-block',accessGroupType=='yg' ? 'active' : '']" @click="accessPaneBlockClick('yg')">
										<span>员工成员</span>
										<span class="t-b-count"></span>
									</div>
									
								</div>
								<div class="p-content main" v-if="this.accessGroupType == 'qd'">
									<Search placeholder="请输入渠道名称" @search="qdMemberData"></Search>
									<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="qdListScroll">
										<Row class="app__table-thead">
											<Col :span="5">渠道名称</Col>
											<Col :span="4">渠道编码</Col>
											<Col :span="5">区域</Col>
											<Col :span="4">生效方式</Col>
											<Col :span="3">生效时间</Col>
											<Col :span="3">失效时间</Col>
										</Row>

										<Row :class="['app__table-item']" v-for="(item,index) in channelMemberList" :key="index">
											<Col :span="5" class="no-wrap">{{item.channelName}}</Col>
											<Col :span="4">{{item.channelNbr}}</Col>
											<Col :span="5" class="no-wrap">{{item.regionName}}</Col>
											<Col :span="4" v-if="item.effectiveWay == '0'">用户指定时间失效</Col>
											<Col :span="4" v-else>立即生效</Col>
											<Col :span="3">{{item.effectiveDate | date}}</Col>
											<Col :span="3">{{item.expiryDate | date}}</Col>
										</Row>
										<Row v-if="!channelMemberList.length" class="app__data-none">
											<Col :span="24"><span>当前无数据!</span></Col>
										</Row>
									</Scroll>
								</div>
								<div class="p-footer" v-if="this.accessGroupType == 'qd'">
									<Pagination :pageIndex="channelMemberPageInfo.pageIndex" :pageSize="channelMemberPageInfo.pageSize" :rowCount="channelMemberPageInfo.rowCount" :isCenter="true" @change="pageChange"></Pagination>
								</div>


								<div class="p-content main" v-if="this.accessGroupType == 'jy'">
									<Search placeholder="请输入经营主体名称" @search="jyMemberData"></Search>
									<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="listScroll">
										<Row class="app__table-thead">
											<Col :span="8">经营主体名称</Col>
											<Col :span="5">经营主体编码</Col>
											<Col :span="5">生效方式</Col>
											<Col :span="3">生效时间</Col>
											<Col :span="3">失效时间</Col>
										</Row>
										<Row :class="['app__table-item']" v-for="(item,index) in operatorsMemberList" :key="index">
											<Col :span="8" class="no-wrap">{{item.operatorsName}}</Col>
											<Col :span="5">{{item.operatorsNbr}}</Col>
											<Col :span="5" v-if="item.effectiveWay == '0'">用户指定时间失效</Col>
											<Col :span="5" v-else>立即生效</Col>
											<Col :span="3">{{item.effectiveDate | date}}</Col>
											<Col :span="3">{{item.expiryDate | date}}</Col>
											
										</Row>
										
										<Row v-if="!operatorsMemberList.length" class="app__data-none">
											<Col :span="24"><span>当前无数据!</span></Col>
										</Row>
									</Scroll>
								</div>
									<div class="p-footer" v-if="this.accessGroupType == 'jy'">
										<Pagination :pageIndex="operatorsMemberPageInfo.pageIndex" :pageSize="operatorsMemberPageInfo.pageSize" :rowCount="operatorsMemberPageInfo.rowCount" :isCenter="true" @change="pageChange"></Pagination>
									</div>

								<div class="p-content main" v-if="this.accessGroupType == 'yg'">
									<Search placeholder="请输入员工名称" @search="ygMemberData"></Search>
									<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="listScroll">
										<Row class="app__table-thead">
											<Col :span="2">员工姓名</Col>
											<Col :span="4">员工工号</Col>
											<Col :span="4">员工账号</Col>
											<Col :span="5">员工属地</Col>
											<Col :span="3">生效方式</Col>
											<Col :span="3">生效时间</Col>
											<Col :span="3">失效时间</Col>
											
										</Row>

										<Row :class="['app__table-item']" v-for="(item,index) in staffMemberList" :key="index">
											<Col :span="2" class="no-wrap">{{item.staffName}}</Col>
											<Col :span="4">{{item.staffCode}}</Col>
											<Col :span="4">{{item.staffAccount}}</Col>
											<Col :span="5" class="no-wrap">{{item.regionName}}</Col>
											<Col :span="3" v-if="item.effectiveWay == '0'">用户指定时间失效</Col>
											<Col :span="3" v-else>立即生效</Col>
											<Col :span="3">{{item.effectiveDate | date}}</Col>
											<Col :span="3">{{item.expiryDate | date}}</Col>
											
										</Row>
										<Row v-if="!staffMemberList.length" class="app__data-none">
											<Col :span="24"><span>当前无数据!</span></Col>
										</Row>
									</Scroll>
								</div>

								<div class="p-footer" v-if="this.accessGroupType == 'yg'">
									<Pagination :pageIndex="staffMemberPageInfo.pageIndex" :pageSize="staffMemberPageInfo.pageSize" :rowCount="staffMemberPageInfo.rowCount" :isCenter="true" @change="pageChange"></Pagination>
								</div>
							</div>
						</div>
						</Col>
						
						
						</Col>
					</Row>
					
						
				</div>
			</div>

			<div class="footer">
					<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
				</div>
			</div>
        </div>
    </transition>
</template> 

<script>
    export default {
        props:{
			componentData:{},
        },
        data() {
            return {
				accessGroupForm: {},
				channelMemberPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				operatorsMemberPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				staffMemberPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				
				
				searchObjStaff: {
					staffCode: '',
					staffName: ''
				},

				// 配置访问组成员列表
				groupId: '',
				// 渠道成员
				accessGroupType: 'qd', // qd jy yg
				searchObjChannelMember: {
					channelName: '',
					channelNbr: ''
				},
				channelMemberList: [],

				// 经营主体成员
				searchObjOperatorsMember: {
					operatorsNbr: '',
					operatorsName: ''
				},
				operatorsMemberList: [],

				// 员工成员
				searchObjStaffMember: {
					staffCode: '',
					staffName: ''
				},
				staffMemberList: []
            }
		},
		created() {

		},
		watch: {
			

		},
		mounted() {
			this.initData();
			this.getChannelMemberData();
		},
        methods:{
			changeView(view,obj){
                this.currentView = view;
				this.currentData = obj;
			},
			isActive(item, index){
				// return this.tabFlag == 1 ? 'active' : '';
			},
			// 获取详情
			initData() {
				this.$axios.get(this.$api.replace(this.$api.QueryAccessGroupTask, ['{groupId}'], [this.componentData.groupId]), {
					params: {
						groupId: this.componentData.groupId
					}
				}).then(res => {
					if (res.data.success) {
						this.accessGroupForm = res.data.accessGroup;
					} else {
						this.$message.error({ message: '查询访问组详情失败!' })
					}
				}).catch(error => {
					this.$message.error({ message: '查询访问组详情失败!' })
				})
			},

			// tab栏切换内容
			accessPaneBlockClick(val) {
				this.accessGroupType = val;
				if (val == "qd") {
					this.searchObjChannelMember.channelName = '';
					this.getChannelMemberData();
				} else if (val == "jy") {
					this.searchObjOperatorsMember.operatorsName = '';
					this.getOperatorsMemberData();
				} else if (val == "yg") {
					this.searchObjStaffMember.staffName = '';
					this.getStaffMemberData();
				}
			},

			// 渠道成员列表
			getChannelMemberData() {
				this.$axios.get(this.$api.QueryChannelMemberList, {
					params: {
						groupId: this.componentData.groupId,
						channelNbr: this.searchObjChannelMember.channelNbr,
						channelName: this.searchObjChannelMember.channelName,
						limit: this.channelMemberPageInfo.pageSize,
						page: this.channelMemberPageInfo.pageIndex

					}
				}).then(res => {
					if (res.data.success === true) {
						this.channelMemberList = res.data.channelMembers.content;
						this.channelMemberPageInfo.rowCount = res.data.channelMembers.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--渠道成员列表!"})
				})
			},
			// 经营主体成员列表
			getOperatorsMemberData() {
				this.$axios.get(this.$api.QueryOperatorsMemberList, {
					params: {
						groupId: this.componentData.groupId,
						operatorsNbr: this.searchObjOperatorsMember.operatorsNbr,
						operatorsName: this.searchObjOperatorsMember.operatorsName,
						limit: this.operatorsMemberPageInfo.pageSize,
						page: this.operatorsMemberPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success === true) {
						this.operatorsMemberList = res.data.operatorsMembers.content;
						this.operatorsMemberPageInfo.rowCount = res.data.operatorsMembers.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--经营主体成员列表!"})
				})
			},
			// 员工成员列表
			getStaffMemberData() {
				this.$axios.get(this.$api.QueryStaffMemberList, {
					params: {
						groupId: this.componentData.groupId,
						staffCode: this.searchObjStaffMember.staffCode,
						staffName: this.searchObjStaffMember.staffName,
						limit: this.staffMemberPageInfo.pageSize,
						page: this.staffMemberPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success === true) {
						this.staffMemberList = res.data.staffMembers.content;
						this.staffMemberPageInfo.rowCount = res.data.staffMembers.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--员工成员列表!"})
				})
			},

			// 渠道成员搜索
			qdMemberData(val) {
				this.channelMemberPageInfo.pageIndex = 1;
				this.searchObjChannelMember.channelName = val;
				this.getChannelMemberData(val)
			},
			// 经营主体成员搜索
			jyMemberData(val) {
				this.operatorsMemberPageInfo.pageIndex = 1;
				this.searchObjOperatorsMember.operatorsName = val;
				this.getOperatorsMemberData(val)
			},
			// 员工成员搜索
			ygMemberData(val) {
				this.staffMemberPageInfo.pageIndex = 1;
				this.searchObjStaffMember.staffName = val;
				this.getStaffMemberData(val)
			},
			
			// tab栏列表页码切换
			pageChange(page) {
				if (this.accessGroupType == 'qd') {
					this.channelMemberPageInfo.pageIndex = page;
					this.getChannelMemberData();
				} else if (this.accessGroupType == 'jy') {
					this.operatorsMemberPageInfo.pageIndex = page;
					this.getOperatorsMemberData();
				} else if (this.accessGroupType == 'yg') {
					this.staffsPageInfo.pageIndex = page;
					this.getStaffMemberData();
				}
				
			},
			
			// 返回
			globalback() {
				this.$emit('componentView', 'list')
			},

			
            pageClose(){
                this.$emit('componentView','list',this.componentData)
			},
        },
        components:{
           
        }
    }
</script>
<style scoped lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s ease;
	}

	.fade-enter,
	.fade-leave-to {
		top: -100% !important;
	}

	.search-box{
		width: 90%;
		line-height: 40px;
		&.search-long{
			padding: 0 30px 0 80px;
		}

		.search-name{
			position: absolute;
			width: 75px;
			top: 0;
			left: 0;
			text-align: right;
			white-space: nowrap;
		}

		.search-items{
			width: 90%;
			height: 100%;
		}

		.search-item{
			display: inline-block;
			height: 34px;
			line-height: 34px;
			padding: 0 20px;
			margin-right: 50px;
			border: 1px solid #f5f5f5;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;

			.item-close{
				position: absolute;
				display: block;
				width: 40px;
				height: 34px;
				top: -1px;
				right: -40px;
				background-image: url(./images/close.png);
				background-repeat: no-repeat;
				background-position: center;
				cursor: pointer;

				&:hover{
					background-image: url(./images/close_hover.png);
				}
			}
		}
	}

      .product{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 201;
        overflow: auto;
        background-color: #fff;

		.title{
			//position: absolute;
			display: block;
			//top: 0;
			//left: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			font-size: 16px;
			text-align: center;
			border-bottom: 1px solid #e4e4e4;
			font-weight: 700;
			span {
				position : none;
			}
        }

       
        .close{
            position: absolute;
            display: block;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            background: url(./images/close_page.png) no-repeat center;

            &:hover{
                opacity: .8;
            }
        }


			.row {
				font-size: 14px;
				padding-left: 20px;
			}
			.basic-info {
				padding: 30px;
				padding-bottom: 0;
				height: 86%;
				background: #fff;
				.c_title {
					width: 100%;
					height: 40px;
					line-height: 40px;
					font-weight: bold;
					font-size: 14px;
					
					.c-t-name {
						display: inline-block;
						height: 20px;
						line-height: 20px;
						padding-left: 8px;
						border-left-width: 8px;
						border-left-color: #5c9cf3;
						border-left-style: solid;
					}
				}
				.form-item {
					padding-left: 65px !important;
					//margin-left: 10px;
					.f-i-l {
						font-size: 16px;
					}

					.access-textarea {
						width: 100%;
						height: 60px;
						padding: 5px;
						outline: 0;
						border: 1px solid #d8dcdf;
						border-radius: 4px;
						resize: none;
						color: #7a7a86;
					}
				}
				
				.span {
					padding: 5px 10px;
					border: 1px solid #75d3aa;
					color: #75d3aa;
					border-radius: 5px;
					margin-right: 20px;
					cursor: pointer;
					.file {
						position: absolute;
						top: 0;
						left: 0;
						width: 0;
						height: 0;
						opacity: 0;
						z-index: -1;
					}
				}
			}
            .footer{
                position: absolute;
                // bottom: 0;
                left: 0;
                width: 100%;
                height: 50px;
                line-height: 50px;
                padding: 0 20px;
                border-top: 1px solid #f5f5f5;
                text-align: right;
                background-color: #fff;

                .save{
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 20px;
                    border-radius: 4px;
                    background-color: $mainColor;
                    color: #fff;
                    cursor: pointer;

                    &:hover{
                        opacity: .8;
                    }
                }
            }	
    }

	.main {
		padding: 20px;
		.search {
			width: 300px;
			margin-bottom: 20px;
		}

		.yx-scroll{
			min-height: 160px;
		}

		.y-span {
			display: block;
			margin: 10px 0;
			//color: #b6de8f;
			font-weight: bold;
			font-size: 14px;
		}
		.date-picker {
			overflow: inherit !important;
		}
		.icon-xuanzhong-fang{
			color: $mainColor;
		}

		.edit-offer-dialog{
			padding: 20px;
		}
	}

	
	
	.app__table__inner {
		min-height: 160px;
		.no-wrap {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.span {
			padding: 0 5px;
			cursor: pointer;
		}
	}

	// 渠道列表样式
	.src-content {
		overflow: scroll;
	}
	.list-box {
		width: 100%;
		height: calc( 100% - 195px);
		margin-top: 15px;
		.l-item {
			padding-left: 15px;
			&:first-child {
				padding-left: 0;
			}
			.l-content {
				width: 100%;
				height: 100%;
				.pane {
					width: 100%;
					height: 100%;
					background-color: #fff;
					.p-title {
						width: 100%;
						height: 30px;
						line-height: 29px;
						border-top: 1px solid #e9e9e9;
						background-color: #fafafa;
						.p-t-block {
							display: block;
							width: 150px;
							top: 0;
							text-align: center;
							font-size: 12px;
							border-top-left-radius: 4px;
							border-top-right-radius: 4px;
							color: #254063;
							float: left;
							transition: all .3s ease;
							cursor: pointer;
							&.active {
								height: 35px;
								line-height: 32px;
								top: -5px;
								color: $mainColor;
								border-top: 3px solid $mainColor;
								background-color: #fff;
								box-shadow: 1px -1px 1px 0px rgba(3, 0, 0, 0.09);
							}
							.iconfont {
								font-size: 12px;
							}
							.t-b-count {
								color: #ff8f04;
							}
						}
						.p-t-more {
							margin-right: 15px;
							color: #d6d9e2;
							float: right;
							cursor: pointer;
							&:hover {
								color: $mainColor;
							}
						}
					}
					.p-content {
						width: 100%;
						height: calc(100% - 80px);
						padding: 20px 20px 0;
						.span{
							color: $mainColor;
							cursor: pointer;
						}
						.p-search {
							width: 50%;
							height: 36px;
							line-height: 36px;
							.iconfont {
								position: absolute;
								left: 0;
								top: 12px;
								width: 40px;
								height: 16px;
								line-height: normal;
								color: $mainColor;
								font-size: 16px;
								text-align: center;
								border-right: 1px solid #eee;
								z-index: 1;
							}
							/deep/ input {
								height: 36px;
								padding: 0 60px 0 55px;
								border-radius: 0;
							}
							.p-s-go {
								position: absolute;
								right: 0;
								top: 2px;
								width: 54px;
								height: 36px;
								//background-image: url(./images/go.png);
								background-repeat: no-repeat;
								background-position: center;
								cursor: pointer;
							}
						}
						.scroll {
							height: calc(100% - 50px) !important;
							margin-top: 14px;
						}
						.icon-xiugai,
						.icon-peizhi {
							cursor: pointer;
						}
					}
					.p-footer {
						height: 50px;
					}
				}
			}
		}
	}

</style>
