<template>
	<div class="condition-search">
		<span class="input-container" v-for="(item,index) in data" :key="index">
			<span class="app__bgGradualChange">
				<span :class="['iconfont',item.iconfont]"></span>
			</span>

			<div :class="['select',item.isSelect ? 'all' : '']" @click="selectDropdown(item)" v-if="item.options">
				<span :title="getSelectValue(item)">{{getSelectValue(item)}}</span>
			</div>

			<Scroll class="select-dropdown" v-if="item.options" v-show="item.selectDropdownShow" ref="selectDropdown">
				<ul>
					<li @click="itemClick(item)">请选择</li>
					<li :class="[item.optionValue == optionItem.value ? 'active' : '']" 
						v-for="(optionItem,optionIndex) in item.options" 
						:key="optionIndex"
						 @click="itemClick(item,optionItem)">{{optionItem.label}}</li>
				</ul>
			</Scroll>


			<input :class="[item.options ? 'options' : '',item.isSelect ? 'select-input' : '']" :value="item.default" type="" name="" :placeholder="item.placeholder" ref="input" @keyup.enter="search" @focus="inputFocus(item)" :readonly="item.readonly">
		</span>

		<span class="btn-container" @click="search">
			<span class="search">
				<span class="iconfont iconsousuokuangsousuo"></span>
			</span>
		</span>
	</div>
	
</template>

<script type="text/javascript">
	export default{
		name:'ConditionSearch',
		props:{
			data:{
				type: Array,
				default: function(){
					return []
				}
			}
			// [{
			// 	placeholder, //String | input输入框 placeholder内容
			// 	iconfont, //String | input输入框 左侧iconfont名称
			// 	param, //String | input输入框 查询返回字段名称
			//  default, //String | input输入框 默认值
			//  isSelect, //Boolean | 是否只有下拉选择
			// 	optionParam, //String | 下拉字段名称
			//  options:[{ //下拉选择数组
			// 		value: '', //下拉选择值
			// 		label: '' //下拉选择内容
			//  }],
			// 	optionValue:'' //下拉已选值
			// }]
		},
		data(){
			return{
				selectDropdownShow: false
			}
		},
		mounted(){
			document.addEventListener('click', this.globalClick);
		},
		destroyed(){
			document.removeEventListener('click', this.globalClick);
		},
		methods:{
			search(){ //检索按钮
				let valObj = {};
				this.$refs.input.map((item,index) => {
					valObj[this.data[index].param] = item.value;

					if(this.data[index].options){
						valObj[this.data[index].optionParam] = this.data[index].optionValue;
					}

				})
				this.$emit('search',valObj);
			},
			selectDropdown(item){ //下拉菜单
				this.$set(item,'selectDropdownShow',!item.selectDropdownShow);	
			},
			getSelectValue(item){ //获取已选择展示
				let optionItem = item.options.find(option => option.value == item.optionValue);
				return optionItem ? optionItem.label : item.isSelect ? item.placeholder : '请选择';
			},
			itemClick(item,option = {}){ //下拉选择
				item.optionValue = option.value;
				item.selectDropdownShow = false;
			},
			inputFocus(item){ //输入框选中事件
				this.$emit('focus',item);
			},
			globalClick(e){
				if(!this.$el.contains(e.target)){
					this.data.forEach( item => {
						if(item.selectDropdownShow) item.selectDropdownShow = false;
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.condition-search{
		.input-container{
			display: inline-block;
			vertical-align: middle;
			margin-right: 10px;

			.app__bgGradualChange{
				position: absolute;
				left: 3px;
				top: 3px;
				width: 24px;
				height: 24px;
				line-height: 24px;
				color: #fff;
				text-align: center;
				border-radius: 50%;
			}

			.select{
				position: absolute;
				display: inline-block;
				top: 1px;
				left: 30px;
				width: 80px;
				height: 28px;
				line-height: 28px;
				padding: 0 20px 0 5px;
				cursor: pointer;
				color: #5a8af2;
				border-right: 1px solid #eee;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;

				&.all{
					width: 220px;
					border-right: 0;
					color: #8e9aae;
				}


				&:after{
					content: '';
					position: absolute;
					top: calc(50% - 3px);
					right: 5px;
					width: 0;
					height: 0;
					border-width: 5px;
					border-style: solid;
					border-color: #5a8af2 transparent transparent transparent;
				}
			}

			.select-dropdown{
				position: absolute;
				display: inline-block;
				top: 30px;
				left: 30px;
				width: calc(100% - 40px);
				height: 200px;
				border: 0px solid #999;
				box-shadow: 0 1px 6px rgba(0,0,0,.2);
				background-color: #fff;
				padding: 0px 0px 5px;
				z-index: 5;

				li{
					height: 30px;
					line-height: 30px;
					padding: 0 10px;
					margin-top: 5px;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					cursor: pointer;
					color: #8e9aae;

					&.active,
					&:hover{
						background-color: #e9efee;
						color: #5a8af2;
					}
				}
			}

			input{
				width: 260px;
				height: 30px;
				outline: 0;
				border: 1px solid #eeeeee;
				border-radius: 15px;
				padding: 0 15px 0 35px;
				color: #8e9aae;

				&.options{
					padding: 0 15px 0 115px;
				}

				&.select-input{
					padding: 0 129px;
				}

				&:focus{
					border: 1px solid #5a8af2;
				}
			}

			input::-webkit-input-placeholder{
				color: #8e9aae;
			}
		}

		.btn-container{
			display: inline-block;
			vertical-align: middle;

			.search{
				display: inline-block;
				width: 80px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				border-radius: 15px;
				color: #fff;
				background-color: #5a8af2;
				cursor: pointer;
			}
		}
	}
</style>