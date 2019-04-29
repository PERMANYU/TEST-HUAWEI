<template>
	<div class="main-table">
		<div class="main">
			<Scroll class="app__table" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title" ref="listScroll">
				<DragGroup class="m-title app__table-thead" inline :titleList="tableTitleData" @dragchange="dragchange">
					<Col class="m-item m-t-name" :width="tableOfferGrpNameObj.width">
						<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],tableOfferGrpNameObj)"/>
						<span>{{tableOfferGrpNameObj.name}}</span>
					</Col>

					<DragItem :class="['m-item']" :width="item.width" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+index">

						<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>

						<span>{{item.name}}</span>

					</DragItem>

					<Col :class="['m-item']" :width="tableOfferGrpOperationObj.width">
						<span>操作</span>
					</Col>
				</DragGroup>
				<Row :class="['m-item app__table-item']" inline v-if="offerGroupList.length>0" v-for="(offerGroupItem,offerGroupIndex) in offerGroupList" :key="'offerGroup' + offerGroupIndex">
					<!-- <Col class="goods-name m-i-name" :width="tableOfferGrpNameObj.width" @click.native.stop="nameClick(offerGroupItem)" :title="offerGroupItem.offerPackageName"> {{offerGroupItem.offerPackageName}} -->
					<Col class="goods-name" :width="tableOfferGrpNameObj.width"  :title="offerGroupItem.offerPackageName"> {{offerGroupItem.offerPackageName}}
					</Col>
					<Col class="goods-name" :width="titleItem.width" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
						<span v-if="titleItem.param == 'effDate' || titleItem.param == 'expDate'">{{adjustTabelItemText(offerGroupItem,titleItem.param) | date}}</span>
						<span v-else>{{adjustTabelItemText(offerGroupItem,titleItem.param)}}</span>
					</Col>
					<Col :width="tableOfferGrpOperationObj.width">
						<span class="span" @click="nameClick(offerGroupItem)">查看</span>
						<span class="span" v-if="adjustOperationShow(offerGroupItem)" @click="adjustOperationClick(offerGroupItem)">{{adjustOperationName(offerGroupItem)}}</span>
						<span class="span" v-if="adjustGrpShow(offerGroupItem)" @click="adjustGrpClick(offerGroupItem)">{{adjustGrpName(offerGroupItem)}}</span>
						<span class="span" v-if="delOperationShow(offerGroupItem)" @click="delOperationClick(offerGroupItem)">{{delOperationName(offerGroupItem)}}</span>
					</Col>
				</Row>
				<Row v-if="!offerGroupList.length" class="app__data-none">
					<Col :span="24"><span>当前无数据!</span></Col>
				</Row>
			</Scroll>
		</div>
		<div class="footer">
			<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
			</Pagination>
		</div>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		name: 'grouplist',
		data() {
			return {
				pageInfo: {
					pageIndex: 1,
					pageSize: 10,
					rowCount: 0
				},
				tableOfferGrpNameObj:{
					name: '礼包名称',
					param: 'offerPackageName',
					wp: 0.12,
					width: 200,
					part:""
				},
				tableTitleData: [{
					name: '礼包编码',
					param: 'offerPackageNbr',
					wp: 0.12,
					width: 200,
					part:""
				}, {
					name: '管理级别',
					param: 'manageGrade',
					wp: 0.12,
					width: 200,
					parent:[
						{label:'集团框架级',value:'10'},
						{label:'集团实例级',value:'11'},
						{label:'省公司实例级',value:'12'},
						{label:'本地网级',value:'13'},
						{label:'省公司框架级',value:'14'},
						{label:'转售实例级',value:'15'},
					],
					part:""
				}, {
					name: '生效时间',
					param: 'effDate',
					wp: 0.12,
					width: 200,
					part:""
				}, {
					name: '失效时间',
					param: 'expDate',
					wp: 0.12,
					width: 200,
					part:""
				}, {
					name: '版本',
					param: 'version',
					wp: 0.12,
					width: 200,
					part:""
				}, {
					name: '状态',
					param: 'statusCd',
					wp: 0.12,
					width: 200,
					parent:[
						{label:'生效',value:'1000'},
						{label:'未生效',value:'1200'},
						{label:'失效',value:'1100'}
					],
					part:""
				}],
				tableOfferGrpOperationObj:{
					name: '操作',
					param: 'operation',
					wp: 0.16,
					width: 200,
					part:""
				},
				offerGroupList: [],
				searchObj: {
					offerPackageName: '',
					staff:this.$user.getInfo().id
				},

				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				tipType: '',
				tipSelData: '',
				pageShowType: 2,//1:全部礼包 2: 我的礼包
				tipFlag:1 //1:删除  2：下架  3：发布
			}
		},
		mounted() {
			this.adjustTableWidth();
			this.pageChange(1);
		},
		methods: {
		   
			initData() {
				 // 我的礼包
				if(this.pageShowType == 2){
					this.$axios.get(this.$api.QueryOfferPackageList, {
						params: {
							offerPackageName: this.searchObj.offerPackageName.trim(), 
							createStaff: this.searchObj.staff,
							page: this.pageInfo.pageIndex,
							limit: this.pageInfo.pageSize,
						}
						}).then(res => {
							if(res.data.success === true) {
								this.offerGroupList = res.data.offerPackagePage.content||[];
								this.pageInfo.rowCount = res.data.offerPackagePage.total;

								this.$nextTick(() => {
									this.$refs.listScroll.init();
								})
							} else {
								this.$message.error({ "message": "查询失败！" })
							}
						}).catch(error => {
							this.$message.error({ "message": "服务器异常！" })
						})
					}
					// 全部礼包
					if(this.pageShowType == 1){
						this.$axios.get(this.$api.QueryOfferPackageList, {
							params: {
								offerPackageName: this.searchObj.offerPackageName.trim(),
								createStaff: this.searchObj.staff,
								page: this.pageInfo.pageIndex,
								limit: this.pageInfo.pageSize,
							}
							}).then(res => {
								if(res.data.success === true) {
									this.offerGroupList = res.data.offerPackagePage.content||[];
									this.pageInfo.rowCount = res.data.offerPackagePage.total;

									this.$nextTick(() => {
										this.$refs.listScroll.init();
									})
								} else {
									this.$message.error({ "message": "查询失败！" })
								}
							}).catch(error => {
								this.$message.error({ "message": "服务器异常！" })
							})
					}	
			},
			adjustTableWidth(){
				this.tableOfferGrpNameObj.width = this.$el.getBoundingClientRect().width * this.tableOfferGrpNameObj.wp;
				this.tableOfferGrpOperationObj.width = this.$el.getBoundingClientRect().width * this.tableOfferGrpOperationObj.wp;
				this.tableTitleData.map(item => {
					item.width = this.$el.getBoundingClientRect().width * item.wp;
				})
			},
			pageChange(page) {
				this.pageInfo.pageIndex = page;
				this.initData();
			},
			search(val) {
				this.searchObj.offerPackageName = val;
				this.pageChange(1);
			},
            //左上角下拉改变
            tabChange(val){
				if(val.value == '2000') {
					this.searchObj.staff = '';
				} else {
					this.searchObj.staff = this.$user.getInfo().id;
				}
                this.pageShowType = val.flag;
                this.pageChange(1);
            },

			dragchange(val) {
				this.tableTitleData = val;
			},
			pullMove(w,item){
				item.width = w;
			},
			pullEnd(){
				this.$refs.listScroll.initScroll();
			},
			//点击查看详情 
			nameClick(item) {
				this.$parent.$emit('componentView', 'info', item);
			},
			getStatusCd(type) { 
				switch(type) {
					case '1000':
						return '生效';
					case '1100':
						return '失效';
					case '1200':
						return '未生效';
					default:
						return "未知";
				}
			},
			getManageGrade(type) { 
				switch(type) {
					case '10':
						return '集团框架级';
					case '11':
						return '集团实例级';
					case '12':
						return '省公司实例级';
					case '13':
						return '本地网级';
					case '14':
					return '省公司框架级';
					case '15':
					return '转售实例级';
					default:
						return "未知";
				}
			},
			adjustTabelItemText(item, param) { //计算显示
				let val = item[param];
				switch(param) {
					case 'manageGrade':
						return this.getManageGrade(val);
					case 'statusCd':
						return this.getStatusCd(val);
					default:
						return val;
				}
			},		
			itemTip(item) { //删除、下架、发布
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				if(this.tipFlag == 1){
					this.tipInfo.msg = `是否确认删除？`;
				}
				if(this.tipFlag == 2){
					this.tipInfo.msg = `是否确认下架？`;
				}
				if(this.tipFlag == 3){
					this.tipInfo.msg = `是否确认发布？`;
				}
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm() { 
				if(this.tipFlag == 1){ // 删除
					this.$axios.delete(this.$api.QueryOfferPackageList,{
						params: {
							offerPackageId: this.tipSelData.offerPackageId,
							updateStaff: this.$user.getInfo().id,
							statusCd: '1100'
						}
					}).then(res => {
						if(res.data.success === true) {
							this.$message.success({ message: "删除成功！" });
							this.$refs.tip.hide();
							this.initData();
						} else {
							this.$message.error({ message: "删除失败！" })
						}
					}).catch(error => {
						this.$message.error({ message: "删除失败！" })
					})
				}
				if(this.tipFlag == 2){ // 下架
					this.$axios.delete(this.$api.QueryOfferPackageList,{
						params: {
							offerPackageId: this.tipSelData.offerPackageId,
							updateStaff: this.$user.getInfo().id,
							statusCd: '1200'
						}
					}).then(res => {
						if(res.data.success === true) {
							this.$message.success({ message: "下架成功！" });
							this.$refs.tip.hide();
							this.initData();
						} else {
							this.$message.error({ message: "下架失败！" })
						}
					}).catch(error => {
						this.$message.error({ message: "下架失败！" })
					})
				}
				if(this.tipFlag == 3){ // 发布
					this.$axios.get(this.$api.OfferGrpRelease,{
						params: {
							offerPackageId: this.tipSelData.offerPackageId,
							updateStaff: this.$user.getInfo().id
						}
					}).then(res => {
						if(res.data.success === true) {
							this.$message.success({ message: "发布成功！" });
							this.$refs.tip.hide();
							this.initData();
						} else {
							this.$message.error({ message: "发布失败！" })
						}
					}).catch(error => {
						this.$message.error({ message: "发布失败！" })
					})
				}
			},

			adjustOperationShow(item){
				return true;
			},
			adjustOperationName(item){
				//计算列表操作显示名称
				switch(this.pageShowType){
					// case 1:
					// 	return '查看';
					case 2:
						let nameConfig = {							
							'1200':'修改',
							// '1000':'升版',
						};
						return nameConfig[item.statusCd];
					default:
						return '';
				}
			},
			adjustOperationClick(item){
				//计算列表操作点击事件
				switch(this.pageShowType){
					case 1:
						this.$parent.$emit('componentView', 'info', item);
						break;
					case 2:
						if(item.statusCd == '1200'){
							this.$parent.$emit('componentView', 'add', item);
						}
						if(item.statusCd == '1000'){
							this.tipFlag = 4;
							this.itemTip(item);
						}
						break;
					default:
						this.$parent.$emit('componentView', 'info', item);
						break;
				}

			},
			adjustGrpShow(item){
				switch(this.pageShowType){
					case 1:
						return false;
					case 2:
						return true;						
					default:
						return false;
				}				
			},
			adjustGrpClick(item){
				if(item.statusCd == '1200'){
					this.tipFlag = 3;
					this.itemTip(item);
				}
				if(item.statusCd == '1000'){
					this.tipFlag = 2;
					this.itemTip(item);
				}

			},
			adjustGrpName(item){
				switch(this.pageShowType){
					case 1:
						return '';
					case 2:
						let nameConfig = {							
							'1200':'发布',
							'1000':'下架',
						};
						return nameConfig[item.statusCd];
					default:
						return '';
				}
			},
			delOperationShow(item){
				switch(this.pageShowType){
					case 1:
						return false;
					case 2:
						return  item.statusCd == '1200';
					default:
						return false;
				}
				
			},
			delOperationName(item){
				switch(this.pageShowType){
					case 1:
						return '';
					case 2:
						return '删除';
					default:
						return '删除';
				}
			},	
			delOperationClick(item){
				this.tipFlag = 1;
				this.itemTip(item)
			}

		}
	}
</script>

<style scoped lang="scss">
	.main-table {
		height: 100%;
		padding-bottom: 50px;
		.main {
			width: 100%;
			height: 100%;
			
			.m-item {
				.goods-name{
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.m-i-name {
					color: $mainColor;
					cursor: pointer;
				}
			}
			.col {
				&:hover {
					.col-search {
						display: block;
						.col-radio{
							display: block;
							margin-bottom:15px;
						}
					}
				}
			}
		}
		.footer {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			box-shadow: 0 -2px 0 #f1f5fa;
			.pagination {
				height: 50px;
			}
		}
	}

	.span {
        padding-right: 10px;
		color: $mainColor;
		cursor: pointer;
	}
	
</style>
