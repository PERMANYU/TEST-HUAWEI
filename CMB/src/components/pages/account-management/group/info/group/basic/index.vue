<template>
	<div class="basic">
		<Row class="header">
			<Col :span="2">
				<img src="./images/kehu.png">
			</Col>
			<Col :span="4">
				<span class="h-name">{{userData.acctName}}</span>
			</Col>
			<Col :span="4" class="h-line" >

			</Col>
			<Col :span="7">
				<Row class="app__ellipsis">
					<Col>
						<span class="app__lt-label">客户标识：</span>
						<span class="app__lt-text">{{userData.custId}}</span>
					</Col>
				</Row>
				<Row class="app__ellipsis">
					<Col>
						<span class="app__lt-label">分帐序号：</span>
						<span class="app__lt-text">{{userData.acctCd}}</span>
					</Col>
				</Row>
			</Col>
			<Col :span="7">
				<Row class="app__ellipsis">
					<Col>
						<span class="app__lt-label">帐户状态：</span>
						<span class="app__lt-text">{{getPostMethod('帐户状态',userData.statusCd)}}</span>
					</Col>
				</Row>
				<Row class="app__ellipsis">
					<Col>
						<span class="app__lt-label">帐单介质：</span>
						<span class="app__lt-text">{{getPostMethod('帐单介质',invFormatCustomizeRel.postMethod)}}</span>
					</Col>
				</Row>
			</Col>
		</Row>

		<div class="info">
			<div class="app__title-1">
				<span class="app__title-name">基本信息</span>
			</div>

			<Row>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">账号名称：</span>
					<span class="app__lt-text">{{userData.acctName || '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">账单介质：</span>
					<span class="app__lt-text">{{getPostMethod('帐单介质',invFormatCustomizeRel.postMethod)}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">是否发送短信账单：</span>
					<span class="app__lt-text">{{getPostMethod('是否发送短信帐单',invFormatCustomizeRel.ebillSmsNoticeFlg)}}</span>
				</Col>
			</Row>

			<Row>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">接收应付额短信号码：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.ebillSmsServerId || '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">客户标识：</span>
					<span class="app__lt-text">{{userData.custId || '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">帐户产品类型：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.bpType || '无'}}</span>
				</Col>
			</Row>


			<Row>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">分帐序号：</span>
					<span class="app__lt-text">{{userData.acctCd || '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">下次开帐日期：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.billEffectiveDate ? getPostMethod('下次开帐日期',invFormatCustomizeRel.billEffectiveDate) : '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">帐户区局：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.firstbureau || '无'}}</span>
				</Col>
			</Row>


			<Row>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">催欠标识：</span>
					<span class="app__lt-text">{{getPostMethod('催欠标识',invFormatCustomizeRel.collectionCd)}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">违约金标识：</span>
					<span class="app__lt-text">{{getPostMethod('违约金标识',invFormatCustomizeRel.lateFeeFlag)}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">付费通电子邮件帐单接受地址：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.fftEmail || '无'}}</span>
				</Col>
			</Row>


			<Row>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">付费通电子帐单：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.fftType || '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">是否可开具专票：</span>
					<span class="app__lt-text">{{getPostMethod('是否发送短信帐单',invFormatCustomizeRel.spcInvFlg)}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">帐户状态：</span>
					<span class="app__lt-text">{{getPostMethod('帐户状态',userData.statusCd)}}</span>
				</Col>
			</Row>

			<div class="app__title-1">
				<span class="app__title-name">账单信息</span>
			</div>

			<Row>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">打印电子发票：</span>
					<span class="app__lt-text">{{getPostMethod('是否发送短信帐单',invFormatCustomizeRel.einvoiceFlg)}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">联系人eMail地址：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.eMail || '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">帐单联系人姓名：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.contactName || '无'}}</span>
				</Col>
			</Row>

			<Row>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">帐单联系人传真：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.fax || '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">帐单联系人电话：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.mobilePhone || '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">帐单寄达地址：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.contactAddr || '无'}}</span>
				</Col>
			</Row>

			<Row>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">帐单打印格式：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.billPrefCd || '无'}}</span>
				</Col>
			</Row>


			<div class="app__title-1">
				<span class="app__title-name">税务信息</span>
			</div>

			<Row>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">税务地址：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.taxAddress || '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">税务开户银行名称：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.taxBankName || '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">税务开户银行帐户：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.taxBankNumber || '无'}}</span>
				</Col>
			</Row>

			<Row>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">税务号：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.taxNumber || '无'}}</span>
				</Col>
				<Col class="app__ellipsis" :span="8">
					<span class="app__lt-label">税务电话：</span>
					<span class="app__lt-text">{{invFormatCustomizeRel.taxPhone || '无'}}</span>
				</Col>
			</Row>

			<div class="app__title-1">
				<span class="app__title-name">支付方案</span>
				<span class="app__btn app__btn-add add-pay-btn" @click="addPaymentPlan" v-if="isAddPayBtn">添加支付方案</span>
			</div>

			<div class="plan">
                <Scroll class="app__table" :isShowBottom="true" fixedTopClassName="app__table-thead" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
                    <Row class='app__table-thead' ref="wid" :inline="true">
                        <Col :width='200'>付费方式</Col>
                        <Col :width='200'>托收银行帐号</Col>
                        <Col :width='200'>托收银行名称</Col>
                        <Col :width='200'>多方协议编号</Col>
                        <Col :width='200'>交换号</Col>
                        <Col :width='200'>支付行号</Col>
                        <Col :width='200'>帐务中心开户银行名称</Col>
                        <Col :width='200'>帐务中心开户银行帐号</Col>
                        <Col :width='200'>帐务中心户名</Col>
                        <Col :width="100" class="app__table-right">操作</Col>
                    </Row>
                    <Row :class="['app__table-item overflow-style']" :inline="true" v-for="(item,index) in addPaymentData" :key="index">
                        <Col :width='200'>
                        {{item.paymentMethodName ? item.paymentMethodName : '空'}}
                        </Col>
                        <Col :width='200'>{{item.extAcctDTO && item.extAcctDTO.payAcctCode ? item.extAcctDTO.payAcctCode : '空'}}</Col>
                        <Col :width='200' :title="item.extAcctDTO && item.extAcctDTO.payAcctName ? item.extAcctDTO.payAcctName : ''">{{item.extAcctDTO && item.extAcctDTO.payAcctName ? item.extAcctDTO.payAcctName : '空'}}</Col>
                        <Col :width='200' :title="item.extAcctDTO && item.extAcctDTO.eftAgreeNum ? item.extAcctDTO.eftAgreeNum : ''">
                        {{item.extAcctDTO && item.extAcctDTO.eftAgreeNum　 ?　item.extAcctDTO.eftAgreeNum　: '空'}}
                        </Col>
                        <Col :width='200'>
                        {{item.extAcctDTO && item.extAcctDTO.exchgNum　 ?　item.extAcctDTO.exchgNum　: '空'}}
                        </Col>
                        <Col :width='200'>
                        {{item.extAcctDTO && item.extAcctDTO.paidBankNum　 ?　item.extAcctDTO.paidBankNum　: '空'}}
                        </Col>
                        <Col :width='200'>
                        {{item.extAcctDTO && item.extAcctDTO.eftZwzxBankName　 ?　item.extAcctDTO.eftZwzxBankName　: '空'}}
                        </Col>
                        <Col :width='200'>
                        {{item.extAcctDTO && item.extAcctDTO.eftZwzxBankNum　 ?　item.extAcctDTO.eftZwzxBankNum　: '空'}}
                        </Col>
                        <Col :width='200'>
                        {{item.extAcctDTO && item.extAcctDTO.eftZwzxName　 ?　item.extAcctDTO.eftZwzxName　: '空'}}
                        </Col>
                        <Col :width="100" class="app__table-right">
                        <span @click="modPayment(item)" v-if="userRightBtnControl.updatePayBtn">修改</span>
                        <span @click="delPayment(item)" v-if="userRightBtnControl.deletePayBtn">删除</span>
                        </Col>
                    </Row>
                    <Row :class="['app__table-item dyWidth']" v-for="item in (7 - addPaymentData.length)" :key="item.id"></Row>
                </Scroll>
            </div>
            <div class="footer">
                <Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @pageChange="pageChange">
                </Pagination>
            </div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
            componentData:{}
        },
		data(){
			return{
				userData: {},
				invFormatCustomizeRel: {},
				addPaymentData: [],
				postMethodArray: [],
				paymentArray:[],
				ebillSmsNoticeFlgArray: [{
					label: "是",
					value: 1
				},{
					label: "否",
					value: 0
				}],
				collectionCdArray: [{
					label: "免催欠",
					value: "免催欠"
				},{
					label: "临时免催欠",
					value: "临时免催欠"
				}],
				billPrefCdArray: [{ //帐单打印格式
					attrValueName: "不邮寄帐单（无附件）",
					attrValue: "不邮寄帐单（无附件）"
				},{
					attrValueName: "不邮寄帐单（有附件）",
					attrValue: "不邮寄帐单（有附件）"
				},{
					attrValueName: "邮寄帐单（无附件）",
					attrValue: "邮寄帐单（无附件）"
				},{
					attrValueName: "邮寄帐单（有附件）",
					attrValue: "邮寄帐单（有附件）"
				},{
					attrValueName: "邮寄帐单（IDC清单）",
					attrValue: "邮寄帐单（IDC清单）"
				},{
					attrValueName: "简打（无附件）",
					attrValue: "简打（无附件）"
				},{
					attrValueName: "简打（有附件）",
					attrValue: "简打（有附件）"
				},{
					attrValueName: "二级科目帐单（无附件）",
					attrValue: "二级科目帐单（无附件）"
				},{
					attrValueName: "二级科目帐单（有附件）",
					attrValue: "二级科目帐单（有附件）"
				}],
				accountStatusCd: [{ //帐户状态 
					attrValueName: "有效", 
					attrValue: 1 
				},{ 
					attrValueName: "失效", 
					attrValue: 2 
				},{ 
					attrValueName: "即将生效", 
					attrValue: 3 
				},{ 
					attrValueName: "即将失效", 
					attrValue: 4 
				},{ 
					attrValueName: "已归档", 
					attrValue: 5 
				}]
			}
		},
		computed: {
			isAddPayBtn(){
				return this.$user.getFuncComps().find(item => item.compCode == 'F-CMB-200103');
			}
		},
		created(){
			this.$getjsons.getJson("OTC-0001").then(res => {
				this.paymentArray = res.data.attrSpecDetail.attrValueList;
			});
			this.$getjsons.getJson("ACC-C-0199").then(res => {

				this.postMethodArray = res.data.attrSpecDetail.attrValueList;

				this.getAccountDetail();
				this.getPayList();

				
			});

			
		},
		methods:{
			getAccountDetail() { //获取账户信息
				this.$axios.get(this.$api.AccountInfo, {
					params: {
						custId: "",
						accNum: "",
						contactAddr: "",
						acctId: this.componentData.acctId
					}
				})
				.then(res => {
					if (res.data) {
						this.userData = res.data[0];
						this.invFormatCustomizeRel = res.data[0].invFormatCustomizeRel[0];
					} else {
						this.$message.error({ message: "请求失败" });
					}
				})
				.catch(err => {
					this.$message.error({ message: err.response.data.message });
				});
			},
			getPayList() { //查询支付方案
				this.$axios.get(this.$api.PaymentPlanGet, {
					params: {
						acctId: this.componentData.acctId
					}
				})
				.then(res => {
					if (res.data) {
						this.addPaymentData = res.data;
					} else {
						this.$message.error({ message: "请求失败" });
					}
				})
				.catch(err => {
					this.$message.error({ message: err.response.data.message });
				});
			},
			//返回值转换
			getPostMethod(name, code) {
				if (name == "帐单介质") {
					let postMethod = this.postMethodArray.filter(item => {
						return item.attrValue == code;
					})[0];
					return postMethod ? postMethod.attrValueName : "";
				} else if (
					name == "是否发送短信帐单" ||
					name == "违约金标识" ||
					name == "打印电子发票" ||
					name == "是否可开具专票"
				) {
					let ebillSmsNoticeFlg = this.ebillSmsNoticeFlgArray.filter(
						item => {
							return item.value == code;
						}
					)[0];
					return ebillSmsNoticeFlg ? ebillSmsNoticeFlg.label : "无";
				} else if (name == "催欠标识") {
					let collectionCdArray = this.collectionCdArray.filter(item => {
					return item.attrValue == code;
				})[0];
					return collectionCdArray ? collectionCdArray.attrValueName : "";
				} else if (name == "帐单打印格式") {
					let billPrefCdArray = this.billPrefCdArray.filter(item => {
						return item.attrValue == code;
					})[0];
					return billPrefCdArray ? billPrefCdArray.attrValueName : "";
				} else if (name == "付费方式") {
					let paymentArray = this.paymentArray.filter(item => {
							return item.attrValue == code;
						})[0];
					return paymentArray ? paymentArray.attrValueName : "无";
				} else if (name == "帐户状态") {
					let accountStatusCd = this.accountStatusCd.filter(item => {
							return item.attrValue == code;
						})[0];
					return accountStatusCd ? accountStatusCd.attrValueName : "无";
				}  else {
					return code ? code : "无";
				}
			},
			//修改支付方案
	        modPayment(item) {
	            this.modPlanObj = {
	                createDate: item.createDate,
	                createStaff: item.createStaff,
	                effDate: item.effDate,
	                expDate: item.expDate,
	                ifOnlinePay: item.ifOnlinePay,
	                payAcctType: item.payAcctType,
	                paymentLimit: item.paymentLimit,
	                paymentLimitType: item.paymentLimitType,
	                paymentMethod: item.paymentMethod,
	                priority: item.priority,
	                statusCd: item.statusCd,
	                statusDate: item.statusDate,
	                updateDate: item.updateDate,
	                updateStaff: item.updateStaff,
	                upperAmount: item.upperAmount,
	                acctId: item.acctId,
	                custId: item.custId,
	                payAcctName: item.extAcctDTO ? item.extAcctDTO.payAcctName : "",
	                payAcctCode: item.extAcctDTO ? item.extAcctDTO.payAcctCode : "",
	                exchgNum: item.extAcctDTO ? item.extAcctDTO.exchgNum : "",
	                eftAgreeNum: item.extAcctDTO ? item.extAcctDTO.eftAgreeNum : "",
	                paidBankNum: item.extAcctDTO ? item.extAcctDTO.paidBankNum : "",
	                eftZwzxBankName: item.extAcctDTO
	                    ? item.extAcctDTO.eftZwzxBankName
	                    : "",
	                eftZwzxBankNum: item.extAcctDTO
	                    ? item.extAcctDTO.eftZwzxBankNum
	                    : "",
	                eftZwzxName: item.extAcctDTO ? item.extAcctDTO.eftZwzxName : "",
	                errorcode: item.errorcode,
	                errormessage: item.errormessage,
	                payAcctId: item.payAcctId,
	                paymentPlanId: item.paymentPlanId,
	                ifContractQuickPay: item.extAcctDTO
	                    ? item.extAcctDTO.ifContractQuickPay
	                    : "",
	                extAcctId: item.extAcctDTO ? item.extAcctDTO.extAcctId : "",
	                acctOwnerOrg: item.extAcctDTO
	                    ? item.extAcctDTO.acctOwnerOrg
	                    : "",
	                acctOwnerOrgBranch: item.extAcctDTO
	                    ? item.extAcctDTO.acctOwnerOrgBranch
	                    : "",
	                payChannel: item.extAcctDTO ? item.extAcctDTO.payChannel : ""
	            };
	            this.$refs.paymentModPlan.show();
	        },

	        //删除支付方案
	        delPayment(item) {
	            this.tipInfo.iconType = 3;
	            this.tipInfo.msg = "确认要删除选择的记录吗？";
	            this.tipInfo.showBtn.clear = true;
	            this.tipInfo.showBtn.save = true;
	            this.$refs.tip.show();
	        },
		}
	}
</script>

<style scoped lang="scss">
	.basic{

		.col{
			padding: 8px 0;
		}

		.header{
			padding: 30px 20px;
			background-color: #fff;
			box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);

			.h-name{
				font-size: 20px;
				font-weight: bold;
				color: $mainColor;
			}

			.h-line{
				height: 80px;
				border-left: 1px dashed #cccccc;
			}
		}

		.info{
			margin-top: 10px;
			padding: 30px 20px;
			background-color: #fff;
			box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);

			.add-pay-btn{
				float: right;
			}
		}

		.plan{
			width: 100%;
			height: 300px;
		}
	}
</style>