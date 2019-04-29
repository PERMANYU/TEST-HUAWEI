<template>
	<div class="list">
        <div class="header">
            <div class="h-all">
                <div class="h-a-title">
                    <Row class="filtrate-header">
                        <Col :span="22">
                            <ConditionSearch :data="conditionSearchData" @search="conditionSearch" ref="conditionSearchRef" />
                        </Col>
                    </Row>          
                </div>
            </div>
        </div>
        <div class="main">
            <Scroll class="app__table" :isShowBottom="true" :isShowRight="true"  fixedTopClassName="m-title" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
                <DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
                    <Col class="m-t-name app__table-left" :span="4">
                        <span>客户名称</span>
                    </Col>
                    <DragItem :span="item.span" 
                        :value="item"
                        v-for="(item,index) in tableTitleData"
                        :key="index">

                        <span>{{item.name}}</span>

                        <ColSel class="col-search"  v-if="item.param == 'applyOrderType'"
                                :showOrder="false"
                                @confirm="filterConfirm(item)">
                        </ColSel>
                    </DragItem>
                </DragGroup>
                <Row :class="['m-item app__table-item']" v-for="(item,index) in tableItemData" :key="index">
                    <Col :span="4" @click.native.stop="userRightBtnControl.detailBtn ? detailClick(item) : ''" class="m-i-name app__table-left">{{item['custName']}}</Col>
                    <Col :span="4" class="overflow-style">
                        <span>{{item.custNumber}}</span>
                    </Col>
                    <Col :span="4" class="overflow-style">
                        <span>{{item.custType}}</span>
                    </Col>
                    <Col :span="4" class="overflow-style">
                        <span>{{item.custSubType}}</span>
                    </Col>
                    <Col :span="4" class="overflow-style">
                        <span>{{item.certType}}</span>
                    </Col>
                    <Col :span="4" class="overflow-style">
                        <span>{{item.certNum}}</span>
                    </Col>
                </Row>
                <Row class="empty-style" :class="['m-item app__table-item']" v-for="item in (20 - tableItemData.length)" :key="item.id"></Row>
            </Scroll>
        </div>
        <div class="footer" v-if="tableItemData.length">
            <Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
            </Pagination>
        </div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                },
                searchInputObjData: {
                    certType: '',   // 证件类型
                    certNum: '',    // 证件号码
                    custName: '',   // 客户名称
                    custNumber: ''  // 客户标识
                },
                conditionSearchData:[
                {
                    iconfont: 'iconshenfenzheng',
                    placeholder:'输入证件号码',
                    param: 'certNum',
                    optionParam: 'certType',
                    options: [{
                        label: '居民身份证',
                        value: '1'
                    },{
                        label: '外国公民护照',
                        value: '3'
                    },{
                        label: '军人身份证件',
                        value: '2'
                    },{
                        label: '户口薄',
                        value: '12'
                    },{
                        label: '人民武装警察居民身份证',
                        value: '52'
                    },{
                        label: '外国人永久居留身份证',
                        value: '50'
                    },{
                        label: '港澳台通行证',
                        value: '4'
                    },{
                        label: '港澳居民居住证',
                        value: '54'
                    }],
                    optionValue: ''
                },{
                    iconfont: 'iconkhbs',
                    placeholder:'输入客户名称搜索',
                    param: 'custName',
                    default: ''
                },{
                    iconfont: 'iconkhbs',
                    placeholder:'输入客户标识',
                    param: 'custNumber',
                    default: ''
                }],
                tableItemData: [],
                tableTitleData:[
                    {
                        name:'客户标识',
                        param:'custNumber',
                        span: 4
                    },{
                        name:'客户类型',
                        param:'custType',
                        span: 4
                    },{
                        name:'客户子类型',
                        param:'custSubType',
                        span: 4
                    },{
                        name:'主要证件类型',
                        param:'certType',
                        span: 4
                    },{
                        name: '主要证件号码',
                        param: 'certNum',
                        span: 4
                    }
                ],
                certTypeArr: [
                    {
                        label: '居民身份证',
                        value: '1'
                    },{
                        label: '外国公民护照',
                        value: '3'
                    },{
                        label: '军人身份证件',
                        value: '2'
                    },{
                        label: '户口薄',
                        value: '12'
                    },{
                        label: '人民武装警察居民身份证',
                        value: '52'
                    },{
                        label: '外国人永久居留身份证',
                        value: '50'
                    },{
                        label: '港澳台通行证',
                        value: '4'
                    },{
                        label: '港澳居民居住证',
                        value: '54'
                    }
                ],
                placeholder: '请选择证件类型',
                userRightBtnControl: {          // 权限按钮控制
                    detailBtn: false
                }
            }
        },
        mounted() {
            this.otherPageSearch();
            // 循环权限数据
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100715':
                        this.userRightBtnControl.detailBtn = true;
                        break;
                    default:
                        break;
                }
            })
        },
        methods:{
            otherPageSearch(){ //其他页面检索
                if(this.$route.params.custNumber){
                    this.conditionSearchData.find( item => item.param == 'custNumber').default = this.$route.params.custNumber;
                    
                    this.$nextTick( () => {
                        this.$refs.conditionSearchRef.search();
                    })
                }
            },
            conditionSearch(obj){
                this.searchInputObjData = obj;
                this.handleSearch();
            },
            // 客户子类型数据展示
            changeSub(num) {
                let obj = this.custSubTypeArr.find(item => item.value == num);
                if(obj != undefined){
                    return obj.label;
                }else{
                    return '';
                }
            },
            // 筛选
            filterConfirm (item) {

            },
            dragchange() {

            },
            pageChange(val) {
                this.getListData(val)
            },

            // 搜索
            handleSearch () {
                if(this.searchInputObjData.certNum != '' && (this.searchInputObjData.certType =='' || this.searchInputObjData.certType == undefined)){
                    this.$message.warning({"message": "请选择证件类型"})
                }else if(this.searchInputObjData.certNum == '' && this.searchInputObjData.certType !='' && this.searchInputObjData.certType != undefined){
                    this.$message.warning({"message": "请输入证件号码"})
                }else if(this.searchInputObjData.certNum != '' && this.searchInputObjData.certType !='' && this.searchInputObjData.certType != undefined){
                    this.getListData();
                }else{
                    this.getListData();
                }
            },
            //获取客户数据列表
            getListData (pageIndex = 1) {
                this.$axios.get(this.$api.CustomerList,{
                    params: {
                        certNum: this.searchInputObjData.certNum ? this.searchInputObjData.certNum : '',
                        custName: this.searchInputObjData.custName ? this.searchInputObjData.custName : '',
                        custNumber: this.searchInputObjData.custNumber ? this.searchInputObjData.custNumber : '',
                        custType: '1100',
                        certType: this.searchInputObjData.certType,
                        pageNum: pageIndex,
                        pageSize: this.pageInfo.pageSize
                    }
                }).then(res => {
                    if (res.data.length) {
                        this.pageInfo.pageIndex = pageIndex
                        this.tableItemData = res.data;
                        this.$nextTick(()=> {
                            this.$refs.listScroll.init();
                        })
                    } else {
                        this.$message.warning({message: '暂无数据'})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 客户详情
            detailClick(item) {
                this.$emit("componentView", "detail", item);
            }
            
        }
	}
</script>

<style scoped lang="scss">
    
    .list{
        padding: 80px 0 50px;
        width: 100%;
        height: 100%;

        .header{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 80px;

            .h-all{

                padding: 20px 20px 0;

                .h-a-title{
                    .left-title{
                        float: left;
                    }
                    .filtrate-header {
                        .s-up{
                            padding-right: 16px;
                        }
                        .distance {
                            margin-left: 20px;
                        }
                        .search {
                            display: inline-block;
                            height: 30px;
                            line-height: 30px;
                            margin: 7px 0 0 20px;
                            padding: 0 20px;
                            border-radius: 5px;
                            background: $mainColor;
                            font-size: 14px;
                            color: #fff;
                            cursor: pointer;
                            &:hover {
                                opacity: .8;
                            }
                        }
                    }

                    p:first-child{
                        font-size: 24px;
                        color: #373f45;
                    }
                    p:last-child{
                        padding-top: 4px;
                        font-size: 12px;
                        color: #373f45;

                        span{
                            color: $mainColor;
                        }
                    }

                    .searchMain{
                        margin-left: 50px;
                        float: left;
                    }

                    .a-t-name{
                        display: inline-block;
                        height: 100%;
                        line-height: 50px;
                        font-weight: bold;
                        padding-left: 20px;
                        background-image: url(./images/all.png);
                        background-repeat: no-repeat;
                        background-position: 0px;
                    }

                    .a-t-search{
                        display: inline-block;
                        height: 100%;
                        line-height: 50px;
                        padding-left: 30px;

                        .t-s-name{
                            display: inline-block;
                            padding-left: 20px;
                            background-image: url(./images/select_content.png);
                            background-repeat: no-repeat;
                            background-position: 0px;
                            vertical-align: middle;
                        }

                        .t-s-item{
                            display: inline-block;
                            height: 30px;
                            line-height: 30px;
                            padding: 0 10px;
                            margin-right: 35px;
                            border: 1px solid #f1f5fa;
                            vertical-align: middle;
                            
                            .s-i-name{
                                color: $mainColor;
                            }

                            .s-i-close{
                                display: block;
                                position: absolute;
                                width: 26px;
                                height: 30px;
                                top: -1px;
                                right: -26px;
                                background-image: url(./images/close.png);
                                background-repeat: no-repeat;
                                background-position: 0px;
                                cursor: pointer;
                            }
                        }
                    }
                    
                }

                .h-a-add{
                    position: absolute;
                    top: 25px;
                    right: -90px;
                    height: 30px;
                }
            }

            .h-operation{
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 80px;
                line-height: 80px;
                transition: .3s all ease;
                background-color: #fff;

                &.active{
                    left: 0;
                }

                .h-o-item{
                    display: inline-block;
                    padding: 0 20px;
                    cursor: pointer;

                    &.delete{
                        background: url(./images/delete_grey.png) no-repeat;
                        background-position: 0;
                    }

                    &.modify{
                        background: url(./images/edit_grey.png) no-repeat;
                        background-position: 0;
                    }

                    &.release{
                        background: url(./images/release_grey.png) no-repeat;
                        background-position: 0;
                    }

                    &.history{
                        background: url(./images/history_grey.png) no-repeat;
                        background-position: 0;
                    }

                    &:hover{
                        color: $mainColor;

                        &.delete{
                            background: url(./images/delete_blue.png) no-repeat;
                            background-position: 0;
                        }

                        &.modify{
                            background: url(./images/edit_blue.png) no-repeat;
                            background-position: 0;
                        }

                        &.release{
                            background: url(./images/release_blue.png) no-repeat;
                            background-position: 0;
                        }

                        &.history{
                            background: url(./images/history_blue.png) no-repeat;
                            background-position: 0;
                        }
                    }
                }

                .h-o-count{
                    color: $mainColor;
                }
            }
        }

        .main{
            width: 100%;
            height: 100%;
            padding:  0 20px;

            .m-title{
                text-align: center;
                box-shadow: 0 1px 1px #f1f5fa;
                span{
                    font-weight: bold;
                    color: $mainColor;
                }

                .col.m-t-name{
                    border-right: 1px solid #a6c2ff;
                }

                .col{
                    border-right: 1px solid #f1f5fa;


                    &.draging{
                        position: relative;

                        &:after{
                            content: '';
                            display: block;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 2px;
                            height: 20px;
                            background-color: $mainColor;
                        }
                    }
                }
            }

            .filtrate {
                display: block;
                margin-bottom: 10px;
            }

            .m-item{
                text-align: center;

                &.double{
                    background-color: #f6f7f9;
                }

                .m-i-name{
                    color: $mainColor;
                    border-right: 1px solid #a6c2ff;
                    cursor: pointer;
                }

                .review{
                    color: $mainColor;
                    cursor: pointer;
                }
                .overflow-style {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }

            .col{

                &:hover{
                    .col-search{
                        display: block;
                    }

                    .radio-height {
                        height: 200px;
                    }
                }
            }
        }

        .dialog-header {
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
            border-bottom: 1px solid #f6f6f6;
            .dialog-header-title {
                font-size: 16px;
            }
        }
        .dialog-content {
            position: relative;
            padding: 0 0 0 20px;
            height: 100%;
            .detail-left {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 3;
                width: 200px;
                height: 100%;
                border-right: 5px solid #efefef;
                color: #222;
                li{
                    position: relative;
                    height: 50px;
                    line-height: 32px;
                    padding: 10px 40px;
                    border-bottom: 1px solid #f9f9f9;
                    font-size: 14px;
                    cursor: pointer;

                    &.menu-active {
                        color: $mainColor;
                        &:before {
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 5px; 
                            height: 50px;
                            background: $mainColor;
                        }
                    }

                    .iconfont {
                        margin-right: 8px;
                    }
                }
                li:hover{
                    color: $mainColor;
                    &:before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 5px; 
                        height: 50px;
                        background: $mainColor;
                    }
                }
            }
            .dialog-main {
                padding-left: 180px;
                width: 100%;
                height: 100%;
                .app__btn{
                    position: absolute;
                    top: 0;
                    right: 20px;
                    z-index: 99;
                }
                .app__btn-back{
                    top: 15px;
                }
                .a-v-content{
                    padding: 0 20px;
                    width: 100%;
                    border-bottom: 5px solid #eeeeee;

                    &.active {
                        height: 50px;
                        overflow-y: hidden;
                    }
                    .more-btn {
                        color: $mainColor;
                    }

                    .overflow-style {
                        display: inline-block;
                        width: 200px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .a-v-title {
                    .dialog-title {
                        font-size: 16px;
                    }
                    .icon-user {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        background: url('./images/user.png') no-repeat;
                        vertical-align: middle;
                    }
                    .app__btn-mod {
                        position: absolute;
                        right: 4.5%;
                        top: 20px;
                    }
                }
            }
        }        
    }
</style>