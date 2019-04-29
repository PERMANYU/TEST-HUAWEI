<template>
    <div class="list">
        <div class="header">
            <div class="app__title-1">
                <span class="app__title-name">设备清单</span>
            </div>

            <ConditionSearch :data="conditionSearchData" @search="conditionSearch"></ConditionSearch>
        </div>
        <div class="array">
            <Scroll class="app__table" :isShowRight="true" fixedTopClassName="app__table-thead">
                <Row class="app__table-thead">
                    <Col :span="8">
                        <span>设备号</span>
                    </Col>
                    <Col :span="8">
                        <span>商品名称</span>
                    </Col>
                    <Col :span="8">
                        <span>安装地址</span>
                    </Col>
                </Row>
                <Row class="app__table-item" 
                    v-for="(item,index) in listData" 
                    :key="index">
                    <Col :span="8">
                        <span>{{item.accNum}}</span>
                    </Col>
                    <Col :span="8">
                        <span>{{item.xxxxx}}</span>
                    </Col>
                    <Col :span="8">
                        <span>{{item.xxxxx}}</span>
                    </Col>
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
                    placeholder:'请输入设备号',
                    param: 'accNum'
                }],
                conditionSearchObj:{},
                tableConfig:[{ //表格列表显示配置
                    param: 'accNum',
                    name: '设备号',
                    span: 6
                },{
                    param: 'xxxx',
                    name: '商品名称',
                    span: 6
                },{
                    param: 'xxxx',
                    name: '安装地址',
                    span: 12
                }]
            }
        },
        methods:{
            getGroupProdData(){ //获取列表数据
                this.$axios.get(this.$api.GroupProdInstList, {
                    params: {
                        accNum: this.conditionSearchObj.custId, //'300004625491'
                        prodCompType: '13'
                    }
                }).then(res => {

                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            conditionSearch(obj){ //列表查询
                this.conditionSearchObj = obj;
                this.getGroupProdData();
            }
        }
    }
</script>

<style scoped lang="scss">
    .list{
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