<template>
	<div :class="['search-box',isLong ? 'search-long' : '']">
		<div class="search-name" v-if="value.length > 0">已筛选：</div>
		<div class="search-items" ref="searchItems">
			<div :class="['search-item']" 
				v-for="(item,index) in value" 
				:key="index">
				<span>{{item.label}}：</span>
				<span>{{item.value}}</span>
				<span class="item-close" @click="closeClick(item)"></span>
			</div>
		</div>
		<span class="left" @click="leftClick()" v-if="isLong"></span>
		<span class="right" @click="rightClick()" v-if="isLong"></span>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: "SearchBox",
		props:{
			value:{
				type:Array,
				default:[]
				// [{
				// 	label:'条件',
				// 	value:'内容'
				// }]
			}
		},
		data(){
			return{
				isLong: false
			}
		},
		watch:{
			value(val,old){
				this.$nextTick( () => {
					this.adjustLong();
				})
			}
		},
		mounted(){
			this.adjustLong();
		},
		methods:{
			adjustLong(){
				if(this.$refs.searchItems.scrollWidth > Math.ceil(this.$refs.searchItems.getBoundingClientRect().width)){
					this.isLong = true;
				}else{
					this.isLong = false;
				}
			},
			leftClick(){
				this.$refs.searchItems.scrollLeft = this.$refs.searchItems.scrollLeft - 100;
			},
			rightClick(){
				this.$refs.searchItems.scrollLeft = this.$refs.searchItems.scrollLeft + 100;
			},
			closeClick(item){
				let attr = this.value.filter( valueItem => !this.$utils.isEqual(valueItem,item))
				this.$emit('input',attr);

				this.$nextTick(() => {
					this.adjustLong();
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.search-box{
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding-left: 50px;

		&.search-long{
			padding: 0 30px 0 80px;
		}

		.search-name{
			position: absolute;
			width: 50px;
			top: 0;
			left: 0;
			text-align: right;
			white-space: nowrap;
		}

		.search-items{
			width: 100%;
			height: 100%;
			white-space: nowrap;
			overflow: hidden;
		}

		.search-item{
			display: inline-block;
			height: 34px;
			line-height: 34px;
			padding: 0 20px;
			margin-right: 50px;
			border: 1px solid #f5f5f5;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;

			.item-close{
				position: absolute;
				display: block;
				width: 40px;
				height: 34px;
				top: -1px;
				right: -40px;
				background-image: url(./../images/close.png);
				background-repeat: no-repeat;
				background-position: center;
				cursor: pointer;

				&:hover{
					background-image: url(./../images/close_hover.png);
				}
			}
		}


		.left{
			position: absolute;
			display: block;
			left: 50px;
			top: 0;
			width: 30px;
			height: 40px;
			cursor: pointer;
			background-color: #fff;
			background-image: url(./../images/left.png);
			background-repeat: no-repeat;
			background-position: center;
		}

		.right{
			position: absolute;
			display: block;
			right: 0;
			top: 0;
			width: 30px;
			height: 40px;
			cursor: pointer;
			background-color: #fff;
			background-image: url(./../images/right.png);
			background-repeat: no-repeat;
			background-position: center;
		}
	}
</style>