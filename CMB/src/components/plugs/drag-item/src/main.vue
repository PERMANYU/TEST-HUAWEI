<template>
	<Col v-bind="$attrs" 
		draggable="true" 
		@dragstart.native="$parent.dragstart($event,value)" 
		@dragend.native="$parent.dragend($event,value)" 
		@dragenter.native="$parent.dragenter($event,value)" 
		@dragleave.native="$parent.dragleave($event,value)">
		<slot></slot>
	</Col>
</template>

<script type="text/javascript">
	export default{
		name: 'DragItem',
		props:{
			value:{}
		},
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.draging{
		position: relative;

		&:after{
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 2px;
			height: 20px;
			background-color: $mainColor;
		}
	}
</style>