<template>
	<transition name="fade">
		<div class="add">
			<Scroll :isShowRight="true" ref="scroll">
				<div class="a-header">
					<div class="a-title">修改属性规格</div>
					<div class="a-close" @click="btnBack()"></div>
				</div>

                <!--第一步，添加基本信息-->
				<div class="a-value" v-if="step=='1000'">
					<div class="a-v-title1">
						<span class="v-t-item app__tab active">基本信息</span>
					</div>

					<div class="a-info">
						<Row>
							<Form labelWidth="110px">
								<Col :span="6" >
                                    <FormItem labelText="属性编码：" :requiredIcon="true" :errorMessage="errors.first('attrNbr')">
                                        <Input v-validate="'required'" name="attrNbr" v-model.trim="attrForm.attrNbr" data-vv-as="属性编码"></Input>
                                    </FormItem>
								</Col>

								<Col :span="6" :offset="2">
                                    <FormItem labelText="属性名称：" :requiredIcon="true" :errorMessage="errors.first('attrName')">
                                        <Input v-validate="'required'" name="attrName" v-model.trim="attrForm.attrName" data-vv-as="属性名称"></Input>
                                    </FormItem>
								</Col>

								<Col :span="6" :offset="2">
                                    <FormItem labelText="属性格式：" :requiredIcon="true" :errorMessage="errors.first('attrFormat')">
                                        <Input v-validate="'required'" name="attrFormat" v-model.trim="attrForm.attrFormat" data-vv-as="属性格式"></Input>
                                    </FormItem>
								</Col>

								<Col :span="6" >
                                    <FormItem labelText="属性长度：" :requiredIcon="true" :errorMessage="errors.first('attrLength')">
                                        <Input v-validate="'required|numeric'" name="attrLength" v-model.trim="attrForm.attrLength" data-vv-as="属性长度"></Input>
                                    </FormItem>
								</Col>

								<Col :span="6" :offset="2">
                                    <FormItem labelText="属性值类型：" :requiredIcon="true" :errorMessage="errors.first('attrValueDataType')">
                                        <Select :data="attrValList" dataLabelStr="name" v-model="attrForm.attrValueDataType"
                                                v-validate="'required'" name="attrValueDataType" data-vv-as="属性值类型">
                                        </Select>
                                    </FormItem>
								</Col>


								<Col :span="6" :offset="2">
                                    <FormItem labelText="唯一性：" :requiredIcon="true">
                                        <Radio name="isUnique" label="1"
                                               v-model="attrForm.isUnique">是</Radio>
                                        <Radio name="isUnique" label="0"
                                               v-model="attrForm.isUnique">否</Radio>
                                    </FormItem>
								</Col>
                                
								<Col :span="6" >
                                    <FormItem labelText="起始值：" :requiredIcon="true" :errorMessage="errors.first('valueFrom')">
                                        <Input v-validate="'required|numeric'" name="valueFrom" v-model.trim="attrForm.valueFrom" data-vv-as="起始值"></Input>
                                    </FormItem>
								</Col>

								<Col :span="6" :offset="2">
                                    <FormItem labelText="属性值分类：" :requiredIcon="true">
                                        <Radio name="attrValueType" label="1000"
                                               v-model="attrForm.attrValueType">输入型</Radio>
                                        <Radio name="attrValueType" label="2000"
                                               v-model="attrForm.attrValueType">枚举型</Radio>
                                    </FormItem>
								</Col>

								<Col :span="6" :offset="2">
                                    <FormItem labelText="结束值：" :requiredIcon="true" :errorMessage="errors.first('valueTo')">
                                        <Input v-validate="'required|numeric'" name="valueTo" v-model.trim="attrForm.valueTo" data-vv-as="结束值"></Input>
                                    </FormItem>
								</Col>

                                <Col :span="6"  >
                                    <FormItem labelText="是否可空：" :requiredIcon="true">
                                        <Radio name="isNullable" label="1"
                                               v-model="attrForm.isNullable">是</Radio>
                                        <Radio name="isNullable" label="0"
                                               v-model="attrForm.isNullable">否</Radio>
                                    </FormItem>
								</Col>

								<Col :span="6" :offset="2">
                                    <FormItem labelText="是否动态属性：" :requiredIcon="true">
                                        <Radio name="isDanyAttr" label="1"
                                               v-model="attrForm.isDanyAttr">是</Radio>
                                        <Radio name="isDanyAttr" label="0"
                                               v-model="attrForm.isDanyAttr">否</Radio>
                                    </FormItem>
								</Col>
							</Form>
						</Row>
					</div>

                    <div class="a-v-title1" v-if="attrForm.attrValueType == '1000'">
						<span class="v-t-item app__tab active">添加属性值</span>
					</div>

					<div class="a-info" v-if="attrForm.attrValueType == '1000'">
						<Row >
                            <Col :span="6" >
                                <FormItem labelText="属性值：" :requiredIcon="true" :errorMessage="errors.first('defaultValue')">
                                    <Input v-validate="'required|numeric'" name="defaultValue" v-model.trim="attrForm.defaultValue" data-vv-as="属性值"></Input>
                                </FormItem>
                            </Col>
						</Row>
					</div>	

					<div class="a-value"  v-else>
						<div class="a-v-title2">
							<span class="v-t-item app__tab active">添加属性值</span>
							<div class="v-t-add">
								<div class="app__btn app__btn-add" @click="addAttrClick()">添加</div>
							</div>
						</div>

						<!-- <div :class="['a-v-operation',checkboxData.length > 0 ? 'active' : '']">
							<div class="v-o-item">已选中<span class="v-o-count">{{checkboxData.length}}</span>项</div>
							<div class="v-o-item delete" @click="listDelClick()">删除</div>
							<div class="v-o-item modify" @click="listModClick()">修改</div>
						</div> -->

						<div class="a-v-table app__table">
							<Row class="app__table-thead">
								<Col :span="2">默认值</Col>
								<Col :span="6" :offset="1">属性值名称</Col>
								<Col :span="5">属性值</Col>
								<Col :span="6">属性值描述</Col>
								<Col :span="4">操作</Col>
							</Row>

							<Row class="app__table-item"
								v-for="(item,index) in attrValData" :key="index" v-show="item.statusCd!='1100'">
								<Col :span="2">
									<Radio  :label="item" name="item" :value="item" v-model="checkboxData"></Radio>
								</Col>

								<Col :span="6" :offset="1">{{item.attrValueName}}</Col>
								<Col :span="5">{{item.attrValue}}</Col>
								<Col :span="6">{{item.attrValueDesc}}</Col>
								<Col :span="4">
									<span class="span" @click="modAttrClick(item,index)">修改</span>
									<span class="span" @click="delAttrClick(item,index)">删除</span>
								</Col>
							</Row>

							<!--暂无数据-->
							<div class="app__data-none" v-show="showNoData()">
								<span>暂无数据</span>
							</div>
						</div>
					</div>	
				</div>
			</Scroll>

            <!--底部保存返回-->
			<div class="a-operation">
				<div class="">
					<div class="btn-page-box">
						<span class="app__btn app__btn-save" @click="save()">保存</span>
						<span class="app__btn app__btn-prev" @click="btnBack()">返回</span>
					</div>
				</div>
			</div>


            <!--添加属性值弹框-->
			<Dialog :dialogTitle="addTitle" :dialogSize="dialogSize2" ref="addValDialog" @confirm="addAttrConfirm()">
				<Form labelWidth="110px" class="add-attr">
                    <Row>
                        <Col :span="20">
                        <FormItem labelText="属性值名称：" :requiredIcon="true" :errorMessage="errors.first('attrValueName')">
                            <Input v-validate="'required'" name="attrValueName" v-model.trim="attrValForm.attrValueName"
                                   data-vv-as="属性值名称"></Input>
                        </FormItem>
                        </Col>
                    </Row>

					<Row>
						<Col :span="20">
                            <FormItem labelText="属性值排序号：" :requiredIcon="true" :errorMessage="errors.first('attrValueSort')">
                                <Input v-validate="'required'" name="attrValueSort" v-model.trim="attrValForm.attrValueSort"
                                       data-vv-as="属性值排序号" maxlength="3"></Input>
                            </FormItem>
						</Col>
					</Row>

					<Row>
						<Col :span="20">
                            <FormItem labelText="属性值：" :requiredIcon="true" :errorMessage="errors.first('attrValue')">
                                <Input v-validate="'required'" name="attrValue" v-model.trim="attrValForm.attrValue"
                                       data-vv-as="属性值"></Input>
                            </FormItem>
						</Col>
					</Row>

                    <Row>
                        <Col :span="20">
                            <FormItem labelText="属性值描述：" :requiredIcon="true" :errorMessage="errors.first('attrValueDesc')">
                                <Input v-validate="'required'" name="attrValueDesc" v-model.trim="attrValForm.attrValueDesc"
                                       data-vv-as="属性值描述"></Input>
                            </FormItem>
                        </Col>
                    </Row>
				</Form>
			</Dialog>




            <!--删除确认框-->
            <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>

		</div>

	</transition>
</template>

<script type="text/javascript">
	export default {
		props:{
			componentData:{}
		},
		data() {
			return {
                staffId:'111',        //登录人id
                step: '1000',         //当前的步骤
				attrId: '',          //属性id(第一步生成)
				attrValueId:'',
                busiTypeData: [],      //业务大类列表
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 5,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 0      // 总条数
                },
                selectData: {},    //选中的业务大类

                //属性表单信息
                attrForm:{
                    busiTypeName:'',        //业务大类名称
                    busiTypeInfo:'',       //业务大类信息
                    attrNbr:'',            //属性编码
                    attrName:'',            //属性名称
                    attrFormat:'',           //属性格式
                    attrLength:'',           //属性长度
                    attrValueDataType:'',    //属性值类型
                    defaultValue:'',          //默认值
                    isUnique:'1',           //唯一性
                    attrValueType:'1000',       //属性值分类
                    valueFrom:'',             //起始值
                    valueTo:'',                //结束值
                    isDanyAttr:'1',           //是否动态属性
                    isNullable:'1',          //是否可空
                },
                //属性值类型(下拉框数据)
                attrValList: [
                    {name:'日期型', value:'1000'},
                    {name:'日期时间型', value:'1100'},
                    {name:'字符型', value:'1200'},
                    {name:'浮点型', value:'1300'},
                    {name:'整数型', value:'1400'},
                    {name:'布尔型', value:'1500'},
                    {name:'计算型', value:'1600'}
                ],

                /*第二步，属性值添加==============*/
                //属性值添加
                attrValForm:{
                    attrValueSort: "",              //属性值排序号
                    attrValue: "",                 //属性值
                    attrValueName: "",              //属性值名称
                    attrValueDesc: "",              //属性值描述
                },
			    attrValData: [],            //属性取值列表
                modAttrIndex: '',         //被修改的属性值索引


                addTitle:'添加属性值',       //添加修改属性弹框标题
                //选择业务大类弹框大小
				dialogSize: {
					size:60,
					min: 430, //最小宽度(px)
					max: 700 //最大宽度(px)
				},
                //添加属性值弹框大小
				dialogSize2: {
					size:60,
					min: 400, //最小宽度(px)
					max: 400 //最大宽度(px)
				},


                checkboxData: [],         //批量操作(未用到)
                //提示框参数
                tipInfo: {
                    iconType:1,
                    msg:'',
                    showBtn:{
                        clear: true,
                        save: true
                    }
                },

			}
		},
		computed: {
			progressWidth() {
				return this.step == 1 ? `0` : this.step == 2 ? `50%` : '100%';
			}
		},
		mounted(){
			document.body.parentNode.style.overflow = 'hidden';
			this.attrForm = this.componentData;
            this.attrId = this.componentData.attrId;
			this.attrValData = this.componentData.ordAttrValueList ? this.componentData.ordAttrValueList : []
		},
		methods: {
            //点击保存按钮
            save() {
                let arr = this.attrValData.filter(item => item.statusCd != '1100');
                if( this.attrForm.attrValueType == '2000'){
					while (this.checkboxData == '') {
						this.$message.error({message:'请选择默认值'})
						return
					}
				}else if( this.attrForm.attrValueType == '1000' && arr.length){
                    this.$message.error({message:'请先删除枚举型属性值'})
                    return
                }
                this.$validator.validateAll().then((result) => {
                    if(result) {
                            this.setForm();
                    }
                })
            },

            //保存form表单(第一步)
            setForm(){
                this.$axios.post(this.$api.AddOrdAttrSpecDetail, {
                        actType:'MOD',
						attrId:this.attrId,
                        busiTypeId: this.attrForm.busiTypeId,         //业务大类id
                        attrNbr: this.attrForm.attrNbr,                            //属性编码
                        attrName: this.attrForm.attrName,                          //属性名称
                        attrFormat: this.attrForm.attrFormat,                     //属性格式
                        attrLength: this.attrForm.attrLength,                    //属性长度
                        attrValueDataType: this.attrForm.attrValueDataType,       //属性值类型
                        defaultValue: this.attrForm.attrValueType == '2000' ? this.checkboxData.attrValue : this.attrForm.defaultValue,                //默认值
                        isUnique: this.attrForm.isUnique,                      //唯一性
                        attrValueType: this.attrForm.attrValueType,              //属性值分类
                        valueFrom: this.attrForm.valueFrom,                    //起始值
                        valueTo: this.attrForm.valueTo,                       //结束值
                        ordAttrValueList:this.attrForm.attrValueType == '2000' ? this.attrValData : [],                       //属性值   枚举型
                        isDanyAttr: this.attrForm.isDanyAttr,                 //是否动态属性
                        isNullable: this.attrForm.isNullable,                  //是否可空
                        createStaff: this.staffId,                           //创建人id
                }).then(res => {
                    if(res.data.success == true) {
                        this.$message.success({ message: '修改成功！'});
                        //数据行跳回列表页，枚举型添加属性值
                        this.$emit('componentView', 'list');
                    }else{
                        this.$message.error({ message: '操作失败！'});
                    }
                }).catch(error => {

                })
            },  
            //点击属性值添加按钮
            addAttrClick() {
                this.attrForm.defaultValue = '';
                this.addTitle='添加属性值';
                this.$refs.addValDialog.show();
                this.attrValForm={};
            },
            //点击属性值修改按钮
            modAttrClick(item,index) {
				this.attrValueId = item.attrValueId;
                this.$refs.addValDialog.show();
                this.addTitle = '修改属性值';
                this.attrValForm={...item};
                this.modAttrIndex = index;
            },
            
            //点击添加/修改弹框确认
            addAttrConfirm() {
                this.$validator.validateAll().then((result) => {
                    if(result) {
                        if(this.addTitle == '添加属性值'){
                            this.attrValData.unshift({
								actType:"ADD",
								attrId: this.attrId,
								attrValueId:'',
                                attrValueSort: this.attrValForm.attrValueSort,
                                attrValue: this.attrValForm.attrValue,
                                attrValueName: this.attrValForm.attrValueName,
                                attrValueDesc: this.attrValForm.attrValueDesc,
                                statusCd: '1000',
                                createStaff: this.staffId,
							});
                            this.$refs.addValDialog.hide();
                        }else if(this.addTitle == '修改属性值'){
                            this.attrValData.splice(this.modAttrIndex,1);
                            this.attrValData.unshift({
                                actType:'MOD',
								attrId: this.attrId,
								attrValueId:this.attrValueId,
                                attrValueSort: this.attrValForm.attrValueSort,
                                attrValue: this.attrValForm.attrValue,
                                attrValueName: this.attrValForm.attrValueName,
                                attrValueDesc: this.attrValForm.attrValueDesc,
                                statusCd: '1000',
                                createStaff: this.staffId,
							});
                            this.$refs.addValDialog.hide();
                        }
                    }
                });
			},
			//查询属性值
			getAttrValue(){
				this.$axios.get(this.$api.replace(this.$api.OrdAttrValue,['{attrId}'],[this.attrId]), {
						params:{
							attrId:this.attrId,
							attrValueName:'',
							attrValuePublishId:'',
							statusCd:''
						}
						}).then(res => {
							if(res.data.success == true) {
								this.attrValData = res.data.attrValues;
							} else {
								this.$message.error({ message: '操作失败！'});
							}
						}).catch(error => {
							this.$message.error({ message: '操作失败！'});
						})
			},
            //点击属性值删除按钮
            delAttrClick(item,index) {
				this.attrValueId = item.attrValueId;
               	this.$axios.delete(this.$api.replace(this.$api.OrdAttrValueDo,['{attrId}','{attrValueId}'],[this.attrId,this.attrValueId]), {
					   params:{staff:this.staffId
					   }
                }).then(res => {
                    if(res.data.success == true) {
						this.$message.success({ message: '删除成功！'});
						if(item.attrValueId){
							this.attrValData[index].statusCd = '1100';
							this.attrValData[index].actType = 'DEL';
						}else{
							this.attrValData.splice(index,1);
						}
                    } else {
                        this.$message.error({ message: '操作失败！'});
                    }
                }).catch(error => {

                })
            },
            //是否展示属性值列表暂无数据
            showNoData(){
                return !this.attrValData.find( obj => obj.statusCd == '1000');
            },
            //保存属性值(第二步)
            setAttrVal(){
					this.$emit('componentView', 'list');
            },
            delClick(){
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要删除选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
            },
            //删除弹框确认
            tipConfirm(){
                this.$refs.tip.hide();
            },
            btnSave() {
                this.$message.success({ message: '保存成功！'});
                this.$emit('componentView', 'list');
            },

			btnBack() {
				this.$emit('componentView', 'list');
			},
			btnNext() {
				this.step = 2;
				this.$nextTick(() => {
					this.$refs.scroll.init();
				})
			},
			btnPrev() {
				this.step = 1;
				this.$nextTick(() => {
					this.$refs.scroll.init();
				})
			},

		}
	}
</script>

<style scoped lang="scss">
    .v-t-title{
        .col{
            padding-left: 15px;
        }
    }

    /*字符超出隐藏*/
    .app__cut-txt{
        overflow: hidden;
        white-space: nowrap;
        word-wrap: normal;
        text-overflow: ellipsis;
    }

	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s ease;
	}

	.fade-enter,
	.fade-leave-to {
		top: -100% !important;
	}
	.span {
		color: $mainColor;
		padding: 0 5px;
		cursor: pointer;
	}
	.h-dialog-search {
		width: 50%;
		margin:20px 10px 10px 20px;
	}
	.h-d-title{
		background-color: #f8fcff;
		border-top: 1px solid $mainColor;
		margin: 0 20px;
		text-align: center;

		.col{
			border-width: 0 0 1px 1px;
			border-style: solid;
			border-color: #efefef;

			&:last-child{
				border-right: 1px solid #efefef;
			}
		}
	}
	.h-d-item{
		margin: 0 20px;
		border-bottom: 1px solid #efefef;
		color: #777;
		text-align: center;

        /*选择样式*/
        .select{
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url("./images/choosebox-none.png") no-repeat;
            background-size: 100% 100%;
            vertical-align: text-bottom;
            cursor: pointer;
        }
        .active{
            background: url("./images/choosebox-blue.png") no-repeat;
            background-size: 100% 100%;
        }
	}
	.h-d-page{
		float: right;
	}
	.add-attr{
		margin:20px 10px 0 10px;
	}
	.add {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding-bottom: 50px;
		z-index: 201;
		background-color: #fff;
		.a-header {
			width: 100%;
			height: 40px;
			line-height: 40px;
			color: $mainColor;
			font-size: 14px;
			text-align: center;
			.a-title {
				display: inline-block;
				padding-left: 30px;
				font-size: 16px;
				background-image: url(./images/new_attribute.png);
				background-repeat: no-repeat;
				background-position: 0px;
			}
			.a-close {
				position: absolute;
				width: 30px;
				height: 30px;
				top: 11px;
				right: 11px;
				cursor: pointer;
				background: url(./images/close_page.png) no-repeat center;
			}
		}
		.a-progress {
			width: 100%;
			height: 100px;
			.a-p-item {
				position: absolute;
				width: 80px;
				height: 60px;
				padding-top: 35px;
				margin-top: 20px;
				text-align: center;
				z-index: 1;
				&.active {
					padding-top: 45px;
					.p-i-circle {
						width: 40px;
						height: 40px;
						top: 0;
						left: 20px;
						background-color: $mainColor;
					}
					.p-i-icon {
						width: 26px;
						height: 26px;
						top: 7px;
						left: 27px;
					}
					.a-p-name {
						color: $mainColor;
					}
				}
				&.success {
					.p-i-circle {
						background-color: $mainColor;
					}
					.p-i-icon {}
				}
				.p-i-circle {
					position: absolute;
					width: 20px;
					height: 20px;
					top: 10px;
					left: 30px;
					background-color: #ccc;
					border-radius: 50%;
					transition: all .5s ease;
				}
				.p-i-icon {
					position: absolute;
					width: 10px;
					height: 10px;
					top: 15px;
					left: 35px;
					background-color: #fff;
					border-radius: 50%;
					transition: all .5s ease;
					background-size: 0px 0px;
				}
				.p-i-bg {
					width: 0;
					height: 0;
					top: 50%;
					left: 50%;
					margin: -8px 0 0 -8px;
				}
			}
			.a-p-line {
				position: absolute;
				width: calc(100% - 120px);
				height: 6px;
				top: 38px;
				left: 60px;
				background-color: #ccc;
				z-index: 0;
				.p-l-progress {
					width: 0;
					height: 100%;
					background-color: $mainColor;
					transition: all .5s ease;
				}
			}
			.a-p-info {
				left: 20px;
				&.active {
					.p-i-bg {
						width: 16px;
						height: 16px;
						background-image: url(./images/step1.png);
						background-repeat: no-repeat;
						background-position: center;
						background-size: 100%;
					}
				}
			}
			.a-p-val {
				left: calc(50% - 40px);
				&.active {
					.p-i-bg {
						width: 16px;
						height: 16px;
						background-image: url(./images/step2.png);
						background-repeat: no-repeat;
						background-position: center;
						background-size: 100%;
					}
				}
			}
			.a-p-complete {
				left: calc(100% - 100px);
			}
		}
		.a-info {
			padding-top: 20px;
			color: #999;
			.no-first {
				margin-left: 30px;
			}
		}
		.a-value {
			.a-v-title1,
			.a-v-title2 {
				height: 30px;
				line-height: 30px;
				border-bottom: 2px solid #fafafa;
				.v-t-item {
					display: block;
					width: 60px;
					margin-left: 20px;
					text-align: center;
					color: $mainColor;
				}
			}
			.a-v-title2 {
				height: 30px;
				line-height: 30px;
				.v-t-add {
					position: absolute;
					top: 0;
					right: 10px;
				}
			}
			.a-v-info {
				height: 100px;
				padding: 30px 0 0 20px;
				border-bottom: 10px solid #f8f8f8;
				.v-i-label {
					color: #777;
				}
			}
			.a-v-operation {
				position: absolute;
				top: 50px;
				left: -100%;
				width: 100%;
				height: 50px;
				line-height: 50px;
				transition: .3s all ease;
				background-color: #fff;
				&.active {
					left: 0;
				}
				.v-o-item {
					display: inline-block;
					padding: 0 20px;
					cursor: pointer;
					color: #777;
					&.delete {
						background: url(./images/delete_gery.png) no-repeat;
						background-position: 0;
					}
					&.modify {
						background: url(./images/edit_grey.png) no-repeat;
						background-position: 0;
					}
					&:hover {
						color: $mainColor;
						&.delete {
							background: url(./images/delete_blue.png) no-repeat;
							background-position: 0;
						}
						&.modify {
							background: url(./images/edit_blue.png) no-repeat;
							background-position: 0;
						}
					}
				}
				.v-o-count {
					color: $mainColor;
				}
			}
			.a-v-table {
				padding: 0 20px 20px 20px;
				top: 30px;
				.v-t-title {
					color: #333;
					font-weight: bold;
					background-color: #f5fafd;
				}
				.v-t-item {
					color: #777;
					text-align: left;
				}
				.v-t-checkbox {
					text-align: center;
				}
			}
		}
		.a-complete {}
		.a-operation {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #fff;
			box-shadow: 0 -2px 1px #f1f5fa;
			.btn-page-box {
				text-align: right;
				padding-right: 20px;
				span {
					margin-left: 20px;
				}
			}
		}
	}

	.title {
		padding: 0 40px;
		border-bottom: 1px solid #838592;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: $mainColor;
	}
	/*业务大类选择*/
	.busi-type{
		text-indent: 10px;
		font-size: 14px;
		border: 1px solid #d8dcdf;
		border-radius: 5px;
		width: 100%;
		height: 30px;
		line-height: 30px;
		cursor: pointer;
	}
</style>
