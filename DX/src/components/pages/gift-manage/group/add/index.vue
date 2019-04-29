<template>
	<div class="add-info">
		<Scroll  :isShowRight="true">
			<div class="basic-part">
				<div class="basic-info" ref="basicScroll">
					<div class="configuration-tip app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span class="configuration-word">新建礼包</span>
					</div>
					<Row  class="main">
						<Form labelWidth="120px" labelAlign="left" >
							<Col :span="12">
								<FormItem labelText="礼包名称:" :requiredIcon="true" :errorMessage="errors.first('offerPackageName')">
									<Input v-validate="'required'" name="offerPackageName" v-model.trim="packageObj.offerPackageName" data-vv-as="礼包名称"></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="2">
								<FormItem labelText="管理级别:" :requiredIcon="true" :errorMessage="errors.first('manageGrade')" class="manageGrade">
			                        <Select v-validate="'required'" :data="manageGradeArray" name="manageGrade" data-vv-as="管理级别" v-model="packageObj.manageGrade"></Select>
			                    </FormItem>
							</Col>
							<Col :span="12">
								<FormItem labelText="生效时间:" :requiredIcon="true" :errorMessage="errors.first('effDate')">
									<DatePicker v-validate="'required'" v-model="packageObj.effDate" name="effDate" placeholder="年/月/日" data-vv-as="生效时间"></DatePicker>	
								</FormItem>
							</Col>
							<Col  :span="10" :offset="2">
								<FormItem labelText="失效时间:" :requiredIcon="true" :errorMessage="errors.first('expDate')">
									<DatePicker v-validate="'required'" v-model="packageObj.expDate" name="expDate" placeholder="年/月/日" data-vv-as="失效时间"></DatePicker>	
								</FormItem>
							</Col>
							<Col :span="24">
								<FormItem labelText="礼包描述:"  :errorMessage="errors.first('offerPkgDesc')">
									<textarea  v-model="packageObj.offerPkgDesc" name="offerPkgDesc" class="access-textarea"></textarea>
									<span>200字以内</span>
								</FormItem>
							</Col>
							<Col :span="24">
								<FormItem labelText="配置礼包:">
									<div class="app__btn app__btn-add" @click="addOffer()">添加商品</div>
									<div class="app__btn app__btn-add" @click="addOfferGroup()">添加商品组</div>
								</FormItem>
							</Col>
						</Form>
					</Row>

					<div class="main-list">
						<Scroll :isShowRight="true">
							<div class="app__table__inner">
								
								<Row class="app__table-thead">
									<Col :span="1">序号</Col>
									<Col :span="5">销售品/商品组名称</Col>
									<Col :span="3">内部编码</Col>
									<Col :span="3">销售品类型</Col>
									<Col :span="3">商品组选项</Col>
									<Col :span="3">构成类型</Col>
									<Col :span="3">订购数量限制</Col>
									<Col :span="3">操作</Col>
								</Row>
								<Form >
									<Row class="tab-tbody" :class="['app__table-item']" v-for="(item,index) in packageObjRels" :key="index">
										<Col :span="1">{{index+1}}</Col>
										<Col :span="5" class="col-show">
											<i :class="{show2:goodsId===index}" @click="showChildClick(index)" v-show="item.packageObjRels.length > 0"></i>
											{{item.name ? item.offerSysName : item.nameGrp}}
										</Col>
										<Col :span="3">{{item.number ? item.number : item.numberGrp}}</Col>
										<Col :span="3">{{getObjType(item.objType)}}</Col>
										<Col :span="3" v-if="item.packageObjRels.length == 0">
										</Col>
										<Col :span="3" v-else>
											<FormItem  :errorMessage="errors.first('offerGrpOption')" class="grpOptionInput">
												{{item.packageObjRels.length}}选<Input :class="{validate:!item.offerGrpOption}"  name="offerGrpOption" data-vv-as="商品组选项" v-model="item.offerGrpOption"  class="offerGrpOption" number></Input>
											</FormItem>
										</Col>
										<Col :span="3">
											<FormItem :requiredIcon="true" :errorMessage="errors.first('relType')">
												<Select  v-validate="'required'" name="relType" :isNullSel="false" :data="relTypeArray" v-model="item.relType" data-vv-as="构成类型"></Select>
											</FormItem>
										</Col>
										<Col :span="3">
											<FormItem  :errorMessage="errors.first('offerOrderNum')">
												<Input :class="{validate:!item.offerGrpOption}" name="offerOrderNum" data-vv-as="订购数量限制" v-model="item.offerOrderNum" number></Input>
											</FormItem>
										</Col>
										<Col :span="3">
											<span class="span iconfont icon-jiahao" @click.stop="showOfferLeaf(item)"></span>
											<span class="span iconfont icon-shanchu" title="删除" @click.stop="delLeaf(item, index)"></span>
										</Col>


										<!-- 子表格 -->
										<Col :span="24" class="child-list" v-show="goodsId===index">
											<Form >
												<Row v-if="item.packageObjRels.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(val,index) in item.packageObjRels" :key="index">
													<Col :span="1"></Col>
													<Col :span="5" class="col-show">
														<div class="borderline"></div>{{item.nameGrp ? val.name : val.offerSysName}}
													</Col>
												<Col :span="3">{{val.number}}</Col>
												<Col :span="3">{{getObjType(val.objType)}}</Col>
												<Col :span="3"></Col>
												<Col :span="3">
													<FormItem :requiredIcon="true" :errorMessage="errors.first('relType')">
														<Select  v-validate="'required'" name="relType" :isNullSel="false" :data="relTypeArray" v-model="val.relType" data-vv-as="构成类型"></Select>
													</FormItem>
												</Col>
												<Col :span="3">
													<FormItem  :errorMessage="errors.first('offerOrderNum')">
														<Input :class="{validate:!val.offerGrpOption}" name="offerOrderNum" data-vv-as="订购数量限制" v-model="val.offerOrderNum" number></Input>
													</FormItem>
												</Col>
												<Col :span="3"></Col>
													
												</Row>
											</Form>
										</Col> 


									</Row>
								</Form>
								
								<Row v-if="packageObjRels.length == 0" class="app__data-none">
									<Col :span="24">
									<span>当前无数据</span>
									</Col>
								</Row>
							</div>
						</Scroll>
					</div>
				</div>
			</div>
		</Scroll>

		<!-- 商品 -->
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="选择添加销售品" ref="addOfferRels" @confirm="addOfferSubmit">
			<Scroll class="main-part" :isShowRight="true">
				<div class="search">
					<Search placeholder="请输入销售品内部名称" @search="searchOfferData"></Search>
				</div>

				<div class="app__table__inner">
					<!-- 表头 -->
					<Row class="app__table-thead">
						<Col :span="8">销售品内部名称</Col>
						<Col :span="6">内部编码</Col>
						<Col :span="6">销售品类型</Col>
						<Col :span="4">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in offerList" :key="index">
						<Col :span="8" :title="item.offerSysName" class="no-wrap">{{item.offerSysName}}</Col>
						<Col :span="6">{{item.innerNbr}}</Col>
						<Col :span="6">{{getOfferType(item.offerType)}}</Col>
						<Col :span="4">
							<span v-if="!selectMktOffer(item)" class="iconfont icon-weixuanzhong-fang" @click="addOfferPage(item)"></span>
							<span v-if="selectMktOffer(item)" class="iconfont icon-xuanzhong-fang" @click="deleteOfferPage(item)"></span>
						</Col>
					</Row>
					<Row v-if="offerList.length == 0" class="app__data-none">
						<Col :span="24">
						<span>当前无数据</span>
						</Col>
					</Row>
				</div>
				<Pagination :pageIndex="offerPageInfo.pageIndex" :pageSize="offerPageInfo.pageSize" :rowCount="offerPageInfo.rowCount"  @change="offerPageChange" :isCenter="true"></Pagination>
				<!-- 已选-->
				<div class="offer-selected" v-show="offerSelected.length>0"   ref="yxScrollRef">
					<div>
						已选:
						<span  v-for="(item,index) in offerSelected" :key="index">{{item.name ? item.offerSysName: item.nameGrp}} 、</span>
					</div>
				</div>
				
			</Scroll>
		</Dialog>

		<!-- 商品组 -->
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="选择添加商品组" ref="addOfferGrpRels" @confirm="addOfferGrpSubmit">
			<Scroll class="main-part" :isShowRight="true">
				<div class="search">
					<Search placeholder="请输入商品组名称" @search="searchOfferGrpData"></Search>
				</div>

				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="10">商品组名称</Col>
						<Col :span="10">商品组编码</Col>
						<!-- <Col :span="4">销售品组类型</Col> -->
						<Col :span="4">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in offerGrpList" :key="index">
						<Col :span="10" class="no-wrap">{{item.offerGrpName}}</Col>
						<Col :span="10">{{item.offerGrpNbr}}</Col>
						<!-- <Col :span="4">{{getGrpRelType(item.grpRelType)}}</Col> -->
						<Col :span="4">
							<span v-if="!selectMktOfferGrp(item)" class="iconfont icon-weixuanzhong-fang" @click="addOfferGrpPage(item)"></span>
							<span v-if="selectMktOfferGrp(item)" class="iconfont icon-xuanzhong-fang" @click="deleteOfferGrpPage(item)"></span>
						</Col>
					</Row>
					<Row v-if="offerGrpList.length == 0" class="app__data-none">
						<Col :span="24">
						<span>当前无数据</span>
						</Col>
					</Row>
				</div>
				<Pagination :pageIndex="offerGrpPageInfo.pageIndex" :pageSize="offerGrpPageInfo.pageSize" :rowCount="offerGrpPageInfo.rowCount"  @change="offerGrpPageChange" :isCenter="true"></Pagination>
				<!-- 已选-->
				<div class="offer-selected" v-show="offerGrpSelected.length>0"   ref="yxScrollRef">
					<div>
						已选:
						<span  v-for="(item,index) in offerGrpSelected" :key="index">{{item.name ? item.name: item.nameGrp}} 、</span>
					</div>
				</div>
				
			</Scroll>
		</Dialog>

		<!-- 商品子 -->
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="选择添加销售品" ref="addLeafRels" @confirm="addLeafSubmit">
			<Scroll class="main-part" :isShowRight="true">
				<div class="search">
					<Search placeholder="请输入销售品内部名称" @search="searchLeafData"></Search>
				</div>

				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="8">销售品内部名称</Col>
						<Col :span="6">内部编码</Col>
						<Col :span="6">销售品类型</Col>
						<Col :span="4">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in leafList" :key="index">
						<Col :span="8" class="no-wrap">{{item.zOfferSysName}}</Col>
						<Col :span="6">{{item.zInnerNbr}}</Col>
						<Col :span="6">{{getOfferType(item.relType)}}</Col>
						<Col :span="4">
							<span v-if="!selectMktLeaf(item)" class="iconfont icon-weixuanzhong-fang" @click="addLeafPage(item)"></span>
							<span v-if="selectMktLeaf(item)" class="iconfont icon-xuanzhong-fang" @click="deleteLeafPage(item)"></span>
						</Col>
					</Row>
					<Row v-if="leafList.length == 0" class="app__data-none">
						<Col :span="24">
						<span>当前无数据</span>
						</Col>
					</Row>
				</div>
				<Pagination :pageIndex="leafPageInfo.pageIndex" :pageSize="leafPageInfo.pageSize" :rowCount="leafPageInfo.rowCount"  @change="leafPageChange" :isCenter="true"></Pagination>
				<div class="offer-selected" v-show="leafSelected.length>0"   ref="yxScrollRef">
					<div>
						已选:
						<span  v-for="(item,index) in leafSelected" :key="index">{{item.name ? item.offerSysName : ''}} 、</span>
					</div>
				</div>
				
			</Scroll>
		</Dialog>

		<!-- 商品组子 -->
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="选择添加商品组" ref="addLeafGrpRels" @confirm="addLeafGrpSubmit">
			<Scroll class="main-part" :isShowRight="true">
				<div class="search">
					<Search placeholder="请输入商品组名称" @search="searchLeafGrpData"></Search>
				</div>

				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="10" >商品组名称</Col>
						<Col :span="10">商品组编码</Col>
						<!-- <Col :span="4">销售品组类型</Col> -->
						<Col :span="4">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in leafGrpList" :key="index">
						<Col :span="10" class="no-wrap">{{item.offerName}}</Col>
						<Col :span="10">{{item.innerNbr}}</Col>
						<!-- <Col :span="4">{{getOfferType(item.offerType)}}</Col> -->
						<Col :span="4">
							<span v-if="!selectMktLeafGrp(item)" class="iconfont icon-weixuanzhong-fang" @click="addLeafGrpPage(item)"></span>
							<span v-if="selectMktLeafGrp(item)" class="iconfont icon-xuanzhong-fang" @click="deleteLeafGrpPage(item)"></span>
						</Col>
					</Row>
					<Row v-if="leafGrpList.length == 0" class="app__data-none">
						<Col :span="24">
						<span>当前无数据</span>
						</Col>
					</Row>
				</div>
				<Pagination :pageIndex="leafGrpPageInfo.pageIndex" :pageSize="leafGrpPageInfo.pageSize" :rowCount="leafGrpPageInfo.rowCount"  @change="leafGrpPageChange" :isCenter="true"></Pagination>
				<div class="offer-selected" v-show="leafGrpSelected.length>0"   ref="yxScrollRef">
					<div>
						已选:
						<span  v-for="(item,index) in leafGrpSelected" :key="index">{{item.name}} 、</span>
					</div>
				</div>
				
			</Scroll>
		</Dialog>

		<div class="footer">
			<div class="btn-page-box">
				<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
				<span class="app__btn app__btn-confirm" @click="submit()">完成</span>
			</div>
		</div>

        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		props:{
			componentData:{}
		},
		data() {
			return {
				packageObj: {
					regionId: '8310000',
					offerPackageId: '',
					offerPackageName: '',
					manageGrade: '',
					effDate: '',
					expDate: '',
					offerPkgDesc: ''
				},
				dialogSize: {
					size: 60,
					min: 600,
					max: 1000
				},
				// 商品
				offerPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				// 商品子
				leafPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				// 商品组
				offerGrpPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},

				leafGrpPageInfo: {
					pageIndex: 1,
					pageSize: 2,
					rowCount: 0
				},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				manageGradeArray: [{
					label:'集团框架级',
					value:'10'
				}, {
					label:'集团实例级',
					value:'11'
				}, {
					label:'省公司实例级',
					value:'12'
				}, {
				 	label:'本地网级',
					value:'13'
				}, {
					label:'省公司框架级',
					value:'14'
				}, {
					label:'转售实例级',
					value:'15'
				}],
				relTypeArray: [{
					label: '默认',
					value: '100000'
				}, {
					label: '可选',
					value: '200000'
				}, {
					label: '必选',
					value: '300000'
				}],

				offerList: [], // 商品列表
				offerSelected: [], // 商品已选
				offerId: '',
				offerTemp: [],
				searchObjOffer: {
					offerSysName: ''
				},

				// 商品子
				leafList: [], // 商品子
				leafSelected: [], // 商品已选
				leafTemp: '',
				searchObjLeaf: {
					zofferSysName: ''
				},

				pkgObjRelId: '', // 父id
				offerGrpList: [], // 商品组列表
				offerGrpSelected: [], // 商品组已选
				searchObjOfferGrp: {
					offerGrpName: ''
				},

				// 商品组子
				leafGrpList: [], // 商品子
				leafGrpSelected: [], // 商品已选
				leafGrpTemp: '',
				searchObjLeafGrp: {
					offerName: ''
				},



				packageObjRels: [],
				goodsId: '',  // 子表格


				
				leafGrpList: [], // 商品组子
				offerPage1:[], // offerType=12
				offerPage2:[], // offerType=13

				GrpOptionMax: '' // 商品组选项的最大值
				
			}
		},

		computed: {
			// minRoot() {
			// 	return `min_value:1|numeric`;
			// },
			// offerGrpOptionRoot() {
			// 	return `required|numeric|min_value:1|max_value: ${this.GrpOptionMax}`;
			// 	// return `required|numeric|min_value:1`;
			// }
		},
		mounted(){
			if (this.componentData.offerPackageId) this.getDetailData();
		},
		methods: {
			// 获取详情修改
			getDetailData() {
				this.$axios.get(this.$api.QueryOfferPackageDetail, {
					params: {
						offerPackageId: this.componentData.offerPackageId
					}
				}).then(res => {
					if (res.data.success) {
						this.packageObj = res.data.ordOfferPackage
						this.packageObjRels = res.data.ordOfferPackage.packageObjRels || []
					}
				})
			},
			// 商品
			getOfferList() {
				this.$axios.get(this.$api.OfferGetList, {
					params: {
						offerSysName: this.searchObjOffer.offerSysName,
						limit: this.offerPageInfo.pageSize,
						page: this.offerPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success) {
						this.offerList = res.data.offerPage.content || [];
						this.offerPageInfo.rowCount = res.data.offerPage.total;
					}
				})
			},
			// 添加商品
			addOffer() {
				this.searchObjOffer.offerSysName = '';
				this.$refs.addOfferRels.show();
				this.offerSelected = this.packageObjRels;
				this.offerSelected = this.offerSelected.filter(function(item, index, arr) {
					return item.name
				})
				this.getOfferList();

				
			
			},
			
			selectMktOffer(val) {
				return this.offerSelected.find(item => item.objId == val.offerId);
			},

			selectMktLeaf(val) {
				return this.leafSelected.find(item => item.objId == val.zOfferId);
			},
			addOfferPage(item) {
				let Temp = {
					leafType: 'leaf',
					applyRegionId: item.manageRegionId,
					createDate: item.createDate,
					createStaff: item.createStaff,
					effDate: item.effDate,
					expDate: item.expDate,
					level: item.level,
					mainObjFlag: item.mainObjFlag,
					name: item.offerName,
					nameGrp:'',
					offerSysName: item.offerSysName,
					number: item.innerNbr,
					objId: item.offerId,
					objType: item.offerType, // 销售品类型
					relType: item.relType ? item.relType : '100000', // 构成类型
					offerGrpOption: item.offerGrpOption ? item.offerGrpOption : '1', // 商品组选项
					offerOrderNum: item.offerOrderNum, // 订购数量限制
					offerPackageId: item.offerPackageId, // 礼包标识
					packageObjRels: item.packageObjRels ? item.packageObjRels : []
				}
				this.offerSelected.push(Temp);
			},

			addLeafPage(item) {
				let Temp = {
					parPkgObjRelId: this.pkgObjRelId ? this.pkgObjRelId : '', // 父id
					applyRegionId: item.applyRegionId,
					createDate: item.createDate ? item.createDate : '',
					createStaff: item.createStaff ? item.createStaff : this.$user.getInfo().id,
					effDate: item.effDate ? item.effDate : '',
					expDate: item.expDate ? item.expDate : '',
					level: item.level ? item.level : '',
					mainObjFlag: item.mainObjFlag ? item.mainObjFlag: '',
					name: item.zOfferName,
					offerSysName: item.zOfferSysName,
					number: item.zInnerNbr,
					objId: item.zOfferId,
					objType: item.relType,	
					relType: item.relType ?  item.relType : '100000',
					offerGrpOption: item.offerGrpOption ? item.offerGrpOption : '1',
					offerOrderNum: item.offerOrderNum ? item.offerOrderNum : '',
					offerPackageId: item.offerPackageId ? item.offerPackageId: this.packageObj.offerPackageId,
					pkgObjRelId: item.pkgObjRelId ? item.pkgObjRelId: '',
					statusCd: '1200',
					
				}
				this.leafSelected.push(Temp);
			},
			deleteOfferPage(item) {
				for(var i=0;i<this.offerSelected.length;i++){
					if(this.offerSelected[i].objId == item.offerId){
						this.offerSelected.splice(i,1);
					}
				}
			},

			deleteLeafPage(item) {
				for(var i=0;i<this.leafSelected.length;i++){
					if(this.leafSelected[i].objId == item.zOfferId){
						this.leafSelected.splice(i,1);
					}
				}
			},

			addOfferSubmit() {
				this.$refs.addOfferRels.hide();
				this.packageObjRels = this.packageObjRels.concat(this.offerSelected)
				let hash = {}
				this.packageObjRels = this.packageObjRels.reduce((item, next) => {
					if (!hash[next.objId]) {
					hash[next.objId] = true
					item.push(next)
					}
					return item
				}, [])
			},


			addLeafSubmit() {
				
				this.leafTemp.packageObjRels = this.leafSelected
				this.$refs.addLeafRels.hide();
			},

			searchLeafData(val) {
				this.searchObjLeaf.zofferSysName = val;
				this.leafPageInfo.pageIndex = 1;
				this.getLeafList();
			},

			searchOfferData(val) {
				this.searchObjOffer.offerSysName = val;
				this.offerPageInfo.pageIndex = 1;
				this.getOfferList();
			},
			offerPageChange(page) {
				this.offerPageInfo.pageIndex = page;
				this.getOfferList();
			},

			leafPageChange(page) {
				this.leafPageInfo.pageIndex = page;
				this.getLeafList();
			},

			getOfferType(type) { //获取销售品类型区分
				switch(type) {
					case '10':
						return '基础销售品';
					case '11':
						return '套餐销售品';
					case '12':
						return '可选包';
					case '13':
                        return '促销';
                    case '14':
						return '政企协议';
					case '15':
						return '礼包';
					case '20':
						return '加装包';
					case '30':
						return '关联包';
					case '100000':
						return '默认';
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
			getObjType(type) { // packageobjrel
				switch(type) {
					case '10':
						return '基础销售品';
					case '11':
						return '套餐销售品';
					case '12':
						return '可选包';
					case '13':
                        return '促销';
                    case '14':
						return '政企协议';
					case '15':
						return '礼包';
					case '20':
						return '加装包';
					case '30':
						return '关联包';
					case '1000':
						return '互斥组';
					case '1100':
						return '续约组';
					case '1200':
						return '依赖组';
					case '1300':
						return '普通组';
					case '100000':
						return '默认';
					case '200000':
						return '可选';
					case '300000':
						return '必选';
					default:
						return "未知";
				}
			},





			// 商品组
			getOfferGrpList() {
				this.$axios.get(this.$api.QureyAllOfferGroupList, {
					params: {
						offerGrpName: this.searchObjOfferGrp.offerGrpName,
						limit: this.offerGrpPageInfo.pageSize,
						page: this.offerGrpPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success) {
						this.offerGrpList = res.data.offerGrpPage.content || [];
						this.offerGrpPageInfo.rowCount = res.data.offerGrpPage.total;
					}
				})
			},
			// 添加商品组
			addOfferGroup() {
				this.searchObjOfferGrp.offerGrpName = '';
				this.$refs.addOfferGrpRels.show();
				this.offerGrpSelected = this.packageObjRels;
				this.offerGrpSelected = this.offerGrpSelected.filter(function(item, index, arr) {
					return item.nameGrp
				})
				this.getOfferGrpList();

				
			
			},
			
			selectMktOfferGrp(val) {
				return this.offerGrpSelected.find(item => item.objId == val.offerGrpId);
			},

			selectMktLeafGrp(val) {
				return this.leafGrpSelected.find(item => item.objId == val.offerId);
			},

			addOfferGrpPage(item) {
					let Temp = {
					leafType: 'leafGrp',
					applyRegionId: item.applyRegionId,
					createDate: item.createDate,
					createStaff: item.createStaff,
					effDate: item.effDate,
					expDate: item.expDate,
					level: item.level,
					mainObjFlag: item.mainObjFlag,
					name: '',
					nameGrp: item.offerGrpName,
					number: item.offerGrpNbr,
					objId: item.offerGrpId,
					objType: item.grpRelType, // 销售品类型
					relType: item.relType ? item.relType : '100000', // 构成类型
					offerGrpOption: item.offerGrpOption ? item.offerGrpOption : '1', // 商品组选项
					offerOrderNum: item.offerOrderNum, // 订购数量限制
					offerPackageId: item.offerPackageId, // 礼包标识
					packageObjRels: item.packageObjRels ? item.packageObjRels : []
				}
				this.offerGrpSelected.push(Temp);
			},



			addLeafGrpPage(item) {
					let Temp = {
					parPkgObjRelId:  this.pkgObjRelId ? this.pkgObjRelId : '', // 父id
					applyRegionId: item.applyRegionId,
					createDate: item.createDate ? item.createDate : '',
					createStaff: item.createStaff ? item.createStaff : this.$user.getInfo().id,
					effDate: item.effDate ? item.effDate : '',
					expDate: item.expDate ? item.expDate : '',
					level: item.level ? item.level : '',
					mainObjFlag: item.mainObjFlag ? item.mainObjFlag: '',
					name: item.offerName,
					number: item.innerNbr,
					objId: item.offerId,
					objType: item.offerType,	
					relType: item.relType ? item.relType : '100000',
					offerGrpOption: item.offerGrpOption ? item.offerGrpOption : '',
					offerOrderNum: item.offerOrderNum,
					offerPackageId: item.offerPackageId ? item.offerPackageId: this.packageObj.offerPackageId,
					pkgObjRelId: item.pkgObjRelId ? item.pkgObjRelId: '',
					statusCd: '1200',
					
				}
				this.leafGrpSelected.push(Temp);
			},
			deleteOfferGrpPage(item) {
				for(var i=0;i<this.offerGrpSelected.length;i++){
					if(this.offerGrpSelected[i].objId == item.offerGrpId){
						this.offerGrpSelected.splice(i,1);
					}
				}
			},

			deleteLeafGrpPage(item) {
				for(var i=0;i<this.leafGrpSelected.length;i++){
					if(this.leafGrpSelected[i].objId == item.offerId){
						this.leafGrpSelected.splice(i,1);
					}
				}
			},

			addOfferGrpSubmit() {
				this.$refs.addOfferGrpRels.hide();
				this.packageObjRels = this.packageObjRels.concat(this.offerGrpSelected)
				let hash = {}
				this.packageObjRels = this.packageObjRels.reduce((item, next) => {
					if (!hash[next.objId]) {
					hash[next.objId] = true
					item.push(next)
					}
					return item
				}, [])
			},

			addLeafGrpSubmit() {
				this.leafGrpTemp.packageObjRels = this.leafGrpSelected
				this.$refs.addLeafGrpRels.hide();
			},

			searchOfferGrpData(val) {
				this.searchObjOfferGrp.offerGrpName = val;
				this.getOfferGrpList();
			},

			searchLeafGrpData(val) {
				this.searchObjLeafGrp.offerName = val;
				this.leafGrpList = [];
				this.getLeafGrpList();
			},
			offerGrpPageChange(page) {
				this.offerGrpPageInfo.pageIndex = page;
				this.getOfferGrpList();
			},

			leafGrpPageChange(page) {
				this.leafGrpPageInfo.pageIndex = page;
				this.leafGrpList = [];
				this.getLeafGrpList();
			},

			
			getLeafList() {
				this.$axios.get(this.$api.replace(this.$api.QueryLeafList, ['{offerId}'], [this.offerId]), {
					params: {
						// offerId: item.objId,
						statusCd: '1000',
						zofferSysName: this.searchObjLeaf.zofferSysName,
						zOfferNbr: '',
						relType: '100000',
						aOfferName: '',
						aOfferNbr: '',
						page: this.leafPageInfo.pageIndex,
						limit: this.leafPageInfo.pageSize
					}
				}).then(res => {
					if (res.data.success) {
						this.leafList = res.data.offerRels.content || [];
						this.leafPageInfo.rowCount = res.data.offerRels.total;
					}
				})
			},
			// 商品组子
			getLeafGrpList() {
				// objType =12
				this.$axios.get(this.$api.QueryLeafGrpList, {
					params: {
						offerName: this.searchObjLeafGrp.offerName,
						offerType: '12',
						limit: this.leafGrpPageInfo.pageSize,
						page: this.leafGrpPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success) {
						this.offerPage1 = res.data.offerPage.content || [];
						this.leafGrpPageInfo.rowCount = res.data.offerPage.total;
						this.leafGrpList = this.leafGrpList.concat(this.offerPage1)
					}
					
				}).catch(error => {
					this.$message.error({message: '服务器异常!'});
				})
				// objType =13
				this.$axios.get(this.$api.QueryLeafGrpList, {
					params: {
					offerName: this.searchObjLeafGrp.offerName,
					offerType: '13',
					limit: this.leafGrpPageInfo.pageSize,
					page: this.leafGrpPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success) {
						this.offerPage2 = res.data.offerPage.content || [];
						this.leafGrpPageInfo.rowCount = res.data.offerPage.total;
						this.leafGrpList = this.leafGrpList.concat(this.offerPage2)
					}
				}).catch(error => {
					this.$message.error({message: '服务器异常!'});
				})

			},
			showOfferLeaf(item) {
				if(this.componentData.offerPackageId) {
					if (item.name) {
						this.leafTemp = item;
						this.offerId = item.objId;
						this.pkgObjRelId = item.pkgObjRelId;

						this.searchObjLeaf.zofferSysName = '';
						this.$refs.addLeafRels.show();
						this.leafSelected = this.leafTemp.packageObjRels
						this.getLeafList();
					} else if (item.nameGrp) {
						this.leafGrpTemp = item
						this.pkgObjRelId = item.pkgObjRelId;

						this.searchObjLeafGrp.offerName = '';
						this.$refs.addLeafGrpRels.show();
						this.leafGrpList = []
						this.leafGrpSelected = this.leafGrpTemp.packageObjRels
						this.getLeafGrpList();
					}
				
				} else {
					if (item.leafType == 'leaf') {
						this.leafTemp = item;
						this.offerId = item.objId;
						this.pkgObjRelId = item.pkgObjRelId;

						this.searchObjLeaf.zofferSysName = '';
						this.$refs.addLeafRels.show();
						this.getLeafList();
					} else if (item.leafType == 'leafGrp') {
						this.leafGrpTemp = item
						this.pkgObjRelId = item.pkgObjRelId;

						this.searchObjLeafGrp.offerName = '';
						this.$refs.addLeafGrpRels.show();
						this.leafGrpList = []
						this.getLeafGrpList();
					}
				}
				
			},
			delLeaf(item, index) {
				if (this.componentData.offerPackageId) {
					this.pkgObjRelId = item.pkgObjRelId || '';
					this.offerPackageId = item.offerPackageId;
					this.statusCd = item.statusCd;
					this.tipType = 'DEL';
					this.tipInfo.iconType = 3;
					this.tipItem = item;
					this.tipIndex = index;
					this.tipInfo.msg = `确定删除吗?`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
					
				} else {
					// for (var i = 0; i < this.packageObjRels.length; i++) {
					// 	if (this.packageObjRels[i].objId == item.objId) {
					// 		this.packageObjRels.splice(i, 1)
					// 	}
					// }

					this.pkgObjRelId = item.pkgObjRelId || '';
					this.offerPackageId = item.offerPackageId;
					this.tipType = 'DEL';
					this.tipInfo.iconType = 3;
					this.tipItem = item;
					this.tipIndex = index;
					this.tipInfo.msg = `确定删除吗?`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				}
				
			},
			
			submit() {
				this.$validator.validateAll().then(result => {
					if (result) {
						if (new Date(this.packageObj.effDate).getTime() > new Date(this.packageObj.expDate).getTime()) {
							this.$message.error({message : '生效时间必须小于失效时间！'});
							return;
						}

						for (let ele of this.packageObjRels) {
							if (ele.packageObjRels.length !== 0) {
								if (!ele.offerGrpOption) {
									this.$message.warning({message: '请输入商品组选项！'});
									return;
								} else {
									if (!(/(^[1-9]\d*$)/.test(ele.offerGrpOption))) {
										this.$message.warning({message: '请输入正确的商品组选项'})
										return

									} else {
										// 匹配成功的正整数
										if (Number(ele.offerGrpOption) > Number(ele.packageObjRels.length)) {
											this.$message.warning({message: '请输入正确的商品组选项'})
											return
										}
									}
								}
							}
							

							if (ele.offerOrderNum) {
								if (!(/(^[1-9]\d*$)/.test(ele.offerOrderNum))) {
									this.$message.warning({message: '请输入正确订购数量限制'})
									return

								} 

								for (let eleleaf of ele.packageObjRels) {
									if (eleleaf.offerOrderNum) {
										if (!(/(^[1-9]\d*$)/.test(eleleaf.offerOrderNum))) {
											this.$message.warning({message: '请输入正确订购数量限制'})
											return
										} 
									}
									
								}
							}
							
						}
						let packageObjSelected = [];
						this.packageObjRels.forEach(item => {
							let obj = {
								applyRegionId: item.applyRegionId,
								createDate: item.createDate,
								createStaff: item.createStaff,
								effDate: item.effDate ? item.effDate : '',
								expDate: item.expDate ? item.expDate : '',
								level: item.level ? item.level : '',
								mainObjFlag: item.mainObjFlag ? item.mainObjFlag: '',
								name: item.name,
								nameGrp: item.nameGrp,
								number: item.number,
								objId: item.objId,
								objType: item.objType,	
								relType: item.relType,
								offerGrpOption: item.offerGrpOption ? item.offerGrpOption : '',
								offerOrderNum: item.offerOrderNum,
								offerPackageId: item.offerPackageId ? item.offerPackageId: this.packageObj.offerPackageId,
								parPkgObjRelId: -1,
								pkgObjRelId: item.pkgObjRelId ? item.pkgObjRelId: '',
								statusCd: '1200',
								packageObjRels: item.packageObjRels ? item.packageObjRels : []
							}
							packageObjSelected.push(obj)
						})
						
						// 新增
						if (!this.componentData.offerPackageId) {
								this.$axios.post(this.$api.QueryOfferPackageList, {
								regionId: this.packageObj.regionId,
								offerPackageId: this.packageObj.offerPackageId,
								offerPackageName: this.packageObj.offerPackageName,
								manageGrade: this.packageObj.manageGrade,
								effDate: this.packageObj.effDate ? new Date(this.packageObj.effDate) : '',
								expDate: this.packageObj.expDate ? new Date(this.packageObj.expDate) : '',
								offerPkgDesc: this.packageObj.offerPkgDesc,
								statusCd: '1200',
								createStaff: this.$user.getInfo().id,
								updateStaff: this.$user.getInfo().id,
								packageObjRels: packageObjSelected
							}).then(res => {
								if (res.data.success) {
									this.$message.success({message : '添加成功'});
									this.$emit('componentView', 'list')
								}
							}).catch(error => {
								this.$message.error({message : '礼包名称不可重复'});
							})
						} else {
							this.$axios.put(this.$api.QueryOfferPackageList.format({offerPackageId: this.componentData.offerPackageId}), {
								offerPackageId: this.componentData.offerPackageId,
								regionId: this.packageObj.regionId,
								offerPackageId: this.packageObj.offerPackageId,
								createDate: this.packageObj.createDate,
								offerPackageName: this.packageObj.offerPackageName,
								manageGrade: this.packageObj.manageGrade,
								offerOrderNum: this.packageObj.offerOrderNum,
								offerPackageNbr: this.packageObj.offerPackageNbr,
								effDate: this.packageObj.effDate ? new Date(this.packageObj.effDate) : '',
								expDate: this.packageObj.expDate ? new Date(this.packageObj.expDate) : '',
								offerPkgDesc: this.packageObj.offerPkgDesc,
								statusCd: '1200',
								publishId: this.packageObj.publishId,
								remark: this.packageObj.remark,
								sceneType: this.packageObj.sceneType,
								statusCdDate: this.packageObj.statusCdDate,
								updateDate: this.packageObj.updateDate,
								version: this.packageObj.version,
								createStaff: this.$user.getInfo().id,
								updateStaff: this.$user.getInfo().id,
								packageObjRels: packageObjSelected,
							}).then(res => {
								if (res.data.success) {
									this.$message.success({ message : "修改成功!" });
									this.$emit('componentView', 'list')
								}
							}).catch(error => {
								this.$message.error({message : error.response.data.msg});
							})
						}
						
					}
				})
			},
			//返回
			globalback(){
				this.$emit('componentView', 'list') 
			},

			tipConfirm() {
				if (this.tipInfo.msg ==  `确定删除吗?`) {
					if (this.componentData.offerPackageId) {
						if (this.pkgObjRelId) {
							this.$axios.delete(this.$api.DelPkgObjRel.format({pkgObjRelId: this.pkgObjRelId}), {
								params: {
									pkgObjRelId: this.pkgObjRelId,
									updateStaff: this.$user.getInfo().id,
								}
							}).then(res => {
								if (res.data.success) {
									this.$message.success({message: '删除成功!'});
									this.getDetailData();
								} else {
									this.$message.error({ message : '删除失败'});
								}
								this.$refs.tip.hide();
							}).catch(error => {
								this.$message.error({message: '删除失败!'});
							})
						} else {
							this.packageObjRels.splice(this.tipIndex, 1);
							this.$message.success({message: '删除成功!'});
							this.$refs.tip.hide();
						}
					} else {
						this.packageObjRels.splice(this.tipIndex, 1);
						this.$message.success({message: '删除成功!'});
						this.$refs.tip.hide();
					}
					
				}
			},


			showChildClick(index) {
				if(this.goodsId === index) {
                    this.goodsId = '';
                } else {
                    this.goodsId = index;
                }
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.add-info {
		width: 100%;
		height: 100%;
		padding-bottom: 50px;
		.main-part {
			.search {
				width: 300px;
				margin: 5px 0 5px 10px;
			}
			.app__table__inner {
				padding: 0 20px 0 20px;
				.no-wrap {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.offer-selected {
			min-height: 50px;
			line-height: 25px;
			border-top: 1px solid #d5d5d5;
			padding: 5px 5px 10px 20px;
			span {
				color: $mainColor;
			}
		}
		.main-list {
			input {
				width: 50%;
			}
		}
		
	}
	.basic-part {
		margin-bottom: 50px;
		margin-top: 20px;
		.basic-info {
			padding: 0 20px;
			.configuration-tip{
				height: 15px;
				line-height: 15px;
				margin-right: 15px;
				margin-bottom: 20px;
			}
		}
		.main {
			padding: 10px;
			.access-textarea {
				width: 45%;
				height: 60px;
				padding: 5px;
				outline: 0;
				border: 1px solid #d8dcdf;
				border-radius: 4px;
				resize: none;
				color: #7a7a86;
			}
			.app__btn-add {
				background-color: $mainColor;
				color: #fff;
				background-image: url(./images/add_hover.png);
				background-repeat: no-repeat;
				background-position: 10px;
				border: 1px solid #5c9cf3;
			}
		}
	}

	// 子列表
	.tab-tbody {
		.form-item {
			padding-left: 0 !important;
			
		}
		.grpOptionInput {
			.validate /deep/ input{
				border-color: red;
			}
		}
		// 商品组选项
		.offerGrpOption {
				display: inline;
				margin-left: 5px;
				/deep/ input {
					width: 50% ;
			}
		}
		.col {
			button {
				border: none;
				outline: none;
				font-size: 12px;
				color: $mainColor;
				background-color: transparent;
				cursor: pointer;
			}
		}
		//子集列表
		.child-list {
			background-color: white;
			padding-left: 0;
			.v-t-title {
				border: none;
			}
			.borderline {
				width: 10px;
				height: 40px;
				border-bottom: 1px dashed #CCCCCC;
				border-left: 1px dashed #CCCCCC;
				float: left;
				margin-top: -20px;
				margin-left: 5px;
			}
			.no-wrap {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		/*展开*/
		.col-show {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			i {
				display: inline-block;
				width: 10px;
				height: 10px;
				background: url("./images/bgsq.png") no-repeat;
				background-size: cover;
				cursor: pointer;
			}
			i.show2 {
				background: url("./images/bgsq.png") no-repeat;
				background-size: cover;
			}
		}
		/*收起*/
		.col-hide {
			font-size: 14px;
			color: $mainColor;
			i {
				display: inline-block;
				width: 14px;
				height: 14px;
				background: url("./images/hide-icon.png") no-repeat;
				background-size: cover;
				cursor: pointer;
			}
		}
	}

	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		box-shadow: 0 -2px 0 #f1f5fa;
		z-index: 99;
		.btn-page-box {
			width: 100%;
			height: 50px;
			padding: 10px 20px;
			font-size: 12px;
			text-align: right;
			background: #ffffff;

			.app__btn-confirm{
				margin-left: 10px;
			}
		}
	}
</style>
