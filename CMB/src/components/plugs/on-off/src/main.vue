<template>
	<div class="on-off" ref="checkbox">
		<input v-bind="$attrs" type="checkbox" v-model="model">

		<div class="icon">
			<div class="i-circle"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'OnOff',
		props:{
			value:{}
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
		data(){
			return{
				
			}
		},
		mounted(){
			this.model = this.value ? this.value : false;
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.on-off{
		display: inline-block;

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

		.icon{
			width: 40px;
			height: 20px;
			background-color: #dcdcdc;
			border-radius: 20px;
			transition: .5s all ease;

			.i-circle{
				position: absolute;
				top: 2px;
				left: 2px;
				width: 16px;
				height: 16px;
				border-radius: 50%;
				background-color: #fff;
				transition: .5s all ease;
			}
		}

		input:checked + .icon{
			background-color: $mainColor;

			.i-circle{
				left: 22px;
			}
		}
	}
</style>