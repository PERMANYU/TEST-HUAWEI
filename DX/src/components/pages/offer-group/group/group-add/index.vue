<template>
	<div class="add-info">
		<Scroll :isShowRight="true">
			<div class="add-process">
				<div class="add-message" @click="goAddBasic">
					<span class="tip">配置销售品组基本信息</span>
				</div>
				<div class="i-next">
				</div>
				<div class="add-relation active">
					<span class="tip">配置销售品组成员和销售品组关系</span>
				</div>
			</div> 
			<div class="part">
				<div class="configuration a-v-title1">
						<div class="configuration-tip app__title ">
							<i class="iconfont icon-jibenxinxi "></i>
							<span class="configuration-word">已选目录：</span>
							<span class="catlog-name">{{componentData.catalogItemName}}</span>
						</div>
					</div>
					<div class="members">
						<div class="members-search">
							<i class="iconfont icon-sousuo1130"></i>
						<Input placeholder="请输入销售品内部名称或编码" v-model="offers.searchVal"></Input>
						<span class="members-go" @click="searchOffer()"></span>
					</div>
					<div class="members-content">
						<div class="app__table__inner" fixedTopClassName="app__table-thead"  ref="listScroll">
							<Row class="app__table-thead">
								<Col :span="12">销售品内部名称</Col>
								<Col :span="6">内部编码</Col>
								<Col :span="6">销售品类型</Col>
							</Row>

							<Row :class="['app__table-item']" v-if="offerList.length>0" v-for="(item,index) in offerList" :key="index">
								<Col :span="12">{{item.offerSysName}}</Col>
								<Col :span="6">{{item.innerNbr}}</Col>
								<Col :span="6">{{item.offerTypeName}}</Col>
							</Row>
							<Row v-if="!offerList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</div>
					</div>
					<div class="members-footer" v-if="offerList.length>0">
						<Pagination :pageIndex="offerPageInfo.pageIndex" :pageSize="offerPageInfo.pageSize" :rowCount="offerPageInfo.rowCount" :perPages=5  @change="offersPageChange">
						</Pagination>
					</div>
				</div>
			</div>
			
			<div class="part">
				<div class="configuration a-v-title1 ">
						<div class="configuration-tip app__title">
							<i class="iconfont icon-jibenxinxi"></i>
							<span class="configuration-word">关联组关系</span>
						</div>
						<div class="configuration-add" @click="addRelation()">
							<i class="add-icon"></i>
							<span class="add-name">添加</span>
						</div>
					</div>
					<div class="members">
						<div class="members-search">
							<i class="iconfont icon-sousuo1130"></i>
						<Input placeholder="请输入销售品组名称或编码" v-model="group.searchAddedVal"></Input>
						<span class="members-go" @click="searchAddedRela()"></span>
					</div>
					<div class="members-content">
						<div class="app__table__inner" fixedTopClassName="app__table-thead"  ref="listScroll">
							<Row class="app__table-thead">
								<Col :span="3">Z销售品组名称</Col>
								<Col :span="3">Z销售品组编码</Col>
								<Col :span="2">关系类型</Col>
								<Col :span="3">A销售品组名称</Col>
								<Col :span="3">A销售品组编码</Col>
								<Col :span="2">最大值</Col>
								<Col :span="2">最小值</Col>
								<Col :span="2">生效时间</Col>
								<Col :span="2">失效时间</Col>
								<Col :span="2">操作</Col>
							</Row>

							<Row :class="['app__table-item']" v-if="relationList.length>0" v-for="(item,index) in relationList" :key="index">
								<Col :span="3" class="over-col" v-bind:title="item.zOfferGrpName">{{item.zOfferGrpName}}</Col>
								<Col :span="3" class="over-col" v-bind:title="item.zOfferGrpNbr">{{item.zOfferGrpNbr}}</Col>
								<Col :span="2">{{item.relTypeName}}</Col>
								<Col :span="3" class="over-col" v-bind:title="item.aOfferGrpName">{{item.aOfferGrpName}}</Col>
								<Col :span="3" class="over-col" v-bind:title="item.aOfferGrpNbr">{{item.aOfferGrpNbr}}</Col>
								<Col :span="2">{{item.maxNum}}</Col>
								<Col :span="2">{{item.minNum}}</Col>
								<Col :span="2">{{item.effDate|date}}</Col>
								<Col :span="2">{{item.expDate|date}}</Col>
								<Col :span="2">
									<span class="modify" @click="modRela(item)"></span>
									<span class="del" @click="delRela(item)"></span>
								</Col>
							</Row>
							<Row v-if="!relationList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</div>
					</div>
					<div class="members-footer" v-if="relationList.length>0">
						<Pagination :pageIndex="group.addedPageInfo.pageIndex" :pageSize="group.addedPageInfo.pageSize" :rowCount="group.addedPageInfo.rowCount" :perPages=5 @change="addedRelaPage">
						</Pagination>
					</div>
				</div>
			</div>
		</Scroll>
		
		<div class="footer">
			<div class="btn-page-box">
				<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
				<span class="app__btn app__btn-confirm" @click="submit()">保存</span>
			</div>
		</div>
		

		<Dialog dialogTitle="添加关联组关系" :dialogSize="dialogSize" ref="relationDialog" @confirm="relationDialogSubmit">
			<Scroll :isShowRight="true">
				<div class="part">
					<div class="members">
						<div class="members-search">
							<i class="iconfont icon-sousuo1130"></i>
							<Input placeholder="请输入销售品组名称或编码" v-model="group.searchVal"></Input>
							<span class="members-go" @click="searchGroups()"></span>
						</div>
						<div class="members-content">
							<div class="app__table__inner" fixedTopClassName="app__table-thead" ref="groupScroll">
								<Row class="app__table-thead">
									<Col :span="13">销售组名称</Col>
									<Col :span="7">内部编码</Col>
									<Col :span="4">操作</Col>
								</Row>

								<Row :class="['app__table-item']" v-if="offerGroup.length>0" v-for="(item,index) in offerGroup" :key="index">
									<Col :span="13" class="over-col" :title="item.offerGrpName">{{item.offerGrpName}}</Col>
									<Col :span="7">{{item.offerGrpNbr}}</Col>
									<Col :span="4">
										<input type="checkbox" name="checkbox" @click="selectGroupRelation(index,$event)" v-bind:checked="selectGrpMkt(item)">
									</Col>
								</Row>
								<Row v-if="!offerGroup.length" class="app__data-none">
									<Col :span="24"><span>当前无数据!</span></Col>
								</Row>
							</div>
						</div>
						<div class="members-footer" v-if="offerGroup.length>0">
							<Pagination :pageIndex="group.pageInfo.pageIndex" :pageSize="group.pageInfo.pageSize" :rowCount="group.pageInfo.rowCount" :perPages=5 @change="groupPageChange">
							</Pagination>
						</div>

						<div class="selected">
							<span>已选销售品组</span>
						</div>
						<div class="members-content">
							<div class="app__table__inner"  ref="listScroll">
								<Row class="app__table-thead">
									<Col :span="4">当前销售品组名称</Col>
									<Col :span="2">关联关系</Col>
									<Col :span="2">关联方向</Col>
									<Col :span="4">销售品组名称</Col>
									<Col :span="2">最大值</Col>
									<Col :span="2">最小值</Col>
									<Col :span="3">生效时间</Col>
									<Col :span="3">失效时间</Col>
									<Col :span="2">操作</Col>
								</Row>

								<Row :class="['m-item app__table-item']" v-if="group.selectedGroups.length>0" v-for="(item,index) in group.selectedGroups" :key="index">
									<Col :span="4" class="over-col" :title="componentData.offerGrpName">{{componentData.offerGrpName}}</Col>
									<Col :span="2" :class="{validate:!item.offerGroupRel}">
	                        			<Select v-validate="'required'" :data="offerGroupRelArray" name="relationType" data-vv-as="关联关系" v-model="item.offerGroupRel"></Select>
									</Col>
									<Col :span="2" :class="{validate:!item.direction}">
	                        			<Select v-validate="'required'" :data="directionArray" name="direction" data-vv-as="方向" v-model="item.direction"></Select>
									</Col>
									<Col :span="4" class="over-col" :title="item.offerGrpName">{{item.offerGrpName}}</Col>
									<Col :span="2" :class="{validate:!item.max}">
										<Input name="max" v-model.trim="item.max" data-vv-as="最大值"></Input>
									</Col>
									<Col :span="2" :class="{validate:!item.min}">
										<Input name="min" v-model.trim="item.min" data-vv-as="最小值"></Input>
									</Col>
									<Col :span="3" :class="{validate:!item.effDate}">
										<DatePicker :endDate="item.expDate" name="effDate" data-vv-as="生效时间" v-model="item.effDate"></DatePicker>
									</Col>
									<Col :span="3" :class="{validate:!item.expDate}">
										<DatePicker :startDate="item.effDate" name="expDate" data-vv-as="失效时间" v-model="item.expDate"></DatePicker>
									</Col>
									<Col :span="2">
										<span class="del" @click="delSelectedGroup(index)"></span>
									</Col>
								</Row>
								<Row v-if="!group.selectedGroups.length" class="app__data-none">
									<Col :span="24"><span>当前无数据!</span></Col>
								</Row>
							</div>
						</div>
					</div>
				</div>
			</Scroll>
		</Dialog>

		<Dialog dialogTitle="修改关联组关系" :dialogSize="modDialogSize" ref="modifyRelDialog" @confirm="modifyRelDialogSubmit()" class="modify-dialog">
			<Scroll class="part"  :isShowRight="true">
				<Row>
					<Form labelWidth="130px" labelAlign="left">
						<Col :span="10">
							<FormItem labelText="当前销售品组名称：" :requiredIcon="true">
								<span>{{componentData.offerGrpName}}</span>
							</FormItem>
						</Col>
						<Col :span="10" :offset="4">
							<FormItem labelText="当前销售品组编码：" :requiredIcon="true">
									<span>{{componentData.innerNbr}}</span>
                     		</FormItem>
						</Col>
						<Col :span="10">
							<FormItem labelText="关联销售品组名称：" :requiredIcon="true">
								<span>{{(modify.aId == this.componentData.offerGrpId) ? modify.zOfferGrpName : modify.aOfferGrpName}}</span>
							</FormItem>
						</Col>
						<Col :span="10" :offset="4">
							<FormItem labelText="关联销售品组编码：" :requiredIcon="true">
									<span>{{(modify.aId == this.componentData.offerGrpId) ? modify.zOfferGrpNbr : modify.aOfferGrpNbr}}</span>
                     		</FormItem>
						</Col>
						<Col :span="10">
							<FormItem  labelText="关联关系：" :requiredIcon="true" :errorMessage="errors.first('irelation')">
								<Select v-validate="'required'" :data="offerGroupRelArray" name="irelationType" data-vv-as="关联关系" v-model="modify.relType"></Select>
							</FormItem>
						</Col>
						<Col :span="10" :offset="4">
							<FormItem  labelText="关联方向：" :requiredIcon="true" :errorMessage="errors.first('direction')">
								<Select v-validate="'required'" disabled :data="directionArray" name="direction" data-vv-as="方向" v-model="modify.direction"></Select>
							</FormItem>
						</Col>
						<Col :span="10">
							<FormItem  labelText="最大值：" :requiredIcon="true" :errorMessage="errors.first('maxNum')">
								<Input v-validate="'required'" name="maxNum" v-model.trim="modify.maxNum" data-vv-as="最大值"></Input>
							</FormItem>
						</Col>
						<Col :span="10" :offset="4">
							<FormItem  labelText="最小值：" :requiredIcon="true" :errorMessage="errors.first('minNum')">
								<Input v-validate="'required'" name="minNum" v-model.trim="modify.minNum" data-vv-as="最小值"></Input>
							</FormItem>
						</Col>
						<Col :span="10">
							<FormItem labelText="生效时间：" :errorMessage="errors.first('meffDate')" :requiredIcon="true">
								<DatePicker v-validate="'required'" :endDate="modify.expDate" name="meffDate" data-vv-as="生效时间" v-model="modify.effDate"></DatePicker>
							</FormItem>
						</Col>
						<Col :span="10" :offset="4">
							<FormItem labelText="失效时间：" :errorMessage="errors.first('mexpDate')" :requiredIcon="true">
								<DatePicker v-validate="'required'" :startDate="modify.effDate" name="mexpDate" data-vv-as="失效时间" v-model="modify.expDate"></DatePicker>
							</FormItem>
						</Col>
					</Form>
				</Row>
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
				catlog: '宽带组合套餐（宽带+WLAN）',
				searchObj: {
					member: ''
				},
				offerList: [
					{
						offerName: '201803-住宅宽频30融合套餐',
						offerCode: '2-2CGLOPJ8',
						offerType: '套餐销售品'
					}
				],
				relationList: [
					{
						zName: '201803-住宅宽频30融合套餐',
						zCode: '2-2CGLOPJ8',
						relation: '套餐销售品',
						aName: '201803-住宅宽频30融合套餐',
						aCode: '2-2CGLOPJ8',
						max: 1,
						min: 1,
						effTime: '2018-01-01',
						expTime: '2019-01-01'
					}
					
				],
				offerPageInfo: {
					pageIndex: 1,
					pageSize: 5, 
					pageCount: 1,
					rowCount: 5 
				},
				pageInfo: {
					pageIndex: 1,
					pageSize: 5, 
					pageCount: 1,
					rowCount: 5 
				},
				offers: {
					searchVal:''
				},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				offerGroup: [],
				modify: {
					curName: '测测测测测错',
					innerNbr: '111',
					relation: '可选依赖',
					direction: '正向',
					max: 1,
					min: 0,
					effDate: '',
					expDate: ''
				},
				modDialogSize: {
					size: 70,
					min: 800,
					max: 1200
				},
				group: {
					pageInfo: {
						pageIndex: 1,
						pageSize: 5, 
						pageCount: 1,
						rowCount: 5 
					},
					selectedGroups: [],
					submitGroups: [],
					searchVal: '',
					searchAddedVal: '',
					addedPageInfo: {
						pageIndex: 1,
						pageSize: 5, 
						pageCount: 1,
						rowCount: 5 
					}
				},
				dialogSize: {
					size: 90,
					min: 900,
					max: 1200
				},
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
				directionArray: [{
					label: '正向',
                    value: '1200'
                }, {
                    label: '反向',
                    value: '1300'
				}],
				isOk: false,
				isModify: false,
				offerTypeArray: [{
					label: '基础销售品',
                    value: '10'
				},{
					label: '套餐销售品',
                    value: '11'
				},{
					label: '可选包',
                    value: '12'
				},{
					label: '促销',
                    value: '13'
				},{
					label: '政企协议',
                    value: '14'
				},{
					label: '礼包',
                    value: '15'
				}]
			}
		},
		mounted(){
			this.initData()
			this.initRela()
		},
		methods: {
			initData(){//获取已有销售品组成员
				this.$axios.get(this.$api.OfferGroupMember,{
					 params:{
						page: this.offerPageInfo.pageIndex,
						limit: this.offerPageInfo.pageSize,
						offerGrpId: this.componentData.offerGrpId,
						grpType: this.componentData.grpType,
						// offerSysName: this.offers.searchVal
						offerInnerNbr: this.offers.searchVal
					 }
				}).then(res => {
                    if (res.data.success) {
						this.offerList = res.data.offerCatalogPage.content || []
						this.offerPageInfo.pageCount = Math.ceil(res.data.offerCatalogPage.total/this.offerPageInfo.pageSize)
						this.offerPageInfo.rowCount = res.data.offerCatalogPage.total
						this.offerList.filter( item => {
                        	item.offerTypeName = this.offerTypeArray.find( offerItem => {
                            	return item.offerType == offerItem.value
                          	}).label
                        })
                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
			},
			initRela(){//获取已有关联组关系
				this.$axios.get(this.$api.OfferGroupRel,{
					 params:{
						page: this.group.addedPageInfo.pageIndex,
						limit: this.group.addedPageInfo.pageSize,
						offerGrpId: this.componentData.offerGrpId,
						offerGrpName: this.group.searchAddedVal
					 }
				}).then(res => {
                    if (res.data.success) {
						this.relationList = res.data.ordOfferGrpPage.content || []
						this.group.addedPageInfo.pageCount = Math.ceil(res.data.ordOfferGrpPage.total/this.group.addedPageInfo.pageSize)
						this.group.addedPageInfo.rowCount = res.data.ordOfferGrpPage.total
						this.relationList.filter( item => {
                          item.relTypeName = this.offerGroupRelArray.find( offerItem => {
                             return item.relType == offerItem.value
                          }).label
                        })
                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
			},
			submit(){//保存
				this.$message.success({ message: '保存成功！' })
				this.$emit('componentView', 'list')
			},
			globalback(){//返回
				this.$emit('componentView', 'add',this.componentData)
			},
			offersPageChange(page){//目录下销售品换页
				this.offerPageInfo.pageIndex = page;
				this.$nextTick(() => {
					this.initData()
				})
			},
			searchOffer(){//查找销售品
				this.offerPageInfo.pageIndex = 1
				this.initData()
			},
			addRelation(){//添加关联组关系
				this.group.selectedGroups = []
				this.getGroups() 
				this.$refs.relationDialog.show()
			},
			getGroups(){//获取销售品组
				this.$axios.get(this.$api.QureyOfferGroupList,{
                    params:{
						page: this.group.pageInfo.pageIndex,
						limit: this.group.pageInfo.pageSize,
						offerGrpName: this.group.searchVal
                    }
                }).then(res => {
                    if (res.data.success) {
						this.offerGroup = res.data.ordOfferGrpPage.content||[];
						this.group.pageInfo.pageCount = Math.ceil(res.data.ordOfferGrpPage.total/this.group.pageInfo.pageSize)
						this.group.pageInfo.rowCount = res.data.ordOfferGrpPage.total  

                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
			},
			groupPageChange(page){//所有销售品组换页
				this.group.pageInfo.pageIndex = page
                this.getGroups()
			},
			relationDialogSubmit(){//保存已选择的关联组关系
				let relationParams = []
				this.isOk = false
				if(this.group.selectedGroups.length){
					for(let i = 0;i < this.group.selectedGroups.length;i++){
						if(!this.group.selectedGroups[i].min || !this.group.selectedGroups[i].max || !this.group.selectedGroups[i].offerGroupRel || !this.group.selectedGroups[i].direction || !this.group.selectedGroups[i].effDate || !this.group.selectedGroups[i].expDate){
							this.$message.warning({message: '请输入红框值！'})
							this.isOk = false
							return
						}else{
							if(Number(this.group.selectedGroups[i].min) < 0 || Number(this.group.selectedGroups[i].max) < 1){
								this.$message.warning({message: '请输入正确数值！'})
								this.isOk = false
								return
							}else{
								if(Number(this.group.selectedGroups[i].min) > Number(this.group.selectedGroups[i].max)){
									this.$message.warning({message: '最小值必须小于最大值！'})
									this.isOk = false
									return
								}else{
									this.isOk = true
								}
							}
						}
					}
				}
				if(this.isOk){
					this.group.submitGroups = this.group.selectedGroups
					if(this.group.submitGroups.length && this.relationList.length){
						for(let i = 0;i < this.group.submitGroups.length;i++){
							for(let j = 0;j < this.relationList.length;j++){
								if(this.group.submitGroups[i].direction == '1200'){
									if(this.componentData.offerGrpId == this.relationList[j].zId && this.group.submitGroups[i].offerGrpId == this.relationList[j].aId){
										this.group.submitGroups.splice(i, 1)
									}
								}else{
									if(this.componentData.offerGrpId == this.relationList[j].aId && this.group.submitGroups[i].offerGrpId == this.relationList[j].zId){
										this.group.submitGroups.splice(i, 1)
									}
								}
								
							}
						}
					}
					if(this.group.submitGroups.length){
						for(let i = 0;i < this.group.submitGroups.length;i++){
							let aId = 0
							let zId = 0
							let aType = ''
							let zType = ''
							if(this.group.submitGroups[i].direction == '1200'){
								zId = this.componentData.offerGrpId
								zType = this.componentData.grpRelType
								aId = this.group.submitGroups[i].offerGrpId
								aType = this.group.submitGroups[i].grpRelType
							}else{
								zId = this.group.submitGroups[i].offerGrpId
								zType = this.group.submitGroups[i].grpRelType
								aId = this.componentData.offerGrpId
								aType = this.componentData.grpRelType
							}

							let relation = {
								zId: zId,
								aId: aId,
								aType: aType,
								zType: zType,
								relType: this.group.submitGroups[i].offerGroupRel,
								updateStaff: this.$user.getInfo().id,
								createDate: new Date(),
								updateDate: new Date(),
								effDate: new Date(this.group.submitGroups[i].effDate),
								expDate: new Date(this.group.submitGroups[i].expDate),
								minNum: this.group.submitGroups[i].min,
								maxNum: this.group.submitGroups[i].max,
								statusCd: '1200',
								applyRegionId: 8100000
							}
							relationParams.push(relation)
						}
						this.$axios.post(this.$api.OfferGrpRelaTask,relationParams).then(res=>{
							if (res.data.success) {
								this.$message.success({ message: '添加成功！' })
								this.$nextTick(() => {
									this.initRela()
								})
								this.$refs.relationDialog.hide()

							}else{
								this.$message.error({message: res.data.msg})
							}
						}).catch( error => {
							this.$message.error({message: error.response.data.msg})
						})	
					}else{
						this.$refs.relationDialog.hide()
					}
				}
			},
			searchAddedRela(){//查找已有销售品关联组关系
				this.group.addedPageInfo.pageIndex = 1;
				this.initRela()
			},
			delSelectedGroup(index){//删除已选择的关联组关系
				this.group.selectedGroups.splice(index, 1)
			},

			searchGroups(){//查找销售品组
				this.group.pageInfo.pageIndex = 1
				this.getGroups()
			},
			selectGrpMkt(val){
                return this.group.selectedGroups.find(item => item.offerGrpId == val.offerGrpId)
            },
			selectGroupRelation(index,event){//选择需要添加的关联组关系
				let $target = event.target
				if($target.checked){
					if(this.offerGroup[index].offerGrpId == this.componentData.offerGrpId){
						this.$message.warning({message: '不可选择当前销售品组！'})
						$target.checked = false
					}else{
						if(!this.group.selectedGroups.find(item => item.offerGrpId == this.offerGroup[index].offerGrpId)){
							this.group.selectedGroups.push(this.offerGroup[index])
						}
					}	
				}else{
					let idx = 0
					for(let i = 0;i < this.group.selectedGroups.length; i++){
						if(this.offerGroup[index].offerGrpId == this.group.selectedGroups[i].offerGrpId){
							idx = i
						}
					}
					this.group.selectedGroups.splice(idx, 1)
				}
				for(let ele of this.group.selectedGroups){
                    ele.expDate = '2050-12-31'
                }
			},
			addedRelaPage(page){//已有销售品关联组关系换页
				this.group.addedPageInfo.pageIndex = page
				this.$nextTick(() => {
					this.initRela()
				})
			},
			delRela(item){//删除已有销售品关联组关系
				this.$axios.delete(this.$api.OfferGrpRelaTask,{
					params: {
						offerGrpRelId: item.offerGrpRelId,
						updateStaff: this.$user.getInfo().id
					}
				}).then(res => {
					if (res.data.success) {
						this.$message.success({ message: '删除成功！' })
						this.$nextTick(() => {
							this.initRela()
						})
                    }else{
                        this.$message.error({message: res.data.msg})
                    }
				}).catch(error => {
					this.$message.error({message: error.response.data.msg})
				})
			},
			modRela(obj){//显示修改关联组关系
				this.modify = obj
				this.isModify = false
				if(this.modify.zId == this.componentData.offerGrpId){
					this.modify.direction = '1200'
				}else{
					this.modify.direction = '1300'
				}
				this.$refs.modifyRelDialog.show()
			},
			modifyRelDialogSubmit(){//修改关联组关系保存
				if(Number(this.modify.maxNum) < 1 || Number(this.modify.minNum) < 0){
					this.$message.warning({message: '请输入正确数值！'})
					this.isModify = false
				}else{
					if(Number(this.modify.maxNum) < Number(this.modify.minNum)){
						this.$message.warning({message: '最小值必须小于最大值！'})
						this.isModify = false
					}else{
						this.isModify = true
					}
				}
				if(this.isModify){
					this.$axios.put(this.$api.OfferGrpRelaTask,{
						offerGrpRelId: this.modify.offerGrpRelId,
						relType: this.modify.relType,
						effDate: new Date(this.modify.effDate),
						expDate: new Date(this.modify.expDate),
						updateStaff: this.$user.getInfo().id,
						updateDate: new Date(),
						maxNum: this.modify.maxNum,
						minNum: this.modify.minNum
					}).then(res => {
						if (res.data.success) {
							this.$message.success({ message: '修改成功！' })
							this.$nextTick(() => {
								this.initRela()
							})
							this.$refs.modifyRelDialog.hide()
                   	}else{
                        	this.$message.error({message: res.data.msg})
                    	}
					}).catch(error => {
						this.$message.error({message: error.response.data.msg})
					})
				}
			},
			goAddBasic(){
				this.globalback()
			}
		}
	}
</script>

<style scoped lang="scss">
	.add-info {
		width: 100%;
		padding-left: 20px;
		position: relative;
		height: 100%;
		.title{
			width: 100%;
			height:60px;
			line-height: 60px;
			font-size: 16px;
			font-weight: 700;
			text-align: center;
			margin-bottom: 20px;
		}
		.add-process{
			display: -webkit-flex;
			display: flex;
			position: relative;
			width: 100%;
			height: 36px;
			-webkit-justify-content: center;
			justify-content: center;
			-webkit-align-items: center;
			align-items: center;
			margin-top: 30px;	
			margin-bottom: 40px;
			color: #254063;
			.i-next{
				display: inline-block;
				width: 50px;
				height: 20px;
				background-image: url(images/pzlcjt.png);
				background-repeat: no-repeat;
				background-position: center;
				vertical-align: middle;
			}
			.active{
				background-color: #5C9CF3!important;
			 	color: white;
			}
			.add-message,
			.add-relation{
				display: -webkit-flex;
				display: flex;
				width: 342px;
				height:100%;
				-webkit-justify-content: center;
				justify-content: center;
				-webkit-align-items: center;
				align-items: center;
				font-family: 'Arial Normal', 'Arial';
				font-size: 13px;
				background-color: #f5f5f5;
				cursor: pointer;
				.tip{
					height:19px;
					line-height: 19px;
				}
			}
		}
		.part{
			padding-right: 20px;
			.configuration{
				display: -webkit-flex;
				display: flex;
				-webkit-align-items: center;
				align-items: center;
				.configuration-tip{
					height: 15px;
					line-height: 15px;
					margin-right: 15px;
				}
				.configuration-add{
					width: 63px;
					height: 28px;
					line-height: 28px;
					display: -webkit-flex;
					display: flex;
					-webkit-align-items: center;
					align-items: center;
					border: 1px solid #5c9cf3;
					cursor: pointer;
					.add-icon{
						width: 14px;
						height: 14px;
						background: url(images/add.png) no-repeat center/100% 100%;
						margin: 0 5px;
					}
					.add-name{
						color: #5C9CF3;
					}
				}
			}
			.members{
				width: 100%;
				height:100%;
				margin-top: 20px;
				margin-bottom: 50px;
				.members-search {
					width: 30%;
					height: 36px;
					line-height: 36px;
					.iconfont {
						position: absolute;
						left: 0;
						top: 12px;
						width: 40px;
						height: 16px;
						line-height: normal;
						color: $mainColor;
						font-size: 16px;
						text-align: center;
						border-right: 1px solid #eee;
						z-index: 1;
					}
					/deep/ input {
						height: 36px;
						padding: 0 60px 0 55px;
						border-radius: 0;
					}
					.members-go {
						position: absolute;
						right: 0;
						top: 2px;
						width: 54px;
						height: 36px;
						background-image: url(./images/go.png);
						background-repeat: no-repeat;
						background-position: center;
						cursor: pointer;
					}
				}
				.members-content{
					.app__table__inner{
						margin-top: 20px;
						.app__table-item{
							.del{
								display: inline-block;
								width: 14px;
								height: 14px;
								background: url(images/del.png) no-repeat center/100% 100%;
								cursor: pointer;
							}
							.modify{
								display: inline-block;
								width: 15px;
								height: 15px;
								background: url(images/modify.png) no-repeat center/100% 100%;
								cursor: pointer;
							}
						}
					}
				}
				.members-footer {
					height: 50px;
					margin-top: 20px;
				}
			}
		}
		
		.main {
			padding: 20px;
            padding-bottom: 0;
			height: 66%;
			border: 1px solid #eeeeee;
			background: #fdfdfd;
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
		.dialog{
			.main{
				.part{
					width: 94%;
					height: 100%;
					margin-left: 3%;
					.members{
						.selected{
							font-size: 14px;
							font-weight: 700;
							margin-top: 10px;
						}
						.members-search{
							width: 40%;
						}
						.members-content{
							.app__table__inner{
								.app__table-item{
									.validate /deep/ input{
										border-color: red;
									}
									.checked{
										display: inline-block;
										width: 12px;
										height: 12px;
										border: 1px solid #999999;
										border-radius: 2px;
										cursor: pointer;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	.over-col{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.modify-dialog{
		.part{
			margin: 30px 0 20px 0;
			.col{
				margin-bottom: 10px;
				.form-item{
					padding-left: 130px!important; 
				}
			}
		}
	}
</style>
