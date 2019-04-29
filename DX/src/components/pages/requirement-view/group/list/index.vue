<template>
    <div class="list">
        <Shrink :initOpen="true" ref="shrink">
            <Scroll slot="shrink" :isShowRight="true" :isShowBottom="true" ref="tableDataTreeRef">
                <TreeSimple :folder="tableData" :keys="folderKeys" levelStr="orgLevel" :ellipsis="false" @plugClick="getNex" v-model="treeModel" />
            </Scroll>
            <div class="right-content">
                <div class="header">
                    <div class="h-all">
                        <div class="h-a-title">
                            <div class="a-t-name">套餐四级-销售品列表</div>
                        </div>
                    </div>
                </div>
                <div class="l-search">
                    <Col class="l-search-name" :span="8">
                    <!-- <Input :isSearch="true" ></Input> -->
                    <Search placeholder="请输入销售品内部名称或内部编码" @search="searchList"></Search>
                    </Col>
                    <Col :span="10">
                    <div class="a-t-search" v-if="searchData.length > 0">
                        <div class="t-s-name">已筛选：</div>
                        <div class="t-s-item" v-for="(item,index) in searchData" :key="index">
                            <span>{{item.label}}：</span>
                            <span class="s-i-name">{{item.value}}</span>
                            <div class="s-i-close" @click="searchDataClick(item)"></div>
                        </div>
                    </div>
                    </Col>
                </div>
                <div class="main">
                    <Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
                        <DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
                            <Col class="m-t-name" :span="9">
                            <span>销售品内部名称</span>
                            </Col>
                            <DragItem :span="item.span" :value="item" v-for="(item,index) in tableTitleData" :key="index">
                                <span>{{item.name}}</span>

                                <ColSel class="col-search" v-if="item.param == 'offerNbr'" @confirm="filterConfirm(item)">
                                    <div>
                                        <Input v-model="offerNbrSearch" placeholder="请输入销售品业务编码"></Input>
                                    </div>
                                </ColSel>
                            </DragItem>
                        </DragGroup>
                        <Row :class="['m-item app__table-item']" v-for="(item,index) in tableList" :key="index">
                            <Col class="m-i-name app__cut-txt" :span="9" :title="item.offerSysName" @click.native.stop="nameClick(item.offerId,item.offerName)">{{item.offerSysName}}</Col>
                            <Col :span="item1.span" v-for="(item1,index) in tableTitleData" :key="index">
                            <span v-if="item1.param == 'effDate'">
                                {{item[item1.param] | datetime}}
                            </span>
                            <span v-else-if="item1.param == 'expDate'">
                                {{item[item1.param] | datetime}}
                            </span>
                            <span v-else>{{item[item1.param]}}</span>
                            </Col>
                        </Row>
                        <Row v-if="!tableList.length" class="app__data-none">
                            <Col :span="24">
                            <span>暂无数据</span>
                            </Col>
                        </Row>
                        <Row :class="['m-item app__table-item']" v-if="tableList.length != 0" v-for="item in (20 - tableList.length)" :key="item.offerName"></Row>
                    </Scroll>
                </div>
                <div class="footer">
                    <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange"></Pagination>
                </div>
            </div>
        </Shrink>

        <LeftDialog ref="leftDialog">

            <div class="l-d-header">
                <div class="d-h-title">
                    <div class="h-t-left">
                        {{comName}}
                    </div>
                </div>
            </div>

            <div class="l-d-content">
                <TabPane :tabs="tabs" :value="tabDefault" @change="tabChange" :isAuto="false">
                    <template slot="label">
                        <div class="d-c-scroll">
                            <Scroll>
                                <div class="left2">

                                    <span class="span" :class="{active1:isShow=='1000'}" @click="clickSpan('1000')">销售品配置</span>

                                    <ul v-show="isShow2">
                                        <li :class="{active:currentInfo == item.components}" v-for="(item,index) in module" :key="index" @click="moduleClick(item.components,index)">{{item.name}}
                                        </li>
                                    </ul>
                                    <span class="span2" :class="{active5:isShow=='1200'}" @click="clickSpan('1200')">配置目标客户</span>
                                    <span class="span3" :class="{active5:isShow=='1300'}" @click="clickSpan('1300')">配置销售渠道</span>
                                    <span class="span4" :class="{active5:isShow=='1500'}" @click="clickSpan('1500')">配置促销资源</span>
                                    <span class="span5" :class="{active5:isShow=='1600'}" @click="clickSpan('1600')">配置客户服务</span>
                                    <span class="span7" :class="{active5:isShow=='1700'}" @click="clickSpan('1700')">测试验证</span>
                                    <span class="span8" :class="{active5:isShow=='1800'}" @click="clickSpan('1800')">上市发布</span>
                                </div>
                            </Scroll>
                        </div>
                        <!--加载详情组件-->
                        <div class="d-c-info">
                            <component :is="currentView" ref="component" :componentData="componentData"></component>
                        </div>
                    </template>
                    <template slot="businessrules">
                        <Scroll :isShowRight="true">
                            <div class="d-c-val">
                                <span class="d-c-val-title iconfont icon-fazhanyewu">外延参数统计</span>
                                <div class="d-c-top">
                                    <div class="top-tab">
                                        <div class="top-tab-left">
                                            <div class="tab-btn" :class="{active: liType == index}" v-for="(item,index) in tabBtn" :key="index" @click="hintClick(index)" @mouseover="titleShow(index)" @mouseout="titleHide(index)">{{item.name}}</div>
                                        </div>
                                        <div class="top-tab-right">
                                            <div @click="tabBtnUnfold(1)">{{tabBtnShow ? '收起' : '更多'}}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="tab-title" :class="'distent'+index" v-for="(item,index) in tabBtn" :key='index'><span>{{item.value}}</span></div>
                                    </div>
                                    <div class="top-info" v-if="infoDate == 1">
                                        <Col :span="3">
                                        <Select :isNullSel=false :data="yearData" dataLabelStr="name" v-model="hintYear"></Select>
                                        </Col>
                                        <Col :span="2">
                                        <Select :isNullSel=false :data="monthData" dataLabelStr="name" v-model="hintMonth"></Select>
                                        <!-- <DatePicker v-validate="'required'" :endDate="basicData.expDate" initType='m' name="effDate"  v-model="basicData.effDate"></DatePicker> -->
                                        </Col>
                                        <Col :span="1"><span class="tolink">to</span></Col>
                                        <Col :span="3">
                                        <Select :isNullSel=false :data="yearData" dataLabelStr="name" v-model="hintYear2"></Select>
                                        </Col>
                                        <Col :span="2">
                                        <!-- <DatePicker v-validate="'required'" :startDate="basicData.effDate" initType='m' name="expDate" v-model="basicData.expDate"></DatePicker> -->
                                        <Select :isNullSel=false :data="monthData" dataLabelStr="name" v-model="hintMonth2"></Select>
                                        </Col>
                                        <div class="clear"></div>
                                    </div>
                                    <div class="top-info2" v-if="infoDate == 2">
                                        <!-- <div class="top-info2-income">
                                                <span>实际累计收入</span>
                                                <span>月评价收入</span>
                                                <span>预计累计收入</span>
                                            </div> -->
                                        <div class="clear"></div>
                                    </div>
                                    <div class="top-echs">
                                        <div id="main-top" ref="echarts"></div>
                                    </div>
                                </div>
                                <span class="d-c-val-title iconfont icon-fazhanyewu">分区域统计</span>
                                <div class="d-c-top">
                                    <div class="top-tab">
                                        <div class="top-tab-left">
                                            <div class="tab-btn" :class="{active: liType2 == index}" v-for="(item,index) in tabBtn" :key="index" @click="hitClickPlace(index)">{{item.name}}</div>
                                        </div>
                                        <div class="top-tab-right">
                                            <div @click="tabBtnUnfold(2)">{{tabBtnShow2 ? '收起' : '更多'}}</div>
                                        </div>
                                    </div>
                                    <div class="top-info3">
                                        <RadioGroup v-validate="'required'" :data="offerDate" name="name" data-vv-as="月份" v-model="duringData.templateType"></RadioGroup>
                                    </div>
                                    <div class="top-echs">
                                        <div class="middle-map">
                                            <div class="middle-map-left"></div>
                                            <div class="middle-map-right">
                                                <ul>
                                                    <li v-for="(item,index) in bureauInfos" :key="index"><span class="number_left">{{index + 1}}</span><span class="number_font">{{item.areaName ? item.areaName : '其它'}}</span><a :title="getPlaceSta(item)" class="middle" :style="{ width:getPlaceSta(item) == 0 ? 0  :  getPlaceSta(item) / getBureAuInfos() * 53 + '%' }"></a><a :title="getPlaceSta(item)" class="number_right">{{getPlaceSta(item)}}</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span class="d-c-val-title iconfont icon-fazhanyewu">分渠道统计</span>
                                <div class="d-c-top">
                                    <div class="top-tab">
                                        <div class="top-tab-left">
                                            <div class="tab-btn" :class="{active: liType3 == index}" v-for="(item,index) in tabBtn" :key="index" @click="hintClickSta(index)">{{item.name}}</div>
                                        </div>
                                        <div class="top-tab-right">
                                            <div @click="tabBtnUnfold(3)">{{tabBtnShow3 ? '收起' : '更多'}}</div>
                                        </div>
                                    </div>
                                    <div class="top-info3">
                                        <RadioGroup v-validate="'required'" :data="offerDate" name="name" data-vv-as="月份" v-model="duringData.templateTypeSta"></RadioGroup>
                                    </div>
                                    <div class="top-info2" v-show="false">
                                        <!-- <div class="top-info2-income">
                                                <span>实体</span>
                                                <span>直销</span>
                                                <span>电子</span>
                                            </div> -->
                                        <!-- <div class="clear"></div> -->
                                    </div>
                                    <div class="top-echs">
                                        <div class="right-small">
                                            <ul>
                                                <li :class="activeIndex == index ? 'active' : ''" v-for="(item,index) in channelInfosList" @click='echsShow2(item.xAxis,item.yAxis,index)' :key="index">{{item.channelName}}</li>
                                            </ul>
                                        </div>

                                        <div class="top-echs-pie">
                                            <div id="main-pie" ref="echartsP"></div>
                                        </div>

                                        <div class="top-echs-line">
                                            <div id="main-bottom" ref="echartsB">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Scroll>
                    </template>
                </TabPane>
            </div>
        </LeftDialog>

        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
    </div>
</template>

<script type="text/javascript">
import echarts from "echarts";

export default {
    components: {
        goods: () => import("./group/goods")
    },

    data() {
        return {
            componentData: {},
            offerNbrSearch: "",
            selList: "",
            startDate: "", //外延参数开始时间
            endDate: "", //外延参数结束时间
            liType: "0",
            liType2: "0",
            liType3: "0",
            btnType: "1",
            btnType2: "1",
            offerId: "", //销售品Id
            //currentView: 'basic',      //当前视图
            currentView: "",
            comName: "", //当前商品名称
            module: [
                { name: "基本信息", components: "1" },
                { name: "定价信息", components: "2" },
                { name: "受理规则", components: "3" },
                { name: "毛利预估", components: "4" }
            ],
            iconView: "i-img1",
            tableList: [], //销售品全视图列表数据

            pageInfo: {
                pageIndex: 1, // 当前页
                pageSize: 20, // 每页条数
                pageCount: 0, // 总页数
                rowCount: 0 // 总条数
            },
            searchData: [], //筛选后显示的数据
            //树的数据
            folder: {
                catalogItemName: "组织名称",
                orgType: "类型",
                salesorgCode: "销售点编码",
                level: 1
            },
            folderKeys: [
                {
                    key: "catalogItemName" //组织名称
                }
            ],

            tableData: {
                catalogItemName: "销售品视图",
                children: []
            },
            treeModel: "",

            isShow: "1000",

            currentInfo: "1",
            isShow2: false, //测试验证隐藏菜单
            isShow3: false, //发布上市隐藏菜单
            activeIndex: 0,
            infoDate: 2,

            tipInfo: {
                iconType: 1,
                msg: "",
                showBtn: {
                    clear: true,
                    save: true
                }
            },
            tabBtnShow: false,
            tabBtnShow2: false,
            tabBtnShow3: false,
            duringData: {
                templateType: "month",
                templateTypeSta: "month"
            },
            offerDate: [
                {
                    label: "当月",
                    value: "month"
                },
                {
                    label: "3个月",
                    value: "three_month"
                },
                {
                    label: "6个月",
                    value: "six_month"
                },
                {
                    label: "12个月",
                    value: "twelve_month"
                }
            ],
            tabBtn: [
                {
                    name: "订购量(个)",
                    value: "一段时间用户订购套餐的数量"
                },
                {
                    name: "退订量(个)",
                    value: "一段时间用户退订套餐的数量"
                },
                {
                    name: "收入(元)",
                    value: "一段时间税后收入的总和"
                },
                {
                    name: "ARPU(个)",
                    value: "一段时间用户平均收入"
                },
                // {
                //     name: "MOU(秒)",
                //     value: "一段时间用户平均通话分钟数"
                // },
                // {
                //     name: "DOU(个)",
                //     value: "一段时间用户平均上网流量数"
                // },
                // {
                //     name: "4G机卡占比",
                //     value: "4G终端4G的uim卡的比例"
                // },
                {
                    name: "移动开放天数(天)",
                    value: "一段时间移动的开机天数总量"
                },
                // {
                //     name: "移动双0用户占比",
                //     value: "流量为0且通话为0的比例"
                // },
                {
                    name: "活跃度(个)",
                    value: "一段时间所有用户的活跃数量"
                },
                {
                    name: "过网用户(个)",
                    value: "一段时间所有过网用户数量"
                },
                {
                    name: "累计用户数",
                    value: "一段时间累积的用户总量"
                }
            ],
            yearData: [
                {
                    name: "2018",
                    value: "2018"
                }
            ],
            monthData: [
                {
                    name: "01",
                    value: "01"
                },
                {
                    name: "02",
                    value: "02"
                },
                {
                    name: "03",
                    value: "03"
                },
                {
                    name: "04",
                    value: "04"
                },
                {
                    name: "05",
                    value: "05"
                },
                {
                    name: "06",
                    value: "06"
                },
                {
                    name: "07",
                    value: "07"
                },
                {
                    name: "08",
                    value: "08"
                },
                {
                    name: "09",
                    value: "09"
                },
                {
                    name: "10",
                    value: "10"
                },
                {
                    name: "11",
                    value: "11"
                },
                {
                    name: "12",
                    value: "12"
                }
            ],
            hintYear: "2018",
            hintYear2: "2018",
            hintMonth: "01",
            hintMonth2: "06",
            hintInfo: "订购量", //图表纵轴标题
            hintInfo2: "", //第三个图表纵轴标题

            quotaNum: "order_cnt", //分渠道统计类别选择选中的数据
            quotaNum2: "", //分区域统计类别选择选中的数据
            extenEchs: [5, 20, 36, 40], //外延参数图表参数

            tipConfirmType: "",
            showOperation: false,
            checkboxData: [],
            tabs: [
                {
                    // 标签切换
                    label: "基本信息",
                    value: "label"
                },
                {
                    label: "销售统计",
                    value: "businessrules"
                }
            ],
            tabDefault: "label",

            tableTitleData: [
                {
                    name: "销售品内部编码",
                    param: "innerNbr",
                    span: 4
                },
                {
                    name: "生效时间",
                    param: "effDate",
                    span: 4
                },
                {
                    name: "失效时间",
                    param: "expDate",
                    span: 4
                },
                {
                    name: "状态",
                    param: "statusCd",
                    span: 3
                }
            ],
            basicData: {
                expDate: "",
                effDate: ""
            },
            activeColor: "#3F99Cd",
            localColor: "#7EB8D9",
            overColor: "#ACD2E9",
            prdColor: "#627892",
            orderColor: "mainColor",
            mainColor: "#DBDAE2",
            afterColor: "#09BEFE",
            arpuColor: "#5C9CF1",
            mouColor: "#E7D104",
            douColor: "#848acf",
            tableItemData: {
                offerNbr: "FQJD",
                statusCd: "输入型",
                effDate: "无",
                expDate: "无",
                statusCd: "有效"
            },
            bureauInfos: [], //分区域统计数据
            isValidDrag: false,
            dragItem: null,
            dragenterItem: null,
            dragenterEl: null,
            quota: "",
            quotaSta: "",
            channelInfosList: []
        };
    },
    watch: {
        treeModel(curVal) {
            this.getList("", "", curVal.catalogItemId);
        },
        quotaNum(curVal) {
            //console.log(curVal)
            switch (curVal) {
                case "order_cnt":
                    this.hintInfo2 = "订购量";
                    break;
                // case "4g机卡占比":
                //     this.hintInfo2 = "4G卡机占比";
                //     break;
                case "del_cnt":
                    this.hintInfo2 = "退订量";
                    break;
                case "active_cnt_level_cnt":
                    this.hintInfo2 = "移动开放天数";
                    break;
                case "after_tax_cnt":
                    this.hintInfo2 = "收入";
                    break;
                // case "double_zero_rate":
                //     this.hintInfo2 = "移动双0用户占比";
                //     break;
                case "mou":
                    this.hintInfo2 = "mou";
                    break;
                case "arpu":
                    this.hintInfo2 = "ARPU";
                    break;
                case "local_active_cnt":
                    this.hintInfo2 = "活跃度（移动，宽带）";
                    break;
                case "over_net_cnt":
                    this.hintInfo2 = "过网用户（分运营商）";
                    break;
                case "dou":
                    this.hintInfo2 = "DOU";
                    break;
                case "prd_cnt":
                    this.hintInfo2 = "累计用户数";
                    break;
            }
        },
        hintMonth(curVal) {
            switch (this.liType) {
                // case 6:
                //     this.getHintClick2("uim_4g_rate", "#ab666e");
                //     this.hintInfo = "4G卡机占比";
                //     break;
                case 4:
                    this.getHintClick2(
                        "active_cnt_level_cnt",
                        this.activeColor
                    );
                    this.hintInfo = "移动开放天数";
                    break;
                // case 8:
                //     this.getHintClick2("double_zero_rate", "#358018");
                //     this.hintInfo = "移动双0用户占比";
                //     break;
                case 5:
                    this.getHintClick2("local_active_cnt", this.localColor);
                    this.hintInfo = "活跃度（移动，宽带）";
                    break;
                case 6:
                    this.getHintClick2("over_net_cnt", this.overColor);
                    this.hintInfo = "过网用户（分运营商）";
                    break;
                case 7:
                    this.getHintClick2("prd_cnt", this.prdColor);
                    this.hintInfo = "累计用户数";
                    break;
            }
        },
        hintMonth2(curVal) {
            switch (this.liType) {
                // case 6:
                //     this.getHintClick2("uim_4g_rate", "#ab666e");
                //     this.hintInfo = "4G卡机占比";
                //     break;
                case 4:
                    this.getHintClick2(
                        "active_cnt_level_cnt",
                        this.activeColor
                    );
                    this.hintInfo = "移动开放天数";
                    break;
                // case 8:
                //     this.getHintClick2("double_zero_rate", "#358018");
                //     this.hintInfo = "移动双0用户占比";
                //     break;
                case 5:
                    this.getHintClick2("local_active_cnt", this.localColor);
                    this.hintInfo = "活跃度（移动，宽带）";
                    break;
                case 6:
                    this.getHintClick2("over_net_cnt", this.overColor);
                    this.hintInfo = "过网用户（分运营商）";
                    break;
                case 7:
                    this.getHintClick2("prd_cnt", this.prdColor);
                    this.hintInfo = "累计用户数";
                    break;
            }
        },
        searchData(newVal, oldVal) {
            if (newVal != oldVal) {
                this.pageInfo.pageIndex = 1;
                this.getList("", this.offerNbrSearch);
            }
        },
        "duringData.templateType"(newVal, oldVal) {
            if (newVal != oldVal) {
                this.hintClickStaPlace(this.quota);
            }
        },
        "duringData.templateTypeSta"(newVal, oldVal) {
            if (newVal != oldVal) {
                this.getHintClickSta(this.quotaSta);
            }
        }
    },

    mounted() {
        this.getTableData();
        this.getList();
    },
    methods: {
        clickSpan(type) {
            if (type == "1000") {
                if (this.isShow2 == true) {
                    this.isShow2 = false;
                } else {
                    this.isShow2 = true;
                }
            }
            this.currentInfo = 0;

            if (type == "1100") {
                this.$refs.component.rightMenuInput("basicFoldObj");
            } else if (type == "1000") {
                this.$refs.component.rightMenuInput("basicFoldObj");
            } else if (type == "1200") {
                this.isShow = 1200;
                this.$refs.component.rightMenuInput("constraintFoldObj");
            } else if (type == "1300") {
                this.isShow = 1300;
                this.$refs.component.rightMenuInput("channelFoldObj");
            } else if (type == "1400") {
                this.isShow = 1400;
                //this.$refs.component.rightMenuInput('saleselFoldObj')
            } else if (type == "1500") {
                this.isShow = 1500;
                this.$refs.component.rightMenuInput("saleselFoldObj");
            } else if (type == "1600") {
                this.isShow = 1600;
                this.$refs.component.rightMenuInput("customerFoldObj");
            } else if (type == "1700") {
                this.isShow = 1700;
                this.$refs.component.rightMenuInput("validateFoldObj");
            } else if (type == "1800") {
                this.isShow = 1800;
                this.$refs.component.rightMenuInput("listedFoldObj");
            } else if (type == "1900") {
                this.isShow = 1900;
                this.$refs.component.rightMenuInput("pricesFoldObj");
            } else if (type == "2000") {
                this.isShow = 2000;
                this.$refs.component.rightMenuInput("acceptFoldObj");
            } else if (type == "2100") {
                this.isShow = 2100;
                this.$refs.component.rightMenuInput("estimateFoldObj");
            }
        },
        searchList(val){
            this.pageInfo.pageIndex = 1;
            this.getList(val);
        },

        //查询销售品列表
        getList(name, nbr, cataId) {
            let testOfferName = name,
                testInnerNbr = name;
            if(/^(2-)/.test(testOfferName)){
                testOfferName = '';
            }else{
                testInnerNbr = '';
            }

            this.$axios
                .get(this.$api.OfferGetList, {
                    params: {
                        page: this.pageInfo.pageIndex,
                        limit: 20,
                        offerSysName: '',
                        offerInnerNbr: name,
                        offerNbr: nbr,
                        innerNbr: '',
                        offerId: "",
                        catalogItemId: cataId
                    }
                })
                .then(res => {
                    if (res.data.success) {
                        this.tableList = res.data.offerPage.content;
                        for (var i = 0; i < this.tableList.length; i++) {
                            switch (this.tableList[i].statusCd) {
                                case "1000":
                                    this.tableList[i].statusCd = "有效";
                                    break;
                                case "1200":
                                    this.tableList[i].statusCd = "未生效";
                                    break;
                                case "1300":
                                    this.tableList[i].statusCd = "已归档";
                                    break;
                                case "1400":
                                    this.tableList[i].statusCd = "停止销售";
                                    break;
                                case "1500":
                                    this.tableList[i].statusCd = "停止销售";
                                    break;
                                case "1600":
                                    this.tableList[i].statusCd = "停止销售";
                                    break;
                                default:
                                    this.tableList[i].statusCd = "未知";
                            }
                        }
                        this.pageInfo = {
                            pageIndex: res.data.offerPage.page,
                            pageSize: res.data.offerPage.limit,
                            rowCount: res.data.offerPage.total,
                            pageCount: Math.ceil(
                                res.data.offerPage.total /
                                    res.data.offerPage.limit
                            )
                        };

                        this.$nextTick(() => {
                            this.$refs.listScroll.init();
                        })
                    }
                })
                .catch(error => {
                    this.$message.error({ message: "销售品列表查询失败" });
                });
        },
        //获取销售品目录树
        getTableData() {
            this.$axios
                .get(this.$api.Catalog + "/10102", {
                    params: {}
                })
                .then(res => {
                    if (res.data.success) {
                        this.tableData.children =
                            res.data.catalogDetail.catalogItems || [];
                        this.$nextTick(() => {});
                    } else {
                        this.$message.error({ message: res.data.msg });
                    }
                })
                .catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                });
        },

        //切换外延参数图表
        hintClick(index) {
            //console.log(index)
            this.liType = index;
            switch (index) {
                case 0:
                    this.getHintClick("order_cnt", this.orderColor);
                    this.hintInfo = "订购量";
                    this.infoDate = 2;
                    break;
                case 1:
                    this.getHintClick("del_cnt", this.mainColor);
                    this.hintInfo = "退订量";
                    this.infoDate = 2;
                    break;
                case 2:
                    this.getHintClick("after_tax_cnt", this.afterColor);
                    this.hintInfo = "收入";
                    this.infoDate = 2;
                    break;
                case 3:
                    this.getHintClick("arpu_cnt", this.arpuColor);
                    this.hintInfo = "ARPU";
                    this.infoDate = 2;
                    break;
                // case 4:
                //     this.getHintClick("mou_cnt", this.mouColor);
                //     this.hintInfo = "MOU";
                //     this.infoDate = 2;
                //     break;
                // case 5:
                //     this.getHintClick("dou_cnt", this.douColor);
                //     this.hintInfo = "DOU";
                //     this.infoDate = 2;
                //     break;
                // case 6:
                //     this.getHintClick2("uim_4g_rate", "#ab666e");
                //     this.hintInfo = "4G卡机占比";
                //     this.infoDate = 1;
                //     break
                case 4:
                    this.getHintClick2(
                        "active_cnt_level_cnt",
                        this.activeColor
                    );
                    this.hintInfo = "移动开放天数";
                    this.infoDate = 1;
                    break;
                // case 8:
                //     this.getHintClick2("double_zero_rate", "#358018");
                //     this.hintInfo = "移动双0用户占比";
                //     this.infoDate = 1;
                //     break;
                case 5:
                    this.getHintClick2("local_active_cnt", this.localColor);
                    this.hintInfo = "活跃度（移动，宽带）";
                    this.infoDate = 1;
                    break;
                case 6:
                    this.getHintClick2("over_net_cnt", this.overColor);
                    this.hintInfo = "过网用户（分运营商）";
                    this.infoDate = 1;
                    break;
                case 7:
                    this.getHintClick2("prd_cnt", this.prdColor);
                    this.hintInfo = "累计用户数";
                    this.infoDate = 1;
                    break;
            }
        },
        //外延参数图表数据获取
        getHintClick(quoTa, color) {
            let myDate = new Date(); //获取系统当前时间
            let monDate = myDate.getMonth();
            if (monDate < 10) {
                monDate = "0" + monDate;
            } else if (monDate == 0) {
                monDate = 12;
            }
            let nowDate = "";
            if (monDate == 12) {
                nowDate =
                    (myDate.getFullYear() - 1).toString() + monDate.toString();
            } else {
                nowDate = myDate.getFullYear().toString() + monDate.toString();
            }
            this.$axios
                .get(this.$api.OfferViewEpSt, {
                    params: {
                        promNum: this.offerId,
                        monthId: "201809",
                        quota: quoTa
                    }
                })
                .then(res => {
                    //console.log(res.data.yAxis)
                    let xA = res.data.yAxis;
                    let xA2 = [];
                    for (var i = 0; i < xA.length; i++) {
                        xA2.push(parseInt(xA[i]));
                    }
                    this.echsShow(res.data.xAxis, xA2, color);
                })
                .catch(error => {
                    this.$message.error({
                        message: error.response.data.msg + "--外延参数"
                    });
                });
        },
        //外延参数图表第二列数据
        getHintClick2(quoTa, color) {
            /*let myDate = new Date();//获取系统当前时间
                let monDate = myDate.getMonth();
                if (monDate<10) {
                    monDate = '0' + monDate
                }else if(monDate==0){
                    monDate = 12
                };
                let nowDate = ''
                if (monDate == 12) {
                    nowDate = (myDate.getFullYear()-1).toString()+monDate.toString()
                } else {
                    nowDate = myDate.getFullYear().toString()+monDate.toString()
                }*/
            let monStart = this.hintYear + this.hintMonth;
            // let monStart = this.basicData.effDate.replace('-','');
            let monEnd = this.hintYear2 + this.hintMonth2;
            // let monEnd = this.basicData.expDate.replace('-','');
            if (Number(monStart) >= Number(monEnd)) {
                this.$message.error({ message: "开始时间不能大于结束时间" });
            } else {
                this.$axios
                    .get(this.$api.OfferViewEpSt2, {
                        params: {
                            promNum: this.offerId,
                            monthIdStart: monStart,
                            monthIdEnd: monEnd,
                            quota: quoTa
                        }
                    })
                    .then(res => {
                        //console.log(res.data.yAxis)
                        let xA = res.data.yAxis;
                        let xA2 = [];
                        for (var i = 0; i < xA.length; i++) {
                            xA2.push(parseInt(xA[i]));
                        }
                        this.echsShow(res.data.xAxis, xA2, color);
                    })
                    .catch(error => {
                        this.$message.error({
                            message: error.response.data.msg + "--外延参数"
                        });
                    });
            }
        },
        //分渠道统计图表
        hintClickSta(index) {
            //console.log(index)
            this.liType3 = index;
            switch (index) {
                case 0:
                    this.getHintClickSta("order_cnt");
                    this.hintInfo = "订购量";
                    break;
                case 1:
                    this.getHintClickSta("del_cnt");
                    this.hintInfo = "退订量";
                    break;
                case 2:
                    this.getHintClickSta("after_tax_cnt");
                    this.hintInfo = "收入";
                    break;
                case 3:
                    this.getHintClickSta("arpu_cnt");
                    this.hintInfo = "ARPU";
                    break;
                // case 4:
                //     this.getHintClickSta("mou_cnt");
                //     this.hintInfo = "MOU";
                //     break;
                // case 5:
                //     this.getHintClickSta("dou_cnt");
                //     this.hintInfo = "DOU";
                //     break;
                // case 6:
                //     this.getHintClickSta("uim_4g_rate");
                //     this.hintInfo = "4G卡机占比";
                //     break;
                case 4:
                    this.getHintClickSta("active_cnt_level_cnt");
                    this.hintInfo = "移动开放天数";
                    break;
                // case 8:
                //     this.getHintClickSta("double_zero_rate");
                //     this.hintInfo = "移动双0用户占比";
                //     break;
                case 5:
                    this.getHintClickSta("local_active_cnt");
                    this.hintInfo = "活跃度（移动，宽带）";
                    break;
                case 6:
                    this.getHintClickSta("over_net_cnt");
                    this.hintInfo = "过网用户（分运营商）";
                    break;
                case 7:
                    this.getHintClickSta("prd_cnt");
                    this.hintInfo = "累计用户数";
                    break;
            }
        },
        //分区域统计图表
        hintClickStaPlace(quota, color) {
            this.quota = quota;
            this.$axios
                .get(this.$api.OfferViewAreaStatistics, {
                    params: {
                        // "promNum": "179027878282",
                        promNum: this.offerId,
                        monthId: "201809",
                        sortOrder: "desc", //降序：desc，升序：asc
                        showNumbers: "10", //显示条数
                        quota: this.quota,
                        month: this.duringData.templateType
                    }
                })
                .then(res => {
                    this.bureauInfos = res.data.areaProInfos;
                })
                .catch(error => {
                    this.$message.error({ message: "区域统计查询失败" });
                });
        },
        //分渠道统计图表接口
        getHintClickSta(name) {
            this.quotaSta = name;
            if (this.quotaNum == "") {
                alert("请选择类别");
            } else {
                this.$axios
                    .get(this.$api.OfferViewChSt, {
                        params: {
                            // promNum:"179027878282",
                            promNum: this.offerId,
                            monthId: "201809",
                            quota: this.quotaSta,
                            timeQuantum: this.duringData.templateTypeSta
                        }
                    })
                    .then(res => {
                        if (res.data.success) {
                            let pieDate = [];
                            let xAxis =
                                res.data.channelInfos[0] &&
                                res.data.channelInfos[0].xAxis
                                    ? res.data.channelInfos[0].xAxis
                                    : [];
                            let yAxis =
                                res.data.channelInfos[0] &&
                                res.data.channelInfos[0].yAxis
                                    ? res.data.channelInfos[0].yAxis
                                    : [];
                            this.channelInfosList = res.data.channelInfos;
                            if (this.channelInfosList.length) {
                                this.channelInfosList.forEach(item => {
                                    let obj = {
                                        value: parseInt(item.channeData),
                                        name: item.channelName
                                    };
                                    pieDate.push(obj);
                                });
                            }
                            this.echsShow3(pieDate);
                            this.echsShow2(xAxis, yAxis, 0);
                        }
                    })
                    .catch(error => {
                        this.$message.error({ message: "渠道统计查询失败" });
                    });
            }
        },
        //外延参数图表
        echsShow(xAxisData, yAxisData, colors) {
            let mainTop = document.getElementById("main-top");
            mainTop.setAttribute("_echarts_instance", "");
            mainTop.style.width = (window.innerWidth * 67) / 100 + "px";
            let myChart = echarts.init(mainTop);
            let obj = {
                tooltip: {},
                grid: {
                    left: "80px",
                    right: "80px",
                    top: "15px;"
                },
                xAxis: {
                    data: xAxisData
                },
                yAxis: {},
                series: [
                    {
                        type: "line",
                        center: ["50%", "50%"], // 默认全局居中
                        itemStyle: {
                            normal: {
                                color: colors,
                                lineStyle: {
                                    color: colors
                                },
                                label: {
                                    show:true
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "top"
                            }
                        },
                        data: yAxisData
                    }
                ]
            };
            myChart.setOption(obj);
            setTimeout(() => {
                myChart.resize();
            }, 0);
        },
        //分渠道统计图表
        echsShow2(xAxisData, yAxisData, index) {
            this.activeIndex = index;
            let xA2 = [];
            for (var i = 0; i < yAxisData.length; i++) {
                xA2.push(parseInt(yAxisData[i]));
            }
            let mainBottom = document.getElementById("main-bottom");
            mainBottom.setAttribute("_echarts_instance", "");
            mainBottom.style.width = (window.innerWidth * 38) / 100 + "px";
            let myChart2 = echarts.init(mainBottom);
            let obj = {
                tooltip: {},
                grid: {
                    left: 100,
                    right: 20,
                    bottom: 90
                },
                title: {
                    text: "渠道小类",
                    right: 0
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                xAxis: {
                    type: "value"
                },
                yAxis: {
                    inverse: true,
                    type: "category",
                    data: xAxisData,
                    axisLabel: {
                        interval: 0,
                        // rotate:-40
                        formatter: function(value) {
                            var ret = ""; //拼接加\n返回的类目项
                            var maxLength = 7; //每项显示文字个数
                            var valLength = value.length; //X轴类目项的文字个数
                            var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                            if (rowN > 1) {
                                //如果类目项的文字大于3,
                                for (var i = 0; i < rowN; i++) {
                                    var temp = ""; //每次截取的字符串
                                    var start = i * maxLength; //开始截取的位置
                                    var end = start + maxLength; //结束截取的位置
                                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                    temp = value.substring(start, end) + "\n";
                                    ret += temp; //凭借最终的字符串
                                }
                                return ret;
                            } else {
                                return value;
                            }
                        }
                    }
                },
                series: [
                    {
                        type: "bar",
                        center: ["70%", "50%"], // 默认全局居中
                        itemStyle: {
                            normal: {
                                color: "#5F9BF3",
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: xA2
                    }
                ]
            };
            myChart2.setOption(obj);
            setTimeout(() => {
                myChart2.resize();
            }, 0);
        },
        //分渠道统计左侧图表
        echsShow3(pieDate) {
            let total = 0;
            let nameDate = [];
            if (pieDate.length) {
                pieDate.forEach((item, index, array) => {
                    total += item.value;
                    nameDate.push(item.name);
                });
            }
            let mainPie = document.getElementById("main-pie");
            mainPie.setAttribute("_echarts_instance", "");
            mainPie.style.width = (window.innerWidth * 30) / 100 + "px";
            let myChart3 = echarts.init(mainPie);
            let obj = {
                tooltip: {},
                grid: {
                    top: "10px",
                    left: "40px",
                    right: "10px"
                },
                title: {
                    text: "渠道大类",
                    x:'30%',
                    y: '70%'
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    // orient: 'horizontal',
                    orient: "vertical",
                    itemWidth: 10,
                    itemHeight: 10,
                    right: "10%",
                    top: "30%",
                    data: nameDate.length ? nameDate : ["暂", "无", "数", "据"]
                },
                series: [
                    {
                        selectedMode: "single",
                        type: "pie",
                        radius: ["38%", "55%"],
                        center: ["40%", "40%"], // 默认全局居中
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center",
                                formatter: "{per|{d}%}\n{a|{b}}\n{hr|}",
                                rich: {
                                    per: {
                                        color: "#000000",
                                        fontSize: 28,
                                        lineHeight: 28,
                                        align: "center"
                                    },
                                    a: {
                                        color: "#999999",
                                        align: "center",
                                        fontSize: 12
                                    },
                                    b: {
                                        color: "#0abffd",
                                        fontSize: 14,
                                        lineHeight: 40,
                                        align: "center"
                                    },
                                    hr: {
                                        width: "100%",
                                        height: 0,
                                        align: "center"
                                    }
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: pieDate.length
                            ? pieDate
                            : [
                                  { name: "暂", value: 10 },
                                  { name: "无", value: 20 },
                                  { name: "数", value: 20 },
                                  { name: "据", value: 20 }
                              ],
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                        "#ACD2E9",
                                        "#7EB8D9",
                                        "#3F99Cd",
                                        "#627892",
                                        "#DBDAE2",
                                        "#09BEFE",
                                        "#5C9CF1",
                                        "#E7D104"
                                    ];
                                    return colorList[params.dataIndex];
                                }
                            },
                        },
                        
                    }
                ]
            };
            myChart3.setOption(obj);
            setTimeout(() => {
                myChart3.resize();
            }, 0);
        },
        //获取区域月份
        getPlaceSta(item) {
            switch (this.duringData.templateType) {
                case "month":
                    return item.month;
                    break;
                case "three_month":
                    return item.threeMonth;
                    break;
                case "six_month":
                    return item.sixMonth;
                    break;
                case "twelve_month":
                    return item.twelveMonth;
                    break;
            }
        },
        getBureAuInfos() {
            switch (this.duringData.templateType) {
                case "month":
                    return this.bureauInfos[0].month;
                    break;
                case "three_month":
                    return this.bureauInfos[0].threeMonth;
                    break;
                case "six_month":
                    return this.bureauInfos[0].sixMonth;
                    break;
                case "twelve_month":
                    return this.bureauInfos[0].twelveMonth;
                    break;
            }
        },
        //分区域统计按钮
        hitClickPlace(index) {
            this.liType2 = index;
            switch (index) {
                case 0:
                    this.hintClickStaPlace("order_cnt", this.orderColor);
                    this.hintInfo = "订购量";
                    this.infoDate = 2;
                    break;
                case 1:
                    this.hintClickStaPlace("del_cnt", this.mainColor);
                    this.hintInfo = "退订量";
                    this.infoDate = 2;
                    break;
                case 2:
                    this.hintClickStaPlace("after_tax_cnt", this.afterColor);
                    this.hintInfo = "收入";
                    this.infoDate = 2;
                    break;
                case 3:
                    this.hintClickStaPlace("arpu_cnt", this.arpuColor);
                    this.hintInfo = "ARPU";
                    this.infoDate = 2;
                    break;

                case 4:
                    this.hintClickStaPlace(
                        "active_cnt_level_cnt",
                        this.activeColor
                    );
                    this.hintInfo = "移动开放天数";
                    this.infoDate = 1;
                    break;
                case 5:
                    this.hintClickStaPlace("local_active_cnt", this.localColor);
                    this.hintInfo = "活跃度（移动，宽带）";
                    this.infoDate = 1;
                    break;
                case 6:
                    this.hintClickStaPlace("over_net_cnt", this.overColor);
                    this.hintInfo = "过网用户（分运营商）";
                    this.infoDate = 1;
                    break;
                case 7:
                    this.hintClickStaPlace("prd_cnt", this.prdColor);
                    this.hintInfo = "累计用户数";
                    this.infoDate = 1;
                    break;
            }
        },
        nameClick(offerId, offerName) {
            this.offerId = offerId;
            this.comName = offerName;
            this.$refs.leftDialog.show();
            this.$refs.shrink.closeClick();
            this.infoDate = 2;

            this.componentData = {
                offerId: offerId
            };
            this.currentView = "goods";

            this.getHintClick("order_cnt", this.orderColor);
            this.getHintClickSta("order_cnt");
            this.hintClickStaPlace("order_cnt", this.orderColor);
        },
        //列表分页
        pageChange(page) {
            this.pageInfo.pageIndex = page;
            this.getList();
        },

        //销售品业务编码的查询
        filterConfirm(item) {
            let obj = {
                label: item.name,
                code: item.param,
                value: this.offerNbrSearch
            };
            this.searchData = this.searchData.filter(
                item => item.label != obj.label
            );
            this.searchData.push(obj);
        },
        //筛选后关闭显示
        searchDataClick(val) {
            this.searchData = this.searchData.filter(
                item => item.label != val.label && item.value != val.value
            );
            this.offerNbrSearch = "";
        },
        //基本信息左侧列表
        moduleClick(components, index) {
            this.currentInfo = components;
            this.isShow = 900;
            switch (index) {
                case 0:
                    this.$refs.component.rightMenuInput("basicFoldObj");
                    break;
                case 1:
                    this.$refs.component.rightMenuInput("pricesFoldObj");
                    break;
                case 2:
                    this.$refs.component.rightMenuInput("acceptFoldObj");
                    break;
                case 3:
                    this.$refs.component.rightMenuInput("estimateFoldObj");
                    break;
            }
        },
        //
        /*systemTestClick(){
                this.$refs.component.rightMenuInput('validateFoldObj')
				//this.currentView = 'systemTest';
			},*/
        //
        /*examinClick(){
                this.$refs.component.rightMenuInput('validateFoldObj')
				//this.currentView = 'examin';
			},*/
        //基本信息左侧列表上市审批
        /*marketClick(){
                this.$refs.component.rightMenuInput('listedFoldObj')
				//this.currentView = 'market';
			},*/
        //基本信息左侧列表上市发布
        /*issueClick(){
                this.$refs.component.rightMenuInput('listedFoldObj')
				//this.currentView = 'issue';
			},*/
        Setsales() {
            if (this.isShow) {
                this.isShow = false;
            } else {
                this.isShow = true;
            }
        },
        //测试验证隐藏列表
        verify() {
            if (this.isShow2) {
                this.isShow2 = false;
            } else {
                this.isShow2 = true;
            }
        },
        //上市审批隐藏列表
        listed() {
            if (this.isShow3) {
                this.isShow3 = false;
            } else {
                this.isShow3 = true;
            }
        },
        // tab 标签切换
        tabChange(val) {
            if (val == "businessrules") {
                this.tabDefault = val;
            } else if (val == "label") {
                this.tabDefault = val;
            }
        },
        //提示方法
        tipConfirm() {
            switch (this.tipConfirmType) {
                case "del":
                    this.$message.success({ message: "删除成功！" });
                    this.$refs.tip.hide();
                    break;
                case "rel":
                    this.$message.success({ message: "发布成功！" });
                    this.$refs.tip.hide();
                    break;
                default:
                    break;
            }
        },
        //图1展开收缩
        tabBtnUnfold(index) {
            if (index == 1) {
                if (this.tabBtnShow == false) {
                    this.tabBtnShow = true;
                    document.getElementsByClassName(
                        "top-tab-left"
                    )[0].style.height = "110px";
                    for (let i = 0; i < 5; i++) {
                        document.getElementsByClassName(
                            "distent" + i
                        )[0].style.top = "-90px";
                    }
                } else {
                    this.tabBtnShow = false;
                    document.getElementsByClassName(
                        "top-tab-left"
                    )[0].style.height = "35px";
                    for (let i = 0; i < 5; i++) {
                        document.getElementsByClassName(
                            "distent" + i
                        )[0].style.top = "-10px";
                    }
                }
            } else if (index == 2) {
                if (this.tabBtnShow2 == false) {
                    this.tabBtnShow2 = true;
                    document.getElementsByClassName(
                        "top-tab-left"
                    )[1].style.height = "110px";
                } else {
                    this.tabBtnShow2 = false;
                    document.getElementsByClassName(
                        "top-tab-left"
                    )[1].style.height = "35px";
                }
            } else if (index == 3) {
                if (this.tabBtnShow3 == false) {
                    this.tabBtnShow3 = true;
                    document.getElementsByClassName(
                        "top-tab-left"
                    )[2].style.height = "110px";
                } else {
                    this.tabBtnShow3 = false;
                    document.getElementsByClassName(
                        "top-tab-left"
                    )[2].style.height = "35px";
                }
            }
        },

        titleShow(index) {
            //console.log(index)
            switch (index) {
                case 0:
                    document.getElementsByClassName(
                        "distent0"
                    )[0].style.display = "inline-block";
                    break;
                case 1:
                    document.getElementsByClassName(
                        "distent1"
                    )[0].style.display = "inline-block";
                    break;
                case 2:
                    document.getElementsByClassName(
                        "distent2"
                    )[0].style.display = "inline-block";
                    break;
                case 3:
                    document.getElementsByClassName(
                        "distent3"
                    )[0].style.display = "inline-block";
                    break;
                case 4:
                    document.getElementsByClassName(
                        "distent4"
                    )[0].style.display = "inline-block";
                    break;
                case 5:
                    document.getElementsByClassName(
                        "distent5"
                    )[0].style.display = "inline-block";
                    break;
                case 6:
                    document.getElementsByClassName(
                        "distent6"
                    )[0].style.display = "inline-block";
                    break;
                case 7:
                    document.getElementsByClassName(
                        "distent7"
                    )[0].style.display = "inline-block";
                    break;
                case 8:
                    document.getElementsByClassName(
                        "distent8"
                    )[0].style.display = "inline-block";
                    break;
                case 9:
                    document.getElementsByClassName(
                        "distent9"
                    )[0].style.display = "inline-block";
                    break;
                case 10:
                    document.getElementsByClassName(
                        "distent10"
                    )[0].style.display = "inline-block";
                    break;
                case 11:
                    document.getElementsByClassName(
                        "distent11"
                    )[0].style.display = "inline-block";
                    break;
            }
        },
        titleHide(index) {
            //console.log(index)
            switch (index) {
                case 0:
                    document.getElementsByClassName(
                        "distent0"
                    )[0].style.display = "none";
                    break;
                case 1:
                    document.getElementsByClassName(
                        "distent1"
                    )[0].style.display = "none";
                    break;
                case 2:
                    document.getElementsByClassName(
                        "distent2"
                    )[0].style.display = "none";
                    break;
                case 3:
                    document.getElementsByClassName(
                        "distent3"
                    )[0].style.display = "none";
                    break;
                case 4:
                    document.getElementsByClassName(
                        "distent4"
                    )[0].style.display = "none";
                    break;
                case 5:
                    document.getElementsByClassName(
                        "distent5"
                    )[0].style.display = "none";
                    break;
                case 6:
                    document.getElementsByClassName(
                        "distent6"
                    )[0].style.display = "none";
                    break;
                case 7:
                    document.getElementsByClassName(
                        "distent7"
                    )[0].style.display = "none";
                    break;
                case 8:
                    document.getElementsByClassName(
                        "distent8"
                    )[0].style.display = "none";
                    break;
                case 9:
                    document.getElementsByClassName(
                        "distent9"
                    )[0].style.display = "none";
                    break;
                case 10:
                    document.getElementsByClassName(
                        "distent10"
                    )[0].style.display = "none";
                    break;
                case 11:
                    document.getElementsByClassName(
                        "distent11"
                    )[0].style.display = "none";
                    break;
            }
        },
        //表头字段
        dragchange(val) {
            this.tableTitleData = val;
        },
        //获取下一级
        getNex(val) {
            if (val.isOpen && val.data.children == null) {
                this.getTableData(val); //根据id查询下级组织
            }

            this.$nextTick(() => {
                this.$refs.tableDataTreeRef.initScroll();
            });
        }
    }
};
</script>

<style scoped lang="scss">
/*字符超出隐藏*/
.app__cut-txt {
    overflow: hidden;
    white-space: nowrap;
    word-wrap: normal;
    text-overflow: ellipsis;
}

.gs-radio {
    display: inline-block;
    width: 70px;
    height: 30px;
    margin-right: 20px;
    border: 1px solid $mainColor;
    border-radius: 2px;
    line-height: 30px;
    color: $mainColor;
    font-size: 12px;
    text-align: center;
    cursor: pointer;

    &:hover,
    &.active {
        background-color: $mainColor;
        color: #fff;
    }
}
/*树容器样式*/
.content-tree {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
}
.list {
    width: 100%;
    height: 100%;

    .tree-list {
        width: 100%;
    }

    .right-content {
        width: 100%;
        height: 100%;
        padding: 100px 0 50px 0;
    }

    .header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        .h-all {
            padding: 0 20px;

            .h-a-add {
                position: absolute;
                top: 10px;
                right: 10px;
                height: 30px;
            }

            .h-a-title {
                .a-t-name {
                    display: inline-block;
                    height: 100%;
                    line-height: 50px;
                    font-weight: bold;
                    padding-left: 20px;
                    font-size: 16px;
                    color: $mainColor;
                    background-image: url(./images/all.png);
                    background-repeat: no-repeat;
                    background-position: 0;
                }

                .a-t-search {
                    display: inline-block;
                    height: 100%;
                    line-height: 50px;
                    padding-left: 30px;
                }
            }
        }
    }

    .l-search {
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        height: 50px;

        .t-s-name {
            display: inline-block;
            padding-left: 20px;
            vertical-align: middle;
        }

        .t-s-item {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            margin-right: 35px;
            border: 1px solid #f1f5fa;
            vertical-align: middle;

            .s-i-name {
                color: $mainColor;
            }

            .s-i-close {
                display: block;
                position: absolute;
                width: 26px;
                height: 30px;
                top: -1px;
                right: -26px;
                background-image: url(./images/close.png);
                background-repeat: no-repeat;
                background-position: 0px;
                cursor: pointer;
            }
        }
    }

    .main {
        width: 100%;
        height: 100%;

        .m-title {
            .col.m-t-name {
                border-right: 1px solid $mainColor;
            }
        }

        .m-item {
            .m-i-name {
                color: $mainColor;
                border-right: 1px solid $mainColor;
                cursor: pointer;
            }
        }

        .col {
            &:hover {
                .col-search {
                    display: block;
                }
            }
        }
    }

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        box-shadow: 0 -2px 0 #f1f5fa;

        .pagination {
            height: 50px;
        }
    }

    .l-d-header {
        display: inline-block;
        width: 100%;
        border-bottom: 10px solid #f8f8f8;

        .d-h-title {
            width: 100%;
            height: 50px;
            line-height: 50px;

            .h-t-left {
                margin-left: 50px;
                padding-left: 30px;
                float: left;
                font-size: 16px;
                font-weight: bold;
                background: url(./images/sideslip_icon.png) no-repeat;
                background-position: 0;
            }
        }
    }

    .l-d-content {
        height: 100%;
        .d-c-scroll {
            width: 192px;
            display: inline-block;
        }

        .left2 {
            height: 400px;
            float: left;
            span:hover {
                color: #fff;
                background-color: $mainColor;
            }
            .span {
                display: block;
                height: 50px;
                line-height: 32px;
                border-bottom: 1px solid #f9f9f9;
                padding: 10px 40px;
                font-size: 14px;
                cursor: pointer;
                background: url(images/icon0011.png) no-repeat 10px center;
            }
            .span2 {
                display: block;
                padding: 10px 40px;
                font-size: 14px;
                cursor: pointer;
                height: 50px;
                line-height: 32px;
                border-bottom: 1px solid #f9f9f9;
                background: url(images/icon0022.png) no-repeat 10px center;
            }
            .span3 {
                display: block;
                padding: 10px 40px;
                font-size: 14px;
                cursor: pointer;
                height: 50px;
                line-height: 32px;
                border-bottom: 1px solid #f9f9f9;
                background: url(images/icon0033.png) no-repeat 10px center;
            }
            .span4 {
                display: block;
                padding: 10px 40px;
                font-size: 14px;
                cursor: pointer;
                height: 50px;
                line-height: 32px;
                border-bottom: 1px solid #f9f9f9;
                background: url(images/icon0044.png) no-repeat 10px center;
            }
            .span5 {
                display: block;
                padding: 10px 40px;
                font-size: 14px;
                cursor: pointer;
                line-height: 32px;
                height: 50px;
                border-bottom: 1px solid #f9f9f9;
                background: url(images/icon0055.png) no-repeat 10px center;
            }
            .span6 {
                display: block;
                padding: 10px 40px;
                font-size: 14px;
                cursor: pointer;
                line-height: 32px;
                height: 50px;
                border-bottom: 1px solid #f9f9f9;
                background: url(images/icon0066.png) no-repeat 10px center;
            }
            .span7 {
                display: block;
                padding: 10px 40px;
                font-size: 14px;
                cursor: pointer;
                line-height: 32px;
                height: 50px;
                border-bottom: 1px solid #f9f9f9;
                background: url(images/icon0077.png) no-repeat 10px center;
            }
            .span8 {
                display: block;
                padding: 10px 40px;
                font-size: 14px;
                cursor: pointer;
                line-height: 32px;
                height: 50px;
                border-bottom: 1px solid #f9f9f9;
                background: url(images/icon0088.png) no-repeat 10px center;
            }

            .active1 {
                color: $mainColor;
                background: url(images/icon001.png) no-repeat 10px center;
                background-color: white;
            }

            .active5 {
                color: white;
                background: url(images/icon005.png) no-repeat 10px center;
                background-color: $mainColor;
            }

            ul {
                width: 100%;
                background: #fcfcfc;

                li {
                    padding: 6px 0;
                    text-align: center;
                    line-height: 32px;
                    height: 50px;
                    font-size: 14px;
                    cursor: pointer;
                    border-bottom: 1px solid #f8f8f8;
                    &:hover {
                        color: #fff;
                        background-color: $mainColor;
                    }
                }
                .active {
                    background-color: $mainColor;
                    color: #fff;
                }
            }
        }

        .d-c-tab {
            height: 50px;
            line-height: 50px;
            border-bottom: 2px solid #fafafa;

            .c-t-item {
                display: inline-block;
                position: relative;
                height: 50px;
                width: 80px;
                text-align: center;
                margin-left: 20px;
                cursor: pointer;
            }
        }
        .d-c-list {
            width: 20%;
            float: left;
            background-color: #f9f9f9;
        }
        .d-c-info {
            width: 79%;
            height: 100%;
            float: right;
            font-size: 14px;
            padding: 10px 0;

            .d-c-title {
                border-left: 4px solid $mainColor;
                padding-left: 4px;
            }
        }

        .d-c-val {
            height: 100%;
            padding: 20px 20px 0;
            .d-c-val-title {
                font-size: 14px;
                padding-left: 5px;
                display: block;
                font-size: 16px;
            }

            .d-c-top {
                width: 100%;
                border: 1px solid #eee;
                margin: 15px auto;
                .top-tab {
                    width: 100%;
                    height: 100%;
                    padding: 10px 0;
                    background-color: #fdfdfd;
                    border-bottom: 1px solid #eee;

                    .top-tab-left {
                        width: 95%;
                        height: 35px;
                        display: inline-block;
                        overflow: hidden;

                        .tab-btn {
                            margin: 5px 20px;
                            width: 120px;
                            height: 28px;
                            display: inline-block;
                            font-size: 14px;
                            line-height: 28px;
                            text-align: center;
                            cursor: pointer;
                        }
                        .active {
                            background-color: $mainColor;
                            color: #fff;
                        }
                    }

                    .top-tab-right {
                        position: absolute;
                        right: 40px;
                        top: 20px;
                        width: 3%;
                        color: $mainColor;
                        cursor: pointer;
                    }
                }
                .tab-title {
                    width: 200px;
                    height: 80px;
                    display: none;
                    background-image: url("./images/bubble.png");
                    background-repeat: no-repeat;
                    background-size: 100%;
                    z-index: 999;
                    position: absolute;
                    span {
                        width: 200px;
                        height: 80px;
                        line-height: 90px;
                        text-align: center;
                        display: inline-block;
                    }
                }

                @for $i from 0 through 4 {
                    .distent#{$i} {
                        top: -10px;
                        left: 160px * $i;
                    }
                }
                @for $i from 5 through 9 {
                    .distent#{$i} {
                        top: -50px;
                        left: 160px * ($i - 5);
                    }
                }
                .top-info {
                    left: 50%;
                    margin-top: 20px;
                    .tolink {
                        font-size: 16px;
                        color: #5c9cf3;
                        top: 5px;
                        left: 10px;
                    }
                    .clear {
                        clear: both;
                    }
                }
                .top-info2 {
                    left: 58%;
                    height: 40px;
                    line-height: 40px;
                    display: inline-block;
                    .top-info2-income {
                        color: #b1b1b1;
                        span {
                            margin: 20px;
                        }
                    }
                }
                .top-info3 {
                    display: inline-block;
                    margin: 20px 0 40px 55%;
                    /deep/ .radio {
                        width: 80px;
                    }
                }
                .top-echs {
                    #main-top {
                        width: 900px;
                        // width: 100%;
                        height: 320px;
                    }
                    .top-echs-pie {
                        width: 42%;
                        height: 500px;
                        display: inline-block;
                        #main-pie {
                            width: 400px;
                            height: 500px;
                        }
                    }
                    .right-small {
                        position: absolute;
                        z-index: 10;
                        left: 58%;
                        top: 28px;
                        ul {
                            li {
                                float: left;
                                cursor: pointer;
                                padding: 2px 5px;
                                margin-right: 8px;
                                border-radius: 10px;
                                color: #5F9BF3;
                                    &.active {
                                        background-color:#5F9BF3;
                                        color: #fff; 
                                    }
                            }
                        }
                    }
                    .top-echs-line {
                        display: inline-block;
                        width: 56%;
                        #main-bottom {
                            width: 514px;
                            height: 500px;
                        }
                    }

                    .middle-map {
                        width: 100%;
                        height: 500px;
                        .middle-map-left {
                            display: inline-block;
                            width: 48%;
                            height: 100%;
                            background: url("./images/map1.jpg") no-repeat 98%;
                        }
                        .middle-map-right {
                            display: inline-block;
                            width: 50%;
                            height: 100%;
                            ul {
                                width: 100%;
                                margin: 50px 0 0 35px;
                                & li:nth-child(1) .number_left {
                                    background-color: #f28076;
                                }
                                & li:nth-child(2) .number_left {
                                    background-color: #87d178;
                                }
                                & li:nth-child(3) .number_left {
                                    background-color: #ffc917;
                                }
                                li {
                                    width: 100%;
                                    height: 40px;
                                    padding: 5px 0;
                                    color: #717a86;
                                    .number_left {
                                        display: block;
                                        color: #f1f5fa;
                                        float: left;
                                        width: 20px;
                                        height: 20px;
                                        border-radius: 10px;
                                        text-align: center;
                                        background-color: #697898;
                                    }
                                    .number_font {
                                        display: block;
                                        float: left;
                                        margin: 0 10px;
                                    }
                                    .middle {
                                        transition: width 1s ease-out;
                                        display: block;
                                        border-radius: 7px;
                                        float: left;
                                        margin: 2px 15px 0 0;
                                        height: 15px;
                                        background-color: #dadbe0;
                                    }
                                    .number_right {
                                        display: block;
                                        float: left;
                                        width: 10%;
                                        cursor: pointer;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .c-v-title {
                background-color: #f5fafd;
                text-align: center;
            }
        }
    }
}
</style>
