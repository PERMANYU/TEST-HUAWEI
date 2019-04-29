<template>
	<div class="flow">
		<Scroll>
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>产品业务流程</span>
			</div>

			<div class="app__table">
					<Row class='app__table-thead'>
						<Col :span='5'>业务流程编码</Col>
                        <Col :span='7'>业务流程名称</Col>
                        <Col :span="6">付费方式</Col>
                        <Col :span="6">选择接入产品</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in tabList" v-if="item.actType != 'DEL'" :key="index">
                        <Col :span='5'>{{item.serviceOfferNbr}}</Col>
                        <Col :span='7'>{{item.serviceOfferName}}</Col>
                        <Col :span="6">
                        	{{getPaymentMode(item.paymentMode)}}
                        </Col>
                        <Col :span='6'>
                        	{{item.followProdName}}
                        </Col>
                    </Row>
					<Row class="app__data-none" v-show="!tabList.length">
						<Col>
							<span>对不起，暂无数据</span>
						</Col>
					</Row>
			</div>

			<!--产品服务提供关系约束配置-->
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>产品业务流程约束配置</span>
			</div>
			<div class="">
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span='8'>A端业务流程名称</Col>
						<Col :span='8'>Z端业务流程名称</Col>
						<Col :span='8'>约束类型</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in RelRstrCfgList" v-if="item.actType != 'DEL'" :key="index">
						<Col :span='8'>
							{{item.aServiceOfferName}}
						</Col>
						<Col :span='8'>
							{{item.zServiceOfferName}}
						</Col>
						<Col :span='8'>
							{{item.rstrType == '1000' ? '禁止' : item.rstrType == '2000' ? '提示' : ''}}
						</Col>
					</Row>

					<Row class="app__data-none" v-show="RelRstrCfgList.length == 0">
						<span>对不起，暂无数据</span>
					</Row>
				</div>
			</div>

			<!--产品状态服务提供关系约束配置-->
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>产品状态业务流程约束配置</span>
			</div>
			<div class="">
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span='6'>业务流程名称</Col>
						<Col :span='5'>业务流程编码</Col>
						<Col :span='4'>产品状态</Col>
						<Col :span='3'>约束类型</Col>
						<Col :span='3'>停机类型</Col>
						<Col :span='3'>提示信息</Col>
					</Row>

					<Row class="app__table-item" v-for="(item,index) in StatusServRstrCfgList" v-if="item.actType != 'DEL'" :key="index">
						<Col :span='6'>
							{{item.serviceOfferName}}
						</Col>
						<Col :span='5'>
							{{item.serviceOfferNbr}}
						</Col>
						<Col :span='4'>
							{{item.prodStatusCd == '1000' ? '有效' : item.prodStatusCd == '1100' ? '无效' : item.prodStatusCd == '1200' ? '未生效' : item.prodStatusCd == '1300' ? '已归档' : ''}}
							</Select>
						</Col>
						<Col :span='3'>
							{{item.rstrType == '1000' ? '禁止' : item.rstrType == '2000' ? '提示' : ''}}
						</Col>
						<Col :span='3'>
							{{getStopType(item.stopType)}}
						</Col>
						<Col :span='3'>
							{{item.promptMsg}}
						</Col>
					</Row>

					<Row class="app__data-none" v-show="isNoExistVaild(StatusServRstrCfgList)">
						<span>对不起，暂无数据</span>
					</Row>
				</div>
			</div>
	</Scroll>
	</div>
</template>

<script type="text/javascript">
	export default{
        props:{
            componentData:{}
        },
		data(){
			return{
				pageFollObj: {
					pageIndex: 1,
					pagecount: 1,
					pageSize: 10
				},
				productDialogSize:{
					size: 60,
					min: 300,
					max: 400
				},
				pageFollObj: {
					pageIndex: 1,
					pagecount: 1,
					pageSize: 10
				},
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 0      // 总条数
                },
				serverList:[],//服务提供列表
				serverBox:[],//服务提供
				followCheck:[],//根产品列表
				isDialogShow: false,
				serachServiceOfferName: "",
				serachStandardCd: "",
				prodServiceOfferRels: [],
				tabList: [],
				AddProductType: "ADD",
				prodServiceRelId: "",
				//				prodId: '',
				serviceOfferId: "",
				staff: 2222,
				areaSelectedOpen: false, // 是否展开
				prodServRelRstrCfgs: [],
				levelInputSel: [3, 4],
				RelRstrCfgList: [],
				AddRelRstrCfgType: "ADD",
				prodStatusServRstrCfgs: [],
				StatusServRstrCfgList: [],
				AddStatusServRstrCfgType: "ADD",
				cfgId: 0,
				areaSelectedOpen: false, // 是否展开
				dialogVisible: false,
				AdialogTitle: "",
				ZdialogTitle: "",
				dialogTitle: "",
				tablePopupFlag: "A",
				index: 0,
				AserverNameData: [],
				ZserverNameData: [],
				serverSpecsSelTemp: [],
				stateServerData: [],
				serverTreeObj:'',
				serviceObj:{
					tabObj:'',
					serviceOfferId:'',
					serviceOfferName:'',
					followObj:[],
					follow:'',
					paymentMode:[]
				},
				tabList:[],
				selStopTypeArray: [],
				curCopyObj: {},
				followObj: {},
				followList: [],
				delList:[],//删除暂存
                delType:'',
                serverOfferData:{}
			}
		},
		watch: {
				componentData: function(val, oldval) {
					this.tabList = [];
					this.RelRstrCfgList = [];
					this.StatusServRstrCfgList = [];
					this.getData();
				},
		},
		mounted() {
			this.getData();
		},
		methods:{
			getStopType(type) {
	            switch (type) {
	                case "100000":
	                    return "申请停机";
	                case "110000":
	                    return "挂失停机";
	                case "120000":
	                    return "停机保号";
	                case "130000":
	                    return "欠费停机";
	                case "130001":
	                    return "欠费单停";
	                case "130002":
	                    return "欠费双停";
	                case "140000":
	                    return "预拆机停机";
	                case "150000":
	                    return "违章停机";
	                case "160000":
	                    return "数据异常停机";
	                case "170000":
	                    return "局方原因停机";
	                case "150001":
	                    return "非实名违章单停";
	                case "150002":
	                    return "非实名违章双停";
	                case "150003":
	                    return "一证超五卡不合规单停";
	                case "150004":
	                    return "一证超五卡不合规双停";
	                case "200000":
	                    return "去激活停机";
	                case "200001":
	                    return "测试期停机";
	                default:
	                    return "";
	            }
	        },
			getData() {
				this.$axios
					.post(this.$api.QryOrdProdServiceOfferRel, {
						prodId: this.componentData.prodId,
						prodAttrId: "",
						scopeInfos: [
						{
							scope: "prodServiceOfferRel"
						},
						{
							scope: "prodServRelRstrCfgList"
						},
						{
							scope: "prodStatusServRstrCfgList"
						}
						]
					})
					.then(res => {
					this.prodServiceOfferRels = res.data.prodServiceOfferRelList
						.prodServiceOfferRels
						? res.data.prodServiceOfferRelList.prodServiceOfferRels
						: [];
					for (let val of this.prodServiceOfferRels) {
						let tabObj = {
							prodNbr: val.prodNbr,
							actType: "kIP",
							applyRegionId: val.applyRegionId,
							prodId: val.prodId,
							prodName: val.prodName,
							remark: val.remark,
							prodServiceRelId: val.prodServiceRelId,
							serviceOfferId: val.serviceOfferId,
							serviceOfferName: val.serviceOfferName,
							serviceOfferNbr: val.serviceOfferNbr,
							paymentMode: val.paymentMode.split('|'),
							followProdName: val.followProdName,
							followProdId: val.followProdId,
							statusCd: val.statusCd,
							staff: val.staff,
							serFrom: "net"
						};
						this.tabList.push(tabObj);
					}
					this.prodServRelRstrCfgs = res.data.prodServRelRstrCfgList
						.prodServRelRstrCfgs
						? res.data.prodServRelRstrCfgList.prodServRelRstrCfgs
						: [];
					for (let val of this.prodServRelRstrCfgs) {
						let RelRstrCfgObj = {
							aServiceOfferId: val.aServiceOfferId,
							aServiceOfferName: val.aServiceOfferName,
							aServiceOfferNbr: val.aServiceOfferNbr,
							actType: "KIP",
							applyRegionId: val.applyRegionId,
							prodServiceRelRulId: val.prodServiceRelRulId,
							prodId: val.prodId,
							remark: val.remark,
							rstrType: val.rstrType,
							zServiceOfferId: val.zServiceOfferId,
							zServiceOfferName: val.zServiceOfferName,
							zServiceOfferNbr: val.zServiceOfferNbr,
							serFrom: "net"
						};
						this.RelRstrCfgList.push(RelRstrCfgObj);
					}

					this.prodStatusServRstrCfgs = res.data.prodStatusServRstrCfgList
						.prodStatusServRstrCfgs
						? res.data.prodStatusServRstrCfgList.prodStatusServRstrCfgs
						: [];
					for (let val of this.prodStatusServRstrCfgs) {
						let prodStatusServRstrCfgObj = {
							cfgId: val.cfgId,
							actType: "KIP",
							applyRegionId: val.applyRegionId,
							prodId: val.prodId,
							prodStatusCd: val.prodStatusCd,
							promptMsg: val.promptMsg,
							rstrType: val.rstrType,
							serviceOfferId: val.serviceOfferId,
							serviceOfferName: val.serviceOfferName,
							serviceOfferNbr: val.serviceOfferNbr,
							stopType: val.stopType,
							serFrom: "net"
						};
						this.StatusServRstrCfgList.push(prodStatusServRstrCfgObj);
					}
					if (res.data.success == true) {
					} else {
						this.$message.error({ message : res.data.msg })
					}
				});
			},
			isNoExistVaild(arr) {
				let arrTemp = arr.filter(item => item.actType != "DEL");
				return arrTemp == 0;
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
			}
		}
	}
</script>

<style scoped lang="scss">
.flow {
  width: 100%;
  height: 100%;
  padding: 0 20px !important;
		.selectbtn{
			float: right;
			margin-top: 15px;
		}

  .a-l-sel{
		border-top: 1px solid #dadada;
		.a-l-top{
			text-align: left;
			font-weight: bold;
			height: 30px;
			line-height: 30px;
			color: #b6de8f;
		}

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
		.f_title {
			display: flex;
			height: 50px;
			line-height: 50px;
			justify-content: space-between;
			font-size: 14px;
			color: $mainColor;
			padding-left: 30px;
		}
	}

.f-dialog{
	padding: 20px 10px;
	.search{
		width: 300px;
		margin-bottom:20px;
	}
}

.stop-type-list {
	padding: 5px 5px;
  	font-size: 0.12rem;
	.s-t-all {
		padding: 5px 10px;
		cursor: pointer;
		border: 1px solid #dadbdf;
		border-radius: 5px;

		&.active {
		color: $mainColor;
		border: 1px solid $mainColor;
		}

		&:hover {
		border: 1px solid $mainColor;
		}
	}

	ul {
		display: flex;
		flex-wrap: wrap;

		li {
		padding: 5px 10px;
		cursor: pointer;
		border: 1px solid #dadbdf;
		margin: 10px 10px 0 0;
		border-radius: 5px;

			&.active {
				color: $mainColor;
				border: 1px solid $mainColor;
			}

			&:hover {
				border: 1px solid $mainColor;
			}
		}
	}
}
/*选择付费弹框*/
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
				background-image: url("./images/info-yes.png");
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
				background-image: url("./images/info-yes.png");
				background-size: 100% 100%;
				float: left;
				margin-top: 6px;
				margin-left: 6px;
			}
		}
	}
}
.treecenter{
	margin-left:100px;
}
.blue-font span{
	color: $mainColor !important;
	cursor: pointer;
}
</style>

<style>
.picker-validate-error input{
	border: 1px solid #f1886b !important;
}
.validate-error  input{
	border: 1px solid #f1886b !important;
}
.tree_table{text-align:center;}

</style>
