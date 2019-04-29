<template>
	<div class="claim">
		<div class="header">
			<ConditionSearch :data="conditionSearchData" @search="conditionSearch" />
		</div>
		<div class="content">
			<Scroll class="app__table" fixedTopClassName="app__table-thead" fixedLeftClassName="app__data-none" isShowRight isShowBottom>
				<Row class="app__table-thead" inline>
					<Col :width="50"></Col>
					<Col :width="tableItem.width" v-for="(tableItem,tableIndex) in tableConfig" :key='tableIndex'>{{tableItem.name}}</Col>
				</Row>
				<Row :class="['app__table-item']" 
					v-for="(item,index) in listData" 
					:key="index" 
					@click.native="rowClick(item)"
					inline>
					<Col @click.native.stop :width="50">
						<Checkbox :label="item" v-model="checkboxData"></Checkbox>
					</Col>
					<Col :width="tableItem.width" 
					v-for="(tableItem,tableIndex) in tableConfig" 
					:key='tableIndex'>{{getTabelParamsContent(item,tableItem)}}</Col>
				</Row>
				<div v-if="!listData.length" class="app__data-none">
					<span>暂无数据</span>
				</div>
			</Scroll>
		</div>
		<div class="footer">
			<Pagination v-show="listData.length > 0" :pageIndex="paginationPageIndex" @pageChange="pageChange"/>
			<span class="await-btn success" @click="dealBtnClick('0')">办结成功</span>
			<span class="await-btn error" @click="dealBtnClick('1')">办结失败</span>
		</div>

		<Dialog dialogTitle="办结" ref="remarkDialog" @confirm="remarkDialogConfirm">
			<div class="remark-dialog">
				<FormItem labelText="备注：">
					<Input type="textarea" v-model="dialogRemark"/>
				</FormItem>
			</div>
		</Dialog>

		<Details ref="detailsRef" :componentData="DetailsData"/>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				paginationPageIndex: 1,
				conditionSearchData: [{
					iconfont: 'iconteshumingdan',
					placeholder:'请输入设备号',
					param: 'prodInstNum',
					default:''
				},{
					iconfont: 'iconteshumingdan',
					placeholder:'请输入任务编码',
					param: 'contactTaskId',
					default:''
				},{
					iconfont: 'iconteshumingdan',
					placeholder:'请输入调度单编码',
					param: 'contactOrderId',
					default:''
				},{
					iconfont: 'iconteshumingdan',
					placeholder:'请输入订单编号',
					param: 'orderNum',
					default:''
				},{
					iconfont: 'iconteshumingdan',
					placeholder:'请输入甩单编号',
					param: 'xSdtranId',
					default:''
				}],
				tableConfig:[{
					param: 'contactOrderId',
					name: '调度单编号',
					width: 180
				},{
					param: 'contactTaskId',
					name: '任务编码',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '退单人',
					width: 180
				},{
					param: 'createDate',
					name: '创建时间',
					width: 180
				},{
					param: 'statusCd',
					name: '工单状态',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '设备号',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '订单编号',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '退单原因',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '退单人联系方式	',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '退单来源系统',
					width: 180
				},{
					param: 'contactStaff',
					name: '当前处理人',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '订单状态',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '受理区局',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '受理分局',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '营业厅id',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '受理营业厅',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '受理工号',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '甩单编号',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '促销工号',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '渠道大类',
					width: 180
				},{
					param: 'contactTaskExtCha',
					name: '渠道小类',
					width: 180
				}],
				listData: [],
				checkboxData: [],
				conditionSearchObj: {},
				DetailsData: {},
				dialogRemark: '',
				dealType: ''
			}
		},
		methods:{
			conditionSearch(obj){
				this.conditionSearchObj = obj;
				this.getContactOrder();
			},
			getContactOrder(pageIndex = 1){
				this.$axios.get(this.$api.ContactOrder,{
					params:{
						channelCode: this.$user.getOrgId(),
						channelType: '2300',
						prodInstNum: this.conditionSearchObj.prodInstNum,
						contactTaskId: this.conditionSearchObj.contactTaskId,
						contactOrderId: this.conditionSearchObj.contactOrderId,
						orderNum: this.conditionSearchObj.orderNum,
						xSdtranId: this.conditionSearchObj.xSdtranId,
						expand: 'contactExtCha',
						contactOrderStatus: '1',
						mktCampaignType: '1-002-011',
						offset: pageIndex,
						limit: 20
					}
				}).then( res => {
					if(res.data && res.data.length > 0){
						this.paginationPageIndex = pageIndex;
						this.listData = res.data || [];
					}else{
						if(pageIndex == 1) this.listData = [];

						this.$message.error({message: '暂无数据！'})
					}
				}).catch( err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			dealBtnClick(type){
				if(this.checkboxData.length == 0){
					this.$message.error({message: '请选择接触单！'})
					return
				}
				this.dealType = type;
				this.dialogRemark = '';
				this.$refs.remarkDialog.show();
			},
			remarkDialogConfirm(){
				this.dealClick();
			},
			dealClick(){ //办结
				let contactOrderIds = this.checkboxData.map(item => item.contactOrderId).join(',');

				this.$axios.post(this.$api.ContactOrderBatchDeal,{
					contactOrderIds: contactOrderIds,
					statusCd: this.dealType,
					remark: this.dialogRemark,
					userWorkNum: this.$user.getStaffId()
				}).then( res => {
					this.$message.success({message: '办结成功！'});
					this.$refs.remarkDialog.hide();
					this.getContactOrder();
				}).catch( err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			rowClick(item){ //行点击事件
				this.$axios.get(this.$api.ContactOrderBatchDetail.format({contactOrderId:item.contactOrderId})).then( res => {

					this.DetailsData = Object.assign(res.data, item);

					this.$refs.detailsRef.show();
				}).catch( err => {
					this.$message.error({message: err.response.data.message})
				})
				
			},
			getTabelParamsContent(dataItem,tableItem){ //获取表格展示内容
				if(tableItem.param == 'contactTaskExtCha'){
					return dataItem.contactTaskExtChaForJson[tableItem.name];
				}

				if(tableItem.param == 'createDate'){
					return new Date(dataItem[tableItem.param]).format('yyyy-MM-dd');
				}

				return dataItem[tableItem.param];
			},
			pageChange(page){ //分页
				this.getContactOrder(page);
			}
		},
		components:{
			Details: () => import('./../common/details')
		}
	}
</script>

<style scoped lang="scss">
	.claim{
		width: 100%;
		height: 100%;
		padding: 90px 10px 50px;
		background-color: #fff;

		.header{
			position: absolute;
			top: 0;
			width: 100%;
			height: 90px;

			/deep/ .input-container,
			/deep/ .btn-container{
				margin-top: 10px;
			}
		}

		.content{
			width: 100%;
			height: 100%;
		}

		.footer{
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 50px;

			.await-btn{
				position: absolute;
				display: inline-block;
				top: 10px;
				width: 80px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				border-radius: 15px;
				color: #fff;
				background-color: #5a8af2;
				cursor: pointer;

				&.error{
					left: 90px;
				}
			}
		}

		.remark-dialog{
			padding: 20px;
		}
	}
</style>