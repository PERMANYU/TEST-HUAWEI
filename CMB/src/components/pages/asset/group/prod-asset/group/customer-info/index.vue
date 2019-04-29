<template>
	<div class="customer-info">
		<div class="app__title-2">
			<span class="app__title-name">客户信息</span>
		</div>
		<Row class="details">
			<Col :span="6">
				<div class="kehu-img">
					<img src="./images/kehu.png">	
				</div>
				<div class="kehu-name">
					<span class="company">客户名称：{{mainData.custName}}</span>	
					<!-- <span class="ming">名</span>
					<span class="shi">实</span> -->
				</div>
				<div class="kehu-vip">
					<!-- <img src="./images/vip.png">
					<img src="./images/zqkh.png"> -->
				</div>
			</Col>
			<Col :span="18" class="">
				<Row>
					<Col class="app__lt" :span="8">
						<span class="app__lt-label">客户名称：</span>
						<span class="app__lt-text">{{mainData.custName || '无'}}</span>
					</Col>
					<Col class="app__lt" :span="8">
						<span class="app__lt-label">客户标识：</span>
						<span class="app__lt-text">{{mainData.custNumber || '无'}}</span>
					</Col>
					<Col class="app__lt" :span="8">
						<span class="app__lt-label">客户类型：</span>
						<span class="app__lt-text">{{mainData.custType | filterName}}</span>
					</Col>
				</Row>

				<Row>
					<Col class="app__lt" :span="8">
						<span class="app__lt-label">客户子类型：</span>
						<span class="app__lt-text">{{mainData.custSubType | filterName}}</span>
					</Col>
					<Col class="app__lt" :span="8">
						<span class="app__lt-label">主要证件类型：</span>
						<span class="app__lt-text">{{mainData.partyCert.certType || '无'}}</span>
					</Col>
					<Col class="app__lt" :span="8">
						<span class="app__lt-label">主要证件号码：</span>
						<span class="app__lt-text">{{mainData.partyCert.certNum || '无'}}</span>
					</Col>
				</Row>
				<Row>
					<Col class="app__lt" :span="8">
						<span class="app__lt-label">客户星级：</span>
						<span class="app__lt-text">{{mainData.customerLevel || '无'}}</span>
					</Col>
					<Col class="app__lt" :span="8">
						<span class="app__lt-label">实名标记：</span>
						<span class="app__lt-text">{{mainData.isRealname ? '是' : '否'}}</span>
					</Col>
					<Col class="app__lt" :span="8">
						<span class="app__lt-label">客户现地址：</span>
						<span class="app__lt-text">{{mainData.custAddr || '无'}}</span>
					</Col>
				</Row>
				<Row>
					<Col class="app__lt" :span="8">
						<span class="app__lt-label">入网时间：</span>
						<span class="app__lt-text">{{mainData.enterDate || '无'}}</span>
					</Col>
				</Row>
			</Col>
		</Row>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				mainData: {
					partyCert:{}
				}
			}
		},
		methods:{
			init(item){
				this.getCustomerInfo(item.ownerCustId)
			},
			getCustomerInfo(custId){
				this.$axios.get(this.$api.CustomerPublicDetail.format({custId:custId}), {
					params: {
						staffId: this.$user.getStaffId(),
						sysUserId: this.$user.getSysUserId(),
						orgId: this.$user.getOrgId(),
						sysRoleIds: this.$user.getSysRoleId()
					}
				}).then(res => {
					let resData = res.data;
					resData.partyCert = resData.partyCert || {};
					this.mainData = resData;

					this.$nextTick( () => {
		        		this.$emit('initEnd')
		        	})
				}).catch(err => {
					this.$message.error({"message": err.response.data.message})
				})
			},
			getCustSubType(val){ //获取客户子类型显示

			}
		}
	}
</script>

<style scoped lang="scss">
	.customer-info{

		.details{
			background-color: #fff;
			border: 1px dashed #eee;

			.kehu-img{
				text-align: center;
				margin-top: 20px;
			}

			.kehu-name{
				text-align: center;
				margin-top: 10px;

				.company{
					color: #647283;
					font-size: 14px;
				}

				.ming{
					display: inline-block;
					width: 20px;
					height: 20px;
					margin-left: 10px;
					line-height: 20px;
					text-align: center;
					color: #fff;
					border-radius: 4px;
					background-color: #ff7e39;
					vertical-align: text-bottom;
				}

				.shi{
					display: inline-block;
					width: 20px;
					height: 20px;
					margin-left: 10px;
					line-height: 20px;
					text-align: center;
					color: #fff;
					border-radius: 4px;
					background-color: #6cdbc9;
					vertical-align: text-bottom;
				}
			}

			.kehu-vip{
				text-align: center;
				margin-top: 10px;

				img{
					height: 16px;
				}
			}
		}

		.col{
			padding: 8px 0;
		}
	}
</style>