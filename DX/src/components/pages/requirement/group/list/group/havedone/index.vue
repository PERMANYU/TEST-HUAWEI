<template>
	<div class="main-table">
		<div class="main">
			<Scroll class="app__table" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title" ref="listScroll">
                
				<DragGroup class="m-title app__table-thead" inline :titleList="tableTitleData" @dragchange="dragchange">
                    <Col :class="['m-item']" :width="tableTitleCheckboxObj.width">
                    </Col>
					<Col class="m-item m-t-name" :width="tableRequirementNameObj.width">
						<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],tableRequirementNameObj)"/>
						<span>{{tableRequirementNameObj.name}}</span>
					</Col>

					<DragItem :class="['m-item']" :width="item.width" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+ index">

						<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>

						<span>{{item.name}}</span>

                        <!--表头下拉框筛选-->
						<ColSel class="col-search" v-if="item.param!='statusCd'&&item.param!='actType'&&item.param!='staffName'"
								:showOrder="false"
								@confirm="confirmfilter(item)"
								>
							<Input v-if="item.param == 'requirementCode'" :placeholder="'请输入'+ item.name" v-model="item.part"></Input>
							<Radio v-else class="col-radio" :label="items" :name="item.param"
										v-for="(items,index) in item.parent" :key="index"
										v-model="item.part">
										{{items.label}}
							</Radio>
						</ColSel>
					</DragItem>

					<Col :class="['m-item']" :width="tableRequirementOperationObj.width">
						<span>操作</span>
					</Col>
				</DragGroup>
				<Row :class="['m-item app__table-item']" inline v-if="requirementList.length>0" v-for="(requirementItem,requirementIndex) in requirementList" :key="'requirement' + requirementIndex">
                    <Col :width="tableTitleCheckboxObj.width">
					<Checkbox name="Checkbox" v-model="checkboxData" :label="requirementItem.requirementId" @change="modelChange"></Checkbox>
					</Col>
					<Col class="goods-name m-i-name" :width="tableRequirementNameObj.width" @click.native.stop="nameClick(requirementItem)" :title="requirementItem.requirementName"> {{requirementItem.requirementName}}
					</Col>
					<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
					<span>{{adjustTabelItemText(requirementItem,titleItem.param)}}</span>
					</Col>
					<Col :width="tableRequirementOperationObj.width">
						<span class="span" v-if="adjustOperationShow(requirementItem)" @click="adjustOperationClick(requirementItem)">{{adjustOperationName(requirementItem)}}</span>

						<span class="span" v-if="adjustProdShow(requirementItem)" @click="adjustProdClick(requirementItem)">{{adjustProdName(requirementItem)}}</span>
						<span class="span" v-if="reqOperationShow(requirementItem)" @click="reqOperationClick(requirementItem)">{{reqOperationName(requirementItem)}}</span>
					</Col>
				</Row>
				<Row v-if="!requirementList.length" class="app__data-none">
					<Col :span="24"><span>当前无数据!</span></Col>
				</Row>
				<!--<Row :class="['m-item app__table-item']" v-for="fillItem in 20 - requirementList.length" :key="fillItem">
				</Row>-->
			</Scroll>
		</div>
		<LeftDialog ref="leftDialog">
			<Scroll :isShowRight="true">
				<div class="l-d-header">
					<div class="d-h-title">
						<div class="h-t-left">{{requireForm.requirementName}}</div>
					</div>
				</div>

                <TabPane :tabs="tabs" :value="tabDefault" @change="tabChanges" :isAuto="false">
                    <template slot="info">
                        <div :class="['require-info']">
                            <Row>
                                <Form labelWidth="120px" labelAlign="left">
                                    <Col :span="7">
                                        <FormItem labelText="需求单编码：">
                                            <span>{{requireForm.requirementCode}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col :span="7" :offset="1">
                                        <FormItem labelText="需求单类型：">
                                            <span>{{requireForm.requestType == '10' ? '产品' : '销售品'}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col :span="7" :offset="1">
                                        <FormItem labelText="需求单名称：">
                                            <span>{{requireForm.requirementName}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col :span="7">
                                        <FormItem labelText="发起部门：">
                                            <span>{{requireForm.deptCode}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col :span="7" :offset="1">
                                        <FormItem labelText="业务联系人：">
                                            <span>{{requireForm.contName}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col :span="7" :offset="1">
                                        <FormItem labelText="业务联系人电话：">
                                            <span>{{requireForm.contTele}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col :span="7">
                                        <FormItem labelText="发起时间：">
                                            <span>{{requireForm.createDate | date}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col :span="7" :offset="1">
                                        <FormItem labelText="预期完工时间：">
                                            <span>{{requireForm.expectFinishDate | date}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col :span="23">
                                        <FormItem labelText="需求单描述：">
                                            <pre v-html="requireForm.requirementDesc"></pre>
                                        </FormItem>
                                    </Col>
                                    <Col :span="23">
                                        <FormItem labelText="需求单发起人：">
                                            <span>{{requireForm.staffName}}</span>
                                        </FormItem>
                                    </Col>
                                    <Col :span="24">
                                        <FormItem labelText="附件上传：">
                                            <span class="span" @click="showDialog">
                                                <span>附件上传</span>
                                            </span>
                                        </FormItem>
                                    </Col>


                                    <Col :span="24" class="require-info app__table__inner">
                                        <Row class="app__table-thead">
                                            <Col :span="6">类型</Col>
                                            <Col :span="6">附件名称</Col>
                                            <Col :span="4">上传人</Col>
                                            <Col :span="4">上传时间</Col>
                                            <Col :span="4">操作</Col>
                                        </Row>
                                        <Row :class="['app__table-item']" v-for="(item,index) in uploadQueryPageList" :key="index">
                                            <Col :span="6">{{item.documentTypeName ? item.documentTypeName : '需求单附件'}}</Col>
                                            <Col :span="6">{{item.docName}}</Col>
                                            <Col :span="4">{{item.uploadName}}</Col>
                                            <Col :span="4">{{item.createDate | date }}</Col>
                                            <Col :span="4">
                                                <span @click="requirementDocDownload(item)">
                                                    下载
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row v-if="!uploadQueryPageList.length" class="app__data-none">
                                                <Col :span="24"><span>当前无数据!</span></Col>
                                        </Row>

                                        <Pagination :pageIndex="pageInfoFile.pageIndex" :pageSize="pageInfoFile.pageSize" :rowCount="pageInfoFile.rowCount" :perPages=5 @change="pageFileChange">
                                        </Pagination>
                                    </Col>
                                </Form>
                            </Row>
                        </div>
                    </template>
                    <template slot="list">
                        <div :class="['require-info']">
                            <div class="app__table__inner">
                                <Row class="app__table-thead">
                                    <Col :span="8">需求单成员编码</Col>
                                    <Col :span="10">需求单成员名称</Col>
                                    <Col :span="6">需求单成员类型</Col>
                                </Row>
                                <Row class="m-item app__table-item" v-for="(item,index) in requireForm.memberList" :key="index">
                                    <Col :span="8">{{item.requestMemberId}}</Col>
                                    <Col :span="10">{{item.memberName ? item.memberName : '空'}}</Col>
                                    <Col :span="6">{{getRequestType(item.memberType)}}</Col>
                                </Row>
                                <Row v-if="!requireForm.memberList.length" class="app__data-none">
                                    <Col :span="24">
                                    <span>当前无数据</span>
                                    </Col>
                                </Row>

                                <Pagination :pageIndex="pageInfoMember.pageIndex" :pageSize="pageInfoMember.pageSize" :rowCount="pageInfoMember.rowCount" :perPages=5 @change="pageMemberChange">
                                </Pagination>
                            </div>
                            
                        </div>
                    </template>
                </TabPane>
				
			</Scroll>
		</LeftDialog>

        <!-- 附件上传 -->
        <Dialog :dialogSize="dialogIpt" class="h-dialog" dialogTitle="添加附件" ref="addfujian" :initBtn="true">
            <Scroll class="main-file">
                <Form data-vv-scope="file">
                    <FormItem labelText="类型：" :requiredIcon="true">
                        <Select name="fileType" :isNullSel="false" data-vv-as="类型" v-model="fileType" v-validate="'required'" dataValueStr="fileTypeId" dataLabelStr="fileTypeName" :data="fileList"></Select>
                    </FormItem>
                    <FormItem labelText="附件：" :requiredIcon="true">
                        <span class="span" @click="custUploadClick">
                            <span>选择附件上传</span>
                            <input type="file" class="file" ref="fileRef" @change="custUploadChange" />
                        </span>
                    </FormItem>
                </Form>
                <div class="app__table__inner">
                    <Row class="app__table-thead">
                        <Col :span="6">类型</Col>
                        <Col :span="6">附件名称</Col>
                        <Col :span="4">上传人</Col>
                        <Col :span="4">上传时间</Col>
                        <Col :span="4">操作</Col>
                    </Row>
                    <Row :class="['app__table-item']" v-for="(item,index) in documentList" :key="index">
                        <Col :span="6">{{item.documentTypeName ? item.documentTypeName : '需求单附件'}}</Col>
                        <Col :span="6">{{item.docName}}</Col>
                        <Col :span="4">{{item.uploadName}}</Col>
                        <Col :span="4">{{item.createDate | date }}</Col>
                        <Col :span="4">
                        <span @click="requirementDocDownload(item)">
                            下载
                        </span>
                        </Col>
                    </Row>
                </div>
                <Row v-if="!documentList.length" class="app__data-none">
                    <Col>
                    <span>暂无数据</span>
                    </Col>
                </Row>
            </Scroll>
            <div slot="btnBox">
                <span class="back" @click="handleBack">返回</span>
            </div>
        </Dialog>

		<div class="footer">
			<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
			</Pagination>
		</div>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		name: 'havedone',
		data() {
			return {
                dialogIpt: {
                    size: 80,
                    min: 600,
                    max: 700
                },
                pageInfoFile:{
                    pageIndex: 1,
					pageSize: 5,
					rowCount: 0
                },
                pageInfoMember:{
                    pageIndex: 1,
					pageSize: 5,
					rowCount: 0
                },
				checkboxData: [],
				pageInfo: {
					pageIndex: 1,
					pageSize: 20,
					rowCount: 0
                },
                tableTitleCheckboxObj: {
					name: '',
					param: '',
					wp: 0.0416,
					width: 50,
					part: ""
				},
				tableRequirementNameObj:{
					name: '需求单名称',
					param: 'requirementName',
					wp: 0.1469,
					width: 200,
					part:""
				},
				tableTitleData: [{
					name: '需求单编码',
					param: 'requirementCode',
					wp: 0.1369,
					width: 200,
					part:""
				}, {
					name: '需求单状态',
					param: 'statusCd',
					wp: 0.1369,
					width: 200,
					parent:[
						{label:'编辑中',value:'1200'},
						{label:'竣工',value:'1000'},
						{label:'注销',value:'1100'},
						{label:'流转中',value:'1201'},
					],
					part:""
				}, {
					name: '需求单类型',
					param: 'requestType',
					wp: 0.1369,
					width: 200,
					parent:[
						{label:'产品',value:'10'},
						{label:'销售品',value:'11'},
						{label:'目录',value:'12'},
						{label:'转售销售品',value:'13'},
					],
					part:""
				}, {
					name: '需求单功能类型',
					param: 'actType',
					wp: 0.1369,
					width: 200,
					parent:[
						{label:'变更',value:'MOD'},
						{label:'新建',value:'ADD'}
					],
					part:""
				}, {
					name: '需求单发起人',
					param: 'staffName',
					wp: 0.1369,
					width: 200
				}],
				tableRequirementOperationObj:{
					name: '操作',
					param: 'operation',
					wp: 0.1270,
					width: 200,
					part:""
				},
				requirementList: [],
				searchObj: {
					requirementName: '',
                    statusCd: '1200',
                    requirementCode: '',
                    requestType: '',
				},
                searchObj2: {},

				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				tipType: '',
				tipSelData: '',
				requireForm:{
                    memberList:[]
                },
				documentList: [],
				statusCd:'',
                pageShowType: 3 ,//1:全部数据 2:我参与的 3:我发起的
                addFileId:'',
                fileList:[],
                fileType:'',
                uploadQueryPageList:[],
                tabs:[
                    {
                        // 标签切换
                        label: "基本信息",
                        value: "info"
                    },
                    {
                        label: "成员列表",
                        value: "list"
                    }
                ],
                tabDefault:'info'
			}
		},
		mounted() {
			this.adjustTableWidth();
			this.pageChange(1);
		},
		methods: {
		    //点击查看
            clickSee(item){
            	if (item.reqFlowStatus == "13") {
	                this.$parent.$emit('componentView', 'info2', item);
            	} else{
	                this.$parent.$emit('componentView', 'info2', item);
            	}
            },

		    //获取需求单列表
			initData() {
                //如果是我的发起需要传staff（statusCd='1200'），否则传空
                let staff='';
                if(this.searchObj.statusCd=='1200'){
                	this.statusCd = ""
                    staff=this.$user.getInfo().id
                }

				this.$axios.get(this.$api.QureyRequirementList, {
					params: {
						requirementCode: this.searchObj2.requirementCode,
						requirementName: this.searchObj.requirementName.trim(),   //去除关键字前后空格
						requestType: this.getRequestVal(this.searchObj2.requestType),
						offerName:"",
						offerNbr:"",
                        statusCd: this.statusCd,
                        staff: staff,
                        page: this.pageInfo.pageIndex,
                        limit: this.pageInfo.pageSize,
                        prodFlag: '1'
					}
				}).then(res => {
					if(res.data.success === true) {
						this.requirementList = res.data.requirementPage.content||[];
						this.pageInfo.rowCount = res.data.requirementPage.total;
						console.log('全部数据',this.requirementList)
						this.$nextTick(() => {
							this.$refs.listScroll.init();
						})
					} else {
						this.$message.error({ "message": "查询失败！" })
					}
				}).catch(error => {
					this.$message.error({ "message": "服务器异常！" })
				})
			},
            //获取代办需求单列表（statusCd=1201）
            initData2() {
                this.$axios.get(this.$api.Dairequirement, {
                    params: {
                        requirementName: this.searchObj.requirementName,
                        statusCd: this.searchObj.statusCd,
                        requirementCode: this.searchObj2.requirementCode,
                        requestType: this.getRequestVal(this.searchObj2.requestType),
                        page: this.pageInfo.pageIndex,
                        limit: this.pageInfo.pageSize,
                        userId: this.$user.getInfo().id,
                        prodFlag: '1'
                    }
                }).then(res => {
                    if(res.data.success === true) {
                    	if (res.data.requirements) {
                    		this.requirementList = res.data.requirements.content;
							this.pageInfo.rowCount = res.data.requirements.total;
							console.log('我参与的',this.requirementList)
                    	}else{
                    		this.requirementList = [];
                        	this.pageInfo.rowCount = 0;
                    	}
                        

                        this.$nextTick(() => {
                            this.$refs.listScroll.init();
                        })
                    } else {
                        this.$message.error({ "message": "查询失败！"})
                    }
                })
            },
            adjustTabelItemText(item, param) {
				let val = item[param];
				switch(param) {
					case 'offerType':
						return this.getMemberType(val);
					case 'flowStatus':
						return this.getStatusCd(val);
					default:
						return val;
				}
			},
			allCheckboxClick() {

			},
			adjustTableWidth(){
				this.tableRequirementNameObj.width = this.$el.getBoundingClientRect().width * this.tableRequirementNameObj.wp;
				this.tableRequirementOperationObj.width = this.$el.getBoundingClientRect().width * this.tableRequirementOperationObj.wp;
				this.tableTitleData.map(item => {
					item.width = this.$el.getBoundingClientRect().width * item.wp;
				})
			},

            //表头筛选
            titleSearch(val) {
                this.searchObj2={};
                val.filter( (item) => {
                    this.searchObj2[item.param] = item.value;
                });
                this.pageChange(1);
            },
            //表头条件筛选
            confirmfilter(val){
            	if(val.part == '') return;
                let obj={
                    label: val.name,
                    param: val.param,
                    value: val.part.label || val.part
                };

                this.$emit('changeSearchData',obj);
                this.tableTitleData.find( item => item.param == val.param).part = '';
			},
            //根据需求单名称获取类型
            getRequestVal(name) {
                switch(name) {
                    case '产品':
                        return '10';
                    case '销售品':
                        return '11';
                    case '目录':
                        return '12';
                    case '转售销售品':
                        return '13';
                    default:
                        return '';
                }
            },

			pageChange(page) {
				this.pageInfo.pageIndex = page;

                //如果不是待办就调用initData；是就调用initData2
                if(this.searchObj.statusCd!='1002'){
                    this.initData();
                }else{
                    this.initData2();
                }
			},
			search(val) {
				this.searchObj.requirementName = val;
				this.pageChange(1);
			},

            //左上角下拉改变
            tabChange(val){
                this.searchObj.statusCd=val.value;
                this.pageShowType = val.flag;
                this.pageChange(1);
            },

            // tab 标签切换
            tabChanges(val) {
                this.tabDefault = val;
            },

			dragchange(val) {
				this.tableTitleData = val;
			},
			pullMove(w,item){
				item.width = w;
			},
			pullEnd(){
				this.$refs.listScroll.initScroll();
			},
			allCheckboxClick() {

			},
			searchClick() {

			},
			searchClick() {

			},
			nameClick(val) {
                this.addFileId = val.requirementId;
                this.reqDetail(val);
                this.getMembershipList();
                this.$refs.leftDialog.show();
				this.$axios.get(this.$api.GetDocumentObjList, {
					params: {
						objId: this.addFileId,
						objType: '1001'
					}
				}).then(res => {
					if(res.data.success == true) {
						this.documentList = res.data.documentList;
					} else {
						this.$message.error({ message: '附件查询失败！' });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.msg});
				})
            },
            getMembershipList(val) { //分页获取成员列表
                this.$axios.get(this.$api.RequirementListPage.format({requirementId:this.addFileId}),{
                    params : {
                        page: this.pageInfoMember.pageIndex,
                        limit: this.pageInfoMember.pageSize,
                        statusCd:1000,
                        requirementId:this.addFileId
                    }
                }).then( res => {
                    if(res.data.success) {
                        console.log(res);
                        this.requireForm.memberList = res.data.requestMemberDTO.content;
                        this.pageInfoMember = {
                            pageIndex:res.data.requestMemberDTO.page,
                            pageSize:res.data.requestMemberDTO.limit,
                            rowCount:res.data.requestMemberDTO.total,
                        }
                    }
                }).catch( err => {
                    this.$message.error( { message : err.response.data.msg })
                })
            },
			reqDetail(val){
				this.$axios.get(this.$api.replace(this.$api.QureyRequirementTask,['{requirementId}'],[val.requirementId]),{
					params: {
						showMember: 1
					}
				}).then(res => {
					if(res.data.success === true){
                        this.requireForm = res.data.requirementDetail;
                        this.getPageDocumentObj();
					}else{
						this.$message.error({message: res.data.msg})
					}
				}).catch( error => {
					this.$message.error({message: res.data.msg})
				})
			},
			getRequestType(type) { //获取需求单类型
				switch(type) {
					case '10':
						return '产品';
					case '11':
						return '销售品';
					case '12':
						return '目录';
					case '13':
						return '转售销售品';
					case '22':
                        return '清退';
					default:
						return "未知";
				}
			},
			getStatusCd(type) { //获取需求单状态
				switch(type) {
					case '1000':
						return '竣工';
					case '1100':
						return '注销';
					case '1200':
						return '编辑中';
					case '1201':
						return '流转中';
					case '1004':
						return '办结';
					case '1005':
						return '回退';
					default:
						return "未知";
				}
			},
			getActType(type) { //获取需求单区分
				switch(type) {
					case 'ADD':
						return '新建';
					case 'MOD':
						return '变更';
					default:
						return "未知";
				}
			},
			adjustTabelItemText(item, param) { //计算显示
				let val = item[param];
				switch(param) {
					case 'statusCd':
						return this.getStatusCd(val);
					case 'requestType':
						return this.getRequestType(val);
					case 'actType':
						return this.getActType(val);
					default:
						return val;
				}
			},
			itemMod(item) { //修改
				this.$parent.$emit('componentView', 'add', item);
			},
			itemSel(item) { //详情
				if(item.requestType == "11") {
					this.$parent.$emit('componentView', 'info', item);
				} else {
					this.$parent.$emit('componentView', 'prodCatalog', item);
				}
			},
			itemDel(item) { //删除
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm() {   // 删除需求单
				if(this.tipType === 'DEL') {
					this.$axios.delete(this.$api.replace(this.$api.QureyRequirementTask,['{requirementId}'],[this.tipSelData.requirementId]), {
						params: {
							staff : this.$user.getInfo().id
						}
					}).then(res => {
						if(res.data.success === true) {
							this.$message.success({ message: "删除成功！" });
							this.$refs.tip.hide();
							this.initData();
						} else {
							this.$message.error({ message: "删除失败！" })
						}
					}).catch(error => {
						this.$message.error({ message: "删除失败！" })
					})
				}
			},
			downLoad(item) {
				window.open(this.$api.Shtelpaasstorage + item.documentId)
			},
			adjustOperationShow(item){
				//计算列表操作是否可见
				return true;
			},
			adjustOperationName(item){
				if(item.actType == 'ADD'){
					//计算列表操作显示名称
				
				switch(this.pageShowType){
					case 1:
						return '查看';
					case 2:
						let nameConfig = {'10':{ //产品
								'10':'修改',
								'11':'配置',
								'13':'查看',
								'14':'查看',
								'15':'查看'
							},
						'11':{ //销售品
								'10':'修改',
								'11':'指派',
								'12':'配置',
                                '13':'查看',
                                '14':'查看'
							},
						'22':{ //清退
								'16':'配置',
								'17':'查看'
							}
						};

						if(!item.reqFlowStatus || !nameConfig[item.requestType]){
							return '修改';
						}

						return nameConfig[item.requestType][item.reqFlowStatus];
					case 3:
						nameConfig = {'10':{ //产品
								'10':'修改',
								'11':'配置',
								'13':'查看',
								'14':'查看',
								'15':'查看'
							},
						'11':{ //销售品
								'10':'配置',
								'11':'查看',
								'12':'查看',
								'13':'查看',
								'14':'查看',
							},
						'22':{ //清退
								'16':'配置',
								'17':'查看'
							}
						};

						if(!item.reqFlowStatus || !nameConfig[item.requestType]){
							return '修改';
						}

						return nameConfig[item.requestType][item.reqFlowStatus];
					default:
						return '查看';
				}
				}else{
					//计算列表操作显示名称
				
				switch(this.pageShowType){
					case 1:
						return '查看';
					case 3:
						let nameConfig = {
//							'10':{ //产品
//								'10':'修改',
//								'11':'配置',
//								'13':'查看',
//								'14':'查看',
//								'15':'查看'
//							},
							'11':{ //销售品
								'10':'配置',
								'11':'查看',
								'12':'查看',
								'13':'查看',
								'14':'查看',
							}
						};

						if(!item.reqFlowStatus || !nameConfig[item.requestType]){
							return '配置';
						}

						return nameConfig[item.requestType][item.reqFlowStatus];
					default:
						return '配置';
				}
				}
			},
			adjustOperationClick(item){
				if(item.actType == 'ADD'){
					//计算列表操作点击事件
				let componentViewName = '';
				switch(this.pageShowType){
					case 1:
						let viewConfig = {'10':'requirementProdInfo',
						'11':'requirementInfo',
						'22':'repayInfo'
						};
						componentViewName = viewConfig[item.requestType];
						break;
					case 2:
						viewConfig = {'10':{ //产品
								'10':'prodAdd',
								'11':'prodCatalog',
								'13':'requirementProdInfo',
								'14':'requirementProdInfo',
								'15':'requirementProdInfo'
							},
						'11':{ //销售品
								'10':'add',
								'11':'info',
								'12':'info',
								'13':'requirementInfo',
								'14':'requirementInfo'
						},
						'22':{ //清退
								'16':'repayDeal',
								'17':'repayInfo'
							}
						};

						if(!item.reqFlowStatus){
							componentViewName = 'add';
						}else{
							componentViewName = viewConfig[item.requestType][item.reqFlowStatus];
						}
						break;
					case 3:
						viewConfig = {'10':{ //产品
								'10':'prodAdd',
								'11':'prodCatalog',
								'13':'requirementProdInfo',
								'14':'requirementProdInfo',
								'15':'requirementProdInfo'
							},
						'11':{ //销售品
								'10':'add',
								'11':'requirementInfo',
								'12':'requirementInfo',
								'13':'requirementInfo',
								'14':'requirementInfo',
						},
						'22':{ //清退
								'16':'repayDeal',
								'17':'repayInfo'
						}
						};

						if(!item.reqFlowStatus){
							componentViewName = 'add';
						}else{
							componentViewName = viewConfig[item.requestType][item.reqFlowStatus];
						}
						break;
					default:
						componentViewName = 'add';
						break;
				}

				this.$parent.$emit('componentView', componentViewName, item);
			}else{
				let componentViewName = '';
				switch(this.pageShowType){
					case 1:
						let viewConfig = {'10':'requirementProdInfo',
						'11':'requirementInfo'
						};
						componentViewName = viewConfig[item.requestType];
						break;
					case 3:
						viewConfig = {
//							'10':{ //产品
//								'10':'prodAdd',
//								'11':'prodCatalog',
//								'13':'requirementProdInfo',
//								'14':'requirementProdInfo',
//								'15':'requirementProdInfo'
//							},
							'11':{ //销售品
								'10':'change',
								'11':'requirementInfo',
								'12':'requirementInfo',
								'13':'requirementInfo',
								'14':'requirementInfo',
							}
						};

						if(!item.reqFlowStatus){
							componentViewName = 'change';
						}else{
							componentViewName = viewConfig[item.requestType][item.reqFlowStatus];
						}
						break;
				}
				this.$parent.$emit('componentView', componentViewName, item);
			}
			},
			adjustProdShow(item){
				switch(this.pageShowType){
					case 1:
						return false;
					case 2:
					case 3:
						return item.requestType == '10' && (!item.reqFlowStatus || item.reqFlowStatus == '10');
					default:
						return false;
				}
				
			},
			adjustProdClick(item){
				let componentViewName = '';

				switch(this.pageShowType){
					case 1:
						componentViewName = 'info';
						break;
					case 2:
					case 3:
						componentViewName = 'prodCatalog';
						break;
					default:
						componentViewName = 'info';
						break;
				}
				this.$parent.$emit('componentView', componentViewName, item);
			},
			adjustProdName(item){
				switch(this.pageShowType){
					case 1:
						return '查看';
					case 2:
					case 3:
						return '配置';
					default:
						return '配置';
				}
			},
			reqOperationShow(item){
				switch(this.pageShowType){
					case 1:
						return false;
					case 2:
						return false;
					case 3:
						return !item.reqFlowStatus || item.reqFlowStatus == '10';
					default:
						return false;
				}
				
            },
            showDialog() {  
                this.getNodeFile();
                this.getDocumentObj();
                this.$refs.addfujian.show();
            },
            getDocumentObj() {
				this.$axios.get(this.$api.GetDocumentObjList, {
					params: {
						objId: this.requireForm.requirementId,
						objType: '1001'
					}
				}).then(res => {
					if(res.data.success == true) {
						this.documentList = res.data.documentList;
					} else {
						this.$message.error({ message: '附件查询失败！' });
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
            getNodeFile() {
                //获取附件类型
                this.$axios
                    .get(this.$api.GetAllNodeFile, {
                    params: {
                        objType:this.requireForm.requestType == '11' ? '3000' : this.requireForm.requestType == '10' ? '2000' : '',
                        nodeName: '',
                        processDefinitionId: this.requireForm.flowDefId,
                    }
                })
                .then( res => {
                    if (res.data.success) {
                        this.fileList = res.data.nodeFiles ? res.data.nodeFiles : [];
                        this.fileType = this.fileList ? this.fileList[0].fileTypeId : '';
                    }
                })
                .catch( err => {
                    this.$message.error({ message: err.response.data.msg });
                });
            },
			reqOperationClick(item){
				this.itemDel(item)
			},
			reqOperationName(item){
				switch(this.pageShowType){
					case 1:
						return '';
					case 2:
						return '';
					case 3:
						return '删除';
					default:
						return '删除';
				}
            },
            custUploadClick() {
                if (!this.fileType) {
                    this.$message.error({ message: "请选择类型" });
                    return;
                }
				this.$refs.fileRef.click();
            },
            requirementDocDownload(item) {//下载
                window.open(this.$api.Shtelpaasstorage + item.docLink)
            },
            handleBack() {
                this.$refs.addfujian.hide()
            },
            custUploadChange(e) {
                if(e.target.files.length === 0) return;
					let files = Array.from(e.target.files);
					if(files[0].size>0){
						let formData = new FormData();
					formData.append('objId', this.addFileId);
					formData.append('objType', '1001');
					formData.append('center', 'cpc');
                    formData.append('file', files[0]);
                    formData.append('createStaff ', this.$user.getInfo().id);
					formData.append('docName', files[0].name);
                    formData.append("documentType", this.fileType);
					e.target.value = '';
					this.$axios.post(this.$api.PushDocumentObj, formData, {
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}).then(res => {
						if(res.data.success == true) {
							this.$message.success({ message: '附件上传成功！' });
							this.$axios.get(this.$api.GetDocumentObjList, {
								params: {
									objId: this.addFileId,
									objType: '1001'
								}
							}).then(res => {
								if(res.data.success == true) {
									this.documentList = res.data.documentList;
								} else {
									this.$message.error({ message: '附件查询失败！' });
								}
							}).catch(error => {
								this.$message.error({message: error.response.data.msg});
							})
						} else {
							this.$message.error({ message: '附件上传失败！' });
						}
					}).catch(error => {
						this.$message.error({message: error.response.data.msg});
					})
					}else{
						this.$message.warning({ message: '请选择大小不为0的文件！' });
						return
					}
            },
            modelChange() {
                this.$emit('checkbox',this.checkboxData)
            },
            pageFileChange(page) {
                this.pageInfoFile.pageIndex = page;
                this.getPageDocumentObj();
            },
            getPageDocumentObj() {
                 this.$axios.get(this.$api.AttachmentUploadQueryPage,{ 
                    params: {
                        objId: this.requireForm.requirementId,
                        objType: '1001',
                        page:this.pageInfoFile.pageIndex,
                        limit:this.pageInfoFile.pageSize,
                    }
                }).then( res => {
                    if(res.data.success == true) {
                        this.uploadQueryPageList = res.data.documentList.content;
                        this.pageInfoFile = {
                            pageIndex:res.data.documentList.page,
                            pageSize:res.data.documentList.limit,
                            rowCount:res.data.documentList.total,
                        }
                    } else {
                        this.$message.error({ message: '附件查询失败！' });
                    }
                }).catch( err => {
                    this.$message.error({ message: err.response.data.msg });
                })
            },
            pageMemberChange(page) {
                this.pageInfoMember.pageIndex = page;
                this.getMembershipList()
            }
		}
	}
</script>

<style scoped lang="scss">
	.main-table {
		height: 100%;
		padding-bottom: 50px;
		.main {
			width: 100%;
			height: 100%;
			.m-title {
				.col.m-t-name {
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
				}
			}
			.col {
				&:hover {
					.col-search {
						display: block;
						.col-radio{
							display: block;
							margin-bottom:15px;
						}
					}
				}
			}
		}
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
	}

	.span {
        padding-right: 10px;
		color: $mainColor;
		cursor: pointer;
	}
	.l-d-header {
			display: inline-block;
			width: 100%;
			padding-bottom: 20px;
			border-bottom: 10px solid #f8f8f8;
			.d-h-title {
				width: 100%;
				height: 50px;
				line-height: 50px;
				.h-t-left {
					margin-left: 50px;
					padding-left: 30px;
					float: left;
					font-size: 16px;
					font-weight: bold;
					background: url(./images/sideslip_icon.png) no-repeat;
					background-position: 0;
				}
				.h-t-right {
					float: right;
					margin-right: 40px;
				}
			}
			.d-h-info {
				padding-left: 50px;
			}
		}
        .main-file {
            padding: 10px 20px 20px;
            .span {
                padding: 5px 10px;
                border: 1px solid #75d3aa;
                color: #75d3aa;
                border-radius: 5px;
                margin-right: 20px;
                cursor: pointer;
                .file {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 0;
                    height: 0;
                    opacity: 0;
                    z-index: -1;
                }
            }
        }
		.require-info {
			width: 100%;
			padding-left: 20px;
			padding-top: 20px;
			.have-span {
				padding: 5px 50px 5px 10px;
				background: #eff7fe;
				color: $mainColor;
				margin-right: 10px;
				.delete {
					background: url(images/down.png) no-repeat;
					width: 10px;
				    height: 10px;
				    position: absolute;
				    top: 10px;
				    right: 20px;
				    cursor: pointer;
				    background-size: cover;
				}
			}
            .span {
				padding: 5px 10px;
				border: 1px solid #75d3aa;
				color: #75d3aa;
				border-radius: 5px;
				margin-right: 20px;
				cursor: pointer;
				.file {
		            position: absolute;
		            top: 0;
		            left: 0;
		            width: 0;
		            height: 0;
		            opacity: 0;
		            z-index: -1;
		        }
			}
		}
</style>
