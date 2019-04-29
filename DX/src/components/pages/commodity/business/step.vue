<template>
	<div class="step">
		<div :class="['step-item',isActive(item)]"
			v-for="(item,index) in stepArray"
			:key="index">
			<div class="i-name"
				@click="stepClick(item)">
				{{item.nodeName}}
			</div>
			<div class="i-next">
				
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			value:{},
			componentData:{}
		},
		data(){
			return{
                stepArray:[],
                parentName:'',
				defaultArray:[{
                    nodeName:'销售品配置',
                    nodeCode:'goods',
                    nodeType:'edit',
                    showScope:'edit',
                    active: true
                },{
                    nodeName:'配置目标客户',
                    nodeCode:'customer',
                    nodeType:'edit',
                    showScope:'edit',
                    active: false
                },{
                    nodeName:'配置销售渠道',
                    nodeCode:'channel',
                    nodeType:'edit',
                    showScope:'edit',
                    active: false
                },{
                    nodeName:'配置促销资源',
                    nodeCode:'sales',
                    nodeType:'edit',
                    showScope:'edit',
                    active: false
                },{
                    nodeName:'配置客户服务',
                    nodeCode:'service',
                    nodeType:'edit',
                    showScope:'edit',
                    active: false
                },{
                    nodeName:'测试验证',
                    nodeCode:'validate',
                    nodeType:'edit',
                    showScope:'edit',
                    active: false
                },{
                    nodeName:'发布上市',
                    nodeCode:'release',
                    nodeType:'edit',
                    showScope:'edit',
                    active: false
                }]
			}
		},
		watch:{
			
		},
		created(){
            //特殊权限  supplementary页面跳转过来的可以修改所有销售品
            this.parentName = this.$parent.$parent.$options.name;
		},
		mounted(){
           
		},
		methods:{
			stepClick(item){
				if(item.showScope == 'hide'){
					this.$message.error({message:'没有访问权限！'});
					return;
				}
				this.$emit('change',item);
			},
			isActive(item){
				return this.$utils.isEqual(this.value,item) ? 'active' : '';
			},
			isSave(item){
				return item.isSave ? 'success' : '';
			},
			next(){
				for(let i = 0; i < this.stepArray.length; i++){
					if(this.value.nodeName == this.stepArray[i].nodeName){
						if(i == this.stepArray.length - 1) return;
						if(this.stepArray[i+1].showScope == 'hide'){
							this.$message.error({message:'没有访问权限！'});
							return;
						}
						this.$emit('input',this.stepArray[i+1]);
						return
					}
				}
			},
            getNodeAndComponent(){
            	if(this.componentData.actType == 'MOD'){
            		this.$axios.get(this.$api.GetNodeAndComponent, {
	                    params: {
	                    	objId: this.componentData.offerId,
	                    	objType: '1000',
	                        requirementId: this.componentData.requirementId,
	                        userId: this.$user.getInfo().id,
	                        operType: 'edit'
	                    }
	                }).then(res => {
	                    if(res.data.success == true) {
	                        this.stepArray = res.data.nodes || [];
	
	                        let activeStep = this.stepArray.find( item => item.active == 'true');
	
	                        if(activeStep){
	                        	this.$emit('input',activeStep);
	                        }else if(!this.stepArray.find(item => item.nodeName == this.value.nodeName)){
								this.$emit('input',this.stepArray.filter( stepItem => stepItem.showScope !== 'hide')[0]);
							}
	
							this.$emit('taskObj',res.data.task);
	
	
	                    } else {
	                        this.$message.error({ message: '查询节点失败！' });
	                    }
	                }).catch(error => {
	                    this.$message.error({message: error.response.data.msg});
	                })
            	}else{
            		if(!this.componentData.requirementId ||　this.parentName == 'OfferSupplementary'){
	                	this.stepArray = [...this.defaultArray];
	
	                	if(!this.stepArray.find(item => item.nodeName == this.value.nodeName)){
							this.$emit('input',this.stepArray.filter( stepItem => stepItem.showScope !== 'hide')[0]);
						}
	                	return;
	                }
	                this.$axios.get(this.$api.GetNodeAndComponent, {
	                    params: {
	                    	objId: this.componentData.offerId,
	                    	objType: '1000',
	                        requirementId: this.componentData.requirementId,
	                        userId: this.$user.getInfo().id
	                    }
	                }).then(res => {
	                    if(res.data.success == true) {
	                        this.stepArray = res.data.nodes || [];
	
	                        let activeStep = this.stepArray.find( item => item.active == 'true');
	
	                        if(activeStep){
	                        	this.$emit('input',activeStep);
	                        }else if(!this.stepArray.find(item => item.nodeName == this.value.nodeName)){
								this.$emit('input',this.stepArray.filter( stepItem => stepItem.showScope !== 'hide')[0]);
							}
	
							this.$emit('taskObj',res.data.task);
	
	
	                    } else {
	                        this.$message.error({ message: '查询节点失败！' });
	                    }
	                }).catch(error => {
	                    this.$message.error({message: error.response.data.msg});
	                })
            	}
            }
		}
	}
</script>

<style scoped lang="scss">
	.step{
		position: absolute;
		top: 50px;
        left: 0;
		width: 100%;
		height: 76px;
		line-height: 70px;
		padding: 0 20px;
        border-bottom: 6px solid #f5f5f5;
        border-top: 1px solid #f5f5f5;

		.step-item{
			display: inline-block;
			width: 14.2%;
			max-width: 160px;

			.i-name{
				display: inline-block;
				width: 100px;
				height: 36px;
				line-height: 36px;
				background-color: #f5f5f5;
				text-align: center;
				color: #254063;
				vertical-align: middle;
				cursor: pointer;
			}

			.i-next{
				display: inline-block;
				width: calc(100% - 104px);
				height: 20px;
				background-image: url(./../images/pzlcjt.png);
				background-repeat: no-repeat;
				background-position: center;
				vertical-align: middle;
			}

			&:last-child{
				.i-next{
					display: none;
				}
			}

			&.active{
				.i-name{
					background-color: #5c9cf3;
					color: #fff;
				}
			}
		}
	}
</style>