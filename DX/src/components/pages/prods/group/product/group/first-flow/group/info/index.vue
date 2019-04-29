<template>
	<div class="basic">

		<Scroll  :isShowRight="false" ref="scroll">
            <!--头部-->
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>基本信息</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
				<Row>
					<Col :span='7'>
							<FormItem labelText="产品名称：">
								{{productObj.prodName}}
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="产品集团编码：">
								{{productObj.prodNbr}}
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="产品本地编码：">
								{{productObj.prodLocalNbr}}
							</FormItem>
					</Col>
				</Row>

				<Row>
					<Col :span='7'>
							<FormItem labelText="管理级别：">
								{{productObj.manageGrade == '10' ? '集团级' : productObj.manageGrade == '11' ? '省级' : productObj.manageGrade == '7' ? '本地网级' : productObj.manageGrade == '13' ? '海外级' : productObj.manageGrade == '14' ? '两级共管' : ''}}
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="产品功能类型：">
								{{productObj.prodFuncType == '101' ? '接入类产品' : productObj.prodFuncType == '102' ? '功能类产品' : productObj.prodFuncType == '103' ? '内容类产品' : productObj.prodFuncType == '104' ? '资源类产品' : productObj.prodFuncType == '105' ? '服务类产品' : '其他类'}}
							</FormItem>
					</Col>

					<Col :span='7' :offset="1">
							<FormItem labelText="计费产品分类：">
								{{productObj.billProdType == '1000' ? '接入类产品' : productObj.billProdType == '2000' ? '单产品功能类产品' : productObj.billProdType == '2100' ? '组合功能类产品' : productObj.billProdType == '3000' ? '内容类产品' : productObj.billProdType == '4000' ? '资源类产品' : productObj.billProdType == '5000' ? '其他产品' : productObj.billProdType == '6000' ? '服务类产品' : ''}}
							</FormItem>
					</Col>
				</Row>

				<Row>
					<Col :span='7'>
							<FormItem labelText="产品主附类型：">
								{{productObj.prodUseType == '1000' ? '主' : productObj.prodUseType == '2000' ? '附' : productObj.prodUseType == '3000' ? '并存' : ''}}
							</FormItem>
					</Col>

					<Col :span='7' :offset="1">
							<FormItem labelText="生效时间：">
								{{productObj.expDate | date}}
							</FormItem>
					</Col>

					<Col :span='7' :offset="1">
							<FormItem labelText="失效时间：">
								{{productObj.effDate | date}}
							</FormItem>
					</Col>
				</Row>

				<Row>
					<Col :span='7'>
							<FormItem labelText="产品构成类型：">
								{{productObj.prodCompType == '10' ? '原子产品' : productObj.prodCompType == '11' ? '产品组合' : productObj.prodCompType == '7' ? '组合产品' : productObj.prodCompType == '13' ? '群组产品' : ''}}
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="目录位置：">
								{{catalogEnd.catalogItemName}}
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="是否独立销售：">
								{{productObj.ifIndependentSale == '1000' ? '独立销售品' : productObj.ifIndependentSale == '2000' ? '捆绑销售品' : ''}}
							</FormItem>
					</Col>
				</Row>

				<Row>
					<Col :span='7'>
							<FormItem labelText="上架系统："  >
								<ul class="selected" :class="{open:systemSelectedOpen}">
								<li v-for="(item,index) in systemEnd" :key="index">{{item.platName}}
									<i class="el-icon el-icon-close"></i>
								</li>
								</ul>
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="版本：">
								{{productObj.version}}
							</FormItem>
					</Col>
					<Col :span='7' :offset="1">
							<FormItem labelText="产品ID：">
								{{productObj.prodId}}
							</FormItem>
					</Col>

				</Row>
                <Row>
                    <Col :span='24'>
                            <FormItem labelText="产品描述："  >
                            	{{productObj.prodDesc}}
                            </FormItem>
                    </Col>
                </Row>
			</Form>

            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>产品扩展信息</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
					<Row>
						<Col :span='7'>
								<FormItem labelText="设备号获取方式：">
									{{productObj.productExt.accNbrAcquisitionMode == '1000' ? '通过订单行项目录入' : productObj.productExt.accNbrAcquisitionMode == '2000' ? '号码选占' : productObj.productExt.accNbrAcquisitionMode == '3000' ? '后端完工返回生成' : ''}}
								</FormItem>
						</Col>

						<Col :span='7' :offset="1">
								<FormItem labelText="是否前台代缴费：">
									{{productObj.productExt.ifFrontDeskPay == '1' ? '是' : productObj.productExt.ifFrontDeskPay == '0' ? '否' : ''}}
								</FormItem>
						</Col>

						<Col :span='7' :offset="1">
								<FormItem labelText="是否独立安装：">
									{{productObj.productExt.ifIndependInstall == '1' ? '是' : productObj.productExt.ifIndependInstall == '0' ? '否' : ''}}
								</FormItem>
						</Col>
					</Row>

					<Row>
						<Col :span='7'>
								<FormItem labelText="是否独立开账：">
									{{productObj.productExt.ifIndependAccount == '1' ? '是' : productObj.productExt.ifIndependAccount == '0' ? '否' : ''}}
								</FormItem>
						</Col>
						<Col :span='7' :offset="1">
								<FormItem labelText="是否作为资产跟踪：">
									{{productObj.productExt.ifAssetTracking == '1' ? '是' : productObj.productExt.ifAssetTracking == '0' ? '否' : ''}}
								</FormItem>
						</Col>
                        <Col :span='7' :offset="1">
								<FormItem labelText="是否发送IBP：">
									{{productObj.productExt.isSendIbp == '1' ? '是' : productObj.productExt.isSendIbp == '0' ? '否' : ''}}
								</FormItem>
						</Col>
					</Row>

			</Form>

            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>平台信息</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
					<Row>
                        <Col :span='7'>
                            <FormItem labelText="平台机房物理地点：">
                            	{{productObj.productExt.platComputerAdress}}
                            </FormItem>
                        </Col>
                        <Col :span='7' :offset="1">
                            <FormItem labelText="平台厂商：">
                            	{{productObj.productExt.platVendor}}
                            </FormItem>
                        </Col>
                        <Col :span='7' :offset="1">
                            <FormItem labelText="平台能力管理：">
                            	{{productObj.productExt.platCapabilityManage}}
                            </FormItem>
                        </Col>
                    </Row>
                 <Row>
                    <Col :span='7'>
                        <div class="input-container">
                        <FormItem labelText="平台名称：">
                        	{{productObj.platName}}
                        </FormItem>
                        </div>
                    </Col>
                    <Col :span='7' :offset="1">
                    <div class="input-container">
                        <FormItem labelText="平台系统编码：">
                        	{{productObj.platSysNbr}}
                        </FormItem>
                    </div>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="平台系统ID：">
                        	{{productObj.platId}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span='7'>
                        <FormItem labelText="人工工单处理单位：">
                        	{{productObj.productExt.artificialTreatment}}
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="业务运营单位：">
                        	{{productObj.productExt.businessOpertation}}
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="平台运维单位：">
                        	{{productObj.productExt.platPeration}}
                        </FormItem>
                    </Col>
                </Row>
			</Form>

            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>计费账务</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
                <Row>
                    <Col :span='7'>
                            <FormItem labelText="计费模式：">
                            	{{productObj.productExt.billingModel}}
                            </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="采集点说明：">
                        	{{productObj.productExt.acquisitionPointDesc}}
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="批价方式：">
                        	{{productObj.productExt.pricingMethod}}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col :span='7'>
                        <FormItem labelText="采集方式和调度：">
                        	{{productObj.productExt.acquisitionModeFrequency}}
                        </FormItem>
                    </Col>
                </Row>
			</Form>

            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>综合结算</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
				<Row>
                    <Col :span='7'>
                    <FormItem labelText="结算要求：">
                    	{{productObj.productExt.settlementRequirement}}
                    </FormItem>
                    </Col>
                 </Row>
			</Form>

            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>管理流程</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
				<Row>
                    <Col :span='7'>
                        <FormItem labelText="欠费催账流程：">
                        	{{productObj.productExt.arrearProcess}}
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="投诉处理流程：">
                        	{{productObj.productExt.complaintHabdProcess}}
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="售后服务流程：">
                        	{{productObj.productExt.altersaleProcess}}
                        </FormItem>
                        </Col>
                </Row>

                <Row>
                    <Col :span='7'>
                            <FormItem labelText="收入归属及分摊方法：">
                            	{{productObj.productExt.attributionApportionment}}
                        </FormItem>
                    </Col>
                </Row>
			</Form>
            <div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>统计</span>
			</div>
			<Form labelWidth="125px" labelAlign="left">
				<Row>
                    <Col :span='7'>
                        <div class="input-container">
                            <FormItem labelText="相关分析统计：">
                            	{{productObj.productExt.analysisStstistics}}
                            </FormItem>

                        </div>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="合作单位结算方法：">
                        	{{productObj.productExt.settlementMethod}}
                        </FormItem>
                    </Col>
                    <Col :span='7' :offset="1">
                        <FormItem labelText="产品适用区域："    >
                            <ul class="selected" :class="{open:areaSelectedOpen}">
                            <li v-for="(area,index) in areaEnd" :key="index">{{area.regionName}}
                            </li>
                        </ul>
                        </FormItem>
                    </Col> 
                </Row>
			</Form>
		</Scroll>
		</div>
</template>

<script type="text/javascript">
export default {
    props:{
      componentData:{},
      mainProdId: {
        type: String,
        default: ""
        }
    },
    data() {
        return {
        productObj: {
            prodUseType:'',
            prodId:'',
            prodFuncType:'',
            ifIndependentSale:'',
            productExt: {}
        },
        allSystem: [
        ],
        productExt: {
            accNbrAcquisitionMode: "",
            ifFrontDeskPay: "",
            ifIndependInstall: "",
            ifIndependAccount: "",
            ifAssetTracking: "",
            isSendIbp:'',
            platComputerAdress: "",
            platVendor: "",
            platCapabilityManage: "",
            platPeration: "",
            artificialTreatment: "",
            businessOpertation: "",
            billingModel: "",
            acquisitionPointDesc: "",
            acquisitionModeFrequency: "",
            pricingMethod: "",
            settlementRequirement: "",
            arrearProcess: "",
            complaintHabdProcess: "",
            altersaleProcess: "",
            attributionApportionment: "",
            analysisStstistics: "",
            settlementMethod: ""
        },
        resultShowTip: false,
        catalogSelect: {
            catalogItemId: "",
            catalogItemName: ""
        },
        catalogEnd: {
            catalogItemId: "",
            catalogItemName: ""
        },
        firstCatalogId: "",
        secondCatalogId: "",
        thirdCatalogId: "",
        catalogData: [],

        searchObj: {
            platName: "",
            platSysNbr: ""
        },
        systemPageObj: {
            pageIndex: 1,
            pageSize: 10,
            rowCount: 0
        },
        platId: [],
        systemSelectedOpen: false,
        selectSystem: [], // 选中的编码列表
        systemEnd: [
            //                    {
            //                        platId: 1,
            //                        platName: "W"
            //                    }
        ], // 确定选中的系统
        areaSelectedOpen: false, // 是否展开
        applyRegionId: [], // 传给后台的的地域参数
        selectArea: [], // 选择的地域
        allArea: [
            {
            // 所有的地域
            applyRegionId: 8310101,
            regionName: "黄浦区"
            },
            {
            applyRegionId: 8310104,
            regionName: "徐汇区"
            },
            {
            applyRegionId: 8310105,
            regionName: "长宁区"
            },
            {
            applyRegionId: 8310106,
            regionName: "静安区"
            },
            {
            applyRegionId: 8310107,
            regionName: "普陀区"
            },
            {
            applyRegionId: 8310108,
            regionName: "闸北区"
            },
            {
            applyRegionId: 8310109,
            regionName: "虹口区"
            },
            {
            applyRegionId: 8310110,
            regionName: "杨浦区"
            },
            {
            applyRegionId: 8310112,
            regionName: "闵行区"
            },
            {
            applyRegionId: 8310113,
            regionName: "宝山区"
            },
            {
            applyRegionId: 8310114,
            regionName: "嘉定区"
            },
            {
            applyRegionId: 8310115,
            regionName: "浦东新区"
            },
            {
            applyRegionId: 8310116,
            regionName: "金山区"
            },
            {
            applyRegionId: 8310117,
            regionName: "松江区"
            },
            {
            applyRegionId: 8310118,
            regionName: "青浦区"
            },
            {
            applyRegionId: 8310120,
            regionName: "奉贤区"
            },
            {
            applyRegionId: 8310230,
            regionName: "崇明县"
            }
        ],
        areaEnd: [
            //                    {
            //                        applyRegionId: 8310115,
            //                        regionName: '浦东新区'
            //                    }
            ] // 确定选中的地域
        };
    },
    watch: {
        componentData:function(val,newValue){
			console.log(val,666)
			console.log(newValue,999)
            this.findMainData(val.prodId)
            this.productObj.prodId = val.prodId;
            this.$validator.reset();
        }
    },
    mounted() {
		console.log(this.componentData,78787)
        this.findMainData();
        this.getAreaEnd();
        this.productObj.prodId = this.componentData.prodId;
    },
    methods: {
        dateTest(){
            if(this.productObj.effDate&&this.productObj.expDate){
                let effDate = new Date(this.productObj.effDate).getTime();
                let expDate = new Date(this.productObj.expDate).getTime();
                if(effDate - expDate > 0){
                    return true;
                }else{
                    return false;
                }
            }
        },
        findMainData(prodId = '') { // 查询基本信息
            this.$axios
            .get(this.$api.replace(this.$api.QryOrdProductBasicInfo, ['{prodId}'], [this.componentData.prodId]),{
            params: {
//              prodId: prodId || this.componentData.prodId
            }
            })
            .then(res => {
            if (res.data.success == true) {
                if (!res.data.productBasicIfo.productExt) {
                res.data.productBasicIfo.productExt = this.productExt;
                }
                this.productObj = res.data.productBasicIfo;

                if (this.mainProdId != this.componentData.prodId) {
                this.productObj.ifIndependentSale =
                    this.productObj.ifIndependentSale == "1000" ? "1000" : "2000";
                }

                this.productObj.prodUseType = res.data.productBasicIfo.prodUseType;
                this.productObj.expDate = this.productObj.expDate
                ? this.productObj.expDate
                : "2050-12-31";

                if (res.data.productBasicIfo.prodRegionRels) {
                this.areaEnd = res.data.productBasicIfo.prodRegionRels;
                }
                for(let ele of this.areaEnd){
                	for(let val of this.allArea){
                		if(ele.applyRegionId == val.applyRegionId){
                			ele.regionName = val.regionName
                		}
                	}
                }
                if (res.data.productBasicIfo.prodUpperPlats) {
                this.systemEnd = res.data.productBasicIfo.prodUpperPlats;
                }
                if (res.data.productBasicIfo.prodCatalogLocations.length>0) {
                this.catalogEnd =
                    res.data.productBasicIfo.prodCatalogLocations[0];
                this.catalogEnd.catalogItemName =
                    res.data.productBasicIfo.prodCatalogLocations[0].catalogItemName;
                }
            } else {
                this.$message.error({ message : res.data.msg})
            }
            })
            .then(res => {
                // this.$message.error({ message : res.data.msg})
            });
        },
        getAreaEnd() {// 根据applyRegionId获取areaEnd
            for (let i = 0; i < this.allArea.length; i++) {
                if (
                this.applyRegionId.filter(
                    obj => obj == this.allArea[i].applyRegionId
                )[0]
                ) {
                this.areaEnd.push(this.allArea[i]);
                }
            }
        }
    }
};
</script>

<style scoped lang="scss">
.basic {
  width: 100%;
  height: 100%;
  padding: 0 20px !important;


   /*已选*/
    .selected {
      height: 30px;
      min-height: 30px;
      line-height: 30px;
      /*border: 1px solid #dcdfe6;*/
      border-radius: 4px;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
       img {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 6px;
        right: 4px;
        cursor: pointer;
      }

      li {
        display: inline-block;
        line-height: 12px;
        padding: 2px 4px;
        margin-left: 4px;
        background-color: #f5fafd;
        border: solid 1px #23c9ff;
        border-radius: 4px;
        font-size: 12px;
        color: #23c9ff;

        .el-icon-close:before {
          content: "\E60F";
          color: #23c9ff;
          cursor: pointer;
        }
      }
    }
}
/*选择地域弹框*/
.i-area {
  padding: 10px 0;

  .i-title {
    border-bottom: solid 1px #f0f0f0;

    span {
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
    button {
      float: right;
      width: 60px;
      height: 24px;
      line-height: 22px;
      font-size: 12px;
      color: $mainColor;
      background-color: white;
      border-radius: 4px;
      border: solid 1px $mainColor;
      outline: none;
      cursor: pointer;

      i {
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

  .i-content {
    padding-top: 16px;
    padding-bottom: 10px;

    .area {
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
    label {
      position: absolute;
      left: 0;
      top: 0;
      height: 30px;
      line-height: 30px;
      width: 130px;
      text-align: right;
      color: #666666;
    }

    .activeArea {
      color: $mainColor;
      border: solid 1px $mainColor;

      i {
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

</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  top: -100% !important;
}

  .icon {
		display: inline-block;
		width: 14px;
		height: 14px;
		background-size: 100% 100%;
		cursor: pointer;
	}
	.icon-del {
		width: 12px;
		height: 12px;
		background-image: url("./../../images/delete.png");
	}

	.icon-yes {
		width: 12px;
		height: 12px;
		background-image: url("./../../images/choose.png");
	}

	.icon-plus{
		width: 12px;
		height: 12px;
		background-image: url("./../../images/plus.png");
	}
</style>
