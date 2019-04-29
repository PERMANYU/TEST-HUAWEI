<template>
	<div class="release">
		<Scroll :isShowRight="true" ref="scroll">
			<div class="fold" ref="basicFoldObj">
				<div class="fold-title" @click="objShowClick(basicObj)">
					<span class="fold-name fold-name-basic">发布上市</span>
					<!--<span class="fold-save" @click.stop="objSave(basicObj)">保存</span>-->
					<span :class="['fold-oc',basicObj.isShow ? 'fold-oc-s' :'' ]" ref="basicObjShow" @click="objShowClick(basicObj)">
                    </span>
				</div>

				<div class="fold-content" v-show="basicObj.isShow">
                    <div class="fold-read" v-if="basicObj.showScope == 'read'"></div>
					<component :is="currentView" :class="basicObj.showScope == 'read' ? 'active' : ''"  @componentView="changeView" :componentData="componentData" @saveStatus="saveStatus" ref="component">
					</component>
				</div>
			</div>
		</Scroll>
	</div>
</template>

<script>
	export default {
		name: 'release',
		props: {
			componentData: {},
            nodes:Array
		},
		data() {
			return {
				basicObj: {
					name: 'index',
					isShow: true,
                    showScope:'',
					items: [{
						name: '发布上市',
						componentName: 'index'
					}]
				},
				currentView: 'index',
				currentData: {},
				tabs: [{
					name: '发布上市',
					componentName: 'index'
				}],
				tab: '',
                nodeArr:{
                    '14002':'basicObj'
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
                    nodeTemp = activeItem ? this[this.nodeArr[activeItem.componentCode]] : this.basicObj;
                this.nodes.filter( nItem => {
                    this[this.nodeArr[nItem.componentCode]].showScope = nItem.showScope;
                })

                nodeTemp.isShow = true;
            }else{
                this.basicObj.isShow = true;
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
				return new Promise((resolve, reject) => {
					let component = this.$refs.component;
					try {
						if(typeof(eval(component.save)) == "function") {
                            if(this.basicObj.showScope == 'read') resolve(result == true);
							component.save(result => {
								resolve(result == true);
							});
						} else {
							resolve(true);
						}
					} catch(e) {
						resolve(true);
					}
				})
			},
			saveStatus(val) {
				this.$emit('saveStatus', val);
			},
			objShowClick(obj){
                obj.isShow = !obj.isShow;
                if(obj.items.length === 0){
                    obj.items = [...obj.items,...obj.inits];
                }else{
                    this.$nextTick( () => {
                        this.$refs.scroll.initScroll();
                    })
                }
            },
		},
		components: {
			index: () =>
				import('./group/index')
		}
	}
</script>
<style scoped lang="scss">
	.release{
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