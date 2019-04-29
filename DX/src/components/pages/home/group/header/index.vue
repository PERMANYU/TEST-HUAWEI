<template>
	<div class="header-main">
		<Header></Header>
		<div class="explain">
			<span class="e-ch"></span>
			<!-- <span class="e-en">Production And Sales Positioning</span> -->
		</div>
		<div class="search">
			<Input type="" name="" placeholder="请输入产品/销售品名称"></Input>
			<span class="s-icon"></span>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Header from '@/components/common/page-header';

	export default{
		data(){
			return {

			}
		},
		methods:{

		},
        components:{
        	Header
        }
	}
</script>

<style scoped lang="scss">
	.header-main{
		height: 290px;
		background: url(./images/banner.png) no-repeat center;
		background-size: cover;

		.header{
			position: relative;
			background-color: transparent;
		}

		.explain{
			width: 100%;

			.e-ch{
				display: block;
				width: 100%;
				height: 50px;
				margin-top: 40px;
				text-align: center;
				font-size: 24px;
				font-weight: bold;
				color: #fff;

				background: url(./images/title.png) no-repeat center;
			}

			.e-en{
				display: block;
				width: 100%;
				text-align: center;
				font-size: 14px;
				color: #fff;
			}
		}

		.search{
			width: 560px;
			margin: 40px auto 0;
			font-size: 14px;

			/deep/ input{
				width: 100%;
				height: 40px;
				line-height: 40px;
				color: #a0a0a0;
				border: 0;
				border-radius: 0;
				padding: 0 40px 0 20px;
				box-sizing: border-box;

				&:focus{
					border: 0 !important;
				}
			}

			.s-icon{
				display: block;
				position: absolute;
				top: 12px;
				right: 20px;
				width: 16px;
				height: 16px;
				cursor: pointer;
				background: url(./images/search.png) no-repeat center;
			}
		}


	}
</style>