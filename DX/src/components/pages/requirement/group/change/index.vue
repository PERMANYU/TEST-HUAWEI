<template>
	<div class="info">
		<Scroll class="basic-info" :isShowRight="true" ref="basicScroll">
			<div class="main-box">
				<div class="a-v-title1">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>需求单信息</span>
					</div>
					<div class="h-a-add">
						<div v-if="toggleFlag" class="app__btn app__btn-show" @click="show()">更多</div>
						<div v-else class="app__btn app__btn-slide" @click="slide()">收起</div>
					</div>
				</div>
				<div :class="['require-info',toggleFlag?'active':'']">
					<Row>
						<Form labelWidth="120px" labelAlign="left">
							<Col :span="6">
							<FormItem labelText="需求单编码：" small>
								<span>{{requireForm.requirementCode}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="需求单类型：" small>
								<span>{{requireForm.requestType == '10' ? '产品' : '销售品'}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="需求单动作类型：" small>
								<span>{{requireForm.actType == "ADD"?"新增":requireForm.actType == "MOD"?"变更":"下架"}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="发起部门：" small>
								<span>{{requireForm.deptCode}}</span>
							</FormItem>
							</Col>
							<Col :span="6">
							<FormItem labelText="需求单名称：" small>
								<span class="over-col" :title="requireForm.requirementName">{{requireForm.requirementName}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="业务联系人：" small>
								<span>{{requireForm.contName}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="业务联系人电话：" small>
								<span>{{requireForm.contTele}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="预期完工时间：" small>
								<span>{{requireForm.expectFinishDate | datetime}}</span>
							</FormItem>
							</Col>
							<Col :span="6">
							<FormItem labelText="发起时间：">
								<span>{{requireForm.createDate | date}}</span>
							</FormItem>
							</Col>
                            <Col :span="5" :offset="1" v-show="requireForm.requestType == '11' && requireForm.actType == 'ADD'">
								<FormItem labelText="是否跳过业务测试：">
									<span>{{requireForm.isSkipBusiTest == '1' ? '是' : requireForm.isSkipBusiTest == '0' ? '否' : ''}}</span>
								</FormItem>
							</Col>
							<Col :span="23">
							<FormItem labelText="需求单描述：" small>
								<pre v-html="requireForm.requirementDesc"></pre>
							</FormItem>
							</Col>
							<Col :span="23" v-if="documentList.length>0">
							<FormItem labelText="附件下载：" small>
								<span class="app__btn app__btn-confirm" @click="download()">附件下载</span>
							</FormItem>
							</Col>
						</Form>
					</Row>
				</div>
				<!-- 附件上传 -->
				<div class="a-v-title1">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>附件上传</span>
					</div>
				</div>
				<div class="require-info">
					<FormItem labelText="附件上传：">
						<span class="filebox" @click="custUploadClick">
							<span>附件上传</span>
						<input type="file" class="file" ref="fileRef" @change="custUploadChange" />
						</span>
						<div v-show="documentList.length>0">已上传文件<span>{{documentList.length}}</span>个：<span class="have-span" v-for="(item,index) in documentList" :key="index">{{item.docName}}<span class="delete" @click="deleteDoc(item)"></span></span>
						</div>
					</FormItem>
				</div>
				<div class="a-v-title1">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>需求单销售品列表</span>
					</div>
				</div>
				<div class="btn-box">
					<Row>
						<Col :span="22">
							<div class="app__btn app__btn-add" @click="clickBinding()">绑定销售品</div>
						</Col>
						<Col :span="2">
							<div class="app__btn app__btn-add" @click="operationSubmit()">办结</div>
						</Col>
					</Row>
				</div>
				<div class="goods-wrap">
					<Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
						<Row class="m-title app__table-thead">
							<Col :span="2"></Col>
							<Col :span="10">销售品内部名称</Col>
							<Col :span="6">状态</Col>
							<Col :span="4">环节</Col>
							<Col :span="2">操作</Col>
						</Row>

						<Row v-if="requireData.length>0" :class="['m-item app__table-item']" v-for="(offerItem,offerIndex) in requireData" :key="offerIndex">
							<Col :span="2" class="over-col">
								<Checkbox name="Checkbox" v-model="checkArr" :label="offerItem" @change="offerChenge"></Checkbox>
							</Col>
							<Col :span="10">{{offerItem.offerSysName}}</Col>
							<Col :span="6">{{offerItem.offerStatusCd=="1000"?"有效":offerItem.offerStatusCd=="1200"?"未生效":offerItem.offerStatusCd=="1300"?"已归档":offerItem.offerStatusCd=="1400"?"停止销售":offerItem.offerStatusCd=="1500"?"停止服务":offerItem.offerStatusCd=="1600"?"销售品下线":"未知"}}</Col>
							<Col :span="4">{{offerItem.taskName ? offerItem.taskName : '流程未发起'}}</Col>
							<Col :span="2">
							<span v-show="offerItem.offerStatusCd != '1000'" class="span" @click="deal(offerItem)">处理</span>
							<!-- <span v-show="offerItem.offerStatusCd != '1000'" class="span" @click="relaese(offerItem)">发布</span> -->
							<span class="span" @click="reviewsee(offerItem)">查看</span>
							</Col>
						</Row>
						<Row v-if="!requireData.length" class="app__data-none">
							<Col :span="24"><span>当前无数据!</span></Col>
						</Row>
					</Scroll>
				</div>
			</div>
		</Scroll>
		<div class="footer">
			<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
		</div>
		<!--下载附件-->
		<Dialog class="add-commodity" dialogTitle="附件下载" ref="download" :showBtn="false">
			<Scroll :isShowRight="true" class="downloadScroll">
				<div class="app__table__inner">
					<Row class="app__table-thead flow">
						<Col :span="6">类型</Col>
                        <Col :span="6">附件名称</Col>
                        <Col :span="4">上传人</Col>
                        <Col :span="4">上传时间</Col>
                        <Col :span="4">操作</Col>
					</Row>
					<Row class="app__table-item" v-for="(item,index) in documentList" :key="index">
						<Col :span="6">{{item.documentTypeName ? item.documentTypeName : '需求单附件'}}</Col>
                        <Col :span="6">{{item.docName}}</Col>
                        <Col :span="4">{{item.uploadName}}</Col>
                        <Col :span="4">{{item.createDate | date }}</Col>
                        <Col :span="4">
						<span class="iconfont icon-xiazai1128" @click="downLoadclick(item)">下载</span>
						</Col>
					</Row>
				</div>

			</Scroll>
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
		
		<!-- 办结 -->
		<Dialog class="dialog-submit" :dialogSize="BdialogSize" dialogTitle="办结" ref="flowSubmit" @confirm="handleSub" @back="back">
			<Scroll class="dialog-examine" :isShowRight="true">
				<div v-if="isSinge == '1'">
					<div class="flow">下一环节：
						<Select :data="handleData" dataValueStr="taskDefKey" dataLabelStr="taskDefName" v-model="selected"></Select>
					</div>
					<div v-show="selected">处理人：
						<Select v-show="item.taskDefKey == selected" v-for="(item,index) in handleData" :key="index" :data="item.candidateUsers" dataValueStr="userId" dataLabelStr="userName" v-model="item.defaultUser.userId"></Select>
					</div>
				</div>
				<div v-else v-for="(item,index) in handleData" :key="index" class="flow_bottom">
					<span class="span"><span class="number">{{index+1}}</span>下一环节 : {{item.taskDefName}}</span>
					<Select v-if="item.candidateUsers" :data="item.candidateUsers" dataValueStr="userId" dataLabelStr="userName" v-model="item.defaultUser.userId"></Select>
				</div>
				<p>
					描述：
				</p>
				<div>
					<textarea class="app__textarea" v-model="handleOption"></textarea>
				</div>
			</Scroll>
		</Dialog>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
		<Tip ref="tipDocument" :tipObj="tipInfo" @confirm="tipDocumentConfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				requireForm: {},
				toggleFlag: true,
				documentList: [],
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				tipSelData: {},
				requireData: [],
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
                checkArrTemp: [],
                dialogTitle: '',
				handleData: [],
				selected: '',
				taskIdTemp: '',
				isSinge: '',
				BdialogSize: {
					size: 50,
					min: 600,
					max: 600
				},
				handleOption: '',
				checkArr: [],
				flowObjTasks: []
			}
		},
		mounted() {
			this.requireForm = this.componentData;
			this.initData();
			this.memberList();
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
		methods: {
			initData() {
				this.$axios.get(this.$api.replace(this.$api.QureyRequirementTask, ['{requirementId}'], [this.componentData.requirementId]), {
					params: {
						showMember: 1
					}
				}).then(res => {
					if(res.data.success === true) {
						this.requireForm = res.data.requirementDetail;
						this.requireData = res.data.requirementDetail.memberList
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			memberList() {
				this.$axios.get(this.$api.RequirementList, {
					params: {
						userId: this.$user.getInfo().id,
						requirementId: this.componentData.requirementId
					}
				}).then(res => {
					if(res.data.success === true) {
						if(res.data.offerList) {
							this.requireData = res.data.offerList;
						} else {
							this.requireData = []
						}
					} else {
						this.$message.error({ "message": "需求单成员列表查询失败！" })
					}
				}).catch(error => {
					this.$message.error({ "message": "需求单成员列表查询失败！" })
				})
			},
			show() {
				this.toggleFlag = !this.toggleFlag
				this.$nextTick(() => {
					this.$refs.basicScroll.init();
				})
			},
			slide() {
				this.toggleFlag = !this.toggleFlag
				this.$nextTick(() => {
					this.$refs.basicScroll.init();
				})
			},
			// 附件上传
			custUploadClick() {
				this.$refs.fileRef.click();
			},
			custUploadChange(e) {
				if(this.componentData.requirementId) {
					if(e.target.files.length === 0) return;
					let files = Array.from(e.target.files);
					if(files[0].size > 0) {
						let formData = new FormData();
						formData.append('objId', this.componentData.requirementId);
						formData.append('objType', '1001');
						formData.append('center', 'cpc');
						formData.append('file', files[0]);
						formData.append('docName', files[0].name);
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
									this.$message.error({ message: error.response.data.msg });
								})
							} else {
								this.$message.error({ message: '附件上传失败！' });
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg });
						})
					} else {
						this.$message.warning({ message: '请选择大小不为0的文件！' });
						return
					}
				} else {
					if(e.target.files.length === 0) return;
					let files = Array.from(e.target.files);
					if(files[0].size > 0) {
						let formData = new FormData();
						formData.append('objId', this.sequence);
						formData.append('objType', '1001');
						formData.append('center', 'cpc');
						formData.append('file', files[0]);
						formData.append('docName', files[0].name);
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
									this.$message.error({ message: error.response.data.msg });
								})
							} else {
								this.$message.error({ message: '附件上传失败！' });
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg });
						})
					} else {
						this.$message.warning({ message: '请选择大小不为0的文件！' });
						return
					}
				}
			},
			download() {
				this.$refs.download.show();
			},
			deleteDoc(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tipDocument.show();
			},
			tipDocumentConfirm() {
				this.$axios.get(this.$api.DeleteDocumentRels, {
					params: {
						objId: this.tipSelData.objId,
						objType: '1001',
						docLink: this.tipSelData.documentId
					}
				}).then(res => {
					if(res.data.success == true) {
						this.$message.success({ message: "附件删除成功！" });
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
							this.$message.error({ message: error.response.data.msg });
						})
					} else {
						this.$message.error({ message: '附件删除失败！' });
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
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
            pageChange(page) {
                this.pageInfo.pageIndex = page;
                this.gatGoodsData();
            },
            search(val){
                this.offerInnerNbr=val;
                this.pageChange(1);
            },
            gatGoodsData() {
            	this.$axios.get(this.$api.OfferGetList,{
                        params: {
                            // offerName: this.offerName,
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
            },
            configClick() {
            	if(this.selectOfferId){
                    this.getBinding();
                } else{
                    this.$message.error({message: '请选择一条记录！'});
                }
            },
            btnCancel(){
                this.$refs.copy.hide();
				this.memberList();
            },
             //调用绑定销售品接口
            getBinding(){
                this.$axios.get(this.$api.OfferUpgrade,{
                    params:{
                        offerId: this.selectOfferId,
                        requirementId: this.componentData.requirementId,
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
                            this.memberList();
                        }

                    }else{
                        this.$message.error({message: '操作失败！'})
                    }
                }).catch( error => {
                    this.$message.error({message: '服务器异常！'})
                })
            },
            //点击被复制的销售品
            selectClick(item){
                if(this.selectOfferId!=item.offerId){
                    this.selectOfferId=item.offerId;
                }else{
                    this.selectOfferId='';
                }
            },
            deal(val){
            	val.actType = 'MOD';
            	this.$emit('componentView', 'commodity', val)
            },
            // 删除需求单成员
			delRuireData(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm() {
				if(this.tipInfo.msg == `是否确认删除？`){
					this.$axios.delete(this.$api.replace(this.$api.DelRequirementRow, ['{requirementId}', '{requestMemberId}'], [this.componentData.requirementId, this.tipSelData.memberId]), {
						params: {
							staff: this.$user.getInfo().id
						}
					}).then(res => {
						if(res.data.success === true) {
							this.$message.success({ message: '删除成功！' });
							this.initData();
							this.$refs.tip.hide();
						} else {
							this.$message.error({ message: res.data.msg })
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg })
					})
				}else{
					this.$axios.get(this.$api.OfferRelease, {
						params: {
							offerId: this.tipSelData.offerId,
							createStaff: this.$user.getInfo().id
						}
					}).then(res => {
						if(res.data.success === true) {
							this.$message.success({ message: '发布成功！' });
							this.memberList();
							this.$refs.tip.hide();
						} else {
							this.$message.error({ message: res.data.msg })
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg })
					})
				}
			},
			relaese(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认发布？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			globalback() {
				if(this.$route.params.route == "info") {
					this.$router.push({ path: `/` })
				} else {
					this.$emit('componentView', 'list')

				}
			},
			reviewsee(val) {
				window.open(`${this.$api.WindowOpenServer}/goodsviewlist/${val.offerId}/${this.componentData.requirementId}`);
			},
			offerChenge() {
				
			},
			operationSubmit() {
				if(this.checkArr.length>0){
					this.$refs.flowSubmit.show();
					this.getFlowSet();
				}else{
					this.$message.error({ message: '请选择销售品！' })
				}
			},
			// 办结下一节点查询列表
			getFlowSet() {
				let tasks = [];
				for(let ele of this.checkArr){
					let temp = {
						businessTypeCode: "offer",
						objId: ele.offerId,
						objType: "1000",
						taskId: ''
					}
					tasks.push(temp);
				}
				this.$axios.post(this.$api.TakeFlowSchedule, {
					"completeOrReturn": "1",
					"requirementId": this.componentData.requirementId,
					"tasks": tasks,
					"userId": this.$user.getInfo().id
							
				}).then(res => {
					if(res.data.success === true) {
						this.isSinge = res.data.isSinge;
						this.handleData = res.data.flowNextTaskDTOS;
						this.flowObjTasks = res.data.flowObjTasks;
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			},
			back() {
				this.checkArr = [];
			},
			handleSub() {
				if(this.handleData.find( item => !item.defaultUser.userId)){
					this.$message.error({message:'请选择处理人！'})
					return;
				}
				let nextTaskList = [];
				for(let ele of this.handleData) {
					let temp = {
						assignee: ele.defaultUser.userId,
						elementId: ele.taskDefKey
					}
					nextTaskList.push(temp)
				}
				let tasks = [];
				for(let ele of this.checkArr){
					let temp = {
						"businessTypeCode": "offer",
						"comments": this.handleOption,
						"nextTaskList": nextTaskList,
						"objId": ele.offerId,
						"objType": "1000",
						"requirementId": this.componentData.requirementId,
						"taskId": this.flowObjTasks.find( objTaskItem => objTaskItem.objId == ele.offerId).taskId
					}
					tasks.push(temp);
				}
				this.$axios.post(this.$api.HandleSub, {
					"assignee": this.$user.getInfo().id,
					"completeOrReturn": '1',
					"tasks": tasks
				
				}).then(res => {
					if(res.data.success === true) {
						this.$refs.flowSubmit.hide();
						this.$message.success({ message: '成功！' });
						this.$emit('componentView', 'list')
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.info {
		width: 100%;
		height: 100%;
		padding-bottom: 50px;
		.add-commodity {
			.scroll {
				padding: 20px !important;
			}
		}
	}
	
	.basic-info {
		height: 100%;
		padding: 0 20px;
		.main-box {
			padding-right: 20px;
		}
		.a-v-title1 {
			height: 50px;
			line-height: 50px;
			text-align: right;
			padding-right: 20px;
			.v-t-item {
				display: block;
				width: 80px;
				margin-left: 20px;
				text-align: center;
				color: $mainColor;
				float: left;
			}
			.app__title {
				float: left;
			}
			.h-a-add {
				display: inline-block;
				height: 30px;
				line-height: normal;
			}
		}
		.require-info {
			width: 100%;
			padding: 20px;
			background: #fdfdfd;
			border: 1px solid #eeeeee;
			&.active {
				height: 110px;
				overflow-y: hidden;
			}
			.m-title {
				.col.m-t-name {
					border-right: 1px solid $mainColor;
				}
			}
			.m-item {
				.m-i-name {
					color: $mainColor;
					border-right: 1px solid $mainColor;
					cursor: pointer;
				}
			}
			.col {
				&:hover {
					.col-search {
						display: block;
					}
				}
			}
		}
		.goods-content {
			width: 100%;
			padding: 0 0 30px;
			.goods-box {
				padding: 10px;
				border: 1px solid #eee;
				background: #fdfdfd;
				.menu-btn {
					padding-bottom: 10px;
				}
			}
			.goods-content-left {
				border-right: 1px solid #eee;
			}
			.creategoods {
				padding: 0;
			}
		}
	}
	
	.filebox {
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
	
	.btn-box {
		margin-bottom: 10px;
		.app__btn {
			margin-left: 10px;
		}
	}
	.span {
		color: $mainColor;
		padding: 0 5px;
		cursor: pointer;
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
    .search-box{
        padding-left: 20px;
        padding-top: 10px;
    }
    .footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 50px;
		line-height: 49px;
		padding: 0 20px;
		border-top: 1px solid #f5f5f5;
		text-align: right;
		background-color: #fff;
	}
	.dialog-submit {
		padding: 20px;
		.dialog-examine {
			padding: 20px !important;
			.flow {
				margin-bottom: 20px;
			}
			.flow_bottom {
				margin-bottom: 10px;
			}
			.span {
				display: block;
				margin-bottom: 20px;
				color: $mainColor;
				.number {
					display: inline-block;
					width: 15px;
					height: 15px;
					border: 1px solid $mainColor;
					text-align: center;
					line-height: 13px;
					border-radius: 50%;
					background: $mainColor;
					color: #ffffff;
					margin-right: 10px;
				}
			}
			.d-e-sel {
				height: 40px;
				line-height: 40px;
			}
			.radio-nofirst {
				margin-left: 100px;
			}
			p {
				margin: 10px 0;
			}
		}
	}
</style>