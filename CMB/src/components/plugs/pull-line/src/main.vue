<template>
	<div class="pull-line" @mousedown="mousedown">
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'PullLine',
		props:{
			min:{
				type: Number,
				default: 0
			},
			max:{
				type: Number,
				default: 1200
			}
		},
		data(){
			return{
				mouseClient:{
					x: 0,
					y: 0
				},
				isDestroyed: false,
				wStart:false,
				parentDraggable:false,
				minWidth:0,
				maxWidth:0
			}
		},
		mounted(){
			//开始获取父元素的初始宽度当成最小宽度
			this.minWidth = this.min === 0 ? parseInt(this.$el.parentNode.getBoundingClientRect().width) : this.min;

			this.maxWidth = this.max;

			setTimeout(() => {
				if(this.isDestroyed) return;
				document.addEventListener('mouseup',this.mouseup);
				document.addEventListener('mousemove',this.mousemoveEvent);
			},300)
		},
		destroyed(){
			this.isDestroyed = true;
			document.removeEventListener('mouseup', this.mouseup);
			document.removeEventListener('mousemove', this.mousemoveEvent);
		},
		methods:{
			mousemoveEvent(event){
				if(!this.wStart) return;
				event.preventDefault();
				event.stopPropagation();

				let movementX = event.clientX - this.mouseClient.x,
					parentNodeWidth = parseInt(this.$el.parentNode.getBoundingClientRect().width);
				if(parentNodeWidth <= this.minWidth && movementX < 0) return;
				if(parentNodeWidth >= this.maxWidth && movementX > 0) return;

				this.mouseClient.x = event.clientX;
				this.$emit('pullMove',parentNodeWidth + movementX);
				//获取父元素，设置宽度
				this.$el.parentNode.style.width = `${parentNodeWidth + movementX}px`;
			},
			mousedown(event){
				this.$emit('pullStart');
				this.wStart = true;
				this.mouseClient.x = event.clientX;
				this.mouseClient.y = event.clientY;
				this.parentDraggable = this.$el.parentNode.getAttribute('draggable');

				this.$el.parentNode.setAttribute('draggable',false)
			},
			mouseup(event){
				if(this.wStart){
					this.$emit('pullEnd');
				}
				this.wStart = false;
				if(this.parentDraggable){
					this.$el.parentNode.setAttribute('draggable',true)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.pull-line{
		position: absolute;
		top: 0;
		right: 0;
		width: 3px;
		height: 100%;
		background-color: transparent;
		cursor: ew-resize;

		&:hover{
			background-color: $mainColor;
		}
	}
</style>