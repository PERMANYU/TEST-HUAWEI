<template>
	<div class="list">
		<Shrink>
			<Scroll slot="shrink" :isShowRight="true">
				<TreeSimple v-for="(item,index) in tableData" :folder="item" :key="index"
				:keys="folderKeys" levelStr="level"
				@plugClick="getNex" v-model="treeModel"/>
			</Scroll>
			<div class="right">
				<div class="d-s">
					<span class="d-name">{{treeModel.domainName ? treeModel.domainName : '已选主题域'}}</span>
					<div class="h-a-add">
						<div class="app__btn app__btn-history" @click="historySearch">历史查询</div>
						<div class="app__btn app__btn-add" @click="addDomain()">添加</div>
					</div>
					<div class="search">
						<Search placeholder="请输入主题域名称" @search="searchDomain"></Search>
					</div> 
				</div>
				<div :class="['h-operation',checkboxData.length > 0 ? 'active' : '']" >
					<div class="h-o-item">
						已选中<span class="h-o-count">{{checkboxData.length}}</span>项
					</div>
					<div class="h-o-item delete" @click="delDomain('top')">
						删除
					</div>
					<div class="h-o-item modify" @click="modDomain('top')">
						修改
					</div>
					<div class="h-o-item release" @click="topDomain('top')">
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
							<Row class="app__table-item" v-for="(item,index) in tabList" :key="index">
								<Col :span="4" class="v-t-checkbox">
									<Checkbox name="checkbox1" :label="item" v-model="checkboxData"></Checkbox>
								</Col>
								<Col :span="titleItem.span" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
									<span>{{adjustTabelItemText(item,titleItem.param)}}</span>
								</Col>
								<Col :span="4">
									<span class="span" v-show="item.statusCd == '1200'" @click="pubDomain(item)">发布</span>
									<span class="span" v-show="item.statusCd == '1000'" @click="topDomain('bottom',item)">升版</span>
									<span class="span" v-show="item.statusCd != '1000'" @click="modDomain('bottom',item)">修改</span>
									<span class="span" v-show="item.statusCd != '1000'" @click="delDomain('bottom',item)">删除</span>
									<span class="span" v-show="item.statusCd == '1000'" @click="bottomDomain(item)">下架</span>
								</Col>
							</Row>
							<Row :class="['m-item app__table-item']" v-if="tabList.length != 0" v-for="item in (20 - tabList.length)" :key="item.domainNbr"></Row>
							<Row v-show="!tabList.length" class="app__data-none">
								<Col :span="24">
									<span>暂无数据</span>
								</Col>
							</Row>
						</Scroll>
					</div>
					<div class="footer">
						<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages="5" @change="pageDomainChange">
						</Pagination>
					</div>
			</div>
		</Shrink>
		<Dialog class="h-dialog" dialogTitle="历史查询" ref="historyDialog" :dialogSize="dialogSizes" :initBtn="true">
            <Scroll class="app__table">
                <div class="h-dialog-search">
                    <Search placeholder="请输入主题域名称 / 主题域编码" @search="searchResource"></Search>
                </div>
				<Row class="app__table-thead" >
					<Col :span="4">序号</Col>
					<Col :span="5">主题域编码</Col>
					<Col :span="5">主题域名称</Col>
					<Col :span="5">状态</Col>
					<Col :span="5">版本号</Col>
				</Row>
				<Row class="app__table-item"  v-for="(item,index) in tabTempList" :key='index'>
					<Col :span="4">
						<Radio name="item" :label="item" v-model="historyRadio" :value="item"></Radio>
					</Col>
					<Col :span="5">{{item.domainNbr}}</Col>
					<Col :span="5">{{item.domainName}}</Col>    
					<Col :span="5">{{getStatus(item.statusCd)}}</Col>
					<Col :span="5">{{item.version ? item.version : '无'}}</Col>
				</Row>
                <Pagination :pageIndex="pageInfos.pageIndex" :pageSize="pageInfos.pageSize" :rowCount="pageInfos.rowCount" @change="pageChange" :isCenter="true">
                </Pagination>
            </Scroll>
            <template slot="btnBox">
                    <span class="save" @click="addDaiogConfirm()" v-if="historyRadio">下一步</span>
                    <span class="back" @click="addCloseConfirm()">返回</span>
            </template>
		</Dialog>

		<!-- 历史查询详情 -->
		<Dialog class="h-dialog" dialogTitle="历史查询" ref="historyDialog2" :dialogSize="dialogSizes"  :initBtn="true">
            <Scroll class="app__table">
                <Row class="app__table-thead">
                    <Col :span="6">主题域编码</Col>
                    <Col :span="6">主题域名称</Col>
                    <Col :span="6">状态</Col>
                    <Col :span="6">版本号</Col>
                </Row>
                <Row class="app__table-item" v-for="(item,index) in detailList" :key="index">
                    <Col :span="6">{{item.domainName}}</Col>
                    <Col :span="6">{{item.domainNbr}}</Col>
                    <Col :span="6">{{getStatus(item.statusCd)}}</Col>
                    <Col :span="6">{{item.version}}</Col>
                </Row>

                <Pagination v-if="detailList.length" :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange" :isCenter="true">
                </Pagination>
            </Scroll>
            <template slot="btnBox">
					<span class="save" @click="addDialogConfirm()">确定</span>
					<span class="back" @click="addCloseConfirm()">返回</span>
            </template>
		</Dialog>

		<Dialog :dialogSize="dialogSize" class="h-dialog"   :dialogTitle="addTitle" ref="addDomain" @confirm="addDomainConfirm()" @close="addDomainClose">
			<Form labelWidth="110px" data-vv-scope="add">
				<div class="radio_add">
					<FormItem labelText="添加方式：" :requiredIcon="true" :errorMessage="errors.first('add.domainType')">
						<RadioGroup  v-validate="'required'" :data="domainTypeArray" name="domainType" data-vv-as="添加方式" v-model="domain.domainType"></RadioGroup>
					</FormItem>	
				</div>
				<Row class="add-margin">
					<Col :span="20" :offset="2">
						<FormItem labelText="主题域编码：" :requiredIcon="true" :errorMessage="errors.first('add.nbr')">
							<Input v-model="domain.domainNbr" name="nbr" v-validate="'required'" data-vv-as="主题域编码"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="add-margin2">
					<Col :span="20" :offset="2">
						<FormItem labelText="主题域名称：" :requiredIcon="true" :errorMessage="errors.first('add.name')">
							<Input v-model="domain.domainName" name="name" v-validate="'required'" data-vv-as="主题域名称"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="add-margin3">
					<Col :span="20" :offset="2">
						<FormItem labelText="主题域描述：" >
							<textarea v-model="domain.domainDesc" class="app__textarea"></textarea>
						</FormItem>
					</Col>
				</Row>
			</Form>
		</Dialog>


		
		<Dialog :dialogSize="dialogSize" class="h-dialog" :dialogTitle="addTitle" ref="modDomain" @confirm="addDomainConfirm()" @close="modDomainClose()">
			<Form labelWidth="110px" data-vv-scope="mod">
				<div class="radio_add">
					<FormItem labelText="添加方式：" :requiredIcon="true">
						<RadioGroup  v-validate="'required'" :data="domainTypeArray1" name="domainType"  v-model="domain.domainType"></RadioGroup>
					</FormItem>	
				</div>
				<Row class="add-margin">
					<Col :span="20" :offset="2">
						<FormItem labelText="主题域编码：" :requiredIcon="true" :errorMessage="errors.first('mod.nbr')">
							<Input v-model="domain.domainNbr" name="nbr" v-validate="'required'" data-vv-as="主题域编码"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="add-margin2">
					<Col :span="20" :offset="2">
						<FormItem labelText="主题域名称：" :requiredIcon="true" :errorMessage="errors.first('mod.name')">
							<Input v-model="domain.domainName" name="name" v-validate="'required'" data-vv-as="主题域名称"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="add-margin3">
					<Col :span="20" :offset="2">
						<FormItem labelText="主题域描述：" :requiredIcon="true">
							<textarea v-model="domain.domainDesc" class="app__textarea"></textarea>
						</FormItem>
					</Col>
				</Row>
			</Form>
		</Dialog>



		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="修改主题域" ref="editDomain"  @confirm="modDomainConfirm()">
			<Form labelWidth="110px" data-vv-scope="addTwo">
				<Row class="add-margin">
					<Col :span="20" :offset="2">
						<FormItem labelText="主题域编码：" :requiredIcon="true" :errorMessage="errors.first('addTwo.nbr')">
							<Input v-model="domain.domainNbr" name="nbr" v-validate="'required'" data-vv-as="主题域编码"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="add-margin2">
					<Col :span="20" :offset="2">
						<FormItem labelText="主题域名称：" :requiredIcon="true" :errorMessage="errors.first('addTwo.name')">
							<Input v-model="domain.domainName" name="name" v-validate="'required'" data-vv-as="主题域名称"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="add-margin3">
					<Col :span="20" :offset="2">
						<FormItem labelText="主题域描述：" :requiredIcon="true">
							<textarea v-model="domain.domainDesc" class="app__textarea"></textarea>
						</FormItem>
					</Col>
				</Row>
			</Form>
		</Dialog>


		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				staff:"2222",
                addTitle:'',
				historyRadio:'',//单选框历史查询绑定
                treeModel:'',       //树选中的选项，[]是多选
                folderKeys: [
                    {
                        key: 'domainName',      //组织名称
                    }
				],
				detailList:[],//详情列表
                tableData:{
				},
				checkboxData: [],
				statusCdObj:[
					{label:"有效",value:"1000"},
					{label:"无效",value:"1100"},
					{label:"未生效",value:"1200"},
					{label:"已归档",value:"1300"}
				],
				tabList:[],
				pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 0      // 总条数
                },
				pageInfos: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 0      // 总条数
                },
                dialogSize: {
                	size:50,
					min:500,
					max:500
				},
                dialogSizes: {
                	size:70,
					min:800,
					max:800
				},
				tableTitleData: [{
					name: '主题域编码',
					param: 'domainNbr',
					span: 4,
				},{
					name: '主题域名称',
					param: 'domainName',
					span: 4,
				},{
					name: '状态',
					param: 'statusCd',
					span: 4,
					parent:[
						{label:'有效',value:'1000'},
						{label:'无效',value:'1100'},
						{label:'未生效',value:'1200'},
						{label:'已归档',value:'1300'},
					],
				},{
					name: '版本',
					param: 'version',
					span: 4,
				}],
                domainTypeArray:[
					{label:'一级主题域',value:'-1'},{label:'二级主题域',value:'1'}
				],
                domainTypeArray1:[
					{label:'二级主题域',value:'3'}
				],
				domain:{
				},
				parDomainId:'',
                treeShowKeyItems: [{ key: 'priceClassifyName' }],
                treeInputSelObj: {
					key: 'priceClassifyId',
					values: []
				},
				priceClassifyTrees: [],
				
				tipInfo: {
                	iconType:1,
                	msg:'',
                	showBtn:{
                		clear: true,
                		save: true
                	}
				},
				tabTempList:[]
			}
		},
		watch:{
			treeModel(val){
				this.getList(val.domainName,val.domainNbr)
				this.checkboxData = [];
			}
		},
		mounted() {
			this.getList();
			this.getTableData()
        },
		methods:{
			//列表计算显示
            adjustTabelItemText(item, param) {
				let val = item[param];
                switch(param) {
                    case 'domainNbr':
                        return item.domainNbr;
                    case 'domainName':
                        return item.domainName;
                    case 'version':
                        return item.version;
                    case 'statusCd':
                        return this.getStatus(val);
                    default:
                        return val;
                }
			},
			//表头字段
			dragchange(val){
				this.tableTitleData = val;
			},
			//查询组织列表
            getTableData(val,type) {
				this.$axios.get(this.$api.GetOrdSysDomainTree, {
                }).then((res) => {
                    if (res.data.success == true) {
						this.tableData = res.data.sysDomainList;
						// this.treeModel = this.tableData[0] ? this.tableData[0] : ''
                    } else {
						this.$message.error({message:"查询失败"})
                    }
                }).catch(error=>{
					this.$message.error({message:"查询失败"})
				})
            },
			//获取下一级
            getNex(val){
                if(val.isOpen&&val.data.children==null){
                    this.getTableData(val);   //根据id查询下级组织
                }
			},
			getStatus(val) {
				if(val){
					return this.statusCdObj.find(item => item.value == val).label ? this.statusCdObj.find(item => item.value == val).label  : '无'
				}else{
					return '空';
				}
			},
			searchResource (data) {
                this.pageInfos.pageIndex = 1;
                this.historyRadio = '';
				this.gethistoryList(data)
			},

			searchDomain (data){
                this.pageInfo.pageIndex = 1;
                this.treeModel = '';
				this.getList(data)
			},
			pageDomainChange(index){
				this.pageInfo.pageIndex = index;
				this.getList();
			},
			gethistoryList(name,nbr){
				this.$axios.get(this.$api.OrdSysDomain, {
						params:{
							domainName:name,
							domainNbr:nbr,
							offset:'',
							page:this.pageInfos.pageIndex,
							limit:'5'	
						}
					}).then((res) => {
						if (res.data.success == true) {
							this.tabTempList = 	res.data.sysDomainPage.content;
							this.pageInfos = {
								pageIndex: res.data.sysDomainPage.page,
								pageSize: res.data.sysDomainPage.limit,
								rowCount: res.data.sysDomainPage.total,
							};
						}else{
							this.$message.error({message:'查询失败'})
						}
					}).catch((error)=>{
						this.$message.error({message:'查询失败'})
					})
			},	
			getList(name,nbr){ // 主题域过程表列表查询
				this.$axios.get(this.$api.OrdSysDomain, {
						params:{
							domainName:name,
							domainNbr:nbr,
							offset:'',
							page:this.pageInfo.pageIndex,
							limit:20	
						}
					}).then((res) => {
						if (res.data.success == true) {
							this.tabList = 	res.data.sysDomainPage.content;
							this.pageInfo = {
								pageIndex: res.data.sysDomainPage.page,
								pageSize: res.data.sysDomainPage.limit,
								rowCount: res.data.sysDomainPage.total,
							};
						}else{
							this.$message.error({message:'查询失败'})
						}
					}).catch((error)=>{
						this.$message.error({message:'查询失败'})
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
            },

			historySearch() {
				this.historyRadio = '';
				this.gethistoryList()
				this.$refs.historyDialog.show();
            },
			pageChange(page) {
				this.pageInfos.pageIndex = page;
				this.gethistoryList();
			},
			addDomain() {
				this.addTitle = '添加主题域';
				if(!this.treeModel){
					this.domainTypeArray = [{label:'一级主题域',value:'-1'}]
					this.domain = {		
						domainNbr:'',
						domainName:'',
						domainDesc:'',
						domainType:'-1'
					}
					this.$refs.addDomain.show();
				}else if(this.treeModel.level == 0){
					this.domain = {		
						domainNbr:'',
						domainName:'',
						domainDesc:'',
						domainType:'-1'
					}
					this.domainTypeArray = [{label:'一级主题域',value:'-1'},{label:'二级主题域',value:'1'}]
					this.$refs.addDomain.show();
				}else if(this.treeModel.level == 1){
					this.domain = {		
						domainNbr:'',
						domainName:'',
						domainDesc:'',
						domainType:'3'
					}
					this.$refs.modDomain.show();
				}
			},
			addDomainConfirm() {
				if(this.domain.domainType == '-1'){
					this.parDomainId ='-1'
				}else if(this.domain.domainType == '1'){
					this.parDomainId = this.treeModel.domainId
				}else if(this.domain.domainType == '3'){
					this.parDomainId = this.treeModel.parDomainId
				}
				this.$validator.validateAll('add').then((result) => {
					if(result){
						this.$axios.post(this.$api.AddOrdSysDomain,{
							"createDate": "2018-11-19T11:26:06.312Z",
							"createStaff": 0,
							"domainDesc": this.domain.domainDesc,
							"domainId": '',
							"domainName": this.domain.domainName,
							"domainNbr": this.domain.domainNbr,
							"parDomainId": this.parDomainId,
							"remark": "",
							"statusCd": "1000",
							"statusDate": "2018-11-19T11:26:06.312Z",
							"sysDomainPublishId": '',
							"updateDate": "2018-11-19T11:26:06.312Z",
							"updateStaff": 0,
							"version": "1"
						}).then((res) => {
							if (res.data.success == true) {
								this.$message.success({ message : '添加成功'})
								this.getTableData();			
								this.getList()
								this.treeModel = '';
							}else{
								this.$message.error({message:'添加失败'})
							}
							this.$refs.addDomain.hide();
							this.$refs.modDomain.hide();
						}).catch((error)=>{
							this.$message.error({message:'添加失败'})
						})
					}
				})
			},
			addDomainClose(){//弹框关闭回掉
			},
            modDomain(type,item) {
				if(this.checkboxData.length > 1){
					this.$message.error({message:"请选择一条数据"})
					return
				}
				if(type == 'top'){
					if(this.checkboxData[0].statusCd == "1000"){
						this.$message.error({ message : "已发布,无法修改"})
						return
					}
					this.domainId = this.checkboxData[0].domainId;
					this.domain = {		
						domainNbr:this.checkboxData[0].domainNbr,
						domainName:this.checkboxData[0].domainName,
						domainDesc:this.checkboxData[0].domainDesc,
						domainType:'3'
					}
				}else if(type == 'bottom'){
					this.domainId = item.domainId
					this.domain = {		
						domainNbr:item.domainNbr,
						domainName:item.domainName,
						domainDesc:item.domainDesc,
						domainType:'3'
					}
				}
				
                this.$refs.editDomain.show();
			},
			modDomainConfirm() {//修改确认	
				this.$validator.validateAll('mod').then((result) => {
					if(result){
						this.$axios.put(this.$api.replace(this.$api.OrdSysDomainDo,['{domainId}'],[this.domainId]),{
							"createDate": "2018-11-19T11:26:06.312Z",
							"createStaff": 0,
							"domainDesc": this.domain.domainDesc,
							"domainId": this.domainId,
							"domainName": this.domain.domainName,
							"domainNbr": this.domain.domainNbr,
							"parDomainId": '',
							"remark": "",
							"statusCd": "1200",
							"statusDate": "2018-11-19T11:26:06.312Z",
							"sysDomainPublishId": '',
							"updateDate": "2018-11-19T11:26:06.312Z",
							"updateStaff": 0,
							"version": "1"
						}).then((res) => {
							if (res.data.success == true) {
								this.$message.success({ message : '修改成功'})
								this.getTableData();			
								this.getList()
								this.checkboxData = [];
							}else{
								this.$message.error({message:'修改失败'})
							}
							this.$refs.editDomain.hide();
							this.$refs.addDomain.hide();
						}).catch((error)=>{
							this.$message.error({message:'修改失败'})
						})
					}
				})
			},
			modDomainClose(){//关闭回掉
			},

            delDomain(type,item) {
				if(this.checkboxData.length > 1){
					this.$message.error({message:"请选择一条数据"})
					return
				}
				if(type == 'top'){
					if(this.checkboxData[0].statusCd == "1000"){
						this.$message.error({ message : "已发布,无法删除"})
						return
					}
					this.domainId = this.checkboxData[0].domainId;
				}else if(type == 'bottom'){
					this.domainId = item.domainId
				}
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要删除选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
			},

			bottomDomain(item){
				this.domainId = item.sysDomainPublishId;
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要下架选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
			},
            pubDomain(item) {
				this.domainId = item.domainId;
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要发布选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
			},
			topDomain(type,item) {//升版
			 	if(this.checkboxData.length > 1){
					 this.$message.error({message:"请选择一条数据"})
					 return
				 }
				if(type == 'top'){
					this.domainId = this.checkboxData[0].domainId;
				}else if(type == 'bottom'){
					this.domainId = item.domainId
				}
				this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要升版选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
			},
            //删除弹框确认
			tipConfirm(){
				if(this.tipInfo.msg == '确认要删除选择的记录吗？'){
					this.$axios.delete(this.$api.replace(this.$api.OrdSysDomainDo,["{domainId}"],[this.domainId]),{
					params:{domainId:this.domainId,
							staff:this.staff}
						}).then((res) => {
							if (res.data.success == true) {
								this.$message.success({ message : '删除成功'})
								this.getTableData();			
								this.getList()
								this.checkboxData = [];
								this.treeModel = '';
							}else{
								this.$message.error({message:'删除失败'})
							}
							this.$refs.addDomain.hide();
						}).catch((error)=>{
							this.$message.error({message:'删除失败'})
						})
				}else if(this.tipInfo.msg == '确认要发布选择的记录吗？'){
					this.$axios.post(this.$api.replace(this.$api.ReleaseSysDomain,["{domainId}"],[this.domainId]),{
						domainId:this.domainId,
								staff:this.staff
						}).then((res) => {
							if (res.data.success == true) {
								this.$message.success({ message : '发布成功'})
								this.getTableData();			
								this.getList()
								this.checkboxData = [];
								this.treeModel = '';
							}else{
								this.$message.error({message:'发布失败'})
							}
							this.$refs.addDomain.hide();
						}).catch((error)=>{
							this.$message.error({message:'发布失败'})
						})
				}else if(this.tipInfo.msg == '确认要升版选择的记录吗？'){
					this.$axios.post(this.$api.replace(this.$api.RiseSysDomain,["{domainId}"],[this.domainId]),{
						domainId:this.domainId,
							staff:this.staff
						}).then((res) => {
							if (res.data.success == true) {
								this.$message.success({ message : '升版成功'})
								this.getTableData();			
								this.getList()
								this.checkboxData = [];
								this.treeModel = '';
							}else{
								this.$message.error({message:'升版失败'})
							}
							this.$refs.addDomain.hide();
						}).catch((error)=>{
							this.$message.error({message:'升版失败'})
						})
				}else if(this.tipInfo.msg == `确认要下架选择的记录吗？`){
					this.$axios.post(this.$api.replace(this.$api.DownlineSysDomain,['{domainId}'],[this.domainId]),{
						domainId:this.domainId,
						staff:this.staff
					}).then((res)=>{
						if(res.data.success == true){
							this.$message.success({message:'下架成功'})
							this.getTableData();			
							this.getList()
							this.checkboxData = [];
							this.treeModel = '';
						}else{
							this.$message.error({message:'下架失败'})
						}
					}).catch(error=>{
							this.$message.error({message:'下架失败'})
					})
				}
                this.$refs.tip.hide();
            },

			editDomain() {
				this.$refs.editDomain.show();
			},
			
			//弹出下一步
			addDaiogConfirm(){
				this.$refs.historyDialog.hide();
				this.$axios.get(this.$api.replace(this.$api.GetOrdSysDomainHistory,['{sysDomainPublishId}'],[this.historyRadio.sysDomainPublishId ]),{
					sysDomainPublishId:this.historyRadio.sysDomainPublishId 
				}).then((res)=>{
					if(res.data.success == true){
						this.$message.success({ message : "查询成功"})
						this.detailList = res.data.sysDomainList;
					}else{
						this.$message.success({ message : "查询失败"})
					}
				}).catch((error)=>{
					this.$message.success({ message : "查询失败"})
				})
				this.$refs.historyDialog2.show();
			},
			addDialogConfirm(){
                this.$refs.historyDialog2.hide();
			},
			addCloseConfirm(){
				this.$refs.historyDialog.hide();
				this.$refs.historyDialog2.hide();
			},
			listReleaseClick() {
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `确认要发布吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			Confirmfilter(val){
				// console.log(val)
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
					width: 60%;
					top: -5px;
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
