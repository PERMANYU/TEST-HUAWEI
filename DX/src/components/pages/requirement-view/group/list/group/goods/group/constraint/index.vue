<template>
	<div class="constraint">
			<div class="app__top">
				<span class="app__top-left">客户标签</span>
			</div>
			<div class="group">
				<div class="tag-box" v-for="(item,index) in laberRelsArr" :key="index">
                    <span>{{item.labelName}}</span>
                </div>
			</div>
            <div class="bottom">
                <Row v-show="laberRelsArr.length == 0" class="app__data-none">
                    <Col :span="24"><span>暂无数据</span></Col>
                </Row>
            </div>
			<div class="app__top">
				<span class="app__top-left">业务规则</span>
			</div>
			<div class="group">
				<div class="tag-box" v-for="(item,index) in businessData" :key="index">
                    <span>{{item.busiRuleName}}</span>
                </div>
			</div>
            <div class="bottom">
                <Row v-show="businessData.length == 0" class="app__data-none">
                    <Col :span="24"><span>暂无数据</span></Col>
                </Row>
            </div>
			<div class="app__top">
				<span class="app__top-left">客户约束</span>
			</div>
			<div class="app__table">
				<Row class="app__table-thead">
					<Col :span="6">客户ID</Col>
					<Col :span="6">客户名称</Col>
					<Col :span="6">客户类型</Col>
					<Col :span="6">客户子类型</Col>
				</Row>
				<Row :class="['app__table-item']" v-for="(item,index) in offerCustRestricts" :key="index">
					<Col :span="6">{{item.rstrObjId ? item.rstrObjId : '无'}}</Col>
					<Col :span="6">{{item.custName ? item.custName : '无'}}</Col>
					<Col :span="6">{{item.custType ? item.custType : '无'}}</Col>
					<Col :span="6">{{item.custSubType ? item.custSubType : '无'}}</Col>
				</Row>
				<Row v-show="offerCustRestricts.length == 0" class="app__data-none">
                    <Col :span="24"><span>暂无数据</span></Col>
                </Row>
			</div>
			<div class="b-title">
				<div class="app__top">
					<span class="app__top-left">资产约束</span>
				</div>
			</div>
			<div class="app__table">
				<Row class="app__table-thead">
					<Col :span="8">资产名称</Col>
					<Col :span="8">资产编码</Col>
					<Col :span="8">状态</Col>
				</Row>
				<Row :class="['app__table-item']" v-for="(item,index) in offerAssetsRestricts" :key="index">
					<Col :span="8">{{item.assetsName ? item.assetsName : '无'}}</Col>
					<Col :span="8">{{item.assetsLong ? item.assetsLong : '无'}}</Col>
					<Col :span="8">{{item.statusCd ? item.statusCd : '无'}}</Col>
				</Row>
				<Row v-show="offerAssetsRestricts.length == 0" class="app__data-none">
                    <Col :span="24"><span>暂无数据</span></Col>
                </Row>
			</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props:{
            componentData:{}
        },
		data() {
			return {
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				laberRelsArr: [],
				businessData: [],
				offerId: '300144290',
				offerCustRestricts: [],
				offerAssetsRestricts: [],
				tipSelData: {}
			}
        },
        watch: {
            componentData(val) {
                this.getData();
                this.getObjectLabelRel();
                this.getobjectBusRel();
            }
        },
		mounted() {
			this.getData();
			this.getObjectLabelRel();
			this.getobjectBusRel();
		},
		methods: {
			getData() {
				this.$axios.get(this.$api.OfferGetList+'/'+this.componentData.offerId+'/offerRestricts', {
					params: {

					}
				}).then(res => {
					if(res.data.success == true) {
						console.log(res,'约束')
						this.offerCustRestricts = res.data.offerCustRestricts;
						this.offerAssetsRestricts = res.data.offerAssetsRestricts;
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {

				})
			},
			getObjectLabelRel() {
				this.$axios.get(this.$api.OfferGetList+'/'+this.componentData.offerId+'/objectLabelRel', {
					params: {
						labelType: 10
					}
				}).then(res => {
					if(res.data.success == true) {
						console.log(res,'客户标签')
						this.laberRelsArr = res.data.labelResList;
						/*for(let ele of this.laberRelsArr) {
							for(let value of ele.labelValues) {
								if(ele.labelValueId == value.labelValueId) {
									ele.valueName = value.valueName
								}
							}
						}*/
					} else {
						this.$message.error({ message: res.data.msg });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.msg})
				})
			},
			// 业务规则配置列表查询
            getobjectBusRel() {
                this.$axios.get(this.$api.replace(this.$api.BusinessRule,['{offerId}'],[this.componentData.offerId])
                ).then((res) => {
                    if(res.data.success){
                        this.businessData = res.data.ordOfferRuleRelList.content;
                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            }
		}
	}
</script>

<style scoped lang="scss">
	.constraint {
		width: 100%;
		.group {
			.col {
				background: #eff6fc;
				margin-right: 10px;
				margin-bottom: 10px;
				padding-left: 10px;
				color: $mainColor;
				.span {
					display: block;
					width: 8px;
					height: 8px;
					position: absolute;
					right: 10px;
					top: 18px;
					cursor: pointer;
				}
			}
		}

		.tag-box {
		    display: inline-block;
		    padding: 10px;
		    margin: 10px;
		    border: solid 1px #d5e8f9;
		    background-color: #eff7fd;
		    color: #5c9cf3;
		    font-size: 12px;
		}	
		.app__table {
			.span {
				color: $mainColor;
				padding: 0 5px;
				cursor: pointer;
			}
		}
		.b-title {
			margin-top: 20px;
		}
	}
</style>