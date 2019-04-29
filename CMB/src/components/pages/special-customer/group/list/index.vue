<template>
	<div class="list">
		<div class="header">
			<ConditionSearch :data="conditionSearchData" @search="conditionSearch" @focus="inputFocus"></ConditionSearch>
			<!-- <span class="app__btn app__btn-add" @click="addClick">添加</span> -->
			<specialAdd ref="specialAdd" @refresh="getCustSpecial"/>
		</div>

		<div class="content">
			<Scroll class="app__table" :isShowRight="true" fixedTopClassName="app__table-thead" ref="listScroll">
				<Row class="app__table-thead">
					<Col :span="2">客户名称</Col>
					<Col :span="2">客户标识</Col>
					<Col :span="3">生效时间</Col>
					<Col :span="3">失效时间</Col>
					<Col :span="2">白名单状态</Col>
					<Col :span="2">创建人</Col>
					<Col :span="3">创建时间</Col>
					<Col :span="2">修改人</Col>
					<Col :span="3">修改时间</Col>
					<Col :span="2">操作</Col>
				</Row>

				<Row class="app__table-item"
					v-for="(custItem,custIndex) in custList" 
					:key="custIndex">
					<Col :span="2">{{custItem.custName}}</Col>
					<Col :span="2">{{custItem.custNumber}}</Col>
					<Col :span="3">{{custItem.effDate | getTime}}</Col>
					<Col :span="3">{{custItem.expDate | getTime}}</Col>
					<Col :span="2">{{getStatusCd(custItem.statusCd)}}</Col>
					<Col :span="2">{{custItem.createStaff}}</Col>
					<Col :span="3">{{custItem.createDate | getLocalTime}}</Col>
					<Col :span="2">{{custItem.updateStaff}}</Col>
					<Col :span="3">{{custItem.updateDate | getLocalTime}}</Col>

					<Col :span="2">
						<span class="mod" @click="modClick(custItem)">修改</span>
						<span class="del" @click="delClick(custItem)">删除</span>
					</Col>
				</Row>
				<Row class="app__table-item"
					v-for="(custItem,custIndex) in (20 - custList.length)" 
					:key="custIndex + 'o'">
					<Col></Col>
				</Row>
			</Scroll>
		</div>

		<customerDialog ref='customerDialog' @confirm='customerDialogConfirm'/>

		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm"></Tip>
	</div>
</template>

<script type="text/javascript">
	import customerDialog from './group/customer-dialog'; //客户检索
	import specialAdd from './group/special-add'; //政企白名单添加
	export default{
		data(){
			return{
				conditionSearchData:[{
					iconfont: 'iconguanxi',
					placeholder:'请选择名单类型',
					param: 'type',
					isSelect: true,
					options: [{ label: "固话", value: "1400" },
						{ label: "移动", value: "1500" }],
					optionParam: 'optionType',
					optionValue: ''
				},{
					iconfont: 'iconteshumingdan',
					placeholder:'请选择客户名称',
					param: 'name',
					readonly: true,
					default:''
				}],
				tipInfo:{
					iconType: 3,
					msg: '是否确认删除？',
					showBtn:{
						clear: true,
						save: true
					}
				},
				conditionSearchObj:{},
				selectCustData:{},
				custList:[],
				delSelData: {}
			}
		},
		methods:{
			conditionSearch(obj){
				if(!obj.optionType){
					this.$message.error({message: "请选择名单类型！"})
					return;
				}

				if(!this.selectCustData.custId){
					this.$message.error({message: "请选择客户！"})
					return;
				}

				this.conditionSearchObj = obj;
				this.getCustSpecial();
			},
			getCustSpecial(){
				if(!this.conditionSearchObj.optionType || !this.selectCustData.custId) return;

				this.$axios.get(this.$api.CustSpecial, {
					params: {
						objId: this.selectCustData.custId,
						specialType: this.conditionSearchObj.optionType,
						subSpecialType: {'1400':'14000','1500':'15000'}[this.conditionSearchObj.optionType]
					}
				}).then(res => {
					if (res.data) {
						this.custList = res.data.map(item => Object.assign(item,{
							custName: this.selectCustData.custName,
							custNumber: this.selectCustData.custNumber
						}))
					} else {
						this.$message.error({message: "请求失败"})
					}
				}).catch(err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			inputFocus(item){
				this.$refs.customerDialog.show();
			},
			customerDialogConfirm(item){ //选择客户后确认
				this.selectCustData = item;
				this.conditionSearchData[1].default = item.custName;
			},
			modClick(item){ //修改
				let nItem = Object.assign(item,{
					custName: this.selectCustData.custName,
					custId: this.selectCustData.custId
				})
				this.$refs.specialAdd.modClick(nItem);
			},
			delClick(item){ //删除
				this.delSelData = item;
				this.$refs.tip.show();
			},
			tipConfirm(){
				this.$axios.patch(this.$api.CustSpecialDel.format({specialListId: this.delSelData.specialListId}), {
					statusCd: '1100',
					objType: '1100',
					objId: this.delSelData.objId,
				}).then(res => {
					this.$message.success({message: '删除成功'})
					this.$refs.tip.hide();
					this.getCustSpecial();
				}).catch(err => {
					this.$message.error({message: err.response.data.message})
				})
			},
			getStatusCd(val){ //获取白名单状态
				return {
					'1000': '有效',
					'1100': '无效'
				}[val] || '未知';
			}
		},
		components:{
			customerDialog,
			specialAdd
		}
	}
</script>

<style scoped lang="scss">
	.list{
		padding-top: 80px;
		width: 100%;
		height: 100%;

		.header{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 80px;
			padding: 20px 20px 0;
			background-color: #fff;
		}

		.content{
			width: 100%;
			height: 100%;
			padding: 0 10px;

			.mod,.del{
				color: #5a8af2;
				cursor: pointer;
			}
		}
	}
</style>