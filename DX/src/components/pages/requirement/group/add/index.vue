<template>
	<div class="add-info">
        <div class="app__btn title_btn" v-show="checkboxData.length">
            <span class="app__btn  app__btn-add" @click="splitDemand">
                拆分需求单
            </span>
        </div>
        <div class="add-tab" >
            <div :class="['p-t-block',tabType=='xqd' ? 'active' : '']" @click="requireTabClick('xqd')">
                <i class="iconfont icon-jibenxinxi"></i>
                <span>需求单</span>
            </div>
            <div :class="['p-t-block',tabType=='xqdcylb' ? 'active' : '']" @click="requireTabClick('xqdcylb')">
                <i class="iconfont icon-chakan1128"></i>
                <span>需求单成员列表</span>
            </div>
        </div>

		<Scroll  class="main"  v-show="tabType == 'xqd'"  ref="listScroll" :isShowRight="true">
			<Row>
				<Form labelWidth="120px" labelAlign="left">
					<Col :span="12">
						<FormItem labelText="需求单编码：">
							<Input readonly name="requirementCode" v-model.trim="requireForm.requirementCode"></Input>
						</FormItem>
					</Col>
					<Col :span="11" :offset="1" >
						<FormItem labelText="需求单名称：" :requiredIcon="true" :errorMessage="errors.first('requirementName')">
							<Input v-validate="'required'" name="requirementName" v-model.trim="requireForm.requirementName" data-vv-as="需求单名称"
                                   maxlength="30"></Input>
						</FormItem>
					</Col>
					<Col :span="12">
						<FormItem labelText="业务联系人：" :requiredIcon="true" :errorMessage="errors.first('contName')">
							<Input v-validate="'required'"  name="contName" v-model.trim="requireForm.contName" data-vv-as="业务联系人"
                                   maxlength="5"></Input>
						</FormItem>
					</Col>
					<Col :span="11" :offset="1" >
						<FormItem labelText="业务联系人电话：" :requiredIcon="true" :errorMessage="errors.first('contTele')">
							<Input v-validate="'required|mobile'" name="contTele" v-model.trim="requireForm.contTele" data-vv-as="业务联系人电话"
                                   maxlength="30"></Input>
						</FormItem>
					</Col>
					<Col  :span="12" >
						<FormItem labelText="需求单类型：">
							<Input readonly name="requestType" :value="requireForm.requestType == '10' ? '产品' : requireForm.requestType == '11' ? '销售品' : '清退'"></Input>
						</FormItem>
					</Col>
					<Col :span="11" :offset="1">
						<FormItem labelText="预期完工时间：" :requiredIcon="true" :errorMessage="errors.first('expectFinishDate')">
							<DatePicker v-validate="'required'" name="expectFinishDate" v-model.trim="requireForm.expectFinishDate" data-vv-as="预期完工时间"></DatePicker>
						</FormItem>
					</Col>
					<Col :span="12">
						<FormItem labelText="发起部门：" :requiredIcon="true" :errorMessage="errors.first('deptCode')">
							<Input v-validate="'required'" name="deptCode" v-model.trim="requireForm.deptCode" data-vv-as="发起部门"
                                   maxlength="20"></Input>
						</FormItem>
					</Col>
                    <Col :span="11" :offset="1">
                        <FormItem labelText="需求单功能类型：">
                            <Radio disabled name="actType" label="ADD"
                                   v-model="requireForm.actType">新建</Radio>
                            <Radio disabled name="actType" label="MOD"
                                   v-model="requireForm.actType">变更</Radio>
                        </FormItem>
                    </Col>

                    <Col :span="12" v-if="requireForm.requestType == '11' && requireForm.actType == 'ADD'">
                        <FormItem labelText="是否跳过业务测试：" :requiredIcon="true" :errorMessage="errors.first('isSkipBusiTest')">
                           <RadioGroup  v-validate="'required'" :data="isOrNo" name="isSkipBusiTest" data-vv-as="是否跳过业务测试" v-model="requireForm.isSkipBusiTest"></RadioGroup>
                        </FormItem>
                    </Col>

					 
					<Col :span="24">
						<FormItem labelText="需求单描述：">
							<Input type="textarea" name="requirementDesc" v-model.trim="requireForm.requirementDesc" data-vv-as="需求单描述"
                                   maxlength="300"></Input>
						</FormItem>
					</Col>
					<!-- <Col :span="24" v-show="requireForm.requestType != '22'">
						<FormItem labelText="附件上传：">
							<span class="span" @click="custUploadClick">
								<span>附件上传</span>
								<input type="file" class="file" ref="fileRef" @change="custUploadChange" />
							</span>
							<div v-show="documentList.length>0">已上传文件<span>{{documentList.length}}</span>个：<span class="have-span" v-for="(item,index) in documentList" :key="index">{{item.docName}}<span class="delete" @click="deleteDoc(item)"></span></span></div>
						</FormItem>
					</Col> -->
				</Form>
			</Row>
		</Scroll>

        <Scroll class="main"  v-show="tabType == 'xqdcylb'" ref="listScroll" :isShowRight="true">
            <div class="app__table__inner">
                <Row class="app__table-thead">
                    <Col :span="2">选择</Col>
                    <Col :span="8">需求单成员编码</Col>
                    <Col :span="6">需求单成员名称</Col>
                    <Col :span="6">需求单成员类型</Col>
                    <Col :span="2">操作</Col>
                </Row>
                <Row class="m-item app__table-item" v-for="(item,index) in requireForm.memberList" :key="index">
                    <Col :span="2"><Checkbox name="checkbox1" :label="item" v-model="checkboxData"></Checkbox></Col>
                    <Col :span="8">{{item.requestMemberId}}</Col>
                    <Col :span="6">{{item.memberName ? item.memberName : '空'}}</Col>
                    <Col :span="6">{{getRequestType(item.memberType)}}</Col>
                    <Col :span="2" >
                        <span class="span1" @click="offerSee(item)">查看</span>
                    </Col>
                </Row>
                <Row v-if="!requireForm.memberList.length" class="app__data-none">
                    <Col :span="24">
                    <span>当前无数据</span>
                    </Col>
                </Row>
            </div>
        </Scroll>


		<div class="footer">
			<div class="btn-page-box">
                <span class="app__btn app__btn-confirm" v-if="requireForm.isGroup && requireForm.isGroup == 1 &&  requireForm.requestType == '11'" @click="noDemand()">无需求单反馈</span>
				<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
				<span class="app__btn app__btn-confirm" @click="submit()">下一步</span>
			</div>
		</div>

		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="" ref="splitDemand" :initBtn="true" >
            <Row>
                <Col :span="12">
					<div :class="['req-item',activeIndex == '1'?'active':'']" @click="haveClick()">
						<div class="prods-icon"></div>
						<p>已有需求单</p>
						<div class="req-selected"></div>
					</div>
				</Col>
				<Col :span="12">
					<div :class="['req-item',activeIndex == '2'?'active':'']" @click="newClick()">
						<div class="goods-icon"></div>
						<p>新建需求单</p>
						<div class="req-selected"></div>
					</div>
				</Col>
            </Row>
            <template slot="btnBox">
				<span class="back" @click="btnCancel()">取消</span>
				<span class="next" @click="btnSave()" >下一步</span>
			</template>
		</Dialog>

        <Dialog  :dialogSize="dialogSizeb" class="h-dialog" dialogTitle="需求单列表" ref="requireList" @confirm="requireConfirm()" @close="requireClose()">
             <Scroll class="app__table">
                <div class="h-dialog-search">
                    <Search placeholder="请输入需求单名称" @search="searchResource"></Search>
                </div>
				<Row class="app__table-thead">
					<Col :span="2">选择</Col>
					<Col :span="6">需求单名称</Col>
					<Col :span="6">需求单编码</Col>
					<Col :span="5">需求单状态</Col>
					<Col :span="5">需求单类型</Col>
				</Row>
				<Row class="app__table-item"  v-for="(item,index) in requirementList" :key='index'>
					<Col :span="2">
						<Radio name="item" :label="item" v-model="requireRadio" :value="item"></Radio>
					</Col>
					<Col :span="6">{{item.requirementName}}</Col>
					<Col :span="6">{{item.requirementCode}}</Col>    
					<Col :span="5">{{getStatusCd(item.statusCd)}}</Col>
					<Col :span="5">{{getRequestType(item.requestType) }}</Col>
				</Row>
                <Pagination :pageIndex="pageInfos.pageIndex" :pageSize="pageInfos.pageSize" :rowCount="pageInfos.rowCount" @change="pageChange" :isCenter="true">
                </Pagination>
            </Scroll>
        </Dialog>

        <Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="新建需求单" ref="addNewRequire" @confirm="addNewRequireConfirm()" @close="addNewClose()">
            <Row class="main">
                <Col :span="24">
                    <Form data-vv-scope="addNew">
                        <FormItem labelText="需求单名称" :errorMessage="errors.first('addNew.requireNewName')" :requiredIcon="true">
                            <Input v-model="requireNewName" v-validate="'required'" name="requireNewName" data-vv-as="需求单名称" placeholder="请输入需求单名称"></Input>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </Dialog>

        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		props:{
			componentData:{}
		},
		data() {
			return {
				requireForm: {
					requestType:'11',
                    actType: "ADD",
                    contName:"",
                    contTele:"",
                    isGroup:'',
                    memberList:[]
                },
                pageInfos:{
                    pageIndex: 1,
					pageSize: 5,
					rowCount: 0
                },
                dialogSizeb: {
                    size:80,
                    min:600,
                    max:800
                },
                dialogSize:{
                    min: 300,
					max: 350
                },
				documentList: [],
                tipSelData: {},
                tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
                },
                isOrNo:[
                    {
                        label:'是',
                        value:'1'
                    },
                    {
                        label:'否',
                        value:'0'
                    },
                ],
                checkboxData:[],
                activeIndex:'1',
                pageInfo: {
					pageIndex: 1,
					pageSize: 20,
					rowCount: 0
                },
                requirementList:[],
                requireRadio:'',
                requireNewName:'',//新建需求单名称后台自动生成
                requestMemberArr:[],
                tabType:'xqd'
			}
		},
		mounted(){
			this.requireForm.actType = this.componentData.actType || "ADD";
			if(this.componentData.requirementId){
				this.$axios.get(this.$api.GetDocumentObjList, {
					params: {
						objId: this.componentData.requirementId,
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
			}else {
				this.$axios.get(this.$api.Seq, {
					params: {
						sId: this.$user.getSid()
					}
				}).then(res => {
					if(res.data.success == true) {
						this.sequence = res.data.sequence;
						this.requireForm.contName = res.data.staffName
						this.requireForm.contTele = res.data.mobilePhone
						
						
					} else {
						this.$message.error({ message: '序列查询失败！' });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.msg});
				})
			}
			
			if (this.componentData.requirementId) {
                this.initData();
                
			}
		},
		methods: {
			initData(){ //初始数据
				if(!this.componentData) return;

				this.$axios.get(this.$api.replace(this.$api.QureyRequirementTask,['{requirementId}'],[this.componentData.requirementId]),{
                    params: {
                        showMember: 1
                    }
                }).then(res => {
					if(res.data.success === true){
						this.requireForm = res.data.requirementDetail;
					}else{
						this.$message.error({message: res.data.msg})
					}
				}).catch( error => {
					this.$message.error({message: res.data.msg})
				})

			},
			globalback() { //返回
				this.$emit('componentView', 'list')
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
					default:
						return "未知";
				}
			},
			submit() { //提交
				this.$validator.validateAll().then((result) => {
					if(result){
                        let nowTime=new Date(new Date().toLocaleDateString()).getTime();
                            if(!this.componentData.requirementId){
                                //添加
                                this.$axios.post(this.$api.QureyRequirementList,{
                                    requirementId: this.sequence,
                                    requirementName: this.requireForm.requirementName,
                                    requirementDesc: this.requireForm.requirementDesc,
                                    requestType: this.requireForm.requestType,
                                    actType: this.requireForm.actType,            //需求单动作类型
                                    deptCode: this.requireForm.deptCode,
                                    contName: this.requireForm.contName,
                                    isSkipBusiTest:this.requireForm.isSkipBusiTest,
                                    contTele: this.requireForm.contTele,
                                    expectFinishDate: new Date(this.requireForm.expectFinishDate),
                                    createStaff: this.$user.getInfo().id,
                                    statusCd: '1200'
                                }).then(res => {
                                    if(res.data.success == true){
                                        this.$message.success({message: '添加成功！'});
										if(this.componentData.actType == 'MOD'){
                                        	this.$nextTick(() => {
	                                        	this.$emit('componentView', 'change',res.data.requirementDetail);
	                                      	})
                                        }else{
                                        	this.$nextTick(() => {
	                                        	this.$emit('componentView', 'info',res.data.requirementDetail);
	                                      	})
                                        }
                                    }else{
                                        this.$message.error({message: res.data.msg})
                                    }

                                }).catch( error => {
                                    this.$message.error({message: error.response.data.msg})
                                })

                            }else{
                                //修改
                                this.$axios.put(this.$api.replace(this.$api.QureyRequirementTask,['{requirementId}'],[this.componentData.requirementId]),{
                                    requirementId: this.requireForm.requirementId,
                                    requirementCode: this.requireForm.requirementCode,
                                    requirementName: this.requireForm.requirementName,
                                    requirementDesc: this.requireForm.requirementDesc,
                                    requestType: this.requireForm.requestType,
                                    actType: this.requireForm.actType,              //需求单动作类型
                                    deptCode: this.requireForm.deptCode,
                                    contName: this.requireForm.contName,
                                    isSkipBusiTest:this.requireForm.isSkipBusiTest,
                                    contTele: this.requireForm.contTele,
                                    expectFinishDate: new Date(this.requireForm.expectFinishDate),
                                    updateStaff: this.$user.getInfo().id,
                                    statusCd: '1200'
                                }).then(res => {
                                    if(res.data.success == true){
                                        this.$message.success({message: "修改成功！"});
                                        if(this.requireForm.requestType == "10"){
                                            this.$emit('componentView','prodCatalog',this.componentData);
                                        }else if(this.requireForm.requestType == "11"){
                                            this.$emit('componentView','info',this.componentData);
                                        }else{
                                        	this.$emit('componentView','repayInfo',this.componentData);
                                        }
                                    }else{
                                        this.$message.error({message: res.data.msg})
                                    }

                                }).catch( error => {
                                    this.$message.error({message: error.response.data.msg})
                                })
                            }
					}
				})
            },
            noDemand() { //无需求反馈按钮
                this.$axios.get(this.$api.AutomaticFeedback,{
                    params:{
                        requirementId:this.componentData.requirementId
                    }
                }).then( res => {
                    if(res.data.success) {
                        this.$message.success({message:'反馈成功'})
                    } else {
                        this.$message.error({message:'反馈失败'})
                    }
                }).catch( error => {
                    this.$message.error({message:error.response.data.msg})
                })
            },
			custUploadClick() {
				this.$refs.fileRef.click();
            },
            splitDemand() {//拆分需求单
                this.checkboxData.forEach( item => {
                    this.requestMemberArr.push(item.requestMemberId);
                })
                this.$refs.splitDemand.show();
            },
            btnCancel() {
                this.$refs.splitDemand.hide();
            },
            btnSave() {
                if(this.activeIndex == '1') {
                    this.pageInfos.pageIndex = 1;
                    this.getRequireList();
                } else if(this.activeIndex == '2') {
                    this.$refs.addNewRequire.show();
                }
                this.$refs.splitDemand.hide();
            },
			custUploadChange(e) {
				if(this.componentData.requirementId){
					if(e.target.files.length === 0) return;
					let files = Array.from(e.target.files);
					if(files[0].size>0){
						let formData = new FormData();
					formData.append('objId', this.componentData.requirementId);
					formData.append('objType', '1001');
					formData.append('center', 'cpc');
					formData.append('file', files[0]);
                    formData.append('docName', files[0].name);
                    formData.append('createStaff ', this.$user.getInfo().id);
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
									objId: this.componentData.requirementId,
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
				}else{
					if(e.target.files.length === 0) return;
					let files = Array.from(e.target.files);
					if(files[0].size>0){
						let formData = new FormData();
					formData.append('objId', this.sequence);
					formData.append('objType', '1001');
					formData.append('center', 'cpc');
					formData.append('file', files[0]);
                    formData.append('docName', files[0].name);
                    formData.append('createStaff ', this.$user.getInfo().id);
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
									objId: this.sequence,
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
				}
            },

            searchResource(data) {//搜索
                this.getRequireList(data)
            },

            getRequireList(data) {
                this.$axios.get(this.$api.QureyRequirementList, {
					params: {
						requirementCode: '',
						requirementName: data,   //去除关键字前后空格
						requestType: 11,
						offerName:"",
						offerNbr:"",
                        statusCd: '1200',
                        staff: this.$user.getInfo().id,
                        page: this.pageInfos.pageIndex,
                        limit: this.pageInfos.pageSize,
                        prodFlag: ''
					}
				}).then(res => {
					if(res.data.success === true) {
						this.requirementList = res.data.requirementPage.content||[];
                        this.pageInfos = {
                            pageIndex:res.data.requirementPage.page,
                            pageSize:res.data.requirementPage.limit,
                            rowCount: res.data.requirementPage.total
                        } 
                        this.requireRadio = '';
                       
                        this.$refs.requireList.show()
					} else {
						this.$message.error({ "message": "查询失败！" })
					}
				}).catch(error => {
					this.$message.error({ "message": "服务器异常！" })
				})
            },

            pageChange(page) {
                this.pageInfos.pageIndex = page;
                this.getRequireList();
            },

            requireConfirm() {//需求单
                if(!this.requireRadio) {
                    this.$message.error({message:'请选择需求单'})
                    return
                }
                this.splitRequire(1);
            },

            splitRequire(type) {//拆分需求单
                this.$axios.post(this.$api.SplitRequirement, {
                    splitType:type,//1：已有需求单、2：新建需求单
                    targetReqId: type == 1 ? this.requireRadio.requirementId : '',//当splitType=1时必填，直接将成员关联需求单ID变更
                    targetReqName:type == 2 ? this.requireNewName : '',//当splitType=2时必填，根据requirementId复制一条新的需求单，名称改为targetReqName
                    requirementId: this.componentData.requirementId,//原需求单ID
                    requestMemberIds: this.requestMemberArr//需求单成员标识数组
                }).then( res => {
                    if(res.data.success) {
                        this.initData();
                        this.$message.success({message:'拆分成功'})
                        if(type == 1) {
                            this.$refs.requireList.hide();
                        } else {
                            this.$refs.addNewRequire.hide();
                        }
                            this.checkboxData = [];
                    }
                }).catch( err => {
                    this.$message.error({
                        message:err.response.data.msg
                    })
                })
            },
            
			deleteDoc(item) {
                this.tipType = 'DEL';
                this.tipSelData = item;
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `是否确认删除？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
            },
            tipConfirm() {
                this.$refs.tip.hide();
                if(this.componentData.requirementId){
                    this.$axios.get(this.$api.DeleteDocumentRels, {
                        params: {
                            objId: this.tipSelData.objId,
                            objType: '1001',
                            docLink: this.tipSelData.documentId
                        }
                    }).then(res => {
                        if(res.data.success == true) {
                            this.$message.success({message: "附件删除成功！"});
                            this.$axios.get(this.$api.GetDocumentObjList, {
                                params: {
                                    objId: this.componentData.requirementId,
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
                            this.$message.error({ message: '附件删除失败！' });
                        }
                    }).catch(error => {
                        this.$message.error({message: error.response.data.msg});
                    })
                }else{
                    this.$axios.get(this.$api.DeleteDocumentRels, {
                        params: {
                            objId: this.tipSelData.objId,
                            objType: '1001',
                            docLink: this.tipSelData.documentId
                        }
                    }).then(res => {
                        if(res.data.success == true) {
                            this.$message.success({message: "附件删除成功！"});
                            this.$axios.get(this.$api.GetDocumentObjList, {
                                params: {
                                    objId: this.sequence,
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
                            this.$message.error({ message: '附件删除失败！' });
                        }
                    }).catch(error => {
                        this.$message.error({message: error.response.data.msg});
                    })
                }
            },
            haveClick() {
                this.activeIndex = 1;
            },
            newClick() {
                this.activeIndex = 2;
            },
            addNewRequireConfirm() {
                this.$validator.validateAll('addNew').then((result) => {
                    if(result) {
                        this.splitRequire(2);
                    }
                })
            },
            addNewClose() {
            },
            requireClose() {
            },
            requireTabClick(type) {
                this.tabType = type;
            },
            offerSee(val) {
				window.open(`${this.$api.WindowOpenServer}/goodsviewlist/${val.memberId}/${val.requirementId}`);
            }


		}
	}
</script>

<style scoped lang="scss">
	.add-info {
		width: 100%;
		height: 100%;
		padding: 0 20px 50px;
        .add-tab {
            height: 50px;
            background-color: #fafafa;
            .p-t-block {
                display: block;
                width: 150px;
                top: 15px;
                text-align: center;
                height: 35px;
                font-size: 12px;
                line-height: 40px;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                color: #254063;
                float: left;
                z-index: 20;
                transition: all 0.3s ease;
                cursor: pointer;
                &.active {
                    height: 35px;
                    line-height: 40px;
                    top: 15px;
                    color: $mainColor;
                    border-top: 3px solid $mainColor;
                    background-color: #fff;
                    box-shadow: 1px -1px 1px 0px rgba(3, 0, 0, 0.09);
                }
            }
        }
        .title_btn {
            position: absolute;
            right: 20px;
            top: 10px;
            z-index: 10; 
        }

		.main {
			padding: 20px;
            padding-bottom: 0;
			height: 86%;
			border: 1px solid #eeeeee;
			background: #fdfdfd;
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
			.have-span {
				padding: 0 50px 0 10px;
				background: #eff7fe;
				margin-right: 10px;
				margin-bottom: 10px;
				color: $mainColor;
				display: inline-block;
				.delete {
					background: url(images/bqsc.png) no-repeat;
					width: 8px;
				    height: 8px;
				    position: absolute;
				    top: 12px;
				    right: 20px;
				    cursor: pointer;
				}
			}
		}

        .req-item {
            position: relative;
            width: 90px;
            height: 90px;
            margin: 30px auto;
            border: solid 1px #f5f5f5;
            cursor: pointer;
            color: #333;
            .prods-icon{
                width: 26px;
                height: 26px;
                margin: 22px auto 0;
                background: url(images/havesqel.png) no-repeat center;
                background-size: 26px 26px;
            }
            .goods-icon{
                width: 26px;
                height: 26px;
                margin: 22px auto 0;
                background: url(images/newrequire.png) no-repeat center;
                background-size: 26px 26px;
            }
            p{
                text-align: center;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 40px;
                letter-spacing: 0px;
                color: #333333;
            }
            .req-selected{
                position: absolute;
                right: 6px;
                bottom: 6px;
                width: 16px;
                height: 16px;
                background: url(images/weixuanzhong_03.png) no-repeat center;
                background-size: 16px 16px;
            }
            &.active{
                color: $mainColor;
                border: solid 1px $mainColor;
                .prods-icon{
                    background: url(images/havesqell.png) no-repeat center;
                    background-size: 26px 26px;
                }
                .goods-icon{
                    background: url(images/newrequiree.png) no-repeat center;
                    background-size: 26px 26px;
                }
                p{
                    color: $mainColor;
                }
                .req-selected{
                    background: url(images/xuanzhong_03.png) no-repeat center;
                    background-size: 16px 16px;
                }
            }
            &:hover{
                color: $mainColor;
                border: solid 1px $mainColor;
                .prods-icon{
                    background: url(images/havesqell.png) no-repeat center;
                    background-size: 26px 26px;
                }
                .goods-icon{
                    background: url(images/newrequiree.png) no-repeat center;
                    background-size: 26px 26px;
                }
                p{
                    color: $mainColor;
                }
            }
        }

        .h-dialog-search {
            width: 350px;
            margin: 10px;
        }
        .h-dialog {
            .main {
                margin: 10px;
            }
        }

		.footer {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			box-shadow: 0 -2px 0 #f1f5fa;
			.btn-page-box {
				width: 100%;
				height: 50px;
				padding: 10px 20px;
				font-size: 12px;
				text-align: right;
				background: #ffffff;
                .app__btn-clear,
				.app__btn-confirm{
					margin-left: 10px;
				}
			}
		}
        .span1 {
            color: $mainColor;
            cursor: pointer;
        }
	}
</style>
