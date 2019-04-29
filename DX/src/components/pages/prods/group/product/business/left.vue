<template>
	<div class="left">
        <div class="title">
            <span>{{isOpen ? '产品结构目录' : ''}}</span>
            <span :class="['icon',isOpen ? 'icon-close' : 'icon-open']" @click="leftClick()"></span>
        </div>
        <div class="tree-box">
            <TreeSimple v-for="(item,index) in prodTrees" v-model="proTreesObj" :keys="treeShowKeyItems" :folder="item" :key="index" :children-str="'children'"  :init-level="1" :level-str="'level'" :is-indent="false" :is-row-click="true" :tree-active-row="treeActiveRow" :is-all-show="isOpen"></TreeSimple>
        </div>
    </div>
</template>

<script type="text/javascript">
	export default{
        props: {
             componentData:{}
        },
		data(){
			return{
                requirementId:this.componentData.requirementId,
                prodId:this.componentData.prodId,
                isOpen: true,
                staff:222,  
                treeShowKeyItems:[{key:'prodName'}],
                treeActiveRow:{key:'prodId',id:''},
                prodTrees:[],
                proTreesObj:'',
                curProdObj:{},
			}
        },
        watch:{
            proTreesObj:function(NewValue,OldValue){
                this.$emit('changeId',NewValue)
            },
            curProdObj:function(val,old){
                this.$emit('mainProdId',val.prodId)
            }
        },
        created() {
            this.findProdTrees();
        },
		methods:{
            leftClick(){
                if(this.isOpen){
                    this.$el.style.width = '60px';
                }else{
                    this.$el.style.width = '200px';
                }

                this.isOpen = !this.isOpen;

                this.$emit('leftClick',this.isOpen);
            },
            findProdTrees() {
                this.$axios.get(this.$api.QureyOrdProdTree,{
                    params : {
                        prodId:this.prodId,
                        createStaff:this.staff
                    }
                }).then((res) => {
                    if(res.data.success == true){
                        this.prodTrees = res.data.products.products;
                        //TODO 临时获取产品实例，待修改
                        if(this.prodTrees[0].prodId && this.prodTrees[0].prodId == this.prodId){
                            this.curProdObj = this.prodTrees[0];
                        }else{
                            for(let item of this.prodTrees[0].children){
                               
                                if(item.prodId == this.prodId){
                                    this.curProdObj = item;
                                    break;
                                }
                                let isContinue = false;

                                for(let subItem of item.children){
                                    if(subItem.prodId == this.prodId){
                                        this.curProdObj = subItem;
                                        isContinue = true;
                                        break;
                                    }
                                }

                                if(isContinue) break;

                            }
                        }
                        

                    }else{
                        this.$message.error({ message : res.data.msg })
                    }

                })
                .then( res => {
                    // console.log(res);
                });
            }
		}
	}
</script>

<style scoped lang="scss">
	.left{
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 100%;
        border-right-width: 10px;
        border-right-style: solid;
        border-right-color: #f5f5f5;
        transition: .3s all ease;
        overflow: hidden;

        .title{
            height: 20px;
            line-height: 20px;
            margin: 20px 30px 20px 0;
            font-size: 16px;
            color: $mainColor;
            text-align: center;
            border-left-width: 5px;
            border-left-style: solid;
            border-left-color: $mainColor;
            white-space: nowrap;

            .icon{
                position: absolute;
                display: block;
                right: -15px;
                top: 3px;
                width: 14px;
                height: 14px;
                background-repeat: no-repeat;
                background-position: center;
                cursor: pointer;

                &.icon-close{
                    background-image: url(./../images/close.png);
                }

                &.icon-open{
                    background-image: url(./../images/open.png);
                }
            }
        }
    }
</style>