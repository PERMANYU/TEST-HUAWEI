<template>
    <div class="offer-asset">
        <div class="header">
            <div class="app__title-1">
                <span class="app__title-name">{{componentData.titleName}}</span>
            </div>

            <ConditionSearch :data="conditionSearchData" @search="conditionSearch"></ConditionSearch>
        </div>
        <div class="array">
            <Scroll class="app__table" :isShowRight="true" :isShowBottom="true" fixedTopClassName="app__table-thead" fixedLeftClassName="app__data-none" ref="listScroll">
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

                <div v-if="!listData.length" class="app__data-none">
                    <span>暂无数据</span>
                </div>
            </Scroll>
        </div>

        <div class="content" v-show="activeRowObj.offerInstId">
            <div class="app__title-1">
                <span class="app__title-name">销售品资产信息</span>
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
                    placeholder:'请输入设备编号（实例）',
                    param: 'accNum'
                },{
                    iconfont: 'iconshenfenzheng',
                    placeholder:'请输入客户标识',
                    param: 'custId'
                }],
                conditionSearchObj:{},
                tableConfig:[{ //表格列表显示配置
                    param: 'accNum',
                    name: '设备编号（实例）',
                    width: 180
                },{
                    param: 'offerInstName',
                    name: '商品名称',
                    width: 180
                },{
                    param: 'accNum',
                    name: '根产品资产编码',
                    width: 180
                },{
                    param: 'xxxxx',
                    name: '客户名称',
                    width: 180
                },{
                    param: 'xxxxx',
                    name: '客户标识',
                    width: 180
                },{
                    param: 'xxxxx',
                    name: '客户类型',
                    width: 180
                },{
                    param: 'effDate',
                    name: '开通日期',
                    width: 180
                },{
                    param: 'expDate',
                    name: '生效日期',
                    width: 180
                },{
                    param: 'xxxxx',
                    name: '资费生效日期',
                    width: 180
                },{
                    param: 'xxxxx', //暂无
                    name: '到期日期',
                    width: 180
                }],
                tabPaneValue:this.componentData.tabPaneValue, //tabPane显示的组件
                tabPaneList:this.componentData.tabPaneList || []//tabPane所有的组件
            }
        },
        methods:{
            getListData(){ //获取列表数据
                this.$axios.get(this.$api.AssetOfferInst, {
                    params: {
                        custId: this.conditionSearchObj.custId, //'300004625491'
                        accNum: this.conditionSearchObj.accNum
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
            offerInfo: () => import('./group/offer-info'),
            offerAttr: () => import('./group/offer-attr'),
            businessHistory: () => import('./../common/business-history'),
            prodRel: () => import('./group/prod-rel')
        }
    }
</script>

<style scoped lang="scss">
    .offer-asset{
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
    }
</style>