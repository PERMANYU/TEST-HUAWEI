<template>
	<div class="radio-group">
		<Radio v-bind="$attrs"
			v-for="(item,index) in data"
			:key="index"
			:label="item.value"
			:value="value"
			@input="handleInput"
			@change="handleChange">{{item.label}}</Radio>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'RadioGroup',
		props:{
			value:{},
			data:{
				type:Array,
				default:[]
				// {
				// 	label:'xx',
				// 	value:'xx'
				// }
			}
		},
		data(){
			return{

			}
		},
		methods:{
			handleInput(val){
				this.$emit('input',val);
			},
			handleChange(val){
				this.$emit('change',val);
			}
		}
	}
</script>

<style scoped lang="scss">
	.radio-group{
		display: inline-block;
		width: 100%;
		height: 100%;
		text-align: left;

		.radio{
			margin-right: 20px;

			&:last-child{
				margin-right:0;
			}
		}
	}
</style>