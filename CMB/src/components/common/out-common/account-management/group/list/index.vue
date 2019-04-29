<template>
    <div class="account-warp">
        <div class="app__title-1">
            <span class="app__title-name">帐户管理</span>
        </div>
        <span class="btn-add" @click="addAccount" v-if="userRightBtnControl.addBtn">
            <i class="iconfont icontianjia"></i>
        </span>
        <div :class="['main' , active != 'height' ? '' : 'active']">
            <Scroll class="app__table" :isShowBottom="true" :isShowRight="false" fixedTopClassName="m-title" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
                <DragGroup ref="width" class="m-title app__table-thead" :inline="true" :titleList="tableTitleData" @dragchange="dragchange">
                    <Col class="m-i-name m-t-n rightborder_none" :width='180'>
                    <span>帐户名称</span>
                    <ColSel class="col-search" :showOrder="false" @confirm="filterConfirm">
                        <Input placeholder="请输入帐户名称"></Input>
                    </ColSel>
                    </Col>
                    <Col class="m-i-name m-t-n" :width='180'>
                    <span>分帐序号</span>
                    <ColSel class="col-search" :showOrder="false" @confirm="filterConfirm">
                        <Input placeholder="请输入分帐序号"></Input>
                    </ColSel>
                    </Col>
                    <DragItem :width="item.width" :value="item" v-for="(item,index) in tableTitleData" :key="index">
                        <span>{{item.name}}</span>
                        <ColSel class="" :showOrder="false" @confirm="filterConfirm(item)">
                        </ColSel>
                    </DragItem>
                    <Col :width="90" class="app__table-right">
                    <span class="">操作</span>
                    </Col>
                </DragGroup>
                <Row :class="['app__table-item ']" :inline="true" v-for="(item,index) in tableItemData" :key="index">
                    <Col :width="180"  class="m-i-name overflow-style">{{item.acctName}}</Col>
                    <Col :width="180" class="m-i-name overflow-style">{{item.acctCd}}</Col>
                    <Col :inline="true" :width="tableItem.width" class="overflow-style" :title="item[tableItem.param]" v-for="(tableItem,tableIndex) in tableTitleData" :key="tableIndex">
                    <span v-if="item[tableItem.param]">
                        {{getPostMethod(tableItem.name,item[tableItem.param])}}
                    </span>
                    <span v-else-if="item.invFormatCustomizeRel && item.invFormatCustomizeRel.length">
                        {{getPostMethod(tableItem.name,item.invFormatCustomizeRel[0][tableItem.param])}}
                    </span>
                    </Col>
                    <Col :width="90" class="app__table-right">
                    <span class="review" @click="userRightBtnControl.detailBtn ? detailClick(item) : ''">详情</span>
                    </Col>
                </Row>
                <Row class="empty-style" :style="dynamicWidth" :class="['m-item app__table-item']" v-for="item in (10 - tableItemData.length)" :key="item.id"></Row>
            </Scroll>
        </div>

        <div class="footer" v-if="tableItemData.length">
            <Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange"></Pagination>
        </div>

    </div>
</template>

<script>
import filter from "@/filter/index.js";
export default {
    props: {
        componentData: {}
    },
    data() {
        return {
            pageInfo: {
                pageIndex: 1, // 当前页
                pageSize: 10, // 每页条数
            },
            active:'',
            tableTitleData: [
                {
                    name: "帐单寄达地址",
                    param: "contactAddr",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐单联系人电话",
                    param: "mobilePhone",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐单联系人姓名",
                    param: "contactName",
                    span: 2,
                    width: 120
                },
                {
                    name: "催欠标识",
                    param: "collectionCd",
                    span: 2,
                    width: 120
                },
                {
                    name: "违约金标识",
                    param: "lateFeeFlag",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐户状态",
                    param: "statusCd",
                    span: 2,
                    width: 120
                },
                {
                    name: "下次开帐日期",
                    param: "billEffectiveDate",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐单介质",
                    param: "postMethod",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐单联系人传真",
                    param: "fax",
                    span: 2,
                    width: 120
                },
                {
                    name: "联系人EMAlIL地址",
                    param: "eMail",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐户计费类型",
                    param: "acctBillingTypeName",
                    span: 2,
                    width: 120
                },
                {
                    name: "客户标识",
                    param: "custId",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐户区局",
                    param: "firstbureau",
                    span: 2,
                    width: 120
                },
                {
                    name: "是否发送短信帐单",
                    param: "ebillSmsNoticeFlg",
                    span: 2,
                    width: 120
                },
                {
                    name: "接收应付额短信号码",
                    param: "ebillSmsServerId",
                    span: 2,
                    width: 180
                },
                {
                    name: "打印电子发票",
                    param: "einvoiceFlg",
                    span: 2,
                    width: 120
                },
                {
                    name: "是否可开具专票",
                    param: "spcInvFlg",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐务中心开户行支付行号",
                    param: "paidBankNum",
                    span: 2,
                    width: 180
                },
                {
                    name: "税务号",
                    param: "taxNumber",
                    span: 2,
                    width: 120
                },
                {
                    name: "税务地址",
                    param: "taxAddress",
                    span: 2,
                    width: 120
                },
                {
                    name: "税务电话",
                    param: "taxPhone",
                    span: 2,
                    width: 120
                },
                {
                    name: "税务开户银行名称",
                    param: "taxBankName",
                    span: 2,
                    width: 120
                },
                {
                    name: "付费通电子邮件帐单接收地址",
                    param: "fftEmail",
                    span: 2,
                    width: 180
                },
                {
                    name: "付费通电子帐单",
                    param: "fftType",
                    span: 2,
                    width: 130
                },
                {
                    name: "税务开户银行帐户",
                    param: "taxBankNumber",
                    span: 2,
                    width: 120
                }
            ],
            tableItemData: [],
            postMethodArray: [],
            paymentArray: [],
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
            accountStatusCd: [],
            dynamicWidth: "",
            custId: "",
            userRightBtnControl: {          // 权限按钮控制
                addBtn: false,
                detailBtn: false,
            },
        };
    },
    beforeCreate() {
        this.$getjsons.getJson("ACC-C-0199").then(res => {
            this.postMethodArray = res.data.attrSpecDetail.attrValueList;
        });
        this.$getjsons.getJson("OTC-0001").then(res => {
            this.paymentArray = res.data.attrSpecDetail.attrValueList;
        });
        this.$getjsons.getJson("ACC-C-9001").then(res => {
            this.collectionCdArray = res.data.attrSpecDetail.attrValueList;
        });
    },
    mounted() {
        if (this.componentData !== undefined) {
            this.custId = this.componentData.custId;
        }
        this.getDynamicWidth();
        this.getTableItemData();
        // 循环权限数据     
        this.$user.getFuncComps().forEach((item) => {
            switch (item.compCode) {
                case 'F-CMB-200101':
                    this.userRightBtnControl.addBtn = true;
                    break;
                case 'F-CMB-100627':
                    this.userRightBtnControl.detailBtn = true;
                    break;
                default:
                    break;
            }
        })
    },
    methods: {
        filterConfirm(item) {},
        //动态宽度
        getDynamicWidth() {
            let width = this.$refs.width.$el.clientWidth;
            this.dynamicWidth = {
                width: width + "px"
            };
        },
        pageChange(val) {
            this.getTableItemData(val);
        },
        getTableItemData(pageIndex = 1) {
            this.$axios.get(this.$api.AccountGetList, {
                    params: {
                        custId: this.custId ? this.custId : "",
                        accNum: "",
                        contactAddr: "",
                        acctId: "",
                        acctName: "",
                        pageNum: pageIndex,
                        pageSize: this.pageInfo.pageSize,
                        sort: 'acctId',
                        sortType: 'ASC'
                    }
                }).then(res => {
                    if (res.data.result.length) {
                        if(pageIndex > res.data.countPage){
                            this.pageInfo.pageIndex = pageIndex - 1;
                            this.$message.warning({message: '暂无数据'})
                        } else {
                            this.pageInfo.pageIndex = pageIndex
                            this.tableItemData = res.data.result;
                            this.$nextTick( () => {
                                this.$refs.listScroll.init();
                            })
                        }
                    } else {
                        this.$message.warning({message: '暂无数据'})
                    }
                })
                .catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
        },
        //返回值转换
        getPostMethod(name, code) {
            if (name == "帐单介质") {
                let postMethod = this.postMethodArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return postMethod ? postMethod.attrValueName : "";
            } else if (
                name == "是否发送短信帐单" ||
                name == "违约金标识" ||
                name == "打印电子发票" ||
                name == "是否可开具专票"
            ) {
                let ebillSmsNoticeFlg = this.ebillSmsNoticeFlgArray.filter(
                    item => {
                        return item.value == code;
                    }
                )[0];
                return ebillSmsNoticeFlg ? ebillSmsNoticeFlg.label : "无";
            } else if (name == "催欠标识") {
                let collectionCdArray = this.collectionCdArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return collectionCdArray ? collectionCdArray.attrValueName : "";
            } else if (name == "帐单打印格式") {
                let billPrefCdArray = this.billPrefCdArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return billPrefCdArray ? billPrefCdArray.attrValueName : "";
            } else if (name == "付费方式") {
                let paymentArray = this.paymentArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return paymentArray ? paymentArray.attrValueName : "无";
            } else if (name == "帐户状态") {
                let accountStatusCd = this.accountStatusCd.filter(item => {
                    return item.attrValue == code;
                })[0];
                return accountStatusCd ? accountStatusCd.attrValueName : "无";
            } else if (name == "下次开帐日期") {
                return code ? filter.filters.getLocalTime(code) : "无";
            } else {
                return code ? code : "无";
            }
        },
        addAccount() {
            this.$emit('componentView','add')
        },
        //查看详情
        detailClick(item) {
            this.$emit('componentView','mod',item)
        },
        dragchange() {},
        //修改
        handleModify(data) {},

        //控制main的高度
        changeHeight(ind) {
            this.active = ind
        },
        changeLow(ind) {
            this.active = ind
        }
    }
};
</script>

<style lang="scss" scoped>
.account-warp {
    padding: 20px;
    height: 100%;
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

    .main {
        width: 100%;
        height: calc(100% - 236px);
        /* &.active {
            height: calc(100% - 385px);
        } */

        .review {
            color: $mainColor;
            cursor: pointer;
        }
        .overflow-style {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .mgtop10 {
        margin-top: 10px;
        .review {
            color: $mainColor;
            cursor: pointer;
        }
    }
    .mgtop20 {
        margin-top: 20px;
    }
}
</style>
