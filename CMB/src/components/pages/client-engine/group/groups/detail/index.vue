<template>
    <transition name="fade">
        <div class="detail">
            <div class="top">
                <span class="page-close" @click="pageClose"></span>
                <span class="iconfont iconkehuxiangqing"></span>
                <span class="ch">客户详情 </span>
                <span class="en">Customer Details</span>
            </div>
            <div class="left">
                <div :class="['menu',item.code == currentView ? 'active' : '']" 
                    v-for="(item,index) in menuData" :key="index" 
                    @click="handleChangeMenu(item.code)">
                    <i :class="['iconfont', item.icon]"></i>
                    <span>{{item.name}}</span>
                </div>
            </div>
            <Scroll class="main" :isShowRight="true" ref="viewScroll">

                <!-- 客户信息 -->
                <component is="userBasic" :componentData="clientDetails" v-if="Object.keys(clientDetails).length > 0" @getDetail="getClientInfoDetail"></component>

                <!-- 其他组件信息 -->
                <component :is="currentView" :componentData="clientDetails" ref="comp" v-if="Object.keys(clientDetails).length > 0" @getDetail="getClientInfoDetail"></component>
            </Scroll>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        componentData: {}
    },
    data() {
        return {
            menuData: [
                {   
                    code: 'general',
                    name: '常用信息',
                    icon: 'iconjibenxinxi'
                },{   
                    code: 'expand',
                    name: '扩展信息',
                    icon: 'iconjibenxinxi'
                },{   
                    code: 'keyPerson',
                    name: '政企关键人',
                    icon: 'iconzhengqiguanjianren'
                },{
                    code: 'idInformation',
                    name: '证件信息',
                    icon: 'iconzhengjianxinxi'
                },{
                    code: 'addressInformation',
                    name: '地址信息',
                    icon: 'iconweizhixinxi'
                },{
                    code: 'clientTaxpayer',
                    name: '客户纳税人',
                    icon: 'iconkehunashuiren'
                },{
                    code: 'specialList',
                    name: '特殊名单',
                    icon: 'iconteshumingdan'
                },{
                    code: 'credit-management',
                    name: '信用度管理',
                    icon: 'iconxinyongduguanli'
                }
            ],
            currentView: 'general',
            clientDetails: {},
            flag: false            
        }
    },
    
    mounted() {
        this.getClientInfoDetail(this.componentData);
        // 循环权限数据
        this.$user.getFuncComps().forEach((item) => {
            switch (item.compCode) {
                case 'F-CMB-100626':
                    let obj = {
                        code: 'accountManagement',
                        name: '帐户管理',
                        icon: 'iconzhanghuguanli'
                    }
                    this.menuData.push(obj);
                    break;
                case 'F-CMB-100622':
                    this.flag = true
                    break;
                default:
                    break;
            }
        })
    },
    methods: {  
        // 获取客户信息详情
        getClientInfoDetail (data) {
            this.$axios.get(this.$api.adddClientDistribution + `/${data.custId}`).then(res=> {
                if (res.data) {
                    this.clientDetails = res.data
                    if (this.flag) {
                        this.$set(this.clientDetails, 'credit', true)
                    }
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },
        // 左侧菜单切换
        handleChangeMenu (code) {
            this.currentView = code;
        },
        
        // 关闭详情
        pageClose() {
            this.$emit("componentView", "list");
        },
        changeHeight() {
        },
        changeLow() {
        }
    },
    components:{
        userBasic: () => import('../user'),
        general: () => import('../general'),
        expand: () => import('../expand'),
        keyPerson: () => import('../key-person'),
        idInformation: () => import('../id-information'),
        addressInformation: () => import('../address-information'),
        clientTaxpayer: () => import('../client-taxpayer'),
        specialList: () => import('../special-list'),
        creditManagement: () => import('@/components/common/out-common/credit-management'),
        accountManagement: () => import('@/components/common/out-common/account-management')
    }
}
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
    top: 0;
    left: 0;
    z-index: 201;
    min-width: 1000px;
    overflow: hidden;
    background-color: #f7fbfc;
    color: #8e9aae;

    .top{
        width: 100%;
        height: 70px;
        line-height: 70px;
        padding-left: 20px;
        margin-bottom: 10px;
        background-color: #fff;
        color: $mainColor;
        font-size: 18px;
        box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);

        .iconkehuxiangqing{
            font-size: 22px;
        }

        .ch{
            font-weight: bold;
        }

        .page-close{
            position: absolute;
            right: 20px;
            top: 20px;
            width: 30px;
            height: 30px;
            background-image: url(./images/close_page.png);
            cursor: pointer;
            z-index: 1;
        }        
    }
    .left{
        float: left;
        width: 220px;
        height: calc(100% - 80px);
        margin-right: 10px;
        padding-top: 20px;
        background-color: #fff;
        box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);

        .menu{
            height: 40px;
            width: 168px;
            line-height: 40px;
            padding-left: 70px;
            border-left: 2px solid #fff;
            cursor: pointer;
            font-size: 14px;

            &.active,
            &:hover{
                color: #5a8af2;
                border-left: 2px solid #5a8af2;

                span{
                    font-weight: bold;
                }
            }

            .iconfont{
                font-size: 12px;
                position: absolute;
                left: 45px;
            }
        }
    }

    .main{
        float: right;
        width: calc(100% - 230px);
        height: calc(100% - 80px);
        overflow: auto;
    }
}
</style>