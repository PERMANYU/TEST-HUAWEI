<template>
	<ul>
		<li v-for="(child, index) in children" :key="index">
			<TreeFolder :folder="child"
                @deletes="deletes(index)"
				:curLevel="curLevel + 1"/>
		</li>
	</ul>
</template>

<script type="text/javascript">
    import TreeFolder from './tree-folder';

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
            deletes (index) {
                this.children.splice(index, 1)
            }
        },
        components:{
            TreeFolder
        }
	}
</script>

<style lang="scss" scoped>
	
</style>