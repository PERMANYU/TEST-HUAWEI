<template>
	<div class="main-wrap">
		<div class="require-state">
			<Row class="search-row">
				<Col :span="3" class="require-statelabel">
				<i class="icon-all"></i>
				<i :class="['icon-down',downFlag?'active':'']" @click="toggleDown()"></i>
				<DropSel :obj="tabs" :text="tabDefault" @change="dropChange"></DropSel>
				</Col>
				<Col :span="5">
				<Search placeholder="请输入需求单名称" @search="search"></Search>
				</Col>
				<Col :span="12">
				<div :class="['h-operation',searchData.length > 0 ? 'active' : '']">
					<SearchBox v-model="searchData" @click="closeSearch"></SearchBox>
				</div>
				</Col>
			</Row>
		</div>
		<div class="main-table">
			<div class="main">
				<Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
					<DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
						<Col class="m-item m-t-name" :span="5">
						<span>需求单名称</span>
						</Col>

						<DragItem :class="['m-item']" :span="item.span" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+index">
							<span>{{item.name}}</span>
							<ColSel class="col-search" :showOrder="false" @confirm="Confirmfilter(item.param)">
								<Input v-if="item.param == 'requirementCode'" :placeholder="'请输入'+ item.name" v-model="item.part"></Input>
								<Radio v-else class="col-radio" :label="items" :name="item.param" v-for="(items,index) in item.parent" :key="index" v-model="item.part">
									{{items.label}}
								</Radio>
							</ColSel>
						</DragItem>
						<Col :class="['m-item']" :span="4">
						<span>操作</span>
						</Col>
					</DragGroup>
					<Row :class="['m-item app__table-item']" v-if="requirementList.length>0" v-for="(requirementItem,requirementIndex) in requirementList" :key="'requirement' + requirementIndex">
						<Col class="goods-name" :span="5" @click.native.stop="nameClick(requirementItem)"> {{requirementItem.requirementName}}
						</Col>
						<Col :span="titleItem.span" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
						<span>{{adjustTabelItemText(requirementItem,titleItem.param)}}</span>
						</Col>
						<Col :span="4">
						<span class="span" v-if="statusCd=='1201'" @click="requirementHandle(requirementItem)">处理</span>
						<span class="span" v-if="statusCd=='1001'" @click="requirementSel(requirementItem)">查看</span>
						</Col>
					</Row>
					<Row v-if="!requirementList.length" class="app__data-none">
						<Col :span="24"><span>当前无数据!</span></Col>
					</Row>    
					<!--<Row :class="['m-item app__table-item']" v-for="fillItem in 20 - requirementList.length" :key="fillItem">
				</Row>-->
				</Scroll>
			</div>
			<div class="footer" v-if="requirementList.length>0" >
			<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
			</Pagination>
		</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentView: 'havedone',
				tabs: [{
					label: '未办结需求单',
					value: '1201'
				}, {
					label: '已办结需求单',
					value: '1001'
				}],
				tabDefault: "未办结需求单",
				statusCd:"1201",
				activeIndex: 0,
				dialogTitle: '',
				dialogSize: {
					min: 300,
					max: 350
				},
				tabView: 'select1',
				iscur: 1,
				downFlag: false,
				itemIndex: 1,
				searchData: [],
				checkboxData: [],
				pageInfo: {
					pageIndex: 1,
					pageSize: 20,
					rowCount: 0
				},
				tableTitleData: [{
					name: '需求单编码',
					param: 'requirementCode',
					span: 5,
					part:""
				},  {
					name: '需求单类型',
					param: 'requestType',
					span: 5,
					parent:[
						{label:'产品',value:'10'},
						{label:'销售品',value:'11'},
						{label:'目录',value:'12'},
						{label:'转售销售品',value:'13'},
					],
					part:""
				}, {
					name: '需求单功能类型',
					param: 'actType',
					span: 5,
					parent:[
						{label:'变更',value:'MOD'},
						{label:'新建',value:'ADD'}
					],
					part:""
				}],
				requirementList: [],
				searchObj: {
					requirementName: ''
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
				requireForm:{},
			}
		},
		mounted() {
			this.initData();
		},
		methods: {
			//待办需求单列表
			initData() {
				this.$axios.get(this.$api.Dairequirement, {
					params: {
						requirementName: this.searchObj.requirementName,
						requestType: '',
						statusCd:this.statusCd,
						userId: this.$user.getInfo().id,
						limit: this.pageInfo.pageSize,
						page: this.pageInfo.pageIndex
					}
				}).then(res => {
					if(res.data.success === true) {
						if (res.data.requirements) {
							this.requirementList = res.data.requirements.content;
							this.pageInfo.rowCount = res.data.requirements.total;

						this.$nextTick(() => {
							this.$refs.listScroll.init();
						})
						}else{
							this.requirementList = []
						}
					} else {
						this.$message.error({ "message": "查询失败！" })
					}
				})
			},
			dropChange(val) {
				this.statusCd = val.value
				this.tabDefault = val.label
				this.initData()
			},
			startrequire() {

			},
			toggleDown() {
				this.downFlag = !this.downFlag
			},
			changeSearchData(val) {
				this.searchData = this.searchData.filter(item => item.label != val.label)
				this.searchData.push(val)
			},
			pull() {

			},
			newRequire() {
				this.$refs.reqtype.show();
				//this.$emit('componentView', 'add')
			},
			search(val) {
				this.$refs.haveDone.search(val);
			},
			prodsClick() {
				this.itemIndex = 1
			},
			goodsClick() {
				this.itemIndex = 2
			},
			reqTypeSubmit() {

			},
			btnSave() {
				if(this.itemIndex == 1) {
					this.$emit('componentView', 'add', { type: '10' })
				} else {
					this.$emit('componentView', 'add', { type: '11' })
				}
			},
			closeSearch() {
			},
			btnCancel() {
				this.$refs.reqtype.hide();
			},
			
			allCheckboxClick() {

			},
			Confirmfilter(value){//筛选
				switch (value) {
					case 'requirementCode':
					this.$emit('changeSearchData',{
							label: '需求单编码',
							value:this.tableTitleData.find( item => item.param == 'requirementCode').part
						})
						this.initData()
						this.tableTitleData.find( item => item.param == 'requirementCode').part = ''
						break;
					case 'statusCd':
					this.$emit('changeSearchData',{
						label: '需求单状态',
						value:this.tableTitleData.find( item => item.param == 'statusCd').part.label
						})
						this.initData()
						this.tableTitleData.find( item => item.param == 'statusCd').part = []
						break;
					case 'requestType':
					this.$emit('changeSearchData',{
						label: '需求单类型',
							value:this.tableTitleData.find( item => item.param == 'requestType').part.label
						})
						this.initData()
						this.tableTitleData.find( item => item.param == 'requestType').part = []
						break;
					case 'actType':
					this.$emit('changeSearchData',{
						label: '需求单动作类型',
						value:this.tableTitleData.find( item => item.param == 'actType' ).part.label
						})
						this.initData()
						this.tableTitleData.find( item => item.param == 'actType').part = []
						break;
				
					default:
						break;
				}
			},
			pageChange(page) {
				this.pageInfo.pageIndex = page;
				this.initData();
			},
			search(val) {
				this.searchObj.requirementName = val;
				this.pageChange(1);
			},
			dragchange(val) {
				this.tableTitleData = val;
			},
			allCheckboxClick() {

			},
			searchClick() {

			},
			searchClick() {

			},
			nameClick(val) {
				this.reqDetail(val)
//				this.$refs.leftDialog.show();
			},
			reqDetail(val){
				this.$axios.get(this.$api.replace(this.$api.QureyRequirementTask,['{requirementId}'],[val.requirementId]),{
					params: {
						showMember: 1
					}
				}).then(res => {
					if(res.data.success === true){
						this.requireForm = res.data.requirementDetail;
					}else{
						this.$message.error({message: res.data.msg})
					}
				}).catch( error => {
					this.$message.error({message: res.data.msg})
				})
			},
			getRequestType(type) { //获取需求单类型
				switch(type) {
					case '10':
						return '产品';
					case '11':
						return '销售品';
					case '12':
						return '目录';
					case '13':
						return '转售销售品';
					default:
						return "未知";
				}
			},
			getStatusCd(type) { //获取需求单状态
				switch(type) {
					case '1000':
						return '竣工';
					case '1100':
						return '注销';
					case '1200':
						return '编辑中';
					case '1201':
						return '流转中';
					default:
						return "未知";
				}
			},
			getActType(type) { //获取需求单区分
				switch(type) {
					case 'ADD':
						return '新建';
					case 'MOD':
						return '变更';
					default:
						return "未知";
				}
			},
			adjustTabelItemText(item, param) { //计算显示
				let val = item[param];
				switch(param) {
					case 'statusCd':
						return this.getStatusCd(val);
					case 'requestType':
						return this.getRequestType(val);
					case 'actType':
						return this.getActType(val);
					default:
						return val;
				}
			},
			requirementHandle(item){
				let routeName = '';
				if(item.requestType == '10'){ //产品
					if(item.reqFlowStatus == '11'){//配置
						routeName = 'prodCatalog';
					}else{//审核
						routeName = 'prodApproval';
					}
                }else{//销售品
                    if(!item.reqFlowStatus) {
                        routeName = 'add';
                    } else {
                        routeName = 'info';
                    }
				}
				this.$emit('componentView', routeName, item);
			},
			requirementSel(item){
				let routeName = '';
				if(item.requestType == '10'){ //产品
					routeName = 'requirementProdInfo';
				}else{//销售品
					routeName = 'requirementInfo';
				}
				
				this.$emit('componentView', routeName, item);
			}
		},
		components: {
		}
	}
</script>

<style scoped lang="scss">
	.main-wrap {
		height: 100%;
		padding: 0 20px 50px;
		.require-state {
			height: 50px;
			line-height: 50px;
			font-size: 14px;
			color: #333;
			position: relative;
			z-index: 3;
			.require-statelabel {
				float: left;
				height: 30px;
				line-height: 30px;
				padding: 5px 0 0 20px;
				.icon-all {
					position: absolute;
					display: block;
					width: 18px;
					height: 18px;
					margin-top: 6px;
					margin-right: 8px;
					background: url(images/all.png) no-repeat center;
					background-size: 18px 18px;
				}
				.drop-sel {
					padding: 0 20px 0 20px;
				}
				.alllabel {
					display: inline-block;
					float: left;
					margin-right: 6px;
					cursor: pointer;
				}
				.icon-down {
					position: absolute;
					display: block;
					width: 12px;
					height: 12px;
					margin-top: 10px;
					left: 130px;
					background: url(images/down.png) no-repeat center;
					background-size: 10px 6px;
				}
				.down-menu {
					position: absolute;
					top: 40px;
					left: 0;
					z-index: 2;
					width: 100%;
					background-color: #fff;
					display: none;
					border: 1px solid #F3F3F3;
					border-radius: 5px;
					.tab {
						display: block;
						float: left;
						width: 100%;
						height: 30px;
						margin-top: 10px;
						text-decoration: none;
						line-height: 30px;
						color: #323232;
						text-align: center;
						&:hover {
							background-color: #dff1fc;
						}
					}
					&.active {
						display: block;
					}
				}
			}
			.search-row {
				padding-top: 5px;
				.btn-box {
					text-align: right;
					padding-right: 10px;
				}
			}
		}
	}
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
		color: $mainColor;
		padding: 0 10px;
		cursor: pointer;
	}
	.l-d-header {
			display: inline-block;
			width: 100%;
			padding-bottom: 20px;
			border-bottom: 10px solid #f8f8f8;
			.d-h-title {
				width: 100%;
				height: 50px;
				line-height: 50px;
				.h-t-left {
					margin-left: 50px;
					padding-left: 30px;
					float: left;
					font-size: 16px;
					font-weight: bold;
					/*background: url(./images/sideslip_icon.png) no-repeat;*/
					background-position: 0;
				}
				.h-t-right {
					float: right;
					margin-right: 40px;
				}
			}
			.d-h-info {
				padding-left: 50px;
			}
		}
</style>