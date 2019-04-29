<template>
	<transition name="fade">
		<div class="split">
			<div class="s-left">
				<iframe :src="srcPath"></iframe>
			</div>
			<div class="s-right">
				<iframe :src="splitPath"></iframe>
			</div>

			<div class="s-operation">
				<div class="">
					<div class="btn-page-box">
						<span class="app__btn app__btn-back" @click="btnBack()">返回</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/javascript">
	export default{
		props:{
			componentData:{}
		},
		data(){
			return{
				srcPath:window.location.href,
				splitPath:window.location.pathname
			}
		},
		mounted(){
			
		},
		methods:{
			btnBack(){
				this.$emit('componentView','list');
			}
		}
	}
</script>

<style scoped lang="scss">
	.fade-enter-active, .fade-leave-active{
		transition: all .3s ease;
	}

	.fade-enter, .fade-leave-to{
		top: -100% !important;
	}

	.split{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding-bottom: 50px;
		z-index: 201;
		background-color: #fff;

		.s-left,
		.s-right{
			width: 50%;
			height: 100%;
			float: left;
		}

		iframe{
			width: 100%;
			height: 100%;
		}

		.s-operation{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #fff;
			box-shadow: 0 -2px 1px #f1f5fa;

			.btn-page-box{
				text-align: right;
				padding-right: 20px;

				span{
					margin-left: 20px;
				}
			}
		}
	}
</style>