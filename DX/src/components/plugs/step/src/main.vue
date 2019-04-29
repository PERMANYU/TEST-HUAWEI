<template>
	<div class="step">
		<div :class="['s-item',
					's-item-' + index,
					step == index + 1 ? 'active' : step > index + 1 ? 'success' : '']"
			:style="{ left : itemLeft(index)}"
			@click="stepClick(item,index + 1)"
			v-for="(item,index) in stepList"
			:key="index">
			<div class="s-i-circle"></div>
			<div class="s-i-icon">
				<div :class="['i-i-bg',item.class ? item.class : 's-i-bg']"></div>
			</div>
			<div class="s-name">{{item.name}}</div>
		</div>
		<div class="s-line">
			<div class="s-l-progress" :style="{ width: progressWidth()}"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'Step',
		props:{
			step:0,
			stepList:{
				type:Array,
				default:[]
				// {
				// 	name:'填写',
				//	class:'ss'
				// }
			}
		},
		data(){
			return{
				stepWidth:0
			}
		},
		mounted(){
			let elRect = this.$el.getBoundingClientRect();
			this.stepWidth = 1 / (this.stepList.length - 1) * (elRect.width - 120);
		},
		methods:{
			progressWidth(){
				return 	`${(this.step - 1) * this.stepWidth}px`;
			},
			itemLeft(index){
				if(index === 0) return '20px';
				return `${index * this.stepWidth}px`;
			},
			stepClick(item,step){
				let stepObj = {
					item,
					step
				}
				this.$emit('stepClick',stepObj)
			}
		}
	}
</script>

<style scoped lang="scss">
	.step{
		width: 100%;
		height: 100px;

		.s-item{
			position: absolute;
			width: 80px;
			height: 60px;
			padding-top: 35px;
			margin-top: 20px;
			text-align: center;
			cursor: pointer;
			z-index: 1;

			&:hover{
				.s-name{
					color: $mainColor;
				}
			}

			&.active{
				padding-top: 45px;

				.s-i-circle{
					width: 40px;
					height: 40px;
					top: 0;
					left: 20px;
					background-color: $mainColor;
				}

				.s-i-icon{
					width: 26px;
					height: 26px;
					top: 7px;
					left: 27px;

				}

				.s-name{
					color: $mainColor;
				}

				.i-i-bg{
					width: 16px;
					height: 16px;
					background-repeat: no-repeat;
					background-position: center;
					background-size: 100%;
				}

				.s-i-bg{
					background-image: url(./../images/step.png);
				}
			}

			&.success{
				.s-i-circle{
					background-color: $mainColor;
				}
			}

			.s-i-circle{
				position: absolute;
				width: 20px;
				height: 20px;
				top: 10px;
				left: 30px;
				background-color: #ccc;
				border-radius: 50%;
				transition: all .5s ease;
			}

			.s-i-icon{
				position: absolute;
				width: 10px;
				height: 10px;
				top: 15px;
				left: 35px;
				background-color: #fff;
				border-radius: 50%;
				transition: all .5s ease;
				background-size: 0px 0px;
			}

			.i-i-bg{
				width: 0;
				height: 0;
				top: 50%;
				left: 50%;
				margin: -8px 0 0 -8px;
			}
		}

		.s-line{
			position: absolute;
			width: calc(100% - 135px);
			height: 6px;
			top: 38px;
			left: 55px;
			background-color: #ccc;
			z-index: 0;

			.s-l-progress{
				width: 0;
				height: 100%;
				background-color: $mainColor;
				transition: all .5s ease;
			}
		}
	}
</style>