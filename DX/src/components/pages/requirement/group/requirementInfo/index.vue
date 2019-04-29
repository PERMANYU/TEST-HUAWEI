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
							<Col :span="6">
							<FormItem labelText="需求单类型：" small>
								<span>{{requireForm.requestType == '10' ? '产品' : '销售品'}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="预期完工时间：" small>
								<span>{{requireForm.expectFinishDate | datetime}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="发起部门：" small>
								<span>{{requireForm.deptCode}}</span>
							</FormItem>
							</Col>
							<Col :span="5" :offset="1">
							<FormItem labelText="需求单功能类型：" small>
								<span>{{requireForm.actType == "ADD"?"新增":requireForm.actType == "MOD"?"变更":"下架"}}</span>
							</FormItem>
							</Col>
							<Col :span="6">
								<FormItem labelText="需求单发起人：">
									<span>{{requireForm.staffName}}</span>
								</FormItem>
							</Col>

                            <Col :span="5" :offset="1" v-show="requireForm.requestType == '11' && requireForm.actType == 'ADD'">
								<FormItem labelText="是否跳过业务测试：">
									<span>{{requireForm.isSkipBusiTest == '1' ? '是' : requireForm.isSkipBusiTest == '0' ? '否' : ''}}</span>
								</FormItem>
							</Col>
							<Col :span="24">
							<FormItem labelText="需求单描述：" small>
								<pre v-html="requireForm.requirementDesc"></pre>
							</FormItem>
							</Col>
							<Col :span="24" v-if="documentList.length>0">
							<FormItem labelText="附件下载：" small>
								<span class="app__btn app__btn-confirm" @click="download()">附件下载</span>
							</FormItem>
							</Col>
						</Form>
					</Row>
				</div>

				<div class="a-v-title1" v-if="requireForm.requestType == '11'">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>需求单销售品列表</span>
					</div>

                    <div class="app__btn title_btn" v-show="checkboxData.length">
                        <span class="app__btn  app__btn-add" @click="splitDemand">
                            拆分需求单
                        </span>
                    </div>

                    
                    <div class="app__btn app__btn-add" @click="derive()">导出</div>
				</div>

				<div class="goods-content" v-if="requireForm.requestType == '11'">
					<!--销售品操作按钮组件-->
					<div class="app__table__inner goods-box">
						<Row>
							<Col :span="24" class="creategoods">
							<div class="goods-wrap">
								<Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
									<DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
										<Col :span="3">
                                        <span>选择</span>
                                        </Col>
										<DragItem :span="item.span" :value="item" v-for="(item,index) in tableTitleData" :key="index">
											<span>{{item.name}}</span>
										</DragItem>
										<Col :span="3">
										<span>操作</span>
										</Col>
									</DragGroup>

									<Row :class="['m-item app__table-item']" v-for="(offerItem,offerIndex) in requireData" :key="offerIndex">
										<Col :span="3"><Checkbox name="checkbox1" :label="offerItem" v-model="checkboxData"></Checkbox></Col>
										<Col class="over-col" :span="titleItem.span" v-for="(titleItem,titleIndex) in tableTitleData" :key="titleIndex">
										<span>{{adjustTabelItemText(offerItem,titleItem.param)}}</span>
										</Col>
										<Col :span="3">
										<span class="span" @click="offerSee(offerItem)">查看</span>
										</Col>
									</Row>
									<Row v-if="!requireData.length" class="app__data-none">
										<Col :span="24"><span>当前无数据!</span></Col>
									</Row>
								</Scroll>
							</div>

							</Col>
						</Row>
					</div>
				</div>
			</div>
		</Scroll>

		<div class="footer">
			<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
		</div>


        <!-- 拆分需求单 -->
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
					<Col :span="5">{{getStatuCd(item.statusCd)}}</Col>
					<Col :span="5">{{getRequestType(item.requestType) }}</Col>
				</Row>
                <Pagination :pageIndex="pageInfos.pageIndex" :pageSize="pageInfos.pageSize" :rowCount="pageInfos.rowCount" @change="pageChange" :isCenter="true">
                </Pagination>
            </Scroll>
        </Dialog>

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
	</div>
</template>

<script>
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				flowFlag: "",
				requireForm: {},
				requireData: [],
				toggleFlag: true,
				tableTitleData: [{
					name: '销售品内部名称',
					// param: 'memberName',
					param: 'offerSysName',
					span: 7
				}, {
					name: '内部编码',
					param: 'innerNbr',
					span: 4
				}, {
					name: '状态',
					param: 'flowStatus',
					span: 3
				},{
                  	name: '环节',
					param: 'taskName',
					span: 4
                }],
				commodityObj: {
					offerName: '',
					commodityType: '',
					offerType: ''
                },
                dialogSize:{
                    min: 300,
					max: 350
                },
                dialogSizeb: {
                    size:80,
                    min:600,
                    max:800
                },
                activeIndex:'1',
                checkboxData:[],
                requireNewName:'',//新建需求单名称后台自动生成
                requirementList:[],
                requestMemberArr:[],
                requireRadio:{},
                pageInfos:{
                    pageIndex: 1,
					pageSize: 5,
					rowCount: 0
                },
				documentList: [],
				taskIdTemp: "",
				candidateUsers: [],
				defaultUser: {
					userId: "",
					userName: ""
				},
				flowNextTaskDTOS: [],
				candidateUsersa: [],
				defaultUsera: {
					userId: "",
					userName: ""
				},
				flowNextTaskDTOSa: [],
				operationList: [{
					label: '接受分配',
					value: '1'
				}, {
					label: '驳回',
					value: '0'
				}],
				defaultUserb: {
					userId: "",
					userName: ""
				},
				flowNextTaskDTOSb: [],
				operation: "1",
			}
		},
		mounted() {
            this.initData();
            this.getMemberList()
		},
		methods: {
			initData() {
				//获取详情
				this.$axios.get(this.$api.replace(this.$api.QureyRequirementTask, ['{requirementId}'], [this.componentData.requirementId]), {
					params: {
						showMember: 1
					}
				}).then(res => {
					if(res.data.success === true) {
						this.requireForm = res.data.requirementDetail;
						// this.requireData = res.data.requirementDetail.memberList;
						this.documentList = res.data.requirementDetail.documentList
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
				})
            },
            getMemberList() {
                this.$axios.get(this.$api.RequirementList,{
                    params: {
                        "userId": this.$user.getInfo().id,
						"requirementId": this.componentData.requirementId
                    }
                }).then( res => {
                    if(res.data.success) {
                        this.requireData =  res.data.offerList || [];
                    }
                }).catch( err => {
                    this.$message.error({message:err.response.data.msg})
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
			//返回
			globalback() {
				this.$emit('componentView', 'list')
			},
			dragchange(val) {
				this.tableTitleData = val;
			},
			download() {
				this.$refs.download.show();
			},
			downLoadclick(item) {
				window.open(this.$api.Shtelpaasstorage + item.docLink)
			},
			getMemberType(type) {
				switch(type) {
					case "10":
						return '基础销售品';
					case "11":
						return '套餐销售品';
					case "12":
						return '可选包';
					case "13":
						return '促销';
					case "14":
						return '政企协议';
					default:
						return "未知";
				}
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
            getStatuCd(type) { //获取需求单状态
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
			getStatusCd(type) { //获取销售品状态
				switch(type) {
					case "10":
						return '处理';
					case "11":
						return '配置';
					case "12":
						return '测试';
					case "13":
						return '审批';
					case "14":
						return '发布';
					case "15":
						return '已办结';
					default:
						return "处理";
				}
			},
			adjustTabelItemText(item, param) {
				let val = item[param];
				switch(param) {
					case 'offerType':
						return this.getMemberType(val);
					case 'flowStatus':
                        return this.getStatusCd(val);
                    case 'taskName' :
                        return val ? val : '流程未发起';
					default:
						return val;
				}
			},
			btnCancel() {
				this.$refs.addCommodityDialog.hide();
			},
			download() {
				this.$refs.download.show();
			},
			downLoadclick(item) {
				window.open(this.$api.Shtelpaasstorage + item.docLink)
			},
			offerSee(val){
				window.open(`${this.$api.WindowOpenServer}/goodsviewlist/${val.offerId}/${this.componentData.requirementId}`);  
            },
            derive() {
                if(!this.requireData.length) {
                    this.$message.error({
                        message:'需求单成员为空，无法导出'
                    })
                    return
                }
                 window.open(this.$api.ExportTemplateForReq + `?requirementId=${this.componentData.requirementId}`);
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
            splitDemand() {//拆分需求单
                if(this.requireForm.updateStaff == this.$user.getInfo().id) {
                    this.checkboxData.forEach( item => {
                        this.requestMemberArr.push(item.requestMemberId);
                    })
                    this.$refs.splitDemand.show();
                } else {
                    this.$message.error({
                        message:'权限不足，无法操作'
                    })
                    return
                }
                    
            },
            searchResource(data) {//搜索
                this.pageInfos.pageIndex = 1;
                this.getRequireList(data)
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
            pageChange(page) {
                this.pageInfos.pageIndex = page;
                this.getRequireList();
            },
            haveClick() {
                this.activeIndex = 1;
            },
            newClick() {
                this.activeIndex = 2;
            },
            requireConfirm() {//需求单
                if(!this.requireRadio) {
                    this.$message.error({message:'请选择需求单'})
                    return
                }
                this.splitRequire(1);
            },
            requireClose() {},
            addNewRequireConfirm() {
                this.$validator.validateAll('addNew').then((result) => {
                    if(result) {
                        this.splitRequire(2);
                    }
                })
            },
            addNewClose() {}
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
	
	.modeltab {
		background-color: #eee;
		text-align: center;
		color: #999;
		&.active {
			background-color: #fff;
			color: $mainColor;
		}
	}
	
	.span {
		color: $mainColor;
		padding: 0 5px;
		cursor: pointer;
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
            background: url(../add/images/havesqel.png) no-repeat center;
            background-size: 26px 26px;
        }
        .goods-icon{
            width: 26px;
            height: 26px;
            margin: 22px auto 0;
            background: url(../add/images/newrequire.png) no-repeat center;
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
            background: url(../add/images/weixuanzhong_03.png) no-repeat center;
            background-size: 16px 16px;
        }
        &.active{
            color: $mainColor;
            border: solid 1px $mainColor;
            .prods-icon{
                background: url(../add/images/havesqell.png) no-repeat center;
                background-size: 26px 26px;
            }
            .goods-icon{
                background: url(../add/images/newrequiree.png) no-repeat center;
                background-size: 26px 26px;
            }
            p{
                color: $mainColor;
            }
            .req-selected{
                background: url(../add/images/xuanzhong_03.png) no-repeat center;
                background-size: 16px 16px;
            }
        }
        &:hover{
            color: $mainColor;
            border: solid 1px $mainColor;
            .prods-icon{
                background: url(../add/images/havesqell.png) no-repeat center;
                background-size: 26px 26px;
            }
            .goods-icon{
                background: url(../add/images/newrequiree.png) no-repeat center;
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
		width: 100%;
		height: 50px;
		line-height: 49px;
		padding: 0 20px;
		border-top: 1px solid #f5f5f5;
		text-align: right;
		background-color: #fff;
	}
	
	.over-col {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>