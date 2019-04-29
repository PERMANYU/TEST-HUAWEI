<template>
	<div class="register">
	<!-- <Scroll class="scroll" :isShowRight="true">
		<div class="app__title app__title-bticon">业务登记单内容</div>
		<div class="h-a-add">
			<div class="app__btn app__btn-add" @click="addRegister()">选择模板</div>
		</div>
		<div class="contain">
			<ul>
				<li>
					<span><span class="n-span">1</span> 基本内容</span>
					<div class="a-v-info">
						<Row>
							<Col :span="6">
								<span class="v-i-label">销售品名称：</span>无
							</Col>
							<Col :span="6">
								<span class="v-i-label">销售品类型：</span>无
							</Col>
							<Col :span="6">
							<FormItem labelText="是否提示：" :requiredIcon="true">
								<Radio name="radio1" label="1">是</Radio>
								<Radio class="no-first" name="radio1" label="0">否</Radio>
							</FormItem>
							</Col>
						</Row>
					</div>
				</li>
				<li>
					<span><span class="n-span">2</span> 销售品内容</span>
					<div class="a-v-info">
						<Row class="s-row">
							<Col :span="18">
							<FormItem labelText="内容：">
								<Input></Input>
							</FormItem>
							</Col>
						</Row>
					</div>
				</li>
				<li>
					<span><span class="n-span">3</span> 月基本费(套内)</span>
					<div class="a-v-info">
						<Row class="s-row">
							<Col :span="18">
							<FormItem labelText="说明：">
								<Input></Input>
							</FormItem>
							</Col>
						</Row>
					</div>
				</li>
				<li>
					<span><span class="n-span">4</span> 超出资费</span>
					<div class="a-v-info">
						<Row class="s-row">
							<Col :span="18">
							<FormItem labelText="说明：">
								<Input></Input>
							</FormItem>
							</Col>
						</Row>
					</div>
				</li>
				<li>
					<span><span class="n-span">5</span> 订购当月资费</span>
					<div class="a-v-info">
						<Row class="s-row">
							<Col :span="18">
							<FormItem labelText="说明：">
								<Input></Input>
							</FormItem>
							</Col>
						</Row>
					</div>
				</li>
				<li>
					<span><span class="n-span">6</span> 其他说明</span>
					<div class="a-v-info">
						<Row class="s-row">
							<Col :span="18">
							<FormItem labelText="说明：">
								<Input></Input>
							</FormItem>
							</Col>
						</Row>
					</div>
				</li>
				<li>
					<span><span class="n-span">7</span> 协议期说明</span>
					<div class="a-v-info">
						<Row class="s-row">
							<Col :span="18">
							<FormItem labelText="说明：">
								<Input></Input>
							</FormItem>
							</Col>
						</Row>
					</div>
				</li>
			</ul>
		</div>
	</Scroll>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="选择业务登记单模板" ref="addRegister">
			<div class="d-info">
				<Row>
					<Col :span="8">
					<FormItem labelText="是否打印：">
						<Radio name="radio1" label="1">是</Radio>
						<Radio class="no-first" name="radio1" label="0">否</Radio>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :span="18">
					<FormItem labelText="是否打印：">
						<Radio name="radio2" label="1">乐享4G套餐</Radio>
						<Radio class="no-first" name="radio2" label="2">飞Young4G纯流量云卡套餐</Radio>
						<Radio class="no-first" name="radio2" label="3">4G无线上网卡包月套餐</Radio>
						<Radio name="radio2" label="4">乐享4G套餐</Radio>
						<Radio class="no-first" name="radio2" label="5">飞Young4G</Radio>
					</FormItem>
					</Col>
				</Row>
			</div>
		</Dialog> -->
		
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				dialogSize: {
					size: 80,
					min: 600,
					max: 800
				}
			}
		},
		methods: {
			addRegister() {
				this.$refs.addRegister.show();
			}
		}
	}
</script>

<style scoped lang="scss">
	.register {
		width: 100%;
		background: url(./images/soon.png) no-repeat center;

		.h-a-add {
			position: absolute;
			top: 15px;
			right: 10px;
			height: 30px;
		}
		.contain {
			ul {
				width: 100%;
				li {
					width: 100%;
					height: 90px;
					border: 1px solid gainsboro;
					border-left: 3px solid $mainColor;
					background: url(images/delete.png) no-repeat 95% center;
					margin-bottom: 10px;
					padding: 15px;
					.n-span {
						background: $mainColor;
					    border-radius: 50%;
					    color: #ffffff;
					    width: 18px;
					    height: 18px;
					    display: inline-block;
					    text-align: center;
					    line-height: 18px;
					}
					.a-v-info {
						margin-top: 10px;
						.no-first{
							margin-left: 30px;
						}
						.s-row {
							margin-left: -38px;
						}
					}
				}
			}
		}
	}
	.d-info {
		padding: 20px;
		.no-first{
			margin-left: 30px;
		}
	}
</style>