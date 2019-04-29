<template>
    <div class="flow">
        <div class="d-s">
            <div class="h-a-add">
                <div class="app__btn app__btn-add" @click="addFlow()">添加</div>
            </div>

            <div :class="['h-operation',searchDataArr.length > 0 ? 'active' : '']">
                <SearchBox v-model="searchDataArr"></SearchBox>
            </div>

            <div class="search">
                <Select placeholder="请选择平台名称" :isNullSel="false" :data="searchFlowList" v-model="searchFlowData"></Select>
                <span class="app__btn app__btn-confirm search-btn" @click="searchFlow">搜索</span>
            </div>
        </div>
        <div :class="['h-operation',checkboxData.length > 0 ? 'active' : '']">
            <div class="h-o-item">
                已选中<span class="h-o-count">{{checkboxData.length}}</span>项
            </div>
            <div class="h-o-item delete font-blue" @click="delFlow('top')">
                删除
            </div>
            <div class="h-o-item modify font-blue" @click="setUpFicat">
                设置分类
            </div>
        </div>
        <div class="main">
            <Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
                <DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
                    <Col :span="1">选择</Col>
                    <DragItem :class="['m-item']" :span="item.span" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+index">
                        <span>{{item.name}}</span>
                        <ColSel :class="item.param != 'procdefVersion' ||  item.param != 'tenantId' || item.param != 'createTime' ? 'col-search' : 'col-none'" :showOrder="false" @confirm="Confirmfilter(item)">
                            <Input v-if="item.param == 'procdefName' || item.param == 'procdefKey'" :placeholder="'请输入'+ item.name" v-model="item.part"></Input>
                            <Radio v-else class="col-radio" :label="items" :name="item.param" v-for="(items,index) in item.parent" :key="index" v-model="item.part">
                                {{items.label}}
                            </Radio>
                        </ColSel>
                    </DragItem>
                    <Col :span="3">操作</Col>
                </DragGroup>
                <Row class="app__table-item" v-for="(item,index) in tabList" :key="index">
                    <Col :span="1" class="v-t-checkbox">
                    <Checkbox name="checkbox1" :label="item" v-model="checkboxData"></Checkbox>
                    </Col>
                    <Col @click.stop.native="nameClick(titleItem.param,item)" :span="titleItem.span" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
                    <span v-if="titleItem.param != 'createTime'" :class="[titleItem.param == 'procdefName' ? 'font-blue' : '']">{{adjustTabelItemText(item,titleItem.param)}}</span>
                    <span v-else>{{adjustTabelItemText(item,titleItem.param) | date}}</span>
                    </Col>
                    <Col :span="3" class="font-blue">
                    <span class="span" @click="design(item)">设计</span>
                    <span class="span" v-if="item.suspensionState == '1'" @click="topFlow('bottom',item)">挂起</span>
                    <span class="span" v-else @click="topActive('bottom',item)">激活</span>
                    <span class="span" @click="delFlow('bottom',item)">删除</span>
                    </Col>
                </Row>
                <Row v-if="!tabList.length" class="app__data-none">
					<Col :span="24"><span>当前无数据!</span></Col>
				</Row>
            </Scroll>
        </div>
        <div class="footer">
            <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages="5" @change="pageChange">
            </Pagination>
        </div>

        <!-- 设置分类 -->
        <Dialog dialogTitle="设置分类" :dialogSize="dialogSize" ref="setFrom" @confirm="setFromWhere" @close="setFromWhereClose">
            <div class="setFrom">
                <Form labelWidth="100px" data-vv-scope="setFrom">
                    <FormItem labelText="平台名称：" :requiredIcon="true">
                        <Select class="style-cursor" :data="searchFlowList" disabled name="platformName" v-model="platformName"></Select>
                    </FormItem>
                    <FormItem labelText="中心名称：" :requiredIcon="true">
                        <Select class="style-cursor" :data="centerList" disabled name="centerName" v-model="centerName"></Select>
                    </FormItem>
                    <FormItem labelText="业务类型：" :requiredIcon="true" :errorMessage="errors.first('setFrom.businessTypeName')">
                        <Select :data="businessTypeList" data-vv-as="业务类型" v-validate="'required'" name="businessTypeName" v-model="businessTypeName"></Select>
                    </FormItem>
                </Form>
            </div>
        </Dialog>
        <!-- 操作确认框 -->
        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageInfo: {
                page: 1, // 当前页
                pageSize: 20 // 每页条数
            },
            dialogSize: {
                size: 70,
                min: 400,
                max: 500
            },
            searchDataArr:[],
            tableTitleData: [
                {
                    name: "平台名称",
                    param: "platformName",
                    span: 2,
                    parent: []
                },
                {
                    name: "中心名称",
                    param: "centerName",
                    span: 2,
                    parent: []
                },
                {
                    name: "业务类型",
                    param: "businessTypeName",
                    span: 2,
                    parent: []
                },
                {
                    name: "流程名称",
                    param: "procdefName",
                    span: 3
                },
                {
                    name: "流程主键",
                    param: "procdefKey",
                    span: 3
                },
                {
                    name: "流程状态",
                    param: "suspensionState",
                    span: 2,
                    parent: [
                        {
                            label: "全部",
                            value: ""
                        },
                        {
                            label: "已发起",
                            value: "1"
                        },
                        {
                            label: "已挂起",
                            value: "2"
                        }
                    ]
                },
                {
                    name: "当前版本号",
                    param: "procdefVersion",
                    span: 2
                },
                {
                    name: "租户ID",
                    param: "tenantId",
                    span: 2
                },
                {
                    name: "创建时间",
                    param: "createTime",
                    span: 2
                }
            ],
            centerName: "",
            platformName: "",
            businessTypeName: "",
            tipInfo: {
                iconType: 1,
                msg: "",
                showBtn: {
                    clear: true,
                    save: true
                }
            },
            businessTypeList: [],
            tabList: [],
            checkboxData: [],
            searchData: {
                businessTypeName: "", //businessTypeCode
                centerName: "", //centerId
                platformName: "", //platformId
                procdefKey: "",
                procdefName: "",
                startTime: "",
                suspensionState: ""
            },
            searchFlowList: [],
            centerList: [],
            searchFlowData: "",
            hangeUpId: "", //挂起ID
            delList: [],
            delObj: [],
            bpmsAuth:'',
            headers:{},
        };
    },
    watch: {
        searchDataArr: function(val,oldval) {
            this.searchData = {};
            val.filter( (item) => {
                this.searchData[item.param] = item.values;
            });
            this.pageChange(1);
        }
    },
    mounted() {
        this.getBpmsAuthCode();
    },
    methods: {
        pageChange(page) {
            this.pageInfo.page = page;
            this.getFlowList(this.searchData);
        },
        //获取流程定义分页数据
        getFlowList(data) {
            this.$axios
                .post(
                    this.$api.GetPageMaxProcessDefinitionList,
                    {
                        body: {
                            bpmsProcessDefinition: {
                                businessTypeCode: data.businessTypeName,
                                centerId: data.centerName,
                                endTime: "",
                                platformId: data.platformName,
                                procdefKey: data.procdefKey,
                                procdefName: data.procdefName,
                                startTime: data.startTime,
                                suspensionState: data.suspensionState
                            },
                            pageInfo: this.pageInfo
                        }
                    },
                    this.headers
                )
                .then(res => {
                    if (res.data.code == "000000") {
                        this.tabList = res.data.body.pageRes.list;
                        this.pageInfo = {
                            pageIndex: res.data.body.pageRes.pageNum,
                            pageSize: res.data.body.pageRes.pageSize,
                            rowCount: res.data.body.pageRes.total,
                        };
                    } else {
                        this.$message.error({ message: "查询失败" });
                    }
                })
                .catch(err => {
                    this.$message.error({ message: err.response.data.msg });
                });
        },
        //获取平台名称下拉
        getPlatformList() {
            this.$axios
                .post(
                    this.$api.GetPlatformList,
                    {
                        body: {}
                    },
                    this.headers
                )
                .then(res => {
                    if (res.data.code == "000000") {
                        let array = res.data.body.bpmsPlatformList;
                        array.forEach(element => {
                            let obj = {
                                label: element.platformName,
                                value: element.platformId
                            };
                            if (!this.searchFlowList.includes(obj)) {
                                this.searchFlowList.push(obj);
                            }
                        });
                        this.tableTitleData.filter(
                            item => item.param == "platformName"
                        )[0].parent = [...this.searchFlowList];
                    } else {
                        this.$message.error({
                            message: "获取平台名称下拉失败"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error({ message: "获取平台名称下拉失败" });
                });
        },
        //获取中心名称下拉
        getCenterList() {
            this.centerList = [];
            this.$axios
                .post(
                    this.$api.GetCenterList,
                    {
                        body: {
                            bpmsCenterExpand: {
                                platformId: this.searchFlowData
                            }
                        }
                    },
                    this.headers
                )
                .then(res => {
                    if (res.data.code == "000000") {
                        let array = res.data.body.bpmsCenterExpandList;
                        array.forEach(element => {
                            let obj = {
                                label: element.centerName,
                                value: element.centerId
                            };
                            if (!this.centerList.includes(obj)) {
                                this.centerList.push(obj);
                            }
                        });
                        this.tableTitleData.filter(
                            item => item.param == "centerName"
                        )[0].parent = [...this.centerList];
                    } else {
                        this.$message.error({
                            message: "获取中心名称下拉失败"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error({ message: "获取中心名称下拉失败" });
                });
        },
        getBusinessTypeList(centerId) {
            this.businessTypeList = [];
            this.$axios
                .post(
                    this.$api.GetBusinessTypeList,
                    {
                        body: {
                            bpmsBusinessTypeExpand: {
                                centerId: centerId,
                                platformId: this.searchFlowData
                            }
                        }
                    },
                    this.headers
                )
                .then(res => {
                    if (res.data.code == "000000") {
                        let array = res.data.body.bpmsBusinessTypeExpandList;
                        array.forEach(element => {
                            let obj = {
                                label: element.businessTypeName,
                                value: element.businessTypeCode
                            };
                            if (!this.businessTypeList.includes(obj)) {
                                this.businessTypeList.push(obj);
                            }
                        });
                        this.tableTitleData.filter(
                            item => item.param == "businessTypeName"
                        )[0].parent = [...this.businessTypeList];
                    } else {
                        this.$message.error({
                            message: "获取业务类型下拉失败"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error({ message: "获取业务类型下拉失败" });
                });
        },
        nameClick(type,item) {
            if(type == 'procdefName') {
                        let obj = {
                            detail: item,
                            procdefId: item.procdefId,
                            headers:this.headers
                        };
                        this.$emit("componentView", "detailFlow", obj);
            }
        },
        adjustTabelItemText(item, param) {
            let val = item[param];
            switch (param) {
                case "platformName":
                    return item.platformName;
                case "centerName":
                    return item.centerName;
                case "businessTypeName":
                    return item.businessTypeName;
                case "procdefName":
                    return item.procdefName;
                case "procdefKey":
                    return item.procdefKey;
                case "suspensionState":
                    return item.suspensionState == 1 ? "已发布" : "已挂起";
                case "procdefVersion":
                    return item.procdefVersion;
                case "tenantId":
                    return item.tenantId;
                case "createTime":
                    return item.createTime;
                default:
                    return val;
            }
        },
        design(item) {
            //设计
            let procdefId = item.procdefId;
            this.getBpmsAuthCode(procdefId)
        },
        addFlow() {
            this.getBpmsAuthCode("new")
            /* 1、流程定义可通过以下路径：
            1、	新增流程定义或者模型得时候，id是不存在，{流程定义得id或者模型得id}等于‘new
            /editor/cpcdefine/{流程定义得id或者模型得id}/租户名称/bpms-auth-code
            2、模型通过一下路径：
            /editor/cpcmodel/{流程定义得id或者模型得id}/租户名称/bpms-auth-code */
        },
        
        getBpmsAuthCode(type) {
            this.$axios.get(this.$api.GetBpmsAuthCode,{
                params:{
                    staffId:this.$user.getInfo().id
                }
            }).then(res => {
                if(res.data.success) {
                    this.bpmsAuth = res.data.bpmsAuth;
                    let bpmsAuthCode = this.bpmsAuth.bpmsAuthCode,
                        bpmsTenantId = this.bpmsAuth.bpmsTenantId;
                        this.headers = {
                            headers:{
                                "bpms-auth-code":bpmsAuthCode,
                                bpmsTenantId:bpmsTenantId
                            }
                        }
                        if(type) {
                            window.open(this.$api.replace(this.$api.FlowImgPath.design,['{type}','{bpmsTenantId}','{bpmsAuthCode}'],[type,bpmsTenantId,bpmsAuthCode]))
                        } else {
                            this.getFlowList(this.searchData);
                            this.getPlatformList();
                            this.getBusinessTypeList();
                            this.getCenterList();
                        }
                }
            }).catch( err => {
                this.$message.error({message:err.response.data.msg})
            })
        },
        topFlow(type, item) {
            //挂起
            this.tipType = "topFLow";
            this.tipInfo.iconType = 3;
            this.tipInfo.msg = `是否确定挂起？`;
            this.tipInfo.showBtn.clear = true;
            this.tipInfo.showBtn.save = true;
            this.$refs.tip.show();
            this.hangeUpId = item.procdefId;
        },
        topActive(type, item) {
            //激活
            this.tipType = "topActive";
            this.tipInfo.iconType = 3;
            this.tipInfo.msg = `是否确定激活？`;
            this.tipInfo.showBtn.clear = true;
            this.tipInfo.showBtn.save = true;
            this.$refs.tip.show();
            this.hangeUpId = item.procdefId;
        },
        hangUp(type) {
            //挂起  /  激活
            let showType = "";
            if (type == "suspend") {
                showType = "挂起";
            } else if (type == "activate") {
                showType = "激活";
            }
            this.$axios
                .post(
                    this.$api.ActionProcessDefinitionDetail,
                    {
                        body: {
                            action: type, //suspend挂起   activate激活
                            date: null,
                            includeProcessInstances: false,
                            processDefinitionId: this.hangeUpId
                        }
                    },
                    this.headers
                )
                .then(res => {
                    if (res.data.code == "000000") {
                        this.$message.success({
                            message: showType + "成功"
                        });
                        this.getFlowList(this.searchData);
                        this.$refs.tip.hide();
                    } else {
                        this.$message.error({
                            message: showType + "失败"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error({
                        message: showType + "失败"
                    });
                });
        },
        delFlow(type, item) {
            //删除
            if (type == "bottom") {
                this.tipType = "delFLow";
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `是否确定删除？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
                this.delObj = [
                    {
                        procdefKey: item.procdefKey,
                        tenantId: item.tenantId
                    }
                ];
            } else if (type == "top") {
                if (!this.checkboxData.length) {
                    this.$message.warning({ message: "请先选择要删除的数据" });
                    return;
                } else {
                    this.tipType = "delFLows";
                    this.tipInfo.iconType = 3;
                    this.tipInfo.msg = `是否确定删除？`;
                    this.tipInfo.showBtn.clear = true;
                    this.tipInfo.showBtn.save = true;
                    this.$refs.tip.show();
                    this.checkboxData.forEach((item, index) => {
                        let obj = {
                            procdefKey: item.procdefKey,
                            tenantId: item.tenantId
                        };
                        this.delList.push(obj);
                    });
                }
            }
        },
        delimiters(store) {
            //删除流程定义
            this.$axios
                .post(
                    this.$api.DeleteBatchProcessDefinitions,
                    {
                        body: {
                            bpmsProcessDefinitionList: store,
                            cascade: false
                        }
                    },
                    this.headers
                )
                .then(res => {
                    if (res.data.code == "000000") {
                        this.$message.success({
                            message: "删除成功"
                        });
                        this.getFlowList(this.searchData);
                        this.$refs.tip.hide();
                    } else {
                        this.$message.error({
                            message: "删除失败"
                        });
                    }
                })
                .catch(err => {
                    this.$message.error({
                        message: "删除失败"
                    });
                });
        },
        Confirmfilter(val) {
            if(val.part == '') return;
            //过滤
            let obj = {
                label: val.name,
                param: val.param,
                value: val.part.label || val.part,
                values: val.part.value || val.part
            };
            this.searchData[val.param] = obj.values;
            this.searchDataArr = this.searchDataArr.filter( item => item.label != obj.label);
            this.searchDataArr.push(obj);
            this.tableTitleData.find( item => item.param == val.param).part = '';
        },
        dragchange() {},
        searchFlow() {
            this.searchData = {
                businessTypeCode: "",
                centerId: "",
                platformId: this.searchFlowData ? this.searchFlowData : "",
                procdefKey: "",
                procdefName: "",
                startTime: "",
                suspensionState: ""
            };
            this.getFlowList(this.searchData);
        },
        setUpFicat() {
            //设置分类
            this.platformName = this.checkboxData[0].platformId;
            this.centerName = this.checkboxData[0].centerId;
            this.$refs.setFrom.show();
        },
        setFromWhere() {
            //设置分类确定dialog
            let bpmsProcessDefinitionList = [];
            this.checkboxData.forEach((ele) => {
                let obj = {
                    businessTypeCode:this.businessTypeName,
                    centerId:ele.centerId,
                    procdefId:ele.procdefId,
                    tenantId:ele.tenantId
                }
                bpmsProcessDefinitionList.push(obj);
            })
            this.$validator.validateAll("setFrom").then(result => {
                if (result) {
                    this.$axios
                        .post(
                            this.$api.UpdateBatchBusinessType,
                            {
                                body: {
                                    bpmsProcessDefinitionList: bpmsProcessDefinitionList
                                }
                            },
                            this.headers
                        )
                        .then(res => {
                            if (res.data.code == "000000") {
                                this.$message.success({
                                    message: "设置成功"
                                });
                                this.getFlowList(this.searchData);
                                this.$refs.setFrom.hide();
                                this.checkboxData = [];
                            } else {
                                this.$message.error({
                                    message: "设置失败"
                                });
                            }
                        })
                        .catch(err => {
                            this.$message.error({
                                message: "设置失败"
                            });
                        });
                }
            });
        },
        setFromWhereClose() {
            //设置分类关闭dialog
        },
        tipConfirm() {
            if (this.tipType == "topFLow") {
                this.hangUp("suspend");
            } else if (this.tipType == "topActive") {
                this.hangUp("activate");
            } else if (this.tipType == "delFLows") {
                this.delimiters(this.delList);
            } else if (this.tipType == "delFLow") {
                this.delimiters(this.delObj);
            }
        }
    }
};
</script>

<style scoped lang="scss">
.flow {
    width: 100%;
    height: 100%;
    padding: 60px 0 50px;
    .main {
        height: 100%;
        padding: 0 20px;
    }
    .d-s {
        position: absolute;
        width: 100%;
        height: 60px;
        top: 0px;
        padding-left: 20px;
        padding-right: 20px;
        .search {
            position: absolute;
            width: 28%;
            top: 15px;
            z-index: 20;
            .s-span {
                display: block;
                width: 50px;
                height: 30px;
                background: $mainColor url(images/search-btn.png) no-repeat
                    center center;
                position: absolute;
                top: 0;
                right: 0;
            }
            .search-btn {
                position: absolute;
                right: -65px;
                top: 0;
            }
        }
        .h-a-add {
            position: absolute;
            top: 15px;
            right: 20px;
            height: 30px;
        }
        .h-operation{
            width: 50%;
            margin-left: 35%;
            top: 15px;
            padding: 0 10px;
            transition: .1s all ease;
            background-color: #fff;
            .search-box {
                top:10px;
            }
        }
    }
    .h-operation {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 60px;
        z-index: 100;
        line-height: 60px;
        transition: 0.3s all ease;
        background-color: #fff;
        &.active {
            top: 0;
            left: 0;
        }
        .h-o-item {
            display: inline-block;
            padding: 0 20px;
            cursor: pointer;
            &.delete {
                background: url(./images/delete_gery.png) no-repeat;
                background-position: 0;
            }
            &.modify {
                background: url(./images/edit_grey.png) no-repeat;
                background-position: 0;
            }
        }
    }
    .header {
        width: 100%;
    }
    .col {
        &:hover {
            .col-search {
                display: block;
                .col-radio {
                    display: block;
                    margin-bottom: 15px;
                }
            }
            .col-none {
                .col-radio {
                    display: none;
                }
            }
        }
    }

    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        box-shadow: 0 -2px 0 #f1f5fa;
        .pagination {
            height: 50px;
        }
    }
    .setFrom {
        padding: 10px 30px 10px 10px;
        .style-cursor /deep/ .select-input {
            // .style-cursor >>> .select-input {
            cursor: not-allowed !important;
        }
    }
    .cursor {
        span {
            cursor: pointer;
        }
    }
}
.font-blue {
    cursor: pointer;
    color: $mainColor;
}
</style>