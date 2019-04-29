<template>
    <transition name='fade'>
        <div class="detail-eample">
            <Scroll>
                <div class="t-header">
                    <span class="close" @click="pageClose()"></span>
                    <span></span>
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

            <div class="btnBox">
                <span class="app__btn app__btn-back" @click="exit">关闭</span>
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
            flowNumber: 0, //流程总数
            taskList:this.componentData ? this.componentData.taskList : [],
            flowImage:this.componentData ? this.componentData.images : ''
        };
    },
    mounted() {
        this.showPie();
    },
    methods: {
        pageClose() {
            this.$emit("componentView", "flow");
        },
        showPie() {
            let pieArray = this.componentData.pieArray,
            piedate = [];
            pieArray.forEach(item => {
                let obj = {
                    value: parseInt(item.count),
                    name: item.item,
                    label:{formatter: "{b} : {c} ({d}%)"},
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
                        bottom:"10%",
                        data: piedate.length
                            ? piedate
                            : ["暂", "无", "数", "据"]
                    },
                    graphic: {
                        type:'text',
                        left:'center',
                        top:'38%',
                        z:10,
                        zlevel:800,
                        style: {
                            text:'流程实例总数\n'+ this.flowNumber +'个',
                            x:200,
                            y:200,
                            textAlign:'center',
                            textFont : 'normal 16px verdana',
                            fill:'#919191',
                            width:80,
                            height:80
                        }
                    },
                    series: [
                        {
                            selectedMode: "single",
                            type: "pie",
                            radius: ["38%", "55%"],
                            center: ["50%", "40%"], // 默认全局居中
                            avoidLabelOverlap: true,
                            selectedMode: 'single',
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
        exit() {
            this.$emit("componentView", "flow");
        },
        reLoad() {
            // this.$refs.flowFlow.initHeight();
            this.$refs.scroll.initScroll();
        },
        adjustImgPath() {
            return this.flowImage.imageStr ? "data:image/png;base64," + this.flowImage.imageStr : "data:image/png;base64," + this.flowImage.imageBytes;
        }
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
.detail-eample {
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
        .flow {
            span {

            }
            p {
                
            }
        }
    }
    .t-header {
        height: 50px;
        text-align: center;
        border-bottom: 1px solid #f6f6f6;
        i {
            font-size: 16px;
            font-weight: bold;
            font-style: normal;
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
    .flowFlow {
        height: 500px;
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
    .expression {
        line-height: 20px;
    }
}
</style>