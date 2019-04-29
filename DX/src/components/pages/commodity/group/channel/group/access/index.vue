<template>
    <div class="access">
         <Scroll class="main" :isShowRight="true">
            <div class="mod-title">
                <div>关联访问组</div>
            </div>
            <!--顶部-->
            <div class="top">
                <!--访问组列表-->
               
                <Search class="search" placeholder="请输入访问组名称" @search="searchAccessData"></Search>
                
                <div class="app__table__inner">
						<!-- 表头 -->
						<Row class="app__table-thead">
							<Col :span="3">访问组名称</Col>
							<Col :span="3">访问组编码</Col>
							<Col :span="3">地区</Col>
							<Col :span="3">类型</Col>
							<Col :span="3">生效时间</Col>
							<Col :span="3">失效时间</Col>
							<Col :span="3">状态</Col>
							<Col :span="3">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in accessGroupList" :key="index">
							<Col :span="titleItem.span" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex" class="no-wrap">
								<span v-if="titleItem.param == 'effectiveDate' || titleItem.param == 'expiryDate'">{{adjustTabelItemText(item,titleItem.param) | date}}</span>
					            <span v-else>{{adjustTabelItemText(item,titleItem.param)}}</span>
							</Col>
							<Col :span="3">
								<i v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="addAccessPage(item)"></i>
								<i v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang" @click="deleteAccessPage(item)"></i>
							</Col>
						</Row>
						<Row v-if="accessGroupList.length == 0" class="app__data-none">
							<Col :span="24">
							<span>当前无数据</span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="accessGroupPageInfo.pageIndex" :pageSize="accessGroupPageInfo.pageSize" :rowCount="accessGroupPageInfo.rowCount"  @change="accessGroupPageChange" :isCenter="true"></Pagination>
            </div>


            <!--已选列表-->
            <div class="sel-box">
                <i class="title-icon"></i>
                <span class="y-span">已选访问组</span>
            </div>

            <!--底部-->
            <div class="bottom">
                <div class="app__table__inner">
                        <Row class="app__table-thead">
                            <Col :span="10">访问组名称</Col>
                            <Col :span="10">访问组编码</Col>
                            <!-- <Col :span="10">权限设置</Col> -->
                            <Col :span="4">操作 </Col>
                        </Row>
                        <!-- <Scroll :isShowRight="true"> -->
                            <Row :class="['app__table-item']" v-for="(item,index) in accessGroupSelected" :key="index" v-if="item.statusCd!='1100'">
                                <Col :span="10" class="no-wrap">{{item.groupName}}</Col>
                                <Col :span="10" class="no-wrap">{{item.groupCode}}</Col>
                                <!-- <Col :span="10">
                                    <CheckboxGroup :data="permissionTypeArray" name="permissions" data-vv-as="权限设置" v-model="item.permissions"></CheckboxGroup>
                                </Col> -->
                                <Col :span="4" class="cursor">
                                    <i @click="detailAcess(item, index)">查看成员</i>
                                    <i @click="delAccess(item,index)">删除</i>
                                </Col>
                            </Row>

                            <Row v-show="showNoData(accessGroupSelected)" class="app__data-none">
                                <Col :span="24"><span>暂无数据</span></Col>
                            </Row>
                        <!-- </Scroll> -->
                    </div>
                
            </div>
        </Scroll>


        <!-- 已选访问组成员信息 -->
        <Dialog :dialogSize="dialogSize" class="h-dialog" :dialogTitle="dialogTitle" ref="memberInfo" initBtn>
         <template slot="btnBox">
             <span class="save"  @click="btnConfirm()">确定</span>
         </template>
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
                                    <Col :span="4" class="no-wrap">{{item.channelNbr}}</Col>
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
                                    <Col :span="5" class="no-wrap">{{item.operatorsNbr}}</Col>
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
                                    <Col :span="4" class="no-wrap">{{item.staffCode}}</Col>
                                    <Col :span="4" class="no-wrap">{{item.staffAccount}}</Col>
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
		</Dialog>

        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
        <Tip ref="tipDel" :tipObj="tipInfo" @confirm="tipConfirmDel()"></Tip>
    </div>
</template>

<script type="text/javascript">
    export default{
        props:{
            componentData:{}
        },
        data() {
            return {
                dialogSize: {
					size: 80,
					min: 600,
					max: 1000
                },
                dialogTitle: '',
                accessGroupPageInfo: {
                    pageIndex: 1,
                    pageSize: 5,
                    rowCount: 0
                },
                 tipInfo: {
                    iconType:1,
                    msg:'',
                    showBtn:{
                        clear: true,
                        save: true
                    }
                },
                tableTitleData: [{
                    name: '访问组名称',
                    param: 'groupName',
                    span: 3,
                    part: ''
                },{
                    name: '访问组编码',
                    param: 'groupCode',
                    span: 3,
                    part: ''
                },{
                    name: '地区',
                    param: 'area',
                    span: 3,
                    part: ''
                },{
                    name: '类型',
                    param: 'groupType',
                    span: 3,
                    part: '',
                    parent: [
                        {label: '省个性化组', value: '0'},
                        {label: '特殊权限组', value: '1'},
                        {label: '限制组', value: '2'}
                    ]
                },{
                    name: '生效时间',
                    param: 'effectiveDate',
                    span: 3,
                    part: ''
                },{
                    name: '失效时间',
                    param: 'expiryDate',
                    span: 3,
                    part: ''
                },{
                    name: '状态',
                    param: 'statusCd',
                    span: 3,
                    part: '',
                    parent:[
						{label:'生效',value:'1000'},
						{label:'失效',value:'1100'},
						{label:'未生效',value:'1200'}
					],
                }],
                statusCdObj: [
					{label:'生效',value:'1000'},
					{label:'失效',value:'1100'},
					{label:'未生效',value:'1200'}
				],
				groupTypeObj: [
					{label:'省个性化组',value:'0'},
					{label:'特殊权限组',value:'1'},
					{label:'限制组',value:'2'}
				],
                searchObjAccess: {
                    groupCode: '',
                    groupName: ''
                },
                offerId: '',
                accessGroupList: [],
                accessGroupSelected: [],
                groupId: '',
                accessTemp: [],
                permissionTypeArray: [{
                    label: '订购',
                    value: '1000027'
                },{
                    label: '变更',
                    value: '1000031'
                },{
                    label: '退订',
                    value: '1000048'
                }],
               accessGroupRels: {
                   offerId: '',
                   createStaff: '',
                   accessGroupRels: [],
                   groupId: '',
                //    permissions: ''
               },
                // 访问组成员列表
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
                staffMemberList: [],
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
            }
        },
        mounted(){
            this.offerId = this.componentData.offerId;
            this.getAccessGroupList();
            this.getAccessGroupSelected();
        },
        
        methods:{
           
            // 获取待选访问组
            getAccessGroupList() {
                this.$axios.get(this.$api.QueryAccessGroupList, {
					params: {
						groupCode: this.searchObjAccess.groupCode,
						groupName: this.searchObjAccess.groupName,
						statusCd:  '1000',
						limit: 5,
						page: this.accessGroupPageInfo.pageIndex,
						}
				}).then(res => {
					if(res.data.success === true) {
						this.accessGroupList = res.data.accessGroups.content || [];
						this.accessGroupPageInfo.rowCount = res.data.accessGroups.total;
					} else {
						this.$message.error({ "message": "查询失败！" })
					}
				}).catch(error => {
					this.$message.error({ "message": "服务器异常！" })
				})
            },

            // 获取已选访问组
            getAccessGroupSelected() {
                this.$axios.get(this.$api.replace(this.$api.OfferAccessRel, ['{offerId}'], [this.offerId]), {
                    params: {
						offerId: this.offerId
                    }
                }).then(res => {
                    if(res.data.success == true) {
                        this.accessGroupSelected = res.data.accessGroups || [];
                    } else {
                        this.$message.error({ message: '已选列表查询失败！'});
                    }
                }).catch(error => {
                    this.$message.error({ message: '服务器异常！' });
                })
            },

            // 关联访问组的新增
            save(callback) {
                let newArr = [];
                this.accessGroupSelected.forEach(item => {
                    let obj = {
                        offerId: this.offerId,
                        groupName: item.groupName,
                        groupId: item.groupId,
                        // permissions: item.permissions
                    };
                    newArr.push(obj);
                })
                // 销售品配置访问组集合
                let accessGroupRels = [];
                this.accessGroupSelected.forEach(item => {
                    let obj = {
                        groupId : item.groupId,
                        //  permissions: item.permissions
                    }
                    accessGroupRels.push(obj)
                })

                this.$axios.post(this.$api.replace(this.$api.AddOfferAccessGroup, ['{offerId}'], [this.offerId]), {
                    offerId: this.offerId,
                    createStaff: this.$user.getInfo().id,
                    accessGroupRels: accessGroupRels
                }).then(res => {
                    if (res.data.success == true) {
                         this.$message.success({ message: '操作成功！'});
                         callback(true);
                         this.getAccessGroupSelected();
                    } else {
                        this.$message.error({ message: '操作失败！'});
                        callback(false);
                    }
                }).catch(error => {
                    this.$message.error({ message: '操作失败！'});
                     callback(false)
                })
               
            },
            //计算显示
            adjustTabelItemText(item, param) { 
				let val = item[param];
				switch(param) {
					case 'statusCd':
						return this.getStatus(val);
					case 'groupType':
						return this.getGroupType(val);
					default:
						return val;
				}
            },
            // 获取状态
            getStatus(val) { 
				return {
					'1000': '生效',
					'1100': '失效',
					'1200': '未生效'
				}[val] || '未知'
            },
            // 获取访问组类型
			getGroupType(val) { 
				return {
					'0': '省个性化组',
					'1': '特殊权限组',
					'2': '限制组',
				}[val] || '未知'
			},
            // 访问组搜索
           searchAccessData(val) {
               this.searchObjAccess.groupName = val;
               this.accessGroupPageInfo.pageIndex = 1;
               this.getAccessGroupList();

           },
           accessGroupPageChange(page) {
               this.accessGroupPageInfo.pageIndex = page;
               this.getAccessGroupList();
           },
           // 访问组选中
           selectMkt(val) {
			    return this.accessGroupSelected.find(item => item.groupId == val.groupId)
            },
            // 选中访问组
            addAccessPage(item) {
                let Temp = {
                    groupId: item.groupId,
                    groupName: item.groupName,
                    groupCode: item.groupCode,
                    // permissions: item.permissions || [] // 权限设置
                }
                this.accessGroupSelected.push(Temp);

            },
            // 再次点击删除访问组
            deleteAccessPage(item) {
                for(var i=0;i<this.accessGroupSelected.length;i++){
					if(this.accessGroupSelected[i].groupId == item.groupId){
						this.accessGroupSelected.splice(i,1);
					}
				}
            },
            // 查看成员
            detailAcess(item, index) {
                this.groupId = item.groupId
                this.$refs.memberInfo.show();
                this.dialogTitle = '访问组成员信息';
                this.accessGroupType = 'qd';
                this.getChannelMemberData();
                // this.getOperatorsMemberData();
                // this.getStaffMemberData();
            },
            // 已选访问组的删除
            delAccess(item, index) {
                this.groupId = item.groupId;
				this.tipInfo.iconType = 3;
                this.tipInfo.msg = `确认要删除选择的记录吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tipDel.show();
            },
            showNoData(data){
                return !data.find( obj => obj.statusCd != '1100');
            },
            btnConfirm() {
                this.$refs.memberInfo.hide();
                this.searchObjChannelMember.channelName = '';
                this.searchObjOperatorsMember.operatorsName = '';
                this.searchObjStaffMember.staffName = '';
                // this.getAccessGroupSelected();
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
						groupId: this.groupId,
						channelNbr: this.searchObjChannelMember.channelNbr,
						channelName: this.searchObjChannelMember.channelName,
						limit: this.channelMemberPageInfo.pageSize,
						page: this.channelMemberPageInfo.pageIndex

					}
				}).then(res => {
					console.log('渠道成员',res)
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
						groupId: this.groupId,
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
						groupId: this.groupId,
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
            tipConfirmDel() {
                if (this.tipInfo.msg == `确认要删除选择的记录吗？`) {
                   this.$axios.delete(this.$api.replace(this.$api.DelOfferAccessGroup, ['{groupId}'], [this.groupId]), {
						params: {
                            offerId: this.offerId,
                            groupId: this.groupId,
							updateStaff: this.$user.getInfo().id
						}
					}).then(res => {
						if (res.data.success) {
                            this.$message.success({message: '删除成功!'});
                            this.getAccessGroupSelected();
						} else {
							this.$message.error({ message : '删除失败'});
						}
						this.$refs.tipDel.hide();
					}).catch(error => {
						this.$message.error({message: '删除失败!'});
					}) 
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    /*关联访问组*/
    .access {
        width: 100%;
        height: 100%;

         .app__table__inner {
            .no-wrap {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .scroll {
            z-index: 10;
            padding: 0px 10px 0px 10px !important;
            .app__table {
                .span {
                    color: $mainColor;
                    padding: 0 5px;
                    cursor: pointer;
                }
            }
        }
    }
    .main {
         /*模块标题*/
        .mod-title{
            width: 100%;
            height: 30px;
            background-color: #f5f6fa;
            border-radius: 16px 16px 0 0;

            div{
                width: 120px;
                height: 30px;
                background-color: $mainColor;
                border-radius: 16px 0 0 0;
                line-height: 30px;
                text-align: center;
                font-size: 14px;
                color: white;
            }
        }

        .top {
            width: 100%;
            height: 330px;
        }
        .search {
            width: 40%;
            margin-bottom: 10px;
        }

     
              .sel-box{
                width: 100%;
                line-height: 50px;
                padding: 0 20px 0 10px;
                border-left: solid 1px #f6f6f6;
                border-top: solid 1px #f6f6f6;
                border-right: solid 1px #f6f6f6;
                margin-top: 30px;

               
                /*图标*/
                i.title-icon{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: url("./images/sjicon.png") no-repeat;
                    background-size: cover;
                    vertical-align: text-top;
                }
                /*表格标题样式*/
                .y-span {
                    display: inline-block;
                    margin-left: 4px;
                    color: $mainColor;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
         .cursor {
            cursor: pointer;
            color: $mainColor;
            i {
                font-style: normal
            }
        }
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
                        .search {
                            margin-left: 10px;
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
							// margin-top: 14px;
                            min-height: 260px;
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