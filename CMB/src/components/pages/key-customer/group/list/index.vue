<template>
	<div class="list">
		<div class="header">
			<div class="h-all">
				<div class="h-a-title">
					<div class="single-search">
                        <ConditionSearch :data="conditionSearchData" @search="searchCustName"></ConditionSearch>
					</div>

					<div :class="['h-operation',searchData.length > 0 ? 'active' : '']">
						<SearchBox v-model="searchData"></SearchBox>
					</div>
					
				</div>
				<div class="h-a-add">
					<div class="app__btn app__btn-add" v-if="userRightBtnControl.uploadBtn" @click="openDialog">导入</div>
					<div class="app__btn app__btn-add" v-if="userRightBtnControl.downLoadBtn">下载模板</div>
					<div class="app__btn app__btn-add" v-if="userRightBtnControl.showAddBtn" @click="addClick()">添加</div>
				</div>
			</div>
			<div :class="['h-operation',checkboxData.length > 0 ? 'active' : '']">
				<div class="h-o-item">
					已选中<span class="h-o-count">{{checkboxData.length}}</span>项
				</div>
				<div class="h-o-item delete" @click="listDelClick">
					删除
				</div>
			</div>
		</div>
		<div class="main">
			<Scroll class="app__table" :isShowRight="true" :isShowBottom="true" fixedLeftClassName="app__table-left" fixedTopClassName="m-title" ref="listScroll">
				<DragGroup ref="titleWidth" :inline="true" class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
					<Col class="app__table-left" :width="80" v-if="userRightBtnControl.checkBoxBtn">
						<Checkbox @click.native="allCheckboxClick()" :noModel="true" :checked="checkboxData.length"></Checkbox>
					</Col><Col class="m-t-name app__table-left" :width="200">
						<span>客户名称</span>
					</Col>
					<DragItem :width="item.width" 
						:value="item"
						v-for="(item,index) in tableTitleData"
						:key="index">
						<span>{{item.name}}</span>
						
						<ColSel class="col-search"  v-if="item.param == 'custVipName'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
		
								<Input placeholder="请输入vip客户姓名" v-model="filter.custVipName"></Input>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'custEmployer'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Input placeholder="请输入vip客户单位" v-model="filter.custVipEmployer"></Input>
						</ColSel>
                        <ColSel class="col-search"  v-if="item.param == 'custNumber'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Input placeholder="请输入客户标识" v-model="filter.custNumber"></Input>
						</ColSel>
                        <ColSel class="col-search"  v-if="item.param == 'companyBureau'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Input placeholder="请输入管理单位及区局" v-model="filter.companyBureau"></Input>
						</ColSel>
                        <ColSel class="col-search"  v-if="item.param == 'firstCustManagerName'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Input placeholder="请输入首席客户经理姓名" v-model="filter.firstCustManagerName"></Input>
						</ColSel>
                        <ColSel class="col-search"  v-if="item.param == 'custPosition'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Input placeholder="请输入vip客户职务" v-model="filter.custPosition"></Input>
						</ColSel>
                        <ColSel class="col-search"  v-if="item.param == 'custVipType'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Input placeholder="请输入vip客户类别" v-model="filter.custVipType"></Input>
						</ColSel>
                        <ColSel class="col-search"  v-if="item.param == 'custContactEmployer'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Input placeholder="请输入vip客户联系人单位" v-model="filter.custContactEmployer"></Input>
						</ColSel>
                        <ColSel class="col-search"  v-if="item.param == 'custContactPosition'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Input placeholder="请输入vip客户联系人职务" v-model="filter.custContactPosition"></Input>
						</ColSel>
					</DragItem>
				</DragGroup>
				<Row :inline="true" :class="['m-item app__table-item']" v-for="(table,index) in tableItemData" :key="index">
					<Col class="app__table-left" :width="80" v-if="userRightBtnControl.checkBoxBtn">
						<Checkbox name="checkbox1" :label="table" v-model="checkboxData"></Checkbox>
					</Col><Col :width="200" :title="table.custName"  class="m-i-name ellipsis app__table-left" @click.native.stop="userRightBtnControl.clickFlag ? recordDetail(table.custId) : ''">{{table.custName}}</Col>

					<Col :width="item.width"
                        class="overflow-style"
                        :title="table[item.param]"
						v-for="(item,index) in tableTitleData"
						:key="index">
						<span>
							{{table[item.param]}}
						</span>
					</Col>
				</Row>
				<Row :style="dynamicWidth" :class="['m-item app__table-item']" v-for="empty in 20 - tableItemData.length" :key="empty.id">	
                    
                </Row>
			</Scroll>
		</div>
		<div class="footer" v-if="tableItemData.length">
			<Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
			</Pagination>
		</div>

		<!-- 上传dialogS -->
		<Dialog ref="uploadDialog" :dialogTitle="dialogTitle" :dialogSize="dialogSize" :initBtn="true">
            <div class="upload-style">
                <Col :span="3" :offset="2" class="text-style">
                    <span>上传文件：</span>
                </Col>
                <Col :span="8">
                    <Input :value="fileName"></Input>
                </Col>
                <Col :span="4">
                    <Upload multiple @change="getFile"></Upload>
                </Col>
            </div>
            
			<template slot="btnBox">
				<span class="back" @click="cancel">取消</span>
				<span class="save" @click="uploadFile">导入</span>
			</template>
		</Dialog>
		<!-- 上传dialogE -->

		<!-- 名称详情S -->
		<LeftDialog ref="leftDialog">
            <div class="dialog_header">
                <span class="title">客户详情</span>
                <div class="dialog_header-bottom">
                    <Row class="box_right">
                        <Col :span="2">
                            <img src="./images/kehu.png">
                        </Col>
                        <Col :span="4">
                            <span class="h-name">{{customerDetails.custName}}</span>
                        </Col>
                        <Col :span="2" class="h-line" >

                        </Col>
                        <Col :span="7">
                            <Row class="app__ellipsis">
                                <Col>
                                    <span class="app__lt-label">客户标识：</span>
                                    <span class="app__lt-text">{{customerDetails.custId}}</span>
                                </Col>
                            </Row>
                            <Row class="app__ellipsis">
                                <Col>
                                    <span class="app__lt-label">管理单位及区局：</span>
                                    <span class="app__lt-text">{{customerDetails.companyBureau}}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col :span="7">
                            <Row class="app__ellipsis">
                                <Col>
                                    <span class="app__lt-label">公客VIP标志：</span>
                                    <span class="app__lt-text">{{customerDetails.custLevel}}</span>
                                </Col>
                            </Row>
                            <Row class="app__ellipsis">
                                <Col>
                                    <span class="app__lt-label">成为VIP时间：</span>
                                    <span class="app__lt-text" v-if="customerDetails.becomeVipDate === null">
                                        无
                                    </span>
                                    <span class="app__lt-text" v-else>
                                        {{customerDetails.becomeVipDate | getLocalTime}}
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="dialog-content">
                <Scroll class="dialog-main">
                    <div class="a-v-title">
                        <div class="app__title-1">
                            <span class="app__title-name">VIP客户信息</span>
                        </div>
                        <span class="app__btn app__btn-mod" @click="modify" v-if="userRightBtnControl.modifyBtn">修改</span>
                        <span class="app__btn app__btn-del" @click="cancelCustomer">取消重客</span>
                    </div>
                    <div class="info-container">
                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">VIP客户姓名：</span>
                                <span class="app__lt-text">{{customerDetails.custVipName}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">VIP客户单位：</span>
                                <span class="app__lt-text">{{customerDetails.custEmployer}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">VIP客户职务：</span>
                                <span class="app__lt-text">{{customerDetails.custPosition}}</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">VIP客户联系人姓名：</span>
                                <span class="app__lt-text">{{customerDetails.custContactName}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">VIP客户联系人职务：</span>
                                <span class="app__lt-text">{{customerDetails.custContactPosition}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">VIP客户联系人Email：</span>
                                <span class="app__lt-text">{{customerDetails.custContactEMail}}</span>
                            </Col>
                        </Row>
                    </div>

                    <div class="app__title-1">
                        <span class="app__title-name">客户经理信息</span>
                    </div>

                    <div class="info-container">
                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">客户经理姓名：</span>
                                <span class="app__lt-text">{{customerDetails.custManagerName}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">客户经理单位：</span>
                                <span class="app__lt-text">{{customerDetails.custManagerCompany}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">客户经理电话：</span>
                                <span class="app__lt-text">{{customerDetails.custManagerTel}}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">客户经理Email：</span>
                                <span class="app__lt-text">{{customerDetails.custManagerEmail}}</span>
                            </Col>
                        </Row>
                    </div>

                    <div class="app__title-1">
                        <span class="app__title-name">首席客户经理信息</span>
                    </div>

                    <div class="info-container">
                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">首席客户经理联系人姓名：</span>
                                <span class="app__lt-text">{{customerDetails.firstCustManagerContactName}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">首席客户经理联系人联系电话：</span>
                                <span class="app__lt-text">{{customerDetails.firstCustManagerContactPhone}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">首席客户经理联系人Email：</span>
                                <span class="app__lt-text">{{customerDetails.firstCustManagerContactEmail}}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">首席客户经理联系人职务：</span>
                                <span class="app__lt-text">{{customerDetails.firstCustManagerContactPosition}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">首席客户经理单位：</span>
                                <span class="app__lt-text">{{customerDetails.firstCustManagerEmployer}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">首席客户经理姓名：</span>
                                <span class="app__lt-text">{{customerDetails.firstCustManagerName}}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">首席客户经理联系电话：</span>
                                <span class="app__lt-text">{{customerDetails.firstCustManagerPhone}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">首席客户经理职务：</span>
                                <span class="app__lt-text">{{customerDetails.firstCustManagerPosition}}</span>
                            </Col>
                        </Row>
                    </div>
                </Scroll>
            </div>
		</LeftDialog>
		<!-- 记录号详情E -->

		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm"></Tip>

        <!-- 导入成功结果展示S -->
        <Dialog ref="uploadSuccessDialog" :dialogTitle="dialogResultTitle" :dialogSize="uploadSuccessSize" :initBtn="true">
            <div class="cus-main">本次导入
                <span class="upload-total">{{uploadResult.totalNum}}</span> 条，成功
                <span class="upload-succ">{{uploadResult.successNum}}</span> 条，失败
                <span class="upload-error">{{custVipList.length}}</span> 条
            </div>
            <div class="upload-error-detail" v-if="custVipList.length">
                <div class="app__btn app__btn-delete" @click="downLoadFailed">下载失败详情</div>
            </div>
			
            <div slot="btnBox">
                <span class="back" @click="handleBack">确定</span>
            </div>
		</Dialog>
        <!-- 导入成功结果展示E -->
	</div>
</template>

<script type="text/javascript">
export default {
	data() {
		return {
			pageInfo: {
				pageIndex: 1, // 当前页
				pageSize: 20, // 每页条数
			},
			tipInfo: {
				iconType: 1,
				msg: "",
				showBtn: {
                    clear: true,
                    save: true
				}
            },
            dynamicWidth: '',       // 动态获取宽度
			checkboxData: [],
			searchData: [],
			tableTitleData: [
				{
					name: "VIP客户姓名",
					param: "custVipName",
					span: 3,
					width: 180
                },
                {
                    name: "客户标识",
                    param: "custNumber",
                    span: 4,
                    width: 180
                },
				{
					name: "VIP客户单位",
					param: "custEmployer",
					span: 4,
					width: 180
				},
				{
					name: "管理单位及区局",
					param: "companyBureau",
					span: 4,
					width: 180
				},			
				{
					name: "首席客户经理姓名",
					param: "firstCustManagerName",
					width: 180
				},
				{
					name: "VIP客户类别",
					param: "custVipType",
					width: 180
				},
				{
					name: "VIP客户职位",
					param: "custPosition",
					span: 2,
					width: 180
				},
				{
					name: "VIP客户联系人姓名",
					param: "custContactName",
					span: 3,
					width: 200
				},
				{
					name: "vip客户联系人单位",
					param: "custContactEmployer",
					span: 3,
					width: 200
				},
				{
					name: "vip客户联系人职务",
					param: "custContactPosition",
					span: 3,
					width: 200
				}
			],
			tableItemData: [],
            file: '',
            fileName: '',
            dialogTitle: '导入',
            dialogResultTitle: '导入结果',
			dialogSize: {
				max: 621
            },
            uploadSuccessSize: {
                max: 500
            },
			customerDetails: {},			// 详情
			filter: {},				// 筛选信息
			userRightBtnControl: {			// 权限按钮控制
				showAddBtn: false,
				checkBoxBtn: false,
				clickFlag: false,
				modifyBtn: false,
				uploadBtn: false,
				downLoadBtn: false
            },
            uploadResult: {},
            custVipList: [],
            conditionSearchData:[
            {
                iconfont: 'iconkhbs',
                placeholder:'客户名称搜索',
                param: 'custName'
            }],
            deleteFlag: false,          // 删除、取消重客的状态
		};
	},
	mounted() {
        this.getListData();
        this.getDynamicWidth()

		// 循环权限数据
		this.$user.getFuncComps().forEach((item) => {
			switch (item.compCode) {
				case 'F-CMB-100301':
					this.userRightBtnControl.showAddBtn = true;
					break;
				case 'F-CMB-100302':
					this.userRightBtnControl.clickFlag = true;
					break;
				case 'F-CMB-100304':
					this.userRightBtnControl.checkBoxBtn = true;
					break;
				case 'F-CMB-100303':
					this.userRightBtnControl.modifyBtn = true;
					break;
				case 'F-CMB-100305':
					this.userRightBtnControl.uploadBtn = true;
					break;
				case 'F-CMB-100306':
					this.userRightBtnControl.downLoadBtn = false;
					break;
				default:
					break;
			}
		})
	},
	watch: {
		searchData (oldVal, newVal) {
			if (oldVal !== newVal) {
				this.getListData()
			}
		}
	},
	methods: {
		// 客户名称筛选
		searchCustName (data) {
			this.filter.custName = data.custName
			this.getListData();
        },
        // 获取表格标题宽度，动态计算空余行的宽度
        getDynamicWidth () {
            this.dynamicWidth = {
                width: this.$refs.titleWidth.$el.clientWidth + 'px'
            }
        },
		// 筛选
		filterConfirm (data) {
			let val = '';
            switch (data.param) {
                case 'custVipName':
                    val = this.filter.custVipName;
                    break;
                case 'custEmployer':
                    val = this.filter.custVipEmployer;
                    break;
                case 'custNumber':
                    val = this.filter.custNumber;
                    break;
                case 'companyBureau':
                    val = this.filter.companyBureau;
                    break;
                case 'firstCustManagerName':
                    val = this.filter.firstCustManagerName;
                    break;
                case 'custPosition':
                    val = this.filter.custPosition;
                    break;
                case 'custVipType':
                    val = this.filter.custVipType;
                    break;
                case 'custContactEmployer':
                    val = this.filter.custContactEmployer;
                    break;
                case 'custContactPosition':
                    val = this.filter.custContactPosition;
                    break;
                default:
                    break;
            }
			let obj = {
				label: data.name,
				code: data.param, 
				value: val
			}
			this.searchData = this.searchData.filter(item => item.label != obj.label);
			this.searchData.push(obj);
			this.getListData();
		},

		// 列表数据
		getListData(pageNum = 1) {
			let params = {
                "custId": '',
                "custNumber": '',
				"custEmployer": '',
                "custVipName": '',
                "custType": '1100',
				"custName": this.filter.custName,
				"custContactEmployer": '',
				"pageNumber": pageNum,
				"pageSize": this.pageInfo.pageSize
			}
			this.searchData.filter((item) => {
				params[item.code] = item.value
			})
			this.$axios.get(this.$api.keyCustomer, {
				params: params
			}).then(res => {
                if (res.data.length) {
				    this.tableItemData = res.data
                    this.pageInfo.pageIndex = pageNum
                } else {
                    this.$message.warning({message: '暂无数据'})
                }
			})
			.catch(error => {
				this.$message.error({"message": err.response.data.message})
			});
        },
        
        // 打开添加页面
		addClick() {
			this.$emit("componentView", "add");
		},

		// 分页
		pageChange(val) {
			this.getListData(val);
		},

		// 删除多选
		listDelClick() {		
			this.tipInfo.iconType = 3;
			this.tipInfo.msg = `确认要删除吗？`;
			this.tipInfo.showBtn.clear = true;
			this.tipInfo.showBtn.save = true;
            this.$refs.tip.show();
            this.deleteFlag = true
        },
        
        // 取消重要客户按钮
		cancelCustomer () {
            this.tipInfo.iconType = 3;
			this.tipInfo.msg = `确认要取消重客吗？`;
			this.tipInfo.showBtn.clear = true;
			this.tipInfo.showBtn.save = true;
            this.$refs.tip.show();
			this.deleteFlag = false
        },

		// 确认删除
		tipConfirm() {
            // 表示点击的是删除重要客户按钮
			if (this.deleteFlag) {
                this.deleteKeyCustomer()
            } else {
                // 表示点击的是取消重要客户按钮
                this.cancelKeyCustomer()
            }
        },   
        
        // 取消重要客户的方法
        cancelKeyCustomer () {
            this.$axios.delete(this.$api.keyCustomer + '/cancellation',{data:{
					"custVipId": this.customerDetails.custVipId,
					"custId": this.customerDetails.custId,
					"custManegerId": this.customerDetails.custManegerId,
					"firstCustManegerId": this.customerDetails.firstCustManegerId
			}}).then((res) => {
				if (res.data) {
					this.$message.success({"message": "取消重要客户成功"});
					this.getListData()
				} else {
					this.$message.error({"message": "取消重要客户失败"})
				}
			}).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
			this.$refs.leftDialog.hide()
        },
        
        // 删除重要客户的方法
        deleteKeyCustomer () {
            // 循环数组，，拼接字符串
			let textStr = this.checkboxData.map(item => item.custVipId).join(',');
			this.$axios.delete(this.$api.keyCustomer + '/deletion', {
				data: {
					"ids": textStr
				}
			}).then((res) => {
				if (res.data) {
					this.$message.success({message: '删除成功'});
					this.$refs.tip.hide();
					this.checkboxData = [];
					this.getListData()
				} else {
					this.$message.error({message: '删除失败'})
				}
			}).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },

        // 搜索
		searchDataClick(val) {
			this.searchData = this.searchData.filter(
				item => item.label != val.label && item.value != val.value
			);
		},
		dragchange(val) {
			this.tableTitleData = val
		},

		// 全选、不选
		allCheckboxClick() {
			if (this.checkboxData.length == this.tableItemData.length) {
				this.checkboxData = []
			} else {
				this.checkboxData = this.tableItemData;
			}
		},

		// 客户详情
		recordDetail(id) {
			this.$refs.leftDialog.show();
			this.$axios.get(this.$api.keyCustomer + `/${id}`).then((res) => {
                this.customerDetails = res.data
			}).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
		},

		// 修改
		modify () {
			this.$emit("componentView", "modify", this.customerDetails)
		},

		// 打开上传弹窗
		openDialog () {
			this.$refs.uploadDialog.show()
		},

		// 取消
		cancel () {
			this.$refs.uploadDialog.hide()
		},

		// 获取文件
		getFile (data) {
            this.file = data;
            this.fileName = this.file[0].name;
		},

		// 上传
		uploadFile () {
            let userStorage = this.$user.getUserStorage(),
                createStaff = '';
            if (userStorage) {
                createStaff = userStorage.staffId ? userStorage.staffId : 1
            }
			if (!this.file) {
                this.$message.warning({"message": "请选择文件"})				
			} else {
				let formData = new FormData();
				formData.append("file", this.file[0]);
				formData.append("createStaff", createStaff);

				let config = {
					headers:{'Content-Type':'multipart/form-data'}
				}

				this.$axios.post(this.$api.GetkeyCustomerImport + '/importExcel', formData, config).then((res) => {
					if (res.data) {                     
                        this.uploadResult = res.data;
                        this.custVipList = res.data.custVipList
                        
                        this.$message.success({"message": "成功"})
                        this.fileName = ''
                        this.$refs.uploadDialog.hide()
                        this.$refs.uploadSuccessDialog.show()
                        this.getListData()
					} else {
						this.$message.error({"message": "失败"})
					}
				}).catch((err) => {
					this.$message.error({"message": err.response.data.message})
				})
			}
        },
        
        // 下载失败详情
        downLoadFailed () {
            window.location.href = this.$api.GetkeyCustomerDown + '/load?fileName=' + this.uploadResult.uuid
        },

        // 关闭导入结果
        handleBack () {
            this.$refs.uploadSuccessDialog.hide()
        }
	}
};
</script>

<style scoped lang="scss">
.list {
	padding: 80px 0 52px;
	width: 100%;
	height: 100%;

  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;

    .h-all {
      padding: 20px 20px 0;

      .h-a-title {
        p:first-child {
          font-size: 24px;
          color: #373f45;
        }
        p:last-child {
          padding-top: 4px;
          font-size: 12px;
          color: #373f45;

          span {
            color: #00c0ff;
          }
        }

        .a-t-name {
          display: inline-block;
          height: 100%;
          line-height: 50px;
          font-weight: bold;
          padding-left: 20px;
          background-image: url(./images/all.png);
          background-repeat: no-repeat;
          background-position: 0px;
        }

        .a-t-search {
          display: inline-block;
          height: 100%;
          line-height: 50px;
          padding-left: 30px;

          .t-s-name {
            display: inline-block;
            padding-left: 20px;
            background-image: url(./images/select_content.png);
            background-repeat: no-repeat;
            background-position: 0px;
            vertical-align: middle;
          }

          .t-s-item {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            margin-right: 35px;
            border: 1px solid #f1f5fa;
            vertical-align: middle;

            .s-i-name {
              color: #00c0ff;
            }

            .s-i-close {
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
		.single-search {
			float: left;
            margin-top: 5px;
		}
      }

      .h-a-add {
        position: absolute;
        top: 25px;
        right: 10px;
        height: 30px;
      }
    }

    .h-operation {
      position: absolute;
      top: 0;
      left: -100%;
      width: 85%;
      height: 80px;
      line-height: 80px;
      transition: 0.3s all ease;
      background-color: #fff;

      &.active {
        left: 0;
      }

      .h-o-item {
        display: inline-block;
        padding: 0 20px;
        cursor: pointer;

        &.delete {
          background: url(./images/delete_gery.png) no-repeat;
          background-position: 0;
        }

        &.modify {
          background: url(./images/edit_grey.png) no-repeat;
          background-position: 0;
        }

        &.release {
          background: url(./images/release_grey.png) no-repeat;
          background-position: 0;
        }

        &.history {
          background: url(./images/history_grey.png) no-repeat;
          background-position: 0;
        }

        &:hover {
          color: #00c0ff;

          &.delete {
            background: url(./images/delete_blue.png) no-repeat;
            background-position: 0;
          }

          &.modify {
            background: url(./images/edit_blue.png) no-repeat;
            background-position: 0;
          }

          &.release {
            background: url(./images/release_blue.png) no-repeat;
            background-position: 0;
          }

          &.history {
            background: url(./images/history_blue.png) no-repeat;
            background-position: 0;
          }
        }
      }

      .h-o-count {
        color: #00c0ff;
      }
    }
  }

  .main {
    width: 100%;
    height: 100%;

    .m-title {
        span {
            color: $mainColor;
            font-weight: bold;
        }

      .col.m-t-name {
        border-right: 1px solid #a6c2ff;
      }

      .col {
        border-right: 1px solid #f1f5fa;

        &.draging {
          position: relative;

          &:after {
            content: "";
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

    .m-item {
      text-align: center;

      &.double {
        background-color: #f6f7f9;
      }    

      .m-i-name {
        color: #00c0ff;
        border-right: 1px solid #a6c2ff;
        cursor: pointer;
      }
	  .ellipsis {
		  overflow: hidden;
		  white-space: nowrap;
		  text-overflow: ellipsis;
	  }
    }

    .overflow-style {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .col {
      &:hover {
        .col-search {
          display: block;
        }
      }
    }

	.upload-style {
		margin: 30px 0 0 0;
        .text-style {
            line-height: 25px;
        }
  	}
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    box-shadow: 0 -2px 0 #f1f5fa;

    .pagination {
      height: 50px;
    }
  }

    .dialog_header {
        height: 190px;
        padding-left: 20px;
        background-color: #f7fbfd;
        .title {
            line-height: 50px;
            font-size: 16px;
            font-weight: bold;
            color: $mainColor;
        }
        .dialog_header-bottom {
            .box_right {
                padding: 20px 0 10px 20px;
                background-color: #fff;

                .col{
                    padding: 8px 0;
                }

                .h-name{
                    font-size: 20px;
                    font-weight: bold;
                    color: $mainColor;
                }

                .h-line{
                    height: 80px;
                    border-left: 1px dashed #cccccc;
                }
            }
        }
    }

    .dialog-content {
        padding: 0 0 40px 20px;
        width: 100%;
        height: calc(100% - 160px);
        background-color: #f7fbfd;

        .dialog-main {
            height: 100%;
            padding: 20px 0 20px 20px;
            background-color: #fff;

            .main {
                padding: 0 30px 0 0;
            }
            .a-v-title {
                height: 50px;
                background-color: #fff;
                .app__title {
                    line-height: 50px;
                    font-size: 14px;
                    i.icon-left {
                        display: inline-block;
                        width: 6px;
                        height: 18px;
                        vertical-align: text-bottom;
                        background: $mainColor;
                    }
                    .dialog-title {
                        font-size: 16px;
                        color: #000;
                    }
                }
                .app__btn {
                    position: absolute;
                    right: 30px;
                    top: 12px;
                }
                .app__btn-mod {
                    right: 140px;
                }
            }
            .a-v-content {
                padding-left: 20px;
            }
            .app__table-right {
                span {
                    color: $mainColor;
                    cursor: pointer;
                }
            }
        }
    }
    .info-container{
        padding: 5px 20px;
        margin-bottom: 20px;
        background-color: #fbfdff;

        .col{
            padding: 8px 0;
        }
    }

  .l-d-content {
    .d-c-tab {
      height: 50px;
      line-height: 50px;
      border-bottom: 2px solid #fafafa;

      .c-t-item {
        display: inline-block;
        position: relative;
        height: 50px;
        width: 60px;
        text-align: center;
        margin-left: 20px;
        cursor: pointer;
      }
    }

    .d-c-info {
      padding: 40px 20px 0 50px;
    }

    .d-c-val {
      padding: 40px 20px 0;

      .c-v-title {
        background-color: #f5fafd;
        text-align: center;
      }
    }
  }

  .h-dialog {
    .col {
      text-align: center;
    }

    .h-d-title {
      background-color: #f8fcff;
      border-top: 1px solid #00c0ff;

      .col {
        border-width: 0 0 1px 1px;
        border-style: solid;
        border-color: #efefef;

        &:last-child {
          border-right: 1px solid #efefef;
        }
      }
    }

    .h-d-item {
      border-bottom: 1px solid #efefef;
    }
  }

    .cus-main{
        margin-top: 10px;		
        padding-left: 24px;
        line-height: 40px;
        border-radius: 6px;
        background: #f9fcfe;
        font-size: 14px;
        .upload-total,
        .upload-succ {
            color: #00c0ff;
        }
        .upload-error {
            color: #ff0000;
        }
    }
    .upload-error-detail {
        width: 100%;
        margin-top: 10px;
        text-align: center;
        .app__btn-delete {
            padding: 0 15px 0 30px;
            background-color: #fff;
            color: #00c0ff;
            border: 1px solid #00c0ff;
            background: url('./images/download_active.png') no-repeat;
            background-position: 10px;
            &:hover {
                background-color: #00c0ff;
                color: #fff;
                background-image: url(./images/download.png);
                background-repeat: no-repeat;
            }
        }
    }
}
</style>