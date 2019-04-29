<template>
    <div :class="['pagination',isCenter?'center':'']">
        <span class="first" @click="first">首页</span>
        <span class="prev" @click="prev">上一页</span>
        <span :class="['num',pager == index ? 'active' : '']" v-for="(pager,pagerIndex) in pagers" :key="pagerIndex" @click="go(pager)">{{ pager }}</span>

        <span class="next" @click="next">下一页</span>
        <span class="last" @click='last'>末页</span>

        共 {{pages}} 页 / {{rowCount}} 条

        <select @change="pageSizeChange" v-if="showPageSize">
            <option v-for="(item,index) in pageSizeArr" :key="index" :value="item" :selected="item == pageSize">每页{{item}}条</option>
        </select>

        &nbsp;
        <input type="" name="" v-model="inputNum">
        页
        <span class="go" @click="goClick()">Go</span>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            //显示的多少页数
            perPages: {
                type: Number,
                default: 5
            },
            //当前页码
            pageIndex: {
                type: Number,
                default: 1
            },
            //每页显示条数
            pageSize: {
                type: Number,
                default: 10
            },
            //总记录数
            rowCount: {
                type: Number,
                default: 0
            },
            isCenter:{
                type:Boolean,
                default:false
            },
            showPageSize:{
                type:Boolean,
                default:false
            },
            pageSizeArr:{
                type:Array,
                default: function(){
                    return [10,15,50,100]
                }
            }
        },
        data() {
            return {
                index: this.pageIndex, //当前页码
                limit: this.pageSize, //每页显示条数
                size: this.rowCount || 0, //总记录数
                showPrevMore: false,
                showNextMore: false,
                inputNum: ''
            }
        },
        watch: {
            pageIndex(val) {
                this.index = val || 1
            },
            pageSize(val) {
                this.limit = val || 10
            },
            rowCount(val) {
                this.size = val || 0
            }

        },
        computed: {
            //计算总页码
            pages() {
                return Math.ceil(this.size / this.limit)
            },
            //计算页码，当count等变化时自动计算
            pagers() {
                const array = []
                const perPages = this.perPages
                const pageCount = this.pages
                let current = this.index
                const _offset = (perPages - 1) / 2

                const offset = {
                    start: current - _offset,
                    end: current + _offset
                }

                //-1, 3
                if (offset.start < 1) {
                    offset.end = offset.end + (1 - offset.start)
                    offset.start = 1
                }
                if (offset.end > pageCount) {
                    offset.start = offset.start - (offset.end - pageCount)
                    offset.end = pageCount
                }
                if (offset.start < 1) offset.start = 1

                this.showPrevMore = (offset.start > 1)
                this.showNextMore = (offset.end < pageCount)

                for (let i = offset.start; i <= offset.end; i++) {
                    array.push(i)
                }

                return array;
            }
        },
        //相关操作事件
        methods: {
            first(){
                if (this.index != 1) {
                    this.go(1);
                }
            },
            prev(){
                if (this.index > 1) {
                    this.go(this.index - 1);
                }else{
                    this.$message.warning({message:'已是首页'});
                }
            },
            next(){
                if (this.index < this.pages) {
                    this.go(this.index + 1);
                }else{
                    this.$message.warning({message:'已是最后一页'});
                }
            },
            last(){
                if (this.index != this.pages) {
                    this.go(this.pages);
                }
            },
            goClick(){
                if(this.inputNum === "" || this.inputNum == null || isNaN(this.inputNum)){
                    this.$message.warning({message:'页数不存在'});
                    return;
                }else{
                    if(parseInt(this.inputNum) > this.pages || parseInt(this.inputNum) < 1){
                        this.$message.warning({message:'页数不存在'});
                        return;
                    }else{
                        this.go(parseInt(this.inputNum));
                    }
                    
                }
            },
            go(page){
                if (this.index != page) {
                    this.index = page;
                    //父组件通过change方法获取当前页码
                    this.$emit('change', this.index);
                }
            },
            pageSizeChange(e){
                this.$emit('pageSizeChange',e.target.value);
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

        &.center{
            text-align: center;
        }

        span{
            display: inline-block;
            height: 25px;
            line-height: 25px;
            border: 1px solid #f0f0f0;
            min-width: 25px;
            padding: 0 10px;
            margin: 0 5px;
        }

        .first,
        .prev,
        .next,
        .last,
        .num,
        .go{
            cursor: pointer;
            pointer-events: auto;

            &:hover{
                border: 1px solid $mainColor;
                background-color: $mainColor;
                color: #fff;
            }
        }

        .active{
            border: 1px solid $mainColor;
            background-color: $mainColor;
            color: #fff;
        }

        input{
            width: 30px;
            height: 25px;
            outline: 0;
            border: 1px solid #f0f0f0;
            padding-left: 5px;
            margin: 0 5px;

            &:focus{
                border: 1px solid $mainColor;
            }
        }

        select{
            height: 25px;
            margin: 0 10px;
            border: 1px solid #f0f0f0;
            outline: 0;
        }
    }
</style>



