<template>
	<div :class="['tab-box',isLong ? 'tab-long' : '']" >
		<div class="tab-items" ref="tabItems" @mouseleave="itemsMouseleave()">
			<span :class="['tab-item',isActive(item) ? 'active' : '']" :ref="isActive(item) ? 'activeItem' : ''" v-for="(item,index) in tabs" @click="itemClick(item)" @mouseover="itemMouseover($event)">{{item.name}}</span>
			<div class="active-line" :style="activeLineStyle"></div>
		</div>
		<span class="left" @click="leftClick()" @mousedown="leftMousedown()" v-if="isLong"></span>
		<span class="right" @click="rightClick()" @mousedown="rightMousedown()" v-if="isLong"></span>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: "TabBox",
		props:{
			value:{},
			tabs:{
				type:Array,
				default:[]
			}
		},
		data(){
			return{
				isLong: false,
				activeLineStyle:{
					width: '0',
					left: '0'
				}
			}
		},
		watch:{
			value(val,old){
				this.$nextTick( () => {
					this.adjustActiveLineStyle(this.$refs.activeItem[0])
				})
			}
		},
		mounted(){
			if(this.$refs.tabItems && this.$refs.tabItems.scrollWidth > this.$refs.tabItems.getBoundingClientRect().width){
				this.isLong = true;
			}

			if(this.value && this.value.name){
				if(!this.tabs.find(item => item.name == this.value.name)){
					this.$emit('input',this.tabs[0]);
				}
			}else{
				this.$emit('input',this.tabs[0]);
			}

			this.$nextTick( () => {
				this.itemsMouseleave();
			})
		},
		methods:{
			itemClick(item){
				this.$emit('input',item);
			},
			isActive(item){
				return this.$utils.isEqual(this.value,item);
			},
			leftClick(){
				this.$refs.tabItems.scrollLeft = this.$refs.tabItems.scrollLeft - 100;
			},
			rightClick(){
				this.$refs.tabItems.scrollLeft = this.$refs.tabItems.scrollLeft + 100;
			},
			leftMousedown(){

			},
			rightMousedown(){
				
			},
			adjustActiveLineStyle(target){
				let targetRect = target.getBoundingClientRect();
				let elRect = this.$el.getBoundingClientRect();

				this.activeLineStyle.width = `${targetRect.width}px`;
				this.activeLineStyle.left = this.isLong ? `${targetRect.left - elRect.left - 30 + this.$refs.tabItems.scrollLeft}px` : `${targetRect.left - elRect.left + this.$refs.tabItems.scrollLeft}px`;
			},
			itemMouseover(event){
				this.adjustActiveLineStyle(event.target);
			},
			itemsMouseleave(){
				if(!this.$refs.activeItem[0]) return;
				if(!this.$el) return;
				let activeRect = this.$refs.activeItem[0].getBoundingClientRect();
				let elRect = this.$el.getBoundingClientRect();

				this.activeLineStyle.width = `${activeRect.width}px`;
				this.activeLineStyle.left = this.isLong ? `${activeRect.left - elRect.left - 30 + this.$refs.tabItems.scrollLeft}px` : `${activeRect.left - elRect.left + this.$refs.tabItems.scrollLeft}px`;
			}
		}
	}
</script>

<style scoped lang="scss">
	.tab-box{
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #f5f5f5;

		&.tab-long{
			padding: 0 30px;
		}

		.tab-items{
			width: 100%;
			height: 100%;
			white-space: nowrap;
			overflow: hidden;


			.active-line{
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100px;
				height: 2px;
				background-color: $mainColor;
				transition: .2s all ease-in-out;
			}
		}

		.tab-item{
			display: inline-block;
			height: 40px;
			padding: 0 10px;
			cursor: pointer;
			margin-right: 3px;

			&.active{
				color: $mainColor;
			}
		}

		.left{
			position: absolute;
			display: block;
			left: 0;
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