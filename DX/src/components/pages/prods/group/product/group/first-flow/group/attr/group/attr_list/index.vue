<template>
	<div class="attr">
		<Scroll>
			<!-- 属性列表 -->
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>属性列表</span>
			</div>
			<div class="app__table">
				<Row class='app__table-thead'>
					<Col :span="4">属性名称</Col>
					<Col :span="2">属性值分类</Col>
					<Col :span="3">对应接入类产品</Col>
					<Col :span="4">付费方式</Col>
					<Col :span="5">客户类型</Col>
					<Col :span="2">默认值</Col>
					<Col :span="2">属性值</Col>
					<Col :span="2">更多</Col>
				</Row>
			</div>
			<div class="app__table" >				<!-- 属性 -->
				<Row class="app__table-item" v-for="(item,index) in allAttrList" :key="index"  v-if="item.actType != 'DEL'">
				
					<Col :span="4">{{item.attrName ? item.attrName : '无'}}</Col>
					<Col :span="2">{{findAttrValueType(item.attrValueType)}}</Col>
					<Col :span="3" >
			 	       {{item.followProdName}}
					</Col>
					<Col :span="4">
						{{getPaymentMode(item.paymentMode)}}
					</Col>
					<Col :span="5">
						{{getCustType(item.custType)}}
					</Col>
					<Col :span="2">
						{{item.defaultValue}}
					</Col>
					
					<Col :span="2">
						<span class="b-font" @click="showValue(item)">{{findAttrValueType(item.attrValueType) == '枚举型' ? '查看' : '-- --'}}</span>
					</Col>
					<Col :span="2">
						<span class="b-font" @click="showMore(item)">更多</span>
					</Col>
				</Row>
				<Row v-show="allAttrList.length != 0" :class="['m-item app__table-item']"  v-for="item in (10 - allAttrList.length)" :key="item.index"></Row>
			</div>
			<Row class="app__data-none" v-show="allAttrList.length == 0">
				<span>对不起，暂无数据</span>
			</Row>
		</Scroll>

		<!-- 更多信息 -->
		<Dialog :dialogTitle="dialogTitle" ref='moreMessage' :dialogSize="productDialogSize" :showConfirmBtn="false" :showBtn="true">
			<Scroll :isShowRight="true" ref="scroll"> 
				<Form>
					<Row>
						<Col :span="12">
							<FormItem labelText="是否必填：">
								{{moreValue.ifNecessary == "1" ?  '是' : '否'}}
							</FormItem>
						</Col>
						<Col :span="12">
							<FormItem labelText="是否允许变更">
								{{moreValue.ifToChange == "1" ?  '是' : '否'}}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col :span="12">
							<FormItem labelText="生效时间：">
								{{moreValue.effDate | date}}
							</FormItem>
						</Col>
						<Col :span="12">
							<FormItem labelText="失效时间：">
								{{moreValue.expDate | date}}
							</FormItem>
						</Col>
					</Row>

				</Form>
			</Scroll> 
		</Dialog>

	<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>

	</div>
</template>

<script type="text/javascript">
export default {
	props:{
		 componentData:{
			 type:Object
		 },
		 prodObj:{}
	},
	data() {
		return {
			a:'',
			delAttrList:[],//删除的属性的数组暂时
			staff: "2222",
			dialogTitle: "",
			attrValSearchObj: {
				attrNbr: "",
				attrName: ""
			},
			tipInfo:{
				iconType: 1,
				msg: '',
				showBtn: {
					clear: true,
					save: true
				}
        	},
			productDialogSize:{
					size: 60,
					min: 400,
					max: 400
			},
			attrPageObj:{
				pageIndex:1,
				pageSize:10
			},
			pageFollObj: {
				pageIndex: 1,
				pagecount: 1,
				pageSize: 10
			},
			attrValueTypeArray:[{
				value:'1000',
				label:'输入型'
			},{
				value:'2000',
				label:'枚举型'
			}],
			attrValueDataTypeArray: [
				{
				value: "1000",
				label: "日期型"
				},
				{
				value: "1100",
				label: "日期时间型"
				},
				{
				value: "1200",
				label: "字符型"
				},
				{
				value: "1300",
				label: "浮点型"
				},
				{
				value: "1400",
				label: "整数型"
				},
				{
				value: "1500",
				label: "布尔型"
				},
				{
				value: "1600",
				label: "计算型"
				}
			],
			statusCdArray: [
				{
				value: "1000",
				label: "有效"
				},
				{
				value: "1100",
				label: "无效"
				},
				{
				value: "1101",
				label: "过期"
				}
			],
			boolArray: [
				{
				value: "1",
				label: "是"
				},
				{
				value: "0",
				label: "否"
				}
			],
			areaSelectedOpen: false,  // 是否展开
			selectCust: [],
			selectPay:[],
			allPay:[
				{            // 所有的付费方式
					value: "1200",
					label: '后付费'
				},{
					value: "1201",
					label: '准预付费'
				},{
					value: "2100",
					label: '预付费'
				}
			],
			allCust:[
				{
					value: "1100",
					label: '公众客户'
				},
				{            // 所有的客户
					value: "1000",
					label: '政企客户'
				}
			],
			allAttrList: [],
			attrOpenArray: [], //哪个属性展开了
			attrSpecs: [], //属性列表
			attrSpecsSelTemp: [], //选中的属性列表
			curAttrObj: "",
			attrSpecsValues: [], //属性值列表
			attrSpecsValuesSelTemp: [], //选中的属性值列表
			followObj:{},
			followList:[],
			followCheck:'',
			moreValue:{}
		};
	},
	activated() {
		if(!this.componentData.attrId) return;
		this.allAttrList.push(this.componentData)
	},
	watch:{
		prodObj(val,newValue){
			this.findProductAttrDetail()
		}
	},
	mounted() {
		this.findProductAttrDetail();
	},
	methods: {
		findProductAttrDetail(){//属性查询
			this.$axios.get(this.$api.replace(this.$api.QryOrdProductAttrDetail, ['{prodId}'], [this.prodObj.prodId]),{
				params : {
					isAttrValue: '1',
					page: 1,
					limit: 10
				}
			}).then((res) => {
				if(res.data.success == true){
//					if(res.data.body.prodAttrs){
						let newAttrs = res.data.prodAttrs.content || [];
						console.log(newAttrs);
						this.allAttrList = [...newAttrs.filter( item => {
							item.paymentMode = item.paymentMode ? item.paymentMode.split('|') : [];
							item.custType = item.custType ? item.custType.split('|') : [];
							return true;
						})]
//					}
					console.log(this.allAttrList)
				}else{
					this.$message.error({ message : res.data.msg })
				}
			});
		},
		findAttrValueType(value){ //查找属性值分类
			let attrValueType = this.attrValueTypeArray.filter( item => item.value == value)[0];
			return attrValueType ? attrValueType.label : '无';
		},
		showValue(item) {//查看
			this.dialogTitle="查看属性值"
			item.prodAttrValues.forEach(obj => {
				console.log(obj);
				if(!this.attrSpecsValues.includes(obj)){
					this.attrSpecsValues.push(obj)
				}
			}
			)
			this.$refs.addAttrVal.show();
		},
		showMore(item) {//查看更多
		  	this.moreValue = {
				  ifNecessary:item.ifNecessary,
				  ifToChange:item.ifToChange,
				  effDate:item.effDate,
				  expDate:item.expDate
			  }
			this.dialogTitle = "更多信息"
			this.$refs.moreMessage.show()

		},
		componentDataProcessing(){//父级值处理
			console.log(this.componentData);
			if(this.componentData){
				this.allAttrList.push(this.componentData)
			}
		},
		addAttrList(){
			this.$emit('componentView','attradd')
		},
		delAttr(item){ //删除属性
			this.delItem = item;
			this.tipInfo.iconType = 3;
            this.tipInfo.msg = '确认要删除选择的记录吗？';
            this.tipInfo.showBtn.clear = true;
            this.tipInfo.showBtn.save = true;
            this.$refs.tip.show();
			
		},
		tipConfirm(){
			this.delItem.actType = 'DEL',
			this.delAttrList.push(this.delItem)
			this.allAttrList.filter( obj => obj.prodAttrId == this.delItem .prodAttrId)[0] ? 
			this.allAttrList = this.allAttrList.filter( obj => obj.prodAttrId != this.delItem .prodAttrId) : 
			this.allAttrList.push(this.delItem )
			this.$refs.tip.hide();
		},
		addAttrCloseDialog(){ //属性列表

		},
		addAttrSubmitDialog(){//属性列表确定

		},
		attrPageChange(page){
				this.attrPageObj.pageIndex = page;
				this.$axios.post(this.$api.QryAttrSpecList,{
					body:{
						attrNbr:this.attrValSearchObj.attrNbr,
						attrName:this.attrValSearchObj.attrName,
						pageInfo:this.attrPageObj
					}
				}).then( res => {
					if(res.data.code == 0){
						this.$refs.addAttr.show();
						this.dialogTitle = '属性列表'
						this.attrSpecs = res.data.body.attrSpecs ? res.data.body.attrSpecs : [];
						this.attrPageObj = res.data.body.pageInfo;
					}else{
						this.$message.error({ message : res.data.msg })
				}
			})
		},
		attrDefaultIsInput(value){ //属性值分类是不是输入类型
			return value == 1000;
		},
		attrActChange(item){
			console.log(item);
			if(item.actType == 'ADD') return;
			this.$set(item,'actType','MOD');
		},
		attrEndDateChange(item){
			if(!item.effDate){
				this.$message.error({ message :  '请先选择生效时间'})
				item.expDate = ''
				return;
			}
			if(item.expDate < item.effDate){
				this.$message.error({ message :  '失效时间不可比生效时间早'})
				item.expDate = '';
				return;
			}
			if(item.actType == 'ADD') return;
			this.$set(item,'actType','MOD');
		},
		attrShowDialog(){ //属性值查看确认
			this.attrSpecsValues = [];
			this.$refs.addAttrVal.hide();
		},
		attrCloseDialog(){ //查看属性值弹框
			this.attrSpecsValues = [];
		},
		getPaymentMode(data){
				let allPayName = [];
				let allPay = [
                    {            // 所有的付费方式
                        value: "1200",
                        label: '后付费'
                    },{
                        value: "1201",
                        label: '准预付费'
                    },{
                        value: "2100",
                        label: '预付费'
                    }
                ]
				for(let ele of data){
					for(let val of allPay){
						if(ele == val.value){
							allPayName.push(val.label);
						}
					}
				}
				return allPayName.join();
			},
			getCustType(data){
				let allCustName = [];
				let allCust = [
					{
						value: "1100",
						label: '公众客户'
					},
					{            // 所有的客户
						value: "1000",
						label: '政企客户'
					}
				]
				for(let ele of data){
					for(let val of allCust){
						if(ele == val.value){
							allCustName.push(val.label);
						}
					}
				}
				return allCustName.join();
			}
  }	
};
</script>

<style scoped lang="scss">

.attr {
  width: 100%;
  height: 100%;
  padding: 0 20px !important;
 
	.selectbtn{
		float: right;
		margin-top: 15px;
	}

	.b-font{
		color: $mainColor;
		cursor: pointer;
	}

	/*已选*/
	.selected{
		height: 30px;
		min-height: 30px;
		margin-top:5.5px;
		background-color:#fff;
		line-height: 25px;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
	}
	
}
	/*选择客户弹框*/
	.i-area{
			padding: 10px 0;

			.i-title{
				border-bottom: solid 1px #f0f0f0;

				span{
					display: inline-block;
					width: 100px;
					height: 30px;
					line-height: 30px;
					font-size: 12px;
					color: white;
					text-align: center;
					background-color: $mainColor;
					border-radius: 4px 4px 0 0;
				}
				button{
					float: right;
					width: 60px;
					height: 24px;
					line-height: 22px;
					font-size: 12px;
					color: $mainColor;
					background-color: white;
					border-radius: 4px;
					border: solid 1px $mainColor;
					outline:none;
					cursor: pointer;

					i{
						display: inline-block;
						width: 12px;
						height: 10px;	
						// background-image: url("./images/info-yes.png");
						background-size: 100% 100%;
						float: left;
						margin-top: 6px;
						margin-left: 6px;
					}
				}
			}

			.i-content{
				padding-top: 16px;
				padding-bottom: 10px;

				.area{
					text-align: center;
					display: inline-block;
					width: 20%;
					height: 24px;
					line-height: 22px;
					font-size: 12px;
					color: #333333;
					background-color: white;
					border-radius: 4px;
					border: solid 1px #d5d5d5;
					margin: 8px 2%;
					cursor: pointer;
				}

				.activeArea{
					color: $mainColor;
					border: solid 1px $mainColor;

					i{
						display: inline-block;
						width: 12px;
						height: 10px;
						// background-image: url("./images/info-yes.png");
						background-size: 100% 100%;
						float: left;
						margin-top: 6px;
						margin-left: 6px;
					}
				}
			}
	}

</style>
<style>
.picker-validate-error input.app__input{
	border: 1px solid #f1886b !important;
}
.validate-error  input.app__input{
	border: 1px solid #f1886b !important;
}
</style>
