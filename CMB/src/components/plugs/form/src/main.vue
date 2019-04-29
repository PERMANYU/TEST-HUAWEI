<template>
	<form>
		<slot></slot>
	</form>
</template>

<script type="text/javascript">
	export default{
		name:'Form',
		props:{
			labelWidth: String, // 10px  ||  10%
			labelAlign: String
		},
		data(){
			return{

			}
		},
		mounted(){
			this.initStyle();
			
		},
		methods:{
			initStyle(){
				if(this.labelWidth){
					let formLabels = this.$el.getElementsByClassName('f-i-l');

					for(let i = 0; i < formLabels.length; i++){
						let item = formLabels[i];
						item.parentNode.style.paddingLeft = this.labelWidth;
						item.style.width = this.labelWidth;
					}
				}

				if(this.labelAlign){
					let formLabels = this.$el.getElementsByClassName('f-i-l');

					for(let i = 0; i < formLabels.length; i++){
						let item = formLabels[i];
						item.style.textAlign = this.labelAlign;
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>