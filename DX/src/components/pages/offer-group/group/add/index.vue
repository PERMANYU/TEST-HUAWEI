<template>
	<div class="add-info">
		<Scroll  :isShowRight="true">
			<div class="add-process">
				<div class="add-message active">
					<span class="tip">配置销售品组基本信息</span>
				</div>
				<div class="i-next">
				</div>
				<div class="add-relation" @click="goAddMemRel">
					<span class="tip">配置销售品组成员和销售品组关系</span>
				</div>
			</div> 
			<Row  class="main">
				<Form labelWidth="120px" labelAlign="left" >
					<Col :span="12">
						<FormItem labelText="销售品组名称：" :requiredIcon="true" :errorMessage="errors.first('name')">
							<Input v-validate="'required'"  name="name" v-model.trim="group.name" data-vv-as="销售品组名称" maxlength="30"></Input>
						</FormItem>
					</Col>
					<Col :span="9" :offset="3" >
						<FormItem labelText="销售品组内成员关系：" :requiredIcon="true" :errorMessage="errors.first('offerGroupType')" class="offerGroupType">
                        	<Select v-validate="'required'" :data="offerGroupTypeArray" name="offerGroupType" data-vv-as="销售品组内成员关系：" v-model="basicData.offerGroupType"></Select>
                     	</FormItem>
					</Col>
					<Col :span="24">
						<FormItem  labelText="描述：">
							<Input type="textarea" name="requirementDesc" v-model.trim="group.desc" data-vv-as="需求单描述"
                                   maxlength="300"></Input>
						</FormItem>
					</Col>
					<Col :span="24">
                        <FormItem labelText="选择添加方式：" :requiredIcon="true" class="type">
                            <Radio name="actType" label="OFFER"
                                   v-model="group.actType" class="offer" @change="catlogHide()" :disabled ="offerDisable">通过选择销售品添加</Radio>
                            <Radio name="actType" label="CATLOG"
                                   v-model="group.actType" @change="catlogShow()" :disabled ="catlogDisable">通过选择目录添加</Radio>
                        </FormItem>
                    </Col>
					<Col :span="6" v-show="show.catlog">
                        <FormItem labelText="选择目录：" :requiredIcon="true" :errorMessage="errors.first('catlog')">
                            <Input v-validate="{required: isRuquired}" name="catlog" data-vv-as="目录" v-model="basicData.offerCatalogLocation.loc" @click.native="catalogClick()" ref="catalogItemNameRef"></Input>
                        </FormItem>
                    </Col>
				</Form>
			</Row>
		</Scroll>
		<div class="footer">
			<div class="btn-page-box">
				<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
				<span class="app__btn app__btn-confirm" @click="submit()">下一步</span>
			</div>
		</div>

		<Dialog dialogTitle="销售品目录位置" ref="catalogItemDialog" @confirm="catalogItemDialogConfirm">
			<Scroll :isShowRight="true" ref="catalogItemTree">
				<Tree :folder="treeItem" :keys="catalogItemTreeKey" v-for="(treeItem,treeIndex) in catalogItemTree" :key="'tree'+treeIndex" v-model="catalogItemTreeModel" @plugClick="catalogItemTreePlugClick()" :selLevel="9999" />
			</Scroll>
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
				basicData: {
					offerCatalogLocation: {
						loc:""
					}
				},
				offerGroupTypeArray: [{
                    label: '互斥组',
                    value: '1000'
                }, {
                    label: '续约组',
                    value: '1100'
                }, {
                    label: '依赖组',
                    value: '1200'
                }, {
                    label: '普通组',
                    value: '1300'
                }],
				group: {
                    actType: 'OFFER',
					name: '',
					desc: '',
					grpType: ''
				},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				show: {
					catlog: false,
					type: false,
					active: false
				},
				catalogItemTree: [],
				catalogItemTreeKey: [{
					key: 'catalogItemName',
					span: 24
				}],
				catalogItemTreeModel: '',
				offerDisable: false,
				catlogDisable: false,
				isRuquired: false,
			}
		},
		mounted(){
			this.initDate()
		},
		methods: {
			initDate(){//初始化页面
				if(this.componentData.offerGrpId){
					this.group.name = this.componentData.offerGrpName
					this.basicData.offerGroupType = this.componentData.grpRelType
					this.group.desc = this.componentData.offerGrpDesc
					this.basicData.offerCatalogLocation.loc = this.componentData.catalogItemName
					if(this.componentData.grpType =='1000'){
						this.group.actType = 'OFFER'
						this.catlogDisable = true
						this.isRuquired = false
					}else{
						this.group.actType = 'CATLOG'
						this.offerDisable = true
						this.isRuquired = true
						this.catlogShow()
					}
				}
			},
			catlogShow(){//显示“选择目录”
				this.show.catlog = true;
			},
			catlogHide(){//隐藏“选择目录”
				this.show.catlog = false;
			},
			submit(){//下一步
				if(this.group.actType == 'OFFER'){
					this.basicData.offerCatalogLocation.catalogItemId = -1
					this.group.grpType = '1000'
					this.isRuquired = false
				}else{
					this.group.grpType = '1100'
					this.isRuquired = true
				}
				let offerParams = {
					offerGrpName: this.group.name,
					grpRelType: this.basicData.offerGroupType,
					offerGrpDesc: this.group.desc || "",
					catalogItemId: this.basicData.offerCatalogLocation.catalogItemId,
					catalogItemName: this.basicData.offerCatalogLocation.loc,
					createStaff: this.$user.getInfo().id,
					updateStaff: this.$user.getInfo().id,
					statusCd: '1200',
					createDate: new Date(),
					updateDate: new Date(),
					grpType: this.group.grpType
				}
				let modifyParams = {
					offerGrpId: this.componentData.offerGrpId,
					offerGrpName: this.group.name,
					grpRelType: this.basicData.offerGroupType,
					offerGrpDesc: this.group.desc || "",
					catalogItemId: this.basicData.offerCatalogLocation.catalogItemId,
					catalogItemName: this.basicData.offerCatalogLocation.loc,
					updateStaff: this.$user.getInfo().id,
					statusCd: '1200',
					updateDate: new Date(),
					grpType: this.group.grpType
				}
				this.$validator.validateAll().then((result) => {
					if(result) {
						if(!this.componentData.offerGrpId){
							this.$axios.post(this.$api.OfferGroupTask,offerParams
							).then(res => {
								if (res.data.success) {
									this.$message.success({ message: '基本信息保存成功！' })
									if(this.group.actType == 'OFFER'){
										this.$nextTick(() => {
											this.$emit('componentView', 'offerAdd',res.data.offerGrp);
										})
									}else{
										this.$nextTick(() => {
											this.$emit('componentView', 'groupAdd',res.data.offerGrp);
										})
									}
								}else{
									this.$message.error({message: res.data.msg})
								}
							}).catch( error => {
								this.$message.error({message: error.response.data.msg})
							})
						}else{
							this.$axios.put(this.$api.OfferGroupTask,modifyParams
							).then(res => {
								if (res.data.success) {
									this.$message.success({ message: '基本信息修改成功！' })
									if(this.group.actType == 'OFFER'){
										this.$nextTick(() => {
											this.$emit('componentView', 'offerAdd',res.data.offerGrp);
										})
									}else{
										this.$nextTick(() => {
											this.$emit('componentView', 'groupAdd',res.data.offerGrp);
										})
									}
								}else{
									this.$message.error({message: res.data.msg})
								}
							}).catch( error => {
								this.$message.error({message: error.response.data.msg})
							})
						}
					}else{
						this.$message.error({ message: '基本信息表单验证失败！' })
					}
				})		
			},
			catalogClick() {//销售品目录树
                this.$axios.get(this.$api.Catalog+'/10102',{
                    params:{

                    }
                }).then(res => {
                    if (res.data.success) {
                        this.catalogItemTree = res.data.catalogDetail.catalogItems||[];
                        this.$nextTick(() => {
							this.$refs.catalogItemDialog.show();
						})

                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },

			catalogItemTreePlugClick() {
				this.$refs.catalogItemDialog.initHeight();
				this.$refs.catalogItemTree.initScroll();
			},
			catalogItemDialogConfirm() {
				this.basicData.offerCatalogLocation.loc = this.catalogItemTreeModel.catalogItemName;
				this.basicData.offerCatalogLocation.catalogItemId = this.catalogItemTreeModel.catalogItemId;

				this.$refs.catalogItemDialog.hide();
				this.$refs.catalogItemNameRef.focus();
				setTimeout(() => {
					this.$refs.catalogItemNameRef.blur();
				}, 100)
			},
			globalback(){//返回
				this.$emit('componentView', 'list') 
			},
			goAddMemRel(){
				this.submit()
			}
		}
	}
</script>

<style scoped lang="scss">
	.add-info {
		width: 100%;
		height: 100%;
		padding: 0 20px 50px;
		.offerGroupType {
			padding-left: 130px !important;
			/deep/ .f-i-l {
				display: block;
				position: absolute;
				left: 0;
				min-height: 30px;
				line-height: 30px;
				padding-right: 5px;
				min-width: 135px;
			}
		}
		.add-process{
			display: -webkit-flex;
			display: flex;
			position: relative;
			width: 100%;
			height: 36px;
			-webkit-justify-content: center;
			justify-content: center;	
			-webkit-align-items: center;
			align-items: center;
			margin-bottom: 40px;
			margin-top: 30px;
			color: #254063;
			.i-next{
				display: inline-block;
				width: 50px;
				height: 20px;
				background-image: url(images/pzlcjt.png);
				background-repeat: no-repeat;
				background-position: center;
				vertical-align: middle;
			}
			.active{
				background-color: #5C9CF3!important;
			 	color: white;
			}
			.add-message,
			.add-relation{
				display: -webkit-flex;
				display: flex;
				width: 342px;
				height:100%;
				-webkit-justify-content: center;
				justify-content: center;
				-webkit-align-items: center;
				align-items: center;
				font-family: 'Arial Normal', 'Arial';
				font-size: 13px;
				background-color: #f5f5f5;
				cursor: pointer;
				.tip{
					height:19px;
					line-height: 19px;
				}
			}
		}

		.main {
			padding: 20px;
            padding-bottom: 0;
			border: 1px solid #eeeeee;
			background: #fdfdfd;
		}

		.footer {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			box-shadow: 0 -2px 0 #f1f5fa;
			z-index: 99;
			.btn-page-box {
				width: 100%;
				height: 50px;
				padding: 10px 20px;
				font-size: 12px;
				text-align: right;
				background: #ffffff;

				.app__btn-confirm{
					margin-left: 10px;
				}
			}
		}
	}
</style>
