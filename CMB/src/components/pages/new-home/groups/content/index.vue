<template>
    <div class="new-home">
        <Nav></Nav>

        <div class="banner">
            <div class="banner-text">
                <h1>CRM管理工作台</h1>
                <h4>CRM  Management Workbench</h4>
            </div>

            <div class="banner-search">
                <ul>
                    <li v-for="(type, index) in searchType" :key="index" :class="['search-type',searchSelectType === index ? 'select-type' : '']" @click="searchSelectType = index">
                        <span>{{type}}</span>
                    </li>
                </ul>
                <div class="search-input">
                    <input type="text" :placeholder="'请输入' + searchType[searchSelectType]" v-model="bannerSearchValue" @keyup.enter="bannerSearch">
                    <i class="iconfont iconsousuokuangsousuo" @click="bannerSearch"></i>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="tab-box">
                <span class="tab-item active">通知公告</span>
            </div>

            <div class="tab-content">
                <Row class="gg-item" v-for="(item,index) in ggArray" :key="index">
                    <Col :span="18">
                        <i class="iconfont icongonggao"></i>
                        {{item.content}}
                        <i class="iconfont iconNEW" v-show="item.isNew"></i>
                    </Col>
                    <Col :span="6">
                        <i class="iconfont iconshizhong"></i>
                        {{item.date}}
                    </Col>
                </Row>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            searchType: ['客户标识'],
            searchSelectType: 0,
            bannerSearchValue:'',
            conditionSearchData:[
                {
                    iconfont: 'iconkhbs',
                    placeholder:'请输入发布内容搜索',
                    param: 'content',
                    optionParam: 'contentOption',
                    options:[{
                        label: '发布内容',
                        value: '1'
                    }],
                    optionValue: '1'
                }
            ],
            ggArray: [
                {
                    content: '【通知】2019年5月6号新版本CRM管理工作台上线！',
                    date: '2019-05-06 00:00:00',
                    isNew: true
                },{
                    content: '【功能介绍】客账户管理功能介绍公告',
                    date: '2019-04-20 13:24:19',
                    isNew: true
                },{
                    content: '【功能介绍】基础工作台功能介绍公告',
                    date: '2019-04-20 10:35:45',
                    isNew: false
                },{
                    content: '【功能介绍】CPC配置工作台功能介绍公告',
                    date: '2019-04-20 09:28:33',
                    isNew: false
                }
            ]
        };
    },
    mounted () {
    },
    methods: {
        conditionSearch(obj){

        },
        bannerSearch(){
            if(!this.bannerSearchValue){
                this.$message.error({message: '请输入检索内容'});
                return;
            }

            this.getClientPublic();
        },
        getClientPublic(){ //获取公客客户数据
            this.$axios.get(this.$api.CustomerList,{
                params:{
                    custNumber: this.bannerSearchValue,
                    custType: '1100'
                }
            }).then(res => {

                //如果不存在公客客户数据，调用政企客户接口
                if(res.data && res.data.length){
                    this.$router.push({ name: 'ClientPublic', params: { custNumber:this.bannerSearchValue }})
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
                    custNumber: this.bannerSearchValue,
                    custType: '1000'
                }
            }).then(res => {

                if(res.data && res.data.length){
                    this.$router.push({ name: 'ClientEngine', params: { custNumber:this.bannerSearchValue }})
                }else{
                    this.$message.error({message: '没有查找到客户数据'})
                }

            }).catch(err => {
                this.$message.error({message: err.response.data.message})
            })
        }
    },
    components: {
        Nav: () => import("@/components/common/home/nav")
    }
};
</script>

<style lang="scss" scoped>
    .new-home{
        width: 100%;
        height: 100%;
        padding: 50px 0 0 50px;
        background: #e8ecf7;
    }

    .banner{
        height: 290px;
        background: url('./images/banner.png') no-repeat center center;

        .banner-text{
            padding-top: 60px;
            text-align: center;
            color: #fff;

            h1{
                font-size: 40px;
            }
            h4{
                font-size: 14px;
                font-weight: normal;
            }
        }

        .banner-search{
            margin: 40px auto 0;
            width: 540px;

            .search-type{
                display: inline-block;
                margin-right: 10px;
                width: 100px;
                height: 40px;
                line-height: 40px;
                cursor: pointer;
                text-align: center;
                color: #fff;
                font-size: 14px;
                background: url('./images/zcxg.png') no-repeat center center;

                &.select-type{
                    background: url('./images/xzxg.png') no-repeat center center;
                }
            }

            .search-input{
                width: 540px;
                height: 58px;
                padding: 0 50px 0 30px;
                font-size: 14px;
                background: url('./images/ssbg.png') no-repeat center center;

                input{
                    width: 100%;
                    height: 40px;
                    outline: none;
                    border: 0;
                }

                .iconsousuokuangsousuo{
                    position: absolute;
                    display: inline-block;
                    right: 0;
                    top: 0;
                    width: 50px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    cursor: pointer;
                    background-image: linear-gradient(to right, #5a8af2, #00c0ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
        }
    }

    .content{
        margin: 20px auto 0;
        width: calc(100% - 20px);
        height: calc(100% - 310px);
        background-color: #fff;

        .tab-box{
            width: 100%;
            height: 36px;
            border-bottom: 1px solid #e8ecf7;

            .tab-item{
                display: inline-block;
                width: 130px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                cursor: pointer;
                font-size: 14px;
                color: #243d73;
                font-weight: bold;
                vertical-align: top;
                transition: all .3s ease;

                &.active{
                    top: -3px;
                    height: 40px;
                    border-top: 4px solid #5a8af2;
                    color: #5a8af2;
                    background-color: #fff;
                    border-radius: 8px 8px 0px 0px;
                    box-shadow: 1px -3px 3px 2px rgba(3, 0, 0, 0.09);
                }
            }
        }

        .tab-content{
            padding: 0 20px;

            .col{
                padding: 11px 0;
            }

            .gg-item{
                padding-left: 10px;
                cursor: pointer;
                font-size: 14px;
                color: #8e9aae;
                border-bottom: 1px solid #eee;

                .icongonggao,
                .iconshizhong{
                    font-size: 14px;
                }

                .iconNEW{
                    color: #f36069;
                }

                &:hover{
                    color: #5a8af2;
                    background-color: #f1f5ff;
                }
            }
        }
    }
</style>
