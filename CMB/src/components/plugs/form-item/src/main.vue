<template>
	<div :class="['form-item',small ? 'form-item-small' : '']" :style="itemStyleObj">
		<label class="f-i-l" :style="labelStyleObj">
			<span>
				<i v-if="requiredIcon" class="required-icon">*</i>
				{{labelText}}
			</span>
		</label>
		<div :class="['f-i-i',errorMessage ? 'error-input' : '']" style="">
			<div :class="[errorMessageInline || successMessageInline ? 'ib' : '']">
				<slot></slot>	
			</div>
			<span v-show="errorMessage" :class="['error-message',errorMessageInline ? 'ib' : '']">{{ errorMessage }}</span>
			<span v-show="isSuccess" :class="['success-message',successMessageInline ? 'ib' : '']"></span>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'FormItem',
		props:{
			labelText: String,
			labelWidth: { // 10px  ||  10%
				type: String,
				default: '80px'
			}, 
			labelAlign: { //left  center  right
				type: String,
				default: 'right'
			},
			errorMessage:{//错误提示
				type: String,
				default: ''
			},
			errorMessageInline:{ //错误提示是否在一行
				type: Boolean,
				default: false
			},
			isSuccess:{
				type: Boolean,
				default: false
			},
			successMessageInline:{ //正确提示是否在一行
				type: Boolean,
				default: false
			},
			requiredIcon:{//是否必填icon
				type: Boolean,
				default: false
			},
			small:Boolean

		},
		data(){
			return{
				labelStyleObj:{
					textAlign: this.labelAlign,
					width: this.labelWidth
				},
				itemStyleObj:{
					paddingLeft: this.labelWidth
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.form-item{
		min-height: 60px;

		&.form-item-small{
			min-height: 30px;
		}

		.f-i-l{
			display: block;
			position: absolute;
			left: 0;
			min-height: 30px;
			line-height: 30px;
			padding-right: 5px;

			span{
				display: inline-block;
				word-wrap: break-word;
				line-height: normal;
			}

			.required-icon{
				color: #fe6e03;
				font-style: normal;
			}
		}

		.f-i-i{
			display: block;
			width: 100%;
			min-height: 30px;
			line-height: 30px;
			vertical-align: text-bottom;

			.error-message{
				display: block;
				color: #eb7c78;
				height: 20px;
				line-height: 20px;
				font-size: 12px;
				padding-left: 20px;

				&:after{
					content: '';
					display: block;
					position: absolute;
					top: 4px;
					left: 4px;
					width: 12px;
					height: 12px;
					background: url(./../images/caveat.png) no-repeat center;
					background-size: cover;
				}
			}

			.success-message{
				display: block;
				color: #9bca60;
				height: 20px;
				line-height: 20px;
				font-size: 12px;
				padding-left: 20px;

				&:after{
					content: '';
					display: block;
					position: absolute;
					top: 4px;
					left: 4px;
					width: 12px;
					height: 12px;
					background: url(./../images/correct.png) no-repeat center;
					background-size: cover;
				}
			}

			.ib{
				display: inline-block;
				vertical-align: middle;
			}
			
		}

		.error-input{

			/deep/ input{
				border-color: #eb7c78;
			}

			/deep/ textarea{
				border-color: #eb7c78;
			}
		}
	}
</style>