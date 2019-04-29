<template>
    <div>
        <Row :style="rowStyle" class="line">
            <Col :width="100" v-if="isShowOperate.showSelect">
                <span>{{nodeType}}：</span>
            </Col>
            <Col :width="140" v-if="isShowOperate.showSelect">
                <Select :data="auditorData" v-model="auditorData.value" :isNullSel="false"></Select>
            </Col>
            
            <Col :width="80" :style="styleObject">
                <span>{{nodeText}}：</span>
            </Col>
            <Col :width="180">
                <Input disabled="disabled" :value="currentNodeName" :placeholder="placeholder" v-if="curLevel == 1"></Input>
                <Input maxlength="0" v-if="curLevel !== 1" @click.native="openDialog" :value="folder.custName"></Input>
            </Col>
            <Col :width="100" class="right-operate" @click.native.stop="addChild">
                <i class="add-icon"></i>
                <span class="childnode-text">添加子节点</span>
            </Col>
            <Col :width="60" class="right-operate" v-if="isShowOperate.showDelete">
                <i class="delete-icon"></i>
                <span @click="deleteChild" class="delete-text">删除</span>
            </Col>
        </Row>
        <TreeFolderContent :children="folder[childrenStr]"
            :curLevel="curLevel"/>

        <!-- 客户S -->
        <Dialog ref="clientDialog" :dialogTitle="clientDialogTitle" :dialogSize="clientDialogSize" @confirm="handleClientConfirm">
            <div class="add-header">
                <Row>
                    <Col :span="12">
                        <Search placeholder="请输入客户标识" @search="handleSearchClient"></Search>
                    </Col>
                </Row>
            </div>

            <div class="table-style">
                <Scroll class="app__table" fixedTopClassName="m-title" ref="listScroll">
                    <DragGroup class="m-title app__table-thead" :titleList="clientData" @dragchange="dragchange">
                        <Col :span="2"></Col>

                        <DragItem :span="item.span" 
                            :value="item"
                            v-for="(item,index) in clientData"
                            :key="index">
                            <span>{{item.name}}</span>
                        </DragItem>
                    </DragGroup>
                    <Row :class="['m-item app__table-item']" v-for="(customer,index) in clientItemData" :key="index" @click.native="currentRadioSelect(customer)">
                        <Col :span="2">
                            <Radio name="customer" :label="customer" v-model="radioData"></Radio>
                        </Col>
                        <Col :span="item.span" class="col-overflow"
                            :title="customer[item.param]"
                            v-for="(item,index) in clientData"
                            :key="index">
                            <span>{{customer[item.param]}}</span>
                        </Col>
                    </Row>
                    <div v-if="!clientItemData.length" class="app__data-none">
                        <span>当前无数据 请先选择客户</span>
                    </div>
                </Scroll>
            </div>
        </Dialog>
        <!-- 客户E -->

        <!-- 设备号S -->
        <Dialog ref="deviceDialog" :dialogTitle="deviceDialogTitle" :dialogSize="clientDialogSize" @confirm="handleDeviceConfrim">
            <div class="add-header">
                <Row>
                    <Col :span="12">
                        <Search placeholder="请输入设备号" @search="handleSearchDevice"></Search>
                    </Col>
                </Row>
            </div>

            <div class="table-style">
                <Scroll class="app__table" fixedTopClassName="m-title" ref="listScroll">
                    <DragGroup class="m-title app__table-thead" :titleList="deviceData" @dragchange="dragchange">
                        <Col :span="2"></Col>

                        <DragItem :span="item.span" 
                            :value="item"
                            v-for="(item,index) in deviceData"
                            :key="index">
                            <span>{{item.name}}</span>
                        </DragItem>
                    </DragGroup>
                    <Row :class="['m-item app__table-item']" v-for="(customer,index) in deviceItemData" :key="index" @click.native="currentDeviceRadioSelect(customer)">
                        <Col :span="2">
                            <Radio name="customer" :label="customer" v-model="radioData2"></Radio>
                        </Col>
                        <Col :span="item.span" class="col-overflow"
                            :title="customer[item.param]"
                            v-for="(item,index) in deviceData"
                            :key="index">
                            <span>{{customer[item.param]}}</span>
                        </Col>
                    </Row>
                    <div v-if="!deviceItemData.length" class="app__data-none">
                        <span>当前无数据 请先选择客户</span>
                    </div>
                </Scroll>
            </div>
        </Dialog>
        <!-- 设备号E -->
    </div>
</template>

<script type="text/javascript">
	export default{
		props:{
			folder:{//显示对象
				type: Object,
				default: {}
			},
			childrenStr:{//子级字段名称
				type: String,
				default: 'childerNode'
			},
			curLevel:{//当前层级
				type:Number,
				default:1
            },
            currentNodeName: {
                type: String,
                default: ''
            }
		},
		data () {
			return {
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 5,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 1      // 总条数
                },
				rowStyle:{
                    marginLeft: 0
                },
                auditorData: [{
					value: '客户',
					label: '客户'
				}],
                placeholder: '',
                nodeText: '节点名称',
                nodeType: '节点类型',
                styleObject: {
                    marginLeft: '4.16667%'
                },
                isShowOperate: {
                    showDelete: true,
                    showSelect: true
                },
                clientDialogTitle: '请选择客户',
                deviceDialogTitle: '请选择设备号',
                clientDialogSize: {
                    max: 820
                },
                clientData:[                    // 客户
                    {
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
                    }
                ],
                radioData: {},
                radioData2: {},
                clientItemData: [],
                deviceData:[                    // 设备号
                    {
                        name: '客户名称',
                        param:'custName',
                        span: 8
                    },{
                        name:'设备号',
                        param:'accNum',
                        span: 7
                    },{
                        name:'客户地址',
                        param:'custAddr',
                        span: 7
                    }
                ],
                deviceItemData: []
			}
		},
		beforeCreate: function () {
			this.$options.components.TreeFolderContent = require('./tree-folder-content.vue').default
		},
		mounted(){
            switch (this.curLevel) {
                case 1:
                    this.isShowOperate.showDelete = false;
                    this.isShowOperate.showSelect = false;
                    this.nodeText = '树名称';
                    this.styleObject.marginLeft = 5 + 'px';
                    break;
                case 2:
                    this.nodeType = '根节点类型'
                default:
                    break;
            }
            this.rowStyle.marginLeft = `${(this.curLevel - 1) * 60}px`;
		},
		methods:{
            // 添加节点
			addChild(){
                if (this.curLevel !== 1 && this.auditorData.value == undefined) {
                    this.$message.warning({"message": "请选择节点类型"});
                    return;
                }
                
				if(!this.folder[this.childrenStr]){
					this.$set(this.folder,this.childrenStr,[])
                }
                let userStorage = this.$user.getUserStorage();
				this.folder[this.childrenStr].push({
					createDate: '',
                    createStaff: userStorage.staffId,
                    custId: '',
                    custTreeLevel: '',
                    custTreeNodeCode: '',
                    custTreeNodeId: '',
                    custTreeNodeName: '',
                    leafFlag: 1,
                    parentNodeId: null,
                    remark: null,
                    statusCd: userStorage.statusCd,
                    statusDate: '',
                    updateDate: '',
                    updateStaff: userStorage.staffId,
                    siebelRowId: '1',
                    custNumber: null
				})
            },
            
            // 删除节点
            deleteChild () {               
                this.$emit('deletes')
            },

            // 打开弹窗
            openDialog () {
                if (this.auditorData.value == undefined) {
                    this.$message.warning({"message": "请选择设备号"});
                    return;
                }
                if (this.auditorData.value == '客户') {
                    this.$refs.clientDialog.show()
                } else {
                    this.$refs.deviceDialog.show()
                }
            },

            // 点击客户搜索
            handleSearchClient (data) {
                this.getClientList(data)
            },

            // 设备号搜索
            handleSearchDevice (data) {
                let reg = /^[A-Za-z0-9-]+$/g;
                if (reg.test(data)) {
                    this.getDeviceList(data)
                } else {
                    this.$message.warning({"message": "请输入正确设备号"});
                }
            },

            // 查询客户列表服务
            getClientList (custNumber) {
                this.$axios.get(this.$api.adddClientDistribution, {
					params: {
                        custId: '',
                        custNumber: custNumber ? custNumber : '',
                        custName: '',
                        accNum: '',
						sysRoleName: '',
						pageNumber: this.pageInfo.pageIndex,
						pageSize: this.pageInfo.pageSize
					}
				}).then((res) => {
					this.clientItemData = res.data
				})
            },

            // 查询设备号列表服务
            getDeviceList (accNum) {
                this.$axios.get(this.$api.adddClientDistribution, {
					params: {
                        custId: '',
                        custNumber: '',
                        custName: '',
                        accNum: accNum ? accNum : '',
						sysRoleName: '',
						pageNumber: this.pageInfo.pageIndex,
						pageSize: this.pageInfo.pageSize
					}
				}).then((res) => {
                    this.deviceItemData = res.data
				})
            },

            // 客户保存
            handleClientConfirm () {
                let userStorage = this.$user.getUserStorage();
                this.folder.custId = this.radioData.custId;
                this.folder.custTreeLevel = this.curLevel;
                this.folder.custNumber = this.radioData.custNumber;
                this.folder.custTreeNodeName = this.radioData.custName
                this.folder.createStaff = userStorage.staffId;
                this.folder.updateStaff = userStorage.staffId;
                this.$set(this.folder, 'custName', this.radioData.custName)
                this.$refs.clientDialog.hide()
            },

            // 设备号保存
            handleDeviceConfrim () {
                let userStorage = this.$user.getUserStorage();
                this.folder.custId = this.radioData2.custId;
                this.folder.custTreeLevel = this.curLevel;
                this.folder.custNumber = this.radioData2.custNumber;
                this.folder.custTreeNodeName = this.radioData2.custName
                this.folder.createStaff = userStorage.staffId;
                this.folder.updateStaff = userStorage.staffId;
                this.$set(this.folder, 'custName', this.radioData2.custName)
                this.$refs.deviceDialog.hide()
            },

            // 拖拽
            dragchange(val){
				this.tableTitleData = val;
            },
            
            // 点击列表选中radio
            currentRadioSelect (data) {
                this.radioData = data
            },

            currentDeviceRadioSelect (data) {
                this.radioData2 = data
            }
		}
	}
</script>

<style lang="scss" scoped>
    .line {
        margin: 0 0 20px 0;
        white-space: nowrap;
    }
    .right-operate {
        margin-left: 15px;
        padding-top: 2px;
        font-size: 12px;
        cursor: pointer;
        .add-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url('./images/plus.png') no-repeat center;
            background-size: cover;
            vertical-align: sub;
        }
        .delete-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url('./images/delete_red.png') no-repeat center;
            background-size: cover;
            vertical-align: sub;
        }
        .childnode-text {
            color: #a0d468;
        }
        .delete-text {
            color: #f19167;
        }
    }

    .add-header {
        padding: 10px 20px 0 ;
    }
    .table-style {
		padding: 10px 20px 20px;
        .col-overflow {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
        }
	}
</style>