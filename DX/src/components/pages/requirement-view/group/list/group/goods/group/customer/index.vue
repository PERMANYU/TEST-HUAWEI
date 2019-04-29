<template>
    <div class="channel-basic">
        <div class="app__top">
            <span class="app__top-left">服务事件</span>
        </div>
        <div class="group">
            <Row>
                <Col :span="4" v-for="(item,index) in customerData" :key="index"><span>{{item.eventSceneName}}</span></Col>
            </Row> 
        </div>
        <div>
            <Row v-if="!customerData.length" class="app__data-none">
                <Col :span="24"><span>当前无数据</span></Col>
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
                customerData:[]
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
                this.$axios.get(this.$api.OfferGetList+'/'+this.componentData.offerId+'/offerEvtSceRel', {
                    params: {
                        
                    }
                }).then((res) => {
                    console.log(res,'服务事件')
                    if (res.data.success) {
                        this.customerData = res.data.offerEvtSceRels;
                    }
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
        .group {
            .col {
                background: #eff6fc;
                margin-right: 10px;
                margin-bottom: 10px;
                padding-left: 10px;
                color: $mainColor;
                span {
                    position: absolute;
                    left: 8px;
                    top: 8px;
                    line-height: 1;
                    cursor: default;
                }
            }
        }
    }
    
   
</style>