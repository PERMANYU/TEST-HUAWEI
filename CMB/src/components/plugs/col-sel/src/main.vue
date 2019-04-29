<template>
	<div class="col-sel" @mouseenter="mouseenter()" @mouseleave="hide()">
		<div class="triangle-b" v-if="isShowContent"></div>
		<div class="triangle-t" v-if="isShowContent"></div>
		<div class="c-s-main" v-if="isShowContent" ref="content">
			<div class="s-m-order order-a" 
				@click="orderClick('asc')"
				v-if="showOrder">升序 {{startStr}} to {{endStr}}</div>
			<div class="s-m-order order-z" 
				@click="orderClick('desc')"
				v-if="showOrder">降序 {{endStr}} to {{startStr}}</div>
			<div class="s-m-line"
				v-if="showOrder"></div>
			<div class="s-m-search">筛选</div>
			<div class="s-m-content">
				<slot></slot>
			</div>
			<div class="s-m-operation">
				<div class="m-o-confirm" @click="orderConfirm()">确定</div>
				<div class="m-o-clear" @click="hide()">取消</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'ColSel',
		props:{
			type:{
				type: String,
				default: 'string'
			},
			showOrder:{
				type: Boolean,
				default: true
			}
		},
		data(){
			return{
				isShowContent:false
			}
		},
		computed:{
			startStr(){
				switch(this.type.toLowerCase()){
					case 'number':
						return '0';
					default :
						return 'A';
				}
			},
			endStr(){
				switch(this.type.toLowerCase()){
					case 'number':
						return '9';
					default :
						return 'Z';
				}
			}
		},
		methods:{
			mouseenter(){
				this.isShowContent = true;
				this.$nextTick(() => {
					let rect = this.$refs.content.getBoundingClientRect();

					if(rect.x + rect.width + document.documentElement.scrollLeft > document.body.clientWidth){
						this.$refs.content.style.left = `-${rect.width - 20}px`;
					}
				})
				
			},
			hide(){
				this.isShowContent = false;
			},
			orderClick(type){
				this.isShowContent = false;
				this.$emit('order',type);
			},
			orderConfirm(){
				this.isShowContent = false;
				this.$emit('confirm');
			}
		}
	}
</script>

<style scoped lang="scss">
	.col-sel{
		display: none;
		position: absolute;
		width: 14px;
		height: 14px;
		line-height: normal;
		top: 13px;
		right: 10px;
		background: url(./../images/select.png) no-repeat center;

		.triangle-b{
			display: block;
			position: absolute;
			top: 1px;
			left: calc(50% - 10px);
			width: 0;
			height: 0;
			border-width: 10px;
			border-style: solid;
			border-color: transparent transparent #eef4f9 transparent;
		}

		.triangle-t{
			display: block;
			position: absolute;
			top: 5px;
			left: calc(50% - 8px);
			width: 0;
			height: 0;
			border-width: 8px;
			border-style: solid;
			border-color: transparent transparent #fff transparent;
			z-index: 1;
		}


		.c-s-main{
			display: inline-block;
			min-width: 200px;
			left: -93px;
			top: 20px;
			padding: 10px;
			background-color: #fff;
			box-shadow: 2px 2px 2px #eef4f9;
			border: 1px solid #eef4f9;
			border-radius: 4px;
			font-weight: normal;
			text-align: left;

			.s-m-order{
				line-height: 20px;
				padding-left: 20px;
				cursor: pointer;

				&:hover{
					background-color: #f6f7f9;
				}

				&.order-a{
					background-image: url(./../images/order_a.png);
					background-repeat: no-repeat;
					background-position: 0;
				}

				&.order-z{
					background-image: url(./../images/order_z.png);
					background-repeat: no-repeat;
					background-position: 0;
				}
			}

			.s-m-line{
				width: 100%;
				height: 1px;
				margin: 10px 0;
				background-color: #eef4f9;
			}

			.s-m-search{
				padding-left: 20px;
				background: url(./../images/select_content.png) no-repeat;
				background-position: 0;
			}

			.s-m-content{
				width: 100%;
				padding: 10px;
				margin-top: 10px;
				background-color: #f8f9fb;
			}

			.s-m-operation{
				height: 20px;
				margin-top: 10px;
				text-align: right;

				.m-o-confirm,.m-o-clear{
					display: inline-block;
					height: 20px;
					padding: 0 10px;
					line-height: 18px;
					border: 1px solid $mainColor;
					color: $mainColor;
					cursor: pointer;
					border-radius: 4px;

					&:hover{
						background-color: $mainColor;
						color: #fff;
					}
				}
			}
		}
	}
</style>