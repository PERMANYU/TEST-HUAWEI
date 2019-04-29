<!--客户纳税人-->
<template>
    <div>
        <div class="taxpayer">
            <div class="app__title-1">
                <span class="app__title-name">客户纳税人</span>
            </div>
            <span class="btn-mod" v-if="userRightBtnControl.updateBtn" @click="handleChange">
                <i class="iconfont iconbianjixinxi"></i>
            </span>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">证件类型：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.taxCertType | filterName">{{expandObjData.taxCertType | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">税务登记号：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.taxId">{{expandObjData.taxId}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">税务登记号所属省份：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.taxProvinceCode">{{expandObjData.taxProvinceCode}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">税务开户银行名称：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.taxBankName">{{expandObjData.taxBankName}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">税务开户银行账号：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.taxBankAcct">{{expandObjData.taxBankAcct}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">税务登记联系电话：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.taxRelaTel">{{expandObjData.taxRelaTel}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">通知邮箱号：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.noticeMail">{{expandObjData.noticeMail}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">通知短信手机号：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.noticePhone">{{expandObjData.noticePhone}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">是否一般纳税人：</span>
                    <span class="app__lt-text overflow-style">{{expandObjData.generalTaxpayerFlag == null ? '' : (expandObjData.generalTaxpayerFlag == 1 ? '是' : '否')}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">是否开增值税专票：</span>
                    <span class="app__lt-text overflow-style">{{expandObjData.vatInvoicesFlag == null ? '' : (expandObjData.vatInvoicesFlag === 1 ? '是' : '否')}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">提交审核人员工号：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.auditStaff">{{expandObjData.auditStaff}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">提交审核日期：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.auditTime">{{expandObjData.auditTime}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">审核状态：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.auditStatus">{{expandObjData.auditStatus}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">审核通过日期：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.approvalTime | getLocalTime">{{expandObjData.approvalTime | getLocalTime}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">意向开票点：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.billingAddress">{{expandObjData.billingAddress}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">邮编：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.postcode">{{expandObjData.postcode}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">先开票：</span>
                    <span class="app__lt-text overflow-style">{{expandObjData.invAdvance == null ? '' : (expandObjData.invAdvance === '1' ? '先开票' : '后开票')}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">邮寄地址：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.billDeliverAddr">{{expandObjData.billDeliverAddr}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">税务登记地址：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.taxRelaAddr">{{expandObjData.taxRelaAddr}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">是否规范信息：</span>
                    <span class="app__lt-text overflow-style"></span>
                </Col>
            </Row>
        </div>

        <!-- 纳税人弹窗S -->
        <Dialog ref="modalType" :dialogTitle="expandDialog" :dialogSize="dialogSize" :initBtn="true">
            <div class="modal-content">
                <Scroll :isShowRight="true">
                    <Row>
                        <Form labelWidth="145px" labelAlign="left">
                            <Col :span="11">
                                <FormItem labelText="证件类型：" :requiredIcon="true" :errorMessage="errors.first('certType')">
                                    <Select name="certType" data-vv-as="证件类型" v-validate="'required'" :data="certType" v-model="expandChangeObjData.taxCertType" :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="税务登记号: " :requiredIcon="true" :errorMessage="errors.first('taxId')">
                                    <Input name="taxId" data-vv-as="税务登记号" v-validate="'required'" placeholder="请输入税务登记号" v-model.trim="expandChangeObjData.taxId"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11">
                                <FormItem labelText="税务登记号所属省份：" :requiredIcon="true" :errorMessage="errors.first('taxProvinceCode')">
                                    <Input name="taxProvinceCode" data-vv-as="税务登记号所属省份" v-validate="'required'" placeholder="请输入税务登记号所属省份" v-model.trim="expandChangeObjData.taxProvinceCode"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="税务开户银行名称：" :requiredIcon="true" :errorMessage="errors.first('taxBankName')">
                                    <Input  name="taxBankName" data-vv-as="税务开户银行名称" v-validate="'required'" placeholder="请输入税务开户银行名称" v-model.trim="expandChangeObjData.taxBankName"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11">
                                <FormItem labelText="税务开户银行账号：" :requiredIcon="true" :errorMessage="errors.first('taxBankAcct')">
                                    <Input name="taxBankAcct" data-vv-as="税务开户银行账号" v-validate="'required'" placeholder="请输入税务开户银行账号" v-model.trim="expandChangeObjData.taxBankAcct"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="税务登记联系电话：" :requiredIcon="true" :errorMessage="errors.first('taxRelaTel')">
                                    <Input name="taxRelaTel" data-vv-as="税务登记联系电话" v-validate="'required|isPhone'" placeholder="请输入税务登记联系电话" v-model.trim="expandChangeObjData.taxRelaTel"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11">
                                <FormItem labelText="通知邮箱号：" :errorMessage="errors.first('noticeMail')">
                                    <Input name="noticeMail" data-vv-as="通知邮箱号" v-validate="'required|email'" placeholder="请输入通知邮箱号" v-model.trim="expandChangeObjData.noticeMail"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="通知短信手机号：" :requiredIcon="true" :errorMessage="errors.first('noticePhone')">
                                    <Input name="noticePhone" data-vv-as="通知短信手机号" v-validate="'required|mobile'" placeholder="请输入通知短信手机号" v-model.trim="expandChangeObjData.noticePhone"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11">
                                <FormItem labelText="是否一般纳税人：">
                                <RadioGroup name="generalTaxpayerFlag" :data="taxPayerData" v-model="expandChangeObjData.generalTaxpayerFlag"></RadioGroup>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="是否开增值税专票：">
                                    <RadioGroup name="appreciationData" :data="appreciationData" v-model="expandChangeObjData.vatInvoicesFlag"></RadioGroup>
                                </FormItem>
                            </Col>
                            <Col :span="11">
                                <FormItem labelText="提交审核人员工号：">
                                    <Input disabled v-model.trim="expandChangeObjData.auditStaff"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="提交审核日期：">
                                    <Input disabled :value="expandChangeObjData.auditTime | getLocalTime"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11">
                                <FormItem labelText="审核状态：">
                                    <Input disabled v-model.trim="expandChangeObjData.auditStatus"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="审核通过日期：">
                                    <Input disabled :value="expandChangeObjData.approvalTime | getLocalTime"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11">
                                <FormItem labelText="意向开票点：">
                                    <Input disabled v-model.trim="expandChangeObjData.billingAddress"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="邮编：">
                                    <Input placeholder="请输入邮编" v-model.trim="expandChangeObjData.postcode"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11">
                                <FormItem labelText="先开票：">
                                    <RadioGroup name="invoiceData" :data="invoiceData" v-model="expandChangeObjData.invAdvance"></RadioGroup>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="是否规范信息：">
                                    <RadioGroup name="invoiceData" :data="appreciationData" disabled></RadioGroup>
                                </FormItem>
                            </Col>
                            <Col :span="24">
                                <FormItem labelText="邮寄地址：">
                                    <Input placeholder="请输入邮寄地址" v-model.trim="expandChangeObjData.billDeliverAddr"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="24">
                                <FormItem labelText="税务登记地址：">
                                    <Input placeholder="请输入税务登记地址" v-model.trim="expandChangeObjData.taxRelaAddr"></Input>
                                </FormItem>
                            </Col>
                        </Form>
                    </Row>
                </Scroll>
            </div>
            <div slot="btnBox">
                <span class="save" @click="handleConfirm">保存</span>
                <span class="back" @click="handleBack">返回</span>
            </div>
        </Dialog>
        <!-- 纳税人弹窗E -->
        
        <div class="taxpayer">
            <div class="app__title-1">
                <span class="app__title-name">取票人</span>
            </div>
            <span class="btn-add" @click="handleAdd" v-if="userRightBtnControl.addPerBtn">
                <i class="iconfont icontianjia"></i>
            </span>
            <Scroll class="app__table expand-content" ref="listScroll">
                <DragGroup class="m-title app__table-thead" :titleList="tableTitleData">
                    <DragItem :span="item.span" 
                        :value="item"
                        v-for="(item,index) in tableTitleData"
                        :key="index">
                        <span>{{item.name}}</span>
                    </DragItem>
                    <Col :span="6">
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
                    <Col :span="6">
                        <span class="review" @click="ticketModify(table)" v-if="userRightBtnControl.updatePerBtn">修改</span>
                        <span class="review" @click="ticketDelete(table)" v-if="userRightBtnControl.deletePerBtn">删除</span>
                    </Col>    
                </Row>
                <div v-if="tableItemData == null" class="app__data-none">
                    <span>当前暂无数据 请添加</span>
                </div>
                <!-- <Row :class="['m-item app__table-item']" v-for="(empty,index) in 10 - tableItemData.length" :key="index">	
                </Row> -->
            </Scroll>
        </div>

        <!-- 取票人弹窗S -->
        <Dialog ref="ticketModal" :dialogTitle="ticketDialogTitle" :dialogSize="ticketDialogSize" :initBtn="true">
            <Row class="modal-content">
                <Form labelWidth="120px" labelAlign="left">
                    <Col :span="24">
                        <FormItem labelText="取票人名字：" :requiredIcon="true" :errorMessage="errors.first('takeTicketName')">
                            <Input name="takeTicketName" placeholder="请输入取票人名字" data-vv-as="取票人名字" v-validate="'required'" v-model="ticketObjData.takeTicketName"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="24">
                        <FormItem labelText="取票人证件号码：" :requiredIcon="true" :errorMessage="errors.first('takeTicketCert')">
                            <Input name="takeTicketCert" placeholder="请输入取票人证件号码" data-vv-as="取票人证件号码" v-validate="'required|cardId'" v-model="ticketObjData.takeTicketCert"></Input>
                        </FormItem>
                    </Col>
                    <Col :span="24">
                        <FormItem labelText="取票人移动电话：" :requiredIcon="true" :errorMessage="errors.first('takeTicketPhone')">
                            <Input name="takeTicketPhone" placeholder="请输入取票人移动电话" data-vv-as="取票人电话" v-validate="'required|mobile'" v-model="ticketObjData.takeTicketPhone"></Input>
                        </FormItem>
                    </Col>
                </Form>
            </Row>
            <div slot="btnBox">
                <span class="save" @click="ticketSave">保存</span>
                <span class="back" @click="ticketCancel">取消</span>
            </div>
        </Dialog>
        <!-- 取票人弹窗E -->

        <!-- 删除弹窗S -->
        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm"></Tip>
        <!-- 删除弹窗E -->
    </div>
</template>
<script type="text/javascript">
    import mainData from '@/assets/json/main.json'
    export default{
        props: {
            componentData: {}
        },
        data(){
            return {
                tipInfo: {
                    iconType: 1,
                    msg: "",
                    showBtn: {
                        clear: true,
                        save: true
                    }
                },
                custId: '',
                expandObjData: {},
                expandChangeObjData: {},
                expandDialog: '纳税人信息',
                dialogSize: {
                    max: 820
                },
                certType: mainData.certTypeData,
                taxPayerData: [
                    {
                        label: '是',
                        value: 1
                    },
                    {
                        label: '否',
                        value: 0
                    }
                ],
                appreciationData: [
                    {
                        label: '是',
                        value: 1
                    },
                    {
                        label: '否',
                        value: 0
                    }
                ],
                invoiceData: [
                    {
                        label: '先开票',
                        value: '1'
                    },{
                        label: '后开票',
                        value: '0'
                    }
                ],

                // 取票人
                tableTitleData: [
                    {
                        name: '取票人名字',
                        param: 'takeTicketName',
                        span: 6
                    },{
                        name: '取票人证件号',
                        param: 'takeTicketCert',
                        span: 6
                    },{
                        name: '取票人移动电话',
                        param: 'takeTicketPhone',
                        span: 6
                    }
                ],
                tableItemData: [],
                ticketDialogTitle: '新增',
                ticketDialogSize: {
                    max: 400
                },
                operationFlag: '',
                ticketObjData: {},
                userRightBtnControl: {          // 权限按钮控制
                    updateBtn: false,
                    addPerBtn: false,
                    updatePerBtn: false,
                    deletePerBtn: false,
                }
            }
        },
        mounted() {
            this.getTaxpayerInfo(this.componentData.custId)
            // 循环权限数据     
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100617':
                        this.userRightBtnControl.updateBtn = true;
                        break;
                    case 'F-CMB-100618':
                        this.userRightBtnControl.addPerBtn = true;
                        break;
                    case 'F-CMB-100619':
                        this.userRightBtnControl.updatePerBtn = true;
                        break;
                    case 'F-CMB-100620':
                        this.userRightBtnControl.deletePerBtn = true;
                        break;
                    default:
                        break;
                }
            })
        },
        methods:{
            // 查询纳税人信息
            getTaxpayerInfo (custId) {
                this.$axios.get(this.$api.ClientTaxpayer, {
                    params: {
                        custId: custId,
                        certNum: '',
                        certType: '',
                        staffId: this.$user.getStaffId(),
                        orgId: this.$user.getOrgId(),
                        xSubChannel: this.$user.getXSubChannel(),
                        sysRoleIds: this.$user.getSysRoleId(),
                        sysUserId: this.$user.getSysUserId()
                    }
                }).then(res => {
                    if (res) {
                        this.expandObjData = res.data
                        this.tableItemData = res.data.taxTicketTaker
                        this.$nextTick( () => {
                            this.$refs.listScroll.init();
                        })
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 点击修改按钮
            handleChange () {
                if (this.expandObjData != '') {
                    this.$refs.modalType.show()
                    this.expandChangeObjData = Object.assign({}, this.expandObjData);

                    Object.keys(this.expandChangeObjData).forEach((key) => {
                        if (typeof this.expandChangeObjData[key] === 'string' && this.expandChangeObjData[key].indexOf('|') !== -1) {
                            this.expandChangeObjData[key] =  this.expandChangeObjData[key].split('|')[0]
                        }
                    })
                } else {
                    this.$message.warning({"message": "没有纳税人信息，不能进行操作"})
                }
                
            },

            // 纳税人修改保存
            handleConfirm () {
                this.$validator.validateAll().then((result) => {
                    if (!result) {
                        return
                    } else {
                        this.taxMedhos()
                    }
                }) 
            },

            // 纳税人新增、修改接口方法
            taxMedhos () {
                this.$axios({
                    method: 'patch',
                    url: this.$api.ModifyTaxpayer + `/${this.expandChangeObjData.taxPayerId}`,
                    data: {
                        "updateStaff": 1,
                        "updateDate": this.expandChangeObjData.updateDate,
                        "createStaff": 1001,
                        "taxCertType": this.expandChangeObjData.taxCertType,
                        "createDate": "2018-08-03T00:00:00.000+0000",
                        "billDeliverAddr": this.expandChangeObjData.billDeliverAddr,
                        "billDeliverWay": this.expandChangeObjData.billDeliverWay,
                        "remark": this.expandChangeObjData.remark,
                        "expDate": this.expandChangeObjData.expDate,
                        "approvalTime": this.expandChangeObjData.approvalTime,
                        "generalTaxpayerFlag": this.expandChangeObjData.generalTaxpayerFlag,
                        "vatInvoicesFlag": this.expandChangeObjData.vatInvoicesFlag,
                        "statusCd": "1000",
                        "custId": this.componentData.custId,
                        "statusDate": this.expandChangeObjData.statusDate,
                        "effDate": this.expandChangeObjData.effDate,
                        "taxBankAcct": this.expandChangeObjData.taxBankAcct,
                        "taxId": this.expandChangeObjData.taxId,
                        "taxEndDate": "2010-08-03T00:00:00.000+0000",
                        "taxName": this.expandChangeObjData.taxName,
                        "taxRelaAddr": this.expandChangeObjData.taxRelaAddr,
                        "taxRelaTel": this.expandChangeObjData.taxRelaTel,
                        "taxBankName": this.expandChangeObjData.taxBankName,
                        "taxProvinceCode": this.expandChangeObjData.taxProvinceCode,
                        "taxPayerId": this.expandChangeObjData.taxPayerId,
                        "startDate": "2018-08-03T00:00:00.000+0000",
                        "postcode": this.expandChangeObjData.postcode,
                        "taxPayerAttrList": [],
                        "taxTicketTaker": [],
                        "noticePhone": this.expandChangeObjData.noticePhone,
                        "noticeMail": this.expandChangeObjData.noticeMail,
                        "invAdvance": this.expandChangeObjData.invAdvance,
                        "taxCertType": this.expandChangeObjData.taxCertType,
                        "auditTime": this.expandChangeObjData.auditTime,
                        "billingAddress": this.expandChangeObjData.billingAddress,
                        "auditStaff": this.expandChangeObjData.auditStaff,
                        "auditStatus": this.expandChangeObjData.auditStatus,
                        "siebelRowId": this.expandChangeObjData.siebelRowId,
                        "rejectTime": this.expandChangeObjData.rejectTime
                    }
                })
                .then(res => {
                    if (res.data) {
                        this.$message.success({"message": "保存成功"});
                        this.getTaxpayerInfo(this.componentData.custId);
                        this.$refs.modalType.hide()
                    } else {
                        this.$message.error({"message": "保存失败"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 返回
            handleBack () {
                this.$refs.modalType.hide()
            },

            // 取票人添加
            handleAdd () {
                if (this.expandObjData != '') {
                    this.ticketObjData = JSON.parse(JSON.stringify(this.expandObjData))
                    this.$refs.ticketModal.show()
                    this.operationFlag = 1
                } else {
                    this.$message.warning({"message": "没有纳税人信息，不能进行操作"})
                }
            },

            // 取票人修改
            ticketModify (table) {
                this.ticketObjData = JSON.parse(JSON.stringify(this.expandObjData))
                this.ticketObjData['takeTicketCert'] = table.takeTicketCert
                this.ticketObjData['takeTicketName'] = table.takeTicketName
                this.ticketObjData['takeTicketPhone'] = table.takeTicketPhone
                this.ticketObjData['taxTicketTakerId'] = table.taxTicketTakerId
                this.$refs.ticketModal.show()
                this.operationFlag = 2
            },

            // 取票人删除
            ticketDelete (table) {
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `确认要删除吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
                this.ticketObjData = JSON.parse(JSON.stringify(this.expandObjData))
                this.ticketObjData['takeTicketCert'] = table.takeTicketCert
                this.ticketObjData['takeTicketName'] = table.takeTicketName
                this.ticketObjData['takeTicketPhone'] = table.takeTicketPhone
                this.ticketObjData['taxTicketTakerId'] = table.taxTicketTakerId
                this.operationFlag = 3
            },

            // 确认删除
            tipConfirm () {
                this.getTicketList()
            },

            // 取票人保存
            ticketSave () {
                this.$validator.validateAll().then((result) => {
                    if(!result){
                        return
                    } else {
						this.getTicketList()
					}
                })
            },

            // 取票人保存接口
            getTicketList () {
                let config = {
                    "updateStaff": this.$user.getStaffId(),
                    "updateDate": '',
                    "createStaff": this.$user.getStaffId(),
                    "createDate": this.$utils.getLocalTime(),
                    "billDeliverAddr": this.ticketObjData.billDeliverAddr,
                    "billDeliverWay": this.ticketObjData.billDeliverWay,
                    "remark": this.ticketObjData.remark,
                    "expDate": this.ticketObjData.expDate,
                    "approvalTime": this.ticketObjData.approvalTime,
                    "generalTaxpayerFlag": this.ticketObjData.generalTaxpayerFlag,
                    "vatInvoicesFlag": this.ticketObjData.vatInvoicesFlag,
                    "statusCd": "1000",
                    "statusDate": this.ticketObjData.statusDate,
                    "effDate": this.ticketObjData.effDate,
                    "taxBankAcct": this.ticketObjData.taxBankAcct,
                    "taxId": this.ticketObjData.taxId,
                    "taxEndDate": "",
                    "taxName": this.ticketObjData.taxName,
                    "taxRelaAddr": this.ticketObjData.taxRelaAddr,
                    "taxRelaTel": this.ticketObjData.taxRelaTel,
                    "taxBankName": this.ticketObjData.taxBankName,
                    "taxProvinceCode": this.ticketObjData.taxProvinceCode,
                    "taxPayerId": this.ticketObjData.taxPayerId,
                    "startDate": this.$utils.getLocalTime(),
                    "postcode": this.ticketObjData.postcode,
                    "taxPayerAttrList": [],
                    "taxTicketTaker": [
                        {
                            "taxTicketTakerId": this.operationFlag === 1 ? '' : this.ticketObjData.taxTicketTakerId,
                            "taxPayerId": this.ticketObjData.taxPayerId,
                            "takeTicketType": "第1取票人",
                            "takeTicketName": this.ticketObjData.takeTicketName,
                            "takeTicketCert": this.ticketObjData.takeTicketCert,
                            "takeTicketPhone": this.ticketObjData.takeTicketPhone,
                            "statusCd": this.operationFlag !== 3 ? "1000" : "1100",
                            "statusDate": this.$utils.getLocalTime(),
                            "createDate": this.$utils.getLocalTime(),
                            "createStaff": this.$user.getStaffId(),
                            "updateDate": this.$utils.getLocalTime(),
                            "updateStaff": this.$user.getStaffId(),
                            "siebelRowId": ''
                        }
                    ],
                    "noticePhone": this.ticketObjData.noticePhone,
                    "noticeMail": this.ticketObjData.noticeMail,
                    "invAdvance": this.ticketObjData.invAdvance,
                    "taxCertType": this.ticketObjData.taxCertType,
                    "auditTime": this.ticketObjData.auditTime,
                    "billingAddress": this.ticketObjData.billingAddress,
                    "auditStaff": this.ticketObjData.auditStaff,
                    "auditStatus": this.ticketObjData.auditStatus,
                    "siebelRowId": this.ticketObjData.siebelRowId,
                    "rejectTime": this.ticketObjData.rejectTime
                }
                this.$axios({
                    method: this.operationFlag === 1 ? 'post' : 'patch',        // 1表示新增，反之修改、删除
                    url: this.operationFlag === 1 ? this.$api.ModifyTaxpayer : this.$api.ModifyTaxpayer + `/${this.ticketObjData.taxPayerId}`,  
                    data: config
                })
                .then (res => {
                    if (res.data) {
                        this.$message.success({"message": "成功"})
                        this.$refs.ticketModal.hide()
                        this.getTaxpayerInfo(this.componentData.custId)
                        this.$refs.tip.hide();
                    } else {
                        this.$message.error({"messgae": "失败"})
                    }
                }).catch(err => {
                    this.$message.error({"messgae": err.response.data.message})
                })
            },

            // 取票人取消弹窗
            ticketCancel () {
                this.$refs.ticketModal.hide()
            },

            changeHeight() {
            },
            changeLow() {
            }
        }
    }
</script>
<style scoped lang="scss">
    .taxpayer {
        padding: 20px;
        background-color: #fff;
        margin-top: 10px;
        box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);
        .btn-mod,.btn-add {
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
        .review {
            color: $mainColor;
            cursor: pointer;
        }
        .expand-content {
            width: 100%;
            font-size: 12px;
        }

        .overflow-style {
            display: inline-block;
            width: 160px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            vertical-align: text-bottom;
        }

        .col {
            padding: 8px 0;
        }
    }   
    // 拓展信息
    .modal-content {
        padding: 20px;
        .remark {
            padding: 2px 5px;
        }
    }
</style>