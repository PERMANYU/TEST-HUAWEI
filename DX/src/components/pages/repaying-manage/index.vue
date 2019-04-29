<template>
	<div class="main-wrap">
		<div class="require-state">
			<Row class="search-row">
                <Col :span="3" class="require-statelabel">
                    <i class="icon-all"></i>
                    <span class="drop-sel">清退规则管理</span>
                </Col>

                <Col :span="5">
                    <Search placeholder="请输入清退规则名称或内部编码" @search="search"></Search>
                </Col>

                <Col :span="3" :offset="13" class="btn-box">
					<div class="menu-btn">
						 <div class="btn-box">
				            <div class="app__btn app__btn-add" @click="addRepay()">添加清退规则</div>
				        </div>
					</div>
                </Col>
            </Row>
		</div>
		<div class="require-data">
            <keep-alive>
                <component :is="currentView" ref="repay"></component>
            </keep-alive>
        </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				downFlag: false,
				currentView: 'repay',
			}
		},
		methods: {
			toggleDown() {
				this.downFlag = !this.downFlag
			},
			search(val) {
				this.$refs.repay.search(val);
			},
			addRepay() {
				this.$refs.repay.addRepay();
			}
		},
		components: {
			repay: () => import('./group/repay')
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
					padding-left: 20px;
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
					left: 110px;
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

                .menu-btn{
			        display: inline-block;
			        line-height: 0;
			        font-size: 12px;
			        clear: both;
			
			        .btn-box{
			            .app__btn{
			                margin-left: 10px;
			            }
			        }
			    }
			}
		}
		.require-data {
			height: 100%;
		}
	}
</style>