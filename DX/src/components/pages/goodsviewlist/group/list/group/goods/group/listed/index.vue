<template>
    <div class="market">
        <div class="app__top">
            <span class="app__top-left">上市发布</span>
        </div>
        <Scroll class="scroll" :isShowRight="true">
            <ul>
                <li v-if="showDate(100000004)">
                    <div class="l-picture">
                        <i class="iconfont icon-bangongpingtai"></i>
                    </div>
                    <div class="l-checkbox">
                        CRM
                    </div>
                </li>

                <li v-if="showDate(100000005)">
                    <div class="l-picture">
                        <i class="iconfont icon-feiyong"></i>
                    </div>
                    <div class="l-checkbox">
                        计费
                    </div>
                </li>
            </ul>
        </Scroll>
    </div>
</template>

<script type="text/javascript">
    export default{
        props:{
            componentData:{}
        },
        data(){
            return{
                offerId: '111',
                staffId: 123,
                systemData: [],
                checkboxData: [],
                checkboxShow:'',
            }
        },
        mounted() {
            this.getSystemData();
        },
        methods: {
            //查询已选上市系统
            getSystemData() {
                this.$axios.get(this.$api.replace(this.$api.OfferReleaseSysRel, ['{offerId}'], [this.componentData.offerId]), {
                    params: {
                        
                    }
                }).then((res) => {
                    console.log(res,'上市')
                    if (res.data.success) {
                        this.systemData=res.data.offerChannelRels;
                        for(let i=0;i<this.systemData.length;i++){
                            this.checkboxData.push(this.systemData[i].rstrObjId)
                        }
                        //this.checkboxShow = this.systemData[0].rstrObjId
                        //console.log(this.checkboxShow)
                    }else{
                        this.$message.error({message: '查询失败！'});
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },
            showDate(info){
                for (var i = 0; i < this.checkboxData.length; i++) {
                    if (this.checkboxData[i] == info) {
                        return true
                    }                    
                }               
            }
        }
    }
</script>

<style scoped lang="scss">
    .market {
        width: 100%;
        height: 100%;
        .scroll {
            padding: 20px !important;
            ul {
                li {
                    width: 100px;
                    height: 120px;
                    border: 1px solid gainsboro;
                    float: left;
                    margin-right: 20px;
                    box-sizing: content-box;

                    .l-checkbox {
                        width: 100%;
                        height: 40px;
                        /* background: gainsboro; */
                        border-top: 1px solid gainsboro;
                        line-height: 40px;
                        text-align: center;
                    }

                    .l-picture {
                        width: 100%;
                        height: 80px;
                        line-height: 80px;
                        text-align: center;

                        .iconfont{
                            font-size: 40px;
                            color: $mainColor;
                        }
                    }
                }
            }
        }
    }
</style>
