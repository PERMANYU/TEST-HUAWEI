<template>
    <div :class="['pagination']">
        <span class="prev" @click="prev">上一页</span>
        <span :class="['num']">{{ pageIndex }}</span>
        <span class="next" @click="next">下一页</span>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            //当前页码
            pageIndex: {
                type: Number,
                default: 1
            }
        },
        //相关操作事件
        methods: {
            prev(){
                if (this.pageIndex > 1) {
                    this.go(this.pageIndex - 1);
                }else{
                    this.$message.warning({message:'已是首页'});
                }
            },
            next(){
                if (this.pageIndex) {
                    this.go(this.pageIndex + 1);
                }
            },
            go(index){
                //父组件通过change方法获取当前页码
                this.$emit('pageChange', index);
            }
        }
    }
</script>

<style scoped lang="scss">
    .pagination{
        padding: 0 30px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: right;

        span{
            display: inline-block;
            height: 25px;
            line-height: 25px;
            border: 1px solid #f0f0f0;
            min-width: 25px;
            padding: 0 10px;
            margin: 0 5px;
        }

        .prev,
        .next,
        .num{
            cursor: pointer;

            &:hover{
                border: 1px solid $mainColor;
                background-color: $mainColor;
                color: #fff;
            }
        }

        .num{
            border: 1px solid $mainColor;
            background-color: $mainColor;
            color: #fff;
        }
    }
</style>



