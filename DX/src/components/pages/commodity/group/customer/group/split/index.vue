<template>
    <div class="main">
        <div class="mod-title">
            <div>目标客户</div>
        </div>

        <TabPane :tabs="tabs" :value="tabDefault" @change="tabChange" :isAuto="false">
            <template slot="label">
                <div class="app__btn app__btn-add" @click="addSales">添加</div>
                <div class="app__btn app__btn-clear" @click="showCusList">查看目标客户清单</div>

                <Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="afListScroll">
                    <Row class="app__table-thead">
                        <Col :span="6">客户标签编码</Col>
                        <Col :span="6">客户标签名称</Col>
                        <Col :span="4">属性值类别</Col>
                        <Col :span="6">配置参数</Col>
                        <Col :span="2">操作</Col>
                    </Row>

                    <Row :class="['app__table-item']" v-for="(item,index) in labelDataSel" :key="index">
                        <Col :span="6" class="no-wrap">{{item.labelCode}}</Col>
                        <Col :span="6" class="no-wrap" :title="item.labelName">{{item.labelName}}</Col>
                        <Col :span="4">{{item.labelValueType == '1000' ? '输入型' : '枚举型'}}</Col>
                        <Col :span="6" class="no-wrap">{{item.labelValue}}</Col>
                        <Col :span="2">
                            <i class="iconfont icon-shanchu" @click="labelDelete(item,'label')"></i>

                        </Col>
                    </Row>
                    <Row v-if="!labelDataSel.length" class="app__data-none">
                        <Col :span="24"><span>当前无数据!</span></Col>
                    </Row>

                    <Pagination  :pageIndex="pageInfoCusLabel.pageIndex" :pageSize="pageInfoCusLabel.pageSize" :rowCount="pageInfoCusLabel.rowCount"  @change="pageChangeCusLabel" :isCenter="true">
                    </Pagination>
                </Scroll>

            </template>

            <template slot="businessrules">
                <div class="sel-box">
                    <i class="title-icon"></i>
                    <span class="y-span">待选业务规则列表</span>

                    <!--选中的树-->
                    <div class="tag-box" v-show="selBusinessType.catalogItemName">
                        <span>{{selBusinessType.catalogItemName}}</span>
                        <i @click="selBusinessType={}"></i>
                    </div>

                    <Search class="offer-sear" placeholder="请输入业务规则名称"
                            @search="searchClick" ref="searchVal"></Search>
                </div>
                <div class="top">
                    <div class="t-left">
                        <div class="tree-box">
                            <Scroll :isShowRight="true" ref="scroll">
                                <TreeSimple v-for="(item,index) in businessItemTree"
                                      :folder="item" v-model="selBusinessType" :key="index"
                                      :childrenStr="'children'" :initLevel="1" :levelStr="'level'"
                                      :keys="treeShowKeyItems" :selLevel="9999">
                                </TreeSimple>
                            </Scroll>
                        </div>
                    </div>

                    <div class="t-right">
                        <div class="app__table__inner">
                            <Row class="app__table-thead">
                                <Col :span="10">业务规则编码</Col>
                                <Col :span="10">业务规则名称</Col>
                                <Col :span="4">操作</Col>
                            </Row>

                            <Row :class="['app__table-item']" v-for="(item,index) in businessData" :key="index">
                                <Col :span="10">{{item.busiRuleCode}}</Col>
                                <Col :span="10">{{item.busiRuleName}}</Col>
                                <Col :span="4">
                                    <i v-if="!item.flag" class="iconfont icon-weixuanzhong-fang" @click='businessClick(item)'></i>
                                    <i v-if="item.flag" class="iconfont icon-xuanzhong-fang" @click="labelDelete(item,'business')"></i>
                                </Col>
                            </Row>
                            <Row :class="['m-item app__table-item']" v-if="businessData.length != 0" v-for="item in (5 - businessData.length)" :key="item.id"></Row>
                            <Row v-if="businessData.length == 0" class="app__data-none">
                                <Col :span="24"><span>暂无数据</span></Col>
                            </Row>

                            <Pagination v-show="businessData.length>0" :pageIndex="pageInfoList.pageIndex" :pageSize="pageInfoList.pageSize" :rowCount="pageInfoList.rowCount" :perPages=1 @change="pageChange" :isCenter="true">
                            </Pagination>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="sel-box border-top">
                        <i class="title-icon"></i>
                        <span class="y-span">已选业务规则列表</span>
                    </div>

                    <!--底部-->
                    <div class="bottom">
                        <div class="tag-box" v-for="(item,index) in businessDataSel" :key="index">
                            <span>{{item.busiRuleName}}</span>
                            <i @click="labelDelete(item,'business')"></i>
                        </div>

                        <Row v-show="businessDataSel.length == 0" class="app__data-none">
                            <Col :span="24"><span>暂无数据</span></Col>
                        </Row>
                    </div>
                </div>
            </template>
        </TabPane>
        
        <!-- 添加客户标签 -->
        <Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加客户标签" ref="addSales" initBtn>
            <template slot="btnBox">
                <span class="back" @click="btnCancel()">取消</span>
                <span class="next" @click="addSalesConfirm()" >保存</span>
            </template>
			<Scroll class="main" :isShowRight="true">
                <div class="top">
                    <div class="t-left">
                        <div class="tree-box">
                            <Scroll :isShowRight="true" ref="scroll">
                                <TreeSimple v-for="(item,index) in catalogItemTree"
                                      :folder="item" v-model="selTemplateType" :key="index"
                                      :childrenStr="'children'" :initLevel="1" :levelStr="'level'"
                                      :keys="treeShowKeyItems" :selLevel="9999">
                                </TreeSimple>
                            </Scroll>
                        </div>
                    </div>

                    <div class="t-right">
                        <Search class="offer-label" placeholder="请输入标签名称搜索"
                            @search="searchClick" ref="searchVal"></Search>
                        <div class="app__table__inner">
                            <Row class="app__table-thead">
                                <Col :span="6">标签编码</Col>
                                <Col :span="8">标签名称</Col>
                                <Col :span="6">属性类型</Col>
                                <Col :span="4">操作</Col>
                            </Row>

                            <Row :class="['app__table-item']" v-for="(item,index) in labelData" :key="index">
                                <Col :span="6">{{item.labelCode}}</Col>
                                <Col :span="8" class="no-wrap" :title="item.labelName">{{item.labelName}}</Col>
                                <Col :span="6">{{item.labelValueType == '1000' ? '输入型' : '枚举型'}}</Col>
                                <Col :span="4">
                                    <i v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="addLabelClick(item)"></i>
						            <i v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang" @click="deleteLabelClick(item)"></i>
                                </Col>
                            </Row>

                            <!-- <Row :class="['m-item app__table-item']" v-if="labelData.length != 0" v-for="item in (5 - labelData.length)" :key="item.id"></Row> -->
                            <Row v-if="labelData.length == 0" class="app__data-none">
                                <Col :span="24"><span>暂无数据</span></Col>
                            </Row>

                            <Pagination v-show="labelData.length>0" :pageIndex="pageInfo.pageIndex"
                                        :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount"
                                        :perPages=1 @change="pageChange" :isCenter="true">
                            </Pagination>
                        </div>
                    </div>
                </div>

                    <div class="sel-box border-top">
                        <i class="title-icon"></i>
                        <span class="y-span">已选客户标签列表</span>
                    </div>
                    <div class="bottom">
                        <Scroll class="app__table__inner yx-scroll"  :isShowRight="true" ref="afListScroll">
                            <Row class="app__table-thead">
                                <Col :span="6">客户标签编码</Col>
                                <Col :span="6">客户标签名称</Col>
                                <Col :span="4">属性值类别</Col>
                                <Col :span="6">配置参数</Col>
                                <Col :span="2">操作</Col>
                            </Row>

                            <Row :class="['app__table-item']" v-for="(item,index) in delmkt(labelSelectData)" :key="index">
                                <Col :span="6" class="no-wrap">{{item.labelCode}}</Col>
                                <Col :span="6" class="no-wrap" :title="item.labelName">{{item.labelName}}</Col>
                                <Col :span="4">{{item.labelValueType == '1000' ? '输入型' : '枚举型'}}</Col>
                                <Col :span="6" v-if="item.labelValueType == '1000'" :class="{validate:!item.labelValue}" >
                                    <Input v-model="item.labelValue" ></Input>
                                </Col>
                                <Col :span="6" v-if="item.labelValueType == '2000'" :class="{validate:!item.labelValueId}">
                                   <Select v-model="item.labelValueId" :data="item.labelValues" @change="labelChange(arguments[0], item)"  dataValueStr="labelValueId" dataLabelStr="valueName" name="valueName"></Select>
                                </Col>
                                <Col :span="2">
                                    <i class="iconfont icon-shanchu" @click="deleteLabel(item, index)"></i>
                                </Col>
                            </Row>
                            <Row v-if="!labelSelectData.length" class="app__data-none">
                                <Col :span="24"><span>当前无数据!</span></Col>
                            </Row>
                        </Scroll>
                    </div>
			</Scroll>
		</Dialog>

        <!-- 查看目标客户清单 -->
        <Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="查看目标客户清单" ref="cusList" @confirm="cusListConfirm">
			<Scroll class="main" :isShowRight="true">
                <div class="top">
                    <div class="t-left">
                        <div class="tree-box">
                            <Scroll :isShowRight="true" ref="scroll">
                                <TreeSimple v-for="(item,index) in catalogItemTree"
                                      :folder="item" v-model="selPreviewType" :key="index"
                                      :childrenStr="'children'" :initLevel="1" :levelStr="'level'"
                                      :keys="treeShowKeyItems" :selLevel="9999">
                                </TreeSimple>
                            </Scroll>
                        </div>
                    </div>

                    <div class="t-right">
                        <div class="app__btn app__btn-confirm" @click="trialPreview()">试算预览</div>
                        <Scroll class="app__table__inner"  @mounted="yxScrollMounted" :isShowBottom="true" ref="listScroll">
                            <Row class="app__table-thead"  v-show="previewList.length > 0" inline>
                                <Col :width="previewList.length < 6 ? Math.floor(718/previewList.length) : 120 " v-for="(item,index) in previewList" :key="index" class="no-wrap">{{item.chValue}}</Col>
                            </Row>

                            <Row :class="['app__table-item']" v-show="previewList.length > 0" v-for="(itemHit,indexHit) in hits" :key="itemHit._id" inline>
                                <Col :width="previewList.length < 6 ? Math.floor(718/previewList.length) : 120 " v-for="(itemHit1, indexHit1) in itemHit._source" :key="indexHit1" class="no-wrap">
                                    {{itemHit1}}
                                </Col>
                            </Row>

                            <Row v-if="previewList.length == 0" class="app__data-none">
                                <Col :span="24"><span>暂无数据</span></Col>
                            </Row>
                        </Scroll>
                    </div>
                </div>
			</Scroll>
		</Dialog>


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
                dialogSize: {
                    size: 90,
                    min: 800,
                    max: 1000
                },
                labelData: [],  // 目标客户标签
                businessData: [],  // 业务规则列表
                labelDataSel: [],  // 已选客户标签
                businessDataSel: [],  // 业务规则数据
                catalogItemTree: [],  // 客户标签树
                businessItemTree: [],  // 业务规则树
                selTemplateType: {},
                selBusinessType: {},
                selPreviewType: {}, // 试算预览
                catalogItemId: "",  // 客户标签标识
                parCatalogItemId: "", // 客户标签父标识
                businessItemId: "",  // 业务规则标识
                searchName: "" , // 搜索框输入名称
                searchNameList: "" , // 搜索框输入名称
                labelItem: {},
                businessItem: {},
                delType: "",
                tabDefault: 'label',
                tabs: [{
                    label: "客户标签",
                    value: "label"
                }, {
                    label: "业务规则",
                    value: "businessrules"
                }],
                tipInfo: {
                    iconType: 3,
                    msg:'',
                    showBtn:{
                        clear: true,
                        save: true
                    }
                },
                treeShowKeyItems: [{
                    key: 'catalogItemName',
                    span: 24
                }],

                pageInfoCusLabel: { // 目标客户标签
                    pageIndex: 1,
                    pageSize: 5,
                    rowCount: 0
                },
                pageInfo: {    // 客户标签
                    pageIndex: 1,
                    pageSize: 5,
                    rowCount: 0
                },
                pageInfoList: {   // 业务规则
                    pageIndex: 1,
                    pageSize: 5,
                    rowCount: 0
                },

                // 客户标签已选
                labelSelectData: [],
                tipSelData: {},

                // 试算预览列表
                previewList: [],
                yxOfferRelsParams:{
					cNameWidth:100,
					nameWidth:100
                },
                hits: [],
                source: []
                
            }
        },
        mounted() {
            // this.getTreeData();
            // this.getLabelList();
            this.getobjectLabelRel();
            this.getBusTreeData();
            this.getBusinessList();
            
        },
        watch:{
            selTemplateType(val,oldval){
                if(val != oldval){
                    this.catalogItemId = "";
                    this.searchName = "";
                    this.$refs.searchVal.setValue("");
                    if(val.catalogItemId != undefined){
                        this.catalogItemId = val.catalogItemId;
                    }else{
                        this.catalogItemId = "";
                    }
                    this.getLabelList();
                }
            },
            selBusinessType(val,oldval){
                if(val != oldval){
                    this.businessItemId = "";
                    this.searchNameList = "";
                    this.$refs.searchVal.setValue("");
                    if(val.catalogItemId != undefined){
                        this.businessItemId = val.catalogItemId;
                    }else{
                        this.businessItemId = "";
                    }
                    this.getBusinessList('');
                }
            },

            selPreviewType(val,oldval){
                if(val != oldval){
                     if(val.catalogItemId != undefined){
                        this.catalogItemId = val.catalogItemId;
                        this.parCatalogItemId = val.parCatalogItemId;

                    }else{
                        this.catalogItemId = "";
                    }
                }
            },
        },
        methods: {
            yxPullEnd(){
				this.$refs.listScroll.initScroll();
			},

            yxScrollMounted(vm){
				let yxScrollRect = vm.$el.getBoundingClientRect(),
					nameW = yxScrollRect.width - 730;
				this.yxOfferRelsParams.cNameWidth = nameW / 2;
				this.yxOfferRelsParams.nameWidth = nameW / 2;
			},
            // 添加目标客户
            addSales() {
                this.labelSelectData = [];
				for(let ele of this.labelDataSel) {
					if(ele.labelValueType == '2000') {
						this.$axios.get(this.$api.replace(this.$api.LabelValue, ['{labelId}'], [ele.labelId]), {
							params: {
								labelId: ele.labelId
							}
						}).then(res => {
							if(res.data.success == true) {
								let labelValues = res.data.labelValues;
								let temp = [];
								for(let val of labelValues) {
									temp.push({
										valueName: val.valueName,
										labelValueId: val.labelValueId
									})
                                }
								this.$set(ele, 'labelValues', temp);
								let Temp = {
									labelCode: ele.labelCode,
									labelName: ele.labelName,
									labelType: ele.labelType,
									labelValueType: ele.labelValueType,
									labelId: ele.labelId,
									statusCd: '1000',
									labelValue: ele.valueName,
									valueName: ele.valueName,
									labelValueId: ele.labelValueId,
									objectLabelRelId: ele.objectLabelRelId,
									labelValues: ele.labelValues
								}
								this.labelSelectData.push(Temp);
							} else {
								this.$message.error({ message: res.data.msg });
							}
						}).catch(error => {
							this.$message.error({message: error.response.data.msg})
						})
					} else {
						let Temp = {
							labelCode: ele.labelCode,
							labelName: ele.labelName,
							labelType: ele.labelType,
							labelValueType: ele.labelValueType,
							labelId: ele.labelId,
							statusCd: '1000',
							labelValue: ele.labelValue,
							valueName: ele.valueName,
							labelValueId: ele.labelValueId ? ele.labelValueId : '',
							objectLabelRelId: ele.objectLabelRelId
						}
						this.labelSelectData.push(Temp);
					}
                }
				
                this.getTreeData();
				this.getLabelList();
                this.$refs.addSales.show();
            },


            // 试算预览
            trialPreview() {
                if (this.parCatalogItemId == '') {
                    this.$message.error({message: '请选择目录'})
                    return
                }
                this.$refs.listScroll.initScroll();
                this.getCusPreviewList();
            },
            // 查看目标客户清单
            showCusList() {
                this.previewList = [];
                this.catalogItemId = '';
                this.parCatalogItemId = '';
                this.selPreviewType = {};
                this.getTreeData();
                this.$refs.cusList.show();
            },

            cusListConfirm() {
                this.$refs.cusList.hide();
            },
            
            searchClick(data) {
                if(this.tabDefault == "label"){
                    this.searchName = data;
                    this.pageChange (1);
                    data = '';
                }else{
                    this.searchNameList = data;
                    this.pageChange (1);
                    data = '';
                }
            },
            // 业务规则,客户标签分页
            pageChange (val){
                if(this.tabDefault == "label"){
                    this.pageInfo.pageIndex = val;
                    this.getLabelList();
                }else {
                    this.pageInfoList.pageIndex = val;
                    this.getBusinessList();
                } 
            },
            // 已选目标客户标签
            pageChangeCusLabel(val) {
                this.pageInfoCusLabel.pageIndex = val;
                this.getobjectLabelRel();
            },
            

            delmkt(arr) {
				return [...arr].filter(item => item.statusCd != '1100');
			},
            selectMkt(val) {
                return this.labelSelectData.filter(item => item.statusCd != '1100').find(item => item.labelId == val.labelId)
            },

            // 客户标签选中
            addLabelClick(item) {
                if(item.labelValueType == '2000') {
					this.$axios.get(this.$api.replace(this.$api.LabelValue, ['{labelId}'], [item.labelId]), {
						params: {
							labelId: item.labelId
						}
					}).then(res => {
						if(res.data.success == true) {
							let labelValues = res.data.labelValues;
                            let temp = [];
							for(let ele of labelValues) {
								temp.push({
									valueName: ele.valueName,
                                    labelValueId: ele.labelValueId,
								})
							}
							this.$set(item, 'labelValues', temp);
							let Temp = {
                                createDate: item.createDate,
                                createStaff: item.createStaff,
                                updateStaff: item.updateStaff,
                                labelId: item.labelId,
                                labelValue: '',
                                valueName: '',
                                labelValueId: item.labelValueId,
                                objId: this.componentData.offerId,
                                objType: '1700',
                                objectLabelRelId: item.objectLabelRelId,
								labelCode: item.labelCode,
								labelName: item.labelName,
								labelType: item.labelType,
								labelValueType: item.labelValueType,
								statusCd: item.statusCd,
								labelValues: item.labelValues,
							}
                            this.labelSelectData.push(Temp);
						} else {
							this.$message.error({ message: res.data.msg });
						}
					}).catch(error => {
						this.$message.error({message: error.response.data.msg})
					})
				} else {
					let Temp = {
                        createDate: item.createDate,
                        createStaff: item.createStaff,
                        updateStaff: item.updateStaff,
                        labelId: item.labelId,
                        labelValue: '',
                        valueName: '',
                        labelValueId: item.labelValueId,
                        objId: this.componentData.offerId,
                        objType: '1700',
                        objectLabelRelId: item.objectLabelRelId,
                        labelCode: item.labelCode,
                        labelName: item.labelName,
                        labelType: item.labelType,
                        labelValueType: item.labelValueType,
                        statusCd: item.statusCd,
					}
					this.labelSelectData.push(Temp);
				}
            },

             deleteLabelClick(item) {
                for(var i=0;i<this.labelSelectData.length;i++){
					if(this.labelSelectData[i].labelId == item.labelId){
						this.labelSelectData.splice(i,1);
					}
				}
            },

            labelChange(arg, val) {
                val.valueName = arg.valueName;
                val.labelValue = arg.valueName;
            },
            
            deleteLabel(item, index) {
                item.statusCd = '1100'
            },

            btnCancel() {
                this.$refs.addSales.hide();
                this.getobjectLabelRel();
            },

            // 客户标签保存
            addSalesConfirm() {
                this.labelDataSel = []
                for(let ele of this.labelSelectData) {
					let temp = {};
					if(ele.labelValueType == '2000') {
						temp = {
                            "createDate": ele.createDate ? ele.createDate : '',
                            "createStaff": ele.createStaff ? ele.createStaff : this.$user.getInfo().id,
                            "updateStaff": ele.updateStaff ? ele.updateStaff : this.$user.getInfo().id,
                            "labelId": ele.labelId,
                            "labelValue": ele.labelValue,
                            "valueName": ele.valueName,
                            "labelValueId": ele.labelValueId ? ele.labelValueId : '',
                            "objId": this.componentData.offerId,
                            "objType": '1700',
                            "objectLabelRelId": ele.objectLabelRelId ? ele.objectLabelRelId : '',
							"labelCode": ele.labelCode,
							"labelName": ele.labelName,
							"labelType": ele.labelType,
							"labelValueType": ele.labelValueType,
							"statusCd": ele.statusCd,
                            "objectLabelRelPublishId": 0,
                            "remark": '',
                            "statusDate": '',
                            "updateDate": '',
                            "version": ''
						}
                        this.labelDataSel.push(temp);
					} else {
						temp = {

                            "createDate": ele.createDate ? ele.createDate : '',
                            "createStaff": ele.createStaf ? ele.createStaf : this.$user.getInfo().id,
                            "updateStaff": ele.updateStaff ? ele.updateStaff : this.$user.getInfo().id,
                            "labelId": ele.labelId,
                            "labelValue": ele.labelValue,
                            "valueName": ele.labelValue,
                            "labelValueId": ele.labelValueId ? ele.labelValueId :'',
                            "objId": this.componentData.offerId,
                            "objType": '1700',
                            "objectLabelRelId": ele.objectLabelRelId ? ele.objectLabelRelId : '',
							"labelCode": ele.labelCode,
							"labelName": ele.labelName,
							"labelType": ele.labelType,
							"labelValueType": ele.labelValueType,
							"statusCd": ele.statusCd,
                            "objectLabelRelPublishId": 0,
                            "remark": '',
                            "statusDate": '',
                            "updateDate": '',
                            "version": ''
						}
						this.labelDataSel.push(temp);
					}
                }
               
                for (let ele of this.labelDataSel) {
                    if (ele.statusCd == '1100') continue;
                    if (ele.labelValueType == '1000') {
                        if (!ele.labelValue) {
                            this.$message.warning({message: '请输入红框值！'});
						    return;
                        }
                    } else {
                         if (!ele.labelValueId) {
                            this.$message.warning({message: '请输入红框值！'});
                            return;
                        }
                    }
                   
                }

                this.$axios.post(this.$api.replace(this.$api.ModObjectLabelRelJt,['{offerId}'],[this.componentData.offerId]),this.labelDataSel).then((res) => {
                    if(res.data.success){
                        this.$message.success({"message": "客户标签保存成功！"})
                        this.getobjectLabelRel();
                        this.$refs.addSales.hide();
                    }else{
                        this.$message.error({"message": "客户标签保存失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg})
                })
            },

            // 业务规则选择保存
            businessClick(item) {
                this.$set(item,'flag','Y');
                let businessArr = [];
                let businessObj = {
                    "busiRuleId": item.busiRuleId,
                    "createDate": "",
                    "createStaff": this.$user.getInfo().id,
                    "offerId": this.componentData.offerId,
                    "offerRuleRelId": item.offerRuleRelId,
                    "offerRuleRelPublishId": 0,
                    "remark": "",
                    "statusCd": item.statusCd,
                    "statusDate": "",
                    "updateDate": "",
                    "updateStaff": 0,
                    "version": ""
                }
                businessArr.push(businessObj);
                this.$axios.post(this.$api.replace(this.$api.BusinessRule,['{offerId}'],[this.componentData.offerId]),{
                    "offerRuleRelList": businessArr
                }).then((res) => {
                    if(res.data.success){
                        this.$message.success({"message": "业务规则保存成功！"})
                        this.getobjectBusRel();
                    }else{
                        this.$message.error({"message": "业务规则保存失败！"})
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },
            // 删除客户标签/业务规则
            labelDelete(itemList,type) {
                this.tipInfo.msg = `确认要删除吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
                if(type == "label"){
                    this.labelItem = itemList;
                }else{
                    this.businessItem = itemList;
                }
                this.delType = type;
            },

            tipConfirm() {
                if(this.delType == "business"){
                    
                    this.$refs.tip.hide();
                    let businessArr = this.businessDataSel.filter(item => item.busiRuleId == this.businessItem.busiRuleId);
                    this.$axios.delete(this.$api.replace(this.$api.BusinessRuleDel,['{offerId}','{offerRuleRelId}'],[this.componentData.offerId,businessArr[0].offerRuleRelId]),{
                        params: {
                            "updateStaff": this.$user.getInfo().id,
                            "version": businessArr[0].version
                        }
                    }).then((res) => {
                        if(res.data.success == true){
                            this.$message.success({"message": "删除成功！"})
                            this.getobjectBusRel();
                        }else{
                            this.$message.error({"message": "删除失败！"})
                        }
                    }).catch(error => {
                        this.$message.error({ message: error.response.data.msg })
                    })

                }else{
                    this.$refs.tip.hide();
                    let labelArr = this.labelDataSel.filter(item => item.labelValueId == this.labelItem.labelValueId);
                    let arr = [{
                        "createDate": "",
                        "createStaff": this.$user.getInfo().id,
                        "labelId": labelArr[0].labelId,
                        "labelValue": labelArr[0].labelValue,
                        "labelValueId": labelArr[0].labelValueId,
                        "objId": labelArr[0].objId,
                        "objType": labelArr[0].objType,
                        "objectLabelRelId": labelArr[0].objectLabelRelId,
                        "labelValueType": labelArr[0].labelValueType,
                        "objectLabelRelPublishId": 0,
                        "remark": "",
                        "statusCd": '1100',
                        "statusDate": "",
                        "updateDate": "",
                        "updateStaff": this.$user.getInfo().id,
                        "version": ""
                    }]
                    this.$axios.post(this.$api.replace(this.$api.ModObjectLabelRelJt,['{offerId}'],[this.componentData.offerId]),arr).then((res) => {
                        if(res.data.success){
                            this.$message.success({"message": "删除成功！"})
                            this.getobjectLabelRel();
                        }else{
                            this.$message.error({"message": "删除失败！"})
                        }
                    }).catch(error => {
                        this.$message.error({ message: error.response.data.msg })
                    })
                }
            },
            // tab 标签切换
            tabChange(val) {
                if(val == "businessrules"){
                    this.tabDefault = val;
                }else if(val == "label") {
                    this.tabDefault = val;
                }
            },
            // 标签列表查询(分页)
            getLabelList() {
                this.$axios.get(this.$api.LabelList,{
                    params: {
                        "labelCode": "",
                        "labelName": this.searchName,
                        "labelType": "10",
                        "catalogItemId": this.catalogItemId,
                        "limit": 5,
                        "page": this.pageInfo.pageIndex
                    }
                }).then((res) => {
                    if(res.data.success){
                        this.labelData = res.data.labelList.content;
                        this.pageInfo.rowCount = res.data.labelList.total;
                        this.getobjectLabelRel();
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },

            // 试算预览列表
            getCusPreviewList() {
                this.$axios.get(this.$api.replace(this.$api.OrdObjectLabelRelView,['{offerId}'],[this.componentData.offerId]),{
                    params: {
                        "offerId": this.componentData.offerId,
                        "labelType": "10",
                        "catalogItemId": this.parCatalogItemId,
                    }
                }).then((res) => {
                    if(res.data.code == '200'){
                        this.hits = res.data.body.hits.hits || [];
                        this.previewList = res.data.body.chFields || [];
                        // let temp = []
                        // this.previewList.forEach(item => {
                        //     temp.push(item.enValue)
                        // })
                        // temp = temp.slice(0, 10)
                        // this.hits.forEach(item => {
                        //    this.source.push(item._source)
                        // })
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },

            // 标签树查询
            // getTreeData() {
            //     this.$axios.post(this.$api.QryCatalogDetail,{
            //         body:{
            //             catalogNbr: 100
            //         }
            //     }).then(res => {
            //         if (res.data.code == '000000') {
            //             this.catalogItemTree = res.data.body.catalogItems;
            //         }else{
            //             this.$message.error({message: res.data.msg})
            //         }
            //     }).catch( error => {
            //         this.$message.error({message: error.response.data.msg})
            //     })
            // },

            //获取标签树目录树
            getTreeData() {
                this.$axios.get(this.$api.Catalog+'/10107',{
                    params:{

                    }
                }).then(res => {
                    if (res.data.success) {
                        this.catalogItemTree = res.data.catalogDetail.catalogItems||[];

                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },

            // 客户标签配置列表查询
            getobjectLabelRel() {
                this.$axios.get(this.$api.replace(this.$api.ObjectLabelRel,['{offerId}'],[this.componentData.offerId]),{
                    params: {
                        "offerId": this.componentData.offerId,
                        "labelType": "10",
                        "limit": this.pageInfoCusLabel.pageSize,
                        "page": this.pageInfoCusLabel.pageIndex
                    }
                }).then((res) => {
                    if(res.data.success){
                        this.labelDataSel = res.data.labelResList.content || [];
                        this.pageInfoCusLabel.rowCount = res.data.labelResList.total;
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },

            // 商品标签配置
            save(callback) {
                this.$message.success({"message": "保存成功！"})
            },
            // 业务规则列表查询(分页)
            getBusinessList(val) {
                this.$axios.get(this.$api.BusinessList,{
                    params: {
                        busiRuleName: this.searchNameList,
                        busiRuleCode: "",
                        catalogItemId: this.businessItemId,
                        limit: 5,
                        page: this.pageInfoList.pageIndex
                    }
                }).then((res) => {
                    if(res.data.success){
                        this.businessData = res.data.busiRuleList.content;
                        this.pageInfoList.rowCount = res.data.busiRuleList.total;
                        this.getobjectBusRel();
                        
                    }else{
                        this.$message.error({ message: res.data.msg })
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },

           // 业务规则树查询
        //    getBusTreeData() {
        //        this.$axios.post(this.$api.QryCatalogDetail,{
        //            body:{
        //                catalogNbr: 200
        //            }
        //        }).then(res => {
        //            if (res.data.code == '000000') {
        //                this.businessItemTree = res.data.body.catalogItems;
        //            }else{
        //                this.$message.error({message: res.data.msg})
        //            }
        //        }).catch( error => {
        //            this.$message.error({message: error.response.data.msg})
        //        })
        //    },

            //获取业务规则树目录树
            getBusTreeData() {
                this.$axios.get(this.$api.Catalog+'/10103',{
                    params:{

                    }
                }).then(res => {
                    if (res.data.success) {
                        this.businessItemTree = res.data.catalogDetail.catalogItems||[];

                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },

            // 业务规则配置列表查询
            getobjectBusRel() {
                this.$axios.get(this.$api.replace(this.$api.BusinessRule,['{offerId}'],[this.componentData.offerId])
                ).then((res) => {
                    if(res.data.success){
                        this.businessDataSel = [...res.data.ordOfferRuleRelList.content];
                        // 判断选中的业务规则
                        this.businessData.forEach(item => {
                            let arr = this.businessDataSel.filter(itemList =>  item.busiRuleCode == itemList.busiRuleCode);
                            if(arr.length != 0){
                                this.$set(item,'flag','Y');
                            }else{
                                this.$set(item,'flag','');
                            }
                        })
                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },
        }
    }
</script>

<style scoped lang="scss">
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

    /*tab组件*/
    .tab-pane{
        margin-top: 20px;
    }


    .main {

        .app__table__inner {
            min-height: 160px;
			.span {
				padding: 0 5px;
				cursor: pointer;
			}
			.no-wrap {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
            .validate /deep/ input {
                border-color: red;
            }

		}
        padding-bottom: 30px;

        /*顶部树+待选列表*/
        .top {
            width: 100%;
            // height: 330px;
            height: 370px;

            /*左边树*/
            .t-left {
                float: left;
                width: 25%;
                padding-left: 20px;
                border: 1px solid #f6f6f6;
                margin-top: 20px;
                padding-bottom: 30px;

                .tree-box{
                    height: 310px;
                }
            }
            /*右边列表*/
            .t-right {

                float: right;
                width: 72%;
                height: 310px;
                .icon-xuanzhong-fang {
                	color: $mainColor;
                }
                 /*搜索框样式*/
                 .offer-label{
                    width: 40%;
                    margin-top: 15px;
                    margin-bottom: 15px;
                }
            }
        }

        /*底部已选列表*/
        .bottom{
            border: solid 1px #f6f6f6;
            padding: 10px;
        }
        .tag-box{
            display: inline-block;
            padding: 10px;
            margin: 10px;
            border: solid 1px #d5e8f9;
            background-color: #eff7fd;
            color: $mainColor;

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


        /*表格标题+搜索框*/
        .sel-box{
            width: 100%;
            line-height: 50px;
            padding: 0 20px 0 10px;
            border-left: solid 1px #f6f6f6;
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
        .border-top{
            border-top: solid 1px #f6f6f6;
        }
        .app__btn {
            // margin: 10px;
            margin: 20px 0 10px 10px;
        }
        .app__btn-confirm {
             margin: 20px 0 10px 0px;
        }
       
        .app__btn-clear {
            float: right;
            color: #a0d468;
            border: 1px solid #a0d468;
            border-radius: 15px;
            margin-right: 10px;
            &:hover {
                background-color: #a0d468;
		        color: #fff;
            }
        }
    }
</style>
