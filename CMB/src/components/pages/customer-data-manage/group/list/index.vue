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
					<div class="app__btn app__btn-add" v-if="userRightBtnControl.showAddBtn" @click="addClick()">新建申请</div>
				</div>
			</div>
			<div :class="['h-operation',checkboxData.length > 0 ? 'active' : '']">
				<div class="h-o-item">
					已选中<span class="h-o-count">{{checkboxData.length}}</span>项
				</div>
				<div class="h-o-item delete" @click="listDelClick()">
					删除
				</div>
			</div>
		</div>
		<div class="main">
			<Scroll class="app__table" :isShowBottom="true" :isShowRight="true"  fixedTopClassName="m-title" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
				<DragGroup class="m-title app__table-thead" :inline="true" :titleList="tableTitleData" @dragchange="dragchange">
					<!-- <Col :width="60" class="app__table-left">
						<Checkbox @click.native="allCheckboxClick()" :noModel="true" :checked="checkboxData.length"></Checkbox>
					</Col> -->
					<Col class="m-t-name app__table-left" :width="180">
						<span>记录号</span>
						<!-- <ColSel class="col-search"
								:showOrder="false"
								@confirm="filterConfirm">
							<Input placeholder="请输入记录号" v-model="filtrate.recordNumber"></Input>
						</ColSel> -->
					</Col>
					<DragItem :width="item.width" 
						:value="item"
						v-for="(item,index) in tableTitleData"
						:key="index">

						<span>{{item.name}}</span>

						<ColSel class="col-search"  v-if="item.param == 'applyOrderType'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
		
								<Radio class="filtrate" :label="item" 
										v-for="(item, index) in filtrate.type" :key="index" 
										v-model="applyOrderTypeRadioData">
										{{item.text}}
								</Radio>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'statusCd'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
		
								<Radio class="filtrate" :label="item" 
										v-for="(item, index) in filtrate.state" :key="index" 
										v-model="statusCdRadioData">
										{{item.text}}
								</Radio>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'targetRegionName'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Scroll class="app__table radio-height" :isShowRight="true" ref="listScroll">
									<Radio class="filtrate" :label="item" 
											v-for="(item, index) in filtrate.targetRegionName" :key="index" 
											v-model="targetRadioData">
											{{item.text}}
									</Radio>
								</Scroll>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'rootCustId'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
							<Input placeholder="请输入根客户标识" v-model="filtrate.rootCustId"></Input>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'rootCustName'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
							<Input placeholder="请输入根客户名称" v-model="filtrate.rootCustName"></Input>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'rootCustRegionName'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Scroll class="app__table radio-height" :isShowRight="true" ref="listScroll">
									<Radio class="filtrate" :label="item" 
											v-for="(item, index) in filtrate.targetRegionName" :key="index" 
											v-model="belongData">
											{{item.text}}
									</Radio>
								</Scroll>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'rootCustGroup'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Radio class="filtrate" :label="item" 
										v-for="(item, index) in filtrate.rootCustGroup" :key="index" 
										v-model="rootCustGroupRadioData">
										{{item.text}}
								</Radio>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'childCustId'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
							<Input placeholder="请输入子客户标识" v-model="filtrate.childCustId"></Input>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'childCustName'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
							<Input placeholder="请输入子客户名称" v-model="filtrate.childCustName"></Input>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'childCustRegionName'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Scroll class="app__table radio-height" :isShowRight="true" ref="listScroll">
									<Radio class="filtrate" :label="item" 
											v-for="(item, index) in filtrate.targetRegionName" :key="index" 
											v-model="childCustRadioData">
											{{item.text}}
									</Radio>
								</Scroll>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'childCustGroup'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Radio class="filtrate" :label="item" 
										v-for="(item, index) in filtrate.rootCustGroup" :key="index" 
										v-model="childCustGroupRadioData">
										{{item.text}}
								</Radio>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'createStaffName'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
								<Radio class="filtrate" :label="item" 
										v-for="(item, index) in filtrate.createStaffName" :key="index" 
										v-model="createStaffNameRadioData">
										{{item.text}}
								</Radio>
						</ColSel>
						<ColSel class="col-search"  v-if="item.param == 'createDate'"
								:showOrder="false"
								@confirm="filterConfirm(item)">
							<Calendar v-model="filtrate.createDate"></Calendar>
						</ColSel>
					</DragItem>
				<Col :width="80" class="app__table-right">
					<span>操作</span>
				</Col>
			</DragGroup>
			<Row :class="['m-item app__table-item']" :inline="true" v-for="(item,index) in tableItemData" :key="index">
				<!-- <Col :width="60" class="app__table-left">
					<Checkbox name="checkbox1" :label="item" v-model="checkboxData"></Checkbox>
				</Col> -->
				<Col :width="180" @click.native.stop="detailClick(item, true)" class="m-i-name app__table-left">{{item['applyOrderNum']}}</Col>
				<Col :inline="true" :width="tableItem.width" class="overflow-style" :title="item[tableItem.param]" v-for="(tableItem,tableIndex) in tableTitleData" :key="tableIndex">
					<span v-if="tableItem.param == 'createDate'">
						{{item[tableItem.param] | getTime}}
					</span>
					<span v-else>
						{{item[tableItem.param]}}
					</span>
				</Col>
			<!-- <Col class="app__table-right" :width="80" @click.native.stop="userRightBtnControl.auditClickBtn ? detailClick(item, 'false') : ''">
				<span class="review">审核</span>
			</Col> -->
			<Col class="app__table-right" :width="80" v-if="!userRightBtnControl.auditClickBtn || item.statusCd === '已审核' ||  item.statusCd === '审核驳回'">
				<span class="review"></span>
			</Col>
			<Col class="app__table-right" :width="80" v-else @click.native.stop="detailClick(item, false)">
				<span class="review">审核</span>
			</Col>
		</Row>
		<Row class="empty-style" :class="['m-item app__table-item']" v-for="item in (20 - tableItemData.length)" :key="item.id"></Row>
	</Scroll>
</div>
<div class="footer" v-if="tableItemData.length">
	<Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange">
	</Pagination>
</div>

<!-- 点击添加后的弹窗S -->
<Dialog ref="modalType" :dialogTitle="titleType" :dialogSize="dialogSize" :initBtn="true">
	<div class="modal-content">
		<!-- <ul>
			<li :class="index === tabActive ? item.className + '-active' : ''" class="list-type" v-for="(item, index) in tabs" :key="index" @click="tabClick(index)">			
				<i :class="[item.className + '-icon']" class="identical-icon"></i>
				<span class="list-text">{{item.text}}</span>
			</li>
		</ul> -->
		<ul class="modal-list-wrap">
			<li class="modal-list" v-for="(item,index) in tabs" :key="index" v-if="item.state" @click="selectedRadio(item)">
				<div class="list-text" :class="index === typeData.id ? 'active': ''">{{item.text}}</div>
				<Radio name="item" class="type-area" :label="item" v-model="typeData"></Radio>
			</li>
		</ul>
	</div>
	<div slot="btnBox">
		<span class="back" @click="handleBack">返回</span>
		<span class="save" @click="confirmModal">确定</span>
	</div>
</Dialog>
<!-- 点击添加后的弹窗E -->

<!--详情B-->
<LeftDialog ref="leftDialogOmit">
	<div class="dialog_header">
        <span class="title">记录号：{{detailData.applyOrderNum}}</span>
    </div>
    <div class="dialog-content" v-if="showView">
        <Scroll class="dialog-main">
            <div class="a-v-title">
                <div class="app__title-1">
                    <span class="app__title-name">基本信息</span>
                </div>
            </div>
            <div class="info-container">
                <Row>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">类型：</span>
                        <span class="app__lt-text">{{detailData.applyOrderType=='A' ? '客户误归' : (detailData.applyOrderType=='B' ? '客户遗漏' : '客户变更')}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">状态：</span>
                        <span class="app__lt-text">{{detailData.statusCd}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">目标区局：</span>
                        <span class="app__lt-text">{{detailData.targetRegionName}}</span>
                    </Col>
                </Row>
                <Row>
                	<Col class="app__ellipsis" :span="20">
                        <span class="app__lt-label">备注：</span>
                        <span class="app__lt-text" :title="detailData.remark">{{detailData.remark}}</span>
                    </Col>
                </Row>
            </div>

			<div class="app__title-1">
                <span class="app__title-name">根客户信息</span>
            </div>
            <div class="info-container">
                <Row>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">根客户标识：</span>
                        <span class="app__lt-text">{{rootChildrenData.rootCustId}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">根客户名称：</span>
                        <span class="app__lt-text">{{rootChildrenData.rootCustName}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">所属区局：</span>
                        <span class="app__lt-text">{{rootChildrenData.rootCustRegionName}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">根客户集团分群二层：</span>
                        <span class="app__lt-text">{{rootChildrenData.rootCustGroup}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">根客户等级：</span>
                        <span class="app__lt-text">{{rootChildrenData.rootCustLevel}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">子客户创建时间：</span>
                        <span class="app__lt-text">{{rootChildrenData.createDate | getLocalTime}}</span>
                    </Col>
                </Row>
            </div>

            <div class="app__title-1">
                <span class="app__title-name">子客户信息</span>
            </div>
            <div class="info-container">
                <Row>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">子客户标识：</span>
                        <span class="app__lt-text">{{rootChildrenData.childCustId}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">子客户名称：</span>
                        <span class="app__lt-text">{{rootChildrenData.childCustName}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">子客户所属区局：</span>
                        <span class="app__lt-text">{{rootChildrenData.childCustRegionName}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">子客户集团分群二层：</span>
                        <span class="app__lt-text">{{rootChildrenData.childCustGroup}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">子客户等级：</span>
                        <span class="app__lt-text">{{rootChildrenData.childCustLevel}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">子客户创建时间：</span>
                        <span class="app__lt-text">{{rootChildrenData.createDate | getLocalTime}}</span>
                    </Col>
                </Row>
            </div>

            <div class="app__title-1">
                <span class="app__title-name">其他信息</span>
            </div>
            <div class="info-container">
                <Row>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">创建人：</span>
                        <span class="app__lt-text">{{detailData.createStaffName}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">创建时间：</span>
                        <span class="app__lt-text">{{detailData.createDate | getLocalTime}}</span>
                    </Col>
                </Row>
            </div>

            <div class="app__title-1">
                <span class="app__title-name">审核信息</span>
            </div>
            <div class="info-container">
                <Row>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">审核人：</span>
                        <span class="app__lt-text">{{detailData.checkStaffName}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">审核部门：</span>
                        <span class="app__lt-text">{{detailData.checkStaffDepartName}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">审核人工号：</span>
                        <span class="app__lt-text">{{detailData.checkStaffId}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">审核通过时间：</span>
                        <!-- <span class="app__lt-text">{{detailData.checkStaffDepartName}}</span> -->
                        <span class="app__lt-text" v-if="detailData.result === '同意'">{{detailData.updateDate | getLocalTime}}</span>
                        <span class="app__lt-text" v-else></span>
                    </Col>
                </Row>
            </div>
        </Scroll>
    </div>

	<div class="dialog-content" v-if="!showView">
        <Scroll class="dialog-main">
            <div class="a-v-title">
                <div class="app__title-1">
                    <span class="app__title-name">基本信息</span>
                </div>
            </div>
            <div class="info-container">
                <Row>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">类型：</span>
                        <span class="app__lt-text">{{detailData.applyOrderType=='A' ? '客户误归' : (detailData.applyOrderType=='B' ? '客户遗漏' : '客户变更')}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">状态：</span>
                        <span class="app__lt-text">{{detailData.statusCd}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">目标区局：</span>
                        <span class="app__lt-text">{{detailData.targetRegionName}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col class="app__ellipsis" :span="20">
                        <span class="app__lt-label">备注：</span>
                        <span class="app__lt-text" :title="detailData.remark">{{detailData.remark}}</span>
                    </Col>
                </Row>
            </div>

            <div class="app__title-1">
                <span class="app__title-name">根客户信息</span>
            </div>
            <div class="info-container">
                <Row>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">根客户标识：</span>
                        <span class="app__lt-text">{{rootChildrenData.rootCustId}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">根客户名称：</span>
                        <span class="app__lt-text">{{rootChildrenData.rootCustName}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">所属区局：</span>
                        <span class="app__lt-text">{{rootChildrenData.rootCustRegionName}}</span>
                    </Col>
				</Row>
				<Row>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">根客户集团分群二层：</span>
                        <span class="app__lt-text">{{rootChildrenData.rootCustGroup}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">根客户等级：</span>
                        <span class="app__lt-text">{{rootChildrenData.rootCustLevel}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">根客户创建时间：</span>
                        <span class="app__lt-text">{{rootChildrenData.createDate | getLocalTime}}</span>
                    </Col>
				</Row>
			</div>

			<div v-if="detailData.applyOrderType !== 'C'">
				<div class="app__title-1">
	                <span class="app__title-name">子客户信息</span>
	            </div>
	            <div class="info-container">
	                <Row>
	                    <Col class="app__ellipsis" :span="8">
	                        <span class="app__lt-label">子客户标识：</span>
	                        <span class="app__lt-text">{{rootChildrenData.childCustId}}</span>
	                    </Col>
	                    <Col class="app__ellipsis" :span="8">
	                        <span class="app__lt-label">子客户名称：</span>
	                        <span class="app__lt-text">{{rootChildrenData.childCustName}}</span>
	                    </Col>
	                    <Col class="app__ellipsis" :span="8">
	                        <span class="app__lt-label">子客户所属区局：</span>
	                        <span class="app__lt-text">{{rootChildrenData.childCustRegionName}}</span>
	                    </Col>
	                </Row>
	                <Row>
	                    <Col class="app__ellipsis" :span="8">
	                        <span class="app__lt-label">子客户集团分群二层：</span>
	                        <span class="app__lt-text">{{rootChildrenData.childCustGroup}}</span>
	                    </Col>
	                    <Col class="app__ellipsis" :span="8">
	                        <span class="app__lt-label">子客户等级：</span>
	                        <span class="app__lt-text">{{rootChildrenData.childCustLevel}}</span>
	                    </Col>
	                    <Col class="app__ellipsis" :span="8">
	                        <span class="app__lt-label">子客户创建时间：</span>
	                        <span class="app__lt-text">{{rootChildrenData.createDate}}</span>
	                    </Col>
					</Row>
				</div>
			</div>

			<div class="app__title-1">
                <span class="app__title-name">其他信息</span>
            </div>
            <div class="info-container">
                <Row>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">创建人：</span>
                        <span class="app__lt-text">{{detailData.createStaffName}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="8">
                        <span class="app__lt-label">创建时间：</span>
                        <span class="app__lt-text">{{detailData.createDate | getLocalTime}}</span>
                    </Col>
                </Row>
            </div>

            <div class="app__title-1">
                <span class="app__title-name">审核信息</span>
            </div>
            <div class="info-container">
                <Row>
                    <Col class="app__ellipsis" :span="3">
                        <Radio label="同意" v-model="picked">同意</Radio>
                    </Col>
                    <Col class="app__ellipsis" :span="3">
                        <Radio label="不同意" v-model="picked">不同意</Radio>
                    </Col>
                </Row>
                <Input type="textarea" v-model="checkSuggest" placeholder="请输入审核意见"></Input>
                <div class="check-confirm" @click="checkConfirm">
                    <span class="confirm-text">确定</span>
                </div>
            </div>
		</Scroll>
	</div>
</LeftDialog>
<!--详情E-->

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
                tableTitleData:[
					{
						name:'类型',
						param:'applyOrderType',
						span:2,
						width: 120
					},{
						name:'状态',
						param:'statusCd',
						span:2,
						width: 80
					},{
						name:'目标区局',
						param:'targetRegionName',
						span:2,
						width: 120
					},{
						name:'根客户标识',
						param:'rootCustId',
						span:2,
						width: 120
					},{
						name: '根客户名称',
						param: 'rootCustName',
						width: 160
					},{
						name:'所属区局',
						param:'rootCustRegionName',
						span:3,
						width: 120
					},{
						name:'根客户集团分群二层',
						param:'rootCustGroup',
						span: 3,
						width: 180
					},{
						name:'根客户等级',
						param:'rootCustLevel',
						span: 3,
						width: 120
					},{
						name: '子客户标识',
						param: 'childCustId',
						width: 120
					},{
						name: '子客户名称',
						param: 'childCustName',
						width: 120
					}, {
						name: '子客户所属区局',
						param: 'childCustRegionName',
						width: 140
					}, {
						name: '子客户分群二层',
						param: 'childCustGroup',
						width: 140
					}, {
						name: '子客户等级',
						param: 'childCustLevel',
						width: 120
					}, {
						name: '创建人',
						param: 'createStaffName',
						width: 120
					},{
						name: '创建时间',
						param: 'createDate',
						width: 120
					}
				],
                isValidDrag: false,
                dragItem: null,
                dragenterItem: null,
                dragenterEl: null,
                tableItemData: [],
                detailData: {},
                rootChildrenData: {},   // 根客户、子客户信息
                showView: true,
                titleType: '客户关系变更类型',
                dialogSize: {
                	max: '538'
                },
                tabs: [
					{id: 0, className: 'root', text: '根客户部门变更', state: true},
					{id: 1, className: 'omit', text: '子客户遗漏', state: true},
					{id: 2, className: 'return', text: '子客户误归', state: true}
				],
				typeData: {},
                tabActive: 0,
				searchData: [],
				checkInfo: {			// 审核接口的信息
					applyOrderNumber: ''
				},
				checkSuggest: '',		// 审核意见
				dialogType: '',         //弹框类型
				filtrate: {				// 筛选信息
					recordNumber: '',   // 记录号
					type: [				// 类型
						{text: '客户部门变更', value: "C"},
						{text: '子客户误归', value: "A"},
						{text: '子客户遗漏', value: "B"},
					],
					state: [
						{text: '待审核',value: '1000'},
						{text: '已审核',value: '1100'},
						{text: '审核驳回',value: '1300'}
					],
					targetRegionName: [
						{text: '浦东', value: '浦东'},
						{text: '金山', value: '金山'},
						{text: '东区', value: '东区'},
						{text: '中区', value: '中区'},
						{text: '北区', value: '北区'},
						{text: '南区', value: '南区'},
						{text: '嘉定', value: '嘉定'},
						{text: '奉贤', value: '奉贤'},
						{text: '宝山', value: '宝山'},
						{text: '崇明', value: '崇明'},
						{text: '松江', value: '松江'},
						{text: '莘闵', value: '莘闵'},
						{text: '西区', value: '西区'},
						{text: '青浦', value: '青浦'},
						{text: '大客户部', value: '大客户部'},
						{text: '政企客户部', value: '政企客户部'}
					],
					rootCustId: '',			// 根客户标识
					rootCustName: '',		// 根客户名称
					rootCustGroup: [		// 根客户集团分群二层
						{text: '特大型客户', value: 1},
						{text: '大型客户', value: 2}
					],
					childCustId: '',		// 子客户标识
					childCustName: '',		// 子客户名称
					createStaffName: [		// 创建人
						{text: 'admin', value: 'admin'},
						{text: '张三', value: '张三'}
					],
					createDate: ''
				},
				radioData: [],
				applyOrderTypeRadioData: [],
				statusCdRadioData: [],
				targetRadioData: [],
				belongData: [],
				rootCustGroupRadioData: [],
				childCustRadioData: [],
				childCustGroupRadioData: [],
                createStaffNameRadioData: [],
                picked: '',
                conditionSearchData:[
	            {
	                iconfont: 'iconkhbs',
	                placeholder:'记录号搜索',
	                param: 'recordNumber'
	            }],

				userRightBtnControl: {			// 权限按钮控制
					showAddBtn: false,    // 新增
					auditClickBtn: false    // 审核
                }
            }
        },
        watch: {
        	searchData(newVal,oldVal){
        		this.getListData();
        	}
		},
		
        mounted() {
            this.getListData();
			
			// 循环权限数据		
			this.$user.getFuncComps().forEach((item) => {
				switch (item.compCode) {
					case 'F-CMB-100201':
						this.userRightBtnControl.showAddBtn = true;
						break;
					case 'F-CMB-100206':
						this.userRightBtnControl.auditClickBtn = true;
						break;
					case 'F-CMB-100202':
						this.tabs[0].state = true;
						break;
					case 'F-CMB-100203':
						this.tabs[1].state = true;
						break;
					case 'F-CMB-100204':
						this.tabs[2].state = true;
						break;
					default:
						break;
				}
			})
		},
        methods:{
        	orderNumClick (data) {
				let reg = /^[0-9]*$/;
				if (!reg.test(data.recordNumber)) {
					this.$message.warning({message: '只能输入纯数字'})
					return
				} else {
					this.filtrate.recordNumber = data.recordNumber;
        			this.getListData();
				}
        	},
			// 筛选
			filterConfirm (item) {
				let val = "",name="";
				switch (item.param) {
					case "applyOrderType":
						val = this.applyOrderTypeRadioData.value;
						name = this.applyOrderTypeRadioData.text;
						break;
					case "statusCd":
						val = this.statusCdRadioData.value;
						name = this.statusCdRadioData.text;
						break;						
					case "targetRegionName":
						val = this.targetRadioData.value;
						name = this.targetRadioData.value;
						break;
					case "rootCustId":
						val = this.filtrate.rootCustId;
						name = this.filtrate.rootCustId;
						break;
					case "rootCustName":
						val = this.filtrate.rootCustName;
						name = this.filtrate.rootCustName;
						break;
					case "rootCustRegionName":
						val = this.belongData.value;
						name = this.belongData.value;
						break;
					case "rootCustGroup":
						val = this.rootCustGroupRadioData.value;
						name = this.rootCustGroupRadioData.text;
						break;
					case "childCustId":
						val = this.filtrate.childCustId;
						name = this.filtrate.childCustId;
						break;
					case "childCustName":
						val = this.filtrate.childCustName;
						name = this.filtrate.childCustName;
						break;
					case "childCustRegionName":
						val = this.childCustRadioData.value;
						name = this.childCustRadioData.value;
						break;
					case "childCustGroup":
						val = this.childCustGroupRadioData.value;
						name = this.childCustGroupRadioData.text;
						break;
					case "createStaffName":
						val = this.createStaffNameRadioData.value;
						name = this.createStaffNameRadioData.text;
						break;
					case "createDate":
						val = this.filtrate.createDate;
						name = this.filtrate.createDate;
						break;
					default:
						break;
				};
				let obj = {
					label: item.name,
					code: item.param,
					value: name,
					val: val 
				}
				this.searchData = this.searchData.filter(item => item.label != obj.label);
				this.searchData.push(obj);
			},

			// 时间转时间戳
			timestamp (time) {
				let timer = new Date(time),
					timerStamp = timer.getTime();
				return timerStamp
			},
			//获取客户数据列表
			getListData (pageIndex = 1) {
				let params = {
					"createStaffName": '',
                    "systemInfoId": '',
                    "staffCode": this.$user.getUserStorage().staffCode,
					"orgId": this.$user.getOrgId(),
					"sysRoleIds": '',
					"staffId": '',
					"xSubChannel": '',
					"privCode": '',
					"applyOrderNum": this.filtrate.recordNumber,
					"statusCd": '',
					"targetRegionName": '',
					"rootCustId": '',
					"rootCustName": '',
					"rootCustRegionName": '',
					"rootCustGroup": '',
					"rootCustLevel": "",
					"childCustId": '',
					"childCustName": '',
					"childCustRegionName": '',
					"childCustGroup": '',
					"childCustLevel": '',
					"createDate": '',
					"targetRegionId": '',
					"pageSize": this.pageInfo.pageSize,
					"pageNumber": pageIndex
				}

				this.searchData.filter( item => {
					if(item.code == 'createDate'){
						params[item.code]  = this.timestamp(item.val)
					}else{
						params[item.code]  = item.val
					}
				})

				this.$axios.get(this.$api.ApplicationForm, {
					params
				}).then((res) => {
                    if (res.data.length) {
                        this.tableItemData = res.data
                        this.pageInfo.pageIndex = pageIndex
                        this.$nextTick( () => {
                            this.$refs.listScroll.init();
                        })
                        this.tableItemData.filter((item) => {
                            switch (item.applyOrderType.toUpperCase()) {
                                case "A":
                                    return item.applyOrderType = '客户误归';
                                    break;
                                case "B":
                                    return item.applyOrderType = '客户遗漏';
                                    break;
                                case "C":
                                    return item.applyOrderType = '客户变更'
                                default:
                                    break;
                            }
                        })
                        this.tableItemData.filter((item) => {
                            if(item.statusCd == '1000'){
                                item.statusCd = '未审核'
                            }else if(item.statusCd == '1100'){
                                item.statusCd = '已审核'
                            }else if(item.statusCd == '1300'){
                                item.statusCd = '审核驳回'
                            }else{
                                item.statusCd = ""
                            }
                        })
                    } else {
                        this.$message.warning({message: '暂无数据'})
                    }
                }).catch(err => {
                    this.$message.error({message: err.response.data.message})
                })
			},

            //申请单详情
            getApplicationDetail(num) {
            	this.$axios.get(this.$api.ApplicationForm + `/${num}`).then((res) => {
					this.detailData = res.data;
					if (this.detailData.statusCd == '1000') {
						this.detailData.statusCd = '未审核'
					} else if(this.detailData.statusCd == '1100'){
						this.detailData.statusCd = '已审核'
					}else {
						this.detailData.statusCd = '审核驳回'
					}
					this.detailData.custRelApplyOrderAttrs.forEach(item => {
                        this.rootChildrenData = item
                    })
            	})
            },

			// 添加按钮
            addClick(){
				// this.$emit('componentView','add')
				this.$refs.modalType.show()
			},

			// 返回
			handleBack () {
				this.$refs.modalType.hide()
			},

			// 详情
			detailClick(data, type){
				this.checkInfo.applyOrderNumber = data.applyOrderNum
				this.showView = type;
				this.getApplicationDetail(data.applyOrderNum);
				this.$refs.leftDialogOmit.show();
			},

			//取消审核
			closeConfirm() {
				if(this.dialogType== 'A'){   //误归
					this.$refs.leftDialogReturn.hide();
				}else if(this.dialogType== 'B'){   //遗漏
					this.$refs.leftDialogOmit.hide();
				}else{    //变更
					this.$refs.leftDialogAlteration.hide();
				}
			},

			// 提交审核
			checkConfirm () {
				if (this.picked == '') {
					this.$message.warning({message: '请选择审核意见'})
                    return
				}
                if (this.checkSuggest == '') {
                    this.$message.warning({message: '请输入备注'})
                    return
                }
                let staffId = this.$user.getStaffId()
				this.$axios.put(this.$api.ApplicationForm, {
					"applyOrderNum": this.checkInfo.applyOrderNumber,
					"applyOrderRemark": this.checkSuggest,
                    "result": this.picked,
                    "updateStaff": staffId
				}).then((res) => {
					if (res.data = true) {
						this.checkSuggest = '';
						this.$message.success({"message": "提交成功！"});
						this.getListData(1)
					} else {
						this.$message.success({"message": "提交失败！"})
					}
					this.$refs.leftDialogOmit.hide();
				}).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
			},
            
            // 分页
			pageChange(val){
                this.getListData(val)
			},
			listDelClick(){
				if(this.checkboxData.length > 1){
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `抱歉！只能选择一条数据！`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = false;
					this.$refs.tip.show();
				}else{
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `确认要删除吗？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				}
			},
			tipConfirm(){
				this.tipInfo.iconType = 1;
				this.tipInfo.msg = `删除成功！`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = false;
				this.$refs.tip.show();
			},
			allCheckboxClick(){
				if(this.checkboxData.length == this.tableItemData.length){
					this.checkboxData = [];
				}else{
					this.checkboxData = this.tableItemData;
				}
			},
			//列表拖拽
			dragchange(val){
				this.tableTitleData = val;
			},
			
			// searchDataClick(val){
			// 	this.searchData = this.searchData.filter( item => item.label != val.label && item.value != val.value)
			// },

			// 选择类型
			// tabClick (index) {
			// 	this.tabActive = index
			// },

			// 点击列表选定Radio
			selectedRadio (data) {
				this.typeData = data
			},

			confirmModal () {
				/* 
				**	0：表示根客户部门变更
				**	1：表示子客户遗漏
				**	2：表示子客户误归
				*/
					
				if (this.typeData.id === undefined) {
					this.$message.warning({message: "请选择发起类型"})
					return
				} else {
					switch (this.typeData.id) {
						case 0:
							this.$emit('componentView','alteration');
							break;
						case 1:
							this.$emit('componentView','omit');
							break;
						case 2:
							this.$emit('componentView','return');
							break;
						default:
							break;
					}
					this.$refs.modalType.hide();
				}
			}
		}
	}
	</script>

	<style scoped lang="scss">
		.list{
			padding: 80px 0 50px;
			width: 100%;
			height: 100%;

			.header{
				position: absolute;
				top: 0;
				left: 0;
				width: 90%;
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
						right: -90px;
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
						border-right: 1px solid #a6c2ff;
					}

					.col{
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

				.filtrate {
					display: block;
					margin-bottom: 10px;
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

					.review{
						color: #00c0ff;
						cursor: pointer;
					}
                    .overflow-style {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
				}
				.empty-style {
					width: 2160px;
				}

				.col{

					&:hover{
						.col-search{
							display: block;
						}

						.radio-height {
							height: 200px;
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

			.dialog_header {
		        height: 50px;
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
		        height: calc(100% - 10px);
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

		        .check-confirm {
                    height: 30px;
                    line-height: 28px;
                    margin: 10px 50px 0 0;
                    text-align: right;
                    font-size: 12px;
                    cursor: pointer;
                    .confirm-text {
                        display: inline-block;
                        padding: 0 20px;
                        border-radius: 4px;
                        background: $mainColor;
                        color: #fff;
                    }
                    &:hover {
                        opacity: .8;
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

			.modal-content{
				width: 100%;
				padding: 30px 20px 50px;
				.modal-list-wrap {
					max-height: 301px;
					.modal-list {
						height: 50px;
						line-height: 50px;
						padding: 0 18px 0 30px;
						border: 1px solid #dddddd;
						border-bottom: 0;
						overflow: hidden;
						cursor: pointer;
						.list-text {
							float: left;
							font-size: 14px;
							color: #666;		
						}
						.active {
							color: #00c0ff;
						}
						.type-area {
							float: right;
						}
					}
					.modal-list:nth-last-child(1) {
						border-bottom: 1px solid #dddddd;
					}
				}
				
			}
		}
	</style>