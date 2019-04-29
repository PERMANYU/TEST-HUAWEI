<template>
	<div class="standard">
		<Scroll :isShowRight="true" fixedTopClassName="m-title">
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>产品服务标准</span>
			</div>
			<div class="selectbtn app__btn app__btn-add" @click="showSelectNbr()">添加</div>

			<div class="app__table">
					<Row class='app__table-thead'>
						<Col :span='5'>服务标准编码</Col>
						<Col :span='4'>服务标准名称</Col>
						<Col :span='3'>服务标准值</Col>
						<Col :span='4'>服务标准单位</Col>
						<Col :span='6'>备注</Col>
						<Col :span='2'>操作</Col>
					</Row>
			</div>
			<div class="app__table">
                <Row class="app__table-item" v-for="(item,index) in standardList" v-if="item.actType != 'DEL'"
                    :key="index">
                    <Col :span='5'>
                        <div class="standardNbr">
							<Input readonly type="text" disabled v-model="item.serviceStandardNbr"
									></Input>
                        </div>
                    </Col>
                    <Col :span='4'>{{item.serviceStandardName ? item.serviceStandardName : "无"}}</Col>
                    <Col :span='3'>
                        <Input @change="actTypeChange(item)" type="text"
                               v-model.trim="item.prodServiceStandardValue" 
                               :class="{redBorder:item.prodServiceStandardValue == ''||
                                   !(/^[0-9]\d{0,19}$/).test(item.prodServiceStandardValue)}">
						</Input>
                    </Col>
                    <Col :span='4' class="">
                        <Select @change="actTypeChange(item)" :data="timeOptions" v-model="item.prodServiceStandardUnit"
                                :class="{redBorder:item.prodServiceStandardUnit == '' || item.prodServiceStandardUnit == undefined }">
                        </Select>
                    </Col>
                    <Col :span='6'>
                        <Input @change="actTypeChange(item)" type="text" v-model.trim="item.remark"
                               class=""></Input>
                    </Col>
                    <Col :span='2' class="blue-font">
                        <span @click="delStandard(item,index)" >删除</span>
                    </Col>
                </Row>
				<Row v-show="!isNoExistVaild(standardList)" :class="['m-item app__table-item']" v-if="standardList.length != 0" v-for="item in (10 - standardList.length)" :key="item.serviceStandardNbr"></Row>
                <Row class="app__data-none" v-show="isNoExistVaild(standardList)">
                    <span>对不起，暂无数据</span>
                </Row>
            </div>
		</Scroll>

		 <!--选择服务标准编码弹框-->
        <Dialog dialogTitle="服务标准列表" ref="standardNbr" @close="closeDialog()" @confirm="sureNbr()">
			<Scroll :isShowRight="true" ref="scroll"> 
				<div class="s-standardNbr">
					<div class="s-l-search">
						<Row>
							<Search placeholder="服务标准编码/服务标准名称搜索" v-model.trim="searchObj.serviceStandardName" @click.stop.native="nbrPageChange(1)"></Search>
						</Row>   
					</div>
					<!--全部待选列表-->
					<div class="app__table">
						<Row class="app__table-thead">
							<Col :span='10'>服务标准编码</Col>
							<Col :span='10'>服务标准名称</Col>
							<Col :span='4'>操作</Col>
						</Row>
						<div class="app__table">
							<Row class="app__table-item" @click.native="clickNbr(item)" v-for="(item,index) in nbrAllList"
									:key="index">
								<Col :span='10'>{{item.serviceStandardNbr}}</Col>
								<Col :span='10'>{{item.serviceStandardName}}</Col>
								<Col :span='4' class="blue-font">
									<span v-if="showYes(item)" class="iconfont icon-xuanzhong-fang"></span>
									<span v-else class="iconfont icon-weixuanzhong-fang"></span>
								</Col>
							</Row>

							<Row class="app__data-none" v-show="nbrAllList.length < 1">
								<span>对不起，暂无数据</span>
							</Row>
						</div>

						<Pagination :pageIndex="nbrPageObj.pageIndex" :pageSize="nbrPageObj.pageSize"
							:rowCount="nbrPageObj.rowCount" isCenter @change="nbrPageChange"
							v-show="nbrAllList.length > 0">
						</Pagination>
					</div>
					<!--已选列表-->
					<div class="app__table" v-show="!isNoExistVaild(selectNbr)">
						<h6>已选服务标准</h6>
						<Row class="app__table-thead">
							<Col :span='5'>服务标准编码</Col>
							<Col :span='5'>服务标准名称</Col>
							<Col :span='5'>服务标准值</Col>
							<Col :span='5'>服务标准单位</Col>
							<Col :span='4'>操作</Col>
						</Row>
						<div class="app__table">
							<Row class="app__table-item" v-for="(item,index) in selectNbr" v-if="item.actType != 'DEL'"
									:key="item.serviceStandardId">
								<Col :span='5'>{{item.serviceStandardNbr}}</Col>
								<Col :span='5'>{{item.serviceStandardName}}</Col>
								<Col :span='5'>
									<Input  type="text"
										v-model.trim="item.prodServiceStandardValue" 
										:class="{redBorder:item.prodServiceStandardValue == ''||
										!(/^[0-9]\d{0,19}$/).test(item.prodServiceStandardValue)}">
									</Input>
								</Col>
								<Col :span='5'>
									<Select  :data="timeOptions" v-model="item.prodServiceStandardUnit"
											:class="{redBorder:item.prodServiceStandardUnit == '' || item.prodServiceStandardUnit == undefined }">
									</Select>
								</Col>
								<Col :span='4' class="blue-font">
									<span @click="delSelectNbr(item,index)">删除</span>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</Scroll>
		</Dialog>

		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
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
				timeOptions:[
					{value:1000,label:"天"},
					{value:2000,label:"月"},
					{value:3000,label:"周"},
					{value:4000,label:"小时"},
				],
				tipInfo:{
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
        		},
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
					console.log(111111111111);
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
			save() {
				// 点击保存
				if (document.getElementsByClassName("redBorder").length < 1) {
					this.$axios
					.post(this.$api.replace(this.$api.ModProdServiceStandard, ['{prodId}'], [this.componentData.prodId]), {
//						prodId: this.componentData.prodId,
//						staff: this.staff,
						prodServiceStandards: this.standardList
					})
					.then(res => {
						if (res.data.success == true) {
							this.$message.success({ message :'成功！'})
						} else {
							this.$message.error({ message :res.data.msg})
						}
					});
				} else {
						this.$message.warning({ message :"服务标准值为20个以内数字"})
				}
			},
			actTypeChange(item) {
				// 监听actType
				if (item.actType != "ADD" && item.actType != "MOD") {
					item.actType = "MOD";
					item.staff = this.staff;
				}
    		},
			showSelectNbr() {
				this.selectNbr = [];
				for (let i = 0; i < this.standardList.length; i++) {
				this.selectNbr.push({ ...this.standardList[i] });
				}
				this.nbrPageChange(1);
			},
			nbrPageChange(page) {
				console.log(1);
				// 分页查询全部编码列表（弹框内）
				this.nbrPageObj.pageIndex = page;
				this.$axios
					.get(this.$api.QrySericeStandard, {
					params: {
						serviceStandardNbr: this.searchObj.serviceStandardNbr,
						serviceStandardName: this.searchObj.serviceStandardName,
						page: this.nbrPageObj.pageIndex,
						limit: this.nbrPageObj.pageSize
					}
				})
					.then(res => {
					if (res.data.success == true) {
						this.nbrAllList = res.data.serviceStandards.content;
						this.nbrPageObj.rowCount = res.data.serviceStandards.total;
						this.$refs.standardNbr.show();
					} else {
						this.$message.error({message:res.data.msg})
					}
				});
			},
			clickNbr(item) {// 点击标准编码（弹窗内）
				this.selectNbr.filter(
					obj =>
					obj.actType != "DEL" &&
					obj.serviceStandardId == item.serviceStandardId
				)[0]
					? this.delYes(item)
					: this.selectNbr.push({
						prodServiceStandardId: "",
						prodId: this.componentData.prodId,
						serviceStandardId: item.serviceStandardId,
						serviceStandardNbr: item.serviceStandardNbr,
						serviceStandardName: item.serviceStandardName,
						prodServiceStandardUnit: "",
						prodServiceStandardValue: "",
						remark: "",
						staff: this.staff,
						actType: "ADD"
					});
			},
			delYes(item) {// 取消选中（弹框内）
				for (let i = 0; i < this.selectNbr.length; i++) {
					if (this.selectNbr[i].serviceStandardId == item.serviceStandardId) {
						if (this.selectNbr[i].actType == "ADD") {
							this.selectNbr.splice(i, 1);
						} else {
							this.selectNbr[i].actType = "DEL";
						}
					}
				}
			},
			delSelectNbr(item, index) {// 点击删除(弹框内)
				if (item.actType == "ADD") {
					this.selectNbr.splice(index, 1);
				} else {
					this.selectNbr[index].actType = "DEL";
				}
			},
			showYes(item) {// 属性是否选中
				return this.selectNbr.filter(
					obj =>
					obj.actType != "DEL" &&
					obj.serviceStandardId == item.serviceStandardId
				)[0]
					? true
					: false;
			},
			sureNbr() {//选择标准编码弹窗确定
				 if (document.getElementsByClassName("redBorder").length < 1) {
						this.standardList = [...this.selectNbr];
						this.$refs.standardNbr.hide();
				 }else{
					 this.$message.error({message:'红框必须输入'})
				 }
			},
			delStandard(item, index) {// 点击删除（外部列表）
				this.delStandardObj = item;
				this.delIndex = index;
			 	this.tipInfo.iconType = 3;
				this.tipInfo.msg = '确认要删除选择的记录吗？';
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm(){
				if (this.delStandardObj.actType == "ADD") {
					this.standardList.splice(this.delIndex, 1);
					this.$refs.tip.hide();
				} else {
					this.standardList[this.delIndex].actType = "DEL";
					this.$refs.tip.hide();
				}
			},
			isNoExistVaild(arr) {
				let arrTemp = arr.filter(item => item.actType != "DEL");
				return arrTemp == 0;
			},
			closeDialog() {// 关闭弹窗回调
			},
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
