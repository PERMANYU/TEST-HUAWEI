<template>
	<div class="upload">
		<input v-bind="$attrs" 
			type="file" 
			name="file" 
			ref="fileInput"
			@change="getFile">
		<div class="u-input" @click="uploadClick">
			上传附件
		</div>
		<div class="file-box" v-if="files.length > 0">
			<div :class="['file-item',item.url ? 'file-item-load' : '']" 
				v-for="(item,index) in files" 
				:key="index" 
				:title="item.name + '-' + getFileSize(item.size)">
				{{item.name}} - {{getFileSize(item.size)}}
				<span class="download" v-if="item.url">下载</span>
				<span class="del" @click="fileDel(index)">删除</span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'Upload',
		props:{
			data:{}
		},
		data(){
			return{
				files:[]
			}
		},
		mounted(){
			this.files = this.data || [];
		},
		methods:{
			uploadClick(){
				this.$refs.fileInput.click();
			},
			getFile(e){
				if(e.target.files.length === 0) return;
				this.files = Array.from(e.target.files);
				this.$emit('change',this.files);
			},
			getFileSize(size,type = 'B'){
				if(!size) return '???';
				if(size > 1024){
					switch(type){
						case 'B':
							return this.getFileSize(size/1024,'K');
						case 'K':
							return this.getFileSize(size/1024,'M');
						case 'M':
							return this.getFileSize(size/1024,'G');
						case 'G':
							return this.getFileSize(size/1024,'T');
						case 'T':
							return `${Math.round(size*100)/100 + type}`;
						default:
							return ''
					}
				}else{

					return `${Math.round(size*100)/100 + type}`;
				}
			},
			fileDel(index){
				this.files.splice(index,1);
				this.$emit('change',this.files);
			}
		}
	}
</script>

<style scoped lang="scss">
	.upload{
		width: 100%;
		height: 100%;
		font-size: 12px;
		
		.u-input{
			display: inline-block;
			height: 30px;
			line-height: 30px;
			padding: 0 10px;
			background-color: $mainColor;
			color: #fff;
			border-radius: 4px;
			vertical-align: middle;
			cursor: pointer;

			&:hover{
				opacity: .8;
			}
		}

		input{
			position: absolute;
			top: 0;
			left: 0;
			width: 0;
			height: 0;
			opacity: 0;
			z-index: 0;
		}

		.file-box{
			width: 100%;
			

			.file-item{
				width: 100%;
				height: 20px;
				line-height: 20px;
				padding-right: 40px;
				white-space: nowrap;
				text-overflow:ellipsis;
				overflow: hidden;

				&.file-item-load{
					padding-right: 80px;
				}

				.download{
					position: absolute;
					top: 0;
					right: 45px;
					width: 30px;
					height: 100%;
					cursor: pointer;
					color: $mainColor;
				}

				.del{
					position: absolute;
					top: 0;
					right: 5px;
					width: 30px;
					height: 100%;
					cursor: pointer;
					color: $mainColor;
				}

				&:hover{
					background-color: #f6f7f9;
				}
			}
		}
	}
</style>