<template>
	<div class="input" v-if="type !== 'textarea'">
		<input :class="['app__input',isSearch ? 'search' :'']" 
			v-bind="$attrs" 
			type="text" 
			ref="input"
			autocomplete="off"
			:value="model"
			@input="handleInput"
			@focus="handleFocus"
			@blur="handleBlur"
			@change="handleChange">
		<label class="app__input placeholder-label" 
			:style="placeholderLabelStyle"
			@click="placeholderLabelClick">{{placeholderLabel}}</label>
		<div class="icon" v-if="isSearch" @click="searchClick()"></div>
	</div>
	<div class="textarea" v-else>
		<textarea class="app__textarea"
			v-bind="$attrs" 
			ref="textarea"
			autocomplete="off"
			:value="model"
			@input="handleInput"
			@focus="handleFocus"
			@blur="handleBlur"
			@change="handleChange"></textarea>
	</div>
	
</template>

<script type="text/javascript">
	export default{
		name:'Input',
		props:{
			value:{},
			isSearch:{
				type: Boolean,
				default: false
			},
			type:{
				type: String,
				default: 'text'
			},
			number:{
				type: Boolean,
				default: false
			}
		},
		data(){
			return{
				placeholderLabel:'',
				placeholderLabelStyle:{
					display:'none'
				}
			}
		},
		computed:{
			model:{
				get(){
					if(this.number){
						return this.value ? this.value.toString().replace(/[^0-9.]/g,'') : this.value;
					}else{
						return this.value
					}
					
				}
			}
		},
		mounted(){
			this.adjustPlaceholderLabelPosition();
		},
		methods:{
			searchClick(){
				this.$emit('search',this.number ? Number(this.$refs.input.value) : this.$refs.input.value);
			},
			handleFocus(event){
				this.$emit('focus', event);

				let input = document.createElement('input');
				if("placeholder" in input){
					//支持placeholder
					return;
				}
				this.placeholderLabelStyle.display = 'none';
			},
			handleInput(event){
				if(event.target.value == ''){
					this.$emit('input', '');
					return
				}

				if(this.number){
					event.target.value = event.target.value ? event.target.value.toString().replace(/[^0-9.]/g,'') : 0;
				}
				this.$emit('input', this.number ? Number(event.target.value) : event.target.value);
			},
			handleBlur(event){
				this.$emit('blur', event);

				let input = document.createElement('input');
				if("placeholder" in input){
					//支持placeholder
					return;
				}
				if(event.target.value === ''){
					this.placeholderLabelStyle.display = 'block';
				}
			},
			handleChange(event){
				if(event.target.value == ''){
					this.$emit('change', '');
					return
				}
				
				this.$emit('change', this.number ? Number(event.target.value) : event.target.value);
			},
			focus(){
				this.$refs.input.focus();
			},
			blur(){
				this.$refs.input.blur();
			},
			placeholderLabelClick(){
				this.$refs.input.focus();
			},
			adjustPlaceholderLabelPosition(){
				let input = document.createElement('input');
				if("placeholder" in input){
					//支持placeholder
					return;
				}else{
					this.placeholderLabel = this.$attrs.placeholder;
				}
				
				if(this.placeholderLabel){
					this.placeholderLabelStyle.display = 'block';
				}else{
					return;
				}

				let inputRect = this.$refs.input.getBoundingClientRect(),
					elRect = this.$el.getBoundingClientRect();

				let elCurrentStyle = {}
				if(this.$el.currentStyle){
					elCurrentStyle = this.$refs.input.currentStyle;
				}else{
					elCurrentStyle = document.defaultView.getComputedStyle(this.$refs.input,null)
				}
				this.placeholderLabelStyle.top = `${inputRect.top - elRect.top}px`;
				this.placeholderLabelStyle.width = `${inputRect.width}px`;
				this.placeholderLabelStyle.height = `${inputRect.height}px`;
				this.placeholderLabelStyle.lineHeight = `${inputRect.height}px`;
				this.placeholderLabelStyle.paddingLeft = `${elCurrentStyle['paddingLeft']}`;
				this.placeholderLabelStyle.paddingRight = `${elCurrentStyle['paddingRight']}`;


			}
		}
	}
</script>

<style scoped lang="scss">
	.input{
		input{
			width: 100%;
			/*vertical-align: top;*/

			&.search{
				padding-right: 20px;

				&+ .icon{
					display: block;
					position: absolute;
					width: 14px;
					height: 100%;
					right: 5px;
					top: 0;
					cursor: pointer;
					background: url(./../images/search.png) no-repeat center;
				}
			}
		}

		input[disabled]{
			background-color: #efefef;
		}

		.placeholder-label{
			position: absolute;
			display: inline-block;
			left: 0;
			top: 0;
			border: 0;
			background-color: transparent;
			white-space: normal;
			overflow: hidden;
			cursor: text;
		}
	}

	.textarea{
		width: 100%;

	}
</style>