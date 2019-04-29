<template>
	<div class="loading" @wheel.stop @click.stop>
		<div class="cover"></div>
		<div class="icon">
			<img src="./../images/loading.gif">
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				isRemove: false
			}
		},
		destroyed(){
			document.body.removeChild(this.$el);
			this.isRemove = true;
		},
		methods:{

		}
	}
</script>

<style scoped lang="scss">
	.loading{
		display: table;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9801;

		.cover{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: transparent;
		}

		.icon{
			display: table-cell;
			text-align: center;
			vertical-align: middle;
		}

		img{
			width: 64px;
			height: 64px;
		}
	}
</style>