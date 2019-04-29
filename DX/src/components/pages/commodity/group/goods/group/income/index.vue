<template>
	<div class="income">
		<div class="app__top">
			<span class="app__top-left">本方销售品列表</span>
			<!-- <i :class="['iconfont','icon-xiala12',xspIsShow ? 'active' : '']" @click.stop="xspShowClick()"></i> -->
		</div>
		<div class="h-a-add">
			<Row>
				<Col :span="19">
					<div class="app__btn app__btn-add" @click="addRelationOfferRels()">添加</div>
				</Col>
				<Col :span="5">
					<div class="app__btn app__btn-add" @click="batchEdit()">批量修改</div>
					<div class="app__btn app__btn-add" @click="batchDelete()">批量删除</div>
				</Col>
			</Row>
		</div>
		<Scroll class="app__table__inner offer-rels-table" :isShowBottom="true"  fixedTopClassName="app__table-thead" ref="offerRelsScroll">
			<DragGroup class="app__table-thead" inline :titleList="offerGrpParams" @dragchange="dragchange">
				<Col :class="['m-item']" :width="tableTitleCheckboxObj.width">
					
				</Col>
				<DragItem  :width="item.width" :value="item" v-for="(item,index) in offerGrpParams" :key="'offer-param'+index">
					<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>
					<span class="offer-title-name">{{item.name}}</span>
				</DragItem>
				<Col :width="150">
					操作
				</Col>
			</DragGroup>
			<Row class="app__table-item" inline v-for="(offerRelitem,index) in delmkt(relationOfferRels)" :key="'offerRel' + index">
				<Col :width="tableTitleCheckboxObj.width">
					<Checkbox name="Checkbox" v-model="checkArr" :label="offerRelitem"></Checkbox>
				</Col>
				<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in offerGrpParams" :key="'title' + titleIndex">
					<span v-if="titleItem.param == 'effDate' || titleItem.param == 'expDate'">{{adjustTabelItemText(offerRelitem,titleItem.param) | date}}</span>
					<span v-else>{{adjustTabelItemText(offerRelitem,titleItem.param)}}</span>
				</Col>
			
				<Col :width="150">
					<span class="iconfont icon-shanchu" @click="deleteOfferBeRelyOnRels(item)"></span>
				</Col>
			</Row>
			<Row v-if="relationOfferRels.length == 0" class="app__data-none">
				<Col :span="24">
				<span>当前无数据 请先选择销售品</span>
				</Col>
			</Row>
		</Scroll>
		<div class="s-title">
			<div class="app__top">
				<span class="app__top-left">本方销售品组列表</span>
			</div>
			<div class="h-a-add">
				<Row>
					<Col :span="19">
						<div class="app__btn app__btn-add" @click="addRelationOffeGrpRelas()">添加</div>
					</Col>
					<Col :span="5">
						<div class="app__btn app__btn-add" @click="batchOffeGrpRelasEdit()">批量修改</div>
						<div class="app__btn app__btn-add" @click="batchDelete()">批量删除</div>
					</Col>
				</Row>
			</div>
		</div>
		<Scroll class="app__table__inner offer-rels-table" :isShowBottom="true"  fixedTopClassName="app__table-thead" ref="offerRelsScroll">
			<DragGroup class="app__table-thead" inline :titleList="offeGrpRelasParams" @dragchange="dragchange">
				<Col :class="['m-item']" :width="tableTitleCheckboxObj.width">
					
				</Col>
				<DragItem  :width="item.width" :value="item" v-for="(item,index) in offeGrpRelasParams" :key="'offer-param'+index">
					<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>
					<span class="offer-title-name">{{item.name}}</span>
				</DragItem>
				<Col :width="150">
					操作
				</Col>
			</DragGroup>
			<Row class="app__table-item" inline v-for="(offerRelitem,index) in delmkt(relationOffeGrpRelas)" :key="'offerRel' + index">
				<Col :width="tableTitleCheckboxObj.width">
					<Checkbox name="Checkbox" v-model="checkArr" :label="offerRelitem"></Checkbox>
				</Col>
				<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in offeGrpRelasParams" :key="'title' + titleIndex">
					<span v-if="titleItem.param == 'effDate' || titleItem.param == 'expDate'">{{adjustTabelItemText(offerRelitem,titleItem.param) | date}}</span>
					<span v-else>{{adjustTabelItemText(offerRelitem,titleItem.param)}}</span>
				</Col>
			
				<Col :width="150">
					<span class="iconfont icon-shanchu" @click="deleteGrpRelas(item)"></span>
				</Col>
			</Row>
			<Row v-if="relationOffeGrpRelas.length == 0" class="app__data-none">
				<Col :span="24">
				<span>当前无数据 请先选择销售品</span>
				</Col>
			</Row>
		</Scroll>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加本方销售品成员" ref="addRelationOfferRels" @confirm="addRelationConfirm">
			<Scroll class="scroll" :isShowRight="true">
				<div class="main">
					<div class="search">
						<Search placeholder="请输入销售品内部名称搜索" @search="search"></Search>
					</div>
					<div class="app__table__inner">
						<Row class="app__table-thead">
							<Col :span="8">销售品编码</Col>
							<Col :span="8">销售品内部名称</Col>
							<Col :span="8">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in offerPage" :key="index">
							<Col :span="8">{{item.offerNbr}}</Col>
							<Col :span="8" class="no-wrap">{{item.offerSysName}}</Col>
							<Col :span="8">
							<span v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="addClick(item)"></span>
							<span v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang" @click="deleteOfferPage(item)"></span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange" :isCenter="true">
					</Pagination>
					<span class="y-span" v-if="offerPageSelected.length>0">已选</span>
					<Scroll :isShowBottom="true" v-if="offerPageSelected.length>0" ref="yxOfferRelsScroll" @mounted="yxScrollMounted">
					<div class="app__table__inner" v-if="offerPageSelected.length>0">
						<Row class="app__table-thead" inline>
							<Col :width="200">销售品编码</Col>
							<Col :width="200">销售品内部名称</Col>
							<Col :width="80">最大数量</Col>
							<Col :width="80">最小数量</Col>
							<Col :width="80">默认数量</Col>
							<Col :width="100">适用构成最大值</Col>
							<Col :width="100">适用构成最小值</Col>
							<Col :width="100">适用构成默认值</Col>
							<Col :width="120">生效时间</Col>
							<Col :width="120">失效时间</Col>
							<Col :width="120">是否同客户</Col>
							<Col :width="120">是否同账户</Col>
							<Col :width="120">是否同地址</Col>
							<Col :width="40">操作</Col>
						</Row>
						<Row :class="['app__table-item']" inline v-for="(item,index) in delmkt(offerPageSelected)" :key="index">
							<Col :width="200">{{item.aOfferNbr}}</Col>
							<Col :width="200" class="no-wrap">{{item.aOfferSysName}}</Col>
							<Col :width="80" :class="{validate:valiateInput(item.maxNum)}">
							<Input v-model="item.maxNum" number></Input>
							</Col>
							<Col :width="80" :class="{validate:valiateInput(item.minNum)}">
							<Input v-model="item.minNum" number></Input>
							</Col>
							<Col :width="80" :class="{validate:valiateInput(item.defaultNum)}">
							<Input v-model="item.defaultNum" number></Input>
							</Col>
							<Col :width="100" :class="{validate:valiateInput(item.rstrOfferProdRelMaxNum)}">
							<Input v-model="item.rstrOfferProdRelMaxNum" number></Input>
							</Col>
							<Col :width="100" :class="{validate:valiateInput(item.rstrOfferProdRelMinNum)}">
							<Input v-model="item.rstrOfferProdRelMinNum" number></Input>
							</Col>
							<Col :width="100" :class="{validate:valiateInput(item.rstrOfferProdRelDefNum)}">
							<Input v-model="item.rstrOfferProdRelDefNum" number></Input>
							</Col>
							<Col :width="120" :class="{validate:!item.effDate}">
							<DatePicker v-model="item.effDate"></DatePicker>
							</Col>
							<Col :width="120" :class="{validate:!item.expDate}">
							<DatePicker v-model="item.expDate"></DatePicker>
							</Col>
							<Col :width="120">
							<Select :data="customer" v-model="item.isCustRstr"></Select>
							</Col>
							<Col :width="120">
							<Select :data="account" v-model="item.isAccountRstr"></Select>
							</Col>
							<Col :width="120">
							<Select :data="address" v-model="item.isAddressRstr"></Select>
							</Col>
							<Col :width="40">
							<span class="iconfont icon-shanchu" @click="deleteClick(item)"></span>
							</Col>
						</Row>
					</div>
					</Scroll>
				</div>
			</Scroll>
		</Dialog>
		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="添加本方销售品组" ref="addRelationOffeGrpRelas" @confirm="relationOffeGrpRelasConfirm">
			<Scroll class="scroll" :isShowRight="true">
				<div class="main">
					<div class="search">
						<Search placeholder="请输入销售品组名称搜索" @search="searchOffeGrpRelas"></Search>
					</div>
					<div class="app__table__inner">
						<Row class="app__table-thead">
							<Col :span="8">销售品组编码</Col>
							<Col :span="8">销售品组名称</Col>
							<Col :span="8">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in offerGrpPage" :key="index">
							<Col :span="8">{{item.offerGrpNbr}}</Col>
							<Col :span="8">{{item.offerGrpName}}</Col>
							<Col :span="8">
							<span v-if="!selectGroupMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="addGrpPageClick(item)"></span>
							<span v-if="selectGroupMkt(item)" class="iconfont icon-xuanzhong-fang" @click="deleteGrpPageClick(item)"></span>
							</Col>
						</Row>
					</div>
					<Pagination :pageIndex="pageInfo.ZpageIndex" :pageSize="pageInfo.ZpageSize" :rowCount="pageInfo.ZrowCount" :perPages=5 @change="ZpageChange" :isCenter="true">
					</Pagination>
					<span class="y-span" v-if="offerGrpPageSelected.length>0">已选</span>
					<div class="app__table__inner" v-if="offerGrpPageSelected.length>0">
						<Row class="app__table-thead">
							<Col :span="4">销售品组编码</Col>
							<Col :span="5">销售品组名称</Col>
							<Col :span="3">最大数量</Col>
							<Col :span="3">最小数量</Col>
							<Col :span="3">生效时间</Col>
							<Col :span="3">失效时间</Col>
							<Col :span="3">操作</Col>
						</Row>
						<Row :class="['app__table-item']" v-for="(item,index) in delmkt(offerGrpPageSelected)" :key="index">
							<Col :span="4">{{item.aNbr}}</Col>
							<Col :span="5">{{item.aName}}</Col>
							<Col :span="3" :class="{validate:valiateInput(item.maxNum)}">
							<Input v-model="item.maxNum" number></Input>
							</Col>
							<Col :span="3" :class="{validate:valiateInput(item.minNum)}">
							<Input v-model="item.minNum" number></Input>
							</Col>
							<Col :span="3" :class="{validate:!item.effDate}">
							<DatePicker v-model="item.effDate"></DatePicker>
							</Col>
							<Col :span="3" :class="{validate:!item.expDate}">
							<DatePicker v-model="item.expDate"></DatePicker>
							</Col>
							<Col :span="3">
							<span class="iconfont icon-shanchu" @click="deleteOffeGrpRelas(item)"></span>
							</Col>
						</Row>
					</div>
				</div>
			</Scroll>
		</Dialog>
		<Dialog :dialogSize="editOfferDialogSize" dialogTitle="批量修改本方销售品" ref="editOfferRelsMoreDialog" @confirm="editOfferRelsMoreSubmit">
			<Form labelWidth="100px" data-vv-scope="editOffer">
				<div class="edit-offer-dialog">
					<Row>
						<Col>
							<FormItem labelText="当前销售品名称：">
								{{componentData.offerName}}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="最大值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.maxNum')">
								<Input v-validate="'required'" name="maxNum" v-model="editOfferRelObj.maxNum" number data-vv-as="最大值"></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="最小值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.minNum')">
								<Input v-validate="'required'" name="minNum" v-model="editOfferRelObj.minNum" number data-vv-as="最小值"></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="默认值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.defaultNum')">
								<Input v-validate="'required'" name="defaultNum" v-model="editOfferRelObj.defaultNum" number data-vv-as="默认值"></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="适用构成最大值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.rstrOfferProdRelMaxNum')">
								<Input v-validate="'required'" name="rstrOfferProdRelMaxNum" v-model="editOfferRelObj.rstrOfferProdRelMaxNum" number data-vv-as="最大值"></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="适用构成最小值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.rstrOfferProdRelMinNum')">
								<Input v-validate="'required'" name="rstrOfferProdRelMinNum" v-model="editOfferRelObj.rstrOfferProdRelMinNum" number data-vv-as="最小值"></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="适用构成默认值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.rstrOfferProdRelDefNum')">
								<Input v-validate="'required'" name="rstrOfferProdRelDefNum" v-model="editOfferRelObj.rstrOfferProdRelDefNum" number data-vv-as="默认值"></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="生效时间：" :requiredIcon="true" :errorMessage="errors.first('editOffer.effDate')">
								<DatePicker v-validate="'required'" name="effDate" v-model="editOfferRelObj.effDate" data-vv-as="生效时间"></DatePicker>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="失效时间：" :requiredIcon="true" :errorMessage="errors.first('editOffer.expDate')">
								<DatePicker v-validate="'required'" name="expDate" v-model="editOfferRelObj.expDate" data-vv-as="失效时间"></DatePicker>
							</FormItem>
						</Col>
					</Row>
					<Col>
						<FormItem labelText="是否同客户：">
							<Select name="isCustRstr" :data="customer" v-model="editOfferRelObj.isCustRstr" data-vv-as="是否同客户"></Select>
						</FormItem>
					</Col>
					<Col>
						<FormItem labelText="是否同账户：">
							<Select  name="isAccountRstr" :data="account" v-model="editOfferRelObj.isAccountRstr" data-vv-as="是否同账户" ></Select>
						</FormItem>
					</Col>
					<Col>
						<FormItem labelText="是否同地址：">
							<Select name="isAddressRstr" :data="address" v-model="editOfferRelObj.isAddressRstr" data-vv-as="是否同地址"></Select>
						</FormItem>
					</Col>
				</div>
			</Form>
		</Dialog>
		<Dialog :dialogSize="editOfferDialogSize" dialogTitle="批量修改本方销售品组" ref="editOffeGrpRelasMoreDialog" @confirm="editOffeGrpRelasMoreSubmit">
			<Form labelWidth="100px" data-vv-scope="editOffer">
				<div class="edit-offer-dialog">
					<Row>
						<Col>
							<FormItem labelText="当前销售品名称：">
								{{componentData.offerName}}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="最大值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.maxNum')">
								<Input v-validate="'required'" name="maxNum" v-model="editOffeGrpRelasObj.maxNum" number data-vv-as="最大值"></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="最小值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.minNum')">
								<Input v-validate="'required'" name="minNum" v-model="editOffeGrpRelasObj.minNum" number data-vv-as="最小值"></Input>
							</FormItem>
						</Col>
					</Row>
					<!--<Row>
						<Col>
							<FormItem labelText="默认值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.defaultNum')">
								<Input v-validate="'required'" name="defaultNum" v-model="editOffeGrpRelasObj.defaultNum" number data-vv-as="默认值"></Input>
							</FormItem>
						</Col>
					</Row>-->
					<!--<Row>
						<Col>
							<FormItem labelText="适用构成最大值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.rstrOfferProdRelMaxNum')">
								<Input v-validate="'required'" name="rstrOfferProdRelMaxNum" v-model="editOfferRelObj.rstrOfferProdRelMaxNum" number data-vv-as="最大值"></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="适用构成最小值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.rstrOfferProdRelMinNum')">
								<Input v-validate="'required'" name="rstrOfferProdRelMinNum" v-model="editOfferRelObj.rstrOfferProdRelMinNum" number data-vv-as="最小值"></Input>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="适用构成默认值：" :requiredIcon="true" :errorMessage="errors.first('editOffer.rstrOfferProdRelDefNum')">
								<Input v-validate="'required'" name="rstrOfferProdRelDefNum" v-model="editOfferRelObj.rstrOfferProdRelDefNum" number data-vv-as="默认值"></Input>
							</FormItem>
						</Col>
					</Row>-->
					<Row>
						<Col>
							<FormItem labelText="生效时间：" :requiredIcon="true" :errorMessage="errors.first('editOffer.effDate')">
								<DatePicker v-validate="'required'" name="effDate" v-model="editOffeGrpRelasObj.effDate" data-vv-as="生效时间"></DatePicker>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="失效时间：" :requiredIcon="true" :errorMessage="errors.first('editOffer.expDate')">
								<DatePicker v-validate="'required'" name="expDate" v-model="editOffeGrpRelasObj.expDate" data-vv-as="失效时间"></DatePicker>
							</FormItem>
						</Col>
					</Row>
					<!--<Col>
						<FormItem labelText="是否同客户：" :requiredIcon="true" :errorMessage="errors.first('editOffer.isCustRstr')">
							<Select v-validate="'required'" name="isCustRstr" :data="customer" v-model="editOfferRelObj.isCustRstr" data-vv-as="是否同客户"></Select>
						</FormItem>
					</Col>
					<Col>
						<FormItem labelText="是否同账户：" :requiredIcon="true" :errorMessage="errors.first('editOffer.isAccountRstr')">
							<Select v-validate="'required'" name="isAccountRstr" :data="account" v-model="editOfferRelObj.isAccountRstr" data-vv-as="是否同账户" ></Select>
						</FormItem>
					</Col>
					<Col>
						<FormItem labelText="是否同地址：" :requiredIcon="true" :errorMessage="errors.first('editOffer.isAddressRstr')">
							<Select v-validate="'required'" name="isAddressRstr" :data="address" v-model="editOfferRelObj.isAddressRstr" data-vv-as="是否同地址"></Select>
						</FormItem>
					</Col>-->
				</div>
			</Form>
		</Dialog>
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
		<Tip ref="tipMore" :tipObj="tipInfo" @confirm="tipConfirmMore()"></Tip>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				dialogSize: {
					size: 100,
					min: 800,
					max: 1200
				},
				editOfferDialogSize:{
					size: 40,
					min: 500,
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
				pageInfo: {
					pageIndex: 1, // 当前页
					pageSize: 5, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0, // 总条数
					ZpageIndex: 1, // 当前页
					ZpageSize: 5, // 每页条数
					ZpageCount: 0, // 总页数
					ZrowCount: 0 // 总条数
				},
				offerId: '',
				relationOfferRels: [],
				relationOffeGrpRelas: [],
				offerPageSelected: [],
				relationOfferRelsTemp: [],
				offerPage: [],
				offerGrpPage: [],
				offerGrpPageSelected: [],
				offeGrpRelasTemp: [],
				tipSelData: {},
				// 是否同客户/账户/地址
				customer: [{
					label: '是',
					value: '1'
				},{
					label: '否',
					value: '0'
				}],
				account: [{
					label: '是',
					value: '1'
				},{
					label: '否',
					value: '0'
				}],
				address: [{
					label: '是',
					value: '1'
				},{
					label: '否',
					value: '0'
				}],
				checkArr: [],
				editOfferRelObj: {},
				editOffeGrpRelasObj: {},
				offerGrpParams: [{
					name: '本方销售品编码',
					param: 'aOfferNbr',
					width: 180
				},{
					name: '本方销售品内部名称',
					param: 'aOfferSysName',
					width: 300
				},{
					name: '最大数量',
					param: 'maxNum',
					width: 100
				},{
					name: '最小数量',
					param: 'minNum',
					width: 100
				},{
					name: '默认数量',
					param: 'defaultNum',
					width: 100
				},{
					name: '适用构成最大值',
					param: 'rstrOfferProdRelMaxNum',
					width: 100
				},{
					name: '适用构成最小值',
					param: 'rstrOfferProdRelMinNum',
					width: 100
				},{
					name: '适用构成默认值',
					param: 'rstrOfferProdRelDefNum',
					width: 100
				},{
					name: '生效时间',
					param: 'effDate',
					width: 100
				},{
					name: '失效时间',
					param: 'expDate',
					width: 100
				},{
					name: '是否同客户',
					param: 'isCustRstr',
					width: 100
				},{
					name: '是否同账户',
					param: 'isAccountRstr',
					width: 100
				},{
					name: '是否同地址',
					param: 'isAddressRstr',
					width: 100
				}],
				tableTitleCheckboxObj: {
					name: '',
					param: '',
					width: 100
				},
				xspIsShow:false,
				offeGrpRelasParams: [{
					name: '本方销售品组编码',
					param: 'aNbr',
					width: 180
				},{
					name: '本方销售品组名称',
					param: 'aName',
					width: 300
				},{
					name: '最大数量',
					param: 'maxNum',
					width: 100
				},{
					name: '最小数量',
					param: 'minNum',
					width: 100
				},{
					name: '默认数量',
					param: 'defaultNum',
					width: 100
				},{
					name: '生效时间',
					param: 'effDate',
					width: 100
				},{
					name: '失效时间',
					param: 'expDate',
					width: 100
				}]
			}
		},
		mounted() {
			this.offerId = this.componentData.offerId;
			this.getData();
		},
		methods: {
			getData() {
				this.$axios.get(this.$api.replace(this.$api.RelationOfferRel, ['{offerId}'], [this.offerId]), {
					params: {
						//						limit: '10',
						//						page: '1'
					}
				}).then(res => {
					if(res.data.success == true) {
						this.relationOfferRels = res.data.relationOfferRels;
						this.relationOffeGrpRelas = res.data.relationOffeGrpRelas;
					} else {
						this.$message.error({ message: '本方销售品查询失败！' });
					}
				}).catch(error => {

				})
			},
			addRelationOfferRels(offerSysName) {
				this.offerPageSelected = [];
				for(let ele of this.relationOfferRels) {
					let temp = {
						aOfferName: ele.aOfferName,
						aOfferSysName: ele.aOfferSysName,
						aOfferNbr: ele.aOfferNbr,
						aOfferId: ele.aOfferId,
						maxNum: ele.maxNum,
						minNum: ele.minNum,
						defaultNum: ele.defaultNum,
						offerRelRstrCfgId: ele.offerRelRstrCfgId,
						rstrOfferProdRelMaxNum: ele.rstrOfferProdRelMaxNum,
						rstrOfferProdRelMinNum: ele.rstrOfferProdRelMinNum,
						rstrOfferProdRelDefNum: ele.rstrOfferProdRelDefNum,
						effDate: ele.effDate,
						expDate: ele.expDate,
						offerRelId: ele.offerRelId,
						statusCd: ele.statusCd,
						isCustRstr: ele.isCustRstr,
						isAccountRstr: ele.isAccountRstr,
						isAddressRstr: ele.isAddressRstr
					}
					this.offerPageSelected.push(temp);
				}
				this.$refs.addRelationOfferRels.show();
				this.$axios.get(this.$api.OrdOffer, {
					params: {
						limit: this.pageInfo.pageSize,
						page: this.pageInfo.pageIndex,
						offerSysName: offerSysName
					}
				}).then(res => {
					if(res.data.success == true) {
						this.offerPage = res.data.offerPage.content;
						this.pageInfo.rowCount = res.data.offerPage.total;
					} else {

					}
				}).catch(error => {

				})
			},
			search(val) {
				this.addRelationOfferRels(val);
			},
			pageChange(page) {
				this.pageInfo.pageIndex = page;
				this.addRelationOfferRels();
			},
			addClick(item) {
				let offerPageTemp = {
					aOfferName: item.offerName,
					aOfferSysName: item.offerSysName,
					aOfferNbr: item.offerNbr,
					aOfferId: item.offerId,
					maxNum: '1',
					minNum: '0',
					defaultNum: '0',
					offerRelRstrCfgId: '',
					rstrOfferProdRelMaxNum: '1',
					rstrOfferProdRelMinNum: '0',
					rstrOfferProdRelDefNum: '0',
					effDate: new Date().getTime(),
					expDate: '2050-12-31',
					offerRelId: item.offerRelId,
					statusCd: '1000',
					isCustRstr: '',
					isAccountRstr: '',
					isAddressRstr: ''
				}
				this.offerPageSelected.push(offerPageTemp);
			},
			deleteOfferPage(item) {
				for(var i=0;i<this.offerPageSelected.length;i++){
					if(this.offerPageSelected[i].aOfferId == item.offerId){
						this.offerPageSelected.splice(i,1);
					}
				}
			},
			deleteClick(item) {
				item.statusCd = '1100';
			},
			addRelationConfirm() {
				this.relationOfferRelsTemp = [];
				for(var i = 0; i < this.offerPageSelected.length; i++) {
						if(!this.offerPageSelected[i].offerRelId && this.offerPageSelected[i].statusCd == '1100') {
							this.offerPageSelected.splice(i, 1);
						}
					}
				for(let ele of this.offerPageSelected){
					if(this.valiateInput(ele.maxNum) || this.valiateInput(ele.minNum) || this.valiateInput(ele.defaultNum) || this.valiateInput(ele.rstrOfferProdRelMaxNum) || this.valiateInput(ele.rstrOfferProdRelMinNum) || this.valiateInput(ele.rstrOfferProdRelDefNum) || !ele.effDate || !ele.expDate){
						this.$message.warning({message: '请输入红框值！'});
						return;
					}else{
						if(Number(ele.minNum)>Number(ele.maxNum)){
							this.$message.warning({message: '最小值必须小于最大值！'});
							return;
						}else{
							if(Number(ele.rstrOfferProdRelMinNum)>Number(ele.rstrOfferProdRelMaxNum)){
								this.$message.warning({message: '适用构成最小值必须小于适用构成最大值！'});
								return;
							}else{
								if(new Date(ele.effDate).getTime()>new Date(ele.expDate).getTime()){
									this.$message.warning({message: '生效时间必须小于失效时间！'});
									return;
								}
							}
						}
					}
				}
					for(let ele of this.offerPageSelected) {
					let Temp = {
						offerRelId: ele.offerRelId,
						aOfferId: ele.aOfferId,
						aOfferName: ele.aOfferName,
						aOfferSysName: ele.aOfferSysName,
						aOfferNbr: ele.aOfferNbr,
						zOfferId: this.offerId,
						relType: '150000',
						maxNum: ele.maxNum,
						minNum: ele.minNum,
						defaultNum: ele.defaultNum,
						offerRelRstrCfgId: ele.offerRelRstrCfgId,
						rstrOfferProdRelMaxNum: ele.rstrOfferProdRelMaxNum,
						rstrOfferProdRelMinNum: ele.rstrOfferProdRelMinNum,
						rstrOfferProdRelDefNum: ele.rstrOfferProdRelDefNum,
						effDate: ele.effDate ? new Date(ele.effDate) : '',
						expDate: ele.expDate ? new Date(ele.expDate) : '',
						isCustRstr: ele.isCustRstr,
						isAccountRstr: ele.isAccountRstr,
						isAddressRstr: ele.isAddressRstr,
						createStaff: '11',
						updateStaff: '11',
						statusCd: ele.statusCd,
						createDate: "2018-10-23T16:00:00Z",
						updateDate: "2018-10-23T16:00:00Z"
					}
					this.relationOfferRelsTemp.push(Temp);
				}



				for(var i=0;i<this.relationOfferRelsTemp.length;i++) {
					if(!this.relationOfferRelsTemp[i].offerRelId && this.relationOfferRelsTemp[i].statusCd == '1100'){
						this.relationOfferRelsTemp.splice(i,1);
					}
				}
				this.$axios.post(this.$api.replace(this.$api.RelationOfferRel, ['{offerId}'], [this.offerId]), {
					"relationOfferRels": this.relationOfferRelsTemp,
					"relationOffeGrpRelas": []
				}).then(res => {
					if(res.data.success == true) {
						this.getData();
						this.$message.success({ message: '成功！' });
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {

				})
				this.$refs.addRelationOfferRels.hide();
			},
			save(callback) {
				this.$axios.post(this.$api.replace(this.$api.RelationOfferRel, ['{offerId}'], [this.offerId]), {
					"relationOfferRels": this.relationOfferRels,
					"relationOffeGrpRelas": this.relationOffeGrpRelas
				}).then(res => {
					if(res.data.success == true) {
						this.getData();
						this.$message.success({ message: '成功！' });
						callback(true)
					} else {
						this.$message.error({ message: '失败！' });
						callback(false)
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
					callback(false)
				})
			},
			deleteRelationOfferRels(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			tipConfirm() {
				if(this.tipSelData.offerRelId) {
					this.$axios.post(this.$api.replace(this.$api.RelationOfferRel, ['{offerId}'], [this.offerId]), {
						"relationOfferRels": [{
							offerRelId: this.tipSelData.offerRelId,
							aOfferId: this.tipSelData.aOfferId,
							aOfferName: this.tipSelData.aOfferName,
							aOfferSysName: this.tipSelData.aOfferSysName,
							aOfferNbr: this.tipSelData.aOfferNbr,
							zOfferId: this.offerId,
							relType: '150000',
							maxNum: this.tipSelData.maxNum,
							minNum: this.tipSelData.minNum,
							defaultNum: this.tipSelData.defaultNum,
							rstrOfferProdRelMaxNum: this.tipSelData.rstrOfferProdRelMaxNum,
							rstrOfferProdRelMinNum: this.tipSelData.rstrOfferProdRelMinNum,
							rstrOfferProdRelDefNum: this.tipSelData.rstrOfferProdRelDefNum,
							effDate: this.tipSelData.effDate ? new Date(this.tipSelData.effDate) : '',
							expDate: this.tipSelData.expDate ? new Date(this.tipSelData.expDate) : '',
							isCustRstr: this.tipSelData.isCustRstr,
							isAccountRstr: this.tipSelData.isAccountRstr,
							isAddressRstr: this.tipSelData.isAddressRstr,
							createStaff: '11',
							updateStaff: '11',
							statusCd: '1100',
							createDate: "2018-10-23T16:00:00Z",
							updateDate: "2018-10-23T16:00:00Z"
						}],
						"relationOffeGrpRelas": []
					}).then(res => {
						if(res.data.success == true) {
							this.getData();
							this.$message.success({ message: '成功！' });
							this.$refs.tip.hide();
						} else {
							this.$message.error({ message: '失败！' });
						}
					}).catch(error => {
	
					})
				}else{
					this.$axios.post(this.$api.replace(this.$api.RelationOfferRel, ['{offerId}'], [this.offerId]), {
						"relationOfferRels": [],
						"relationOffeGrpRelas": [{
							offerGrpRelId: this.tipSelData.offerGrpRelId,
							aId: this.tipSelData.aId,
							aName: this.tipSelData.aName,
							aNbr: this.tipSelData.aNbr,
							aType: '2000',
							zId: this.offerId,
							relType: '150000',
							maxNum: this.tipSelData.maxNum,
							minNum: this.tipSelData.minNum,
							effDate: this.tipSelData.effDate ? new Date(this.tipSelData.effDate) : '',
							expDate: this.tipSelData.expDate ? new Date(this.tipSelData.expDate) : '',
							createStaff: '11',
							updateStaff: '11',
							statusCd: '1100',
							createDate: "2018-10-23T16:00:00Z",
							updateDate: "2018-10-23T16:00:00Z"
						}]
					}).then(res => {
						if(res.data.success == true) {
							this.getData();
							this.$message.success({ message: '成功！' });
							this.$refs.tip.hide();
						} else {
							this.$message.error({ message: '失败！' });
						}
					}).catch(error => {
	
					})
				}
			},
			addRelationOffeGrpRelas(offerGrpName) {
				this.offerGrpPageSelected = [];
				for(let ele of this.relationOffeGrpRelas) {
					let temp = {
						offerGrpRelId: ele.offerGrpRelId,
						aId: ele.aId,
						aName: ele.aName,
						aNbr: ele.aNbr,
						aType: '1000',
						zId: this.offerId,
						relType: '150000',
						maxNum: ele.maxNum,
						minNum: ele.minNum,
						effDate: ele.effDate,
						expDate: ele.expDate,
						createStaff: '11',
						updateStaff: '11',
						statusCd: ele.statusCd,
						createDate: "2018-10-23T16:00:00Z",
						updateDate: "2018-10-23T16:00:00Z"
					}
					this.offerGrpPageSelected.push(temp);
				}
				this.$refs.addRelationOffeGrpRelas.show();
				this.$axios.get(this.$api.OfferGrp, {
					params: {
						limit: this.pageInfo.ZpageSize,
						page: this.pageInfo.ZpageIndex,
						offerGrpName: offerGrpName
					}
				}).then(res => {
					if(res.data.success == true) {
						this.offerGrpPage = res.data.offerGrpPage.content;
						this.pageInfo.ZrowCount = res.data.offerGrpPage.total;
					} else {
						this.$message.error({ message: '失败！' });
					}
				}).catch(error => {

				})
			},
			relationOffeGrpRelasConfirm() {
				this.offeGrpRelasTemp = [];
				for(var i = 0; i < this.offerGrpPageSelected.length; i++) {
						if(!this.offerGrpPageSelected[i].offerGrpRelId && this.offerGrpPageSelected[i].statusCd == '1100') {
							this.offerGrpPageSelected.splice(i, 1);
						}
					}
				for(let ele of this.offerGrpPageSelected){
					if(this.valiateInput(ele.maxNum) || this.valiateInput(ele.minNum) || !ele.effDate || !ele.expDate){
						this.$message.warning({message: '请输入红框值！'});
						this.isOk = false;
					}else{
						if(ele.minNum>ele.maxNum){
							this.$message.warning({message: '最小值必须小于最大值！'});
							this.isOk = false;
						}else{
							this.isOk = true;
						}
					}
				}
				if(this.isOk){
					for(let ele of this.offerGrpPageSelected) {
					let Temp = {
						offerGrpRelId: ele.offerGrpRelId,
						aId: ele.aId,
						aName: ele.aName,
						aNbr: ele.aNbr,
						aType: '2000',
						zId: this.offerId,
						relType: '150000',
						maxNum: ele.maxNum,
						minNum: ele.minNum,
						effDate: ele.effDate ? new Date(ele.effDate) : '',
						expDate: ele.expDate ? new Date(ele.expDate) : '',
						createStaff: '11',
						updateStaff: '11',
						statusCd: ele.statusCd,
						createDate: "2018-10-23T16:00:00Z",
						updateDate: "2018-10-23T16:00:00Z"
					}
					this.offeGrpRelasTemp.push(Temp);
				}
				for(var i =0;i<this.offeGrpRelasTemp.length;i++){
					if(!this.offeGrpRelasTemp[i].offerGrpRelId && this.offeGrpRelasTemp[i].statusCd == '1100'){
						this.offeGrpRelasTemp.splice(i,1);
					}
				}
				this.$axios.post(this.$api.replace(this.$api.RelationOfferRel, ['{offerId}'], [this.offerId]), {
						"relationOfferRels": [],
						"relationOffeGrpRelas": this.offeGrpRelasTemp
					}).then(res => {
						if(res.data.success == true) {
							this.getData();
							this.$message.success({ message: '成功！' });
						} else {
							this.$message.error({ message: '失败！' });
						}
					}).catch(error => {
	
					})
					this.$refs.addRelationOffeGrpRelas.hide();
				}else{
					return
				}
			},
			addGrpPageClick(item) {
				let offerGrpPageTemp = {
					aName: item.offerGrpName,
					aNbr: item.offerGrpNbr,
					aId: item.offerGrpId,
					zType: item.grpType,
					maxNum: '1',
					minNum: '0',
					effDate: new Date().getTime(),
					expDate: '2050-12-31',
					offerGrpRelId: item.offerGrpRelId,
					statusCd: '1000'
				}
				this.offerGrpPageSelected.push(offerGrpPageTemp);
			},
			deleteGrpPageClick(item) {
				for(var i=0;i<this.offerGrpPageSelected.length;i++){
					if(this.offerGrpPageSelected[i].aId == item.offerGrpId){
						this.offerGrpPageSelected.splice(i,1);
					}
				}
			},
			deleteOffeGrpRelas(item) {
				item.statusCd = '1100';
			},
			searchOffeGrpRelas(val) {
				this.addRelationOffeGrpRelas(val);
			},
			ZpageChange(page) {
				this.pageInfo.ZpageIndex = page;
				this.addRelationOffeGrpRelas();
			},
			deleteRelationOffeGrpRelas(item) {
				this.tipType = 'DEL';
				this.tipSelData = item;
				this.tipInfo.iconType = 3;
				this.tipInfo.msg = `是否确认删除？`;
				this.tipInfo.showBtn.clear = true;
				this.tipInfo.showBtn.save = true;
				this.$refs.tip.show();
			},
			selectMkt(val) {
				return this.offerPageSelected.filter(item => item.statusCd != '1100').find(item => item.aOfferId == val.offerId)
			},
			selectGroupMkt(val) {
				return this.offerGrpPageSelected.filter(item => item.statusCd != '1100').find(item => item.aId == val.offerGrpId)
			},
			delmkt(arr) {
				return [...arr].filter(item => item.statusCd != '1100');
			},
			yxScrollMounted(vm){
				let yxScrollRect = vm.$el.getBoundingClientRect(),
					nameW = yxScrollRect.width - 730;
//				this.yxOfferRelsParams.cNameWidth = nameW / 2;
//				this.yxOfferRelsParams.nameWidth = nameW / 2;
			},
			batchEdit() {
				if(this.checkArr.length>0){
					this.$refs.editOfferRelsMoreDialog.show();
					this.editOfferRelObj = {};
				}else{
					this.$message.error({ message: '请先选择本方销售品！' });
					return;
				}
			},
			editOfferRelsMoreSubmit() {
				this.$validator.validateAll('editOffer').then((result) => {
					if(result) {
						let tempEditOfferRelObj = JSON.parse(JSON.stringify(this.editOfferRelObj));

						if(Number(tempEditOfferRelObj.minNum)>Number(tempEditOfferRelObj.maxNum)){
							this.$message.warning({message: '最小值必须小于最大值！'});
							return;
						}
						if(Number(tempEditOfferRelObj.rstrOfferProdRelMinNum)>Number(tempEditOfferRelObj.rstrOfferProdRelMaxNum)){
							this.$message.warning({message: '适用构成最小值必须小于适用构成最大值！'});
							return;
						}

						if(new Date(tempEditOfferRelObj.effDate).getTime()>new Date(tempEditOfferRelObj.expDate).getTime()){
							this.$message.warning({message: '生效时间必须小于失效时间！'});
							return;
						}

						tempEditOfferRelObj.statusCd = '1000';
						tempEditOfferRelObj.effDate = new Date(tempEditOfferRelObj.effDate);
						tempEditOfferRelObj.expDate = new Date(tempEditOfferRelObj.expDate);

						tempEditOfferRelObj.aOfferId = '';
						tempEditOfferRelObj.aOfferName = '';
						tempEditOfferRelObj.aOfferNbr = '';

						tempEditOfferRelObj.zOfferId = this.componentData.offerId;
						let tempEditOfferRelArr = [];
						for(let ele of this.checkArr){
							let temp = {
								aOfferId: '',
								aOfferName: '',
								aOfferSysName: '',
								aOfferNbr: '',
								defaultNum: tempEditOfferRelObj.defaultNum,
								effDate: tempEditOfferRelObj.effDate,
								expDate: tempEditOfferRelObj.expDate,
								isAccountRstr: tempEditOfferRelObj.isAccountRstr,
								isAddressRstr: tempEditOfferRelObj.isAddressRstr,
								isCustRstr: tempEditOfferRelObj.isCustRstr,
								maxNum: tempEditOfferRelObj.maxNum,
								minNum: tempEditOfferRelObj.minNum,
								relType: '150000',
								rstrOfferProdRelDefNum: tempEditOfferRelObj.rstrOfferProdRelDefNum,
								rstrOfferProdRelMaxNum: tempEditOfferRelObj.rstrOfferProdRelMaxNum,
								rstrOfferProdRelMinNum: tempEditOfferRelObj.rstrOfferProdRelMinNum,
								statusCd: tempEditOfferRelObj.statusCd,
								zOfferId: tempEditOfferRelObj.zOfferId,
								offerRelId: ele.offerRelId,
								offerRelRstrCfgId: ele.offerRelRstrCfgId,
								createDate: "2018-10-23T16:00:00Z",
								updateDate: "2018-10-23T16:00:00Z",
								createStaff: '11',
								updateStaff: '11'
							}
							tempEditOfferRelArr.push(temp);
						}
						this.$axios.post(this.$api.replace(this.$api.RelationOfferRel, ['{offerId}'], [this.offerId]), {
							"relationOfferRels": tempEditOfferRelArr,
							"relationOffeGrpRelas": []
						}).then(res => {
							if(res.data.success == true) {
								this.checkArr = [];
								this.$message.success({message: '批量修改保存成功！'});
								this.$refs.editOfferRelsMoreDialog.hide();
								this.getData();
							} else {
								this.$message.error({message: res.data.msg});
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg });
						})
					}
				})
			},
			batchOffeGrpRelasEdit() {
				if(this.checkArr.length>0){
					this.$refs.editOffeGrpRelasMoreDialog.show();
					this.editOffeGrpRelasObj = {};
				}else{
					this.$message.error({ message: '请先选择本方销售品！' });
					return;
				}
			},
			editOffeGrpRelasMoreSubmit() {
				this.$validator.validateAll('editOffer').then((result) => {
					if(result) {
						let tempEditOfferRelObj = JSON.parse(JSON.stringify(this.editOffeGrpRelasObj));

						if(Number(tempEditOfferRelObj.minNum)>Number(tempEditOfferRelObj.maxNum)){
							this.$message.warning({message: '最小值必须小于最大值！'});
							return;
						}
						if(Number(tempEditOfferRelObj.rstrOfferProdRelMinNum)>Number(tempEditOfferRelObj.rstrOfferProdRelMaxNum)){
							this.$message.warning({message: '适用构成最小值必须小于适用构成最大值！'});
							return;
						}

						if(new Date(tempEditOfferRelObj.effDate).getTime()>new Date(tempEditOfferRelObj.expDate).getTime()){
							this.$message.warning({message: '生效时间必须小于失效时间！'});
							return;
						}

						tempEditOfferRelObj.statusCd = '1000';
						tempEditOfferRelObj.effDate = new Date(tempEditOfferRelObj.effDate);
						tempEditOfferRelObj.expDate = new Date(tempEditOfferRelObj.expDate);

						tempEditOfferRelObj.zId = this.componentData.offerId;
						let tempEditOfferRelArr = [];
						for(let ele of this.checkArr){
							let temp = {
								offerGrpRelId: ele.offerGrpRelId,
								aId: '',
								aName: '',
								aNbr: '',
								aType: '',
								zId: tempEditOfferRelObj.zId,
								relType: '150000',
								maxNum: tempEditOfferRelObj.maxNum,
								minNum: tempEditOfferRelObj.minNum,
								effDate: tempEditOfferRelObj.effDate ? new Date(tempEditOfferRelObj.effDate) : '',
								expDate: tempEditOfferRelObj.expDate ? new Date(tempEditOfferRelObj.expDate) : '',
								createStaff: '11',
								updateStaff: '11',
								statusCd: ele.statusCd,
								createDate: "2018-10-23T16:00:00Z",
								updateDate: "2018-10-23T16:00:00Z"
							}
							tempEditOfferRelArr.push(temp);
						}
						this.$axios.post(this.$api.replace(this.$api.RelationOfferRel, ['{offerId}'], [this.offerId]), {
							"relationOfferRels": [],
							"relationOffeGrpRelas": tempEditOfferRelArr
						}).then(res => {
							if(res.data.success == true) {
								this.checkArr = [];
								this.$message.success({message: '批量修改保存成功！'});
								this.$refs.editOffeGrpRelasMoreDialog.hide();
								this.getData();
							} else {
								this.$message.error({message: res.data.msg});
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg });
						})
					}
				})
			},
			batchDelete() {
				if(this.checkArr.length>0){
					this.tipType = 'DEL';
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认批量删除？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tipMore.show();
				}else{
					this.$message.error({ message: '请先选择本方销售品！' });
				}
			},
			tipConfirmMore() {
				for(let ele of this.checkArr){
					ele.statusCd = '1100';
				}
				if(this.checkArr[0].offerRelId) {
					this.$axios.post(this.$api.replace(this.$api.RelationOfferRel, ['{offerId}'], [this.offerId]), {
						"relationOfferRels": this.checkArr,
						"relationOffeGrpRelas": []
					}).then(res => {
						if(res.data.success == true) {
							this.getData();
							this.$message.success({ message: '成功！' });
							this.$refs.tipMore.hide();
						} else {
							this.$message.error({ message: '失败！' });
						}
					}).catch(error => {
	
					})
				}else{
					this.$axios.post(this.$api.replace(this.$api.RelationOfferRel, ['{offerId}'], [this.offerId]), {
						"relationOfferRels": [],
						"relationOffeGrpRelas": this.checkArr
					}).then(res => {
						if(res.data.success == true) {
							this.getData();
							this.$message.success({ message: '成功！' });
							this.$refs.tipMore.hide();
						} else {
							this.$message.error({ message: '失败！' });
						}
					}).catch(error => {
	
					})
				}
			},
			valiateInput(val){
				return !val && val !== 0;
			},
			dragchange(val){
				this.offerGrpParams = val;
			},
			pullEnd(){
				this.$refs.offerRelsScroll.initScroll();
			},
			pullMove(w,item){
				item.width = w;
			},
			adjustTabelItemText(item,param){
				let val = item[param];
				if(param == 'relType'){
					val = this.getRelType(val);
				}
				return val;
			},
			xspShowClick(){ //销售品列表点击隐藏或展开
				this.xspIsShow = !this.xspIsShow;
			},
		}
	}
</script>

<style scoped lang="scss">
	.income {
		width: 100%;
		
		.h-a-add {
			margin: 10px 0;
		}
		.s-title {
			margin-top: 20px;
		}
		.app__top{
			cursor: pointer;
		
			.icon-xiala12{
				position: absolute;
				top: 8px;
				right: 10px;
				font-size: 16px;
				color: $mainColor;
				transition: all .3s ease;
		
				&.active{
					transform: rotate(-180deg);
				}
			}
		}
	}
	
	.main {
		padding: 20px;
		.search {
			width: 300px;
			margin-bottom: 20px;
		}
		.y-span {
			display: block;
			margin: 10px 0;
			color: #b6de8f;
		}
		.validate /deep/ input{
			border-color: red;
		}
		.icon-xuanzhong-fang{
			color: $mainColor;
		}
		span{
			cursor: pointer;
		}

		.app__table__inner {
			.no-wrap {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.edit-offer-dialog{
	        padding: 20px;
	    }
	}
</style>