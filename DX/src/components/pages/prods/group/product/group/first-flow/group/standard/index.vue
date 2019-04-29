<template>
	<div class="standard">
		<Scroll :isShowRight="true" fixedTopClassName="m-title">
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>产品服务标准</span>
			</div>

			<div class="app__table">
					<Row class='app__table-thead'>
						<Col :span='6'>服务标准编码</Col>
						<Col :span='5'>服务标准名称</Col>
						<Col :span='3'>服务标准值</Col>
						<Col :span='4'>服务标准单位</Col>
						<Col :span='6'>备注</Col>
					</Row>
			</div>
			<div class="app__table">
                <Row class="app__table-item" v-for="(item,index) in standardList" v-if="item.actType != 'DEL'"
                    :key="index">
                    <Col :span='6'>
                        <div class="standardNbr">
                        	{{item.serviceStandardNbr}}
                        </div>
                    </Col>
                    <Col :span='5'>{{item.serviceStandardName ? item.serviceStandardName : "无"}}</Col>
                    <Col :span='3'>
                    	{{item.prodServiceStandardValue}}
                    </Col>
                    <Col :span='4' class="">
                    	{{item.prodServiceStandardUnit == '1000' ? '天' : item.prodServiceStandardUnit == '2000' ? '月' : item.prodServiceStandardUnit == '3000' ? '周' : item.prodServiceStandardUnit == '4000' ? '小时' : ''}}
                    </Col>
                    <Col :span='6'>
                    	{{item.remark}}
                    </Col>
                </Row>
				<Row v-show="!isNoExistVaild(standardList)" :class="['m-item app__table-item']" v-if="standardList.length != 0" v-for="item in (10 - standardList.length)" :key="item.serviceStandardNbr"></Row>
                <Row class="app__data-none" v-show="isNoExistVaild(standardList)">
                    <span>对不起，暂无数据</span>
                </Row>
            </div>
		</Scroll>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			componentData:{}, 
		},
		data(){
			return{
				staff:222,
				searchObj: {
					serviceStandardNbr: "",
					serviceStandardName: ""
				},
				nbrPageObj: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				standardList: [], // 外部产品标准列表
      			nbrAllList: [
				  ], // 弹窗内全部编码列表
				selectNbr: [], // 选中的编码列表
				// pId:this.componentData.prodId
				delIndex:'',
				delStandardObj:'',

			}
		},
		watch: {
			componentData:{
				handler(val,old){
					this.findMainData();
				},
				deep: true
			}
		},
		mounted() {
			this.findMainData();
		},
		methods: {
			findMainData() {
				// 获取服务标准列表（外部）
				this.$axios
				.get(this.$api.replace(this.$api.QryOrdProdServiceStandard, ['{prodId}'], [this.componentData.prodId]), {
//				params: {
//					prodId: this.componentData.prodId
//				}
				})
				.then(res => {
				if (res.data.success == true) {
					if (res.data.prodServiceStandards.content) {
					this.standardList = res.data.prodServiceStandards.content;
					for (let i = 0; i < this.standardList.length; i++) {
						this.standardList[i].actType = "KIP";
						this.standardList[i].staff = this.staff;
						}
					}
				} else {
					this.$message.error({ message : res.data.msg })
				}
				});
			},
			isNoExistVaild(arr) {
				let arrTemp = arr.filter(item => item.actType != "DEL");
				return arrTemp == 0;
			}
		},
	}
</script>

<style scoped lang="scss">
	
.standard {
  width: 100%;
  height: 100%;
  padding: 0 20px !important;
	

	
.selectbtn{
	float: right;
	margin-top: 15px;
}
	/*选择服务标准编码弹框*/
.s-standardNbr {
  padding: 20px;
  vertical-align: middle;

	.s-l-search{
		width: 300px;
		margin-bottom: 20px;
		vertical-align: middle;
		.s-s-btn{
			text-align: center;
			button{
				width: 55px;
				height: 30px;
				background-color: $mainColor;
				color: #fff;
				font-size: .14rem;
				border-radius: .05rem;
				cursor: pointer;
				border: none;
				outline: none;
						&:hover{
							background-color: #9aebff;
						}
					}
				}
			}
		}
		h6 {
			margin-bottom: 5px;
			color: #b6de8f;
		}
	}
	.blue-font span{
		color:$mainColor;
		cursor: pointer;
	}
</style>

<style>
	.redBorder input{
		border:1px solid #f1886b !important;
	}
</style>
