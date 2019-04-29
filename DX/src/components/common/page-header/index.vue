<template>
	<div class="header">
		<div class="logo"></div>

		<div class="menu">
			<div class="m-item" v-for="(item,index) in menuTopList" @click="menuClick(item)">
				<span class="m-i-name">{{item.menuName}}</span>
			</div>
			<div class="m-item m-open">
				<span class="m-i-name">
                    更多功能    
                </span>

				<div class="m-i-sub">
					<div v-for="(item,index) in menuOtherList" :key="index">
						<Row>
							<Col :span="24">
							<span class="i-s-title">{{item.menuName}}</span>
							</Col>
						</Row>
						<Row>
							<Col :class="['i-s-item','i-s-'+childrenItem.menuIcon]" :span="8" v-for="(childrenItem,childrenIndex) in item.children" :key="childrenIndex" @click.native="menuClick(childrenItem)">
							<span>{{childrenItem.menuName}}</span>
							</Col>
						</Row>
					</div>

					<!-- <div class="i-s-footer">
						<div class="s-f-config">设置</div>
						<div class="s-f-defined">切换到自定义</div>
					</div> -->
				</div>
			</div>
		</div>

		<div class="user">
			<!-- 委托管理 -->
			<!-- <Authorize></Authorize> -->
			
			<div class="u-head">

			</div>
			<div class="u-name u-open">
				<span class="u-n-hi">hi , {{$user.getInfo().userStorage.staffName}}</span>

				<div class="u-n-sub">
					<div class="n-s-exit" @click="exitLogin()">
						退出
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import Menu from '@/assets/js/menu';

	export default {
		data() {
			return {
				menuTopList: Menu.menuTopList(),
				menuOtherList: Menu.menuOtherList(),
				menuList: [],
				menuObj: {
					menuName: "",
					children: []
				}
			}
		},
		mounted() {

		},
		methods: {
			menuClick(item) {
				// this.$emit('menuClick', () => ({
				// 	//需要加载的组件
				// 	component: import(`@/components/pages/${item.component}`),
				// 	//异步组件加载时使用的组件
				// 	loading: LoadingComponent,
				// 	//加载失败时使用的组件
				// 	error: ErrorComponent,
				// 	//展示加载时组件的延时时间
				// 	delay: 200,
				// 	//超时时间，显示失败组件
				// 	timeout: 3000
				// }))

				// let componentObj = {
				// 	menuId: item.menuId,
				// 	component: () => import(`@/components/pages/${item.componentName}`),
				// 	componentName: item.componentName,
				// 	menuName: item.menuName
				// }

				// this.$emit('menuClick',componentObj);
				// this.$router.push({ path: item.componentName })

				this.$emit('menuClick',item);

				if(this.$route.path == `/main/${item.componentName}`){
					this.$router.push({ path: `/main/blank` });
					return;
				}


				if(item.menuId == '0-0'){
					this.$router.push({ path: `/` });
				}else{
					this.$router.push({ path: `/main/${item.componentName}` });
				}
				
			},
			exitLogin() {
				this.$user.exitLogin()
			},
		},
		 components: {
			Authorize: () => import('@/components/common/page-header/group'),
		}
	}
</script>
<style scoped lang="scss">
	.header {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: $mainColor;
		
		.logo {
			position: absolute;
			top: 0;
			left: 20px;
			width: 212px;
			height: 100%;
			background: url(./images/cpc_logo.png) no-repeat center;
		}
		.menu {
			width: 100%;
			height: 60px;
			padding: 0 350px 0 250px;
			text-align: right;
			.m-item {
				display: inline-block;
				width: 100px;
				height: 100%;
				line-height: 60px;
				text-align: center;
				cursor: pointer;
				color: #fff;
				font-size: 14px;
				vertical-align: top;
				&:hover {
					&.m-open {
						&:after {
							transform: rotate(90deg);
							right: 0;
						}
					}
					.m-i-name {
						transition: all .3s ease;
						font-size: 18px;
						font-weight: bold;
					}
				}
				&.m-open {
					&:after {
						content: '';
						display: block;
						position: absolute;
						width: 10px;
						height: 60px;
						top: 0;
						right: 5px;
						transition: all .3s ease;
						background: url(./images/shouqi.png) no-repeat center;
					}
				}
				&.m-open:hover .m-i-sub {
					display: block;
				}
				.m-i-sub {
					display: none;
					position: absolute;
					width: 500px;
					line-height: normal;
					left: -200px;
					top: 60px;
					background-color: #fff;
					color: #666;
					font-size: 12px;
					box-shadow: 2px 4px 10px #9c9a9a;
					z-index: 9999;
					cursor: default;
					text-align: left;
					&:after {
						content: '';
						display: block;
						position: absolute;
						width: 0;
						height: 0;
						top: -10px;
						left: 245px;
						border-width: 5px;
						border-style: solid;
						border-color: transparent transparent #fff transparent;
					}
					.col {
						padding-left: 20px;
					}
					.i-s-title {
						font-weight: bold;
					}
					.i-s-item {
						cursor: pointer;
						padding-left: 30px;
						background-repeat: no-repeat;
						background-position: 10px;
						&:hover {
							opacity: .8;
						}
					}
					.i-s-M-CPC-100001 {
						background-image: url(./images/xuqiudanguanli.png);
					}
					.i-s-M-CPC-100002 {
						background-image: url(./images/shuxingguanli.png);
					}
					.i-s-M-CPC-100006 {
						background-image: url(./images/muluguanli.png);
					}
					.i-s-M-CPC-100003 {
						background-image: url(./images/fuwutigongguanli.png);
					}
					.i-s-M-CPC-100004 {
						background-image: url(./images/zhutiyuguanli.png);
					}
					.i-s-M-CPC-100005 {
						background-image: url(./images/xitongbiaoguanli.png);
					}
					.i-s-M-CPC-100007 {
						background-image: url(./images/zifeimobanguanli.png);
					}
					.i-s-M-CPC-100008 {
						background-image: url(./images/zifeimobanguanli.png);
					}
					.i-s-M-CPC-100009 {
						background-image: url(./images/xuqiudanguanli.png);
					}
					.i-s-M-CPC-100010 {
						background-image: url(./images/xuqiudanguanli.png);
					}
					.i-s-M-CPC-100011 {
						background-image: url(./images/xuqiudanguanli.png);
					}
					.i-s-M-CPC-100012 {
						background-image: url(./images/xuqiudanguanli.png);
					}
					.i-s-M-CPC-100015 {
						background-image: url(./images/xiaoshoupingzuguanli.png);
					}
					.i-s-footer {
						width: 100%;
						height: 30px;
						line-height: 30px;
						border-top: 1px solid #f2f2f2;
						.s-f-config {
							float: left;
							margin-left: 90px;
							padding-left: 30px;
							&:after {
								content: '';
								display: block;
								position: absolute;
								width: 20px;
								height: 100%;
								left: 10px;
								top: 0;
								background: url(./images/shezhi.png) no-repeat center;
							}
						}
						.s-f-defined {
							float: right;
							margin-right: 90px;
							padding-left: 30px;
							&:after {
								content: '';
								display: block;
								position: absolute;
								width: 20px;
								height: 100%;
								left: 10px;
								top: 0;
								background: url(./images/zidingyi.png) no-repeat center;
							}
						}
					}
				}
			}
		}
		.user {
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			max-width: 350px;
			padding: 0 50px;
			.u-message {
				width: 20px;
				height: 100%;
				float: left;
				background: url(./images/tixing.png) no-repeat center;
				margin-right: 20px;
				cursor: pointer;
				span {
					display: block;
					position: absolute;
					top: 12px;
					right: 0;
					width: 14px;
					height: 14px;
					line-height: 14px;
					color: #fff;
					text-align: center;
					background-color: #e60012;
					border-radius: 50%;
				}
			}
			.u-head {
				width: 40px;
				height: 100%;
				float: left;
				background: url(./images/touxiang.png) no-repeat center;
				margin-right: 20px;
				cursor: pointer;
			}
			.u-name {
				height: 100%;
				line-height: 60px;
				max-width: 150px;
				font-size: 14px;
				color: #fff;
				float: left;
				padding-right: 15px;
				cursor: pointer;
				&:hover {
					&.u-open {
						&:after {
							transform: rotate(90deg);
						}
					}
					.u-n-sub {
						display: block;
					}
				}
				&.u-open {
					&:after {
						content: '';
						display: block;
						position: absolute;
						width: 10px;
						height: 60px;
						top: 0;
						right: 0;
						transition: all .3s ease;
						background: url(./images/shouqi.png) no-repeat center;
					}
				}
				.u-n-hi {
					display: block;
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.u-n-sub {
					display: none;
					position: absolute;
					width: 120px;
					line-height: normal;
					left: -25px;
					top: 60px;
					padding: 10px;
					box-sizing: border-box;
					background-color: #fff;
					color: #666;
					font-size: 12px;
					box-shadow: 2px 4px 10px #9c9a9a;
					z-index: 99;
					cursor: default;
					&:after {
						content: '';
						display: block;
						position: absolute;
						width: 0;
						height: 0;
						top: -10px;
						left: 55px;
						border-width: 5px;
						border-style: solid;
						border-color: transparent transparent #fff transparent;
					}
					.n-s-exit {
						width: 100%;
						height: 30px;
						line-height: 30px;
						background-color: #edfaf4;
						padding-left: 50px;
						box-sizing: border-box;
						cursor: pointer;
						&:after {
							content: '';
							display: block;
							position: absolute;
							width: 15px;
							height: 100%;
							top: 0;
							left: 20px;
							background: url(./images/exit.png) no-repeat center;
						}
					}
				}
			}
		}
	}
</style>