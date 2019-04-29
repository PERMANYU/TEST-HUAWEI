<template>
    <div class="detail_flow">

        <!-- <div class="app__title ">
            <i class="iconfont icon-jibenxinxi"></i>
            <span>流程详情</span>
        </div> -->

        <div class="app__top">
            <span class="app__top-left">基本信息</span>
        </div>

        <Form labelWidth="110px" labelAlign="right">
            <Row>
                <Col :span="7">
                <FormItem labelText="所属平台：" small>
                    <span>{{bpmsProcessDefinitionBusinessType.platformName}}</span>
                </FormItem>
                </Col>
                <Col :span="7" :offset="1">
                <FormItem labelText="所属中心：" small>
                    <span>{{bpmsProcessDefinitionBusinessType.centerName}}</span>
                </FormItem>
                </Col>
                <Col :span="7" :offset="1">
                <FormItem labelText="业务类型：" small>
                    <span>{{bpmsProcessDefinitionBusinessType.businessTypeName}}</span>
                </FormItem>
                </Col>
                <Col :span="7">
                <FormItem labelText="流程名称：" small>
                    <span>{{bpmsProcessDefinitionBusinessType.procdefName}}</span>
                </FormItem>
                </Col>
                <Col :span="7" :offset="1">
                <FormItem labelText="流程主键：" small>
                    <span>{{bpmsProcessDefinitionBusinessType.procdefKey}}</span>
                </FormItem>
                </Col>
                <Col :span="7" :offset="1">
                <FormItem labelText="当前状态：" small>
                    <span>{{bpmsProcessDefinitionBusinessType.suspensionState == '1' ? '已发布' : bpmsProcessDefinitionBusinessType.suspensionState == '2' ? '已挂起' : ''}}</span>
                </FormItem>
                </Col>
            </Row>
        </Form>

        <div class="app__top">
            <span class="app__top-left">流程定义</span>
        </div>

        <div class="app__table__inner">
            <Row class="app__table-thead">
                <Col :span="8">流程定义ID</Col>
                <Col :span="4">流程名称</Col>
                <Col :span="4">版本</Col>
                <Col :span="3">状态</Col>
                <Col :span="5">更新时间 </Col>
            </Row>
            <Scroll :isShowRight="true">
                <Row :class="['app__table-item']" v-for="(item,index) in tabList" :key="index">
                    <Col :span="8" class="font-blue" @click.stop.native="nameClick(item)">{{item.procdefId}}</Col>
                    <Col :span="4">{{item.procdefName}}</Col>
                    <Col :span="4">{{item.procdefVersion}}</Col>
                    <Col :span="3">{{item.suspensionState == '1' ? '已发布' : item.suspensionState == '2' ? '已挂起' : ''}}</Col>
                    <Col :span="5">{{item.createTime | date}}</Col>
                </Row>
            <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
            </Pagination>
            </Scroll>
        </div>
        <div class="t-back" @click="back">
            <span class="app__btn app__btn-back" @click="back">返回</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        componentData: {}
    },
    data() {
        return {
            pageInfo: {
                pageIndex: 1, // 当前页
                pageSize: 20, // 每页条数
                pageCount: 0, // 总页数
                rowCount: 0 // 总条数
            },
            tabList: [],
            bpmsProcessDefinitionBusinessType: this.componentData.detail,
            headers:this.componentData.headers
        };
    },
    mounted() {
        this.getTablist()
    },
    methods: {
        getTablist() {
             this.$axios
                .post(this.$api.GetPageProcessDefineList,
                 {
                    body: {
                        bpmsProcessDefinition: {
                            procdefId: this.componentData.procdefId
                        },
                        pageInfo:this.pageInfo
                    }
                },
                this.headers
                )
                .then(res => {
                    if (res.data.code == "000000") {
                        this.tabList = res.data.body.pageRes.list;
                        this.pageInfo =  {
                            pageIndex: res.data.body.pageRes.pageNum,
                            pageSize: res.data.body.pageRes.pageSize,
                            rowCount: res.data.body.pageRes.total,
                        }
                    }
                })
                .catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
        },
        back() {
            this.$emit("componentView", "flow");
        },
        GetProcInstOverview() {
            return this.$axios.post(this.$api.GetProcInstOverview, 
            {
                body: {
                    bpmsProcessDefinition: {
                        procdefId: this.clickObj.procdefId
                    }
                }
            },
            this.headers
            );
        },
        QryProcessDefinitionImage() {
            return this.$axios.post(
                this.$api.QryProcessDefinitionImage,
                {
                    body: {
                        processDefinitionId: this.clickObj.procdefId
                    }
                },
                this.headers
            );
        },
        QryProcessDefinitionUserTaskListQ() {
            return this.$axios.post(
                this.$api.QryProcessDefinitionUserTaskListQ,
                {
                    body: {
                        processDefinitionId: this.clickObj.procdefId
                    }
                },
                this.headers
            );
        },
        nameClick(item) {
            this.clickObj = item;
            let _this = this;
            this.$axios
                .all([
                    this.GetProcInstOverview(),
                    this.QryProcessDefinitionImage(),
                    this.QryProcessDefinitionUserTaskListQ()
                ])
                .then(
                    this.$axios.spread(function(acct, perms, task) {
                        console.log(
                            perms.data.body,
                            task.data.body.list,
                            acct.data.body.bpmsProcInstOverviewList
                        );
                        let detailExampleArray = {
                            images: perms.data.body,
                            taskList: task.data.body.list,
                            pieArray: acct.data.body.bpmsProcInstOverviewList
                        };
                        _this.$emit("componentView","detailExample",detailExampleArray);
                    })
                );
        },
        pageChange(page) {
            this.pageInfo.pageIndex = page;
            this.getTablist();
        }
    }
};
</script>

<style lang="scss" scoped>
.detail_flow {
    width: 100%;
    .t-back {
        position: fixed;
        bottom: 10px;
        right:0 ;
        line-height: 30px;
        color: $mainColor;
        text-align: center;
        background-color: #fff;
        border-radius: 4px;
        cursor: pointer;
        z-index: 0;

        &:hover {
            color: #fff;
            background-color: $mainColor;
        }
    }
    .app__table__inner {
        width: 100%;
        height: calc(100% - 212px);
        .font-blue {
            cursor: pointer;
            color: $mainColor;
        }
    }
}
</style>
