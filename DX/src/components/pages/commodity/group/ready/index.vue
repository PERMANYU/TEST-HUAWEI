<template>
    <div class="ready">
        <div class="step-box">
            <TabBox :tabs="tabs" v-model="tab"></TabBox>
        </div>
        <component :is="currentView" @componentView="changeView" :componentData="componentData" @saveStatus="saveStatus" ref="component"></component>
    </div>
</template>

<script>
    export default {
        name: 'ready',
        props:{
            componentData:{}
        },
        data() {
            return {
                currentView:'basic',
                currentData:{},
                tabs:[{
                    name:'销售准备',
                    componentName:'basic'
                }],
                tab:''
            }
        },
        watch:{
            tab(val,old){
                this.stepClick(val);
            }
        },
        methods:{
            changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
            },
            stepClick(val){
                this.currentView = val.componentName;
            },
            save(){
                return new Promise( (resolve, reject) => {
                    let component = this.$refs.component;
                    try{
                        if(typeof(eval(component.save)) == "function"){
                            component.save(result => {
                                resolve(result == true);
                            });
                        }else{
                            resolve(true);
                        }
                    }catch(e){
                        resolve(true);
                    }
                })
            },
            saveStatus(val){
                this.$emit('saveStatus',val);
            }
        },
        components:{
            basic: () => import('./group/basic')
        }
    }
</script>
<style scoped lang="scss">
    .ready{
        width: 100%;
        height: 100%;
        padding-top: 40px;

        .step-box{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            line-height: 40px;

        }
    }
</style>
