<template>
	<div class="list">
		<iframe :src="path"></iframe>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				path: `${this.$api.funPath}templateTypeView/templateTypeView.html`
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