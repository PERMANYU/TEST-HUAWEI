<template>
	<div class="list">
		<div class="header">
			<div class="h-all">
				<div class="h-a-title">
					<div class="searchMain">
						<ConditionSearch :data="conditionSearchData" @search="orderNumClick"></ConditionSearch>
					</div>
					<div :class="['h-operation',searchData.length > 0 ? 'active' : '']">
						<SearchBox v-model="searchData"></SearchBox>
					</div>
				</div>
				<div class="h-a-add">
					<div class="app__btn app__btn-add" v-if="userRightBtnControl.showAddBtn" @click="addClick()">新建客户分配</div>
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

						<ColSel class="col-search"  v-if="item.param == 'createStaffName'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
							<Input v-model="filtrate.createStaffName"  placeholder="请输入操作人登录名"></Input>
						</ColSel>

						<!-- <ColSel class="col-search"  v-if="item.param == 'custId'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
							<Input v-model="filtrate.custId"></Input>
						</ColSel> -->

						<ColSel class="col-search"  v-if="item.param == 'custName'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
							<Input v-model="filtrate.custName" placeholder="请输入客户名称"></Input>
						</ColSel>
					</DragItem>
				</DragGroup>
				<Row :class="['m-item app__table-item']" v-for="(table,index) in tableItemData" :key="index">
					<Col :span="item.span"
						v-for="(item,index) in tableTitleData"
						:key="index">
						<span v-if="item.param == 'updateDate'">
							{{table[item.param] | getLocalTime}}
						</span>
						<span v-else>
							{{table[item.param]}}
						</span>
					</Col>
				</Row>
				<Row :class="['m-item app__table-item']" v-for="empty in 20 - tableItemData.length" :key="empty.id">	
				</Row>
			</Scroll>
		</div>
		<div class="footer" v-if="tableItemData.length">
			<Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
			</Pagination>
		</div>

	<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				pageInfo: {
                    pageIndex: 1,    // 当前页
                    pageSize: 20,    // 每页条数
                },
                tipInfo: {
                	iconType:1,
                	msg:'',
                	showBtn:{
                		clear: true,
                		save: true
                	}
				},
                checkboxData:[],
                searchData:[],
                tableTitleData:[{
                	name: '操作人登录名',
                	param: 'postnName',
                	span: 4
                },{
                	name:'客户标识',
                	param:'custNumber',
                	span: 4
                },{
                	name:'客户名称',
                	param:'custName',
                	span: 6
                },{
                	name:'旧值',
                	param:'oldStaffCode',
                	span:3
                },{
                	name:'新值',
                	param:'staffCode',
                	span:3
                },{
                	name:'操作日期',
                	param:'updateDate',
                	span: 4
                }],
				tableItemData: [],
				filtrate: {				// 筛选信息
					createStaffName: '',
					custId: '',
					custNumber: '',
					custName: ''
				},
				userRightBtnControl: {			// 权限按钮控制
					showAddBtn: false
				},
				conditionSearchData:[
	            {
	                iconfont: 'iconkhbs',
	                placeholder:'客户标识搜索',
	                param: 'custNumber'
	            }],
            }
        },
        watch: {
        	searchData(newVal,oldVal){
        		if(newVal != oldVal){
        			this.getDistributionData();
        		}
        	}
		},
        mounted () {
			this.getDistributionData()
			
			// 循环权限功能
			this.userRightBtnControl.showAddBtn = this.$user.getFuncComps().find(item => item.compCode === 'F-CMB-100101') !== undefined;
        },
        methods:{
        	orderNumClick (data) {
				let reg = /^[0-9]*$/;
				if (!reg.test(data.custNumber)) {
					this.$message.warning({message: '只能输入纯数字'});
					return
				} else {
					this.filtrate.custNumber = data.custNumber;
        			this.getDistributionData();
				}
        	},
			// 筛选
			filterConfirm(item){
				let val = "";
				switch (item.param) {
					case "createStaffName":
						val = this.filtrate.createStaffName;
						break;
					case "custName":
						val = this.filtrate.custName;
						break;
					default:
						break;
				};
				let obj = {
					label: item.name,
					code: item.param,
					value: val
				}
				this.searchData = this.searchData.filter(item => item.label != obj.label);
				this.searchData.push(obj);
			},

			// 列表数据
			getDistributionData (pageIndex = 1) {
				let params = {
					"systemInfoId": '',
					"orgId": '',
					"sysRolelds": '',
					"staffId": '',
					"xSubChannel": '',
					"privCode": '',
					"loginName": '',
					"custId": '',
					"custNumber": this.filtrate.custNumber,
					"custName": '',
					"pageSize": this.pageInfo.pageSize,
					"pageNum": pageIndex
				}
				this.searchData.filter( item => {
					if(item.code == 'createStaffName'){
						params['loginName']  = item.value
					}else{
						params[item.code]  = item.value
					}
					
				})
				this.$axios.get(this.$api.clientDistributionManagerList, {
					params
				}).then((res) => {
                    if (res.data.length) {
                        this.tableItemData = res.data;
                        this.pageInfo.pageIndex = pageIndex
                    } else {
                        this.$message.warning({message: '暂无数据'})
                    }                  
				}).catch((error) => {
					this.$message.error({message: error.response.data.message})
				})
			},
			addClick(){
				this.$emit('componentView','add')
			},

			// 分页
			pageChange(val){
				this.getDistributionData(val)
			},

			searchDataClick(val){
				this.searchData = this.searchData.filter( item => item.label != val.label && item.value != val.value)
			},
			dragchange(val){
				this.tableTitleData = val;
			}
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
					p:first-child{
						font-size: 24px;
						color: #373f45;
					}
					p:last-child{
						padding-top: 4px;
						font-size: 12px;
						color: #373f45;

						span{
							color: #00c0ff;
						}
					}
					
					.searchMain{
						margin-top: 5px;
						float: left;
					}

					.a-t-name{
						display: inline-block;
						height: 100%;
						line-height: 50px;
						font-weight: bold;
						padding-left: 20px;
						background-image: url(./images/all.png);
						background-repeat: no-repeat;
						background-position: 0px;
					}

					.a-t-search{
						display: inline-block;
						height: 100%;
						line-height: 50px;
						padding-left: 30px;

						.t-s-name{
							display: inline-block;
							padding-left: 20px;
							background-image: url(./images/select_content.png);
							background-repeat: no-repeat;
							background-position: 0px;
							vertical-align: middle;
						}

						.t-s-item{
							display: inline-block;
							height: 30px;
							line-height: 30px;
							padding: 0 10px;
							margin-right: 35px;
							border: 1px solid #f1f5fa;
							vertical-align: middle;
							
							.s-i-name{
								color: #00c0ff;
							}

							.s-i-close{
								display: block;
								position: absolute;
								width: 26px;
								height: 30px;
								top: -1px;
								right: -26px;
								background-image: url(./images/close.png);
								background-repeat: no-repeat;
								background-position: 0px;
								cursor: pointer;
							}
						}
					}
					
				}

				.h-a-add{
					position: absolute;
					top: 25px;
					right: 10px;
					height: 30px;
				}
			}

			.h-operation{
					position: absolute;
					top: 0;
					left: -100%;
					width: 100%;
					height: 80px;
					line-height: 80px;
					transition: .3s all ease;
					background-color: #fff;

					&.active{
						left: 0;
					}

					.h-o-item{
						display: inline-block;
						padding: 0 20px;
						cursor: pointer;

						&.delete{
							background: url(./images/delete_gery.png) no-repeat;
							background-position: 0;
						}

						&.modify{
							background: url(./images/edit_grey.png) no-repeat;
							background-position: 0;
						}

						&.release{
							background: url(./images/release_grey.png) no-repeat;
							background-position: 0;
						}

						&.history{
							background: url(./images/history_grey.png) no-repeat;
							background-position: 0;
						}

						&:hover{
							color: #00c0ff;

							&.delete{
								background: url(./images/delete_blue.png) no-repeat;
								background-position: 0;
							}

							&.modify{
								background: url(./images/edit_blue.png) no-repeat;
								background-position: 0;
							}

							&.release{
								background: url(./images/release_blue.png) no-repeat;
								background-position: 0;
							}

							&.history{
								background: url(./images/history_blue.png) no-repeat;
								background-position: 0;
							}
						}
					}

					.h-o-count{
						color: #00c0ff;
					}
				}
		}

		.main{
			width: 100%;
			height: 100%;

			.m-title{
				span {
					color: $mainColor;
					font-weight: bold;
				}

				.col.m-t-name{
					border-right: 1px solid #00c0ff;
				}

				.col{
					padding: 8px 0;
					border-right: 1px solid #f1f5fa;

					&.draging{
						position: relative;

						&:after{
							content: '';
							display: block;
							position: absolute;
							top: 0;
							left: 0;
							width: 2px;
							height: 20px;
							background-color: #00c0ff;
						}
					}
				}
			}

			.m-item{
				text-align: center;

				&.double{
					background-color: #f6f7f9;
				}

				.m-i-name{
					color: #00c0ff;
					border-right: 1px solid #00c0ff;
					cursor: pointer;
				}
			}

			.col{

				&:hover{
					.col-search{
						display: block;
					}
				}
			}
		}

		.footer{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			box-shadow: 0 -2px 0 #f1f5fa;

			.pagination{
				height: 50px;
			}
		}


		.l-d-header{
			display: inline-block;
			width: 100%;
			padding-bottom: 20px;
			border-bottom: 10px solid #f8f8f8;

			.d-h-title{
				width: 100%;
				height: 50px;
				line-height: 50px;

				.h-t-left{
					margin-left: 50px;
					padding-left: 30px;
					float: left;
					font-size: 16px;
					font-weight: bold;
					background: url(./images/sideslip_icon.png) no-repeat;
					background-position: 0;
				}

				.h-t-right{
					float: right;
					margin-right: 40px;
				}
			}

			.d-h-info{
				padding-left: 50px;
			}
		}

		.l-d-content{

			.d-c-tab{
				height: 50px;
				line-height: 50px;
				border-bottom: 2px solid #fafafa;

				.c-t-item{
					display: inline-block;
					position: relative;
					height: 50px;
					width: 60px;
					text-align: center;
					margin-left: 20px;
					cursor: pointer;
				}
			}

			.d-c-info{
				padding: 40px 20px 0 50px;
			}

			.d-c-val{
				padding: 40px 20px 0;

				.c-v-title{
					background-color: #f5fafd;
					text-align: center;
				}
			}
		}

		.h-dialog{

			.col{
				text-align: center;
			}

			.h-d-title{
				background-color: #f8fcff;
				border-top: 1px solid #00c0ff;

				.col{
					border-width: 0 0 1px 1px;
					border-style: solid;
					border-color: #efefef;

					&:last-child{
						border-right: 1px solid #efefef;
					}
				}
			}

			.h-d-item{
				border-bottom: 1px solid #efefef;
			}
		}
	}
</style>