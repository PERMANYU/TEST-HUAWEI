<template>
	<div :class="['tree',isStart ? 'tree-start' : '']">
		<div class="c-line" ref="cLine"></div>
		<div class="r-line" ref="rLine"></div>
		<Row>
			<Col :span="keyItem.span"
				:class="[keyIndex === 0 ? 'first-col' : '']"
				:style="keyIndex === 0 ? firstColStyle : ''"
				v-for="(keyItem,keyIndex) in keys"
				:key="keyIndex">
				<span @click.stop="plugClick()" :class="['first',curLevel > 6 ? 'first-7' : 'first-'+curLevel,isActive() ? 'active' : '']"
					v-if="keyIndex === 0"
					@click="firstClick()">
					{{folder[keyItem.key]}}
					 <span :class="['plug',treeSubShow ? 'close' : 'open']"
						@click.stop="plugClick()"
						v-if="folder[childrenStr] && folder[childrenStr].length > 0">
					</span>
				</span>
				<span v-else>
					{{folder[keyItem.key] | getLocalTime}}
				</span>

			</Col>

			<Col :span="operation.span"
                v-if="operation.list">
				<span class="operation"
                    v-if="isOperationShow()"
					v-for="(oItem,oIndex) in operation.list"
                    :key="oIndex"
					@click.stop="operationClick(oItem)">
					{{oItem.label}}
				</span>
			</Col>
		</Row>

		<TreeSub v-if="treeSubShow"
			:value="value"
			:children="folder[childrenStr]"
			:own="folder"
			:childrenStr="childrenStr"
			:levelStr="levelStr"
			:keys="keys"
			:initLevel="initLevel"
			:curLevel="curLevel + 1"
			:operation="operation"
			:defaultObj="defaultObj"
			:selLevel="selLevel"
			:mainTree="tree"/>
	</div>

</template>
<script>
	export default {
		name: "TreeOthers",
		props:{
			value: {},
			folder:{//显示对象
				type: Object,
				default: {}
			},
			keys:{//需要显示的列
				type: Array,
				default: function(){
					return []
				}
				// {
				// 	key:'xxx',
				// 	span:'' 1-24
				// }
			},
			childrenStr:{//子级字段名称
				type: String,
				default: 'children'
			},
			levelStr:{//层级字段名称
				type: String,
				default: 'level'
			},
			initLevel:{//初始层级
				type:Number,
				default: 1
			},
			curLevel:{//当前层级
				type:Number,
				default:1
			},
			operation:{//操作对象
				type:Object,
				default: function(){
					return {}
				}
				// {
				// 	span: '' 1-24,
				//	level:[], 需要显示操作的层级列表
				//	after:null, Number,之后层级都显示
				// 	list:[{
				// 		label: 'xxx',
				// 		key: 'xxx'
				// 	}]
				// }
			},
			defaultObj:{
				type:Object,
				default: function(){
					return {}
				}
				// {
				// 	key:'xx', //默认选中的唯一标识名称
				// 	values: ['xx','xx'] || 'xx' //默认选中的唯一标识数组或对象
				// }
			},
			isStart:{//是否初始第一层级
				type: Boolean,
				default:true
			},
			parent:{//父层级数据对象
				type: Object,
				default: null
			},
			selLevel:{//可选择之后的层级
				type:Number,
				default:1
			},
			mainTree:null
		},
		data() {
			return {
				isTree: true,
                treeSubShow: false
			}
		},
		beforeCreate: function () {
			this.$options.components.TreeSub = require('./sub.vue').default
		},
		computed:{
			folderLevel(){
				return this.curLevel - this.initLevel;
			},
			firstColStyle(){
				return {
					paddingLeft: `${this.folderLevel * 30 + 5}px`
				}
			},
			tree(){
				return this.mainTree == null ? this : this.mainTree;
			}
		},
		mounted(){
			if(this.curLevel == 1){
				this.treeSubShow = false;
			}

			this.initLine();
		},
		methods:{
			plugClick(){
				this.treeSubShow = !this.treeSubShow;

				let obj = {
					data: this.folder,
					parent: this.parent,
					isOpen: this.treeSubShow
				}

				this.adjustLine();

				this.$nextTick( () => {
					this.tree.$emit('plugClick',obj);
				})
			},
			isOperationShow(){
                let operationLevel;
				if(this.curLevel >= this.operation.after){
					return true;
				}

				if(this.operation.level && this.operation.level.length > 0){
					operationLevel = this.operation.level;
				}else{
					return false;
				}

				if(operationLevel.indexOf(9999) >= 0){
					return true;
				}

                return operationLevel.indexOf(this.curLevel) >= 0;
			},
			operationClick(item){
				let obj = {
					data: this.folder,
					parent: this.parent,
                    item: item,
                    currentLevel: this.curLevel
				}

				this.tree.$emit('operationClick',obj);
			},
			initLine(){
				if(this.isStart) return;
				if(!this.$parent.children) return;
				let treeHeight = 40;
				let paddingLeft = 30;
				let last = this.$parent.children[this.$parent.children.length - 1];

				if(last == this.folder){
					this.$refs.rLine.style.height = `${treeHeight / 2}px`;
					this.$refs.rLine.style.left = `${this.folderLevel * paddingLeft - 20}px`;
					this.$refs.cLine.style.left = `${this.folderLevel * paddingLeft - 20}px`;
				}else{
					this.$refs.rLine.style.height = `${treeHeight}px`;
					this.$refs.rLine.style.left = `${this.folderLevel * paddingLeft - 20}px`;
					this.$refs.cLine.style.left = `${this.folderLevel * paddingLeft - 20}px`;
				}
			},
			adjustLine(allCount = 0){
				if(this.isStart) return;
				let last = this.$parent.children[this.$parent.children.length - 1];
				let treeHeight = 40;
				let paddingLeft = 30;
				let children = this.folder[this.childrenStr];

				if(!children) return;

				if(last == this.folder){
					this.$parent.$parent.adjustLine(this.treeSubShow ? children.length + allCount : 0);
					return;
				}

				if(this.treeSubShow){
					this.$refs.rLine.style.height = `${(children.length + allCount + 1) * treeHeight}px`;
					this.$refs.rLine.style.left = `${this.folderLevel * paddingLeft - 20}px`;
					this.$refs.cLine.style.left = `${this.folderLevel * paddingLeft - 20}px`;
					this.$parent.$parent.adjustLine(children.length + allCount);
				}else{
					this.$refs.rLine.style.height = `${treeHeight}px`;
					this.$refs.rLine.style.left = `${this.folderLevel * paddingLeft - 20}px`;
					this.$refs.cLine.style.left = `${this.folderLevel * paddingLeft - 20}px`;
					this.$parent.$parent.adjustLine(0);
				}
			},
			firstClick(){

				//可选中层级是9999 并且该层级存在子节点 不可以选中
				if(this.selLevel === 9999 && this.folder[this.childrenStr] && this.folder[this.childrenStr].length > 0) return;

				//根据可选层级判断是否可以选中
				if(this.selLevel !== 9999 && this.curLevel < this.selLevel) return;

				this.tree.$emit('click',this.folder);

				if(this.defaultObj.key){
					if(Object.prototype.toString.call(this.defaultObj.values) === '[object Array]'){
						let tempDefault = this.defaultObj.values.find( defaultObjItem => defaultObjItem == this.folder[this.defaultObj.key]),
							tempDefaultVlaues = [...this.defaultObj.values];
						if(tempDefault){
							tempDefaultVlaues = tempDefaultVlaues.filter( defaultObjItem => defaultObjItem != this.folder[this.defaultObj.key]);
							this.tree.$emit('clearClick',this.folder);
						}else{
							tempDefaultVlaues.push(this.folder[this.defaultObj.key]);
							this.tree.$emit('selClick',this.folder);
						}
						this.tree.$emit('change',tempDefaultVlaues);
					}else{
						this.tree.$emit('selClick',this.folder);
						this.tree.$emit('change',this.folder[this.defaultObj.key]);
					}
					
				}

				if(Object.prototype.toString.call(this.value) === '[object Array]'){
					let tempEmitArray = [...this.value];
					for(let i = 0; i < tempEmitArray.length; i++){
						if(this.$utils.isEqual(tempEmitArray[i],this.folder)){
							tempEmitArray.splice(i,1);
							this.tree.$emit('input',tempEmitArray);
							return;
						}
					}

					tempEmitArray.push(this.folder);
					this.tree.$emit('input',tempEmitArray);
					return;
				}

				this.tree.$emit('input',this.folder);
			},
			isActive(){
				if(this.defaultObj.key){
					if(Object.prototype.toString.call(this.defaultObj.values) === '[object Array]'){
						for(let i = 0; i < this.defaultObj.values.length; i++){
							if(this.defaultObj.values[i] == this.folder[this.defaultObj.key]){
								return true;
							}
						}
					}else{
						return this.defaultObj.values == this.folder[this.defaultObj.key];
					}
					
				}

				if(Object.prototype.toString.call(this.value) === '[object Array]'){
					let tempEmitArray = [...this.value];
					for(let i = 0; i < tempEmitArray.length; i++){
						if(this.$utils.isEqual(tempEmitArray[i],this.folder)){
							return true;
						}
					}
				}
				return this.$utils.isEqual(this.value,this.folder);
			}
		}
	}
</script>
<style scoped lang="scss">
	.tree{

		&.tree-start{
			>.r-line{
				display: none;
			}

			>.c-line{
				display: none;
			}
		}

		.r-line{
			position: absolute;
			top: 0;
			left: 10px;
			width: 0;
			height: 0;
			border-width: 0 0 0 1px;
			border-style: dashed;
			border-color: #5a8af2;
			z-index: 1;
		}

		.c-line{
			position: absolute;
			top: 20px;
			left: 0;
			width: 20px;
			height: 0;
			border-width: 0 0 1px 0;
			border-style: dashed;
			border-color: #5a8af2;
			z-index: 1;
		}

		.first-col{
			text-align: left;
		}

		.first{
			display: inline-block;
			height: 30px;
			line-height: 30px;
			cursor: pointer;

			&:before{
				content: '';
				position: absolute;
				display: block;
				left: -8px;
				top: calc(50% - 2px);
				width: 5px;
				height: 5px;
				background-color: #5a8af2;
				border-radius: 50%;
			}

			&:hover,&.active{
				.plug{
					&.open{
						background-image: url(./../images/open_g.png);
					}

					&.close{
						background-image: url(./../images/close_g.png);
					}
				}
			}

			.plug{
				position: absolute;
				display: block;
				width: 14px;
				height: 100%;
				top: 0;
				right: -7px;

				&.open{
					background-image: url(./../images/open.png);
					background-repeat: no-repeat;
					background-position: center;
				}

				&.close{
					background-image: url(./../images/close.png);
					background-repeat: no-repeat;
					background-position: center;
				}
			}

			&.first-1{
				font-size: 14px;
				color: #5a8af2;
				padding: 0 25px 0 25px;
				background-image: url(./../images/first.png);
				background-repeat: no-repeat;
				background-position: center left;

				.open{
					display: none;
				}

				&:hover,&.active{
					color: #90cf84;
				}

				.close{
					display: none;
				}

				&:before{
					display: none;
				}

				&.active:after{
					content: "";
					position: absolute;
					right: 5px;
					width: 12px;
					height: 100%;
					background: url(../images/select_blue.png) no-repeat center;
				}
			}

			&.first-2{
				background-color: #5a8af2;
				color: #fff;
				border-radius: 4px;
				padding: 0 25px 0 10px;

				&:hover,&.active{
					background-color: #90cf84;
				}

				&.active:after{
					content: "";
					position: absolute;
					right: 5px;
					width: 12px;
					height: 100%;
					background: url(../images/selected.png) no-repeat center;
				}
			}

			&.first-3{
				height: 25px;
				line-height: 25px;
				background-color: #7edfff;
				color: #fff;
				border-radius: 4px;
				padding: 0 25px 0 10px;

				&:hover,&.active{
					background-color: #90cf84;
				}

				&.active:after{
					content: "";
					position: absolute;
					right: 5px;
					width: 12px;
					height: 100%;
					background: url(../images/selected.png) no-repeat center;
				}
			}

			&.first-4{
				height: 25px;
				line-height: 25px;
				border: 1px solid #5a8af2;
				color: #5a8af2;
				border-radius: 4px;
				padding: 0 25px 0 10px;

				&:hover,&.active{
					border: 1px solid #90cf84;
					color: #90cf84;
				}

				&.active:after{
					content: "";
					position: absolute;
					right: 5px;
					width: 12px;
					height: 100%;
					background: url(../images/select_blue.png) no-repeat center;
				}
			}

			&.first-5{
				color: #5a8af2;
				padding: 0 25px 0 5px;

				&:hover,&.active{
					color: #90cf84;
				}

				&.active:after{
					content: "";
					position: absolute;
					right: 5px;
					width: 12px;
					height: 100%;
					background: url(../images/select_blue.png) no-repeat center;
				}
			}

			&.first-6,&.first-7{
				padding: 0 25px 0 5px;

				&:hover,&.active{
					color: #90cf84;
				}

				&.active:after{
					content: "";
					position: absolute;
					right: 5px;
					width: 12px;
					height: 100%;
					background: url(../images/select_blue.png) no-repeat center;
				}
			}
		}

		.row{
			display: flex;

			.col{
				display: block;
				height: 40px;
				line-height: 40px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}


			input{
				vertical-align: middle;
				outline: 0;
			}

			.operation{
				margin-left: 20px;
				color: #5a8af2;
				cursor: pointer;

				&:first-child{
					margin-left: 0;
				}
			}

			&:hover{
				background-color: #fef6e9;
			}
		}

	}


</style>
