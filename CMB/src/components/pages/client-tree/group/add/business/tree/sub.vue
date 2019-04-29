<template>
	<ul>
		<li v-for="(child, index) in children" :key="index">
			<Treem :folder="child"
				:curLevel="curLevel + 1"
                  @deletes="deleteNode(index)" />
		</li>
	</ul>
</template>

<script type="text/javascript">
    import Treem from './main';

	export default{
		props:{
			children:{
				type: Array,
				default: function(){
					return []
				}
			},
			curLevel:{
				type:Number,
				default:1
            }
		},
		data(){
			return{

			}
        },
        methods: {
            // 删除子组件节点
            deleteNode (index) {
                this.children.splice(index, 1)
            }
        },
        components:{
            Treem
        }
	}
</script>

<style lang="scss" scoped>
	
</style>