<template>
    <div class="serve-event">
        <Scroll class="scroll" :isShowRight="true">
            <!--<div class="app__title app__title-bticon">关联服务事件</div>-->

            <div class="mod-title">
                <div>关联服务事件</div>
            </div>

            <div class="h-a-add">
                <!--<div class="app__btn btn-vive" @click="showVive()">服务事件视图</div>-->
                <div class="app__btn app__btn-add" @click="showVive()">服务事件视图</div>
            </div>


            <div class="main">
                <div class="sel-box">
                    <i class="title-icon"></i>
                    <span class="y-span">待选服务事件列表</span>

                    <!--选中的树-->
                    <div class="tag-box" v-show="treeModel.catalogItemName">
                        <span>{{treeModel.catalogItemName}}</span>
                        <i @click="treeModel={}"></i>
                    </div>

                    <Search class="offer-sear" placeholder="请输入事件名称"
                            @search="searchResource" ref="searchVal">
                    </Search>
                </div>

                <!--顶部-->
                <div class="top">
                    <!--目录树-->
                    <div class="t-left">
                        <Scroll :isShowRight="true" ref="scroll">
                            <TreeSimple v-for="(item,index) in tableData" :key="index" :folder="item" :keys="folderKeys"
                                        levelStr="orgLevel" v-model="treeModel"/>
                            </TreeSimple>
                        </Scroll>
                    </div>

                    <!--待选列表-->
                    <div class="t-right">
                        <div class="app__table__inner">
                            <Row class="app__table-thead">
                                <Col :span="8">服务事件编码</Col>
                                <Col :span="6">服务事件名称</Col>
                                <Col :span="6">服务事件类型</Col>
                                <Col :span="4">操作</Col>
                            </Row>

                            <Row :class="['app__table-item']" v-for="(item,index) in allServeData" :key="index">
                                <Col :span="8">{{item.eventSceneNbr ? item.eventSceneNbr : '无'}}</Col>
                                <Col :span="6">{{item.eventSceneName ? item.eventSceneName : '无'}}</Col>
                                <Col :span="6">{{item.serviceType == '1000' ?  '客帐户类'  : item.serviceType == '2000' ? '产品类-移动' : item.serviceType == '2001' ? '产品类-宽带' :  item.serviceType == '3000' ? '销售品类' : '空' }}</Col>
                                <Col :span="4">
                                    <i class="iconfont icon-weixuanzhong-fang" v-if="isShowAdd(item)" @click="clickAddBtn(item)"></i>
                                    <i class="iconfont icon-xuanzhong-fang" v-else @click="delServe(item,index)"></i>
                                </Col>
                            </Row>

                            <Row v-show="allServeData.length == 0" class="app__data-none">
                                <Col :span="24"><span>暂无数据</span></Col>
                            </Row>
                        </div>

                        <Pagination :pageIndex="pageInfo.pageIndex"
                                    :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount"
                                    :perPages=1 @change="pageChange" :isCenter="true">
                        </Pagination>
                    </div>

                </div>


                <!--已选列表-->
                <div class="sel-box">
                    <i class="title-icon"></i>
                    <span class="y-span">已选服务事件列表</span>
                </div>

                <!--底部-->
                <div class="bottom">

                    <div class="app__table__inner">
                        <Row class="app__table-thead">
                            <Col :span="5">服务事件编码</Col>
                            <Col :span="5">服务事件</Col>
                            <Col :span="10">服务提供配置</Col>
                            <Col :span="2">操作 </Col>
                        </Row>
                        <Scroll :isShowRight="true" ref="isScroll">
                            <Row :class="['app__table-item']" v-for="(item,index) in serveData" :key="index" v-if="item.statusCd!='1100'">
                                <Col :span="5">{{item.eventSceneNbr}}</Col>
                                <Col :span="5">{{item.eventSceneName}}</Col>
                                <Col :span="10">
                                    <div class="tag-box" v-show="item.serviceOfferId">
                                        <span>{{item.serviceOfferName}}</span>
                                        <i @click="delChildServe(item)"></i>
                                    </div>
                                    <div class="app__btn app__btn-add" @click="addServicePro(item)">添加</div>
                                </Col>
                                <Col :span="2" class="cursor">
                                    <i @click="delServe(item,index)">删除</i>
                                </Col>
                            </Row>

                            <Row v-show="showNoData(serveData)" class="app__data-none">
                                <Col :span="24"><span>暂无数据</span></Col>
                            </Row>
                        </Scroll>
                    </div>
                    <!-- <div class="tag-box" v-for="(item,index) in serveData" :key="index" v-if="item.statusCd!='1100'">
                        <span>{{item.eventSceneName}}</span>
                        <i @click="delServe(item,index)"></i>
                    </div>

                    <Row v-show="showNoData(serveData)" class="app__data-none">
                        <Col :span="24"><span>暂无数据</span></Col>
                    </Row> -->
                </div>

            </div>
        </Scroll>

        <!--服务事件视图-->
        <transition name="fade">
            <div class="vive-box fade-down" v-show="viveType">
                <!--关闭-->
                <div class="close" @click="hideVive()"><i></i></div>
                <!--弹框标题-->
                <div class="vive-title"><i></i>服务事件视图</div>

                <Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title">
                    <!--折线图-->
                    <div class="line-chart"></div>

                    <!--类型解释-->
                    <!--<div class="explain">-->
                        <!--<div class="box">-->
                            <!--<span class="span1 blue"></span>-->
                            <!--<span class="span2">销售品类</span>-->
                        <!--</div>-->
                        <!--<div class="box">-->
                            <!--<span class="span1 yellow"></span>-->
                            <!--<span class="span2">产品类</span>-->
                        <!--</div>-->
                        <!--<div class="box">-->
                            <!--<span class="span1 red"></span>-->
                            <!--<span class="span2">客账户类</span>-->
                        <!--</div>-->
                    <!--</div>-->

                    <!--数据列表-->
                    <table class="v-table">
                        <thead class="thead">
                            <tr  class="tr-2">
                                <th width="25%"></th>
                                <th width="25%"></th>
                                <th width="25%"></th>
                                <th width="25%"></th>
                            </tr>

                            <tr class="tr-3">
                                <th width="25%">入网期</th>
                                <th width="25%">成熟期</th>
                                <th width="25%">衰退期</th>
                                <th width="25%">离网期</th>
                            </tr>
                        </thead>

                        <tbody class="tbody">
                            <tr class="tr-4">
                                <!--入网期-->
                                <td  width="25%">
                                    <div class="box" v-for="(item,index) in viveListData.offerEvtSceNetins" v-show="index < netins">
                                        <span class="span1" :class="getclassName(item)"></span>
                                        <span class="span2" @click="detClick(item,$event)">{{item.eventSceneName ? item.eventSceneName:'---'}}</span>
                                    </div>

                                    <div class="more">
                                        <span v-show="netins < viveListData.offerEvtSceNetins.length"
                                              @click="netins = netins + 5 ">更多...
                                        </span>
                                    </div>
                                </td>

                                <!--成熟期-->
                                <td width="25%">
                                    <div class="box" v-for="(item,index) in viveListData.offerEvtSceMatures" v-show="index < matures">
                                        <span class="span1" :class="getclassName(item)"></span>
                                        <span class="span2" @click="detClick(item,$event)">{{item.eventSceneName ? item.eventSceneName:'---'}}</span>
                                    </div>

                                    <div class="more">
                                        <span v-show="matures < viveListData.offerEvtSceMatures.length"
                                              @click="matures = matures+5">更多...
                                        </span>
                                    </div>
                                </td>

                                <!--衰退期-->
                                <td width="25%">
                                    <div class="box" v-for="(item,index) in viveListData.offerEvtSceDeclines" v-show="index < declines">
                                        <span class="span1" :class="getclassName(item)"></span>
                                        <span class="span2" @click="detClick(item,$event)">{{item.eventSceneName ? item.eventSceneName:'---'}}</span>
                                    </div>

                                    <div class="more">
                                        <span v-show="declines < viveListData.offerEvtSceDeclines.length"
                                              @click="declines = declines+5">更多...
                                        </span>
                                    </div>
                                </td>

                                <!--离网期-->
                                <td width="25%">
                                    <div class="box" v-for="(item,index) in viveListData.offerEvtSceOffnets" v-show="index < offnets">
                                        <span class="span1" :class="getclassName(item)"></span>
                                        <span class="span2" @click="detClick(item,$event,'offnets')">{{item.eventSceneName ? item.eventSceneName:'---'}}</span>
                                    </div>

                                    <div class="more">
                                        <span v-show="offnets < viveListData.offerEvtSceMatures.length"
                                              @click="offnets = offnets+5">更多...
                                        </span>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </Scroll>

                <!--详情弹框-->
                <div class="detail-box" ref="detailBox" v-show="eventSceneId">
                    <!--关闭按钮-->
                    <div class="close" @click="eventSceneId = ''"><i></i></div>
                    <div class="title">{{boxtTitle}}</div>

                    <div class="content">
                        <div>
                            <label>触发条件：</label>
                            <span>{{triggers}}</span>
                        </div>
                        <div>
                            <label>提醒内容：</label>
                            <span>{{reminding}}</span>
                        </div>
                        <div>
                            <label>触发通道：</label>
                            <Radio disabled name="radio" label="1000" v-model="radioInfo">短信</Radio>
                            <Radio disabled name="radio" label="1100" v-model="radioInfo">邮箱</Radio>
                            <Radio disabled name="radio" label="1200" v-model="radioInfo">ITV弹框</Radio>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <Dialog :dialogSize="dialogSizeSev" class="h-dialog" :dialogTitle="dialogTitle" ref="addServicePro" @confirm="addServerSubmit">
            <Scroll class="main-server">
                <Tree v-for="(item,index) in serverOfferData"  v-model="selTemplateType" :selLevel="2" :folder="item" :key="index" :children-str="'children'" :init-level="2" :level-str="'level'" :keys="treeShowKeyItems" ></Tree>
            </Scroll>
        </Dialog>

        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
    </div>
</template>

<script type="text/javascript">
    export default {
        props:{
            componentData:{}
        },
        data() {
            return {
                eventSceneId: '',
                radioInfo: '',
                triggers:'',//触发条件
                reminding:'',//提醒内容
                boxtTitle: '',   //标题
                netins: 5,    //入网期最大显示条数
                matures: 5,    //成熟期最大显示条数
                declines: 5,    //衰退期最大显示条数
                offnets: 5,    //离网期最大显示条数

                offerId: '111',

                treeShowKeyItems: [{ key: 'serviceOfferName' }],
                dialogTitle:'',

                folderKeys: [
                    {key: 'catalogItemName'}      //组织名称
                ],
                //目录树数据
                tableData: [],
                searchResourceData:'',
                treeModel: {},    //选中的目录树

                serveData: [],           //服务事件列表
                allServeData: [],        //待选服务列表
                viveType: false,    //视图弹框显示
                //视图弹窗列表数据
                viveListData: {
                    offerEvtSceNetins: [],
                    offerEvtSceMatures: [],
                    offerEvtSceDeclines: []
                },
                dialogSizeSev: {
                    size: 70,
                    min: 500,
                    max: 600
                },

                dialogSize: {
                    size: 90,
                    min: 800,
                    max: 1000
                },
                tipInfo: {
                    iconType:1,
                    msg:'',
                    showBtn:{
                        clear: true,
                        save: true
                    }
                },
                pageInfo: {
                    pageIndex: 1, // 当前页
                    pageSize: 5, // 每页条数
                    pageCount: 0, // 总页数
                    rowCount: 0 // 总条数
                },
                serverOfferData:[],//配置树数据
                selTemplateType:'',//配置树数据
                serviceOffers:[],//配置数据组
                addServiceItem:'',
            }
        },
        watch:{
            //监听目录变化
            treeModel(curVal){
                this.$refs.searchVal.setValue('');
                this.searchResourceData = '';
                this.pageInfo.pageIndex = 1;
                this.getList(curVal.catalogItemId);
            }

        },
        mounted() {
            this.offerId = this.componentData.offerId;
            // this.offerId = 300188530;
//            this.offerId = 300230010;
            this.getServeData();     //获取服务事件列表
            this.getViveData();       //获取弹窗折线图列表
            this.getList();           //获取待选列表
            this.getTreeData();      //查询树
        },

        methods: {
            //点击视图-事件名称
            detClick(item,e,type){
                if(this.eventSceneId != item.eventSceneId){
                    this.eventSceneId = item.eventSceneId;
                    this.boxtTitle=item.eventSceneName;

                    //调用详情接口
                    this.getDetail();
                }else{
                    this.eventSceneId='';
                }
                if(type!='offnets'){
                    this.$refs.detailBox.style.left = e.clientX+30+'px';
                    this.$refs.detailBox.style.top = e.clientY-210+'px';
                }else{
                    this.$refs.detailBox.style.left = e.clientX-400+'px';
                    this.$refs.detailBox.style.top = e.clientY-210+'px';
                }

            },
            searchResource (data) {
                this.searchResourceData = data;
                this.pageInfo.pageIndex = 1;
				this.getList(this.treeModel.catalogItemId)
            },

            addServicePro(item) {//服务事件配置
            this.addServiceItem = item;
            if(!this.addServiceItem.serviceOffers) {
                this.addServiceItem['serviceOffers'] = [];
            }
                this.dialogTitle = '服务提供配置';
                this.$axios.get(this.$api.QueryServiceOffer,{
                }).then( res => {
                    if(res.data.success) {
                        this.serverOfferData = res.data.servicesOffer;
                    } else {
                        this.$message.error({message:res.data.msg})
                    }
                }).catch( err => {
                    this.$message.error({message:err.response.data.msg});
                })
                this.$refs.addServicePro.show();
            },

            delChildServe(item) {//服务事件配置单独删除
            	item.serviceOfferId = '';
            	item.serviceOfferName = '';
//              if(item.serviceOffers.find(obj => obj.serviceOfferId == childItem.serviceOfferId&&obj.operType!='1100')){
//                  for(let i=0;i<item.serviceOffers.length;i++){
//                      if(childItem.serviceOfferId==item.serviceOffers[i].serviceOfferId){
//                         item.serviceOffers[i].operType = '1100';
//                      }
//                  }
//              }else{
//                  item.serviceOffers=item.serviceOffers.filter(obj => obj.serviceOfferId!=childItem.serviceOfferId||obj.operType == '1100');
//              }
            },

            addServerSubmit() { //confirm按钮
                console.log(this.selTemplateType,"selTemplateType");
                console.log(this.addServiceItem)
                this.addServiceItem.serviceOfferId = this.selTemplateType.serviceOfferId;
                this.addServiceItem.serviceOfferName = this.selTemplateType.serviceOfferName;
//              if(this.selTemplateType){
//              	this.addServiceItem.serviceOffers = [];
//              	let addObj = {
//	                    "serviceOfferId":this.selTemplateType.serviceOfferId,
//	                    "parServiceOfferId":this.selTemplateType.parServiceOfferId,
//	                    "serviceOfferName":this.selTemplateType.serviceOfferName,
//	                    "serviceOfferDesc":this.selTemplateType.serviceOfferDesc,
//	                    "operType":"1000"        
//	                }
//              	this.addServiceItem.serviceOffers.push(addObj)
//              }

                this.$refs.isScroll.init();
                this.$refs.addServicePro.hide();
                this.selTemplateType = '';
            },


            //点击视图事件名称获取详情信息
            getDetail(){
                this.$axios.get(this.$api.OfferEvtSceChartDetail,{
                    params:{
                        eventSceneId: this.eventSceneId ?  this.eventSceneId : ""
                    }
                }).then(res => {
                    if (res.data.success) {
                        if(res.data.mktCamChlConf){
                            this.radioInfo = res.data.mktCamChlConf[0].contactChlId;
                            this.triggers = res.data.mktCamChlConf[0].evtContactConfName;
                            this.reminding = res.data.mktCamChlConf[0].remark;
                        }

                    }else{
                        this.$message.error({message: '获取详情失败！'})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                });
            },

            //查询树
            getTreeData() {
                this.$axios.get(this.$api.OfferCatalogRel,{
                    params:{
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.tableData = res.data.offerCatalogRelsDTO;

                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },

            showVive(){
                this.getViveData();
                this.viveType=true;
                this.netins=5;
                this.matures=5;
                this.declines=5;
            },
            hideVive(){
                this.viveType=false;
            },

            //根据类型返回class名称adapterProductsType 客账户1000,产品1100,销售品1200
            getclassName(item){
                if(item.adapterProductsType=='1000'){
                    return 'red';
                }else if(item.adapterProductsType=='1100'){
                    return 'yellow';
                }else if(item.adapterProductsType=='1200'){
                    return 'blue';
                }
            },

            //获取视图弹窗信息(折线图列表)
            getViveData(){
                this.$axios.get(this.$api.replace(this.$api.OfferEvtSceChartRel, ['{offerId}'], [this.offerId]),{
                    params:{
                        offerId: this.offerId
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.viveListData = res.data;
                    }else{
                        this.$message.error({message: '信息获取失败！'})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                });
            },

            //获取已选列表
            getServeData() {
                this.$axios.get(this.$api.replace(this.$api.OfferEvtSceRel, ['{offerId}'], [this.offerId]), {
                    params: {
						objId: this.offerId
                    }
                }).then(res => {
                    if(res.data.success == true) {
                        this.serveData = res.data.offerEvtSceRels || [];

                        for(let i =0;i<this.serveData.length;i++){
                            this.serveData[i].iType = 'native';
                        }
                    } else {
                        this.$message.error({ message: '已选列表查询失败！'});
                    }
                }).catch(error => {
                    this.$message.error({ message: '服务器异常！' });
                })
            },

            //获取待选列表
            getList(catalogItemId){
                this.$axios.get(this.$api.OfferEvtSceQry, {
                    params: {
                        catalogItemId: catalogItemId ?　catalogItemId : '',
                        offerId: this.offerId,
                        eventSceneName:this.searchResourceData,
                        page: this.pageInfo.pageIndex,
                        limit: 5,
                    }
                }).then(res => {
                    if(res.data.success == true) {
                        this.pageInfo = {
                            pageIndex: res.data.offerEvtSceQrys.page,
                            pageSize: res.data.offerEvtSceQrys.limit,
                            rowCount: res.data.offerEvtSceQrys.total,
                            pageCount: Math.ceil(res.data.offerEvtSceQrys.total/res.data.offerEvtSceQrys.limit)
                        };
                        this.allServeData = res.data.offerEvtSceQrys.content||[];

                    } else {
                        this.$message.error({ message: '待选列表查询失败！' });
                    }
                }).catch(error => {
                    this.$message.error({ message: '服务器异常！' });
                })
            },
            pageChange(page) {
                this.pageInfo.pageIndex = page;
                this.getList(this.treeModel.catalogItemId);
            },

            //是否显示待选列表添加按钮
            isShowAdd(item){
                return !this.serveData.find(obj => obj.eventSceneId == item.eventSceneId && obj.statusCd!='1100');
            },
            //点击待选列表添加
            clickAddBtn(item){
                this.serveData.push(item);
            },
            //删除主页服务事件
            delServe(item,index) {
                   
                if(item.serviceOffers && item.serviceOffers.length) {
                    item.serviceOffers.forEach(item => {
                        item.operType = '1100'
                    })
                }
                if(this.serveData.find(obj => obj.eventSceneId == item.eventSceneId&&obj.iType == 'native'&&obj.statusCd!='1100')){
                    for(let i=0;i<this.serveData.length;i++){
                        if(item.eventSceneId==this.serveData[i].eventSceneId){
                            this.serveData[i].statusCd = '1100';
                        }
                    }
                }else{
                    this.serveData=this.serveData.filter(obj => obj.eventSceneId!=item.eventSceneId||obj.statusCd == '1100');
                }
            },

            //点击底部保存
            save(callback) {
                let newArr = [];
                this.serveData.forEach(item => {
                   let obj = {
                        catalogName: "",
                        eventSceneDesc: item.eventSceneDesc,
                        eventSceneId: item.eventSceneId,
                        mktCampaignId : item.eventSceneId,
                        eventSceneName: item.eventSceneName,
                        eventSceneNbr: item.eventSceneNbr,
                        objId: this.offerId,
                        statusCd:item.statusCd,
                        offerSceneRelId: item.offerSceneRelId,
                        serviceOfferId:item.serviceOfferId
                    };
                    newArr.push(obj);
                });
                this.serveData = [...newArr];
                //循环set字段offerId
                for(let i=0;i<this.serveData.length;i++){
                    this.serveData[i].offerId = this.offerId;
                    if(!this.serveData[i].statusCd){
                        this.serveData[i].statusCd = '1000'
                    }
                }

                this.$axios.post(this.$api.replace(this.$api.OfferEvtSceRel, ['{offerId}'], [this.offerId]), {
                    eventScenes: this.serveData
                }).then(res => {
                    if(res.data.success == true) {
                        this.$message.success({ message: '操作成功！'});
                        callback(true)
                        this.getServeData();
                    } else {
                        this.$message.error({ message: '操作失败！'});
                        callback(false)
                    }
                }).catch(error => {
                    this.$message.error({message: error.response.data.msg})
                    callback(false)
                })
            },

            showNoData(data){
                return !data.find( obj => obj.statusCd != '1100');
            }
        }
    }
</script>

<style scoped lang="scss">
    /*字符超出隐藏*/
    .app__cut-txt{
        overflow: hidden;
        white-space: nowrap;
        word-wrap: normal;
        text-overflow: ellipsis;
    }

    /*视图弹框动画效果*/
    .fade-enter-active,
    .fade-leave-active {
        transition: all .3s ease;
    }
    .fade-enter,
    .fade-leave-to {
        top: -100% !important;
    }


    /*模块标题*/
    .mod-title{
        width: 100%;
        height: 30px;
        background-color: #f5f6fa;
        border-radius: 16px 16px 0 0;

        div{
            width: 120px;
            height: 30px;
            background-color: $mainColor;
            border-radius: 16px 0 0 0;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            color: white;
        }
    }

    /*查看视图按钮*/
    .h-a-add {
        padding: 10px 0;
    }


    /*服务事件*/
    .serve-event {
        width: 100%;
        height: 100%;

        .scroll {
            .app__table {
                .span {
                    color: $mainColor;
                    padding: 0 5px;
                    cursor: pointer;
                }
            }
        }
    }

    .main {
        padding-top: 0;

        /*顶部*/
        .top {
            width: 100%;
            height: 330px;

            .t-left {
                float: left;
                width: 30%;
                padding-left: 20px;
                border: 1px solid #f6f6f6;

                .scroll {
                    height: 310px;
                }
            }
            .t-right {
                float: right;
                width: 69%;
                height: 312px;
                border-bottom: solid 1px #f6f6f6;
            }
        }

        /*底部*/
        .bottom{
            border: solid 1px #f6f6f6;
            padding: 10px;
        }
        .tag-box{
            display: inline-block;
            padding: 10px;
            margin-right: 2px;
            border: solid 1px #d5e8f9;
            background-color: #eff7fd;
            color: $mainColor;
            line-height: 10px;

            i{
                display: inline-block;
                width: 8px;
                height: 8px;
                cursor: pointer;
                margin-left: 10px;
                background: url("./../../images/bqsc.png") no-repeat;
                background-size: cover;
            }
        }

        .cursor {
            cursor: pointer;
            color: $mainColor;
            i {
                font-style: normal;
            }
        }

        /*表格标题+搜索框*/
        .sel-box{
            width: 100%;
            line-height: 50px;
            padding: 0 20px 0 10px;
            border-left: solid 1px #f6f6f6;
            border-top: solid 1px #f6f6f6;
            border-right: solid 1px #f6f6f6;

            .tag-box{
                line-height: 0;
            }
            /*图标*/
            i.title-icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                background: url("./../../images/sjicon.png") no-repeat;
                background-size: cover;
                vertical-align: text-top;
            }
            /*表格标题样式*/
            .y-span {
                display: inline-block;
                margin-left: 4px;
                color: $mainColor;
                font-size: 14px;
                font-weight: bold;
            }
            /*搜索框样式*/
            .offer-sear{
                float: right;
                width: 25%;
                margin-top: 4px;
            }
        }
    }



    /*服务事件视图样式*/
    .vive-box {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background-color: white;

        .app__table {
            height: calc(100% - 50px);
        }

        /*关闭按钮*/
        .close {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 9;
            cursor: pointer;

            i {
                display: block;
                width: 18px;
                height: 18px;
                background: url("./images/clear.png") no-repeat;
                background-size: cover;
            }
        }
        /*标题*/
        .vive-title {
            margin: 20px;
            margin-bottom: 10px;
            line-height: 16px;
            font-size: 16px;
            color: #333333;

            i {
                float: left;
                width: 16px;
                height: 16px;
                margin-right: 10px;
                background: url("./images/business.png") no-repeat;
                background-size: cover;
                vertical-align: middle;
            }
        }

        /*折线图*/
        .line-chart{
            position: absolute;
            top :10px;
            left: 0;
            z-index: 9;
            width: 82%;
            height: 260px;
            background: url("./images/pic_03.png") no-repeat;
            background-size: 100% 100%;
        }

        /*列表数据类型说明*/
        .explain{
            position: absolute;
            top : 160px;
            right: 40px;
            z-index: 9;

            .box{
                width: 100%;
                line-height: 20px;
                margin-top: 10px;
                padding-left: 30px;
                text-align: left;

                .span1{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    border-radius: 8px;
                    vertical-align: baseline;
                    float: none;
                    margin-top: 0;
                }
                .span2{
                    width: 60px;
                    font-size: 14px;
                    margin-left: 8px;
                }
                span.blue{
                    background-color: $mainColor;
                }
                span.yellow{
                    background-color: #ff9900;
                }
                span.red{
                    background-color: #ff5556;
                }
            }
        }

        .v-table{
            width: 100%;
            border-collapse:collapse;
            position: relative;
            z-index: 1;

            .box{
                width: 100%;
                line-height: 20px;
                margin-top: 10px;
                padding-left: 30px;
                text-align: left;

                .span1{
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-radius: 3px;
                    background-color: #d5d5d5;
                    float: left;
                    margin-top: 7px;
                }
                .span2{
                    display: inline-block;
                    width: 88%;
                    margin-left: 10px;
                    font-size: 12px;
                    color: #555555;
                    word-wrap: break-word;
                    cursor: pointer;
                }
                span.blue{
                    background-color: $mainColor;
                }
                span.yellow{
                    background-color: #ff9900;
                }
                span.red{
                    background-color: #ff5556;
                }
            }

            .tr-2{
                height: 280px;
                th{
                    border-top: none;
                }
            }
            .tr-4{
                padding-bottom: 30px;
                height: 200px;
            }

            th {
                border: solid 1px #d5d5d5;
                line-height: 40px;
                font-size: 14px;
            }
            td{
                vertical-align: top;
                border: solid 1px #d5d5d5;
                border-bottom: none;
                max-width: 0;

            }
            th:first-child,
            td:first-child{
                border-left: none;
            }
            th:last-child,
            td:last-child{
                border-right: none;
            }

            /*加载更多*/
            .more{
                margin: 20px 0;
                color: $mainColor;
                font-size: 12px;
                span{
                    margin-left: 30px;
                    cursor: pointer;
                }
            }

        }
    }

    /*事件详情弹框*/
    .detail-box{
        position: absolute;
        left: 100px;
        top: 100px;
        z-index: 99;
        width: 360px;
        min-height: 220px;
        padding-bottom: 20px;
        background-color: white;
        border-radius: 6px;
        box-shadow: #aaaaaa 0 0 10px;

        .close{
            top: 16px;
            right: 10px;
            i{
                width: 12px;
                height: 12px;
            }
        }
        .title{
            width: 100%;
            padding: 10px 20px;
            border-bottom: solid 1px #f6f6f6;
            font-size: 14px;
            font-weight: bold;
            color: #333333;
            text-align: center;
            line-height: 24px;
        }
        .content{
            width: 100%;
            div{
                margin-top: 16px;
                label{
                    display: inline-block;
                    width: 100px;
                    text-align: right;
                    vertical-align: top;
                    color: #333333;
                }
                span{
                    display: inline-block;
                    width: 240px;
                    line-height: 20px;
                    text-align: left;
                    color: #999999;
                }
                .radio{
                    margin: 0;
                    margin-right: 4px;
                    color: #999999;
                }
            }
        }
    }

    .main-server {
        padding-left: 40px;
        padding-top: 10px;
    }

</style>
