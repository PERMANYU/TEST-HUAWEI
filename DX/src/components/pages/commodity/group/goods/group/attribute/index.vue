<template>
	<div class="attribute">
		<div class="app__top" @click="elShowClick()">
			<span class="app__top-left">属性配置</span>
			<i :class="['iconfont','icon-xiala12',elIsShow ? 'active' : '']" @click.stop="elShowClick()"></i>
		</div>
		<div class="a-h-add" v-show="elIsShow">
			<div class="app__btn app__btn-add" @click="addAttribute()">添加</div>
		</div>
		<div class="app__table" v-show="elIsShow">
			<Row v-if="attrListData.length>0">
				<Col :span="7" :offset="1" v-for="(item,index) in attrListData" :key="index">
				<Row class="attrrow-header">
					<Col :span="14" :offset="1">
					<i class="show2"></i> {{item.attrName}}
					</Col>
					<Col :span="9">
					<span class="app__icon app__icon-update" title="修改" @click="attrMod(item,'1')"></span>
					<span class="app__icon app__icon-delete" title="删除" @click.stop="attrDel(item,'1')"></span>
					</Col>
				</Row>
				<Row v-if="item.offerAttrValues.length>0" v-for="(val,ind) in item.offerAttrValues" :key="ind" class="attrvalrow">
					<Col :span="1" :offset="1" class="attrvalcolline"></Col>
					<Col :span="22" class="attrvalcol">{{val.attrValueName}}：{{val.attrValue}}
					<!--<span v-if="val.offerAttrId == item.offerAttrId" class="moren">默认</span>-->
					</Col>
				</Row>
				<Row v-if="!item.offerAttrValues" class="attrvalrow">
					<Col :span="1" :offset="1" class="attrvalcolline"></Col>
					<Col :span="22" class="attrvalcol"> {{item.defaultValue}}
					</Col>
				</Row>
				<Row class="attrvalrow" v-if="item.attrValueType ==='2000'">
					<Col :span="1" :offset="1" class="attrvalcolline"></Col>
					<Col :span="22">
					<div class="app__btn app__btn-add" @click="attrMod(item,'1')">添加属性值</div>
					</Col>
				</Row>
				</Col>
			</Row>
			<Row v-if="!attrListData.length" class="app__data-none">
				<Col :span="24"><span>暂无数据!</span></Col>
			</Row>
		</div>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加属性" ref="addAttribute" :initBtn="true">
			<div class="main">
				<div class="search">
					<Search placeholder="请输入属性名称搜索" @search="searchClick"></Search>
				</div>
				<!--<div class="app__btn app__btn-add search_right" @click.stop.self="addAttrName">新增属性</div>-->
				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="5">属性编码</Col>
						<Col :span="7">属性名称</Col>
						<Col :span="5">属性ID</Col>
						<Col :span="5">属性类型</Col>
						<Col :span="2">选择</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in attrSpecs" :key="index">
						<Col :span="5">{{item.attrNbr}}</Col>
						<Col :span="7">{{item.attrName}}</Col>
						<Col :span="5">{{item.attrId}}</Col>
						<Col :span="5">{{item.attrValueType ==='1000'?'输入型':item.attrValueType ==='2000'?'枚举型':'无'}}</Col>
						<Col :span="2">
						<Radio name="attrSpecs" v-model="radioData" :label="item"></Radio>
						</Col>
					</Row>
				</div>
				<Row v-if="!attrSpecs.length" class="app__data-none">
					<Col>
					<span>暂无数据</span>
					</Col>
				</Row>
				<Pagination v-if="attrSpecs.length>0" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" @change="pageChange"></Pagination>
			</div>
			<div slot="btnBox">
				<span class="back" @click="handleBack">返回</span>
				<span class="save" @click="saveAttr">下一步</span>
			</div>
		</Dialog>
		<!--枚举型-->
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加属性值" ref="addAttrVal" @confirm="saveAttrVal">
			<div class="main">
				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="8">属性值名称</Col>
						<Col :span="6">属性值</Col>
						<Col :span="8">描述</Col>
						<Col :span="2">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in attrValSpecs" :key="index">
						<Col :span="8">{{item.attrValueName}}</Col>
						<Col :span="6">{{item.attrValue}}</Col>
						<Col :span="8">{{item.attrValueDesc === null ?'无':item.attrValueDesc}}</Col>
						<Col :span="2">
						<span v-if="!item.flag" class="span iconfont icon-weixuanzhong-fang" @click='attrValClick(item)'></span>
						<span v-if="item.flag" class="span iconfont icon-xuanzhong-fang"></span>
						</Col>
					</Row>
				</div>
				<Row v-if="!attrValSpecs.length" class="app__data-none">
					<Col>
					<span>暂无数据</span>
					</Col>
				</Row>
				<!-- <Pagination v-if="attrValData.length>0" :pageIndex="pageValInfo.pageIndex" :pageSize="pageValInfo.pageSize" :rowCount="pageInfo.rowCount" @change="pageChange"></Pagination> -->
				<div v-if="attrValData.length>0">
					<span class="y-span">已选属性值</span>
					<div class="app__table__inner">
						<Row class="app__table-thead">
							<Col :span="7">属性值名称</Col>
							<Col :span="7">属性值</Col>
							<Col :span="8">描述</Col>
							<Col :span="2">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in attrValData" :key="index">
							<Col :span="7">{{item.attrValueName}}</Col>
							<Col :span="7">{{item.attrValue}}</Col>
							<Col :span="8">{{item.attrValueDesc === null ?'无':item.attrValueDesc}}</Col>
							<Col :span="2">
							<span class="span iconfont icon-shanchu" title="删除" @click.stop="attrDel(item,'0')"></span>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</Dialog>
		<!--输入型-->
		<Dialog :dialogSize="dialogIpt" class="h-dialog" dialogTitle="添加属性值" ref="iptAttrVal" @confirm="saveAttrIpt">
			<div class="main">
				<FormItem labelText="属性值：">
					<Input name="iptAttrValue" v-model="iptAttrValue"></Input>
				</FormItem>
			</div>
		</Dialog>

		<!--更多属性值-->
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="属性值" ref="moreAttrVal" :showConfirmBtn="false">
			<div class="main">
				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="12">属性值名称</Col>
						<Col :span="12">属性值</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in attrValueItem.offerAttrValues" :key="index">
						<Col :span="12">{{item.attrValueName}}</Col>
						<Col :span="12">{{item.attrValue}}</Col>
					</Row>
				</div>
			</div>
		</Dialog>

		<!-- 新增属性 -->
		<Dialog dialogTitle="添加属性" ref="addAttrName" :dialogSize="dialogSize" :initBtn="true">
			<Scroll class="main">
				<div class="attr_table">
					<Form labelWidth="100px" labelAlign="left" data-vv-scope="addAttr">
						<Row>
							<Col :span='12'>
							<FormItem labelText="属性编码：" :errorMessage="errors.first('addAttr.attrNbr')" :successMessageInline="false" :requiredIcon="true">
								<Input name="attrNbr" v-model.trim="addAttr.attrNbr" v-validate="'required'" data-vv-as="属性编码" placeholder="请输入属性编码"></Input>
							</FormItem>
							</Col>
							<Col :span='12'>
							<FormItem labelText="属性名称：" :errorMessage="errors.first('addAttr.attrName')" :successMessageInline="false" :requiredIcon="true">
								<Input name="attrName" v-model.trim="addAttr.attrName" v-validate="'required'" data-vv-as="属性名称" placeholder="请输入属性名称"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span='12'>
							<FormItem labelText="属性描述：" :errorMessage="errors.first('addAttr.attrDesc')" :successMessageInline="false" :requiredIcon="true">
								<textarea name="attrDesc" v-model.trim="addAttr.attrDesc" v-validate="'required'" data-vv-as="属性描述" placeholder="请输入属性描述"></textarea>
							</FormItem>
							</Col>
							<Col :span='12'>
							<Row>
								<Col :span="24">
								<FormItem labelText="默认值：" :errorMessage="errors.first('addAttr.defaultValue')" :successMessageInline="false">
									<Input name="defaultValue" v-model.trim="addAttr.defaultValue" placeholder="请输入默认值"></Input>
								</FormItem>
								</Col>
							</Row>
							<Row>
								<Col :span="12">
								<FormItem labelText="起始值：" :errorMessage="errors.first('addAttr.startValue')" :successMessageInline="false">
									<Input name="startValue" v-model.trim="addAttr.startValue" placeholder="起始值"></Input>
								</FormItem>
								</Col>
								<Col :span="12">
								<FormItem labelText="结束值：" :errorMessage="errors.first('addAttr.endValue')" :successMessageInline="false">
									<Input name="endValue" v-model.trim="addAttr.endValue" placeholder="结束值"></Input>
								</FormItem>
								</Col>
							</Row>
							</Col>
						</Row>
						<Row>
							<Col :span='12'>
							<FormItem labelText="唯一性：" :errorMessage="errors.first('addAttr.single')" :successMessageInline="false" :requiredIcon="true">
								<RadioGroup name="single" :data="boolSelectArray" v-validate="'required'" data-vv-as="唯一性" v-model.trim="addAttr.single"></RadioGroup>
							</FormItem>
							</Col>
							<Col :span='12'>
							<FormItem labelText="是否可空：" :errorMessage="errors.first('addAttr.empty')" :successMessageInline="false" :requiredIcon="true">
								<RadioGroup name="empty" :data="boolSelectArray" v-validate="'required'" data-vv-as="是否可空" v-model.trim="addAttr.empty"></RadioGroup>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span='12'>
							<FormItem labelText="是否动态属性：" :errorMessage="errors.first('addAttr.trendsValue')" :successMessageInline="false" :requiredIcon="true">
								<RadioGroup name="trendsValue" :data="boolSelectArray" v-validate="'required'" data-vv-as="动态属性" v-model.trim="addAttr.trendsValue"></RadioGroup>
							</FormItem>
							</Col>
							<Col :span='12'>
							<FormItem labelText="属性值分类：" :errorMessage="errors.first('addAttr.attrClassify')" :successMessageInline="false" :requiredIcon="true">
								<RadioGroup name="attrClassify" :data="attrValueTypeArray" v-validate="'required'" data-vv-as="属性值分类" v-model.trim="addAttr.attrClassify"></RadioGroup>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span='12'>
							<FormItem labelText="属性取值类型：" :errorMessage="errors.first('addAttr.getValue')" :successMessageInline="false" :requiredIcon="true">
								<Select name="getValue" :data="ValueSelectArray" v-validate="'required'" data-vv-as="属性取值类型" v-model.trim="addAttr.getValue"></Select>
							</FormItem>
							</Col>
							<Col :span='12'>
							<FormItem labelText="属性格式：" :errorMessage="errors.first('addAttr.attrFormat')" :successMessageInline="false">
								<Input name="attrFormat" v-model.trim="addAttr.attrFormat"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="12">
							<FormItem labelText="属性长度：" :errorMessage="errors.first('addAttr.attrLength')" :successMessageInline="false">
								<Input name="attrLength" data-vv-as="属性长度" v-model.trim="addAttr.attrLength"></Input>
							</FormItem>
							</Col>
						</Row>
					</Form>
				</div>
			</Scroll>
			<template slot="btnBox">
				<span class="save" @click="addAttrNameSubmitDialog()" v-if="showSubmitProperty">保存</span>
				<span class="save" @click="addAttrSubmitNext()" v-if="shownextProperty">下一步</span>
				<span class="back" @click="addAttrNameCloseDialog()">返回</span>
			</template>
		</Dialog>

		<!-- 添加属性值 -->
		<Dialog dialogTitle="添加属性值" ref="addAttrValue" :dialogSize="dialogSize" :initBtn="true">
			<Scroll class="main">
				<div class="app__table">
					<div class="app__title app__title-basic">基本信息</div>
					<Row>
						<Col :span="12">
						<FormItem labelText="属性名称：">
							{{addAttr.attrName}}
						</FormItem>
						</Col>
						<Col :span="12">
						<FormItem labelText="属性编码：">
							{{addAttr.attrNbr}}
						</FormItem>
						</Col>
					</Row>
					<div class="app__title app__title-basic">属性取值</div>
					<div class="selectbtn app__btn app__btn-add" @click="AddValue">添加</div>
					<div class="selectbtn selectbtn_left app__btn app__btn-del" @click="delValueDialog">删除</div>
					<div class="app__table__inner">
						<Row class="app__table-thead">
							<Col :span="7">属性值</Col>
							<Col :span="7">属性名称</Col>
							<Col :span="7">属性值描述</Col>
							<Col :span="3">操作</Col>
						</Row>
						<Row class="app__table-item" v-for="(item,index) in AttrSpecCFGData" :key="index">
							<Col :span="7">{{item.attrValue}}</Col>
							<Col :span="7">{{item.attrValueName}}</Col>
							<Col :span="7">{{item.attrValueDesc}}</Col>
							<Col :span="3">
							<Radio name="item" :label="item" v-model="attrValueChoose" :value="item" class="checkBox"></Radio>
							</Col>
						</Row>
						<Row class="app__data-none" v-show="AttrSpecCFGData.length == 0">
							<span>对不起，暂无数据</span>
						</Row>
					</div>
				</div>
			</Scroll>
			<template slot="btnBox">
				<span class="save" @click="addAttrNameSubmitDialog()">保存</span>
				<span class="save" @click="addAttrSubmitBack()" v-if="shownextProperty">上一步</span>
				<span class="back" @click="addAttrNameCloseDialog()">返回</span>
			</template>
		</Dialog>

		<!-- 新增属性取值 -->
		<Dialog dialogTitle="新增属性取值" ref="modAttrValue" @confirm="addAttrValueSubmit" @close="addAttrValueClose">
			<div class="main">
				<div class="app__table">
					<Form data-vv-scope="addAttrValue">
						<Row>
							<Col :span="24">
							<FormItem labelText="属性值排序号：" :requiredIcon="true" :successMessageInline="false" :errorMessage="errors.first('addAttrValue.attrValueSort')">
								<Input name="attrValueSort" data-vv-as="属性值排序号码" v-validate="'required|max:3'" v-model.number.trim="addAttrValue.attrValueSort"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="24">
							<FormItem labelText="属性值：" :requiredIcon="true" :successMessageInline="false" :errorMessage="errors.first('addAttrValue.attrValue')">
								<Input name="attrValue" data-vv-as="属性值" v-validate="'required'" v-model.trim="addAttrValue.attrValue"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="24">
							<FormItem labelText="属性值名称：" :requiredIcon="true" :successMessageInline="false" :errorMessage="errors.first('addAttrValue.attrValueName')">
								<Input name="attrValueName" data-vv-as="属性值名称" v-validate="'required'" v-model.trim="addAttrValue.attrValueName"></Input>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="24">
							<FormItem labelText="属性值描述：" :requiredIcon="true" :successMessageInline="false" :errorMessage="errors.first('addAttrValue.attrValueDesc')">
								<Input name="attrValueDesc" data-vv-as="属性值描述" v-validate="'required|max:80'" v-model.trim="addAttrValue.attrValueDesc"></Input>
							</FormItem>
							</Col>
						</Row>
					</Form>
				</div>
			</div>
		</Dialog>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>

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
					size: 80,
					min: 600,
					max: 800
				},
				dialogIpt: {
					size: 80,
					min: 300,
					max: 400
				},
				pageInfo: {
					pageIndex: 1, // 当前页
					pageSize: 5, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},
				pageValInfo: {
					pageIndex: 1, // 当前页
					pageSize: 5, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},
				tipInfo: {
					iconType: 3,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				addAttr: { //新增属性
					attrNbr: '',
					attrName: '',
					attrDesc: '',
					defaultValue: '',
					startValue: '',
					endValue: '',
					single: '1',
					empty: '1',
					trendsValue: '1',
					attrClassify: '1000',
					getValue: '1500',
					attrFormat: '',
					attrLength: '',
					attrId: '',
					statusCd: ''
				},
				attrChoose: '', //选择属性
				attrValueChoose: '', //选择属性值
				addAttrValue: {},
				boolSelectArray: [{
					label: '是',
					value: '1'
				}, {
					label: '否',
					value: '0'
				}],
				ValueSelectArray: [{
						label: '日期型',
						value: '1000'
					},
					{
						label: '日期时间型',
						value: '1100'
					},
					{
						label: '字符型',
						value: '1200'
					},
					{
						label: '浮点型',
						value: '1300'
					},
					{
						label: '布尔型',
						value: '1500'
					},
					{
						label: '整数型',
						value: '1400'
					},
					{
						label: '计算型',
						value: '1600'
					},
				],
				attrValueTypeArray: [{
					value: '1000',
					label: '输入型'
				}, {
					value: '2000',
					label: '枚举型'
				}],
				attrValues: [],
				showSubmitProperty: true,
				shownextProperty: false,
				AttrSpecCFGData: [],
				attrListData: [], // 属性配置列表数组
				attrArr: [], // 属性配置列表数组
				attrValData: [], // 属性值列表
				attrSpecs: [], // 属性列表数组
				attrValSpecs: [], // 属性值名称
				templateVal: "",
				iptAttrValue: "", // 输入型属性值
				attrValueItem: [], //更多属性值
				attrValSearchObj: {
					attrNbr: "",
					attrName: ""
				},
				radioData: {}, // 选择属性
				delObj: {
					item: {},
					index: "",
				},
				actType: "ADD",
				offerAttrId: "",
				elIsShow: false
			}
		},
		watch: {
			"addAttr.attrClassify": function(newValue, oldValue) {
				if(newValue == "1000") {
					this.showSubmitProperty = true;
					this.shownextProperty = false;
				} else {
					this.showSubmitProperty = false;
					this.shownextProperty = true;
				}
			}
		},
		mounted() {
			this.getAttrList();
		},
		methods: {
			addAttribute() {
				this.actType = "ADD"
				this.iptAttrValue = ""
				this.$refs.addAttribute.show();
				this.getAttrView(1);
			},
			pageChange(index) {
				this.getAttrView(index);
			},
			// 查询配置属性列表
			getAttrList() {
				this.$axios.get(this.$api.replace(this.$api.QueryAttribute, ['{offerId}'], [this.componentData.offerId]), {
					params: {
						statusCd: 1000
					}
				}).then((res) => {
					if (res.data.success) {
						this.attrListData = res.data.offerAttrs;
					}else{
						this.$message.error({ message: '属性列表查询失败' })
					}
				}).catch((err) => {
					console.log(err)
				})
			},

			// 列表操作
			selclick() {

			},
			// 增加添加属性
			addAttrName() {
				this.$refs.addAttrName.show();
				this.$refs.addAttribute.hide();
			},

			//添加属性弹框确认按钮
			addAttrNameSubmitDialog() {
				if(this.addAttr.attrClassify == "1000" || this.addAttr.attrClassify == "输入型") {
					this.attrValues = [];
				} else if(this.addAttr.attrClassify == "2000" || this.addAttr.attrClassify == "枚举型") {
					for(let val of this.AttrSpecCFGData) {
						let attrObj = {
							"attrValueSort": val.attrValueSort,
							"attrValue": val.attrValue,
							"attrValueName": val.attrValueName,
							"attrValueDesc": val.attrValueDesc,
							"staff": 1000001,
							"remark": ""
						}
						this.attrValues.push(attrObj)
					}
					if(this.AttrSpecCFGData.length == 0) {
						this.$message.error({ message: '属性值分类为枚举型时，属性取值不能为空！' })
						return
					}
				}

				this.$validator.validateAll('addAttr').then((result) => {
					if(result) {
						this.$axios.post(this.$api.AttrSpecCFG, {
							"body": {
								"attrNbr": this.addAttr.attrNbr,
								"attrName": this.addAttr.attrName,
								"attrDesc": this.addAttr.attrDesc,
								"defaultValue": this.addAttr.defaultValue,
								"valueFrom": this.addAttr.startValue,
								"valueTo": this.addAttr.endValue,
								"isUnique": this.addAttr.single,
								"isNullable": this.addAttr.empty,
								"attrValueDataType": this.addAttr.getValue,
								"isDanyAttr": this.addAttr.trendsValue,
								"attrValueType": this.addAttr.attrClassify,
								"attrFormat": this.addAttr.attrFormat,
								"attrLength": this.addAttr.attrLength,
								"staff": 1000001,
								"remark": "",
								"attrValues": this.attrValues
							}
						}).then(res => {
							if(res.data.code == "0") {
								this.$message.success({ message: res.data.msg })
								let attrId = res.data.body.attrId;
								this.$axios.post(this.$api.ReleaseAttrSpec, {
									"body": {
										"attrId": attrId,
										"staff": 2333333
									}
								}).then((res) => {
									if(res.data.code == "0") {
										this.$message.success({ message: '发布成功' })
										this.$refs.addAttrName.hide();
										this.$refs.addAttrValue.hide();
									} else {
										this.$message.error({ message: '发布失败' })
									}
								}).catch((error) => {
									console.log(error)
								})
							} else {
								this.$message.error({ message: res.data.msg })
							}
						}).catch(function(err) {
							console.log(err)
						})
					}
				})
			},

			addAttrSubmitBack() { //上一步
				this.$refs.addAttrName.show()
				this.$refs.addAttrValue.hide()
			},

			//添加属性值
			AddValue() {
				this.addAttrValue = {}
				this.$refs.modAttrValue.show();
			},

			//属性值删除
			delValueDialog() {
				if(!this.attrValueChoose.attrValue) {
					this.$message.error({ message: '请先选择' })
					return
				}
				this.AttrSpecCFGData.filter(obj => obj.attrValue == this.attrValueChoose.attrValue)[0] ?
					this.AttrSpecCFGData = this.AttrSpecCFGData.filter(obj => obj.attrValue != this.attrValueChoose.attrValue) :
					this.AttrSpecCFGData.push(this.attrValueChoose)
				this.attrValueChoose.attrValue = ''
			},

			addAttrValueSubmit() { //添加属性值枚举
				this.$validator.validateAll('addAttrValue').then((result) => {
					if(result) {
						this.AttrSpecCFGData.push(this.addAttrValue)
						this.$refs.modAttrValue.hide()
					}
				})
			},

			addAttrValueClose() { //属性值枚举弹框回调
			},

			addAttrSubmitNext() {
				this.$validator.validateAll('addAttr').then((result) => {
					if(result) {
						this.$refs.addAttrName.hide()
						this.$refs.addAttrValue.show()
					}
				})
			},

			//添加属性弹框关闭回调
			addAttrNameCloseDialog() {
				this.$refs.addAttrName.hide();
				this.$refs.addAttrValue.hide();
				this.AttrSpecCFGData = [];
			},

			// 属性列表筛选
			searchClick(data) {
				this.attrValSearchObj.attrName = data;
				this.getAttrView(1, data);
			},

			// 查询属性列表
			getAttrView(page, name = '') {
				this.pageInfo.pageIndex = page;

                this.$axios.get(this.$api.Attrspec, {
                    params: {
                        attrName: this.attrValSearchObj.attrName,
                        limit: this.pageInfo.pageSize,
                        page: this.pageInfo.pageIndex
                    }
                }).then(res => {
                    if(res.data.success) {
                        this.attrSpecs = res.data.attrSpecPage.content||[];
                        this.pageInfo = {
                            pageIndex: res.data.attrSpecPage.page,
                            pageSize: res.data.attrSpecPage.limit,
                            rowCount: res.data.attrSpecPage.total,
                            pageCount: Math.ceil(res.data.attrSpecPage.total/res.data.attrSpecPage.limit)
                        };

						this.attrListData.forEach(item => {
							let tempItem = this.attrSpecs.find(itemList => itemList.attrId == item.attrId);
							if(tempItem != undefined) {
								this.$set(tempItem, 'showVal', true);
							}
						})
					} else {
						this.$message.error({ "message": "列表查询失败" })
					}
				}).catch(error => {
					console.log(error);
				});
			},

			// 选择属性
			attrSel(item) {

				//this.attrListData.push(item);
			},

			handleBack() {
				this.$refs.addAttribute.hide();
			},

			// 弹框保存属性时查对应属性值
			saveAttr() {
				if(Object.keys(this.radioData).length > 0 && this.radioData.attrValueType == "2000") {
					this.$refs.addAttribute.hide();
					this.$refs.addAttrVal.show();
					this.attrValData = [];
					// 查属性值
                    this.$axios.get(this.$api.replace(this.$api.AttrSpecMore, ['{attrId}'], [this.radioData.attrId]),{
                        params: {

                        }
                    }).then(res => {
                        if(res.data.success) {
                            this.attrValSpecs = res.data.attrSpecDetail.attrValueList || [];
						} else {
							this.$message.error({ "message": "列表查询失败" })
						}
					}).catch(error => {
						console.log(error);
					});
				} else if(Object.keys(this.radioData).length > 0 && this.radioData.attrValueType == "1000") {
					this.$refs.addAttribute.hide();
					this.$refs.iptAttrVal.show();
				} else {
					this.$message.warning({ "message": "请先选择属性！" })
				}
			},

			// 选择属性值
			attrValClick(item) {
				this.$set(item, 'flag', 'Y');
				this.attrValData.push(item);
				console.log(this.attrValData)
			},
			attrMod(item, index) {
				this.actType = "MOD"
				this.offerAttrId = item.offerAttrId
				if(item.attrValueType == "2000") {
					this.attrValData = [];
					let attrModValues = [...item.offerAttrValues]
					this.$refs.addAttrVal.show();

					// 查属性值
                    this.$axios.get(this.$api.replace(this.$api.AttrSpecMore, ['{attrId}'], [item.attrId]),{
                        params: {

						}
					}).then(res => {
						if(res.data.success) {
							this.attrValSpecs = res.data.attrSpecDetail.attrValueList || [];

							attrModValues.map(val => {
								this.attrValData.push(this.attrValSpecs.find(value =>
									value.attrValueId == val.attrValueId
								))
							})
							this.attrValSpecs.map(val => {
								this.$set(val, 'flag', attrModValues.find(value => value.attrValueId == val.attrValueId) ? 'Y' : '');
							})
							console.log(this.attrValData)

						} else {
							this.$message.error({ "message": "列表查询失败" })
						}
					}).catch(error => {
						console.log(error);
					});
				} else {
					this.iptAttrValue = item.defaultValue
					this.$refs.iptAttrVal.show();
				}
			},
			// 删除已选列表信息
			attrDel(item, index) {
				this.tipInfo.msg = `确认要删除吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
				this.delObj.item = item;
				this.delObj.index = index;
			},
			tipConfirm() {
				this.$refs.tip.hide();
				if(this.delObj.index == "0") { // 删除已选属性值
					this.attrValData = this.attrValData.filter(item => item.attrValueId != this.delObj.item.attrValueId);
					this.attrValSpecs.find(item => {
						if(item.attrValueId == this.delObj.item.attrValueId) {
							item.flag = "";
						}
					})
				} else { // 删除实例数据
					if(this.delObj.item.isDel == "1") {
						this.attrListData = this.attrListData.filter(item => item.attrId != this.delObj.item.attrId);
					} else {
						this.attrDelRule();
					}
				}
			},

			// 保存属性值
			saveAttrVal() {
				let listArr = [];
				this.attrValData.forEach(item => {
					let Obj = {
						"offerAttrValueId": "",
						"attrValueId": item.attrValueId,
						"attrValueName": item.attrValueName,
						"attrValue": item.attrValue,
						"createStaff": item.createStaff
					}
					listArr.push(Obj);
				})
				if(this.actType == "MOD") {
					this.attrArr= []
					let listData = {
						"offerAttrId": this.offerAttrId,
						"offerId": this.componentData.offerId,
						"parOfferAttrId": "",
						"attrId": this.radioData.attrId,
						"attrNbr": this.radioData.attrNbr,
						"attrName": this.radioData.attrName,
						"defaultValue": "",
						"attrValueType": this.radioData.attrValueType,
						"updateStaff": this.radioData.updateStaff,
						"statusCd": 1000,
						"isDel": "1",
						"offerAttrValues": listArr
					}
					this.attrArr.push(listData)
					this.$axios.put(this.$api.replace(this.$api.QueryAttribute, ['{offerId}'], [this.componentData.offerId]), {
						offerAttrs: this.attrArr
					}).then((res) => {
						if(res.data.success) {
							this.$message.success({ "message": "修改成功！" })
							this.getAttrList();
						}
					}).catch((err) => {
						this.$message.error({ "message": "修改失败！" })
					})
				} else {
					this.attrListData = []
					let listData = {
						"offerAttrId": "",
						"offerId": this.componentData.offerId,
						"parOfferAttrId": "",
						"attrId": this.radioData.attrId,
						"attrNbr": this.radioData.attrNbr,
						"attrName": this.radioData.attrName,
						"defaultValue": "",
						"attrValueType": this.radioData.attrValueType,
						"updateStaff": this.radioData.updateStaff,
						"statusCd": 1000,
						"isDel": "1",
						"offerAttrValues": listArr
					}
					this.attrListData.push(listData);
					this.$axios.post(this.$api.replace(this.$api.QueryAttribute, ['{offerId}'], [this.componentData.offerId]), {
						offerAttrs: this.attrListData
					}).then((res) => {
						if(res.data.success) {
							this.$message.success({ "message": "保存成功！" })
							this.getAttrList();
						}
					}).catch((err) => {
						this.$message.error({ "message": "保存失败！" })
					})
				}
				this.$refs.addAttrVal.hide();
			},

			// 输入型保存
			saveAttrIpt() {
				if(this.iptAttrValue == '') {
					this.$message.warning({ "message": "请先输入属性值！" })
				} else {
					this.$refs.iptAttrVal.hide();
					if(this.actType == "MOD") {
						this.attrArr= []
						let listData = {
							"offerAttrId": this.offerAttrId,
							"offerId": this.componentData.offerId,
							"attrId": this.radioData.attrId,
							"attrNbr": this.radioData.attrNbr,
							"attrName": this.radioData.attrName,
							"defaultValue": this.iptAttrValue,
							"updateStaff": this.radioData.updateStaff,
							"updateDate": "2018-11-01T19:19:17.958Z",
							"createDate": "2018-11-01T19:19:17.958Z",
							"attrValueType": this.radioData.attrValueType,
							"statusCd": 1000,
							"offerAttrValues": [],
							"isDel": "1"
						}
						this.attrArr.push(listData)
						this.$axios.put(this.$api.replace(this.$api.QueryAttribute, ['{offerId}'], [this.componentData.offerId]), {
							offerAttrs: this.attrArr
						}).then((res) => {
							if(res.data.success) {
								this.$message.success({ "message": "修改成功！" })
								this.getAttrList();
							}
						}).catch((err) => {
							this.$message.error({ "message": "修改失败！" })
						})
					} else {
						this.attrListData=[]
						let listData = {
							"offerAttrId": "",
							"offerId": this.componentData.offerId,
							"attrId": this.radioData.attrId,
							"attrNbr": this.radioData.attrNbr,
							"attrName": this.radioData.attrName,
							"defaultValue": this.iptAttrValue,
							"updateStaff": this.radioData.updateStaff,
							"updateDate": "2018-11-01T19:19:17.958Z",
							"createDate": "2018-11-01T19:19:17.958Z",
							"attrValueType": this.radioData.attrValueType,
							"statusCd": 1000,
							"offerAttrValues": [],
							"isDel": "1"
						}
						this.attrListData.push(listData);
						this.$axios.post(this.$api.replace(this.$api.QueryAttribute, ['{offerId}'], [this.componentData.offerId]), {
							offerAttrs: this.attrListData
						}).then((res) => {
							if(res.data.success) {
								this.$message.success({ "message": "保存成功！" })
								this.getAttrList();
							}
						}).catch((err) => {
							this.$message.error({ "message": "保存失败！" })
						})
					}
				}
			},

			// 获取更多属性值
			getMore(item) {
				this.attrValueItem = item;
				this.$refs.moreAttrVal.show();
			},
			// 实例删除接口
			attrDelRule() {
				this.$axios.delete(this.$api.replace(this.$api.DelAttrbuteList, ["{offerId}", "{offerAttrId}"], [this.componentData.offerId, this.delObj.item.offerAttrId]), {
					params: {
						updateStaff: 1321
					}
				}).then((res) => {
					if(res.data.success) {
						this.$message.success({ "message": "删除成功！" })
						this.getAttrList();
					}
				}).catch((err) => {
					this.$message.error({ "message": "删除失败！" })
				})
			},
			elShowClick(){
				this.elIsShow = !this.elIsShow;
			}
		}
	}
</script>

<style scoped lang="scss">
	.attribute {
		width: 100%;

		.app__top{
			cursor: pointer;
            pointer-events: auto;

			.icon-xiala12{
				position: absolute;
				top: 8px;
				right: 10px;
				font-size: 16px;
				color: $mainColor;
				transition: all .3s ease;

				&.active{
					transform: rotate(-180deg);
				}
			}
		}
		
		.h-a-add {
			position: absolute;
			top: 15px;
			right: 10px;
			height: 30px;
		}
		.a-h-add {
			padding: 5px 0;
		}
		.app__table {
			.attrrow-header {
				background-color: #eff7fd;
				border: solid 1px #d3e7f9;
				.col+.col {
					box-sizing: border-box;
					border-left: solid 1px #d3e7f9;
				}
			}
			.attrvalrow {
				margin-top: 10px;
				.attrvalcolline {
					margin-top: -25px;
					height: 50px;
					border-bottom: solid 1px #5c9cf3;
					border-left: dashed 1px #5c9cf3;
				}
				.attrvalcol {
					border: solid 1px #d3e7f9;
					text-indent: 10px;
					cursor: pointer;
					&:hover {
						background-color: #eff7fd;
					}
				}
				.col {
					text-align: left;
				}
			}
			.v-t-checkbox {
				text-align: center;
			}
			.span {
				color: $mainColor;
				padding: 0 5px;
				cursor: pointer;
			}
		}
	}

	.main {
		padding: 20px;
		.search {
			width: 300px;
			margin-bottom: 20px;
		}
		.selectbtn {
			float: right;
			margin-top: 15px;
			&.selectbtn_left {
				margin-right: 10px;
			}
		}
		.search_right {
			position: absolute;
			top: 25px;
			right: 20px;
		}
		.attr_table {
			padding: 20px;
		}
		.y-span {
			display: block;
			margin: 10px 0;
			color: #b6de8f;
		}
	}

	i.show2 {
		display: inline-block;
		width: 10px;
		height: 10px;
		cursor: pointer;
		background: url("./images/bgsq.png") no-repeat;
		background-size: cover;
	}
	.app__icon-update{
		margin-left: 10px;
	}
</style>
