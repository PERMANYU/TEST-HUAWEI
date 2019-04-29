<template>
	<div class="sale">
		<Scroll class="scroll" :isShowRight="true">
            <div class="mod-title">
                <div>促销资源</div>
            </div>

            <div class="sel-box">
                <i class="title-icon"></i>
                <span class="y-span">待选营销资源列表</span>

                <!--选中的树-->
                <div class="tag-box" v-show="treeModel.mktResTypeName">
                    <span>{{treeModel.mktResTypeName}}</span>
                    <i @click="treeModel={}"></i>
                </div>

                <Search class="offer-sear" placeholder="请输入营销资源名称"
                        @search="searchResource" ref="searchVal">
                </Search>
            </div>

			<div class="a-v-table-wrapper">
                <!--左边树-->
				<div class="a-v-table-left">
                    <Scroll :isShowRight="true" ref="submitDialogScroll">
						<TreeSimple v-for="(item, index) in mktTree" :folder="item" :key="index"
							:keys="staffKeys" v-model="treeModel" @plugClick="submitDialogPlugClick()">
                        </TreeSimple>
                    </Scroll>
				</div>

                <!--右边列表-->
				<div class="a-v-table-right">
					<div class="app__table__inner">
						<Row class="app__table-thead">
							<Col :span="8">营销资源编码</Col>
							<Col :span="8">营销资源名称</Col>
							<Col :span="8">操作</Col>
						</Row>

						<Row :class="['app__table-item']" v-for="(item,index) in mktResList" :key="index">
							<Col :span="8">{{item.mktResNbr}}</Col>
							<Col :span="8">{{item.mktResName}}</Col>
							<Col :span="8">
                                <i class="iconfont icon-weixuanzhong-fang" v-if="!attrValueSel(item)"
                                      @click="isChoose(item)"></i>
                                <i class="iconfont icon-xuanzhong-fang" v-else></i>
                            </Col>
						</Row>

						<Row v-if="!mktResList.length" class="app__data-none">
							<Col :span="24">
								<span>当前无数据!</span>
							</Col>
						</Row>

						<Pagination :pageIndex="mktResourcePageobj.page" :pageSize="mktResourcePageobj.limit"
                                    :rowCount="mktResourcePageobj.rowCount"
                                    @change="attrPageChange" v-show="mktResList.length"
                                    :perPages=1 :isCenter="true">
                        </Pagination>
					</div>
				</div>
			</div>


            <div class="sel-box">
                <i class="title-icon"></i>
                <span class="y-span">已选营销资源列表</span>
            </div>

			<div class="a-v-table app__table__inner">
				<Row class="app__table-thead">
					<Col :span="6">编码</Col>
					<Col :span="6">营销资源名称</Col>
					<Col :span="6">关系类型</Col>
					<Col :span="6">操作</Col>
				</Row>

				<Row :class="['app__table-item']" v-for="(item,index) in attrSpecsValuesSelTemp" :key="index">
					<Col :span="6">{{item.mktResNbr}}</Col>
					<Col :span="6">{{item.mktResName}}</Col>
					<Col :span="6">
						<Select
							v-model="item.relTypeCode"
							:data="chooseOption"
						></Select>
					</Col>
					<Col :span="6">
						<i class="span-del" @click="remove(item,index)">删除</i>
					</Col>
				</Row>

				<Row v-if="!attrSpecsValuesSelTemp.length" class="app__data-none">
					<Col :span="24">
						<span>当前无数据 请先选择营销资源</span>
					</Col>
				</Row>
			</div>


            <!--客户约束列表-->
            <div class="mod-title">
                <div>促销资源组</div>
            </div>

            <div class="h-a-add">
                <div class="app__btn app__btn-add" @click="addSalesGroup()">添加</div>
            </div>


			<div class="a-v-table app__table__inner table-padding">
				<Row class="app__table-thead">
					<Col :span="6">编码</Col>
					<Col :span="6">营销资源名称</Col>
					<Col :span="6">关系类型</Col>
					<Col :span="6">操作</Col>
				</Row>

				<Row v-if="offerResGrpRels" :class="['app__table-item']" v-for="(item,index) in delmkt(offerResGrpRels)" :key="index">
					<Col :span="6">{{item.objNbr}}</Col>
					<Col :span="6">{{item.objName}}</Col>
					<Col :span="6">{{item.relType == '1001'?'租用':item.relType == '1002'?'赠送':item.relType == '1003'?'购买':item.relType == '1100'?'用户自备':'合作伙伴提供'}}</Col>
					<Col :span="6">
					    <i class="span-del" @click="delGrp(item)">删除</i>
					</Col>
				</Row>

				<Row v-if="!offerResGrpRels.length" class="app__data-none">
					<Col :span="24">
					<span>当前无数据 请先选择营销资源组</span>
					</Col>
				</Row>
			</div>
		</Scroll>


		<!--选择营销资源-->
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="选择营销资源" ref="addSales" @confirm="addSalesDialogSubmit">
			<div class="main">
				<div class="search">
					<Search placeholder="请输入营销资源编码" @search="searchmkt"></Search>
				</div>
				<div class="app__table">
					<Row class="app__table-thead">
						<Col :span="6">序号</Col>
						<Col :span="6">营销资源编码</Col>
						<Col :span="6">营销资源名称</Col>
						<Col :span="6">操作</Col>
					</Row>
					<Row v-if="mktResList.length>0" :class="['app__table-item']" v-for="(item,index) in mktResList" :key="index">
						<Col :span="6">{{index + 1}}</Col>
						<Col :span="6">{{item.mktResNbr}}</Col>
						<Col :span="6">{{item.mktResName}}</Col>
						<Col :span="6">
						<span v-if="!selectMkt(item)" class="app__icon-btn app__icon-plus" @click='addmktRes(item)'></span>
						<span v-if="selectMkt(item)" class="app__icon-btn app__icon-choose"></span>
						</Col>
					</Row>
				</div>
				<Row v-if="!mktResList.length" class="app__data-none">
					<Col :span="24">
					<span>当前无数据!</span>
					</Col>
				</Row>
				<Pagination :pageIndex="mktResourcePageobj.page" :pageSize="mktResourcePageobj.limit" :rowCount="mktResourcePageobj.rowCount" :perPages=5 @change="pageChange" :isCenter="true">
				</Pagination>

				<span class="y-span" v-if="delmkt(mktResSelectedList).length>0">已选</span>

				<div class="app__table" v-if="delmkt(mktResSelectedList).length>0">
					<Row class="app__table-thead">
						<Col :span="5">序号</Col>
						<Col :span="5">营销资源编码</Col>
						<Col :span="5">营销资源组名称</Col>
						<Col :span="5">关系类型</Col>
						<Col :span="4">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in delmkt(mktResSelectedList)" :key="index">
						<Col :span="5">{{index + 1}}</Col>
						<Col :span="5">{{item.objNbr}}</Col>
						<Col :span="5">{{item.objName}}</Col>
						<Col :span="5">
						<Select @change="changemkt(item)" :isNullSel="false" :data="relTypeList" v-model="item.relType"></Select>
						</Col>
						<Col :span="4">
						<span class="app__icon-btn app__icon-delete" @click="delmktRes(item)"></span>
						</Col>
					</Row>
				</div>
			</div>
		</Dialog>

		<!--选择营销资源组-->
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="选择营销资源组" ref="addSalesGroup" @confirm="addSalesGroupDialogSubmit">
			<div class="main">
				<!--<div class="search2">-->
                    <!--<Search placeholder="请输入营销资源编码" @search="searchmktGrp"></Search>-->
				<!--</div>-->
                <div class="sel-box sel-box-dialog">
                    <i class="title-icon"></i>
                    <span class="y-span">待选营销资源组列表</span>

                    <Search class="offer-sear" placeholder="请输入营销资源名称" @search="searchmktGrp"></Search>
                </div>


				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="6">序号</Col>
						<Col :span="6">营销资源编码</Col>
						<Col :span="6">营销资源组名称</Col>
						<Col :span="6">操作</Col>
					</Row>
					<Row v-if="mktResGrpList" :class="['app__table-item']" v-for="(item,index) in mktResGrpList" :key="index">
						<Col :span="6">{{index + 1}}</Col>
						<Col :span="6">{{item.mktResGrpNbr}}</Col>
						<Col :span="6">{{item.mktResGrpName}}</Col>
						<Col :span="6">
                            <span class="iconfont icon-weixuanzhong-fang" v-if="!selectMktGrp(item)" @click='addGrpLocal(item)'></span>
                            <span class="iconfont icon-xuanzhong-fang" v-if="selectMktGrp(item)"></span>
                        </Col>
					</Row>
					<Row v-if="!mktResGrpList.length" class="app__data-none">
						<Col :span="24">
						<span>当前无数据!</span>
						</Col>
					</Row>
				</div>
				<Pagination :pageIndex="mktResGrpPageobj.page" :pageSize="mktResGrpPageobj.limit"
                            :rowCount="mktResGrpPageobj.rowCount" :perPages=1
                            @change="pageChange" :isCenter="true">
				</Pagination>

				<!--<span class="y-span" v-if="mktResGrpSelectedList.length>0">已选</span>-->
                <div class="sel-box sel-box-dialog" v-if="mktResGrpSelectedList.length>0">
                    <i class="title-icon title-icon2"></i>
                    <span class="y-span">已选营销资源组列表</span>
                </div>

				<div class="app__table__inner" v-if="mktResGrpSelectedList.length>0">
					<Row class="app__table-thead">
						<Col :span="5">序号</Col>
						<Col :span="5">营销资源编码</Col>
						<Col :span="5">营销资源组名称</Col>
						<Col :span="5">关系类型</Col>
						<Col :span="4">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in delmkt(mktResGrpSelectedList)" :key="index">
						<Col :span="5">{{index + 1}}</Col>
						<Col :span="5">{{item.objNbr}}</Col>
						<Col :span="5">{{item.objName}}</Col>
						<Col :span="5">
						<Select @change="changemktGrp(item)" :isNullSel="false" :data="relTypeList" v-model="item.relType"></Select>
						</Col>
						<Col :span="4">
						<span class="iconfont icon-shanchu" @click="delmktGrpRes(item)"></span>
						</Col>
					</Row>
				</div>
			</div>
		</Dialog>

		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				dialogSize: {
					size: 80,
					min: 600,
					max: 800
				},
				pageInfo: {
					pageIndex: 1, // 当前页
					pageSize: 5, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},
				tipInfo: {
                	iconType: 3,
                	msg:'',
                	showBtn:{
                		clear: true,
                		save: true
                	}
                },
				// 营销资源类别树查询
				mktTree: [],
				staffKeys:[{
					key: 'mktResTypeName'
				}],
				offerId: '',
				treeModel: {},
				checkboxData: [],
				chooseOption: [
					{ value: "1001", label: "租用" },
					{ value: "1002", label: "赠送" },
					{ value: "1003", label: "购买" },
					{ value: "1100", label: "用户自备" },
					{ value: "1200", label: "合作伙伴提供" }
				],
				//营销资源列表
				offerResRels: [],
				//营销资源组列表
				offerResGrpRels: [],
				mktResNbr: "",
				mktResName: "",
				mktResTypeId: '',
				mktResourcePageobj: {
					limit: 5,
					page: 1,
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},
				mktResList: [],
				mktResSelectedList: [],
				mktRespostSelectedList: [],
				mktResGrpNbr: "",
				mktResGrpName: "",
				mktResGrpPageobj: {
					limit: 5,
					page: 1
				},
				mktResGrpList: [],
				mktResGrpSelectedList: [],
				mktResGrppostSelectedList: [],
				staff: "222",
				mktType: "A",
				relTypeList: [{
					value: "1001",
					label: "租用"
				}, {
					value: "1002",
					label: "赠送"
				}, {
					value: "1003",
					label: "购买"
				}, {
					value: "1100",
					label: "用户自备"
				}, {
					value: "1200",
					label: "合作伙伴提供"
				}],
				attrSpecsValuesSelTemp: [],
				deleteObj: {
					currentIndex: ''			// 当前下标
				}
			}
		},
		mounted() {
			this.offerResRel();
			this.mktResTypeTree();
			this.mktResource();
			this.getSelectResource()
		},
		watch:{
	        treeModel (val,oldval) {
	        	if(val !== oldval){
					this.$refs.searchVal.setValue('');
					this.mktResNbr = '';
					this.mktResName = '';
					this.mktResTypeId = val.mktResTypeId;
					this.mktResource(1)
	        	}
	        }
	    },
		methods: {
			// 点击营销资源列表
			isChoose (val){
				this.$set(val,'relTypeCode','1003')
                this.attrSpecsValuesSelTemp.filter( item => item.mktResId == val.mktResId)[0] ?
				this.attrSpecsValuesSelTemp = this.attrSpecsValuesSelTemp.filter( item => item.mktResId != val.mktResId) :
				this.attrSpecsValuesSelTemp.push(val);
            },
            attrValueSel(val){ //属性值默认是否选中
                return this.attrSpecsValuesSelTemp.filter(item => item.mktResId == val.mktResId)[0] ? true : false;
			},

			// 已选营销资源删除
			remove (item, index) {
				item.statusCd = '1100'
				this.tipInfo.msg = `确认要删除吗？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
				this.tipConfirmType = 'del';
				this.deleteObj.currentIndex = index;
			},

			// 确认删除
			tipConfirm () {
				this.$refs.tip.hide();
				let addResourceArr = [];
				this.offerId = this.componentData.offerId;
				this.attrSpecsValuesSelTemp.forEach((item) => {
					let objData = {
						"offerResRelId": item.offerResRelId,
						"offerId": this.offerId,
						"objType": 1000,
						"objId": item.mktResId,
						"relType": item.relTypeCode,
						"createStaff": 1,
						"updateStaff": 1,
						"statusCd": item.statusCd,
						"createDate": '',
						"updateDate": ''
					}
					addResourceArr.push(objData)
				})
				this.addResourceSelectData(addResourceArr)
				this.attrSpecsValuesSelTemp.splice(this.deleteObj.currentIndex, 1);
			},

			// 去除重复数据
			pastRepeat (arr, key) {
				for (var i = 0; i < arr.length; i++) {
					for (var j = 0; j < arr.length; j++) {
						if (arr[i].key == arr[j].key) {
							arr.splice(j, 1);
						}
					}
				}
				return arr
			},

			// 保存按钮
//			save (callback) {
//				let	addResourceArr = [];
//				this.offerId = this.componentData.offerId;
//				this.attrSpecsValuesSelTemp.forEach((item) => {
//					let objData = {
//						"offerResRelId": item.offerResRelId ? item.offerResRelId : '',
//						"offerId": this.offerId,
//						"objType": 1000,
//						"objId": item.mktResId,
//						"relType": item.relTypeCode,
//						"createStaff": 1,
//						"updateStaff": 1,
//						"statusCd": 1000,
//						"createDate": '',
//						"updateDate": ''
//					}
//					addResourceArr.push(objData)
//				})
//				this.addResourceSelectData(addResourceArr,callback)
//			},

			// 新增接口
			addResourceSelectData (arr,callback) {
				this.$axios.post(this.$api.replace(this.$api.PostOfferResRel, ['{offerId}'], [this.offerId]), {
					"offerResRels": arr
				}).then((res) => {
					if (res.data.success) {
						this.getSelectResource();
						this.$message.success({"message": "成功"});
						callback(true)
					} else {
						this.$message.error({"message": "失败"});
						callback(false)
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg })
					callback(false);
				})
			},

			// 查询已选营销资源
			getSelectResource () {
				this.attrSpecsValuesSelTemp = [];
				this.offerId = this.componentData.offerId;
				this.$axios.get(this.$api.replace(this.$api.PostOfferResRel, ['{offerId}'], [this.offerId]), {
					params: {
						"offerId": this.offerId
					}
				}).then((res) => {
					let dataList = res.data.offerResRels;

					// let array = this.pastRepeat(dataList, 'mktResNbr')

					dataList.filter((item) => {
						let obj = {
							"mktResName": item.objName,
							"mktResNbr": item.objNbr,
							"mktResId": item.objId,
							"offerResRelId": item.offerResRelId,
							"relTypeCode": item.relType,
							"statusCd": item.statusCd
						}
						this.attrSpecsValuesSelTemp.push(obj)
					})
				})
			},

			// 分页
			attrPageChange (val) {
				this.mktResource(val)
			},

			// 搜索
			searchResource (data) {
				this.mktResName = data;
				this.mktResource(1)
			},




			offerResRel(data) {
				let offerIdArr = []
				offerIdArr.push(this.componentData.offerId)
				let apipath = this.$api.replace(this.$api.GetOfferResRel, ['{offerId}'], offerIdArr);
				// const apipath = 'http://10.4.31.2:8899/ordOffer/300139255/offerResRel';
				this.$axios.get(apipath, {}).then(res => {
					if(res.data.success) {
//						console.log(res.data);
						if(res.data.offerResRels) {
							this.offerResRels = res.data.offerResRels
							this.mktResSelectedList = []
							for(let val of res.data.offerResRels) {
								let valObj = {
									"objType": val.objType,
									"objId": val.objId,
									"objNbr": val.objNbr,
									"objName": val.objName,
									"relType": val.relType,
									"offerResRelId": val.offerResRelId,
									"statusCd": val.statusCd,
									"actType": "keep"
								}
								this.mktResSelectedList.push(valObj)
							}
						}

						if(res.data.offerResGrpRels) {
							this.offerResGrpRels = res.data.offerResGrpRels
							this.mktResGrpSelectedList = []
							for(let val of res.data.offerResGrpRels) {
								let valObj = {
									"objType": val.objType,
									"objId": val.objId,
									"objNbr": val.objNbr,
									"objName": val.objName,
									"relType": val.relType,
									"offerResRelId": val.offerResRelId,
									"statusCd": val.statusCd,
									"actType": "keep"
								}
								this.mktResGrpSelectedList.push(valObj)
							}
						}
					} else {
						this.$message.error({ message: '查询失败！' });
					}
				}).catch(error => {
					this.$message.error({ message: '查询失败！' });
				})
			},
			// 营销资源类别树查询
			mktResTypeTree() {
				this.$axios.get(this.$api.GetMktResTypeTree, {}).then(res => {
					// console.log(res.data);
					if (res.data.success) {
						this.mktTree = res.data.mktResTypeTree;
					}
				})
			},
			submitDialogPlugClick(){
//				console.log('111')
				this.$refs.submitDialogScroll.initScroll();
			},
			//营销资源列表查询
			mktResource(page) {
				this.$axios.get(this.$api.GetMktResource, {
					params: {
						mktResNbr: this.mktResNbr,
						mktResName: this.mktResName,
						mktResTypeId: this.mktResTypeId,
						limit: this.mktResourcePageobj.limit,
						page: page ? page : this.mktResourcePageobj.page
					}
				}).then(res => {
					if(res.data.success) {
						this.mktResList = res.data.mktResPage.content

						let pageData = res.data.mktResPage;
						// this.mktResourcePageobj.limit = res.data.mktResPage.limit
						// this.mktResourcePageobj.page = res.data.mktResPage.page
						// this.mktResourcePageobj.rowCount = res.data.mktResPage.total
						this.mktResourcePageobj = {
							limit: pageData.limit,
							page: pageData.page,
							rowCount: pageData.total
						}
					}
				})
			},
			//营销资源组列表查询
			mktResGrp() {
				this.$axios.get(this.$api.GetMktResGrp, {
					params: {
						mktResGrpNbr: this.mktResGrpNbr,
						mktResGrpName: this.mktResGrpName,
						limit: this.mktResGrpPageobj.limit,
						page: this.mktResGrpPageobj.page
					}
				}).then(res => {
//					console.log(res.data)
					if(res.data.success) {
						this.mktResGrpList = res.data.mktResGrpPage.content
						this.mktResGrpPageobj.limit = res.data.mktResGrpPage.limit
						this.mktResGrpPageobj.page = res.data.mktResGrpPage.page
						this.mktResGrpPageobj.rowCount = res.data.mktResGrpPage.total
					}
				})
			},
			//营销资源新增本地
			addmktRes(val) {
				let mktResSelectedObj = {
					"objType": "1000",
					"objId": val.mktResId,
					"objNbr": val.mktResNbr,
					"objName": val.mktResName,
					"relType": "1003",
					"offerResRelId": '',
					"statusCd": "1000",
					"actType": "add"
				}
				this.mktResSelectedList.push(mktResSelectedObj)
			},
			//删除
			delmkt(arr) {
				return [...arr].filter(item => item.statusCd != '1100');
			},
			//营销资源删除本地
			delmktRes(val) {
				let index = this.mktResSelectedList.indexOf(val)
				this.mktResSelectedList[index].statusCd = "1100"
				this.mktResSelectedList[index].actType = "del"
			},
			selectMkt(val) {
				return this.mktResSelectedList.filter(item => item.statusCd != '1100').find(item => item.objId == val.mktResId)
			},
			//营销资源组新增本地
			addGrpLocal(val) {
				let mktResGrpSelectedObj = {
					"objType": "1100",
					"objId": val.mktResGrpId,
					"objNbr": val.mktResGrpNbr,
					"objName": val.mktResGrpName,
					"relType": "1003",
					"offerResRelId": '',
					"statusCd": "1000",
					"actType": "add"
				}
				this.mktResGrpSelectedList.push(mktResGrpSelectedObj)
			},
			//营销资源组删除本地
			delmktGrpRes(val) {
				let index = this.mktResGrpSelectedList.indexOf(val)
				this.mktResGrpSelectedList[index].statusCd = "1100"
				this.mktResGrpSelectedList[index].actType = "del"
			},
			selectMktGrp(val) {
				return this.mktResGrpSelectedList.filter(item => item.statusCd != '1100').find(item => item.objId == val.mktResGrpId)
			},
			pageChange() {

			},
			addSales() {
				this.mktResource()
				this.$refs.addSales.show();
			},
			addSalesGroup() {
				this.mktResGrp()
				this.$refs.addSalesGroup.show();
			},
			mod(val) {

			},
			del(val) {
				if(val.offerResRelId == "") {
					this.mktResSelectedList.splice(this.mktResSelectedList.indexOf(val), 1)
					this.offerResRels = this.mktResSelectedList
					this.mktRespostSelectedList = this.mktResSelectedList.filter(item => item.actType != 'keep')
					this.$message.success({ message: '删除成功！' });
				} else {
					let offerIdArr = []
					offerIdArr.push(this.componentData.offerId)
					let offerResRels = []
					//营销资源
					let offerResRelObj = {
						"offerResRelId": val.offerResRelId,
						"offerId": this.componentData.offerId,
						"objType": val.objType,
						"objId": val.objId,
						"relType": val.relType,
						"createStaff": this.staff,
						"updateStaff": this.staff,
						"statusCd": "1100"
					}
					offerResRels.push(offerResRelObj)
					this.$axios.post(this.$api.replace(this.$api.PostOfferResRel, ['{offerId}'], offerIdArr), {
						"offerResRels": offerResRels
					}).then(res => {
//						console.log(res.data)
						if(res.data.success) {
							this.$message.success({ message: '删除成功！' });
							this.offerResRel()
						}
					})
				}
			},
			modGrp(val) {

			},
			delGrp(val) {
				if(val.offerResRelId == "") {
					this.mktResGrpSelectedList.splice(this.mktResGrpSelectedList.indexOf(val), 1)
					this.offerResGrpRels = this.mktResGrpSelectedList
					this.mktResGrppostSelectedList = this.mktResGrpSelectedList.filter(item => item.actType != 'keep')
					this.$message.success({ message: '删除成功！' });
				} else {
					let offerIdArr = []
					offerIdArr.push(this.componentData.offerId)
					let offerResRels = []
					//营销资源
					let offerResRelObj = {
						"offerResRelId": val.offerResRelId,
						"offerId": this.componentData.offerId,
						"objType": val.objType,
						"objId": val.objId,
						"relType": val.relType,
						"createStaff": this.staff,
						"updateStaff": this.staff,
						"statusCd": "1100"
					}
					offerResRels.push(offerResRelObj)
					this.$axios.post(this.$api.replace(this.$api.PostOfferResRel, ['{offerId}'], offerIdArr), {
						"offerResRels": offerResRels
					}).then(res => {
//						console.log(res.data)
						if(res.data.success) {
							this.$message.success({ message: '删除成功！' });
							this.offerResRel()
						}
					})
				}
			},
			changemkt(val) {
				let index = this.mktResSelectedList.indexOf(val)
				this.mktResSelectedList[index].actType = "mod"
			},
			changemktGrp(val) {
				let index = this.mktResGrpSelectedList.indexOf(val)
				this.mktResGrpSelectedList[index].actType = "mod"
			},
			addSalesDialogSubmit() {
				this.mktType = 'A'
				this.$refs.addSales.hide();
				this.offerResRels = this.mktResSelectedList
				this.mktRespostSelectedList = this.mktResSelectedList.filter(item => item.actType != 'keep')
			},
			addSalesGroupDialogSubmit() {
				this.mktType = 'B'
				this.$refs.addSalesGroup.hide();
				this.offerResGrpRels = this.mktResGrpSelectedList
				this.mktResGrppostSelectedList = this.mktResGrpSelectedList.filter(item => item.actType != 'keep')
			},
			save(callback) {
//				console.log(this.mktRespostSelectedList)
//				console.log(this.mktResGrppostSelectedList)
				let offerIdArr = []
				offerIdArr.push(this.componentData.offerId)
				let	addResourceArr = [];
//				this.offerId = this.componentData.offerId;
				this.attrSpecsValuesSelTemp.forEach((item) => {
					let objData = {
						"offerResRelId": item.offerResRelId ? item.offerResRelId : '',
						"offerId": this.offerId,
						"objType": 1000,
						"objId": item.mktResId,
						"relType": item.relTypeCode,
						"createStaff": 1,
						"updateStaff": 1,
						"statusCd": 1000,
						"createDate": '',
						"updateDate": ''
					}
					addResourceArr.push(objData)
				})
				

				
				let offerResRels = []
				let mktResList = addResourceArr
				if(mktResList) {
					for(let val of mktResList) {
						let offerResRelObj = {
							"offerResRelId": val.offerResRelId,
							"offerId": this.componentData.offerId,
							"objType": val.objType,
							"objId": val.objId,
							"relType": val.relType,
							"createStaff": this.staff,
							"updateStaff": this.staff,
							"statusCd": val.statusCd
						}
						offerResRels.push(offerResRelObj)
					}
				}

				let mktResGrpList = this.mktResGrppostSelectedList
				if(mktResGrpList) {
					for(let val of mktResGrpList) {
						let offerResRelObj = {
							"offerResRelId": val.offerResRelId,
							"offerId": this.componentData.offerId,
							"objType": val.objType,
							"objId": val.objId,
							"relType": val.relType,
							"createStaff": this.staff,
							"updateStaff": this.staff,
							"statusCd": val.statusCd
						}
						offerResRels.push(offerResRelObj)
					}
				}
				this.$axios.post(this.$api.replace(this.$api.PostOfferResRel, ['{offerId}'], offerIdArr), {
					"offerResRels": offerResRels
				}).then(res => {
//					console.log(res.data)
					if(res.data.success) {
						this.mktResGrppostSelectedList=[];
						this.$message.success({ message: '成功！' });
						this.offerResRels = this.mktResSelectedList
						this.offerResRel()
						this.getSelectResource();
						callback(true)
					}else{
						this.$message.error({ message: '操作失败！'});
                        callback(false)
					}
				}).catch(error => {
                    this.$message.error({message: error.response.data.msg})
                    callback(false)
                })
			},
			searchmkt(val) {
				this.mktResNbr = val
				this.mktResource()
			},
			searchmktGrp(val) {
				this.mktResGrpName = val
				this.mktResGrp()
			}
		}
	}
</script>

<style scoped lang="scss">
    /*模块标题*/
    .mod-title{
        width: 100%;
        height: 30px;
        background-color: #f5f6fa;
        border-radius: 16px 16px 0 0;

        div{
            width: 120px;
            height: 30px;
            background-color: $mainColor;
            border-radius: 16px 0 0 0;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            color: white;
        }
    }

    .tag-box{
        display: inline-block;
        line-height: 0;
        padding: 10px;
        margin: 10px;
        border: solid 1px #d5e8f9;
        background-color: #eff7fd;
        color: $mainColor;

        i{
            display: inline-block;
            width: 8px;
            height: 8px;
            cursor: pointer;
            margin-left: 10px;
            background: url("./../../images/bqsc.png") no-repeat;
            background-size: cover;
        }
    }
    /*表格标题+搜索框*/
    .sel-box{
        width: 100%;
        line-height: 50px;
        padding: 0 20px 0 10px;
        border-left: solid 1px #f6f6f6;
        border-top: solid 1px #f6f6f6;
        border-right: solid 1px #f6f6f6;

        /*图标*/
        i.title-icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url("./../../images/sjicon.png") no-repeat;
            background-size: cover;
            vertical-align: text-top;
        }
        /*表格标题样式*/
        .y-span {
            display: inline-block;
            margin-left: 4px;
            color: $mainColor;
            font-size: 14px;
            font-weight: bold;
        }
        /*搜索框样式*/
        .offer-sear{
            float: right;
            width: 25%;
            margin-top: 4px;
        }
    }

    .sel-box-dialog{
        border: none;

        .offer-sear{
            width: 40%;
        }
        i.title-icon2{
            background: url("./../../images/dxxz.png") no-repeat;
            background-size: cover;
        }

    }


    /*营销资源*/
    .sale {
		width: 100%;
		height: 100%;

		.scroll {

            .span-del {
                color: $mainColor;
                padding: 0 5px;
                cursor: pointer;
                font-style: normal;
            }
			.h-a-add {
				padding: 10px 0;
			}
			.app__table {
				.col {
					text-align: center;
				}
			}
			.s-title {
				margin-top: 20px;
			}
		}
	}

	.main {
		padding: 20px;

        .search2 {
            width: 50%;
            margin-bottom: 10px;
        }
        span{
        	cursor: pointer;
        }
	}

    .a-v-table{
        margin-bottom: 30px;
    }

	.a-v-table-wrapper {
		height: 330px;

		.a-v-table-left {
            float: left;
            width: 30%;
            padding-left: 20px;
            border: 1px solid #f6f6f6;

			.scroll {
                height: 310px;
			}
		}
		.a-v-table-right {
            float: right;
            width: 69%;
            height: 312px;
            border-bottom: solid 1px #f6f6f6;
		}
	}

	.table-padding {
		padding: 40px 0;
        padding-top: 0;
	}
</style>
