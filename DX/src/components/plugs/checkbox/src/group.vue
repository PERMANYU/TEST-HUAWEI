<template>
	<div class="checkbox-group">
		<Checkbox v-if="showAll"
			@click.native="checkboxAllClick"
			:checked="isAll">全部</Checkbox>
		<Checkbox v-bind="$attrs"
			v-for="(item,index) in data"
			:key="index"
			:label="item.value"
			:value="value"
			@input="handleInput"
			@change="handleChange">{{item.label}}</Checkbox>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'CheckboxGroup',
		props:{
			value:{},
			data:{
				type:Array,
				default:[]
				// {
				// 	label:'xx',
				// 	value:'xx'
				// }
			},
			showAll:{
				type: Boolean,
				default: false
			}
		},
		data(){
			return{

			}
		},
		computed:{
			isAll(){
				return this.value && this.value.length === this.data.length;
			}
		},
		methods:{
			handleInput(val){
				this.$emit('input',val);
			},
			handleChange(val){
				this.$emit('change',val);
			},
			checkboxAllClick(){
				if(this.value && this.value.length !== this.data.length){
					let tempInputArray = this.data.map(item => item.value);
					this.$emit('input',tempInputArray);
				}else{
					this.$emit('input',[]);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.checkbox-group{
		display: inline-block;
		width: 100%;
		height: 100%;
		text-align: left;

		.checkbox{
			margin-right: 20px;

			&:last-child{
				margin-right:0;
			}
		}
	}
</style>