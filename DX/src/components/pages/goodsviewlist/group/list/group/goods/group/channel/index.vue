<template>
    <div class="channel-basic">
        <div class="app__top">
            <span class="app__top-left">关联销售渠道</span>
        </div>
        <div class="group">
            <Row>
                <Col :span="4" v-for="(item,index) in channelData" class="match" :key="index"><a :title="item.channelName">{{item.channelName}}</a><span class="span" @click="getChannelRels(item)"></span></Col>
            </Row>
            <Row v-show="channelData.length == 0" class="app__data-none">
                <Col :span="24"><span>暂无数据</span></Col>
            </Row>  
        </div>
        <Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="渠道策略" ref="getOfferChannelRels" :initBtn="true">
            <Scroll>
                <Row>
                    <Col :span="24">
                        <FormItem labelWidth="110px" labelText="渠道名称：">
                            {{channelObj.channelName}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span="24">
                        <FormItem labelWidth="110px" labelText="销售渠道脚本：">
                            {{channelObj.script}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span="22">
                        <FormItem labelWidth="110px" labelText="渠道酬金模板：" >
                            {{channelObj.policyTemplate}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span="22">
                        <FormItem labelWidth="110px" labelText="选择酬金规则：">
                            {{channelObj.policyRuleRel}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span="24">
                        <FormItem labelWidth="110px" labelText="渠道积分：">
                            {{channelObj.policyIntegral}}
                        </FormItem>
                    </Col>
                </Row>
            </Scroll>
            <template slot="btnBox">
                <span class="back" @click="btnCancel()">返回</span>
            </template>
        </Dialog>
    </div>
</template>

<script type="text/javascript">
    export default {
        props:{
            componentData:{}
        },
        data() {
            return {
                dialogSize: {
                    size: 60,
                    min: 600,
                    max: 600
                },
                channelData: [],
                channelObj: {}
            }
        },
        mounted() {
            //this.offerId = this.componentData.offerId;
            this.getData();
        },
        
        methods: {
            getData() {
//                this.$axios.get(this.$api.replace(this.$api.OfferChannelStrategy, ['{offerId}'], [this.componentData.offerId]), {
                this.$axios.get(this.$api.replace(this.$api.OfferChannelRel, ['{offerId}'], [this.componentData.offerId]), {
                    params: {
                        limit: '',
                        page: '1'
                    }
                }).then((res) => {
                    console.log(res,'销售渠道')
                    if (res.data.success) {
                        this.channelData = res.data.offerRestrictList;
                    }
                })
            },
            getChannelRels(item){
                this.channelObj = item;
                this.$refs.getOfferChannelRels.show();
            },
            btnCancel() {
                this.$refs.getOfferChannelRels.hide();
            }
        }
    }
</script>

<style scoped lang="scss">
    .channel-basic {
        width: 100%;
        height: 100%;
        .group{
            .match {
                background: #eff6fc;
                margin-right: 10px;
                margin-bottom: 10px;
                padding-left: 10px;
                color: $mainColor;
                font-size: 12px;
                .span {
                    display: block;
                    width: 11px;
                    height: 12px;
                    background: url(images/see.png) no-repeat;
                    position: absolute;
                    top: 16px;
                    right: 14px;
                    cursor: pointer;
                }
                a {
                    display: inline-block;
                    width: 80%;
                    height: 28px;
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
        .scroll{
            z-index: 10;
            padding: 20px 20px !important;
        }
    }
    
   
</style>