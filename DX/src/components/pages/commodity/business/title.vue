<template>
    <div class="box">
        <div class="title">
            <span class="back iconfont icon-fanhui1122" @click="backClose()"></span>
            <!--<span class="t-name" @click="clickShowBox()">-->
            <span class="t-name" :title="componentData.offerName">
                {{componentData.offerName}}
                <!--<span class="iconfont icon-xiala12" v-if="componentData.requirementId"></span>-->
            </span>

            <span class="close" v-show="componentData.showRightTopClose" @click="backClose()"></span>

            <!--绑定销售品下拉框-->
            <div class="goods-list" v-show="showGbType">
                <div class="list-box">
                    <div class="g-item" v-for="(item,index) in offerList" :key="index">
                        <span class="g-name">{{item.offerName}}</span>

                        <span class="iconfont icon-peizhimulu" v-if="componentData.statusCd=='1200'"
                              @click="clickCopy(item)"></span>
                        <span class="iconfont icon-shanchu" v-if="componentData.statusCd=='1200'"
                              @click="clickDel(item)"></span>
                    </div>
                </div>

                <div class="add-btn" @click="clickAddGoods()">+ 添加销售品</div>
            </div>

            <!--遮罩-->
            <div class="shade" v-show="showGbType" @click="showGbType=false"></div>

        </div>




        <!--基于销售品复制弹框-->
        <Dialog class="add-goods" dialogTitle="添加销售品" :dialogSize="{min: 950,max: 1000}" ref="addGoods"
                @confirm="addConfirm">
            <div class="d-tab">
                <Radio name="addType" label="1000" v-model="addType" @change="activeOfferId=''">基于模板创建</Radio>
                <Radio name="addType" label="1100" v-model="addType" @change="activeOfferId=''">从其他销售品种复制</Radio>
            </div>

            <div class="main">
                <!--基于模板创建-->
                <div class="templet-box" v-if="addType=='1000'">
                    <div class="t-item" :class="{active:item.offerId==activeOfferId}" @click="activeOfferId=item.offerId"
                         v-for="(item,index) in tempData" :key="index">
                        <span class="iconfont icon-weixuanzhong-yuan" v-show="item.offerId!=activeOfferId"></span>
                        <span class="iconfont icon-xuanzhong-yuan" v-show="item.offerId==activeOfferId"></span>
                        <span>{{item.offerName}}</span>
                    </div>
                </div>

                <!--从其他销售品种复制-->
                <div class="copy-box" v-if="addType=='1100'">
                    <div class="sel-box">
                        <i class="title-icon"></i>
                        <span class="y-span">选择销售品</span>

                        <Search class="offer-sear" placeholder="请输入销售品内部名称"
                                @search="search" ref="searchVal">
                        </Search>
                    </div>

                    <!--目录树-->
                    <div class="t-left">
                        <Scroll :isShowRight="true" ref="scroll">
                            <TreeSimple :folder="tableData" :keys="folderKeys"
                                        levelStr="orgLevel" v-model="treeModel"/>
                            </TreeSimple>
                        </Scroll>
                    </div>

                    <!--待选销售品列表-->
                    <div class="t-right">
                        <div class="app__table__inner">
                            <Row class="app__table-thead">
                                <Col :span="4">选择</Col>
                                <Col :span="10">销售品内部名称</Col>
                                <Col :span="10">销售品编码</Col>
                            </Row>

                            <Row :class="['app__table-item']" v-for="(item,index) in offerData" :key="index">
                                <Col :span="4" class="col-box">
                                    <i class="select" :class="{active:activeOfferId==item.offerId}" @click="selectClick(item)"></i>
                                </Col>
                                <Col :span="10" class="app__cut-txt" :title="item.offerSysName">{{item.offerSysName ? item.offerSysName : '---'}}</Col>
                                <Col :span="10" class="app__cut-txt" :title="item.offerNbr">{{item.offerNbr ? item.offerNbr : '---'}}</Col>
                            </Row>

                            <Row v-show="offerData.length === 0" class="app__data-none">
                                <Col :span="24"><span>暂无数据</span></Col>
                            </Row>
                        </div>

                        <Pagination :pageIndex="pageInfo.pageIndex"
                                    :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount"
                                    :perPages=1 @change="pageChange" :isCenter="true">
                        </Pagination>
                    </div>
                </div>
            </div>
        </Dialog>

        <!--操作确认框-->
        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>

    </div>
</template>

<script type="text/javascript">
	export default{
		props:{
            componentData:{}
		},
		data(){
			return{
                offerList: [],    //下拉框里的商品列表
                itemInfo: {},     //存储被操作的数据
                tipType: '',      //操作类型
                tipInfo: {
                    iconType: 1,
                    msg: '',
                    showBtn: {
                        clear: true,
                        save: true
                    }
                },
                addType: '1000',   //弹框中的销售品添加类型1000:模板,1100:复制
                tempData: [],    //模板列表
                activeOfferId: '',    //被复制的模板或销售品id
                copyType: null,    //模板复制传1，销售品复制不传



                folderKeys: [
                    {key: 'catalogItemName'}
                ],
                //目录树数据
                tableData: {
                    catalogItemName: '销售品目录',
                    children: []
                },
                treeModel: {},    //选中的目录树
                catalogItemId: '',    //选中的商品目录Id

                offerData: [],        //待选销售品列表
                selectOfferId: '',    //选中的销售品Id
                pageInfo: {
                    pageIndex: 1,   // 当前页
                    pageSize: 5,    // 每页条数
                    pageCount: 0,   // 总页数
                    rowCount: 0     // 总条数
                },
                offerName: '',


                showGbType: false,   //是否展示绑定销售品下拉框
			}
		},

        watch:{
            //监听目录变化
            treeModel(curVal){
                this.catalogItemId=curVal.catalogItemId;
                this.pageChange(1);
            }
        },

		mounted(){
            this.getNeedId();
		},

		methods:{
            //查询此销售品是否关联了需求单
            getNeedId(){
                this.$axios.get(this.$api.QureyRequirementList, {
                    params: {
                        offerId: this.componentData.offerId,
                        requestType: '11',         //销售品类型传'11'
                        page: 1,
                        limit: 100
                    }
                }).then(res => {
                    if(res.data.success) {
                        if(res.data.requirementPage.content.length===0){
                            this.componentData.requirementId=null;
                        }else{
                            this.componentData.requirementId=res.data.requirementPage.content[0].requirementId;
                            this.componentData.statusCd=res.data.requirementPage.content[0].statusCd;
                        }

                        this.$emit('bindRequirementId');
                    } else {
                        this.$message.error({ "message": "关联需求单查询失败！" })
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg})
                })
            },

            //点击标题显示销售品列表
            clickShowBox(){
                if(this.componentData.requirementId){
                    this.showGbType=!this.showGbType;
                    if(this.showGbType){
                        this.getGoodsList();
                    }
                }
            },

            //调用销售品列表接口
            getGoodsList(){
                this.$axios.get(this.$api.RequirementList, {
                    params: {
                        requirementId: this.componentData.requirementId,
                        userId: this.$user.getInfo().id
                    }
                }).then(res => {
                    if(res.data.success) {
                        this.offerList=res.data.offerList;
                    } else {
                        this.$message.error({ "message": "销售品列表查询失败！" })
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg})
                })
            },

            //点击复制
            clickCopy(item){
                this.tipType = 'copy';
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `是否确认复制此记录？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();

                this.activeOfferId=item.offerId;
                this.copyType=null;
            },
            //点击删除
            clickDel(item){
                this.tipType = 'del';
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `是否确认删除此记录？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();

                this.itemInfo=item;
            },
            //点击确认操作
            tipConfirm(){
                if(this.tipType=='copy'){
                    this.getCopy();
                }else if(this.tipType=='del'){
                    this.getDel();
                }
            },

            //调用销售品复制接口
            getCopy(){
                this.$axios.get(this.$api.OfferCopy,{
                    params:{
                        offerId: this.activeOfferId,
                        requirementId: this.componentData.requirementId,
                        copyType: this.copyType,       //模板复制传1，复制不传
                        createStaff: this.$user.getInfo().id,
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.getGoodsList();
                        this.$refs.tip.hide();
                        this.$refs.addGoods.hide();

                    }else{
                        this.$message.error({message: '操作失败！'})
                    }
                }).catch( error => {
                    this.$message.error({message: '服务器异常！'})
                })
            },
            //调用删除需求单成员接口
            getDel(){
                this.$axios.delete(this.$api.replace(
                    this.$api.DelRequirementRow,
                    ['{requirementId}','{requestMemberId}'],
                    [this.componentData.requirementId,this.itemInfo.memberId]),{

                    params: {
                        staff: this.$user.getInfo().id,
                    }
                }).then(res => {
                    if(res.data.success === true){
                        this.$message.success({message: '删除成功！'});
                        this.getGoodsList();
                        this.$refs.tip.hide();

                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },


            //点击添加销售品按钮
            clickAddGoods(){
                this.$refs.addGoods.show();
                this.activeOfferId='';

                this.getTempData();     //查询模板列表
                this.getTreeData();    //查询树
                this.gatGoodsData();   //查询被复制的商品列表
            },
            //获取模板列表
            getTempData(){
                this.$axios.get(this.$api.OrdOffer,{
                    params:{
                        statusCd: 1001
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.tempData=res.data.offerPage.content;

                    }else{
                        this.$message.error({message: '模板列表查询失败！'})
                    }
                }).catch( error => {
                    this.$message.error({message: '服务器异常！'})
                })
            },
            addConfirm(){
                if(this.activeOfferId){
                    if(this.addType=='1000'){
                        this.copyType=1;
                        this.getCopy();

                    }else if(this.addType=='1100'){
                        this.copyType=null;
                        this.getCopy();
                    }
                }else{
                    this.$message.error({message: '请先选择一条记录！'})
                }

            },




//            //获取销售品目录树
//            getTreeData() {
//                this.$axios.post(this.$api.QryCatalogDetail,{
//                    body:{
//                        catalogNbr:738
//                    }
//                }).then(res => {
//                    if (res.data.code=='000000') {
//                        this.tableData.children = res.data.body.catalogItems;
//
//                    }else{
//                        this.$message.error({message: res.data.msg})
//                    }
//                }).catch( error => {
//                    this.$message.error({message: error.response.data.msg})
//                })
//            },

            //获取销售品目录树
            getTreeData() {
                this.$axios.get(this.$api.Catalog+'/10102',{
                    params:{

                    }
                }).then(res => {
                    if (res.data.success) {
                        this.tableData.children = res.data.catalogDetail.catalogItems||[];

                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },

            //商品列表
            gatGoodsData() {
                this.$axios.get(this.$api.OrdOffer,{
                    params: {
                        offerSysName: this.offerSysName,
                        offerNbr: '',
                        statusCd: '',
                        offerType: '',
                        catalogItemId: this.catalogItemId,
                        page: this.pageInfo.pageIndex,
                        limit: this.pageInfo.pageSize,
                    }
                }).then(res => {
                    if(res.data.success) {
                        this.pageInfo = {
                            pageIndex: res.data.offerPage.page,
                            pageSize: res.data.offerPage.limit,
                            rowCount: res.data.offerPage.total,
                            pageCount: Math.ceil(res.data.offerPage.total/res.data.offerPage.limit)
                        };
                        this.offerData = res.data.offerPage.content;

                    } else {
                        this.$message.error({ "message": "销售品列表查询失败！" })
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！" })
                })
            },
            pageChange(page) {
                this.pageInfo.pageIndex = page;
                this.gatGoodsData();
            },
            search(val){
                this.offerSysName=val;
                this.pageChange(1);
            },
            //点击被复制的销售品
            selectClick(item){
                if(this.activeOfferId!=item.offerId){
                    this.activeOfferId=item.offerId;
                }else{
                    this.activeOfferId='';
                }
            },





            backClose(){
                this.$emit('backClose');
            },
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

    .box{
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
    }
    /*销售品标题样式*/
    .title{
        width: 100%;
        line-height: 50px;
        font-size: 16px;
        text-align: center;
        position: relative;

        .t-name{
        	display: block;
        	width: 50%;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            color: #5383c3;
            margin: 0 auto;
            overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
        }

        .t-btn{
            display: inline-block;
            width: 100px;
            height: 30px;
            line-height: 30px;
            margin-left: 30px;
            font-size: 12px;
            color: white;
            text-align: center;
            background-color: $mainColor;
            cursor: pointer;
            &:hover{
                background-color: #33cdff;
            }
        }

        .close{
            position: absolute;
            display: block;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            background: url(../images/close_page.png) no-repeat center;

            &:hover{
                opacity: .8;
            }
        }

        .back{
            position: absolute;
            left: 0;
            top: 10px;
            height: 30px;
            line-height: 30px;
            width: 55px;
            color: $mainColor;
            background-color: #fff;
            cursor: pointer;

            &:hover{
                color: #749dd4;
            }
        }
    }

    /*遮罩样式*/
    .shade{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 8;
        width: 100%;
        height: 100%;
        background-color: transparent;
        cursor: pointer;
    }

    /*绑定销售品下拉框样式*/
    .goods-list{
        position: absolute;
        top: 52px;
        left: 0;
        z-index: 9;
        width: 100%;
        padding: 10px 0;
        padding-bottom: 60px;
        background-color: white;
        box-shadow: 0 3px 6px #c2d4ee;
        line-height: 36px;

        .list-box{
            width: 100%;
            height: 180px;
            overflow: auto;

            .g-item{
                font-size: 14px;
                color: #555555;
                line-height: 32px;

                .g-name{
                    margin-right: 30px;
                }
                .iconfont{
                    margin-left: 6px;
                    font-size: 14px;
                    color: $mainColor;
                    cursor: pointer;
                }

                &:hover{
                    color: $mainColor;
                    background-color: #fbfbfb;
                }
            }
        }
        .add-btn{
            position: absolute;
            bottom: 20px;
            left: 50%;
            width: 160px;
            height: 30px;
            line-height: 30px;
            margin-left: -80px;
            font-size: 14px;
            text-align: center;
            color: white;
            background-color: $mainColor;
            cursor: pointer;
            &:hover{
                background-color: #7baef5;
            }
        }
    }

    /*添加销售品弹框样式*/
    .add-goods{

        .content{
            width: 100%;
            height: 100%;

            .main{
                width: 100%;
                height: 360px;
                padding: 0 20px;
            }
        }

        //操作切换样式
        .d-tab{
            padding: 20px;
            padding-bottom: 10px;

            .radio{
                margin-right: 20px;
            }
        }

        /*模板创建样式*/
        .templet-box{
            width: 100%;
            padding-top: 20px;

            .t-item{
                display: inline-block;
                padding: 10px;
                background-color: #fefefe;
                margin-right: 10px;
                cursor: pointer;
                font-size: 14px;
                color: #222222;
                border: solid 1px #f0f0f0;

                .iconfont{
                    font-size: 12px;
                    vertical-align: 1px;
                    color: $mainColor;
                }

                /*选中的样式*/
                &.active{
                    background-color: $mainColor;
                    color: white;

                    .iconfont{
                        color: white;
                    }
                }
            }
        }

        /*复制样式*/
        .copy-box{
            .sel-box{
                width: 100%;
                line-height: 40px;

                .tag-box{
                    line-height: 0;
                }
                /*图标*/
                i.title-icon{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: url("./../images/sjicon.png") no-repeat;
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
                    width: 40%;
                }
            }

            .t-left {
                width: 34%;
                height: 300px;
                float: left;
                text-align: left;

                .scroll {
                    border: 1px solid gainsboro;
                }
            }
            .t-right {
                width: 65%;
                height: 100%;
                float: right;
                text-align: left;

                /*选择样式*/
                .col-box{
                    .select{
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        background: url("./../images/choosebox-none.png") no-repeat;
                        background-size: 100% 100%;
                        vertical-align: text-bottom;
                        cursor: pointer;
                    }

                    .active{
                        background: url("./../images/choosebox-blue.png") no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }

</style>
