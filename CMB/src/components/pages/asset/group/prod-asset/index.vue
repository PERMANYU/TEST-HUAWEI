<template>
    <div class="prod-asset">
        <div class="header">
            <div class="app__title-1">
                <span class="app__title-name">{{componentData.titleName}}</span>
            </div>

            <ConditionSearch :data="conditionSearchData" @search="conditionSearch" ref="conditionSearchRef"></ConditionSearch>

            <groupProd v-show="activeRowObj.prodCompType == 13" :componentData="activeRowObj"/>
            
        </div>
        <div class="array">
            <Scroll class="app__table" :isShowRight="true" :isShowBottom="true" fixedTopClassName="app__table-thead" fixedLeftClassName="app__data-none" ref="listScroll">
                <div class="list-scroll-content">
                    <Row class="app__table-thead" inline>
                        <Col :width="50"></Col>

                        <Col :width="tableItem.width" v-for="(tableItem,tableIndex) in tableConfig" :key='tableIndex'>{{tableItem.name}}</Col>
                    </Row>
                    <Row :class="['app__table-item',item.rowActive ? 'active' : '']" 
                        v-for="(item,index) in listData" 
                        :key="index" 
                        @click.native="rowClick(item)"
                        inline>
                        <Col :width="50">
                            <span :class="['iconfont',item.rowActive ? 'icondanxuanxuanzhong1' : 'icondanxuankuang']"></span>
                        </Col>

                        <Col :width="tableItem.width" 
                            v-for="(tableItem,tableIndex) in tableConfig" 
                            :key='tableIndex'>{{item[tableItem.param]}}</Col>
                    </Row>
                </div>
                

                <div v-if="!listData.length" class="app__data-none">
                    <span>暂无数据</span>
                </div>
            </Scroll>
        </div>

        <div class="content" v-show="activeRowObj.ownerCustId">
            <div class="app__title-1">
                <span class="app__title-name">产品资产信息</span>
                <checkLog :componentData="activeRowObj"/>
                <zeroReason :componentData="activeRowObj"/>
            </div>

            <TabPane :tabs="tabPaneList" :value="tabPaneValue" @change="tabPaneChange">
                <template :slot="paneItem.value" v-for="(paneItem,paneIndex) in tabPaneList">
                    <component :is="paneItem.value" :ref="paneItem.value" @initEnd="componentInitEnd"></component>
                </template>
            </TabPane>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default{
        props:{
            componentData: {}
        },
        data(){
            return{
                searchInputObjData:{}, //查询内容
                listData:[], //列表数据
                activeRowObj:{}, //当前选择的数据
                conditionSearchData:[{
                    iconfont: 'iconkhbs',
                    placeholder:'请输入设备号',
                    param: 'accNum',
                    default: ''
                },{
                    iconfont: 'iconshenfenzheng',
                    placeholder:'请输入客户标识',
                    param: 'custId',
                    default: ''
                },{
                    iconfont: 'iconshouji',
                    placeholder:'请输入根产品设备号',
                    param: 'prodAccNum',
                    default: ''
                }],
                conditionSearchObj:{},
                tableConfig:[{ //表格列表显示配置
                    param: 'accNum',
                    name: '设备号',
                    width: 180
                },{
                    param: 'prodInstName',
                    name: '产品',
                    width: 180
                },{
                    param: 'offerInstId',
                    name: '销售品Id',
                    width: 180
                },{
                    param: 'offerName',
                    name: '销售品名称（对内）',
                    width: 180
                },{
                    param: 'ownerCustName',
                    name: '客户',
                    width: 180
                },{
                    param: 'custId',
                    name: '根资产设备编号',
                    width: 180
                },{
                    param: 'beginRentDate',
                    name: '开通日期',
                    width: 180
                },{
                    param: 'statusCdName',
                    name: '资产状态',
                    width: 180
                },{
                    param: 'ownerCustId',
                    name: '客户标识',
                    width: 180
                },{
                    param: 'xxxxx', //暂无
                    name: '账户资料（分账序号）',
                    width: 180
                },{
                    param: 'xxxxx', //暂无
                    name: '账户名称',
                    width: 180
                },{
                    param: 'xxxxx', //暂无
                    name: '服务客户',
                    width: 180
                },{
                    param: 'xxxxx', //暂无
                    name: '资费失效日期',
                    width: 180
                },{
                    param: 'xxxxx', //暂无
                    name: '签约捆绑结束日',
                    width: 180
                },{
                    param: 'xxxxx', //暂无
                    name: '客户服务等级',
                    width: 180
                },{
                    param: 'offerName',
                    name: '销售品名称（对外）',
                    width: 180
                }],
                tabPaneValue:this.componentData.tabPaneValue, //tabPane显示的组件
                tabPaneList:this.componentData.tabPaneList || []//tabPane所有的组件
            }
        },
        mounted(){
            this.otherPageSearch();
        },
        methods:{
            otherPageSearch(){ //其他页面跳转查询
                console.log(this.$route)
                if(this.$route.params.accNum){
                    this.conditionSearchData.find( item => item.param == 'accNum').default = this.$route.params.accNum;
                    
                    this.$nextTick( () => {
                        this.$refs.conditionSearchRef.search();
                    })
                }
            },
            getListData(){ //获取列表数据
                this.$axios.get(this.$api.AssetProdInst, {
                    params: {
                        custId: this.conditionSearchObj.custId, //'300004625491'
                        accNum: this.conditionSearchObj.accNum,
                        prodUseType: '1000'
                    }
                }).then(res => {
                    let resData = res.data || [];

                    for(let listItem of resData){
                        this.$set(listItem,'rowActive',false);
                    }

                    if(resData.length > 0){
                        this.rowClick(resData[0])
                    }else{
                        this.activeRowObj = {};
                    }

                    this.listData = resData;

                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            rowClick(item){ //行点击事件
                this.listData.filter( listItem => listItem.rowActive = false);
                this.activeRowObj = item;

                item.rowActive = true;

                this.$refs[this.tabPaneValue][0].init(item);

                this.$nextTick( () => {
                    this.$parent.initScroll();
                })
            },
            conditionSearch(obj){ //列表查询
                this.conditionSearchObj = obj;
                this.getListData();
            },
            tabPaneChange(value){ //标签切换
                this.tabPaneValue = value;
                let tabPaneComponent = this.$refs[value][0];
                tabPaneComponent.init(this.activeRowObj);
            },
            componentInitEnd(){ //组件加载完成
                this.$parent.initScroll();
            }
        },
        components:{
            prodInfo: () => import('./group/prod-info'), //产品资产详情
            prodAttr: () => import('./group/prod-attr'), //产品属性
            prodLabel: () => import('./group/prod-label'), //产品标签
            businessHistory: () => import('./../common/business-history'), //业务历史
            accountInfo: () => import('./group/account-info'), //账户信息
            customerInfo: () => import('./group/customer-info'), //客户信息
            prodRel: () => import('./group/prod-rel'), //产品关系
            prodChild: () => import('./group/prod-child'), //产品资产明细
            checkLog: () => import('./group/check-log'), //资产修改
            groupProd: () => import('./group/group-prod'), //群组资产
            zeroReason: () => import('./group/zero-reason'), //零自费原因
        }
    }
</script>

<style scoped lang="scss">
    .prod-asset{
        padding-top: 130px;

        .header{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 130px;
            padding: 20px 20px 0;
            background-color: #fff;
        }

        .array{
            width: 100%;
            padding: 0 15px 20px;
            background-color: #fff;

            .app__table-item{
                cursor: pointer;

                &.active{
                    box-shadow: 2px 3px 4px #bfccde;
                    z-index: 1;
                    border-left: 3px solid #5a8af2;
                    color: #5a8af2;

                    &:before{
                        content: '';
                        position: absolute;
                        top: calc(50% - 6px);
                        left: 0;
                        height: 0;
                        width: 0;
                        border-width: 6px;
                        border-style: solid;
                        border-color: transparent transparent transparent #5a8af2;
                    }
                }
            }
        }

        .content{
            padding: 20px;
            margin-top: 10px;
            background-color: #fff;
        }

        .list-scroll-content{
            padding: 0 10px 10px 0;
        }
    }
</style>