<template>
	<transition name="fade">
		<div class="tip" v-if="isTipShow" @click.stop @wheel.stop>
			<div class="cover"></div>

			<div class="main">
				<div class="title">
					<span class="t-name">{{tipTitle}}</span>
					<span class="t-icon" @click="back()"></span>
				</div>
				<div class="content" ref="tipContent">
					<div :class="['c-info','c-icon-'+tipObj.iconType]">
						{{tipObj.msg}}
					</div>
				</div>
				<div class="bottom" v-if="tipObj.showBtn">
					<div class="btn-page-box">
						<span class="save" @click="confirm()" v-if="tipObj.showBtn.save">确定</span>
						<span class="back" @click="back()" v-if="tipObj.showBtn.clear">取消</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	export default {
		name: "Tip",
		props: {
			tipTitle:{
				type:String,
				default:'提示'
			},
			tipObj: {
				type: Object,
				default() {
					return {
						//需要显示的icon //1是成功 2是失败 3是提醒
						iconType:1,
						//提示内容
						msg: '是否确认？',
						showBtn: {
							clear: true,
							save: true
						}
					}
				}
			}
		},
		data() {
			return {
				isTipShow: false
			}
		},
		methods: {
            back(){
                this.$emit('back');
                this.hide();
            },
			show(){
				this.isTipShow = true;
			},
			hide(){
                this.isTipShow = false;
			},
			confirm(){
				this.$emit('confirm');
			}
		}
	}
</script>
<style scoped lang="scss">
	.fade-enter-active,.fade-leave-active{
		transition: opacity .3s;
	}

	.fade-enter,.fade-leave-active{
		opacity: 0;
	}
	
	.tip{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1009;
		overflow: auto;
		display: flex;
		align-items: center;

		.cover{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
			z-index: 1;
		}

		.main{
			position: relative;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 4px;
			box-shadow: 0 1px 3px rgba(0,0,0,.3);
			width: 440px;
			min-height: 250px;
			z-index: 2;
			padding: 44px 0 50px;
			box-sizing: border-box;

			.title{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 44px;
				line-height: 44px;
				background-color: $mainColor;
				border-top-right-radius: 4px;
				border-top-left-radius: 4px;

				.t-name{
					position: absolute;
					font-size: 18px;
					color: #fff;
					left: 20px;
					top: 0;
				}

				.t-icon{
					position: absolute;
					top: 10px;
					right: 20px;
					width: 20px;
					height: 20px;
					line-height: 20px;
					text-align: center;
					cursor: pointer;
					color: #fff;
					background: url(./../images/clear.png) no-repeat center;
				}
			}

			.content{
				width: 100%;
				height: 100%;
				text-align: center;

				.c-info{
					display: inline-block;
					padding-left: 30px;
					margin-top: 50px;
					font-size: .16rem;
					text-align: center;
					color: #555;

					&.c-icon-1{
						background-image: url(./../images/tips-icon-success.png);
						background-repeat: no-repeat;
						background-position: 0px 0px;
					}

					&.c-icon-2{
						background-image: url(./../images/tips-icon-success.png);
						background-repeat: no-repeat;
						background-position: 0px 0px;
					}

					&.c-icon-3{
						background-image: url(./../images/tips-icon-warn.png);
						background-repeat: no-repeat;
						background-position: 0px 0px;
					}
				}
			}

			.bottom{
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				background-color: #fff;
				border-top: 1px solid #d5d5d5;
				border-bottom-right-radius: 4px;
				border-bottom-left-radius: 4px;
			}
		}

	}

.btn-page-box{
	width: 100%;
	height: 50px;
	padding: 10px 20px;
	font-size: 12px;
	text-align: right;

	.back{
		display: inline-block;
		width: 70px;
		height: 30px;
		line-height: 30px;
		margin-left: 20px;
		text-align: center;
		border: 1px solid $mainColor;
		color: $mainColor;
		cursor: pointer;
		border-radius: 4px;

		&:hover{
			background-color: $mainColor;
			color: #fff;
		}
	}

	.save{
		display: inline-block;
		width: 70px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border: 1px solid $mainColor;
		background-color: $mainColor;
		color: #fff;
		cursor: pointer;
		border-radius: 4px;

		&:hover{
			opacity: .8;
		}
	}
}
</style>