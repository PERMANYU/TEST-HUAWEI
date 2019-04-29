<template>
    <div class="shuttle-wrap" :configure="configure">
        <div class="title">配置模板字段</div>
        <div class="shuttle">
            <Scroll :isShowRight="true" ref="listScroll">
                <ul>
                    <li class="configuration-text" 
                        v-show="existData(item)"
                        :class="[curValue == item.name ? 'active' : '']"
                        v-for="(item,index) in configuration" :key="index"
                        @click="clickFlag ? handleClick(item, index) : ''"
                        >
                        {{item.name}}
                    </li>
                </ul>
            </Scroll>
        </div>     
        <div class="operation">
            <p class="transfer" @click="toRight">
                <i class="icon-arrow-right"></i>
            </p>
            <p class="transfer right-style" @click="toLeft">
                <i class="icon-arrow-left"></i>
            </p>
        </div>
        <div class="shuttle">
            <Scroll :isShowRight="true" ref="listScroll">
                <ul>
                    <li class="configuration-text"
                        v-for="(item,index) in rightItemData" :key="index"
                        :class="[curValue2 == item.name ? 'active' : '']"
                        @click="handleTwoClick(item, index)"
                        @dblclick="handledbTwoClick(item,index)"
                        >
                        {{item.name}}
                    </li>
                </ul>
            </Scroll>
        </div>
    </div>
</template>

<script>
export default {
    name:'ShuttleBox',
    props: {
        configuration: {
            type: Array,
            default: []
        },
        configure: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            // configuration: [
            //     {id: 1, name: '中文名称'},
            //     {id: 2, name: '保密等级'},
            //     {id: 3, name: '客户管控级别'},
            //     {id: 4, name: '客户级别'},
            //     {id: 5, name: '客户等级'},
            //     {id: 6, name: '重要客户标志'},
            //     {id: 7, name: '国标行业门类'},
            //     {id: 8, name: '水电费第三方'},
            //     {id: 9, name: '会感觉很干净'},
            //     {id: 10, name: '儿童热太热'},
            //     {id: 11, name: '而他认为二位'}
            // ],
            curValue: '',           // 左侧点击的当前数据
            curValue2: '',          // 右侧点击的当前数据
            saveLeftObj: {},
            saveRightObj: {},
            clickFlag: true,       // 是否可以点击
            saveRightIndex: '',     // 右侧的下标
            rightItemData: []       // 右侧数组
        }
    },
    methods: {     
        // 左边点击的当前数据
        handleClick (data, index) {        
            if (this.configure && this.rightItemData.length) {
                // 表示传进来的是只能配置单条数据
                this.$message.warning({message: '只能配置一条数据'})
                this.clickFlag = false
            } else {
                this.curValue = data.name
                this.saveLeftObj = data
                this.curValue2 = ''
            }
        },

        // 右边点击的当前数据
        handleTwoClick (data, index) {
            this.curValue2 = data.name
            this.saveRightObj = data
            this.saveRightIndex = index
            this.curValue = ''
        },

        //右侧双击
        handledbTwoClick(item,index) {
            this.rightItemData.splice(index, 1);
        },

        // 点击的-->箭头
        toRight () {
            if (this.curValue !== '') {
                this.rightItemData.push(this.saveLeftObj)
                this.curValue = ''
            }
        },

        // 点击的<--箭头
        toLeft () {
            if (this.curValue2 !== '') {
                this.rightItemData.splice(this.saveRightIndex, 1);
                this.clickFlag = true
            }
        },

        // 左侧该显示的数据
        existData(item){
            return !this.rightItemData.includes(item);
        }
    }
}
</script>

<style lang="scss" scoped>
.shuttle-wrap {
    padding: 10px 20px 20px;
    overflow: hidden;
    .title {
        margin: 0 0 10px;
        font-size: 14px;
    }
    .operation {
        float: left;
        height: 300px;
        margin: 0 20px;
        padding-top: 120px;
        .transfer {
            position: relative;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #00c0ff;
            cursor: pointer;
            .icon-arrow-right {
                font-size: 14px;
                &:before {
                    position: absolute;
                    left: 8px;
                    top: 10px;
                    content: "";
                    width: 8px;
                    height: 8px;
                    border-left: 1px solid #fff;
                    border-bottom: 1px solid #fff;
                    transform: rotate(225deg);
                }
            }
            .icon-arrow-left {
                font-size: 14px;
                &:before {
                    position: absolute;
                    left: 11px;
                    top: 10px;
                    content: "";
                    width: 8px;
                    height: 8px;
                    border-left: 1px solid #fff;
                    border-bottom: 1px solid #fff;
                    transform: rotate(45deg);
                }
            }
        }
        .right-style {
            margin-top: 10px;
        }
    }
    .shuttle {
        float: left;
        width: 200px;
        height: 300px;
        padding: 0 0 0 20px;
        border: 1px solid #f6f6f6;
        .configuration-text {
            height: 30px;
            line-height: 30px;
            cursor: pointer;
        }
        .active {
            color: #00c0ff;
        }
    }
}
</style>
