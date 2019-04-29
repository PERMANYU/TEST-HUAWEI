<template>
    <div class="instance">
        <div class="d-s">
            <div class="h-a-add">
                <div class="app__btn app__btn-add" @click="addFlow()">添加</div>
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
            <div class="h-o-item delete font-blue" @click="delInstance('top')">
                删除
            </div>
        </div>
        <div class="app__table">
            <Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
                <DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
                    <Col :span="1">选择</Col>
                    <DragItem :class="['m-item']" :span="item.span" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+index">
                        <span>{{item.name}}</span>
                        <ColSel :class="item.param != 'procdefVersion' ||  item.param != 'tenantId' || item.param != 'processInstanceStartTime' ? 'col-search' : 'col-none'" :showOrder="false" @confirm="Confirmfilter(item)">
                            <Input v-if="item.param == 'processInstanceId' || item.param == 'procdefName'" :placeholder="'请输入'+ item.name" v-model="item.part"></Input>
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
                    <span v-if="titleItem.param != 'processInstanceStartTime'" :class="[titleItem.param == 'procdefName' || titleItem.param == 'processInstanceId' ? 'font-blue' : '']">{{adjustTabelItemText(item,titleItem.param)}}</span>
                    <span v-else>{{adjustTabelItemText(item,titleItem.param) | date}}</span>
                    </Col>
                    <Col :span="3" class="font-blue">
                    <span class="span" @click="showDetail(item)">详情</span>
                    <span class="span" v-if="item.suspensionState == '1'" @click="hangUp('bottom',item)">挂起</span>
                    <span class="span" v-else @click="annulMent(item)">终止</span>
                    <span class="span" @click="delInstance('bottom',item)">删除</span>
                    </Col>
                </Row>
                <Row :class="['m-item app__table-item']" v-show="!tabList.length" v-for="item in (20 - tabList.length)" :key="item.number"></Row>
            </Scroll>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checkboxData: [],
            searchFlowList: [],
            searchFlowData: "",
            tabList: [],
            checkboxData: [],
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
                    name: "实例ID",
                    param: "processInstanceId",
                    span: 5
                },
                {
                    name: "状态",
                    param: "suspensionState",
                    span: 3
                },
                {
                    name: "创建时间",
                    param: "processInstanceStartTime", //流程实例开始时间
                    span: 3
                }
            ],
            searchData: {
                businessTypeName: "", //businessTypeCode
                centerName: "", //centerId
                platformName: "", //platformId
                procdefKey: "",
                procdefName: "",
                startTime: "",
                suspensionState: ""
            },
            pageInfo: {
                page: 1, // 当前页
                pageSize: 20 // 每页条数
            },
            clickObj: ""
        };
    },
    mounted() {
        this.getInstanceList(this.searchData);
    },
    methods: {
        //page分页
        pageChange(page) {
            this.pageInfo.page = page;
            this.getInstanceList(this.searchData);
        },
        //获取list
        getInstanceList(data) {
            this.$axios
                .post(
                    this.$api.GetPageProcessInstanceList,
                    {
                        body: {
                            bpmsProcessInstanceExpand: {
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
                    {
                        headers: {
                            ReqUserId:
                                '{"accountId":101,"accountName":"tecpcmt","accountType":1,"masterId":101,"masterName":"tecpcmt"}'
                        }
                    }
                )
                .then(res => {
                    if (res.data.code == "000000") {
                        this.tabList = res.data.body.pageRes.list;
                    } else {
                        this.$message.error({ message: "查询失败" });
                    }
                })
                .catch(err => {
                    // this.$message.error({ message: err.response.data.message  });
                });
        },
        //删除
        delInstance(type) {
            console.log(type);
        },
        //详情
        showDetail() {},
        //搜索
        searchFlow() {},
        //添加
        addFlow() {},
        //终止
        annulMent() {},
        //挂起
        hangUp() {},
        //过滤
        Confirmfilter(val) {
            //过滤
            let obj = {
                label: val.name,
                param: val.param,
                value: val.part.value || val.part
            };
            console.log(obj);
            this.searchData[val.param] = obj.value;
            this.pageChange(1);
        },
        //过滤
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
                case "processInstanceId":
                    return item.processInstanceId;
                case "suspensionState":
                    return item.suspensionState == 1 ? "已发布" : "已挂起";
                case "processInstanceStartTime":
                    return item.processInstanceStartTime;
                default:
                    return val;
            }
        },
        nameClick(type, item) {
            console.log(item);
            this.clickObj = item;
            let _this = this;
            if (type == "procdefName") {
                this.$axios
                    .all([
                        this.GetProcInstOverview(),
                        this.QryProcessDefinitionImage(),
                        this.QryProcessDefinitionUserTaskListQ(),
                        this.GetPageProcessDefineList(item)
                    ])
                    .then(
                        this.$axios.spread(function(
                            acct,
                            perms,
                            task,
                            fineList
                        ) {
                            console.log(acct, perms, task, fineList);
                            let detailExampleArray = {
                                detail: item,
                                images: perms.data.body,
                                taskList: task.data.body.list,
                                pieArray:
                                    acct.data.body.bpmsProcInstOverviewList,
                                fineList: fineList.data.body.pageRes.list
                            };
                            _this.$emit(
                                "componentView",
                                "detail",
                                detailExampleArray
                            );
                        })
                    );
            } else if (type == "processInstanceId ") {
                this.$axios
                    .all([
                        this.GetProcessInstanceDetail(), //实例详情
                        this.QryProcessDefinitionImage(),
                        this.GetVariableList(), //流程信息-变量分页列表
                        this.GetApprovalHistoryList() //审核历史
                    ])
                    .then(
                        this.$axios.spread(function(
                            acct,
                            perms,
                            task,
                            fineList
                        ) {
                            console.log(acct, perms, task, fineList);
                            let detailExampleArray = {
                                detail:
                                    acct.data.body.bpmsProcessInstanceExpand,
                                images: perms.data.body,
                                ariableList:
                                    task.data.body.bpmsVarInstExpandPageRes
                                        .list,
                                historyList: fineList.data.body.pageRes.list
                            };
                            _this.$emit(
                                "componentView",
                                "detailIntance",
                                detailExampleArray
                            );
                        })
                    );
            }
        },

        GetProcessInstanceDetail() {
            //流程实例详情
            return this.$axios.post(this.$api.GetProcessInstanceDetail, {
                body: {
                    bpmsProcessInstanceExpand: {
                        processInstanceId: this.clickObj.processInstanceId
                    }
                }
            });
        },

        GetVariableList() {
            //流程信息-变量分页列表
            return this.$axios.post(
                this.$api.GetVariableList,
                {
                    body: {
                        bpmsProcessInstanceExpand: {
                            processInstanceId: this.clickObj.processInstanceId
                        },
                        pageInfo: this.pageInfo
                    }
                },
                {
                    headers: {
                        ReqUserId:
                            '{"accountId":101,"accountName":"tecpcmt","accountType":1,"masterId":101,"masterName":"tecpcmt"}',
                        bpmsTenantId: "tecpcmt"
                    }
                }
            );
        },

        GetApprovalHistoryList() {
            //审核历史
            return this.$axios.post(
                this.$api.GetApprovalHistoryList,
                {
                    body: {
                        bpmsTaskExpand: {
                            processInstanceId: this.clickObj.processInstanceId
                        },
                        pageInfo: this.pageInfo
                    }
                },
                {
                    headers: {
                        ReqUserId:
                            '{"accountId":101,"accountName":"tecpcmt","accountType":1,"masterId":101,"masterName":"tecpcmt"}',
                        bpmsTenantId: "tecpcmt"
                    }
                }
            );
        },

        GetProcInstOverview() {
            //饼图
            return this.$axios.post(
                this.$api.GetProcInstOverview,
                {
                    body: {
                        bpmsProcessDefinition: {
                            procdefId: this.clickObj.procdefId
                        }
                    }
                },
                {
                    headers: {
                        ReqUserId:
                            '{"accountId":101,"accountName":"tecpcmt","accountType":1,"masterId":101,"masterName":"tecpcmt"}',
                        bpmsTenantId: "tecpcmt"
                    }
                }
            );
        },
        QryProcessDefinitionImage() {
            //图片
            return this.$axios.post(
                this.$api.QryProcessDefinitionImage,
                {
                    body: {
                        processDefinitionId: this.clickObj.procdefId
                    }
                },
                {
                    headers: {
                        ReqUserId:
                            '{"accountId":101,"accountName":"tecpcmt","accountType":1,"masterId":101,"masterName":"tecpcmt"}',
                        bpmsTenantId: "tecpcmt"
                    }
                }
            );
        },
        QryProcessDefinitionUserTaskListQ() {
            //任务list
            return this.$axios.post(
                this.$api.QryProcessDefinitionUserTaskListQ,
                {
                    body: {
                        processDefinitionId: this.clickObj.procdefId
                    }
                },
                {
                    headers: {
                        ReqUserId:
                            '{"accountId":101,"accountName":"tecpcmt","accountType":1,"masterId":101,"masterName":"tecpcmt"}',
                        bpmsTenantId: "tecpcmt"
                    }
                }
            );
        },
        GetPageProcessDefineList(data) {
            // 流程定义
            return this.$axios.post(
                this.$api.GetPageProcessDefineList,
                {
                    body: {
                        bpmsProcessDefinition: {
                            orderStr: data.orderStr,
                            tenantId: data.tenantId,
                            procdefKey: data.procdefKey
                        },
                        pageInfo: this.pageInfo
                    }
                },
                {
                    headers: {
                        ReqUserId:
                            '{"accountId":101,"accountName":"tecpcmt","accountType":1,"masterId":101,"masterName":"tecpcmt"}',
                        bpmsTenantId: "tecpcmt"
                    }
                }
            );
        },
        //拖拽
        dragchange() {}
    }
};
</script>


<style scoped lang="scss">
.instance {
    width: 100%;
    height: 100%;
    padding-top: 60px;
    .app__table {
        height: 100%;
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
    }
    .d-s {
        position: absolute;
        width: 100%;
        height: 50%;
        top: 15px;
        padding-left: 10px;
        .search {
            width: 28%;
            top: -5px;
            z-index: 14;
            .s-span {
                display: block;
                width: 50px;
                height: 30px;
                background: $mainColor url(images/search-btn.png) no-repeat
                    center center;
                position: absolute;
                top: 0;
                right: 0;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
            .search-btn {
                position: absolute;
                right: -70px;
                top: 0;
            }
        }
        .h-a-add {
            position: absolute;
            top: 0;
            right: 10px;
            height: 30px;
        }
    }
    .h-operation {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 50px;
        z-index: 100;
        line-height: 50px;
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
}
.font-blue {
    cursor: pointer;
    color: $mainColor;
}
</style>