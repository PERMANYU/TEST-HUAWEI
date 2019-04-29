<template>
	<div class="main-wrap">
		<div class="require-state">
			<Row class="search-row">
			
				<Col :span="5">
					<Search placeholder="请输入访问组名称" @search="search"></Search>
				</Col>
			
				<Col class="btn-box" :span="15" :offset="4">
					<div class="app__btn btn-add" @click="clickAdd()">添加可见性组</div>
				</Col>
			</Row>
		</div>
		<div class="require-data">
			<keep-alive>
				<component :is="currentView" @componentView="componentView"  @changeSearchData="changeSearchData" v-if="currentView = 'havedone'" ref="haveDone"></component>
			</keep-alive>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentView: 'havedone',
				activeIndex: 0,
				dialogTitle: '',
				dialogSize: {
					min: 300,
					max: 350
				},
				tabView: 'select1',
				iscur: 1,
				downFlag: false,
				itemIndex:1,
				searchData:[],
			}
		},

        watch: {
            //监听searchData
            searchData: function(val,oldval){
                this.$refs.haveDone.titleSearch(this.searchData);
            }
        },
        mounted(){

        },

		methods: {
            //修改searchData
            changeSearchData(val){
                this.searchData = this.searchData.filter( item => item.label != val.label);
                this.searchData.push(val);
            },
			startrequire() {

			},
			
			downClick(val) {
				this.dataLabel = val + "数据"
			},
			pull() {

			},
			// 添加可见性组
			clickAdd() {
				this.$emit('componentView', 'add', {})
			},
			search(val) {
				this.$refs.haveDone.search(val);
			},
			componentView(type, item){
				if (type == 'add') {
					this.$emit('componentView', 'add',item) // 修改
				} else if (type == 'detail') {
					this.$emit('componentView', 'info', item) // 详情
					
				}
			}
			
		},
		components: {
			havedone: () =>
				import('./group/havedone')
		}
	}
</script>

<style scoped lang="scss">
	.main-wrap {
		height: 100%;
		padding: 0 20px 50px;
		.require-state {
			height: 50px;
			line-height: 50px;
			font-size: 14px;
			color: #333;
			position: relative;
			z-index: 3;
			.require-statelabel {
				float: left;
				height: 30px;
				line-height: 30px;
				padding: 5px 0 0 20px;
				.icon-all {
					position: absolute;
					display: block;
					width: 18px;
					height: 18px;
					margin-top: 6px;
					margin-right: 8px;
					background: url(images/all.png) no-repeat center;
					background-size: 18px 18px;
				}
				.drop-sel {
                    min-width: 100px;
					padding: 0 20px 0 20px;
				}
				.alllabel {
					display: inline-block;
					float: left;
					margin-right: 6px;
					cursor: pointer;
				}
				.icon-down {
					position: absolute;
					display: block;
					width: 12px;
					height: 12px;
					margin-top: 10px;
					left: 100px;
					background: url(images/down.png) no-repeat center;
					background-size: 10px 6px;
				}
				.down-menu {
					position: absolute;
					top: 40px;
					left: 0;
					z-index: 2;
					width: 100%;
					background-color: #fff;
					display: none;
					border: 1px solid #F3F3F3;
					border-radius: 5px;
					.tab {
						display: block;
						float: left;
						width: 100%;
						height: 30px;
						margin-top: 10px;
						text-decoration: none;
						line-height: 30px;
						color: #323232;
						text-align: center;
						&:hover {
							background-color: #dff1fc;
						}
					}
					&.active {
						display: block;
					}
				}
			}
			.search-row {
				padding-top: 5px;
				
				.btn-box{
                    text-align: right;
                    padding-right: 10px;

                    .btn-add{
                        padding: 0 15px 0 30px;
                        background-color: #fff;
                        color: $mainColor;
                        border: 1px solid $mainColor;
                        background-image: url(./images/add.png);
                        background-repeat: no-repeat;
                        background-position: 10px;
                        &:hover{
                            background-color: $mainColor;
                            color: #fff;
                            background-image: url(./images/add_hover.png);
                            background-repeat: no-repeat;
                            background-position: 10px;
                        }
                    }
                }
			}
		}
		.require-data {
			height: 100%;
			.require-data-header {
				height: 50px;
				line-height: 50px;
				.all-data {
					float: left;
				}
				.cpc__btn-tab-box {
					float: right;
				}
			}
		}
	}

	.req-item {
		position: relative;
		width: 90px;
		height: 90px;
		margin: 30px auto;
		border: solid 1px #f5f5f5;
		cursor: pointer;
		color: #333;
		.prods-icon{
			width: 26px;
			height: 26px;
			margin: 22px auto 0;
			background: url(images/cp.png) no-repeat center;
			background-size: 26px 26px;
		}
		.goods-icon{
			width: 26px;
			height: 26px;
			margin: 22px auto 0;
			background: url(images/sp1.png) no-repeat center;
			background-size: 26px 26px;
		}
		p{
			text-align: center;
			font-family: MicrosoftYaHei;
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 40px;
			letter-spacing: 0px;
			color: #333333;
		}
		.req-selected{
			position: absolute;
			right: 6px;
			bottom: 6px;
			width: 16px;
			height: 16px;
			background: url(images/weixuanzhong_03.png) no-repeat center;
			background-size: 16px 16px;
		}
		&.active{
			color: $mainColor;
			border: solid 1px $mainColor;
			.prods-icon{
				background: url(images/cpb.png) no-repeat center;
				background-size: 26px 26px;
			}
			.goods-icon{
				background: url(images/sp.png) no-repeat center;
				background-size: 26px 26px;
			}
			p{
				color: $mainColor;
			}
			.req-selected{
				background: url(images/xuanzhong_03.png) no-repeat center;
				background-size: 16px 16px;
			}
		}
		&:hover{
			color: $mainColor;
			border: solid 1px $mainColor;
			.prods-icon{
				background: url(images/cpb.png) no-repeat center;
				background-size: 26px 26px;
			}
			.goods-icon{
				background: url(images/sp.png) no-repeat center;
				background-size: 26px 26px;
			}
			p{
				color: $mainColor;
			}
		}
	}
	.h-operation{
		width: 100%;
		padding: 0 10px;
		transition: .3s all ease;
		background-color: #fff;
	}
</style>
