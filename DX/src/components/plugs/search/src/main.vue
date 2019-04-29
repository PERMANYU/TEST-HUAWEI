<template>
	<div class="search">
		<Input v-bind="$attrs" 
			v-model.trim="inputData" 
			@keyup.enter.native="searchClick()"></Input>
		<div class="right">
			<span class="icon" @click="searchClick()"></span>
		</div>
	</div>
	
</template>

<script type="text/javascript">
	export default{
		name:'Search',
		props:{

		},
		data(){
			return{
				inputData:''
			}
		},
		methods:{
			searchClick(){
				this.$emit('search',this.inputData);
			},
			setValue(val){
				this.inputData = val;
			}
		}
	}
</script>

<style scoped lang="scss">
	.search{
		height: 40px;
		line-height: 40px;
		padding-right: 60px;

		/deep/ input{
			border-radius: 0;
		}

		.right{
			position: absolute;
			top: 0;
			right: 0;
			width: 60px;
			height: 100%;

			.icon{
				display: inline-block;
				width: 100%;
				height: 30px;
				background-color: $mainColor;

				background-image: url(./../images/search.png);
				background-repeat: no-repeat;
				background-position: center;
				cursor: pointer;
				vertical-align: middle;
			}
		}

		
	}
</style>