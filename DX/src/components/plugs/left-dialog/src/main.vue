<template>
	<div :class="['left-dialog', isShow ? 'active' : '']" @click="leftDialogClick()" @wheel.stop>
		<span class="close" @click="hide()"></span>
		<slot></slot>
		<span class="back" @click="hide()" v-if="isShowBack">返回</span>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'LeftDialog',
		props:{
			value:{},
			isShowBack:{
				type: Boolean,
				default: false
			}
		},
		data(){
			return{
				isShow: false
			}
		},
		mounted(){
			document.addEventListener('click', this.globalClick);
		},
		destroyed(){
			document.removeEventListener('click', this.globalClick);
		},
		methods:{
			show(){
				this.isShow = true;
			},
			hide(){
				this.$emit('close');
				this.isShow = false;
			},
			leftDialogClick(){

			},
			globalClick(e){
				if(!this.$el.contains(e.target) && this.isShow){
					this.$emit('close');
					this.isShow = false
				}
			},
			removeClickEvent(){
				document.removeEventListener('click', this.globalClick);
			},
			addClickEvent(){
				document.addEventListener('click', this.globalClick);
			}
		}
	}
</script>

<style scoped lang="scss">
	.left-dialog{
		position: fixed;
		width: 70%;
		height: calc(100% - 60px);
		top: 60px;
		left: 100%;
		background-color: #fff;
		box-shadow: 0 1px 6px rgba(0,0,0,.2);
		z-index: 101;
		transition: all .3s ease;

		&.active{
			left: 30%;
		}

		.close{
			position: absolute;
			display: block;
			top: 10px;
			right: 10px;
			width: 30px;
			height: 30px;
			background: url(./../images/close.png) no-repeat center;
			cursor: pointer;
			z-index: 1;

			&:hover{
				opacity: .8;
			}
		}

		.back{
			position: absolute;
			display: block;
			padding: 0 20px 0 40px;
			height: 30px;
			line-height: 30px;
			bottom: 20px;
			right: 20px;
			background-color: $mainColor;
			text-align: center;
			border-radius: 4px;
			cursor: pointer;
			color: #fff;

			&:after{
				content: '';
				position: absolute;
				display:block;
				width: 20px;
				height: 100%;
				top: 0;
				left: 10px;
				background: url(./../images/return.png) no-repeat center;
			}

			&:hover{
				opacity: .8;
			}
		}
	}
</style>