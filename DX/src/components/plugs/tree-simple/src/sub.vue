<template>
	<ul>
		<li v-for="child in children">
			<TreeSimple :isStart="false"
				:value="value" 
				:folder="child" 
				:parent="own" 
				:keys="keys" 
				:childrenStr="childrenStr" 
				:levelStr="levelStr" 
				:initLevel="initLevel" 
				:curLevel="curLevel" 
				:operation="operation" 
				:defaultObj="defaultObj" 
				:selLevel="selLevel"
				:dialogModel="dialogModel"
				:ellipsis="ellipsis"
				:mainTree="mainTree"/>
		</li>
	</ul>
</template>

<script type="text/javascript">
	export default{
		props:{
			value: {},
			children:{
				type: Array,
				default: function(){
					return []
				}
			},
			keys:{
				type: Array,
				default: []
			},
			childrenStr:{
				type: String,
				default: 'children'
			},
			levelStr:{
				type: String,
				default: 'level'
			},
			initLevel:{
				type:Number,
				default: 0
			},
			curLevel:{
				type:Number,
				default:1
			},
			operation:{
				type:Object,
				default:{}
			},
			defaultObj:{
				type:Object,
				default:{}
			},
			own:{
				type: Object,
				default: null
			},
			selLevel:{
				type:Number,
				default:1
			},
			dialogModel:Boolean,
			ellipsis:{
				type: Boolean,
				default:true
			},
			mainTree:null
		},
		data(){
			return {

			}
		}
	}
</script>

<style type="text/css">
	
</style>