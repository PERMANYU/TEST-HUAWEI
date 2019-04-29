<template>
	<div class="radio" ref="radio">
		<input v-bind="$attrs" 
			type="radio" 
			:value="label" 
			v-model="model" 
			@change="handleChange">
		<div :class="['icon','iconfont',isSel ? 'icondanxuanxuanzhong1' : 'icondanxuankuang']">
			
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'Radio',
		props:{
			value:{},
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
			},
			isSel(){
				return this.$utils.isEqual(this.value,this.label);
			}
		},
		
		methods:{
			handleChange(event){
				this.$emit('change',event.target.value);
			}
		}
	}
</script>

<style scoped lang="scss">
	.radio{
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
        
        input[disabled] {
            cursor: not-allowed;
            & ~ .icon, & ~ .content {
                opacity: .3
            }
        }
 
		.icon{
			display: inline-block;
			width: 16px;
			height: 16px;
			font-size: 14px;
			line-height: normal;
		}

		.icondanxuanxuanzhong1,
		.icondanxuanxuanzhong1 ~ .content{
			color: $mainColor;
		}

		.content{
			display: inline-block;
		}
	}
</style>