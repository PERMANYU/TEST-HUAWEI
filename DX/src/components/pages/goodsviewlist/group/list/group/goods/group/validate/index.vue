<template>
    <div class="system">
        <Scroll class="scroll" :isShowRight="true">
            <div class="app__title ">
                <i class="iconfont icon-jibenxinxi"></i>
                <span>系统测试</span>
            </div>

            <!--系统名称-->
            <ul>
                <li :class="{'active':systemNbr=='CRM'}" @click="systemClick('CRM')">CRM
                </li>
                <li :class="{'active':systemNbr=='ABP'}" @click="systemClick('ABP')">计费
                </li>
                <li :class="{'active':systemNbr=='WD'}" @click="systemClick('WD')">网厅
                </li>
            </ul>

            <!--测试场景详情-->
            <div v-for="(item,index) in sceneData" :key="index">
                <!--title-->
                <div class="app__title ">
                    <i class="iconfont icon-jibenxinxi"></i>
                    <span>测试场景详情</span>
                </div>

                <Row class="app__table-thead test-scene">
                    <Col :span="6" :offset="1">
                        <label class="label">名称：</label>
                        <span class="span">{{item.sceneName}}</span>
                    </Col>

                    <Col :span="6">
                        <label class="label">前序场景：</label>
                        <span class="span">{{item.preorderScene}}</span>
                    </Col>

                    <Col :span="10">
                        <label class="label">描述：</label>
                        <span class="span">{{item.sceneDesc}}</span>
                    </Col>                    
                </Row>

                <!--测试用例列表-->
                <div class="app__table">
                    <Row class="app__table-thead">
                        <Col :span="5">测试用例名称</Col>
                        <Col :span="5">测试指标名称</Col>
                        <Col :span="5">测试结果</Col>
                        <Col :span="5">测试结果说明</Col>
                        <Col :span="4">附件</Col>
                    </Row>

                    <Row :class="['app__table-item']" v-for="(item2,index2) in item.offerSysTestCases" :key="index2">
                        <Col :span="5">{{item2.testCaseName}}</Col>
                        <Col :span="5">{{item2.testIndex}}</Col>
                        <Col :span="5">{{item2.testResult==='1'?'通过':item2.testResult==='2'?'不通过':'---'}}</Col>
                        <Col :span="5"><span class="span">查看</span></Col>
                        <Col :span="4"><span class="span" @click="downLoad(item)">下载</span></Col>
                    </Row>

                    <!--暂无数据-->
                    <div class="app__data-none" v-show="!isShowNoData2(item.offerSysTestCases)">
                        <span>暂无数据</span>
                    </div>

                </div>
            </div>
            <!--业务测试-->
            <div class="app__title ">
                <i class="iconfont icon-jibenxinxi"></i>
                <span>业务测试</span>
            </div>
            <div class="app__table">
                <Row class="app__table-thead">
                    <Col :span="2">序号</Col>
                    <Col :span="7">测试场景名称</Col>
                    <Col :span="12">测试场景说明</Col>
                    <Col :span="3">测试结果</Col>
                </Row>
                <Row :class="['app__table-item']" v-for="(item,index) in offerBasicArray" :key="index">
                    <Col :span="2">{{index + 1}}</Col>
                    <Col :span="7">{{item.testSceneName}}</Col>
                    <Col :span="12">{{item.testSceneDesc}}</Col>
                    <Col :span="3">{{item.testResult == 1 ? '通过' : '不通过'}}</Col>
                </Row>
                <Row v-show="offerBasicArray.length == 0" class="app__data-none">
                    <Col :span="24"><span>暂无数据</span></Col>
                </Row> 
            </div>
        </Scroll>

    </div>
</template>

<script type="text/javascript">
    export default {
        props:{
            componentData:{}
        },
        data() {
            return {
                offerSysTestCases:[],
                staffId: 123,         //登录人id
                offerId: '111',       //销售品id
                systemNbr: 'ABP',
                offerBasicArray: [],
                sceneIndex: '',      //被操作的测试用例所在场景的索引
                //测试结果
                testResultData: [
                    {name: '通过',value: '1'},
                    {name: '不通过',value: '2'}
                ],
                //添加测试场景
                addForm: {
                    systemInfo: '',         //系统信息
                    serviceOfferId: '',        //场景类型
                    sceneName: '',           //场景名称
                    preorderScene: '',        //前序场景
                    sceneDesc: '',           //场景描述
                },
                //添加测试用例
                addForm2: {
                    testCaseName: '',        //测试用例名称
                    testIndex: '',           //测试指标
                    testResult: '',         //测试结果
                    testResultDesc: '',      //测试结果说明
                },

                //测试场景列表
                sceneMainData:[],
                sceneData: [],

                dialogSize: {
                    size: 40,
                    min: 500,
                    max: 500
                },
                testData: [
                    {name:'CRM',id:'100000001',nbr:'CRM'},
                    {name:'计费',id:'100000002',nbr:'ABP'},
                    {name:'网厅',id:'100000003',nbr:'WD'},
                ],
                tabIndex: 0
            }
        },
        mounted() {
            //this.offerId = this.componentData.offerId;
            this.gteSystemData();
            this.getBussTest();
        },
        methods: {
            //获取系统测试信息
            gteSystemData() {   
                this.$axios.get(this.$api.replace(this.$api.OfferSysTestScene, ['{offerId}'], [this.componentData.offerId]), {
                    params: {
                        systemInfoId: 0
                    }
                }).then((res) => {
                    console.log(res,'系统测试')
                    if (res.data.success) {
                        this.sceneMainData = res.data.offerSysTestScenes;
                        this.sceneData.push(res.data.offerSysTestScenes[0]);
                        this.systemNbr = this.sceneData[0].systemNbr
                    }else {
                        this.$message.error({ message: '操作失败！'});
                    }
                }).catch(error => {

                })
            },
            getBussTest() {
                this.$axios.get(this.$api.replace(this.$api.OfferBussTest, ["{offerId}"], [this.componentData.offerId]), {

                }).then(res => {
                    if(res.data.success) {
                        this.offerBasicArray = res.data.offerBussTestDTOList || [];
                    } else {
                        this.$message.error({ message: res.data.msg })
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg });
                })
            },

            //是否显示测试场景暂无数据
            isShowNoData(systemNbr){
                return this.sceneData.find( obj => obj.systemNbr == systemNbr);
            },
            //是否显示测试用例暂无数据
            isShowNoData2(data){
                return data.find( obj => obj.statusCd != '1100');
            },
            downLoad(item) {
                window.open(this.$api.Shtelpaasstorage + item.docLink)
            },
            systemClick(info){                
                for (var i = 0; i < this.sceneMainData.length; i++) {
                    if (this.sceneMainData[i].systemNbr == info) {
                        this.systemNbr = info;
                        this.sceneData.splice(0,1,this.sceneMainData[i]);
                    }                    
                }
            }


        }
    }
</script>

<style scoped lang="scss">
    .system {
        width: 100%;
        height: 100%;
        .scroll {
            padding: 0 20px 20px !important;
            .h-a-add {
                position: absolute;
                top: 15px;
                right: 0;
                height: 30px;
            }
            ul {
                width: 100%;
                height: 50px;
                li {
                    width: 100px;
                    height: 30px;
                    border: 1px solid $mainColor;
                    background: #ffffff;
                    line-height: 30px;
                    text-align: center;
                    float: left;
                    border-radius: 5px;
                    margin-left: 30px;
                    color: $mainColor;
                    cursor: pointer;
                    &:hover {
                        background: $mainColor;
                        color: #ffffff;
                    }
                }
                .active {
                    background: $mainColor;
                    color: #ffffff;
                }
            }
            .app__table {
                .span {
                    color: $mainColor;
                    padding: 0 5px;
                    cursor: pointer;
                }
            }
        }
        .main {
            padding: 20px;
            .a-info {
                padding-top: 30px;
                margin-bottom: 30px;
                .s-span {
                    padding: 5px 10px;
                    background: #00c0fd;
                    color: #ffffff;
                    border-radius: 4px;
                }
                .radio{
                    margin-left: 4px;
                }
            }
        }

        /*测试场景详情*/
        .test-scene{
            .add-col{
                text-align: right;
                padding-right: 10px;
            }

            .label{
                color: #333333;
            }
            .span{
                color: #888888;
            }
        }
    }
</style>
