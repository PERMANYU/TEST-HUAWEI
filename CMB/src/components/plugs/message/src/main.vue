<template>
	<transition name="fade">
		<div class="message" v-show="visible">
			<span :class="['icon','icon-'+type]"></span>
			<span class="m-name">{{adjustMessage()}}</span>
		</div>
	</transition>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				visible: false
			}
		},
		mounted(){
			this.startTimer();
		},
		methods:{
			startTimer() {
				this.timer = setTimeout(() => {
					this.visible = false;

					setTimeout(() =>{
						this.$destroy(true);
						this.$el.parentNode.removeChild(this.$el);
					},300)

				},2000);
			},
			adjustMessage(){
				if(!this.message){
					return '服务器错误!';
				}

				if(this.message.length > 100){
					return '服务器错误!';
				}else{
					return this.message;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.fade-enter-active,.fade-leave-active{
		transition: all .3s;
	}

	.fade-enter,.fade-leave-to{
		opacity: 0;
		transform: translate(-50%,-100%) !important;
	}

	.message{
		display: table;
		padding: 0 20px 0 40px;
		margin-bottom: 10px;
		border-radius: 5px;
		height: 40px;
		line-height: 40px;
		background-color: #fff;
		transform: translateX(-50%);
		box-shadow: 0 1px 6px rgba(0,0,0,.2);
		z-index: 2000;

		.icon{
			display: block;
			position: absolute;
			top: 10px;
			left: 10px;
			width: 20px;
			height: 20px;
		}

		.icon-info{
			background: url(./../images/info.png) no-repeat center;
		}

		.icon-success{
			background: url(./../images/success.png) no-repeat center;
		}

		.icon-warning{
			background: url(./../images/warning.png) no-repeat center;
		}

		.icon-error{
			background: url(./../images/error.png) no-repeat center;
		}

		.m-name{
			white-space: nowrap;
		}
	}
</style>