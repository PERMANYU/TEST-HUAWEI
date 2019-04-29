<template>
	<div :class="['date-picker']">
		<span class="clear" v-if="model" @click="clearClick()"></span>
		<input readonly 
			class="app__input" 
			v-bind="$attrs" 
			type="text"
			name=""
			v-if="initType == 'd'"
			@focus="inputFocus()" 
			@blur="inputBlur()" 
			@click="inputClick()" 
			:value="model | date"
			@input="handleInput"
			@keydown="inputKeyDown($event)">
		<input readonly 
			class="app__input" 
			v-bind="$attrs" 
			type="text"
			name=""
			v-else
			@focus="inputFocus()" 
			@blur="inputBlur()" 
			@click="inputClick()" 
			:value="model"
			@input="handleInput"
			@keydown="inputKeyDown($event)">

		<Calendar :class="['content',isShow ? 'show' :'']" 
			v-if="isShow" 
			v-model="model"
			:startDate="startDate"
			:endDate="endDate"
			:initType="initType"
			ref="calendarRef"></Calendar>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'DatePicker',
		props:{
			value:{},
			startDate:'',
			endDate:'',
			initType:{
				type: String,
				default: 'd' //d/天 m/月 y/年
			}
		},
		data(){
			return{
				isShow: false
			}
		},
		computed:{
			model:{
				get(){
					return this.value;
				},
				set(val){
					this.$emit('input', val);
					if(val) this.isShow = false;
				}
			}
		},
		mounted(){
			document.addEventListener('click', this.globalClick);
		},
		destroyed(){
			document.removeEventListener('click', this.globalClick);
		},
		methods:{
			inputFocus(){
				this.isShow = true;

				this.$nextTick( () => {
					let parentNodeRect = this.getOverflowNode(this.$el).getBoundingClientRect(),
						elRect = this.$el.getBoundingClientRect(),
						calendarRect = this.$refs.calendarRef.$el.getBoundingClientRect();

					if(elRect.top - parentNodeRect.top + calendarRect.height + elRect.height  > parentNodeRect.height){
						let tempTop = elRect.top - parentNodeRect.top + calendarRect.height + elRect.height  - parentNodeRect.height;



						let tempLeft = calendarRect.width - elRect.width;

						if(tempTop > elRect.top - parentNodeRect.top){
							tempTop = elRect.top - parentNodeRect.top - 30;
						}
						if(tempLeft > 0){
							tempLeft = calendarRect.width - elRect.width;
						}else{
							tempLeft = 0;
						}

						this.$refs.calendarRef.$el.style.top = `-${tempTop}px`;
						this.$refs.calendarRef.$el.style.left = `-${tempLeft}px`;
					}else{
						let elRect = this.$el.getBoundingClientRect();
						this.$refs.calendarRef.$el.style.top = `${elRect.height}px`;
					}

					
				})
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
			inputClick(){

			},
			inputBlur(){

			},
			inputKeyDown(e){

			},
			clearClick(){
				this.model = '';
			},
			handleInput(event){
				this.$emit('input', event.target.value);
			},
			globalClick(e){
				if (!this.$el.contains(e.target)) this.isShow = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	.date-picker{

		&:hover{
			.clear{
				display: block;
			}
		}

		input{
			width: 100%;

			&[disabled]{
				background-color: #ebebe4;
			}
		}

		.clear{
			display: none;
			position: absolute;
			right: 5px;
			top: 0;
			width: 20px;
			height: 100%;
			cursor: pointer;
			background: url(./../images/clear.png) no-repeat center;

			&:hover{
				background: url(./../images/clear_hover.png) no-repeat center;
			}
		}

		.content{
			position: absolute;
			width: 200px;
			left: 0;
			background-color: #fff;
			box-shadow: 0 1px 6px rgba(0,0,0,.2);
			margin-top: 5px;
			transform: scaleY(.8);
			transform-origin:top;
			transition: transform .3s ease;
			opacity: 0;
			border-radius: 4px;
			z-index: 99;

			&.show{
				transform: scaleY(1);
				opacity: 1;
			}
		}
	}
</style>