<template>
	<div class="list">
		<div class="header">
			<div class="h-all">
                <Row class="filtrate-header">                  
                    <Col :span="22">
                        <ConditionSearch :data="conditionSearchData" @search="conditionSearch" ref="conditionSearchRef" />
                    </Col>
                </Row>
                <div class="h-a-add">
					<div class="cancel" @click="handleCancel">返回</div>
				</div>
			</div>
		</div>
		<div class="main">
            <Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
				<DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
					<DragItem :span="item.span" 
						:value="item"
						v-for="(item,index) in tableTitleData"
						:key="index">
						<span>{{item.name}}</span>
					</DragItem>
                    <!-- <Col :span="4" class="app__table-right">
                        <span>文件下载</span>
                    </Col> -->
				</DragGroup>
				<Row :class="['m-item app__table-item']" v-for="(table,index) in tableItemData" :key="index">
					<Col :span="item.span"
						v-for="(item,index) in tableTitleData"
						:key="index">
                        <span v-if="item.param == 'createDate'">
							{{table[item.param] | getLocalTime}}
						</span>
						<span v-else>
							{{table[item.param]}}
						</span>
					</Col>
                    <Col class="app__table-right" :span="4">
                        <!-- <span class="download-text" @click="downLoad(table)">下载</span> -->
                    </Col>
				</Row>
				<Row :class="['m-item app__table-item']" v-for="empty in 20 - tableItemData.length" :key="empty.id">	
				</Row>
			</Scroll>
		</div>
        <div class="footer">
			<Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
			</Pagination>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return {
                pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 10,    // 每页条数
                },
                tableTitleData:[{
                	name: '设备号',
                	param: 'accNum',
                	span: 4
                },{
                	name: '分账序号',
                	param: 'acctCd',
                	span: 4
                },{
                    name: '导入属性ID',
                    param: 'batchImportAttrId',
                    span: 4
                },{
                	name: '批量导入ID',
                	param: 'batchImportAttrId',
                	span: 4
                },{
                	name: '创建时间',
                	param: 'createDate',
                	span: 4
                },{
                	name: '创建人',
                	param: 'createStaff',
                	span: 4
                },],
                tableItemData: [],
                conditionSearchData:[
                {
                    iconfont: 'iconzhanghuguanli',
                    placeholder:'请输入号码',
                    param: 'selectNum',
                    optionParam: 'selectType',
                    options: [{
                        value: 'accNum',
                        label: '设备号'
                    },
                    {
                        value: 'acctCd',
                        label: '分账序号'
                    },{
                        value: 'batchImportId',
                        label: '批量导入ID'
                    }],
                    optionValue: ''
                }],
                searchInputObjData: {},         // 搜索的数据
            }
        },
        mounted () {
            // this.getHistoryData()
        },
        methods: {
            // 返回
            handleCancel () {
                this.$emit("componentView", "list")
            },

            // 搜索
            conditionSearch (data) {
                this.searchInputObjData = data
                return function () {
                    if(this.searchInputObjData.selectType == ''){
                        this.$message.warning({"message": "请选择搜索类型"})
                    }else if(this.searchInputObjData.selectNum == ''){
                        this.$message.warning({"message": "请输入搜索号码"})
                    }else{
                        this.getHistoryData()
                    }
                }.bind(this)()
            },

            // 查询历史数据
            getHistoryData (num = 1) {
                let params = {
                    accNum: '',
                    acctCd: '',
                    batchImportId: '',
                    statusCd: '1000',
                    pageNum: num
                }
                params[this.searchInputObjData.selectType] = this.searchInputObjData.selectNum
                this.$axios.get(this.$api.AccountHistory, {
                    params: params
                }).then(res => {
                    if (res) {
                        this.tableItemData = res.data
                    }
                })
            },

            // 下载
            downLoad (data) {
                window.location.href = this.$api.GetHistory + "/load?iHistoryId=" + data.importHistoryId
            },

            //列表拖拽
			dragchange(val){
				this.tableTitleData = val;
			},

            // 分页
			pageChange(val){
				// this.getHistoryData(val)
			},
        }
	}
</script>

<style scoped lang="scss">
    
	.list{
		padding: 80px 0;
		width: 100%;
		height: 100%;

		.header{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 80px;

			.h-all{
				padding: 20px 20px 0;

				.h-a-title{
					.left-title{
						float: left;
					}
					p:first-child{
						font-size: 24px;
						color: #373f45;
					}
					p:last-child{
						padding-top: 4px;
						font-size: 12px;
						color: #373f45;

						span{
							color: $mainColor;
						}
					}
					
				}

                .filtrate-header {
                    .interval {
                        padding-top: 8px;
                        margin-left: 20px;
                    }
                    .symbol {
                        line-height: 40px;
                        text-align: center;
                    }
                    .wrap-top {
                        padding-top: 8px;
                    }
                }

				.h-a-add{
					position: absolute;
					top: 27px;
					right: 10px;
					height: 30px;
                    .cancel {
                        display: inline-block;
                        height: 30px;
                        line-height: 28px;
                        padding: 0 20px;
                        border: 1px solid $mainColor;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                        background: $mainColor;
                        color: #fff;
                        &:hover {
                            opacity: .6;
                        }
                    }
				}
			}
		}

		.main {
            width: 100%;
            height: 100%;
            .m-title {
                span {
                    font-weight: bold;
                    color: $mainColor;
                }
            }
            .download-text {
                color: $mainColor;
                cursor: pointer;
            }
        }
	}
</style>