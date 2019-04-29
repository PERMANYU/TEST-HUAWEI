<template>
	<transition name="fade">
		<div class="updata">
			<Scroll :isShowRight="true" ref="scroll">
				<div class="a-header">
					<div class="a-title">修改业务对象</div>
					<div class="a-close" @click="btnBack()"></div>
				</div>
				<div class="u-title1">
					<span class="u-t-item app__tab active">基本信息</span>
				</div>
				<div class="a-info">
					<Row>
						<Form labelWidth="110px">
							<Col :span="6">
							<FormItem labelText="业务对象名称：" :requiredIcon="true" :errorMessage="errors.first('busiObjName')">
								<Input name="busiObjName" v-validate="'required'" data-vv-as="业务对象名称" v-model="dOrdBusiObjDetail.busiObjName"></Input>
							</FormItem>
							</Col>
							<Col :span="6" :offset="2">
							<FormItem labelText="业务对象编码：" :requiredIcon="true" :errorMessage="errors.first('busiObjNbr')">
								<Input name="busiObjNbr" v-validate="'required'" data-vv-as="业务对象编码：" v-model="dOrdBusiObjDetail.busiObjNbr"></Input>
							</FormItem>
							</Col>
						</Form>
					</Row>
				</div>
				<div class="u-title1">
					<span class="u-t-item app__tab active">业务对象属性</span>
					<div class="h-a-add">
						<div class="app__btn app__btn-add" @click="addObjectAttr">添加</div>
					</div>
					<div :class="['h-operation',checkboxData.length > 0 ? 'active' : '']" >
						<div class="h-o-item">
							已选中<span class="h-o-count">{{checkboxData.length}}</span>项
						</div>
						<div class="h-o-item delete" @click="clickTopDel()">
							删除
						</div>
					</div>
				</div>
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span="2">选择</Col>
						<Col :span="5">属性编码</Col>
						<Col :span="5">属性编码</Col>
						<Col :span="2">属性值分类</Col>
						<Col :span="2">是否为空</Col>
						<Col :span="2">属性值</Col>
						<Col :span="2">状态</Col>
						<Col :span="4">操作</Col>
					</Row>
					<Row class="app__table-item" v-for="(item,index) in dOrdBusiObjDetail.ordBusiObjAttrDetails" :key="index" v-show="item.actType != 'DEL'">
						<Col :span="2" class="v-t-checkbox">
						<Checkbox name="checkbox1" :label="item" v-model="checkboxData"></Checkbox>
						</Col>
						<Col :span="5">{{item.busiObjAttrId ? item.busiObjAttrId : '空'}}</Col>
						<Col :span="5">{{item.busiObjAttrName ? item.busiObjAttrName : '空'}}</Col>
						<Col :span="2">{{findAttrValueType(item.attrValueType)}}</Col>
						<Col :span="2">{{item.isNullable ? item.isNullable  == '0' ? '否' : '是' : '无'}}</Col>
						<Col :span="2" v-if="item.attrValueType == '2000'">
							<span class="span" @click="moreObjectAttr(item)">更多</span>
						</Col>
						<Col :span="2" v-else>
							{{item.defaultValue}}
						</Col>
						<Col :span="2">{{getStatus(item.statusCd)}}</Col>
						<Col :span="4" >
						<span class="span" @click="updataObjectAttr(item,index)">修改</span>
						<span class="span" @click="clickDel(index)">删除</span>
						</Col>
					</Row>
				</div>
			</Scroll>
			<div class="a-operation">
				<div class="">
					<div class="btn-page-box">
						<span class="app__btn app__btn-save" @click="Cancel()">取消</span>
						<span class="app__btn app__btn-prev" @click="Save()">保存</span>
					</div>
				</div>
			</div>
			<!-- 添加 -->
            <Dialog dialogTitle="选择属性" :dialogSize="dialogSize" ref="attrSelect" :initBtn="true">
				<Scroll>
					<div class="first-step" v-show="step == 1">
						<span class="dg-span">STEP.1 选择属性</span>
						<div class="search">
							<Search placeholder="请输入搜索内容" @search="searchClick"></Search>
						</div>
						<div class="app__table">
							<Row class="app__table-thead">
								<Col :span="3">选择</Col>
								<Col :span="5">属性编码</Col>
								<Col :span="6">属性名称</Col>
								<Col :span="4">属性值分类</Col>
								<Col :span="3">唯一性</Col>
								<Col :span="3">是否可空</Col>
							</Row>
							<Row class="app__table-item" v-for="(item,index) in busiObjAttrs" :key="index">
							<!-- <Row class="app__table-item" v-for="(item,index) in 2" :key="index"> -->
								<Col :span="3" class="v-t-checkbox">
									<Radio name='item' :label="item" :value="item"  v-model="busiRadio"></Radio>
								</Col>
								<Col :span="5">{{item.attrNbr}}</Col>
								<Col :span="6">{{item.attrName ? item.attrName : '空'}}</Col>
								<Col :span="4">{{findAttrValueType(item.attrValueType)}}</Col>
								<Col :span="3">{{item.isUnique ? item.isUnique == '0' ? '否' : '是' : '无' }}</Col>
								<Col :span="3">{{item.isNullable ? item.isNullable  == '0' ? '否' : '是' : '无'}}</Col>
							</Row>
							<Row v-show="!busiObjAttrs.length" class="app__data-none">
								<Col :span="24">
									<span>暂无数据</span>
								</Col>
							</Row>
							<Pagination v-if="busiObjAttrs.length" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" @change="pageChange"></Pagination>
						</div>
					</div>
					<div class="second-step" v-show="step == 2">
						<span class="dg-span">STEP.2 配置属性值</span>
						<div class="a-v-info">
							<Row>
								<Col :span="6">
									<span class="v-i-label">属性名称：{{busiRadio.attrName ? busiRadio.attrName : '空' }}</span>
								</Col>
								<Col :span="12">
									<span class="v-i-label">属性编码：{{busiRadio.attrNbr ? busiRadio.attrNbr : '空'}}</span>
								</Col>
							</Row>
						</div>
						<span v-show="busiRadio.attrValueType == '2000'"  class="t-span">属性值列表</span>
						<Row v-show="busiRadio.attrValueType == '1000'">
							<Col :span="10">
								<FormItem labelText="属性值：" :requiredIcon="true" :errorMessage="errors.first('attrValue')">
									<Input v-model="busiDefualtvalue" v-validate="'required'" placeholder="请输入属性值" name="attrValue"></Input>
								</FormItem>
							</Col>
						</Row>
						<div class="app__table" v-if="busiRadio.attrValueType == '2000'">
							<Row class="app__table-thead">
								<Col :span="6">属性值名称</Col>
								<Col :span="6">属性值</Col>
								<Col :span="6">描述</Col>
								<Col :span="6">操作</Col>
							</Row>
							<Row class="app__table-item" v-for="(item,index) in attrValue" :key="index" @click.stop.native="addValue(item)">
								<Col :span="6">{{item.attrValueName}}</Col>
								<Col :span="6">{{item.attrValueId}}</Col>
								<Col :span="6">{{item.attrValueDesc === null ?'无':item.attrValueDesc}}</Col>
								<Col :span="6">
									<span :class="[attrValueSel(item) ? 'app__icon-btn app__icon-choose' : 'app__icon-btn app__icon-plus']" ></span>
								</Col>
							</Row>
							<Row class="app__data-none" v-show="!attrValue.length">
								<span>对不起，暂无数据</span>
							</Row>
						</div>
						<!-- <Pagination v-show="attrValue.length" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange" :isCenter="true">
						</Pagination> -->
						<div v-if="attrValueSelected.length">
							<span class="y-span" >已添加属性值</span>
							<div class="app__table">
									<Row class="app__table-thead">
									<Col :span="5">属性值名称</Col>
									<Col :span="4">属性值</Col>
									<Col :span="6">描述</Col>
									<Col :span="3">默认值</Col>
									<Col :span="6">操作</Col>
								</Row>
								<Row class="app__table-item" v-for="(item,index) in attrValueSelected" :key="index">
									<Col :span="5">{{item.attrValueName}}</Col>
									<Col :span="4">{{item.attrValueId}}</Col>
									<Col :span="6">{{item.attrValueDesc === null ?'无':item.attrValueDesc}}</Col>
									<Col :span="3">
										<Radio :label="item" :value="item" name='item' v-model="busiDefualtvalue"></Radio>
									</Col>
									<Col :span="6">
										<span class="app__icon-btn app__icon-delete" @click="deleteAttrValue(index)"></span>
									</Col>
								</Row>
							</div>
						</div>
					</div>
				</Scroll>
				<template slot="btnBox">
					<span class="back" @click="btnCancel()" v-show="step == 1">取消</span>
					<span class="next" @click="btnNext()" v-show="step == 1">下一步</span>
					<span class="back" @click="btnPrev()" v-show="step == 2">上一步</span>
					<span class="next" @click="btnSave()" v-show="step == 2">确定</span>
				</template>
			</Dialog>

			<!-- 修改 -->
			<Dialog dialogTitle="选择属性" :dialogSize="dialogSize" ref="attrSelect2" :initBtn="true">
				<Scroll>
					<div class="first-step" v-show="step == 1">
						<span class="dg-span">STEP.1 选择属性</span>
						<div class="search">
								<Search placeholder="请输入搜索内容" @search="searchClick"></Search>
						</div>
						<div class="app__table">
							<Row class="app__table-thead">
								<Col :span="3">选择</Col>
								<Col :span="5">属性编码</Col>
								<Col :span="6">属性名称</Col>
								<Col :span="4">属性值分类</Col>
								<Col :span="3">唯一性</Col>
								<Col :span="3">是否可空</Col>
							</Row>
							<Row class="app__table-item" v-for="(item,index) in busiObjAttrs" :key="index">
							<!-- <Row class="app__table-item" v-for="(item,index) in 2" :key="index"> -->
								<Col :span="3" class="v-t-checkbox">
									<Radio name='item' :label="item" :value="item"  v-model="busiRadio"></Radio>
								</Col>
								<Col :span="5">{{item.attrNbr}}</Col>
								<Col :span="6">{{item.attrName ? item.attrName : '空'}}</Col>
								<Col :span="4">{{findAttrValueType(item.attrValueType)}}</Col>
								<Col :span="3">{{item.isUnique ? item.isUnique == '0' ? '否' : '是' : '无' }}</Col>
								<Col :span="3">{{item.isNullable ? item.isNullable  == '0' ? '否' : '是' : '无'}}</Col>
							</Row>
							<Row v-show="!busiObjAttrs.length" class="app__data-none">
								<Col :span="24">
									<span>暂无数据</span>
								</Col>
							</Row>
							<Pagination v-if="busiObjAttrs.length" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" @change="pageChange"></Pagination>
						</div>
					</div>
					<div class="second-step" v-show="step == 2">
						<span class="dg-span">STEP.2 配置属性值</span>
						<div class="a-v-info">
							<Row>
								<Col :span="6">
									<span class="v-i-label">属性名称：{{busiRadio.attrName ? busiRadio.attrName : '空' }}</span>
								</Col>
								<Col :span="12">
									<span class="v-i-label">属性编码：{{busiRadio.attrNbr ? busiRadio.attrNbr : '空'}}</span>
								</Col>
							</Row>
						</div>
						<span v-show="busiRadio.attrValueType == '2000'"  class="t-span">属性值列表</span>
						<Row v-show="busiRadio.attrValueType == '1000'">
							<Col :span="10">
								<FormItem labelText="属性值：" :requiredIcon="true" :errorMessage="errors.first('attrValue')">
									<Input v-model="busiDefualtvalue" v-validate="'required'" placeholder="请输入属性值" name="attrValue"></Input>
								</FormItem>
							</Col>
						</Row>
						<div class="app__table" v-if="busiRadio.attrValueType == '2000'">
							<Row class="app__table-thead">
								<Col :span="6">属性值名称</Col>
								<Col :span="6">属性值</Col>
								<Col :span="6">描述</Col>
								<Col :span="6">操作</Col>
							</Row>
							<Row class="app__table-item" v-for="(item,index) in attrValue" :key="index" @click.stop.native="addValue(item)">
								<Col :span="6">{{item.attrValueName}}</Col>
								<Col :span="6">{{item.attrValueId}}</Col>
								<Col :span="6">{{item.attrValueDesc === null ?'无':item.attrValueDesc}}</Col>
								<Col :span="6">
									<span :class="[attrValueSel(item) ? 'app__icon-btn app__icon-choose' : 'app__icon-btn app__icon-plus']" ></span>
								</Col>
							</Row>
							<Row class="app__data-none" v-show="!attrValue.length">
								<span>对不起，暂无数据</span>
							</Row>
						</div>
						<!-- <Pagination v-show="attrValue.length" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange" :isCenter="true">
						</Pagination> -->
						<div v-if="attrValueSelected.length">
							<span class="y-span" >已添加属性值</span>
							<div class="app__table">
								<Row class="app__table-thead">
									<Col :span="5">属性值名称</Col>
									<Col :span="4">属性值</Col>
									<Col :span="6">描述</Col>
									<Col :span="3">默认值</Col>
									<Col :span="6">操作</Col>
								</Row>
								<Row class="app__table-item" v-for="(item,index) in attrValueSelected" :key="index">
									<Col :span="5">{{item.attrValueName}}</Col>
									<Col :span="4">{{item.attrValueId}}</Col>
									<Col :span="6">{{item.attrValueDesc === null ?'无':item.attrValueDesc}}</Col>
									<Col :span="3">
										<Radio :label="item" :value="item" name='item' v-model="busiDefualtvalue"></Radio>
									</Col>
									<Col :span="6">
										<span class="app__icon-btn app__icon-delete" @click="deleteAttrValue(index)"></span>
									</Col>
								</Row>
							</div>
						</div>
					</div>
				</Scroll>
				<template slot="btnBox">
					<span class="back" @click="btnCancel2()" v-show="step == 1">取消</span>
					<span class="next" @click="btnNext()" v-show="step == 1">下一步</span>
					<span class="back" @click="btnPrev()" v-show="step == 2">上一步</span>
					<span class="next" @click="btnSave2()" v-show="step == 2">确定</span>
				</template>
			</Dialog>

            <!-- 更多 -->
			<Dialog :dialogTitle="dialogTitle" :dialogSize="dialogValueSize" ref="attrSelect3" :initBtn="true">
				<div class="second-step">
					<span class="y-span">属性值</span>
					<div class="app__table">
						<Row class="app__table-thead">
							<Col :span="12">属性值名称</Col>
							<Col :span="12">属性值</Col>
						</Row>
						<Row class="app__table-item" v-for="(item,index) in moreValue" :key="index">
							<Col :span="12">{{item.attrValueName}}</Col>
							<Col :span="12">{{item.attrValueId}}</Col>
						</Row>
					</div>
				</div>
			</Dialog>

            <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
		</div>
	</transition>
</template>

<script type="text/javascript">
	export default {
		props:{
			componentData:{
			}
		},
		data() {
			return {
				dialogTitle:'',
                tipInfo: {
                    iconType:1,
                    msg:'',
                    showBtn:{
                        clear: true,
                        save: true
                    }
				},
				dOrdBusiObjDetail:{
					busiObjName:'',
					busiObjId:'',
					ordBusiObjAttrDetails:[],
				},
				busiRadio:'',
				checkboxData: [],
				dialogSize: {
					size: 80,
					min: 600,
					max: 800
				},
				pageInfo: {
					pageIndex: 1, // 当前页
					pageSize: 20, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},
				busiTypeArray:[{ //属性值分类
					value:'1000',
					label:'输入型'
				},{
					value:'2000',
					label:'枚举型'
				}],
				dialogValueSize: {
					size: 60,
					min: 400,
					max: 400
				},
				busiObjAttrs:[],
				statusCdObj:[
					{label:"有效",value:"1000"},
					{label:"无效",value:"1100"},
					{label:"未生效",value:"1200"},
					{label:"已归档",value:"1300"}
				],
				attrValSearchObj:{
					attrName:''
				},
				busiDefualtvalue:'',
				attrValueSelected:[],
				step: 1,
				attrValue: [
				],
				delIndex:'',
				moreValue:[],
				delAttrValue:'',
			}
		},
		computed: {
			progressWidth() {
				return this.step == 1 ? `0` : this.step == 2 ? `50%` : '100%';
			}
		},
		mounted() {
			document.body.parentNode.style.overflow = 'hidden';
			this.dOrdBusiObjDetail = this.componentData;
			this.dOrdBusiObjDetail.ordBusiObjAttrDetails = this.componentData.ordBusiObjAttrDetails ? this.componentData.ordBusiObjAttrDetails : [];
			console.log(this.dOrdBusiObjDetail)
			this.addObjectAttrChange();
		},
		destroyed() {
			document.body.parentNode.style.overflow = 'auto';
		},
		methods: {
			btnBack() {
				this.$emit('componentView', 'list');
			},
			findAttrValueType(value){ //查找属性值分类
				let attrValueType = this.busiTypeArray.filter( item => item.value == value)[0];
				return attrValueType ? attrValueType.label : '无';
			},
			Cancel() {
				this.$emit('componentView', 'list')
			},
			Save() {
				let dOrdBusiObjAttrDetails = [...this.dOrdBusiObjDetail.ordBusiObjAttrDetails];
				dOrdBusiObjAttrDetails = dOrdBusiObjAttrDetails.filter(item => item.actType != null)
				this.$axios.post(this.$api.AddOrdBusiObjAttrDetail, { //业务对象保存
						"actType": "MOD",
						"applyRegionId": 0,
						"busiObjDesc": this.dOrdBusiObjDetail.busiObjDesc,
						"busiObjId": this.dOrdBusiObjDetail.busiObjId,
						"busiObjName": this.dOrdBusiObjDetail.busiObjName,
						"busiObjNbr": this.dOrdBusiObjDetail.busiObjNbr,
						"busiObjPublishId": this.dOrdBusiObjDetail.busiObjPublishId,
						"busiTypeId":  this.dOrdBusiObjDetail.busiTypeId,
						"createDate": "2018-11-26T02:05:07.396Z",
						"createStaff": 0,
						"ordBusiObjAttrDetails":dOrdBusiObjAttrDetails,
						"parBusiObjId": this.dOrdBusiObjDetail.parBusiObjId,
						"remark": "",
						"statusCd": "1200",
						"statusDate": "2018-11-26T02:05:07.396Z",
						"updateDate": "2018-11-26T02:05:07.396Z",
						"updateStaff": 0,
						"verNum": 0
                }).then((res) => {
                    if (res.data.success) {
						console.log(res)
						this.$message.success({ message : '修改成功' })
						this.$emit('componentView', 'list');
                    }else{
						this.$message.error({ message : '修改失败' })
					}
                }).catch(error=>{
						this.$message.error({ message : '修改失败' })
				})
			},
			clickTopDel(){
				if(this.checkboxData.length > 1){
					this.$message.error({message:'请选择一条数据'})
					return
				}
				if(this.checkboxData[0].attrValueType == "2000" && this.checkboxData[0].ordBusiObjAttrValues){
					this.checkboxData[0].ordBusiObjAttrValues.forEach(item => item.actType = "DEL")
				}
				this.checkboxData[0].actType = 'DEL';
				this.checkboxData = [];
			},
            clickDel(index){
				this.delIndex = index
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要删除选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
            },
            //删除弹框确认
            tipConfirm(){
				if(this.tipInfo.msg = '确认要删除选择的记录吗？'){
					this.dOrdBusiObjDetail.ordBusiObjAttrDetails[this.delIndex].actType = "DEL";
					if(this.dOrdBusiObjDetail.ordBusiObjAttrDetails[this.delIndex].ordBusiObjAttrValues){
						this.dOrdBusiObjDetail.ordBusiObjAttrDetails[this.delIndex].ordBusiObjAttrValues.forEach(item=>{
							item.actType = "DEL"
						})
					}
					this.dOrdBusiObjDetail.ordBusiObjAttrDetails.filter(item => item.actType != 'DEL')
				}
				console.log(this.dOrdBusiObjDetail.ordBusiObjAttrDetails,"DELLLLLLLL");
                this.$refs.tip.hide();
            },
            //修改弹窗
			updataObjectAttr(item,index) {
				this.busiRadio = '';
				this.attrValueSelected = [];
				this.delIndex = index;
				this.busiDefualtvalue = '';
				this.step = 1;
				this.$refs.attrSelect2.show();
			},
			getStatus(val) {//获取状态
				if(val){
					return this.statusCdObj.find(item => item.value == val).label
				}else{
					return '空'
				}
			},
            //更多
			moreObjectAttr(item) { // 更多信息
					this.moreValue = [];
					item.ordBusiObjAttrValues.forEach(element=>{
						this.moreValue.push(element)
					})
					this.dialogTitle = "更多信息"
					this.$refs.attrSelect3.show()
			},
			addObjectAttr(){
				this.step = 1;
				this.busiRadio = '';
				this.busiDefualtvalue = '';
				this.attrValueSelected = [];
				this.$refs.attrSelect.show();
				this.addObjectAttrChange()
			},
			searchClick(data){
				this.attrValSearchObj.attrName = data;
				this.addObjectAttrChange(1, data);
			},
			addObjectAttrChange(page,name = '') {
				this.pageInfo.pageIndex = page;
				this.$axios.get(this.$api.Attrspec, {
					params: {
						attrNbr: this.attrValSearchObj.attrNbr,
						attrName: name,
						offset:'',
						page: this.pageInfo.pageIndex,
						limit:'5'
					}
                }).then((res) => {
                    //console.log(res,'列表')
                    if(res.data.success == true) {
						console.log(res);
						this.busiObjAttrs =  res.data.attrSpecPage.content || [];
						this.pageInfo = {
							pageIndex: res.data.attrSpecPage.page,
                            pageSize: res.data.attrSpecPage.limit,
                            rowCount: res.data.attrSpecPage.total,
						}
                        console.log(res)
                    }else{
						this.$message.error({ message : '查询失败' })
					}
                    
                })
			},
			attrValueSel(val){ //属性值默认是否选中
                    return this.attrValueSelected.filter(
                        item => item.attrValueId == val.attrValueId
                        )[0]
                        ? true
                        : false;
			},
			addValue(val) {//属性值点击
                this.attrValueSelected.filter( item => item.attrValueId == val.attrValueId)[0] ? 
				this.attrValueSelected = this.attrValueSelected.filter( item => item.attrValueId != val.attrValueId) :
				this.attrValueSelected.push(val);
			},
			deleteAttrValue(index) {
				this.attrValueSelected.splice(index,1)
			},
			editObjectAttr() {

			},
			pageChange(index) {
				this.addObjectAttrChange(index)
			},
			btnNext() {
				if(this.busiRadio == ''){
					this.$message.error({message:'请先选择属性'})
					return
				}
				if(this.busiRadio.attrValueType == '2000'){
					this.$axios.get(this.$api.replace(this.$api.AttrSpecMore,['{attrId}'],[this.busiRadio.attrId]), {
						params: {
							attrId: this.busiRadio.attrId
						}
					}).then((res) => {
						if (res.data.success == true) {
							console.log(res);
							this.attrValue = [...res.data.attrSpecDetail.attrValueList] || []
						}else{
							this.$message.error({ message : '查询失败' })
						}
					}).catch(error => {
						console.log(error);
					});
				}
				this.step = 2;
			},
			btnPrev() {
				this.step = 1;
			},
			btnSave(){
				if(!this.busiDefualtvalue){
					this.$message.error({message:'请输入默认值'})
					return
				}
				if(this.busiRadio.attrValueType == '1000'){
					let objValue = {
						"actType": "ADD",
						"applyRegionId": 0,
						"attrId":  this.busiRadio.attrId,
						"attrMaxCount": 0,
						"attrValueType": this.busiRadio.attrValueType,
						"busiObjAttrId":this.busiRadio.attrId ,
						"busiObjAttrName": this.busiRadio.attrName,
						"busiObjAttrPublishId": 0,
						"busiObjId": this.dOrdBusiObjDetail.busiObjId,
						"colId": 0,
						"createDate": "2018-11-26T02:05:07.396Z",
						"createStaff": 0,
						"defaultValue":this.busiDefualtvalue,
						"isNullable": this.busiRadio.isNullable,	
						"isUnique": this.busiRadio.isUnique,
						"remark": "string",
						"statusCd": "1000",
						"statusDate": "2018-11-26T02:05:07.396Z",
						"tabId": 0,
						"updateDate": "2018-11-26T02:05:07.396Z",
						"updateStaff": 0,
						"valueFrom": "string",
						"valueTo": "string",
						"verNum": 0
						}
						this.dOrdBusiObjDetail.ordBusiObjAttrDetails.push(objValue)
				}else if(this.busiRadio.attrValueType == '2000'){
					let ordBusiObjAttrValues = [];
					this.attrValueSelected.forEach(element => {
						let obj = {
							  	"actType": "ADD",
								"applyRegionId": element.applyRegionId,
								"attrValueId": element.attrValueId,
								"attrValueName": element.attrValueName,
								"busiObjAttrId": this.busiRadio.attrId,
								"busiObjAttrValuePublishId": "",
								"createDate": "2018-11-26T02:05:07.396Z",
								"createStaff": 0,
								"id": 0,
								"remark": "",
								"statusCd": "1000",
								"statusDate": "2018-11-26T02:05:07.396Z",
								"updateDate": "2018-11-26T02:05:07.396Z",
								"updateStaff": 0,
								"verNum": 0
						}
						ordBusiObjAttrValues.push(obj)	
					});
					let objValue = {
							"actType": "ADD",
							"applyRegionId": 0,
							"attrId": this.busiRadio.attrId,
							"attrMaxCount": 0,
							"attrValueType": this.busiRadio.attrValueType,
							"busiObjAttrId": this.busiRadio.attrId,
							"busiObjAttrName": this.busiRadio.attrName,
							"busiObjAttrPublishId": 0,
							"busiObjId": this.dOrdBusiObjDetail.busiObjId,
							"colId": 0,
							"createDate": "2018-11-26T02:05:07.396Z",
							"createStaff": 0,
							"defaultValue": this.busiDefualtvalue.attrValueId,
							"isNullable": this.busiRadio.isNullable,
							"isUnique": this.busiRadio.isUnique,
							"ordBusiObjAttrValues":ordBusiObjAttrValues,
							"remark": "",
							"statusCd": "1000",
							"statusDate": "2018-11-26T02:05:07.396Z",
							"tabId": 0,
							"updateDate": "2018-11-26T02:05:07.396Z",
							"updateStaff": 0,
							"valueFrom": "string",
							"valueTo": "string",
							"verNum": 0
							}
					  	this.dOrdBusiObjDetail.ordBusiObjAttrDetails.push(objValue)
					}
				this.$refs.attrSelect.hide();
			},
			btnSave2() {
				if(!this.busiDefualtvalue){
					this.$message.error({message:'请输入默认值'})
					return
				}
				this.dOrdBusiObjDetail.ordBusiObjAttrDetails[this.delIndex].actType = "DEL";
				this.dOrdBusiObjDetail.ordBusiObjAttrDetails[this.delIndex].ordBusiObjAttrValues.forEach(item=>{
					item.actType = "DEL"
				})
				if(this.busiRadio.attrValueType == '1000'){
					let objValue = {
						"actType": "ADD",
						"applyRegionId": 0,
						"attrId":  this.busiRadio.attrId,
						"attrMaxCount": 0,
						"attrValueType": this.busiRadio.attrValueType,
						"busiObjAttrId":this.busiRadio.attrId ,
						"busiObjAttrName": this.busiRadio.attrName,
						"busiObjAttrPublishId": 0,
						"busiObjId": this.dOrdBusiObjDetail.busiObjId,
						"colId": 0,
						"createDate": "2018-11-26T02:05:07.396Z",
						"createStaff": 0,
						"defaultValue":this.busiDefualtvalue,
						"isNullable": this.busiRadio.isNullable,	
						"isUnique": this.busiRadio.isUnique,
						"remark": "string",
						"statusCd": "1000",
						"statusDate": "2018-11-26T02:05:07.396Z",
						"tabId": 0,
						"updateDate": "2018-11-26T02:05:07.396Z",
						"updateStaff": 0,
						"valueFrom": "string",
						"valueTo": "string",
						"verNum": 0
						}
						this.dOrdBusiObjDetail.ordBusiObjAttrDetails.push(objValue)
				}else if(this.busiRadio.attrValueType == '2000'){
					let ordBusiObjAttrValues = [];
					this.attrValueSelected.forEach(element => {
						let obj = {
							  	"actType": "ADD",
								"applyRegionId": element.applyRegionId,
								"attrValueId": element.attrValueId,
								"attrValueName": element.attrValueName,
								"busiObjAttrId": this.busiRadio.attrId,
								"busiObjAttrValuePublishId": "",
								"createDate": "2018-11-26T02:05:07.396Z",
								"createStaff": 0,
								"id": 0,
								"remark": "",
								"statusCd": "1000",
								"statusDate": "2018-11-26T02:05:07.396Z",
								"updateDate": "2018-11-26T02:05:07.396Z",
								"updateStaff": 0,
								"verNum": 0
						}
						ordBusiObjAttrValues.push(obj)	
					});
					let objValue = {
							"actType": "ADD",
							"applyRegionId": 0,
							"attrId": this.busiRadio.attrId,
							"attrMaxCount": 0,
							"attrValueType": this.busiRadio.attrValueType,
							"busiObjAttrId": this.busiRadio.attrId,
							"busiObjAttrName": this.busiRadio.attrName,
							"busiObjAttrPublishId": 0,
							"busiObjId": this.dOrdBusiObjDetail.busiObjId,
							"colId": 0,
							"createDate": "2018-11-26T02:05:07.396Z",
							"createStaff": 0,
							"defaultValue": "",
							"isNullable": this.busiRadio.isNullable,
							"isUnique": this.busiRadio.isUnique,
							"ordBusiObjAttrValues":ordBusiObjAttrValues,
							"remark": "string",
							"statusCd": "1000",
							"statusDate": "2018-11-26T02:05:07.396Z",
							"tabId": 0,
							"updateDate": "2018-11-26T02:05:07.396Z",
							"updateStaff": 0,
							"valueFrom": "string",
							"valueTo": "string",
							"verNum": 0
							}
					  	this.dOrdBusiObjDetail.ordBusiObjAttrDetails.push(objValue)
					}
				this.$refs.attrSelect2.hide();
			},
			btnCancel() {
				this.$refs.attrSelect.hide();
			},
			btnCancel2(){
				this.$refs.attrSelect2.hide();
			},
		}
	}
</script>

<style scoped lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s ease;
	}

	.fade-enter,
	.fade-leave-to {
		top: -100% !important;
	}

	.updata {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding-bottom: 50px;
		z-index: 201;
		background-color: #fff;
		.u-title1 {
			height: 30px;
			line-height: 30px;
			margin-bottom: 40px;
			border-bottom: 2px solid #fafafa;
			.u-t-item {
				display: block;
				width: 90px;
				margin-left: 20px;
				text-align: center;
				color: $mainColor;
			}
			.h-a-add {
				position: absolute;
				top: -10px;
				right: 10px;
				height: 30px;
			}
		}
		.a-header {
			width: 100%;
			height: 40px;
			line-height: 40px;
			color: $mainColor;
			font-size: 14px;
			text-align: center;
			border-bottom: 1px solid #fafafa;
			.a-title {
				display: inline-block;
				padding-left: 30px;
				font-size: 16px;
				background-image: url(images/new_attribute.png);
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
				background: url(images/close_page.png) no-repeat center;
			}
		}
		.a-info {
			padding-left: 40px;
			border-bottom: 10px solid #f8f8f8;
			margin-bottom: 30px;
		}
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
		.a-v-table {
			top: 20px;
			.col {
				text-align: center;
			}
			.v-t-title {
				color: #333;
				font-weight: bold;
				background-color: #f5fafd;
				border-top: 1px solid $mainColor;
			}
			.v-t-item {
				color: #777;
				text-align: left;
				.app__icon-btn app__icon-delete {
					display: inline-block;
					width: 20px;
					height: 20px;
					vertical-align: middle;
					background: url(images/edit_blue.png) no-repeat center;
					cursor: pointer;
				}
				.d-i-info {
					display: inline-block;
					width: 20px;
					height: 20px;
					background: url(images/info.png) no-repeat center;
					vertical-align: middle;
					cursor: pointer;
				}
                .app__icon-btn app__icon-plus {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: url(images/plus.png) no-repeat center;
                    vertical-align: middle;
                    cursor: pointer;
                }
                .d-i-del {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: url(images/delete.png) no-repeat center;
                    vertical-align: middle;
                    cursor: pointer;
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
		.span{
			color:$mainColor
		}
	}
	.first-step {
		margin:20px;
		.dg-span {
			font-weight: 600;
			font-size: 14px;
			color: $mainColor;
			margin-bottom: 20px;
			display: block;
		}

	.search {
		width: 70%;
		margin-bottom: 20px;
		.s-span {
			display: block;
			width: 50px;
			height: 30px;
			background: $mainColor url(images/search-btn.png) no-repeat center center;
			position: absolute;
			top: 0;
			right: 0;
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
		}
	}
	}
	.h-operation {
		position: absolute;
		top: 25px;
		left: -100%;
		width: 100%;
		height: 50px;
		line-height: 50px;
		transition: .3s all ease;
		background-color: #fff;
		&.active {
			left: 0;
		}
		.h-o-item {
			display: inline-block;
			padding: 0 20px;
			cursor: pointer;
			&.delete {
				background: url(./images/delete_gery.png) no-repeat;
				background-position: 0;
			}
			&:hover {
				color: $mainColor;
				&.delete {
					background: url(./images/delete_blue.png) no-repeat;
					background-position: 0;
				}
			}
		}
		.h-o-count {
			color: $mainColor;
		}
	}
	.second-step {
		margin:20px;
		.dg-span {
			font-weight: 600;
			font-size: 14px;
			color: $mainColor;
			margin-bottom: 10px;
			display: block;
		}
	.a-v-info{
				height: 50px;
				.v-i-label{
					color: #777;
				}
			}
			.t-span {
				display: block;
				margin-bottom: 10px;
			}
			.y-span {
				display: block;
				margin: 10px 0;
				color: #b6de8f;
			}
	}
</style>
