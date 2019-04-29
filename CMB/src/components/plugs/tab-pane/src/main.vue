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
					this.$emit('change',item.value)
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
		padding-top: 47px;
		background-color: #fff;

		.navs{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 1;

			.nav{
				display: inline-block;
				height: 36px;
				line-height: 36px;
				margin-right: 10px;
				width: 120px;
				text-align: center;
				color: #647283;
				background-color: #f5f8ff;
				cursor: pointer;
				vertical-align: top;
				box-sizing: border-box;

				&.active{
					height: 48px;
					line-height: 48px;
					color: #5a8af2;
					border-top-left-radius: 2px;
					border-top-right-radius: 2px;

					border-width: 2px 1px 0 1px;
					border-style: solid;
					border-color: #5a8af2 #eee #fff #eee;
				}
			}

		}

		.content{
			padding: 20px;
			width: 100%;
			height: 100%;
			border-width: 1px;
			border-style: solid;
			border-color: #eee;
			background-color: #f5f8ff;
		}
	}
</style>