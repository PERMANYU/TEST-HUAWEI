<template>
	<div class="info">
		<Scroll :isShowRight="true">
			<div class="basic-part">
				<div class="basic-info" ref="basicScroll">
					<div class="configuration-tip app__title ">
						<i class="iconfont icon-jibenxinxi"></i>
						<span class="configuration-word">基本信息</span>
					</div>
					<div class="main-box">
						<div class="require-info">
							<Row>
								<Form labelWidth="100px" labelAlign="left">
									<Col :span="8">
										<FormItem labelText="销售品组名称：" small>
											<span class="over-col" :title="basicInfo.offerGrpName">{{basicInfo.offerGrpName}}</span>
										</FormItem>
									</Col>
									<Col :span="7" :offset="1">
										<FormItem labelText="销售品组编码：" small>
											<span class="over-col">{{basicInfo.offerGrpNbr}}</span>
										</FormItem>
									</Col>
									<Col :span="7">
										<FormItem labelText="销售品组内成员关系: " small class="offerGroupType">
											<span>{{basicInfo.grpRelTypeName}}</span>
										</FormItem>
									</Col>
									<Col :span="8">
										<FormItem labelText="选择添加方式：" small>
											<span>{{basicInfo.grpTypeName}}</span>
										</FormItem>
									</Col>
									<Col :span="7" :offset="1" v-if="basicInfo.grpType == '1100'" class="catalog-location">
										<FormItem labelText="目录位置：" small labelAlign='left' labelWidth = '100px'>
											<span>{{basicInfo.catalogItemName}}</span>
										</FormItem>
									</Col>
									<Col :span="24">
										<FormItem labelText="描述：" small>
											<pre v-html="basicInfo.offerGrpDesc"></pre>
										</FormItem>
									</Col>	
								</Form>
							</Row>
						</div>
					</div>
				</div>
			</div>
		
			<div class="part">
				<div class="configuration">
						<div class="configuration-tip app__title ">
							<i class="iconfont icon-jibenxinxi"></i>
							<span class="configuration-word">配置销售品组</span>
						</div>
					</div>
					<div class="members">
						<div class="members-search">
							<i class="iconfont icon-sousuo1130"></i>
						<Input placeholder="请输入销售品内部名称或编码" v-model="offers.searchAddedVal"></Input>
						<span class="members-go" @click="searchAddedOffer()"></span>
					</div>
					<div class="members-content">
						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead">
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
						</Scroll>
					</div>
					<div class="members-footer" v-if="offerList.length>0">
						<Pagination :pageIndex="offerPageInfo.pageIndex" :pageSize="offerPageInfo.pageSize" :rowCount="offerPageInfo.rowCount" :perPages=5 @change="addedOfferPage">
						</Pagination>
					</div>
				</div>
			</div>

			<div class="part">
				<div class="configuration">
						<div class="configuration-tip app__title ">
							<i class="iconfont icon-jibenxinxi"></i>
							<span class="configuration-word">关联组关系</span>
						</div>
					</div>
					<div class="members">
						<div class="members-search">
							<i class="iconfont icon-sousuo1130"></i>
							<Input placeholder="请输入销售品组名称或编码"  v-model="group.searchAddedVal"></Input>
							<span class="members-go" @click="searchAddedRela()"></span>
					</div>
					<div class="members-content rel-style">
						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead">
							<Row class="app__table-thead">
								<Col :span="4">Z销售品组名称</Col>
								<Col :span="3">Z销售品组编码</Col>
								<Col :span="2">关系类型</Col>
								<Col :span="4">A销售品组名称</Col>
								<Col :span="3">A销售品组编码</Col>
								<Col :span="2">最大值</Col>
								<Col :span="2">最小值</Col>
								<Col :span="2">生效时间</Col>
								<Col :span="2">失效时间</Col>
							</Row>

							<Row :class="['app__table-item']" v-if="relationList.length>0" v-for="(item,index) in relationList" :key="index">
								<Col :span="4" v-bind:title="item.zOfferGrpName">{{item.zOfferGrpName}}</Col>
								<Col :span="3" v-bind:title="item.zOfferGrpNbr">{{item.zOfferGrpNbr}}</Col>
								<Col :span="2">{{item.relTypeName}}</Col>
								<Col :span="4" v-bind:title="item.aOfferGrpName">{{item.aOfferGrpName}}</Col>
								<Col :span="3" v-bind:title="item.aOfferGrpNbr">{{item.aOfferGrpNbr}}</Col>
								<Col :span="2">{{item.maxNum}}</Col>
								<Col :span="2">{{item.minNum}}</Col>
								<Col :span="2" v-bind:title="item.effDate|date">{{item.effDate|date}}</Col>
								<Col :span="2" v-bind:title="item.expDate|date">{{item.expDate|date}}</Col>
							</Row>
							<Row v-if="!relationList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</Scroll>
					</div>
					<div class="members-footer" v-if="relationList.length>0">
						<Pagination :pageIndex="group.addedPageInfo.pageIndex" :pageSize="group.addedPageInfo.pageSize" :rowCount="group.addedPageInfo.rowCount" :perPages=5 @change="addedRelaPage">
						</Pagination>
					</div>
				</div>
			</div>
		</Scroll>

		<div class="footer">
			<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
		</div>

		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script>
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				basicInfo: {
					offerGrpName: '',
					fferGrpNbr: '',
					grpRelTypeName: '',
					grpRelType: '',
					grpType: '',
					catalogItemName: ''
				},
				offerList: [],
				offers: {
					searchAddedVal: ''
				},
				offerPageInfo: {
					pageIndex: 1,
					pageSize: 5, 
					pageCount: 1,
					rowCount: 5 
				},
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
				pageInfo: {
					pageIndex: 1,
					pageSize: 5, 
					pageCount: 1,
					rowCount: 5 
				},
				group: {
					searchVal: '',
					addedPageInfo: {
						pageIndex: 1,
						pageSize: 5, 
						pageCount: 1,
						rowCount: 5
					}
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
				activatedData: null,
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
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
				}],
				notEffectMemberPath: this.$api.OfferGroupMember,//配置销售品组成员路径
				effectedMemberPath: this.$api.EffectedOfferGrpMember,//已生效销售品组成员路径
				notEffectRelaPath: this.$api.OfferGroupRel,//配置销售品关联组关系路径
				effectedRelaPath: this.$api.EffectedOfferGrpRela//已生效销售品关联组关系路径
			}
		},
		mounted() {
			this.initData()
		},
		methods: {
			initData() {
				//获取详情
				this.basicInfo = this.componentData
				for(let i = 0;i <  this.offerGroupTypeArray.length;i ++){
					if(this.basicInfo.grpRelType == this.offerGroupTypeArray[i].value){
						this.basicInfo.grpRelTypeName = this.offerGroupTypeArray[i].label
					}
				}
				if(this.basicInfo.grpType == '1000'){
					this.basicInfo.grpTypeName = '通过选择销售品添加'
				}else{
					this.basicInfo.grpTypeName = '通过选择目录添加'
				}
				if(this.componentData.statusCd == '1200'){
					this.initOffers(this.notEffectMemberPath)
					this.initRela(this.notEffectRelaPath)
				}else if(this.componentData.statusCd == '1000'){
					this.initOffers(this.notEffectMemberPath)
					this.initRela(this.notEffectRelaPath)
				}else{
					return
				}	
			},

			initOffers(memberPath){//获取销售品组已有销售品成员
				this.$axios.get(memberPath,{
					 params:{
						page: this.offerPageInfo.pageIndex,
						limit: this.offerPageInfo.pageSize,
						offerGrpId: this.componentData.offerGrpId,
						grpType: this.componentData.grpType,
						// offerName: this.offers.searchAddedVal
						offerInnerNbr: this.offers.searchAddedVal
					 }
				}).then(res => {
                    if (res.data.success) {
						if(this.componentData.grpType == '1000'){
							this.offerList = res.data.offerGrpMemberPage.content || []
							this.offerPageInfo.pageCount = Math.ceil(res.data.offerGrpMemberPage.total/this.offerPageInfo.pageSize)
							this.offerPageInfo.rowCount = res.data.offerGrpMemberPage.total
						}else{
							this.offerList = res.data.offerCatalogPage.content || []
							this.offerPageInfo.pageCount = Math.ceil(res.data.offerCatalogPage.total/this.offerPageInfo.pageSize)
							this.offerPageInfo.rowCount = res.data.offerCatalogPage.total
						}						
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
			initRela(relaPath){//获取销售品关联组关系
				this.$axios.get(relaPath,{
					 params:{
						page: this.group.addedPageInfo.pageIndex,
						limit: this.group.addedPageInfo.pageSize,
						offerGrpId: this.componentData.offerGrpId,
						offerGrpName: this.group.searchAddedVal
					 }
				}).then(res => {
                    if (res.data.success) {
						if(this.componentData.statusCd == '1200'){
							this.relationList = res.data.ordOfferGrpPage.content || []
							this.group.addedPageInfo.pageCount = Math.ceil(res.data.ordOfferGrpPage.total/this.group.addedPageInfo.pageSize)
							this.group.addedPageInfo.rowCount = res.data.ordOfferGrpPage.total
						}else if(this.componentData.statusCd == '1000'){
							this.relationList = res.data.ordOfferGrpPage.content || []
							this.group.addedPageInfo.pageCount = Math.ceil(res.data.ordOfferGrpPage.total/this.group.addedPageInfo.pageSize)
							this.group.addedPageInfo.rowCount = res.data.ordOfferGrpPage.total
						}
						
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
			searchAddedOffer(){//查找销售品组成员
				this.offerPageInfo.pageIndex = 1;
				if(this.componentData.statusCd == '1200'){
					this.initOffers(this.notEffectMemberPath)
				}else if(this.componentData.statusCd == '1000'){
					this.initOffers(this.notEffectMemberPath)
				}else{
					return
				}
			},
			searchAddedRela(){//查找销售品关联组关系
				this.group.addedPageInfo.pageIndex = 1;
				if(this.componentData.statusCd == '1200'){
					this.initRela(this.notEffectRelaPath)
				}else if(this.componentData.statusCd == '1000'){
					this.initRela(this.notEffectRelaPath)
				}else{
					return
				}
			},

			addedOfferPage(page){//销售品换页
				this.offerPageInfo.pageIndex = page;
				if(this.componentData.statusCd == '1200'){
					this.$nextTick(() => {
						this.initOffers(this.notEffectMemberPath)
					})
				}else if(this.componentData.statusCd == '1000'){
					this.$nextTick(() => {
						this.initOffers(this.notEffectMemberPath)
					})
				}else{
					return
				}
			},
			addedRelaPage(page){//关联组关系换页
				this.group.addedPageInfo.pageIndex = page;
				if(this.componentData.statusCd == '1200'){
					this.$nextTick(() => {
						this.initRela(this.notEffectRelaPath)
					})
				}else if(this.componentData.statusCd == '1000'){
					this.$nextTick(() => {
						this.initRela(this.notEffectRelaPath)
					})
				}else{
					return
				}
			},
			globalback() {
				this.$emit('componentView', 'list')
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
	.basic-part{
		margin-bottom: 50px;
		margin-top: 20px;
		.basic-info {
			padding: 0 20px;
			.main-box {
				padding-right: 20px;
				.require-info {
					width: 100%;
					padding: 20px;
					background: #fdfdfd;
					border: 1px solid #eeeeee;
				}
			}
		}
	}
	
	
	.configuration-tip{
		height: 15px;
		line-height: 15px;
		margin-right: 15px;
		margin-bottom: 20px;
	}
	.part{
		padding: 0 20px;
		.configuration{
			display: -webkit-flex;
			display: flex;
			-webkit-align-items: center;
			align-items: center;
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
						.form-item{
							padding-left: 0!important;
							min-height: 30;
							margin-top: 4px;
							.select{
								.select-dropdown{
									top: 0!important;
								}
							}
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
		
	.rel-style{
		.app__table__inner{
			.app__table-item > .col{
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
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
		z-index: 99;
	}
	.over-col{
		display: block;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>