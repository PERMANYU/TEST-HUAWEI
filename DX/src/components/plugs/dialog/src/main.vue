<template>
	<div class="dialog" v-if="isDialogShow" @wheel.stop>
		<div class="cover"></div>
		<transition name="fade">
			<div class="main" :style="{width:dialogSize.size+'%',minWidth:dialogSize.min+'px',maxWidth:dialogSize.max+'px'}" v-if="isDialogContentShow">
				<div class="title">
					<span class="t-name">{{dialogTitle}}</span>
					<span class="t-icon" @click="hide()"></span>
				</div>
				<div class="content" ref="dialogContent">
					<slot></slot>
				</div>
				<div class="bottom">
					<div class="btn-page-box">
						<span class="back" @click="back()" v-if="showBtn && showBackBtn && !initBtn">返回</span>
						<span class="save" @click="confirm()" v-if="showBtn && showConfirmBtn && !initBtn">保存</span>

						<slot name="btnBox"></slot>
					</div>
				</div>
			</div>
		</transition>
	</div>
	
</template>

<script type="text/javascript">
	export default {
		name: 'Dialog',
		props:{
			dialogTitle:{ //dialog名称
				type:String,
				default:''
			},
			dialogSize:{ //dialog大小
				type:Object,
				default:function(){
					return {
						size:60, //百分百大小
						min:700, //最小宽度(px)
						max:700 //最大宽度(px)
					}
				}
			},
			showBtn:{ //是否显示确定和返回按钮
				type:Boolean,
				default:true
			},
			showConfirmBtn:{ //是否显示确定按钮
				type:Boolean,
				default:true
			},
			showBackBtn:{ //是否显示返回按钮
				type:Boolean,
				default:true
			},
			initBtn:{ //自定义按钮
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				isDialogShow: false,
				isDialogContentShow: false
			}
		},
		mounted(){
			window.addEventListener('resize',this.initHeight);
		},
		updated(){
			this.initHeight();
		},
		destroyed(){
			window.removeEventListener('resize',this.initHeight);
		},
		watch:{
			isDialogShow(newVal,oldVal){
				if(newVal){
					setTimeout( () =>{
						this.isDialogContentShow = true;
					},100)
				}else{
					this.$emit('close');
				}
				
			}
		},
		methods:{
			show(){
				this.isDialogShow = true;
				document.documentElement.style.overflow = 'hidden'
			},
			hide(){
				this.isDialogContentShow = false;
				setTimeout( () =>{
					this.isDialogShow = false;
					document.documentElement.style.overflow = 'auto'
				},300)
			},
			confirm(){
				this.$emit('confirm');
			},
			back(){
				this.$emit('back');
				this.isDialogContentShow = false;
				setTimeout( () =>{
					this.isDialogShow = false;
					document.documentElement.style.overflow = 'auto'
				},300)
			},
			setAutoHeight(){
				this.$refs.dialogContent.style.height = 'auto';
			},
			initHeight(){
				if(this.$refs.dialogContent){
					this.$nextTick( () => {
						this.$refs.dialogContent.offsetHeight > document.documentElement.clientHeight * 0.9 - 91 ? 
						this.$refs.dialogContent.style.height = `${document.documentElement.clientHeight * 0.9 - 90}px` : 
						this.$refs.dialogContent.style.height = 'auto';
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.fade-enter-active,.fade-leave-active{
		transition: all .2s;
	}

	.fade-enter,.fade-leave-active{
		opacity: 0;
		/*transform: scaleY(.3);*/
	}
	

	.dialog{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1001;
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
			width: 60%;
			min-height: 200px;
			max-height: 90vh;
			z-index: 2;
			padding: 40px 0 50px;
			box-sizing: border-box;
			overflow: hidden;

			@for $i from 1 through 10{
				&.s-#{$i}{
					width:(10% * $i);
				}
			}
			

			.title{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 40px;
				line-height: 40px;
				background-color: $mainColor;
				border-top-right-radius: 4px;
				border-top-left-radius: 4px;

				.t-name{
					position: absolute;
					font-size: 16px;
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
				box-sizing: border-box;
				overflow: auto;
			}

			.bottom{
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				border-top: 1px solid #d5d5d5;
				background-color: #fff;
				border-bottom-right-radius: 4px;
				border-bottom-left-radius: 4px;
				background-color: #fff;
			}
		}

	}

.btn-page-box{
	width: 100%;
	height: 50px;
	padding: 10px 20px;
	font-size: 12px;
	text-align: right;

	/deep/ .back{
		display: inline-block;
		width: 70px;
		height: 30px;
		line-height: 30px;
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

	/deep/ .save{
		display: inline-block;
		width: 70px;
		height: 30px;
		line-height: 30px;
		margin-left: 20px;
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

	/deep/ .next{
		display: inline-block;
		width: 70px;
		height: 30px;
		line-height: 30px;
		margin-left: 20px;
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