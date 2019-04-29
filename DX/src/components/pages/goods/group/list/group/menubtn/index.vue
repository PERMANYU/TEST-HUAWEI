<template>
    <div class="menu-btn">
        <!--需求单状态为新建时显示-->
        <div class="btn-box" v-if="actType!='MOD'">
        	<div class="app__btn app__btn-add" @click="derive" v-if="showNeedBtn">导出</div>
            <div class="app__btn app__btn-add" @click="clickNew()" v-if="showNeedBtn">新建需求单</div>
            <div class="app__btn app__btn-add" @click="clickFound()">基于模板创建</div>
            <div class="app__btn app__btn-add" @click="clickCopy()">基于销售品复制</div>
            <div class="app__btn app__btn-add" @click="clickFast()">创建销售品</div>
        </div>

        <!--需求单状态为变更时显示-->
        <div class="btn-box" v-if="actType=='MOD'">
            <div class="app__btn app__btn-add" @click="clickBinding()">绑定销售品</div>
        </div>


        <!--基于模板创建弹框-->
        <Dialog :dialogSize="{min: 420,max: 450}" class="h-dialog" :dialogTitle="dialogTitle" ref="found" :initBtn="true">
            <div class="template-box">
                <Radio name="radio" :label="item.offerId" v-model="selectOfferId"
                       v-for="(item,index) in tempData" :key="index">{{item.offerName}}
                </Radio>
            </div>

            <!--自定义按钮-->
            <template slot="btnBox">
                <span class="next" @click="configClick()" >配置</span>
                <span class="back" @click="btnCancel()">取消</span>
            </template>
        </Dialog>

        <!--基于销售品复制弹框-->
        <Dialog :dialogSize="{size: 80,min: 940,max: 1200}" class="h-dialog" :dialogTitle="dialogTitle"
                ref="copy" :initBtn="true">

            <Row>
                <Col :span="8" class="search-box">
                    <Search placeholder="请输入销售品内部名称或内部编码" @search="search"></Search>
                </Col>
            </Row>

            <div class="main">
                <!--目录树-->
                <div class="t-left">
                    <span class="t-span">销售品目录</span>
                    <Scroll :isShowRight="true" ref="scroll">
                        <TreeSimple :folder="tableData" :keys="folderKeys"
                              levelStr="orgLevel" v-model="treeModel"/>
                        </TreeSimple>
                    </Scroll>
                </div>

                <!--待选销售品列表-->
                <div class="t-right">
                    <span class="t-span">销售品列表</span>
                    <div class="app__table__inner">
                        <Row class="app__table-thead">
                            <Col :span="4">选择</Col>
                            <Col :span="14">销售品内部名称</Col>
                            <Col :span="6">内部编码</Col>
                        </Row>

                        <Row :class="['app__table-item']" v-for="(item,index) in offerList" :key="index">
                            <Col :span="4" class="col-box">
                                <i :class="['iconfont',selectOfferId==item.offerId ? 'icon-xuanzhong-fang' : ' icon-weixuanzhong-fang']" @click="selectClick(item)"></i>
                            </Col>
                            <Col :span="14" class="app__cut-txt" :title="item.offerSysName">{{item.offerSysName ? item.offerSysName : '---'}}</Col>
                            <Col :span="6" class="app__cut-txt" :title="item.offerNbr">{{item.innerNbr ? item.innerNbr : '---'}}</Col>
                        </Row>

                        <Row v-show="offerList.length == 0" class="app__data-none">
                            <Col :span="24"><span>暂无数据</span></Col>
                        </Row>
                    </div>

                    <Pagination :pageIndex="pageInfo.pageIndex"
                                :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount"
                                :perPages=1 @change="pageChange" :isCenter="true">
                    </Pagination>
                </div>
            </div>

            <!--自定义按钮-->
            <template slot="btnBox">
                <span class="next" @click="configClick()" >配置</span>
                <span class="back" @click="btnCancel()">取消</span>
            </template>
        </Dialog>

    </div>
</template>

<script>
	export default {
		name: 'menubtn',

        props:{
            showNeedBtn: {
                type: Boolean,
                default: true
            },
            requirementId: {
                type:Number,
                default:null
            },
            actType: {
                type:String,
                default:''
            },
            checkArr: {
            	type: Array,
            	default:[]
            }
        },
		data() {
			return {
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

                offerList: [],        //待选销售品列表
                selectOfferId: '',    //选中的销售品Id

                pageInfo: {
                    pageIndex: 1,   // 当前页
                    pageSize: 6,    // 每页条数
                    pageCount: 0,   // 总页数
                    rowCount: 0     // 总条数
                },
                offerName: '',
                dialogTitle: '基于模板创建',
                tempData: [],     // 模板数据
                copyType: null,    //模板复制传1，销售品复制不传
                checkArrTemp: []
			}
		},
        watch:{
            //监听目录变化
            treeModel(curVal){
                this.catalogItemId=curVal.catalogItemId;
                this.pageChange(1);
            },
            checkArr(val,oldval){
            	this.checkArrTemp = val;
            }

        },
		mounted() {
            
		},
		methods: {
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
                //需求单状态为新建时调用((过程表))
                if(this.actType!='MOD'){

                    let testOfferName = this.offerSysName,
                        testInnerNbr = this.offerSysName;
                    if(/^(2-)/.test(testOfferName)){
                        testOfferName = '';
                    }else{
                        testInnerNbr = '';
                    }

                    this.$axios.get(this.$api.OrdOffer,{
                        params: {
                            offerSysName: testOfferName,
                            offerInnerNbr: this.offerInnerNbr,
                            offerNbr: '',
                            statusCd: '',
                            offerType: '',
                            innerNbr: testInnerNbr,
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
                            this.offerList = res.data.offerPage.content;

                        } else {
                            this.$message.error({ "message": "销售品列表查询失败！" })
                        }
                    }).catch(error => {
                        this.$message.error({ "message": "服务器异常！" })
                    })

                }else{
                    //需求单状态为变更时调用(正式表)
                    this.$axios.get(this.$api.OfferGetList,{
                        params: {
                            offerSysName: this.offerSysName,
                            offerInnerNbr: this.offerInnerNbr,
                            offerNbr: '',
                            statusCd: '1000',
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
                            this.offerList = res.data.offerPage.content;

                        } else {
                            this.$message.error({ "message": "销售品列表查询失败！" })
                        }
                    }).catch(error => {
                        this.$message.error({ "message": "服务器异常！" })
                    })
                }
            },
            pageChange(page) {
                this.pageInfo.pageIndex = page;
                this.gatGoodsData();
            },
            search(val){
                // this.offerSysName=val;
                this.offerInnerNbr=val;
                this.pageChange(1);
            },

            //点击模板创建
            clickFound() {
                if(this.tempData.length===0){
                    this.getTempData();    //查询模板
                }

                this.dialogTitle='基于模板创建';
                this.$refs.found.show();
                this.selectOfferId='';
            },
            //点击销售品复制
            clickCopy() {
                if(this.tableData.children.length===0){
                    this.getTreeData();    //查询树
                }
                this.offerName = '';
                this.pageChange(1);

                this.dialogTitle='基于销售品复制';
                this.$refs.copy.show();
                this.selectOfferId='';
            },
            //点击急速配置
            clickFast() {
                this.getFastInfo();
            },

            //关闭弹框
            btnCancel(){
                this.$refs.found.hide();
                this.$refs.copy.hide();
            },
            //点击弹框配置
            configClick(){
                if(this.dialogTitle=='基于销售品复制'){
                    if(this.selectOfferId){
                        this.copyType=null;
                        this.getCopyInfo();
                    } else{
                        this.$message.error({message: '请选择一条记录！'});
                    }
                }else if(this.dialogTitle=='基于模板创建'){
                    if(this.selectOfferId){
                        this.copyType = 1;
                        this.getCopyInfo();
                    } else{
                        this.$message.error({message: '请选择一条记录！'});
                    }
                }else if(this.dialogTitle=='绑定销售品'){
                    if(this.selectOfferId){
                        this.getBinding();
                    } else{
                        this.$message.error({message: '请选择一条记录！'});
                    }
                }
            },
            //点击被复制的销售品
            selectClick(item){
                if(this.selectOfferId!=item.offerId){
                    this.selectOfferId=item.offerId;
                }else{
                    this.selectOfferId='';
                }
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


            //调用复制接口
            getCopyInfo(){
                this.$axios.get(this.$api.OfferCopy,{
                    params:{
                        offerId: this.selectOfferId,
                        createStaff: this.$user.getInfo().id,
                        requirementId: this.requirementId,
                        copyType: this.copyType
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.$refs.copy.hide();
                        this.$refs.found.hide();
                        this.next(res.data.offer);

                    }else{
                        this.$message.error({message: '操作失败！'})
                    }
                }).catch( error => {
                    this.$message.error({message: '服务器异常！'})
                })
            },

            //调用急速配置接口
            getFastInfo(){
                //时间戳
                let timeStamp=new Date().getTime(),
                	dateYear = new Date().getFullYear(),
					dateMonth1 = new Date().getMonth() + 1,
					dateMonth = (dateMonth1 < 10 ? '0'+dateMonth1 : dateMonth1),
					newDate = dateYear +''+ dateMonth,
                    offerSysName = newDate +'-'+ '未命名'+ timeStamp;
                
                this.$axios.post(this.$api.OrdOffer,{
                    requirementId: this.requirementId,
                    commodityType: '10',
                    offerType: '11',
                    offerName: '未命名'+timeStamp,
                    offerSysName: offerSysName,
                    offerGroupType: 'B1',
                    manageGrade: '12',
                    manageRegionId: 831000,
                    statusCd: '1200',
                    createStaff: this.$user.getInfo().id,
                    updateStaff: this.$user.getInfo().id

                }).then(res => {
                    if (res.data.success) {
                        this.next(res.data.offerOrdRspDTO);

                    }else{
                        this.$message.error({message: '急速配置操作失败！'})
                    }
                }).catch( error => {
                    this.$message.error({message: '服务器异常！'})
                })
            },

            //跳转配置页面
            next(obj){
                this.$emit('next',obj);
            },
            //点击新建需求单
            clickNew() {
                this.$emit('clickNew');
            },



            //点击销售品复制
            clickBinding() {
                if(this.tableData.children.length===0){
                    this.getTreeData();    //查询树
                }
                if(this.offerList.length===0){
                    this.pageChange(1);
                }

                this.dialogTitle='绑定销售品';
                this.$refs.copy.show();
                this.selectOfferId='';
            },
            //调用绑定销售品接口
            getBinding(){
                this.$axios.get(this.$api.OfferUpgrade,{
                    params:{
                        offerId: this.selectOfferId,
                        requirementId: this.requirementId,
                    }
                }).then(res => {
                    if (res.data.success) {
                        //如果detail不为null,就说明绑定失败，弹出失败原因，成功则刷新列表
                        if(res.data.detail){
                            this.$message.error({message: res.data.detail})
                        }else{
                            //复制绑定用的一个销售品选择框
                            this.$refs.copy.hide();
                            this.$message.success({message: '绑定成功！'});
                            this.$emit('getList');      //刷新列表
                        }

                    }else{
                        this.$message.error({message: '操作失败！'})
                    }
                }).catch( error => {
                    this.$message.error({message: '服务器异常！'})
                })
            },
            derive() {
				if(this.checkArrTemp.length == 0) {
					this.$message.warning({message: '请选择一条数据！'})
				} else if(this.checkArrTemp.length >= 2){
					this.$message.warning({message: '只能选择一条数据！'})
				} else{
					window.open(this.$api.ExportTemplate + this.checkArrTemp[0])
				}
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

    /*搜索框容器*/
    .search-box{
        padding-left: 20px;
        padding-top: 10px;
    }

    /*选择样式*/
    .col-box{
        .select{
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url("./images/choosebox-none.png") no-repeat;
            background-size: 100% 100%;
            vertical-align: text-bottom;
            cursor: pointer;
        }

        .active{
            background: url("./images/choosebox-blue.png") no-repeat;
            background-size: 100% 100%;
        }
    }

    /*模板创建弹框样式*/
    .template-box{
        width: 100%;
        max-height: 240px;
        padding: 40px 0;
        text-align: left;
        overflow: auto;

        .radio{
            width: 50%;
            margin: 12px 0;
            padding-left: 30px;
        }
    }

    /*基于销售品复制弹框样式*/
    .main {
        width: 100%;
        height: 400px;
        padding: 20px;

        .t-left {
            width: 35%;
            height: 94%;
            float: left;
            text-align: left;

            .t-span {
                display: block;
                padding-bottom: 4px;
                line-height: 20px;
                color: $mainColor;
                font-size: 12px;
            }
            .scroll {
                border: 1px solid gainsboro;
            }
        }
        .t-right {
            width: 62%;
            height: 100%;
            float: right;
            text-align: left;

            .iconfont{
                cursor: pointer;
            }

            .icon-xuanzhong-fang{
                color: $mainColor;
            }

            .t-span {
                display: block;
                padding-bottom: 4px;
                line-height: 20px;
                color: $mainColor;
                font-size: 12px;
            }
        }
    }

    .menu-btn{
        display: inline-block;
        line-height: 0;
        font-size: 12px;
        clear: both;

        .btn-box{
            .app__btn{
                margin-left: 10px;
            }
        }
    }

</style>
