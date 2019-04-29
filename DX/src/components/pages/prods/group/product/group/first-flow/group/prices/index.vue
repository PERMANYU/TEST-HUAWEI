<template>
	<div class="prices">
		<Scroll :isShowRight="true" ref="scroll">
			<!-- 一次性费用 -->
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>一次性费用</span>
			</div>
			<div class="a-v-table app__table">
				<Row class="app__table-thead">
					<Col :span="8">模板名称</Col>
					<Col :span="14">一次性费用</Col>
				</Row>
				<Row :class="['v-t-item app__table-item',(index + 1) % 2 === 0 ? 'double' : 'single']" v-for="(item,index) in adjustPriceList()" :key="index">
					<Col :span="6" class="local-tit">{{item.templateInstName ? item.templateInstName : ''}}</Col>
					<Col :span="16" :offset="6" class="border-col">
						<Row class="item-list">
							<Col :span="12" v-for="(itemList,index) in item.templateParamInsts" :key="index">
								 <FormItem v-if="itemList.isRequired == '1'" :labelWidth="labelWidth" :labelText="itemList.templateParamName+'：'" :requiredIcon="true" :errorMessage="errors.first(itemList.templateParamName)">
									<Input v-if="itemList.typeName == '输入' && itemList.templateParamName == '定向RG'" v-model="itemList.paramValue" @click.native="addRg(item)" :name="itemList.templateParamName" v-validate="'required'" :data-vv-as="itemList.templateParamName"></Input>
									<Input v-else-if="itemList.typeName == '输入'" v-model="itemList.paramValue" :name="itemList.templateParamName" v-validate="'required'" :data-vv-as="itemList.templateParamName"></Input>
									<Select v-else :name="itemList.templateParamName" v-validate="'required'" :data-vv-as="itemList.templateParamName" :data="itemList.attrValues == null ? [] : itemList.attrValues"  v-model="itemList.paramValue"  dataValueStr="attrValue"  dataLabelStr="attrValueName" @change="changeItem(arguments[0],item)"></Select>
								</FormItem>
								<FormItem v-else :labelWidth="labelWidth" :labelText="itemList.templateParamName+'：'">
									<Input v-if="itemList.typeName == '输入' && itemList.templateParamName == '定向RG'" v-model="itemList.paramValue" @click.native="addRg(itemList)" disabled></Input>
									<Input v-else-if="itemList.typeName == '输入'" v-model="itemList.paramValue"></Input>
									<Select v-else :data="itemList.attrValues == null ? [] : itemList.attrValues" v-model="itemList.paramValue" dataValueStr="attrValue" dataLabelStr="attrValueName" @change="changeItem(arguments[0],item)"></Select>
								</FormItem>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row class="app__data-none" v-show="adjustPriceList().length == 0">
					<span>对不起，暂无数据</span>
				</Row>
			</div>


			<!-- 周期性费用 -->
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>周期性费用</span>
			</div>
			<div class="a-v-table app__table">
				<Row class="app__table-thead">
					<Col :span="6">模板名称</Col>
					<Col :span="14">周期性费用参数</Col>
					<Col :span="2">操作</Col>
				</Row>
				<Row class="app__table-item" v-for="(item,index) in adjustPriceMoreList()" :key="index">
					<Col :span="6" class="local-tit">{{item.templateInstName ? item.templateInstName : ''}}</Col>
					<Col :span="16" :offset="6" class="border-col">
						<Row class="item-list">
							<Col :span="12" v-for="(itemList,index) in item.templateParamInsts" :key="index">
								 <FormItem v-if="itemList.isRequired == '1'" :labelWidth="labelWidth" :labelText="itemList.templateParamName+'：'" :requiredIcon="true" :errorMessage="errors.first(itemList.templateParamName)">
									<Input v-if="itemList.typeName == '输入' && itemList.templateParamName == '定向RG'" v-model="itemList.paramValue" @click.native="addRg(item)" :name="itemList.templateParamName" v-validate="'required'" :data-vv-as="itemList.templateParamName"></Input>
									<Input v-else-if="itemList.typeName == '输入'" v-model="itemList.paramValue" :name="itemList.templateParamName" v-validate="'required'" :data-vv-as="itemList.templateParamName"></Input>
									<Select v-else :name="itemList.templateParamName" v-validate="'required'" :data-vv-as="itemList.templateParamName" :data="itemList.attrValues == null ? [] : itemList.attrValues"  v-model="itemList.paramValue"  dataValueStr="attrValue"  dataLabelStr="attrValueName" @change="changeItem(arguments[0],item)"></Select>
								</FormItem>
								<FormItem v-else :labelWidth="labelWidth" :labelText="itemList.templateParamName+'：'">
									<Input v-if="itemList.typeName == '输入' && itemList.templateParamName == '定向RG'" v-model="itemList.paramValue" @click.native="addRg(itemList)" disabled></Input>
									<Input v-else-if="itemList.typeName == '输入'" v-model="itemList.paramValue"></Input>
									<Select v-else :data="itemList.attrValues == null ? [] : itemList.attrValues" v-model="itemList.paramValue" dataValueStr="attrValue" dataLabelStr="attrValueName" @change="changeItem(arguments[0],item)"></Select>
								</FormItem>
							</Col>
						</Row>
					</Col>
					<Col :span="2" class="local-icon">
						<span  @click.stop.self="delPeriodic(item)">删除</span>
					</Col>
				</Row>
				<Row class="app__data-none" v-show="adjustPriceMoreList().length == 0">
					<span>对不起，暂无数据</span>
				</Row>
			</div>
		</Scroll>


		<Dialog :dialogSize="dialogSize" class="h-dialog" :dialogTitle="dialogTitle + '选择'" ref="offerTariff" @confirm="offerTariffConfirm">
			<Scroll class="main">
				<div class="sel-box">
					<Search class="offer-sear" :placeholder="'请输入' + dialogTitle + '名称/编码'" v-model="searchPrice" @search="searchClick"></Search>
				</div>
				<div class="top">
				<div class="t-left">
					<Scroll :isShowRight="true" ref="scroll">
						<Tree v-for="(item,index) in offerTariffList" :key="index"  :folder="item" v-model="selTemplateType" :childrenStr="'children'" :initLevel="1" :levelStr="'level'" :keys="treeShowKeyItems"></Tree>
					</Scroll>
				</div>
				<div class="t-right">
					<div class="app__table">
						<Row class="app__table-thead">
							<Col :span="2">序号</Col>
							<Col :span="7">{{dialogTitle + '名称'}}</Col>
							<Col :span="7">{{dialogTitle+ '编码'}}</Col>
							<Col :span="6">描述</Col>
							<Col :span="2">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in offerTariffItem" :key="index">
							<Col :span="2">{{index + 1}}</Col>
							<Col :span="7">{{item.templateName}}</Col>
							<Col :span="7">{{item.templateNbr}}</Col>
							<Col :span="6">{{item.templateDesc}}</Col>
							<Col :span="2">
								<span v-if="showYes(item)" class="app__icon-btn app__icon-choose" @click="priceClick(item)"></span>
								<span v-else class="app__icon-btn app__icon-plus" @click="priceClick(item)"></span>
							</Col>
						</Row>
						<Pagination v-if="offerTariffItem.length>0"  :pageIndex="pagePriceObj.pageIndex" :pageSize="pagePriceObj.pageSize" :rowCount="pagePriceObj.pageCount" @change="pageChange"></Pagination>
					</div>
				</div>
				</div>
				<span class="y-span">已选计费模板</span>
				<div class="bottom">
					<div class="app__table">
						<Row class="app__table-thead">
							<Col :span="2">序号</Col>
							<Col :span="7">{{dialogTitle + '名称'}}</Col>
							<Col :span="7">{{dialogTitle+ '编码'}}</Col>
							<Col :span="6">描述</Col>
							<Col :span="2">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in offerChannel" :key="index">
							<Col :span="2">{{index + 1}}</Col>
							<Col :span="7">{{item.templateName ? item.templateName : '无'}}</Col>
							<Col :span="7">{{item.templateNbr ? item.templateNbr : '无'}}</Col>
							<Col :span="6">{{item.templateDesc}}</Col>
							<Col :span="2">
								<span class="app__icon-btn app__icon-delete" @click="deleteChannel(item)"></span>
							</Col>
						</Row>
					</div>
				</div>
			</Scroll>
		</Dialog>

		<Dialog :dialogSize="RgdialogSize" class="h-dialog" dialogTitle="添加RG" ref="addRg" @confirm="addRgConfirm">
            <div class="main">
            	<div class="rg" v-for="(item,index) in rgTemp" :key="index">
            		<FormItem>
	            		<Input v-model="item.rg"></Input>
	            	</FormItem>
	            	<span v-show="index == '0'" class="c_btn" @click="rgClick">+</span>
            	</div>
            </div>
        </Dialog>
		<!-- 选择费用框 -->

		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>

	</div>
</template>

<script type="text/javascript">
	export default{
		props: {
			componentData:{}
		},
		data(){
			return{
				dialogSize: {
					size: 80,
					min: 600,
					max: 800
				},
				RgdialogSize: {
                	size: 60,
                    min: 300,
                    max: 400
				},
				rgTemp: [{
                	rg: ''
                }],
				labelWidth:'150px',
				searchPrice:'',
				pagePriceObj: {
					pageIndex: 1,
					pagecount: 0,
					pageSize: 5
				},
				tipInfo: {
                	iconType: 3,
                	msg:'',
                	showBtn:{
                		clear: true,
                		save: true
                	}
				},
				priceList:[],//一次性费用列表
				priceMoreList:[],//周期性费用列表
				dialogTitle: '',
				offerTariffList: [],
				offerTariffItem: [],
				offerChannel: [],
				selTemplateType: '',
				tariffTemplateId:[],
				tariffTemplateIds:[],
				treeShowKeyItems: [{
                	key: 'typeName',
                	span: 24
				}],
				templateObj: {
                    templateNbr: "",
                    templateName: "",
                    templateTypeId: "",
                },
				delNmr: null,
				delPrimaryItem:'',//一次性
				delRoundItem:'',//周期性
				tariffSelList:[],//一次性
				tariffSelsList:[],//周期性
				priceDelList:[],//一次性列表删除
				priceDelsList:[],//周期性列表删除
			}
		},
		watch: {
			tariffTemplateId: function(NewValue,OldValue){
				this.getofferDetail()
			},
			tariffTemplateIds: function(NewValue,OldValue){
				this.getofferDetail()
			},
			selTemplateType:function(NewValue,OldValue){
				if(NewValue != OldValue){
                    this.templateObj.templateNbr = "";
                    this.templateObj.templateName = "";
                    if(NewValue.templateTypeId != undefined){
                        this.templateObj.templateTypeId = NewValue.templateTypeId;
                    }else{
                        this.templateObj.templateTypeId = "";
                    }
	        		this.getOfferTable();
	        	}
			},
			componentData:function(val,newValue){
				this.getOfferTariff();
				// this.getOfferSet();
			}
		},
		mounted() {
			this.getOfferTariff();
			// this.getOfferSet();
		},
		methods: {
			adjustPriceMoreList(){
				return this.priceMoreList.filter( item => item.statusCd != "1100");
			},
			adjustPriceList(){
				return this.priceList.filter( item => item.statusCd != "1100")
			},
			selectPrimaryClick() {
				this.getofferDetail('one',10000021)
				// this.getofferDetail(10000001)
			},
			selectPeriodicClick() {
				this.getofferDetail('more',10000019)
			},
			delPrimary(item) { //一次性费用删除
				this.tipInfo.msg = `确认要删除吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.tipConfirmType = 'delPrimary'
				this.$refs.tip.show();
				this.delPrimaryItem = item
				console.log(item);
			},
			delPeriodic(item) { //周期性费用列表删除
				this.tipInfo.msg = `确认要删除吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.tipConfirmType = 'delPeriodic'
				this.$refs.tip.show();
				this.delRoundItem = item;
			},
			addRg(item) {
            	this.rgTemp = [{
            		rg: ''
            	}];
				this.$refs.addRg.show();
				this.paramValueRg = item;
			},
			rgClick(){
				let temp = {
					rg: ''
				}
				this.rgTemp.push(temp)
			},
			offerTariffConfirm() {//Dialog保存
				if(this.dialogTitle == '一次性费用模板'){
					this.offerChannel.forEach(item =>{
						this.tariffTemplateId.push(item.tariffTemplateId)
					})
				}else{
					this.offerChannel.forEach(item =>{
						this.tariffTemplateIds.push(item.tariffTemplateId)
					})
				}
					this.$refs.offerTariff.hide();
			},
			// 搜索框模糊查询
            searchClick(data) {
                if(Number(data) != NaN && data != ""){
                    this.templateObj.templateNbr = data;
                    this.templateObj.templateTypeId = "";
                }else if(Number(data) == NaN && data != ""){
                    this.templateObj.templateName = data;
                    this.templateObj.templateTypeId = "";
                }
                this.getOfferTable();
            },

			// 费用列表事件
			priceClick(items) {
				this.offerChannel.filter( item => item.tariffTemplateId == items.tariffTemplateId)[0] ? 
				this.offerChannel = this.offerChannel.filter( item => item.tariffTemplateId != items.tariffTemplateId) :
				this.offerChannel.push(items);
			},

			//删除已选列表信息
			deleteChannel(item) {
				this.tipInfo.msg = `确认要删除吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
				this.tipConfirmType = 'delChannel';
				this.delNmr = item;
			},
			tipConfirm() {
				this.$refs.tip.hide();
				if(this.tipConfirmType == 'delChannel') {
					this.priceClick(this.delNmr)
				}
				if(this.tipConfirmType == 'delPrimary') {
					this.adjustPriceList();
					this.delPrimaryItem.statusCd = '1100'
					// this.priceList.filter( item => item.tariffTemplateInstId == this.delPrimaryItem.tariffTemplateInstId)[0] ? 
					// this.priceList = this.priceList.filter( item => item.tariffTemplateInstId != this.delPrimaryItem.tariffTemplateInstId) :
					// this.priceList.push(this.delPrimaryItem);
				}
				if(this.tipConfirmType == 'delPeriodic'){
					this.adjustPriceMoreList();
					this.delRoundItem.statusCd = '1100'
				}
			},

			//查询资费模板
            getOfferTariff() {
                this.$axios.get(this.$api.replace(this.$api.QueryBaseOfferTariff,['{prodId}'],[this.componentData.prodId])).then((res) => {
                    if (res.data.code == this.$api.successCode) {
							this.priceList = [];
							this.priceMoreList = [];
							let priceObj = res.data.tariffTemplateInst ?　res.data.tariffTemplateInst : [];
							priceObj.forEach(item=>{
								if(item.tariffTemplateId == 10000021){
									this.priceList.push(item)
								}else {
									this.priceMoreList.push(item)
								}
							})
                    }
                })
            },

            //销售品资费模板实例配置
            save() {
				this.$validator.validateAll().then((result) => {
					if(result) {
						this.priceDelList.map((item,index,arr)=> { 
								this.priceList.push(item);
							})
						this.tariffSelsList=[];
						this.priceMoreList.forEach((item,index,arr) => {
						let tempArray = [];
						arr[index].templateParamInsts.forEach( (paramitem,paramsindex,paramarr) => {
							let ObjList = {
								"templateParamInstId": paramarr[paramsindex].templateParamInstId,
								"tariffTemplateInstId": arr[index].tariffTemplateInstId,
								"templateParameterRelId": paramarr[paramsindex].templateParameterRelId,
								"paramValue": paramitem.paramValue == undefined ? "" : paramitem.paramValue,
								"createStaff": 123,	  //固定
								"updateStaff": 123,   //固定
								"statusCd":"1000",
								"createDate": "",    //空
								"updateDate": ""     //空
							}
							tempArray.push(ObjList)
						})
						let Obj = {
							"tariffTemplateInstId": arr[index].templateParamId == undefined ? arr[index].tariffTemplateInstId :  '',    //空
							"tariffTemplateId": arr[index].tariffTemplateId,
							"offerId": this.offerId,      //待传
							"statusCd": arr[index].statusCd ? arr[index].statusCd : '1000',  
							"createDate": "",     //空
							"updateDate": "",     //空
							"templateParamInsts": tempArray
						}
						this.tariffSelsList.push(Obj)
						})
						this.tariffSelList = [];
						this.priceList.forEach((item,index,arr) => {
							let tempArray = [];
							arr[index].templateParamInsts.forEach( (paramitem,paramsindex,paramarr) => {
								let ObjList = {
									"templateParamInstId": paramarr[paramsindex].templateParamInstId,
									"tariffTemplateInstId": arr[index].tariffTemplateInstId,
									"templateParameterRelId": paramarr[paramsindex].templateParameterRelId,
									"paramValue": paramitem.paramValue == undefined ? "" : paramitem.paramValue,
									"createStaff": 123,	  //固定
									"updateStaff": 123,   //固定
									"statusCd":"1000",
									"createDate": "",    //空
									"updateDate": ""     //空
								}
								tempArray.push(ObjList)
							})
							let Obj = {
								"tariffTemplateInstId": arr[index].templateParamId == undefined ? arr[index].tariffTemplateInstId :  '',    //空
								"tariffTemplateId": arr[index].tariffTemplateId,
								"offerId": this.offerId,      //待传
								"statusCd": arr[index].statusCd ? arr[index].statusCd : '1000',  
								"createDate": "",     //空
								"updateDate": "",     //空
								"templateParamInsts": tempArray
							}
							this.tariffSelList.push(Obj)
						})
				
						this.$axios.post(this.$api.replace(this.$api.QueryBaseOfferTariff,['{prodId}'],[this.componentData.prodId]),
								[...this.tariffSelList,...this.tariffSelsList]
						).then((res) => {
							if (res.data.code == this.$api.successCode) {
								this.$message.success({ message : '保存成功'})
							}else{
								this.$message.error({ message : res.data.msg })
							}
						})
						.then(res=>{
						})
					}
				})
            },

            // 模板类别树状查询
            getOfferSet() {
                this.$axios.get(this.$api.TemplateTypeTree).then((res) => {
                    if (res.data.code == this.$api.successCode) {
                        this.offerTariffList = res.data.templateTypeTrees;
                    }
                })
            },
			changeItem(val,item){
            	// if (val.attrValueId == "160000123") {
            	// 	item.templateParamInsts.find(ele => ele.templateParameterRelId == "100000113").paramValue = "2"
            	// } else if(val.attrValueId == "160000124") {
            	// 	item.templateParamInsts.find(ele => ele.templateParameterRelId == "100000113").paramValue = "1"
            	// }else{
            	// 	item.templateParamInsts.find(ele => ele.templateParameterRelId == "100000113").paramValue = ""
            	// }
			},
			// 资费模板列表查询
            getOfferTable(val,data) {
                this.offerTariffItem = [];
                this.$axios.get(this.$api.tariffTemplateList+'?templateNbr='+this.templateObj.templateNbr+'&templateName='+this.templateObj.templateName+'&templateTypeId='+this.templateObj.templateTypeId+'&limit='+this.pagePriceObj.pageSize+'&page='+this.pagePriceObj.pageIndex).then((res) => {
                    if (res.data.code == this.$api.successCode) {
                        this.offerTariffItem = res.data.tariffTemplateDTOPaasPage.content;
                        this.pagePriceObj.rowCount = res.data.tariffTemplateDTOPaasPage.total;
                    }
                })
            },
			
			// 页面跳转
            pageChange(val){
                this.getOfferTable()
            },

            // 资费模板详情
            getofferDetail(type,index) {
				let tariffTemplateId = index;
				let prodId = this.componentData.prodId;
					this.$axios.get(this.$api.replace(this.$api.QueryTarifftemplate,['{tariffTemplateId}'],[tariffTemplateId]),{
						params:{
							prodId:prodId
						}
					}).then((res) => {
							if (res.data.success == true) {
								let priceData = res.data.tariffTemplate;
								let templateParamInsts = [];
								priceData.templateParameterRel.forEach(item=>{
									let obj = {
										attrId:item.attrId,
										templateParamName:item.parameterDesc,
										templateParameterRelId:item.templateParameterRelId,
										typeName:item.typeName,
										attrValues:item.attrValues,
										isRequired:item.isRequired,
										templateParamInstId: "",
										tariffTemplateInstId: "",    //空
										createStaff: 123,   //固定
										updateStaff: 123,   //固定
										statusCd: "1000",
										defaultValue: item.defaultValue
									}
									templateParamInsts.push(obj)
								})
								let tempObj = {
									statusCd:'1000',
									tariffTemplateInstId: '',
									templateInstName:priceData.templateDesc,
									tariffTemplateId:priceData.tariffTemplateId,
									templateParamInsts:templateParamInsts
								};
								for(let val of tempObj.templateParamInsts){
									if(val.typeName === '单选'){
										this.$set(val,'paramValue',val.defaultValue);
									}else{
										this.$set(val,'paramValue',val.defaultValue);
									}
								}
								if(type == 'one'){
									this.priceList.push(tempObj)
								}else if(type == 'more'){
									this.priceMoreList.push(tempObj)
								}
							}
						}).catch(error=>{
							this.$message.error({message:'查询失败'})
						})
			},
			addRgConfirm() {
				let rgData = [];
				for(let ele of this.rgTemp){
					rgData.push(ele.rg + 'RG');
				}
				this.paramValueRg.paramValue = rgData.join();
				this.$refs.addRg.hide();
			},
			showYes(item) {// 资费是否选中
				return this.offerChannel.filter(
					obj =>
					obj.actType != "DEL" &&
					obj.templateNbr == item.templateNbr
				)[0]
					? true
					: false;
			},
		}
	}
</script>

<style scoped lang="scss">
	.prices{
		width: 100%;
		height: 100%;
		padding: 0 20px 30px !important;

		.app__table{
            margin-bottom: 20px;
			.app__table-item {
				background: #ffffff;
				margin-bottom: 20px;
				border: 1px solid gainsboro;
				.border-col {
					border-left: 1px solid gainsboro;
					border-right: 1px solid gainsboro;
					padding: 15px 10px 15px 0;
				}
			}
        }
	}
	.local-tit{
		position: absolute;
		top: 50%;
		left: 9.5%;
		margin-left: -10px;
		margin-top: -10px;
	}
	.local-icon{
		position: absolute;
		top: 50%;
		right:-35px;
		margin-left: -10px;
		margin-top: -18px;
		text-align: center;
		padding-left: 0 !important;
        color: $mainColor;
        cursor:pointer;
	}
	.selectbtn{
		float: right;
		margin-top: 15px;
	}
	.item-list{
		span{
			display: inline-block;
			width: 100px;
			text-align: right;

			i{
				margin-right: 5px;
				font-style: normal;
				color: red;
			}
		}
	}
	.main {
		padding: 20px;
		.sel-box{
			padding-bottom: 20px;
			width: 50%;
		}
		.top {
			width: 100%;
			height: 300px;
			.t-left {
				width: 25%;
				height: 100%;
				float: left;
				border: 1px solid gainsboro;
			}
			.t-right {
				width: 73%;
				height: 100%;
				float: right;
			}
		}
		
		.y-span {
			display: block;
			margin: 10px 0;
			color: #b6de8f;
		}
	}


</style>