<template>
	<div :class="['drag-group',inline ? 'drag-inline' : '']" @dragover="dragover($event)">
		<slot></slot>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'DragGroup',
		props:{
			titleList:Array,
			inline:{
				type:Boolean,
				default: false
			}
		},
		data(){
			return{
				isValidDrag: false,
				dragItem: null,
				dragenterItem: null,
				dragenterEl: null
			}
		},
		methods:{
			dragover(e){
				//拖放位置
				this.isValidDrag = true;
				e.preventDefault();
			},
			dragstart(e,val){
				//拖拽开始
				this.dragItem = val;
				this.$emit('dragstart');
			},
			dragend(e,val){
				//拖拽结束
				this.dragenterEl.classList.remove('draging');
				this.$emit('dragend');

				if(this.isValidDrag){
					if(val.param == this.dragenterItem.param) return;

					let titleArray = [...this.titleList.filter(item => item.param != val.param)];
					let newTitleArray = [];

					for(let i = 0; i < titleArray.length; i++){

						if(titleArray[i].param == this.dragenterItem.param){
							newTitleArray.push(val)
						}
						newTitleArray.push(titleArray[i])
					}
					this.$emit('dragchange',[...newTitleArray])
				}
			},
			dragenter(e,val){
				//拖拽位置进入
				this.dragenterItem = val;

				this.dragenterEl = e.target;
				e.target.classList.add('draging');
			},
			dragleave(e,val){
				//拖拽位置离开
				this.isValidDrag = false;
				e.target.classList.remove('draging');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.drag-group{
		min-height: 40px;
		line-height: 40px;

		&.drag-inline{
			display: inline-block;
			white-space: nowrap;
			font-size: 0;

			* {
				font-size: 12px;
			}
		}
		
		&:before{
			content: '';
			display: table;
		}

		&:after{
			content: '';
			clear: both;
			display: table;;
		}
	}
</style>