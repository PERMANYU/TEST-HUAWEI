<template>
	<div class="attribute">
		<div class="app__top">
			<span class="app__top-left">属性配置</span>
		</div>
		<div class="app__table">
			<Row v-if="attrListData.length>0">
				<Col :span="7" :offset="1" v-for="(item,index) in attrListData" :key="index">
				<Row class="attrrow-header">
					<Col :span="14" :offset="1">
					<i class="show2"></i> {{item.attrName}}
					</Col>
			
				</Row>
				<Row v-if="item.offerAttrValues.length>0" v-for="(val,ind) in item.offerAttrValues" :key="ind" class="attrvalrow">
					<Col :span="1" :offset="1" class="attrvalcolline"></Col>
					<Col :span="22" class="attrvalcol"> {{val.attrValue}}
					<!--<span v-if="val.offerAttrId == item.offerAttrId" class="moren">默认</span>-->
					</Col>
				</Row>
				<Row v-if="!item.offerAttrValues" class="attrvalrow">
					<Col :span="1" :offset="1" class="attrvalcolline"></Col>
					<Col :span="22" class="attrvalcol"> {{item.defaultValue}}
					</Col>
				</Row>
				<Row class="attrvalrow" v-if="item.attrValueType ==='2000'">
					<Col :span="1" :offset="1" class="attrvalcolline"></Col>
				</Row>
				</Col>
			</Row>
			<Row v-if="!attrListData.length" class="app__data-none">
				<Col :span="24"><span>暂无数据!</span></Col>
			</Row>
		</div>


	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				attrValues: [],
				attrListData: [], // 属性配置列表数组
				iptAttrValue: "", // 输入型属性值
				
				
				actType: "ADD",
				offerAttrId: ""
			}
        },
        watch: {
			componentData(val){
				this.getAttrList();
			}
		},
		mounted() {
			this.getAttrList();
		},
		methods: {
			getAttrList(){
				this.$axios.get(this.$api.OfferGetList+'/'+this.componentData.offerId+'/offerAttr', {
					params: {
						statusCd:1000
					}
				}).then(res => {
					console.log(res,'属性配置')
					if(res.data.success == true) {
						this.attrListData = res.data.offerAttrs;
					} else {
						this.$message.error({ message: res.data.detail});
					}
				}).catch(error => {

				})
			},
			addAttribute() {
				this.actType = "ADD"
				this.iptAttrValue = ""
				this.$refs.addAttribute.show();
				this.getAttrView(1);
			},
		}
	}
</script>

<style scoped lang="scss">
	.attribute {
		width: 100%;
		.app__table {
			.attrrow-header {
				background-color: #eff7fd;
				border: solid 1px #d3e7f9;
				.col+.col {
					box-sizing: border-box;
					border-left: solid 1px #d3e7f9;
				}
			}
			.attrvalrow {
				margin-top: 10px;
				.attrvalcolline {
					margin-top: -25px;
					height: 50px;
					border-bottom: solid 1px #5c9cf3;
					border-left: dashed 1px #5c9cf3;
				}
				.attrvalcol {
					border: solid 1px #d3e7f9;
					text-indent: 10px;
					cursor: pointer;
					&:hover {
						background-color: #eff7fd;
					}
				}
				.col {
					text-align: left;
				}
			}
			.v-t-checkbox {
				text-align: center;
			}
			.span {
				color: $mainColor;
				padding: 0 5px;
				cursor: pointer;
			}
		}
	}
	
	i.show2 {
		display: inline-block;
		width: 10px;
		height: 10px;
		cursor: pointer;
		background: url("./images/bgsq.png") no-repeat;
		background-size: cover;
	}
</style>