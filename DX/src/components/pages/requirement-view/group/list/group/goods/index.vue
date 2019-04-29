<template>
	<div class="goods">
		<Scroll :isShowRight="true" ref="scroll" @hightMove="hightMove" @bottomLoad="bottomLoad">
			<div class="fold" ref="basicFoldObj">
				<div class="fold-title" @click.stop="objShowClick(basicObj)">
					<span class="fold-name fold-name-basic">销售品基本信息</span>
					<span :class="['fold-oc',basicObj.isShow ? 'fold-oc-s' :'' ]" ref="basicObjShow" @click.stop="objShowClick(basicObj)">
                    </span>
				</div>
				<div :class="['fold-content']" @click.stop="basicFoldObjClick" v-show="basicObj.isShow">
					<component :is="item.componentName" @componentView="changeView" @saveStatus="saveStatus" @mounted="componentMounted" @commodityTypeChange="commodityTypeChange" :componentData="componentData" :ref="'component-' + item.componentName" :id="'goods-' + item.componentName" v-show="item.isShow" v-for="(item,index) in basicObj.items" :key="index"></component>
				</div>

			</div>
			<div class="fold" ref="pricesFoldObj">
				<div class="fold-title" @click.stop="objShowClick(pricesObj)">
					<span class="fold-name fold-name-prices">定价信息</span>
					<span :class="['fold-oc',pricesObj.isShow ? 'fold-oc-s' :'' ]" ref="pricesObjShow" @click.stop="objShowClick(pricesObj)">
                    </span>
				</div>
				<div class="fold-content" v-show="pricesObj.isShow">
					<component :is="item.componentName" @componentView="changeView" :componentData="componentData" @saveStatus="saveStatus" @mounted="componentMounted" :ref="'component-' + item.componentName" :id="'goods-' + item.componentName" v-show="item.isShow" v-for="(item,index) in pricesObj.items" :key="index"></component>
				</div>
			</div>
			<div class="fold" ref="acceptFoldObj">
				<div class="fold-title" @click.stop="objShowClick(acceptObj)">
					<span class="fold-name fold-name-accept">受理信息</span>
					<span :class="['fold-oc',acceptObj.isShow ? 'fold-oc-s' :'' ]" ref="acceptObjShow" @click.stop="objShowClick(acceptObj)">
                    </span>
				</div>
				<div class="fold-content" v-show="acceptObj.isShow">
					<component :is="item.componentName" @componentView="changeView" :componentData="componentData" @saveStatus="saveStatus" @mounted="componentMounted" :ref="'component-' + item.componentName" :id="'goods-' + item.componentName" v-show="item.isShow" v-for="(item,index) in acceptObj.items" :key="index"></component>
				</div>
			</div>
			<div class="fold" ref="estimateFoldObj">
				<div class="fold-title" @click.stop="objShowClick(estimateObj)">
					<span class="fold-name fold-name-estimate">毛利预估</span>
					<span :class="['fold-oc',estimateObj.isShow ? 'fold-oc-s' :'' ]" ref="estimateObjShow" @click.stop="objShowClick(estimateObj)">
                    </span>
				</div>
				<div class="fold-content" v-show="estimateObj.isShow">
					<component :is="item.componentName" @componentView="changeView" :componentData="componentData" @saveStatus="saveStatus" @mounted="componentMounted" :ref="'component-' + item.componentName" :id="'goods-' + item.componentName" v-show="item.isShow" v-for="(item,index) in estimateObj.items" :key="index"></component>
				</div>
			</div>
			<div class="fold" ref="constraintFoldObj">
				<div class="fold-title" @click.stop="objShowClick(constraintObj)">
					<span class="fold-name fold-name-estimate">配置目标客户</span>
					<span :class="['fold-oc',constraintObj.isShow ? 'fold-oc-s' :'' ]" ref="constraintObjShow" @click.stop="objShowClick(constraintObj)">
                    </span>
				</div>
				<div class="fold-content" v-show="constraintObj.isShow">
					<component :is="item.componentName" @componentView="changeView" :componentData="componentData" @saveStatus="saveStatus" @mounted="componentMounted" :ref="'component-' + item.componentName" :id="'goods-' + item.componentName" v-for="(item,index) in constraintObj.items" :key="index"></component>
				</div>
			</div>
			<div class="fold" ref="channelFoldObj">
				<div class="fold-title" @click.stop="objShowClick(channelObj)">
					<span class="fold-name fold-name-estimate">配置销售渠道</span>
					<span :class="['fold-oc',channelObj.isShow ? 'fold-oc-s' :'' ]" ref="channelObjShow" @click.stop="objShowClick(channelObj)">
                    </span>
				</div>
				<div class="fold-content" v-show="channelObj.isShow">
					<component :is="item.componentName" @componentView="changeView" :componentData="componentData" @saveStatus="saveStatus" @mounted="componentMounted" :ref="'component-' + item.componentName" :id="'goods-' + item.componentName" v-for="(item,index) in channelObj.items" :key="index"></component>
				</div>
			</div>
			<div class="fold" ref="saleselFoldObj">
				<div class="fold-title" @click.stop="objShowClick(saleselObj)">
					<span class="fold-name fold-name-estimate">配置促销资源</span>
					<span :class="['fold-oc',saleselObj.isShow ? 'fold-oc-s' :'' ]" ref="saleselObjShow" @click.stop="objShowClick(saleselObj)">
                    </span>
				</div>
				<div class="fold-content" v-show="saleselObj.isShow">
					<component :is="item.componentName" @componentView="changeView" :componentData="componentData" @saveStatus="saveStatus" @mounted="componentMounted" :ref="'component-' + item.componentName" :id="'goods-' + item.componentName" v-for="(item,index) in saleselObj.items" :key="index"></component>
				</div>
			</div>
			<div class="fold" ref="customerFoldObj">
				<div class="fold-title" @click.stop="objShowClick(customerObj)">
					<span class="fold-name fold-name-estimate">配置客户服务</span>
					<span :class="['fold-oc',customerObj.isShow ? 'fold-oc-s' :'' ]" ref="customerObjShow" @click.stop="objShowClick(customerObj)">
                    </span>
				</div>
				<div class="fold-content" v-show="customerObj.isShow">
					<component :is="item.componentName" @componentView="changeView" :componentData="componentData" @saveStatus="saveStatus" @mounted="componentMounted" :ref="'component-' + item.componentName" :id="'goods-' + item.componentName" v-for="(item,index) in customerObj.items" :key="index"></component>
				</div>
			</div>
			<div class="fold" ref="validateFoldObj">
				<div class="fold-title" @click.stop="objShowClick(validateObj)">
					<span class="fold-name fold-name-estimate">测试验证</span>
					<span :class="['fold-oc',validateObj.isShow ? 'fold-oc-s' :'' ]" ref="validateObjShow" @click.stop="objShowClick(validateObj)">
                    </span>
				</div>
				<div class="fold-content" v-show="validateObj.isShow">
					<component :is="item.componentName" @componentView="changeView" :componentData="componentData" @saveStatus="saveStatus" @mounted="componentMounted" :ref="'component-' + item.componentName" :id="'goods-' + item.componentName" v-for="(item,index) in validateObj.items" :key="index"></component>
				</div>
			</div>
			<div class="fold" ref="listedFoldObj">
				<div class="fold-title" @click.stop="objShowClick(listedObj)">
					<span class="fold-name fold-name-estimate">上市发布</span>
					<span :class="['fold-oc',listedObj.isShow ? 'fold-oc-s' :'' ]" ref="listedObjShow" @click.stop="objShowClick(listedObj)">
                    </span>
				</div>
				<div class="fold-content" v-show="listedObj.isShow">
					<component :is="item.componentName" @componentView="changeView" :componentData="componentData" @saveStatus="saveStatus" @mounted="componentMounted" :ref="'component-' + item.componentName" :id="'goods-' + item.componentName" v-for="(item,index) in listedObj.items" :key="index"></component>
				</div>
			</div>
		</Scroll>
	</div>

</template>

<script>
	export default {
		name: 'goods',
		props: {
			componentData: {}
		},
		data() {
			return {
				currentView: 'basic',
				currentData: {},
				isLoading: false,
				basicObj: {
					name: 'basic',
					isShow: true,
					items: [{
						name: '基本信息',
						componentName: 'basic',
						isShow: true
					}, {
						name: '构成信息',
						componentName: 'constitute',
						isShow: false
					},{
						name: '关联关系',
						componentName: 'relation',
						isShow: true
					}, {
						name: '关联销售品组关系',
						componentName: 'sales',
						isShow: true
					}, {
						name: '组合销售品',
						componentName: 'share',
						isShow: false
					}, {
						name: '关联包',
						componentName: 'income',
						isShow: false
					}, {
						name: '销售品标签',
						componentName: 'salesLabel',
						isShow: true
					}, {
						name: '属性配置',
						componentName: 'attribute',
						isShow: true
					}]
				},
				basicInit: [],
				pricesObj: {
					name: 'prices',
					isShow: false,
					items: [],
					inits: [{
						name: '资费定价',
						componentName: 'prices',
						isShow: true
					}, {
						name: '促销规则',
						componentName: 'ware',
						isShow: false
					}]
				},
				acceptObj: {
					name: 'accept',
					isShow: false,
					items: [],
					inits: [{
						name: '受理规则',
						componentName: 'accept',
						isShow: true
					}, {
						name: '业务登记单',
						componentName: 'register',
						isShow: true
					}]
				},
				estimateObj: {
					name: 'estimate',
					isShow: false,
					items: [],
					inits: [{
						name: '毛利预估',
						componentName: 'estimate',
						isShow: true
					}]
				},
				constraintObj: {
					name: 'constraint',
					isShow: false,
					items: [],
					inits: [{
						name: '配置目标客户',
						componentName: 'constraint'
					}]
				},
				channelObj: {
					name: 'channel',
					isShow: false,
					items: [],
					inits: [{
						name: '配置销售渠道',
						componentName: 'channel'
					}]
				},
				saleselObj: {
					name: 'salesel',
					isShow: false,
					items: [],
					inits: [{
						name: '配置促销资源',
						componentName: 'salesel'
					}]
				},
				customerObj: {
					name: 'customer',
					isShow: false,
					items: [],
					inits: [{
						name: '配置客户服务',
						componentName: 'customer'
					}]
				},
				validateObj: {
					name: 'validate',
					isShow: false,
					items: [],
					inits: [{
						name: '测试验证',
						componentName: 'validate'
					}]
				},
				listedObj: {
					name: 'listed',
					isShow: false,
					items: [],
					inits: [{
						name: '上市发布',
						componentName: 'listed'
					}]
				},

				showTabs: [{
					name: '基本信息',
					componentName: 'basic',
					top: 0
				}],
				tabs: [{
					name: '基本信息',
					top: 0
				}, {
					name: '定价信息',
					top: 0
				}, {
					name: '受理信息',
					top: 0
				}, {
					name: '毛利预估',
					top: 0
				}],
				tab: '',
				componentHeight: -1,
				rightMenuValue: 'basicFoldObj',
				basicObjStyle: {
					height: '0',
					overflow: 'hidden'
				},
				allSaveResult: true
			}
		},
		mounted() {
			//临时验证三个用户权限 start
			let goodsMenu = this.$user.getInfo().goodsMenu;
			if(goodsMenu) {
				this.basicObj.isShow = false;
				this.pricesObj = goodsMenu.pricesObj;
			}

			//临时验证三个用户权限 end
		},
		methods: {
			changeView(view, obj) {
				this.currentView = view;
				this.currentData = obj;
			},
			saveStatus(val) {
				this.$emit('saveStatus', val);
			},
			hightMove(val) {
				let foldArray = ['basicFoldObj', 'pricesFoldObj', 'acceptFoldObj', 'estimateFoldObj', 'constraintFoldObj', 'channelFoldObj', 'saleselFoldObj', 'customerFoldObj', 'validateFoldObj', 'listedFoldObj'],
					elRect = this.$el.getBoundingClientRect();

				//this.$refs.rightMenuRef.scrollMove();

				for(let i = 0; i < foldArray.length; i++) {
					let item = foldArray[i];
					let blockRect = this.$refs[item].getBoundingClientRect();
					if(blockRect.top - elRect.top + blockRect.height > elRect.height / 2) {
						this.rightMenuValue = item;
						return;
					}
				}

			},
			componentMounted(component) {
				this.$refs.scroll.initScroll();
			},
			objShowClick(obj) {
				obj.isShow = !obj.isShow;

				if(obj.items.length === 0) {
					obj.items = [...obj.items, ...obj.inits];
				} else {
					this.$nextTick(() => {
						this.$refs.scroll.initScroll();
					})
				}
			},
			bottomLoad() {
// 				let sObjArray = [this.pricesObj, this.acceptObj, this.estimateObj, this.constraintObj, this.channelObj, this.saleselObj, this.customerObj, this.validateObj, this.listedObj].filter(item => !item.isShow);
// 				if(sObjArray.length === 0) return;
// 				this.$refs[`${sObjArray[0].name}ObjShow`].click();
			},
			rightMenuInput(val) {
				//console.log('rightMenuInput',val)
				let blockRect = this.$refs[val].getBoundingClientRect(),
					elRect = this.$el.getBoundingClientRect(),
					scrollTop = this.$refs.scroll.$refs.content.scrollTop,
					newTop = blockRect.top + scrollTop - elRect.top;

				this.$refs.scroll.setHeightScrollTop(newTop);
				this.rightMenuValue = val;
			},
			basicFoldObjClick() {
				this.basicObjStyle.height = 'auto';
				this.basicObjStyle.overflow = 'visible';

			},

			commodityTypeChange(val) {
				//销售品类型切换，组件显示控制
				let chageArray = {
						"10": "1001", //10 销售品
						"30": "1002", //30 组合销售品
						"40": "1001", //40 可选包
						"50": "1004", //50 促销
						"60": "1003", //60 关联包
						"70": "1001" //70 加装包
					},
					noneArray = {
						'1001': ['share', 'income', 'ware'], //1001 不显示组件share，income，ware
						'1002': ['constitute', 'income', 'ware'], //1002 不显示组件constitute，income，ware
						'1003': ['share', 'ware'], //1003 不显示组件share，ware
						'1004': ['share', 'income'] //1004 不显示组件share，income
					},
					noneObj = noneArray[chageArray[val]],
					objArray = [this.basicObj, this.pricesObj, this.acceptObj, this.estimateObj];
				objArray.filter(objItem => {
					objItem.items.filter(cItem => {
                        if(noneObj != undefined){
    						if(noneObj.includes(cItem.componentName)) {
    							cItem.isShow = false
    							return true;
    						}
                        }
						cItem.isShow = true;
					})
				})

			},

		},
		components: {
			accept: () =>
				import('./group/accept'),
			attribute: () =>
				import('./group/attribute'),
			basic: () =>
				import('./group/basic'),
			constitute: () =>
				import('./group/constitute'),
			income: () =>
				import('./group/income'),
			salesLabel: () =>
				import('./group/sales-label'),
			prices: () =>
				import('./group/prices'),
			register: () =>
				import('./group/register'),
			relation: () =>
				import('./group/relation'),
			sales: () =>
				import('./group/sales'),
			share: () =>
				import('./group/share'),
			ware: () =>
				import('./group/ware'),
			estimate: () =>
				import('./group/estimate'),
			constraint: () =>
				import('./group/constraint'),
			channel: () =>
				import('./group/channel'),
			salesel: () =>
				import('./group/salesel'),
			customer: () =>
				import('./group/customer'),
			validate: () =>
				import('./group/validate'),
			listed: () =>
				import('./group/listed'),

		}
	}
</script>
<style scoped lang="scss">
	.goods {
		width: 100%;
		height: 100%;
		z-index: 1;
		overflow: hidden;
		.step-box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 40px;
			line-height: 40px;
		}
		.fold {
			margin-top: 15px;
			.fold-title {
				width: 100%;
				height: 60px;
				background: linear-gradient(#fff, #f1f4ff);
				border-width: 2px 1px 1px;
				border-style: solid;
				border-color: #5c9cf3 #f5f5f5 #f5f5f5;
				cursor: pointer;
				.fold-name {
					position: absolute;
					display: block;
					top: 20px;
					left: 20px;
					height: 20px;
					line-height: 20px;
					padding-left: 30px;
					color: #497cc1;
					background-repeat: no-repeat;
					background-position: left center;
					&.fold-name-basic {
						background-image: url(./images/xspjbxx.png);
					}
					&.fold-name-prices {
						background-image: url(./images/zfcx.png);
					}
					&.fold-name-accept {
						background-image: url(./images/slywdjd.png);
					}
					&.fold-name-estimate {
						background-image: url(./images/mlyg.png);
					}
				}
				.fold-oc {
					position: absolute;
					display: block;
					top: 21px;
					right: 25px;
					width: 18px;
					height: 11px;
					background-image: url(./images/yjzkzt.png);
					background-repeat: no-repeat;
					background-position: center;
					transition: all .3s ease;
					cursor: pointer;
					&.fold-oc-s {
						transform: rotate(-180deg);
					}
				}
			}
			.fold-content {
				width: 100%;
				padding: 20px;
				transition: all .3s ease;
				.fold-more {
					width: 100%;
					height: 50px;
					line-height: 45px;
					text-align: center;
					cursor: pointer;
					border-top: 1px solid #f5f5f5;
					background: linear-gradient(#fff, #f1f4ff);
					span {
						display: inline-block;
						padding-right: 30px;
						&:after {
							content: '';
							position: absolute;
							display: block;
							top: 14px;
							right: 0;
							width: 18px;
							height: 11px;
							background-image: url(./images/yjzkzt.png);
							background-repeat: no-repeat;
							background-position: right center;
							animation: moremove 1s infinite;
							@keyframes moremove {
								0% {
									top: 14px;
								}
								50% {
									top: 18px;
								}
								100% {
									top: 14px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>