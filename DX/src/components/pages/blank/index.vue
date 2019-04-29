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
				vm.back(from.path)
			});
		},
        methods:{
        	back(path){
        		this.$router.push({ path });
        	}
        }
	}
</script>
<style type="text/css">
	
</style>