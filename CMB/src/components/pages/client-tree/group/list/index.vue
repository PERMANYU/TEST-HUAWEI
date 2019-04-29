<template>
	<div class="list">
		<div class="header">
			<div class="h-all">
				<div class="h-a-title">
					<div class="searchMain">
                        <ConditionSearch :data="conditionSearchData" @search="handleSearchTree"></ConditionSearch>
					</div>
				</div>
				<div class="h-a-add">
					<div class="app__btn app__btn-add" v-if="userRightBtnControl.showAddBtn" @click="addClick()">添加</div>
				</div>
			</div>
		</div>
		<div class="main">
            <Scroll class="app__table" :isShowRight="true" ref="listScroll">
                <tree-list class="tree-list-style" v-for="(item, index) in treeListData" :key="index" 
                        :folder="item"
                        :keys="objData"
                        :childrenStr="'childerNode'"
                        :operation="operation"
                        @click="handleTreeNodeList(item)"
                        @operationClick="operationClick">
                </tree-list>
            </Scroll>
		</div>
		<div class="footer" v-if="treeListData.length">
			<Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
			</Pagination>
		</div>

	    <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>

        <!-- 修改树弹窗S -->
         <Dialog ref="modifyDialog" :dialogTitle="modifyDialogTitle" :dialogSize="modifyDialogSize" @confirm="handleModifyConfrim">
            <div class="modify-header">
                <Row>
                    <Col :span="4" :offset="3" class="label-text">
                        <span>节点名称：</span>
                    </Col>
                    <Col :span="12">
                        <Input v-model="operationObjectData.custTreeNodeName"></Input>
                    </Col>
                </Row>
            </div>
        </Dialog>
        <!-- 修改树弹窗E -->

        <!-- 右边弹窗S -->
        <LeftDialog ref="leftDialog">
            <div class="dialog_header">
                <div class="d-h-title">
                    <div class="h-t-top h-t-identical">
                        当前树：{{operationObjectData.custTreeNodeName}}	
                    </div>
                    <div class="h-t-right">
                        <div class="btn-save" @click="handleConfirm">确定</div>
                    </div>
                </div>
            </div>
            <div class="dialog-content">
                <div class="tree-content">
                    <Scroll :isShowRight="true" :isShowBottom="true" ref="listScroll">
                        <Treets :folder="treeData" :currentNodeName="operationObjectData.custTreeNodeName"></Treets>
                    </Scroll>
                </div>
            </div>
		</LeftDialog>
        <!-- 右边弹窗 -->
	</div>
</template>

<script type="text/javascript">
    import TreeList from './group/tree-list/src/main.vue'
    import Treets from './group/add-tree/tree-folder.vue'
	export default{
		data(){
			return{
				pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 10,    // 每页条数
                },
                tipInfo: {
                	iconType:1,
                	msg:'',
                	showBtn:{
                		clear: true,
                		save: true
                	}
                },
				userRightBtnControl: {			// 权限按钮控制
                    showAddBtn: false
                },
                treeListData: [],
                objData: [{
                	key: 'custTreeNodeName',
                	span: 20
                },{
                    key: 'updateDate',
                	span: 6
                }],
                modifyDialogTitle: '修改',
                modifyDialogSize: {
                    max: 500
                },
                operation: {
                    span: 4,
                    after: 0,
                    list: [
                        // {
                        //     label: '添加子节点',
                        //     key: 'addNode'
                        // },
                        // {
                        //     label: '修改',
                        //     key: 'modify'
                        // },
                        // {
                        //     label: '删除',
                        //     key: 'delete'
                        // }
                    ]
                },
                operationObjectData: {},     // 点击操作的数据对象
                treeData: {},
                currentClickObj: {},        // 当前点击的对象存起来
                conditionSearchData:[
                {
                    iconfont: 'iconkhbs',
                    placeholder:'客户树名称搜索',
                    param: 'custTreeName'
                }],
                stateBtnFlag: false,         // 修改标志
                searchText: '',              // 存储搜索的文本
            }
        },
        mounted () {
            this.getTreeList();
			// 循环权限功能
			this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case "F-CMB-100401":
                        this.userRightBtnControl.showAddBtn = true;
                        break;
                    case "F-CMB-100404":
                        this.operation.list.unshift({
                            label: '添加子节点',
                            key: 'addNode'
                        })
                        break;
                    case "F-CMB-100402":
                        this.operation.list.push({
                            label: '修改',
                            key: 'modify'
                        })
                        break;
                    case "F-CMB-100403":
                        this.operation.list.push({
                            label: '删除',
                            key: 'delete'
                        })
                        break;
                    default:
                        break;
                }
            })
        },
        methods:{
            // 点击添加
			addClick(){
				this.$emit('componentView','add')
            },

            // 搜索树
            handleSearchTree (data) {
                this.searchText = data.custTreeName
                this.getTreeList()
            },
            
            // 查询树列表
            getTreeList (pageIndex = 1) {
                this.$axios.get(this.$api.clientTree, {
                    params: {
                        custTreeName: this.searchText || '',
                        pageNumber: pageIndex,
                        pageSize: this.pageInfo.pageSize
                    }
                }).then(res => {
                    if(res.data.length) {
                        let treeList = res.data
                        this.pageInfo.pageIndex = pageIndex       
                        this.treeListData = treeList.filter(item => {
                            item['custTreeNodeName'] = item.custTreeName
                            return item
                        })
                    } else {
                        this.$message.warning({message: '暂无数据'})
                    }
                }).catch(err => {
                    this.$message.error({message: err.response.data.message})
                })
            },

            // 点击列表获取树的数据
            handleTreeNodeList (obj) {
                if (obj.childerNode.length) return
                this.getClientTreeDetail(obj)
            },

            // 获取客户树详情数据
            getClientTreeDetail (obj) {
                this.currentClickObj = obj;         // 将当前数据存起来，供下面使用
                this.$axios.get(this.$api.clientTree + `/${obj.custTreeId}`).then(res => {
                    if (res) {
                        obj.childerNode = res.data.childerNode;
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 点击操作按钮
            operationClick (val) {
                let labelText = val.item.key
                /* 将点击的层级用标识记录下来 */
                if (val.currentLevel === 1) {
                    this.stateBtnFlag = true
                } else {
                    this.stateBtnFlag = false
                }
                switch (labelText) {
                    // 添加子节点
                    case 'addNode':           
                        this.operationObjectData = JSON.parse(JSON.stringify(val.data));
                        this.$refs.leftDialog.show();
                        this.treeData = {};
                        break;
                    // 修改
                    case 'modify':
                        this.operationObjectData = JSON.parse(JSON.stringify(val.data));
                        this.$refs.modifyDialog.show();
                        break;
                    // 删除
                    case 'delete':                   
                        this.operationObjectData = val.data;
                        if (val.currentLevel === 1 && (this.operationObjectData.childerNode.length)) {
                            // 表示是根节点，并且有子节点
                            this.$message.warning({"message": "请先删除子节点"})
                        } else {
                            this.tipInfo.iconType = 3;
                            this.tipInfo.msg = `确认要删除吗？`;
                            this.tipInfo.showBtn.clear = true;
                            this.tipInfo.showBtn.save = true;
                            this.$refs.tip.show();
                        }
                        break;
                    default:
                        break;
                }
            },

            // 修改接口
            handleModifyConfrim () {
                // 根节点的对象数据
                let modifyObj1 = {
                    custTreeId: this.operationObjectData.custTreeId,
                    custTreeName: this.operationObjectData.custTreeNodeName
                }
                // 子节点的对象数据
                let modifyObj2 = {
                    custTreeNodeId: this.operationObjectData.custTreeNodeId,
                    custTreeNodeName: this.operationObjectData.custTreeNodeName
                }
                // stateBtnFlag为true，则表示点击的是根节点，反之为子节点
                this.$axios({
                    method: 'patch',
                    url: this.stateBtnFlag ? this.$api.clientTree + `/${this.operationObjectData.custTreeId}` : this.$api.clientTreeChildNode,
                    data: this.stateBtnFlag ? modifyObj1 : modifyObj2
                }).then(res => {
                    if (res.data) {
                        this.$message.success({"message": "修改成功"});
                        this.$refs.modifyDialog.hide();
                        if (this.stateBtnFlag) {
                            // 表示修改的是根节点，调用列表
                            this.getTreeList()
                        } else {
                            // 子节点，调用查询客户树详情
                            this.getClientTreeDetail(this.currentClickObj)
                        }
                    } else {
                        this.$message.error({"message": "修改失败"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 删除接口
            tipConfirm () {
                let deleteId = this.stateBtnFlag ? this.operationObjectData.custTreeId : this.operationObjectData.custTreeNodeId;
                let deleteUrl = this.stateBtnFlag ? this.$api.clientTree : this.$api.clientTreeChildNode;
                this.$axios.delete(deleteUrl + `/${deleteId}`)
                    .then(res => {
                        if (res.data) {
                            this.$message.success({"message": "删除成功"});
                            this.$refs.tip.hide();
                            if (this.stateBtnFlag) {
                                // 表示修改的是根节点，调用列表
                                this.getTreeList()
                            } else {
                                // 子节点，调用查询客户树详情
                                this.getClientTreeDetail(this.currentClickObj)
                            }
                        } else {
                            this.$message.error({"message": "删除失败"});
                        }
                    }).catch(err => {
                        this.$message.error({"message": err.response.data.message})
                    })
            },

            // 右边弹出框确定
            handleConfirm () {
                let userStorage = this.$user.getUserStorage();
                // 根节点的对象数据
                let addObj1 = {
                    createDate: '',
                    createStaff: userStorage.staffId,
                    custTreeDesc: '',
                    custTreeId: this.operationObjectData.custTreeId,
                    custTreeName: this.operationObjectData.custTreeNodeName,
                    custTreeType: '1000',
                    remark: '',
                    statusCd: userStorage.statusCd,
                    statusDate: '',
                    updateDate: '',
                    updateStaff: userStorage.staffId,
                    siebelRowId: '',
                    childerNode: this.treeData.childerNode
                }
                // 子节点的对象数据
                let addObj2 = {
                    createDate: '',
                    createStaff: userStorage.staffId,
                    custTreeDesc: '',
                    custTreeId: this.operationObjectData.custTreeId,
                    custTreeNodeId: this.operationObjectData.custTreeNodeId,
                    custTreeNodeName: this.operationObjectData.custTreeNodeName,
                    custTreeType: '1000',
                    remark: '',
                    statusCd: userStorage.statusCd,
                    statusDate: '',
                    updateDate: '',
                    updateStaff: userStorage.staffId,
                    siebelRowId: '',
                    childerNode: this.treeData.childerNode
                }
                 this.$axios({
                    method: 'post',
                    url: this.$api.clientTreeChildNode,
                    data: this.stateBtnFlag ? addObj1 : addObj2
                }).then(res => {
                    if (res.data) {
                        this.$message.success({"message": "新增成功"});
                        this.$refs.leftDialog.hide();
                        this.getClientTreeDetail(this.currentClickObj)
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

			// 分页
			pageChange(val){
				this.getTreeList(val)
			}
        },
        components: {
            TreeList,
            Treets
        }
	}
</script>

<style scoped lang="scss">
	.list{
		padding: 80px 0;
		width: 100%;
		height: 100%;

		.header{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 80px;

			.h-all{

				padding: 20px 20px 0;

				.h-a-title{
					.left-title{
						float: left;
					}
					p:first-child{
						font-size: 24px;
						color: #373f45;
					}
					p:last-child{
						padding-top: 4px;
						font-size: 12px;
						color: #373f45;

						span{
							color: #5a8af2;
						}
					}
					
					.searchMain{
                        margin-top: 5px;
						float: left;
					}

					.a-t-name{
						display: inline-block;
						height: 100%;
						line-height: 50px;
						font-weight: bold;
						padding-left: 20px;
						background-image: url(./images/all.png);
						background-repeat: no-repeat;
						background-position: 0px;
					}

					.a-t-search{
						display: inline-block;
						height: 100%;
						line-height: 50px;
						padding-left: 30px;

						.t-s-name{
							display: inline-block;
							padding-left: 20px;
							background-image: url(./images/select_content.png);
							background-repeat: no-repeat;
							background-position: 0px;
							vertical-align: middle;
						}

						.t-s-item{
							display: inline-block;
							height: 30px;
							line-height: 30px;
							padding: 0 10px;
							margin-right: 35px;
							border: 1px solid #f1f5fa;
							vertical-align: middle;
							
							.s-i-name{
								color: #5a8af2;
							}

							.s-i-close{
								display: block;
								position: absolute;
								width: 26px;
								height: 30px;
								top: -1px;
								right: -26px;
								background-image: url(./images/close.png);
								background-repeat: no-repeat;
								background-position: 0px;
								cursor: pointer;
							}
						}
					}
					
				}

				.h-a-add{
					position: absolute;
					top: 25px;
					right: 10px;
					height: 30px;
				}
			}
		}

        .main {
            width: 100%;
            height: 100%;
            padding: 0 20px;
            .tree-list-style {
                margin: 10px 0;
                border: 1px solid #f6f6f6;
                border-radius: 5px;
            }
        }

        // 修改弹窗
        .modify-header {
            padding: 20px 0 0 0;
            .label-text {
                line-height: 30px;
            }
        }
            
        // 右边弹窗
        .dialog_header {
            height: 60px;
            padding-left: 20px;
            background-color: #f7fbfd;

            .d-h-title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                .h-t-identical {
                    margin-left: 25px;
                    padding-left: 30px;
                    float: left;
                    font-size: 16px;
                    font-weight: bold;
                }
                .h-t-top {
                    background: url('./images/first.png') no-repeat;
                    background-position: 0;
                }

                .h-t-right {
                    margin-right: 40px;
                    float: right;
                    .btn-save {
                        position: absolute;
                        display: block;
                        top: 10px;
                        right: 10px;
                        width: 60px;
                        height: 30px;
                        line-height: 30px;
                        padding: 0 10px;
                        border-radius: 5px;
                        background: #5a8af2;
                        color: #fff;
                        text-align: center;
                        cursor: pointer;
                        &:hover {
                            opacity: .8;
                        }
                    }
                }
            }

            .d-h-info {
                padding-left: 50px;
            }
        }
        .dialog-content{
            padding: 0 0 40px 20px;
            width: 100%;
            height: calc(100% - 30px);
            background-color: #f7fbfd;

            .tree-content {
                width: 100%;
                height: 100%;
                padding: 20px;
                background-color: #ffffff;
            }
        }

		.footer{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			box-shadow: 0 -2px 0 #f1f5fa;

			.pagination{
				height: 50px;
			}
		}
	}
</style>