<template>
	<div class="list">
		<Shrink>
			<Scroll slot="shrink" :isShowRight="true">
				<TreeSimple v-for="(item,index) in tableData" :key="index" :folder="item"  v-model="treeModel"  :selLevel="1" :children-str="'children'" :init-level="1" :level-str="'level'"  :keys="folderKeys"></TreeSimple>
			</Scroll>
			<div class="right">
				<div class="right-title">
					<span class="d-name">{{treeModel ? treeModel.domainName : '主题域名称'}}</span>
					<div class="h-a-add">
						<div class="app__btn app__btn-add" @click="addBusiness">添加</div>
					</div>
				</div>
				<div class="d-s">
					<Col class="l-search-name" :span="8" >
						<Search placeholder="请输入业务大类名称" @search="getList"></Search>
					</Col>
				</div>
				<div :class="['h-operation',checkboxData.length > 0 ? 'active' : '']" >
					<div class="h-o-item">
						已选中<span class="h-o-count">{{checkboxData.length}}</span>项
					</div>
					<div class="h-o-item delete" @click="clickDel('top')" >
						删除
					</div>	
					<div class="h-o-item modify" @click="editBusiness('top')" >
						修改
					</div>
					<div class="h-o-item release" @click="listReleaseClick('top')" >
						发布
					</div>
					<div class="h-o-item top" @click="topBusiness('top')" >
						升版
					</div>
					<div class="h-o-item top" @click="bottomBusiness('top')" >
						下架
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
						<Row class="app__table-item" v-for="(item,index) in tableList" :key="index">
							<Col :span="4" class="v-t-checkbox">
								<Checkbox name="checkbox1" :label="item" v-model="checkboxData"></Checkbox>
							</Col>
							<Col :span="titleItem.span" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
								<span>{{adjustTabelItemText(item,titleItem.param)}}</span>
							</Col>
							<Col :span="4">
								<span class="span" v-show="item.statusCd != '1000'" @click="listReleaseClick('bottom',item)">发布</span>
								<span class="span" v-show="item.statusCd != '1000'" @click="editBusiness('bottom',item)">修改</span>
								<span class="span" v-show="item.statusCd == '1000'" @click="topBusiness('bottom',item)">升版</span>
								<span class="span" v-show="item.statusCd != '1000'" @click="clickDel('bottom',item)">删除</span>
								<span class="span" v-show="item.statusCd == '1000'" @click="bottomBusiness('bottom',item)">下架</span>
							</Col>
						</Row>
						<Row :class="['m-item app__table-item']" v-if="tableList.length != 0" v-for="item in (20 - tableList.length)" :key="item.busiTypeNbr"></Row>
						<Row v-show="!tableList.length" class="app__data-none">
							<Col :span="24">
								<span>暂无数据</span>
							</Col>
						</Row>
					</Scroll>
				</div>
				<div class="footer">
					<Pagination v-show="tableList.length" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount"  @change="pageChange"></Pagination>
				</div>
			</div>
		</Shrink>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加业务大类" ref="addBusiness" @confirm="addData()" @close="addClose()">
			<div class="d-left">
				<Scroll  :isShowRight="true">
					<TreeSimple v-for="(item,index) in tableData"  :folder="item" :key="index" :selLevel="2"
		              :keys="folderKeys" levelStr="level"
		              @plugClick="getNex" v-model="treeModelDialog"/>
				</Scroll>
			</div>
			<div class="d-right">
				<div class="selected">已选：<span>{{treeModelDialog.domainName ? treeModelDialog.domainName : ''}}</span></div>
				<Form labelWidth="110px" data-vv-scope="add">
				<Row class="d-right-info">
					<Col :span="22" :offset="2">
						<FormItem labelText="业务大类编码：" :requiredIcon="true" :errorMessage="errors.first('add.nbr')">
							<Input v-model="addlist.nbr" name="nbr" v-validate="'required'" data-vv-as="业务大类编码" ></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="d-right-info">
					<Col :span="22" :offset="2">
						<FormItem labelText="业务大类名称：" :requiredIcon="true" :errorMessage="errors.first('add.name')">
							<Input v-model="addlist.name" name="name" v-validate="'required'" data-vv-as="业务大类名称" ></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="d-right-info2">
					<Col :span="22" :offset="2">
						<FormItem labelText="业务大类描述：">
							<textarea class="app__textarea" v-model="addlist.busiTypeDesc"></textarea>
						</FormItem>
					</Col>
				</Row>
			</Form>
			</div>
		</Dialog>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="修改业务大类" ref="editBusiness" @confirm="revise()">
			<div class="d-left">
				<Scroll  :isShowRight="true">
					<TreeSimple  v-for="(item,index) in tableData"  :folder="item" :key="index" :selLevel="2"
		              :keys="folderKeys" levelStr="orgLevel"
		              @plugClick="getNex" v-model="treeModelDialog"/>
				</Scroll>
			</div>
			<div class="d-right">
				<div class="selected">已选：<span>{{treeModelDialog.domainName ? treeModelDialog.domainName : ''}}</span></div>
				<Form labelWidth="110px" data-vv-scope="revise">
				<Row class="d-right-info">
					<Col :span="22" :offset="2">
						<FormItem labelText="业务大类编码：" :requiredIcon="true" :errorMessage="errors.first('revise.nbr')">
							<Input v-model="reviseData.nbr" name="nbr" v-validate="'required'" data-vv-as="业务大类编码" ></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="d-right-info">
					<Col :span="22" :offset="2">
						<FormItem labelText="业务大类名称：" :requiredIcon="true" :errorMessage="errors.first('revise.name')">
							<Input v-model="reviseData.name" name="name" v-validate="'required'" data-vv-as="业务大类名称" ></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="d-right-info2">
					<Col :span="22" :offset="2">
						<FormItem labelText="业务大类描述：">
							<textarea class="app__textarea" v-model="reviseData.busiTypeDesc"></textarea>
						</FormItem>
					</Col>
				</Row>
			</Form>
			</div>
		</Dialog>


		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>

        <Tip ref="tipDel" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>

	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				staff:"22222",
				treeModel:'',       //树选中的选项，[]是多选
				treeModelDialog:'',
                tableList:[],       //列表数据
                addlist:{
                	name:'',
                	nbr:'',
                	busiTypeDesc:'',
				},
				reviseData:{
					name:'',
                	nbr:'',
					busiTypeDesc:'',
					statusCd:'',
					version:''
				},
				statusCdObj:[
					{label:"有效",value:"1000"},
					{label:"无效",value:"1100"},
					{label:"未生效",value:"1200"},
					{label:"已归档",value:"1300"}
				],
				statusCd:'',
                folderKeys: [{key: 'domainName'}],
                tableData:{
                },
                checkboxData: [],
				pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 0      // 总条数
                },
                dialogSize: {
                	size:50,
					min:600,
					max:600
				},
				tableTitleData:[{
					name:'业务大类编码',
					param:'busiTypeNbr',
					span:4,
					part:''
				},{
					name:'业务大类名称',
					param:'busiTypeName',
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
					param:'version',
					span:4,
					part:''
				}],
                tipInfo: {
                	iconType:1,
                	msg:'',
                	showBtn:{
                		clear: true,
                		save: true
                	}
				},
				busiTypeId:'',//ID
				busiTypePublishId:''
			}
		},
		watch:{
			treeModel(val){
				 this.getList('','',val.domainId);
			}
		},
		mounted() {
            this.getTableData();
            this.getList();
        },
		methods:{
			//列表计算显示
            adjustTabelItemText(item, param) {
				let val = item[param];
                switch(param) {
                    case 'busiTypeNbr':
                        return item.busiTypeNbr;
                    case 'busiTypeName':
                        return item.busiTypeName;
                    case 'version':
                        return item.version;
                    case 'statusCd':
                        return this.getStatus(val);
                    default:
                        return val;
                }
            },
			//查询树
            getTableData() {
                this.$axios.get(this.$api.GetSysDomainTree, {
                }).then((res) => {
                    if (res.data.success == true) {
						this.tableData = res.data.sysDomainList;
                    } else {
						this.$message.error({message:"查询失败"})
                    }
                }).catch(error=>{
					this.$message.error({message:"查询失败"})
				})
            },
            //查询业务大类列表
			getList(name,nbr,domainId){
				this.$axios.get(this.$api.BusiType, {
                    params: {
                        page: this.pageInfo.pageIndex,
						limit: 20,
						domainId:domainId,
                        busiTypeName: name,
                        busiTypeNbr: '',
                    }
                }).then((res) => {
                    if (res.data.success) {
                        this.tableList = res.data.busiTypePage.content
                        // console.log(res)
                        this.pageInfo = {
                            pageIndex: res.data.busiTypePage.page,
                            pageSize: res.data.busiTypePage.limit,
                            rowCount: res.data.busiTypePage.total,
                        };
                    }else{
						this.$message.error({ message : '查询失败' })
					}
                }).catch(error=>{
					this.$message.error({ message:"查询失败" })
				})
			},
			getStatus(val) {//获取状态
				return this.statusCdObj.find(item => item.value == val).label;
			},
			//添加
			addCate(){
				this.$axios.post(this.$api.OrdBusiType, {
						"busiTypeDesc":this.addlist.busiTypeDesc,
						"busiTypeId": 0,
						"busiTypeName": this.addlist.name,
						"busiTypeNbr": this.addlist.nbr,
						"busiTypePublishId": '',
						"createDate": "2018-11-09T09:17:56.197Z",
						"createStaff": 0,
						"domainId": this.treeModelDialog.domainId,
						"remark": "string",
						"statusCd": '1000',
						"statusDate": "2018-11-09T09:17:56.197Z",
						"updateDate": "2018-11-09T09:17:56.197Z",
						"updateStaff": 0,
						"version": "1"
					}).then((res) => {
						// console.log(res,'添加')
						if(res.data.success == true){
							this.$message.success({ message : "添加成功" })
							this.getList();
							this.getTableData();
						}else{
							this.$message.success({ message : "添加失败" })
						}                    
					}).catch((error)=>{
							this.$message.success({ message : "添加失败" })
					})
			},
            //表头字段
			dragchange(val){
				this.tableTitleData = val;
			},
			//获取下一级
            getNex(val){
                if(val.isOpen && val.data.children == null){
                    this.getTableData(val);   //根据id查询下级组织
                }
            },
            //添加的确认
            addData(){
				if(!this.treeModelDialog){
					this.$message.error({message:'请先选择主题域'})
					return
				}
				this.$validator.validateAll('add').then((result) => {
					// console.log(result);
					if(result) {
					this.addCate()
            		this.$refs.addBusiness.hide();
					}
				})
			},
			addClose(){
				this.treeModelDialog = ''
			},
			//修改的确认
			revise(){
				this.$validator.validateAll('revise').then((result) => {
					if(result) {
						this.$axios.put(this.$api.replace(this.$api.OrdBusiTypeDo, ['{busiTypeId}'], [this.busiTypeId]), {
								"busiTypeDesc": this.reviseData.busiTypeDesc,
								"busiTypeId": this.busiTypeId,
								"busiTypeName": this.reviseData.name,
								"busiTypeNbr": this.reviseData.nbr,
								"busiTypePublishId":'',
								"createDate": "2018-11-09T09:17:56.197Z",
								"createStaff": 0,
								"domainId": this.treeModelDialog.domainId,
								"remark": "",
								"statusCd": this.reviseData.statusCd,
								"statusDate": "2018-11-09T09:17:56.197Z",
								"updateDate": "2018-11-09T09:17:56.197Z",
								"updateStaff": 0,
								"version": this.reviseData.version
						}).then((res) => {
							// console.log(res,'添加')
							if(res.data.success == true){
								this.$message.success({ message : "修改成功" })
								this.checkboxData = []
								this.getList();
								this.getTableData();
							}else{
								this.$message.error({ message : "修改失败" })
							}                    
							this.$refs.editBusiness.hide();
						}).catch((error)=>{
							this.$message.success({ message : "修改失败" })
						})
					}
				})
			},
            //获取操作
            getOpera(val){
				this.valBox = val;

                if(val.item.key=='add'){
					this.add(val.data);

                }else if(val.item.key=='mod'){
					this.mod(val.data);

                }else if(val.item.key=='del'){
					this.del(val.data);
                }
            },
            //获取选中
            getSelect(val){
				// console.log('选中')
            },

			//列表分页
            pageChange(page){
				// console.log(page);
                this.pageInfo.pageIndex = page;
                this.getList();
            },
			addBusiness() {
				this.addlist = {
					name:'',
                	nbr:'',
                	busiTypeDesc:'',
				},
				this.treeModelDialog = '';
				this.$refs.addBusiness.show();
			},
			editBusiness(type,item) {
				if(type == 'top'){
					if(this.checkboxData.length > 1){
						this.$message.error({ message : '请选择一条数据'})
						return
					}
					let item =  this.checkboxData[0];
					this.busiTypeId = this.checkboxData[0].busiTypeId;
					this.statusCd =  this.checkboxData[0].statusCd;
					this.reviseData = {
						name:item.busiTypeName,
						nbr:item.busiTypeNbr,
						busiTypeDesc:item.busiTypeDesc,
						statusCd:item.statusCd,
						version:item.version
					}
					if(this.statusCd == "1000"){
						this.$message.error({ message : "已发布,无法修改"})
						return
					}
				}else if (type == 'bottom') {
					this.reviseData = {
						name:item.busiTypeName,
						nbr:item.busiTypeNbr,
						busiTypeDesc:item.busiTypeDesc,
						statusCd:item.statusCd,
						version:item.version
					}
					this.busiTypeId = item.busiTypeId
				}
				this.$refs.editBusiness.show();
			},
			//升版
			topBusiness(type,item){
				if(type == 'top'){
					if(this.checkboxData.length > 1){
						this.$message.error({ message : "请选择一条数据"})
						return
					}
					this.busiTypeId = this.checkboxData[0].busiTypeId;
					this.statusCd =  this.checkboxData[0].statusCd;
					this.version =  this.checkboxData[0].version;
					if(this.statusCd != "1000"){
						this.$message.error({ message : "未发布,无法升版"})
						return
					}
				}else if(type == 'bottom'){
					this.busiTypeId = item.busiTypeId
				}
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `确认要升版吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			bottomBusiness(type,item){
				if(type == 'top'){
					if(this.checkboxData.length > 1){
						this.$message.error({ message : "请选择一条数据"})
						return
					}
					this.busiTypeId = this.checkboxData[0].busiTypePublishId;
					this.statusCd =  this.checkboxData[0].statusCd;
					this.version =  this.checkboxData[0].version;
					if(this.statusCd != "1000"){
						this.$message.error({ message : "未发布,无法下架"})
						return
					}
				}else if(type == 'bottom'){
					this.busiTypeId = item.busiTypePublishId
				}
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `确认要下架吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			//发布
			listReleaseClick(type,item) {
				if(type == 'top'){
					if(this.checkboxData.length > 1){
						this.$message.error({ message : "请选择一条数据"})
						return
					}
					// console.log(this.checkboxData);
					this.busiTypeId = this.checkboxData[0].busiTypeId
					this.busiTypePublishId = this.checkboxData[0].busiTypePublishId;
					this.statusCd =  this.checkboxData[0].statusCd;
					if(this.statusCd == "1000"){
						this.$message.error({ message : "已发布过"})
						return
					}
				}else if(type == 'bottom'){
					this.busiTypeId = item.busiTypeId
					this.busiTypePublishId = item.busiTypePublishId
				}
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `确认要发布吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			//删除
            clickDel(type,item) {
				// console.log(item);
				if(type == 'top'){
					if(this.checkboxData.length > 1){
						this.$message.error({ message : '请选择一条数据 '})
						return
					}
					this.busiTypeId = this.checkboxData[0].busiTypeId;
					this.statusCd =  this.checkboxData[0].statusCd;
					if(this.statusCd == "1000"){
						this.$message.error({ message : "已发布,无法删除"})
						return
					}
				}else if(type == 'bottom'){
					this.busiTypeId = item.busiTypeId
				}
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = `确认要删除选择的记录吗？`;
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tipDel.show();
            },
            tipConfirm(){
				if(this.tipInfo.msg == `确认要发布吗？`){
					this.$axios.post(this.$api.replace(this.$api.ReleaseBusiType, ['{busiTypeId}'], [this.busiTypeId]), {
							busiTypeId:this.busiTypeId,
							staff:this.staff
					}).then((res) => {
						if (res.data.success) {
							this.$message.success({ message : '发布成功'})
							this.checkboxData = [];
							this.getList();
							this.getTableData();
						}else{
							this.$message.error({ message : '发布失败'})
						}
						this.$refs.tip.hide();
					}).catch((error)=>{
						this.$message.error({ message : '发布失败'})
					})
				}else if(this.tipInfo.msg == `确认要删除选择的记录吗？`){
					this.$axios.delete(this.$api.replace(this.$api.OrdBusiTypeDo, ['{busiTypeId}'], [this.busiTypeId]), {
						params:{
							busiTypeId:this.busiTypeId,
							staff:this.staff
						}
					}).then((res) => {
						if (res.data.success) {
							this.checkboxData = [];
							this.$message.success({ message : '删除成功'})
							this.getList();
							this.getTableData();
						}else{
							this.$message.error({ message : '删除失败'})
						}
							this.$refs.tipDel.hide();
					}).catch((error)=>{
						this.$message.error({ message : '删除失败'})
					})
				}else if(this.tipInfo.msg == `确认要升版吗？`){
					this.$axios.post(this.$api.replace(this.$api.RiseBusiType, ['{busiTypeId}'], [this.busiTypeId]), {
							busiTypeId:this.busiTypeId,
							staff:this.staff
					}).then((res) => {
						if (res.data.success) {
							this.checkboxData = [];
							this.$message.success({ message : '升版成功'})
							this.getList();
							this.getTableData();
						}else{
							this.$message.error({ message : '升版失败'})
						}
							this.$refs.tip.hide();
					}).catch((error)=>{
						this.$message.error({ message : '升版失败'})
					})
				}else if(this.tipInfo.msg == `确认要下架吗？`){
					this.$axios.post(this.$api.replace(this.$api.DownlineBusiType, ['{busiTypeId}'], [this.busiTypeId]), {
							busiTypeId:this.busiTypeId,
							staff:this.staff
					}).then((res) => {
						if (res.data.success) {
							this.checkboxData = [];
							this.$message.success({ message : '下架成功'})
							this.getList();
							this.getTableData();
						}else{
							this.$message.error({ message : '下架失败'})
						}
							this.$refs.tip.hide();
					}).catch((error)=>{
						this.$message.error({ message : '下架失败'})
					})
				}
			},
			Confirmfilter(val){
				// console.log(val)
			}
		}
	}
</script>

<style scoped lang="scss">
	/*树容器样式*/
    .content-tree{
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
    }
	.list{
		width: 100%;
		height: 100%;
		border: 0;
		.left-tree {
			width: 100%;
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
            padding: 100px 0 50px 0;

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
			.right-title{
				position: absolute;
				top: 15px;
				width: 100%;
				height: 30px;
				padding-left: 10px;

				.d-name {
					display: inline-block;
					float: left;
					color: $mainColor;
					font-size: 15px;
					padding-left: 30px;
					background: url(images/sideslip_icon.png) no-repeat left center;
				}
				.h-a-add{
					position: absolute;
					top: 0;
					right: 30px;
					height: 30px;

				}
			}

			.h-operation {
				position: absolute;
				top: 50px;
				left: -100%;
				width: 100%;
				height: 50px;
				line-height: 50px;
				transition: .3s all ease;
				background-color: #fff;
				&.active {
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
					&.top {
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
			.d-s {
				position: absolute;
				top: 45px;
				width: 100%;
				height: 50px;
				padding-left: 10px;
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
	}
	.h-dialog{

			.col{
				text-align: center;
			}

			.h-d-title{
				background-color: #f8fcff;
				border-top: 1px solid $mainColor;

				.col{
					border-width: 0 0 1px 1px;
					border-style: solid;
					border-color: #efefef;

					&:last-child{
						border-right: 1px solid #efefef;
					}
				}
			}

			.h-d-item{
				border-bottom: 1px solid #efefef;
				color: #777;
			}
		}
	.d-left {
		width: 30%;
        height: 260px;
		float: left;
	}
	.d-right {
		width: 70%;
		height: 100%;
		border-left: 1px solid gainsboro;
		float: right;
		.d-right-info{
			height: 55px;
		}
		.d-right-info2{
			margin-bottom: 30px;
		}
		.selected {
			font-size: 14px;
			font-weight: bold;
			margin:20px;
		}
		.col {
			margin-left: 0;
		}
	}
</style>
