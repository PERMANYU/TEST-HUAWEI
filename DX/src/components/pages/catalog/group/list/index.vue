<template>
	<div class="list">
        <!--顶部筛选、添加-->
        <div class="filter">
            <Row class="search-row">
                <Col :span="3" class="data-col">
                    <i class="icon-all"></i>
                    <i class="icon-down" :class="{activeIcon:downFlag}"></i>
                    <DropSel :obj="tabs" :text="tabDefault" @change="dropChange" @click.native="toggleDown()"></DropSel>
                </Col>

                <Col :span="5">
                    <Search placeholder="请输入目录名称" @search="search"></Search>
                </Col>

                <Col :span="12" :offset="4" class="btn-box">
                    <div class="app__btn btn-add" @click="clickAdd()">新增目录</div>
                </Col>
            </Row>
        </div>

        <!--目录列表-->
        <div class="main">
            <Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
                <!--表头-->
                <DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
                    <!--<Col :class="['m-item']" :span="3">-->
                        <!--<span>选择</span>-->
                    <!--</Col>-->

                    <Col class="m-item m-t-name" :span="9">
                        <span>目录名称</span>
                    </Col>

                    <DragItem :class="['m-item']" :span="item.span" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+index">
                        <span>{{item.name}}</span>

                        <!--表头下拉框筛选-->
                        <!--<ColSel class="col-search">-->
                            <!--<div>-->
                                <!--<Input></Input>-->
                            <!--</div>-->
                        <!--</ColSel>-->
                    </DragItem>

                    <Col :class="['m-item']" :span="7">
                        <span>操作</span>
                    </Col>
                </DragGroup>

                <!--表身-->
                <Row :class="['m-item app__table-item']" v-for="(item,index) in tableData" :key="'requirement' + index">
                    <!--<Col :span="3">-->
                        <!--<checkbox></checkbox>-->
                    <!--</Col>-->

                    <Col class="m-i-name" :span="9" @click.native.stop="nameClick(item)"> {{item.catalogName}}</Col>

                    <Col class="goods-name" :span="titleItem.span" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title'+titleIndex" >
                        <span>{{adjustTabelItemText(item,titleItem.param)}}</span>
                    </Col>

                    <Col :span="7">
                        <!--<span class="btn-list" @click="itemDis(requirementItem)">···</span>-->

                        <span class="btn-span" @click.stop="nameClick(item)">配置</span>
                        <span class="btn-span" v-show="item.statusCd!='1000'" @click="clickPub(item)">发布</span>
                        <span class="btn-span" v-show="item.statusCd!='1000'" @click="clickMod(item)">修改</span>
                        <span class="btn-span" v-show="item.statusCd!='1000'" @click="clickDel(item)">删除</span>
                        <span class="btn-span" v-show="item.statusCd=='1000'" @click="clickOff(item)">下架</span>
                        <span class="btn-span" v-show="item.statusCd=='1000'" @click="clickRise(item)">升版</span>
                    </Col>
                </Row>

                <!--暂无数据-->
                <Row class="app__data-none" v-if="tableData.length==0">
                    <Col :span="24"><span>当前无数据!</span></Col>
                </Row>
            </Scroll>
        </div>

        <div class="footer">
            <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
            </Pagination>
        </div>

        <!--添加、修改弹框-->
        <Dialog :dialogSize="{min: 420,max: 450}" class="h-dialog" :dialogTitle="dialogTitle" ref="dialog" :initBtn="true">
            <Form class="dialogForm" labelWidth="110px">
                <Row>
                    <!--添加、修改目录-->
                    <Col :span="20" v-if="dialogTitle=='添加目录'||dialogTitle=='修改目录'">
                        <FormItem labelText="目录名称：" :requiredIcon="true" :errorMessage="errors.first('catalogName')">
                            <Input name="catalogName" v-model.trim="attrForm.catalogName" v-validate="'required'"
                                   data-vv-as="目录名称"></Input>
                        </FormItem>
                    </Col>

                    <Col :span="20" v-if="dialogTitle=='添加目录'||dialogTitle=='修改目录'">
                        <FormItem labelText="目录编码：" :requiredIcon="true" :errorMessage="errors.first('catalogNbr')">
                            <Input name="catalogNbr" v-model.trim="attrForm.catalogNbr" v-validate="'required'"
                                   data-vv-as="目录编码" maxlength="30"></Input>
                        </FormItem>
                    </Col>


                    <!--添加、修改节点-->
                    <Col :span="20" v-if="dialogTitle=='添加节点'&&treeModel.parCatalogItemId!==-1">
                        <FormItem labelText="添加方向：" :requiredIcon="true">
                            <Radio name="isUnique" label="1000"
                                   v-model="attrForm.addType">同级节点</Radio>
                            <Radio name="isUnique" label="1100"
                                   v-model="attrForm.addType">下级节点</Radio>
                        </FormItem>
                    </Col>

                    <Col :span="20" v-if="dialogTitle=='添加节点'||dialogTitle=='修改节点'">
                        <FormItem labelText="节点名称：" :requiredIcon="true" :errorMessage="errors.first('catalogItemName')">
                            <Input name="catalogItemName" v-model.trim="attrForm.catalogItemName" v-validate="'required'"
                                   data-vv-as="节点名称"></Input>
                        </FormItem>
                    </Col>

                    <Col :span="20" v-if="dialogTitle=='添加节点'||dialogTitle=='修改节点'">
                        <FormItem labelText="节点编码：" :requiredIcon="true" :errorMessage="errors.first('catalogItemNbr')">
                            <Input name="catalogItemNbr" v-model.trim="attrForm.catalogItemNbr" v-validate="'required'"
                                   data-vv-as="节点编码" maxlength="30"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            <!--自定义按钮-->
            <template slot="btnBox">
                <span class="back" @click="btnCancel()">取消</span>
                <span class="next" @click="configClick()" >确定</span>
            </template>
        </Dialog>


        <LeftDialog ref="leftDialog">
            <Scroll :isShowRight="true">
                <div class="fold-title">
                    <span class="fold-name fold-name-basic">配置目录</span>
                    <span class="fold-save">保存</span>
                </div>


                <div class="fold-content">
                    <!--目录树-->
                    <div class="t-left">
                        <Scroll :isShowRight="true" ref="scroll">
                            <TreeSimple v-for="(item,index) in treeData.children" :key="index" :folder="item"
                                        :keys="folderKeys" levelStr="orgLevel" v-model="treeModel"/>
                            </TreeSimple>
                        </Scroll>
                    </div>

                    <!--目录详情-->
                    <div class="t-right">
                        <!--标题和添加-->
                        <div class="sel-box">
                            <i class="title-icon"></i>
                            <span class="y-span">已选：{{treeModel.catalogItemName}}</span>

                            <div class="app__btn btn1" @click="clickAddNode()">添加</div>
                        </div>

                        <Row class="row-box">
                            <Col :span="9">
                                <label>目录节点名称：</label>
                                <span>{{treeModel.catalogItemName}}</span>
                            </Col>

                            <Col :span="9">
                                <label>目录节点编码：</label>
                                <span>{{treeModel.catalogItemNbr}}</span>
                            </Col>

                            <Col :span="6">
                                <span class="btn-span" v-show="treeModel.statusCd!='1000'&&treeModel.statusCd" @click="clickPubNode()">发布</span>
                                <span class="btn-span" v-show="treeModel.statusCd!='1000'&&treeModel.statusCd" @click="clickModNode()">修改</span>
                                <span class="btn-span" v-show="treeModel.statusCd!='1000'&&treeModel.statusCd" @click="clickDelNode()">删除</span>
                                <span class="btn-span" v-show="treeModel.statusCd=='1000'&&treeModel.statusCd" @click="clickOffNode()">下架</span>
                                <span class="btn-span" v-show="treeModel.statusCd=='1000'&&treeModel.statusCd" @click="clickRiseNode()">升版</span>
                            </Col>
                        </Row>

                    </div>
                </div>

            </Scroll>
        </LeftDialog>

        <!--操作确认框-->
        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
                downFlag: false,
                tabDefault:"全部数据",
                tabs: [
                    {label: '全部数据', value: '2'}
                ],

                tableData: [],    //目录列表
                //表头
                tableTitleData: [
                    {
                        name: '目录编码',
                        param: 'catalogNbr',
                        span: 8
                    }
                ],
                pageInfo: {
                    pageIndex: 1,
                    pageSize: 20,
                    rowCount: 0
                },
                searchObj: {
                    catalogName: ''
                },

                dialogTitle: '添加目录',
                attrForm: {
                    catalogName: '',
                    catalogNbr: '',

                    addType: '1000',    //1000：同级节点；1100：下级节点
                    catalogItemName: '',
                    catalogItemNbr: '',
                },
                tipInfo: {
                    iconType: 1,
                    msg: '',
                    showBtn: {
                        clear: true,
                        save: true
                    }
                },
                tipType: '',


                folderKeys: [
                    {key: 'catalogItemName'}      //组织名称
                ],
                //目录树数据
                treeData: {
                    catalogItemName: "",
                    catalogItemNbr: "",
                    catalogItemId: "",
                    children: []
                },
                searchResourceData:'',
                treeModel: {},    //选中的目录树
			}
		},

        watch:{
            //监听目录变化
            treeModel(curVal){
//                console.log(this.treeModel);
            }

        },

        mounted() {
            this.gatTabData();
            this.$refs.leftDialog.removeClickEvent();   //移除点击别的区域关闭详情弹框
        },
		methods:{
            //获取目录列表
            gatTabData() {
                this.$axios.get(this.$api.OrdCatalog,{
                    params: {
                        catalogName: this.searchObj.catalogName.trim(),   //去除关键字前后空格,
                        catalogNbr: '',
                        catalogType: '',
                        catalogUsage: '',
                        page: this.pageInfo.pageIndex,
                        limit: this.pageInfo.pageSize,
                    }
                }).then(res => {
                    if(res.data.success) {
                        this.pageInfo = {
                            pageIndex: res.data.catalogPage.page,
                            pageSize: res.data.catalogPage.limit,
                            rowCount: res.data.catalogPage.total,
                            pageCount: Math.ceil(res.data.catalogPage.total/res.data.catalogPage.limit)
                        };
                        this.tableData = res.data.catalogPage.content||[];

                        this.$nextTick(() => {
                            this.$refs.listScroll.init();
                        })

                    } else {
                        this.$message.error({ "message": "查询失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！"})
                })
            },

            //状态码转化为文字
            adjustTabelItemText(item, param) { //计算显示
                let val = item[param];
                switch(param) {
                    case 'statusCd':
                        return this.getStatusCd(val);
                    default:
                        return val;
                }
            },
            //获取目录状态
            getStatusCd(type) {
                switch(type) {
                    case '1000':
                        return '有效';
                    case '1200':
                        return '未生效';
                    default:
                        return "未知";
                }
            },


            dragchange(val) {
                this.tableTitleData = val;
            },
            pageChange(page) {
                this.pageInfo.pageIndex = page;
                this.gatTabData();
            },
            search(val) {
                this.searchObj.catalogName = val;
                this.pageChange(1);
            },
            toggleDown() {
                //this.downFlag = !this.downFlag;
            },
            dropChange(val){

            },



            //关闭弹框
            btnCancel(){
                this.$refs.dialog.hide();
            },
            //点击弹框确定
            configClick(){
                this.$validator.validateAll().then((result) => {
                    if(result) {
                        if(this.dialogTitle=='添加目录'){
                            this.addCatalog();
                        }else if(this.dialogTitle=='修改目录'){
                            this.modCatalog();
                        }else if(this.dialogTitle=='添加节点'){
                            this.addNode();
                        }else if(this.dialogTitle=='修改节点'){
                            this.modNode();
                        }
                    }
                })
            },


            //点击新增目录
            clickAdd(){
                this.dialogTitle='添加目录';
                this.$refs.dialog.show();
                this.attrForm={
                    catalogName: '',
                    catalogNbr: '',
                }
            },
            //点击修改目录
            clickMod(item){
                this.dialogTitle='修改目录';
                this.$refs.dialog.show();
                this.attrForm={...item};
            },
            //点击发布目录
            clickPub(item){
                this.tipType = 'pubCatalog';
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `是否确认发布？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();

                this.attrForm=item;
            },
            //点击删除目录
            clickDel(item){
                this.tipType = 'delCatalog';
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `是否确认删除？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();

                this.attrForm=item;
            },
            //点击下架目录
            clickOff(item){
                this.tipType = 'offCatalog';
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `是否确认下架？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();

                this.attrForm=item;
            },
            //点击升版目录
            clickRise(item){
                this.tipType = 'riseCatalog';
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `是否确认升版？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();

                this.attrForm=item;
            },
            //点击确认操作
            tipConfirm(){
                if(this.tipType == 'pubCatalog'){
                    this.pubCatalog();
                }else if(this.tipType == 'delCatalog'){
                    this.delCatalog();
                }else if(this.tipType == 'offCatalog'){
                    this.offCatalog();
                }else if(this.tipType == 'riseCatalog'){
                    this.riseCatalog();

                }else if(this.tipType == 'pubNode'){
                    this.pubNode();
                }else if(this.tipType == 'delNode'){
                    this.delNode();
                }else if(this.tipType == 'offNode'){
                    this.offNode();
                }else if(this.tipType == 'riseNode'){
                    this.riseNode();
                }
            },


            //调用目录添加接口
            addCatalog(){
                this.$axios.post(this.$api.OrdCatalog,{
                    catalogName: this.attrForm.catalogName,
                    catalogNbr: this.attrForm.catalogNbr,
                    createStaff: this.$user.getInfo().id,

                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "添加成功！"});
                        this.$refs.dialog.hide();
                        this.pageChange(1);

                    } else {
                        this.$message.error({ "message": "操作失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！"})
                })
            },
            //调用目录修改接口
            modCatalog(){
                this.$axios.put(this.$api.replace(this.$api.OpeOrdCatalog, ['{catalogId}'], [this.attrForm.catalogId]),{
                    catalogId: this.attrForm.catalogId,
                    catalogName: this.attrForm.catalogName,
                    catalogNbr: this.attrForm.catalogNbr,
                    updateStaff: this.$user.getInfo().id,

                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "修改成功！"});
                        this.$refs.dialog.hide();
                        this.pageChange(1);

                    } else {
                        this.$message.error({ "message": "操作失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！"})
                })
            },
            //调用目录发布接口
            pubCatalog(){
                this.$axios.post(this.$api.replace(this.$api.ReleaseCatalog, ['{catalogId}'], [this.attrForm.catalogId]),{
                    catalogId: this.attrForm.catalogId,
                    staff: this.$user.getInfo().id,

                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "发布成功！"});
                        this.$refs.tip.hide();
                        this.pageChange(1);

                    } else {
                        this.$message.error({ "message": "操作失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！"})
                })
            },
            //调用目录删除接口
            delCatalog(){
                this.$axios.delete(this.$api.replace(this.$api.OpeOrdCatalog, ['{catalogId}'], [this.attrForm.catalogId]),{
                    params: {
                        catalogId: this.attrForm.catalogId,
                        staff: this.$user.getInfo().id,
                    }
                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "删除成功！"});
                        this.$refs.tip.hide();
                        this.pageChange(1);

                    } else {
                        this.$message.error({ "message": "操作失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！"})
                })
            },
            //调用目录下架接口
            offCatalog(){
                this.$axios.post(this.$api.replace(this.$api.DownlineCatalog, ['{catalogId}'], [this.attrForm.catalogId]),{
                    catalogId: this.attrForm.catalogId,
                    staff: this.$user.getInfo().id,

                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "下架成功！"});
                        this.$refs.tip.hide();
                        this.pageChange(1);

                    } else {
                        this.$message.error({ "message": "操作失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": error.response.data.msg});
                })
            },
            //调用目录升版接口
            riseCatalog(){
                this.$axios.post(this.$api.replace(this.$api.RiseCatalog2, ['{catalogId}'], [this.attrForm.catalogId]),{
                    catalogId: this.attrForm.catalogId,
                    staff: this.$user.getInfo().id,

                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "升版成功！"});
                        this.$refs.tip.hide();
                        this.pageChange(1);

                    } else {
                        this.$message.error({ "message": "操作失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！"})
                })
            },



            //点击详情
            nameClick(item) {
                this.$refs.leftDialog.show();
                this.getTreeData(item);
                this.treeModel={};
            },


            //查询目录树
            getTreeData(item) {
                this.$axios.get(this.$api.replace(this.$api.OpeOrdCatalog, ['{catalogId}'], [item.catalogId]),{
                    params: {
                        catalogId: item.catalogId
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.treeData.catalogId= res.data.catalogDetail.catalogId;
                        this.treeData.catalogItemName= res.data.catalogDetail.catalogName;
                        this.treeData.catalogItemNbr= res.data.catalogDetail.catalogNbr;
                        this.treeData.catalogItemId= res.data.catalogDetail.catalogId;
                        this.treeData.parCatalogItemId= -1;

                        this.treeData.children = res.data.catalogDetail.catalogItems;

                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },

            //点击新增节点
            clickAddNode(){
                if(this.treeModel.catalogItemName){
                    this.dialogTitle='添加节点';
                    this.$refs.dialog.show();

                    this.attrForm={
                        catalogItemName: '',
                        catalogItemNbr: '',
                        addType: '1000',
                    }
                }else{
                    //未选择节点的时候默认添加在一级目录下面
                    this.dialogTitle='添加节点';
                    this.$refs.dialog.show();

                    this.treeModel= {
                        catalogId: this.treeData.catalogId,
                        parCatalogItemId: -1,
                    };
                    this.attrForm={
                        catalogItemName: '',
                        catalogItemNbr: '',
                        addType: '1100',
                    }
                }
            },
            //点击修改节点
            clickModNode(){
                if(this.treeModel.catalogItemName) {
                    this.dialogTitle = '修改节点';
                    this.$refs.dialog.show();
                    this.$refs.leftDialog.removeClickEvent();

                    this.attrForm = {
                        catalogItemName: this.treeModel.catalogItemName,
                        catalogItemNbr: this.treeModel.catalogItemNbr,
                    }
                }else{
                    this.$message.error({ "message": "请先选择一个节点！"})
                }
            },
            //点击发布节点
            clickPubNode(){
                if(this.treeModel.catalogItemName) {
                    this.tipType = 'pubNode';
                    this.tipInfo.iconType = 3;
                    this.tipInfo.msg = `是否确认发布？`;
                    this.tipInfo.showBtn.clear = true;
                    this.tipInfo.showBtn.save = true;
                    this.$refs.tip.show();
                }else{
                    this.$message.error({ "message": "请先选择一个节点！"})
                }
            },
            //点击删除节点
            clickDelNode(){
                if(this.treeModel.catalogItemName) {
                    this.tipType = 'delNode';
                    this.tipInfo.iconType = 3;
                    this.tipInfo.msg = `是否确认删除？`;
                    this.tipInfo.showBtn.clear = true;
                    this.tipInfo.showBtn.save = true;
                    this.$refs.tip.show();
                }else{
                    this.$message.error({ "message": "请先选择一个节点！"})
                }
            },
            //点击下架节点
            clickOffNode(){
                if(this.treeModel.catalogItemName) {
                    this.tipType = 'offNode';
                    this.tipInfo.iconType = 3;
                    this.tipInfo.msg = `是否确认下架？`;
                    this.tipInfo.showBtn.clear = true;
                    this.tipInfo.showBtn.save = true;
                    this.$refs.tip.show();
                }else{
                    this.$message.error({ "message": "请先选择一个节点！"})
                }
            },
            //点击升版节点
            clickRiseNode(){
                if(this.treeModel.catalogItemName) {
                    this.tipType = 'riseNode';
                    this.tipInfo.iconType = 3;
                    this.tipInfo.msg = `是否确认升版？`;
                    this.tipInfo.showBtn.clear = true;
                    this.tipInfo.showBtn.save = true;
                    this.$refs.tip.show();
                }else{
                    this.$message.error({ "message": "请先选择一个节点！"})
                }
            },


            //调用节点添加接口
            addNode(){
                let parId;
                if(this.attrForm.addType=='1000'){
                    parId=this.treeModel.parCatalogItemId;

                }else if(this.attrForm.addType=='1100'){
                    if(this.treeModel.parCatalogItemId===-1){
                        parId=0;
                    }else{
                        parId=this.treeModel.catalogItemId;
                    }
                }

                this.$axios.post(this.$api.replace(this.$api.OrdCatalogItem, ['{catalogId}'], [this.treeModel.catalogId]),{
                    catalogId: this.treeModel.catalogId,
                    parCatalogItemId: parId,

                    catalogItemName: this.attrForm.catalogItemName,
                    catalogItemNbr: this.attrForm.catalogItemNbr,
                    createStaff: this.$user.getInfo().id,

                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "添加成功！"});
                        this.$refs.dialog.hide();

                        this.getTreeData({catalogId: this.treeModel.catalogId});
                        this.treeModel={};

                    } else {
                        this.$message.error({ "message": "操作失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！"})
                })
            },

            //调用节点修改接口
            modNode(){
                this.$axios.put(this.$api.replace(this.$api.ModOrdCatalogItem, ['{catalogId}','{catalogItemId}'], [this.treeModel.catalogId, this.treeModel.catalogItemId]),{
                    catalogId: this.treeModel.catalogId,
                    catalogItemId: this.treeModel.catalogItemId,

                    catalogItemName: this.attrForm.catalogItemName,
                    catalogItemNbr: this.attrForm.catalogItemNbr,
                    updateStaff: this.$user.getInfo().id,

                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "修改成功！"});
                        this.$refs.dialog.hide();

                        this.getTreeData({catalogId: this.treeModel.catalogId});
                        this.treeModel={};
                    } else {
                        this.$message.error({ "message": "操作失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！"})
                })
            },
            //调用节点发布接口
            pubNode(){
                this.$axios.post(this.$api.replace(this.$api.ReleaseCatalogItem, ['{catalogId}','{catalogItemId}'], [this.treeModel.catalogId, this.treeModel.catalogItemId]),{
                    catalogId: this.treeModel.catalogId,
                    catalogItemId: this.treeModel.catalogItemId,
                    staff: this.$user.getInfo().id,

                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "发布成功！"});
                        this.$refs.tip.hide();

                        this.getTreeData({catalogId: this.treeModel.catalogId});
                        this.treeModel={};

                    } else {
                        this.$message.error({ "message": res.data.msg});
                    }
                }).catch(error => {
                    this.$message.error({ "message": error.response.data.msg});
                })
            },
            //调用节点删除接口
            delNode(){
                this.$axios.delete(this.$api.replace(this.$api.ModOrdCatalogItem, ['{catalogId}','{catalogItemId}'], [this.treeModel.catalogId, this.treeModel.catalogItemId]),{
                    params: {
                        catalogId: this.treeModel.catalogId,
                        catalogItemId: this.treeModel.catalogItemId,
                        staff: this.$user.getInfo().id,
                    }
                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "删除成功！"});
                        this.$refs.tip.hide();

                        this.getTreeData({catalogId: this.treeModel.catalogId});
                        this.treeModel={};

                    } else {
                        this.$message.error({ "message": "操作失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！"})
                })
            },
            //调用节点下架接口
            offNode(){
                this.$axios.post(this.$api.replace(this.$api.DownlineCatalogItem, ['{catalogId}','{catalogItemId}'], [this.treeModel.catalogId, this.treeModel.catalogItemId]),{
                    catalogId: this.treeModel.catalogId,
                    catalogItemId: this.treeModel.catalogItemId,
                    staff: this.$user.getInfo().id,

                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "下架成功！"});
                        this.$refs.tip.hide();

                        this.getTreeData({catalogId: this.treeModel.catalogId});
                        this.treeModel={};

                    } else {
                        this.$message.error({ "message": "操作失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！"})
                })
            },
            //调用节点升版接口
            riseNode(){
                this.$axios.post(this.$api.replace(this.$api.RiseCatalogItem, ['{catalogId}','{catalogItemId}'], [this.treeModel.catalogId, this.treeModel.catalogItemId]),{
                    catalogId: this.treeModel.catalogId,
                    catalogItemId: this.treeModel.catalogItemId,
                    staff: this.$user.getInfo().id,

                }).then(res => {
                    if(res.data.success) {
                        this.$message.success({ "message": "升版成功！"});
                        this.$refs.tip.hide();

                        this.getTreeData({catalogId: this.treeModel.catalogId});
                        this.treeModel={};

                    } else {
                        this.$message.error({ "message": "操作失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ "message": "服务器异常！"})
                })
            },
		}
	}
</script>

<style scoped lang="scss">
    .fold-title {
        width: 100%;
        height: 50px;

        .fold-name {
            display: block;
            position: absolute;
            top: 15px;
            left: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            padding-left: 30px;
            color: #497cc1;
            background-repeat: no-repeat;
            background-position: left center;

            &.fold-name-basic {
                background-image: url(./images/xspjbxx.png);
            }
        }
        .fold-save {
            position: absolute;
            display: block;
            top: 10px;
            right: 60px;
            width: 70px;
            height: 30px;
            line-height: 30px;
            padding-left: 30px;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            background-color: $mainColor;
            background-image: url(./images/bzan.png);
            background-repeat: no-repeat;
            background-position: 10px center;

            &:hover {
                opacity: .8;
            }
        }
    }

    .fold-content{
        width: 100%;
        height: 330px;
        padding-left: 20px;
        padding-right: 10px;

        .t-left {
            float: left;
            width: 35%;
            padding-left: 10px;
            padding-top: 10px;
            border: 1px solid #f6f6f6;

            .scroll {
                height: 310px;
            }
        }
        .t-right {
            float: right;
            width: 64%;
            height: 322px;
            padding-top: 10px;
            border: solid 1px #f6f6f6;

            /*表格标题+搜索框*/
            .sel-box{
                width: 100%;
                line-height: 30px;
                padding: 0 10px;

                /*图标*/
                i.title-icon{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: url("./images/sjicon.png") no-repeat;
                    background-size: cover;
                    vertical-align: text-top;
                }
                /*表格标题样式*/
                .y-span {
                    display: inline-block;
                    margin-left: 4px;
                    color: $mainColor;
                    font-size: 14px;
                }
                /*添加按钮*/
                .btn1 {
                    float: right;
                    padding: 0 15px 0 30px;
                    background-color: #fff;
                    color: $mainColor;
                    border: 1px solid $mainColor;
                    background-image: url(./images/add.png);
                    background-repeat: no-repeat;
                    background-position: 10px;
                    &:hover{
                        background-color: $mainColor;
                        color: #fff;
                        background-image: url(./images/add_hover.png);
                        background-repeat: no-repeat;
                        background-position: 10px;
                    }
                }

            }

            .row-box{
                min-height: 0;
                margin: 10px;
                padding: 10px 0;
                line-height: 20px;
                border: solid 1px #f0f0f0;

                .col{
                    min-height: 0;
                    padding-left: 6px;

                    label{
                        font-size: 12px;
                        color: #888888;
                    }
                    span{
                        font-size: 12px;
                        color: #222222;
                        word-wrap: break-word;
                    }
                    .btn-span{
                        color: $mainColor;
                    }
                }
            }
        }
    }


    .list {
        height: 100%;
        padding: 0 20px 50px;

        /*列表筛选样式*/
        .filter {
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #333;
            position: relative;
            z-index: 3;

            .search-row {
                padding-top: 5px;

                .btn-box{
                    text-align: right;
                    padding-right: 10px;

                    .btn-add{
                        padding: 0 15px 0 30px;
                        background-color: #fff;
                        color: $mainColor;
                        border: 1px solid $mainColor;
                        background-image: url(./images/add.png);
                        background-repeat: no-repeat;
                        background-position: 10px;
                        &:hover{
                            background-color: $mainColor;
                            color: #fff;
                            background-image: url(./images/add_hover.png);
                            background-repeat: no-repeat;
                            background-position: 10px;
                        }
                    }
                }
            }
            .data-col {
                float: left;
                height: 30px;
                line-height: 30px;
                padding: 5px 0 0 20px;

                .icon-all {
                    position: absolute;
                    display: block;
                    width: 18px;
                    height: 18px;
                    margin-top: 6px;
                    margin-right: 8px;
                    background: url(./images/all.png) no-repeat center;
                    background-size: 18px 18px;
                }
                .drop-sel {
                    padding: 0 20px 0 20px;
                }
                .icon-down {
                    position: absolute;
                    display: block;
                    width: 12px;
                    height: 12px;
                    margin-top: 10px;
                    left: 100px;
                    background: url(./images/down.png) no-repeat center;
                    background-size: 10px 6px;
                }
                .activeIcon{
                    display: none;
                }
            }
        }
    }

    /*列表样式*/
    .main {
        width: 100%;
        height: 100%;
        padding-bottom: 50px;

        .m-title {
            .col.m-t-name {
                /*<!--border-right: 1px solid $mainColor;-->*/
            }
        }
        .m-item {
            .goods-name{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .m-i-name {
                color: $mainColor;
                cursor: pointer;
                /*<!--border-right: 1px solid $mainColor;-->*/
            }
        }
        .col {
            /*text-align: center;*/

            &:hover {
                .col-search {
                    display: block;
                }
            }
        }
        /*列表操作按钮*/
        .btn-list {
            color: $mainColor;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
        }
    }

    /*分页样式*/
    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        box-shadow: 0 -2px 0 #f1f5fa;
        .pagination {
            height: 50px;
        }
    }

    .dialogForm{
        padding: 30px 0;

        .radio{
            margin-right: 10px;
        }
    }

    /*操作按钮*/
    .btn-span {
        color: $mainColor;
        padding-right: 6px;
        cursor: pointer;
    }




</style>
