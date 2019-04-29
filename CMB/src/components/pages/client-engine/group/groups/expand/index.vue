<!--扩展信息-->
<template>
    <div class="expand-warp">
        <div class="app__title-1">
            <span class="app__title-name">客户拓展信息</span>
        </div>
        <span class="btn-mod" @click="handleChange" v-if="userRightBtnControl.basicUpdateBtn">
            <i class="iconfont iconbianjixinxi"></i>
        </span>
        
        <!-- 行业信息 -->
        <div class="expand-content">
            <div class="app__title-2">
                <span class="app__title-name">行业信息</span>
            </div>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">国标行业门类：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.nationalClass">{{expandObjData.nationalClass}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">国标行业大类：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.nationalLargeClass">{{expandObjData.nationalLargeClass}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">国标行业中类：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.nationalMidClass">{{expandObjData.nationalMidClass}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">国标行业小类：</span>
                    <span class="app__lt-text overflow-style">{{expandObjData.nationalSmallClass}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">营销行业第一层：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.marketFirstLayer | filterName">{{expandObjData.marketFirstLayer | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">营销行业第二层：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.marketSecondLayer | filterName">{{expandObjData.marketSecondLayer | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">营销行业第三层：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.marketThirdLayer | filterName">{{expandObjData.marketThirdLayer | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">营销行业第四层：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.marketFourthLayer | filterName">{{expandObjData.marketFourthLayer | filterName}}</span>
                </Col>
            </Row>
 
            <!-- 用户信息 -->
            <div class="app__title-2">
                <span class="app__title-name">用户信息</span>
            </div>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">重要客户标志：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.importCustFlag">{{expandObjData.importCustFlag}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户管理编号：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.custManageNum">{{expandObjData.custManageNum}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">集团客户编号：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.extCustId">{{expandObjData.extCustId}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户管控级别：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.custControlLevel | filterName">{{expandObjData.custControlLevel | filterName}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户级别：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.custControlLevel | filterName">{{expandObjData.custControlLevel | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">保密等级：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.secrecyLevel | filterName">{{expandObjData.secrecyLevel | filterName}}</span>
                </Col>
            </Row>

            <!-- 工商信息 -->
            <div class="app__title-2">
                <span class="app__title-name">工商信息</span>
            </div>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">公司规模：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.orgScale | filterName">{{expandObjData.orgScale | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">登记机关：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.certOrg">{{expandObjData.certOrg}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">企业状态：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.orgStatus === '1000' ? '有效': '无效'">{{expandObjData.orgStatus === '1000' ? '有效': '无效'}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">注册地址：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.orgAddr">{{expandObjData.orgAddr}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">法人/负责人：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.legalRepr">{{expandObjData.legalRepr}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">经营范围：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.businessScope">{{expandObjData.businessScope}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">服务等级：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.serviceLevel | filterName">{{expandObjData.serviceLevel | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">年收入情况：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.orgAssets | filterName">{{expandObjData.orgAssets | filterName}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">备注：</span>
                    <span class="app__lt-text overflow-style" :title="expandObjData.remark">{{expandObjData.remark}}</span>
                </Col>
            </Row>
        </div>

        <!-- 扩展信息弹窗S -->
        <Dialog ref="modalType" :dialogTitle="expandDialog" :dialogSize="dialogSize" :initBtn="true">
            <div class="modal-content">
                <Scroll :isShowRight="true">
                    <Form labelWidth="120px" labelAlign="left">
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="保密等级：" small>
                                    <Select :data="secrecyLevelData"
                                            :disabled="!userRightBtnControl.securityClassification"
                                            v-model="expandChangeObjData.secrecyLevel"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="2"></Col>
                            <Col :span="11">
                                <FormItem labelText="客户管控级别: " small>
                                    <Select 
                                        :data="custControlLevelData"
                                        :disabled="!userRightBtnControl.controlLevel"
                                        v-model="expandChangeObjData.custControlLevel"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="客户级别：" small>
                                    <Select 
                                        :data="custAreaGradeData"
                                        :disabled="!userRightBtnControl.customerLevel"
                                        v-model="expandChangeObjData.custLevel"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="2"></Col>
                            <Col :span="11">
                                <FormItem labelText="重要客户标志: " small>
                                    <Input v-model="expandChangeObjData.importCustFlag"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="国标行业大类：" small>
                                    <Input disabled v-model="expandChangeObjData.nationalLargeClass"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="2"></Col>
                            <Col :span="11">
                                <FormItem labelText="国标行业中类：" small>
                                    <Input disabled v-model="expandChangeObjData.nationalMidClass"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="国标行业小类：" small>
                                    <Input disabled v-model="expandChangeObjData.nationalSmallClass"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="2"></Col>
                            <Col :span="11">
                                <FormItem labelText="营销行业第一层：" small>
                                    <Select
                                        :data="marketFirstLayerData"
                                        :disabled="!userRightBtnControl.marketFirstLayer"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        v-model="expandChangeObjData.marketFirstLayer"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="营销行业第二层：" small>
                                    <Select
                                        :data="marketSecondLayerData"
                                        :disabled="!userRightBtnControl.marketSecondLayer"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        v-model="expandChangeObjData.marketSecondLayer"></Select>
                                    <!-- <Input v-model="expandChangeObjData.marketSecondLayer"></Input> -->
                                </FormItem>
                            </Col>
                            <Col :span="2"></Col>
                            <Col :span="11">
                                <FormItem labelText="营销行业第三层：" small>
                                    <Select
                                        :data="marketThirdLayerData"
                                        :disabled="!userRightBtnControl.marketThirdLayer"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        v-model="expandChangeObjData.marketThirdLayer"></Select>
                                    <!-- <Input v-model="expandChangeObjData.marketThirdLayer"></Input> -->
                                </FormItem>
                            </Col>
                        </Row>        
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="营销行业第四层：" small>
                                    <Select
                                        :data="marketFourthLayerData"
                                        :disabled="!userRightBtnControl.marketFourthLayer"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        v-model="expandChangeObjData.marketFourthLayer"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="2"></Col>
                            <Col :span="11">
                                <FormItem labelText="公司规模：" small>
                                    <Select :data="orgScaleData"
                                        v-model="expandChangeObjData.orgScale"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                        </Row>        
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="年收入情况：" small>
                                    <Select
                                        :data="orgAssetsData"
                                        v-model="expandChangeObjData.orgAssets"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="2"></Col>
                            <Col :span="11">
                                <FormItem labelText="服务等级：" small>
                                    <Select
                                        :data="serviceLevelData"
                                        :disabled="!userRightBtnControl.serviceLevel"
                                        dataLabelStr="attrValueName"
                                        dataValueStr="attrValue"
                                        v-model="expandChangeObjData.serviceLevel"
                                        :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="24">
                                <FormItem labelText="备注：" small>
                                    <Input type="textarea" v-model="expandChangeObjData.remark"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Scroll>
            </div>
            <div slot="btnBox">
                <span class="save" @click="handleConfirm">保存</span>
                <span class="back" @click="handleBack">返回</span>
            </div>
        </Dialog>
        <!-- 扩展信息弹窗E -->
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
                expandObjData: {},
                expandChangeObjData: {},
                expandDialog: '扩修改展信息',
                dialogSize: {
                    max: 820
                },
                // 修改
                secrecyLevelData: [],         // 保密等级,
                custControlLevelData: [],         // 客户管控级别
                marketFirstLayerData: [],   // 营销行业第一层
                marketSecondLayerData: [],   // 营销行业第二层
                marketThirdLayerData: [],     // 营销行业第三层
                marketFourthLayerData: [],    // 营销行业第四层
                custAreaGradeData: [],        // 客户级别
                serviceLevelData: [],         // 服务等级
                orgAssetsData: [],            // 企业规模（年收入情况）
                orgScaleData: [],             // 员工人数（公司规模）
                userRightBtnControl: {          // 权限按钮控制
                    basicUpdateBtn: false,
                    exemptPenalSum: false,              // 免违约金
                    securityClassification: false,      // 客户保密等级字段
                    controlLevel: false,                // 客户管控级别字段
                    customerLevel: false,               // 客户级别字段
                    nationalClass: false,               // 国标行业门类字段
                    managementNumber: false,            // 管理编号字段
                    marketFirstLayer: false,            // 营销行业第一层
                    marketSecondLayer: false,           // 营销行业第二层
                    marketThirdLayer: false,            // 营销行业第三层
                    marketFourthLayer: false,           // 营销行业第四层
                    serviceLevel: false,                // 客户服务等级
                },
            }
        },
        created () {
            this.getList()
        },
        mounted() {
            this.custId = this.componentData.custId
            this.getExpandInfo(this.custId)
            // 循环权限数据
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100607':
                        this.userRightBtnControl.basicUpdateBtn = true;
                        break;
                    case 'F-CMB-100628':
                        // 免违约金，，待确认
                        break;
                    case 'F-CMB-100629':
                        this.userRightBtnControl.securityClassification = true;
                        break;
                    case 'F-CMB-100630':
                        this.userRightBtnControl.controlLevel = true;
                        break;
                    case 'F-CMB-100631':
                        this.userRightBtnControl.customerLevel = true;
                        break;
                    case 'F-CMB-100632':
                        this.userRightBtnControl.nationalClass = true;
                        break;
                    case 'F-CMB-100633':
                        this.userRightBtnControl.managementNumber = true;
                        break;
                    case 'F-CMB-100634':
                        // 先票后款，，待确认
                        break;
                    case 'F-CMB-100635':
                        this.userRightBtnControl.marketFirstLayer = true;
                        break;
                    case 'F-CMB-100636':
                        this.userRightBtnControl.marketSecondLayer = true;
                        break;
                    case 'F-CMB-100637':
                        this.userRightBtnControl.marketThirdLayer = true;
                        break;
                    case 'F-CMB-100638':
                        this.userRightBtnControl.marketFourthLayer = true;
                        break;
                    case 'F-CMB-100639':
                        this.userRightBtnControl.serviceLevel = true;
                        break;
                    default:
                        break;
                }
            })
        },
        methods:{
            // 查询扩展信息
            getExpandInfo (custId) {
                this.$axios.get(this.$api.adddClientDistribution + '/extension', {
                    params: {
                        custId: custId
                    }
                }).then(res => {
                    if (res.data) {
                        this.expandObjData = res.data
                    } else {
                        this.$message.error({"message": "查询出错"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 点击修改按钮
            handleChange () {
                this.$refs.modalType.show()
                this.expandChangeObjData = Object.assign({}, this.expandObjData);

                Object.keys(this.expandChangeObjData).forEach((key) => {
                    if (typeof this.expandChangeObjData[key] === 'string' && this.expandChangeObjData[key].indexOf('|') !== -1) {
                        this.expandChangeObjData[key] =  this.expandChangeObjData[key].split('|')[0]
                    }
                })
            },

            // 获取下拉信息
            getList () {
                // 保密等级
                this.$getjsons.getJson('CUS-C-0001').then(res => {
                    this.secrecyLevelData = res.data.attrSpecDetail.attrValueList
                })
                
                // 客户管控级别
                this.$getjsons.getJson('CUS-C-0017').then(res => {
                    this.custControlLevelData = res.data.attrSpecDetail.attrValueList
                })

                // 营销行业第一层
                this.$getjsons.getJson('CUS-SH-002').then(res => {
                    if (res.data) {
                        this.marketFirstLayerData = res.data.attrSpecDetail.attrValueList
                    }
                })

                // 营销行业第二层
                this.$getjsons.getJson('CUS-SH-003').then(res => {
                    if (res.data) {
                        this.marketSecondLayerData = res.data.attrSpecDetail.attrValueList
                    }
                })

                // 营销行业第三层
                this.$getjsons.getJson('CUS-SH-004').then(res => {
                    if (res.data) {
                        this.marketThirdLayerData = res.data.attrSpecDetail.attrValueList
                    }
                })

                // 营销行业第四层
                this.$getjsons.getJson('CUS-SH-005').then(res => {
                    if (res.data) {
                        this.marketFourthLayerData = res.data.attrSpecDetail.attrValueList
                    }
                })

                // 客户级别
                this.$getjsons.getJson('CUS-0004').then(res => {
                    this.custAreaGradeData = res.data.attrSpecDetail.attrValueList
                })

                // 员工人数
                this.$getjsons.getJson('PTY-C-0002').then(res => {
                    this.orgScaleData = res.data.attrSpecDetail.attrValueList
                })

                //企业规模
                this.$getjsons.getJson('PTY-C-0003').then(res => {
                    this.orgAssetsData = res.data.attrSpecDetail.attrValueList
                })

                // 服务等级
                this.$getjsons.getJson('CUS-C-0005').then(res => {
                    this.serviceLevelData = res.data.attrSpecDetail.attrValueList
                })
            },

            // 保存按钮
            handleConfirm () {
                this.$axios.patch(this.$api.adddClientDistribution + `/extension/${this.custId}`, {
                    businessScope: this.expandChangeObjData.businessScope,
                    certOrg: this.expandChangeObjData.certOrg,
                    custControlLevel: this.expandChangeObjData.custControlLevel,
                    custLevel: this.expandChangeObjData.custLevel,
                    custManageNum: this.expandChangeObjData.custManageNum,
                    extCustId: this.expandChangeObjData.extCustId,
                    importCustFlag: this.expandChangeObjData.importCustFlag,
                    industryTypeId: this.expandChangeObjData.industryTypeId,
                    legalRepr: this.expandChangeObjData.legalRepr,
                    marketFirstLayer: this.expandChangeObjData.marketFirstLayer,
                    marketFourthLayer: this.expandChangeObjData.marketFourthLayer,
                    marketSecondLayer: this.expandChangeObjData.marketSecondLayer,
                    marketThirdLayer: this.expandChangeObjData.marketThirdLayer,
                    nationalClass: this.expandChangeObjData.nationalClass,
                    nationalLargeClass: this.expandChangeObjData.nationalLargeClass,
                    nationalMidClass: this.expandChangeObjData.nationalMidClass,
                    nationalSmallClass: this.expandChangeObjData.nationalSmallClass,
                    orgAddr: this.expandChangeObjData.orgAddr,
                    orgAssets: this.expandChangeObjData.orgAssets,
                    orgScale: this.expandChangeObjData.orgScale,
                    orgStatus: this.expandChangeObjData.orgStatus,
                    remark: this.expandChangeObjData.remark,
                    secrecyLevel: this.expandChangeObjData.secrecyLevel,
                    serviceLevel: this.expandChangeObjData.serviceLevel,
                    smEnterFlag: this.expandChangeObjData.smEnterFlag
                }).then(res => {
                    if (res.data) {
                        this.$message.success({"message": "保存成功"});
                        this.getExpandInfo(this.custId);
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
        .expand-content {
            width: 100%;
            margin-top: 10px;
            font-size: 12px;
            .row-style {
                margin-left: 20px;
            }
            .overflow-style {
                display: inline-block;
                width: 160px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                vertical-align: text-bottom;
            }
        }

        // 拓展信息
        .modal-content {
            padding: 20px;
        }
        .col {
            padding: 8px 0;
        }
    }
</style>