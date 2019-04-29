<template>
    <div>
        <div class="basic">
            <div class="app__title-1">
                <span class="app__title-name">客户扩展信息</span>
            </div>
            <span class="btn-mod" @click="handleChange" v-if="userRightBtnControl.basicUpdateBtn"><i class="iconfont iconbianjixinxi"></i></span>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">国家/地区：</span>
                    <span class="app__lt-text" :title="partyInd.nationality | filterName">{{partyInd.nationality | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">民族：</span>
                    <span class="app__lt-text" :title="partyInd.nation | filterName">{{partyInd.nation | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">性别：</span>
                    <span v-if="partyInd.gender == '1'">男</span>
                    <span v-else-if="partyInd.gender == '0'">女</span>
                    <span v-else></span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">出生日期：</span>
                    <span class="app__lt-text" :title="partyInd.birthday | date">{{partyInd.birthday | date}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户信息使用许可：</span>
                    <span class="app__lt-text" :title="getAttrName(cusLicense.attrValue)">{{getAttrName(cusLicense.attrValue)}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户职业：</span>
                    <span class="app__lt-text" :title="partyInd.occupation | filterName">{{partyInd.occupation | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">政治面貌：</span>
                    <span class="app__lt-text" :title="partyInd.politicalStatus">{{partyInd.politicalStatus}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">担当职务：</span>
                    <span class="app__lt-text" :title="partyInd.position">{{partyInd.position}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">教育程度：</span>
                    <span :title="partyInd.education | filterName">{{partyInd.education | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">所属单位：</span>
                    <span :title="partyInd.employer">{{partyInd.employer}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">婚姻状况：</span>
                    <span :title="partyInd.maritalStatus | filterName">{{partyInd.maritalStatus | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">免违约金标识：</span>
                    <span v-if="detailData.lateFeeFlag == '1'">是</span>
                    <span v-else-if="detailData.lateFeeFlag == '0'">否</span>
                    <span v-else></span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">社会背景：</span>
                    <span :title="cusContext.attrValue">{{cusContext.attrValue}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户永不呼叫：</span>
                    <span v-if="cusNevercall.attrValue == '1'">是</span>
                    <span v-else-if="cusNevercall.attrValue == '0'">否</span>
                    <span v-else></span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户永不呼叫截止日期：</span>
                    <span :title="cusDeadline.attrValue">{{cusDeadline.attrValue}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户状态：</span>
                    <span :title="detailData.statusCd | filterName">{{detailData.statusCd | filterName}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户保密等级：</span>
                    <span :title="detailData.secrecyLevel | filterName">{{detailData.secrecyLevel | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户管理编号：</span>
                    <span :title="cusNumber.attrValue">{{cusNumber.attrValue}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">集团客户编号：</span>
                    <span :title="detailData.extCustId">{{detailData.extCustId}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户管控：</span>
                    <span :title="detailData.custControlLevel | filterName">{{detailData.custControlLevel | filterName}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户资料建立时间：</span>
                    <span :title="detailData.createDate | date">{{detailData.createDate | date}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户资料变更时间：</span>
                    <span :title="detailData.updateDate | date">{{detailData.updateDate | date}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户入网时间：</span>
                    <span :title="detailData.enterDate | date">{{detailData.enterDate | date}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户级别：</span>
                    <span :title="changGrade(detailData.custAreaGrade)">{{changGrade(detailData.custAreaGrade)}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="24">
                    <span class="app__lt-label">备注：</span>
                    <span :title="detailData.remark">{{detailData.remark}}</span>
                </Col>
            </Row>
        </div>

        <!-- 拓展信息弹窗S -->
        <Dialog ref="modalType" :dialogTitle="expandDialog" :dialogSize="dialogSize" :initBtn="true">
            <Scroll :isShowRight="true">
                <div class="modal-content">
                    <Form labelWidth="120px" labelAlign="left">
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="国家/地区：" small>
                                    <Input :value="partyIndUp.nationality|filterName" disabled></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="民族: " small>
                                    <Input :value="partyIndUp.nation|filterName" disabled></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="性别：" small>
                                    <RadioGroup :data="sexArray" disabled name="gender" v-model="partyIndUp.gender"></RadioGroup>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="出生日期：" small>
                                    <Input :value="partyIndUp.birthday|getTime" disabled></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="客户信息使用许可：" small>
                                    <Select dataLabelStr="attrValueName" dataValueStr="attrValue" :data="permissArr" v-model="cusLicenseUp.attrValue" name="attrValue"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="客户职业：" small>
                                    <Input :value="partyIndUp.occupation|filterName" disabled></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="政治面貌：" small>
                                    <Select dataLabelStr="attrValueName" dataValueStr="attrValue" :data="politicalStatusArr" v-model="partyIndUp.politicalStatus" name="politicalStatus"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="担当职务：" small>
                                    <Input v-model="partyIndUp.position" disabled></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="教育程度：" small>
                                    <Input :value="partyIndUp.education|filterName" disabled></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="所属单位：" small>
                                    <Input v-model="partyIndUp.employer" disabled></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="婚姻状况：" small>
                                    <Input :value="partyIndUp.maritalStatus|filterName" disabled></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="客户级别：" small>
                                    <Select dataLabelStr="attrValueName" dataValueStr="attrValue" :data="custAreaGradeArr" v-model="expandChangeObjData.custAreaGrade" name="custAreaGrade"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="免违约金标识：" small>
                                    <RadioGroup :data="radioArray" :disabled="!userRightBtnControl.exemptPenalSum" name="lateFeeFlag" v-model="expandChangeObjData.lateFeeFlag"></RadioGroup>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="客户管控：" small>
                                    <Select :data="controlLevelArr" :disabled="userRightBtnControl.controlLevel" dataLabelStr="attrValueName" dataValueStr="attrValue" v-model="expandChangeObjData.custControlLevel" name="custControlLevel"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="社会背景：" small>
                                    <Input v-model="cusContextUp.attrValue" disabled></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="客户永不呼叫：" small>
                                    <RadioGroup :data="radioArray" disabled name="cusNevercallUp" v-model="cusNevercallUp.attrValue"></RadioGroup>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="客户永不呼叫截止日期：" small>
                                    <Input name="attrValue" :value="cusDeadlineUp.attrValue|getTime" disabled></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="客户状态：" small>
                                    <Input :value="expandChangeObjData.statusCd|filterName" disabled></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="集团客户编号：" small>
                                    <Input v-model="expandChangeObjData.extCustId" disabled></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="客户资料建立时间：" small>
                                    <Input name="createDate" :value="expandChangeObjData.createDate|getTime" disabled></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="客户资料变更时间：" small>
                                    <Input name="updateDate" :value="expandChangeObjData.updateDate|getTime" disabled></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="客户入网时间：" small>
                                    <Input name="enterDate" :value="expandChangeObjData.enterDate|getTime" disabled></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="客户管理编号：" small>
                                    <Input v-model="cusNumberUp.attrValue" disabled></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="客户保密等级：" small>
                                    <Select dataLabelStr="attrValueName" :disabled="userRightBtnControl.securityClassification" dataValueStr="attrValue" :data="secrecyLevelArr" v-model="expandChangeObjData.secrecyLevel" name="secrecyLevel"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="24">
                                <FormItem labelText="备注：" small>
                                    <Input v-model="expandChangeObjData.remark" disabled></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Scroll>
            <div slot="btnBox">
                <span class="save" @click="handleConfirm">保存</span>
                <span class="back" @click="handleBack">返回</span>
            </div>
        </Dialog>
        <!-- 拓展信息弹窗E -->
    </div>
</template>

<script type="text/javascript">
    export default{
        props: {
            componentData: {}
        },
        data(){
            return {
                custId: '',
                expandChangeObjData: {},
                detailData: {},
                partyInd: {},        // 个人信息
                custAttr: {},        // 客户属性
                cusLicense: {},   // 客户信息使用许可
                cusLevel: {},    // 客户等级
                cusContext: {},  //社会背景
                cusNevercall: {},  // 客户永不呼叫
                cusDeadline: {},  // 永不呼叫截止时间
                cusNumber: {},  // 客户管理编号
                partyIndUp: {},        // 个人信息
                custAttrUp: {},        // 客户属性
                cusLicenseUp: {},   // 客户信息使用许可
                cusLevelUp: {},    // 客户等级
                cusContextUp: {},  //社会背景
                cusNevercallUp: {},  // 客户永不呼叫
                cusDeadlineUp: {},  // 永不呼叫截止时间
                cusNumberUp: {},  // 客户管理编号
                expandDialog: '扩展信息',
                dialogSize: {
                    max: 820
                },
                politicalStatusArr: [],  // 政治面貌
                maritalStatusArr: [],   // 婚姻状况
                custAreaGradeArr: [],   // 客户级别
                statusCdArr: [],   // 客户状态
                secrecyLevelArr: [],  // 保密等级
                sexArray: [
                    {
                        label: '男',
                        value: '1'
                    },{
                        label: '女',
                        value: '0'
                    }
                ],
                radioArray: [
                    {
                        label: '是',
                        value: '1'
                    },{
                        label: '否',
                        value: '0'
                    }
                ],
                controlLevelArr: [],
                permissArr: [],     //客户信息使用许可
                userRightBtnControl: {          // 权限按钮控制
                    basicUpdateBtn: false,              // 扩展信息按钮
                    exemptPenalSum: false,              // 免违约金
                    securityClassification: false,      // 保密等级
                    serviceLevel: false,                // 客户服务等级
                    controlLevel: false,                // 客户管控级别
                },

            }
        },
        mounted() {
            this.custId = this.componentData.custId;
            this.init();
            // 循环权限数据
            this.$user.getFuncComps().forEach((item) => {
                //console.log(item.compCode + ',,' + item.compName);
                switch (item.compCode) {
                    case 'F-CMB-100702':
                        this.userRightBtnControl.basicUpdateBtn = true;
                        break;
                    case 'F-CMB-100720':
                        this.userRightBtnControl.exemptPenalSum = true;
                        break;
                    case 'F-CMB-100721':
                        this.userRightBtnControl.securityClassification = true;
                        break;
                    case 'F-CMB-100722':
                        this.userRightBtnControl.serviceLevel = true;
                        break;
                    case 'F-CMB-100723':
                        this.userRightBtnControl.controlLevel = true;
                        break;
                    default:
                        break;
                }
            })
        },
        watch: {
            componentData(newVal){
                this.expandChangeObjData = JSON.parse(JSON.stringify(newVal));
                if(this.expandChangeObjData.custControlLevel != null){
                    this.expandChangeObjData.custControlLevel = this.expandChangeObjData.custControlLevel.split('|')[0];
                }
                this.init();
            }
        },
        methods:{
            // 查询扩展信息
            init () {
                this.detailData = JSON.parse(JSON.stringify(this.componentData));
                this.partyInd = this.detailData.partyInd;
                this.custAttr = this.detailData.custAttr;
                this.custAttr.forEach(item => {
                    if(item.attrId == '120006'){  // 客户信息使用许可
                        this.cusLicense = item;
                    }else if(item.attrId == '120019'){ //客户服务等级
                        this.cusLevel = item;
                    }else if(item.attrId == '120022'){  //社会背景
                        this.cusContext = item;
                    }else if(item.attrId == '120007'){  //客户永不呼叫
                        this.cusNevercall = item;
                    }else if(item.attrId == '120008'){  //客户永不呼叫截止时间
                        this.cusDeadline = item;
                    }else if(item.attrId == '120001'){  //客户管理编号
                        this.cusNumber = item;
                    }
                })
                this.getSelectList();
            },
            getSelectList() {
                this.getMainData();
            },
            getMainData() {
                // 政治面貌
                this.$getjsons.getJson('PTY-C-9001').then(res => {
                    this.politicalStatusArr = res.data.attrSpecDetail.attrValueList;
                    let obj = this.politicalStatusArr.find(item => item.attrValue == this.partyInd.politicalStatus);
                    if(obj == undefined){
                        this.partyInd.politicalStatus = '';
                    }else{
                        this.partyInd.politicalStatus = obj.attrValueName;
                    }
                })
                // 客户级别
                this.$getjsons.getJson('CUS-0004').then(res => {
                    if (res.data) {
                        this.custAreaGradeArr = res.data.attrSpecDetail.attrValueList;
                    }
                })
                 // 客户管控
                this.$getjsons.getJson('CUS-C-0017').then(res => {
                    if (res.data) {
                        this.controlLevelArr = res.data.attrSpecDetail.attrValueList;
                    }
                })
                // 客户状态
                this.$getjsons.getJson('CUS-0003').then(res => {
                    if (res.data) {
                        this.statusCdArr = res.data.attrSpecDetail.attrValueList;
                    }
                })
                // 客户信息使用许可
                this.$getjsons.getJson('CUS-SH-012').then(res => {
                    if (res.data) {
                        this.permissArr = res.data.attrSpecDetail.attrValueList;
                    }
                })
                // 保密等级
                this.$getjsons.getJson('CUS-C-0001').then(res => {
                    if (res.data) {
                        this.secrecyLevelArr = res.data.attrSpecDetail.attrValueList;
                    }
                })
            },

            //展示客户级别名称
            changGrade(code) {
                if(code != undefined && code != '' && code != null){
                    let obj = this.custAreaGradeArr.find(item => item.attrValue == code);
                    return obj.attrValueName
                } else {
                    return ''
                }
            },
            // 客户信息使用许可
            getAttrName(code) {
                if(code == '1'){
                    return '允许';
                }else if(code == '2'){
                    return '禁止';
                }else{
                    return '待确认';
                }
            },
            // 点击修改按钮
            handleChange () {
                this.$refs.modalType.show()
                this.expandChangeObjData = JSON.parse(JSON.stringify(this.componentData));
                if(this.expandChangeObjData.custControlLevel != null){
                    this.expandChangeObjData.custControlLevel = this.expandChangeObjData.custControlLevel.split('|')[0];
                }
                if(this.expandChangeObjData.secrecyLevel != null){
                    this.expandChangeObjData.secrecyLevel = this.expandChangeObjData.secrecyLevel.split('|')[0];
                }
                this.expandChangeObjData.updateDate = this.$utils.getLocalTime();
                this.partyIndUp = this.expandChangeObjData.partyInd;
                this.custAttrUp = this.expandChangeObjData.custAttr;
                this.custAttrUp.forEach(item => {
                    if(item.attrId == '120006'){  // 客户信息使用许可
                        this.cusLicenseUp = item;
                    }else if(item.attrId == '120019'){ //客户服务等级
                        this.cusLevelUp = item;
                    }else if(item.attrId == '120022'){  //社会背景
                        this.cusContextUp = item;
                    }else if(item.attrId == '120007'){  //客户永不呼叫
                        this.cusNevercallUp = item;
                    }else if(item.attrId == '120008'){  //客户永不呼叫截止时间
                        this.cusDeadlineUp = item;
                    }else if(item.attrId == '120001'){  //客户管理编号
                        this.cusNumberUp = item;
                    }
                })
            },

            // 保存按钮
            handleConfirm () {
                let arr = [];
                if(this.expandChangeObjData.custAreaGrade != null && this.expandChangeObjData.custAreaGrade != undefined){
                    let a = {
                        op:"replace",
                        path:"/custAreaGrade",
                        value: this.expandChangeObjData.custAreaGrade
                    }
                    arr.push(a);
                };
                if(this.expandChangeObjData.secrecyLevel != null && this.expandChangeObjData.secrecyLevel != undefined){
                    let b = {
                        op:"replace",
                        path:"/secrecyLevel",
                        value: this.expandChangeObjData.secrecyLevel
                    }
                    arr.push(b);
                };
                if(this.expandChangeObjData.custControlLevel != null && this.expandChangeObjData.custControlLevel != undefined){
                    let c = {
                        op:"replace",
                        path:"/custControlLevel",
                        value: this.expandChangeObjData.custControlLevel
                    }
                    arr.push(c);
                };
                if(this.partyIndUp.individualId != null && this.partyIndUp.politicalStatus != undefined){
                    let d = {
                        op:"replace",
                        path:"/partyInd/individualId=" + this.partyIndUp.individualId,
                        value:{
                            statusCd: "1000",
                            politicalStatus: this.partyIndUp.politicalStatus
                        }
                    }
                    arr.push(d);
                }else if(this.partyIndUp.individualId == null && this.partyIndUp.politicalStatus != undefined){
                    let d = {
                        op:"ADD",
                        path:"/custAttrUp/individualId",
                        value:{
                            statusCd: "1000",
                            politicalStatus: this.partyIndUp.politicalStatus
                        }
                    }
                    arr.push(d);
                };
                if(this.cusLicenseUp.custAttrId != null && this.cusLicenseUp.attrValue != undefined){
                    let d = {
                        op:"replace",
                        path: "/custAttr/custAttrId=" + this.cusLicenseUp.custAttrId,
                        value: {
                            attrValue: this.cusLicenseUp.attrValue
                        }
                    }
                    arr.push(d);
                }else if(this.cusLicenseUp.custAttrId == null && this.cusLicenseUp.attrValue != undefined){
                    let d = {
                        op:"ADD",
                        path:"/custAttr",
                        value: {
                            custId: this.componentData.custId,
                            attrId: 120006,
                            attrValue: this.cusLicenseUp.attrValue,
                            statusCd: '1000'
                        }
                    }
                    arr.push(d);
                };
                this.$axios.patch(this.$api.CustomerPublicUpdate + '?custId='+ this.componentData.custId, arr).then(res => {
                    if (res.data) {
                        this.$message.success({"message": "修改成功"});
                        this.$emit('getDetail',this.componentData);
                        this.$refs.modalType.hide()
                    } else {
                        this.$message.error({"message": "修改失败"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 返回
            handleBack () {
                this.$refs.modalType.hide()
            },

            changeHeight() {
                this.$refs.mainHeight.style.height = "calc(100% - 310px)"
            },
            changeLow() {
                this.$refs.mainHeight.style.height = "calc(100% - 236px)"
            }
        }
    }
</script>

<style scoped lang="scss">
    .basic{
        padding: 20px;
        background-color: #fff;
        margin-top: 10px;
        box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);

        .btn-mod {
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

        .prod-rel{
            position: absolute;
            right: 20px;
            bottom: 0;
            color: $mainColor;
            cursor: pointer;
        }

        .content{
            padding: 0 20px;

        }

        .app__table{
            .col{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }
    // 拓展信息
    .modal-content {
        padding: 20px;
    }
    .col{
        padding: 8px 0;
    }
</style>