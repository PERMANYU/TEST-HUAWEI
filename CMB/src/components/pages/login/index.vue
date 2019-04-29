<template>
    <div class="login-wrap">
        <div class="login-content">
            <div class="login-icon"></div>
            <div class="login-area">
                <div class="login-header"></div>
                <section class="l-distance">
                    <div :class="['l-name',nameErrorMsg ? 'l-error' : '']">
                        <input type="input" name="" v-model="loginUser.name" @keydown="inputKey($event)" @focus="inputFocus('name')" placeholder="请输入用户名" @blur="inputBlur('name')">
                        <span class="l-n-icon"></span>
                        <div class="l-n-error">
                            <span class="e-left"></span>
                            <span class="e-icon"></span>
                            <span>{{nameErrorMsg}}</span>
                        </div>
                        <span class="l-n-clear" @click="clear('name')" v-show="loginUser.name"></span>
                    </div>
                    <div :class="['l-pw',pwErrorMsg ? 'l-error' : '']">
                        <input type="password" name="" v-model="loginUser.pw" @keydown="inputKey($event)" @focus="inputFocus('pw')" placeholder="请输入密码" @blur="inputBlur('pw')">
                        <span class="l-p-icon"></span>
                        <div class="l-p-error">
                            <span class="e-left"></span>
                            <span class="e-icon"></span>
                            <span>{{pwErrorMsg}}</span>
                        </div>
                        <span class="l-n-clear" @click="clear('pass')" v-show="loginUser.pw"></span>
                    </div>
                    <div class="l-remember" @click="rememberClick()">
                        <span :class="['l-r-checkbox',isRemember ? 'active' : '']"></span>
                        <span class="l-r-name">记住密码</span>
                    </div>
                    <div class="l-submit" @click="submitClick">登录</div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import userinfo from "@/assets/js/userinfo";

export default {
    data() {
        return {
            isRemember: false,
            nameErrorMsg: "",
            pwErrorMsg: "",
            isRemember: false,
            errorInfo: {
                showError: false,
                msg: "登录失败"
            },
            loginUser: {
                name: "",
                pw: "",
                id: "2222"
            }
        };
    },
    mounted() {

    },
    methods: {
        validateLogin(){ //验证登录
            let isOA = this.$route.query.sid !== undefined;
            if(isOA){
                this.getJurisdiction();
                return;
            }
            this.getStorage();
        },
        rememberClick() {
            this.isRemember = !this.isRemember;
        },
        inputKey(event) {
            //回车登录
            event.keyCode == 13 ? this.submitClick() : "";
        },

        // 登录权限查询
        getJurisdiction() {
            //保存用户信息
            localStorage.setItem( userinfo.userNameKey, this.loginUser.name);
            localStorage.setItem(userinfo.userRememberKey, this.isRemember ? 1 : 0);

            if (this.isRemember) {
                localStorage.setItem(userinfo.userPwKey,this.loginUser.pw);
            } else {
                localStorage.removeItem(userinfo.userPwKey);
            }

            this.$router.push({ path: "/home" });
        },
        submitClick() {

            this.checkUser();
        },

        // 取localStorage
        getStorage() {
            let obj = JSON.parse(localStorage.getItem("objStorage"));
            if (obj && obj.state) {
                (this.loginUser.name = obj.user),
                    (this.loginUser.pw = obj.pass),
                    (this.isRemember = obj.state);
            }
        },

        checkUser() {
            if (!this.loginUser.name) {
                this.nameErrorMsg = "请输入用户名";
            }

            if (!this.loginUser.pw) {
                this.pwErrorMsg = "请输入密码";
                return false;
            } else if (this.loginUser.name === "") {
                this.nameErrorMsg = "用户名不得为空";
                return false;
            } else if (this.loginUser.pw === "") {
                this.pwErrorMsg = "密码不得为空";
                return false;
            } else if (this.loginUser.pw != "123456") {
                this.$message.error({ message: "密码错误！" });
            } else {
                this.getJurisdiction(); // 查询权限
            }
        },
        inputFocus(type) {
            if (type == "name") {
                this.nameErrorMsg = "";
            } else if (type == "pw") {
                this.pwErrorMsg = "";
            }
        },
        inputBlur(type) {
            if (type == "name" && !this.loginUser.name) {
                this.nameErrorMsg = "请输入用户名";
            } else if (type == "pw" && !this.loginUser.pw) {
                this.pwErrorMsg = "请输入密码";
            }
        },
        clear(type) {
            if(type == 'name') {
                this.loginUser.name = '';
            } else if(type == 'pass') {
                this.loginUser.pw = '';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
$white: #fff;
.login-wrap {
    max-width: 100%;
    height: 100%;
    background: url("./images/banner.png") no-repeat center;
    background-size: cover;
    .login-content {
        position: relative;
        top: 50%;
        .login-icon {
            position: absolute;
            top: 50%;
            left: 30%;
            width: 445px;
            height: 323px;
            transform: translate(-30%, -50%);
            background: url("./images/login-icon.png") no-repeat;
            background-size: cover;
        }
        .login-area {
            position: absolute;
            left: 70%;
            top: 50%;
            width: 360px;
            background: $white;
            transform: translate(-70%, -50%);
            border-radius: 2px;
            .login-header {
                height: 90px;
                background: url('./images/crm_logo.png') no-repeat center center;
            }
            .l-distance {
                position: relative;
                padding: 0 45px;
                font-size: 14px;
                .input-identical {
                    width: 230px;
                    height: 36px;
                    border-radius: 4px;
                    border: solid 1px #edf3f8;
                }
                .l-pw {
                    margin-top: 25px;
                }
                .l-name,
                .l-pw {
                    position: relative;
                    &.l-error {
                        input {
                            border: 1px solid red;
                        }
                        .l-n-error,
                        .l-p-error {
                            position: absolute;
                            padding: 0 5px 0 20px;
                            box-sizing: border-box;
                            white-space: nowrap;
                            text-align: left;
                            height: 20px;
                            line-height: 20px;
                            font-size: 12px;
                            color: red;
                            background-color: rgba(255, 255, 255, 0.7);

                            .e-left {
                                display: block;
                                position: absolute;
                                left: -12px;
                                top: 7px;
                                width: 0px;
                                height: 0px;
                                border: 6px solid transparent;
                                border-color: transparent
                                    rgba(255, 255, 255, 0.7) transparent
                                    transparent;
                            }

                            .e-icon {
                                position: absolute;
                                display: block;
                                width: 20px;
                                height: 20px;
                                left: 0px;
                                top: 5px;
                                background: url("./images/error.png") no-repeat;
                                background-position: cener;
                            }
                        }
                    }

                    input {
                        box-sizing: border-box;
                        width: 100%;
                        height: 40px;
                        outline: 1;
                        border: 0;
                        border: 1px solid #edf3f8;
                        padding-left: 50px;
                        color: #4e5362;
                        &:focus {
                            outline: none;
                            border: 1px solid #96c1f1;
                        }
                    }

                    .l-n-icon,
                    .l-p-icon {
                        position: absolute;
                        display: block;
                        width: 14px;
                        height: 14px;
                        left: 14px;
                        top: 12px;
                    }
                    .l-n-icon::after,
                    .l-p-icon::after {
                        content: "";
                        position: absolute;
                        left: 26px;
                        width: 1px;
                        height: 14px;
                        border-right: 1px solid #edf3f8;
                    }

                    .l-n-icon {
                        background: url(./images/crm_yonghuming.png) no-repeat;
                        background-position: center;
                    }

                    .l-p-icon {
                        background: url(./images/crm_mima.png) no-repeat;
                        background-position: center;
                    }

                    .l-n-clear {
                        position: absolute;
                        display: block;
                        width: 14px;
                        height: 14px;
                        right: 14px;
                        top: 12px;
                        cursor: pointer;
                        background: url(./images/crm_qingchu.png) no-repeat;
                        background-position: center;
                    }
                }
                .l-name:hover {
                    .l-n-icon {
                        background: url(./images/crm_yonghuming_hover.png) no-repeat;
                        background-position: center;
                    }
                }
                .l-pw:hover {
                    .l-p-icon {
                        background: url(./images/crm_mima_hover.png) no-repeat;
                        background-position: center;
                    }
                }

                .l-remember {
                    margin-top: 15px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    display: inline-block;
                    cursor: pointer;

                    .active {
                        color: #999;
                    }

                    .l-r-checkbox {
                        float: left;
                        display: block;
                        margin-top: 3px;
                        width: 14px;
                        height: 14px;
                        border-radius: 2px;
                        background: url(./images/login-kuang.png) no-repeat;
                        background-position: center;
                        border: 1px solid #eeeeee;
                        &.active {
                            background: url(./images/crm_xuanze.png)
                                no-repeat;
                        }
                    }
                    .l-r-name {
                        float: left;
                        display: block;
                        margin-left: 11px;
                        font-size: 12px;
                        color: #333;
                    }
                }
                .l-submit {
                    position: relative;
                    margin: 20px 0 40px;
                    width: 100%;
                    line-height: 40px;
                    color: $white;
                    background: #3588e5;
                    text-align: center;
                    cursor: pointer;
                    &:hover {
                        opacity: 0.8;
                    }
                }
            }
        }
    }
}
</style>
