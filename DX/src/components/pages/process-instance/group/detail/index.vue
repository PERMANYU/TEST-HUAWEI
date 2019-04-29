<template>
    <transition name='fade'>    
        <div class="detail">
            <Scroll>
                <div class="app__top">
                    <span class="app__top-left">基本信息</span>
                </div>

                <Form labelWidth="110px" labelAlign="right">
                    <Row>
                        <Col :span="6">
                        <FormItem labelText="所属平台：" small>
                            <span>{{bpmsProcessDefinitionBusinessType.platformName}}</span>
                        </FormItem>
                        </Col>
                        <Col :span="6">
                        <FormItem labelText="所属中心：" small>
                            <span>{{bpmsProcessDefinitionBusinessType.centerName}}</span>
                        </FormItem>
                        </Col>
                        <Col :span="6">
                        <FormItem labelText="业务类型：" small>
                            <span>{{bpmsProcessDefinitionBusinessType.businessTypeName}}</span>
                        </FormItem>
                        </Col>
                        <Col :span="6">
                        <FormItem labelText="流程名称：" small>
                            <span>{{bpmsProcessDefinitionBusinessType.procdefName}}</span>
                        </FormItem>
                        </Col>
                        <Col :span="6">
                        <FormItem labelText="流程主键：" small>
                            <span>{{bpmsProcessDefinitionBusinessType.procdefKey}}</span>
                        </FormItem>
                        </Col>
                        <Col :span="6">
                        <FormItem labelText="当前状态：" small>
                            <span>{{bpmsProcessDefinitionBusinessType.suspensionState == '1' ? '已发布' : bpmsProcessDefinitionBusinessType.suspensionState == '2' ? '已挂起' : ''}}</span>
                        </FormItem>
                        </Col>
                        <Col :span="6">
                        <FormItem labelText="租户ID：" small>
                            <span>{{bpmsProcessDefinitionBusinessType.tenantId}}</span>
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
                            <Col :span="8">{{item.procdefId}}</Col>
                            <Col :span="4">{{item.procdefName}}</Col>
                            <Col :span="4">{{item.procdefVersion}}</Col>
                            <Col :span="3">{{item.suspensionState == '1' ? '已发布' : item.suspensionState == '2' ? '已挂起' : ''}}</Col>
                            <Col :span="5">{{item.createTime | date}}</Col>
                        </Row>
                        <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
                        </Pagination>
                    </Scroll>
                </div>

                <div class="app__top">
                    <span class="app__top-left">流程实例概况</span>
                </div>

                <div id="pie_flow">
                    <div class="flow">
                        <span>流程实例总数</span>
                        <p>{{flowNumber}}个</p>
                    </div>
                </div>

                <div class="app__top">
                    <span class="app__top-left">流程图</span>
                </div>

                <div ref="flowFlow" class="flowFlow">
                    <Scroll ref="scroll" :isShowRight="true">
                        <img :src="adjustImgPath()" @load="reLoad()" >
                    </Scroll>
                </div>

                <div class="app__top">
                    <span class="app__top-left">任务列表</span>
                </div>

                <div class="app__table__inner">
                    <Row class="app__table-thead">
                        <Col :span="4" :offset="1">任务ID</Col>
                        <Col :span="5">任务名称</Col>
                        <Col :span="5">任务类型</Col>
                        <Col :span="3">变量信息</Col>
                        <Col :span="6">表达式</Col>
                    </Row>
                    <Row :class="['app__table-item']" v-for="(item,index) in taskList" :key="index">
                        <Col :span="4" :offset="1">{{item.id}}</Col>
                        <Col :span="5">{{item.name}}</Col>
                        <Col :span="5">{{item.type}}</Col>
                        <Col :span="3">{{item.variable}}</Col>
                        <Col :span="6" class="expression">{{item.expression}}</Col>
                    </Row>
                </div>
            </Scroll>
            <div class="t-back" @click="back">
                <i class="iconfont icon-fanhui1811"></i>
                <span>返回</span>
            </div>
        </div>
    </transition>    
</template>

<script>
import echarts from "echarts";
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
            taskList:this.componentData ? this.componentData.taskList : [],
            flowNumber:0,
            tabList: this.componentData.fineList,
            bpmsProcessDefinitionBusinessType: this.componentData.detail,
            flowImage:this.componentData ? this.componentData.images : ''
        };
    },
    mounted() {
        this.showPie();
    },
    methods: {
        showPie() {
            let pieArray = this.componentData.pieArray,
                piedate = [];
            pieArray.forEach(item => {
                let obj = {
                    value: parseInt(item.count),
                    name: item.item,
                    label: { formatter: "{b} : {c} ({d}%)" }
                };
                this.flowNumber += item.count;
                piedate.push(obj);
            });
            console.log(piedate);
            let pieFlow = document.getElementById("pie_flow"),
                pieCharts = echarts.init(pieFlow),
                obj = {
                    tooltip: {},
                    grid: {
                        top: "10px",
                        left: "40px",
                        right: "10px"
                    },
                    title: {
                        x: "30%",
                        y: "70%"
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: "horizontal",
                        itemWidth: 10,
                        itemHeight: 10,
                        left: "45%",
                        bottom: "10%",
                        data: piedate.length
                            ? piedate
                            : ["暂", "无", "数", "据"]
                    },
                    graphic: {
                        type: "text",
                        left: "center",
                        top: "38%",
                        z: 10,
                        zlevel: 800,
                        style: {
                            text: "流程实例总数\n" + this.flowNumber + "个",
                            x: 200,
                            y: 200,
                            textAlign: "center",
                            textFont: "normal 16px verdana",
                            fill: "#919191",
                            width: 80,
                            height: 80
                        }
                    },
                    series: [
                        {
                            selectedMode: "single",
                            type: "pie",
                            radius: ["38%", "55%"],
                            center: ["50%", "40%"], // 默认全局居中
                            avoidLabelOverlap: true,
                            selectedMode: "single",
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data: piedate.length
                                ? piedate
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
                                            "#36CBCB",
                                            "#3AAEFF",
                                            "#3F99Cd",
                                            "#627892",
                                            "#DBDAE2",
                                            "#09BEFE",
                                            "#5C9CF1",
                                            "#E7D104"
                                        ];
                                        return colorList[params.dataIndex];
                                    }
                                }
                            }
                        }
                    ]
                };
            pieCharts.setOption(obj);
            setTimeout(() => {
                pieCharts.resize();
            }, 0);
        },
        adjustImgPath() {
            return this.flowImage.imageStr ? "data:image/png;base64," + this.flowImage.imageStr : "data:image/png;base64," + this.flowImage.imageBytes;
        },
        reLoad() {
            this.$refs.scroll.initScroll();
        },
        back() {
            this.$emit("componentView", "list");
        },
        pageChange() {}
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
.detail {
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
    #pie_flow {
        width: 100%;
        height: 355px;
        text-align: center;
    }
    .flowFlow {
        height: 500px;
    }
    .t-back {
        position: absolute;
        bottom: 0px;
        right: 50%;
        line-height: 30px;
        width: 55px;
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
    .expression {
        line-height: 20px;
    }
}
</style>