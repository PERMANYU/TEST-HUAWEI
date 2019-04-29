<!--常用信息-->
<template>
    <div>
        <div class="client-basic-info">
            <div class="app__title-1">
                <span class="app__title-name">客户常用信息</span>
            </div>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户经理部门：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.orgName">{{componentData.orgName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户经理职位：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.sysPostName">{{componentData.sysPostName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户经理工号：</span>
                    <span class="app__lt-text">{{componentData.staffCode}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">核查时间：</span>
                    <span class="app__lt-text">{{componentData.updateDate | getLocalTime}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">所属二级单位：</span>
                    <span class="app__lt-text">{{componentData.xParentBureauName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">备注：</span>
                    <span class="app__lt-text">{{componentData.remark}}</span>
                </Col>
            </Row>
        </div>
        
        <div class="contact-info">
            <div class="app__title-1">
                <span class="app__title-name">联系人信息</span>
            </div>
            <span class="btn-add" @click="handleAdd" v-if="userRightBtnControl.addBtn">
                <i class="iconfont icontianjia"></i>
            </span>
            <div class="btn-content">
                <ConditionSearch :data="conditionSearchData" @search="handleSearch"></ConditionSearch>
            </div>
            <div class="main">
                <Scroll ref="listScroll" class="app__table mgtop10" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title" fixedRightClassName="app__table-right">
                    <DragGroup ref="titleWidth" class="m-title app__table-thead" :titleList="tableTitleData" :inline="true">
                        <DragItem :width="item.width" 
                            :value="item"
                            v-for="(item,index) in tableTitleData"
                            :key="index">
                            <span>{{item.name}}</span>
                        </DragItem>
                        <Col :width="120" class="app__table-right">
                            <span>操作</span>
                        </Col>
                    </DragGroup>
                    <Row :inline="true" :class="['m-item app__table-item']" v-for="(table,index) in tableItemData" :key="index">
                        <Col :inline="true" :width="item.width"
                            :title="table[item.param]"
                            v-for="(item,index) in tableTitleData"
                            :key="index">
                            <span v-if="item.param == 'contactGender'">
                                {{table[item.param] == '1' ? '男':(table[item.param] == '0') ? '女' : (table[item.param] == null) ? '' : '' }}
                            </span>
                            <span v-else-if="item.param == 'headFlag'">
                                {{table[item.param] == '1' ? '是': '否'}}
                            </span>
                            <span v-else-if="item.param == 'contactType'">
                                {{table[item.param] | filterName}}
                            </span>
                            <span v-else-if="item.param == 'checkDate'">
                                {{table[item.param] | getLocalTime}}
                            </span>
                            <span v-else-if="item.param == 'contactCertType'">
                                {{table[item.param] | filterName}}
                            </span>
                            <span v-else>
                                {{table[item.param]}}
                            </span>
                        </Col>
                        <Col :width="120" class="app__table-right">
                            <span class="review" @click="handleCheck(table)" v-if="userRightBtnControl.checkBtn">
                                {{ table.contactCertType == '1|居民身份证' ? '核查' : ''}}
                            </span>
                            <span class="review" @click="handleModify(table)" v-if="userRightBtnControl.updateBtn">修改</span>
                            <span class="review" @click="handleRemove(table)" v-if="userRightBtnControl.deleteBtn">删除</span>
                        </Col>    
                    </Row>
                    <Row :style="dynamicWidth" :class="['m-item app__table-item']" v-for="empty in 5 - tableItemData.length" :key="empty.id">	
                    </Row>
                    <div v-if="!tableItemData.length" class="app__data-none">
                        <span>当前暂无数据 请添加</span>
                    </div>
                </Scroll>
                <div class="footer" v-if="tableItemData.length">
                    <Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
                    </Pagination>
                </div>
            </div>
        </div>

         <!-- 联系人信息新增S -->
        <Dialog ref="modalType" :dialogTitle="contactDialogTitle" :dialogSize="dialogSize" :initBtn="true">
            <Scroll :isShowRight="true">
                <div class="modal-content">
                    <Form labelWidth="120px" labelAlign="left" data-vv-scope="revise">
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="姓名：" :requiredIcon="true" :errorMessage="errors.first('revise.contactName')">
                                    <Input name="contactName" data-vv-as="姓名" v-validate="'required'" v-model.trim="contactOperateData.contactName"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="性别: ">
                                    <RadioGroup :data="sexArray" name="contactGender" v-model="contactOperateData.contactGender"></RadioGroup>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="工作电话号码: " :errorMessage="errors.first('revise.officePhone')">
                                    <Input name="officePhone" data-vv-as="工作电话号码" v-validate="'isHomeNum'" v-model.trim="contactOperateData.officePhone"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="QQ号：" :errorMessage="errors.first('revise.qqCode')">
                                    <Input name="qqCode" v-validate="'isQQ'" v-model="contactOperateData.qqCode"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                             <Col :span="11">
                                <FormItem labelText="微信号：" :errorMessage="errors.first('revise.wxCode')">
                                    <Input v-validate="'isCard'" name="wxCode" v-model="contactOperateData.wxCode" data-vv-as="微信号"></Input>
                                </FormItem>
                            </Col>
                             <Col :span="11" :offset="2">
                                <FormItem labelText="家庭电话号码：" :errorMessage="errors.first('revise.homePhone')">
                                    <Input name="homePhone" data-vv-as="家庭电话号码" v-validate="'isHomeNum'" v-model="contactOperateData.homePhone"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="办公传真号码: " :errorMessage="errors.first('revise.fax')">
                                    <Input name="fax" v-validate="'isfax'" v-model="contactOperateData.fax"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="电子邮件: " :errorMessage="errors.first('revise.eMail')">
                                    <Input name="eMail" v-validate="'email'"  v-model="contactOperateData.eMail"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="证件类型：" :requiredIcon="true" :errorMessage="errors.first('revise.contactCertType')">
                                    <Select data-vv-as="证件类型" :disabled="disabled" v-validate="'required'" :data="certTypeArray" v-model="contactOperateData.contactCertType" name="contactCertType"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="证件号码：" :requiredIcon="true" :errorMessage="errors.first('revise.certNum')">
                                    <Input v-validate="'required|isCard'" name="certNum" v-model="contactOperateData.certNum" data-vv-as="证件号码"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="主要联系人：">
                                    <RadioGroup name="headFlag" :data="headFlagData" v-model="contactOperateData.headFlag"></RadioGroup>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="移动电话号码: " :errorMessage="errors.first('revise.mobilePhone')">
                                    <Input v-validate="'isPhone'" data-vv-as="移动电话号码" name="mobilePhone" v-model.trim="contactOperateData.mobilePhone"></Input>
                                </FormItem>
                            </Col>

                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="联系人类型：">
                                    <Select
                                        name="contactType"
                                        :data="contactTypeData"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        v-model="contactOperateData.contactType"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="客户通讯地址：">
                                    <Input
                                        name="postAddr"
                                        v-model="contactOperateData.postAddr">
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="客户邮政编码：">
                                    <Input
                                        name="postcode"
                                        v-model="contactOperateData.postcode">
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="24">
                                <FormItem labelText="详细地址：">
                                    <Input v-model="contactOperateData.contactAddr"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Scroll>
            <div slot="btnBox">
                <span class="save" @click="handleSave">保存</span>
                <span class="back" @click="handleCancel">返回</span>
            </div>
        </Dialog>
        <!-- 联系人信息新增E -->

        <!-- 强制核查弹窗S -->
        <Dialog ref="compulsoryVerificate" :dialogTitle="compulsoryVerificateTitle" :dialogSize="compulsoryVerificateDialogSize" :initBtn="true">
            <div class="verificate">
                <i class="verificate-icon"></i>
                <p>证件审核未通过！</p>
            </div>
            <div slot="btnBox">
                <span class="save" @click="verificateSave" v-if="userRightBtnControl.forceCheckBtn">强制核查</span>
                <span class="back" @click="verificateBack">返回</span>
            </div>
        </Dialog>
        <!-- 强制核查弹窗E -->

        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
    </div>
</template>
<script type="text/javascript">
    import mainData from '@/assets/json/main.json'
    export default{
        props: {
            componentData: {
                type: Object,
                default: {}
            }
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
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 5,    // 每页条数
                },
                dynamicWidth: '',        // 动态宽度
                tableTitleData:[
                    {
                        name: '是否主要联系人',
                        param: 'headFlag',
                        width: 120
                    },{
                        name: '姓名',
                        param: 'contactName',
                        width: 120
                    },{
                        name: '性别',
                        param: 'contactGender',
                        width: 120
                    },{
                        name: '客户通讯地址',
                        param: 'postAddr',
                        width: 160
                    },{
                        name: '客户邮政编码',
                        param: 'postcode',
                        width: 160
                    },{
                        name: '联系人类型',
                        param: 'contactType',
                        width: 140
                    },{
                        name: '移动电话号码',
                        param: 'mobilePhone',
                        width: 160
                    },{
                        name: '工作电话号码',
                        param: 'officePhone',
                        width: 120
                    },{
                        name: '家庭电话号码',
                        param: 'homePhone',
                        width: 120
                    },{
                        name: '办公传真号码',
                        param: 'fax',
                        width: 120
                    },{
                        name: '电子邮件',
                        param: 'eMail',
                        width: 160
                    },{
                        name: '状态',
                        param: 'statusCd',
                        width: 120
                    },{
                        name: '证件类型',
                        param: 'contactCertType',
                        width: 120
                    },{
                        name: '证件号码',
                        param: 'certNum',
                        width: 200
                    },{
                        name: 'QQ号',
                        param: 'qqCode',
                        width: 120
                    },{
                        name: '微信号',
                        param: 'wxCode',
                        width: 120
                    },{
                        name: '核查结果',
                        param: 'checkResult',
                        width: 120
                    },{
                        name: '核查时间',
                        param: 'checkDate',
                        width: 180
                    },{
                        name: '联系地址',
                        param: 'contactAddr',
                        width: 200
                    }
                ],
                tableItemData: [],
                contactDialogTitle: '',     // 弹窗标题
                picked: '',         // 弹窗单选
                dialogSize: {
                    max: 800
                },
                sexArray: [
                    {
                        label: '男',
                        value: '1'
                    },{
                        label: '女',
                        value: '0'
                    }
                ],
                headFlagData: [
                    {
                        label: '是',
                        value: '1'
                    },{
                        label: '否',
                        value: '0'
                    }
                ],
                contactTypeData: [],        // 联系人类型
                operateFlag: '',
                contactName: '',
                contactOperateData: {},     // 弹窗数据对象
                checkTypeFlag: true,  // 核查方式
                compulsoryVerificateTitle: '强制核查',
                compulsoryVerificateDialogSize: {
                    max: 500
                },
                disabled: false,
                searchFlag: true,
                verificateTitleObj: {},
                certTypeArray: mainData.certTypeData,
                userRightBtnControl: {          // 权限按钮控制
                    addBtn: false,
                    updateBtn: false,
                    deleteBtn: false,
                    checkBtn: false,
                    forceCheckBtn: false
                },
                conditionSearchData:[
                {
                    iconfont: 'iconkhbs',
                    placeholder:'联系人姓名搜索',
                    param: 'contactName'
                }]
            }
        },
        mounted () {
            this.getDynamicWidth()
            this.getListData()
            this.getMainData()
            // 循环权限数据
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100602':
                        this.userRightBtnControl.addBtn = true;
                        break;
                    case 'F-CMB-100603':
                        this.userRightBtnControl.updateBtn = true;
                        break;
                    case 'F-CMB-100604':
                        this.userRightBtnControl.deleteBtn = true;
                        break;
                    case 'F-CMB-100605':
                        this.userRightBtnControl.checkBtn = true;
                        break;
                    case 'F-CMB-100615':
                        this.userRightBtnControl.forceCheckBtn = true;
                        break;
                    default:
                        break;
                }
            })
        },
        methods:{
            // 主数据
            getMainData () {
                // 联系人类型
                this.$getjsons.getJson("PTY-SH-0001").then(res => {
                    this.contactTypeData = res.data.attrSpecDetail.attrValueList
                })
            },

            // 获取表格标题宽度，动态计算空余行的宽度
            getDynamicWidth () {
                this.dynamicWidth = {
                    width: this.$refs.titleWidth.$el.clientWidth + 'px'
                }
            },
            // 搜索
            handleSearch (data) {
                this.contactName = data.contactName
                this.getListData()
            },

            // 列表
            getListData (pageIndex = 1) {
                this.$axios.get(this.$api.BasicInfo, {
                    params: {
                        custId: this.componentData.custId,
                        contactName: this.contactName,
                        partyId: '',
                        pageNum: pageIndex,
                        pageSize: this.pageInfo.pageSize,
                        staffId: this.$user.getStaffId(),
                        orgId: this.$user.getOrgId(),
                        xSubChannel: this.$user.getXSubChannel(),
                        sysRoleIds: this.$user.getSysRoleId(),
                        sysUserId: this.$user.getSysUserId()
                    }
                }).then(res => {
                    if (res.data.length) {
                        this.tableItemData = res.data
                        this.pageInfo.pageIndex = pageIndex
                        this.$nextTick( () => {
                            this.$refs.listScroll.init();
                        })
                        this.tableItemData.map(item => {
                            if (item.checkResult === 1000) {
                                item.checkResult = '通过'
                            } else if (item.checkResult === 1100) {
                                item.checkResult = '不通过'
                            } else if (item.checkResult === 1200) {
                                item.checkResult = '失败'
                            } else {
                                item.checkResult = ''
                            }
                        })
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 点击添加
            handleAdd () {
                this.contactDialogTitle = '新增联系人'
                this.operateFlag = 1
                this.$refs.modalType.show()
                this.contactOperateData = {
                    contactCertType: 1,
                    headFlag: '0',
                    contactGender: '0'
                }
                this.disabled = false
            },

            // 核查
            handleCheck (data){
                this.$axios.get(this.$api.Contact + '/checker',{
                    params: {
                        createStaff: this.$user.getStaffId(),
                        checkName: data.contactName,
                        certId: data.certId,
                        custId: this.componentData.custId,
                        checkType: this.checkTypeFlag ? '0': '1'
                    }
                }).then(res => {
                    if (res.data.checkResult) {
                        this.$message.success({"message": "核查成功"})
                        this.getListData()
                        this.$refs.compulsoryVerificate.hide()
                        this.$emit('getDetail', res.data)
                    } else {
                        this.$message.error({"message": "核查失败"})
                        this.$refs.compulsoryVerificate.show()
                        this.verificateTitleObj = res.data
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            // 点击修改
            handleModify (data) {
                this.contactDialogTitle = '修改联系人'
                this.operateFlag = 2;
                this.contactOperateData = Object.assign({}, data);
                this.$refs.modalType.show();
                this.disabled = true

                if (this.contactOperateData.certNum.indexOf('**')) {
                    this.contactOperateData['certNum'] = ''
                }

                Object.keys(this.contactOperateData).forEach((key) => {
                    if (typeof this.contactOperateData[key] === 'string' && this.contactOperateData[key].indexOf('|') !== -1) {
                        this.contactOperateData[key] =  this.contactOperateData[key].split('|')[0]
                    }
                })               
            },
            // 点击删除
            handleRemove (data) {
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `确认要删除吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
                this.contactDel = data;
            },

            // 确认删除
            tipConfirm() {
                this.operateFlag = 3;
                this.contactOperateData = Object.assign({}, this.contactDel);
                this.getContact();
            },
            handleSave() {
                this.$validator.validateAll('revise').then((result) => {
                    if (!result) {
                        return
                    } else {
                        if(this.contactOperateData.contactCertType == '1'){
                            if(!this.$utils.isCardId(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的身份证号码"});
                                return
                            }
                        }else if (this.contactOperateData.contactCertType == '2') {
                            if(!this.$utils.isSoldier(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的军人证号码"});
                                return
                            }
                        }else if(this.contactOperateData.contactCertType == '3'){
                            if(!this.$utils.isPassPort(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的护照号码"});
                                return
                            }
                        }else if(this.contactOperateData.contactCertType == '4'){
                            if(!this.$utils.isPassCard(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的港澳台通行证"});
                                return
                            }
                        } else if (this.contactOperateData.contactCertType == '15'){
                            if(!this.$utils.isOrg(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的组织机构代码证"});
                                return
                            }
                        } else if (this.contactOperateData.contactCertType == '39'){
                            if(!this.$utils.isTaxAdministration(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的税务登记证"});
                                return
                            }
                        }else if (this.contactOperateData.contactCertType == '34'){
                            if(!this.$utils.isInstitution(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的事业单位法人证"});
                                return
                            }
                        }else if (this.contactOperateData.contactCertType == '43'){
                            if(!this.$utils.isSocialOrganization(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的社会团体法人登记证"});
                                return
                            }
                        }else if (this.contactOperateData.contactCertType == '49'){
                            if(!this.$utils.isSocialCredit(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的统一社会信用代码证"});
                                return
                            }
                        }else if(this.contactOperateData.contactCertType == '50'){
                            if(!this.$utils.isForeign(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的外国人永久居留居住证"});
                                return
                            }
                        }else if(this.contactOperateData.contactCertType == '12'){
                            if(!this.$utils.isAccountCard(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的户口薄号码"});
                                return
                            }
                        }else if(this.contactOperateData.contactCertType == '52'){
                            if(!this.$utils.isEighteen(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的人民武装警察证"});
                                return
                            }
                        }
                        this.getContact()
                    }
                })
            },
            // 返回
            handleCancel () {
                this.$refs.modalType.hide()
            },

            // 强制核查返回
            verificateBack () {    
                this.$refs.compulsoryVerificate.hide()
            },

            // 强制核查
            verificateSave () {
                this.checkTypeFlag = false
                this.verificateTitleObj['contactName'] = this.verificateTitleObj.checkName
                this.verificateTitleObj['certNum'] = this.verificateTitleObj.checkCertNum
                this.handleCheck(this.verificateTitleObj)
            },

            // 新增、保存接口
            getContact() {
                let operateData = {
                    custId: this.componentData.custId,
                    fax: this.contactOperateData.fax,
                    eMail: this.contactOperateData.eMail,
                    partyId: this.contactOperateData.partyId,
                    statusCd: this.operateFlag == '3' ? "1100" : "1000",
                    contactType: this.contactOperateData.contactType,
                    contactCert: this.contactOperateData.certNum,
                    contactCertType: this.contactOperateData.contactCertType,
                    mobilePhone: this.contactOperateData.mobilePhone,
                    contactName: this.contactOperateData.contactName,
                    contactGender: this.contactOperateData.contactGender,
                    contactAddr: this.contactOperateData.contactAddr,
                    homePhone: this.contactOperateData.homePhone,
                    headFlag: this.contactOperateData.headFlag,
                    wxCode: this.contactOperateData.wxCode,
                    yxCode: this.contactOperateData.yxCode,
                    qqCode: this.contactOperateData.qqCode,
                    officePhone: this.contactOperateData.officePhone,
                    postAddr: this.contactOperateData.postAddr,
                    postcode: this.contactOperateData.postcode,
                    siebelRowId: this.contactOperateData.siebelRowId
                }
                this.$axios({
                    method: this.operateFlag == '1' ? 'post' : 'patch',      // 为true 表示新增，反之修改
                    url: this.operateFlag == '1' ? this.$api.Contact : this.$api.Contact + `/${this.contactOperateData.contactId}`,
                    data: operateData
                }).then(res => {
                   if (res.data.partyId) {
                       this.$message.success({"message": "成功"})
                       this.getListData();
                       this.$refs.modalType.hide();
                       this.$refs.tip.hide();
                   }
                }).catch(err => {
                    this.$message.error({"message": '失败'})
                })
            },
            
            // 分页
            pageChange (val) {
                this.getListData(val)
            },

            changeHeight() {
            },
            changeLow() {
            }
        }
    }
</script>
<style scoped lang="scss">


.client-basic-info, .contact-info{
    padding: 20px;
    background-color: #fff;
    margin-top: 10px;
    box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);

    
    .col {
        padding: 8px 0;
    }

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
    .btn-content {
        width: 380px;
        position: absolute;
        top: 22px;
        right: 100px;
        z-index: 99;
    }
}
.overflow-style {
    position: absolute;
    top: 8px;
    width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
    text-indent: 3px;
}

.expand-content {
    width: 100%;
    margin-top: 10px;
    font-size: 12px;
}

// 拓展信息
.modal-content {
    padding: 20px;
    .remark {
        padding: 2px 5px;
    }
}

.mgtop10 {
    margin-top: 10px;
    .review {
        color: $mainColor;
        cursor: pointer;
    }
}
.main {
    width: 100%;
}
/* 核查 */
.verificate {
    margin: 20px auto;
    text-align: center;
    font-size: 16px;
    .verificate-icon {
        display: inline-block;
        width: 48px;
        height: 48px;
        background: url('./images/warning.png') no-repeat;
        background-size: cover;
    }
}
</style>