<template>
	<div :class="['right-menu',isScrollMove ? 'right-scroll-move' :'']">
		<div :class="['item',value == item.key ? 'active' : '']"
			v-for="(item,index) in menus"
			:key="index"
			@click="itemClick(item)">
			<div class="name">
				<span>{{item.name}}</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			value:{}
		},
		data(){
			return{
				menus:[{
					key:'basicFoldObj',
					name:'销售品基本信息'
				},{
					key:'pricesFoldObj',
					name:'资费/促销'
				},{
					key:'acceptFoldObj',
					name:'受理规则'
				},{
					key:'estimateFoldObj',
					name:'毛利预估'
				},{
					key:'apportionFoldObj',
					name:'公允价值静态分摊'
				}],
				isScrollMove: false,
				scrollMoveTimer:null
			}
		},
		methods:{
			itemClick(item){
				this.$emit('input',item.key);
			},
			scrollMove(){
				if(this.isScrollMove){
					clearTimeout(this.scrollMoveTimer);
				}
				this.isScrollMove = true;

				this.$nextTick( () => {
					this.scrollMoveTimer = setTimeout( () => {
						this.isScrollMove = false;
					},1000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.right-menu{
		position: absolute;
		left: -58px;
		top: 100px;
		border: 1px solid #ccc;
		transition: .3s all ease;
		box-shadow: 1px 1px 10px #eef4f9;
		z-index: 2;

		&:hover,&.right-scroll-move{
			left: 0;
		}

		.item{
			width: 60px;
			height: 60px;
			line-height: 60px;
			padding: 0 5px;
			background-color: #fff;
			cursor: pointer;

			&:hover{
				color: #52c994;
			}

			&.active{
				background-color: #5c9cf3;
				color: #fff;

				.name{
					border-bottom: 1px solid #5c9cf3;
				}
			}

			&:last-child{
				.name{
					border-bottom: 0;
				}
			}

			.name{
				display: inline-block;
				width: 100%;
				height: 100%;
				text-align: center;
				border-bottom: 1px solid #f5f5f5;

				span{
					display: inline-block;
					line-height: normal;
					vertical-align: middle;
				}
			}
		}
	}
</style>