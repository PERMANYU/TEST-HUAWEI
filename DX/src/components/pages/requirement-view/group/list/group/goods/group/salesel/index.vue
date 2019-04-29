<template>
    <div class="channel-basic">
        <div class="app__top">
            <span class="app__top-left">促销资源</span>
        </div>
        <div class="a-v-table app__table__inner">
            <Row class="app__table-thead">
                <Col :span="8">编码</Col>
                <Col :span="8">营销资源名称</Col>
                <Col :span="6">关系类型</Col>
            </Row>

            <Row :class="['app__table-item']" v-for="(item,index) in saleselData" :key="index">
                <Col :span="8">{{item.objNbr}}</Col>
                <Col :span="8">{{item.objName}}</Col>
                <Col :span="6">
                    <Select v-model="item.relType" :data="chooseOption" disabled></Select>
                </Col>
            </Row>
        </div>
        <div class="bottom">
            <Row v-show="saleselData.length == 0" class="app__data-none">
                <Col :span="24"><span>暂无数据</span></Col>
            </Row>
        </div>

        <div class="app__top top2">
            <span class="app__top-left">促销资源组</span>
        </div>
        <div class="group">
            <div class="tag-box" v-for="(item,index) in saleselData2" :key="index">
                <span>{{item.objName}}</span>
            </div>          
        </div>
        <div class="bottom">
            <Row v-show="saleselData2.length == 0" class="app__data-none">
                <Col :span="24"><span>暂无数据</span></Col>
            </Row>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        props:{
            componentData:{}
        },
        data() {
            return {
                saleselData:[],
                saleselData2:[],
                chooseOption: [
                    { value: "1001", label: "租用" },
                    { value: "1002", label: "赠送" },
                    { value: "1003", label: "购买" },
                    { value: "1100", label: "用户自备" },
                    { value: "1200", label: "合作伙伴提供" }
                ],
            }
        },
        watch: {
            componentData(val) {
                this.getData();
            }   
        },
        mounted() {
            //this.offerId = this.componentData.offerId;
            this.getData();
        },
        
        methods: {
            getData() {
                this.$axios.get(this.$api.OfferGetList+'/'+this.componentData.offerId+'/offerResRel',{
                    params: {

                    }
                }).then((res) => {
                    console.log(res,'促销资源')
                    if (res.data.success) {
                        this.saleselData=res.data.offerResRels;
                        this.saleselData2=res.data.offerResGrpRels;
                        
                    }else{
                        this.$message.error({message: '查询失败！'});
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },

        }
    }
</script>

<style scoped lang="scss">
    .channel-basic {
        width: 100%;
        height: 100%;
        margin-bottom: 20px;
        .top2{
            margin-top: 80px;
        }
        .group {
            .tag-box {
                display: inline-block;
                padding: 10px;
                margin: 10px;
                border: solid 1px #d5e8f9;
                background-color: #eff7fd;
                color: #5c9cf3;
                font-size: 12px;
            }
            .col {
                background: #eff6fc;
                margin-right: 10px;
                margin-bottom: 10px;
                padding-left: 10px;
                color: $mainColor;
                span {
                    display: block;
                    width: 8px;
                    height: 8px;
                    position: absolute;
                    right: 10px;
                    top: 18px;
                    cursor: pointer;
                }
            }
        }
    }
    
   
</style>
