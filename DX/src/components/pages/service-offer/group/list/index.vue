<template>
	<div class="list">
	<Shrink>
		<Scroll slot="shrink" :isShowRight="true">
			<TreeSimple v-for="(item,index) in tableData" :folder="item" :key="index"
              :keys="folderKeys" levelStr="level" :children-str="'childrenNode'" :init-level="1"
              v-model="treeModel"/>
		</Scroll>
		<div class="right">
			<div class="d-s">
				<span class="d-name">{{treeModel ? treeModel.serviceOfferName : '服务提供名称'}}</span>
				<div class="h-a-add">
					<div class="app__btn app__btn-add" @click="addService">添加</div>
				</div>
				<Col class="l-search-name" :span="8" >
					<Search placeholder="请输入服务提供名称" @search="searchResource"></Search>
				</Col>
			</div>
			<div :class="['h-operation',checkboxData.length > 0 ? 'active' : '']" >
				<div class="h-o-item">
					已选中<span class="h-o-count">{{checkboxData.length}}</span>项
				</div>
				<div class="h-o-item delete" @click="delClick('top')" >
					删除
				</div>	
				<div class="h-o-item modify" @click="editService('top')" >
					修改
				</div>
				<div class="h-o-item release" @click="releaseService('top')" >
					发布
				</div>
				<div class="h-o-item release" @click="topService('top')" >
					升版
				</div>
				<div class="h-o-item release" @click="bottomService('top')" >
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
							<span class="span" v-show="item.statusCd != '1000'" @click="releaseService('bottom',item)">发布</span>
							<span class="span" v-show="item.statusCd != '1000'" @click="editService('bottom',item)">修改</span>
							<span class="span" v-show="item.statusCd == '1000'" @click="topService('bottom',item)">升版</span>
							<span class="span" v-show="item.statusCd != '1000'" @click="delClick('bottom',item)">删除</span>
							<span class="span" v-show="item.statusCd == '1000'" @click="bottomService('bottom',item)">下架</span>
						</Col>
					</Row>
					<Row :class="['m-item app__table-item']" v-if="tableList.length != 0" v-for="item in (20 - tableList.length)" :key="item.standardCd"></Row>
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
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加服务提供" ref="addService" @confirm ="addServiceSure">
			<div class="d-right">
				<Form labelWidth="110px">
				<Row class="d-right-info">
					<Col :span="20" :offset="2">
						<FormItem labelText="添加方式：" :requiredIcon="true">
							<RadioGroup  v-validate="'required'" :data="serviceTypeArray" name="serviceType"  v-model="serviceObj.serviceType"></RadioGroup>
						</FormItem>	
					</Col>
				</Row>
				<Row class="d-right-info">
					<Col :span="20" :offset="2">
						<FormItem labelText="服务提供编码：" :requiredIcon="true" :errorMessage="errors.first('standardCd')">
							<Input v-model="serviceObj.standardCd" name="standardCd" v-validate="'required|max:10'" data-vv-as="服务提供编码"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="d-right-info">
					<Col :span="20" :offset="2">
						<FormItem labelText="服务提供名称：" :requiredIcon="true"  :errorMessage="errors.first('serviceOfferName')">
							<Input v-model="serviceObj.serviceOfferName" name="serviceOfferName" v-validate="'required|max:10'" data-vv-as="服务提供名称"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="d-right-info">
					<Col :span="20" :offset="2">
						<FormItem labelText="是否发送IBP：" :requiredIcon="false"  :errorMessage="errors.first('isSendIbp')">
                            <Select :data="iSsendIbp" v-model="serviceObj.isSendIbp" ></Select>
						</FormItem>
					</Col>
				</Row>
				<Row class="d-right-info2">
					<Col :span="20" :offset="2">
						<FormItem labelText="备注：">
							<textarea class="app__textarea" v-model="serviceObj.serviceOfferDesc"></textarea>
						</FormItem>
					</Col>
				</Row>
			</Form>
			</div>
		</Dialog>

		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="修改服务提供" ref="editService" @confirm ="reviseServiceSure">
			<div class="d-right">
				<Form labelWidth="110px">
				<Row class="d-right-info">
					<Col :span="20" :offset="2">
						<FormItem labelText="服务提供编码：" :requiredIcon="true" :errorMessage="errors.first('standardCd')">
							<Input v-model="serviceRevise.standardCd" name="standardCd" v-validate="'required'" data-vv-as="服务提供编码"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="d-right-info">
					<Col :span="20" :offset="2">
						<FormItem labelText="服务提供名称：" :requiredIcon="true"  :errorMessage="errors.first('serviceName')">
							<Input v-model="serviceRevise.serviceOfferName" name="serviceName" v-validate="'required'" data-vv-as="服务提供名称"></Input>
						</FormItem>
					</Col>
				</Row>
				<Row class="d-right-info">
					<Col :span="20" :offset="2">
						<FormItem labelText="是否发送IBP：" :requiredIcon="false"  :errorMessage="errors.first('isSendIbp')">
                            <Select :data="iSsendIbp" name="isSendIbp" v-model="serviceRevise.isSendIbp" ></Select>
						</FormItem>
					</Col>
				</Row>
				<Row class="d-right-info2">
					<Col :span="20" :offset="2">
						<FormItem labelText="备注：">
							<textarea class="app__textarea" v-model="serviceRevise.serviceOfferDesc"></textarea>
						</FormItem>
					</Col>
				</Row>
			</Form>
			</div>
		</Dialog>

        <!--删除确认框-->
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>

	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				updateStaff:2222,//删除，发布
				staffPublish:2222,//升版
				tableList:[],
                treeModel:'',       //树选中的选项，[]是多选
                folderKeys: [
                    {
						key: 'serviceOfferName',      //组织名称
                    }
				],
				serviceObj:{
					serviceType:'-1',
					standardCd:'',
					serviceOfferName:'',
					serviceOfferDesc:''
				},
				serviceRevise:{
					standardCd:'',
					serviceOfferName:'',
					serviceOfferDesc:'',
					parServiceOfferId:'',
					statusCd:''
				},
				serviceTypeArray:[
					{label:'同级节点',value:'-1'},
					{label:'下级节点',value:'1'}
				],
                tableData:{
				},
				tableTitleData:[{
					name:'服务提供编码',
					param:'standardCd',
					span:4,
					part:''
				},{
					name:'服务提供名称',
					param:'serviceOfferName',
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
                iSsendIbp:[
                    {
                        label:'是',
                        value:'1'
                    },
                    {
                        label:'否',
                        value:'0'
                    },
                ],
				statusCdObj:[
					{label:"有效",value:"1000"},
					{label:"无效",value:"1100"},
					{label:"未生效",value:"1200"},
					{label:"已归档",value:"1300"},
				],
				pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                    pageCount: 0,    // 总页数
                    rowCount: 0      // 总条数
                },
                dialogSize: {
                	size:50,
					min:400,
					max:400
				},
				parServiceOfferId:'',
                tipInfo: {
                	iconType:1,
                	msg:'',
                	showBtn:{
                		clear: true,
                		save: true
                	}
				},
				serviceList:[],
				checkboxData:[],
				serviceOfferId:'',

			}
		},
		watch:{
			treeModel(val){
				this.getServiceList(val.serviceOfferName,val.standardCd)
				this.checkboxData = [];
			}
		},
		mounted() {
			this.getTableData();
			this.getServiceList();
        },
		methods:{
			//列表计算显示
            adjustTabelItemText(item, param) {
				let val = item[param];
				// console.log(val);
                switch(param) {
                    case 'standardCd':
                        return item.standardCd;
                    case 'serviceOfferName':
                        return item.serviceOfferName;
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
			//服务提供列表
			getServiceList(name,standardCd){
				this.$axios.get(this.$api.GetServiceOfferList, {
                    params: {
						offset:'',
						page:this.pageInfo.pageIndex,
						limit:20,
						parServiceOfferId:'',
						serviceOfferName:name,
						serviceOfferNbr:'',
						standardCd:standardCd,
                    }
                }).then((res) => {
                    if (res.data.success == true) {
                        this.tableList = res.data.serviceOfferList.content
                        // console.log(res)
                        this.pageInfo = {
                            pageIndex: res.data.serviceOfferList.page,
                            pageSize: res.data.serviceOfferList.limit,
                            rowCount: res.data.serviceOfferList.total,
                        };
                    }else{
						this.$message.error({ message : '查询失败' })
					}
                }).catch(error=>{
				})
			},
			searchResource (data) {
                this.pageInfo.pageIndex = 1;
                this.treeModel = '';
				this.getServiceList(data)
			},
			pageChange(page) {
				this.pageInfo.pageIndex = page;
                this.getServiceList();
			},
			getStatus(val) {//获取状态
				if(val){
					return this.statusCdObj.find(item => item.value == val).label;
				}else{
					return '空'
				}
			},
			//查询树
            getTableData(val,type) {
               this.$axios.get(this.$api.OrdServiceOffer, {
					params:{
						serviceOfferId:'',
						serviceOfferName:'',
						serviceOfferNbr:'',
						serviceOfferPublishId:'',
						standardCd:'',
						statusCd:'',
					}
                }).then((res) => {
					if(res.data.success == true){
						this.tableData = res.data.serviceOffers;
					}else{
						this.$message.error({ message : "查询失败" })
					}                    
                }).catch((error)=>{
						this.$message.error({ message : "查询失败" })
				})
            },
			//获取下一级
            getNex(val){
                if(val.isOpen&&val.data.children == null){
                    this.getTableData(val);   //根据id查询下级组织
                }
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
			getList() {//获取过程列表
				this.$axios.get(this.$api.OrdServiceOffer, {
					params:{
						serviceOfferId:'',
						serviceOfferName:'',
						serviceOfferNbr:'',
						serviceOfferPublishId:'',
						standardCd:'',
						statusCd:'',
					}
                }).then((res) => {
					if(res.data.success == true){
						this.$message.success({ message : "查询成功" })
					}else{
						this.$message.error({ message : "查询失败" })
					}                    
                }).catch((error)=>{
						this.$message.error({ message : "查询失败" })
				})
			},

			addFirstService(){

			},
			addService(item) {
				if(this.treeModel == ''){
					this.$message.error({message:'请先选择树'})
					return
				}
				this.serviceObj={
					serviceType:'-1',
					standardCd:'',
					serviceOfferName:'',
					serviceOfferDesc:''
				},
				this.$refs.addService.show();
			},

			addServiceSure(){//添加弹框确定
				if(this.serviceObj.serviceType == '-1'){
					this.parServiceOfferId ='-1'
				}else{
					this.parServiceOfferId = this.treeModel.serviceOfferId
				}
				this.$validator.validateAll().then((result) => {
					if(result) {
						this.$axios.post(this.$api.OrdServiceOffer, {
							"actType": "string",
							"childrenNum": 0,
							"createDate": "2018-11-21T06:10:22.930Z",
							"createStaff": 0,
							"parServiceOfferId":this.parServiceOfferId,
							"remark": "1",
							"serviceOfferDesc":this.serviceObj.serviceOfferDesc,
                            "serviceOfferName":this.serviceObj.serviceOfferName ,
                            "isSendIbp":this.serviceObj.isSendIbp,
							"standardCd": this.serviceObj.standardCd,
							"statusCd": "1200",
							"statusDate": "2018-11-21T06:10:22.930Z",
							"updateDate": "2018-11-21T06:10:22.930Z",
							"updateStaff": 0,
							"version": "1"
						}).then((res) => {
							// console.log(res,'添加')
							if(res.data.success == true){
								this.$message.success({ message : "添加成功" })
								this.getTableData();
							}else{
								this.$message.error({ message : "添加失败" })
							}          
							this.$refs.addService.hide();    
						}).catch((error)=>{
								this.$message.error({ message : "添加失败" })
						})
					}
				})
			},
			editService(type,item) {
				if(this.checkboxData.length > 1){
					this.$message.error({message:'请选择一条数据'})
					return
				}
				if(type == 'top'){
					if(this.checkboxData[0].statusCd == '1000'){
						this.$message.error({message:'已发布无法修改'})
                        return
					}
					this.serviceRevise = {
						standardCd:this.checkboxData[0].standardCd,
						serviceOfferName:this.checkboxData[0].serviceOfferName,
						serviceOfferDesc:this.checkboxData[0].serviceOfferDesc,
                        statusCd:this.checkboxData[0].statusCd,
                        isSendIbp:this.checkboxData[0].isSendIbp,
                    };
                    this.serviceOfferId = this.checkboxData[0].serviceOfferId;
				}else if(type == 'bottom'){
					this.serviceRevise = {
						standardCd:item.standardCd,
						serviceOfferName:item.serviceOfferName,
						serviceOfferDesc:item.serviceOfferDesc,
						statusCd:item.statusCd,
						isSendIbp:item.isSendIbp,
                    };
                    this.serviceOfferId = item.serviceOfferId;
				}
				
				this.$refs.editService.show();
			},
			topService(type,item){//升版
			if(this.checkboxData.length > 1){
					this.$message.error({message:'请选择一条数据'})
					return
				}
				if(type == 'top'){
					if(this.checkboxData[0].statusCd != '1000'){
						this.$message.error({message:'未发布无法升版'})
						return
					}
					this.serviceOfferId = this.checkboxData[0].serviceOfferId
				}else if(type == 'bottom'){
					this.serviceOfferId = item.serviceOfferId
				}
				this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要升版选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
			},
			bottomService(type,item){//下架
			if(this.checkboxData.length > 1){
					this.$message.error({message:'请选择一条数据'})
					return
				}
				if(type == 'top'){
					if(this.checkboxData[0].statusCd != '1000'){
						this.$message.error({message:'未发布无法下架'})
						return
					}
					this.serviceOfferId = this.checkboxData[0].serviceOfferId
				}else if(type == 'bottom'){
					this.serviceOfferId = item.serviceOfferId
				}
				this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要下架选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
			},
			releaseService(type,item){//发布
			if(this.checkboxData.length > 1){
					this.$message.error({message:'请选择一条数据'})
					return
				}
				if(type == 'top'){
					if(this.checkboxData[0].statusCd == '1000'){
						this.$message.error({message:'已发布'})
						return
					}
					this.serviceOfferId = this.checkboxData[0].serviceOfferId
				}else if(type == 'bottom'){
					this.serviceOfferId = item.serviceOfferId
				}
				this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要发布选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
			},
			reviseServiceSure(){//修改弹框确认
				this.$axios.put(this.$api.OrdServiceOffer, {
					"actType": "",
					"childrenNode": [
					],
					"childrenNum": 0,
					"createDate": "2018-11-21T06:58:07.729Z",
					"createStaff": 0,
					"parServiceOfferId": '',
					"remark": "1",
					"serviceOfferDesc": this.serviceRevise.serviceOfferDesc,
					"serviceOfferId": this.serviceOfferId,
                    "serviceOfferName": this.serviceRevise.serviceOfferName,
                    "isSendIbp":this.serviceRevise.isSendIbp,
					"serviceOfferPublishId": "",
					"standardCd": this.serviceRevise.standardCd,
					"statusCd": this.serviceRevise.statusCd,
					"statusDate": "2018-11-21T06:58:07.729Z",
					"updateDate": "2018-11-21T06:58:07.729Z",
					"updateStaff": 0,
					"version": "1"
                }).then((res) => {
					if(res.data.success == true){
						this.getServiceList();
                        this.getTableData();
                        this.checkboxData = [];
						this.$message.success({ message : "修改成功" })
					}else{
						this.$message.error({ message : "修改失败" })
					}                    
					this.$refs.editService.hide();
                }).catch((error)=>{
						this.$message.error({ message : "修改失败" })
				})
			},
            delClick(type,item){
				if(this.checkboxData.length > 1){
					this.$message.error({message:'请选择一条数据'})
					return
				}
				if(type == 'top'){
					this.serviceOfferId = this.checkboxData[0].serviceOfferId;
				}else if(type == 'bottom'){
					this.serviceOfferId = item.serviceOfferId;
				}
                this.tipInfo.iconType = 3;
                this.tipInfo.msg = '确认要删除选择的记录吗？';
                this.tipInfo.showBtn.clear = true;
                this.tipInfo.showBtn.save = true;
                this.$refs.tip.show();
            },
            //删除弹框确认
            tipConfirm(){
				let serviceOfferId = this.serviceOfferId;
				if(this.tipInfo.msg == `确认要删除选择的记录吗？`){
					// console.log("删除");
					this.$axios.delete(this.$api.replace(this.$api.DelServiceOffer,['{serviceOfferId}'],[serviceOfferId]), {
						params:{
							serviceOfferId:serviceOfferId,
							updateStaff:this.updateStaff ,
						}
                }).then((res) => {
					if(res.data.success == true){
						this.getServiceList();
						this.getTableData();
						this.$message.success({ message : "删除成功" })
						this.checkboxData = [];
					}else{
						this.$message.error({ message : "删除失败" })
					}                    
                }).catch((error)=>{
						this.$message.error({ message : "删除失败" })
				})
				}else if(this.tipInfo.msg == `确认要升版选择的记录吗？`){
					// console.log('升版')
					this.$axios.post(this.$api.replace(this.$api.TopServiceOffer,['{serviceOfferId}'],[serviceOfferId]), {
							serviceOfferId:serviceOfferId,
							updateStaff :this.updateStaff  ,
                }).then((res) => {
					if(res.data.success == true){
						this.getServiceList();
						this.getTableData();
						this.$message.success({ message : "升版成功" })
						this.checkboxData = [];
					}else{
						this.$message.error({ message : "升版失败" })
					}   
				}).catch((error)=>{
						this.$message.error({ message : "升版失败" })
				})             
				}else if(this.tipInfo.msg == `确认要发布选择的记录吗？`){
					// console.log('发布');
					this.$axios.post(this.$api.replace(this.$api.ReleaseService,['{serviceOfferId}'],[serviceOfferId]), {
							serviceOfferId:serviceOfferId,
							updateStaff :this.updateStaff  ,
                }).then((res) => {
					if(res.data.success == true){
						this.getServiceList();
						this.getTableData();
						this.$message.success({ message : "发布成功" })
						this.checkboxData = [];
					}else{
						this.$message.error({ message : "发布失败" })
					}   
				}).catch((error)=>{
						this.$message.error({ message : "发布失败" })
				})             
				}else if(this.tipInfo.msg == `确认要下架选择的记录吗？`){
					this.$axios.post(this.$api.replace(this.$api.OfflineService,['{serviceOfferId}'],[serviceOfferId]), {
							serviceOfferId:serviceOfferId,
							updateStaff :this.updateStaff,
					}).then((res) => {
						if(res.data.success == true){
							this.getServiceList();
							this.getTableData();
							this.$message.success({ message : "下架成功" })
							this.checkboxData = [];
						}else{
							this.$message.error({ message : "下架失败" })
						}   
					}).catch((error)=>{
							this.$message.error({ message : "下架失败" })
					})             
				}
				
                this.$refs.tip.hide();
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
		.h-operation {
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
			.d-name {
				font-size: 14px;
				display: block;
				color: $mainColor;
				cursor: pointer;
				font-size: 16px;
				margin-bottom: 10px;
				padding-left: 30px;
				background: url(images/sideslip_icon.png) no-repeat left center;
			}
			.d-s {
				position: absolute;
				width: 100%;
				height: 30px;
				top: 15px;
				.search {
					position: absolute;
					width: 100%;
					height: 50px;
					padding-left:10px; 
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
				height: 100%;
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
		height: 100%;
		float: left;
	}
	.d-right {
		width: 95%;
		height: 100%;
		margin: 10px;
		.d-right-info{
			height: 55px;
		}
		.d-right-info2{
			margin-bottom: 10px;
		}
		.selected {
			font-weight: bold;
			margin-left: 10px;
			margin-bottom: 20px;
		}
		.col {
			/*margin-left: 0;*/
		}
	}
</style>
