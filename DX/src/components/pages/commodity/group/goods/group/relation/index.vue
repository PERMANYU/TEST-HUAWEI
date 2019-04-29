<template>
	<div class="relation">
		<div class="app__top" @click="elShowClick()">
			<span class="app__top-left">关联关系</span>
			<i :class="['iconfont','icon-xiala12',elIsShow ? 'active' : '']" @click.stop="elShowClick()"></i>
		</div>
		<div class="h-a-add" v-show="elIsShow">
			<Row>
				<Col :span="18">
					<div class="app__btn app__btn-add" @click="addOfferRels">添加</div>
					<div class="app__btn app__btn-add" @click="offerRelDownload">下载模板</div>
					<div class="app__btn app__btn-add" @click="offerRelImport">导入</div>
				</Col>
				<Col :span="6">
					<div class="app__btn app__btn-add" @click="batchEdit()">批量修改</div>
					<div class="app__btn app__btn-add" @click="batchDelete()">批量删除</div>
					<div class="app__btn app__btn-add" @click="offerRelExport()">导出</div>
				</Col>
			</Row>
			
			<input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" class="offer-rel-file" ref="fileRef" @change="offerRelImportChange" />
		</div>
		<SearchBox v-show="elIsShow && offerRelsSearchBox.length > 0" v-model="offerRelsSearchBox"></SearchBox>
		<Scroll class="app__table__inner offer-rels-table" v-if="elIsShow" :isShowBottom="true"  fixedTopClassName="app__table-thead" ref="offerRelsScroll">
			<DragGroup class="app__table-thead" inline :titleList="offerRelsParams" @dragchange="dragchange">
				<Col :class="['m-item']" :width="tableTitleCheckboxObj.width">

				</Col>
				<DragItem  :width="item.width" :value="item" v-for="(item,index) in offerRelsParams" :key="'offer-param'+index">
					<PullLine @pullEnd="pullEnd" @pullMove="pullMove(arguments[0],item)"/>
					<span class="offer-title-name">{{item.name}}</span>

					<ColSel class="col-search"
						v-if="item.param == 'effDate' || item.param == 'expDate'"
						@order="orderFilter(arguments[0],item)"
						@confirm="confirmfilter(item)">
					</ColSel>
					<ColSel class="col-search"
						v-else-if="item.param == 'relType'"
						@order="orderFilter(arguments[0],item)"
						@confirm="confirmfilter(item)">
						<Select :data="relType" v-model="offerRelsSearchObj[item.param]" @change="confirmfilter(item)"></Select>
					</ColSel>
					<ColSel class="col-search"
						v-else
						@order="orderFilter(arguments[0],item)"
						@confirm="confirmfilter(item)">
						<Input v-model="offerRelsSearchObj[item.param]"
							v-if="item.param != 'maxNum' && item.param != 'minNum'"></Input>
					</ColSel>
					<ColSel class="col-search"
						v-else>
						<Input v-model="offerRelsSearchObj[item.param]"
							v-if="item.param != 'isCustRstr' && item.param != 'isAccountRstr' && item.param != 'isAddressRstr'"></Input>
					</ColSel>
					
				</DragItem>
				<Col :width="150">
					操作
				</Col>

			</DragGroup>

			<Row class="app__table-item" inline v-for="(offerRelitem,index) in offerRels" :key="'offerRel' + index">
				<Col :width="tableTitleCheckboxObj.width">
					<Checkbox name="Checkbox" v-model="checkArr" :label="offerRelitem.offerRelId" @change="modelChenge"></Checkbox>
				</Col>
				<Col :width="titleItem.width" v-for="(titleItem,titleIndex) in offerRelsParams" :key="'title' + titleIndex" class="no-wrap">
					<span v-if="titleItem.param == 'effDate' || titleItem.param == 'expDate'">{{adjustTabelItemText(offerRelitem,titleItem.param) | date}}</span>
					<span v-else>{{adjustTabelItemText(offerRelitem,titleItem.param)}}</span>
				</Col>

				<Col :width="150">

					<span class="iconfont icon-xiugai" @click="editDependency(offerRelitem)"></span>
					<span class="iconfont icon-shanchu" @click="deleteDependency(offerRelitem,index)"></span>
				</Col>
			</Row>

			<Row v-if="offerRels.length == 0" class="app__data-none">
				<Col :span="24">
				<span>当前无数据</span>
				</Col>
			</Row>
		</Scroll>

		<Pagination v-show="elIsShow && offerRels.length > 0" 
				:pageIndex="offerRelsPageInfo.pageIndex" 
				:pageSize="offerRelsPageInfo.pageSize" 
				:rowCount="offerRelsPageInfo.rowCount" 
				:perPages=5 
				:showPageSize="true" 
				@change="offerRelsPageChange"
				@pageSizeChange="offerRelsPageSizeChange"></Pagination>

		<Dialog :dialogSize="dialogSize" class="h-dialog" dialogTitle="选择添加关联关系" ref="addOfferRels" @confirm="addOfferRelsSubmit" @back="addOfferRelsBack">
			<Scroll class="main" :isShowRight="true">
				<div class="search">
					<Search ref="searchVal" placeholder="请输入销售品内部名称或内部编码" @search="offerSubmit"></Search>
				</div>
				<div class="app__table__inner">
					<Row class="app__table-thead">
						<Col :span="4">序号</Col>
						<Col :span="8">销售品内部名称</Col>
						<Col :span="8">内部编码</Col>
						<Col :span="4">操作</Col>
					</Row>
					<Row :class="['app__table-item']" v-for="(item,index) in offerPage" :key="index">
						<Col :span="4">{{index + 1}}</Col>
						<Col :span="8" class="no-wrap" :title="item.offerSysName">{{item.offerSysName}}</Col>
						<Col :span="8">{{item.innerNbr}}</Col>
						<Col :span="4">
						<span v-if="!selectMkt(item)" class="iconfont icon-weixuanzhong-fang" @click="addOfferPage(item)"></span>
						<span v-if="selectMkt(item)" class="iconfont icon-xuanzhong-fang" @click="deleteOfferPage(item)"></span>
						</Col>
					</Row>
					<Row v-if="offerPage.length == 0" class="app__data-none">
						<Col :span="24">
						<span>当前无数据</span>
						</Col>
					</Row>
				</div>
				<Pagination :pageIndex="pageInfo.pageIndex" :pageSize="pageInfo.pageSize" :rowCount="pageInfo.rowCount" :perPages=5 @change="pageChange" :isCenter="true">
				</Pagination>
				<span class="y-span" v-show="offerSelected.length>0" ref="yxScrollRef">已选</span>
				<Scroll :isShowBottom="true" v-if="offerSelected.length>0" ref="yxOfferRelsScroll" @mounted="yxScrollMounted">
					<div class="app__table__inner yx-scroll">
						<Row class="app__table-thead" inline>
							<Col :width="yxOfferRelsParams.cNameWidth">
								<PullLine @pullEnd="yxPullEnd" @pullMove="yxPullMove(arguments[0],'cNameWidth')"/>
								<span>当前销售品</span>
							</Col>
							<Col :width="120">关联关系</Col>
							<Col :width="80">关联方向</Col>
							<Col :width="yxOfferRelsParams.nameWidth">
								<PullLine @pullEnd="yxPullEnd" @pullMove="yxPullMove(arguments[0],'nameWidth')"/>
								<span>销售品内部名称</span>
							</Col>
							<Col :width="80">最大值</Col>
							<Col :width="80">最小值</Col>
							<Col :width="80">默认值</Col>
							<Col :width="100">适用构成最大值</Col>
							<Col :width="100">适用构成最小值</Col>
							<Col :width="100">适用构成默认值</Col>
							<Col :width="140">适用构成角色限制</Col>
							<Col :width="120">生效时间</Col>
							<Col :width="120">失效时间</Col>
							<Col :width="80">是否同客户</Col>
							<Col :width="80">是否同账户</Col>
							<Col :width="80">是否同地址</Col>
							<Col :width="40">操作</Col>
						</Row>
						<Row :class="['app__table-item']" inline v-for="(item,index) in delmkt(offerSelected)" :key="index">
							<Col class="no-wrap" :title="item.wOfferName" :width="yxOfferRelsParams.cNameWidth">{{item.wOfferName}}</Col>
							<Col :width="120">
							<Select :class="{validate:!item.relType}" :data="relType" v-model="item.relType"></Select>
							</Col>
							<Col :width="80">
								<Select v-if="item.relType != '200000'" :data="direction" v-model="item.direction" :isNullSel="false"></Select>
								<Select v-else :data="directionData" v-model="shuangxiang" :isNullSel="false"></Select>
							</Col>
							<Col class="no-wrap" :title="item.mOfferName" :width="yxOfferRelsParams.nameWidth">{{item.mOfferName}}</Col>
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
							<Col :width="140">
							<Select :data="customers" v-model="item.rstrOfferProdRoleCd" dataLabelStr="roleName" dataValueStr="roleId"  :isNullSel="false"></Select>
							</Col>
							<Col :width="120" class="date-picker" :class="{validate:!item.effDate}">
							<DatePicker v-model="item.effDate"></DatePicker>
							</Col>
							<Col :width="120" class="date-picker" :class="{validate:!item.expDate}">
							<DatePicker v-model="item.expDate"></DatePicker>
							</Col>
							<Col :width="80">
							<Select :data="customer" v-model="item.isCustRstr"  :isNullSel="false"></Select>
							</Col>
							<Col :width="80">
							<Select :data="account" v-model="item.isAccountRstr"  :isNullSel="false"></Select>
							</Col>
							<Col :width="80">
							<Select :data="address" v-model="item.isAddressRstr"  :isNullSel="false"></Select>
							</Col>
							<Col :width="40">
							<span class="iconfont icon-shanchu" @click="deleteClick(item)"></span>
							</Col>
						</Row>
					</div>
				</Scroll>
			</Scroll>
		</Dialog>

		<Dialog :dialogSize="editOfferDialogSize" dialogTitle="修改关联关系" ref="editOfferRelsDialog" @confirm="editOfferRelsSubmit">
			<Form labelWidth="100px" data-vv-scope="editOffer">
				<div class="edit-offer-dialog">
					<Row>
						<Col>
							<FormItem labelText="Z端销售品内部名称：">
								{{editOfferRelObj.zOfferSysName}}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="关联关系：" :requiredIcon="true" :errorMessage="errors.first('editOffer.relType')">
								<Select v-validate="'required'" name="relType" :data="relType" v-model="editOfferRelObj.relType" data-vv-as="关联关系"></Select>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="关联方向：">
								<Select v-if="editOfferRelObj.relType != '200000'" :data="direction" v-model="editOfferRelObj.direction" :isNullSel="false"></Select>
								<Select v-else :data="directionData" v-model="shuangxiang" :isNullSel="false"></Select>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="A端销售品内部名称：">
								{{editOfferRelObj.aOfferSysName}}
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
							<FormItem labelText="适用构成角色限制：" :requiredIcon="false" :errorMessage="errors.first('editOffer.rstrOfferProdRoleCd')">
								<Select  name="rstrOfferProdRoleCd" dataLabelStr="roleName" dataValueStr="roleId" :data="customers" v-model="editOfferRelObj.rstrOfferProdRoleCd" data-vv-as="适用构成角色限制"></Select>
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
							<Select name="isAccountRstr" :data="account" v-model="editOfferRelObj.isAccountRstr" data-vv-as="是否同账户" ></Select>
						</FormItem>
					</Col>
					<Col>
						<FormItem labelText="是否同地址：">
							<Select  name="isAddressRstr" :data="address" v-model="editOfferRelObj.isAddressRstr" data-vv-as="是否同地址"></Select>
						</FormItem>
					</Col>
				</div>
			</Form>
		</Dialog>
		
		<Dialog :dialogSize="editOfferDialogSize" dialogTitle="批量修改关联关系" ref="editOfferRelsMoreDialog" @confirm="editOfferRelsMoreSubmit">
			<Form labelWidth="100px" data-vv-scope="editOffer">
				<div class="edit-offer-dialog">
					<Row>
						<Col>
							<FormItem labelText="Z端销售品名称：">
								{{componentData.offerName}}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="关联关系：" :requiredIcon="true" :errorMessage="errors.first('editOffer.relType')">
								<Select v-validate="'required'" name="relType" :data="relType" v-model="editOfferRelObj.relType" data-vv-as="关联关系"></Select>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col>
							<FormItem labelText="关联方向：">
								<Select v-if="editOfferRelObj.relType != '200000'" :data="direction" v-model="editOfferRelObj.direction" :isNullSel="false"></Select>
								<Select v-else :data="directionData" v-model="shuangxiang" :isNullSel="false"></Select>
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
							<FormItem labelText="适用构成角色限制：" :requiredIcon="false" :errorMessage="errors.first('editOffer.rstrOfferProdRoleCd')">
								<Select  name="rstrOfferProdRoleCd" dataLabelStr="roleName" dataValueStr="roleId" :data="customers" v-model="editOfferRelObj.rstrOfferProdRoleCd" data-vv-as="适用构成角色限制"></Select>
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
		<Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
		<Tip ref="tipMore" :tipObj="tipInfo" @confirm="tipConfirmMore()"></Tip>
	</div>
</template>

<script>
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				tipInfo: {
					iconType: 1,
					msg: '',
					showBtn: {
						clear: true,
						save: true
					}
				},
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
				dialogTitle: '',
				pageInfo: {
					pageIndex: 1, // 当前页
					pageSize: 5, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},
				offerRelsPageInfo:{
					pageIndex: 1, // 当前页
					pageSize: 10, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},
				tableTitleCheckboxObj: {
					name: '',
					param: '',
					width: 100
				},
				offerRelsParams:[{
					name: 'Z端销售品内部名称',
					param: 'zOfferSysName',
					width: 300
				},{
					name: 'Z端内部编码',
					param: 'zInnerNbr',
					width: 120
				},{
					name: '关联关系',
					param: 'relType',
					width: 100
				},{
					name: 'A端销售品内部名称',
					param: 'aOfferSysName',
					width: 300
				},{
					name: 'A端内部编码',
					param: 'aInnerNbr',
					width: 120
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
					name: '适用构成最大数量',
					param: 'rstrOfferProdRelMaxNum',
					width: 140
				},{
					name: '适用构成最小数量',
					param: 'rstrOfferProdRelMinNum',
					width: 140
				},{
					name: '适用构成默认数量',
					param: 'rstrOfferProdRelDefNum',
					width: 140
                },
                {
                    name: '适用构成角色限制',
					param: 'rstrOfferProdRoleName',
					width: 140
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
				yxOfferRelsParams:{
					cNameWidth:100,
					nameWidth:100
				},
				relType: [{
					value: '140000',
					label: '松融合'
				}, {
					value: '150000',
					label: '关联包'
				}, {
					value: '160000',
					label: '要求'
				}, {
					value: '170000',
					label: '可选'
				}, {
					value: '200000',
					label: '互斥'
				}, {
					value: '600000',
					label: '接续'
				}],
				folRelType: [{
					value: '600000',
					label: '接续'
				}],
				aheadTime: [{
					value: '1000',
					label: '1个月'
				}, {
					value: '2000',
					label: '3个月'
				}, {
					value: '3000',
					label: '6个月'
				}],
				intRelType: [{
					value: '300000',
					label: '升级'
				}, {
					value: '400000',
					label: '替换'
				}],
				othRelType: [{
					value: '500000',
					label: '推荐'
				}],
				offerId: '',
				offerPage: [],
				offerChecked: {},
				offerRel: {},
				searchData: {
					offerSysName: '',
					offerInnerNbr: ''
				},
				addDependency: {
					relType: '',
					maxNum: '',
					minNum: '',
					aheadTime: '',
					effDate: '',
					expDate: ''
				},
				offerIdArr: [],
				offerRels: [],
				offerSelected: [],
				direction: [{
					value: '1',
					label: '正向'
				}, {
					value: '2',
					label: '反向'
				}],
				offerRelaTemp: [],
				tipSelData: {},
				shuangxiang: '0',
				directionData: [{
					value: '0',
					label: '双向'
				}],
				elIsShow: false,
				offerRelsSearchBox:[],
				offerRelsSearchObj:{},
				editOfferRelObj:{},
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
                ///成员角色
                customers:[],
				checkArr: []
			}
		},
		watch:{
			offerRelsSearchBox(val,old){
				this.getOfferRelData();
			}
		},
		mounted() {
			this.nbr = this.componentData.memberCode;
			this.offerId = this.componentData.offerId;
            this.getOfferRelData();
		},
		methods: {
			reInitData(){
				this.getOfferRelData();
			},
			offerRelsPageChange(page){
				this.offerRelsPageInfo.pageIndex = page;
				this.getOfferRelData();
			},
			offerRelsPageSizeChange(size){
				this.offerRelsPageInfo.pageSize = Number(size);
				this.getOfferRelData();
			},
			getOfferRelData() {
				this.offerIdArr = [this.offerId]

				let params = {
					statusCd: '1000',
					page: this.offerRelsPageInfo.pageIndex,
					limit: this.offerRelsPageInfo.pageSize
				}

				this.offerRelsSearchBox.map( boxItem => {
					if(boxItem.order){
						params.sort = `${boxItem.param} ${boxItem.order}`;
						return;
					}
					params[boxItem.param] = boxItem.eValue;
				})


				if(this.offerId) {
					this.$axios.get(this.$api.replace(this.$api.OfferRel, ['{offerId}'], this.offerIdArr), {
						params
					}).then(res => {
						if(res.data.success) {
							this.offerRels = res.data.offerRels.content || [];
							this.offerRelsPageInfo.rowCount = res.data.offerRels.total;

						} else {
							this.$message.error({message: res.data.msg});
						}
					}).catch(error => {
						this.$message.error({ message: error.response.data.msg });
					})
				}
			},
			addOfferRels() {
                this.OfferObjRelRoleName();
				this.searchData.offerInnerNbr = '';
				this.offerSelected = [];
				
				for(let ele of this.offerRels) {
					let temp = {};
					if(this.offerId == ele.aOfferId) {
						temp = {
							direction: '2',
							wOfferName: ele.aOfferSysName,
							wOfferNbr: ele.aOfferNbr,
							wOfferId: ele.aOfferId,
							relType: ele.relType,
							mOfferName: ele.zOfferSysName,
							mOfferNbr: ele.zOfferNbr,
							mOfferId: ele.zOfferId,
							maxNum: ele.maxNum,
							minNum: ele.minNum,
							defaultNum: ele.defaultNum,
							offerRelRstrCfgId: ele.offerRelRstrCfgId,
							rstrOfferProdRelMaxNum: ele.rstrOfferProdRelMaxNum,
							rstrOfferProdRelMinNum: ele.rstrOfferProdRelMinNum,
							rstrOfferProdRelDefNum: ele.rstrOfferProdRelDefNum,
							rstrOfferProdRoleCd: ele.rstrOfferProdRoleCd,
							effDate: ele.effDate,
							expDate: ele.expDate,
							offerRelId: ele.offerRelId,
							isCustRstr: ele.isCustRstr,
							isAccountRstr: ele.isAccountRstr,
							isAddressRstr: ele.isAddressRstr,
							statusCd: '1000'
						}
						this.offerSelected.push(temp);
					} else {
						temp = {
							direction: '1',
							wOfferName: ele.zOfferSysName,
							wOfferNbr: ele.zOfferNbr,
							wOfferId: ele.zOfferId,
							relType: ele.relType,
							mOfferName: ele.aOfferSysName,
							mOfferNbr: ele.aOfferNbr,
							mOfferId: ele.aOfferId,
							maxNum: ele.maxNum,
							minNum: ele.minNum,
							defaultNum: ele.defaultNum,
							offerRelRstrCfgId: ele.offerRelRstrCfgId,
							rstrOfferProdRelMaxNum: ele.rstrOfferProdRelMaxNum,
							rstrOfferProdRelMinNum: ele.rstrOfferProdRelMinNum,
							rstrOfferProdRelDefNum: ele.rstrOfferProdRelDefNum,
							rstrOfferProdRoleCd: ele.rstrOfferProdRoleCd,
							effDate: ele.effDate,
							expDate: ele.expDate,
							offerRelId: ele.offerRelId,
							isCustRstr: ele.isCustRstr,
							isAccountRstr: ele.isAccountRstr,
							isAddressRstr: ele.isAddressRstr,
							statusCd: '1000'
						}
						this.offerSelected.push(temp);
					}
				}
				this.getOfferPageData();
			},
			addOfferRelsSubmit() {
				this.offerRelaTemp = [];
				for(var i = 0; i < this.offerSelected.length; i++) {
						if(!this.offerSelected[i].offerRelId && this.offerSelected[i].statusCd == '1100') {
							this.offerSelected.splice(i, 1);
						}
					}
				for(let ele of this.offerSelected){
					if(ele.statusCd == '1100') continue;
					if(!ele.relType || this.valiateInput(ele.maxNum) || this.valiateInput(ele.minNum) || this.valiateInput(ele.defaultNum) || this.valiateInput(ele.rstrOfferProdRelMaxNum) || this.valiateInput(ele.rstrOfferProdRelMinNum) || this.valiateInput(ele.rstrOfferProdRelDefNum) || !ele.effDate || !ele.expDate){
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
				for(let ele of this.offerSelected) {
					let temp = {}
					if(ele.direction == 1) {
						temp = {
							"offerRelId": ele.offerRelId,
							"aOfferId": ele.mOfferId,
							"aOfferSysName": ele.mOfferName,
							"aOfferNbr": ele.mOfferNbr,
							"zOfferId": ele.wOfferId,
							"zOfferSysName": ele.wOfferName,
							"zOfferNbr": ele.wOfferNbr,
							"relType": ele.relType,
							"maxNum": ele.maxNum,
							"minNum": ele.minNum,
							"defaultNum": ele.defaultNum,
							"offerRelRstrCfgId": ele.offerRelRstrCfgId,
							"rstrOfferProdRelMaxNum": ele.rstrOfferProdRelMaxNum,
							"rstrOfferProdRelMinNum": ele.rstrOfferProdRelMinNum,
							"rstrOfferProdRelDefNum": ele.rstrOfferProdRelDefNum,
							"rstrOfferProdRoleCd": ele.rstrOfferProdRoleCd,
							"effDate": ele.effDate ? new Date(ele.effDate) : '',
							"expDate": ele.expDate ? new Date(ele.expDate) : '',
							"isCustRstr": ele.isCustRstr,
							"isAccountRstr": ele.isAccountRstr,
							"isAddressRstr": ele.isAddressRstr,
							"createStaff": '11',
							"updateStaff": '11',
							"statusCd": ele.statusCd
						}
						this.offerRelaTemp.push(temp);
					} else {
						temp = {
							"offerRelId": ele.offerRelId,
							"aOfferId": ele.wOfferId,
							"aOfferSysName": ele.wOfferName,
							"aOfferNbr": ele.wOfferNbr,
							"zOfferId": ele.mOfferId,
							"zOfferSysName": ele.mOfferName,
							"zOfferNbr": ele.mOfferNbr,
							"relType": ele.relType,
							"maxNum": ele.maxNum,
							"minNum": ele.minNum,
							"defaultNum": ele.defaultNum,
							"offerRelRstrCfgId": ele.offerRelRstrCfgId,
							"rstrOfferProdRelMaxNum": ele.rstrOfferProdRelMaxNum,
							"rstrOfferProdRelMinNum": ele.rstrOfferProdRelMinNum,
							"rstrOfferProdRelDefNum": ele.rstrOfferProdRelDefNum,
							"rstrOfferProdRoleCd": ele.rstrOfferProdRoleCd,
							"effDate": ele.effDate ? new Date(ele.effDate) : '',
							"expDate": ele.expDate ? new Date(ele.expDate) : '',
							"isCustRstr": ele.isCustRstr,
							"isAccountRstr": ele.isAccountRstr,
							"isAddressRstr": ele.isAddressRstr,
							"createStaff": '11',
							"updateStaff": '11',
							"statusCd": ele.statusCd
						}
						this.offerRelaTemp.push(temp);
					}
				}
				for(var i = 0; i < this.offerRelaTemp.length; i++) {
					if(!this.offerRelaTemp[i].offerRelId && this.offerRelaTemp[i].statusCd == '1100') {
						this.offerRelaTemp.splice(i, 1);
					}
				}
				this.offerRels = this.offerRelaTemp;
				let tempArray = this.offerRels.map(item => {
					return {
						aOfferId: item.aOfferId,
						createDate: item.createDate,
						createStaff: item.createStaff,
						maxNum: item.maxNum,
						minNum: item.minNum,
						defaultNum: item.defaultNum,
						offerRelRstrCfgId: item.offerRelRstrCfgId,
						rstrOfferProdRelMaxNum: item.rstrOfferProdRelMaxNum,
						rstrOfferProdRelMinNum: item.rstrOfferProdRelMinNum,
						rstrOfferProdRelDefNum: item.rstrOfferProdRelDefNum,
						rstrOfferProdRoleCd: item.rstrOfferProdRoleCd,
						effDate: item.effDate ? new Date(item.effDate) : '',
						expDate: item.expDate ? new Date(item.expDate) : '',
						offerRelId: item.offerRelId,
						relType: item.relType,
						statusCd: item.statusCd,
						isCustRstr: item.isCustRstr,
						isAccountRstr: item.isAccountRstr,
						isAddressRstr: item.isAddressRstr,
                        rstrOfferProdRoleCd:item.rstrOfferProdRoleCd,
						updateDate: item.updateDate,
						updateStaff: item.updateStaff,
						zOfferId: item.zOfferId
					}
				})
				this.$axios.post(this.$api.replace(this.$api.ConfigOfferRel, ['{offerId}'], this.offerIdArr), {
					"offerRels": tempArray
				}).then(res => {
					if(res.data.success == true) {
						this.$message.success({message: '关联关系保存成功！'});
						this.$refs.addOfferRels.hide();
						this.getOfferRelData();
					} else {
						this.$message.error({message: res.data.msg});
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			addOfferRelsBack() {

            },
            //获取成员角色
            OfferObjRelRoleName() { 
                // this.$axios.get(this.$api.OfferObjRelRoleName.format({offerId:this.offerId}),{
                this.$axios.get(this.$api.OfferObjRelRoleName.format({offerId:this.offerId}),{

                }).then( res => {
                    if(res.data.success) {
                        this.customers = [...res.data.offerObjRelRoles];
                    } else {
                        this.$message.error({ message : '成员角色查询失败' })
                    }
                }).catch( err => {
                    this.$message.error({ message : err.response.data.msg })
                })
            },
			pageChange(page) {
				this.pageInfo.pageIndex = page;
				this.getOfferPageData();
				this.$refs.searchVal.setValue(this.searchData.offerInnerNbr);
			},
			getOfferPageData() {
				let testOfferName = this.searchData.offerSysName,
					testInnerNbr = this.searchData.offerSysName;
				if(/^(2-)/.test(testOfferName)) {
					testOfferName = '';
				} else {
					testInnerNbr = '';
				}


				this.$axios.get(this.$api.OrdOffer, {
					params: {
						page: this.pageInfo.pageIndex,
						limit: this.pageInfo.pageSize,
						innerNbr: testInnerNbr,
						offerSysName: testOfferName,
						offerInnerNbr: this.searchData.offerInnerNbr
					}
				}).then(res => {
					if(res.data.success == true) {
						this.offerPage = res.data.offerPage.content;
						this.pageInfo.rowCount = res.data.offerPage.total;

						this.$refs.addOfferRels.show();
					} else {
						this.$message.error({message: res.data.msg});
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			yxScrollMounted(vm){
				let yxScrollRect = vm.$el.getBoundingClientRect(),
					nameW = yxScrollRect.width - 730;
				this.yxOfferRelsParams.cNameWidth = nameW / 2;
				this.yxOfferRelsParams.nameWidth = nameW / 2;
			},
			addOfferPage(item) {
				if(item.offerId == this.offerId){
					this.$message.warning({message: '不可选择当前销售品！'});
				} else {
					let Temp = {
						direction: '1',
						wOfferName: this.componentData.offerName,
						wOfferNbr: this.nbr,
						wOfferId: this.offerId,
						relType: '',
						mOfferName: item.offerSysName,
						mOfferNbr: item.offerNbr,
						mOfferId: item.offerId,
						maxNum: '1',
						minNum: '0',
						defaultNum: '0',
						offerRelRstrCfgId: '',
						rstrOfferProdRelMaxNum: '1',
						rstrOfferProdRelMinNum: '0',
						rstrOfferProdRelDefNum: '0',
						rstrOfferProdRoleCd: item.rstrOfferProdRoleCd,
						effDate: new Date().getTime(),
						expDate: '2050-12-31',
						isCustRstr: '',
						isAccountRstr: '',
						isAddressRstr: '',
						offerRelId: '',
						statusCd: '1000'
					}
					this.offerSelected.push(Temp);
				}
			},
			deleteOfferPage(item){
				for(var i=0;i<this.offerSelected.length;i++){
					if(this.offerSelected[i].mOfferId == item.offerId){
						this.offerSelected.splice(i,1);
					}
				}
			},
			deleteClick(item) {
				item.statusCd = '1100';
			},
			selectMkt(val) {
				return this.offerSelected.filter(item => item.statusCd != '1100').find(item => item.mOfferId == val.offerId)
			},
			delmkt(arr) {
				return [...arr].filter(item => item.statusCd != '1100');
			},
			deleteDependency(item,index) {
				if(item.offerRelId){
					this.tipType = 'DEL';
					this.tipSelData = item;
					this.tipInfo.iconType = 3;
					this.tipInfo.msg = `是否确认删除？`;
					this.tipInfo.showBtn.clear = true;
					this.tipInfo.showBtn.save = true;
					this.$refs.tip.show();
				}else{
					this.offerRels.splice(index,1);
				}
			},
			editDependency(item){
                this.OfferObjRelRoleName()
				item.direction = this.offerId == item.aOfferId ? '2' : '1';
				this.editOfferRelObj = JSON.parse(JSON.stringify(item));
				this.$refs.editOfferRelsDialog.show();
			},
			editOfferRelsSubmit(){
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
                        // tempEditOfferRelObj.rstrOfferProdRoleName = this.customers.length ? this.customers.find( item => item.roleId == this.editOfferRelObj.rstrOfferProdRoleCd).roleName : '';

						if((this.offerId == tempEditOfferRelObj.aOfferId && tempEditOfferRelObj.direction == '1') || (this.offerId == tempEditOfferRelObj.zOfferId && tempEditOfferRelObj.direction == '2')){
							let tOfferId = tempEditOfferRelObj.aOfferId,
								tOfferName = tempEditOfferRelObj.aOfferSysName,
								tOfferNbr = tempEditOfferRelObj.aOfferNbr;
								
							tempEditOfferRelObj.aOfferId = tempEditOfferRelObj.zOfferId;
							tempEditOfferRelObj.aOfferSysName = tempEditOfferRelObj.zOfferSysName;
							tempEditOfferRelObj.aOfferNbr = tempEditOfferRelObj.zOfferNbr;

							tempEditOfferRelObj.zOfferId = tOfferId;
							tempEditOfferRelObj.zOfferSysName = tOfferName;
							tempEditOfferRelObj.zOfferNbr = tOfferNbr;

						}
						this.$axios.post(this.$api.replace(this.$api.ConfigOfferRel, ['{offerId}'], [this.offerId]), {
							"offerRels": [tempEditOfferRelObj]
						}).then(res => {
							if(res.data.success == true) {
								this.$message.success({message: '关联关系保存成功！'});
								this.$refs.editOfferRelsDialog.hide();
								this.getOfferRelData();
							} else {
								this.$message.error({message: res.data.msg});
							}
						}).catch(error => {
							this.$message.error({ message: error.response.data.msg });
						})
					}
				})
				
			},
			tipConfirm() {
				this.$axios.delete(this.$api.replace(this.$api.DeleteOfferRelMore, ['{offerId}'], [this.offerId]), {
					params: {
						"updateStaff": 0,
						"offerRelId": this.tipSelData.offerRelId
					}
				}).then(res => {
					if(res.data.success == true) {
						this.getOfferRelData();
						this.$message.success({message: '删除成功！'});
						this.$refs.tip.hide();
					} else {
						this.$message.error({message: res.data.msg});
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			offerSubmit(val) {
				this.pageInfo.pageIndex = 1;
				this.searchData.offerInnerNbr = val;
				this.getOfferPageData(val);
			},
			elShowClick(){
				this.elIsShow = !this.elIsShow;
			},
			dragchange(val){
				this.offerRelsParams = val;
			},
			pullMove(w,item){
				item.width = w;
			},
			pullEnd(){
				this.$refs.offerRelsScroll.initScroll();
			},
			yxPullMove(w,item){
				this.yxOfferRelsParams[item] = w;
			},
			yxPullEnd(){
				this.$refs.yxOfferRelsScroll.initScroll();
			},
			adjustTabelItemText(item,param){
				let val = item[param];
				if(param == 'relType'){
					val = this.getRelType(val);
				} else if (param == 'isCustRstr') {
					val = this.getIsCustRstr(val)
				} else if (param == 'isAccountRstr') {
					val = this.getIsAccountRstr(val)
				} else if (param == 'isAddressRstr') {
					val = this.getIsAddressRstr(val)
				} 
				return val;
			},
			getRelType(relType){
				return {
					// '100000':'可选依赖',
					// '110000':'强制依赖',
					// '120000':'默认依赖',
					// '130000':'赠送依赖',
					'140000':'松融合',
					'150000':'关联包',
					'160000':'要求',
					'170000':'可选',
					'200000':'互斥',
					// '300000':'升级',
					// '400000':'替换',
					// '500000':'推荐',
					'600000':'接续'
				}[relType];
			},
			getIsCustRstr(isCustRstr) {
				return {
					'0': '否',
					'1': '是'
				}[isCustRstr];
			},
			getIsAccountRstr(isAccountRstr) {
				return {
					'0': '否',
					'1': '是'
				}[isAccountRstr];
			},
			getIsAddressRstr(isAddressRstr) {
				return {
					'0': '否',
					'1': '是'
				}[isAddressRstr];
			},
			confirmfilter(item){
				if(!this.offerRelsSearchObj[item.param]) return;

				let tempBox = [...this.offerRelsSearchBox].filter( boxItem => boxItem.param != item.param);

				tempBox.push({
					label:item.name,
					value:item.param == 'relType' ? this.getRelType(this.offerRelsSearchObj[item.param]) : this.offerRelsSearchObj[item.param],
					eValue:item.param == 'effDate' ? `${this.offerRelsSearchObj[item.param]} 00:00:00` : item.param == 'expDate' ? `${this.offerRelsSearchObj[item.param]} 23:59:59` : this.offerRelsSearchObj[item.param],
					param: item.param
				})
				this.offerRelsSearchBox = tempBox;
				this.offerRelsSearchObj = {};
			},
			orderFilter(type,item){
				let tempBox = [...this.offerRelsSearchBox].filter( boxItem => !boxItem.order);

				tempBox.push({
					label:item.name,
					value:type == 'asc' ? '升序' : '降序',
					param: item.param,
					order:type
				})
				this.offerRelsSearchBox = tempBox;
				this.offerRelsSearchObj = {};
			},
			offerRelDownload(){
				//关联关系模板下载
				window.open(this.$api.OfferRelDownload);
			},
			offerRelImport(){
				//关联关系导入
				this.$refs.fileRef.click();
			},
			offerRelImportChange(event){
				//关联关系导入
				let files = Array.from(event.target.files);
				let formData = new FormData();
				formData.append('offerId', this.offerId);
				formData.append('file', files[0]);
				formData.append('staff', this.$user.getInfo().id);

				event.target.value = '';

				this.$axios.post(this.$api.OfferRelImport, formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(res => {
					if(res.data.success) {
						this.$message.success({ message: '导入成功！' });
						this.getOfferRelData();
					} else {
						this.$message.error({ message: '导入失败！' });
					}
				}).catch(error => {
					this.$message.error({message: error.response.data.msg})
				})
			},
			modelChenge() {

			},
			batchEdit() {
				if(this.checkArr.length>0){
					this.$refs.editOfferRelsMoreDialog.show();
					this.editOfferRelObj = {};
				}else{
					this.$message.error({ message: '请先选择关联关系！' });
					return;
				}
			},
			editOfferRelsMoreSubmit(){
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
                        // tempEditOfferRelObj.rstrOfferProdRoleName = this.customers.length ? this.customers.find( item => item.roleId == this.editOfferRelObj.rstrOfferProdRoleCd).roleName : '';

						tempEditOfferRelObj.aOfferId = '';
						tempEditOfferRelObj.aOfferName = '';
						tempEditOfferRelObj.aOfferNbr = '';

						tempEditOfferRelObj.zOfferId = this.componentData.offerId;
						tempEditOfferRelObj.zOfferName = this.componentData.offerName;
						tempEditOfferRelObj.zOfferNbr = this.componentData.offerNbr;
						let tempEditOfferRelArr = [];
						for(let ele of this.checkArr){
							let temp = {
								aOfferId: '',
								aOfferName: '',
								aOfferNbr: '',
								defaultNum: tempEditOfferRelObj.defaultNum,
								direction: tempEditOfferRelObj.direction,
								effDate: tempEditOfferRelObj.effDate,
								expDate: tempEditOfferRelObj.expDate,
								isAccountRstr: tempEditOfferRelObj.isAccountRstr,
								isAddressRstr: tempEditOfferRelObj.isAddressRstr,
								isCustRstr: tempEditOfferRelObj.isCustRstr,
								maxNum: tempEditOfferRelObj.maxNum,
								minNum: tempEditOfferRelObj.minNum,
								relType: tempEditOfferRelObj.relType,
								rstrOfferProdRelDefNum: tempEditOfferRelObj.rstrOfferProdRelDefNum,
								rstrOfferProdRelMaxNum: tempEditOfferRelObj.rstrOfferProdRelMaxNum,
								rstrOfferProdRelMinNum: tempEditOfferRelObj.rstrOfferProdRelMinNum,
								rstrOfferProdRoleCd: tempEditOfferRelObj.rstrOfferProdRoleCd,
								statusCd: tempEditOfferRelObj.statusCd,
								zOfferId: tempEditOfferRelObj.zOfferId,
								zOfferName: tempEditOfferRelObj.zOfferName,
								zOfferNbr: tempEditOfferRelObj.zOfferNbr,
								offerRelId: ele
							}
							tempEditOfferRelArr.push(temp);
						}
						this.$axios.post(this.$api.replace(this.$api.ConfigOfferRel, ['{offerId}'], [this.offerId]), {
							"offerRels": tempEditOfferRelArr
						}).then(res => {
							if(res.data.success == true) {
								this.checkArr = [];
								this.$message.success({message: '关联关系保存成功！'});
								this.$refs.editOfferRelsMoreDialog.hide();
								this.getOfferRelData();
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
					this.$message.error({ message: '请先选择关联关系！' });
				}
			},
			tipConfirmMore() {
				this.$axios.delete(this.$api.replace(this.$api.DeleteOfferRelMore, ['{offerId}'], [this.offerId]), {
					params: {
						"updateStaff": 0,
						"offerRelId": this.checkArr.join()
					}
				}).then(res => {
					if(res.data.success == true) {
						this.checkArr = [];
						this.getOfferRelData();
						this.$message.success({message: '删除成功！'});
						this.$refs.tipMore.hide();
					} else {
						this.$message.error({message: res.data.msg});
					}
				}).catch(error => {
					this.$message.error({ message: error.response.data.msg });
				})
			},
			offerRelExport() {
				window.open(this.$api.replace(this.$api.OfferRelExport, ['{offerId}'], [this.offerId]))
			},
			valiateInput(val){
				return !val && val !== 0;
			}
		}
	}
</script>

<style scoped lang="scss">
	.relation {
		width: 100%;

		.app__top{
			cursor: pointer;
            pointer-events: auto;

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

		.h-a-add {
			margin: 10px 0;

			.offer-rel-file{
				display: none;
			}
		}
		.app__table__inner {
			.no-wrap {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.span {
				padding: 0 5px;
				cursor: pointer;
			}
			.validate /deep/ input{
				border-color: red;
			}
		}

		.icon-xiugai,
		.icon-shanchu{
			padding: 0 5px;
		}

		.icon-xiugai,
		.icon-shanchu,
		.icon-weixuanzhong-fang,
		.icon-xuanzhong-fang{
			cursor: pointer;
		}
	}

	.offer-rels-table{
		min-height: 280px;
		margin-bottom: 20px;
		/deep/ .src-content{
			min-height: 280px;
		}
		.col {
			&:hover {
				.col-search {
					display: block;
					z-index: 1;
				}
			}
		}

		.app__table-thead{
			.pull-line{
				z-index: 1;
			}
			.offer-title-name {
				display: block;
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}

		.app__table-item{
			.col {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
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
			color: #b6de8f;
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