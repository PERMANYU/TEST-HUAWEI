<template>
	<div class="main-table">
		<!-- <div class="require-data">
			<keep-alive>
				<component :is="currentView" v-if="currentView = 'info'" ref="info"></component>
			</keep-alive>
		</div> -->
		<div class="main">
			<!-- 表头的数据 -->
			<Scroll class="app__table" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title" ref="listScroll">
				<DragGroup class="m-title app__table-thead" inline :titleList="tableTitleData" @dragchange="dragchange">
					<Col class="m-item m-t-name" :width="tableAccessNameObj.width">
						<!-- <PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],tableRequirementNameObj)"/> -->
						<span>{{tableAccessNameObj.name}}</span>
					</Col>

					<DragItem :class="['m-item']" :width="titleItem.width" :value="titleItem" v-for="(titleItem,titleIndex) in tableTitleData" :key="'table'+titleIndex">

						<!-- <PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/> -->

						<span>{{titleItem.name}}</span>
					</DragItem>

					<Col :class="['m-item']" :width="tableAccessOperationObj.width">
						<span>操作</span>
					</Col>
					<!-- <Col :span="4">操作</Col> -->
				</DragGroup>
				
				<Row :class="['m-item app__table-item']" inline v-if="accessGroupList.length>0" v-for="(item,index) in accessGroupList" :key="index">
					<Col class="goods-name m-i-name" :width="tableAccessNameObj.width" @click.native.stop="nameClick('detail', item)" @itemSel="itemSel(item)"  :title="item.groupName">
					{{item.groupName}}
					</Col>
					<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
						<span v-if="titleItem.param == 'effectiveDate' || titleItem.param == 'expiryDate'">{{adjustTabelItemText(item,titleItem.param) | date}}</span>
						<span v-else>{{adjustTabelItemText(item,titleItem.param)}}</span>
					</Col>
					<Col :width="tableAccessOperationObj.width">
						<span class="span" v-show="item.statusCd != '1000'" @click="editBusiness('add',item)">修改</span>
						<span class="span" v-show="item.statusCd != '1000'" @click="listReleaseClick('publish',item)">发布</span>
						<span class="span" v-show="item.statusCd != '1000'" @click="clickDel('del',item)">删除</span>
						<span class="span" v-show="item.statusCd == '1000'" @click="topBusiness('ascend',item)">升版</span>
						<span class="span" v-show="item.statusCd == '1000'" @click="bottomBusiness('bottom',item)">下架</span>
					</Col>
				</Row>
				<Row v-if="!accessGroupList.length" class="app__data-none">
					<Col :span="24"><span>当前无数据!</span></Col>
				</Row>
				<!--<Row :class="['m-item app__table-item']" v-for="fillItem in 20 - requirementList.length" :key="fillItem">
				</Row>-->
			</Scroll>
		</div>
		<div class="footer">
			<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange">
			</Pagination>
		</div>
		
		<!-- 修改访问组
		<Dialog :dialogSize="editOfferDialogSize" dialogTitle="修改访问组" ref="editAccessRelsDialog" @confirm="editAccessRelsSubmit">
			<Form labelWidth="100px" data-vv-scope="editOffer">
				<div class="edit-offer-dialog">
					<Form labelWidth="120px" labelAlign="left">
						<Col :span="8">
							<FormItem labelText="组名称：" :requiredIcon="true" :errorMessage="errors.first('groupName')">
								<Input v-validate="'required'" v-model.trim="editAccessRelObj.groupName"  name="groupName" data-vv-as="组名称"></Input>
							</FormItem>
						</Col>
						<Col :span="7" :offset="1">
							<FormItem labelText="地区:" >
								<Input  v-model.trim="editAccessRelObj.area" name="area" data-vv-as="地区"></Input>
							</FormItem>
						</Col>
						<Col :span="7" :offset="1">
							<FormItem labelText="组类型:">
								<Select :data="groupTypeArray"  v-model="editAccessRelObj.groupType" name="groupType" data-vv-as="组类型"></Select>
							</FormItem>
						</Col>
						<Col :span="8">
							<FormItem labelText="生效方式:" :requiredIcon="true" :errorMessage="errors.first('effectiveWay')">
								<Select v-validate="'required'" :data="effectiveWay"  v-model="editAccessRelObj.effectiveWay" name="effectiveWay" data-vv-as="生效方式"></Select>
							</FormItem>
						</Col>
						<Col :span="7" :offset="1">
							<FormItem labelText="生效时间:" :requiredIcon="true" :errorMessage="errors.first('effectiveDate')">
								<DatePicker v-validate="'required'" v-model="editAccessRelObj.effectiveDate" name="effectiveDate" placeholder="年/月/日" data-vv-as="生效时间"></DatePicker>	
							</FormItem>
						</Col>
						<Col :span="7" :offset="1">
							<FormItem labelText="失效时间:" :requiredIcon="true" :errorMessage="errors.first('expiryDate')">
								<DatePicker v-validate="'required'"  v-model="editAccessRelObj.expiryDate" name="expiryDate" placeholder="年/月/日" data-vv-as="失效时间"></DatePicker>	
							</FormItem>
						</Col>
						<Col>
							<FormItem labelText="描述:">
								<textarea  v-model="editAccessRelObj.groupDesc" name="groupDesc" class="access-textarea"></textarea>
							</FormItem>
						</Col>
						<Col>
							<FormItem labelText="是否邮件通知:">
								<Radio name="publishMode" label="0"
								v-model="editAccessRelObj.publishMode">是</Radio>
								<Radio name="publishMode" label="1"
								v-model="editAccessRelObj.publishMode">否</Radio>
							</FormItem>
						</Col>
						<Col>
							<div class="search-box">
								<div class="search-items" ref="searchItems">
									<div :class="['search-item']"
										>
										<span>{{editAccessRelObj.notifyStaffName}}</span>
										<span class="item-close" @click="closeSearch(index)"></span>
									</div>
									<div class="app__btn app__btn-add" @click="addStaffRels()">添加</div>
								</div>
							</div>
						</Col>
					</Form>
				</div>
			</Form>
		</Dialog> -->
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
		<Tip ref="tipDel" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		name: 'havedone',
		data() {
			return {
				staff: '11222',
				currentView: 'info',
				checkboxData: [],
				pageInfo: {
					pageIndex: 1,
					pageSize: 10,
					rowCount: 0
				},
				tableAccessNameObj:{
					name: '访问组名称',
					param: 'groupName',
					wp: 0.12,
					width: 200,
					part:""
				},
				tableTitleData: [{
					name: '访问组编码',
					param: 'groupCode',
					wp: 0.12,
					width: 200,
					part:""
				}, {
					name: '地区',
					param: 'area',
					wp: 0.12,
					width: 200,
					part:""
				}, {
					name: '类型',
					param: 'groupType',
					wp: 0.12,
					width: 200,
					parent:[
						{label:'省个性化组',value:'0'},
						{label:'特殊权限组',value:'1'},
						{label:'限制组',value:'2'},
					],
					part:""
				}, {
					name: '生效时间',
					param: 'effectiveDate',
					wp: 0.12,
					width: 200,
					part:""
				},{
					name: '失效时间',
					param: 'expiryDate',
					wp: 0.12,
					width: 200,
					part:""
				},{
					name: '状态',
					param: 'statusCd',
					wp: 0.12,
					width: 200,
					parent:[
						{label:'生效',value:'1000'},
						{label:'失效',value:'1100'},
						{label:'未生效',value:'1200'},
					],
					part:""
				}],
				statusCdObj: [
					{label:'生效',value:'1000'},
					{label:'失效',value:'1100'},
					{label:'未生效',value:'1200'}
				],
				groupTypeObj: [
					{label:'省个性化组',value:'0'},
					{label:'特殊权限组',value:'1'},
					{label:'限制组',value:'2'}
				],
				tableAccessOperationObj:{
					name: '操作',
					param: 'operation',
					wp: 0.16,
					width: 200,
					part:""
				},
				groupId: "", //ID
				accessGroupList: [],
				searchObj: {
					groupCode: '',
					groupName: '',
                    statusCd: '',
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
				documentList: [],
				statusCd:'',

				editOfferDialogSize:{
					size: 100,
					min: 800,
					max: 1000
				},
				editAccessRelObj: {},
				staffs: [],
				arr1: [],
				arr2: [],
				pageShowType: 3 
			}
		},
	
		mounted() {
			this.adjustTableWidth();
			this.pageChange(1);
		},
		methods: {
		    //点击查看
            

		    //获取需求单列表
			initData() {
				this.$axios.get(this.$api.QueryAccessGroupList, {
					params: {
						groupCode: this.searchObj.groupCode,
						groupName: this.searchObj.groupName,
						statusCd:  '',
						limit: 10,
						page: this.pageInfo.pageIndex,
						}
				}).then(res => {
					if(res.data.success === true) {
						this.accessGroupList = res.data.accessGroups.content || [];
						this.pageInfo.rowCount = res.data.accessGroups.total;

						// this.$nextTick(() => {
						// 	this.$refs.listScroll.init();
						// })
					} else {
						this.$message.error({ "message": "查询失败！" })
					}
				}).catch(error => {
					this.$message.error({ "message": "服务器异常！" })
				})
			},

			pageChange(page) {
				this.pageInfo.pageIndex = page;
				this.initData();
                //如果不是待办就调用initData；是就调用initData2
                // if(this.searchObj.statusCd!='1002'){
                //     this.initData();
                // }else{
                //     this.initData2();
                // }
			},
			search(val) {
				this.searchObj.groupName = val;
				this.pageChange(1);
			},
			adjustTabelItemText(item, param) { //计算显示
				let val = item[param];
				switch(param) {
					case 'statusCd':
						return this.getStatus(val);
					case 'groupType':
						return this.getGroupType(val);
					default:
						return val;
				}
			},
			getStatus(val) { // 获取状态
				return {
					'1000': '生效',
					'1100': '失效',
					'1200': '未生效'
				}[val] || '未知'
			},
			getGroupType(val) { // 获取类型
				return {
					'0': '省个性化组',
					'1': '特殊权限组',
					'2': '限制组',
				}[val] || '未知'
				
			},

			// 跳转详情
			nameClick(type, val) {
				this.$emit('componentView', type, val)
				console.log(type)
			},

			// 跳转修改
			editBusiness(type,item) {
				// 发布状态
				if (item.statusCd == '1000') {
					this.$message.error({ message : "已发布,无法修改"})
					return
				}
				this.$emit('componentView', type,item)
			},
			// 关闭标签
			closeSearch() {

			},
			// 添加员工集合
			addStaffRels() {

			},
			// 发布
			listReleaseClick(type,item) {
				this.groupId = item.groupId;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `确认要发布吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			
			// 删除
			clickDel(type,item) {
				this.groupId = item.groupId;
				console.log(this.groupId)
				this.tipInfo.iconType = 3;
                this.tipInfo.msg = `确认要删除选择的记录吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tipDel.show();
			},
			// 升版
			topBusiness(type,item) {
				this.groupId = item.groupId;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `确认要升版吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			// 下架
			bottomBusiness(type,item) {
				this.groupId = item.groupId;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `确认要下架吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			// // 修改的确认
			// editAccessRelsSubmit() {
			// 	console.log('修改的确认')
			// 	this.$refs.editAccessRelsDialog.hide();
			// },
			
			adjustTableWidth(){
				this.tableAccessNameObj.width = this.$el.getBoundingClientRect().width * this.tableAccessNameObj.wp;
				this.tableAccessOperationObj.width = this.$el.getBoundingClientRect().width * this.tableAccessOperationObj.wp;
				this.tableTitleData.map(item => {
					item.width = this.$el.getBoundingClientRect().width * item.wp;
				})
			},
			
			
			dragchange(val) {
				this.tableTitleData = val;
			},
			// pullMove(w,item){
			// 	item.width = w;
			// },
			// pullEnd(){
			// 	this.$refs.listScroll.initScroll();
			// },
			
			searchClick() {

			},
			
			reqOperationClick(item){
				this.itemDel(item)
			},
			
			downLoad(item) {
				window.open(this.$api.Shtelpaasstorage + item.documentId)
			},
			adjustOperationShow(item){
				//计算列表操作是否可见
				return true;
			},
			adjustOperationName(item){
				//计算列表操作显示名称

			},
			adjustOperationClick(item){
				
			},
			adjustProdShow(item){
				
			},
			adjustProdClick(item){
				
			},
			// 提示框发布
			tipConfirm(){
				if(this.tipInfo.msg == `确认要发布吗？`){
					console.log("确认要发布吗？")
					this.$axios.post(this.$api.replace(this.$api.ReleaseAccessGroup, ['{groupId}'], [this.groupId]), {
						groupId:  this.groupId,
						staff: this.staff
					}).then(res => {
						console.log(res)
						if (res.data.success == true) {
							this.$message.success({ message : '发布成功'})
							this.initData();
						}
						this.$refs.tip.hide();
					}).catch(error => {
						this.$message.error({ message : '发布失败'})
					}) 

				}else if(this.tipInfo.msg == `确认要删除选择的记录吗？`){
					this.$axios.delete(this.$api.replace(this.$api.QueryAccessGroupTask, ['{groupId}'], [this.groupId]), {
						params: {
							groupId: this.groupId,
							updateStaff: this.$user.getInfo().id
						}
					}).then(res => {
						console.log(res)
						if (res.data.success) {
							this.$message.success({message: '删除成功!'});
							this.initData();
						} else {
							this.$message.error({ message : '删除失败'});
						}
						this.$refs.tipDel.hide();
					}).catch(error => {
						this.$message.error({message: '删除失败!'});
					})
					console.log("确认要删除选择的记录吗？")
				}else if(this.tipInfo.msg == `确认要升版吗？`){
					console.log("确认要升版吗？")
					this.$axios.post(this.$api.replace(this.$api.RiseAccessGroup, ['{groupId}'], [this.groupId]), {
							groupId:  this.groupId,
							staff: this.staff
					}).then(res => {
						console.log(res)
						if (res.data.success) {
							this.$message.success({ message : '升版成功'})
							this.initData();
						}else{
							this.$message.error({ message : '升版失败'})
						}
							this.$refs.tip.hide();
					}).catch(error => {
						this.$message.error({ message : '升版失败'})
					})
				}else if(this.tipInfo.msg == `确认要下架吗？`){
					console.log("确认要下架吗？")

					this.$axios.delete(this.$api.replace(this.$api.QueryAccessGroupTask, ['{groupId}'], [this.groupId]), {
						params: {
							groupId: this.groupId,
							updateStaff: this.$user.getInfo().id
						}
					}).then((res) => {
						console.log(res)
						if (res.data.success) {
							this.$message.success({ message : '下架成功'})
							this.initData();
						}else{
							this.$message.error({ message : '下架失败'})
						}
							this.$refs.tip.hide();
					}).catch((error)=>{
						this.$message.error({ message : '下架失败'})
					})
				}
			},
		},
		components: {
			// info: () =>import('../../../info')
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
				//text-align: center;
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
					background: url(./images/sideslip_icon.png) no-repeat;
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
		.require-info {
			width: 100%;
			padding-left: 20px;
			padding-top: 20px;
			.have-span {
				padding: 5px 50px 5px 10px;
				background: #eff7fe;
				color: $mainColor;
				margin-right: 10px;
				.delete {
					background: url(images/down.png) no-repeat;
					width: 10px;
				    height: 10px;
				    position: absolute;
				    top: 10px;
				    right: 20px;
				    cursor: pointer;
				    background-size: cover;
				}
			}
		}
		.form-item {
			//padding-left: 60px !important;
			//margin-left: 10px;
			.f-i-l {
				font-size: 16px;
			}

			.access-textarea {
				width: 100%;
				height: 60px;
				padding: 5px;
				outline: 0;
				border: 1px solid #d8dcdf;
				border-radius: 4px;
				resize: none;
				color: #7a7a86;
			}
		}

		.edit-offer-dialog {
			padding: 20px;
		}
</style>
