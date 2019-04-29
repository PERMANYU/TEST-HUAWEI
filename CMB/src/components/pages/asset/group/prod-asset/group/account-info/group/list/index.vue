<template>
	<div class="account-info">
		<Scroll class="app__table" 
			:isShowBottom="true" 
			fixedLeftClassName="app__data-none" 
			fixedRightClassName="app__table-right"
			ref="scroll">

			<Row class="app__table-thead" inline>
                <Col :width="item.width" 
                	:value="item" 
                	v-for="(item,index) in tableConfig" 
                	:key="index">

                    <span>{{item.name}}</span>
                </Col>
                <Col :width="90" class="app__table-right">
                	<span class="">操作</span>
                </Col>
			</Row>
			<Row :class="['app__table-item ']" 
				v-for="(item,index) in listData" 
				:key="index" 
				inline>

				<Col :width="tableItem.width" 
					:title="item[tableItem.param]" 
					v-for="(tableItem,tableIndex) in tableConfig" 
					:key="tableIndex">

					<span v-if="item[tableItem.param]">
					    {{getPostMethod(tableItem.name,item[tableItem.param])}}
					</span>
					<span v-else-if="item.invFormatCustomizeRel && item.invFormatCustomizeRel.length">
					    {{getPostMethod(tableItem.name,item.invFormatCustomizeRel[0][tableItem.param])}}
					</span>
				</Col>
				<Col :width="90" class="app__table-right">
					<span class="operation" @click="userRightBtnControl.detailBtn ? detailClick(item) : ''">详情</span>
				</Col>
			</Row>
			<div v-if="!listData.length" class="app__data-none">
				<span>暂无数据</span>
			</div>
		</Scroll>
		<div class="page" v-show="listData.length">
			<Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange"></Pagination>
		</div>
	</div>
</template>

<script type="text/javascript">
	import filter from "@/filter/index.js";
	export default{
		props: {
			componentData: {}
		},
		data(){
			return{
				pageInfo:{
					pageIndex: 1,
					pageSize: 20
				},
				tableConfig: [{
					name: "帐户名称",
					param: "acctName",
					width: 180
				},{
					name: "分账序号",
					param: "acctCd",
					width: 180
				},{
					name: "帐单寄达地址",
					param: "contactAddr",
					width: 180
				},{
					name: "帐单联系人电话",
					param: "mobilePhone",
					width: 120
				},{
					name: "帐单联系人姓名",
					param: "contactName",
					width: 120
				},{
					name: "催欠标识",
					param: "collectionCd",
					width: 120
				},{
					name: "违约金标识",
					param: "lateFeeFlag",
					width: 120
				},{
					name: "帐户状态",
					param: "statusCd",
					width: 120
				},{
					name: "下次开帐日期",
					param: "billEffectiveDate",
					width: 120
				},{
					name: "帐单介质",
					param: "postMethod",
					width: 120
				},{
					name: "帐单联系人传真",
					param: "fax",
					width: 120
				},{
					name: "联系人EMAlIL地址",
					param: "eMail",
					width: 120
				},{
					name: "帐务服务信息邮件接收地址",
					param: "accounMail",
					width: 180
				},{
					name: "帐户产品类型",
					param: "bpType",
					width: 120
				},{
					name: "客户标识",
					param: "custId",
					width: 120
				},{
					name: "帐户区局",
					param: "firstbureau",
					width: 120
				},{
					name: "是否发送短信帐单",
					param: "ebillSmsNoticeFlg",
					width: 120
				},{
					name: "接收应付额短信号码",
					param: "ebillSmsServerId",
					width: 180
				},{
					name: "打印电子发票",
					param: "einvoiceFlg",
					width: 120
				},{
					name: "是否可开具专票",
					param: "spcInvFlg",
					width: 120
				},{
					name: "帐务中心开户行支付行号",
					param: "paidBankNum",
					width: 180
				},{
					name: "税务号",
					param: "taxNumber",
					width: 120
				},{
					name: "税务地址",
					param: "taxAddress",
					width: 120
				},{
					name: "税务电话",
					param: "taxPhone",
					width: 120
				},{
					name: "税务开户银行名称",
					param: "taxBankName",
					width: 120
				},{
					name: "付费通电子邮件帐单接收地址",
					param: "fftEmail",
					width: 180
				},{
					name: "付费通电子帐单",
					param: "fftType",
					width: 130
				},{
					name: "税务开户银行帐户",
					param: "taxBankNumber",
					width: 120
				}],
				listData:[],
	            postMethodArray: [],
	            paymentArray: [],
	            collectionCdArray: [],
	            ebillSmsNoticeFlgArray: [{ //是否发送短信帐单
                    label: "是",
                    value: 1
                },{
                    label: "否",
                    value: 0
                }],
                accountStatusCd: [
	                { attrValueName: "有效", attrValue: 1 },
	                { attrValueName: "失效", attrValue: 2 },
	                { attrValueName: "即将生效", attrValue: 3 },
	                { attrValueName: "即将失效", attrValue: 4 },
	                { attrValueName: "已归档", attrValue: 5 }
	            ],
	            userRightBtnControl: {          // 权限按钮控制
                    detailBtn: false,
                },

			}

		},
		beforeCreate() {
	        this.$getjsons.getJson("ACC-C-0199").then(res => {
	            this.postMethodArray = res.data.attrSpecDetail.attrValueList;
	        });
	        this.$getjsons.getJson("OTC-0001").then(res => {
	            this.paymentArray = res.data.attrSpecDetail.attrValueList;
	        });
	        this.$getjsons.getJson("ACC-C-9001").then(res => {
	            this.collectionCdArray = res.data.attrSpecDetail.attrValueList;
	        });
	    },
		mounted(){
            // 循环权限数据
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100627':
	                    this.userRightBtnControl.detailBtn = true;
	                    break;
                    default:
                        break;
                }
            })
        },
		methods:{
			init(item){
				this.getAccountList();
			},
			getAccountList(pageIndex = 1){ //获取账户列表
				this.$axios.get(this.$api.AccountGetList,{
					params:{
						custId: this.componentData.ownerCustId,
						accNum: this.componentData.accNum,
						pageNum: pageIndex,
						pageSize: 20,
						sort: 'acctId',
						sortType: 'ASC'
					}
				}).then(res => {
					if(res.data.pageNumber > res.data.countPage){
						this.$message.error({ message: '暂无数据' });
					}else{
						this.listData = res.data.result;
						this.pageInfo.pageIndex = res.data.pageNumber;

						this.$nextTick( () => {
							this.$refs.scroll.init();
		            		this.$emit('initEnd')
		            	})
					}
				}).catch(err => {
					this.$message.error({ message: err.response.data.message });
				})
			},
			detailClick(item) { //查看详情
	            this.$emit('componentView','info',item)
	        },
        	getPostMethod(name, code) { //返回值转换
	            if (name == "帐单介质") {

	            	let postMethod = this.postMethodArray.find(item => item.attrValue == code);
	                return postMethod ? postMethod.attrValueName : "";
	            } else if (name == "是否发送短信帐单" || name == "违约金标识" || name == "打印电子发票" || name == "是否可开具专票") {

	            	let ebillSmsNoticeFlg = this.ebillSmsNoticeFlgArray.find(item => item.value == code);
	                return ebillSmsNoticeFlg ? ebillSmsNoticeFlg.label : "无";
	            } else if (name == "催欠标识") {

	            	let collectionCd = this.collectionCdArray.find(item => item.attrValue == code);
	                return collectionCd ? collectionCd.attrValueName : "";
	            } else if (name == "帐户状态") {

	            	let accountStatusCd = this.accountStatusCd.find(item => item.attrValue == code);
	                return accountStatusCd ? accountStatusCd.attrValueName : "无";
	            } else if (name == "下次开帐日期") {

	                return code ? filter.filters.getLocalTime(code) : "无";
	            } else {

	                return code ? code : "空";
	            }
	        },
	        pageChange(value){
	        	this.getAccountList(value);
	        }
		}
	}
</script>

<style scoped lang="scss">

	.app__data-none{
		background-color: #fff;
	}

	.operation{
		cursor: pointer;
	}

	.page{
		height: 50px;
		background-color: #fff;
	}
</style>