<template>
	<div class="list">
		<div class="header">
			<div class="h-all">
                <Row class="filtrate-header">
                    <Col :span="3" class="wrap-top">
                        <Select :data="filterData" v-model="selectType" :isNullSel="false"></Select>
                    </Col>
                    <Col :span="3" class="interval wrap-top">
                        <Select :data="filterData2" v-model="filterType" :isNullSel="false"></Select>
                    </Col>
                    <Col :span="3" class="interval wrap-top">
                        <DatePicker v-model="startDate" placeholder="开始时间"></DatePicker>
                    </Col>
                    <Col :span="1" class="symbol">
                        —   
                    </Col>
                    <Col :span="3" class="wrap-top">
                        <DatePicker v-model="endDate" placeholder="结束时间"></DatePicker>
                    </Col>
                    <Col :span="8" class="interval">
                        <ConditionSearch :data="conditionSearchData" @search="handeSearch"></ConditionSearch>
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
                    <Col :span="4" class="app__table-right">
                        <span>文件下载</span>
                    </Col>
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
                        <span class="download-text" @click="downLoad(table)">下载</span>
                    </Col>
				</Row>
				<Row :class="['m-item app__table-item']" v-for="empty in 20 - tableItemData.length" :key="empty.id">	
				</Row>
			</Scroll>
		</div>
        <div class="footer">
			<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages="5" @pageChange="pageChange">
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
                    pageCount: 0,    // 总页数
                    rowCount: 1      // 总条数
                },
                filterData: [
                    {
                        value: '1',
                        label: '全部'
                    },
                    {
                        value: '2',
                        label: '我的上传记录'
                    },
                    {
                        value: '3',
                        label: '我的区局记录'
                    }
                ],
                filterData2: [
                    {
                        value: '客户重新分配',
                        label: '客户重新分配'
                    },
                    {
                        value: '子客户遗漏',
                        label: '子客户遗漏'
                    },
                    {
                        value: '子客户误归',
                        label: '子客户误归'
                    },
                    {
                        value: '根客户部门变更',
                        label: '根客户部门变更'
                    }
                ],
                startDate: '',          // 开始时间
                endDate: '',            // 结束时间
                filterType: '',         // 选择类型
                selectType: '2',
                uploadName: '',         // 上传人姓名
                tableTitleData:[{
                	name: '上传人',
                	param: 'createStaffName',
                	span: 3
                },{
                	name:'上传时间',
                	param:'createDate',
                	span: 5
                },{
                	name:'上传类型',
                	param:'importType',
                	span: 4
                },{
                	name:'上传文件名称',
                	param:'fileName',
                	span: 5
                },{
                	name:'区局',
                	param:'xparentBureau',
                	span: 3
                }],
                tableItemData: [],
                conditionSearchData:[
                {
                    iconfont: 'iconkhbs',
                    placeholder:'上传人姓名搜索',
                    param: 'uploadName'
                }],
            }
        },
        mounted () {
            this.getInfoData()
            this.getHistoryData()
            // 循环权限数据
            if (!this.$user.getFuncComps().length){
                this.filterData.splice(0 ,1)
            }
        },
        methods: {
            // 返回
            handleCancel () {
                this.$emit("componentView", "list")
            },

            // 得到点击过来的标识
            getInfoData () {
                let data = this.$parent.currentData;
                switch (data) {
                    // 遗漏
                    case 'omit':
                        this.filterType = '子客户遗漏';
                        break;
                    case 'return':
                        this.filterType = '子客户误归';
                        break;
                    case 'alteration':
                        this.filterType = '根客户部门变更';
                        break;
                    case 'distrubite':
                        this.filterType = '客户重新分配';
                        break;
                    default:                       
                        break;
                }
            },

            // 搜索
            handeSearch (data) {
                this.uploadName = data.uploadName;
                this.getHistoryData()
            },

            // 查询历史数据
            getHistoryData (num=1) {
                let orgId = this.$user.getOrgId(),
                    staffId = this.$user.getStaffId(),
                    staffCode = this.$user.getUserStorage().staffCode;
                this.$axios.get(this.$api.History,{
                    params: {
                        beginDate: this.startDate,
                        createStaff: this.selectType == 2 ? staffId : '',
                        createStaffName: this.uploadName,
                        endDate: this.endDate,
                        imporType: this.filterType,
                        pageNum: num,
                        pageSize: this.pageInfo.pageSize,
                        orgId: this.selectType == 2 ? '' : orgId,
                        staffCode: this.selectType == 2 ? '' : staffCode
                    }
                }).then(res => {
                    if (res) {
                        this.tableItemData = res.data
                    }
                })
            },

            // 下载
            downLoad (data) {
                window.location.href = this.$api.GetHistoryDownFile + "/load?iHistoryId=" + data.importHistoryId
            },

            //列表拖拽
			dragchange(val){
				this.tableTitleData = val;
			},

            // 分页
			pageChange(val){
				this.getHistoryData(val)
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
            padding: 20px 0;
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