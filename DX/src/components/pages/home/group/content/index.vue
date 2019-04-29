<template>
	<div class="content">
		<div class="c-quick">
			<div class="c-q-name">
				<span>快速通道</span>
			</div>
			<div class="c-q-config">
				<span>设置</span>
			</div>
		</div>
		<div class="c-menu">
			<ul>
                <li @click="fastMenuClick()"><p>销售品</p></li>
                <li><p>产品</p></li>
                <li><p>主数据</p></li>
                <li><p @click="goodsViewClick()">商品视图</p></li>
			</ul>
		</div>
		<div class="c-view">
			<div class="c-v-news c-v-main">
				<h3>我的待办<i></i></h3>
				<dl class="c-v-dl">
					<dd>
						<div class="viewtit"><p>销售品需求单</p></div>
						<div class="viewport">
							<p class="v-grade"><span>需求单名称：XXXXXXXX</span><span>三天到期</span></p>
							<p class="v-person"><span>发起人：张三</span><span>部门：业务部</span></p>
							<button>处理</button>
						</div>
					</dd>
					<dd>
						<div class="viewtit"><p>销售品需求单</p></div>
						<div class="viewport">
							<p class="v-grade"><span>需求单名称：XXXXXXXX</span><span>三天到期</span></p>
							<p class="v-person"><span>发起人：张三</span><span>部门：业务部</span></p>
							<button>处理</button>
						</div>
					</dd>
					<dd>
						<div class="viewtit"><p>销售品需求单</p></div>
						<div class="viewport">
							<p class="v-grade"><span>需求单名称：XXXXXXXX</span><span>三天到期</span></p>
							<p class="v-person"><span>发起人：张三</span><span>部门：业务部</span></p>
							<button>处理</button>
						</div>
					</dd>
					<dd>
						<div class="viewtit"><p>销售品需求单</p></div>
						<div class="viewport">
							<p class="v-grade"><span>需求单名称：XXXXXXXX</span><span>三天到期</span></p>
							<p class="v-person"><span>发起人：张三</span><span>部门：业务部</span></p>
							<button>处理</button>
						</div>
					</dd>
				</dl>
			</div>
			<div class="c-v-work c-v-main">
				<h3>操作记录<i></i></h3>
				<div class="v-record">
					<div class="v-list">
						<div class="v-time active">
							<p>2018-9-5</p>
							<p>17:48</p>
						</div>
						<div class="v-news">
							<dl>
								<dd>登录系统</dd>
								<dd>发起 <span>流量不限量199套餐</span> 销售品需求单</dd>
								<dd>发起 <span>全家享套餐</span> 销售品需求单</dd>
								<dd>发起 <span>流量不限量199套餐</span> 销售品需求单</dd>
							</dl>
						</div>
					</div>
					<div class="v-list">
						<div class="v-time">
							<p>2018-9-5</p>
							<p>17:48</p>
						</div>
						<div class="v-news">
							<dl>
								<dd>登录系统</dd>
								<dd>发起 <span>流量不限量199套餐</span> 销售品需求单...  <span class="more">更多</span></dd>
							</dl>
						</div>
					</div>
					<div class="v-list">
						<div class="v-time">
							<p>2018-9-5</p>
							<p>17:48</p>
						</div>
						<div class="v-news">
							<dl>
								<dd>登录系统</dd>
								<dd>发起 <span>流量不限量199套餐</span> 销售品需求单...  <span class="more">更多</span></dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return {

			}
		},
        methods: {
            fastMenuClick(){
                this.$router.push({path: `/main/goods`});
            },
            goodsViewClick() {
            	this.$router.push({path: `/main/requirement-view`});
            }
        }
	}
</script>

<style scoped lang="scss">
	.content{

		.c-quick{
			width: 100%;
			height: 60px;
			line-height: 60px;

			.c-q-name{
				position:relative;
				margin-left:70px;
				padding-left: 7px;
				float: left;
				height:60px;
				line-height: 60px;
				font-size: 16px;
				color: $mainColor;
			}
			.c-q-name:before{
				content: "";
				position: absolute;
				top: 23px;
				left: 0;
				z-index: 99;
				width: 3px;
				height: 14px;
				background-color: $mainColor;
			}
			.c-q-config{
				margin-right:70px;
				padding-left:18px;
				float:right;
				width: 47px;
				height: 60px;
				line-height: 60px;
				background:url(./images/setting.png) no-repeat;
				background-position:0px 23px;
				font-size: 14px;
				color: #666666;
				cursor:pointer;
			}
		}
		.c-menu{
			padding:0 140px;
			height: 92px;
			ul {
				width:100%;
				li{
					float: left;
					width: 24%;
					background-repeat:no-repeat;
					background-position:center 9px;
					p{
						margin:0 auto;
						width:120px;
						padding-top: 78px;
						height:14px;
						line-height:14px;
						font-size: 14px;
						color: #555555;
						text-align:center;
						cursor: pointer;
					}
				}

                li:nth-child(1){
                    background-image: url(./images/fast_1.png);

                    &:hover{
                        background-image: url(./images/fast_11.png);
                    }
                }
                li:nth-child(2){
                    background-image: url(./images/fast_2.png);

                    &:hover{
                        background-image: url(./images/fast_22.png);
                    }
                }
                li:nth-child(3){
                    background-image: url(./images/fast_3.png);

                    &:hover{
                        background-image: url(./images/fast_33.png);
                    }
                }
                li:nth-child(4){
                    background-image: url(./images/fast_4.png);

                    &:hover{
                        background-image: url(./images/fast_44.png);
                    }
                }

			}
		}
		.c-view{
			margin:30px 70px 0;
			height:353px;
			.c-v-main{
				width:47%;
				h3{
					position:relative;
					padding-left:7px;
					height: 22px;
					line-height: 22px;
					font-size:16px;
					font-weight: normal;
					color: $mainColor;
					i{
						position:absolute;
						top:4px;
						right:0;
						width:13px;
						height:13px;
						background:url(./images/more.png) no-repeat center;
						display: block;
						cursor: pointer;
					}
				}
				h3:before{
					content: "";
					position: absolute;
					top: 3px;
					left: 0;
					z-index: 99;
					width: 3px;
					height: 16px;
					background-color: $mainColor;
				}
			}
			.c-v-news{
				float:left;
				.c-v-dl{
					margin-top:31px;
					dd{
						margin-bottom:15px;
						height:60px;
						border: solid 1px #e5e5e5;
						border-radius: 4px;
						.viewtit{
							float:left;
							width:78px;
							padding-top:40px;
							height:20px;
							line-height:20px;
							p{
								color:#ffffff;
								font-size:12px;
								text-align:center;
							}
						}
						.viewport{
							margin:0 5px 0 78px;
							height:60px;
							background:#ffffff;
							.v-grade{
								padding:10px 0 0 22px;
								span:nth-child(1){
									font-size: 14px;
									color: #35c4e5;
								}
								span:nth-child(2){
									padding:0 5px;
									margin-left:10px;
									width: 60px;
									height: 20px;
									line-height: 20px;
									border-radius: 4px;
									border: solid 1px #ffae00;
									font-size: 12px;
									color: #ffae00;
									display:inline-block;
									text-align:center;
								}
							}
							.v-person{
								padding:5px 0 0 22px;
								span{
									font-size: 12px;
									color: #999999;
								}
								span:nth-child(2){
									margin-left: 95px;
								}
							}
							button{
								position:absolute;
								top:20px;
								right:24px;
								z-index:99px;
								width: 56px;
								height: 20px;
								background-color: $mainColor;
								border-radius: 4px;
								border:none;
								color: #ffffff;
								font-size:12px;
								cursor:pointer;
							}
						}
					}
					dd:nth-child(odd){
						background:$mainColor url(./images/commodity_2.png) no-repeat;
						background-position:28px 10px;
					}
					dd:nth-child(even){
						background:#6ed663 url(./images/product_2.png) no-repeat;
						background-position:28px 10px;
					}
				}
			}
			.c-v-work{
				float:right;
				.v-record{
					margin-top:31px;
					height:290px;
					border: solid 1px #f3f3f3;
					overflow-y:auto;
					.v-list{
						.v-time{
							position:relative;
							float:left;
							width:116px;
							p{
								font-size: 12px;
								height:20px;
								line-height: 20px;
								color: #999999;
								text-align:center;
							}
						}
						.v-time:before{
							content: "";
							position:absolute;
							top:6px;
							right:-4px;
							z-index:99;
							width:6px;
							height:6px;
							border-radius:6px;
							background-color: #999999;
							box-shadow: 0px 0px 0px 2px rgba(157, 161, 163, 0.23);
						}
						.active:before{
							background-color: $mainColor;
							box-shadow: 0px 0px 0px 2px rgba(0, 192, 255, 0.23);
						}
						.v-news{
							margin-left:116px;
							dl{
								padding-left:33px;
								padding-bottom:19px;
								border-left:1px solid #f3f3f3;
								dd{
									height:26px;
									line-height:26px;
									color:#999999;
									span{
										color:$mainColor;
									}
									.more{
										margin-left:20px;
										cursor:pointer;
									}
								}
							}
						}
					}
					.v-list:first-child{
						padding-top:20px;
					}
				}
			}
		}
	}
</style>
