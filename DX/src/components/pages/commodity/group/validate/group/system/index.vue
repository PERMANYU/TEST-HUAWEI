<template>
	<div class="system">
		<Scroll class="scroll" :isShowRight="true">
			<div class="info-list member">
				<div class="app__title ">
					<i class="iconfont icon-jibenxinxi"></i>
					<span>系统测试</span>
				</div>
				<div class="h-a-add">
					<div class="app__btn app__btn-add" @click="addSystem()">添加</div>
				</div>

				<!--系统名称-->
				<ul>
					<li :class="{'active':systemNbr===item.nbr}" v-for="(item,index) in testData" :key="index" @click="systemNbr=item.nbr" v-show="isShowNoData(item.nbr)">{{item.name}}
					</li>
				</ul>

				<!--测试场景详情-->
				<div v-for="(item,index) in sceneData" :key="index" v-show="item.systemNbr==systemNbr">
					<!--title-->
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>测试场景详情</span>
					</div>

					<Row class="app__table-thead test-scene">
						<Col :span="5" :offset="1">
						<label class="label">名称：</label>
						<span class="span">{{item.sceneName}}</span>
						</Col>

						<Col :span="5">
						<label class="label">前序场景：</label>
						<span class="span">{{item.preorderScene}}</span>
						</Col>

						<Col :span="10">
						<label class="label">描述：</label>
						<span class="span">{{item.sceneDesc}}</span>
						</Col>

						<Col :span="3" class="add-col">
						<div class="app__btn app__btn-add" @click="newTestClick(index)">添加</div>
						</Col>
					</Row>

					<!--测试用例列表-->
					<div class="app__table">
						<Row class="app__table-thead">
							<Col :span="4">测试用例名称</Col>
							<Col :span="4">测试指标名称</Col>
							<Col :span="4">测试结果</Col>
							<Col :span="4">测试结果说明</Col>
							<Col :span="4">附件</Col>
							<Col :span="4">操作</Col>
						</Row>

						<Row :class="['app__table-item']" v-for="(item2,index2) in item.offerSysTestCases" :key="index2" v-show="item2.statusCd!='1100'">
							<Col :span="4">{{item2.testCaseName}}</Col>
							<Col :span="4">{{item2.testIndex}}</Col>
							<Col :span="4">{{item2.testResult==='1'?'通过':item2.testResult==='2'?'不通过':'---'}}</Col>
							<Col :span="4">{{item2.testResultDesc}}</Col>
							<Col :span="4">
							<span v-if="item2.docLink=='未上传附件'" class="span" @click="custUploadClick(index,index2,item2)">
				                <span>附件上传</span>
							</span>
							<span v-if="item2.docLink !=='未上传附件'" class="span" @click="downLoad(index,index2,item2)">下载</span>
							</Col>
							<Col :span="4"><span class="span" @click="delTest(index,index2,item2)">删除</span></Col>
						</Row>
						<!--暂无数据-->
						<div class="app__data-none" v-show="!isShowNoData2(item.offerSysTestCases)">
							<span>暂无数据</span>
						</div>
					</div>
				</div>
			</div>
			<input type="file" class="file" ref="fileRef" @change="custUploadChange" />

			<!--&lt;!&ndash;暂无数据&ndash;&gt;-->
			<!--<div class="app__data-none" v-show="!isShowNoData(this.systemNbr)">-->
			<!--<span>暂无数据</span>-->
			<!--</div>-->
		</Scroll>

		<!--添加测试场景-->
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加测试场景" ref="addSystem" @confirm="addScene()">
			<div class="main">
				<Form labelWidth="110px">
					<div class="a-info">
						<Row>
							<Col :span="20">
							<FormItem labelText="选择系统：" :requiredIcon="true">
								<Radio name="radio1" :label="testData[0]" v-model="addForm.systemInfo">CRM</Radio>
								<Radio name="radio1" :label="testData[1]" v-model="addForm.systemInfo">计费</Radio>
								<Radio name="radio1" :label="testData[2]" v-model="addForm.systemInfo">网厅</Radio>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="20">
							<FormItem labelText="选择场景类型：" :requiredIcon="true">
								<Radio name="radio2" label="1000027" v-model="addForm.serviceOfferId">新装</Radio>
								<Radio name="radio2" label="1000031" v-model="addForm.serviceOfferId">变更</Radio>
								<Radio name="radio2" label="1000048" v-model="addForm.serviceOfferId">退订</Radio>
								<Radio name="radio2" label="1000035" v-model="addForm.serviceOfferId">续订</Radio>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="20">
							<FormItem labelText="名称：" :requiredIcon="true" :errorMessage="errors.first('sceneName')">
								<Input name="sceneName" v-model="addForm.sceneName" v-validate="'required'" data-vv-as="名称"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="20">
							<FormItem labelText="前序场景：" :requiredIcon="true" :errorMessage="errors.first('preorderScene')">
								<Input name="preorderScene" v-model="addForm.preorderScene" v-validate="'required'" data-vv-as="前序场景"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="20">
							<FormItem labelText="描述：" :requiredIcon="false">
								<textarea class="app__textarea" v-model="addForm.sceneDesc"></textarea>
							</FormItem>
							</Col>
						</Row>
					</div>
				</Form>
			</div>
		</Dialog>

		<!--添加测试用例-->
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加测试用例" ref="newTestClick" @confirm="addTest()">
			<div class="main">
				<Form labelWidth="110px">
					<div class="a-info">
						<Row>
							<Col :span="20">
							<FormItem labelText="测试用例名称：" :requiredIcon="true" :errorMessage="errors.first('testCaseName')">
								<Input name="testCaseName" v-model="addForm2.testCaseName" v-validate="'required'" data-vv-as="测试用例名称"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="20">
							<FormItem labelText="测试指标名称：" :requiredIcon="true" :errorMessage="errors.first('testIndex')">
								<Input name="testIndex" v-model="addForm2.testIndex" v-validate="'required'" data-vv-as="测试指标名称"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="20">
							<FormItem labelText="测试结果：" :requiredIcon="true" :errorMessage="errors.first('testResult')">
								<Select name="testResult" :data="testResultData" dataLabelStr="name" v-model="addForm2.testResult" v-validate="'required'" data-vv-as="测试结果">
								</Select>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="20">
							<FormItem labelText="测试结果说明：" :requiredIcon="false">
								<textarea class="app__textarea" v-model="addForm2.testResultDesc">
                                    </textarea>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
							<FormItem>

							</FormItem>
							</Col>
						</Row>
					</div>
				</Form>
			</div>
		</Dialog>

		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="查看附件" ref="checkFile" :showConfirmBtn="false">
			<div class="main">
				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="12">附件文档名称</Col>
						<Col :span="12">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in documentList" :key="index">
						<Col :span="12">{{item.docName ? item.docName : '无'}}</Col>
						<Col :span="12">
						<span class="span" @click="downLoad(item)">下载</span>
						<span class="span" @click="deleteDoc(item)">删除</span>
						</Col>
					</Row>
					<Row v-show="documentList.length == 0" class="app__data-none">
						<Col :span="24"><span>暂无数据</span></Col>
					</Row>
				</div>
			</div>
		</Dialog>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				offerId: '111', //销售品id
				systemNbr: '',
				sceneIndex: '', //被操作的测试用例所在场景的索引
				//测试结果
				testResultData: [
					{ name: '通过', value: '1' },
					{ name: '不通过', value: '2' }
				],
				//添加测试场景
				addForm: {
					systemInfo: '', //系统信息
					serviceOfferId: '', //场景类型
					sceneName: '', //场景名称
					preorderScene: '', //前序场景
					sceneDesc: '', //场景描述
				},
				//添加测试用例
				addForm2: {
					testCaseName: '', //测试用例名称
					testIndex: '', //测试指标
					testResult: '', //测试结果
					testResultDesc: '', //测试结果说明
				},

				//测试场景列表
				sceneData: [],

				dialogSize: {
					size: 40,
					min: 500,
					max: 500
				},
				testData: [
					{ name: 'CRM', id: '100000001', nbr: 'CRM' },
					{ name: '计费', id: '100000002', nbr: 'ABP' },
					{ name: '网厅', id: '100000003', nbr: 'WD' },
				],
				tabIndex: 0,
				offerSysTestCaseIdTemp: '',
				documentList: []
			}
		},
		mounted() {
			this.offerId = this.componentData.offerId;
			this.gteSystemData();

		},
		methods: {
			//获取系统测试信息
			gteSystemData() {
				this.sceneData = [];
				this.$axios.get(this.$api.replace(this.$api.OfferSysTestScene, ['{offerId}'], [this.offerId]), {
					params: {
						systemInfoId: 0 //systemInfoId传0查全部
					}
				}).then((res) => {
					if(res.data.success) {
						this.sceneData = res.data.offerSysTestScenes;
					} else {
						this.$message.error({ message: '操作失败！' });
					}
				}).catch(error => {

				})
			},

			//打开添加场景
			addSystem() {
				this.$refs.addSystem.show();
				this.addForm = {
					systemInfo: this.testData[0],
					serviceOfferId: '1000027',
					sceneName: '',
					preorderScene: '',
					sceneDesc: ''
				}
			},
			//添加场景
			addScene() {
				this.$validator.validateAll().then((result) => {
					if(result) {
						//验证测试场景名称是否存在
						if(this.sceneData.find(obj => obj.sceneName == this.addForm.sceneName)) {
							this.$message.error({ message: '测试场景名称已存在！' });
							return;
						};

						this.sceneData.unshift({
							offerId: this.offerId, //销售品id
							systemInfoId: this.addForm.systemInfo.id, //系统id
							systemNbr: this.addForm.systemInfo.nbr, //系统编码
							serviceOfferId: this.addForm.serviceOfferId, //场景类型
							sceneName: this.addForm.sceneName, //场景名称
							preorderScene: this.addForm.preorderScene, //前序场景
							sceneDesc: this.addForm.sceneDesc, //场景描述
							offerSysTestCases: [], //测试用例
							statusCd: '1000', //操作状态新增1000，删除1100
							createStaff: this.$user.getInfo().id,
							updateStaff: this.$user.getInfo().id,
						});
						this.$axios.post(this.$api.replace(this.$api.OfferSysTestScene, ['{offerId}'], [this.offerId]), {
							offerSysTestScenes: this.sceneData

						}).then((res) => {
							if(res.data.success) {
								this.$message.success({ message: '系统测试保存成功！' });
								this.gteSystemData();
							} else {
								this.sceneData = [];
								this.$message.error({ message: '系统测试操作失败！' });
							}
						}).catch(error => {
							this.sceneData = [];
							this.$message.error({ message: error.response.data.msg });
						})

						this.$refs.addSystem.hide();
					}
				});
			},

			//打开添加测试用例
			newTestClick(index) {
				this.$refs.newTestClick.show();
				this.sceneIndex = index;

				this.addForm2 = {
					testCaseName: '',
					testIndex: '',
					testResult: '',
					testResultDesc: '',
				}
			},
			//添加测试用例
			addTest() {
				this.$validator.validateAll().then((result) => {
					if(result) {
						//验证测试用例名称是否存在
						if(this.sceneData[this.sceneIndex].offerSysTestCases.find(obj => obj.statusCd != '1100' && obj.testCaseName == this.addForm2.testCaseName)) {
							this.$message.error({ message: '测试用例名称已存在！' });
							return;
						};

						this.sceneData[this.sceneIndex].offerSysTestCases.unshift({
							offerSysTestSceneId: this.sceneData[this.sceneIndex].offerSysTestSceneId, //销售品系统测试场景标识
							testCaseName: this.addForm2.testCaseName, //测试用例名称
							testIndex: this.addForm2.testIndex, //测试指标
							testResult: this.addForm2.testResult, //测试结果
							testResultDesc: this.addForm2.testResultDesc, //测试结果说明
							statusCd: '1000', //操作状态新增1000，删除1100
							createStaff: this.$user.getInfo().id,
							updateStaff: this.$user.getInfo().id,
						});
						this.$axios.post(this.$api.replace(this.$api.OfferSysTestScene, ['{offerId}'], [this.offerId]), {
							offerSysTestScenes: this.sceneData

						}).then((res) => {
							if(res.data.success) {
								this.$message.success({ message: '测试用例保存成功！' });
								this.gteSystemData();
							} else {
								this.$message.error({ message: '测试用例操作失败！' });
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg });
						})
						this.$refs.newTestClick.hide();
					}
				})
			},
			//删除测试用例
			delTest(index, index2, item2) {
				if(item2.statusCd == '1000') {
					this.sceneData[index].offerSysTestCases[index2].statusCd = '1100';
					this.$axios.post(this.$api.replace(this.$api.OfferSysTestScene, ['{offerId}'], [this.offerId]), {
						offerSysTestScenes: this.sceneData

					}).then((res) => {
						if(res.data.success) {
							this.$message.success({ message: '测试用例删除成功！' });
							this.gteSystemData();
						} else {
							this.$message.error({ message: '测试用例删除失败！' });
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg });
					})
				} else {
					this.sceneData[index].offerSysTestCases.splice(index2, 1);
				}
			},

			//是否显示测试场景暂无数据
			isShowNoData(systemNbr) {
				return this.sceneData.find(obj => obj.systemNbr == systemNbr);
			},
			//是否显示测试用例暂无数据
			isShowNoData2(data) {
				return data.find(obj => obj.statusCd != '1100');
			},
			custUploadClick(index, index2, item2) {
				this.offerSysTestCaseIdTemp = item2.offerSysTestCaseId;
				this.$refs.fileRef.click();
			},
			custUploadChange(e) {
				if(e.target.files.length === 0) return;
				let files = Array.from(e.target.files);
				console.log(files)
				if(files[0].size > 0) {
					let formData = new FormData();
					formData.append('objId', this.offerSysTestCaseIdTemp);
					formData.append('objType', '1002');
					formData.append('center', 'cpc');
					formData.append('file', files[0]);
                    formData.append('docName', files[0].name);
                    formData.append('createStaff ', this.$user.getInfo().id);

					this.$axios.post(this.$api.PushDocumentObj, formData, {
						headers: {
							"Content-Type": "multipart/form-data"
						}
					}).then(res => {
						if(res.data.success == true) {
							this.gteSystemData();
							this.$message.success({ message: '附件上传成功！' });
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
			},
			downLoad(index, index2, item2) {
				// http://cpc.te.sh.ctc.com:8082/cpc/cpcweb/documentRel/getDocumentFile?documentId=7f95e25bbe134536ba79b9c371e0ba60
				window.open(this.$api.Shtelpaasstorage + item2.docLink)
			}
		}
	}
</script>

<style scoped lang="scss">
	.system {
		width: 100%;
		height: 100%;
		.scroll {
			padding: 0 20px 20px !important;
			.mod-title {
				width: 100%;
				height: 30px;
				background-color: #f5f6fa;
				border-radius: 16px 16px 0 0;
				div {
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
			.h-a-add {
				position: absolute;
				top: 15px;
				right: 0;
				height: 30px;
			}
			ul {
				width: 100%;
				height: 50px;
				li {
					width: 100px;
					height: 30px;
					border: 1px solid $mainColor;
					background: #ffffff;
					line-height: 30px;
					text-align: center;
					float: left;
					border-radius: 5px;
					margin-left: 30px;
					color: $mainColor;
					cursor: pointer;
					&:hover {
						background: $mainColor;
						color: #ffffff;
					}
				}
				.active {
					background: $mainColor;
					color: #ffffff;
				}
			}
			.app__table {
				.span {
					color: $mainColor;
					padding: 0 5px;
					cursor: pointer;
				}
			}
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
		.main {
			padding: 20px;
			.a-info {
				padding-top: 30px;
				margin-bottom: 30px;
				.radio {
					margin-left: 4px;
				}
			}
			.span {
				cursor: pointer;
			}
		}
		/*测试场景详情*/
		.test-scene {
			.add-col {
				text-align: right;
				padding-right: 10px;
			}
			.label {
				color: #333333;
			}
			.span {
				color: #888888;
			}
		}
	}
</style>