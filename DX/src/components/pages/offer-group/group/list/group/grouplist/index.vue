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

                        <!--表头下拉框筛选-->
						<ColSel class="col-search" v-if="item.param!='statusCd'&&item.param!='offerGrpDesc'&&item.param!='grpRelType'"
								:showOrder="false"
								@confirm="confirmfilter(item)"
								>
							<Input v-if="item.param == 'offerGrpNbr'" :placeholder="'请输入'+ item.name" v-model="item.part"></Input>
						</ColSel>
					</DragItem>

					<Col :class="['m-item']" :width="tableOfferGrpOperationObj.width">
						<span>操作</span>
					</Col>
				</DragGroup>
				<Row :class="['m-item app__table-item']" inline v-if="offerGroupList.length>0" v-for="(offerGroupItem,offerGroupIndex) in offerGroupList" :key="'offerGroup' + offerGroupIndex">
					<Col class="goods-name m-i-name" :width="tableOfferGrpNameObj.width" @click.native.stop="nameClick(offerGroupItem)" :title="offerGroupItem.offerGrpName"> {{offerGroupItem.offerGrpName}}
					</Col>
					<Col class="goods-name" :width="titleItem.width" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
						<span>{{adjustTabelItemText(offerGroupItem,titleItem.param)}}</span>
					</Col>
					<Col :width="tableOfferGrpOperationObj.width">
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
					pageSize: 20,
					rowCount: 0
				},
				tableOfferGrpNameObj:{
					name: '销售品组名称',
					param: 'offerGrpName',
					wp: 0.1666,
					width: 200,
					part:""
				},
				tableTitleData: [{
					name: '销售品组编码',
					param: 'offerGrpNbr',
					wp: 0.1666,
					width: 200,
					part:""
				}, {
					name: '类型',
					param: 'grpRelType',
					wp: 0.1666,
					width: 200,
					parent:[
						{label:'互斥组',value:'1000'},
						{label:'续约组',value:'1100'},
						{label:'依赖组',value:'1200'},
						{label:'普通组',value:'1300'},
					],
					part:""
				}, {
					name: '状态',
					param: 'statusCd',
					wp: 0.1666,
					width: 200,
					parent:[
						{label:'生效',value:'1000'},
						{label:'未生效',value:'1200'},
						{label:'失效',value:'1100'}
					],
					part:""
				}, {
					name: '描述',
					param: 'offerGrpDesc',
					wp: 0.1666,
					width: 200,
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
					offerGrpNbr: '',
					offerGrpName: '',
					staff:this.$user.getInfo().id
				},
                searchObj2: {},

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
				pageShowType: 2,//1:我的销售品组 2:全部销售品组 
				tipFlag:1 //1:删除  2：下架  3：发布  4：升版
			}
		},
		mounted() {
			this.adjustTableWidth();
			this.pageChange(1);
		},
		methods: {
		    //全部商品组
			initData() {
				if(this.pageShowType == 2){
					this.$axios.get(this.$api.QureyOfferGroupList, {
						params: {
							offerGrpNbr: this.searchObj2.offerGrpNbr,
							offerGrpName: this.searchObj.offerGrpName.trim(),   //去除关键字前后空格
							createStaff: this.searchObj.staff,
							page: this.pageInfo.pageIndex,
							limit: this.pageInfo.pageSize,
						}
						}).then(res => {
							if(res.data.success === true) {
								this.offerGroupList = res.data.ordOfferGrpPage.content||[];
								this.pageInfo.rowCount = res.data.ordOfferGrpPage.total;

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
					if(this.pageShowType == 1){
						this.$axios.get(this.$api.QureyAllOfferGroupList, {
							params: {
								offerGrpNbr: this.searchObj2.offerGrpNbr,
								offerGrpName: this.searchObj.offerGrpName.trim(),   //去除关键字前后空格
								createStaff: this.searchObj.staff,
								page: this.pageInfo.pageIndex,
								limit: this.pageInfo.pageSize,
							}
							}).then(res => {
								if(res.data.success === true) {
									this.offerGroupList = res.data.offerGrpPage.content||[];
									this.pageInfo.rowCount = res.data.offerGrpPage.total;

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
            //表头筛选
            titleSearch(val) {
                this.searchObj2={};
                val.filter( (item) => {
                    this.searchObj2[item.param] = item.value;
				});
                this.pageChange(1);
            },
			//表头条件筛选
            confirmfilter(val){
            	if(val.part == '') return;
                let obj={
                    label: val.name,
                    param: val.param,
                    value: val.part.label || val.part
                };
                this.$emit('changeSearchData',obj);
                this.tableTitleData.find( item => item.param == val.param).part = '';
			},
			pageChange(page) {
				this.pageInfo.pageIndex = page;
				this.initData();
			},
			search(val) {
				this.searchObj.offerGrpName = val;
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
			getStatusCd(type) { //获取销售品组状态区分
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
			getGrpRelType(type) { //获取销售品组类型区分
				switch(type) {
					case '1000':
						return '互斥组';
					case '1100':
						return '续约组';
					case '1200':
						return '依赖组';
					case '1300':
						return '普通组';
					default:
						return "未知";
				}
			},
			adjustTabelItemText(item, param) { //计算显示
				let val = item[param];
				switch(param) {
					case 'grpRelType':
						return this.getGrpRelType(val);
					case 'statusCd':
						return this.getStatusCd(val);
					default:
						return val;
				}
			},		
			itemTip(item) { //删除、下架、发布、升版
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
				if(this.tipFlag == 4){
					this.tipInfo.msg = `是否确认升版？`;
				}		
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm() {     //删除等操作确认
				if(this.tipFlag == 1){
					let offerGrpId = this.tipSelData.offerGrpId;
					let staff = this.$user.getInfo().id;
					this.$axios.delete(this.$api.OfferGroupTask,{
						params: {
							offerGrpId: offerGrpId,
							updateStaff: staff
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
				if(this.tipFlag == 2){
					let offerGrpId = this.tipSelData.offerGrpPublishId;
					let staff = this.$user.getInfo().id;
					this.$axios.delete(this.$api.DropOfferGroup,{
						params: {
							offerGrpId: offerGrpId,
							updateStaff: staff
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
				if(this.tipFlag == 3){
					let offerGrpId = this.tipSelData.offerGrpId;
					this.$axios.get(this.$api.PublishOfferGroup,{
						params: {
							offerGrpId: offerGrpId
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
				if(this.tipFlag == 4){
					let offerGrpId = this.tipSelData.offerGrpId;
					this.$axios.get(this.$api.UpVersionOfferGroup,{
						params: {
							offerGrpId: offerGrpId
						}
					}).then(res => {
						if(res.data.success === true) {
							this.$message.success({ message: "升版成功！" });
							this.$refs.tip.hide();
							this.initData();
						} else {
							this.$message.error({ message: "升版失败！" })
						}
					}).catch(error => {
						this.$message.error({ message: "升版失败！" })
					})
				}				
			},

			adjustOperationShow(item){
				return true;
			},
			adjustOperationName(item){
				//计算列表操作显示名称
				switch(this.pageShowType){
					case 1:
						return '查看';
					case 2:
						let nameConfig = {							
							'1200':'修改',
							'1000':'升版',
						};
						return nameConfig[item.statusCd];
					default:
						return '查看';
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
							this.$parent.$emit('componentView', 'modify', item);
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
			.m-title {
				.col.m-t-name {
				}
			}
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
