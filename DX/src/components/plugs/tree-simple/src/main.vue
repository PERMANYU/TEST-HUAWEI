<template>
	<div :class="['tree',isStart ? 'tree-start' : '']">
		<div :class="['c-line',curLevel === 2 ? 'solid-line' : '']" ref="cLine"></div>
		<div :class="['r-line',curLevel === 2 ? 'solid-line' : '']" ref="rLine"></div>
		<Row>
			<Col :span="keyItem.span"
				:class="[keyIndex === 0 ? 'first-col' : '',ellipsis ? 'ellipsis' : 'no-ellipsis']"
				:style="keyIndex === 0 ? firstColStyle : ''"
				v-for="(keyItem,keyIndex) in keys"
				:key="keyIndex">
				<span :class="['first',firstClass]"
					v-if="keyIndex === 0"
					@click="firstClick()">
					<span :class="['first-checkbox',isActive ? 'active' : '']"
						v-if="canSel && !existChildren"></span>
					<span :class="['first-icon',firstIconClass]"
						v-else></span>
					{{folder[keyItem.key]}}
				</span>
				<span v-else>
					{{folder[keyItem.key]}}
				</span>
				 <span :class="['plug',treeSubShow ? 'close' : 'open']"
				 	:style="firstPlugStyle"
					@click.stop="plugClick()"
					v-if="keyIndex === 0 && folder[childrenStr] && folder[childrenStr].length > 0">
				</span>

			</Col>

			<Col :class="[ellipsis ? 'ellipsis' : 'no-ellipsis']"
				:span="operation.span"
				v-if="operation.list">
				<span class="operation"
					v-if="isOperationShow()"
					v-for="(oItem,oIndex) in operation.list"
					@click="operationClick(oItem)">
					{{oItem.label}}
				</span>
				<span v-else>--</span>
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
			:dialogModel="dialogModel"
			:ellipsis="ellipsis"
			:mainTree="tree"/>
	</div>

</template>
<script>
	export default {
		name: "TreeSimple",
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
			dialogModel:Boolean,//是否存在弹窗内
			ellipsis:{//是否超出省略号
				type: Boolean,
				default:true
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
				let leftNum = (this.folderLevel + 1) * 30;
				if(!this.folder[this.childrenStr] || this.folder[this.childrenStr].length === 0){
					leftNum = leftNum - 20;
				}else{
					leftNum = leftNum - 10
				}
				return {
					paddingLeft: `${leftNum}px`
				}
			},
			firstPlugStyle(){
				return {
					left: `${this.folderLevel * 30 + 5}px`
				}
			},
			tree(){
				return this.mainTree == null ? this : this.mainTree;
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
			},
			canSel(){

				//可选中层级是9999 并且该层级存在子节点 不可以选中
				if(this.selLevel === 9999 && this.folder[this.childrenStr] && this.folder[this.childrenStr].length > 0) return false;

				//根据可选层级判断是否可以选中
				if(this.selLevel !== 9999 && this.curLevel < this.selLevel) return false;

				return true;
			},
			firstClass(){
				if(this.isActive){
					return this.existChildren ? 'bg' : 'font';
				}else{
					return '';
				}
			},
			firstIconClass(){
				if(this.dialogModel){
					return `first-icon-d-${this.curLevel > 3 ? 3 : this.curLevel}`;
				}else{
					return `first-icon-${this.curLevel > 3 ? 3 : this.curLevel}`;
				}
			},
			existChildren(){
				return this.folder[this.childrenStr] && this.folder[this.childrenStr].length > 0 ? true : false;
			}
		},
		mounted(){
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

				if(this.operation.after && this.folder[this.levelStr] >= this.operation.after){
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

				return operationLevel.indexOf(this.folder[this.levelStr]) >= 0;
			},
			operationClick(item){
				let obj = {
					data: this.folder,
					parent: this.parent,
					item: item
				}

				this.tree.$emit('operationClick',obj);
			},
			firstClick(){

				if(!this.canSel) return;
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
			initLine(){
				if(this.isStart) return;
				if(!this.$parent.children) return;
				let treeHeight = 30;
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
				let treeHeight = 30;
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
			border-color: $mainColor;
			z-index: 1;

			&.solid-line{
				border-style: solid;
			}
		}

		.c-line{
			position: absolute;
			top: 15px;
			left: 0;
			width: 20px;
			height: 0;
			border-width: 0 0 1px 0;
			border-style: dashed;
			border-color: $mainColor;
			z-index: 1;

			&.solid-line{
				border-style: solid;
			}
		}

		.first-col{
			text-align: left;
		}

		.first{
			display: inline-block;
			height: 20px;
			line-height: 20px;
			cursor: pointer;
			padding-left: 20px;

			&.bg{
				padding: 0 5px;
				margin-left: 20px;
				background-color: $mainColor;
				color: #fff;

				.first-icon{
					left: -20px;
				}
			}

			&.font{
				color: $mainColor;
			}

			.first-checkbox{
				position: absolute;
				top: 4px;
				left: 0;
				width: 12px;
				height: 12px;
				background-image: url(./../images/select.png);
				background-repeat: no-repeat;
				background-position: center;

				&.active{
					background-image: url(./../images/select_active.png);
				}
			}

			.first-icon{
				position: absolute;
				top: 2px;
				left: 0px;
				width: 16px;
				height: 16px;
				background-repeat: no-repeat;
				background-position: center;


				&.first-icon-1{
					background-image: url(./../images/f-icon.png);
				}

				&.first-icon-2{
					background-image: url(./../images/s-icon.png);
				}

				&.first-icon-3{
					background-image: url(./../images/t-icon.png);
				}

				&.first-icon-d-1{
					background-image: url(./../images/f-icon-d.png);
				}

				&.first-icon-d-2{
					background-image: url(./../images/s-icon-d.png);
				}

				&.first-icon-d-3{
					background-image: url(./../images/t-icon.png);
				}
			}

			
		}

		.plug{
			position: absolute;
			display: block;
			width: 14px;
			height: 100%;
			top: 0;
			left: 5px;
			cursor: pointer;

			&.open{
				background-image: url(./../images/grade_close.png);
				background-repeat: no-repeat;
				background-position: center;
			}

			&.close{
				background-image: url(./../images/grade_open.png);
				background-repeat: no-repeat;
				background-position: center;
			}
		}

		.row{
			min-height: 30px;

			.col{
				display: block;
				min-height: 30px;
				height: 30px;
				line-height: 30px;
			}

			.ellipsis{
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}

			.no-ellipsis{
				white-space: nowrap;
			}

			.operation{
				margin-left: 20px;
				color: $mainColor;
				cursor: pointer;

				&:first-child{
					margin-left: 0;
				}
			}

			&:hover{
				background-color: #f1f5fe;
			}
		}

	}


</style>
