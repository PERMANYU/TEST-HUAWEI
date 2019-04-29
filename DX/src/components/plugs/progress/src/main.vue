<template>
	<div class="progress"></div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				timer:null,
				isStart: false
			}
		},
		mounted(){
			this.init();
		},
		destroyed(){
			this.end();
			return false;
		},
		methods:{
			init(){
				let progressV = 0;

				this.timer = setInterval( () => {
	        		this.isStart = true;
			        if(progressV > 50 && progressV <= 70){
			        	progressV += Math.random() / 4;
			        }else if(progressV > 70){
			        	progressV += Math.random() / 10;
			        }else{
			        	progressV += Math.random();
			        }

			        if(progressV >= 90){
			        	clearInterval(this.timer);
			        }  
			        this.$el.style.width = `${progressV}%`;
			    },10);
			},
			end(){
				clearInterval(this.timer);

				let progressV = parseInt(this.$el.style.width);
				let step = (100 - progressV) / 10;
				
				this.timer = setInterval( () => {
					progressV += step;
					this.$el.style.width = `${progressV}%`;
		            if(progressV >= 100){
		            	this.$el.style.width = `100%`;
		            	this.isStart = false;
		            	clearInterval(this.timer);
		            	document.body.removeChild(this.$el);
		            }
				},10);
			}
		}
	}
</script>

<style scoped lang="scss">
	.progress{
		position: fixed;
		top: 0;
		left: 0;
		width: 0;
		height: 3px;
		background-color: #008bff;
		z-index: 9800;
	}
</style>