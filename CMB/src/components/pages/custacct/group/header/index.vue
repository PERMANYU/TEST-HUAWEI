<template>
    <div class="header">
        <div :class="['header-top']" id="header-map" v-if="menu">
            <div :class="['header-banner',userChange ? 'active' : '']">
                <div class="menu">
                    <div class="logo"></div>
                    <div class="user">
                        <div class="u-message"> <i></i><span>2</span></div>
                        <div class="u-head"></div>
                        <div class="u-name u-open">
                            <p :title="userName" class="user-info">hi,{{userName}}</p>
                            <div class="u-n-sub">
                                <div class="menu-identical switch-position" @click="switchPosition">切换职位</div>
                                <div class="menu-identical custom-homepage">自定义首页</div>
                                <div class="menu-identical n-s-exit" @click="exitLogin()">退出</div>
                            </div>
                        </div>
                    </div>

                    <div class="menu-items">
                        <div class="m-item m-open" ref="menuText">
                            <span class="m-i-name" v-text="menuText"></span>
                            <div class="m-i-sub">
                                <div class="i-list" v-for="(item,index) in menuList" :key="index">
                                    <Row>
                                        <Col :span="24">
                                        <span class="i-s-title">{{item.menuName}}</span>
                                        </Col>
                                        <Col :class="['i-s-item','i-s-'+childrenItem.menuIcon]" :span="24" v-for="(childrenItem,childrenIndex) in item.children" :key="childrenIndex" @click.native="menuClick(childrenItem)">
                                        <span>{{childrenItem.menuName}}</span>
                                        </Col>
                                    </Row>
                                </div>

                                <!-- <div class="i-s-footer">
                                <div class="s-f-config">设置</div>
                                <div class="s-f-defined">切换到自定义</div>
                            </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search">
                <input placeholder="请输入客户、账户名称"></input>
                <span class="icon"></span>
            </div>
        </div>

        <div class="header-top zero" v-if="!menu">
            <div class="header-banner">
                <div class="menu">
                    <div class="logo"></div>
                    <div class="user">
                        <div class="u-message"> <i></i><span>2</span></div>
                        <div class="u-head"></div>
                        <div class="u-name u-open">
                            <p :title="userName" class="user-info">hi,{{userName}}</p>
                            <p class="user-info">{{user ? user : '客户经理'}}</p>
                            <div class="u-n-sub">
                                <div class="menu-identical switch-position" @click="switchPosition">切换职位</div>
                                <div class="menu-identical custom-homepage">自定义首页</div>
                                <div class="menu-identical n-s-exit" @click="exitLogin()">退出</div>
                            </div>
                        </div>
                    </div>

                    <div class="menu-items">
                        <div class="m-item m-open" ref="menuText">
                            <span class="m-i-name" v-text="menuText"></span>
                            <div class="m-i-sub">
                                <div class="i-list" v-for="(item,index) in menuList" :key="index">
                                    <Row>
                                        <Col :span="24">
                                        <span class="i-s-title">{{item.menuName}}</span>
                                        <!-- <span class="i-s-title">{{item.menuName}}</span> -->
                                        </Col>
                                        <Col :class="['i-s-item','i-s-'+childrenItem.menuIcon]" :span="24" v-for="(childrenItem,childrenIndex) in item.children" :key="childrenIndex" @click.native="menuClick(childrenItem)">
                                        <span>{{childrenItem.menuName}}</span>
                                        </Col>
                                    </Row>
                                </div>

                                <!-- <div class="i-s-footer">
                                <div class="s-f-config">设置</div>
                                <div class="s-f-defined">切换到自定义</div>
                            </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 切换经理S -->
        <Dialog ref="manage" :dialogTitle="dialogTitle" :dialogSize="dialogSize" :initBtn="true">
            <Scroll class="modal-attention" :isShowRight=true>
                <ul class="modal-list-wrap">
                    <li class="modal-title">
                        <div class="list-text">职位</div>
                        <div class="choice">选择</div>
                    </li>
                    <li class="modal-list list-type" :class="{active: index === tabActive}" v-for="(item, index) of postListData" :key="index" @click="change(item, index)">
                        <div class="list-text">{{item.sysPostName}}</div>
                        <span class="select" :class="index === tabActive ? 'select-active' : ''" style="float:right"></span>
                    </li>
                </ul>
            </Scroll>
            <template slot="btnBox">
                <span class="back" @click="cancel">取消</span>
                <span class="save" @click="confirm">确定</span>
            </template>
        </Dialog>
        <!-- 切换经理E -->
    </div>
</template>

<script type="text/javascript">
import Menu from "@/assets/js/menu";

export default {
    data() {
        return {
            dialogTitle: "切换职位",
            dialogSize: {
                max: "520"
            },
            timer: null,
            searchValue: "",
            menuText: "更多功能",
            tabActive: -1,
            postListData: [],
            user: "",
            managerObj: {},
            menuList: Menu.getMenuList(),
            menuObj: {
                menuName: "",
                children: []
            },
            menu: false,
            userName: "",
            timeoutId: null,
            userChange: true, //改变收页的地图
            toggle: false
        };
    },

    beforeMount() {
        this.menu = true;
    },
    methods: {
        getUserName() {
            this.userName = this.$user.getInfo().name;
        },

        // 取localStorage
        getStorage() {
            let userStorage = this.$user.getUserStorage();
            if (userStorage) {
                this.postListData = userStorage.userPosts;
            }
        },

        menuClick(item) {
            this.$router.push({ path: item.componentName });
        },

        //初始处理调用的方法 函数节流
        process(type, iSpeed) {
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.move(type, iSpeed);
            }, 100);
        },

        // 切换职位
        switchPosition() {
            this.$refs.manage.show();
        },

        // 选择经理
        change(data, index) {
            this.managerObj = data;
            this.tabActive = index;
        },

        // 取消
        cancel() {
            this.$refs.manage.hide();
        },

        // 确定
        confirm() {
            if (this.tabActive === -1) {
                this.$message.warning({ message: "请选择客户经理" });
                return;
            } else {
                this.user = this.managerObj.sysPostName;
            }
            this.$refs.manage.hide();
        },

        // 退出
        exitLogin() {
            this.$user.exitLogin();
            this.$router.push({ path: "/" });
        }
    }
};
</script>

<style scoped lang="scss">
.modal-attention {
    padding: 20px 30px !important;
    .modal-list-wrap {
        max-height: 301px;
        .modal-list,
        .modal-title {
            height: 50px;
            line-height: 50px;
            padding: 0 18px 0 30px;
            border: 1px solid #f6f6f6;
            border-bottom: 0;
            font-size: 14px;
            color: #666;
            overflow: hidden;
            cursor: pointer;
            .list-text {
                float: left;
            }
            .list-middle {
                position: absolute;
                left: calc(50% - 28px);
            }
            .choice {
                float: right;
            }
            .on-off {
                float: right;
                padding-top: 14px;
            }
        }
        .list-type {
            position: relative;
            .select {
                display: block;
                position: absolute;
                top: 17px;
                right: 4%;
                width: 22px;
                height: 16px;
                background: url("./images/select_no.png") no-repeat center;
            }
            .select-active {
                display: block;
                width: 22px;
                height: 16px;
                background: url("./images/select.png") no-repeat center;
                background-size: cover;
            }
        }
        .active {
            background: #effaff;
            color: #00c0ff;
        }
        .modal-list:nth-last-child(1) {
            border-bottom: 1px solid #f6f6f6;
        }
    }
}
.header {
    width: 100%;
    background-color: #f7fbfc;
    z-index: 99;
    .header-top {
        height: 260px;
        background: url("./images/bg.png") no-repeat center center;
        transition: 1s all ease;
        &.zero {
            height: 0px;
        }
        .button {
            margin-left: 20px;
            float: left;
            height: 40px;
            &.left {
                margin: 12px 0 0 50px;
            }
            i {
                display: inline-block;
                width: 105px;
                height: 48px;
                cursor: pointer;
            }
        }
        .search {
            width: 45.25%;
            height: 79px;
            position: absolute;
            padding: 20px 20px;
            top: 185px;
            left: 51%;
            transform: translate(-50%, -50%);
            background: url(./images/search.png) no-repeat;
            background-size: 100% 100%;

            input {
                width: 88%;
                height: 92%;
                border: 0;
                font-size: 14px;
                line-height: 40px;
                color: #9f9f9f;
                text-indent: 10px;
                outline: none;
            }
            .icon {
                position: absolute;
                top: 26px;
                right: 30px;
                width: 24px;
                height: 24px;
                cursor: pointer;
                background: url("./images/fangdajing.png") no-repeat center;
                background-size: 100% 100%;
            }
        }
    }
    .header-banner {
        width: 100%;
        background: url(./images/top.png) no-repeat center;
        background-size: cover;
        &.active {
            background: transparent;
        }
        .menu {
            height: 60px;
            line-height: 60px;
            padding: 0 50px;
            box-sizing: border-box;

            .logo {
                width: 208px;
                height: 42px;
                float: left;
                margin-top: 9px;
                background: url(./images/logo.png) no-repeat center;
            }

            .menu-items {
                display: block;
                float: right;
            }

            .m-item {
                display: block;
                width: 90px;
                text-align: center;
                height: 100%;
                font-size: 14px;
                color: #cbe5fc;
                float: left;
                cursor: pointer;
                margin-right: 19px;
                box-sizing: border-box;

                a {
                    display: block;
                    color: #cbe5fc;
                }

                &:hover {
                    .m-i-name {
                        font-size: 18px;
                        font-weight: bold;
                        transition: all 0.3s ease;
                        color: #fff;
                    }

                    &.m-open {
                        &:after {
                            transform: rotate(90deg);
                            right: 0;
                        }
                    }
                }

                &.m-open {
                    width: 100px;
                    &:after {
                        content: "";
                        display: block;
                        position: absolute;
                        width: 10px;
                        height: 60px;
                        top: 0;
                        right: 5px;
                        transition: all 0.3s ease;
                        background: url(./images/shouqi1.png) no-repeat center;
                    }
                }

                &.m-open:hover .m-i-sub {
                    display: block;
                }

                .m-i-sub {
                    display: none;
                    position: absolute;
                    width: 200px;
                    line-height: normal;
                    left: -40px;
                    top: 60px;
                    background-color: #fff;
                    color: #666;
                    font-size: 12px;
                    box-shadow: 2px 4px 10px #9c9a9a;
                    z-index: 99;
                    cursor: default;
                    text-align: left;

                    &:after {
                        content: "";
                        display: block;
                        position: absolute;
                        width: 0;
                        height: 0;
                        top: -10px;
                        left: 100px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: transparent transparent #fff transparent;
                    }

                    .i-list {
                        float: left;
                        width: 100%;
                    }

                    .col {
                        padding-left: 20px;
                    }

                    .i-s-title {
                        font-weight: bold;
                    }

                    .i-s-item {
                        cursor: pointer;
                        padding-left: 30px;
                        background-repeat: no-repeat;
                        background-position: 10px;

                        &:hover {
                            opacity: 0.8;
                        }
                    }
                    .i-s-khfp {
                        background-image: url(./images/khgl.png);
                    }
                    .i-s-khst {
                        background-image: url(./images/khst.png);
                    }
                    .i-s-zqkhgl {
                        background-image: url(./images/khgx.png);
                    }
                    .i-s-gkgl {
                        background-image: url(./images/khzp.png);
                    }
                    .i-s-jzds {
                        background-image: url(./images/jzds.png);
                    }
                    .i-s-zdkh {
                        background-image: url(./images/zdkh.png);
                    }
                    .i-s-khs {
                        background-image: url(./images/xmqd.png);
                    }
                    .i-s-khsjgl {
                        background-image: url(./images/khbf.png);
                    }
                    .i-s-pldr {
                        background-image: url(./images/alfx.png);
                    }
                    .i-s-xmqd {
                        background-image: url(./images/xmqd.png);
                    }
                    .i-s-xmzx {
                        background-image: url(./images/xmzx.png);
                    }
                    .i-s-xmkz {
                        background-image: url(./images/xmkz.png);
                    }
                    .i-s-xmjh {
                        background-image: url(./images/xmjh.png);
                    }
                    .i-s-xmsw {
                        background-image: url(./images/xmsw.png);
                    }
                    .i-s-xmpg {
                        background-image: url(./images/xmpg.png);
                    }
                    .i-s-sjwj {
                        background-image: url(./images/sjwj.png);
                    }
                    .i-s-sjzh {
                        background-image: url(./images/sjzh.png);
                    }
                    .i-s-sjtj {
                        background-image: url(./images/sjtj.png);
                    }
                    .i-s-sjjkpg {
                        background-image: url(./images/sjjkpg.png);
                    }
                    .i-s-sjgd {
                        background-image: url(./images/sjgd.png);
                    }
                    .i-s-htsc {
                        background-image: url(./images/htsc.png);
                    }
                    .i-s-htlyjk {
                        background-image: url(./images/htlyjk.png);
                    }
                    .i-s-htsp {
                        background-image: url(./images/htsp.png);
                    }
                    .i-s-htzdd {
                        background-image: url(./images/htzdd.png);
                    }
                    .i-s-htqd {
                        background-image: url(./images/htqd.png);
                    }
                    .i-s-htzsgx {
                        background-image: url(./images/htzsgx.png);
                    }
                    .i-s-db {
                        background-image: url(./images/db.png);
                    }
                    .i-s-ddgl {
                        background-image: url(./images/ddgl.png);
                    }
                    .i-s-fpgl {
                        background-image: url(./images/fpgl.png);
                    }
                    .i-s-xsgl {
                        background-image: url(./images/xsgl.png);
                    }
                    .i-s-xsc {
                        background-image: url(./images/xsc.png);
                    }
                    .i-s-zsk {
                        background-image: url(./images/zsk.png);
                    }
                    .i-s-alfx {
                        background-image: url(./images/alfx.png);
                    }
                    .i-s-rmcp {
                        background-image: url(./images/rmcp.png);
                    }
                    .i-s-xstj {
                        background-image: url(./images/xstj.png);
                    }
                    .i-s-tdxstj {
                        background-image: url(./images/tdxstj.png);
                    }
                    .i-s-sjzhl {
                        background-image: url(./images/sjzhl.png);
                    }
                    .i-s-ysktj {
                        background-image: url(./images/ysktj.png);
                    }
                    .i-s-hktj {
                        background-image: url(./images/hktj.png);
                    }
                    .i-s-txl {
                        background-image: url(./images/txl.png);
                    }
                    .i-s-spgl {
                        background-image: url(./images/spgl.png);
                    }
                    .i-s-tsd {
                        background-image: url(./images/tsd.png);
                    }
                    .i-s-bzd {
                        background-image: url(./images/bzd.png);
                    }

                    .i-s-footer {
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        border-top: 1px solid #f2f2f2;
                        .s-f-config {
                            float: left;
                            margin-left: 90px;
                            padding-left: 30px;
                            &:after {
                                content: "";
                                display: block;
                                position: absolute;
                                width: 20px;
                                height: 100%;
                                left: 10px;
                                top: 0;
                                background: url(./images/shezhi.png) no-repeat
                                    center;
                            }
                        }
                        .s-f-defined {
                            float: right;
                            margin-right: 90px;
                            padding-left: 30px;
                            &:after {
                                content: "";
                                display: block;
                                position: absolute;
                                width: 20px;
                                height: 100%;
                                left: 10px;
                                top: 0;
                                background: url(./images/zidingyi.png) no-repeat
                                    center;
                            }
                        }
                    }
                }
            }

            .user {
                display: block;
                height: 100%;
                float: right;

                .u-message {
                    margin-top: 20px;
                    width: 20px;
                    height: 20px;
                    float: left;
                    margin-right: 20px;
                    cursor: pointer;
                    i {
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        z-index: 98;
                        width: 20px;
                        height: 20px;
                        background: url(./images/tixing.png) no-repeat center;
                        &:hover {
                            background: url("images/tixing-xuanting.png")
                                no-repeat center;
                        }
                    }

                    span {
                        display: block;
                        position: absolute;
                        top: -6px;
                        right: -5px;
                        z-index: 99;
                        width: 14px;
                        height: 14px;
                        line-height: 14px;
                        color: #fff;
                        text-align: center;
                        background-color: #e60012;
                        border-radius: 50%;
                    }
                }

                .u-message i {
                    animation: start 0.15s linear 20;
                    -webkit-animation: start 0.15s linear 20;
                }

                .u-head {
                    width: 40px;
                    height: 100%;
                    float: left;
                    background: url(./images/touxiang.png) no-repeat center;
                    margin-right: 10px;
                    cursor: pointer;
                }

                .u-name {
                    height: 60px;
                    font-size: 14px;
                    color: #fff;
                    padding: 10px 15px 0 0;
                    float: right;
                    cursor: pointer;

                    &:hover {
                        &.u-open {
                            &:after {
                                transform: rotate(90deg);
                            }
                        }

                        .u-n-sub {
                            display: block;
                        }
                    }

                    &.u-open {
                        &:after {
                            content: "";
                            display: block;
                            position: absolute;
                            width: 10px;
                            height: 60px;
                            top: 0;
                            right: 0;
                            transition: all 0.3s ease;
                            background: url(./images/shouqi1.png) no-repeat
                                center;
                        }
                    }

                    .u-n-sub {
                        display: none;
                        position: absolute;
                        width: 120px;
                        line-height: normal;
                        left: -25px;
                        top: 60px;
                        padding: 10px;
                        box-sizing: border-box;
                        background-color: #fff;
                        color: #666;
                        font-size: 12px;
                        box-shadow: 2px 4px 10px #9c9a9a;
                        z-index: 99;
                        cursor: default;

                        &:after {
                            content: "";
                            display: block;
                            position: absolute;
                            width: 0;
                            height: 0;
                            top: -10px;
                            left: 55px;
                            border-width: 5px;
                            border-style: solid;
                            border-color: transparent transparent #fff
                                transparent;
                        }
                        .menu-identical {
                            width: 100%;
                            height: 30px;
                            line-height: 30px;
                            padding-left: 30px;
                            box-sizing: border-box;
                            cursor: pointer;
                            &:hover {
                                background: #edf4fa;
                            }
                        }
                        .switch-position {
                            &:after {
                                content: "";
                                display: block;
                                position: absolute;
                                width: 14px;
                                height: 100%;
                                top: 0;
                                left: 5px;
                                background: url(./images/qiehuan.png) no-repeat
                                    center;
                            }
                        }
                        .custom-homepage {
                            &::after {
                                content: "";
                                display: block;
                                position: absolute;
                                width: 14px;
                                height: 100%;
                                top: 0;
                                left: 5px;
                                background: url(./images/shezhi.png) no-repeat
                                    center;
                            }
                        }
                        .n-s-exit {
                            &:after {
                                content: "";
                                display: block;
                                position: absolute;
                                width: 14px;
                                height: 100%;
                                top: 0;
                                left: 5px;
                                background: url(./images/guanbi.png) no-repeat
                                    center;
                            }
                        }
                    }
                    .user-info {
                        width: 70px;
                        height: 20px;
                        line-height: 20px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }

    .explain {
        width: 100%;
        .e-ch {
            margin-top: 50px;
            display: block;
            width: 100%;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #fff;
        }
        .e-en {
            display: block;
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #fff;
        }
    }
}
@keyframes start {
    0% {
        transform: rotate(0deg);
        transform-origin: center top;
    }
    25% {
        transform: rotate(15deg);
        transform-origin: center top;
    }
    50% {
        transform: rotate(0deg);
        transform-origin: center top;
    }
    75% {
        transform: rotate(-15deg);
        transform-origin: center top;
    }
    100% {
        transform: rotate(0deg);
        transform-origin: center top;
    }
}
@-webkit-keyframes start {
    0% {
        -webkit-transform: rotate(0deg);
        -webkit-transform-origin: center top;
    }
    25% {
        -webkit-transform: rotate(15deg);
        -webkit-transform-origin: center top;
    }
    50% {
        -webkit-transform: rotate(0deg);
        -webkit-transform-origin: center top;
    }
    75% {
        -webkit-transform: rotate(-15deg);
        -webkit-transform-origin: center top;
    }
    100% {
        -webkit-transform: rotate(0deg);
        -webkit-transform-origin: center top;
    }
}
// 媒体查询
@media screen and (min-width: 1200px) and (max-width: 1366px) {
}
@media screen and (min-width: 1367px) and (max-width: 1920px) {
    .menu {
        padding: 0 270px !important;
    }
    .button {
        &.left {
            margin: 12px 0 0 270px !important;
        }
    }
}
</style>