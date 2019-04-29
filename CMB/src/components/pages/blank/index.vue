<template>
	
</template>
<script type="text/javascript">
	export default{
		data(){
			return{

			}
		},
		beforeRouteEnter(to, from, next){
			next( vm => {
				vm.back(to, from)
			});
		},
		methods:{
			back(to, from){
				let params = Object.assign(to.params, from.params);
				this.$router.push({ name: from.name, params });
			}
		}
	}
</script>
<style type="text/css">
	
</style>