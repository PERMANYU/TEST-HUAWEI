<template>
	<div>
		产品标签
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{

			}
		},
		methods:{
			init(item){
				this.$nextTick( () => {
            		this.$emit('initEnd')
            	})
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>