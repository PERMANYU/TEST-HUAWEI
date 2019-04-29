<template>
	<div :class="['drop-sel',text ? 'drop-text' : 'drop-icon']" @click="dropClick()">
		<span>{{text}}</span>
		<div class="triangle-b" v-if="isShowContent"></div>
		<div class="triangle-t" v-if="isShowContent"></div>
		<div class="d-s-main" v-if="isShowContent" ref="content">
			<div class="s-m-item" :title="item.label" v-for="(item,index) in obj" @click="itemClick(item)">
				{{item.label}}
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'DropSel',
		props:{
			obj:{
				type:Array,
				default: []
				// {
				// 	label:'',
				// 	value:''
				// }
			},
			text:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				isShowContent:false
			}
		},
		mounted(){
			document.addEventListener('click', this.globalClick);
		},
		destroyed(){
			document.removeEventListener('click', this.globalClick);
		},
		methods:{
			dropClick(){
				if(this.isShowContent){
					this.isShowContent = false;
					return;
				}
				this.isShowContent = true;
			},
			itemClick(val){
				this.$emit('change',val);
			},
			globalClick(e){
				if(!this.$el.contains(e.target)){
					this.isShowContent = false
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.drop-sel{
		cursor: pointer;

		&.drop-text{
			display: inline-block;

			.d-s-main{
				left: 0;
			}
		}

		&.drop-icon{
			position: absolute;
			width: 14px;
			height: 14px;
			top: 13px;
			right: 5px;
			background: url(./../images/select.png) no-repeat center;

			.d-s-main{
				left: -43px;
			}
		}

		.triangle-b{
			display: block;
			position: absolute;
			top: 11px;
			left: calc(50% - 10px);
			width: 0;
			height: 0;
			border-width: 10px;
			border-style: solid;
			border-color: transparent transparent #eef4f9 transparent;
		}

		.triangle-t{
			display: block;
			position: absolute;
			top: 15px;
			left: calc(50% - 8px);
			width: 0;
			height: 0;
			border-width: 8px;
			border-style: solid;
			border-color: transparent transparent #fff transparent;
			z-index: 2;
		}


		.d-s-main{
			position: absolute;
			width: 100%;
			min-width: 100px;
			top: 30px;
			padding: 5px 0;
			background-color: #fff;
			box-shadow: 2px 2px 2px #eef4f9;
			border: 1px solid #eef4f9;
			border-radius: 4px;
			font-weight: normal;
			text-align: left;
			z-index: 1;

			.s-m-item{
				height: 30px;
				line-height: 30px;
				padding: 0 5px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				&:hover{
					background-color: #dff1fc;
				}
			}

		}
	}
</style>