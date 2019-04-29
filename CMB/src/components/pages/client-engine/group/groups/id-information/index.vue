<!--证件信息-->
<template>
    <div class="content">
        <div class="app__title-1">
            <span class="app__title-name">证件信息</span>
        </div>
        <span class="btn-add" @click="handleAdd" v-if="userRightBtnControl.addBtn">
            <i class="iconfont icontianjia"></i>
        </span>
        <div class="main" ref="mainHeight">
            <Scroll class="app__table" :isShowBottom="true" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
                <DragGroup class="m-title app__table-thead" :inline="true" :titleList="tableTitleData" @dragchange="dragchange">
                    <DragItem :width="item.width" :value="item" 
                        v-for="(item,index) in tableTitleData"
                        :key="index">
                        <span>{{item.name}}</span>
                    </DragItem>
                    <Col :width="120" class="app__table-right">
                        <span>操作</span>
                    </Col>
                </DragGroup>
                <Row :class="['m-item app__table-item']" :inline="true" v-for="(table,index) in tableItemData" :key="index">
                    <Col :width="item.width" :title="table[item.param]" class="overflow-style" :inline="true" v-for="(item,index) in tableTitleData" :key="index">
                        <span v-if="item.param == 'isMainCert'">
                            {{getMainCert(table[item.param])}}
                        </span>
                        <span v-else-if="item.param == 'statusCd'">
                            {{changeStatusCd(table[item.param])}}
                        </span>
                        <span v-else-if="item.param == 'nationality'">
                            {{table[item.param] | filterName}}
                        </span>
                        <span v-else-if="item.param == 'certType'">
                            {{table[item.param] | filterName}}
                        </span>
                        <span v-else-if="item.param == 'certSubType'">
                            {{getCertSubType(table[item.param])}}
                        </span>
                        <span v-else-if="item.param == 'checkTime' || item.param == 'expDate' || item.param == 'createDate' || item.param == 'updateDate'">
                            {{table[item.param] | date}}
                        </span>
                        <span v-else>
                            {{table[item.param]}}
                        </span>
                    </Col>
                    <Col :width="120" class="app__table-right">
                        <span class="review" @click="handleCheck(table)" v-show="table.certType=='1|居民身份证'" v-if="userRightBtnControl.checkBtn">核查</span>
                        <span class="review" @click="handleModify(table)" v-if="userRightBtnControl.updateBtn">修改</span>
                        <span class="review" @click="handleDelete(table)" v-if="userRightBtnControl.deleteBtn">删除</span>
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
        <!-- 证件信息新增S -->
        <Dialog ref="modalType" :dialogTitle="certificatesDialogTitle" :dialogSize="dialogSize" :initBtn="true">
            <div class="modal-content">
                <Scroll :isShowRight="true">
                    <Form labelWidth="120px" labelAlign="left" data-vv-scope="revise" class="main-content">
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="证件类型：" :requiredIcon="true" :errorMessage="errors.first('revise.certType')">
                                    <Select v-validate="'required'" :data="certTypeArray" v-model="certificatesData.certType" name="certType" data-vv-as="证件类型" :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2" v-show="certificatesData.certType == '49'">
                                <FormItem labelText="证件子类型：" :requiredIcon="true" :errorMessage="errors.first('revise.certSubType')">
                                    <Select
                                        name="certSubType"
                                        data-vv-as="证件子类型"
                                        v-validate="certificatesData.certType == 49 ? 'required' : ''"
                                        :data="certSubTypeData"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        v-model="certificatesData.certSubType"></Select>
                                </FormItem>
                            </Col>
                           
                            <Col :span="11" :offset="2" v-show="certificatesData.certType == '3'">
                                <FormItem labelText="国家/地区: " :requiredIcon="true" :errorMessage="errors.first('revise.nationality')">
                                    <Select 
                                            name="nationality"
                                            :data="nationalityData"
                                            v-model="certificatesData.nationality"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            data-vv-as="国家/地区"
                                            v-validate="certificatesData.certType == '3' ? 'required' : ''">
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="24">
                                <FormItem labelText="证件号码：" :requiredIcon="true" :errorMessage="errors.first('revise.certNum')">
                                    <Input :disabled="certificatesData.certType == 7 ? true : false" v-validate="'required|isCard'" class="certipt" v-model="certificatesData.certNum" name="certNum" data-vv-as="证件号码"></Input>
                                    <span v-show="certificatesData.certType == '1'"  class="changecert app__btn" :class="isLong ? 'black' : ''" @click="certificatesData.certNum.length == '15' ? changeCertNum(certificatesData.certNum) : ''" :disabled="certDisabled">转为18位号码</span>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row v-if="isShowCheckTime">
                            <Col :span="11">
                                <FormItem labelText="证件有效期: ">
                                    <Input disabled name="expDate" :value="certificatesData.effDate | getTime"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="证件失效期: ">
                                    <Input disabled name="effDate" :value="certificatesData.expDate | getTime"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="证件地址: ">
                                    <Input v-model="certificatesData.certAddr"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="机构状态：">
                                    <Select :disabled="disabled" :isNullSel="false" :data="statusCdArr" dataLabelStr="attrValueName" dataValueStr="attrValue" v-model="certificatesData.statusCd"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="签发机关：">
                                    <Input :disabled="disabled" v-model="certificatesData.certOrg"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="主要证件：">
                                    <RadioGroup :data="sexArray" name="contactGender" v-model="certificatesData.isMainCert"></RadioGroup>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Scroll>
            </div>
            <div slot="btnBox">
                <span class="save" @click="handleSave">保存</span>
                <span class="back" @click="handleCancel">返回</span>
            </div>
        </Dialog>
        <!-- 证件信息新增E -->
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
        <!-- 删除弹窗S -->
        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm"></Tip>
        <!-- 删除弹窗E -->

        <Tip ref="certTip" :tipObj="tipObj" @confirm="certConfirm" @back="certCancel"></Tip>
    </div>
</template>
<script type="text/javascript">
import mainData from '@/assets/json/main.json'
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
                    iconType: 1,
                    msg: "",
                    showBtn: {
                        clear: true,
                        save: true
                    }
                },
                tipObj: {
                    iconType: 3,
                    msg: '该证件仅能用于党政军且须加盖公章，是否确认？',
                    showBtn: {
                        clear: true,
                        save: true
                    }
                },
                tableTitleData:[
                    {
                        name: '主要证件',
                        param: 'isMainCert',
                        width: 120
                    },{
                        name: '证件类型',
                        param: 'certType',
                        width: 120
                    },{
                        name: '证件子类型',
                        param: 'certSubType',
                        width: 200
                    },{
                        name: '证件号码',
                        param: 'certNum',
                        width: 160
                    },{
                        name: '证件地址',
                        param: 'certAddr',
                        width: 200
                    },{
                        name: '组织机构代码注销日期',
                        param: 'expDate',
                        width: 200
                    },{
                        name: '机构状态',
                        param: 'statusCd',
                        width: 120
                    },{
                        name: '签发机关',
                        param: 'certOrg',
                        width: 120
                    },{
                        name: '核查结果',
                        param: 'certCheckResult',
                        width: 120
                    },{
                        name: '核查日志',
                        param: 'remark',
                        width: 120
                    },{
                        name: '核查时间',
                        param: 'checkTime',
                        width: 120
                    },{
                        name: '创建人',
                        param: 'createStaff',
                        width: 120
                    },{
                        name: '创建时间',
                        param: 'createDate',
                        width: 120
                    },{
                        name: '修改人',
                        param: 'updateStaff',
                        width: 120
                    },{
                        name: '修改时间',
                        param: 'updateDate',
                        width: 120
                    }
                ],
                tableItemData: [],
                certificatesDialogTitle: '',     // 弹窗标题
                dialogSize: {
                    max: 800
                },
                certificatesData: {},     // 弹窗数据对象
                certTypeArray: mainData.certTypeData,     // 证件类型
                certSubTypeData: [],   // 证件子类型
                nationalityData: [],                        // 国家/地区
                statusCdArr: [],
                sexArray: [
                    {
                        label: '是',
                        value: '1'
                    },{
                        label: '否',
                        value: '0'
                    }
                ],
                deleteData: {},
                checkType: '0',  // 核查方式
                isShowCheckTime: false,
                disabled: false,          // 机构状态
                isLong: true,    // 身份证长度
                certDisabled: true,
                compulsoryVerificateTitle: '强制核查',
                compulsoryVerificateDialogSize: {
                    max: 500
                },
                verificateTitleObj: {},
                userRightBtnControl: {          // 权限按钮控制
                    addBtn: false,
                    updateBtn: false,
                    deleteBtn: false,
                    checkBtn: false,
                    forceCheckBtn: false
                },
                isHidden: ''         // 控制证件子类型
            }
        },
        watch: {
            // 证件类型
            'certificatesData.certType' (newVal, oldVal) {
                if (newVal == '7') {
                    this.certificatesData.certNum = '000000'
                    this.$refs.certTip.show()
                } else if(newVal != '7' && this.certificatesData.certNum == '000000'){
                    this.certificatesData.certNum = ''
                }
                if(newVal != '49' && oldVal == '49'){
                    this.certificatesData.certSubType = ''
                }
            },

            'certificatesData.certNum' (oldVal) {
                if (!oldVal) return
                if(oldVal.length == 15){
                    this.isLong = false;
                    this.certDisabled = false;
                }else{
                    this.isLong = true;
                    this.certDisabled = true;
                }
            }
        },
        mounted() {
            this.getListData();
            this.getMainData();
            // 循环权限数据
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100611':
                        this.userRightBtnControl.addBtn = true;
                        break;
                    case 'F-CMB-100612':
                        this.userRightBtnControl.updateBtn = true;
                        break;
                    case 'F-CMB-100613':
                        this.userRightBtnControl.deleteBtn = true;
                        break;
                    case 'F-CMB-100614':
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
                // 国家/地区
                this.$getjsons.getJson("PTY-0005").then(res => {
                    this.nationalityData = res.data.attrSpecDetail.attrValueList
                })
                // 证件子类型
                this.$getjsons.getJson("PTY-SH-0004").then(res => {
                    this.certSubTypeData = res.data.attrSpecDetail.attrValueList
                })
                // 机构状态
                this.$getjsons.getJson("PUB-C-0001").then(res => {
                    this.statusCdArr = res.data.attrSpecDetail.attrValueList
                })
            },

            // confirm 
            certConfirm () {
                this.$refs.certTip.hide()
            },

            // cancel
            certCancel () {
                this.certificatesData.certType = '1'
                this.certificatesData.certNum = ''
            },

            // 分页
            pageChange(val){
                this.getListData(val)
            },
            dragchange(val){
                this.tableTitleData = val;
            },
            // 列表查询
            getListData (pageIndex = 1) {
                this.$axios.get(this.$api.CustCert, {
                    params: {
                        custId: this.componentData.custId,
                        staffId: this.$user.getStaffId(),
                        sysRoleIds: this.$user.getSysRoleId(),
                        sysUserId: this.$user.getSysUserId(),
                        orgId: this.$user.getOrgId(),
                        xSubChannel: this.$user.getXSubChannel(),
                        pageNum: pageIndex,
                        pageSize: this.pageInfo.pageSize
                    }
                }).then(res => {
                    if (res.data.length) {
                        this.tableItemData = res.data;
                        this.pageInfo.pageIndex = pageIndex
                        this.tableItemData.map(item => {
                            if (item.certCheckResult == 1006) {
                                item.certCheckResult = '通过'
                            } else if (item.certCheckResult == 1100) {
                                item.certCheckResult = '不通过'
                            } else {
                                item.certCheckResult = '未核查'
                            }
                            item['nationality'] = item.partyInd.nationality
                            return item
                        })
                        this.$nextTick( () => {
                            this.$refs.listScroll.init();
                        })
                    } else {
                        this.$message.warning({"message": "暂无数据"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            changeStatusCd(num) {
                let obj = this.statusCdArr.find(item => item.attrValue == num);
                return obj.attrValueName
            },
            // 主要证件展示
            getMainCert(val) {
                if(val == '1'){
                    return '是'
                }else{
                    return '否'
                }
            },
            //展示证件子类型
            getCertSubType(val) {
                let obj = this.certSubTypeData.find(item => item.value == val);
                if(obj != undefined){
                    return obj.label
                } else {
                    return ''
                }
            },
            // 转18位号码
            changeCertNum(val) {
                // 370802940221002
                let cardIdObj = this.$utils.checkCardID(val);
                if(cardIdObj.code == '0'){
                    this.$message.warning({"message": cardIdObj.val});
                }else{
                    this.certificatesData.certNum = cardIdObj.val;
                }
            },
            handleSave() {
                this.$validator.validateAll().then((result) => {
                    if (!result) {
                        return
                    } else {
                        this.getCertificates()
                    }
                })
            },
            // 返回
            handleCancel () {
                this.$refs.modalType.hide()
            },
            // 点击添加
            handleAdd() {
                this.isUpdate = false;
                this.disabled = false;
                this.certificatesDialogTitle = '新增证件'
                this.isShowCheckTime = false
                this.disabled = false
                this.operateFlag = 1
                this.$refs.modalType.show()
                this.certificatesData = {
                    certType: '1',
                    isMainCert: '0'
                }
            },
            // 点击修改
            handleModify (data) {
                this.isUpdate = true;
                this.disabled = true;
                this.certificatesDialogTitle = '修改证件'
                this.isShowCheckTime = true
                this.disabled = true
                this.operateFlag = 2
                this.certificatesData = Object.assign({}, data)

                if (this.certificatesData.certNum.indexOf('**')) {
                    this.certificatesData['certNum'] = ''
                }

                Object.keys(this.certificatesData).forEach((key) => {
                    if (typeof this.certificatesData[key] === 'string' && this.certificatesData[key].indexOf('|') !== -1) {
                        this.certificatesData[key] =  this.certificatesData[key].split('|')[0]
                    }
                })
                this.$refs.modalType.show();
            },
            // 点击删除
            handleDelete (data) {
                if(data.isMainCert == '1'){
                    this.$message.warning({"message": "主要证件不能删除"});
                    return
                }else if(this.tableItemData.length == 1){
                    this.$message.warning({"message": "当前证件不能删除"});
                    return
                }
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `确认要删除吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
                this.deleteData = data;
                
            },
            // 确认删除
            tipConfirm () {
                this.delCertificates();
            },
            // 新增、保存接口
            getCertificates() {
                this.$validator.validateAll('revise').then((result) => {
                    if(result) {
                        if(this.certificatesData.certType == '1'){
                            if(!this.$utils.isCardId(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的身份证号码"});
                                return
                            }else if(this.certificatesData.certNum.length == 15){
                                this.$message.warning({"message":"请先转成18位身份证号码"});
                                return
                            }
                        }else if (this.certificatesData.certType == '2') {
                            if(!this.$utils.isSoldier(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的军人证号码"});
                                return
                            }
                        }else if(this.certificatesData.certType == '3'){
                            if(!this.$utils.isPassPort(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的护照号码"});
                                return
                            }
                        }else if(this.certificatesData.certType == '4'){
                            if(!this.$utils.isPassCard(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的港澳台通行证"});
                                return
                            }
                        } else if (this.certificatesData.certType == '15'){
                            if(!this.$utils.isOrg(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的组织机构代码证"});
                                return
                            }
                        } else if (this.certificatesData.certType == '39'){
                            if(!this.$utils.isTaxAdministration(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的税务登记证"});
                                return
                            }else if(this.certificatesData.isMainCert == 1){
                                this.$message.warning({"message":"税务登记证不能设置为主要证件"});
                                return
                            }
                        }else if (this.certificatesData.certType == '34'){
                            if(!this.$utils.isInstitution(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的事业单位法人证"});
                                return
                            }
                        }else if (this.certificatesData.certType == '43'){
                            if(!this.$utils.isSocialOrganization(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的社会团体法人登记证"});
                                return
                            }else if(this.certificatesData.isMainCert == 1){
                                this.$message.warning({"message":"社会团体法人登记证不能设置为主要证件"});
                                return
                            }
                        }else if (this.certificatesData.certType == '49'){
                            if(!this.$utils.isSocialCredit(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的统一社会信用代码证"});
                                return
                            }
                        }else if(this.certificatesData.certType == '50'){
                            if(!this.$utils.isForeign(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的外国人永久居留居住证"});
                                return
                            }
                        }else if(this.certificatesData.certType == '12'){
                            if(!this.$utils.isAccountCard(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的户口薄号码"});
                                return
                            }
                        }else if(this.certificatesData.certType == '52'){
                            if(!this.$utils.isEighteen(this.certificatesData.certNum)){
                                this.$message.warning({"message":"请输入正确的人民武装警察证"});
                                return
                            }
                        }
                        let operateData =  {
                            certAddr: this.certificatesData.certAddr,
                            certNum: this.certificatesData.certNum,
                            certType: this.certificatesData.certType,
                            certSubType: this.certificatesData.certSubType,
                            effDate: this.certificatesData.effDate,
                            expDate: this.certificatesData.expDate,
                            isMainCert: this.certificatesData.isMainCert,
                            partyId: this.componentData.partyId,
                            certOrg: this.certificatesData.certOrg,
                            statusCd: "1000",
                            certName: this.componentData.custName,
                            nationality: this.certificatesData.nationality
                        }
                        if(this.operateFlag == '2'){
                            operateData.partyCertId = this.certificatesData.partyCertId;
                            operateData.updateDate = this.$utils.getLocalTime();
                            operateData.updateStaff = this.$user.getStaffId();
                        }else{
                            operateData.createDate = this.$utils.getLocalTime();
                            operateData.createStaff = this.$user.getStaffId();
                        }
                        this.$axios({
                            method: this.operateFlag == '1' ? 'post' : 'patch',      // 为true 表示新增，反之修改
                            url: this.$api.CusPartyCert,
                            data: operateData
                        }).then(res => {
                           if (res.data.partyId) {
                               this.$message.success({"message": "成功"})
                               this.getListData();
                               this.$refs.modalType.hide();
                               this.$refs.tip.hide();
                            } else {
                                this.$message.error({"message": "失败"})
                            }
                        }).catch(err => {
                            this.$message.error({"message": err.response.data.message})
                        })
                    }
                })
            },
            // 证件删除
            delCertificates() {
                this.$axios.delete(this.$api.CusPartyCert,{
                    data: {
                        partyCertId: this.deleteData.partyCertId
                    }
                }).then(res => {
                    if (res.data.partyId) {
                       this.$message.success({"message": "成功"})
                       this.getListData();
                       this.$refs.tip.hide();
                    } else {
                        this.$message.error({"message": "失败"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            // 核查
            handleCheck (data){
                this.$axios.get(this.$api.Contact + '/checker',{
                    params: {
                        createStaff: this.$user.getStaffId(),
                        checkName: this.componentData.custName,
                        certId: data.partyCertId,
                        // custId: this.componentData.custId,
                        checkType: this.checkType
                    }
                }).then(res => {
                    if (res.data.checkResult) {
                        this.$message.success({"message": "核查成功"})
                        this.getListData()
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
                this.verificateTitleObj['certId'] = this.verificateTitleObj.certId
                this.handleCheck(this.verificateTitleObj)
            },
            changeHeight() {
                this.$refs.mainHeight.style.height = "calc(100% - 336px)"
            },
            changeLow() {
                this.$refs.mainHeight.style.height = "calc(100% - 236px)"
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
        
        .main{
            width: 100%;
            height: calc(100% - 236px);

            .overflow-style {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .review {
                color: $mainColor;
                cursor: pointer;
            }
            .empty-style {
                width: 2000px;
            }
        }

        .modal-content {
            height: 100%;
            
            .main-content {
                padding: 20px 30px;
            }
            .remark {
                padding: 2px 5px;
            }
            .certipt {
                width: 36%;
            }
            .changecert {
                position: absolute;
                left: 40%;
                top: 2px;
                background: $mainColor;
                color: #fff;

                &.black{
                    background: #dddddd;
                }
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