<template>
	<div class="list">
		<iframe :src="path"></iframe>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				path: `${this.$api.funPath}catalogView/catalogView.html#/catalogView`
			}
		},
		methods:{

		}
	}
</script>

<style scoped lang="scss">
	.list,iframe{
		width: 100%;
		height: 100%;
		border: 0;
	}
</style>