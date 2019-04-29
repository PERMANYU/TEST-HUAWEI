<template>
    <transition name="fade">
		<div class="product">
			<Scroll class="app__table__inner" :isShowRight="true">
			
			<div class="title">
				<span class="t-name">修改公允价值</span>
				<span class="close" @click="pageClose()"></span>
			</div>

			<!-- 填写基本信息  -->
			<div class="access-info" ref="addAttrName">
				<Scroll class="basic-info" ref="listScroll" :isShowRight="true">
					<div class="c_title">
						<span class="c-t-name">基本信息</span>
					</div>
					<Row>
						<Form labelWidth="120px" labelAlign="right">
							<Col :span="8">
								<FormItem labelText="业务名称:" :requiredIcon="true" :errorMessage="errors.first('fairValueName')">
									<Input v-validate="'required'" v-model.trim="fairValueObj.fairValueName"  name="fairValueName" data-vv-as="业务名称"></Input>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1" >
								<FormItem labelText="所属目录:" :requiredIcon="true" :errorMessage="errors.first('catalogItemName')">
									<Input v-validate="'required'" name="catalogItemName" data-vv-as="所属目录" v-model="fairValueObj.catalogItemName" @click.native="catalogClick()" ref="catalogItemNameRef"></Input>
								</FormItem>
							</Col>
							<Col :span="7" :offset="1">
								<FormItem labelText="类型:" :requiredIcon="true" :errorMessage="errors.first('bizType')">
									<Select :data="fairTypeArray"  v-model="fairValueObj.bizType" name="bizType" data-vv-as="类型" :isNullSel="false" @change="bizTypeChange"></Select>
								</FormItem>
							</Col>
							<Col :span="8">
								<FormItem labelText="公允价值(元):" :requiredIcon="true" :errorMessage="errors.first('fairValue')">
									<Input v-validate="'required'" v-model.trim="fairValueObj.fairValue"  name="fairValue" data-vv-as="公允价值(元)"></Input>
								</FormItem>
							</Col>

							<Col :span="7" :offset="1">
								<FormItem labelText="公允价值单位:" :requiredIcon="true" :errorMessage="errors.first('unit')">
									<Select :data="fairValueArray"  v-model="fairValueObj.unit" name="unit" data-vv-as="类型" :isNullSel="false"></Select>
								</FormItem>
							</Col>
							
						</Form>
						
					</Row>				
				</Scroll>
			</div>
			
			<!--  配置公允值价值规则 -->
			<div class="access-config" ref="addAttrValue">
				<div class="basic-info" v-if="this.fairValueObj.bizType == '1'" ref="listScroll" :isShowRight="true">
					<!-- 产品配置 -->
					<div class="main">
						<div class="c_title">
							<span class="c-t-name">产品配置</span>
							<span class="app__btn btn-add" @click="addFunctionPro()">添加产品</span>
						</div>

						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="afListScroll">
							<Row class="app__table-thead">
								<Col :span="5">产品名称</Col>
								<Col :span="3">产品编码</Col>
								<Col :span="5">所属根产品名称</Col>
								<Col :span="3">所属根产品编码</Col>
								<Col :span="3">管理级别</Col>
								<Col :span="3">产品功能类型</Col>
								<Col :span="2">操作</Col>
							</Row>

							<Row :class="['app__table-item']" v-for="(item,index) in functionProConfigList" :key="index">
								<Col :span="5">{{item.prodName}}</Col>
								<Col :span="3">{{item.prodNbr}}</Col>
								<Col :span="5">{{item.rootProdName}}</Col>
								<Col :span="3">{{item.rootProdNbr}}</Col>
								<Col :span="3">{{item.funType}}</Col>
								<Col :span="3">{{item.manageGrade}}</Col>
								<Col :span="2">
									<span class="iconfont icon-shanchu" @click="delFunProConfig(item, index)"></span>
								</Col>
							</Row>
							<Row v-if="!functionProConfigList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</Scroll>

						<div class="p-footer" v-if="this.fairValueObj.bizType == '1'">
							<Pagination :pageIndex="funProConfigPageInfo.pageIndex" :pageSize="funProConfigPageInfo.pageSize" :rowCount="funProConfigPageInfo.rowCount" :isCenter="true" @change="funProConfigPageChange"></Pagination>
						</div>
					</div>
					<!-- 收入费用项配置 -->
					<div class="main main-funfee">
						<div class="c_title">
							<span class="c-t-name">收入费用项配置</span>
							<span class="app__btn btn-add" @click="addFunctionFee()">添加</span>
						</div>

						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="afListScroll">
							<Row class="app__table-thead">
								<Col :span="8">收入费用名称</Col>
								<Col :span="4">收入费用编码</Col>
								<Col :span="5">产品</Col>
								<Col :span="5">付费方式</Col>
								<Col :span="2">操作</Col>
							</Row>

							<Row :class="['app__table-item']" v-for="(item,index) in functionFeeConfigList" :key="index">
								<Col :span="8">{{item.chrgItemName}}</Col>
								<Col :span="4">{{item.chrgItemCode}}</Col>
								<Col :span="5">
									<Select :data="funFeeConfigPro"  dataValueStr="prodId" dataLabelStr="prodName" v-model="item.prodId" name="prodName" data-vv-as="产品" :isNullSel="false"></Select>
								</Col>
								<Col :span="5">
									<Select  multiple :data="funFeeWay"  v-model="item.payType" name="payType" data-vv-as="付费方式" :isNullSel="false" class="funfee-select"></Select>
								</Col>
								<Col :span="2">
									<span class="iconfont icon-shanchu" @click="delFunFeeConfig(item, index)"></span>
								</Col>
							</Row>
							<Row v-if="!functionFeeConfigList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</Scroll>

						<div class="p-footer" v-if="this.fairValueObj.bizType == '1'">
							<Pagination :pageIndex="funFeeConfigPageInfo.pageIndex" :pageSize="funFeeConfigPageInfo.pageSize" :rowCount="funFeeConfigPageInfo.rowCount" :isCenter="true" @change="funFeeConfigPageChange"></Pagination>
						</div>
					</div>
				</div>
				
				<div class="basic-info" v-if="this.fairValueObj.bizType == '2'" ref="listScroll" :isShowRight="true">
					<!-- 资费模板配置 -->
					<div class="main">
						<div class="c_title">
							<span class="c-t-name">资费模板配置</span>
							<span class="app__btn btn-add" @click="addTariffPro()">添加</span>
						</div>

						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="afListScroll">
							<Row class="app__table-thead">
								<Col :span="6">资费模板</Col>
								<Col :span="14">参数选项</Col>
								<Col :span="4">操作</Col>
							</Row>

							<Row :class="['app__table-item']" v-for="(item,index) in tariffProConfigList" :key="index">
								<Col :span="6">{{item.templateName}}</Col>
								<Col :span="14">
									<span v-for="(titItem, titIndex) in item.fairobjparamextls" :key="titIndex">{{titItem.templateParamName}} : {{titItem.attrValueName ? titItem.attrValueName : titItem.paramValue}}  ; </span>
								</Col>
								<Col :span="4">
									<span class="iconfont icon-shanchu" @click="delTariffProConfig(item, index)"></span>
								</Col>
							</Row>
							<Row v-if="!tariffProConfigList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</Scroll>
					</div>
					<!-- 收入费用项配置 -->
					<div class="main main-funfee">
						<div class="c_title">
							<span class="c-t-name">收入费用项配置</span>
							<span class="app__btn btn-add" @click="addTariffFee()">添加</span>
						</div>

						<Scroll class="app__table__inner" fixedTopClassName="app__table-thead" :isShowRight="true" ref="afListScroll">
							<Row class="app__table-thead">
								<Col :span="10">收入费用名称</Col>
								<Col :span="10">收入费用编码</Col>
								<Col :span="4">操作</Col>
							</Row>

							<Row :class="['app__table-item']" v-for="(item,index) in tariffFeeConfigList" :key="index">
								<Col :span="10">{{item.chrgItemName}}</Col>
								<Col :span="10">{{item.chrgItemCode}}</Col>
								<Col :span="4">
									<span class="iconfont icon-shanchu" @click="delTariffFeeConfig(item, index)"></span>
								</Col>
							</Row>
							<Row v-if="!tariffFeeConfigList.length" class="app__data-none">
								<Col :span="24"><span>当前无数据!</span></Col>
							</Row>
						</Scroll>

						<div class="p-footer" v-if="this.fairValueObj.bizType == '2'">
							<Pagination :pageIndex="tariffFeeConfigPageInfo.pageIndex" :pageSize="tariffFeeConfigPageInfo.pageSize" :rowCount="tariffFeeConfigPageInfo.rowCount" :isCenter="true" @change="tariffFeeConfigPageChange"></Pagination>
						</div>
					</div>
				</div>
			</div>

			<div class="footer">
				<span class="app__btn app__btn-clear" @click="globalback()">返回</span>
				<span class="app__btn app__btn-confirm" @click="submitgroup()">保存</span>
			</div>
		
			<!-- 所属目录 -->
			<Dialog dialogTitle="选择目录" ref="catalogItemDialog" @confirm="catalogItemDialogConfirm">
				<Scroll :isShowRight="true" ref="catalogItemTree">
					<Tree :folder="treeItem" :keys="catalogItemTreeKey" v-for="(treeItem,treeIndex) in catalogItemTree" :key="'tree'+treeIndex" v-model="catalogItemTreeModel" @plugClick="catalogItemTreePlugClick()" :selLevel="9999" />
				</Scroll>
			</Dialog>
			<!-- 功能类产品配置添加 -->
			<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加产品" ref="addFunProConfigRels" @confirm="addFunProConfigSubmit">
				<Scroll class="main" :isShowRight="true">
					<div class="search">
						<Search placeholder="请输入产品名称" @search="searchFunProData"></Search>
					</div>

					<div class="app__table__inner">
						<Row class="app__table-thead">
								<Col :span="10">产品名称</Col>
								<Col :span="10">产品编码</Col>
								<Col :span="4">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in funProList" :key="index">
							<Col :span="10">{{item.prodName}}</Col>
							<Col :span="10">{{item.prodNbr}}</Col>
							<Col :span="4">
								<span v-if="!selectMktFunPro(item)" class="iconfont icon-weixuanzhong-fang" @click="addFunProPage(item)"></span>
								<span v-if="selectMktFunPro(item)" class="iconfont icon-xuanzhong-fang" @click="deleteFunProPage(item)"></span>
							</Col>
						</Row>
						<Row v-if="funProList.length == 0" class="app__data-none">
							<Col :span="24">
							<span>当前无数据</span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="funProPageInfo.pageIndex" :pageSize="funProPageInfo.pageSize" :rowCount="funProPageInfo.rowCount"  @change="funProPageChange" :isCenter="true"></Pagination>
					<!-- 已选-->
					<span class="y-span" v-show="funProSelected.length>0" ref="yxScrollRef">已选产品</span>
					<!-- 已选产品的表格 -->
					<Scroll  :isShowBottom="true" v-if="funProSelected.length>0" ref="yxOfferRelsScroll" >
						<div class="app__table__inner">
							<Row class="app__table-thead">
								<Col :span="6">产品名称</Col>
								<Col :span="4">产品编码</Col>
								<Col :span="6">所属根产品名称</Col>
								<Col :span="6">所属根产品编码</Col>
								<Col :span="2">操作</Col>   
							</Row>
							<Row :class="['app__table-item']"  v-for="(item,index) in funProSelected" :key="index">
								<Col :span="6" :title="item.prodName" class="no-wrap">{{item.prodName ? item.prodName : ''}}</Col>
								<Col :span="4" >{{item.prodNbr ? item.prodNbr : ''}}</Col>
								<Col :span="6" >
									<Input v-validate="'required'" name="rootProdName" data-vv-as="所属根产品名称" v-model="item.rootProdName" @click.native="catalogRootClick(item)" 
									ref="catalogItemNameRef"
									></Input>
								</Col>
								<Col :span="6">
									<Input type="text" v-model="item.rootProdNbr" readonly></Input>
								</Col>
								<Col :span="2" >
									<span class="iconfont icon-shanchu" @click="deleteFunProClick(item)"></span>
								</Col>
							</Row>
						</div>
					</Scroll>
				</Scroll>
			</Dialog>
			<!-- 所属产品根目录 -->
			<Dialog :dialogSize="rootProDialogSize" dialogTitle="选择所属根产品" ref="rootProDialog" @confirm="rootProSubmit">
				<Scroll class="main" :isShowRight="true">
					<!-- <div class="search">
						<Search placeholder="请输入产品名称或编码" @search="searchFunRootProData"></Search>
					</div> -->
					<div class="app__table__inner">
						<Row class="app__table-thead">
							<Col :span="4">选择</Col>
							<Col :span="10">产品名称</Col>
							<Col :span="10">内部编码</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in rootProList" :key="index">
							<Col :span="4">
								<Radio name="rootPro" :label="item" v-model="rootProObj"></Radio>
							</Col>
							<Col :span="10">{{item.prodName ? item.prodName : ''}}</Col>
							<Col :span="10">{{item.prodNbr ? item.prodNbr : ''}}</Col>
						</Row>

						<Row v-if="rootProList.length == 0" class="app__data-none">
							<Col :span="24">
							<span>当前无数据</span>
							</Col>
						</Row>
					</div>
					<!-- <Pagination :pageIndex="rootProPageInfo.pageIndex" :pageSize="rootProPageInfo.pageSize" :rowCount="rootProPageInfo.rowCount"  @change="funRootProPageChange" :isCenter="true"></Pagination> -->
				</Scroll>
			</Dialog>
			<!-- 功能类收入费用配置添加 -->
			<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加收入费用项" ref="addFunFeeConfigRels" @confirm="addFunFeeConfigSubmit">
				<Scroll class="main" :isShowRight="true">
					<div class="search">
						<Search placeholder="请输入收入费用项名称或编码" @search="searchFunFeeData"></Search>
					</div>
					<div class="app__table__inner">
						<Row class="app__table-thead">
								<Col :span="12">收入费用名称</Col>
								<Col :span="8">收入费用编码</Col>
								<Col :span="4">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in funFeeList" :key="index">
							<Col :span="12">{{item.chrgItemName}}</Col>
							<Col :span="8">{{item.chrgItemCode}}</Col>
							<Col :span="4">
								<span v-if="!selectMktFunFee(item)" class="iconfont icon-weixuanzhong-fang" @click="addFunFeePage(item)"></span>
								<span v-if="selectMktFunFee(item)" class="iconfont icon-xuanzhong-fang" @click="deleteFunFeePage(item)"></span>
							</Col>
						</Row>
						<Row v-if="funFeeList.length == 0" class="app__data-none">
							<Col :span="24">
							<span>当前无数据</span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="funFeePageInfo.pageIndex" :pageSize="funFeePageInfo.pageSize" :rowCount="funFeePageInfo.rowCount"  @change="funFeePageChange" :isCenter="true"></Pagination>
					<!-- 已选-->
					<span class="y-span" v-show="funFeeSelected.length>0" ref="yxScrollRef">已选收入费用项</span>
					<!-- 已选产品的表格 -->
					<Scroll  :isShowBottom="true" v-if="funFeeSelected.length>0" ref="yxOfferRelsScroll" >
						<div class="app__table__inner">
							<Row class="app__table-thead">
								<Col :span="12">收入费用名称</Col>
								<Col :span="8">收入费用编码</Col>
								<Col :span="4">操作</Col> 
							</Row>
							<Row :class="['app__table-item']"  v-for="(item,index) in funFeeSelected" :key="index">
								<Col :span="12" :title="item.chrgItemName" class="no-wrap">{{item.chrgItemName}}</Col>
								<Col :span="8" >{{item.chrgItemCode}}</Col>
								<Col :span="4" >
									<span class="iconfont icon-shanchu" @click="deleteFunFeeClick(item)"></span>
								</Col>
							</Row>
						</div>
					</Scroll>
				</Scroll>
			</Dialog>
			
			<!-- 通信类资费模板配置添加 -->
			<Dialog :dialogSize="dialogSize" dialogTitle="添加资费模板" ref="addTariffProConfigRels" initBtn>
				 <template slot="btnBox">
					<span class="next"  @click="addTariffProConfigSubmit()">下一步</span>
					<span class="back"  @click="btnCancel()">取消</span>
				</template>
				<Scroll class="main" :isShowRight="true">
					<div class="search">
						<Search placeholder="请输入资费模板名称" @search="searchTariffProData"></Search>
					</div>
					<div class="app__table__inner">
						<Row class="app__table-thead">
							<Col :span="4">选择</Col>
							<Col :span="10">资费模板</Col>
							<Col :span="10">资费模板编码</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in tariffProList" :key="index">
							<Col :span="4">
								<!-- <Checkbox name="checkbox1" :label="item" v-model="checkboxData"></Checkbox> -->
								<Radio name="checkbox1" :label="item" v-model="checkboxData"></Radio>
							</Col>
							<Col :span="10">{{item.templateName}}</Col>
							<Col :span="10">{{item.templateNbr}}</Col>
						</Row>

						<Row v-if="tariffProList.length == 0" class="app__data-none">
							<Col :span="24">
							<span>当前无数据</span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="tariffProPageInfo.pageIndex" :pageSize="tariffProPageInfo.pageSize" :rowCount="tariffProPageInfo.rowCount"  @change="tariffProPageChange" :isCenter="true"></Pagination>
				</Scroll>
			</Dialog>
			<!-- 选择模板字段添加 -->
			<Dialog :dialogSize="dialogSize" dialogTitle="选择模板字段" ref="addTariffProField" initBtn>
				 <template slot="btnBox">
					<span class="save"  @click="addTariffProFieldSubmit()">保存</span>
					<span class="back"  @click="btnStep()">上一步</span>
				</template>
				<Scroll class="main" :isShowRight="true">
					<div class="top">
						<div class="p-left">
							<Scroll :isShowRight="true" ref="scroll">
								<Row class="p-left-row" v-for="(item,index) in priceData" :key="index">
									<span v-if="!selectMktField(item)" class="iconfont icon-weixuanzhong-fang" @click="addField(item)"></span>
									<span v-if="selectMktField(item)" class="iconfont icon-xuanzhong-fang" @click="deleteField(item)"></span>
									<span>{{item.templateParamName}}</span>
								</Row>
								
							</Scroll>
						</div>
						 <div class="p-center">
							<img src="./images/jiantou.png" alt="">
						 </div>
						<div class="p-right">
							<span class="r-tit">已选字段</span>
								<Scroll :isShowRight="true" ref="scroll">
								<Row v-for="(item, index) in priceSelected" :key="index"> 
									
									<FormItem ref="FormItem"
										:labelWidth="labelWidth" 
										:labelText="item.templateParamName+'：'" 
										:requiredIcon="item.isRequired == '1'" 
										:errorMessage="errors.first(item.templateParamName)" 
										>

										<Select v-if="item.templateTypeCode == '1000'" 
											v-model="item.paramValue" 
											:data="item.attrValues==null?[]:item.attrValues"
											dataValueStr="attrValue" 
											dataLabelStr="attrValueName"  
											v-validate="item.isRequired == '1' ? 'required' : ''" 
											:name="item.templateParamName" 
											:data-vv-as="item.templateParamName" 
											></Select>

										<Input v-else
											v-model="item.paramShowValue || item.paramValue" 
											:name="item.templateParamName" 
											v-validate="item.isRequired == '1' ? 'required' : ''" 
											:data-vv-as="item.templateParamName"
											></Input>
									</FormItem>
								</Row>
							</Scroll>
						</div>

						<Row v-if="priceData.length == 0" class="app__data-none">
							<Col :span="24">
							<span>当前无数据</span>
							</Col>
						</Row>
					</div>
				</Scroll>
			</Dialog>
			<!-- 通信类收入费用配置添加 -->
			<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加收入费用项" ref="addTariffFeeConfigRels" @confirm="addTariffFeeConfigSubmit">
				<Scroll class="main" :isShowRight="true">
					<div class="search">
						<Search placeholder="请输入收入费用项名称或编码" @search="searchTariffFeeData"></Search>
					</div>

					<div class="app__table__inner">
						<Row class="app__table-thead">
								<Col :span="12">收入费用名称</Col>
								<Col :span="8">收入费用编码</Col>
								<Col :span="4">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in tariffFeeList" :key="index">
							<Col :span="12">{{item.chrgItemName}}</Col>
							<Col :span="8">{{item.chrgItemCode}}</Col>
							<Col :span="4">
								<span v-if="!selectMktTariffFee(item)" class="iconfont icon-weixuanzhong-fang" @click="addTariffFeePage(item)"></span>
								<span v-if="selectMktTariffFee(item)" class="iconfont icon-xuanzhong-fang" @click="deleteTariffFeePage(item)"></span>
							</Col>
						</Row>
						<Row v-if="tariffFeeList.length == 0" class="app__data-none">
							<Col :span="24">
							<span>当前无数据</span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="tariffFeePageInfo.pageIndex" :pageSize="tariffFeePageInfo.pageSize" :rowCount="tariffFeePageInfo.rowCount"  @change="tariffFeePageChange" :isCenter="true"></Pagination>
					<!-- 已选-->
					<span class="y-span" v-show="tariffFeeSelected.length>0" ref="yxScrollRef">已选收入费用项</span>
					<!-- 已选产品的表格 -->
					<Scroll  :isShowBottom="true" v-if="tariffFeeSelected.length>0" ref="yxOfferRelsScroll" >
						<div class="app__table__inner">
							<Row class="app__table-thead">
								<Col :span="12">收入费用名称</Col>
								<Col :span="8">收入费用编码</Col>
								<Col :span="4">操作</Col> 
							</Row>
							<Row :class="['app__table-item']"  v-for="(item,index) in tariffFeeSelected" :key="index">
								<Col :span="12" :title="item.chrgItemName" class="no-wrap">{{item.chrgItemName}}</Col>
								<Col :span="8" >{{item.chrgItemCode}}</Col>
								<Col :span="4" >
									<span class="iconfont icon-shanchu" @click="deleteTariffFeeClick(item)"></span>
								</Col>
							</Row>
						</div>
					</Scroll>
				</Scroll>
			</Dialog>
        	<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
			</Scroll>
        </div>
		
    </transition>
</template> 

<script>
    export default {
        props:{
			componentData:{},
        },
        data() {
            return {
				currentView:'',
				dialogTitle: '',
				dialogSize: {
					size: 80,
					min: 600,
					max: 1000
				},
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
				tipIndex: 0,
				tabFlag: 1,
				// 组类型
				fairValueObj: {
					catalogItemName: '',
				},
				catalogItemTreeModel: '',
				catalogItemTreeKey: [{
                    key: 'catalogItemName',
                    span: 24
				}],
				catalogItemTree: [],
				// 类型
				fairTypeArray: [{
					label: '功能类', 
					value: '1'
				},{
					label: '通信类',
					value: '2'
				}],
				// 公允价值单位
				fairValueArray: [{
					label: '元/分钟',
					value: '10'
				},{
					label: '元/月',
					value: '11'
				},{
					label: '元/MB',
					value: '12'
				},{
					label: '元/分钟',
					value: '13'
				},{
					label: '元/条',
					value: '14'
				},{
					label: '元/月/账号',
					value: '15'
				}],
				
				// 功能类产品配置
				functionProConfigList: [],
				fairChrgRelId: '', // 公允对象id
				funProConfigPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				// 功能类收入费用
				functionFeeConfigList: [],
				funFeeConfigPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				// 产品配置添加列表
				funProList: [],
				funProPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				funProSelected: [],
				objId: '', // 产品id
				funProTemp: [],
				searchObjFunPro: {
					prodName: '',
					prodNbr: ''
				},
				rootProList: [],
				rootProPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				searchObjRootPro: {
					rootProdName: '',
					rootProdNbr: ''
				},
				rootProObj: {
					
				}, 
				// 已选产品根产品
				rootObj: {},
				rootProDialogSize: {
					size: 60,
					min: 400,
					max: 600
				},
				

				// 收入费用配置添加列表
				funFeeList: [],
				funFeePageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				funFeeSelected: [],
				chrgItemsId: '', // 费用项id
				funFeeTemp: [],
				searchObjFunFee: {
					chrgItemName: '',
					chrgItemCode: ''
				},
				// 收入费用-产品
				funFeeConfigPro1: [], 
				funFeeConfigPro: [], 
				// 收入费用-付费方式
				funFeeWay: [{
					label: '后付费',
					value: '1200'
				},{
					label: '准实时预付费',
					value: '1201'
				},{
					label: '准预付费实时信控',
					value: '1202'
				},{
					label: '预付费',
					value: '2100'
				},{
					label: '按电信规则确定',
					value: '3100'
				}],

				proFeeObj: [],

				tariffProConfigList: [],
				fairChrgRelId: '', // 公允对象id
				// 通信类收入费用
				tariffFeeConfigList: [],
				tariffFeeConfigPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				// 资费模板配置添加列表
				tariffProList: [],
				tariffProPageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				tariffProSelected: [],
				checkboxData: [], // 资费模板
				priceData: '',//资费模板字段数据
				// 资费模板字段
				priceSelected: [],
				tariffTemplateId: '', // 资费模板字段id
				priceTemp: [],
				labelWidth: '150px',

				prodId: '', // 产品id
				tariffProTemp: [],
				searchObjTariffPro: {
					feeTemplateName: '',
					feeTemplateCode: ''
				},
				// 收入费用配置添加列表
				tariffFeeList: [],
				tariffFeePageInfo: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0
				},
				tariffFeeSelected: [],
				chrgItemsId: '', // 费用项id
				tariffFeeTemp: [],
				searchObjTariffFee: {
					chrgItemName: '',
					chrgItemCode: ''
				}
            }
		},
		created() {
		},
		watch: {
			
		},
		mounted() {
			this.getDetail();
			this.getProductList(); 
			this.getFairChrgRelList(); 

			this.getTariffList(); 
			this.getTariffFeeList(); 
		},
        methods:{
			changeView(view,obj){
                this.currentView = view;
                this.currentData = obj;
			},

			catalogClick() {
				this.$axios.get(this.$api.GetFairTree, {
					params: {
					}
				}) .then(res => {
                    if (res.data.success) {
                        this.catalogItemTree = res.data.catalogDetail.catalogItems || [];
                        this.$nextTick(() => {
                             this.$refs.catalogItemDialog.show();
                        })
                    } else {
                        this.$message.error({message: res.data.msg})
                    }
                }).catch(error => {
                    this.$message.error({ message: '所属目录列表查询失败！' });
                })
				
			},
			 catalogItemTreePlugClick() {
                this.$refs.catalogItemDialog.initHeight();
                this.$refs.catalogItemTree.initScroll();
			},
			 catalogItemDialogConfirm() {

                this.fairValueObj.catalogItemName = this.catalogItemTreeModel.catalogItemName;
				this.fairValueObj.catalogItemId = this.catalogItemTreeModel.catalogItemId;
                this.$refs.catalogItemDialog.hide();
				this.$refs.catalogItemNameRef.focus();
				setTimeout(() => {
					this.$refs.catalogItemNameRef.blur();
                }, 100)
            },

			// 获取详情
			getDetail() {
				this.$axios.get(this.$api.replace(this.$api.QueryFairTask, ['{fairValueId}'], [this.componentData.fairValueId]), {
					params: {
						fairValueId: this.componentData.fairValueId
					}
				}).then(res => {
					if (res.data.success) {
						this.fairValueObj = res.data.fairvalue
					}
					
				})
			},
			//功能类
			// 功能类-获取产品配置列表
			getProductList() {
				this.$axios.get(this.$api.replace(this.$api.QueryProductList, ['{fairValueId}'], [this.componentData.fairValueId]), {
					params: {
						fairValueId: this.componentData.fairValueId,
						limit: this.funProConfigPageInfo.pageSize,
						page: this.funProConfigPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success == true) {
						this.functionProConfigList = res.data.fairobjproductlist.content || [];
						this.funProConfigPageInfo.rowCount = res.data.fairobjproductlist.total;
						this.$nextTick( () => {
							this.funFeeConfigPro1 = res.data.fairobjproductlist.content; // 下拉框数据
							this.funFeeConfigPro = this.funFeeConfigPro1.map(item => {
								return {
									prodId: item.objId,
									prodName: item.prodName
								}
							})
						})
					}
				})
			},
			// 功能类-收入费用项列表
			getFairChrgRelList() {
				this.$axios.get(this.$api.replace(this.$api.QueryFairChrgRelList, ['{fairValueId}'], [this.componentData.fairValueId]), {
					params: {
						fairValueId: this.componentData.fairValueId,
						limit: this.funFeeConfigPageInfo.pageSize,
						page: this.funFeeConfigPageInfo.pageIndex
					}
					
				}).then(res => {
					if (res.data.success == true) {
						this.functionFeeConfigList = res.data.fairChrgRelList.content || [];
						this.funFeeConfigPageInfo.rowCount = res.data.fairChrgRelList.total;
						for(let ele of this.functionFeeConfigList){
							ele.payType = ele.payType ? ele.payType.split('|') : ''
						}
					}
				})
			},

			// 添加产品配置列表
			getProduct() {
				this.$axios.get(this.$api.QureyProdList, {
					params: {
						prodName: this.searchObjFunPro.prodName,
						prodNbr:  this.searchObjFunPro.prodNbr,
                        page: this.funProPageInfo.pageIndex,
                        limit: this.funProPageInfo.pageSize,
					}
				}).then(res => {
					if (res.data.success) {
						this.funProList = res.data.products.content || [];
						this.funProPageInfo.rowCount = res.data.products.total;
					}
				})
			},

			// 获取费用列表(功能类)
			getChrgItemPageList() {
				this.$axios.get(this.$api.QueryChrgItem, {
					params: {
						chrgItemName: this.searchObjFunFee.chrgItemName,
						chrgItemCode: this.searchObjFunFee.chrgItemCode,
						limit: this.funFeePageInfo.pageSize,
						page: this.funFeePageInfo.pageIndex 
					}
				}).then(res => {
					this.funFeeList = res.data.chrgItemslist.content || [];
					this.funFeePageInfo.rowCount = res.data.chrgItemslist.total;
				})
			},
			//获取费用列表(通信类)
			getChrgItemTariffPageList() {
				this.$axios.get(this.$api.QueryChrgItem, {
					params: {
						chrgItemName: this.searchObjTariffFee.chrgItemName,
						chrgItemCode: this.searchObjTariffFee.chrgItemCode,
						limit: this.tariffFeePageInfo.pageSize,
						page:  this.tariffFeePageInfo.pageIndex
					}
				}).then(res => {
					this.tariffFeeList = res.data.chrgItemslist.content || [];
					this.tariffFeePageInfo.rowCount = res.data.chrgItemslist.total;
				})
			},
			// 功能类产品配置添加
			addFunctionPro() {
				this.searchObjFunPro.prodName = '';
				this.$refs.addFunProConfigRels.show();
				this.getProduct();
				this.funProSelected = this.functionProConfigList.filter(item => {
					item.isOldList = true;
					return true;
				})
			},
			// 功能类收入费用配置
			addFunctionFee() {
				this.searchObjFunFee.chrgItemName = '';
				this.searchObjFunFee.chrgItemCode = '';
				this.$refs.addFunFeeConfigRels.show();
				this.getChrgItemPageList();
				this.funFeeSelected = this.functionFeeConfigList.filter(item => {
					item.isOldList = true;
					return true;
				})
			},
			// 删除功能类产品配置
			delFunProConfig(item, index) {
				// fairChrgRelId 公允对象Id
				this.fairChrgRelId = item.fairChrgRelId;
				if (item.fairChrgRelId) {
					this.tipType = 'DEL';
					this.tipSelData = item;
					this.tipIndex = index;
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认删除产品？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				} else {
					this.functionProConfigList.splice(index, 1)
				}
			},
			
			// 删除功能类收入费用配置
			delFunFeeConfig(item, index) {
				// fairChrgRelId
				this.fairChrgRelId = item.fairChrgRelId;
				if (item.fairChrgRelId) {
					this.tipType = 'DEL';
					this.tipSelData = item;
					this.tipIndex = index;
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认删除收入费用？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				} else {
					this.functionFeeConfigList.splice(index, 1)
				}
			},
			// 产品列表的page
			funProConfigPageChange(page) {
				this.funProConfigPageInfo.pageIndex = page;
				this.getProductList();
			},
			// 收入费用列表的page
			funFeeConfigPageChange(page) {
				this.funFeeConfigPageInfo.pageIndex = page;
				this.getFairChrgRelList();
			},
			
			// 产品配置添加列表搜索
			searchFunProData(val) {
				this.funProPageInfo.pageIndex = 1;
				this.searchObjFunPro.prodName = val;
				// this.searchObjFunPro.prodNbr = val;
				this.getProduct();
			},
			
			// 收入费用配置搜索
			searchFunFeeData(val) {
				this.funFeePageInfo.pageIndex = 1;
				this.searchObjFunFee.chrgItemName = val;
				this.searchObjFunFee.chrgItemCode = val;
				this.getChrgItemPageList();
			},
			// 是否选中(功能类产品配置)
			selectMktFunPro(val) {
				return this.funProSelected.find(item => item.objId == val.prodId)
			},
			// 是否选中(功能类收入费用)
			selectMktFunFee(val) {
				return this.funFeeSelected.find(item => item.chrgItemsId == val.chrgItemsId)
			},
			// 选中产品(功能类)
			addFunProPage(item) {
				if(item.prodId == this.prodId) {
					this.$message.warning({message: '不可选择当前产品！'});
				} else {
					let Temp = {
						objId: item.prodId,
						prodName: item.prodName,
						prodNbr: item.prodNbr,
						flowProdId: item.flowProdId,
						rootProdName: item.rootProdName,
						rootProdNbr: item.rootProdNbr,
						funType: item.manageGrade, 
						manageGrade: item.prodFuncType 
					}
					this.funProSelected.push(Temp);
				}
			},
			// 选中收入费用(功能类)
			addFunFeePage(item) {
				if(item.chrgItemsId == this.chrgItemsId) {
					this.$message.warning({message: '不可选择当前产品！'});
				} else {
					let Temp = {
						chrgItemsId: item.chrgItemsId,
						chrgItemName: item.chrgItemName,
						chrgItemCode: item.chrgItemCode,
						chrgProduct: item.chrgProduct, // 收入费用-产品
						chrgFeeWay: item.chrgFeeWay // 收入费用-付费方式
					}

					this.funFeeSelected.push(Temp);
				}
			},
			// 再次点击删除选中产品(功能类)
			deleteFunProPage(item) {
				for(var i=0;i<this.funProSelected.length;i++){
					if(this.funProSelected[i].objId == item.prodId){
						this.funProSelected.splice(i,1);
					}
				}
			},
			// 再次点击删除选中收入费用(功能类)
			deleteFunFeePage(item) {
				for(var i=0;i<this.funFeeSelected.length;i++){
					if(this.funFeeSelected[i].chrgItemsId == item.chrgItemsId){
						this.funFeeSelected.splice(i,1);
					}
				}
			},
			// 已选产品的删除(功能类)
			deleteFunProClick(item) {
				for(var i=0;i<this.funProSelected.length;i++){
					if(this.funProSelected[i].objId == item.objId){
						this.funProSelected.splice(i,1);
					}
				}
				
			},
			// 已选收入费用删除(功能类)
			deleteFunFeeClick(item) {
				for(var i=0;i<this.funFeeSelected.length;i++){
					if(this.funFeeSelected[i].chrgItemsId == item.chrgItemsId){
						this.funFeeSelected.splice(i,1);
					}
				}
			},

			// 添加产品配置保存(功能类)
			addFunProConfigSubmit() {
				this.funProTemp = [];
				if (this.funProSelected.length == 0) {
					this.$refs.addFunProConfigRels.hide();
					return;
				}
				for(var i = 0; i < this.funProSelected.length; i++){
					if(!this.funProSelected[i].objId){
						this.funProSelected.splice(i,1);
					}
				}
				for (let ele of this.funProSelected) {
					if(!ele.rootProdName || !ele.rootProdNbr) {
						this.$message.warning({message: '请输入框中的值！'});
						this.isOk = false;
					} else {
						this.isOk = true;
					}
				}
				if (this.isOk) {
					for(let ele of this.funProSelected) {
						let Temp = {
							objId: ele.objId,
							prodName: ele.prodName,
							prodNbr: ele.prodNbr,
							flowProdId: ele.flowProdId,
							rootProdName: ele.rootProdName,
							rootProdNbr: ele.rootProdNbr,
							funType: ele.manageGrade, 
							manageGrade: ele.prodFuncType 
						}
						this.funProTemp.push(Temp);
					}
					for(var i=0;i<this.funProTemp.length;i++) {
						if(!this.funProTemp[i].objId){
							this.funProTemp.splice(i,1);
						}
					}
					this.functionProConfigList = this.funProSelected

					let tempArray = this.functionProConfigList.map(item => {
						return {
							objId: item.objId,
							fairValueId: this.componentData.fairValueId,
							// prodName: item.prodName,
							// prodNbr: item.prodNbr,
							flowProdId: item.flowProdId,
							// rootProdName: item.rootProdName,
							// rootProdNbr: item.rootProdNbr,
							// funType: item.funType,
							// manageGrade: item.manageGrade,
							objType: '1000',
							createStaff: this.$user.getInfo().id
						}
					})

					this.$axios.put(this.$api.replace(this.$api.AddProduct, ['{fairValueId}'], [this.componentData.fairValueId]), {
						fairObjRelModes: tempArray,
					}).then(res => {
						if (res.data.success) {
							this.$message.success({message: '产品配置添加成功!'});
							this.$refs.addFunProConfigRels.hide();
							this.getProductList();
						}
					})
				} else {
					return
				}
			},
			// 添加收入费用保存(功能类)
			addFunFeeConfigSubmit() {
				this.funFeeTemp = [];
				if (this.funFeeSelected.length == 0) {
					this.$refs.addFunFeeConfigRels.hide();
					return
				}
				for(var i = 0; i < this.funFeeSelected.length; i++){
					if(!this.funFeeSelected[i].chrgItemsId){
						this.funFeeSelected.splice(i,1);
					}
				}
				this.isOk = true
				if (this.isOk) {
					for(let ele of this.funFeeSelected) {
						let Temp = {
							chrgItemsId: ele.chrgItemsId,
							chrgItemName: ele.chrgItemName,
							chrgItemCode: ele.chrgItemCode,
							prodId: ele.prodId, // 收入费用-产品
							payType: ele.payType, // 收入费用-付费方式
						}
						this.funFeeTemp.push(Temp);
					}
					for(var i=0;i<this.funFeeTemp.length;i++) {
						if(!this.funFeeTemp[i].chrgItemsId){
							this.funFeeTemp.splice(i,1);
						}
					}
					this.functionFeeConfigList = this.funFeeSelected;
					let tempArray = this.functionFeeConfigList.map(item => {
						return {
							chrgItemsId: item.chrgItemsId,
							fairValueId: this.componentData.fairValueId,
							chrgItemName: item.chrgItemName,
							chrgItemCode: item.chrgItemCode,
							createStaff: this.$user.getInfo().id
						}
					})

					this.$axios.put(this.$api.replace(this.$api.AddFeeItem, ['{fairValueId}'], [this.componentData.fairValueId]), {
						fairChrgRelModes: tempArray
					}).then(res => {
						if (res.data.success) {
							this.getFairChrgRelList();
							this.$message.success({message: '收入费用项配置添加成功!'});
							this.$refs.addFunFeeConfigRels.hide();
						}
					})
					
				} else {
					return
				}
			},
			// 所属根产品名称
			catalogRootClick(item) {
				this.rootObj = item
				this.getRootList();
				this.$refs.rootProDialog.show();
				
			},
			getRootList() {
				this.$axios.get(this.$api.replace(this.$api.QureyOrdParProdList, ['{prodId}'], [this.rootObj.objId]), {
					params: {
						prodId: this.rootObj.objId,
					}
				}).then(res => {
					if (res.data.success) {
						this.rootProList  = res.data.products || [];
					}
				})
			},
			rootProSubmit() {
				if (this.rootProList == '') {
					this.rootObj.flowProdId = this.rootObj.objId;
					this.rootObj.rootProdName = this.rootObj.prodName
					this.rootObj.rootProdNbr = this.rootObj.prodNbr
					this.$refs.rootProDialog.hide();
				}else{
					this.rootObj.flowProdId = this.rootProObj.prodId
					this.rootObj.rootProdName = this.rootProObj.prodName
					this.rootObj.rootProdNbr = this.rootProObj.prodNbr
					this.$refs.rootProDialog.hide();
					this.rootProObj = ''
				}
				

			},
			// 产品列表的page
			funProPageChange(page) {
				this.funProPageInfo.pageIndex = page;
				this.getProduct();
			},
			
			// 收入费用列表的page
			funFeePageChange(page) {
				this.funFeePageInfo.pageIndex = page;
				this.getChrgItemPageList();
			},


			// 通信类
			// 资费模板配置列表
			getTariffList() {
				this.$axios.get(this.$api.QueryTariffList, {
					params: {
						fairValueId: this.componentData.fairValueId,
						objType: '2000',
					}
				}).then(res => {
					this.tariffProConfigList = res.data.dfairtariffobjextdtols || [];
				})
			},

			getTariffFeeList() {
				this.$axios.get(this.$api.replace(this.$api.QueryFairChrgRelList, ['{fairValueId}'], [this.componentData.fairValueId]), {
					params: {
						fairValueId: this.componentData.fairValueId,
						limit: this.tariffFeeConfigPageInfo.pageSize,
						page: this.tariffFeeConfigPageInfo.pageIndex
					}
					
				}).then(res => {
					if (res.data.success === true) {
						this.tariffFeeConfigList = res.data.fairChrgRelList.content;
						this.tariffFeeConfigPageInfo.rowCount = res.data.fairChrgRelList.total;
					} else {
						this.$message.error({"message": "查询失败!"})
					}
				}).catch(error => {
					this.$message.error({"message": "服务器异常--收入费用项配置列表-通信类!"})
				})
			},

			// 资费模板添加列表
			getTariffTemplate() {
				// tariffProPageInfo
				this.$axios.get(this.$api.TariffTemplateList, {
					params: {
						templateNbr: this.searchObjTariffPro.templateNbr,
						templateName: this.searchObjTariffPro.templateName,
						limit: this.tariffProPageInfo.pageSize,
						page: this.tariffProPageInfo.pageIndex
					}
				}).then(res => {
					if (res.data.success) {
						this.tariffProList = res.data.tariffTemplateDTOPaasPage.content || [];
						this.tariffProPageInfo.rowCount = res.data.tariffTemplateDTOPaasPage.total;
					}
				})
			},
			
			// 资费模板配置添加
			addTariffPro() {
				this.searchObjTariffPro.templateName = '';
				this.searchObjTariffPro.templateNbr = '';
				this.$refs.addTariffProConfigRels.show();
				this.getTariffTemplate();
				this.priceSelected = [];
			},
			// 收入费用项配置
			addTariffFee() {
				this.searchObjTariffFee.chrgItemName = '';
				this.searchObjTariffFee.chrgItemCode = '';
				this.$refs.addTariffFeeConfigRels.show();
				this.getChrgItemTariffPageList();
				this.tariffFeeSelected = this.tariffFeeConfigList.filter(item => {
					item.isOldList = true;
					return true;
				})
			},
			// 删除资费模板配置
			delTariffProConfig(item, index) {
				this.fairChrgRelId = item.fairChrgRelId;
				if (item.fairChrgRelId) {
					this.tipType = 'DEL';
					this.tipSelData = item;
					this.tipIndex = index;
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认删除资费模板配置？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				} else {
					this.tariffProConfigList.splice(index, 1)
				}
			},
			// 删除收入费用配置
			delTariffFeeConfig(item, index) {
				this.fairChrgRelId = item.fairChrgRelId;
				if (item.fairChrgRelId) {
					this.tipType = 'DEL';
					this.tipSelData = item;
					this.tipIndex = index;
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认删除收入费用项配置？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				} else {
					this.tariffFeeConfigList.splice(index, 1)
				}
			},
			// 收入费用列表的page
			tariffFeeConfigPageChange(page) {
				this.tariffFeeConfigPageInfo.pageIndex = page;
				this.getTariffFeeList();
			},
			
			// 资费模板配置添加列表搜索
			searchTariffProData(val) {
				// if (val == '') {
				// 	this.searchObjTariffPro.templateNbr = '';
				// 	this.searchObjTariffPro.templateName = '';
				// 	this.getTariffTemplate()
				// }
				// if (/^(\d{8})$/.test(val)) {
				// 	this.searchObjTariffPro.templateNbr = val;
				// 	this.tariffProPageInfo.pageIndex = 1;
				// 	this.getTariffTemplate()
				// } else {
				// 	this.searchObjTariffPro.templateName = val;
				// 	this.tariffProPageInfo.pageIndex = 1;
				// 	this.getTariffTemplate()
				// }
				this.searchObjTariffPro.templateName = val;
				this.tariffProPageInfo.pageIndex = 1;
				this.getTariffTemplate()
			},
			
			// 收入费用配置搜索
			searchTariffFeeData(val) {
				this.tariffFeePageInfo.pageIndex = 1;
				this.searchObjTariffFee.chrgItemName = val;
				this.searchObjTariffFee.chrgItemCode = val;
				this.getChrgItemTariffPageList();
			},
			// 是否选中(资费模板配置)
			selectMktTariffPro(val) {
				return this.tariffProSelected.find(item => item.objId == val.objId)
			},
			// 是否选中(收入费用)
			selectMktTariffFee(val) {
				return this.tariffFeeSelected.find(item => item.chrgItemsId == val.chrgItemsId)
			},
				// 是否选中资费模板字段
			selectMktField(val) {
				return this.priceSelected.find(item => item.templateParameterRelId == val.templateParameterRelId)
			},
			
			// 选中收入费用
			addTariffFeePage(item) {
				// if(item.chrgItemsId == this.chrgItemsId) {
				// 	this.$message.warning({message: '不可选择当前产品！'});
				// } else {
					let Temp = {
						chrgItemsId: item.chrgItemsId,
						chrgItemName: item.chrgItemName,
						chrgItemCode: item.chrgItemCode,
					}

					this.tariffFeeSelected.push(Temp);
				//}
			},

			//选中资费模板字段
			addField(item) {
				let Temp = {
					attrId: item.attrId,
					attrValues: item.attrValues,
					canAttrFlag: item.canAttrFlag,
					defaultValue: item.defaultValue,
					isRequired: item.isRequired,
					paramDesc: item.paramDesc,
					paramNbr: item.paramNbr,
					parameterDesc: item.parameterDesc,
					tariffTemplateId: item.tariffTemplateId,
					templateParamId: item.templateParamId,
					templateParamName: item.templateParamName,
					templateParamNbr: item.templateParamNbr,
					templateParamTypeId: item.templateParamTypeId,
					templateParameterRelId: item.templateParameterRelId,
					templateTypeCode: item.templateTypeCode,
					typeName: item.typeName
				}
				this.priceSelected.push(Temp)
			},
			
			// 再次点击删除选中收入费用
			deleteTariffFeePage(item) {
				for(var i=0;i<this.tariffFeeSelected.length;i++){
					if(this.tariffFeeSelected[i].chrgItemsId == item.chrgItemsId){
						this.tariffFeeSelected.splice(i,1);
					}
				}
			},
			// 已选资费模板的删除
			deleteTariffProClick(item) {
				for(var i=0;i<this.tariffProSelected.length;i++){
					if(this.tariffProSelected[i].objId == item.objId){
						this.tariffProSelected.splice(i,1);
					}
				}
				
			},
			// 已选收入费用删除
			deleteTariffFeeClick(item) {
				for(var i=0;i<this.tariffFeeSelected.length;i++){
					if(this.tariffFeeSelected[i].chrgItemsId == item.chrgItemsId){
						this.tariffFeeSelected.splice(i,1);
					}
				}
			},

			// 已选资费模板字段删除
			deleteField(item) {
				for(var i=0;i<this.priceSelected.length;i++){
					if(this.priceSelected[i].templateParameterRelId == item.templateParameterRelId){
						this.priceSelected.splice(i,1);
					}
				}
			},

			addTariffProConfigSubmit() {
				if (this.checkboxData == '') {
					this.$message.error({ message : "请选择资费模板" })
					return;
				}
				this.$refs.addTariffProField.show();
				this.tariffProTemp = [];
				this.$axios.get(this.$api.replace(this.$api.TariffTemplateDetail, ['{tariffTemplateId}'], [this.checkboxData.tariffTemplateId]), {
					params: {
						offerId: this.checkboxData.tariffTemplateId
					}
				}).then(res => {
					if (res.data.success) {
						this.priceData = res.data.tariffTemplate.templateParameterRel
						
					}
				})
			},
			btnCancel() {
				this.$refs.addTariffProConfigRels.hide();
			},
			btnStep() {
				this.$refs.addTariffProField.hide();
			},

			// 选择模板字段保存
			addTariffProFieldSubmit() {
				if (this.priceSelected.length == 0) {
					this.$refs.addTariffProConfigRels.hide();
					this.$refs.addTariffProField.hide();
					return
				}
				let fairObjParamRelModes = this.priceSelected.map(item => {
					return {
						fairObjParamRel: item.fairObjParamRel,
						fairChrgRelId: item.fairChrgRelId,
						templateParameterRelId: item.templateParameterRelId,
						paramValue: item.paramValue || '',
						createStaff: this.$user.getInfo().id
					}
				})
				this.$validator.validateAll().then((result) => {
					if (result) {
						this.$axios.put(this.$api.replace(this.$api.AddTariff, ['{fairValueId}'], [this.componentData.fairValueId]), {
							fairValueId: this.componentData.fairValueId,
							objType: '2000',
							objId: this.checkboxData.tariffTemplateId,
							createStaff: this.$user.getInfo().id,
							fairObjParamRelModes: fairObjParamRelModes
						}).then(res => {
							if (res.data.success) {
								this.$message.success({ message : "资费模板配置添加成功" })
								this.getTariffList();
								this.$refs.addTariffProConfigRels.hide();
								this.$refs.addTariffProField.hide();
								this.priceSelected = [];
								this.checkboxData = [];
							}
						})
					}
				})
				
			},
			// 添加收入费用保存
			addTariffFeeConfigSubmit() {
				this.tariffFeeTemp = [];
				if (this.tariffFeeSelected.length == 0) {
					this.$refs.addTariffFeeConfigRels.hide();
					return;
				}
				for(var i = 0; i < this.tariffFeeSelected.length; i++){
					if(!this.tariffFeeSelected[i].chrgItemsId){
						this.tariffFeeSelected.splice(i,1);
					}
				}
				this.isOk = true
				if (this.isOk) {
					for(let ele of this.tariffFeeSelected) {
						let Temp = {
							chrgItemsId: ele.chrgItemsId,
							chrgItemName: ele.chrgItemName,
							chrgItemCode: ele.chrgItemCode,
						}
						this.tariffFeeTemp.push(Temp);
					}
					for(var i=0;i<this.tariffFeeTemp.length;i++) {
						if(!this.tariffFeeTemp[i].chrgItemsId){
							this.tariffFeeTemp.splice(i,1);
						}
					}
					this.tariffFeeConfigList = this.tariffFeeSelected
					let tempArray = this.tariffFeeConfigList.map(item => {
						return {
							chrgItemsId: item.chrgItemsId,
							fairValueId: this.componentData.fairValueId,
							chrgItemName: item.chrgItemName,
							chrgItemCode: item.chrgItemCode,
							createStaff: this.$user.getInfo().id
						}
					})

					this.$axios.put(this.$api.replace(this.$api.AddFeeItem, ['{fairValueId}'], [this.componentData.fairValueId]), {
						fairChrgRelModes: tempArray
					}).then(res => {
						if (res.data.success) {
							this.getTariffFeeList();
							this.$message.success({message: '收入费用项配置添加成功!'});
							this.$refs.addTariffFeeConfigRels.hide();
						}
					})
				} else {
					return
				}
			},

			// 资费模板列表的page(对话框)
			tariffProPageChange(page) {
				this.tariffProPageInfo.pageIndex = page;
				this.getTariffTemplate();
			},
			
			// 收入费用列表的page(对话框)
			tariffFeePageChange(page) {
				this.tariffFeePageInfo.pageIndex = page;
				this.getChrgItemTariffPageList();
			},


			// 返回
			globalback() {
				this.$emit('componentView', 'list')
			},
			bizTypeChange(arg) {
				if (arg.value == '1') {
					this.getProductList(); 
					this.getFairChrgRelList(); 
				} else {
					this.getTariffList(); 
					this.getTariffFeeList(); 
				}
			},
			// 保存
			submitgroup() {
				// 功能类产品和付费方式修改
				if (this.fairValueObj.bizType == '1') {
					for (let ele of this.functionFeeConfigList) {
						let Temp = {
							fairChrgRelId: ele.fairChrgRelId,
							prodId: ele.prodId,
							payType: ele.payType ? ele.payType.join('|') : ''
						}
						this.proFeeObj.push(Temp);
					} 
					this.$axios.put(this.$api.replace(this.$api.EditFeeConfig, ['{fairValueId}'], [this.componentData.fairValueId]), {
						fairChrgRelModes: this.proFeeObj
					}).then(res => {
						if (res.data.success) {
							this.$message.success({ message : "修改成功!" });
							this.$emit('componentView', 'list')
						}
					})	
				} 
				// 修改公允基本信息
				this.$axios.put(this.$api.replace(this.$api.EditFairBase, ['{fairValueId}'], [this.componentData.fairValueId]), {
					fairValueId: this.componentData.fairValueId,
					fairValueName: this.fairValueObj.fairValueName,
					catalogItemId: this.fairValueObj.catalogItemId,
					bizType: this.fairValueObj.bizType,
					fairValue: this.fairValueObj.fairValue,
					unit: this.fairValueObj.unit
				}).then(res => {
					if (res.data.success == true) {
						this.$emit('componentView', 'list')
						this.$message.success({ message : "修改成功!" })
					}
				})
			},
			
            pageClose(){
                this.$emit('componentView','list',this.componentData)
			},

			// 获取弹框可显示的数据
			getNewDialogData(arr){
				return arr.filter( item => !item.isOldList)
			},
			tipConfirm() {
				if (this.tipInfo.msg == `是否确认删除产品？`) {
					this.$axios.delete(this.$api.replace(this.$api.DelProduct, ['{fairChrgRelId}'], [this.fairChrgRelId]), {
						params: {
							fairChrgRelId: this.fairChrgRelId,
							staff: this.$user.getInfo().id
						}
					}).then(res => {
						if (res.data.success) {
							this.$message.success({message: '产品删除成功!'});
							this.getProductList();
							this.funProSelected.splice(this.tipIndex, 1);

						} else {
							this.$message.error({ message : '产品删除失败'});
						}
						this.$refs.tip.hide();
					}).catch(error => {
						this.$message.error({message: '产品删除失败!'});
					})
				} else if (this.tipInfo.msg == `是否确认删除收入费用？`) {
					this.$axios.delete(this.$api.replace(this.$api.DelFeeItem, ['{fairChrgRelId}'], [this.fairChrgRelId]), {
						params: {
							fairChrgRelId: this.fairChrgRelId,
							staff: this.$user.getInfo().id
						}
					}).then(res => {
						if (res.data.success) {
							this.$message.success({message: '收入费用删除成功!'});
							this.getFairChrgRelList();
							this.funFeeSelected.splice(this.tipIndex, 1);

						} else {
							this.$message.error({ message : '收入费用删除失败'});
						}
						this.$refs.tip.hide();
					}).catch(error => {
						this.$message.error({message: '收入费用删除失败!'});
					})
					
				} else if (this.tipInfo.msg == `是否确认删除资费模板配置？`) {
					this.$axios.delete(this.$api.replace(this.$api.DelTariff, ['{fairChrgRelId}'], [this.fairChrgRelId]), {
						params: {
							fairChrgRelId: this.fairChrgRelId,
							staff: this.$user.getInfo().id
						}
					}).then(res => {
						if (res.data.success) {
							this.$message.success({message: '资费模板配置删除成功!'});
							this.getTariffList();
						} else {
							this.$message.error({ message : '资费模板配置删除失败'});
						}
						this.$refs.tip.hide();
					}).catch(error => {
						this.$message.error({message: '资费模板配置删除失败!'});
					})
				}  else if (this.tipInfo.msg == `是否确认删除收入费用项配置？`) {
					this.$axios.delete(this.$api.replace(this.$api.DelFeeItem, ['{fairChrgRelId}'], [this.fairChrgRelId]), {
						params: {
							fairChrgRelId: this.fairChrgRelId,
							staff: this.$user.getInfo().id
						}
					}).then(res => {
						if (res.data.success) {
							this.$message.success({message: '费用项配置删除成功!'});
							this.getTariffFeeList();
							this.tariffFeeSelected.splice(this.tipIndex, 1);

						} else {
							this.$message.error({ message : '费用项配置删除失败'});
						}
						this.$refs.tip.hide();
					}).catch(error => {
						this.$message.error({message: '费用项配置删除失败!'});
					})
				}
			}
        },
        components:{
           
        }
    }
</script>
<style scoped lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: all .3s ease;
	}

	.fade-enter,
	.fade-leave-to {
		top: -100% !important;
	}

	.step-item {
		display: inline-block;
		width: 100%;
		//max-width: 160px;
		font-size: 0;
		text-align: center;
		margin-top: 65px;
		.i-name {
			font-size: 16px;
			display: inline-block;
			width: 28%;
			height: 40px;
			line-height: 40px;
			border: 1px solid #e4e4e4;
			color: #5c9cf3;
			background-color: #fff;
			position: relative;
			margin: 0;
			font-weight: bold;
			&.active {
				background-color: #5c9cf3;
				color: #fff;
				.before {
					content: '';
					display: block;
					position: absolute;
					top: -1px;
					right: -20px;
					width: 0;
					height: 0;
					border-style: solid;
					border-color: transparent transparent transparent #5c9cf3;
					border-width: 20px 0 20px 20px;
					z-index: 1;
				}
				.after {
					content: '';
					display: block;
					position: absolute;
					top: -1px;
					left: -2px;
					width: 0;
					height: 0;
					border-style: solid;
					border-color: transparent transparent transparent #fff;
					border-width: 20px 0 20px 20px;
					z-index: 1;
				}
			
			}
			
		}
		
	}

	// 资费模板字段
	.top {
			width: 100%;
			height: 300px;
			.p-left {
				width: 30%;
				height: 100%;
				// min-height: 300px;
				float: left;
				border: 1px solid gainsboro;
				padding-left: 15px;
			}
			.p-center {
				position: absolute;
				left: 32%;
				top: 50%;
				img {
					width: 25px;
					height: 25px;
				}
			}
			.p-right {
				position: relative;
				width: 60%;
				height: 93%;
				float: right;
				margin-right: 25px;
				margin-left: 30px;
				/deep/ .src-content {               
					border: 1px solid gainsboro;
					// padding-right: 50px;
					padding: 10px 50px 0px 0px;
					margin-top: 5px;
				}
				.r-tit {
					height: 5%;
					display: inline-block;
					margin-left: 30px;
				}
			}
		}

		.search-box{
		width: 90%;
		line-height: 40px;
		&.search-long{
			padding: 0 30px 0 80px;
		}

		.search-name{
			position: absolute;
			width: 75px;
			top: 0;
			left: 0;
			text-align: right;
			white-space: nowrap;
		}

		.search-items{
			width: 90%;
			height: 100%;
		}

		.search-item{
			display: inline-block;
			height: 34px;
			line-height: 34px;
			padding: 0 20px;
			margin-right: 50px;
			border: 1px solid #f5f5f5;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;

			.item-close{
				position: absolute;
				display: block;
				width: 40px;
				height: 34px;
				top: -1px;
				right: -40px;
				background-image: url(./images/close.png);
				background-repeat: no-repeat;
				background-position: center;
				cursor: pointer;

				&:hover{
					background-image: url(./images/close_hover.png);
				}
			}
		}
	}

      .product{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 201;
        overflow: auto;
        background-color: #fff;
		

		.title{
			position: fixed;
			display: block;
			top: 0;
			left: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			font-size: 16px;
			text-align: center;
			border-bottom: 1px solid #e4e4e4;
			font-weight: 700;
			z-index: 201;
			background-color: #fff;
			span {
				position : none;
			}
        }

       
        .close{
            position: absolute;
            display: block;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            background: url(./images/close_page.png) no-repeat center;

            &:hover{
                opacity: .8;
            }
        }
 			
		.basic-info {
			margin-top: 30px;
			padding: 30px;
			padding-bottom: 0;
			height: 100%;
			//border: 1px solid #eeeeee;
			background: #fff;
			.c_title {
				width: 100%;
				height: 40px;
				line-height: 40px;
				font-weight: bold;
				font-size: 14px;
				
				.c-t-name {
					display: inline-block;
					height: 20px;
					line-height: 20px;
					padding-left: 8px;
					border-left-width: 8px;
					border-left-color: #5c9cf3;
					border-left-style: solid;
				}
				.btn-add{
					padding: 0 15px 0 30px;
					background-color: #fff;
					color: $mainColor;
					border: 1px solid $mainColor;
					background-image: url(./images/add.png);
					background-repeat: no-repeat;
					background-position: 10px;
					&:hover{
						background-color: $mainColor;
						color: #fff;
						background-image: url(./images/add_hover.png);
						background-repeat: no-repeat;
						background-position: 10px;
					}
				}
			}
			
			.form-item {
				.f-i-l {
					font-size: 16px;
				}
			}
			
			.span {
				padding: 5px 10px;
				border: 1px solid #75d3aa;
				color: #75d3aa;
				border-radius: 5px;
				margin-right: 20px;
				cursor: pointer;
				.file {
					position: absolute;
					top: 0;
					left: 0;
					width: 0;
					height: 0;
					opacity: 0;
					z-index: -1;
				}
			}
			.have-span {
				padding: 0 50px 0 10px;
				background: #eff7fe;
				margin-right: 10px;
				margin-bottom: 10px;
				color: $mainColor;
				display: inline-block;
				.delete {
					width: 8px;
					height: 8px;
					position: absolute;
					top: 12px;
					right: 20px;
					cursor: pointer;
				}
			}
		}
		.app__btn-add {
			background-color: $mainColor;
			color: #fff;
			background-image: url(./images/add_hover.png);
			background-repeat: no-repeat;
			background-position: 10px;
			border: 1px solid #5c9cf3;
		}
		.footer{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			padding: 0 20px;
			border-top: 1px solid #f5f5f5;
			text-align: right;
			background-color: #fff;
			z-index: 201;

			.save{
				display: inline-block;
				height: 30px;
				line-height: 30px;
				padding: 0 20px;
				border-radius: 4px;
				background-color: $mainColor;
				color: #fff;
				cursor: pointer;

				&:hover{
					opacity: .8;
				}
			}
		}	
    }

	.main-funfee {
		margin-bottom: 50px !important;
			/deep/ .src-content {
				min-height: 300px;
			}
			/deep/.select-dropdown {
				position: absolute;
				display: inline-block;
				left: 0;
				top: 30.5px;
				width: 100%;
				min-width: 100%;
				border: 0px solid #999;
				border-radius: 5px;
				-webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
				box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
				margin-top: 3px;
				background-color: #fff;
				padding: 5px 0;
				z-index: 1;
				max-height: 200px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
			}
		
	}
	.main {
		padding: 20px;
		.search {
			width: 300px;
			margin-bottom: 20px;
		}

		.yx-scroll{
			min-height: 160px;
		}

		.y-span {
			display: block;
			margin: 10px 0;
			font-weight: bold;
			font-size: 14px;
		}
		.date-picker {
			overflow: inherit !important;
		}
		.icon-xuanzhong-fang{
			color: $mainColor;
		}

		.edit-offer-dialog{
			padding: 20px;
		}
	}
	
</style>
