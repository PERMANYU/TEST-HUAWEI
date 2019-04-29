<template>
	<div class="list">
		<Shrink>
			<Scroll slot="shrink" :isShowRight="true">
				<TreeSimple v-for="(item,index) in tableData" :folder="item" :key="index"
				:keys="folderKeys" levelStr="level"
				@plugClick="getNext" v-model="treeModel"/>
			</Scroll>
			<div class="right">
				<div class="d-s">
					<span class="d-name">{{treeModel.catalogItemName ? treeModel.catalogItemName : '已选主题域'}}</span>
					<div class="h-a-add">
						<div class="app__btn btn-add" @click="addFairValue()">添加公允价值</div>
					</div>
					<div class="search">
						<Select  :data="fairClass"  v-model="fairObj.bizTypeId" name="bizTypeId" data-vv-as="类型" @change="bizTypeChange"></Select>
						<!-- <input type="text" placeholder="请输入业务名称" v-model="fairObj.fairValueName">
						<Search placeholder="请输入资费模板/产品名称" @search="searchFair" class="fair-search"></Search> -->
						<Search placeholder="请输入业务名称" @search="searchFair" class="fair-search"></Search>
					</div> 
				</div>
				
				<div class="a-v-table app__table">
					<Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
						<DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
							
							<Col class="m-item m-t-name" :span="tableAccessNameObj.span">
								<span>{{tableAccessNameObj.name}}</span>
							</Col>

							<DragItem :class="['m-item']" :span="item.span" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+index">
								<span>{{item.name}}</span>
								
							</DragItem>
							
							<Col :span="4">操作</Col>
						</DragGroup>	
						<Row :class="['app__table-item m-item']" v-for="(item,index) in tabList" :key="index">
							
							<Col class="goods-name m-i-name" :span="tableAccessNameObj.span" @click.native.stop="nameClick('info', item)" @itemSel="itemSel(item)"  :title="item.fairValueName">
								{{item.fairValueName}}
							</Col>
							<Col :span="titleItem.span" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex" class="m-item">
								<span v-if="titleItem.param == 'bizType'">{{adjustTabelItemText(item, titleItem.param) == '1' ? '功能类' : '通信类'}}</span>
								<span v-else>{{adjustTabelItemText(item,titleItem.param)}}</span>
							</Col>
							<Col :span="4">
								<!-- <span class="span" v-show="item.statusCd == '1000'" @click="topFair('top',item)">升版</span> -->
								<span class="span" v-show="item.statusCd != '1000'" @click="modFair('edit',item)">修改</span>
								<span class="span" v-show="item.statusCd == '1200'" @click="pubFair(item)">发布</span>
								<span class="span" v-show="item.statusCd != '1000'" @click="delFair('del',item)">删除</span>
								<span class="span" v-show="item.statusCd == '1000'" @click="bottomFair(item)">下架</span>
							</Col>
						</Row>
						<Row :class="['m-item app__table-item']" v-if="tabList.length != 0" v-for="item in (10 - tabList.length)" :key="item.domainNbr"></Row>
						<Row v-show="!tabList.length" class="app__data-none">
							<Col :span="24">
								<span>暂无数据</span>
							</Col>
						</Row>
					</Scroll>
				</div>
				<div class="footer">
					<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages="5" @change="pageChange">
					</Pagination>
				</div>
				<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
				<Tip ref="tipDel" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
			</div>
		</Shrink>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'list',
		data() {
			return{
				tableData: {},
				folderKeys: [
                    {
                        key: 'catalogItemName', 
                    }
				],
				catalogItemId: '', // 目录id
				fairObj: {
					
				},
				treeModel: '',
				fairValueId: '',
				tableAccessNameObj:{
					name: '业务名称',
					param: 'fairValueName',
					span: 5,
					part:""
				},
				tableTitleData: [{
					name: '类型',
					param: 'bizType',
					span: 5,
					parent: [
						{label: '功能类', value: '1'},
						{label: '通信类', value: '2'}
					]
				},{
					name: '公允价值',
					param: 'fairValue',
					span: 5,
				},{
					name: '单位',
					param: 'unit',
					span: 5,
				}],
				// 生效方式
				fairClass: [{
					label: '功能类',
					value: '1'
				},{
					label: '通信类',
					value: '2'
				}],
				statusCdObj: [
					{label:'生效',value:'1000'},
					{label:'失效',value:'1100'},
					{label:'未生效',value:'1200'}
				],
				fairValueArray: [{
					label: '元/分钟',
					value: '10'
				},{
					label: '元/月',
					value: '11'
				},{
					label: '元/MB',
					value: '12'
				},{
					label: '元/分钟',
					value: '13'
				},{
					label: '元/条',
					value: '14'
				},{
					label: '元/月/账号',
					value: '15'
				}],
				tabList: [],
				pageInfo: {
                    pageIndex: 1, 
                    pageSize: 10, 
                    pageCount: 0, 
                    rowCount: 0   
				},
				tipInfo: {
                	iconType:1,
                	msg:'',
                	showBtn:{
                		clear: true,
                		save: true
                	}
				},
			}
		},
		watch:{
			treeModel(val){
				 this.getList('','','',val.catalogItemId);
			}
		},
		mounted() {
			this.getTableData();
			this.getList();
        },
		methods:{
			bizTypeChange(item) {
				this.getList(item.value, '', '', '')
			},
			// 获取公允列表
			getList(bizType,name, nbr, catalogItemId) {
				this.$axios.get(this.$api.QueryFairList, {
					params: {
						catalogItemId: catalogItemId,
						bizTypeId: bizType,
						fairValueName: name,
						limit: 10,
						page: this.pageInfo.pageIndex,
					}
				}).then(res => {
					if (res.data.success === true) {
						this.tabList = res.data.fairValuePage.content || [];
						this.pageInfo.rowCount = res.data.fairValuePage.total;
					}
				})
			},
			pageChange(page){
				this.pageInfo.pageIndex = page;
				this.getList();
			},
			//列表计算显示
            adjustTabelItemText(item, param) {
				let val = item[param];
                switch(param) {
					case 'unit':
						return this.getUnit(val);
                    case 'statusCd':
                        return this.getStatus(val);
                    default:
                        return val;
                }
			},
			getStatus(val) {
				return {
					'1000': '生效',
					'1100': '失效',
					'1200': '未生效'
				}[val] || '未知'
			},
			getUnit(val) {
				return {
					'10': '元/分钟',
					'11': '元/月',
					'12': '元/MB',
					'13': '元/分钟',
					'14': '元/条',
					'15': '元/月/账号',
				}[val] || '未知'
			},
			dragchange(val){
				this.tableTitleData = val;
			},
			// 获取公允价值树
			getTableData() {
				this.$axios.get(this.$api.GetFairTree, {
                }).then((res) => {
                    if (res.data.success == true) {
						this.tableData = res.data.catalogDetail.catalogItems || [];
                    } else {
						this.$message.error({message:"查询失败"})
                    }
                }).catch(error=>{
					this.$message.error({message:"查询失败"})
				})
			},
			//获取下一级
            getNext(val){
                if(val.isOpen&&val.data.children == null){
                    this.getTableData(val); 
                }
			},
			
			addFairValue() {
				this.$emit('componentView', 'add',{})
			},
			searchFair(val) {
				this.getList(this.fairObj.bizTypeId,val,'','')

			},
			
			// 详情
			nameClick(type, item) {
				this.$emit('componentView', 'info', item)
			},

			// 发布
			 pubFair(item) {
				this.catalogItemId = item.catalogItemId
				this.fairValueId = item.fairValueId;
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `确认要发布选择的记录吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
			},
			//升版
			// topFair(type,item) {
			// 	this.catalogItemId = item.catalogItemId
			// 	this.fairValueId = item.fairValueId
			// 	this.tipInfo.iconType = 3;
            //     this.tipInfo.msg = `确认要升版选择的记录吗？`;
            //     this.tipInfo.showBtn.clear = true;
            //     this.tipInfo.showBtn.save = true;
            //     this.$refs.tip.show();
			// },
			// 修改
			modFair(type, item) {
				this.$emit('componentView', 'edit', item)
			},
			// 删除
			delFair(type, item) {
				this.catalogItemId = item.catalogItemId
				this.fairValueId = item.fairValueId;
				this.tipInfo.iconType = 3;
                this.tipInfo.msg = `确认要删除选择的记录吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tipDel.show();
			},
			// 下架
			bottomFair(item) {
				this.catalogItemId = item.catalogItemId
				this.fairValueId = item.fairValueId;
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `确认要下架选择的记录吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
			},
			tipConfirm() {
				if (this.tipInfo.msg == `确认要发布选择的记录吗？`) {
					this.$axios.post(this.$api.replace(this.$api.ReleaseFair, ['{fairValueId}'], [this.fairValueId]), {
							fairValueId:this.fairValueId,
							staff:this.$user.getInfo().id
					}).then((res) => {
						if (res.data.success) {
							this.$message.success({ message : '发布成功'})
							// this.checkboxData = [];
							if (this.treeModel.catalogItemName != undefined ) {
								this.getList('','','', this.catalogItemId);
								this.getTableData();
							} else {
								this.getList();
								this.getTableData();
							}
						}else{
							this.$message.error({ message : '发布失败'})
						}
						this.$refs.tip.hide();
					}).catch((error)=>{
						this.$message.error({ message : '发布失败'})
					})
				}  else if (this.tipInfo.msg == `确认要下架选择的记录吗？`) {
					this.$axios.post(this.$api.replace(this.$api.DownFair, ['{fairValueId}'], [this.fairValueId]), {
						fairValueId:this.fairValueId,
						staff:this.$user.getInfo().id
					}).then((res) => {
						if (res.data.success) {
							// this.checkboxData = [];
							this.$message.success({ message : '下架成功'})
							if (this.treeModel.catalogItemName != undefined ) {
								this.getList('','','', this.catalogItemId);
								this.getTableData();
							} else {
								this.getList();
								this.getTableData();
							}
						}else{
							this.$message.error({ message : '下架失败'})
						}
							this.$refs.tip.hide();
					}).catch((error)=>{
						this.$message.error({ message : '下架失败'})
					})
				}  else if (this.tipInfo.msg == `确认要删除选择的记录吗？`) {
					this.$axios.delete(this.$api.replace(this.$api.DelFair, ['{fairValueId}'], [this.fairValueId]), {
						params: {
							fairValueId: this.fairValueId,
							staff: this.$user.getInfo().id
						}
					}).then(res => {
						if (res.data.success) {
							this.$message.success({message: '删除成功!'});
							if (this.treeModel.catalogItemName != undefined ) {
								this.getList('','','', this.catalogItemId);
								this.getTableData();
							} else {
								this.getList();
								this.getTableData();
							}
						} else {
							this.$message.error({ message : '删除失败'});
						}
						this.$refs.tipDel.hide();
					}).catch(error => {
						this.$message.error({message: '删除失败!'});
					})
				}
			}

		}
	}
</script>

<style scoped lang="scss">
.list{
		width: 100%;
		height: 100%;
		border: 0;
		padding: 20px;
		.left {
			width: 20%;
			height: 100%;
			float: left;
			.d-name {
				display: block;
				color: $mainColor;
				cursor: pointer;
				padding-left: 30px;
				background: url(images/sideslip_icon.png) no-repeat left center;
			}
			.d-n-name {
				width: 200px;
				height: 150px;
				border-left: 1px dashed $mainColor;
				margin-left: 30px;
				position: relative;
					.left-ul {
						width: 10%;
						height: 100%;
						position: absolute;
						top: 33px;

						li {
							width: 100%;
							height: 22%;
							line-height: 32px;
							margin-bottom: 15px;
							color: $mainColor;
						}
					}
					.right-ul {
						width: 80%;
						height: 100%;
						position: absolute;
						top: 36px;
						left: 10%;

						li {
							width: 100%;
							height: 22%;
							background: $mainColor;
							line-height: 35px;
							margin-bottom: 15px;
							border-radius: 5px;
							text-align: center;
							color: #ffffff;
						}
					}
				}
			}
		.right {
			width: 100%;
			height: 100%;
			padding: 90px 0 30px 0;

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
			.h-operation {
				position: absolute;
				top: 30px;
				left: -100%;
				width: 100%;
				height: 50px;
				line-height: 50px;
				transition: .3s all ease;
				background-color: #fff;
				&.active {
					top: 40px;
					left: 0;
				}
				.h-o-item {
					display: inline-block;
					padding: 0 20px;
					cursor: pointer;
					&.delete {
						background: url(./images/delete_gery.png) no-repeat;
						background-position: 0;
					}
					&.modify {
						background: url(./images/edit_grey.png) no-repeat;
						background-position: 0;
					}
					&.release {
						background: url(./images/release_grey.png) no-repeat;
						background-position: 0;
					}
					&:hover {
						color: $mainColor;
						&.delete {
							background: url(./images/delete_blue.png) no-repeat;
							background-position: 0;
						}
						&.modify {
							background: url(./images/edit_blue.png) no-repeat;
							background-position: 0;
						}
						&.release {
							background: url(./images/release_blue.png) no-repeat;
							background-position: 0;
						}
					}
				}
				.h-o-count {
					color: $mainColor;
				}
			}.h-operation {
				position: absolute;
				top: 45px;
				left: -100%;
				width: 100%;
				height: 50px;
				line-height: 50px;
				transition: .3s all ease;
				background-color: #fff;
				&.active {
					top: 45px;
					left: 0;
				}
				.h-o-item {
					display: inline-block;
					padding: 0 20px;
					cursor: pointer;
					&.delete {
						background: url(./images/delete_gery.png) no-repeat;
						background-position: 0;
					}
					&.modify {
						background: url(./images/edit_grey.png) no-repeat;
						background-position: 0;
					}
					&.release {
						background: url(./images/release_grey.png) no-repeat;
						background-position: 0;
					}
					&:hover {
						color: $mainColor;
						&.delete {
							background: url(./images/delete_blue.png) no-repeat;
							background-position: 0;
						}
						&.modify {
							background: url(./images/edit_blue.png) no-repeat;
							background-position: 0;
						}
						&.release {
							background: url(./images/release_blue.png) no-repeat;
							background-position: 0;
						}
					}
				}
				.h-o-count {
					color: $mainColor;
				}
			}
			.d-name {
				display: block;
				color: $mainColor;
				cursor: pointer;
				font-size: 16px;
				margin-bottom: 20px;
				padding-left: 30px;
				background: url(images/sideslip_icon.png) no-repeat left center;
			}
			.d-s {
				position: absolute;
				width: 100%;
				height: 50%;
				top: 15px;
				padding-left: 10px;
				.search {
					float: left;
					// width: 60%;
					top: -6px;
					
					
					input {
						float: left;
						height: 30px;
						line-height: 30px;
						padding: 0 0  0 10px;
						margin-right: 10px;
						border: 1px solid #d8dcdf;
					}
					.select {
						width: 22%;
						float: left;
						height: 30px;
						line-height: 30px;
						margin-right: 10px;
						z-index: 3;
					}
					.fair-search {
						width: 65%;
					}
					
					.s-span {
					    display: block;
					    width: 50px;
					    height: 30px;
					    background: $mainColor url(images/search-btn.png) no-repeat center center;
					    position: absolute;
					    top: 0;
					    right: 0;
					    border-top-right-radius: 5px;
					    border-bottom-right-radius: 5px;
					}
				}
			
				.h-a-add{
					position: absolute;
					top: 0;
					right: 10px;
					height: 30px;
					.btn-add{
                        padding: 0 15px 0 30px;
                        background-color: #fff;
                        color: $mainColor;
                        border: 1px solid $mainColor;
                        background-image: url(./images/add.png);
                        background-repeat: no-repeat;
                        background-position: 10px;
                        &:hover{
                            background-color: $mainColor;
                            color: #fff;
                            background-image: url(./images/add_hover.png);
                            background-repeat: no-repeat;
                            background-position: 10px;
                        }
                    }
				}
			}
			.footer{
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 50px;
				line-height: 50px;
				box-shadow: 0 -2px 0 #f1f5fa;
				.pagination{
					height: 50px;
				}
			}
			.a-v-table{
				width: 100%;
				height: 100%;
				padding: 0;
				border:1px solid #f0f0f0;
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
				.a-v-operation{
					margin-top: 20px;
					border-left:1px solid #f0f0f0;
                    text-align: center;
				}
				.v-t-title{
					color: #333;
					font-weight: bold;
					background-color: #f5fafd;
					border-top: 1px solid $mainColor;
				}

				.v-t-item{
					color: #777;
					text-align: left;
				}

				.span {
				color: $mainColor;
				padding: 0 5px;
				cursor: pointer;
			}
			}
		}
	}
	.h-dialog{

			.col{
				text-align: center;
			}
			.radio_add{
				height: 20px;
				margin-left: -15px;
                margin-top: 15px;
			}
			.add-margin{
				margin-top: 20px;
				margin-left: -50px;
			}
			.add-margin2{
				margin-left: -50px;
			}
			.add-margin3{
				margin-left: -50px;
				margin-bottom: 40px;
			}
			.h-dialog-search {
				width: 50%;
				margin:20px;
			}
			.h-d-title{
				background-color: #f8fcff;
				border-top: 1px solid $mainColor;
				margin: 0 20px;

				.col{
					border-width: 0 0 1px 1px;
					border-style: solid;
					border-color: #efefef;

					&:last-child{
						border-right: 1px solid #efefef;
					}
				}
			}
		}


	

</style>
