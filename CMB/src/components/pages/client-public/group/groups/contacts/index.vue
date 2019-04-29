<!--联系人信息-->
<template>
    <div class="content">    
        <div class="app__title-1">
            <span class="app__title-name">联系人信息</span>
        </div>
        <span class="btn-add" @click="handleAdd" v-if="userRightBtnControl.addBtn">
            <i class="iconfont icontianjia"></i>
        </span>
        <div class="btn-content">
            <ConditionSearch :data="conditionSearchData" @search="handleSearch"></ConditionSearch>
        </div>
        <div class="main" ref="mainHeight">
            <Scroll class="app__table" :isShowBottom="true" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
                <DragGroup class="m-title app__table-thead" :inline="true" :titleList="tableTitleData" @dragchange="dragchange">
                    <DragItem :width="item.width" :value="item" v-for="(item,index) in tableTitleData"
                        :key="index">
                        <span>{{item.name}}</span>
                    </DragItem>
                    <Col :width="120" class="app__table-right">
                        <span>操作</span>
                    </Col>
                </DragGroup>
                <Row :class="['m-item app__table-item']" :inline="true" v-for="(table,index) in tableItemData" :key="index">
                    <Col :width="item.width" v-for="(item,index) in tableTitleData" :inline="true" :key="index">
                        <span v-if="item.param == 'headFlag'">{{table[item.param] == 1 ? '是' : '否' }}</span>
                        <span v-else-if="item.param == 'contactGender' || item.param == 'contactCertType'">
                            {{getTableName(item.param,table[item.param])}}
                        </span>
                        <span v-else-if="item.param == 'contactType'">
                            {{table[item.param] | filterName}}
                        </span>
                        <span v-else-if="item.param == 'checkDate'">
                            {{table[item.param] | date}}
                        </span>
                        <span v-else>
                            {{table[item.param]}}
                        </span>
                    </Col>
                    <Col :width="120" class="app__table-right">
                        <span class="review" @click="handleCheck(table)" v-show="table.contactCertType=='1|居民身份证'" v-if="userRightBtnControl.checkBtn">核查</span>
                        <span class="review" @click="handleModify(table)" v-if="userRightBtnControl.updateBtn">修改</span>
                        <span class="review" @click="handleRemove(table)" v-if="userRightBtnControl.deleteBtn">删除</span>
                    </Col>
                </Row>
                <Row class="empty-style" :class="['m-item app__table-item']" v-for="empty in 20 - tableItemData.length" :key="empty.id">    
                </Row>
                <div v-if="!tableItemData.length" class="app__data-none">
                    <span>当前暂无数据 请添加</span>
                </div>
            </Scroll>
        </div>
        <div class="footer" v-if="tableItemData.length">
            <Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
            </Pagination>
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
                                <FormItem labelText="主要联系人: " :offset="2">
                                    <RadioGroup :data="contactArray" name="headFlag" v-model="contactOperateData.headFlag"></RadioGroup>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="联系人类型：">
                                    <Select
                                        :data="contactTypeArray"
                                        v-model="contactOperateData.contactType"
                                        name="contactType"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        ></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="工作电话号码: " :requiredIcon="true" :errorMessage="errors.first('revise.officePhone')">
                                    <Input name="officePhone" data-vv-as="工作电话号码" v-validate="'required|isHomeNum'" v-model.trim="contactOperateData.officePhone"></Input>
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
                                    <Input name="homePhone" v-validate="'isHomeNum'" v-model="contactOperateData.homePhone"></Input>
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
                                <FormItem labelText="电子邮件: " :requiredIcon="true" :errorMessage="errors.first('revise.eMail')">
                                    <Input name="eMail" v-validate="'required|email'"  v-model="contactOperateData.eMail"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="证件类型：" :requiredIcon="true" :errorMessage="errors.first('revise.contactCertType')">
                                    <Select :disabled="disabled" data-vv-as="证件类型" v-validate="'required'" :data="certTypeArray" v-model="contactOperateData.contactCertType" name="contactCertType"></Select>
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
                                <FormItem labelText="移动电话号码: " :errorMessage="errors.first('revise.mobilePhone')">
                                    <Input v-validate="'isPhone'" data-vv-as="移动电话号码" name="mobilePhone" v-model.trim="contactOperateData.mobilePhone"></Input>
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
        <!-- 联系人信息新增E -->
        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
    </div>
</template>
<script type="text/javascript">
    export default{
        props: {
            componentData: {}
        },
        data(){
            return{
                flag: true,
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                },
                tipInfo: {
                    iconType: 3,
                    msg:'',
                    showBtn:{
                        clear: true,
                        save: true
                    }
                },
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
                        name: '移动电话号码',
                        param: 'mobilePhone',
                        width: 160
                    },{
                        name: '联系人类型',
                        param: 'contactType',
                        width: 120
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
                        width: 160
                    },{
                        name: '证件号码',
                        param: 'certNum',
                        width: 160
                    },{
                        name: 'QQ号',
                        param: 'qqCode',
                        width: 120
                    },{
                        name: '微信号',
                        param: 'wxCode',
                        width: 120
                    },{
                        name: '联系地址',
                        param: 'contactAddr',
                        width: 200
                    },{
                        name: '核查结果',
                        param: 'checkResult',
                        width: 120
                    },{
                        name: '核查时间',
                        param: 'checkDate',
                        width: 120
                    }
                ],
                tableItemData: [],
                contactDialogTitle: '',     // 弹窗标题
                dialogSize: {
                    max: 800
                },
                operateFlag: '',
                contactName: '',
                contactDel: {},   // 删除数据
                contactOperateData: {},     // 弹窗数据对象
                checkType: '0',  // 核查方式
                compulsoryVerificateTitle: '强制核查',
                compulsoryVerificateDialogSize: {
                    max: 500
                },
                verificateTitleObj: {},
                certTypeArray: [     // 证件类型
                    {
                        label: '居民身份证',
                        value: '1'
                    },{
                        label: '外国公民护照',
                        value: '3'
                    },{
                        label: '军人身份证件',
                        value: '2'
                    },{
                        label: '户口薄',
                        value: '12'
                    },{
                        label: '人民武装警察居民身份证',
                        value: '52'
                    },{
                        label: '外国人永久居留身份证',
                        value: '50'
                    },{
                        label: '港澳台通行证',
                        value: '4'
                    },{
                        label: '港澳居民居住证',
                        value: '54'
                    },{
                        "label": "其它有效证件",
                        "value": "99"
                    }
                ],
                sexArray: [
                    {
                        label: '男',
                        value: '1'
                    },{
                        label: '女',
                        value: '0'
                    }
                ],
                contactArray: [
                    {
                        label: '是',
                        value: '1'
                    },{
                        label: '否',
                        value: '0'
                    }
                ],
                contactTypeArray: [],
                disabled: false,
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
        mounted() {
            this.getListData();
            this.getMainData()
            // 循环权限数据
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100709':
                        this.userRightBtnControl.addBtn = true;
                        break;
                    case 'F-CMB-100710':
                        this.userRightBtnControl.updateBtn = true;
                        break;
                    case 'F-CMB-100711':
                        this.userRightBtnControl.deleteBtn = true;
                        break;
                    case 'F-CMB-100712':
                        this.userRightBtnControl.checkBtn = true;
                        break;
                    case 'F-CMB-100707':
                        this.userRightBtnControl.forceCheckBtn = true;
                        break;
                    default:
                        break;
                }
            })
        },
        watch: {
            componentData (newVal) {
                this.getListData()
            }
        },
        methods:{
            // 主数据
            getMainData () {
                // 联系人类型
                this.$getjsons.getJson("PTY-SH-0001").then(res => {
                    this.contactTypeArray = res.data.attrSpecDetail.attrValueList
                })
            },
            // 分页
            pageChange(val){
                this.getListData(val)
            },
            dragchange(val){
                this.tableTitleData = val;
            },
            handleAdd() {

            },
            // 搜索
            handleSearch (data) {
                this.contactName = data.contactName;
                this.getListData();
            },

            // 列表查询
            getListData (pageIndex = 1) {
                this.$axios.get(this.$api.BasicInfo, {
                    params: {
                        custId: this.componentData.custId,
                        contactName: this.contactName,
                        partyId: '',
                        pageNum: pageIndex,
                        pageSize: this.pageInfo.pageSize,
                        statusCd: '1000',
                        staffId: this.$user.getStaffId(),
                        orgId: this.$user.getOrgId(),
                        xSubChannel: this.$user.getXSubChannel(),
                        sysRoleIds: this.$user.getSysRoleId(),
                        sysUserId: this.$user.getSysUserId()
                    }
                }).then(res => {
                    if (res.data.length) {
                        this.tableItemData = res.data;
                        this.pageInfo.pageIndex = pageIndex;
                        this.tableItemData.map(item => {
                            if (item.checkResult === 1000) {
                                item.checkResult = '通过'
                            } else if (item.checkResult === 1100) {
                                item.checkResult = '不通过'
                            } else if(item.checkResult === 1200){
                                item.checkResult = '失败'
                            } else {
                                item.checkResult = '未核查'
                            }
                        })
                        this.$nextTick( () => {
                            this.$refs.listScroll.init();
                        })
                    } else {
                        this.$message.warning({message: '暂无数据'})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            // 点击添加
            handleAdd () {
                this.contactDialogTitle = '新增联系人'
                this.disabled = false
                this.operateFlag = 1
                this.$refs.modalType.show()
                this.contactOperateData = {
                    headFlag: '0',
                    contactCertType: '1',
                    contactGender: '0'
                }
            },
            // 核查
            handleCheck (data){
                this.$axios.get(this.$api.Contact + '/checker',{
                    params: {
                        createStaff: this.$user.getStaffId(),
                        checkName: this.componentData.custName,
                        certId: data.certId,
                        // custId: this.componentData.custId,
                        checkType: this.checkType
                    }
                }).then(res => {
                    if (res.data.checkResult) {
                        this.$message.success({"message": "核查成功"})
                        this.getListData(this.pageInfo.pageIndex)
                    } else {
                        this.$message.error({"message": "核查失败"})
                        this.$refs.compulsoryVerificate.show()
                        this.verificateTitleObj = res.data
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            // 强制核查返回
            verificateBack () {    
                this.$refs.compulsoryVerificate.hide()
            },

            // 强制核查
            verificateSave () {
                this.checkType = 1
                this.verificateTitleObj['contactName'] = this.verificateTitleObj.checkName
                this.verificateTitleObj['certNum'] = this.verificateTitleObj.checkCertNum
                this.handleCheck(this.verificateTitleObj)
            },
            // 点击修改
            handleModify (data) {
                this.contactDialogTitle = '修改联系人'
                this.disabled = true
                this.operateFlag = 2;
                this.contactOperateData = JSON.parse(JSON.stringify(data));
                if(this.contactOperateData.certNum != null){
                    if(this.contactOperateData.certNum.indexOf('**') != -1){
                        this.contactOperateData.certNum = '';
                    }
                }
                if(this.contactOperateData.headFlag == '是'){
                    this.contactOperateData.headFlag = 1
                }else if(this.contactOperateData.headFlag == '否'){
                    this.contactOperateData.headFlag = 0
                }
                Object.keys(this.contactOperateData).forEach((key) => {
                    if (typeof this.contactOperateData[key] === 'string' && this.contactOperateData[key].indexOf('|') !== -1) {
                        this.contactOperateData[key] =  this.contactOperateData[key].split('|')[0]
                    }
                })
                this.$refs.modalType.show();
            },
            // 点击删除
            handleRemove (data) {
                this.tipInfo.msg = `确认要删除吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
                this.contactDel = data;
            },
            tipConfirm() {
                this.operateFlag = 3;
                this.contactOperateData = JSON.parse(JSON.stringify(this.contactDel));
                if(this.contactOperateData.headFlag == '是'){
                    this.contactOperateData.headFlag = 1
                }else if(this.contactOperateData.headFlag == '否'){
                    this.contactOperateData.headFlag = 0
                }
                this.getContact();
            },
            handleSave() {
                this.$validator.validateAll().then((result) => {
                    if (!result) {
                        return
                    } else {
                        this.getContact()
                    }
                })
            },
            // 返回
            handleCancel () {
                this.$refs.modalType.hide()
            },
            // 主要证件展示
            getTableName(param,val){
                if(param == 'contactGender'){
                    return val == '1' ? '男' : (val == '0' ? '女' : '');
                }else if(param == 'contactCertType'){
                    if(val != '' && val != null){
                        return val.split('|')[1]
                    }
                }
            },

            // 新增、保存接口
            getContact() {
                this.$validator.validateAll('revise').then((result) => {
                    if (!result) {
                        return
                    } else {
                        if(this.contactOperateData.contactCertType == '1'){
                            if(!this.$utils.isCardId(this.contactOperateData.certNum)){
                                this.$message.warning({"message":"请输入正确的身份证号码"});
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
                        }
                        this.addContact();
                    }
                })
            },
            addContact() {
                let operateData = {
                    unsuitableContactTime: '',
                    custId: this.componentData.custId,
                    fax: this.contactOperateData.fax,
                    eMail: this.contactOperateData.eMail,
                    partyId: this.contactOperateData.partyId,
                    statusCd: this.operateFlag == '3' ? "1100" : "1000",
                    contactType: this.contactOperateData.contactType,
                    contactCertType: this.contactOperateData.contactCertType,
                    contactCert: this.contactOperateData.certNum,
                    mobilePhone: this.contactOperateData.mobilePhone,
                    homePhone: this.contactOperateData.homePhone,
                    contactName: this.contactOperateData.contactName,
                    contactGender: this.contactOperateData.contactGender,
                    contactAddr: this.contactOperateData.contactAddr,
                    headFlag: this.contactOperateData.headFlag,
                    wxCode: this.contactOperateData.wxCode,
                    qqCode: this.contactOperateData.qqCode,
                    officePhone: this.contactOperateData.officePhone,
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
                    this.$message.error({"message": err.response.data.message})
                })
            },
            changeHeight() {
                this.$refs.mainHeight.style.height = "calc(100% - 346px)"
            },
            changeLow() {
                this.$refs.mainHeight.style.height = "calc(100% - 270px)"
            }
        }
    }
</script>
<style scoped lang="scss">

    .content{
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
        .btn-content {
            width: 380px;
            position: absolute;
            top: 22px;
            right: 100px;
            z-index: 99;
        }

        .main{
            width: 100%;
            height: calc(100% - 270px);

            .review {
                color: $mainColor;
                cursor: pointer;
            }
            .empty-style {
                width: 2240px;
            }
        }

        .search-content{
            padding-bottom: 10px;
        }
        .modal-content {
            height: 100%;
            padding: 20px;
            
            .main-content {
                padding: 20px 30px;
            }
            .remark {
                padding: 2px 5px;
            }
        }
        /* 核查 */
        .verificate {
            margin: 20px auto;
            text-align: center;
            font-size: 16px;
            .verificate-icon {
                display: inline-block;
                width: 80px;
                height: 80px;
                background: url('./images/warning.png') no-repeat;
                background-size: cover;
            }
        }
    }
</style>