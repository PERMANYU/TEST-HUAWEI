<template>
	<div class="new-tab">
		<div class="content">
			<div class="cpcp">
				
			</div>
			<div class="search">
				<Input type="" name="" v-model="offerName" placeholder="请输入销售品内部名称"  @keyup.enter.native="offerSearch"></Input>
				<span class="icon" @click="offerSearch"></span>
			</div>
			<Row class="fun-box">
				<Col :span="6">
					<span class="fun fun-1" @click="funClick(1)"></span>
					<span class="fun-name">销售品</span>
				</Col>
				<Col :span="6">
					<span class="fun fun-2" @click="funClick(2)"></span>
					<span class="fun-name">产品</span>
				</Col>
				<Col :span="6">
					<span class="fun fun-3" @click="funClick(3)"></span>
					<span class="fun-name">主数据</span>
				</Col>
				<Col :span="6">
					<span class="fun fun-4" @click="funClick(4)"></span>
					<span class="fun-name">销售品视图</span>
				</Col>
			</Row>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				offerName:''
			}
		},
		methods:{
			offerSearch(){
				this.$router.push({ name: 'Goods', params:{offerName: this.offerName}});
			},
			funClick(val){
				switch(val){
					case 1:
						this.$router.push({ path: '/main/goods'});
						return;
					case 2:

						return;
					case 3:

						return;
					case 4:
						this.$router.push({ path: '/main/requirement-view'});
						return;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.new-tab{
		display: table;
		width: 50%;
		height: 100%;
		margin: 0 auto;
		text-align: center;

		.content{
			display: table-cell;
			vertical-align: middle;

			.cpcp{
				width: 100%;
				height: 30px;
				background-image: url(./images/cpcp.png);
	            background-repeat: no-repeat;
	            background-position: center;
			}

			.search{
				width: 100%;
				height: 40px;
				line-height: 40px;
				padding: 0 50px 0 30px;
				margin-top: 30px;
				border-radius: 40px;
				background-color: #f5f6fa;
				text-align: left;
				font-size: 14px;

				/deep/ input{
					width: 100%;
					height: 40px;
					line-height: 40px;
					border: 0;
					background-color: transparent;

					&:focus{
						border: 0 !important;
					}
				}

				.icon{
					position: absolute;
					display: block;
					right: 20px;
					top: 11px;
					width: 18px;
					height: 18px;
					background-image: url(./images/search.png);
		            background-repeat: no-repeat;
		            background-position: center;
					cursor: pointer;
				}
			}

			.fun-box{
				margin-top: 30px;

				.col{
					.fun{
						display: block;
						width: 50px;
						height: 50px;
						margin: 0 auto;
						border-radius: 50%;
						background-color: #f5f6fa;
						background-repeat: no-repeat;
			            background-position: center;
			            cursor: pointer;

			            &.fun-1{
			            	background-image: url(./images/fun_1.png);
			            }

			            &.fun-2{
			            	background-image: url(./images/fun_2.png);
			            }

			            &.fun-3{
			            	background-image: url(./images/fun_3.png);
			            }

			            &.fun-4{
			            	background-image: url(./images/fun_4.png);
			            }

					}
				}
			}

			
		}

		
	}
</style>