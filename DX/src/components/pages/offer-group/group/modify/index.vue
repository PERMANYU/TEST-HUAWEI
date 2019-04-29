<template>
	<div class="info">
		<Scroll class="basic-info" :isShowRight="true" ref="basicScroll">
			<div class="main-box">
				<div class="a-v-title1">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>基本信息</span>
					</div>
				</div>
                <Row>
                    <Form labelWidth="120px" labelAlign="left">
                        <Col :span="12">
                            <FormItem labelText="销售品组名称：" :requiredIcon="true" :errorMessage="errors.first('name')">
                                <Input v-validate="'required'"  name="name" v-model.trim="basicData.name" data-vv-as="销售品组名称"></Input>
                            </FormItem>
                        </Col>
                        <Col :span="9" :offset="3" >
                            <FormItem labelText="销售品组内成员关系：" :requiredIcon="true" :errorMessage="errors.first('offerGroupType')" class="offerGroupType">
						        <Select v-validate="'required'" :data="offerGroupTypeArray" name="offerGroupType" data-vv-as="销售品组内成员关系：" v-model="basicData.offerGroupType"></Select>
					        </FormItem>
                        </Col>
                        <Col :span="24">
                            <FormItem  labelText="描述：">
                                <Input type="textarea" name="requirementDesc" v-model.trim="basicData.Desc" data-vv-as="需求单描述"
                                    maxlength="300"></Input>
                            </FormItem>
                        </Col>
                        <Col :span="24">
                            <FormItem labelText="选择添加方式:">
								<span>{{basicData.SelectTypeName}}</span>
                            </FormItem>
                        </Col>
                        <Col :span="6" v-show="show.showCatalog">
                            <FormItem labelText="选择目录：" :requiredIcon="true" :errorMessage="errors.first('catalogItemName')">
							    <Input v-validate="{required: isRuquired}" name="catalogItemName" data-vv-as="目录" v-model="basicData.offerCatalogLocation.loc" @click.native="catalogClick()" ref="catalogItemNameRef"></Input>
						    </FormItem>
                        </Col>
                    </Form>
                </Row>
                <div class="a-v-title1">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>配置销售品组</span>
					</div>
                    <Col class="col-btn" :span="2" v-show="show.showAdd">
					    <div class="app__btn app__btn-add" @click="addGrpOfferMembers()">添加</div>
				    </Col>
				</div>
                <div>
                    <Col :span="5">
					    <Search placeholder="请输入销售品内部名称" @search="mSearch"></Search>
				    </Col>
                </div>
                <div class="main-table">
                    <div class="main" v-if="!show.grpTypeFlag" >
                        <Scroll class="app__table app__table__inner" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title" ref="listScroll">
                            <Row class="m-title app__table-thead  app__table__inner ">
								<Col :span="8">销售品内部名称</Col>
								<Col :span="6">内部编码</Col>
								<Col :span="6">销售品类型</Col>
								<Col :span="4">操作</Col>
							</Row>
                            <Row class="m-item app__table-item table-data" v-if="offerGroupMemberList.length>0" v-for="(offerGroupMemberItem,offerGroupMemberIndex) in offerGroupMemberList" :key="'offerGroupMember' + offerGroupMemberIndex">
                                <Col :span="8" class="goods-name" :title="offerGroupMemberItem.offerSysName"> {{offerGroupMemberItem.offerSysName}}</Col>
                                <Col :span="6">{{offerGroupMemberItem.innerNbr}}</Col>
								<Col :span="6">{{getOfferType(offerGroupMemberItem.offerType)}}</Col>
                                <Col :span="4">
									<span class="iconfont icon-shanchu" @click="delMember(offerGroupMemberItem)"></span>
                                </Col>
                            </Row>
                            <Row v-if="!offerGroupMemberList.length" class="app__data-none">
                                <Col :span="24"><span>当前无数据!</span></Col>
                            </Row>
                        </Scroll>
		            </div>
					<div class="main"  v-if="show.grpTypeFlag" >
                        <Scroll class="app__table app__table__inner" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title" ref="listScroll">
                            <Row class="m-title app__table-thead  app__table__inner ">
								<Col :span="8">销售品内部名称</Col>
								<Col :span="8">内部编码</Col>
								<Col :span="8">销售品类型</Col>
							</Row>
                            <Row class="m-item app__table-item table-data" v-if="offerGroupMemberList.length>0" v-for="(offerGroupMemberItem,offerGroupMemberIndex) in offerGroupMemberList" :key="'offerGroupMember' + offerGroupMemberIndex">
                                <Col :span="8" class="goods-name" :title="offerGroupMemberItem.offerSysName"> {{offerGroupMemberItem.offerSysName}}</Col>
                                <Col :span="8">{{offerGroupMemberItem.innerNbr}}</Col>
								<Col :span="8">{{getOfferType(offerGroupMemberItem.offerType)}}</Col>
                            </Row>
                            <Row v-if="!offerGroupMemberList.length" class="app__data-none">
                                <Col :span="24"><span>当前无数据!</span></Col>
                            </Row>
                        </Scroll>
		            </div>
		            <div class="pagefooter">
			            <Pagination :pageIndex="mPageInfo.pageIndex" :pageSize="mPageInfo.pageSize" :rowCount="mPageInfo.rowCount" :perPages=5 @change="mPageChange">
			            </Pagination>
		            </div>
	            </div>

                 <div class="a-v-title1">
					<div class="app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span>关联组关系</span>
					</div>
                    <Col class="col-btn" :span="2">
					    <div class="app__btn app__btn-add" @click="addOffeGrpRelas()">添加</div>
				    </Col>
				</div>
                <div>
                    <Col :span="5">
					    <Search placeholder="请输入销售品组名称" @search="rSearch"></Search>
				    </Col>
                </div>
                <div class="main-table">
                    <div class="main">
                        <Scroll class="app__table app__table__inner" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title" ref="listScroll">
                            <Row class="m-title app__table-thead  app__table__inner ">
								<Col :span="3">Z销售品组名称</Col>
								<Col :span="3">Z销售品组编码</Col>
								<Col :span="2">关系类型</Col>
								<Col :span="3">A销售品组名称</Col>
                                <Col :span="3">A销售品组编码</Col>
								<Col :span="1">最大值</Col>
								<Col :span="1">最小值</Col>
								<Col :span="3">生效时间</Col>
                                <Col :span="3">失效时间</Col>
								<Col :span="2">操作</Col>
							</Row>
                            <Row class="m-item app__table-item table-data"  v-if="offerGroupRelList.length>0" v-for="(offerGroupRelItem,offerGroupRelIndex) in offerGroupRelList" :key="'offerGroupRelList' + offerGroupRelIndex">
                                <Col :span="3" class="goods-name" :title="offerGroupRelItem.zOfferGrpName">{{offerGroupRelItem.zOfferGrpName}}</Col>
								<Col :span="3">{{offerGroupRelItem.zOfferGrpNbr}}</Col>
                                <Col :span="2">{{getRelType(offerGroupRelItem.relType)}}</Col>
								<Col :span="3" class="goods-name" :title="offerGroupRelItem.aOfferGrpName">{{offerGroupRelItem.aOfferGrpName}}</Col>
                                <Col :span="3">{{offerGroupRelItem.aOfferGrpNbr}}</Col>
								<Col :span="1">{{offerGroupRelItem.maxNum}}</Col>
                                <Col :span="1">{{offerGroupRelItem.minNum}}</Col>
                                <Col :span="3">{{offerGroupRelItem.effDate | date}}</Col>
                                <Col :span="3">{{offerGroupRelItem.expDate | date}}</Col>
                                <Col :span="2">
									<span class="iconfont icon-xiugai" @click="modifyRela(offerGroupRelItem)"></span>
									<span class="iconfont icon-shanchu" @click="delRela(offerGroupRelItem)"></span>
                                </Col>
                            </Row>
                            <Row v-if="!offerGroupRelList.length" class="app__data-none">
                                <Col :span="24"><span>当前无数据!</span></Col>
                            </Row>
                        </Scroll>
		            </div>
                    <div class="pagefooter">
			            <Pagination :pageIndex="rPageInfo.pageIndex" :pageSize="rPageInfo.pageSize" :rowCount="rPageInfo.rowCount" :perPages=5 @change="rPageChange">
			            </Pagination>
		            </div>
                </div>		
			</div>
		</Scroll>

		<div class="footer">
			<span class="app__btn app__btn-confirm" @click="subClick()">保存</span>
			<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
		</div>
        <Dialog dialogTitle="销售品目录位置" ref="catalogItemDialog" @confirm="catalogItemDialogConfirm">
			<Scroll :isShowRight="true" ref="catalogItemTree">
				<Tree :folder="treeItem" :keys="catalogItemTreeKey" v-for="(treeItem,treeIndex) in catalogItemTree" :key="'tree'+treeIndex" v-model="catalogItemTreeModel" @plugClick="catalogItemTreePlugClick()" :selLevel="9999" />
			</Scroll>
		</Dialog>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加销售品组成员" ref="addGrpOfferMembers" @confirm="addGrpOfferMembersConfirm">
			<Scroll class="scroll" :isShowRight="true">
				<div class="dialog-main">
					<div class="search">
						<Search placeholder="请输入销售品内部名称" @search="oSearch"></Search>
					</div>
					<div class="app__table__inner">
						<Row class="app__table-thead">
							<Col :span="8">销售品内部名称</Col>
							<Col :span="8">内部编码</Col>
							<Col :span="8">操作</Col>
						</Row>
						<Row :class="['m-item app__table-item']" v-for="(item,index) in offerPage" :key="index">
							<Col :span="8" class="goods-name" :title="item.offerSysName">{{item.offerSysName}}</Col>
							<Col :span="8">{{item.innerNbr}}</Col>
							<Col :span="8">
								<span v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="choseClick(item)"></span>
								<span v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang" @click="nChoseClick(item)"></span>
							</Col>
						</Row>
						<Row v-if="!offerPage.length" class="app__data-none">
                            <Col :span="24"><span>当前无数据!</span></Col>
                        </Row>
					</div>
					<Pagination :pageIndex="oPageInfo.pageIndex" :pageSize="oPageInfo.pageSize" :rowCount="oPageInfo.rowCount" :perPages=5 @change="oPageChange" :isCenter="true">
					</Pagination>
					<span class="y-span" v-if="offerPageSelected.length>0">已选销售品</span>
					<div class="app__table__inner" v-if="offerPageSelected.length>0">
						<Row class="app__table-thead">
							<Col :span="8">销售品内部名称</Col>
							<Col :span="8">内部编码</Col>
							<Col :span="8">操作</Col>
						</Row>
						<Row :class="['m-item app__table-item']" v-for="(item,index) in delmkt(offerPageSelected)" :key="index">
							<Col :span="8" class="goods-name" :title="item.offerSysName">{{item.offerSysName}}</Col>
							<Col :span="8">{{item.innerNbr}}</Col>
							<Col :span="3">
								<span class="iconfont icon-shanchu" @click="deleteClick(item)"></span>
							</Col>
						</Row>
					</div>
				</div>
			</Scroll>
		</Dialog>
		<Dialog :dialogSize="dialogSizeRel" class="h-dialog" dialogTitle="添加销售品组关联组关系" ref="addOffeGrpRelas" @confirm="addOffeGrpRelasConfirm">
			<Scroll class="scroll" :isShowRight="true">
				<div class="dialog-main">
					<div class="search">
						<Search placeholder="请输入销售品组名称" @search="gSearch"></Search>
					</div>
					<div class="app__table__inner">
						<Row class="app__table-thead">
							<Col :span="8">销售品组名称</Col>
							<Col :span="8">销售品组编码</Col>
							<Col :span="8">操作</Col>
						</Row>
						<Row :class="['m-item app__table-item']" v-for="(item,index) in offerGrpPage" :key="index">
							<Col :span="8" class="goods-name" :title="item.offerGrpName">{{item.offerGrpName}}</Col>
							<Col :span="8">{{item.offerGrpNbr}}</Col>
							<Col :span="8">
							<span v-if="!selectGroupMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="addGrpPageClick(item)"></span>
							<span v-if="selectGroupMkt(item)" class="iconfont icon-xuanzhong-fang" @click="deleteGrpPageClick(item)"></span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="gPageInfo.pageIndex" :pageSize="gPageInfo.pageSize" :rowCount="gPageInfo.rowCount" :perPages=5 @change="gPageChange" :isCenter="true">
					</Pagination>
					<span class="y-span" v-if="offerGrpPageSelected.length>0">已选销售品组</span>
					<div class="app__table__inner" v-if="offerGrpPageSelected.length>0">
						<Row class="app__table-thead">
							<Col :span="4">当前销售品组名称</Col>
							<Col :span="3">关联关系</Col>
							<Col :span="2">关联方向</Col>
							<Col :span="4">销售品组名称</Col>
							<Col :span="2">最大值</Col>
							<Col :span="2">最小值</Col>
							<Col :span="3">生效时间</Col>
							<Col :span="3">失效时间</Col>
							<Col :span="1">操作</Col>
						</Row>
						<Row :class="['m-item app__table-item']" v-for="(item,index) in delmkt(offerGrpPageSelected)" :key="index">
							<Col :span="4" class="goods-name" :title="item.aOfferGrpName">{{item.aOfferGrpName}}</Col>
							<Col :span="3" :class="{validate:!item.relType}">
								<Select v-validate="'required'" :data="offerGroupRelArray" name="relType" data-vv-as="关联关系" v-model="item.relType"></Select>			
							</Col>
							<Col :span="2" :class="{validate:!item.relDirect}">
								<Select v-validate="'required'" :data="relDirectArray" name="relDirect" data-vv-as="关联方向" v-model="item.relDirect"></Select>			
							</Col>
							<Col :span="4" class="goods-name" :title="item.zOfferGrpName">{{item.zOfferGrpName}}</Col>
							<Col :span="2" :class="{validate:!item.maxNum}">
							<Input v-model="item.maxNum" number></Input>
							</Col>
							<Col :span="2" :class="{validate:!item.minNum}">
							<Input v-model="item.minNum" number></Input>
							</Col>
							<Col :span="3" :class="{validate:!item.effDate}">
							<DatePicker v-model="item.effDate"></DatePicker>
							</Col>
							<Col :span="3" :class="{validate:!item.expDate}">
							<DatePicker v-model="item.expDate"></DatePicker>
							</Col>
							<Col :span="1">
								<span class="iconfont icon-shanchu" @click="deleteOffeGrpRelas(item)"></span>
							</Col>
						</Row>
					</div>
				</div>
			</Scroll>
		</Dialog>
		
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="修改关联关系" ref="modifyRela" @confirm="modifyRelaConfirm">
			<Scroll class="scroll modify-info" :isShowRight="true">
				<div class="dialog-main">
					<Form labelWidth="120px" labelAlign="left">
						<Row>
							<Col :span="10">
								<FormItem labelText="当前销售品组名称：">
									{{(offerGprRelainfo.aId == this.componentData.offerGrpId) ? offerGprRelainfo.aOfferGrpName : offerGprRelainfo.zOfferGrpName}}
								</FormItem>
							</Col>
							<Col :span="10" :offset="4">
								<FormItem labelText="当前销售品组编码：">
									{{(offerGprRelainfo.aId == this.componentData.offerGrpId) ? offerGprRelainfo.aOfferGrpNbr : offerGprRelainfo.zOfferGrpNbr}}
								</FormItem>
							</Col>

							<Col :span="10">
								<FormItem labelText="关联销售品组名称：">
									{{(offerGprRelainfo.aId == this.componentData.offerGrpId) ? offerGprRelainfo.zOfferGrpName : offerGprRelainfo.aOfferGrpName}}
								</FormItem>
							</Col>
							<Col :span="10" :offset="4">
								<FormItem labelText="关联销售品组编码：">
									{{(offerGprRelainfo.aId == this.componentData.offerGrpId) ? offerGprRelainfo.zOfferGrpNbr : offerGprRelainfo.aOfferGrpNbr}}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" >
								<FormItem labelText="关联关系：" :requiredIcon="true" :class="{validate:!offerGprRelainfo.relType}">
									<Select :data="offerGroupRelArray" name="relType" data-vv-as="关联关系" v-model="offerGprRelainfo.relType"></Select>
								</FormItem>
							</Col>
							<Col :span="10" :offset="4"  >
								<FormItem labelText="关联方向：" :requiredIcon="true"  :class="{validate:!modifyData.relDirect}">
									<Select disabled :data="relDirectArray" name="relDirect" data-vv-as="关联关系" v-model="modifyData.relDirect"></Select>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10">
								<FormItem labelText="最大值：" :class="{validate:!offerGprRelainfo.maxNum}" :requiredIcon="true" >
									<Input v-model="offerGprRelainfo.maxNum" number></Input>
								</FormItem>
							</Col>
							<Col :span="10" :offset="4">
								<FormItem labelText="最小值：" :class="{validate:!offerGprRelainfo.minNum}" :requiredIcon="true" >
									<Input v-model="offerGprRelainfo.minNum" number></Input>
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col :span="10" >
								<FormItem labelText="生效时间：" :class="{validate:!offerGprRelainfo.effDate}" :requiredIcon="true" >
									<DatePicker v-model="offerGprRelainfo.effDate"></DatePicker>
								</FormItem>
							</Col>
							<Col :span="10" :offset="4" >
								<FormItem labelText="失效时间：" :class="{validate:!offerGprRelainfo.expDate}" :requiredIcon="true">
									<DatePicker v-model="offerGprRelainfo.expDate"></DatePicker>
								</FormItem>
							</Col>
						</Row>
					</Form>
				</div>
			</Scroll>
		</Dialog>
			
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
				dialogSize: {
					size: 80,
					min: 700,
					max: 900
				},
				dialogSizeRel: {
					size: 80,
					min: 700,
					max: 1200
				},
                mPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				mPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
                },
                rPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				oPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				gPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				basicData: {
                    name: "",
                    Desc: "",
                    offerGroupType: "",
					SelectType: "",
                    offerCatalogLocation: {
                        loc:""
					},
					offerGroupRelType: "",
					SelectTypeName: ""
				},
				modifyData:{
					relDirect: '',
				},
                offerGroupTypeArray: [{
					label: '互斥组',
					value: '1000'
				}, {
					label: '续约组',
					value: '1100'
				}, {
					label: '依赖组',
					value: '1200'
				}, {
					label: '普通组',
					value: '1300'
                }],
				offerGroupRelArray:[{
					value: '140000',
					label: '松融合'
				}, {
					value: '150000',
					label: '关联包'
				}, {
					value: '160000',
					label: '要求'
				}, {
					value: '170000',
					label: '可选'
				}, {
					value: '200000',
					label: '互斥'
				}, {
					value: '600000',
					label: '接续'
				}],
				relDirectArray: [{
					label: '正向',
					value: '1'
				},{
					label: '反向',
					value: '0'
				}],
				isRuquired: true,
				offerGroupRelList: [],
				offerGroupMemberList: [],
				offerPage: [],
				offerPageSelected: [],
				offerGrpPageSelected: [],
				offerGrpPage: [],
				delFlag: 1, //1:删除成员  2：删除关系
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				show: {
					showCatalog: false,
					showAdd: false,
					grpTypeFlag: false
                },
                catalogItemTree: [],
				catalogItemTreeKey: [{
					key: 'catalogItemName',
					span: 24
				}],
                catalogItemTreeModel: '',
                memberObj: {
					offerGrpId: this.componentData.offerGrpId,
					offerName: '',
					offerSysName: '',
                    innerNbr: '',
					grpType: this.componentData.grpType
                },
                relObj: {
					offerGrpId: this.componentData.offerGrpId,
					offerGrpName: '',
                    offerGrpNbr: '',
				},
				offerObj:{
					offerSysName: '',
				},
				offerGrpObj: {
					offerGrpNbr: '',
					offerGrpName: ''
				},
				offerGrpMembers: [],
				offerGrpRelas: [],
				offerGprRelainfo: [],
				offerPageFlag: false,
				offerGrpPageFlag: false,
				offerCatalogChageFlag: false

			}
		},
		mounted(){
            if (this.componentData.offerGrpId){	
                this.initOfferGrpData();
                this.mPageChange(1);
                this.rPageChange(1);
			}
		},
		watch: {
    		basicData:function(newVal,oldVal){
				if(newVal.SelectType == '1100'){
					this.isRuquired = true;
				}else{
					this.isRuquired = false;
				}
			}
    	},
		methods: {
			//初始化销售品组基本信息
            initOfferGrpData(){ 
                this.basicData.name = this.componentData.offerGrpName;
                this.basicData.Desc = this.componentData.offerGrpDesc;
                this.basicData.offerGroupType = this.componentData.grpRelType;
				this.basicData.SelectType = this.componentData.grpType;
				this.basicData.offerCatalogLocation.loc = this.componentData.catalogItemName;
                if(this.basicData.SelectType == '1100'){
					this.show.showCatalog = true;
					this.show.showAdd = false;
					this.isRuquired = true;
					this.show.grpTypeFlag = true;
					this.basicData.SelectTypeName = "通过选择目录添加";
				}
				if(this.basicData.SelectType == '1000'){
					this.show.showCatalog = false;
					this.show.showAdd = true;
					this.isRuquired = false;
					this.show.grpTypeFlag = false;
					this.basicData.SelectTypeName = "通过选择销售品添加";
                }
            }, 
            catalogClick() {
                this.$axios.get(this.$api.Catalog+'/10102',{
                    params:{

                    }
                }).then(res => {
                    if (res.data.success) {
                        this.catalogItemTree = res.data.catalogDetail.catalogItems||[];
                        this.$nextTick(() => {
							this.$refs.catalogItemDialog.show();
						})

                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },
            catalogItemTreePlugClick() {
				this.$refs.catalogItemDialog.initHeight();
				this.$refs.catalogItemTree.initScroll();
			},
			catalogItemDialogConfirm() {
				this.basicData.offerCatalogLocation.loc = this.catalogItemTreeModel.catalogItemName;
				this.basicData.offerCatalogLocation.catalogItemId = this.catalogItemTreeModel.catalogItemId;
				this.mPageInfo.pageIndex = 1;
				this.changeCatalogOfferData();
				this.$refs.catalogItemDialog.hide();
				this.$refs.catalogItemNameRef.focus();
				setTimeout(() => {
					this.$refs.catalogItemNameRef.blur();
				}, 100)
			},
			
			changeCatalogOfferData(){       //切换目录后修改销售品成员数据 
				this.$axios.get(this.$api.OfferGetList,{
                    	params: {
							catalogItemId:this.basicData.offerCatalogLocation.catalogItemId,
							// offerName: this.memberObj.offerName.trim(),
							offerSysName: this.memberObj.offerSysName.trim(),
							page: this.mPageInfo.pageIndex,
							limit: this.mPageInfo.pageSize,
							statusCd: '1000'
                    	}
					}).then(res => {
						if(res.data.success === true){
							this.offerGroupMemberList = res.data.offerPage.content||[];
							this.mPageInfo.rowCount = res.data.offerPage.total;	
							this.offerCatalogChageFlag = true;     
							this.$nextTick(() => {
								this.$refs.listScroll.init();
							})
						}else{
							this.$message.error({ "message": "查询失败！" })
						}
					}).catch( error => {
						this.$message.error({ "message": "服务器异常！" })
					})

			},

			initOfferGrpMemberData(){         //初始销售品成员数据 
				if(this.basicData.SelectType == '1100'){
					this.$axios.get(this.$api.OfferGroupMember,{
                    	params: {
							offerGrpId: this.memberObj.offerGrpId,
							// offerName: this.memberObj.offerName.trim(),
							offerSysName: this.memberObj.offerSysName.trim(),
							innerNbr:this.memberObj.innerNbr,
							grpType:this.memberObj.grpType,
							page: this.mPageInfo.pageIndex,
							limit: this.mPageInfo.pageSize
                    	}
					}).then(res => {
						if(res.data.success === true){
							this.offerGroupMemberList = res.data.offerCatalogPage.content||[];
							this.mPageInfo.rowCount = res.data.offerCatalogPage.total;	  
							this.offerCatalogChageFlag = false;   
							this.$nextTick(() => {
								this.$refs.listScroll.init();
							})
						}else{
							this.$message.error({ "message": "查询失败！" })
						}
					}).catch( error => {
						this.$message.error({ "message": "服务器异常！" })
					})
				} 
				if(this.basicData.SelectType == '1000'){          
					this.$axios.get(this.$api.OfferGroupMember,{
						params: {
							offerGrpId: this.memberObj.offerGrpId,
							// offerName: this.memberObj.offerName.trim(),
							offerSysName: this.memberObj.offerSysName.trim(),
							innerNbr:this.memberObj.innerNbr,
							grpType:this.memberObj.grpType,
							page: this.mPageInfo.pageIndex,
							limit: this.mPageInfo.pageSize
						}
					}).then(res => {
						if(res.data.success === true){
							this.offerGroupMemberList = res.data.offerGrpMemberPage.content||[];
							this.mPageInfo.rowCount = res.data.offerGrpMemberPage.total;  
							this.offerCatalogChageFlag = false;             				
							this.$nextTick(() => {
								this.$refs.listScroll.init();
							})
						}else{
							this.$message.error({ "message": "查询失败！" })
						}
					}).catch( error => {
						this.$message.error({ "message": "服务器异常！" })
					})
				}
            },

			initOfferGrpRelData(){         //初始销售品组关系数据      
				this.$axios.get(this.$api.OfferGroupRel,{
                    params: {
                        offerGrpId: this.relObj.offerGrpId,
					    offerGrpName: this.relObj.offerGrpName.trim(),
                        offerGrpNbr: this.relObj.offerGrpNbr,
                        page: this.rPageInfo.pageIndex,
						limit: this.rPageInfo.pageSize
                    }
                }).then(res => {
					if(res.data.success === true){
                        this.offerGroupRelList = res.data.ordOfferGrpPage.content||[];
						this.rPageInfo.rowCount = res.data.ordOfferGrpPage.total;
						this.$nextTick(() => {
							this.$refs.listScroll.init();
						})
					}else{
						this.$message.error({ "message": "查询失败！" })
					}
				}).catch( error => {
					this.$message.error({ "message": "服务器异常！" })
				})
            },

            getRelType(type) { 	//区分关系类型
				switch(type) {
					case '140000':
						return '松融合';
					case '150000':
						return '关联包';
					case '160000':
						return '要求';
					case '170000':
						return '可选';
					case '200000':
						return '互斥';
					case '600000':
						return '接续';
					default:
						return "未知";
				}
			},
			getOfferType(type) { //区分销售品类型
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
					default:
						return "未知";
				}
			},

            mPageChange(page) {
				this.mPageInfo.pageIndex = page;
				if(this.offerCatalogChageFlag){
					this.changeCatalogOfferData();
				}				
				else{
					this.initOfferGrpMemberData();
				}
            },
            rPageChange(page) {
				this.rPageInfo.pageIndex = page;
				this.initOfferGrpRelData();
			},
			oPageChange(page){
				this.oPageInfo.pageIndex = page;
				this.offerPageFlag = true;
				this.addGrpOfferMembers();
			},
			gPageChange(page){
				this.gPageInfo.pageIndex = page;
				this.offerGrpPageFlag = true;
				this.addOffeGrpRelas();
			},
            globalback(){
               this.$emit('componentView', 'list') 
			},
			subClick(){
				this.$validator.validateAll().then((result) => {
					if(result) {
						this.$axios.put(this.$api.OfferGroupTask,{
							offerGrpId:this.componentData.offerGrpId,
							offerGrpName:this.basicData.name.trim(),
							grpRelType:this.basicData.offerGroupType,
							offerGrpDesc:this.basicData.Desc,
							offerGrpNbr:this.componentData.offerGrpNbr,
							createStaff:this.componentData.createStaff,
							updateStaff:this.$user.getInfo().id,
							updateDate:new Date(),
							statusCd:"1200",
							catalogItemId:this.catalogItemTreeModel.catalogItemId,
						}).then(res => {
							if(res.data.success) {
								this.$message.success({ message: '基本信息修改成功！' });
								this.$emit('componentView', 'list') 
							}else{
								this.$message.error({ message: '基本信息修改失败！' })
							}

						}).catch(error => {
							this.$message.error({ message: '基本信息修改失败！' })
						})
					}else{
						this.$message.error({ message: '基本信息表单验证失败！' })
					}
				})
				
			},
			itemDel(item) { //删除
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm() {   // 删除确认
				if(this.delFlag  == 1){
					let offerGrpMemberId = this.tipSelData.offerGrpMemberId;
					let offerGrpId = '200692923654';
					let staff = this.$user.getInfo().id;
					this.$axios.delete(this.$api.OfferGrpMemberTask,{
						params: {
							offerGrpMemberId: offerGrpMemberId,
							updateStaff: staff,
						}
					}).then(res => {
						if(res.data.success === true) {
							this.$message.success({ message: "删除成功！" });
							this.$refs.tip.hide();
							this.initOfferGrpMemberData();
						} else {
							this.$message.error({ message: "删除失败！" })
						}
					}).catch(error => {
						this.$message.error({ message: "删除失败！" })
					})
				}
				if(this.delFlag  == 2){
					let offerGrpRelId = this.tipSelData.offerGrpRelId;
					let staff = this.$user.getInfo().id;
					let offerGrpId = '200692923654';
					this.$axios.delete(this.$api.OfferGrpRelaTask,{
						params: {
							offerGrpRelId: offerGrpRelId,
							updateStaff: staff,
						}
					}).then(res => {
						if(res.data.success === true) {
							this.$message.success({ message: "删除成功" });
							this.$refs.tip.hide();
							this.initOfferGrpRelData();
						} else {
							this.$message.error({ message: "删除失败！" })
						}
					}).catch(error => {
						this.$message.error({ message: "删除失败！" })
					})
				}
			},
			delMember(item){
				this.delFlag = 1;
				this.itemDel(item);
			},
			delRela(item){
				this.delFlag = 2;
				this.itemDel(item);
			},
			rSearch(val) {
				this.relObj.offerGrpName = val;
				this.rPageChange(1);
			},
			mSearch(val) {
				this.memberObj.offerSysName = val;
				this.mPageChange(1);
			},
			oSearch(val){
				this.offerObj.offerSysName = val;
				this.offerPageFlag = true;
				this.oPageChange(1);
			},
			gSearch(val){
				this.offerGrpObj.offerGrpName = val;
				this.offerGrpPageFlag = true;
				this.gPageChange(1);
			},

			 //添加销售品组成员
			addGrpOfferMembers(){    
				if(!this.offerPageFlag){
					this.offerPageSelected = [];
					for(let ele of this.offerGroupMemberList) {
						let temp = {
							offerName: ele.offerName,
							offerSysName: ele.offerSysName,
							innerNbr: ele.innerNbr,
							offerId: ele.offerId,
							offerType: ele.offerType,
							statusCd: ele.statusCd,
							offerGrpMemberId: ele.offerGrpMemberId
						}
						this.offerPageSelected.push(temp);
					}
				}				
				this.$refs.addGrpOfferMembers.show();
				this.$axios.get(this.$api.OfferGetList, {
					params: {
						limit: this.oPageInfo.pageSize,
						page: this.oPageInfo.pageIndex,
						offerSysName: this.offerObj.offerSysName.trim(),
						statusCd: '1000'
					}
				}).then(res => {
					if(res.data.success == true) {
						this.offerPage = res.data.offerPage.content;
						this.oPageInfo.rowCount = res.data.offerPage.total;
					} else {
						this.$message.error({ message: '查询失败！' });
					}
				}).catch(error => {
					this.$message.error({ message: '服务器异常！' })
				})
				this.offerPageFlag = false;
			},

			addGrpOfferMembersConfirm(){
				this.offerGrpMembers = [];
				for(var i = 0; i < this.offerPageSelected.length; i++) {
					if(!this.offerPageSelected[i].offerGrpMemberId && this.offerPageSelected[i].statusCd == '1100') {
						this.offerPageSelected.splice(i, 1);
					}
				}
				console.log(this.offerPageSelected)
				// return
				for(let ele of this.offerPageSelected){
					let Temp = {
						offerGrpId: this.componentData.offerGrpId,
						updateDate: new Date(),
						createDate: new Date(),
						createStaff: this.$user.getInfo().id,
						updateStaff: this.$user.getInfo().id,
						statusCd: ele.statusCd,
						offerId: ele.offerId,
						applyRegionId: "8100000",
						offerGrpMemberId: ele.offerGrpMemberId
					}
					this.offerGrpMembers.push(Temp);
				}
				for(var i = 0;i < this.offerGrpMembers.length; i++){
					if(!this.offerGrpMembers[i].offerGrpMemberId && this.offerGrpMembers[i].statusCd == '1100'){
						this.offerGrpMembers.splice(i,1);
					}
				}
				this.$axios.post(this.$api.OfferGrpMemberTask,
					 this.offerGrpMembers
				).then(res => {
					if(res.data.success == true) {
						this.$message.success({ message: '添加成功！' });
						this.$refs.addGrpOfferMembers.hide();
						this.initOfferGrpMemberData();
					} else {
						this.$message.error({ message: '添加失败！' });
					}
				}).catch(error => {
					this.$message.error({ message: '添加失败！' });
				})
			},

			//添加销售品组关联关系
			addOffeGrpRelas(){
				if(!this.offerGrpPageFlag){
					this.offerGrpPageSelected = [];
					for(let ele of this.offerGroupRelList) {
						if( ele.aId == this.componentData.offerGrpId){
							let temp = {
								aOfferGrpName: ele.aOfferGrpName,
								aOfferGrpNbr: ele.aOfferGrpNbr,
								aOfferGrpId: ele.aId,
								aGrpRelType: ele.aType,
								relType: ele.relType,
								zOfferGrpName: ele.zOfferGrpName,
								zOfferGrpNbr: ele.zOfferGrpNbr,
								zOfferGrpId: ele.zId,
								zGrpRelType: ele.zType,
								maxNum: ele.maxNum,
								minNum: ele.minNum,
								effDate: ele.effDate,
								expDate: ele.expDate,
								statusCd: ele.statusCd,
								relDirect: "0",
								offerGrpRelId: ele.offerGrpRelId
							}
							this.offerGrpPageSelected.push(temp);
						}
						if( ele.zId == this.componentData.offerGrpId){
							let temp = {
								aOfferGrpName: ele.zOfferGrpName,
								aOfferGrpNbr: ele.zOfferGrpNbr,
								aOfferGrpId: ele.zId,
								aGrpRelType: ele.zType,
								relType: ele.relType,
								zOfferGrpName: ele.aOfferGrpName,
								zOfferGrpNbr: ele.aOfferGrpNbr,
								zOfferGrpId: ele.aId,
								zGrpRelType: ele.aType,
								maxNum: ele.maxNum,
								minNum: ele.minNum,
								effDate: ele.effDate,
								expDate: ele.expDate,
								statusCd: ele.statusCd,
								relDirect: "1",
								offerGrpRelId: ele.offerGrpRelId
							}
							this.offerGrpPageSelected.push(temp);
						}		
					}
				}
				this.$refs.addOffeGrpRelas.show();
				this.$axios.get(this.$api.QureyOfferGroupList, {
					params: {
						offerGrpNbr: this.offerGrpObj.offerGrpNbr,
						offerGrpName: this.offerGrpObj.offerGrpName.trim(),   //去除关键字前后空格
						page: this.gPageInfo.pageIndex,
						limit: this.gPageInfo.pageSize,
					}
				}).then(res => {
					if(res.data.success === true) {
						this.offerGrpPage = res.data.ordOfferGrpPage.content||[];
						this.gPageInfo.rowCount = res.data.ordOfferGrpPage.total;
						this.$nextTick(() => {
							this.$refs.listScroll.init();
						})
					} else {
						this.$message.error({ "message": "查询失败！" })
					}
				}).catch(error => {
					this.$message.error({ "message": "服务器异常！" })
				})
				this.offerGrpPageFlag = false;
			},
			addOffeGrpRelasConfirm() {
				this.offerGrpRelas = [];
				for(var i = 0; i < this.offerGrpPageSelected.length; i++) {
					if(!this.offerGrpPageSelected[i].offerGrpRelId && this.offerGrpPageSelected[i].statusCd == '1100') {
						this.offerGrpPageSelected.splice(i, 1);
					}
				}
				for(let ele of this.offerGrpPageSelected){
					if(!ele.maxNum || !ele.minNum || !ele.effDate || !ele.expDate || !ele.relType || !ele.relDirect){
						this.$message.warning({message: '请输入红框值！'});
						this.isOk = false;
						return;
					}else{
						if(Number(ele.minNum)>Number(ele.maxNum)){
							this.$message.warning({message: '最小值必须小于最大值！'});
							this.isOk = false;
							return;
						}else{
							if(new Date(ele.effDate).getTime()>new Date(ele.expDate).getTime()){
								this.$message.warning({message: '生效时间必须小于失效时间！'});
								this.isOk = false;
								return;
							}else{
								this.isOk = true;
							}
						}
					}
				}
				if(this.isOk){
					for(let ele of this.offerGrpPageSelected) {
						if(ele.relDirect == '0'){
							let Temp = {
								aId: ele.aOfferGrpId,
								aType: ele.aGrpRelType,
								zId: ele.zOfferGrpId,
								zType: ele.zGrpRelType,
								relType: ele.relType,
								maxNum: ele.maxNum,
								minNum: ele.minNum,
								effDate: ele.effDate ? new Date(ele.effDate) : '',
								expDate: ele.expDate ? new Date(ele.expDate) : '',
								createStaff: this.$user.getInfo().id,
								updateStaff: this.$user.getInfo().id,
								statusCd: ele.statusCd,
								createDate: new Date(),
								updateDate: new Date(),
								statusDate: new Date(),
								applyRegionId: '831000',
								offerGrpRelId: ele.offerGrpRelId
							}
							this.offerGrpRelas.push(Temp);
						}
						if(ele.relDirect == '1'){
							let Temp = {
								aId: ele.zOfferGrpId,
								aType: ele.zGrpRelType,
								zId: ele.aOfferGrpId,
								zType: ele.aGrpRelType,
								relType: ele.relType,
								maxNum: ele.maxNum,
								minNum: ele.minNum,
								effDate: ele.effDate ? new Date(ele.effDate) : '',
								expDate: ele.expDate ? new Date(ele.expDate) : '',
								createStaff: this.$user.getInfo().id,
								updateStaff: this.$user.getInfo().id,
								statusCd: ele.statusCd,
								createDate: new Date(),
								updateDate: new Date(),
								statusDate: new Date(),
								applyRegionId: '831000',
								offerGrpRelId: ele.offerGrpRelId
							}
							this.offerGrpRelas.push(Temp);
						}
					}
					for(var i=0;i<this.offerGrpRelas.length;i++){
						if(!this.offerGrpRelas[i].offerGrpRelId && this.offerGrpRelas[i].statusCd == '1100'){
							this.offerGrpRelas.splice(i,1);
						}
					}
					this.$axios.post(this.$api.OfferGrpRelaTask,
						this.offerGrpRelas
					).then(res => {
						if(res.data.success == true) {
							this.$message.success({ message: '添加成功！' });
							this.$refs.addOffeGrpRelas.hide();
							this.initOfferGrpRelData();
						} else {
							this.$message.error({ message: '添加失败！' });
						}
					}).catch(error => {
						this.$message.error({ message: '添加失败！' });
					})
				}else{
					return;
				}
			},

			choseClick(item) {
				let offerPageTemp = {
					offerSysName: item.offerSysName,
					innerNbr: item.innerNbr,
					statusCd: item.statusCd,
					offerGrpMemberId: '',
					offerId:item.offerId
				}
				this.offerPageSelected.push(offerPageTemp);
			},
			nChoseClick(item) {
				for(var i=0;i<this.offerPageSelected.length;i++){
					if(this.offerPageSelected[i].offerId == item.offerId){
						this.offerPageSelected.splice(i,1);
					}
				}
			},
			deleteClick(item) {
				item.statusCd = '1100';
			},
			selectMkt(val){
				return this.offerPageSelected.filter( item => item.statusCd != '1100').find(item => item.offerId == val.offerId)
			},
			delmkt(arr) {
				return [...arr].filter(item => item.statusCd != '1100');
			},
			selectGroupMkt(val){
				return this.offerGrpPageSelected.filter( item => item.statusCd != '1100').find(item => item.zOfferGrpId == val.offerGrpId);
			},
			addGrpPageClick(item) {
				if(item.offerGrpId == this.componentData.offerGrpId){
					this.$message.warning({message: '不可选择当前销售品组！'});
				}else{
					let offerGrpPageTemp = {
						aOfferGrpName: this.componentData.offerGrpName,
						aOfferGrpNbr: this.componentData.offerGrpNbr,
						aOfferGrpId: this.componentData.offerGrpId,
						aGrpRelType: this.componentData.grpRelType,
						zOfferGrpName: item.offerGrpName,
						zOfferGrpNbr: item.offerGrpNbr,
						zOfferGrpId: item.offerGrpId,
						zGrpRelType: item.grpRelType,
						relType: '',
						relDirect: '',
						maxNum: '',
						minNum: '',
						effDate: '',
						expDate: "2050-12-31",
						statusCd: item.statusCd,
						offerGrpRelId: ''
					}
					this.offerGrpPageSelected.push(offerGrpPageTemp);
				}
				
			},
			deleteGrpPageClick(item) {
				for(var i=0;i<this.offerGrpPageSelected.length;i++){
					if(this.offerGrpPageSelected[i].zOfferGrpId == item.offerGrpId){
						this.offerGrpPageSelected.splice(i,1);
					}
				}
			},
			deleteOffeGrpRelas(item) {
				item.statusCd = '1100';
			},

			//修改单个销售品组关联关系
			modifyRela(item){
				this.$refs.modifyRela.show();
				this.offerGprRelainfo = Object.assign({}, item);
				if(item.aId == this.componentData.offerGrpId){
					this.modifyData.relDirect = "0";
				}
				if(item.zId == this.componentData.offerGrpId){
					this.modifyData.relDirect = "1";
				}
			},
			modifyRelaConfirm() {
				if(!this.offerGprRelainfo.maxNum || !this.offerGprRelainfo.minNum || !this.offerGprRelainfo.effDate || !this.offerGprRelainfo.expDate || !this.offerGprRelainfo.relType || !this.modifyData.relDirect){
					this.$message.warning({message: '请输入红框值！'});
					this.isOk = false;
				}else{
					if(Number(this.offerGprRelainfo.minNum)>Number(this.offerGprRelainfo.maxNum)){
						this.$message.warning({message: '最小值必须小于最大值！'});
						this.isOk = false;
					}else{
						if(new Date(this.offerGprRelainfo.effDate).getTime()>new Date(this.offerGprRelainfo.expDate).getTime()){
							this.$message.warning({message: '生效时间必须小于失效时间！'});
							this.isOk = false;
						}else{
							this.isOk = true;
						}
					}
				}
				if(this.isOk){
					this.$axios.put(this.$api.OfferGrpRelaTask,{
						offerGrpRelId: this.offerGprRelainfo.offerGrpRelId,
						relType: this.offerGprRelainfo.relType,
						effDate: new Date(this.offerGprRelainfo.effDate),
						expDate: new Date(this.offerGprRelainfo.expDate),
						createDate: this.componentData.createDate,
						updateDate: new Date(),
						updateStaff: this.$user.getInfo().id,
						maxNum: this.offerGprRelainfo.maxNum,
						minNum: this.offerGprRelainfo.minNum
					}).then(res => {
						if(res.data.success) {
							this.$message.success({ message: '关联关系修改成功！' });
							this.$refs.modifyRela.hide();
							this.initOfferGrpRelData();
						}else{
							this.$message.error({ message: '关联关系修改失败！' })
						}
					}).catch(error => {
						this.$message.error({ message: '关联关系修改失败！'})
					})
				}else{
					return;
				}
					
			}
		}	
	}
</script>

<style scoped lang="scss">
	.info {
		width: 100%;
		height: 100%;
		padding-bottom: 50px;
		.offerGroupType {
			padding-left: 130px !important;
			/deep/ .f-i-l {
				display: block;
				position: absolute;
				left: 0;
				min-height: 30px;
				line-height: 30px;
				padding-right: 5px;
				min-width: 135px;
			}
		}
	}

	
	.basic-info {
		height: 100%;
		padding: 0 20px;
		.main-box {
			padding-right: 20px;
        }
		.a-v-title1 {
			height: 50px;
			line-height: 50px;
			text-align: right;
			padding-right: 20px;
			.v-t-item {
				display: block;
				width: 80px;
				margin-left: 20px;
				text-align: center;
				color: $mainColor;
				float: left;
			}
			.app__title {
				float: left;
			}
		}
        .main-table {
		    height: 100%;
            padding-bottom: 50px;
            margin-top: 55px;
            .app__table__inner{
                font-weight: bold;
                border: 1px solid #eee;
            }
            .main {
                width: 100%;
                height: 100%;
                .table-data{
                    font-weight: normal;
					.icon-xiugai{
						color: $mainColor;
						cursor: pointer;
					}
					.icon-shanchu{
						color: $mainColor;
						padding-left: 10px;
						cursor: pointer;
					}	
                }
                .m-item {
                    .goods-name{
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
                
            }
            .pagefooter {
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
	
    }
    
	.footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 50px;
		line-height: 49px;
		padding: 0 20px;
		border-top: 1px solid #f5f5f5;
		text-align: right;
		background-color: #fff;
	}

	.dialog-main {
		padding: 20px;
		.search {
			width: 300px;
			margin-bottom: 20px;
		}
		.y-span {
			display: block;
			margin: 10px 0;
			font-weight: bold;
			font-size: 14px;
			color: #b6de8f;
		}
		.m-item {
			.goods-name{
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.icon-shanchu{
				color: $mainColor;
			}
			.icon-xuanzhong-fang{
				color: $mainColor;
			}
		}
		.validate /deep/ input{
			border-color: red;
		}
		span{
			cursor: pointer;
		}
	}

	.modify-info{
		padding: 0 20px;
	}
</style>