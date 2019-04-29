<template>
    <div class="offer-prod-rel">
        <div class="header">
            <div class="app__title-1">
                <span class="app__title-name">销售品产品关系</span>
            </div>

            <ConditionSearch :data="conditionSearchData" @search="conditionSearch"></ConditionSearch>
        </div>
        <div class="array">
            <Scroll class="app__table" :isShowRight="true" :isShowBottom="true" fixedTopClassName="app__table-thead" fixedLeftClassName="app__data-none" ref="listScroll">
                <Row class="app__table-thead" inline>

                    <Col :width="tableItem.width" v-for="(tableItem,tableIndex) in tableConfig" :key='tableIndex'>{{tableItem.name}}</Col>
                </Row>
                <Row :class="['app__table-item',item.rowActive ? 'active' : '']" 
                    v-for="(item,index) in listData" 
                    :key="index" 
                    @click.native="rowClick(item)"
                    inline>

                    <Col :width="tableItem.width" 
                        v-for="(tableItem,tableIndex) in tableConfig" 
                        :key='tableIndex'>{{item[tableItem.param]}}</Col>
                </Row>

                <div v-if="!listData.length" class="app__data-none">
                    <span>暂无数据</span>
                </div>
            </Scroll>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default{
        data(){
            return{
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
                    param:'prodName',
                    name:'产品名称',
                    width:180
                },{
                    param:'roleName',
                    name:'产品角色',
                    width:180
                },{
                    param:'statusCd',
                    name:'状态',
                    width:180
                },{
                    param:'accNum',
                    name:'设备号',
                    width:180
                },{
                    param:'beginRentDate',
                    name:'起租时间',
                    width:180
                },{
                    param:'stopRentDate',
                    name:'到期时间',
                    width:180
                },{
                    param:'effDate',
                    name:'生效时间',
                    width:180
                },{
                    param:'expDate',
                    name:'失效时间',
                    width:180
                },{
                    param:'stateEffDate',
                    name:'停机时间',
                    width:180
                },{
                    param:'stateExpDate',
                    name:'复机时间',
                    width:180
                }],
            }
        },
        methods:{
            getRelListData(){
                this.$axios.get(this.$api.QueryAssertInfo, {
                    params: {
                        //客户标识
                        //设备号
                    }
                }).then(res => {
                    
                    
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            conditionSearch(obj){ //列表查询
                this.conditionSearchObj = obj;
                this.getRelListData();
            }
        }
    }
</script>

<style scoped lang="scss">
    .offer-prod-rel{
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
        }
    }
</style>