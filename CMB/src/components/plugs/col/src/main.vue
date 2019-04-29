<template>
	<div :class="['col','col-' + span, offset > 0 ? 'col-offset-' + offset : '']" :style="styleObject">
		<slot></slot>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'Col',
		props:{
			span:{
				type: Number,
				default: 24
			},
			offset:{
				type: Number,
				default: 0
			},
			width:{
				type: Number,
				default: 0
			}
		},
		data(){
			return{
				
			}
		},
		computed:{
			styleObject(){
				return this.width === 0 ? {} :{
					width: this.width == 'auto' ? `auto` : `${this.width}px`,
					float: 'none'
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.col{
		display: inline-block;
		float: left;
	}

	@for $i from 1 through 24{
		&.col-#{$i}{
			width:(100% / 24 * $i);
		}
	}

	@for $i from 1 through 24{
		&.col-offset-#{$i}{
			margin-left:(100% / 24 * $i);
		}
	}
</style>