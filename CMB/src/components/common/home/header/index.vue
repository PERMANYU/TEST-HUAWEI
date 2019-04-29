<template>
    <div class="wrap">   
        <div class="logo"></div>
        <div class="header_right">
            <div class="search">

            </div>
            <div class="nav">
                <ul class="">
                    <li><span @click="goHome">首页</span></li>
                    <li><span @click="goOther">消息</span></li>
                    <li><span @click="goOther">新手上路</span></li>
                    <li><span @click="goOther">联系我们</span></li>
                    <li><span @click="goOther">常见问题</span></li>
                </ul>
            </div>
            <div class="user_box">
                <div class="user_photo"></div>
                <i :title="userName" class="user_name">hi,{{userName}}</i>
                <div class="user_xiajian"></div>
                <div class="u-n-sub">
                    <div class="menu-identical switch-position" @click="chageOrg">切换组织</div>
                    <!-- <div class="menu-identical n-s-exit" @click="exitLogin()">退出</div> -->
                </div>
            </div>
        </div>
        <!-- 切换组织S -->
        <Dialog ref="manage" dialogTitle="切换组织" :dialogSize="dialogSize" :initBtn="true">
            <Scroll class="modal-attention" :isShowRight=true>
                <ul class="modal-list-wrap">
                    <li class="modal-title">
                        <div class="list-text">组织</div>
                        <div class="choice">选择</div>
                    </li>
                    <li class="modal-list list-type" :class="{active: item.orgId === selectOrg.orgId}" v-for="(item, index) of postListData" :key="index" @click="orgSelect(item)">
                        <div class="list-text">{{item.orgName}}</div>
                        <span class="select" style="float:right"></span>
                    </li>
                </ul>
            </Scroll>
            <template slot="btnBox">
                <span class="back" @click="orgCancel">取消</span>
                <span class="save" @click="orgConfirm">确定</span>
            </template>
        </Dialog>
        <!-- 切换组织E -->
    </div>
</template>

<script>
    import Menu from "@/assets/js/menu";
    import userinfo from "@/assets/js/userinfo";

    export default {
        data() {
            return {
                dialogSize: {
                    max: "520"
                },
                userName:'',
                postListData: this.$user.getUserStorage().userOrgs,
                selectOrg: {}
            }
        },
        mounted() {
            this.getUserName();
        },
        methods: {
            headerSearch(){ //根据客户标识检索客户
                if(!this.headerInputValue){
                    this.$message.error({message: '请输入客户标识'});
                    return;
                }

                this.getClientPublic();
            },
            getClientPublic(){ //获取公客客户数据
                this.$axios.get(this.$api.CustomerList,{
                    params:{
                        custNumber: this.headerInputValue,
                        custType: '1100'
                    }
                }).then(res => {

                    //如果不存在公客客户数据，调用政企客户接口
                    if(res.data && res.data.length){
                        this.$router.push({ name: 'ClientPublic', params: { custNumber:this.headerInputValue }})
                    }else{
                        //调用政企客户接口
                        this.getClientEngine();
                    }

                }).catch(err => {
                    this.$message.error({message: err.response.data.message})
                })
            },
            getClientEngine(){ //获取政企客户数据
                this.$axios.get(this.$api.adddClientDistribution, {
                    params:{
                        custNumber: this.headerInputValue,
                        custType: '1000'
                    }
                }).then(res => {

                    if(res.data && res.data.length){
                        this.$router.push({ name: 'ClientEngine', params: { custNumber:this.headerInputValue }})
                    }else{
                        this.$message.error({message: '没有查找到数据'})
                    }

                }).catch(err => {
                    this.$message.error({message: err.response.data.message})
                })
            },
            getUserName() {// 获取用户名

                this.userName = this.$user.getInfo().name;
            },
            chageOrg(){ //切换组织按钮点击

                this.selectOrg = this.$user.getUserOrgs();
                this.$refs.manage.show();
            },
            orgSelect(item){ //组织选择

                this.selectOrg = item;
            },
            orgConfirm(){ //组织选择后确定
                this.getAuthority();                
            },
            orgCancel(){ //组织选择取消
                this.$refs.manage.hide();
            },
            goHome(){ //首页
                this.$router.push({ path: `/home` });
            },
            goOther(){ //其他

                this.$message.error({message: '功能开发中...'})
            },
            exitLogin() { // 退出
                this.$user.exitLogin();
            },
            getAuthority(){ //调用接口获取权限
                let params = {
                    orgId: this.selectOrg.orgId,
                    sysUserId: this.$user.getSysUserId(),
                    sysRoleIds: this.selectOrg.sysRoles.map(item => item.sysRoleId).join(',')
                }

                this.$axios.get(this.$api.GetPermission.format({sysUserCode: this.userName}),{
                    params
                }).then( res => {
                    if (res.data) {
                        let data = res.data.systemUser,
                            userString = JSON.stringify(data),
                            userinfoArr = data.userOrgs, // 组织信息
                            orgsObj = userinfoArr.find(item => item.currentUserFlag == 1);

                        localStorage.setItem(this.$user.userOrgs,JSON.stringify(orgsObj));

                        // 存储当前默认的组织和角色
                        localStorage.setItem(this.$user.roleDataKey,JSON.stringify(orgsObj.sysRoles[0]));

                        localStorage.setItem(this.$user.userStorage, userString);

                        this.$message.success({message: "组织切换成功"});
                        this.$refs.manage.hide();
                        this.goHome();
                        // this.getOrg();
                    }else{
                        this.$message.error({message: "当前用户没有权限！"});
                    }
                }).catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
            },
            // 获取组织
            getOrg (){
                this.$axios.get(this.$api.CustomerManage,{
                    params: {
                        staffCode: this.$user.getStaffCode(),
                        staffId: this.$user.getStaffId(),
                        orgId: this.$user.getOrgId(),
                        sysRoleCode: this.$user.getSysRoleCode(),
                        offset: '1',
                        limit: '20'
                    }
                }).then( res => {
                    console.log(res,99);
                    // localStorage.setItem(this.$user.roleDataKey,);
                }).catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
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
            &.active {
                background: #effaff;
                color: #00c0ff;
                
                span {
                    display: block;
                    width: 22px;
                    height: 16px;
                    background: url("./images/select.png") no-repeat center;
                    background-size: cover;
                }
            }
        }
        .modal-list:nth-last-child(1) {
            border-bottom: 1px solid #f6f6f6;
        }
    }
}
.wrap {
    position: fixed;
    top: 0;
    min-width: 1100px;
    width: 100%;
    height: 50px;
    z-index: 100;
    background-color:$mainColor; 
    .logo {
        margin-left: 12px;
        width: 172px;
        height: 100%;
        float: left;
        background-size: 90% 90%;
        background: url(./images/crm_logo.png) no-repeat center center;
    }
    .header_right {
        min-width: 580px;
        width: 50%;
        height: 100%;
        float: right;
        .nav {
            float: left;
            width: 64%;
            min-width:580px;
            padding: 0 30px;
            ul {
                margin: 0 auto;
                height: 100%;
                li {
                    float: left;
                    padding: 16px 25px;
                    span {
                        font-size: 14px;
                        color: #fff;
                        text-decoration:none;
                        cursor: pointer;
                    }
                }
            }
        }
        .user_box {
            min-width: 110px;
            position: fixed;
            right: 25px;
            cursor: default;
            .user_photo {
                float: left;
                width: 40px;
                height: 50px;
                background: url(./images/name_photo.png) no-repeat center center;
            }
            .user_name {
                float: left;
                width: 70px;
                margin-left: 10px;
                font: 12px/50px "微软雅黑";
                color: #fff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .user_xiajian {
                float: left;
                width: 14px;
                height: 14px;
                margin-top: 16%;
                margin-left: 8px;
                background: url(./images/xiajian.png) no-repeat center center;
                transform: rotate(-90deg);
            }
            .u-n-sub {
                display: none;
                position: absolute;
                width: 120px;
                line-height: normal;
                left: 0;
                top: 50px;
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
            &:hover {
                .user_xiajian {
                    transition: .5s all ease;
                    transform: rotate(0deg);
                }
                .u-n-sub {
                    display: block;
                }
            }
        }
    }
}
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
</style>