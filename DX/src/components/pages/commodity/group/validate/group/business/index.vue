<template>
	<div class="business">
		<Scroll class="scroll" :isShowRight="true">
			<div class="info-list member">
				<div class="app__title ">
					<i class="iconfont icon-jibenxinxi"></i>
					<span>业务测试</span>
				</div>
				<div class="h-a-add">
					<div class="app__btn app__btn-add" @click="addBusiness()">添加</div>
				</div>
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span="2">序号</Col>
						<Col :span="4">测试场景名称</Col>
						<Col :span="9">测试场景说明</Col>
						<Col :span="3">测试结果</Col>
						<Col :span="3">附件</Col>
						<Col :span="3">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in adjustShowArray()" :key="index">
						<Col :span="2">{{index + 1}}</Col>
						<Col :span="4">{{item.testSceneName}}</Col>
						<Col :span="9" class="no-wrap" :title="item.testSceneDesc">{{item.testSceneDesc}}</Col>
						<Col :span="3">{{item.testResult == 1 ? '通过' : '不通过'}}</Col>
						<Col :span="3">
							<span v-if="item.docLink=='未上传附件'" class="span" @click="custUploadClick(item)">
				                <span>附件上传</span>
							</span>
							<span v-if="item.docLink !=='未上传附件'" class="span" @click="downLoad(item)">下载</span>
						</Col>
						<Col :span="3">
						<span class="operation" @click="modClick(item)">修改</span>
						<span class="operation" @click="delClick(item)">删除</span>
						</Col>
					</Row>
				</div>
			</div>
			<input type="file" class="file" ref="fileRef" @change="custUploadChange" />
		</Scroll>
		<Dialog :dialogSize="dialogSize" dialogTitle="添加业务测试" ref="addBusiness" @confirm="addBusinessConfirm">
			<Scroll class="info-dialog" :isShowRight="true">
				<Form labelWidth="130px">
					<Row>
						<Col>
						<FormItem labelText="测试场景名称：" :requiredIcon="true" :errorMessage="errors.first('testSceneName')">
							<Input v-validate="'required'" name="testSceneName" v-model="modOfferBasic.testSceneName" data-vv-as="测试场景名称"></Input>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
						<FormItem labelText="测试结果：" :requiredIcon="true" :errorMessage="errors.first('testResult')">
							<RadioGroup v-validate="'required'" name="testResult" :data="testResult" v-model="modOfferBasic.testResult" label="1" data-vv-as="测试结果">通过</RadioGroup>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
						<FormItem labelText="测试场景说明：" :requiredIcon="false">
							<Input type="textarea" v-model="modOfferBasic.testSceneDesc"></Input>
						</FormItem>
						</Col>
					</Row>
				</Form>
			</Scroll>
		</Dialog>

		<Tip ref="tipRef" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				dialogSize: {
					size: 40,
					min: 500,
					max: 500
				},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				offerBasic: {},
				modOfferBasic: {},
				offerBasicArray: [],
				isMod: false,
				testResult: [{
					label: '通过',
					value: '1'
				}, {
					label: '不通过',
					value: '0'
				}],
				offerBussTestIdTemp: ''
			}
		},
		mounted() {
			this.getBussTest();
		},
		methods: {
			getBussTest() {
				this.$axios.get(this.$api.replace(this.$api.OfferBussTest, ["{offerId}"], [this.componentData.offerId]), {

				}).then(res => {
					if(res.data.success) {
						this.offerBasicArray = res.data.offerBussTestDTOList || [];
					} else {
						this.$message.error({ message: res.data.msg })
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			save(callback) {
				this.$axios.post(this.$api.replace(this.$api.OfferBussTest, ["{offerId}"], [this.componentData.offerId]), {
					offerBussTests: this.offerBasicArray.filter(item => item.actType)
				}).then(res => {
					if(res.data.success) {
						this.$message.success({ message: '保存成功！' });
						callback(true)
						this.getBussTest();
					} else {
						this.$message.error({ message: res.data.msg });
						callback(false)
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
					callback(false)
				})
			},
			adjustShowArray() {
				return this.offerBasicArray.filter(item => item.actType != 'DEL');
			},
			addBusiness() {
				this.modOfferBasic = {};
				this.isMod = false;
				this.$refs.addBusiness.show();
			},
			addBusinessConfirm(callback) {
				this.$validator.validateAll().then((result) => {
					if(result) {
						this.modOfferBasic.offerId = this.componentData.offerId;
						this.modOfferBasic.createStaff = this.$user.getInfo().id;
						this.modOfferBasic.updateStaff = this.$user.getInfo().id;
						this.modOfferBasic.statusCd = '1000';
						this.$set(this.modOfferBasic, 'actType', this.isMod ? 'MOD' : 'ADD');
						if(this.isMod) {
							Object.keys(this.modOfferBasic).map(item => {
								this.offerBasic[item] = this.modOfferBasic[item];
							})
						} else {
							this.offerBasicArray.push(this.modOfferBasic);
						}
						this.$axios.post(this.$api.replace(this.$api.OfferBussTest, ["{offerId}"], [this.componentData.offerId]), {
							offerBussTests: this.offerBasicArray.filter(item => item.actType)
						}).then(res => {
							if(res.data.success) {
								this.getBussTest();
								this.$message.success({ message: '保存成功！' });
								callback(true)
							} else {
								this.$message.error({ message: res.data.msg });
								callback(false)
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg });
							callback(false)
						})
						this.$refs.addBusiness.hide();
					}
				})
			},
			modClick(item) {
				this.offerBasic = item;
				this.modOfferBasic = JSON.parse(JSON.stringify(item));
				this.isMod = true;
				this.$refs.addBusiness.show();
			},
			delClick(item) {
				this.offerBasic = item;

				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `确认要删除吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tipRef.show();
			},
			tipConfirm() {
				if(this.offerBasic.offerBussTestId) {
					this.offerBasic.statusCd = '1100';
					this.$set(this.offerBasic, 'actType', 'DEL');
				} else {
					this.offerBasicArray = this.offerBasicArray.filter(item => !this.$utils.isEqual(item, this.offerBasic))
				}

				this.$refs.tipRef.hide();
			},
			custUploadClick(item) {
				this.offerBussTestIdTemp = item.offerBussTestId;
				this.$refs.fileRef.click();
			},
			custUploadChange(e) {
				if(e.target.files.length === 0) return;
				let files = Array.from(e.target.files);
				console.log(files)
				if(files[0].size > 0) {
					let formData = new FormData();
					formData.append('objId', this.offerBussTestIdTemp);
					formData.append('objType', '1003');
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
							this.getBussTest();
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
			downLoad(item) {
				window.open(this.$api.Shtelpaasstorage + item.docLink)
			}
		}
	}
</script>

<style scoped lang="scss">
	.business {
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
			.no-wrap {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.operation {
				color: $mainColor;
				cursor: pointer;
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
			.span{
				color: $mainColor;
				cursor: pointer;
			}
		}
		.info-dialog {
			padding: 20px !important;
		}
	}
</style>