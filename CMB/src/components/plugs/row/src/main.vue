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
		height: auto;
		zoom: 1;
		display: block;

		&.row-inline{
			display: inline-block;
			white-space: nowrap;

			*{
				white-space: normal;
			}
		}
		
		&:before{
			content: '';
			display: table;
		}

		&:after{
			content: '';
			display: table;
			clear: both;
			visibility: hidden;
			font-size: 0;
			height: 0;
		}
	}
</style>