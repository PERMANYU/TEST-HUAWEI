<template>
	<div class="list">
		<div class="header">
			<div class="h-all">
				<div class="h-a-title">
					<div class="a-t-name">全部数据</div>
				</div>
				<div class="h-a-search">
					<Col :span="14" :offset="1">
						<Search placeholder="请输入属性名称" @search="clickSearch"></Search>
					</Col>
				</div>

				<div class="h-a-add">
					<div class="app__btn app__btn-add" @click="addClick()">添加</div>
				</div>
			</div>

            <!--弹出的列表操作按钮-->
			<div :class="['h-operation',checkboxData.length > 0 ? 'active' : '']">
				<div class="h-o-item">已选中<span class="h-o-count">{{checkboxData.length}}</span>项</div>
				<div class="h-o-item delete" @click="listDelClick('top')">删除</div>
				<div class="h-o-item modify" @click="listModClick()">修改</div>
				<div class="h-o-item release" @click="listReleaseClick('top')">发布</div>
			</div>
		</div>


        <!-- 属性配置列表 -->
       <div class="main">
            <Scroll class="app__table" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
                <DragGroup class="m-title app__table-thead" :titleList="tableTitleData" @dragchange="dragchange">
                    <Col :class="['m-item']" :span="2"><span>选择</span></Col>
                    <Col class="m-item m-t-name" :span="4"><span>属性名称</span></Col>

                    <DragItem :class="['m-item']" :span="item.span" :value="item" v-for="(item,index) in tableTitleData" :key="'table'+index">
                        <span>{{item.name}}</span>
                        <ColSel class="col-search" 
								:showOrder="false"
								@confirm="Confirmfilter(item.param)"
								>
							<Input v-if="item.param == 'attrNbr' || item.param == 'busiTypeId'" :placeholder="'请输入'+ item.name" v-model="item.part"></Input>
							<Radio v-else class="col-radio" :label="items" :name="item.param"
									v-for="(items,index) in item.parent" :key="index" 
									v-model="item.part">
									{{items.label}}
							</Radio>
						</ColSel>
                    </DragItem>

                    <Col :class="['m-item']" :span="3"><span>操作</span></Col>
                </DragGroup>


                <Row :class="['m-item app__table-item']" v-for="(requirementItem,requirementIndex) in tabData"
                     :key="'requirement' + requirementIndex">
                    <Col :span="2"><Checkbox name="checkbox1" :label="requirementItem" v-model="checkboxData"></Checkbox></Col>
                    <Col class="m-i-name" :span="4" @click.native.stop="nameClick(requirementItem)">
                        {{requirementItem.attrName}}
                    </Col>

                    <Col :span="titleItem.span" v-for="(titleItem,titleIndex) in tableTitleData" :key="'title' + titleIndex">
                        <span>{{adjustTabelItemText(requirementItem,titleItem.param)}}</span>
                    </Col>

                    <Col :span="3">
                        <span class="span" v-show="requirementItem.statusCd != '1000' " @click="modClick('bottom',requirementItem)">修改</span>
                        <span class="span" v-show="requirementItem.statusCd == '1000' " @click="listRise('bottom',requirementItem)">升版</span>
                        <span class="span" v-show="requirementItem.statusCd != '1000' " @click="listDelClick('bottom',requirementItem)">删除</span>
                        <span class="span" v-show="requirementItem.statusCd != '1000' " @click="listReleaseClick('bottom',requirementItem)">发布</span>
                        <span class="span" v-show="requirementItem.statusCd == '1000' " @click="downlineClick('bottom',requirementItem)">下架</span>
                    </Col>
                </Row>
				<Row :class="['m-item app__table-item']" v-if="tabData.length != 0" v-for="item in (20 - tabData.length)" :key="item"></Row>

                <Row class="app__data-none" v-show="tabData.length == 0">
                    <span>对不起，暂无数据</span>
                </Row>

                <!--&lt;!&ndash;补齐斑马线&ndash;&gt;-->
                <!--<Row :class="['m-item app__table-item']" v-for="fillItem in 20 - tabData.length" :key="fillItem"></Row>-->
            </Scroll>
        </div>


		<div class="footer">
			<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount"
                        :perPages=5 @change="pageChange">
			</Pagination>
		</div>


		<Dialog class="h-dialog" dialogTitle="查询属性历史版本信息" ref="historyDialog">
			<Row class="h-d-title">
				<Col :span="3">版本号</Col>
				<Col :span="4">属性编码</Col>
				<Col :span="4">属性名称</Col>
				<Col :span="4">属性值分类</Col>
				<Col :span="3">唯一性</Col>
				<Col :span="3">是否可空</Col>
				<Col :span="3">操作</Col>
			</Row>

			<Row class="h-d-item">
				<Col :span="3">1.0</Col>
				<Col :span="4">FQJD</Col>
				<Col :span="4">客户要求</Col>
				<Col :span="4">枚举型</Col>
				<Col :span="3">无</Col>
				<Col :span="3">无</Col>
				<Col :span="3">
				<span class="app__icon-btn app__icon-delete"></span>
				<span class="d-i-info"></span>
				</Col>
			</Row>

			<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount"
                        :perPages=5 @change="pageChange" :isCenter="true">
			</Pagination>
		</Dialog>

		<LeftDialog ref="leftDialog">
			<Scroll :isShowRight="true">
				<div class="l-d-header">
					<div class="d-h-title">
						<div class="h-t-left">分期解冻</div>
						<!-- <div class="h-t-right">
							<div class="app__btn app__btn-mod" @click="modClick()">修改</div>
							<div class="app__btn app__btn-del" @click="delClick()">删除</div>
						</div> -->
					</div>

					<Row class="d-h-info">
						<Col :span="4">属性编码</Col>
						<Col :span="5">属性值分类</Col>
						<Col :span="5">唯一性</Col>
						<Col :span="5">是否可空</Col>
						<Col :span="5">状态</Col>
					</Row>

					<Row class="d-h-info">
						<Col :span="4">{{dtlData.attrNbr}}</Col>
						<Col :span="5">{{getAttrValueType(dtlData.attrValueType)}}</Col>
						<Col :span="5">{{getIsUnique(dtlData.isUnique)}}</Col>
						<Col :span="5">{{getIsNullable(dtlData.isNullable)}}</Col>
						<Col :span="5">{{getStatusCd(dtlData.statusCd)}}</Col>
					</Row>
				</div>
				<div class="l-d-content">
					<div class="d-c-tab">
						<span :class="['c-t-item app__tab',{active:isPropetyInfo=='1000'}]" @click="isPropetyInfo='1000'">属性信息</span>
						<span :class="['c-t-item app__tab',{active:isPropetyInfo=='2000'}]" @click="isPropetyInfo='2000'">属性取值</span>
					</div>

                    <!--属性信息-->
					<Row class="d-c-info" v-show="isPropetyInfo=='1000'">
						<Form labelWidth="110px">
							<Col :span="12">
							    <FormItem labelText="默认值：">{{dtlData.defaultValue}}</FormItem>
							</Col>
							<Col :span="12">
							    <FormItem labelText="起始值：">{{dtlData.valueFrom}}</FormItem>
							</Col>
							<Col :span="12">
							    <FormItem labelText="结束值：">{{dtlData.valueTo}}</FormItem>
							</Col>
							<Col :span="12">
							    <FormItem labelText="是否动态属性：">{{getIsNullable(dtlData.isDanyAttr)}}</FormItem>
							</Col>
							<Col :span="12">
							    <FormItem labelText="属性值分类：">{{getAttrValueType(dtlData.attrValueType)}}</FormItem>
							</Col>
							<Col :span="12">
							    <FormItem labelText="属性值数据类型：">{{attrValueDataType(dtlData.attrValueDataType)}}</FormItem>
							</Col>
							<Col :span="12">
							    <FormItem labelText="属性格式：">{{dtlData.attrFormat}}</FormItem>
							</Col>
							<Col :span="12">
							    <FormItem labelText="属性长度：">{{dtlData.attrLength}}</FormItem>
							</Col>
							<Col :span="24">
							    <FormItem labelText="属性描述：">{{dtlData.attrDesc}}</FormItem>
							</Col>
						</Form>
					</Row>

                    <!--属性取值列表-->
					<div class="d-c-val" v-show="isPropetyInfo=='2000'">
						<Row class="c-v-title">
							<Col :span="8">属性值名称</Col>
							<Col :span="8">属性值</Col>
							<Col :span="8">属性值描述</Col>
						</Row>

                        <Row class="c-v-content" :class="['m-item app__table-item'] "
                             v-for="(item,index) in dtlData.ordAttrValueList"  v-if="item.statusCd!='1100'" :key="index">
                            <Col :span="8">{{item.attrValueName}}</Col>
                            <Col :span="8">{{item.attrValue}}</Col>
                            <Col :span="8">{{item.attrValueDesc}}</Col>
                        </Row>

						<Row class="app__data-none" v-show="dtlData.ordAttrValueList.length == 0">
							<span>对不起，暂无数据</span>
						</Row>
					</div>
				</div>
			</Scroll>
		</LeftDialog>

		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
                staff: 111,     //操作人id
                //详情数据
                dtlData:{
                    ordAttrValueList:[]
                },

                attrId: '',
                searchObj: {
                    attrName: '',     //属性名称
                    attrNbr: '',     //属性名称
                },
			    tabData:[],    //列表数据
				pageInfo: {
					pageIndex: 1, // 当前页
					pageSize: 20, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},



				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				tipConfirmType: '',
				showOperation: false,
				isPropetyInfo: '1000',
				checkboxData: [],
				boolSelectData: [
				    {
                        value: '1',
                        label: '是'
                    }, {
                        value: '0',
                        label: '否'
                    }
				],
				typeSelectData: [
				    {
                        value: '1',
                        label: '输入型'
                    }, {
                        value: '0',
                        label: '枚举型'
                    }
				],
				stateSelectData: [
				    {
                        value: '1',
                        label: '有效'
                    }, {
                        value: '0',
                        label: '无效'
                    }
				],
				searchData: [],


				tableTitleData: [{
					name: '业务大类',
					param: 'busiTypeId',
					span: 3,
				}, {
					name: '属性编码',
					param: 'attrNbr',
					span: 3,
					part:''
				}, {
					name: '属性值分类',
					param: 'attrValueDataType',
					span: 3,
					parent:[
						{label:'日期型',value:'1000'},
						{label:'日期时间型',value:'1100'},
						{label:'字符型',value:'1200'},
						{label:'浮点型',value:'1300'},
						{label:'整数型',value:'1400'},
						{label:'布尔型',value:'1500'},
						{label:'计算型',value:'1600'},
					],
				}, {
					name: '唯一性',
					param: 'isUnique',
					span: 2,
					parent:[
						{label:'是',value:'1'},
						{label:'否',value:'2'},
					],
				}, {
					name: '是否可空',
					param: 'isNullable',
					span: 2,
					parent:[
						{label:'是',value:'1'},
						{label:'否',value:'2'},
					],
				}, {
					name: '状态',
					param: 'statusCd',
					span: 2,
					parent:[
						{label:'有效',value:'1000'},
						{label:'无效',value:'1100'},
						{label:'未生效',value:'1200'},
						{label:'已归档',value:'1300'},
					],
				}],


				tableItemData: {
					code: 'FQJD',
					type: '输入型',
					wy: '无',
					isnone: '无',
					state: '有效'
				},
				isValidDrag: false,
				dragItem: null,
				dragenterItem: null,
				dragenterEl: null
			}
		},
        mounted() {
            this.getTableData();
        },

		methods: {
            //列表计算显示
            adjustTabelItemText(item, param) {
				let val = item[param];
                switch(param) {
                    case 'attrValueDataType':
                        return this.attrValueDataType(val);
                    case 'getAttrValueType':
                        return this.getAttrValueType(val);
                    case 'isUnique':
                        return this.getIsUnique(val);
                    case 'isNullable':
                        return this.getIsNullable(val);
                    case 'statusCd':
                        return this.getStatusCd(val);
                    default:
                        return val;
                }
            },

            //获取属性值类型
            attrValueDataType(type) {
                switch(type) {
                    case '1000':
                        return '日期型';
                    case '1100':
                        return '日期时间型';
                    case '1200':
                        return '字符型';
                    case '1300':
                        return '浮点型';
                    case '1400':
                        return '整数型';
                    case '1500':
                        return '布尔型';
                    case '1600':
                        return '计算型';
                    default:
                        return "未知";
                }
			},
			//属性类型
			getAttrValueType(type){
				switch(type) {
                    case "1000":
                        return '输入型';
                    case "2000":
                        return '枚举型';
                    default:
                        return "未知";
                }
			},
            //获取唯一性
            getIsUnique(type) {
                switch(type) {
                    case 1:
                        return '是';
                    case 0:
                        return '否';
                    default:
                        return "未知";
                }
            },
            //获取是否可空
            getIsNullable(type) {
                switch(type) {
                    case 1:
                        return '是';
                    case 0:
                        return '否';
                    default:
                        return "未知";
                }
            },
            //获取状态(数据对应错误)
            getStatusCd(type) {
                switch(type) {
                    case '1000':
                        return '有效';
                    case '1100':
						return '无效';
					case '1200':
						return '未生效';
					case '1300':
						return '已归档';
                    default:
                        return "未知";
                }
            },


            //查询属性配置列表
            getTableData() {
                this.$axios.get(this.$api.OrdAttrSpec, {
                    params: {
                        attrName: this.searchObj.attrName,                //属性名称
                        attrNbr: '',                                      //属性编码
                        page: this.pageInfo.pageIndex,                      //第几页
                        limit: this.pageInfo.pageSize                      //每页几条
                    }
                }).then((res) => {
                    if (res.data.success) {
                        this.pageInfo = {
                            pageIndex: res.data.attrSpecPage.page,
                            pageSize: res.data.attrSpecPage.limit,
                            rowCount: res.data.attrSpecPage.total,
                            pageCount: Math.ceil(res.data.attrSpecPage.total/res.data.attrSpecPage.limit)
                        };
                        this.tabData = res.data.attrSpecPage.content||[];

                    }
                })
            },
            //列表分页
            pageChange(page){
                this.pageInfo.pageIndex = page;
                this.getTableData();
            },
            //列表筛选
            clickSearch(param){
                this.searchObj.attrName = param;
                this.pageChange(1);
            },

            //查询配置详情
            getDetails() {
                this.$axios.get(this.$api.replace(this.$api.OrdAttrSpecDo,['{attrId}'],[this.attrId]), {
                    params: {
                    }
                }).then((res) => {
                    if (res.data.success) {
						this.dtlData = res.data.attrSpecDetail;
                    }
                })
            },

            //点击删除
            listDelClick(type,item) {
				if(type == 'top'){
					if(this.checkboxData.length > 1){
						this.$message.error({ message : "请选择一条数据"})
						return
					}
					this.attrId =  this.checkboxData[0].attrId;
					this.statusCd =  this.checkboxData[0].statusCd;
					if(this.statusCd == "1000"){
							this.$message.error({ message : "已发布过,无法删除"})
							return
						}
				}else if(type == 'bottom'){
					this.attrId =  item.attrId;
				}
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = '确认要删除选择的记录吗？';
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
				this.tipConfirmType = 'del';
			},
			//点击升版
			listRise(type,item){
				this.attrId = item.attrId
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = '确认要升版选择的记录吗？';
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
				this.tipConfirmType = 'rise';
			},
            //点击发布
            listReleaseClick(type,item) {
				if(type == 'top'){
					if(this.checkboxData.length > 1){
						this.$message.error({ message : "请选择一条数据"})
						return
					}
					this.attrId =  this.checkboxData[0].attrId;
					this.statusCd =  this.checkboxData[0].statusCd;
					if(this.statusCd == "1000"){
							this.$message.error({ message : "已发布过"})
							return
						}
				}else if(type == 'bottom'){
					this.attrId =  item.attrId;
				}
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = '确认要发布选择的记录吗？';
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
				this.tipConfirmType = 'rel';
			},
			//点击下架
			downlineClick(type,item){
				if(type == 'top'){
					if(this.checkboxData.length > 1){
						this.$message.error({ message : "请选择一条数据"})
						return
					}
					this.attrId =  this.checkboxData[0].attrPublishId;
					this.statusCd =  this.checkboxData[0].statusCd;
					if(this.statusCd != "1000"){
							this.$message.error({ message : "未发布无法下架"})
							return
						}
				}else if(type == 'bottom'){
					this.attrId =  item.attrPublishId;
				}
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = '确认要下架选择的记录吗？';
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
				this.tipConfirmType = 'bottom';
			},
            //点击弹窗确定
            tipConfirm() {
                switch(this.tipConfirmType) {
                    case 'del':
                        this.delMethod();
                        break;
                    case 'rel':
                        this.relMethod();
						break;
                    case 'rise':
                        this.riseMethod();
						break;
					case 'bottom':
                        this.downlineMethod();
						break;	
                    default:
                        break;
                }
            },
			//调用下架接口
			downlineMethod(){
				this.$axios.post(this.$api.replace(this.$api.DownlineAttrSpec,['{attrId}'],[this.attrId]), {
                        staff: this.staff,
                }).then((res) => {
                    if (res.data.success) {
						this.$message.success({ message: '下架成功！'});
						this.checkboxData = [];
                        this.$refs.tip.hide();
                        this.getTableData();
                    }
                })
			},
            //调用删除接口
            delMethod(){
				this.$axios.delete(this.$api.replace(this.$api.OrdAttrSpecDo,['{attrId}'],[this.attrId]), {
                    params: {
                        staff: this.staff,
                    }
                }).then((res) => {
                    if (res.data.success) {
						this.$message.success({ message: '删除成功！'});
						this.checkboxData = [];
                        this.$refs.tip.hide();
                        this.getTableData();
                    }
                })
			},
			//调用升版接口
			riseMethod(){
				this.$axios.post(this.$api.replace(this.$api.RiseCatalog,['{attrId}'],[this.attrId]), {
                        staff: this.staff,
                }).then((res) => {
                    if (res.data.success) {
						this.$message.success({ message: '升版成功！'});
						this.checkboxData = [];
                        this.$refs.tip.hide();
                        this.getTableData();
                    }
                })
			},
            //调用发布接口
            relMethod(){
                this.$axios.post(this.$api.replace(this.$api.ReleaseAttrSpec,['{attrId}'],[this.attrId]), {
                    staff: this.staff,
                }).then((res) => {
                    if (res.data.success) {
						this.$message.success({ message: '发布成功！'});
						this.checkboxData = [];
                        this.$refs.tip.hide();
                        this.getTableData();
                    }
                })
            },
			
            //点击名称查看详情
            nameClick(id) {
                this.$refs.leftDialog.show();
                this.attrId = id.attrId;
                this.getDetails();
            },

            addClick() {
                this.$emit('componentView', 'add')
            },
			modClick(type,item) {
				this.attrId = item.attrId
				this.$axios.get(this.$api.replace(this.$api.OrdAttrSpecDo,['{attrId}'],[this.attrId]), {
                    params: {
                    }
                }).then((res) => {
                    if (res.data.success == true) {
						let Data = res.data.attrSpecDetail;
					this.$emit('componentView', 'update',Data)
                    }
                })
			},

			listModClick() {
				if(this.checkboxData.length > 1) {
					this.$message.error({ message: '抱歉！只能选择一条数据！' });
					return
				} 
				this.attrId = this.checkboxData[0].attrId
				this.$axios.get(this.$api.replace(this.$api.OrdAttrSpecDo,['{attrId}'],[this.attrId]), {
                    params: {
                    }
                }).then((res) => {
                    if (res.data.success == true) {
						let Data = res.data.attrSpecDetail;
					this.$emit('componentView', 'update',Data)
                    }
                })
			},
			listHistoryClick() {
				if(this.checkboxData.length > 1) {
					this.$message.error({ message: '抱歉！只能选择一条数据！' });
				} else {
					this.$refs.historyDialog.show();
				}
			},
            checkboxClick() {
                this.showOperation = !this.showOperation;
            },
            searchClick(val) {
                if(!val) return;
                this.searchData = [{
                    label: '属性名称',
                    value: val
                }]
            },
			allCheckboxClick() {
				if(this.checkboxData.length == 20) {
					this.checkboxData = [];
				} else {
					this.checkboxData = [];
					for(let i = 0; i < 20; i++) {
						this.checkboxData.push(i);
					}
				}
			},
			jdClick() {
				this.searchData = [{
					label: '属性名称',
					value: '分期解冻'
				}]
			},
			searchDataClick(val) {
				this.searchData = this.searchData.filter(item => item.label != val.label && item.value != val.value)
			},
			dragchange(val) {
				this.tableTitleData = val;
			},
			Confirmfilter(val){//筛选
				switch (val) {
					case 'busiTypeId':
						break;
					case 'attrNbr':
						break;
					case 'attrValueDataType':
						break;	
					case 'isUnique':
						break;	
					case 'isNullable':
						break;	
					case 'statusCd':
						break;	
					default:
						break;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
    /*字符超出隐藏*/
    .app__cut-txt{
        overflow: hidden;
        white-space: nowrap;
        word-wrap: normal;
        text-overflow: ellipsis;
    }

	.list {
		width: 100%;
		height: 100%;
		padding: 50px 0;
		.header {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 50px;
			.h-all {
				padding: 0 20px;
				.h-a-title {
					float: left;
					.a-t-name {
						display: inline-block;
						height: 100%;
						line-height: 50px;
                        font-size: 14px;
                        color: #333333;
						padding-left: 20px;
						background-image: url(./images/all.png);
						background-repeat: no-repeat;
						background-position: 0;

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
								color: $mainColor;
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
								background-position: 0;
								cursor: pointer;
							}
						}
					}
				}
				.h-a-search {
					float: left;
					margin-left: 40px;
					width: 50%;
					input {
						float: left;
						width: 80%;
						height: 30px;
						line-height: 30px;
						border-radius: 5px 0 0 5px;
						border: 1px solid $mainColor;
						outline: none;
						text-indent: 10px;
					}
					button {
						display: block;
						float: left;
						padding: 0 20px;
						height: 30px;
						line-height: 30px;
						border-radius:0 5px 5px 0;
						border: none;
						outline: none;
						background-color: $mainColor;
						cursor: pointer;
					}
				}
				.h-a-add {
					position: absolute;
					top: 10px;
					right: 10px;
					height: 30px;
				}
			}
			.h-operation {
				position: absolute;
				top: 0;
				left: -100%;
				width: 100%;
				height: 50px;
				line-height: 50px;
				transition: .3s all ease;
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
						color: $mainColor;
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
					color: $mainColor;
				}
			}
			.search-box {
				width: 100%;
				padding: 10px 20px;
				input {
					width: 30%;
					height: 30px;
					line-height: 30px;
					border-radius: 5px;
					border: 1px solid $mainColor;
					outline: none;
					text-indent: 10px;
				}
				button {
					padding: 0 20px;
					height: 30px;
					line-height: 30px;
					border-radius: 5px;
					border: none;
					outline: none;
					background-color: $mainColor;
					cursor: pointer;
				}
			}
		}
		.main {
			width: 100%;
			height: 100%;
			.m-title {
				.col.m-t-name {
					border-right: 1px solid $mainColor;
				}
			}
			.m-item {
				.m-i-name {
					color: $mainColor;
					border-right: 1px solid $mainColor;
					cursor: pointer;
				}
			}
			.col {
				&:hover {
					.col-search {
						display: block;
						.col-radio{
							display: block;
							margin-bottom:15px;
						}
					}
				}
			}
			.span {
				color: $mainColor;
				padding: 0 5px;
				cursor: pointer;
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
		.l-d-header {
			display: inline-block;
			width: 100%;
			padding-bottom: 20px;
			border-bottom: 10px solid #f8f8f8;
			.d-h-title {
				width: 100%;
				height: 50px;
				line-height: 50px;
				.h-t-left {
					margin-left: 50px;
					padding-left: 30px;
					float: left;
					font-size: 16px;
					font-weight: bold;
					background: url(./images/sideslip_icon.png) no-repeat;
					background-position: 0;
				}
				.h-t-right {
					float: right;
					margin-right: 40px;
				}
			}
			.d-h-info {
				padding-left: 50px;
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

                .c-v-content{
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
				border-top: 1px solid $mainColor;
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
				color: #777;
				.d-i-info {
					display: inline-block;
					width: 20px;
					height: 20px;
					background: url(./images/info.png) no-repeat center;
					vertical-align: middle;
					cursor: pointer;
				}
			}
		}
	}
</style>
