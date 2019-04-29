<template>
    <component :is="currentView" ref="component"></component>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
            	currentView:'',
                codeConfig:{
                    'P-CPC-100003':'index2', //配置
                    'P-CPC-100004':'index1' //审批
                }

            }
        },
        created(){
            let privCode = this.$user.getInfo().privCode;
            this.currentView = this.codeConfig[privCode];
        },
        methods:{

        },
        components:{
            index1: () => import('./group/index1'),
            index2: () => import('./group/index2')
        }
    }
</script>
<style scoped lang="scss">

</style>
