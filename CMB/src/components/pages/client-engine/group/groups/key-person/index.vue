<!-- 政企关键人-->
<template>
    <div class="expand-warp">
        <div class="app__title-1">
            <span class="app__title-name">政企关键人</span>
        </div>
        <span class="btn-add" @click="addDialog" v-if="userRightBtnControl.addBtn">
            <i class="iconfont icontianjia"></i>
        </span>
        <Scroll ref="listScroll" class="app__table expand-content" :isShowRight="true" fixedTopClassName="m-title">
            <DragGroup class="m-title app__table-thead" :titleList="tableTitleData">
                <DragItem :span="item.span" 
                    :value="item"
                    v-for="(item,index) in tableTitleData"
                    :key="index">
                    <span>{{item.name}}</span>
                </DragItem>
                <Col :span="4">
                    <span>操作</span>
                </Col>
            </DragGroup>
            <Row :class="['m-item app__table-item']" v-for="(table,index) in tableItemData" :key="index">
                <Col :span="item.span"
                    v-for="(item,index) in tableTitleData"
                    :key="index">
                    <span v-if="item.param == 'createDate'">
                        {{table[item.param] | getLocalTime}}
                    </span>
                    <span v-else>
                        {{table[item.param]}}
                    </span>
                </Col>
                <Col :span="4">
                    <span class="review" @click="handleChange(table)" v-if="userRightBtnControl.updateBtn">修改</span>
                    <span class="review" @click="handleDelete(table)" v-if="userRightBtnControl.deleteBtn">删除</span>
                </Col>    
            </Row>
            <Row :class="['m-item app__table-item']" v-for="empty in 15 - tableItemData.length" :key="empty.id">	
            </Row>
            <div v-if="!tableItemData.length" class="app__data-none">
                <span>当前暂无数据 请添加</span>
            </div>
        </Scroll>

        <!-- 关键人新增S -->
        <Dialog ref="modalType" :dialogTitle="keyPersonDialog" :dialogSize="dialogSize" :initBtn="true">
            <Row class="modal-content">
                <Form labelWidth="120px" labelAlign="left">
                    <Col :span="24">
                        <FormItem labelText="权益享受人：" :requiredIcon="true" :errorMessage="errors.first('custName')">
                            <Input maxlength="0" name="custName" data-vv-as="权益享受人" v-validate="!keyPersonOperateData.custName ? 'required' : ''" :readonly="readonly" @click.native.stop="operateFlag ? openSelectEquity() : ''" v-model="keyPersonOperateData.custName"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="24">
                        <FormItem labelText="被邀请人联系电话: " :errorMessage="errors.first('contactPhone')">
                            <Input name="contactPhone" data-vv-as="被邀请人联系电话" v-validate="'required|mobile'" v-model.trim="keyPersonOperateData.contactPhone"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="24">
                        <FormItem labelText="星级分值: ">
                            <Select :data="starScoreData" v-model="keyPersonOperateData.starScore" :isNullSel="false"></Select>
                        </FormItem>
                    </Col>
                    <Col :span="24">
                        <FormItem labelText="被邀请人姓名：">
                            <Input v-model="keyPersonOperateData.keyPersonName"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="24">
                        <FormItem labelText="被邀请人职务：">
                            <Input v-model="keyPersonOperateData.position"></Input>
                        </FormItem>
                    </Col>
                </Form>
            </Row>
            <div slot="btnBox">
                <span class="save" @click="handleSave">保存</span>
                <span class="back" @click="handleBack">返回</span>
            </div>
        </Dialog>
        <!-- 关键人新增E -->

        <!-- 权益享受人弹窗S -->
        <Dialog ref="selectEquity" :dialogTitle="selectDialogTitle" :dialogSize="selectEquityDialogSize" @confirm="handleSaveEquity">
            <div class="equity-header">
                <Row>
                    <Col :span="12">
                        <Search placeholder="请输入权益享受人标识" @search="handleSearch"></Search>
                    </Col>
                </Row>
            </div>

            <div class="manager-top">
                <Scroll class="app__table" fixedTopClassName="m-title">
                    <DragGroup class="m-title app__table-thead" :titleList="tableTitleData">
                        <Col :span="3"></Col>

                        <DragItem :span="item.span" 
                            :value="item"
                            v-for="(item,index) in selectEquityItemTitle"
                            :key="index">
                            <span>{{item.name}}</span>
                        </DragItem>
                    </DragGroup>
                    <Row :class="['m-item app__table-item']" class="list-cursor"
                            v-for="(customer,index) in selectEquityData" :key="index" @click.native="selectCurrentList(customer)">
                        <Col :span="3">
                            <Radio name="customer" :label="customer" v-model="radioData"></Radio>
                        </Col>
                        <Col :span="item.span"
                            :title="customer[item.param]"
                            v-for="(item,index) in selectEquityItemTitle"
                            :key="index">
                            <span>{{customer[item.param]}}</span>
                        </Col>
                    </Row>
                    <div v-if="!selectEquityData.length" class="app__data-none">
                        <span>当前暂无数据 请添加权益人</span>
                    </div>
                    <Pagination v-if="selectEquityData.length" :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
                    </Pagination>
                </Scroll>
            </div>
        </Dialog>
        <!-- 权益享受人弹窗E -->

        <!-- 删除弹窗S -->
        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm"></Tip>
        <!-- 删除弹窗E -->
    </div>
</template>
<script type="text/javascript">
    export default{
        props: {
            componentData: {}
        },
        data(){
            return{
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 10,    // 每页条数
				},
                tipInfo: {
                    iconType: 1,
                    msg: "",
                    showBtn: {
                        clear: true,
                        save: true
                    }
                },
                custId: '',
                tableTitleData:[
                    {
                        name: '权益享受人',
                        param: 'custName',
                        span: 3
                    },{
                        name: '权益享受人客户标识',
                        param: 'custId',
                        span: 4
                    },{
                        name: '星级分值',
                        param: 'starScore',
                        span: 3
                    },{
                        name:'被邀请人姓名',
                        param:'keyPersonName',
                        span: 3
                    },{
                        name:'被邀请人联系电话',
                        param:'contactPhone',
                        span: 4
                    },{
                        name:'被邀请人职务',
                        param:'position',
                        span: 3
                    }
                ],
                tableItemData: [],
                keyPersonDialog: '',
                dialogSize: {
                    max: 400
                },
                deleteData: {},                 // 存储删除的数据
                keyPersonOperateData: {},       // 新增
                selectDialogTitle: '添加权益享受人',
                readonly: false,
                selectEquityDialogSize: {
                    max: 800
                },
                selectEquityItemTitle: [
                     {
                        name: '权益享受人',
                        param: 'custName',
                        span: 5
                    },{
                        name: '权益享受人客户标识',
                        param: 'custNumber',
                        span: 5
                    },{
                        name: '客户类型',
                        param: 'custType',
                        span: 5
                    },{
                        name:'证件号码',
                        param:'certNum',
                        span: 6
                    }
                ],
                starScoreData: [            // 星级分值
                    {
                        label: '4000',
                        value: '4000'
                    },{
                        label: '6000',
                        value: '6000'
                    },{
                        label: '8000',
                        value: '8000'
                    }
                ],
                operateFlag: true,          // 判断是新增、还是修改
                selectEquityData: [],
                radioData: {},
                userRightBtnControl: {          // 权限按钮控制
                    addBtn: false,
                    updateBtn: false,
                    deleteBtn: false
                },
                searchText: ''          // 存放搜索的值
            }
        },
        mounted () {
            this.getListData(this.componentData.custId)
            // 循环权限数据
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100608':
                        this.userRightBtnControl.addBtn = true;
                        break;
                    case 'F-CMB-100609':
                        this.userRightBtnControl.updateBtn = true;
                        break;
                    case 'F-CMB-100610':
                        this.userRightBtnControl.deleteBtn = true;
                        break;
                    default:
                        break;
                }
            })
        },
        methods: {
            // 列表数据
            getListData (custId) {
                this.$axios.get(this.$api.keyPerson + '/detail', {
                    params: {
                        custId: custId
                    }
                }).then(res => {
                    this.tableItemData = res.data
                    this.$nextTick( () => {
                        this.$refs.listScroll.init();
                    })
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 添加
            addDialog () {
                this.keyPersonDialog = '新增关键人'
                this.$refs.modalType.show();
                this.keyPersonOperateData = {}
                this.operateFlag = true
                this.readonly = false
            },

            // 添加，打开权益享受人弹窗
            openSelectEquity () {
                this.$refs.selectEquity.show()
            },

            // 搜索权益享受人
            handleSearch (data) {
                this.searchText = data
                this.getEquityList(this.searchText, this.pageInfo.pageIndex)
            },

            // 权益享受人接口
            getEquityList (custNumber, pageIndex) {
                this.$axios.get(this.$api.CustomerList, {
                    params: {
                        custType: '1100',
                        custNumber: custNumber || '',
                        pageNumber: this.pageInfo.pageIndex,
                        pageSize: 5,
                        pageNum: pageIndex
                    }
                }).then(res => {
                    if (res.data.length) {
                        this.selectEquityData = res.data
                        this.pageInfo.pageIndex = pageIndex
                    } else {
                        this.$message.warning({message: '暂无数据'})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 保存权益享受人
            handleSaveEquity () {
                if (this.radioData.custId !== undefined) {
                    this.$set(this.keyPersonOperateData, 'custName', this.radioData.custName)
                    this.$set(this.keyPersonOperateData, 'partyId', this.radioData.partyId)
                    this.$set(this.keyPersonOperateData, 'custId', this.radioData.custId)
                    this.$refs.selectEquity.hide()
                } else {
                    this.$message.warning({"message": "请选择一条数据"})
                    return
                }
            },

            // 新增、修改保存
            handleSave () {
                this.$validator.validateAll().then((result) => {
                    if(!result){
                        return
                    } else {
						 if (this.keyPersonOperateData.partyId !== undefined) {
                            let createStaff = this.$user.getStaffId()

                            let operateData = {
                                contactEmail: this.keyPersonOperateData.contactEmail,
                                contactPhone: this.keyPersonOperateData.contactPhone,
                                createDate: this.keyPersonOperateData.createDate,
                                createStaff: createStaff,
                                custId: this.componentData.custId,
                                custNumber: this.keyPersonOperateData.custNumber,
                                decisionAffect: this.keyPersonOperateData.decisionAffect,
                                dept: this.keyPersonOperateData.dept,
                                keyPersonDesc: this.keyPersonOperateData.keyPersonDesc,
                                keyPersonId: this.keyPersonOperateData.keyPersonId,
                                keyPersonName: this.keyPersonOperateData.keyPersonName,
                                keyPersonType: "10",
                                partyId: this.keyPersonOperateData.partyId,
                                position: this.keyPersonOperateData.position,
                                remark: this.keyPersonOperateData.remark,
                                statusCd: this.keyPersonOperateData.statusCd,
                                statusDate: this.keyPersonOperateData.statusDate,
                                updateDate: this.keyPersonOperateData.updateDate,
                                updateStaff: this.keyPersonOperateData.updateStaff,
                                starScore: this.keyPersonOperateData.starScore
                            }

                            this.$axios({
                                method: this.operateFlag ? 'post' : 'put',      // 为true 表示新增，反之修改
                                url: this.operateFlag ? this.$api.keyPerson : this.$api.keyPerson + `/${this.keyPersonOperateData.keyPersonId}`,
                                data: operateData
                            }).then(res => {
                                if (res.data) {
                                    this.$message.success({"message": "成功"})
                                    this.getListData(this.componentData.custId);
                                    this.$refs.modalType.hide()
                                }
                            }).catch(err => {
                                this.$message.error({"message": err.response.data.message})
                            })
                        } else {
                            this.$message.warning({"message": "请选择权益享受人"})
                        }
					}
                })
               
            },

            // 修改
            handleChange (data) {
                this.$refs.modalType.show()
                this.keyPersonDialog = '修改关键人'
                this.keyPersonOperateData = Object.assign({}, data)
                this.operateFlag = false
                this.readonly = true
            },

            // 点击删除按钮
            handleDelete (data) {
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `确认要删除吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
                this.deleteData = data;
            },

            // 确认删除
            tipConfirm () {
                this.$axios.delete(this.$api.keyPerson + `/${this.deleteData.keyPersonId}`).then(res => {
                    if (res.data) {
                        this.$message.success({"message": "删除成功"})
                        this.getListData(this.componentData.custId)
                        this.$refs.tip.hide();
                    } else {
                        this.$message.error({"message": "删除失败"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 返回
            handleBack () {
                this.$refs.modalType.hide()
            },

            // 点击列表选定单选
            selectCurrentList (data) {
                this.radioData = data
            },

            // 分页
            pageChange (val) {
                this.getEquityList(this.searchText, val)
            },

            changeHeight() {
            },
            changeLow() {
            }
        }
    }
</script>
<style scoped lang="scss">
    .expand-warp {
        padding: 20px;
        background-color: #fff;
        margin-top: 10px;
        box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);
        .btn-add  {
            display: block;
            position: absolute;
            top: 24px;
            right: 0;
            z-index: 99;
            padding: 3px 0 0 22px;
            background-color: #5a8af2;
            width: 50px;
            height: 24px;
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px;
            color: #ffffff;
            cursor: pointer;

            &:hover {
                background-color: #4e80ec;
            }

            i {
                color: #ffffff;
                font-size: 13px;
            }
        }
        .expand-content {
            width: 100%;
            font-size: 12px;
            .review {
                color: $mainColor;
                cursor: pointer;
            }
        }

        .modal-content {
            padding: 30px 20px;
        }
        .equity-header {
            padding: 10px;
        }
        .list-cursor {
            cursor: pointer;
        }
    }
</style>