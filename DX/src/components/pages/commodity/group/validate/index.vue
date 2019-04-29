<template>
	<div class="validate">
		<Scroll :isShowRight="true" ref="scroll">
			<div class="fold" ref="systemFoldObj">
				<div class="fold-title" @click="objShowClick(systemFoldObj)">
					<span class="fold-name fold-name-basic">系统测试</span>
					<span class="fold-save" @click.stop="objSave(systemFoldObj)"  v-if="systemFoldObj.showScope != 'read'">保存</span>
					<span :class="['fold-oc',systemFoldObj.isShow ? 'fold-oc-s' :'' ]" ref="systemFoldObjShow" @click.stop="objShowClick(systemFoldObj)">
                    </span>
				</div>

				<div class="fold-content" v-show="systemFoldObj.isShow">
					<div class="fold-read" v-if="systemFoldObj.showScope == 'read'"></div>
					<component :is="item.componentName" 
                        :class="systemFoldObj.showScope == 'read' ? 'active' : ''"
						@componentView="changeView" 
						:componentData="componentData" 
						@saveStatus="saveStatus" 
						:ref="'component-' + item.componentName" 
						v-for="(item,index) in systemFoldObj.items" :key="index">
					</component>
				</div>
			</div>
			
			<div class="fold" ref="businessFoldObj">
				<div class="fold-title" @click="objShowClick(businessFoldObj)">
					<span class="fold-name fold-name-basic">业务测试</span>
					<span class="fold-save" @click.stop="objSave(businessFoldObj)"  v-if="businessFoldObj.showScope != 'read'">保存</span>
					<span :class="['fold-oc',businessFoldObj.isShow ? 'fold-oc-s' :'' ]" ref="businessFoldObjShow" @click.stop="objShowClick(businessFoldObj)">
                    </span>
				</div>

				<div class="fold-content" v-show="businessFoldObj.isShow">
					<div class="fold-read" v-if="businessFoldObj.showScope == 'read'"></div>
					<component :is="item.componentName" 
                        :class="businessFoldObj.showScope == 'read' ? 'active' : ''"
						@componentView="changeView" 
						:componentData="componentData" 
						@saveStatus="saveStatus" 
						:ref="'component-' + item.componentName" 
						v-for="(item,index) in businessFoldObj.items" :key="index">
					</component>
				</div>
			</div>
		</Scroll>
	</div>
</template>

<script>
	export default {
		name: 'validate',
		props: {
			componentData: {},
            nodes:Array
		},
		data() {
			return {
				currentView: 'system',
				currentData: {},
				tab: '',
				systemFoldObj: {
					name: 'system',
					isShow: false,
                    showScope:'',
					items: [],
					inits:[{
						name: '系统测试',
						componentName: 'system'
					}]
				},
				businessFoldObj: {
					name: 'business',
					isShow: false,
                    showScope:'',
					items: [],
					inits:[{
						name: '业务测试',
						componentName: 'business'
					}]
				},
                allSaveResult: true,
                nodeArr:{
                    '08001':'systemFoldObj',
                    '09001':'businessFoldObj'
                }
			}
		},
		watch: {
			tab(val, old) {
				this.stepClick(val);
			}
		},
        mounted(){
            if(this.nodes && this.nodes.length > 0){
                let activeItem = this.nodes.find( nItem => nItem.active == 'true'),
                    nodeTemp = activeItem ? this[this.nodeArr[activeItem.componentCode]] : this.systemFoldObj;
                this.nodes.filter( nItem => {
                    this[this.nodeArr[nItem.componentCode]].showScope = nItem.showScope;
                })

                nodeTemp.isShow = true;
                nodeTemp.items = nodeTemp.inits;
            }else{
                this.systemFoldObj.isShow = true;
                this.systemFoldObj.items = this.systemFoldObj.inits;
            }
        },
		methods: {
			changeView(view, obj) {
				this.currentView = view;
				this.currentData = obj;
			},
			stepClick(val) {
				this.currentView = val.componentName;
			},
			save() {
				return new Promise(async (resolve, reject) => {
					let saveObjSaveArray = [];
                    this.allSaveResult = true;
                    [this.businessFoldObj].filter( item => {
                        if(item.showScope == 'read') return true;
                        saveObjSaveArray.push(this.objSave(item));
                        return true;
                    })
                    await Promise.all(saveObjSaveArray).then(values => {
                        resolve(values.filter( item => !item).length === 0);
                    });
				})
			},
			saveStatus(val) {
				this.$emit('saveStatus', val);
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
			objSave(obj) {
				return new Promise((resolve, reject) => {
                    if(obj.items.length === 0){
                        resolve(this.allSaveResult == true);
                    }
                    let resultLength = 0;
                    obj.items.map( (item) => {
                        let component = this.$refs[`component-${item.componentName}`][0];
                        try{
                            if(typeof(eval(component.save)) == "function"){
                                component.save( result => {
                                    resultLength ++;
                                    this.allSaveResult = this.allSaveResult  && result;
                                    if(obj.items.length === resultLength){
                                        resolve(this.allSaveResult == true);
                                    }
                                });
                            }else{
                                resultLength ++;
                            }
                        }catch(e){
                            resultLength ++;
                        }
                    })
                })

				// obj.items.map((item) => {
				// 	let component = this.$refs[`component-${item.componentName}`][0];
				// 	try {
				// 		if(typeof(eval(component.save)) == "function") {
				// 			this.$refs[`component-${item.componentName}`][0].save(result => {});
				// 		}
				// 	} catch(e) {
				// 		this.$message.success({message: '保存成功！'})
				// 	}
				// })
			}
		},
		components: {
			before: () =>
				import('./group/before'),
			business: () =>
				import('./group/business'),
			system: () =>
				import('./group/system')
		}
	}
</script>
<style scoped lang="scss">
	.validate {
		width: 100%;
		height: 100%;
		.fold {
			padding: 15px 0;
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
				}
				.fold-save {
					position: absolute;
					display: block;
					top: 15px;
					right: 65px;
					width: 70px;
					height: 30px;
					line-height: 30px;
					padding-left: 30px;
					border-radius: 4px;
					color: #fff;
					cursor: pointer;
					background-color: $mainColor;
					background-image: url(./images/bzan.png);
					background-repeat: no-repeat;
					background-position: 10px center;
					&:hover {
						opacity: .8;
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

				.fold-read{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #999;
                    opacity: .2;
                    z-index: 99;
                    pointer-events:none;
                }
                .active {
                    pointer-events:none; 
                }
			}
		}
	}
</style>