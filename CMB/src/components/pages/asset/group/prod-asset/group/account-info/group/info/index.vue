<template>
    <transition name="fade">
        <div class="addAcount">
            <Scroll>
                <div class="t-header">
                    <i>账户详情</i>
                    <span class="close" @click="pageClose()"></span>
                    <span></span>
                </div>

                <div class="a-v-title">
                    <div class="app__title-1">
                        <span class="app__title-name">客户基本信息</span>
                    </div>
                </div>

                <div class="detail-content">
                    <Row>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">客户名称：</span>
                            <span class="app__lt-text">{{custMation.custName ? custMation.custName : '空'}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">客户标识：</span>
                            <span class="app__lt-text">{{custMation.custId ? custMation.custId : '空'}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">证件类型：</span>
                            <span class="app__lt-text">{{custMation.certType ? custMation.certType : '空'}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">证件号码：</span>
                            <span class="app__lt-text">{{custMation.certNum ? custMation.certNum : '空'}}</span>
                        </Col>
                    </Row>
                </div>

                <div class="a-v-title">
                    <div class="app__title-1">
                        <span class="app__title-name">账户基本信息</span>
                    </div>
                </div>

                <div class="detail-content">
                    <Row>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">帐户名称：</span>
                            <span class="app__lt-text">{{accountMation.acctName ?　accountMation.acctName : ''}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">帐单介质：</span>
                            <span class="app__lt-text">{{getPostMethod('帐单介质',accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].postMethod : '')}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">是否发送短信帐单：</span>
                            <span class="app__lt-text">{{getPostMethod('是否发送短信帐单',accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].ebillSmsNoticeFlg : '')}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">接收应付额短信号码：</span>
                            <span class="app__lt-text">{{accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].ebillSmsServerId : '空'}}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">客户标识：</span>
                            <span class="app__lt-text">{{accountMation.custId ?　accountMation.custId : '空'}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">帐户产品类型：</span>
                            <span class="app__lt-text">{{accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].bpType : '空'}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">分帐序号：</span>
                            <span class="app__lt-text">{{accountMation.acctCd}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">下次开帐日期：</span>
                            <span class="app__lt-text">{{accountMation.invFormatCustomizeRel[0] ? getPostMethod('下次开帐日期',accountMation.invFormatCustomizeRel[0].billEffectiveDate) : '空'}}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">帐户区局：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].firstbureau : '空' }}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">催欠标识：</span>
                            <span class="app__lt-text">{{getPostMethod('催欠标识', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].collectionCd : '')}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">违约金标识：</span>
                            <span class="app__lt-text">{{getPostMethod('违约金标识', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].lateFeeFlag : '' )}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">付费通电子邮件帐单接受地址：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].fftEmail : '空' }}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">付费通电子帐单：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].fftType : '空' }}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">是否可开具专票：</span>
                            <span class="app__lt-text">{{getPostMethod('是否发送短信帐单', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].spcInvFlg : '')}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">帐户状态：</span>
                            <span class="app__lt-text">{{getPostMethod('帐户状态',accountMation.statusCd )}}</span>
                        </Col>
                    </Row>
                </div>

                <div class="a-v-title">
                    <div class="app__title-1">
                        <span class="app__title-name">账单信息</span>
                    </div>
                </div>

                <div class="detail-content">
                    <Row>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">帐单寄达地址：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].contactAddr : '空' }}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">联系人eMail地址：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].eMail : '空' }}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">帐单联系人姓名：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].contactName : '空' }}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">帐单联系人传真：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].fax : '空' }}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">帐单联系人电话：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].mobilePhone : '空' }}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">打印电子发票：</span>
                            <span class="app__lt-text">{{getPostMethod('是否发送短信帐单', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].einvoiceFlg : '' )}}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">帐单打印格式：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].billPrefCd : '空' }}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">出帐周期：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].postCycle + '个月' : '空' }}</span>
                        </Col>
                    </Row>
                </div>

                <div class="a-v-title">
                    <div class="app__title-1">
                        <span class="app__title-name">税务信息</span>
                    </div>
                </div>

                <div class="detail-content">
                    <Row>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">税务地址：</span>
                            <span class="app__lt-text">{{  accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxAddress :  '空'  }}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">税务开户银行名称：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxBankName : '空' }}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">税务开户银行帐户：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxBankNumber : '空' }}</span>
                        </Col>
                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">税务号：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxNumber : '空' }}</span>
                        </Col>

                        <Col class="app__ellipsis" :span="6">
                            <span class="app__lt-label">税务电话：</span>
                            <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxPhone : '空' }}</span>
                        </Col>
                    </Row>
                </div>

                <div class="a-v-title">
                    <div class="app__title-1">
                        <span class="app__title-name">支付方案</span>
                    </div>
                </div>

                <div class="a-v-content">
                    <Scroll class="app__table" :isShowBottom="true" fixedTopClassName="app__table-thead" ref="listScroll">
                        <Row class='app__table-thead' ref="width" :inline="true">
                            <Col :width='200'>付费方式</Col>
                            <Col :width='200'>托收银行帐号</Col>
                            <Col :width='200'>托收银行名称</Col>
                            <Col :width='200'>多方协议编号</Col>
                            <Col :width='200'>交换号</Col>
                            <Col :width='200'>支付行号</Col>
                            <Col :width='200'>帐务中心开户银行名称</Col>
                            <Col :width='200'>帐务中心开户银行帐号</Col>
                            <Col :width='200'>帐务中心户名</Col>
                        </Row>
                        <Row :class="['app__table-item overflow-style']" :inline="true" v-for="(item,index) in addPaymentData" :key="index">
                            <Col :width='200'>
                            {{getPostMethod('付费方式',item.paymentMethod)}}
                            </Col>
                            <Col :width='200'>{{item.extAcctDTO && item.extAcctDTO.payAcctCode ? item.extAcctDTO.payAcctCode : '空'}}</Col>
                            <Col :width='200' :title="item.extAcctDTO &&　item.extAcctDTO.payAcctName ? item.extAcctDTO.payAcctName : ''">{{item.extAcctDTO && item.extAcctDTO.payAcctName ? item.extAcctDTO.payAcctName : '空'}}</Col>
                            <Col :width='200' :title="item.extAcctDTO &&　item.extAcctDTO.eftAgreeNum ? item.extAcctDTO.eftAgreeNum : ''">
                            {{item.extAcctDTO && item.extAcctDTO.eftAgreeNum ?  item.extAcctDTO.eftAgreeNum  : '空'}}
                            </Col>
                            <Col :width='200'>
                            {{item.extAcctDTO && item.extAcctDTO.exchgNum ?  item.extAcctDTO.exchgNum  : '空'}}
                            </Col>
                            <Col :width='200'>
                            {{item.extAcctDTO && item.extAcctDTO.paidBankNum ?  item.extAcctDTO.paidBankNum  : '空'}}
                            </Col>
                            <Col :width='200'>
                            {{item.extAcctDTO && item.extAcctDTO.eftZwzxBankName ?  item.extAcctDTO.eftZwzxBankName  : '空'}}
                            </Col>
                            <Col :width='200'>
                            {{item.extAcctDTO && item.extAcctDTO.eftZwzxBankNum ?  item.extAcctDTO.eftZwzxBankNum  : '空'}}
                            </Col>
                            <Col :width='200'>
                            {{item.extAcctDTO && item.extAcctDTO.eftZwzxName ?  item.extAcctDTO.eftZwzxName  : '空'}}
                            </Col>
                        </Row>
                        <Row :class="['app__table-item']" :style="dynamicWidth" v-for="item in (5 - addPaymentData.length)" :key="item.id"></Row>
                    </Scroll>
                </div>

            </Scroll>
        </div>
    </transition>
    
</template>

<script>
import filter from "@/filter/index.js";
export default {
    props: {
        componentData: {}
    },
    data() {
        return {
            dialogSize: {
                size: 80,
                min: 600,
                max: 800
            },
            dialogTitle: "",
            postMethodArray: [],
            collectionCdArray: [],
            ebillSmsNoticeFlgArray: [
                //是否发送短信帐单
                {
                    label: "是",
                    value: 1
                },
                {
                    label: "否",
                    value: 0
                }
            ],
            billPrefCdArray: [
                //帐单打印格式
                {
                    attrValueName: "不邮寄帐单（无附件）",
                    attrValue: "不邮寄帐单（无附件）"
                },
                {
                    attrValueName: "不邮寄帐单（有附件）",
                    attrValue: "不邮寄帐单（有附件）"
                },
                {
                    attrValueName: "邮寄帐单（无附件）",
                    attrValue: "邮寄帐单（无附件）"
                },
                {
                    attrValueName: "邮寄帐单（有附件）",
                    attrValue: "邮寄帐单（有附件）"
                },
                {
                    attrValueName: "邮寄帐单（IDC清单）",
                    attrValue: "邮寄帐单（IDC清单）"
                },
                {
                    attrValueName: "简打（无附件）、简打（有附件）",
                    attrValue: "不邮寄帐单（无附件）"
                },
                {
                    attrValueName: "二级科目帐单（无附件）",
                    attrValue: "二级科目帐单（无附件）"
                },
                {
                    attrValueName: "二级科目帐单（有附件）",
                    attrValue: "二级科目帐单（有附件）"
                }
            ],
            tipInfo: {
                iconType: 1,
                msg: "",
                showBtn: {
                    clear: true,
                    save: true
                }
            },
            //帐户状态
            accountStatusCd: [
                { attrValueName: "有效", attrValue: 1 },
                { attrValueName: "失效", attrValue: 2 },
                { attrValueName: "即将生效", attrValue: 3 },
                { attrValueName: "即将失效", attrValue: 4 },
                { attrValueName: "已归档", attrValue: 5 }
            ],
            paymentArray: [],
            lateFeeFlagArray: [],
            addPaymentData: [],
            dynamicWidth: {},
            addPlanObj: {
            },
            modPlanObj: {
                extAcct: {}
            },
            //暂时绑定
            acctObj: {
                accounMail: "", //帐务服务信息邮件接收地址:
                acctName: "2", //帐户名称
                ebillSmsNoticeFlg: "2", //是否发送短信帐单
                ebillSmsServerId: "2", //接收应付额短信号码
                eMail: "2", //联系人eMail地址
                contactName: "2", //帐单联系人姓名
                fax: "2", //帐单联系人传真
                mobilePhone: "2", //帐单联系人电话
                einvoiceFlg: "1", //打印电子发票
                taxAddress: "2", //税务地址
                taxBankNumber: "1", //税务开户银行帐户
                taxNumber: "2", //税务号
                taxPhone: "2", //税务电话
                contactAddr: "" //dizhi
            },
            radioData:{
            },
            //客户信息
            custMation: "",
            accountMation: {
                invFormatCustomizeRel: [
                ]
            },
            delPaymentItem:'',
            bankArray: [],
            radioBank: {},
            modIndex: "",
            custId: "",
            addressObj: "",
            userRightBtnControl: {          // 权限按钮控制
                updateBtn: false,
                paymentSchemeAdd: false,            // 账户支付方案添加
                paymentSchemeModify: false,         // 账户支付方案修改
                paymentSchemeDelete: false,         // 账户支付方案删除
                accountReminderSign: false,         // 账户催欠标识
                accountLiquidatedDamages: false,    // 账户违约金
                accountElectronicInvoice: false,    // 账户打印电子发票
                accountNextBillDate: false,         // 账户下次开账日期 
            },
            bureauArr: ['松江','奉贤','青浦','嘉定','崇明','金山','南汇'],  //郊区定义
            paymentList: [],   //支付额度类型
        }
    },
    mounted() {
        this.$getjsons.getJson("ACC-C-0199").then(res => {
            this.postMethodArray = res.data.attrSpecDetail.attrValueList;
        });
        this.$getjsons.getJson("OTC-0001").then(res => {
            this.paymentArray = res.data.attrSpecDetail.attrValueList;
        });
        this.$getjsons.getJson("ACC-C-9001").then(res => {
            this.collectionCdArray = res.data.attrSpecDetail.attrValueList;
        });
        if (this.componentData !== undefined) {
            this.custMation = this.componentData;
        }
        this.accountMation = this.componentData;
        this.getPayList();
        this.getDynamicWidth();
        
        // 循环权限数据     
        this.$user.getFuncComps().forEach((item) => {
            switch (item.compCode) {
                case 'F-CMB-200102':
                    this.userRightBtnControl.updateBtn = true;
                    break;
                case 'F-CMB-200103':
                    this.userRightBtnControl.paymentSchemeAdd = true;
                    break;
                case 'F-CMB-200104':
                    this.userRightBtnControl.paymentSchemeModify = true;
                    break;
                case 'F-CMB-200105':
                    this.userRightBtnControl.paymentSchemeDelete = true;
                    break;
                default:
                    break;
            }
        })
    },
    watch: {
        'acctObj.postMethod'(old,newValue) {
            if(this.acctObj.postMethod == '9') { 
                this.billPrefCdArray[2].disabled = true;
                this.billPrefCdArray[3].disabled = true;
                this.billPrefCdArray[4].disabled = true;
            } else {
                this.billPrefCdArray[2].disabled = false;
                this.billPrefCdArray[3].disabled = false;
                this.billPrefCdArray[4].disabled = false;
            }
        },
        "acctObj.ebillSmsNoticeFlg"(old,newValue) {
            if(this.acctObj.ebillSmsNoticeFlg == 0) {
                this.acctObj.ebillSmsServerId = ''
            }
        },
        "addPlanObj.paymentMethod"(old,newValue) {
            if(this.addPlanObj.paymentMethod == 100000) {
                this.addPlanObj.payAcctName = '';
                this.addPlanObj.payAcctCode = '';
                this.addPlanObj.paidBankNum = '';
            }
        },
        "modPlanObj.paymentMethod"(old,newValue) {
            if(this.modPlanObj.paymentMethod == 100000) {
                this.modPlanObj.payAcctName = '';
                this.modPlanObj.payAcctCode = '';
                this.modPlanObj.paidBankNum = '';
            }
        },
    },
    methods: {
        //动态宽度
        getDynamicWidth() {
            let width = this.$refs.width.$el.clientWidth;
            this.dynamicWidth = {
                width: width + "px"
            };
        },

        //返回值转换
        getPostMethod(name, code) {
            if (name == "帐单介质") {
                let postMethod = this.postMethodArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return postMethod ? postMethod.attrValueName : "空";
            } else if (name == "是否发送短信帐单") {
                let ebillSmsNoticeFlg = this.ebillSmsNoticeFlgArray.filter(
                    item => {
                        return item.value == code;
                    }
                )[0];
                return ebillSmsNoticeFlg ? ebillSmsNoticeFlg.label : "空";
            } else if (name == "违约金标识") {
                let ebillSmsNoticeFlg = this.ebillSmsNoticeFlgArray.filter(
                    item => {
                        return item.value == code;
                    }
                )[0];
                return ebillSmsNoticeFlg ? ebillSmsNoticeFlg.label : "空";
            } else if (name == "催欠标识") {
                let collectionCdArray = this.collectionCdArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return collectionCdArray ? collectionCdArray.attrValueName : "空";
            } else if (name == "帐单打印格式") {
                let billPrefCdArray = this.billPrefCdArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return billPrefCdArray ? billPrefCdArray.attrValueName : "空";
            } else if (name == "帐户状态") {
                let accountStatusCd = this.accountStatusCd.filter(item => {
                    return item.attrValue == code;
                })[0];
                return accountStatusCd ? accountStatusCd.attrValueName : "无";
            } else if (name == "下次开帐日期") {
                return code ? filter.filters.getLocalTime(code) : "无";
            } else if (name == "付费方式") {
                let paymentArray = this.paymentArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return paymentArray ? paymentArray.attrValueName : "空";
            } else {
                return code ? code : "空";
            }
        },

        pageClose() {
            this.$emit("componentView", "list");
        },
        //查询支付方案列表
        getPayList() {
            this.$axios
                .get(this.$api.PaymentPlanGet, {
                    params: {
                        acctId: this.accountMation.acctId
                    }
                })
                .then(res => {
                    if (res.data) {
                        this.addPaymentData = res.data;
                        this.$nextTick( () => {
                            this.$refs.listScroll.init();
                        })
                    } else {
                        this.$message.error({ message: "请求失败" });
                    }
                })
                .catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
        },
    }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    top: -100% !important;
}


.addAcount {
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 20px 20px 40px;
    top: 0;
    left: 0;
    z-index: 202;
    overflow: auto;
    background-color: #fff;
    .t-header {
        height: 50px;
        text-align: center;
        border-bottom: 1px solid #f6f6f6;
        i {
            font-size: 16px;
            font-weight: bold;
        }
        .close {
            position: absolute;
            display: block;
            top: 0;
            right: 10px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            background: url("./images/close_page.png") no-repeat center;

            &:hover {
                opacity: 0.8;
            }
        }
    }

    .a-v-title {
        height: 50px;
        background-color: #fff;
        .app__title {
            line-height: 50px;
            font-size: 14px;
            i.icon-left {
                display: inline-block;
                width: 6px;
                height: 18px;
                vertical-align: text-bottom;
                background: $mainColor;
            }
            .dialog-title {
                font-size: 16px;
                color: #000;
            }
        }
        .app__btn {
            position: absolute;
            right: 30px;
            top: 12px;
        }
    }
    .app__title-1 {
         padding: 10px 0 0 30px;
    }
    
    .a-v-content {
        padding-left: 30px;
    }
    .detail-content {
        padding: 5px 30px 10px;

        .col {
            padding: 8px 0;
        }
    }
    .btnBox {
        width: 95%;
        height: 40px;
        position: absolute;
        bottom: 0;
        span {
            float: right;
            margin-left: 30px;
        }
    }
    .paymentplan {
        padding: 20px 20px 0px 0;
        margin-bottom: 10px;
        border-bottom: 1px solid #f6f6f6;
    }

    .app__table-right {
        span {
            cursor: pointer;
            color: $mainColor;
        }
    }
    .s-l-search {
        width: 50%;
        margin: 10px 0 10px 10px;
        span {
            position: absolute;
            top: 7px;
            right: -300px;
        }
    }
    .overflow-style {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>
