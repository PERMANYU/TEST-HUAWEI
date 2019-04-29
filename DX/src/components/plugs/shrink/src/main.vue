<template>
	<div :class="['shrink',isFloat ? 'shrink-float' : '']">
		<div class="left" 
			:style="leftStyleObj">
			<div class="content" :style="leftContentStyleObj">
				<slot name="shrink"></slot>
			</div>

			<div class="close" 
				v-show="isOpen" 
				ref="icon" 
				:style="iconStyleObj"
				@click="closeClick()">
			</div>

		</div>
		<div class="right"
			:style='rightStyleObj'>
			<slot></slot>
		</div>

		<div class="open" 
			v-show='!isOpen' 
			ref="icon" 
			:style="iconStyleObj" 
			@click="openClick()">
		</div>
		
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'Shrink',
		props:{
			leftWidth:{
				type: Number,
				default: 200
			},
			isFloat:{
				type: Boolean,
				default: false
			},
			initOpen:{
				type: Boolean,
				default: false
			}
		},
		data(){
			return{
				isOpen:false,
				leftStyleObj:{
					width: `0`
				},
				leftContentStyleObj:{
					width: `${this.leftWidth}px`
				},
				rightStyleObj:{
					paddingLeft:'15px'
				},
				iconStyleObj:{
					top: '0',
					left: '0'
				}
			}
		},
		watch:{
			isOpen(val,old){
				if(val){
					this.iconStyleObj.left = `${this.leftWidth - 15}px`;

					this.leftStyleObj.width = `${this.leftWidth}px`;

					if(this.isFloat) return;
					this.rightStyleObj.paddingLeft = `${this.leftWidth}px`;
				}else{
					this.iconStyleObj.left = '0';

					this.leftStyleObj.width = '0';
					this.rightStyleObj.paddingLeft = `${15}px`;
				}
			}
		},
		mounted(){
			let elRect = this.$el.getBoundingClientRect();
			this.iconStyleObj.top = `${elRect.height / 2 - 35}px`;
			this.isOpen = this.initOpen;
		},
		methods:{
			openClick(){
				this.isOpen = true;
			},
			closeClick(){
				this.isOpen = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	.shrink{
		width: 100%;
		height: 100%;
		vertical-align: middle;

		&.shrink-float{
			position: absolute;
			top: 0;
			left: 0;
		}

		.left{
			position: absolute;
			left: 0;
			top: 0;
			width: 0;
			height: 100%;
			border-right-width: 1px;
			border-right-style: solid;
			border-right-color: #f5f5f5;
			background-color: #fff;
			transition: .3s all ease;
			overflow: hidden;
			z-index: 1;

			.content{
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
		}

		.right{
			width: 100%;
			height: 100%;
			transition: .3s all ease;
		}

		.open{
			position: absolute;
			display: inline-block;
			width: 14px;
			height: 70px;
			left: 0;
			background-image: url(./../images/open.png);
			background-repeat: no-repeat;
			background-position: center;
			cursor: pointer;
			z-index: 2;
		}

		.close{
			position: absolute;
			display: inline-block;
			width: 14px;
			height: 70px;
			left: 0;
			background-image: url(./../images/close.png);
			background-repeat: no-repeat;
			background-position: center;
			cursor: pointer;
			z-index: 2;
		}
	}
</style>