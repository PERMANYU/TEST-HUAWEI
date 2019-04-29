<template>
	<div class="tab-pane">
		<div class="navs">
			<span :class="['nav',curValue == item.value ? 'active' : '']" 
				v-for="(item,index) in tabs"
				@click="navClick(item)">{{item.label}}</span>
		</div>
		<div class="content"
			v-for="(item,index) in tabs" 
			:key="index"
			v-show="curValue == item.value">
			<slot :name="item.value"></slot>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: "TabPane",
		props:{
			value:'',
			tabs:{
				type:Array,
				default:[]
			},
			isAuto:{
				type: Boolean,
				default: true
			}
		},
		data(){
			return{
				curValue:''
			}
		},
		watch:{
			value(val,old){
				this.curValue = this.value;
			}
		},
		mounted(){
			this.value ? this.curValue = this.value : this.curValue = this.tabs[0].value;
		},
		methods:{
			navClick(item){
				if(this.isAuto){
					this.curValue = item.value;
				}else{
					this.$emit('change',item.value)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.tab-pane{
		width: 100%;
		height: 100%;
		padding-top: 40px;
		background-color: #fff;

		.navs{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 40px;
			line-height: 40px;
			border: 1px solid #f5f5f5;
			background-color: #fbfbfb;
			z-index: 1;

			.nav{
				display: inline-block;
				height: 39px;
				padding: 0 20px;
				color: #999;
				font-weight: bold;
				cursor: pointer;
				border-width: 0 1px;
				border-style: solid;
				border-color: transparent;
				box-sizing: border-box;

				&.active{
					color: $mainColor;
					background-color: #fff;
					border-width: 1px;
					border-style: solid;
					border-color: transparent #f5f5f5;
				}
			}

		}

		.content{
			width: 100%;
			height: 100%;
			border-width: 0 1px 1px;
			border-style: solid;
			border-color: #f5f5f5;
		}
	}
</style>