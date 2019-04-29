<template>
	<div class="main">
		<Header/>
        <Content/>
	</div>
</template>

<script>
	import Header from './group/header/index.vue';
	import Content from './group/content/index.vue';

	export default {
		components: {
			Header,
			Content,
		},
		data() {
			return {
				
				
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.main{
		height: 100%;
	}
</style>