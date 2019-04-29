<template>
    <Scroll class="content">
        <Nav></Nav>
        <div class="content_right">
            <div class="top">
                <div class="top_left left alpadding-right">
                    <div class="top_left_box alpadding box">
                        <h1 class="stat">
                            <i class="operation"></i>
                        </h1>
                        <div class="bottom_box">
                            <ul>
                                <li class="" v-for="(item,index) in comdyList" :key="index">
                                    <span></span>
                                    <p>{{item.number}}</p>
                                    <a href="javascript:;">{{item.name}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="top_right left alpadding-left">
                    <div class="top_right_box alpadding box">
                        <h1 class="notice">
                            <i class="operation"></i>
                        </h1>
                        <div class="bottom_box">
                            <ol>
                                <li v-for="(item,index) in titleList" :key="index">
                                    <span></span>
                                    <a href="javascript:;">{{item.title}}</a>
                                    <p>{{item.time}}</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center">
                <div class="center_left left alpadding-right">
                    <div class="center_left_box alpadding box">
                        <h1 class="todo">
                            <i class="operation"></i>
                        </h1>
                        <div class="center_box">
                            <div class="center_table">
                                <ul>
                                    <li :class="tabIndex == index ? 'active' : ''" v-for="(item,index) in tabList" :key="index" @click="changeTab(index)">{{item}}</li>
                                </ul>
                            </div>
                            <div class="center_bottom">
                                <ul>
                                    <li v-for="(item,index) in toDoList" :key="index">
                                        <div class="left">
                                            <div class="top">{{'0' + (index + 1)}}</div>
                                            <div class="bottom">{{item.type}}</div>
                                        </div>
                                        <div class="center">
                                            <div>
                                                <p>{{item.describe}}</p><span>{{item.time}}</span>
                                            </div>
                                            <div class="all">{{item.all}}</div>
                                        </div>
                                        <div class="right">
                                            <span>处理</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="center_right left alpadding-left">
                    <div class="center_right_box alpadding box">
                        <h1 class="concern">
                            <i class="operation"></i>
                        </h1>
                        <div class="center_box">
                            <div class="center_table">
                                <ul>
                                    <li :class="tabIndex2 == index ? 'active' : ''" v-for="(item,index) in tabList" :key="index" @click="changeTab2(index)">{{item}}</li>
                                </ul>
                            </div>
                            <div class="center_bottom">
                                <ul>
                                    <li v-for="(item,index) in toDoList" :key="index">
                                        <div class="left">
                                            <div class="top">{{'0' + (index + 1)}}</div>
                                            <div class="bottom">{{item.type}}</div>
                                        </div>
                                        <div class="center">
                                            <div>
                                                <p>{{item.describe}}</p><span>{{item.time}}</span>
                                            </div>
                                            <div class="all">{{item.all}}</div>
                                        </div>
                                        <div class="right">
                                            <span>处理</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="bottom_left left alpadding-right">
                    <div class="bottom_left_box alpadding box">
                        <h1 class="recent">
                            <i class="operation"></i>
                        </h1>
                        <div class="bottom_box">
                            <ol class="recent">
                                <li v-for="(item , index) in recnetList" :key="index">
                                    <div>
                                        <span>{{item.day}}</span>
                                        <span>{{item.time}}</span>
                                    </div>
                                    <div>
                                        <i></i>
                                        <p>{{item.label}}</p>
                                        <p>{{item.value}}</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="bottom_right left alpadding-left">
                    <div class="bottom_right_box alpadding box">
                        <h1 class="remind">
                            <i class="operation"></i>
                        </h1>
                        <div class="bottom_box">
                            <ol>
                                <li v-for="(item,index) in mindList" :key="index">
                                    <span></span>
                                    <a href="javascript:;">{{item.title}}</a>
                                    <p>{{item.time}}</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Scroll>
</template>

<script>
export default {
    data() {
        return {
            tabIndex: "",
            tabIndex2: "",
            comdyList: [
                {
                    number: "98,948",
                    name: "已发布产品"
                },
                {
                    number: "98,948",
                    name: "在售销售品"
                },
                {
                    number: "98,948",
                    name: "已发布销售品"
                },
                {
                    number: "98,948",
                    name: "停售销售品"
                }
            ],
            titleList: [
                {
                    title: "12月27日cpc新版本发布升级！！！",
                    time: "今天"
                },
                {
                    title: "12月25日cpc新版本发布升级！敬请期待",
                    time: "今天"
                },
                {
                    title: "12月27日cpc新版本发布升级！！！",
                    time: "2018-12-09"
                },
                {
                    title: "12月25日cpc新版本发布升级！！！",
                    time: "2018-11-26"
                }
            ],
            mindList: [
                {
                    title: "12月27日cpc新版本发布升级！！！",
                    time: "今天"
                },
                {
                    title: "12月25日cpc新版本发布升级！敬请期待",
                    time: "今天"
                },
                {
                    title: "12月27日cpc新版本发布升级！！！",
                    time: "2018-12-09"
                }
            ],
            tabList: ["全部", "cpc产销品管理", "账户权限管理"],
            recnetList: [
                {
                    day: "今天",
                    time: "12:03:45",
                    label: "cpc引擎中创建新的需求单：",
                    value: "关于全家享169套餐需求单"
                },
                {
                    day: "2019-01-12",
                    time: "12:03:45",
                    label: "cpc引擎中创建新的需求单：",
                    value: "关于全家享169套餐需求单"
                },
                {
                    day: "2019-01-13",
                    time: "12:03:45",
                    label: "cpc引擎中创建新的需求单：",
                    value: "关于全家享169套餐需求单"
                }
            ],
            toDoList: [
                {
                    type: "需求单",
                    describe: "关于上海电信全家享169套餐需求单",
                    all: "类型：销售品需求单",
                    time: "2018-12-24"
                },
                {
                    type: "需求单",
                    describe: "关于上海电信全家享169套餐需求单",
                    all: "类型：销售品需求单",
                    time: "2018-12-24"
                },
                {
                    type: "需求单",
                    describe: "关于上海电信全家享169套餐需求单",
                    all: "类型：销售品需求单",
                    time: "2018-12-24"
                }
            ]
        };
    },
    methods: {
        changeTab(index) {
            this.tabIndex = index;
        },
        changeTab2(index) {
            this.tabIndex2 = index;
        }
    },
    components: {
        Nav: () => import("@/components/common/home/nav")
    }
};
</script>

<style lang="scss" scoped>

a {
    text-decoration: none;
}
.content {
    width: 100%;
    height: 100%;
    padding: 50px 0 0 50px;
    background: #e8ecf7;

    .content_right {
        width: 100%;
        padding: 20px;

        h1 {
            display: block;
            width: 100%;
            height: 32px;
            background-repeat: no-repeat;
            &.stat {
                background-image: url(./images/tj.png);
            }
            &.notice {
                background-image: url(./images/gg.png);
            }
            &.todo {
                background-image: url(./images/wddb.png);
            }
            &.concern {
                background-image: url(./images/wdgz.png);
            }
            &.recent {
                background-image: url(./images/zjcz.png);
            }
            &.remind {
                background-image: url(./images/wdtx.png);
            }
            .operation {
                display: block;
                width: 18px;
                height: 18px;
                float: right;
                background: url(./images/sz.png) no-repeat center center;
            }
        }

        .left {
            width: 50%;
            height: 100%;
            float: left;
            .box {
                width: 100%;
                height: 100%;
                border-radius: 8px;
                background-color: #fff;
            }
        }
        .center {
            width: 100%;
            height: 386px;
            margin: 20px 0;
            .center_box {
                width: 100%;
                height: 294px;
                margin-top: 14px;
                padding-top: 40px;
                .center_table {
                    position: absolute;
                    width: 70%;
                    height: 40px;
                    top: 0;
                    ul {
                        height: 100%;
                        display: flex;
                        justify-content: space-between;
                        li {
                            width: 130px;
                            height: 100%;
                            line-height: 40px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: bold;
                            text-align: center;
                            background: url(./images/tabzc.png) no-repeat center
                                center;
                            &.active {
                                background: url(./images/tabxz.png) no-repeat
                                    center center;
                                color: #fff;
                            }
                        }
                    }
                }
                .center_bottom {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #e8ecf7;
                    border-radius: 5px;
                    padding: 20px;
                    ul {
                        width: 100%;
                        height: 100%;
                        li {
                            height: 56px;
                            margin-bottom: 20px;
                            .left {
                                width: 60px;
                                height: 100%;
                                float: left;
                                .top {
                                    height: 50%;
                                    color: #ffbe4e;
                                    text-align: center;
                                    line-height: 28px;
                                    background: url(./images/szbj.png) no-repeat
                                        center;
                                }
                                .bottom {
                                    height: 50%;
                                    text-align: center;
                                    line-height: 28px;
                                    color: #fff;
                                    background: url(./images/flhs.png) no-repeat
                                        center;
                                }
                            }
                            .center {
                                width: 370px;
                                height: 100%;
                                float: left;
                                border-left: 1px solid #e8ecf7;
                                border-right: 1px solid #e8ecf7;
                                margin: 0 auto;
                                margin-left: 20px;
                                padding: 10px 20px;
                                p {
                                    display: inline-block;
                                    color: #4e5362;
                                }
                                span {
                                    float: right;
                                    color: #aaaeb8;
                                }
                                .all {
                                    margin-top: 10px;
                                    color: #c2c5cc;
                                }
                            }
                            .right {
                                float: right;
                                width: 82px;
                                height: 100%;
                                padding: 14px 0;
                                span {
                                    display: inline-block;
                                    width: 100%;
                                    height: 100%;
                                    border: 1px solid $mainColor;
                                    border-radius: 5px;
                                    color: $mainColor;
                                    line-height: 28px;
                                    text-align: center;
                                    text-indent: 20px;
                                    background: url(./images/cl.png) no-repeat
                                        20px center;
                                }
                            }
                            &:nth-child(3) {
                                margin-bottom: 0;
                                .left {
                                    .bottom {
                                        background: url(./images/flls-29.png)
                                            no-repeat center;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .top,
        .bottom {
            width: 100%;
            height: 220px;

            .bottom_box {
                width: 100%;
                height: 130px;
                margin-top: 14px;
                ul {
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    li {
                        width: 130px;
                        height: 130px;
                        border-radius: 10px;
                        background-color: #f2f6ff;
                        margin: 0 auto;
                        text-align: center;
                        font-size: 14px;
                        span {
                            display: inline-block;
                            width: 100%;
                            height: 50px;
                            margin-top: 18px;
                        }
                        p {
                            font-weight: bold;
                        }
                        a {
                            width: 100%;
                            color: #8c91a1;
                        }
                        &:nth-child(1) span {
                            background: url(./images/yfbcp.png) no-repeat center
                                center;
                        }
                        &:nth-child(2) span {
                            background: url(./images/zsxsp.png) no-repeat center
                                center;
                        }
                        &:nth-child(3) span {
                            background: url(./images/yfbxsp.png) no-repeat
                                center center;
                        }
                        &:nth-child(4) span {
                            background: url(./images/tsxsp.png) no-repeat center
                                center;
                        }
                    }
                }
                ol {
                    li {
                        height: 28px;
                        line-height: 28px;
                        margin-bottom: 8px;
                        font-size: 12px;
                        border-radius: 14px;
                        span {
                            display: block;
                            float: left;
                            width: 24px;
                            height: 100%;
                            background: url(./images/hsgg.png) no-repeat center
                                center;
                        }
                        a {
                            display: block;
                            float: left;
                            height: 100%;
                            color: #4e5362;
                        }
                        p {
                            display: block;
                            color: #aaaeb8;
                            float: right;
                            margin-right: 10px;
                        }
                        &:hover {
                            background-color: #f5f8ff;
                            span {
                                background: url(./images/lsgg.png) no-repeat
                                    center center;
                            }
                            a,
                            p {
                                color: $mainColor;
                            }
                        }
                    }
                }
                .recent {
                    cursor: pointer;
                    div:nth-child(1) {
                        width: 176px;
                        height: 100%;
                        padding: 0 10px;
                        float: left;
                        span {
                            display: inline-block;
                            background: none;
                            width: auto;
                            font-size: 12px;
                            color: #aaaeb8;
                            &:nth-child(1) {
                                float: left;
                            }
                            &:nth-child(2) {
                                float: right;
                            }
                        }
                    }
                    div:nth-child(2) {
                        float: left;
                        height: 100%;
                        i {
                            display: block;
                            float: left;
                            width: 26px;
                            height: 100%;
                        }
                        p {
                            &:nth-child(2) {
                                float: left;
                            }
                            &:nth-child(3) {
                                float: left;
                            }
                        }
                    }
                    li:hover {
                        div:nth-child(1) {
                            span {
                                color: $mainColor;
                            }
                        }
                    }
                }
            }
        }

        .alpadding {
            padding: 20px;
        }
        .alpadding-right {
            padding-right: 10px;
        }
        .alpadding-left {
            padding-left: 10px;
        }
    }
}
</style>
