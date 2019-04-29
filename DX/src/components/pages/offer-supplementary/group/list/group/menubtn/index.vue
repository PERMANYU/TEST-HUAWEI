<template>
    <div class="menu-btn">
        <div class="btn-box">
            <div class="app__btn app__btn-add" @click="exportExel">导出</div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            checkArr: {
            	type: Array,
            	default:[]
            }
        },
        watch : {
            checkArr(val) {
                this.checkArrTemp = val;
            }
        },
        data() {
            return {
                checkArrTemp:[]
            }
        },
        methods: {
            exportExel() {
                if(this.checkArrTemp.length == 0) {
					this.$message.warning({message: '请选择一条数据！'})
				} else if(this.checkArrTemp.length >= 2){
					this.$message.warning({message: '只能选择一条数据！'})
				} else{
					window.open(this.$api.ExportTemplate + this.checkArrTemp[0])
				}
            }
        },
    }
</script>

<style lang="scss" scoped>
    .app__btn-add {
        right: 100px;
    }
</style>