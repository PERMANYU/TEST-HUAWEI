<template>
	<div class="checkbox" ref="checkbox">
		<input v-bind="$attrs" 
			type="checkbox" 
			:value="label" 
			v-if="model === 'NULL'"
			@click="handleClick"
			ref="input">
		<input v-else
			v-bind="$attrs" 
			type="checkbox" 
			:value="label" 
			v-model="model"
			ref="input"
			@change="handleChange">
			<div class="icon">
				<span  class="iconfont iconfuxuankuang"></span>
				<span class="iconfont iconfuxuanxuanzhong"></span>
			</div>
		
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'Checkbox',
		props:{
			value:{
				default:'NULL'
			},
			label:{}
		},
		data(){
			return{

			}
		},
		computed:{
			model:{
				get(){
					return this.value;
				},
				set(val){
					this.$emit('input', val);
				}
			}
		},
		mounted(){

		},
		methods:{
			handleChange(event){
				this.$emit('change', event.target.value);
			},
			handleClick(e){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.checkbox{
		display: inline-block;
		z-index: 0;

		input{
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			opacity: 0;
			cursor: pointer;
			z-index: 1;
		}

		input:checked + .icon{

			.iconfuxuanxuanzhong{
				display: block;
			}

			.iconfuxuankuang{
				display: none;
			}
		}

		.icon{
			display: inline-block;

			.iconfuxuanxuanzhong{
				display: none;
				color: $mainColor;
			}

			.iconfuxuanxuanzhong,.iconfuxuankuang{
				font-size: 14px;
			}
		}

		
		
		.content{
			display: inline-block;
		}

	}
</style>