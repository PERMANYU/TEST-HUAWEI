<template>
	<div class="select">
		<div class="" @click="selectClick()" >
			<input :class="['select-input',isShow ? 'active-input' : '']" 
				:style="inputStyle"
				:readonly="!isSearch" 
				v-bind="$attrs" 
				:value="modelShowValue" 
				:placeholder="placeholder" 
				ref="selectInput" 
				@keydown="inputEvent()" 
				@keyup="inputEvent()" 
				@keypress="inputEvent()" 
				@focus="inputEvent()" 
				autocomplete="off">

			<i class="select-icon"></i>

			<div class="multiple-box" 
				ref="multipleBox" 
				v-if="multiple && !ellipsis">
				<div :class="['multiple-item',multipleBlock ? 'multiple-item-block' : '']" 
					v-for="(item,index) in value"
					:key="index"
					:title="multipleShowValue(item)">
					<span class="m-i-name">{{multipleShowValue(item)}}</span>
					<span class="multiple-close" @click.stop="multipleClose(item)"></span>
				</div>
			</div>
			<div class="multiple-box" 
				ref="multipleBox" 
				v-if="multiple && ellipsis && value.length > 0">
				<div class="multiple-item ellipsis-item" 
					:title="multipleShowValue(value[0])"
					v-show="isShowEllipsis">
					<span class="m-i-name">{{multipleShowValue(value[0])}}</span>
					<span class="multiple-close" @click.stop="multipleClose(value[0])"></span>
				</div>
				<span class="multiple-count" ref="multipleCount" :title="ellipsisTitle()">+{{value.length}}</span>
			</div>

			
		</div>
		<Scroll class="select-dropdown" v-show="isShow" :isShowRight="true" ref="scroll">
			<ul>
				<li @click="itemClick('')" v-if="isNullSel && !multiple">{{placeholderSel}}</li>
				<li :class="[item.disabled ? 'disabled' : '',isMultipleData(item) ? 'acitve' : '']" v-for="(item,index) in showList" @click="itemClick(item)" :title="adjustShowText(item,true)" v-html="adjustShowText(item)"></li>
			</ul>
			<div class="more" v-if="isSearch && isMore==false && showList.length > 4">
				<span @click="moreClick()">更多</span>
			</div>
		</Scroll>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'Select',
		props:{
			value:{},
			data:{//可选择数据
				type: Array,
				default: function(){
					return []
				}
				// [{
				// 	value:'xxx',
				// 	label: 'xxx',
				//	disabled: true
				// }]
			},
			dataValueStr:{//value自定义字段名称
				type: String,
				default: 'value'
			},
			dataLabelStr:{//label自定义字段名称
				type: String,
				default: 'label'
			},
			isNullSel:{//是否显示请选择
				type: Boolean,
				default: true
			},
			isSearch:{//是否可以输入检索
				type: Boolean,
				default: false
			},
			lazyTime:{//输入检索时的反应时间
				type:Number,
				default: 200
			},
			searchTextMax:{//检索显示的最大字符数
				type:Number,
				default:0
			},
			saveObject:{//v-model绑定对象
				type: Boolean,
				default: false
			},
			placeholder:{
				type: String,
				default: '请选择'
			},
			placeholderSel:{
				type: String,
				default: '请选择'
			},
			multiple: Boolean,
			ellipsis: Boolean,
			multipleBlock: Boolean,
			isMore: Boolean
		},
		data(){
			return{
				isShow: false,
				timer: null,
				modelValue:null,
				showList:this.data,
				inputStyle:{
					height: '30px'
				},
				isShowEllipsis:true
			}
		},
		watch:{
			isShow(val,old){
				if(val){
					this.$nextTick( () => {
						this.$refs.scroll.init();

						let parentNodeRect = this.getOverflowNode(this.$el).getBoundingClientRect(),
							styleHeight = 0;

						//动态计算宽高
						if(this.isSearch){
							styleHeight = this.showList.length * 30 + 40;
							if(this.searchTextMax !== 0){
								this.$refs.scroll.$el.style.width = `auto`;
							}
						}else{
							styleHeight = this.isNullSel ? this.showList.length * 30 + 40 : this.showList.length * 30 + 10;
						}

						styleHeight = styleHeight > parentNodeRect.height - 10 ? parentNodeRect.height - 10 : styleHeight;

						this.$refs.scroll.$el.style.height = `${styleHeight}px`;



						//计算top

						let elRect = this.$el.getBoundingClientRect(),
							scrollRect = this.$refs.scroll.$el.getBoundingClientRect();

						if(elRect.top - parentNodeRect.top + scrollRect.height + elRect.height  > parentNodeRect.height){
							let tempTop = elRect.top - parentNodeRect.top + scrollRect.height + elRect.height  - parentNodeRect.height;

							tempTop = elRect.height - tempTop - 10;
							
							if(tempTop > elRect.top - parentNodeRect.top){
								tempTop = elRect.top - parentNodeRect.top;
							}

							this.$refs.scroll.$el.style.top = `${tempTop}px`;
						}else{
							let elRect = this.$el.getBoundingClientRect();
							this.$refs.scroll.$el.style.top = `${elRect.height}px`;
						}


					})
				}
			},
			data(val,old){
				//没有数据时，不显示选择项
				if(val.length === 0){
					this.isShow = false;
				}

				//搜索 && 选择项大于5 只显示5条
				if(this.isSearch && val.length > 5 && this.isMore == false){
					this.showList = this.data.slice(0,5);
				}else{
					this.showList = this.data;
				}

				//动态计算宽高
				let parentNodeRect = this.getOverflowNode(this.$el).getBoundingClientRect(),
					styleHeight = 0;
				if(this.isSearch){
					styleHeight = this.showList.length * 30 + 40;
					if(this.searchTextMax !== 0){
						this.$refs.scroll.$el.style.width = `auto`;
					}
				}else{
					styleHeight = this.isNullSel ? this.showList.length * 30 + 40 : this.showList.length * 30 + 10;
				}

				this.$refs.scroll.$el.style.height = `${styleHeight > parentNodeRect.height - 10 ? parentNodeRect.height - 10 : styleHeight}px`;
			},
			value(val,old){
				this.$nextTick( () => {
					if(this.multiple){
						this.initMultipleBoxRect();
					}
				})
				
			}
		},
		computed:{
			model:{
				get(){
					return this.value;
				},
				set(val){
					if(this.multiple){
						let multipleArray = [];
						if(Object.prototype.toString.call(this.value) !== '[object Array]'){
							multipleArray = [val];
						}else{
							if(this.value.find( vItem => this.$utils.isEqual(vItem,val))){
								multipleArray = this.value.filter( vItem => !this.$utils.isEqual(vItem,val))
							}else{
								multipleArray = [...this.value];
								multipleArray.push(val)
							}
						}
						
						this.$emit('input', multipleArray);
					}else{
						this.$emit('input', val);
					}
				}
			},
			modelShowValue:{
				get(){
					if(this.multiple){
						return '';
					}

					if(this.modelValue !== null) return this.modelValue;
					if(this.saveObject){
						return this.model ? this.model[this.dataLabelStr] : '';
					}else{
						let sd = this.data.find(item => item[this.dataValueStr] == this.value);
						return sd ? sd[this.dataLabelStr] : '';
					}
					
				}
			}
		},
		mounted(){
			document.addEventListener('click', this.globalClick);

			//动态计算宽高
			let parentNodeRect = this.getOverflowNode(this.$el).getBoundingClientRect(),
				styleHeight = 0;
			if(this.isSearch){
				styleHeight = this.showList.length * 30 + 40;
				if(this.searchTextMax !== 0){
					this.$refs.scroll.$el.style.width = `auto`;
				}
			}else{
				styleHeight = this.isNullSel ? this.showList.length * 30 + 40 : this.showList.length * 30 + 10;
			}

			this.$refs.scroll.$el.style.height = `${styleHeight > parentNodeRect.height - 10 ? parentNodeRect.height - 10 : styleHeight}px`;
			
			// if(this.isSearch){
			// 	this.$refs.scroll.$el.style.height = `${this.showList.length * 30 + 40}px`;
			// 	if(this.searchTextMax !== 0){
			// 		this.$refs.scroll.$el.style.width = `auto`;
			// 	}
			// }else{
			// 	this.$refs.scroll.$el.style.height = this.isNullSel ? 
			// 			`${this.showList.length * 30 + 40}px` : 
			// 			`${this.showList.length * 30 + 10}px`;
			// }

			if(this.multiple){
				window.addEventListener('resize',this.initMultipleBoxRect);
				this.initMultipleBoxRect();
			}

		},
		destroyed(){
			document.removeEventListener('click', this.globalClick);
			if(this.multiple) window.removeEventListener('resize',this.initMultipleBoxRect);
		},
		methods:{
			initMultipleBoxRect(){
				if(this.value && this.value.length > 0){
					this.$refs.selectInput.placeholder = '';
				}else{
					this.$refs.selectInput.placeholder = '请选择';
					return;
				}

				if(this.$refs.multipleBox.getBoundingClientRect().width == 60){
					this.isShowEllipsis = false;
				}

				this.$nextTick( () => {
					this.inputStyle.height = `${this.$refs.multipleBox.getBoundingClientRect().height}px`;
					this.$nextTick( () => {
						let inputTop = this.$refs.selectInput.getBoundingClientRect().top - this.$el.getBoundingClientRect().top;
						this.$refs.multipleBox.style.top = `${inputTop}px`;
					})
				})				

				
			},
			selectClick(){
				if(this.$refs.selectInput.disabled) return;
				if(this.isSearch) return;
				this.isShow = !this.isShow;
			},
			itemClick(item){
				if(item.disabled) return;
				this.model = this.saveObject ? item : item[this.dataValueStr] == undefined ? '' : item[this.dataValueStr];
				this.modelValue = null;

				this.$emit('change',item);
				if(this.multiple) return;
				this.isShow = false;
			},
			inputEvent(){
				if(!this.isSearch) return;

				let inputValue = this.$refs.selectInput.value;

				clearTimeout(this.timer);
				this.timer = setTimeout( () => {
					this.isShow = true;
					this.modelValue = inputValue;
					this.$emit('load', inputValue);
				},this.lazyTime)

			},
			moreClick(){
				let inputValue = this.$refs.selectInput.value;

				this.$emit('more', inputValue);
				this.isShow = false;
			},
			adjustShowText(item,isTitle = false){
				if(!this.isSearch || isTitle) return item[this.dataLabelStr];
				if(!this.$refs.selectInput) return;

				let str = item[this.dataLabelStr].toString();
				let inputValue = this.$refs.selectInput.value;

				str = str.replace(inputValue, `<span style="color: #5c9cf3">${inputValue}</span>`)

				if(this.searchTextMax === 0){
					return str
				}

				if(str.length > this.searchTextMax){
					return `${str.substring(0,this.searchTextMax)}...`;
				}else{
					return str;
				}
			},
			isMultipleData(item){
				if(!this.multiple) return false;
				if(Object.prototype.toString.call(this.value) !== '[object Array]') return false;

				if(this.saveObject){
					return this.value.find(vItem => this.$utils.isEqual(vItem,item));
				}else{
					return this.value.find(vItem => vItem === item[this.dataValueStr]);
				}
				
			},
			multipleShowValue(item){
				if(this.saveObject){
					return item[this.dataLabelStr];
				}else{
					let sd = this.data.find(fItem => fItem[this.dataValueStr] == item);
					return sd ? sd[this.dataLabelStr] : '';
				}
			},
			multipleClose(item){
				this.model = item;
				this.$emit('multipleClose',item);
			},
			getOverflowNode(node){
				let parentNode = node.parentNode;
				if(parentNode.tagName == 'BODY') return parentNode;

				let elCurrentStyle = {}
				if(parentNode.currentStyle){
					elCurrentStyle = parentNode.currentStyle;
				}else{
					elCurrentStyle = document.defaultView.getComputedStyle(parentNode,null)
				}

				if(elCurrentStyle['overflowY'] == 'hidden'){
					if(parentNode.getBoundingClientRect().height > node.getBoundingClientRect().height){
						return parentNode;
					}else{
						return node;	
					}
				}
				return this.getOverflowNode(node.parentNode);
			},
			ellipsisTitle(){
				if(!this.value) return;

				if(this.saveObject){
					return this.value.map(item => item[this.dataLabelStr]).join(',');
				}else{
					return this.data.filter( item => this.value.includes(item[this.dataValueStr])).map(item => item[this.dataLabelStr]).join(',');
				}
				
			},
			globalClick(e){
				if(!this.$el.contains(e.target)){
					if(!this.item) this.modelValue = null;
					this.isShow = false
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.select{
		background-color: transparent;

		.multiple-box{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			min-width: 60px;
			line-height: 30px;
			padding: 0 20px 0 5px;
			cursor: pointer;
			overflow: hidden;

			.multiple-item{
				display: inline-block;
				max-width: 100%;
				height: 22px;
				line-height: 22px;
				padding: 0 20px 0 5px;
				margin: 4px 0 4px 4px;
				background-color: #f5f5f5;
				border-radius: 4px;
				vertical-align: top;

				&.multiple-item-block{
					display: block;
				}

				&.ellipsis-item{
					max-width: calc(100% - 50px);
				}

				.m-i-name{
					display: block;
					width: 100%;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}

				.multiple-close{
					position: absolute;
					display: block;
					right: 4px;
					top: 5px;
					width: 12px;
					height: 12px;
					box-sizing: border-box;
					cursor: pointer;
					background: url(./../images/close.png) no-repeat center;

					&:hover{
						background: url(./../images/close_hover.png) no-repeat center;
					}
				}
			}

			.multiple-count{
				display: inline-block;
				width: 30px;
				height: 22px;
				line-height: 22px;
				padding: 0 5px;
				margin: 4px 0 4px 4px;
				border-radius: 4px;
				background-color: #f5f5f5;
				vertical-align: top;
			}

		}

		.select-input{
			position: relative;
			width: 100%;
			border: 1px solid #d8dcdf;
			border-radius: 5px;
			padding: 0 20px 0 5px;
			cursor: pointer;
			outline: 0;
			color: #7a7a86;
			/*vertical-align: top;*/

			span{
				display: block;
				width: 100%;
				padding-right: 10px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.select-icon{
			display: block;
			position: absolute;
			width: 5px;
			height: 5px;
			line-height: 0;
			top: calc(50% - 3px);
			right: 8px;
			transform: rotate(-45deg);
			transition: all .3s ease;

			&:after{
				content: '';
				display: block;
				width: 5px;
				height: 5px;
				border-left: 1px solid #999;
				border-bottom: 1px solid #999;

			}
		}

		.active-input{
			border: 1px solid #5a8af2;

			+ .select-icon{
				top: calc(50% - 1px);
				transform: rotate(135deg);

				&:after{
					border-left: 1px solid $mainColor;
					border-bottom: 1px solid $mainColor;
				}
			}
		}

		.select-dropdown{
			position: absolute;
			display: inline-block;
			left: 0;
			width: 100%;
			min-width: 100%;
			border: 0px solid #999;
			border-radius: 5px;
			box-shadow: 0 1px 6px rgba(0,0,0,.2);
			margin-top: 3px;
			background-color: #fff;
			padding: 5px 0;
			z-index: 99;
			max-height: 200px;
			box-sizing: border-box;

			ul{

				li{
					padding: 0 10px;
					min-height: 30px;
					line-height: 30px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					cursor: pointer;

					&:hover{
						background-color: #f6f7f9;
					}

					&.disabled{
						cursor: not-allowed;
						color: #d3d3d3;
					}

					&.acitve{
						padding: 0 30px 0 10px;
						color: $mainColor;
						background-image: url(./../images/select.png);
						background-repeat: no-repeat;
						background-position: right;
					}
				}
			}

			.more{
				padding-right: 10px;
				text-align: right;
				

				span{
					color: $mainColor;
					cursor: pointer;

					&:hover{

					}
				}
			}
		}
	}
</style>
