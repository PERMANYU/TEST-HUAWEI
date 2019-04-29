<template>
	<div class="list">
        <div class="header">
            <div class="h-all">
                <div class="h-a-title">
                    <Row class="filtrate-header">
                        <ConditionSearch :data="conditionSearchData" @search="conditionSearch" ref="conditionSearchRef" />
                    </Row>
                    <div :class="['h-operation',searchData.length > 0 ? 'active' : '']">
						<SearchBox v-model="searchData"></SearchBox>
					</div>
                </div>
                <div class="h-a-add">
					<div class="app__btn app__btn-add" @click="addClient"  v-if="userRightBtnControl.addCustBtn">添加客户</div>
				</div>
            </div>
        </div>
        <div class="main">
            <Scroll class="app__table" :isShowBottom="true" :isShowRight="true"  fixedTopClassName="m-title" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
                <DragGroup ref="titleWidth" class="m-title app__table-thead" :inline="true" :titleList="tableTitleData" @dragchange="dragchange">
                    <Col class="m-t-name app__table-left" :width="180">
                        <span>客户名称</span>
                    </Col>
                    <DragItem :width="item.width" 
                        :value="item"
                        v-for="(item,index) in tableTitleData"
                        :key="index">
                        <span>{{item.name}}</span>

                        <ColSel class="col-search"  v-if="item.param == 'groupDivided1'"
                                :showOrder="false"
                                @confirm="filterConfirm(item)">
                            <Input v-model="filtrate.groupDivided1"></Input>
                        </ColSel>
                        <ColSel class="col-search"  v-if="item.param == 'groupDivided2'"
                                :showOrder="false"
                                @confirm="filterConfirm(item)">
                            <Input v-model="filtrate.groupDivided2"></Input>
                        </ColSel>
                        <ColSel class="col-search"  v-if="item.param == 'rootCustName'"
                                :showOrder="false"
                                @confirm="filterConfirm(item)">
                            <Input v-model="filtrate.rootCustName"></Input>
                        </ColSel>
                        <ColSel class="col-search"  v-if="item.param == 'rootCustId'"
                                :showOrder="false"
                                @confirm="filterConfirm(item)">
                            <Input v-model="filtrate.rootCustId"></Input>
                        </ColSel>
                    </DragItem>
                </DragGroup>
                <Row :class="['m-item app__table-item']" :inline="true" v-for="(item,index) in tableItemData" :key="index">
                    <!-- <Col :width="60" class="app__table-left">
                        <Checkbox name="checkbox1" :label="item" v-model="checkboxData"></Checkbox>
                    </Col> -->
                    <Col :width="180" :title="item['custName']" @click.native="userRightBtnControl.detailBtn ? detailClick(item) : ''" class="m-i-name app__table-left">
                        <p class="overflow-styles">{{item['custName']}}</p>
                    </Col>
                    <Col :inline="true" :width="tableItem.width" class="overflow-styles" :title="item[tableItem.param]" v-for="(tableItem,tableIndex) in tableTitleData" :key="tableIndex">
                        <span>
                            {{item[tableItem.param]}}
                        </span>
                    </Col>
                </Row>
                <Row :inline="true" :class="['m-item app__table-item']" v-for="item in (20 - tableItemData.length)" :key="item.id">
                    <Col :width="180" class="app__table-left"></Col>
                    <Col :inline="true" :width="tableItem.width" :title="item[tableItem.param]" v-for="(tableItem,tableIndex) in tableTitleData" :key="tableIndex">
                        <span></span>
                    </Col>
                </Row>
            </Scroll>
        </div>
        <div class="footer" v-if="tableItemData.length">
            <Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
            </Pagination>
        </div>
	</div>
</template>

<script type="text/javascript">
    import mainData from '@/assets/json/main.json'
	export default{
		data(){
			return{
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                },
                conditionSearchData:[{
                    iconfont: 'iconkhbs',
                    placeholder:'输入客户名称搜索',
                    param: 'custName',
                    default: ''
                },{
                    iconfont: 'iconkhbs',
                    placeholder:'输入客户标识',
                    param: 'custNumber',
                    default: ''
                },{
                    iconfont: 'iconshenfenzheng',
                    placeholder:'输入证件号码',
                    param: 'certNum',
                    default: ''
                }],
                tableItemData: [],
                filterData: [
                    {
                        value: '我的客户',
                        label: '我的客户'
                    },
                    {
                        value: '我团队的客户',
                        label: '我团队的客户'
                    },
                    {
                        value: '全部政企客户',
                        label: '全部政企客户'
                    },
                    {
                        value: '公众客户',
                        label: '公众客户'
                    }
                ],
                searchInputObjData: {
                    certNum: '',    // 证件号码
                    custName: '',   // 客户名称
                    custNumber: ''  // 客户标识
                },
                tableTitleData:[
                    {
                        name:'客户标识',
                        param:'custNumber',
                        span:2,
                        width: 180
                    },{
                        name:'客户类型',
                        param:'custType',
                        span:2,
                        width: 120
                    },{
                        name:'客户子类型',
                        param:'custSubType',
                        span:2,
                        width: 120
                    },{
                        name:'证件类型',
                        param:'certType',
                        span:2,
                        width: 160
                    },{
                        name: '证件号码',
                        param: 'certNum',
                        width: 200
                    },{
                        name:'所属二级单位',
                        param:'xParentBureauName',
                        span:3,
                        width: 180
                    },{
                        name:'集团分群一层',
                        param:'groupDivided1',
                        span: 3,
                        width: 160
                    },{
                        name:'集团分群二层',
                        param:'groupDivided2',
                        span: 3,
                        width: 160
                    },{
                        name: '客户经理工号',
                        param: 'staffCode',
                        width: 160
                    },{
                        name: '根客户名称',
                        param: 'rootCustName',
                        width: 180
                    },{
                        name: '根客户标识',
                        param: 'rootCustId',
                        width: 120
                    }
                ],
                menuData: [
                    {   
                        code: 'general',
                        name: '常用信息',
                        icon: 'iconjibenxinxi'
                    },{   
                        code: 'expand',
                        name: '扩展信息',
                        icon: 'iconjibenxinxi'
                    },{   
                        code: 'keyPerson',
                        name: '政企关键人',
                        icon: 'iconzhengqiguanjianren'
                    },{
                        code: 'idInformation',
                        name: '证件信息',
                        icon: 'iconzhengjianxinxi'
                    },{
                        code: 'addressInformation',
                        name: '地址信息',
                        icon: 'iconweizhixinxi'
                    },{
                        code: 'clientTaxpayer',
                        name: '客户纳税人',
                        icon: 'iconkehunashuiren'
                    },{
                        code: 'specialList',
                        name: '特殊名单',
                        icon: 'iconteshumingdan'
                    },{
                        code: 'credit-management',
                        name: '信用度管理',
                        icon: 'iconxinyongduguanli'
                    }
                ],
                parentData: {},
                asyncCallBackData: {},
                toggleFlag: true,    // 切换标志
                toggleText: '更多>>',
                currentView: 'general',
                clientDataDetails: {},
                changeObjData: {},     // 修改基本信息
                basicDialog: '修改基本信息',
                dialogSize: {
                    max: 820
                },
                dynamicWidth: '',        // 动态宽度

                // 修改客户信息区域
                custTypeData: [             // 客户类型
                    {
                        label: '政企客户',
                        value: '1000'
                    }
                ],
                certTypeData: mainData.certTypeData,
                custSubTypeData: mainData.custSubTypeData,        // 客户子类型
                customerLevelData: [            // 客户等级
                    {
                        label: 'A',
                        value: 'A'
                    },{
                        label: 'B',
                        value: 'B'
                    },{
                        label: 'C',
                        value: 'C'
                    },{
                        label: 'E',
                        value: 'E'
                    },{
                        label: '银卡',
                        value: '银卡'
                    },{
                        label: '金卡',
                        value: '金卡'
                    },{
                        label: '白金卡',
                        value: '白金卡'
                    },{
                        label: '白金卡P',
                        value: '白金卡P'
                    },
                ],
                nationalityData: [],    // 国家/地区 
                groupDivided1: [            // 集团分群1层
                    {
                        label: '行业客户',
                        value: '行业客户'
                    },{
                        label: '商业客户',
                        value: '商业客户'
                    },{
                        label: '校园客户',
                        value: '校园客户'
                    }
                ],
                groupDivided2: [            // 集团分群2层
                    {
                        label: '行业客户',
                        value: '行业客户'
                    },{
                        label: '特大型客户',
                        value: '特大型客户'
                    },{
                        label: '大型客户',
                        value: '大型客户'
                    },{
                        label: '商业客户',
                        value: '商业客户'
                    },{
                        label: '特大型校园',
                        value: '特大型校园'
                    },{
                        label: '大型校园',
                        value: '大型校园'
                    },{
                        label: '普通校园',
                        value: '普通校园'
                    },{
                        label: '校园客户',
                        value: '校园客户'
                    }
                ],
                userRightBtnControl: {          // 权限按钮控制
                    detailBtn: false,
                    basicUpdateBtn: false,
                    addCustBtn: false
                },
                modifyDataFlag: {},
                filtrate: {				// 筛选信息
					groupDivided1: '',
					groupDivided2: '',
					rootCustName: '',
					rootCustId: ''
                },
                searchData:[]
            }
        },
        watch: {
        	searchData(newVal,oldVal){
        		if(newVal != oldVal){
        			this.getListData()
        		}
        	}
        },
        beforeMount () {
            // 循环权限数据
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100623':
                        this.userRightBtnControl.detailBtn = true;
                        this.$set(this.userRightBtnControl, 'detailBtn', true)
                        break;
                    case 'F-CMB-100606':
                        this.userRightBtnControl.basicUpdateBtn = true;
                        break;
                    case 'F-CMB-100601':
                        this.userRightBtnControl.addCustBtn = true;
                        break;
                    case 'F-CMB-100626':
                        let obj = {
                            code: 'accountManagement',
                            name: '帐户管理',
                            icon: 'iconzhanghuguanli'
                        }
                        this.menuData.push(obj);
                        break;
                    default:
                        break;
                }
            })
        },
        mounted() {
            this.getDynamicWidth();
            this.otherPageSearch();
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
            // 获取表格标题宽度，动态计算空余行的宽度
            getDynamicWidth () {
                this.dynamicWidth = {
                    width: this.$refs.titleWidth.$el.clientWidth + 'px'
                }
            },

            // 主数据
            getMainData () {
                // 国家/地区
                this.$getjsons.getJson("PTY-0005").then(res => {
                    this.nationalityData = res.data.attrSpecDetail.attrValueList
                })
            },

            // 筛选
			filterConfirm(item){
				let val = "";
				switch (item.param) {
					case "groupDivided1":
						val = this.filtrate.groupDivided1;
						break;
					case "groupDivided2":
						val = this.filtrate.groupDivided2;
                        break;
                    case "rootCustName":
						val = this.filtrate.rootCustName;
                        break;
                    case "rootCustId":
						val = this.filtrate.rootCustId;
						break;
					default:
						break;
				};
				let obj = {
					label: item.name,
					code: item.param,
					value: val
				}
				this.searchData = this.searchData.filter(item => item.label != obj.label);
				this.searchData.push(obj);
			},

            // 搜索
            handleSearch () {
                this.getListData()
            },

            // 点击添加客户
            addClient () {
                this.$emit("componentView", "add")
            },
            
            //获取客户数据列表
            getListData (pageIndex = 1) {
                let params = {
                    certNum: this.searchInputObjData.certNum ? this.searchInputObjData.certNum : '',
                    custName: this.searchInputObjData.custName ? this.searchInputObjData.custName : '',
                    custNumber: this.searchInputObjData.custNumber ? this.searchInputObjData.custNumber : '',
                    custType: '1000',
                    pageNum: pageIndex,
                    pageSize: this.pageInfo.pageSize
                };
                this.searchData.filter( item => {
                    params[item.code] = item.value
				})
                this.$axios.get(this.$api.adddClientDistribution, {
                    params
                }).then(res => {
                    if (res.data) {
                        this.tableItemData = res.data
                        this.pageInfo.pageIndex = pageIndex
                    } else {
                        this.$message.warning({"message": "暂无数据"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 客户详情
            detailClick(item) {
                this.$emit("componentView", "detail", item);
            },

            // 获取客户信息详情
            getClientInfoDetail (item) {
                this.$axios.get(this.$api.adddClientDistribution + `/${item.custId}`).then(res=> {
                    if (res.data) {
                        this.$refs.detailDialog.show()
                        this.clientDataDetails = res.data
                        this.asyncCallBackData = res.data
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 左侧菜单切换
            handleChangeMenu (code) {
                this.currentView = code
                this.toggleFlag = true
                this.toggleText = '更多>>'
            },

            // toggle
            toggleClick () {
                if (this.toggleFlag) {
                    this.toggleText = '收起'
                    this.$refs.comp.changeHeight()
                } else {
                    this.toggleText = '更多>>'
                    this.$refs.comp.changeLow()
                }
                this.toggleFlag = !this.toggleFlag
            },

            // 修改按钮
            handleModify () {
                this.$refs.modalType.show()
                this.getMainData()
                this.modifyDataFlag = this.clientDataDetails
                this.changeObjData = Object.assign({}, this.clientDataDetails)
                /* 
                    集团分群一层属性标识    120011
                    集团分群二层属性标识    120012
                */
                let group1 = '120011',
                   group2 = '120012',
                   customerLevel = '120019';
                   
                this.changeObjData.custAttr.forEach(item => {
                    if(item.attrId == group1) {
                        this.changeObjData['groupDivided1Id'] = item.custAttrId
                    } else if (item.attrId == group2) {
                        this.changeObjData['groupDivided2Id'] = item.custAttrId
                    } else if (item.attrId == customerLevel) {
                        this.changeObjData['customerLevelId'] = item.custAttrId
                    }
                })
                
                switch (this.changeObjData.custType) {
                    case '政企客户':
                        this.changeObjData.custType = '1000';
                        break;
                    case '公众客户':
                        this.changeObjData.custType = '1100';
                        break;
                    case '转售客户':
                        this.changeObjData.custType = '1200';
                        break;
                    case '其他客户':
                        this.changeObjData.custType = '9900';
                        break;
                    default:
                        break;
                }

                Object.keys(this.changeObjData).forEach((key) => {
                    if (typeof this.changeObjData[key] === 'string' && this.changeObjData[key].indexOf('|') !== -1) {
                        this.changeObjData[key] =  this.changeObjData[key].split('|')[0]
                    }
                });
            },

            // 保存
            handleSave () {
                let otherObj = {},
                    allArr = [],
                    otherArr = ['customerLevel', 'groupDivided1', 'groupDivided2'];
                otherArr.forEach(item => {
                    if (this.modifyDataFlag[item] == null) {
                        otherObj = {
                            "op": this.modifyDataFlag[item] == null ? "ADD" : "replace",
                            "path": this.modifyDataFlag[item] == null ? "/custAttr" : "/custAttr/custAttrId=" + this.changeObjData[item + 'Id'],
                            "value": {
                                custId: this.changeObjData.custId,
                                attrId: item == 'customerLevel' ? 120019 : (item == 'groupDivided1' ? 120011 : (item == 'groupDivided2' ? 120012 : '')),
                                attrValue: this.changeObjData[item],
                                statusCd: '1000'
                            }
                        }
                    } else {
                        otherObj = {
                            "op": this.modifyDataFlag[item] == null ? "ADD" : "replace",
                            "path": this.modifyDataFlag[item] == null ? "/custAttr" : "/custAttr/custAttrId=" + this.changeObjData[item + 'Id'],
                            "value": {
                                attrValue: this.changeObjData[item]
                            }
                        }
                    }
                    allArr.push(otherObj)
                })
                allArr.push({
                    "op": this.modifyDataFlag.custType == null ? "ADD" : "replace",
                    "path":"/custType",
                    "value": this.changeObjData.custType
                },{
                    "op": this.modifyDataFlag.custSubType == null ? "ADD" : "replace",
                    "path": "/custSubType",
                    "value": this.changeObjData.custSubType
                })
                // let customerLevel = {}, 
                //     groupDivided1 = {},
                //     groupDivided2 = {};

                // if(this.modifyDataFlag.customerLevel == null) {
                //     customerLevel = {
                //         custId: this.changeObjData.custId,
                //         attrId: '120019L',
                //         attrValue: this.changeObjData.customerLevel
                //     }
                // } else {
                //     customerLevel['attrValue'] = this.changeObjData.customerLevel
                // }

                // if(this.modifyDataFlag.groupDivided1 == null) {
                //     groupDivided1 = {
                //         custId: this.changeObjData.custId,
                //         attrId: '120011L',
                //         attrValue: this.changeObjData.groupDivided1
                //     }
                // } else {
                //     groupDivided1['attrValue'] = this.changeObjData.groupDivided1
                // }

                // if(this.modifyDataFlag.groupDivided2 == null) {
                //     groupDivided2 = {
                //         custId: this.changeObjData.custId,
                //         attrId: '120012L',
                //         attrValue: this.changeObjData.groupDivided2
                //     }
                // } else {
                //     groupDivided2['attrValue'] = this.changeObjData.groupDivided2
                // }

                this.$axios.patch(this.$api.ModifyBasicInfomation + '/detail?custId=' + this.changeObjData.custId,
                    allArr
                // [
                //     {
                //         "op": this.modifyDataFlag.custType == null ? "ADD" : "replace",
                //         "path":"/custType",
                //         "value": this.changeObjData.custType
                //     },
                //     {
                //         "op": this.modifyDataFlag.customerLevel == null ? "ADD" : "replace",
                //         "path": this.modifyDataFlag.customerLevel == null ? "/custAttr" : "/custAttr/custAttrId=" + this.changeObjData.customerLevelId,
                //         "value": customerLevel
                //     },
                //     {
                //         "op": this.modifyDataFlag.custSubType == null ? "ADD" : "replace",
                //         "path": "/custSubType",
                //         "value": this.changeObjData.custSubType
                //     },
                //     {
                //         "op": this.modifyDataFlag.groupDivided1 == null ? "ADD" : "replace",
                //         "path":this.modifyDataFlag.groupDivided1 == null ? "/custAttr" : "/custAttr/custAttrId=" + this.changeObjData.groupDivided1Id,
                //         "value": groupDivided1
                //     },
                //     {
                //         "op": this.modifyDataFlag.groupDivided2 == null ? "ADD" : "replace",
                //         "path": this.modifyDataFlag.groupDivided2 == null ? "/custAttr" : "/custAttr/custAttrId=" + this.changeObjData.groupDivided2Id,
                //         "value": groupDivided2
                //     }
                // ]
                )
                .then(res => {
                    if (res.data) {
                        this.$message.success({"message": "修改成功"})
                        this.$refs.modalType.hide()
                        this.getClientInfoDetail(this.parentData)
                        this.getListData()
                    } else {
                        this.$message.error({"message": "修改失败"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 返回
            handleCancel () {
                this.$refs.modalType.hide()
            },

            dragchange() {

            },

            // 分页
            pageChange(val) {
                this.getListData(val)
            },
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
            width: 90%;
            height: 80px;

            .h-all{

                padding: 20px 20px 0;

                .h-a-title{
                    .left-title{
                        float: left;
                    }
                    .filtrate-header {
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
            font-size: 12px;
            padding: 0 20px;

            .m-title{
                text-align: center;
                box-shadow: 0 1px 1px #f1f5fa;

                span {
                    color: $mainColor;
                    font-weight: bold;
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
                .overflow-styles {
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
            padding: 0 20px;
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
                }
                .a-v-title {
                    .dialog-title {
                        font-size: 16px;
                    }
                    .icon-user {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        background: url('./images/building-name.png') no-repeat;
                        vertical-align: middle;
                    }
                    .app__btn {
                        position: absolute;
                        top: 15px;
                        right: 40px;
                    }
                }

                .overflow-style {
                    display: inline-block;
                    width: 200px;
                    overflow: hidden;
                    white-space: nowrap;
                    vertical-align: text-bottom;
                }
            }
        }

        .modal-content {
            padding: 20px;
        }
    }
</style>