<template>
	<ul>
		<li v-for="child in children">
			<Tree :isStart="false"
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
				:ellipsis="ellipsis"
				:mainTree="mainTree"/>
		</li>
	</ul>
</template>

<script type="text/javascript">
	import Tree from './main';

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