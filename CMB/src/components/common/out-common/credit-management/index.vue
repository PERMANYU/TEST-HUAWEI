<!--信用度管理-->
<template>
    <div class="expand-warp">
        <div class="app__title-1">
            <span class="app__title-name">信用度管理</span>
        </div>
        <!-- <span class="btn-add" @click="handleAddModal" v-if="componentData.credit">
            <i class="iconfont icontianjia"></i>
        </span> -->
        <Scroll class="app__table" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title">
            <DragGroup class="m-title app__table-thead" :titleList="tableTitleData">
                <DragItem :span="item.span" 
                    :value="item"
                    v-for="(item,index) in tableTitleData"
                    :key="index">
                    <span>{{item.name}}</span>
                </DragItem>
                <Col :span="4" class="app__table-right">
                    <span>操作</span>
                </Col>
            </DragGroup>
            <Row :class="['m-item app__table-item']" v-for="(table,index) in tableItemData" :key="index">
                <Col :span="item.span"
                    v-for="(item,index) in tableTitleData"
                    :key="index">
                    <span v-if="item.param == 'expDate'">
                        {{table[item.param] | getLocalTime}}
                    </span>
                    <span v-else>
                        {{table[item.param]}}
                    </span>
                </Col>
                <Col :span="4" class="app__table-right">
                    <span class="review" @click="handleModify(table)" v-if="componentData.credit">修改</span>   
                </Col>
            </Row>
            <div v-if="!tableItemData.length" class="app__data-none">
                <span>当前暂无数据 请添加</span>
            </div>
        </Scroll>

        <!-- 信用度新增S -->
        <Dialog ref="modalType" :dialogTitle="creditTitle" :dialogSize="dialogSize" :initBtn="true">
            <div class="modal-content">
                <Scroll :isShowRight="true">
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="24">
                                <FormItem labelText="信用度等级：" :requiredIcon="true" :errorMessage="errors.first('creditLevel')">
                                    <Select name="creditLevel" data-vv-as="信用度等级" v-validate="'required'" dataLabelStr="attrValueName" dataValueStr="attrValue" :data="creditData" v-model="creditObj.creditLevel" :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="24">
                                <FormItem labelText="失效时间: " :requiredIcon="true" :errorMessage="errors.first('expDate')">
                                    <DatePicker name="expDate" data-vv-as="失效时间" v-validate="'required'" @input="handleDate" v-model="creditObj.expDate"></DatePicker>
                                </FormItem>
                            </Col>
                            <Col :span="24">
                                <FormItem labelText="备注：">
                                    <Input type="textarea" v-model="creditObj.remark"></Input>
                                </FormItem>
                            </Col>
                        </Form>
                    </Row>
                </Scroll>
            </div>
            <div slot="btnBox">
                <span class="save" @click="handleSave">保存</span>
                <span class="back" @click="handleCancel">返回</span>
            </div>
        </Dialog>
        <!-- 信用度新增E -->
    </div>
</template>

<script>
export default {
    props: {
        componentData: {}
    },
    data () {
        return {
            creditData: [],
            tableTitleData: [
                {
                    name: '信用度等级',
                    param: 'creditLevel',
                    span: 6
                },{
                    name: '失效时间',
                    param: 'expDate',
                    span: 6
                },{
                    name: '备注',
                    param: 'remark',
                    span: 8
                }
            ],
            custId: '',
            tableItemData: [],
            creditTitle: '添加信用度',
            dialogSize: {
                max: 500
            },
            creditObj: {}
        }
    },
    mounted () {
        this.getMainData();
        this.getAddressInfoList()
    },
    methods: {
        getMainData() {
            // 信用度等级
            this.$getjsons.getJson('CUS-0008').then(res => {
                if (res.data) {
                    this.creditData = res.data.attrSpecDetail.attrValueList;
                }
            })
        },
        // 信用度
        getAddressInfoList () {
            this.$axios.get(this.$api.CustCredit, {
                params: {
                    custId: this.componentData.custId,
                    certType: '',
                    certNum: ''
                }
            }).then(res => {
                if (res.data) {
                    this.tableItemData = res.data[0]
                    this.tableItemData.map(item => item.creditLevel = item.creditLevel.split('|')[1])
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },

        // 添加（修改）按钮
        handleModify (data) {
            this.creditObj = data
            // 循环配置主数据
            this.creditData.find(item => {
                if (data.creditLevel == item.attrValueName) {
                    this.$set(this.creditObj, 'creditLevel', item.attrValue)
                }
            })
            this.$refs.modalType.show()
        },

        // 返回
        handleCancel () {
            this.$refs.modalType.hide()
        },

        // 时间选择
        handleDate (data) {
            // 获取当前时间戳
            let currentTimestamp = new Date().getTime()
            // 获取点击的时间
            let clickTimestamp = this.$utils.time2TimeStap(data)
            
            if (clickTimestamp < currentTimestamp) {
                this.$message.warning({"message": "所选时间不能小于当前时间"})
                this.creditObj.expDate = ''
                return
            } else {
                this.creditObj.expDate = data
            }
        },

        // 保存
        handleSave () {
            this.$validator.validateAll().then((result) => {
                if(!result){
                    return
                } else {
                    this.insertRequest()
                }
            })
            
        },

        // 新增接口 修改
        insertRequest(){
            this.$axios.patch(this.$api.AddCredit + `/${this.creditObj.creditId}`, {
                createDate: this.$utils.getLocalTime(),
                createStaff: this.$user.getStaffId(),
                creditId: this.creditObj.creditId,
                creditLevel: this.creditObj.creditLevel,
                creditValue: 0,
                effDate: this.$utils.getLocalTime(),
                evaluateTime: "",
                evaluateType: "",
                expDate: this.$utils.time2TimeStap(this.creditObj.expDate),
                objId: this.componentData.custId,
                objType: "1100",
                remark: this.creditObj.remark,
                siebelRowId: "",
                statusCd: "1000",
                statusDate: '',
                updateDate: this.$utils.getLocalTime(),
                updateStaff: this.$user.getStaffId()
            }).then(res => {
                if (res.data) {
                    this.$message.success({"message": "修改成功"})
                    this.getAddressInfoList()
                    this.$refs.modalType.hide()
                    this.creditObj = {}
                } else {
                    this.$message.error({"message": "修改失败"})
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },
        changeHeight() {
        },
        changeLow() {
        }
    }
}
</script>

<style lang="scss" scoped>
.expand-warp {
    padding: 20px;
    background-color: #fff;
    margin-top: 10px;
    box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);

    .btn-add {
        display: block;
        padding: 3px 0 0 22px;
        position: absolute;
        top: 24px;
        right: 0;
        z-index: 99;
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

    .app__table .src-content .app__table-right .review{
        color: $mainColor;
        cursor: pointer;
    }

    .modal-content {
        padding: 20px 20px 50px;
        .textarea {
            padding: 3px 5px;
            border-radius: 3px;
        }
    }
}
</style>