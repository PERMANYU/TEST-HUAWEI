<template>
	<div :class="['row',inline ? 'row-inline' : '']">
		<slot></slot>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'Row',
		props:{
			inline:{
				type:Boolean,
				default: false
			}
		},
		data(){
			return{
				
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){

			}
		}
	}
</script>

<style scoped lang="scss">
	.row{
		min-height: 40px;
		line-height: 40px;

		&.row-inline{
			display: inline-block;
			white-space: nowrap;
			font-size: 0;

			* {
				font-size: 12px;
			}
		}
		
		&:before{
			content: '';
			display: table;
		}

		&:after{
			content: '';
			clear: both;
			display: table;;
		}
	}
</style>