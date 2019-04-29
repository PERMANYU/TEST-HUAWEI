<template>
    <div id="content">
        <div class="content">
            <div class="pane">
                <div class="p-title">
                    <div class="p-t-block active">
                        <i class="iconfont"></i>
                        <span>客户信息</span>
                    </div>
                </div>
                <div class="p-content">
                    <div class="p-search">
                        <div class="custBox">
                            <Select :data="custArray" v-model="custType" name="custType" :isNullSel="false"></Select>
                        </div>
                        <div class="sear">
                            <Input placeholder="请输入客户名称" v-model="searchObj.requirementName"></Input>
                            <span class="p-s-go"></span>
                        </div>
                    </div>
                    <span class="more">更多</span>
                    <Scroll class="app__table__inner" :isShowBottom="true" :isShowRight="true"  fixedTopClassName="m-title" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
                        <DragGroup ref="titleWidth" class="m-title app__table-thead" :inline="true" :titleList="tableTitleData">
                            <Col class="m-t-name app__table-left" :width="180">
                                <span>客户名称</span>
                            </Col>
                            <DragItem :width="item.width" 
                                :value="item"
                                v-for="(item,index) in tableTitleData"
                                :key="index">
                                <span>{{item.name}}</span>
                            </DragItem>
                        </DragGroup>
                        <Row :class="['m-item app__table-item']" :inline="true" v-for="(item,index) in tableItemData" :key="index">
                            <!-- <Col :width="60" class="app__table-left">
                                <Checkbox name="checkbox1" :label="item" v-model="checkboxData"></Checkbox>
                            </Col> -->
                            <Col :width="180" :title="item['custName']" @click.native.stop="detailClick(item)" class="m-i-name app__table-left overflow-style">{{item['custName']}}</Col>
                            <Col :inline="true" :width="tableItem.width" class="overflow-style" :title="item[tableItem.param]" v-for="(tableItem,tableIndex) in tableTitleData" :key="tableIndex">
                                <span>
                                    {{item[tableItem.param]}}
                                </span>
                            </Col>
                        </Row>
                        <Row :style="dynamicWidth"  :class="['m-item app__table-item']" v-for="item in (20 - tableItemData.length)" :key="item.id"></Row>
                    </Scroll>
                </div>
                <div class="p-footer" v-if="tableItemData.length>0">
                    <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @pageChange="pageChange">
                    </Pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                pageInfo: {
                    pageIndex: 1, // 当前页
                    pageSize: 20, // 每页条数
                    pageCount: 0, // 总页数
                    rowCount: 0 // 总条数
                },
                searchObj: {
                    requirementName: ''
                },
                tableTitleData:[
                    {
                        name:'客户标识',
                        param:'custNumber',
                        span:2,
                        width: 180
                    },{
                        name:'客户类型',
                        param:'custType',
                        span:2,
                        width: 120
                    },{
                        name:'客户子类型',
                        param:'custSubType',
                        span:2,
                        width: 120
                    },{
                        name:'证件类型',
                        param:'certType',
                        span:2,
                        width: 160
                    },{
                        name: '证件号码',
                        param: 'certNum',
                        width: 200
                    },{
                        name:'所属二级单位',
                        param:'xParentBureauName',
                        span:3,
                        width: 180
                    },{
                        name:'集团分群一层',
                        param:'groupDivided1',
                        span: 3,
                        width: 160
                    },{
                        name:'集团分群二层',
                        param:'groupDivided2',
                        span: 3,
                        width: 160
                    },{
                        name: '客户经理工号',
                        param: 'staffCode',
                        width: 160
                    },{
                        name: '根客户名称',
                        param: 'rootCustName',
                        width: 180
                    },{
                        name: '根客户标识',
                        param: 'rootCustId',
                        width: 120
                    }
                ],
                tableItemData: [],
                dynamicWidth: '',        // 动态宽度
                custArray: [
                    {
                        label: '我的政企客户',
                        value: '1'
                    }
                ],
                custType: '1'
            }
        },
        mounted() {
            this.getDynamicWidth();
            this.getListData();
        },
        methods: {
            // 获取表格标题宽度，动态计算空余行的宽度
            getDynamicWidth() {
                this.dynamicWidth = {
                    width: this.$refs.titleWidth.$el.clientWidth + 'px'
                }
            },
            //获取客户数据列表
            getListData () {
                let createStaff = this.$user.getStaffId()
                this.$axios.get(this.$api.adddClientDistribution, {
                    params: {
                        certNum: '',
                        // createStaff: createStaff,
                        custName: '',
                        custNumber: '',
                        custType: '1000'
                    }
                }).then(res => {
                    if (res.data) {
                        this.tableItemData = res.data
                        // this.tableItemData.filter(item => item.custType = item.custType.split('|')[1])
                        // this.tableItemData.filter(item => item.certType = item.certType.split('|')[1])
                    } else {
                        this.$message.error({"message": "请求失败"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            pageChange() {

            }
        }
    }
</script>


<style lang="scss" scoped>
    
    #content {
        background: #f8f8f8;
        height: calc(100% - 260px);
        padding-top:15px;
        .content {
            height: 100%;
            background: #fff;
            border-top: 2px solid #e9e9e9;

            .pane {
                width: 100%;
                height: 100%;
                background-color: #fff;
                .p-title {
                    width: 100%;
                    height: 30px;
                    line-height: 29px;
                    border-top: 1px solid #e9e9e9;
                    background-color: #fafafa;
                    .p-t-block {
                        display: block;
                        width: 150px;
                        top: 0;
                        text-align: center;
                        font-size: 12px;
                        border-top-left-radius: 4px;
                        border-top-right-radius: 4px;
                        color: #254063;
                        float: left;
                        transition: all .3s ease;
                        cursor: pointer;
                        &.active {
                            height: 35px;
                            line-height: 32px;
                            top: -5px;
                            color: $mainColor;
                            border-top: 3px solid $mainColor;
                            background-color: #fff;
                            box-shadow: 1px -1px 1px 0px rgba(3, 0, 0, 0.09);
                        }
                        .iconfont {
                            font-size: 12px;
                        }
                        .t-b-count {
                            color: #ff8f04;
                        }
                    }
                }
                .p-content {
                    width: 100%;
                    height: calc(100% - 80px);
                    padding: 20px 20px 0;
                    .span{
                        color: $mainColor;
                        cursor: pointer;
                    }
                    .p-search {
                        width: 40%;
                        height: 36px;
                        line-height: 36px;
                        .iconfont {
                            position: absolute;
                            left: 0;
                            top: 12px;
                            width: 40px;
                            height: 16px;
                            line-height: normal;
                            color: $mainColor;
                            font-size: 16px;
                            text-align: center;
                            border-right: 1px solid #eee;
                            z-index: 1;
                        }
                        .sear {
                            /deep/ input{
                                height: 36px;
                                padding: 0 60px 0 130px;
                                border-radius: 0;
                            }
                            .p-s-go {
                                position: absolute;
                                right: 0;
                                top: 2px;
                                width: 54px;
                                height: 36px;
                                background-image: url(./images/go.png);
                                background-repeat: no-repeat;
                                background-position: center;
                                cursor: pointer;
                            }
                        }
                    }
                    .scroll {
                        height: calc(100% - 50px) !important;
                        margin-top: 14px;
                    }
                    .icon-xiugai,
                    .icon-peizhi {
                        cursor: pointer;
                    }
                }
                .icon-sousuo1130:before{
                    content: "";
                    background: url(./images/go.png);
                }
                .p-footer {
                    height: 50px;
                }
            }
        }
    }
    /*列表样式*/
    .app__table__inner{
        .app__table-thead {
            font-weight: bold;
            background-color: #f5f6fa;
            border: 1px solid #eee;

            .app__table-left,.app__table-right{
                background-color: #f5f6fa;
            }

            >.col {
                text-align: left;
                padding-left: 15px;
            }
        }

        .app__table-item{
            color: #647283;

            border:{
                width: 1px;
                style: solid;
                color: transparent #eee #eee;
            }

            >.col {
                text-align: left;
                padding-left: 15px;
            }

            &:hover {
                color: $mainColor;
                .app__table-left,.app__table-right{
                    background-color: #fff;
                }
            }
        }
    }
    .app__table__inner .app__table-item .app__table-left, .app__table__inner .app__table-item .app__table-right {
        background-color: #fff;
    }
    .custBox {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        width: 120px;
        height: 36px;
        .select {
            height: 36px;

            /deep/ input {
                margin-top: 3px;
                height: 36px;
                border: none;
                background: none;
            }
        }
        
    }
    .more{
        position: absolute;
        right: 20px;
        top: 32px;
        font-size: 14px;
        font-weight: bold;
        color: $mainColor;
        cursor: pointer;
    }
    


    // 媒体查询
@media screen and (min-width: 1200px) and (max-width: 1366px) {
    .content {
        width: 1200px;
        margin: 0 auto;
    }
}
@media screen and (min-width: 1367px) and (max-width: 1920px) {
    #content {
        padding: 20px 270px 0;
    }
}
</style>
