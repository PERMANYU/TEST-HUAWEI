
<template>
	<div class="list">
		<Shrink>
			<Scroll slot="shrink" :isShowRight="true">
				<TreeSimple v-for="(item,index) in tableData" :folder="item"  :key="index"  v-model="treeModel"  :selLevel="1" :childrenStr="'busiObjs'"  :levelStr="'level'"  :keys="folderKeys"></TreeSimple>
			</Scroll>
			<div class="right">
				<div class="d-s">
					<div class="search">
						 <Col :span="3" class="data-col">
								<i class="icon-all"></i>
								<i class="icon-down" :class="{activeIcon:downFlag}"></i>
								<DropSel :obj="tabs" :text="tabDefault" @change="dropChange" @click.native="toggleDown()"></DropSel>
							</Col>
						<Col class="l-search-name" :span="8" >
							<Search placeholder="请输入业务对象名称 / 业务对象代码" @search="searchResource"></Search>
						</Col>
					</div>
					<div class="h-a-add">
						<div class="app__btn app__btn-add" @click="addObject">添加</div>
					</div>
				</div>
				<div :class="['h-operation',checkboxData.length > 0 ? 'active' : '']" >
					<div class="h-o-item">
						已选中<span class="h-o-count">{{checkboxData.length}}</span>项
					</div>
					<div class="h-o-item delete" @click="delClick('top')">
						删除
					</div>
					<div class="h-o-item modify" @click="updataObject('top')">
						修改
					</div>
					<div class="h-o-item release" @click="upClick('top')">
						升级
					</div>
				</div>
				<div class="a-v-table app__table">
					<Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
						<DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
							<Col :span="4">选择</Col>
							<DragItem :class="['m-item']" :span="item.span" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+index">
								<span>{{item.name}}</span>
								<ColSel class="col-search" 
										:showOrder="false"
										@confirm="Confirmfilter(item.param)"
										>
									<Input v-if="item.param != 'statusCd'" :placeholder="'请输入'+ item.name" v-model="item.part"></Input>
									<Radio v-else class="col-radio" :label="items" :name="item.param"
											v-for="(items,index) in item.parent" :key="index" 
											v-model="item.part">
											{{items.label}}
									</Radio>
								</ColSel>
							</DragItem>
							<Col :span="4">操作</Col>
						</DragGroup>	
						<Row class="app__table-item" v-for="(item,index) in busiList" :key="index">
							<Col :span="4" class="v-t-checkbox">
								<Checkbox name="checkbox1" :label="item" v-model="checkboxData"></Checkbox>
							</Col>
							<Col :span="titleItem.span" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
								<span>{{adjustTabelItemText(item,titleItem.param)}}</span>
							</Col>
							<Col :span="4">
								<span class="span" v-show="item.statusCd == '1200'" @click="pubClick(item)">发布</span>
								<span class="span" v-show="item.statusCd == '1000'" @click="upClick('bottom',item)">升版</span>
								<span class="span" v-show="item.statusCd != '1000'" @click="updataObject('bottom',item)">修改</span>
								<span class="span" v-show="item.statusCd != '1000'" @click="delClick('bottom',item)">删除</span>
								<span class="span" v-show="item.statusCd == '1000'" @click="bottomClick(item)">下架</span>
							</Col>
						</Row>
						<Row :class="['m-item app__table-item']" v-if="busiList.length != 0" v-for="item in (20 - busiList.length)" :key="item.busiObjNbr"></Row>
						<Row v-show="!busiList.length" class="app__data-none">
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
			</div>
		</Shrink>
        <!--删除确认框-->
        <Tip ref="tipDel" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
        <!--升级确认框-->
        <Tip ref="tipUp" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			componentData:{
			},
		},
		data(){
			return{
				staff:'222',
				busiObjId:'',
				downFlag: false,
				tabDefault:"全部数据",
                tabs: [
                    {label: '全部数据', value: '2'}
                ],
                tipInfo: {
                    iconType: 1,
                    msg: '',
                    showBtn: {
                        clear: true,
                        save: true
                    }
				},
				pageInfo:{
					pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 0      // 总条数
				},
				tableData:{},
				treeModel:'',//树数据
				folderKeys: [{key: 'busiObjName'}],
				checkboxData: [],
				pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 0      // 总条数
				},
				tableTitleData:[{
					name:'业务对象编码',
					param:'busiObjNbr',
					span:4,
					part:''
				},{
					name:'业务对象名称',
					param:'busiObjName',
					span:4,
					part:''
				},{
					name:'状态',
					param:'statusCd',
					span:4,
					part:'',
					parent:[
						{label:'有效',value:'1000'},
						{label:'无效',value:'1100'},
						{label:'未生效',value:'1200'},
						{label:'已归档',value:'1300'},
					],
				},{
					name:'版本号',
					param:'verNum',
					span:4,
					part:''
				}],
				statusCdObj:[
					{label:"有效",value:"1000"},
					{label:"无效",value:"1100"},
					{label:"未生效",value:"1200"},
					{label:"已归档",value:"1300"}
				],	
				busiList:[],//业务对象列表
				OrdBusiObj:''
			}
		},
		watch:{
			treeModel(newVal){
				this.getBusiList(newVal.busiObjName,newVal.busiObjNbr,newVal.busiObjId)
				this.checkboxData = [];
			}
		},
		mounted(){	
			this.getTableData();
			this.getBusiList();
		},
		methods:{
			pageChange(page) {
				this.pageInfo.pageIndex = page;
                this.getBusiList();
			},
			//列表计算显示
            adjustTabelItemText(item, param) {
				let val = item[param];
				// console.log(val);
                switch(param) {
                    case 'busiObjNbr':
                        return item.busiObjNbr;
                    case 'busiObjName':
                        return item.busiObjName;
                    case 'verNum':
                        return item.verNum;
                    case 'statusCd':
                        return this.getStatus(val);
                    default:
                        return val;
                }
            },
			getStatus(val) {//获取状态
				if(val){
					return this.statusCdObj.find(item => item.value == val).label;
				}else{
					return '空'
				}
			},
			//查询树
            getTableData() {
                this.$axios.get(this.$api.GetOrdBusiObjTree, {
                }).then((res) => {
                    if (res.data.success == true) {
						this.tableData = res.data.busiObjTrees;
					} else {
						this.$message.error({message:"查询失败"})
                    }
                }).catch(error=>{
					this.$message.error({message:"查询失败"})
				})
			},
			getBusiList(name,nbr,busiObjId){
				this.$axios.get(this.$api.OrdBusiObj, {
                    params: {
                        busiObjId:busiObjId,
						busiObjName:name,
						busiObjNbr:nbr,
                        busiObjPublishId: "",//发布ID
						busiTypeId: '',//业务大类主键
						offset:'',
						pageNumber:this.pageInfo.pageIndex,
						pageSize:20,
						parBusiObjId:'',
						statusCd:'',
                    }
                }).then((res) => {
                    if (res.data.success) {
						this.busiList = res.data.page.content
                        this.pageInfo = {
                            pageIndex: res.data.page.page,
                            pageSize: res.data.page.limit,
                            rowCount: res.data.page.total,
                        };

                    }else{
						this.$message.error({ message : '查询失败' })
					}
                    
                })
			},
			//添加弹窗
			addObject() {
				let obj = this.treeModel ? this.treeModel : {a:"show"}
				this.$emit('componentView','add',obj)
			},
			//修改弹窗
			updataObject(type,item) {
				if(this.checkboxData.length > 1){
					this.$message.error({ message : '请选择一条数据'})
					return
				}
				if(type == 'top'){
					var busiObjId = this.checkboxData[0].busiObjId
				}else if(type == 'bottom'){
					var busiObjId = item.busiObjId
				}
				this.$axios.get(this.$api.replace(this.$api.GetBusiObjAttr,['{busiObjId}'],[busiObjId]), {
                   params:{
					   busiObjId:busiObjId 
				   }
                }).then((res) => {
                    if (res.data.success) {
						let obj = res.data.dOrdBusiObjDetail;
						this.$emit('componentView','updata',obj)
                    }else{
						this.$message.error({ message : '查询失败' })
					}
                    
                })
			},
			editObject() {
			},

            //点击删除
            delClick(type,item) {
				if(this.checkboxData.length > 1){
					this.$message.error({ message : '请选择一条数据'})
					return
				}
				if(type == 'top'){
					this.OrdBusiObj = this.checkboxData[0];
				}else if(type == 'bottom'){
					this.OrdBusiObj = item;
				}
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要删除选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tipDel.show();
                this.tipConfirmType = 'del';
            },
            tipConfirm() {
				if(this.tipConfirmType == 'del'){
					this.$axios.post(this.$api.AddOrdBusiObjAttrDetail, { //业务对象保存
							"actType": "DEL",
							"applyRegionId": 0,
							"busiObjDesc": this.OrdBusiObj.busiObjDesc,
							"busiObjId": this.OrdBusiObj.busiObjId,
							"busiObjName": this.OrdBusiObj.busiObjName ? this.OrdBusiObj.busiObjName : '',
							"busiObjNbr": this.OrdBusiObj.busiObjNbr ? this.OrdBusiObj.busiObjNbr : '',
							"busiObjPublishId":  this.OrdBusiObj.busiObjPublishId,
							"busiTypeId": this.OrdBusiObj.busiTypeId ,
							"createDate": "2018-11-26T02:05:07.396Z",
							"createStaff": 0,
							"dOrdBusiObjAttrDetails":this.OrdBusiObj.dOrdBusiObjAttrDetails ? this.OrdBusiObj.dOrdBusiObjAttrDetails : [],
							"parBusiObjId": this.OrdBusiObj.parBusiObjId,
							"remark": "",
							"statusCd": this.OrdBusiObj.statusCd,
							"statusDate": "2018-11-26T02:05:07.396Z",
							"updateDate": "2018-11-26T02:05:07.396Z",
							"updateStaff": 0,
							"verNum": 0
					}).then((res) => {
						if (res.data.success) {
							this.$message.success({ message : '删除成功' })
							this.getBusiList();
							this.getTableData();
							this.$refs.tipDel.hide();
						}else{
							this.$message.error({ message : '删除失败' })
						}
					}).catch(error=>{
							this.$message.error({ message : '删除失败' })
					})
				}else if(this.tipConfirmType == 'up'){
					this.$axios.post(this.$api.replace(this.$api.UpgredeBusiObj,['{busiObjId}'],[this.busiObjId]), {
						busiObjId:this.busiObjId,
						staff:this.staff
                	}).then((res) => {
                    //console.log(res,'列表')
                    if (res.data.success == true) {
						this.$message.success({message:"升版成功"})
						this.$refs.tipUp.hide();
						this.getBusiList();
						this.getTableData();
                    }else{
						this.$message.error({ message : '升版失败' })
					}
                	})
				}else if(this.tipConfirmType == 'bottom'){
					this.$axios.post(this.$api.replace(this.$api.OfflinebusiObj,['{busiObjId}'],[this.busiObjId]), {
						busiObjId:this.busiObjId,
						staff:this.staff
                	}).then((res) => {
                    //console.log(res,'列表')
						if (res.data.success == true) {
							this.$message.success({ message : '下架成功' })
							this.getBusiList();
							this.getTableData();
							this.$refs.tipUp.hide();
						}else{
							this.$message.error({ message : '下架失败' })
						}
                	}).catch(error=>{
						this.$message.error({ message : '下架失败' })
					})
				}else if(this.tipConfirmType == 'pub'){
					this.$axios.post(this.$api.replace(this.$api.ReleasebusiObj,['{busiObjId}'],[this.busiObjId]), {
						busiObjId:this.busiObjId,
						staff:this.staff
                	}).then((res) => {
                    if (res.data.success == true) {
						this.$message.success({message:"发布成功"})
						this.getBusiList();
						this.getTableData();
						this.$refs.tipUp.hide();
                    }else{
						this.$message.error({ message : '发布失败' })
					}
                	}).catch(error=>{
						this.$message.error({ message : '发布失败' })
					})
				}
			},
			//表头字段
			dragchange(val){//拖拽
				this.tableTitleData = val;
			},
			searchResource (data) {
				this.pageInfo.pageIndex = 1;
				this.getBusiList(data)
			},
			//获取属性值类型
            getAttrValueType(type) {
                switch(type) {
                    case '1000':
                        return '日期型';
                    case '1100':
                        return '日期时间型';
                    case '1200':
                        return '字符型';
                    case '1300':
                        return '浮点型';
                    case '1400':
                        return '整数型';
                    case '1500':
                        return '布尔型';
                    case '1600':
                        return '计算型';
                    default:
                        return "未知";
                }
            },
            //获取唯一性
            getIsUnique(type) {
                switch(type) {
                    case 1:
                        return '是';
                    case 0:
                        return '否';
                    default:
                        return "未知";
                }
            },
            //获取是否可空
            getIsNullable(type) {
                switch(type) {
                    case 1:
                        return '是';
                    case 0:
                        return '否';
                    default:
                        return "未知";
                }
            },
            //获取状态(数据对应错误)
            getStatusCd(type) {
                switch(type) {
                    case '1000':
                        return '有效';
                    case '1100':
						return '无效';
					case '1200':
						return '未生效';
					case '1300':
						return '已归档';
                    default:
                        return "未知";
                }
            },
            //点击升级
            upClick(type,item) {
				if(this.checkboxData.length > 1){
					this.$message.error({ message : '请选择一条数据'})
					return
				}
				if(type == 'top'){
					this.busiObjId = this.checkboxData[0].busiObjId;
					if(this.checkboxData[0].statusCd != '1000'){
						this.$message.error({message:'未发布，无法升版'})
						return
					}
				}else if(type == 'bottom'){
					this.busiObjId = item.busiObjId
				}
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要升级选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tipUp.show();
                this.tipConfirmType = 'up';
			},
			//点击发布
			pubClick(item) {
				this.busiObjId = item.busiObjId
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要发布选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tipUp.show();
                this.tipConfirmType = 'pub';
			},
			//点击下架
			bottomClick(item){
				this.busiObjId = item.busiObjId		
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要下架选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tipUp.show();
                this.tipConfirmType = 'bottom';
			},
			dropChange(val){

			},
			toggleDown() {
                //this.downFlag = !this.downFlag;
			},
			Confirmfilter(val){
				console.log(val)
			}
		}
	}
</script>

<style scoped lang="scss">
	.list{
		width: 100%;
		height: 100%;
		border: 0;
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
					top: 30px;
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
		.right{
			width: 100%;
            height: 100%;
			padding: 90px 0 50px 0;
				.d-s {
					position: absolute;
					width: 100%;
					height: 50px;
					top: 25px;
					.search {
						position: absolute;
						width: 100%;
						height: 50px;
						padding-left:10px; 
						.data-col {
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
								background: url(./images/all.png) no-repeat center;
								background-size: 18px 18px;
							}
							.drop-sel {
								padding: 0 20px 0 20px;
							}
							.icon-down {
								position: absolute;
								display: block;
								width: 12px;
								height: 12px;
								margin-top: 10px;
								left: 100px;
								background: url(./images/down.png) no-repeat center;
								background-size: 10px 6px;
							}
							.activeIcon{
								display: none;
							}
						}
					}
					.h-a-add{
						position: absolute;
						top: 10px;
						right: 10px;
						height: 30px;

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
</style>

