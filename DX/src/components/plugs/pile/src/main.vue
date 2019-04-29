<template>
	<div class="pile">

	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				
			}
		},
		destroyed(){
			document.body.removeChild(this.$el);
		},
		mounted(){
			if(!this.sEl || !this.eEl){
				this.$destroy(true);
				return;
			}

			let sElRect = this.sEl.getBoundingClientRect(),
				eElRect = this.eEl.getBoundingClientRect();

			this.$el.style.top = `${sElRect.top}px`;
			this.$el.style.left = `${sElRect.left + sElRect.width / 2}px`;

			setTimeout( () => {
				this.$el.style.top = `${eElRect.top}px`;
				this.$el.style.left = `${eElRect.left + eElRect.width / 2}px`;
			},10)

			setTimeout( () => {
				this.$destroy(true);
			},1000)
		},
		methods:{

		}
	}
</script>

<style scoped lang="scss">
	.pile{
		position: fixed;
		width: 16px;
		height: 16px;
		background-image: url(./../images/plus.png);
		background-repeat: no-repeat;
		background-position: center;
		transition: left 1s linear, top 1s ease-in;
	}
</style>