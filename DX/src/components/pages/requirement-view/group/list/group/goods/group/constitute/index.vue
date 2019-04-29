<template>
	<div class="constitute">
		<!--构称成员信息列表-->
		<div class="app__top">
			<span class="app__top-left">构成成员信息</span>
		</div>
		<div class="info-list member">
			<!--头部-->
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>构成成员列表</span>
			</div>

			<Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
				<Row class="app__table-thead">
					<Col :span="3">产品名称</Col>
					<Col :span="2">CRM编码</Col>
					<Col :span="3">产品编码</Col>
					<Col :span="4">成员角色</Col>
					<Col :span="2">最小数量</Col>
					<Col :span="2">最大数量</Col>
					<Col :span="3">构成类型</Col>
					<Col :span="3">约束类型</Col>
					<Col :span="2">更多</Col>
				</Row>

				<Row class="tab-tbody" :class="['app__table-item']" v-for="(item,index) in offeProdRelArr" :key="index">
					<Col :span="3" class="col-show">
					<i :class="{show2:goodsId===index}" @click="showChildClick(index)" v-show="item.children.length>0"></i> {{item.prodName}}
					</Col>
					<Col :span="2" :title="item.crmProdNbr" class="no-wrap">{{item.crmProdNbr}}</Col>
					<Col :span="3" :title="item.prodNbr">{{item.prodNbr}}</Col>
					<Col :span="4" class="no-wrap">{{item.roleName}}</Col>
					<Col :span="2" :title="item.minNum">{{item.minNum}}</Col>
					<Col :span="2" :title="item.maxNum">{{item.maxNum}}</Col>
					<Col :span="3" >{{item.relType=="1001"?"构成（同拆）":"构成（不同拆）"}}</Col>
					<Col :span="3" >{{item.rstrType=="1200"?"必选":item.rstrType=="1300"?"默选":"禁止选"}}</Col>
					<Col :span="2">
					<span class="span" @click.stop="more(item)">更多</span>
					</Col>

					<!--子表格-->
					<Col :span="24" class="child-list" v-show="goodsId===index">
					<Row v-if="item.children.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(val,index) in item.children" :key="index">
						<Col :span="3" class="col-show">
						<div class="borderline"></div>{{val.prodName}}</Col>
						<Col :span="2" :title="val.crmProdNbr" class="no-wrap">{{val.crmProdNbr}}</Col>
						<Col :span="3" :title="val.prodNbr">{{val.prodNbr}}</Col>
						<Col :span="4" class="no-wrap">{{item.roleName}}</Col>
						<Col :span="2" :title="val.minNum">{{val.minNum}}</Col>
						<Col :span="2" :title="val.maxNum">{{val.maxNum}}</Col>
						<Col :span="3">{{val.relType=="1001"?"构成（同拆）":"构成（不同拆）"}}</Col>
						<Col :span="3">{{val.rstrType=="1200"?"必选":val.rstrType=="1300"?"默选":"禁止选"}}</Col>
						<Col :span="2">
						<span class="span" @click.stop="moreChild(val)">更多</span>
						</Col>
					</Row>
					<Row v-if="!item.children.length" class="app__data-none">
						<Col :span="24"><span>当前无数据</span></Col>
					</Row>
					</Col>

				</Row>
				<Row v-if="!offeProdRelArr.length" class="app__data-none">
					<Col :span="24"><span>当前无数据</span></Col>
				</Row>

			</Scroll>
		</div>
		<!--限制构称信息列表-->
		<div class="info-list limit">
			<!--头部-->
			<div class="app__title ">
				<i class="iconfont icon-jibenxinxi"></i>
				<span>限制构成</span>
			</div>

			<Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
				<Row class="app__table-thead">
					<Col :span="8">产品名称</Col>
					<Col :span="8">角色</Col>
					<Col :span="8">客账户限制规则</Col>
				</Row>

				<Row v-if="offerRstrList.length>0" :class="['app__table-item']" v-for="(item,index) in offerRstrList" :key="index">
					<Col :span="8">
						<span>{{item.offerRstrGrpName}}</span>
					</Col>
					<Col :span="8">
						<span>{{item.offerIdCompRstrCfgs}}</span>
					</Col>
					<Col :span="8">
						<span>{{item.rstrType=='1000'?'同客户':'同账户'}}</span>
					</Col>
				</Row>
				<Row v-if="!offerRstrList.length" class="app__data-none">
					<Col :span="24"><span>当前无数据</span></Col>
				</Row>
			</Scroll>
		</div>


		<!--更多信息-->
		<LeftDialog class="add-parent" ref="moreDialog">
			<div class="l-d-header clearfix">
				<span>{{moreDialogTitle}}</span>
			</div>
			<Row>
				<Col :span="24" class="tabcol">
				<button :class="['tabbtn',tabIndex=='1'?'active':'']" @click="constituteInfo()">构成成员信息</button>
				<button :class="['tabbtn',tabIndex=='2'?'active':'']" @click="limitconstitute()">限制构成信息</button>
				</Col>
			</Row>
			<Scroll class="moreScroll" :isShowRight="true" v-show="tabIndex == '1'">
				<Row v-for="(item,index) in offeProdRelArr" :key="index">
					<Col :span="24" class="offCol">
					<div class="offIndex">{{index + 1}}</div>
					<div class="offProdname" @click.stop="openNode(item)">{{item.prodName}}</div>
					<div :class="['offToggle',prodIsOpen(item)?'active':'']"></div>
					</Col>
					<Col :span="24" class="offColcontent" v-if="prodIsOpen(item)">
					<TabPane :tabs="moretabs" :value="item.tabmoreDefault" @change="tabmoreChange(arguments[0],item)">
						<template slot="morebasic">
							<div class="basic-info">
								<Row class="app__table-thead">
									<Col :span="7">
									<FormItem labelText="成员角色：">
										<span>{{relsObj.roleId=="10000000"?"基础":relsObj.roleId=="20000000"?"加装":relsObj.roleId=="40000000"?"本方":"对方"}}</span>
									</FormItem>
									</Col>
									<Col :span="7" :offset="1">
									<FormItem labelText="最小数目：">
										<span>{{relsObj.minNum}}</span>
									</FormItem>
									</Col>
									<Col :span="7" :offset="1">
									<FormItem labelText="最大数目：">
										<span>{{relsObj.maxNum}}</span>
									</FormItem>
									</Col>

								</Row>

								<Row>
									<Col :span="7">
									<FormItem labelText="默认数目：">
										<span>{{relsObj.defaultCount}}</span>
									</FormItem>
									</Col>

									<Col :span="7" :offset="1">
									<FormItem labelText="约束类型：">
										<span>{{relsObj.rstrType=="1200"?"必选":relsObj.rstrType=="1300"?"默选":"禁止选"}}</span>
									</FormItem>
									</Col>
									<Col :span="7" :offset="1">
									<FormItem labelText="产品存在方式：">
										<span>{{relsObj.prodExistType=="1000"?"新装":relsObj.prodExistType=="1100"?"在用":"新装&在用"}}</span>
									</FormItem>
									</Col>
								</Row>

								<Row>
									<Col :span="7">
									<FormItem labelText="优惠值：">
										<span>{{relsObj.discountValue=="10"?"套餐生效期间不收取月租费":relsObj.discountValue=="30"?"免一路70元（按整月减免）":relsObj.discountValue=="40" ? "免一路100元（按整月减免）" : ""}}</span>
									</FormItem>
									</Col>
									<Col :span="7" :offset="1">
									<FormItem labelText="首月优惠值：">
										<span>{{relsObj.firstMonDiscountValue=="10"?"套餐生效前免月租":relsObj.firstMonDiscountValue=="20"?"套餐生效前租费对折":relsObj.firstMonDiscountValue=="30"?"新装免一路70元（按整月减免）在用":relsObj.firstMonDiscountValue=="40"?"免一路100元（按整月减免）": ""}}</span>
									</FormItem>
									</Col>
									<Col :span="7" :offset="1">
									<FormItem labelText="构成类型：">
										<span>{{relsObj.relType=="1001"?"同拆":"不同拆"}}</span>
									</FormItem>
									</Col>
								</Row>
							</div>
						</template>
						<template slot="moreworkflow">
							<div class="info-list work-flow">
								<Scroll class="app__table__inner" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
									<Row class="app__table-thead">
										<Col :span="12">业务流程编码</Col>
										<Col :span="12">业务流程名称</Col>
									</Row>

									<Row v-if="offerServiceList.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(item,index) in offerServiceList" :key="index">
										<Col :span="12">{{item.serviceOfferNbr}}</Col>
										<Col :span="12">{{item.serviceOfferName}}</Col>
									</Row>
									<Row v-if="!offerServiceList.length" class="app__data-none">
										<Col :span="24"><span>当前无数据!</span></Col>
									</Row>
								</Scroll>

								<!--加载更多-->
								<!--<div class="add-more" v-if="offerServiceList.length>0">
								<span>加载更多</span>
							</div>-->
							</div>
						</template>
						<template slot="moreattr">
							<div class="info-list property">
								<Scroll class="app__table__inner" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
									<Row class="app__table-thead">
										<Col :span="4">属性编码</Col>
										<Col :span="4">属性名称</Col>
										<Col :span="3">最大值</Col>
										<Col :span="3">最小值</Col>
										<Col :span="4">自动触发</Col>
										<Col :span="4">属性值</Col>
									</Row>

									<Row v-if="prodAttrList.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(item,index) in prodAttrList" :key="index">
										<Col :span="4">{{item.attrNbr}}</Col>
										<Col :span="4">{{item.attrName}}</Col>
										<Col :span="3">{{item.maxValue}}</Col>
										<Col :span="3">{{item.minValue}}</Col>
										<Col :span="4">{{item.autoTrigger == "1"?"是":"否"}}</Col>
										<Col :span="4">
										<span class="span" @click="moreProdAttr(item)">更多</span>
										</Col>
									</Row>
									<Row v-if="!prodAttrList.length" class="app__data-none">
										<Col :span="24"><span>当前无数据!</span></Col>
									</Row>
								</Scroll>

							</div>
						</template>
					</TabPane>
					<Row v-if="item.children.length>0">
						<Col class="moreleafRowcol" :span="24">
						<Row>
							<Col :class="['moreleafcol',moreleafIndex == index?'active':'']" :span="3" v-for="(val,index) in item.children" :key="index" :title="val.prodName">
							<div class="moreleafIndex">{{index + 1}}</div>
							<div class="moreleafname" @click="moreleafDetail(val,index)">{{val.prodName}}</div>
							</Col>
						</Row>
						</Col>
						<Col :span="24" class="moreleafcolcon">
						<TabPane :tabs="moreleaftabs" :value="moreleafDefault" @change="moreleafChange" :isAuto="false">
							<template slot="moreleafbasic">
								<div class="basic-info">
									<Row>
										<Col :span="7">
										<FormItem labelText="成员角色：">
											<span>{{moreleafData.roleId=="10000000"?"基础":moreleafData.roleId=="20000000"?"加装":moreleafData.roleId=="40000000"?"本方":"对方"}}</span>
										</FormItem>
										</Col>
										<Col :span="7" :offset="1">
										<FormItem labelText="最小值：">
											<span>{{moreleafData.minNum}}</span>
										</FormItem>
										</Col>
										<Col :span="7" :offset="1">
										<FormItem labelText="最大值：">
											<span>{{moreleafData.maxNum}}</span>
										</FormItem>
										</Col>

									</Row>
									<Row>
										<Col :span="7">
										<FormItem labelText="默认数目：">
											<span>{{moreleafData.defaultCount}}</span>
										</FormItem>
										</Col>
										<Col :span="7" :offset="1">
										<FormItem labelText="约束类型：">
											<span>{{moreleafData.rstrType=="1200"?"必选":moreleafData.rstrType=="1300"?"默选":"禁止选"}}</span>
										</FormItem>
										</Col>

										<Col :span="7" :offset="1">
										<FormItem labelText="产品存在方式：">
											<span>{{moreleafData.prodExistType=="1000"?"新装":moreleafData.prodExistType=="1100"?"在用":"新装&在用"}}</span>
										</FormItem>
										</Col>
									</Row>

									<Row>
										<Col :span="7">
										<FormItem labelText="优惠值：">
											<span>{{moreleafData.discountValue=="10"?"套餐生效期间不收取月租费":moreleafData.discountValue=="30"?"免一路70元（按整月减免）":moreleafData.discountValue=="40" ? "免一路100元（按整月减免）" : ""}}</span>
										</FormItem>
										</Col>
										<Col :span="7" :offset="1">
										<FormItem labelText="首月优惠值：">
											<span>{{moreleafData.firstMonDiscountValue=="10"?"套餐生效前免月租":moreleafData.firstMonDiscountValue=="20"?"套餐生效前租费对折":moreleafData.firstMonDiscountValue=="30"?"新装免一路70元（按整月减免）在用":moreleafData.firstMonDiscountValue=="40"?"免一路100元（按整月减免）": ""}}</span>
										</FormItem>
										</Col>
										<Col :span="7" :offset="1">
										<FormItem labelText="构成类型：">
											<span>{{moreleafData.relType=="1001"?"同拆":"不同拆"}}</span>
										</FormItem>
										</Col>
									</Row>
								</div>
							</template>

							<template slot="moreleafattr">
								<div class="info-list property">
									<Scroll class="app__table__inner" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll">
										<Row class="app__table-thead">
											<Col :span="4">属性编码</Col>
											<Col :span="4">属性名称</Col>
											<Col :span="4">最大值</Col>
											<Col :span="4">最小值</Col>
											<Col :span="4">自动触发</Col>
											<Col :span="4">属性值</Col>
										</Row>

										<Row v-if="prodAttrList.length>0" :class="['app__table-item']" v-for="(item,index) in prodAttrList" :key="index">
											<Col :span="4">{{item.attrNbr}}</Col>
											<Col :span="4">{{item.attrName}}</Col>
											<Col :span="4">{{item.maxValue}}</Col>
											<Col :span="4">{{item.minValue}}</Col>
											<Col :span="4">{{item.autoTrigger == "1"?"是":"否"}}</Col>
											<Col :span="4">
											<span class="span" @click="moreProdAttr(item)">更多</span>
											</Col>
										4
										</Row>
										<Row v-if="!prodAttrList.length" class="app__data-none">
											<Col :span="24"><span>当前无数据!</span></Col>
										</Row>
									</Scroll>

								</div>
							</template>
						</TabPane>
						</Col>
					</Row>

					</Col>
				</Row>

			</Scroll>
			<Scroll class="app__table__inner" :isShowRight="true" ref="listScroll" v-show="tabIndex == '2'">
				<Row class="app__table-thead">
					<Col :span="12">产品名称</Col>
					<Col :span="12">客账户限制规则</Col>
				</Row>

				<Row v-if="offerRstrList.length>0" class="tab-tbody" :class="['m-item app__table-item']" v-for="(item,index) in offerRstrList" :key="index">
					<Col :span="12">{{item.offerRstrGrpName}}</Col>
					<Col :span="12">{{item.rstrType=='1000'?'同客户':'同账户'}}</Col>
				</Row>
				<Row v-if="!offerRstrList.length" class="app__data-none">
					<Col :span="24"><span>当前无数据!</span></Col>
				</Row>
			</Scroll>
		</LeftDialog>


		<!--查看属性值-->
		<Dialog class="h-dialog" dialogTitle="查看属性值" ref="seeAttr" :showBtn="false">
			<div class="dialog-box attr-value">

				<Scroll class="app__table__inner" :isShowRight="true" ref="listScroll">
					<Row class="app__table-thead">
						<Col :span="12">属性值</Col>
						<Col :span="12">属性值名称</Col>
					</Row>

					<Row v-if="qryAttrValueList.length>0" :class="['app__table-item']" v-for="(item,index) in qryAttrValueList" :key="index">
						<Col :span="12">{{item.attrValue}}</Col>
						<Col :span="12">{{item.attrValueName}}</Col>
					</Row>
					<Row v-if="!qryAttrValueList.length" class="app__data-none">
						<Col :span="24">
						<span>当前无数据</span>
						</Col>
					</Row>
				</Scroll>
			</div>
		</Dialog>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			componentData: {}
		},
		data() {
			return {
				serviceOfferName: "",
				moreleafIndex: "0",
				offFlag: false,
				addrootFlag: false,
				addleafFlag: false,
				dialogSize: {
					size: 80,
					min: 600,
					max: 800
				},
				attrActype: "add",
				staff: "",
				createStaff: "222",
				updateStaff: "222",
				leftDialogTitle: '添加根产品',
				moreDialogTitle: "更多信息",
				tabIndex: "1",
				goodsId: '',
				tabType: '1000',
				basicData: {
					name: '',
					num: '',
					maxNum: '',
					minNum: '',
					prodId: '',
					prodList: [],
					roleId: "10000000",
					rstrType: "1200",
					relType: "1000",
					prodExistType: "1200",
					ifMarketingBinding: "1",
					discountValue: "10",
					firstMonDiscountValue: "10",

					offerProdRelId: "",
					parOfferProdRelId: "",
					effDate: "",
					expDate: "",
					offerProdRelCfgId: "",
					firstMonDiscountValue: "10"
				},
				leafData: {
					prodExistType: "1200",
					ifMarketingBinding: "1",
					ifAttrConstraint: "1",
					discountValue: "10",
					firstMonDiscountValue: "10",
					roleId: "10000000",
					maxNum: '',
					minNum: '',
					defaultCount: '',
					relType: "1000",
					rstrType: "1300",
					parOfferProdRelId: "",
				},
				reltypeList: [{
					label: "构成（同拆）",
					value: "1001"
				}, {
					label: "构成（不同拆）",
					value: "1000"
				}],
				moreleafData: {
					prodExistType: "1200",
					ifMarketingBinding: "1",
					ifAttrConstraint: "1",
					discountValue: "10",
					firstMonDiscountValue: "10",
					roleName: "",
					roleId: "10000000",
					maxNum: '',
					minNum: '',
					defaultCount: '',
					rstrType: "1300",
					parOfferProdRelId: "",
					relType: "1000"
				},
				qureyLeafProdCheck: "",
				ifAttrConstraintList: [{
					value: "1",
					label: "是"
				}, {
					value: "0",
					label: "否"
				}],
				ifMarketingBindingList: [{
					value: "1",
					label: "是"
				}, {
					value: "0",
					label: "否"
				}],
				pageInfo: {
					pageIndex: 1, // 当前页
					pageSize: 20, // 每页条数
					pageCount: 0, // 总页数
					rowCount: 0 // 总条数
				},
				offeProdRelArr: [],
				prodOpenArray: [],
				statusCd: 1000,
				tabDefault: 'basic',
				tableafDefault: 'laefbasic',
				tabmoreDefault: 'morebasic',
				moreleafDefault: 'moreleafbasic',
				tabs: [{
					label: "基本信息",
					value: "basic"
				}, {
					label: "排除的业务流程",
					value: "workflow"
				}, {
					label: "属性",
					value: "attr"
				}],
				leaftabs: [{
					label: "基本信息",
					value: "leafbasic"
				}, {
					label: "属性",
					value: "leafattr"
				}],
				moretabs: [{
					label: "基本信息",
					value: "morebasic"
				}, {
					label: "排除的业务流程",
					value: "moreworkflow"
				}, {
					label: "属性",
					value: "moreattr"
				}],
				moreleaftabs: [{
					label: "基本信息",
					value: "moreleafbasic"
				}, {
					label: "属性",
					value: "moreleafattr"
				}],
				prodObj: {},
				//成员角色列表 
				offerObjRelRoleList: [],
				roleList: [{
					label: "基础",
					value: "10000000"
				}, {
					label: "加装",
					value: "20000000"
				}, {
					label: "本方",
					value: "40000000"
				}, {
					label: "对方",
					value: "50000000"
				}],
				//产品全视图页码
				pageProductObj: {
					pageIndex: 1, // 当前页
					pageSize: 5, // 每页条数
					pageCount: 1, // 总页数
					rowCount: 0 // 总条数
				},
				pageleafProductObj: {
					pageIndex: 1, // 当前页
					pageSize: 5, // 每页条数
					pageCount: 1, // 总页数
					rowCount: 0 // 总条数
				},
				pageAttrValueInfo: {
					pageIndex: 1, // 当前页
					pageSize: 5, // 每页条数
					pageCount: 1, // 总页数
					rowCount: 0 // 总条数
				},
				//业务流程页码
				prodServiceObj: {
					pageIndex: 1, // 当前页
					pageSize: 5, // 每页条数
					pageCount: 1, // 总页数
					rowCount: 0 // 总条数
				},
				//销售品构成列表页码
				offerProdRelPageObj: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0,
					pageCount: 0
				},

				prodUseType: "1000",
				prodNbr: "",
				prodName: "",
				qureyProdListArr: [],
				prodServiceOfferRelArr: [],
				qureyProdCheck: "",
				catalogItemTreeModel: '',
				catalogItemTreeKey: [{
					key: 'roleName',
					span: 24
				}],
				relTypeList: [{
					value: "1200",
					label: "必选"
				}, {
					value: "1300",
					label: "默选"
				}, {
					value: "1400",
					label: "禁止选"
				}],
				prodExistTypeList: [{
					value: "1000",
					label: "新装"
				}, {
					value: "1100",
					label: "在用"
				}, {
					value: "1200",
					label: "新装&在用"
				}],
				discountValueList: [{
					value: "10",
					label: "套餐生效期间不收取月租费"
				}, {
					value: "30",
					label: "免一路70元（按整月减免）"
				}, {
					value: "40",
					label: "免一路100元（按整月减免）"
				}],
				firstMonDiscountValueList: [{
					value: "10",
					label: "套餐生效前免月租"
				}, {
					value: "20",
					label: "套餐生效前租费对折"
				}, {
					value: "30",
					label: "新装免一路70元（按整月减免）在用"
				}, {
					value: "40",
					label: "免一路100元（按整月减免）"
				}],
				offerServiceList: [],
				ProdDisposableFeeList: [],
				//限制构成信息列表
				offerRstrList: [{offerRstrGrpName:'2'}],
				offerRstrSelectList: [],
				qryordAttr: [],
				qryConstituteList: [],
				qryAttrPageObj: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0,
					pageCount: 1
				},
				qryConstitutePageObj: {
					pageIndex: 1,
					pageSize: 20,
					rowCount: 0,
					pageCount: 1
				},
				rstrTypeList: [{
					value: "1000",
					label: "同客户关系"
				}, {
					value: "1100",
					label: "同账户关系"
				}, {
					value: "1200",
					label: "同地址关系"
				}, {
					value: "1001",
					label: "不同客户关系"
				}, {
					value: "1101",
					label: "不同账户关系"
				}, {
					value: "1201",
					label: "不同地址关系"
				}],
				qryConstituteSelect: "1000",
				prodAttrList: [],
				qryProductAttrList: [],
				qryProductAttrValueList: [],
				ProductAttrDetailPageObj: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0,
					pageCount: 1
				},
				ProductAttrValueDetailPageObj: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0,
					pageCount: 1
				},
				offerAttrPageObj: {
					pageIndex: 1,
					pageSize: 5,
					rowCount: 0,
					pageCount: 1
				},
				qureyAttrCheck: "",
				attrvalObj: {
					minValue: "",
					maxValue: '',
					autoTrigger: "1"
				},
				autoTriggerList: [{
					value: "1",
					label: "是"
				}, {
					value: "0",
					label: "否"
				}],
				qryProductAttrCheck: [],
				//更多信息
				relsObj: {
					minNum: "",
					maxNum: "",
					discountValue: "",
					firstMonDiscountValue: "",
					roleName: "",
					prodExistType: "",
					defaultCount: ""
				},
				updateProdObj: {
					parOfferProdRelId: "",
					offerId: "",
					prodId: "",
					effDate: "",
					expDate: "",
					prodExistType: "1000",
					roleId: "10000000",
					roleName: "",
					offerProdRelCfgId: "",
					defaultCount: "",
					rstrType: "1200",
					minNum: "",
					maxNum: "",
					ifMarketingBinding: "1",
					discountValue: "10",
					firstMonDiscountValue: "10",
					createStaff: "",
					updateStaff: "",
					createDate: "",
					updateDate: "",
					offerObjRelRoleArr: []
				},
				parProdId: "",
				qryAttrValueList: []
			}
		},
		computed: {
			betweenstrRoot() {
				return `between:${this.basicData.minNum},${this.basicData.maxNum}`;
			},
			betweenstrUpdate() {
				return `between:${this.basicData.minNum},${this.basicData.maxNum}`;
			},
			betweenstrLeaf() {
				return `between:${this.leafData.minNum},${this.leafData.maxNum}`;
			},
			maxRoot() {
				return `min_value:${this.basicData.minNum}|required`;
			},
			minRoot() {
				return `max_value:${this.basicData.maxNum}|required`;
			},
			maxleaf() {
				return `min_value:${this.leafData.minNum}|required`;
			},
			minleaf() {
				return `max_value:${this.leafData.maxNum}|required`;
			},
			maxAttr() {
				return `min_value:${this.attrvalObj.minValue}|required`;
			},
			minAttr() {
				return `max_value:${this.attrvalObj.maxValue}|required`;
			}
        },
        watch: {
            componentData(val) {
                this.getoffeProdRel()
			    this.offerProdRelPages(this.qryConstitutePageObj.pageIndex, this.prodName)
            }
        },
		mounted() {
			this.getoffeProdRel()
			this.offerProdRelPages(this.qryConstitutePageObj.pageIndex, this.prodName)
			//			Bus.$on('folderInputClick', dataObj => {
			//				if(dataObj.inputEl.checked) {
			//					this.selTemplateType = dataObj.data;
			//				}
			//			});
		},
		watch: {
			"basicData.maxNum": function(newValue, oldValue) {
				if(newValue == "0") {
					this.basicData.rstrType = "1400";
				}
			},
			"basicData.minNum": function(newValue, oldValue) {
				if(newValue >= "1") {
					this.basicData.rstrType = "1200";
				}
			},
			"basicData.defaultCount": function(newValue, oldValue) {
				if(newValue == "1") {
					this.basicData.rstrType = "1300";
				}
			},
			"qureyProdCheck": function(newValue, oldValue) {
				this.prodObj = newValue
				this.basicData.prodId = newValue.prodId
			},
			/*'offeProdRelArr': function(newValue, oldValue) {
				this.offerProdRelPages(this.qryConstitutePageObj.pageIndex, this.prodName)

			},*/
		},
		methods: {
			//销售品配置构成关系界面查询
			getoffeProdRel() {
				//let offerIdArr = []
                //offerIdArr.push(this.componentData.offerId)
                this.$axios.get(this.$api.GetOffeProdRelView.format({'offerId':this.componentData.offerId}), {
                    params: {
                        statusCd: 1000
                    }
				}).then(res => {
					if(res.data.success) {
						console.log(res,'构成列表')
						//构成成员信息列表查询
						if(res.data.offeProdRels) {
							this.offeProdRelArr = res.data.offeProdRels
						}
						//限制构成信息列表查询
						if(res.data.offerRstrCfgs) {
							this.offerRstrList = [...res.data.offerRstrCfgs]
							this.offerRstrList.map(item => {
								this.$set(item, 'offerIdCompRstrCfgs', item.offerCompRstrCfgs.map(offerItem => {
									return offerItem.prodId;
								}))
								return item;
							})
							this.offerRstrSelectList = [...res.data.offerRstrCfgs]
						}
					} else {
						this.$message.error({ message: '查询失败！' });
					}
				})
			},
			//产品属性列表查询
			GetOfferProdAttrValRest() {
				//let offerIdArr = []
				//offerIdArr.push(this.componentData.offerId)
				//offerIdArr.push(this.offerProdRelId)
				this.$axios.get(this.$api.OfferGetList+'/'+this.componentData.offerId+'/offerProdRel/'+this.offerProdRelId+'/offerProdAttrValRest', {
					params: {
						statusCd: 1000,
						page:1,
						limit:100
					}
				}).then(res => {
					if(res.data.success) {
						console.log(res,'属性')
						if(res.data.offerProdAttrValRestDeatil) {
							this.prodAttrList = []
							this.prodAttrList = res.data.offerProdAttrValRestDeatil.content
							this.offerAttrPageObj.pageIndex = res.data.offerProdAttrValRestDeatil.page
							this.offerAttrPageObj.rowCount = res.data.offerProdAttrValRestDeatil.total
						}
					} else {
						this.$message.error({ message: '查询失败！' });
					}
				}).catch(error => {
					this.$message.error({ message: '查询失败！' });
				})
			},
			searchprodClick(val) {
				this.prodName = val
				this.qureyProdList(this.pageProductObj.pageIndex, this.pageProductObj.pageSize, this.prodNbr, this.prodName, this.prodUseType)
			},
			searchLeafprodClick(val) {
				this.prodName = val
				this.qureyProdList(this.pageleafProductObj.pageIndex, this.pageleafProductObj.pageSize, this.prodNbr, this.prodName, this.prodUseType)
			},
			searchserviceClick(val) {
				this.serviceOfferName = ""
			},
			//产品全视图查询
			qureyProdList(pageIndex, pageSize, prodNbr, prodName, prodUseType) {
				this.$axios.get(this.$api.QureyProdList, {
					params: {
						'parProdId': this.parProdId,
						"prodNbr": prodNbr,
						"prodName": prodName,
						"effDate": "",
						"expDate": "",
						"prodFuncType": "",
						"prodUseType": prodUseType,
						"staff": this.staff,
						"page": pageIndex,
						"limit": pageSize
					}
				}).then(res => {
					if(res.data.success == true) {
						if(res.data.products.content) {
							this.qureyProdListArr = res.data.products.content
						} else {
							this.qureyProdListArr = []
						}
						if(this.parProdId == "") {
//							this.pageProductObj.pageCount = res.data.body.pageInfo.pageCount
							this.pageProductObj.rowCount = res.data.products.total
						} else {
//							this.pageleafProductObj.pageCount = res.data.body.pageInfo.pageCount
							this.pageleafProductObj.rowCount = res.data.products.total
						}

					} else {

					}
				})
			},
			qureyProdTree() {

			},
			//产品业务约束列表
			prodService(prodId, pageIndex, pageSize) {
				this.$axios.post(this.$api.QryProdServiceOfferRel, {
						prodId: prodId,
						prodAttrId: '',
						scopeInfos: [{
							scope: 'prodServiceOfferRel',
							pageIndex: pageIndex,
							pageSize: pageSize
						}]
				}).then((res) => {
					console.log(res.data)
					if(res.data.prodServiceOfferRelList.prodServiceOfferRels.content) {
						this.prodServiceOfferRelArr = res.data.prodServiceOfferRelList.prodServiceOfferRels.content
						this.prodServiceObj.rowCount = res.data.body.prodServiceOfferRelList.prodServiceOfferRels.total
					} else {
						this.prodServiceOfferRelArr = []
					}
				})
			},
			//产品业务约束已选列表
			offerProdService() {
				//let offerProdRelArr = []
				//offerProdRelArr.push(this.componentData.offerId)
				//offerProdRelArr.push(this.offerProdRelId)
				this.$axios.get(this.$api.OfferGetList+'/'+this.componentData.offerId+'/offerProdRel/'+ this.offerProdRelId +'/offerProdServiceRstr', {
					params: {
						statusCd: 1000,
						page:1,
						limit:100
					}
				}).then(res => {
					console.log(res,'构成排除')
					if(res.data.success) {
						if(res.data.offerProdServiceRstrPage.content) {
							this.offerServiceList = []
							for(let ele of res.data.offerProdServiceRstrPage.content) {
								let offerServiceObj = {
									"serviceOfferId": ele.serviceOfferId,
									"serviceOfferNbr": ele.standardCd,
									"serviceOfferName": ele.serviceOfferName,
									"offerProdRelId": ele.offerProdRelId,
									"offerProdServiceRstrCfgId": ele.offerProdServiceRstrCfgId
								}
								this.offerServiceList.push(offerServiceObj)
							}
						}
					}
				})
			},
			//添加根产品
			showLeft(type) {
				this.leftDialogTitle = "添加根产品"
				this.tabDefault = "basic"
				this.$refs.leftDialog.show();
				this.attrActype = "add"
				this.offerProdRelId = ""
				this.parProdId = ""
				this.prodUseType = "1000"
				this.prodObj = {}
				this.basicData.name = ""
				this.basicData.num = ""
				this.basicData.maxNum = ""
				this.basicData.minNum = ""
				this.basicData.relType = "1000"
				this.addrootFlag = false
				this.qureyProdList(this.pageProductObj.pageIndex, this.pageProductObj.pageSize, this.prodNbr, this.prodObj.prodName, this.prodUseType)
			},
			//展示更多信息
			more(val) {
				this.offerProdRelId = val.offerProdRelId
                this.offeProdRelDetail(val)
				this.offerProdService(val)
				this.GetOfferProdAttrValRest(val)
				/*if(val.children.length > 0) {
					this.offerProdChildRelId = val.children["0"].offerProdRelId
					this.offeProdleafRelDetail()
				}*/
				this.$refs.moreDialog.show();
				this.prodOpenArray = []
				if(this.prodOpenArray.indexOf(val.offerProdRelId) > -1) {
					this.prodOpenArray = this.prodOpenArray.filter(item => item != val.offerProdRelId);
				} else {
					this.prodOpenArray.push(val.offerProdRelId);
				}
			},
			//构成产品详情
			offeProdRelDetail(val) {
				//let offerIdArr = []
				//offerIdArr.push(this.componentData.offerId)
				//offerIdArr.push(val.offerProdRelId)
				this.$axios.get(this.$api.OfferGetList+'/'+this.componentData.offerId+'/offerProdRel'+'/' + val.offerProdRelId, {}).then(res => {
					if(res.data.success) {
						console.log(res,'构成详情')
						if(res.data.offeProdRel) {
							this.relsObj = res.data.offeProdRel;

							//修改根产品
							this.updateProdObj.offerProdRelId = res.data.offeProdRel.offerProdRelId
							this.updateProdObj.parOfferProdRelId = res.data.offeProdRel.parOfferProdRelId
							this.prodObj.prodId = res.data.offeProdRel.prodId
							this.basicData.prodExistType = res.data.offeProdRel.prodExistType
							this.updateProdObj.offerProdRelCfgId = res.data.offeProdRel.offerProdRelCfgId
							this.basicData.num = res.data.offeProdRel.defaultCount
							this.basicData.rstrType = res.data.offeProdRel.rstrType
							this.basicData.relType = res.data.offeProdRel.relType
							this.basicData.minNum = res.data.offeProdRel.minNum
							this.basicData.maxNum = res.data.offeProdRel.maxNum
							this.prodObj.prodName = res.data.offeProdRel.prodName
							this.basicData.roleId = res.data.offeProdRel.roleId
							this.basicData.roleName = res.data.offeProdRel.roleName
							this.updateProdObj.ifMarketingBinding = res.data.offeProdRel.ifMarketingBinding
							this.basicData.discountValue = res.data.offeProdRel.discountValue
							this.basicData.firstMonDiscountValue = res.data.offeProdRel.firstMonDiscountValue

						}
					}
				}).catch(error => {

				})
			},
			offeProdleafRelDetail() {
				let offerIdArr = []
				offerIdArr.push(this.componentData.offerId)
				offerIdArr.push(this.offerProdChildRelId)
				this.$axios.get(this.$api.replace(this.$api.offerProdRelDetail, ['{offerId}', '{offerProdRelId}'], offerIdArr), {}).then(res => {
					if(res.data.success) {
						if(res.data.offeProdRel) {
							//子产品详情
							this.moreleafData.roleId = res.data.offeProdRel.roleId
							this.moreleafData.minNum = res.data.offeProdRel.minNum
							this.moreleafData.maxNum = res.data.offeProdRel.maxNum
							this.moreleafData.discountValue = res.data.offeProdRel.discountValue
							this.moreleafData.firstMonDiscountValue = res.data.offeProdRel.firstMonDiscountValue
							this.moreleafData.roleName = res.data.offeProdRel.roleName
							this.moreleafData.prodExistType = res.data.offeProdRel.prodExistType
							this.moreleafData.defaultCount = res.data.offeProdRel.defaultCount
							this.moreleafData.relType = res.data.offeProdRel.relType
							this.moreleafData.rstrType = res.data.offeProdRel.rstrType
						}
					}
				}).catch(error => {

				})
			},
			//更多功能产品
			moreChild(val) {
				this.$refs.moreDialog.show();
				this.offerProdRelId = val.offerProdRelId
				this.offerProdChildRelId = val.offerProdRelId
				let valObj = {
					offerProdRelId: val.parOfferProdRelId
				}
				this.offeProdRelDetail(valObj)
				this.offeProdleafRelDetail()
				this.prodOpenArray = []
				if(this.prodOpenArray.indexOf(val.parOfferProdRelId) > -1) {
					this.prodOpenArray = this.prodOpenArray.filter(item => item != val.parOfferProdRelId);
				} else {
					this.prodOpenArray.push(val.parOfferProdRelId);
				}
			},
			//切换tab
			tabChange(val) {
				if(this.tabDefault == "basic" && val == "workflow") {
					if(this.attrActype == 'add') {
						if(!this.addrootFlag) {
							this.$validator.validateAll('tabRoot').then((result) => {
								if(result) {
									let offerIdArr = []
									offerIdArr.push(this.componentData.offerId)
									this.basicData.offerProdRelId = -1
									this.basicData.parOfferProdRelId = 0
									this.basicData.offerId = this.componentData.offerId
									this.$axios.post(this.$api.replace(this.$api.PostOfferProdRel, ['{offerId}'], offerIdArr), {
										"offerProdRelId": this.basicData.offerProdRelId,
										"parOfferProdRelId": this.basicData.parOfferProdRelId,
										"offerId": this.componentData.offerId,
										"prodId": this.prodObj.prodId,
										"effDate": this.basicData.effDate,
										"expDate": this.basicData.expDate,
										"prodExistType": this.basicData.prodExistType,
										"roleId": this.basicData.roleId,
										"offerProdRelCfgId": this.basicData.offerProdRelCfgId,
										"rstrType": this.basicData.rstrType,
										"relType": this.basicData.relType,
										"minNum": this.basicData.minNum,
										"maxNum": this.basicData.maxNum,
										"defaultCount": this.basicData.num,
										"discountValue": this.basicData.discountValue,
										"ifMarketingBinding": this.basicData.ifMarketingBinding,
										"firstMonDiscountValue": this.basicData.firstMonDiscountValue,
										"statusCd": this.statusCd,
										"updateStaff": this.createStaff,
										"createStaff": this.createStaff

									}).then(res => {
										console.log(res)
										if(res.data.success) {
											this.offerProdRelId = res.data.offeProdRel["0"].offerProdRelId
											this.getoffeProdRel()
											this.$message.success({ message: '保存成功！' });
											this.$nextTick(() => {
												this.tabDefault = val;
												this.offerProdService()
												this.addrootFlag = true
											})

										} else {
											this.$message.error({ message: '保存失败！' });
										}
									}).catch(error => {
										this.$message.error({ message: '保存失败！' });
									})
								} else {
									this.tabDefault = "basic"
								}
							})
						} else {
							this.tabDefault = val;
							this.offerProdService()
						}
					} else {
						this.$validator.validateAll('tabRoot').then((result) => {
							if(result) {
								let offerIdArr = []
								offerIdArr.push(this.componentData.offerId)
								offerIdArr.push(this.offerProdRelId)
								this.$axios.put(this.$api.replace(this.$api.PutOfferProdRel, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
									"offerProdRelId": this.offerProdRelId,
									"parOfferProdRelId": this.updateProdObj.parOfferProdRelId,
									"offerId": this.componentData.offerId,
									"prodId": this.prodObj.prodId,
									"effDate": this.updateProdObj.effDate,
									"expDate": this.updateProdObj.expDate,
									"prodExistType": this.basicData.prodExistType,
									"roleId": this.basicData.roleId,
									"offerProdRelCfgId": this.updateProdObj.offerProdRelCfgId,
									"defaultCount": this.basicData.num,
									"rstrType": this.basicData.rstrType,
									"relType": this.basicData.relType,
									"minNum": this.basicData.minNum,
									"maxNum": this.basicData.maxNum,
									"ifMarketingBinding": this.updateProdObj.ifMarketingBinding,
									"discountValue": this.basicData.discountValue,
									"firstMonDiscountValue": this.basicData.firstMonDiscountValue,
									"updateStaff": this.createStaff,
									"statusCd": this.statusCd,
									"createStaff": this.createStaff

								}).then(res => {
									if(res.data.success) {
										this.getoffeProdRel()
										this.$refs.leftDialog.show();
										this.$message.success({ message: '修改成功！' });
										this.$nextTick(() => {
											this.tabDefault = val;
											this.offerProdService()
											this.addrootFlag = true
										})
									} else {

									}
								})
							} else {
								this.tabDefault = "basic"
							}
						})
					}
				} else if(this.tabDefault == "basic" && val == "attr") {
					if(this.attrActype == 'add') {
						if(!this.addrootFlag) {
							this.$validator.validateAll('tabRoot').then((result) => {
								if(result) {
									let offerIdArr = []
									offerIdArr.push(this.componentData.offerId)
									this.basicData.offerProdRelId = -1
									this.basicData.parOfferProdRelId = 0
									this.basicData.offerId = this.componentData.offerId
									this.$axios.post(this.$api.replace(this.$api.PostOfferProdRel, ['{offerId}'], offerIdArr), {
										"offerProdRelId": this.basicData.offerProdRelId,
										"parOfferProdRelId": this.basicData.parOfferProdRelId,
										"offerId": this.componentData.offerId,
										"prodId": this.prodObj.prodId,
										"effDate": this.basicData.effDate,
										"expDate": this.basicData.expDate,
										"prodExistType": this.basicData.prodExistType,
										"roleId": this.basicData.roleId,
										"offerProdRelCfgId": this.basicData.offerProdRelCfgId,
										"rstrType": this.basicData.rstrType,
										"relType": this.basicData.relType,
										"minNum": this.basicData.minNum,
										"maxNum": this.basicData.maxNum,
										"defaultCount": this.basicData.num,
										"discountValue": this.basicData.discountValue,
										"ifMarketingBinding": this.basicData.ifMarketingBinding,
										"firstMonDiscountValue": this.basicData.firstMonDiscountValue,
										"statusCd": this.statusCd,
										"updateStaff": this.createStaff,
										"createStaff": this.createStaff

									}).then(res => {
										console.log(res)
										if(res.data.success) {
											this.offerProdRelId = res.data.offeProdRel["0"].offerProdRelId
											this.getoffeProdRel()
											this.$message.success({ message: '保存成功！' });
											this.$nextTick(() => {
												this.tabDefault = val;
												this.GetOfferProdAttrValRest()
												this.addrootFlag = true
											})
										} else {
											this.$message.error({ message: '保存失败！' });
										}
									}).catch(error => {
										this.$message.error({ message: '保存失败！' });
									})
								} else {
									this.tabDefault = "basic"
								}
							})
						} else {
							this.tabDefault = val;
							this.GetOfferProdAttrValRest()
						}
					} else {
						this.$validator.validateAll('tabRoot').then((result) => {
							if(result) {
								let offerIdArr = []
								offerIdArr.push(this.componentData.offerId)
								offerIdArr.push(this.offerProdRelId)
								this.$axios.put(this.$api.replace(this.$api.PutOfferProdRel, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
									"offerProdRelId": this.offerProdRelId,
									"parOfferProdRelId": this.updateProdObj.parOfferProdRelId,
									"offerId": this.componentData.offerId,
									"prodId": this.prodObj.prodId,
									"effDate": this.updateProdObj.effDate,
									"expDate": this.updateProdObj.expDate,
									"prodExistType": this.basicData.prodExistType,
									"roleId": this.basicData.roleId,
									"offerProdRelCfgId": this.updateProdObj.offerProdRelCfgId,
									"defaultCount": this.basicData.num,
									"rstrType": this.basicData.rstrType,
									"relType": this.basicData.relType,
									"minNum": this.basicData.minNum,
									"maxNum": this.basicData.maxNum,
									"ifMarketingBinding": this.updateProdObj.ifMarketingBinding,
									"discountValue": this.basicData.discountValue,
									"firstMonDiscountValue": this.basicData.firstMonDiscountValue,
									"updateStaff": this.createStaff,
									"statusCd": this.statusCd,
									"createStaff": this.createStaff

								}).then(res => {
									if(res.data.success) {
										this.getoffeProdRel()
										this.$refs.leftDialog.show();
										this.$message.success({ message: '修改成功！' });
										this.$nextTick(() => {
											this.tabDefault = val;
											this.GetOfferProdAttrValRest()
											this.addrootFlag = true
										})
									} else {
										this.$message.error({ message: '修改失败！' });
									}
								}).catch(error => {
									this.$message.error({ message: '修改失败！' });
								})
							} else {
								this.tabDefault = "basic"
							}
						})
					}
				} else if(this.tabDefault == "attr" && val == "workflow") {
					this.attrActype == 'mod'
					this.addrootFlag = true
					this.tabDefault = val;
					this.offerProdService()
				} else if(this.tabDefault == "workflow" && val == "attr") {
					this.attrActype == 'mod'
					this.addrootFlag = true
					this.tabDefault = val;
					this.GetOfferProdAttrValRest()
				} else if(val == "basic") {
					this.tabDefault = val;
				}
			},
			//切换添加功能产品tab
			tableafChange(val) {
				if(this.tableafDefault == "leafbasic" && val == "leafattr") {
					//添加功能产品
					if(!this.addleafFlag) {
						this.$validator.validateAll('tabLaef').then((result) => {
							if(result) {
								let offerIdArr = []
								offerIdArr.push(this.componentData.offerId)
								this.leafData.offerProdRelId = this.offerProdRelId
								this.$axios.post(this.$api.replace(this.$api.PostOfferProdRel, ['{offerId}'], offerIdArr), {
									"offerProdRelId": this.leafData.offerProdRelId,
									"parOfferProdRelId": this.leafData.parOfferProdRelId,
									"offerId": this.componentData.offerId,
									"prodId": this.prodObj.prodId,
									"effDate": this.basicData.effDate,
									"expDate": this.basicData.expDate,
									"prodExistType": this.leafData.prodExistType,
									"roleId": this.leafData.roleId,
									"offerProdRelCfgId": this.leafData.offerProdRelCfgId,
									"rstrType": this.leafData.rstrType,
									"relType": this.leafData.relType,
									"minNum": this.leafData.minNum,
									"maxNum": this.leafData.maxNum,
									"defaultCount": this.leafData.defaultCount,
									"discountValue": this.leafData.discountValue,
									"ifMarketingBinding": this.leafData.ifMarketingBinding,
									"firstMonDiscountValue": this.leafData.firstMonDiscountValue,
									"statusCd": this.statusCd,
									"updateStaff": this.createStaff,
									"createStaff": this.createStaff
								}).then(res => {
									console.log(res)
									if(res.data.success) {
										this.offerProdRelId = res.data.offeProdRel["0"].offerProdRelId
										this.getoffeProdRel()
										this.addleafFlag = true
										this.tableafDefault = val
										this.GetOfferProdAttrValRest()
										this.$message.success({ message: '保存成功！' });
									} else {
										this.$message.error({ message: '保存失败！' });
									}
								}).catch(error => {
									this.$message.error({ message: '保存失败！' });
								})
							}
						})
					} else {
						this.tableafDefault = val;
						this.GetOfferProdAttrValRest()
					}
				} else if(val == "leafbasic") {
					this.tableafDefault = val;
				}

			},
			//更多信息
			tabmoreChange(val, item) {
				console.log('555')
				if(val == 'morebasic') {
					this.$set(item, 'tabmoreDefault', val)
				} else if(val == 'moreworkflow') {
					this.offerProdRelId = item.offerProdRelId
					this.offerProdService()
					this.$set(item, 'tabmoreDefault', val)
				} else if(val == 'moreattr') {
					this.offerProdRelId = item.offerProdRelId
					this.GetOfferProdAttrValRest()
					this.$set(item, 'tabmoreDefault', val)
				}
			},
			//子产品更多信息
			moreleafChange(val) {
				if(val == 'moreleafbasic') {
					this.moreleafDefault = val
				} else if(val == 'moreleafattr') {
					this.offerProdRelId = this.offerProdChildRelId
					this.GetOfferProdAttrValRest()
					this.moreleafDefault = val
				}
			},
			moreleafDetail(val, index) {
				this.moreleafDefault = "moreleafbasic"
				this.moreleafIndex = index
				this.offerProdChildRelId = val.offerProdRelId
				this.offeProdleafRelDetail()
			},

			showChildClick(index) {
				if(this.goodsId === index) {
					this.goodsId = '';
				} else {
					this.goodsId = index;
				}
			},

			constituteInfo() {
				this.tabIndex = "1"
			},
			limitconstitute() {
				this.tabIndex = "2"
			},

			//销售品配置构成列表查询
			offerProdRelPages(page, prodName) {
				let offerIdArr = []
				offerIdArr.push(this.componentData.offerId)
				this.$axios.get(this.$api.replace(this.$api.OfferProdRelPage, ['{offerId}'], offerIdArr), {
					params: {
						parOfferProdRelId: 0,
						prodName: prodName,
						statusCd: this.statusCd,
						page: page,
						limit: this.qryConstitutePageObj.pageSize
					}
				}).then(res => {
					if(res.data.success) {
						if(res.data.offeProdRelPage.content) {
							this.qryordAttr = [...res.data.offeProdRelPage.content]
							this.qryConstituteList = [...res.data.offeProdRelPage.content]
						}
						console.log(this.qryordAttr)
						this.qryAttrPageObj.pageIndex = res.data.offeProdRelPage.page
						this.qryAttrPageObj.rowCount = res.data.offeProdRelPage.total
						this.qryConstitutePageObj.pageIndex = res.data.offeProdRelPage.page
						this.qryConstitutePageObj.rowCount = res.data.offeProdRelPage.total
					}
				}).catch(error => {

				})
			},
						
			//产品下的属性列表
            QryProductAttrValueDetail(pageIndex, pageSize) {
                this.$axios.get(this.$api.replace(this.$api.QryProductAttrDetail,['{prodId}','{prodAttrId}'],[this.prodObj.prodId,this.qureyAttrCheck.prodAttrId]), {
                    params: {
                        'prodId': this.prodObj.prodId,
                        "prodAttrId": this.qureyAttrCheck.prodAttrId,
                    }
                }).then(res => {
                    if(res.data.success) {
                        if(res.data.prodAttrs.prodAttrValues.content) {
                            this.qryProductAttrValueList = res.data.prodAttrs.prodAttrValues.content
                        }
                    }else{
                        this.$message.error({message:res.data.msg})
                    }
                    this.ProductAttrValueDetailPageObj = {
                        pageIndex:  res.data.prodAttrs.prodAttrValues.page,
                        pageSize: res.data.prodAttrs.prodAttrValueslimit,
                        rowCount: res.data.prodAttrs.prodAttrValuestotal
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },

            //产品下的属性值列表
            QryProductAttrDetail(pageIndex, pageSize) {
                this.$axios.get(this.$api.replace(this.$api.QryProdAttrList,['{prodId}'],[this.prodObj.prodId]), {
                    params: {
                        isAttrValue:0,
                        prodId: this.prodObj.prodId,
                        page: pageIndex,
                        limit: pageSize
                    }
                }).then(res => {
                    if(res.data.success) {
                        if(res.data.prodAttrs.content) {
                            this.qryProductAttrList = res.data.prodAttrs.content
                        }
                    }else{
                        this.$message.error({message:res.data.msg})
                    }
                    this.ProductAttrDetailPageObj = {
                        pageIndex: res.data.prodAttrs.page,
                        pageSize: res.data.prodAttrs.limit,
                        rowCount: res.data.prodAttrs.total
                    }

                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },
			moreProdAttr(val) {
				//let offerIdArr = []
				//offerIdArr.push(this.componentData.offerId)
				//offerIdArr.push(val.offerProdRelId)
				//offerIdArr.push(val.restrictId)
				this.$axios.get(this.$api.OfferGetList+'/'+ this.componentData.offerId +'/offerProdRel'+'/' + val.offerProdRelId +'/offerProdAttrValRest'+'/' + val.restrictId, {}).then(res => {
					if(res.data.success) {
						console.log(res,'更多')
						this.qryAttrValueList = res.data.offerProdAttrValRest
						this.$refs.seeAttr.show();
						/*if(res.data.offerProdAttrValRest.attrRestrictValues) {
							this.qryAttrValueList = res.data.offerProdAttrValRest.attrRestrictValues
							this.$nextTick(() => {
								this.$refs.seeAttr.show();
								this.$refs.leftDialog.removeClickEvent();
								this.$refs.leftLeafDialog.removeClickEvent();
							})
						}*/
					} else {

					}
				})
			},
			
			//根产品分页改变
			pageChange(val) {
				this.pageProductObj.pageIndex = val
				this.qureyProdList(this.pageProductObj.pageIndex, this.pageProductObj.pageSize, this.prodNbr, this.prodName, this.prodUseType)
			},
			pageLeafChange(val) {
				this.pageleafProductObj.pageIndex = val
				this.qureyProdList(this.pageleafProductObj.pageIndex, this.pageleafProductObj.pageSize, this.prodNbr, this.prodName, this.prodUseType)
			},
			pageAttrChange(val) {
				this.ProductAttrDetailPageObj.pageIndex = val
				this.QryProductAttrDetail(this.ProductAttrDetailPageObj.pageIndex, this.ProductAttrDetailPageObj.pageSize)
			},
			pageAttrValueChange(val) {
				this.ProductAttrValueDetailPageObj.pageIndex = val
				this.QryProductAttrValueDetail(this.ProductAttrValueDetailPageObj.pageIndex, this.ProductAttrValueDetailPageObj.pageSize)
			},
			pageServiceChange(val) {
				this.prodServiceObj.pageIndex = val
				this.prodService(this.prodObj.prodId, this.prodServiceObj.pageIndex, this.prodServiceObj.pageSize)
			},
			
			
			addConstitute(val) {
				let addConstituteObj = {
					'prodName': val.prodName,
					'offerProdRelId': val.offerProdRelId,
					'rstrType': '1000'
				}
				this.offerRstrSelectList.push(addConstituteObj)
			},
			
			
			//新增构成成员属性/修改构成成员属性
			postOfferProdAttr() {
				let attrRestrictValues = []
				for(let ele of this.qryProductAttrCheck) {
					let attrRestrictValuesObj = {
						"attrValueId": ele.attrValueId,
						"statusCd": this.statusCd,
						"createStaff": this.createStaff,
						"updateStaff": this.createStaff
					}
					attrRestrictValues.push(attrRestrictValuesObj)
				}
				let offerIdArr = []
				offerIdArr.push(this.componentData.offerId)
				offerIdArr.push(this.offerProdRelId)
				this.$axios.post(this.$api.replace(this.$api.PostOfferProdAttrValRest, ['{offerId}', '{offerProdRelId}'], offerIdArr), {
					"offerProdRelId": this.offerProdRelId,
					"attrId": this.qureyAttrCheck.attrId,
					"prodId": this.prodObj.prodId,
					"minValue": this.attrvalObj.minValue,
					"maxValue": this.attrvalObj.maxValue,
					"autoTrigger": this.attrvalObj.autoTrigger,
					"attrRestrictValues": attrRestrictValues,
					"createStaff": this.createStaff,
					"statusCd": this.statusCd,
					"updateStaff": this.createStaff
				}).then(res => {
					console.log(res.data)
					this.$refs.leftDialog.addClickEvent();
					this.$refs.leftLeafDialog.addClickEvent();
					if(res.data.success) {
						this.$message.success({ message: '保存成功！' });
						this.GetOfferProdAttrValRest()
					} else {
						this.$message.error({ message: '保存失败！' });
					}
				}).catch(error => {
					this.$message.error({ message: '保存失败！' });
				})
			},
			
			openNode(val) {
				this.offeProdRelDetail(val)
				this.prodOpenArray = []
				if(this.prodOpenArray.indexOf(val.offerProdRelId) > -1) {
					this.prodOpenArray = this.prodOpenArray.filter(item => item != val.offerProdRelId);
				} else {
					this.prodOpenArray.push(val.offerProdRelId);
				}
			},
			prodIsOpen(val) { //是不是展开
				return this.prodOpenArray.indexOf(val.offerProdRelId) > -1;
			},

		}
	}
</script>

<style scoped lang="scss">
	.app__top{
		margin-top: 10px;
	}
	/*弹框容器*/
	
	.dialog-box {
		padding: 0 30px;
	}
	
	.attr-value {
		padding-top: 20px;
	}

	/*清除浮动*/
	
	.clearfix:after {
		visibility: hidden;
		display: block;
		font-size: 0;
		content: " ";
		clear: both;
		height: 0;
	}
	
	.clearfix {
		*zoom: 1;
	}
	
	//构称信息
	.constitute {
		width: 100%;
		.radio-nofirst {
			margin-left: 20px;
		}
		.checkbox-nofirst {
			margin-left: 20px;
		}
		/*操作按钮*/
		.h-a-add {
			position: absolute;
			top: 10px;
			left: 135px;
			height: 30px;
		}
		.a-h-add {
			padding: 5px 0;
		}
		/*表头样式*/
		.v-t-title {
			color: #333;
			font-weight: bold;
			background-color: #f5fafd;
			border-top: 1px solid $mainColor;
			text-align: center;
		}
		//成员类表
		.info-list {
			.tab-tbody {
				.col {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
					button {
						border: none;
						outline: none;
						font-size: 12px;
						color: $mainColor;
						background-color: transparent;
						cursor: pointer;
					}
				}
				//子集列表
				.child-list {
					background-color: white;
					padding-left: 0;
					.v-t-title {
						border: none;
					}
					.borderline {
						width: 10px;
						height: 40px;
						border-bottom: 1px dashed #CCCCCC;
						border-left: 1px dashed #CCCCCC;
						float: left;
						margin-top: -20px;
						margin-left: 5px;
					}
				}
				/*展开*/
				.col-show {
					overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
					i {
						display: inline-block;
						width: 10px;
						height: 10px;
						background: url("./images/bgsq.png") no-repeat;
						background-size: cover;
						cursor: pointer;
					}
					i.show2 {
						background: url("./images/bgsq.png") no-repeat;
						background-size: cover;
					}
				}
				/*收起*/
				.col-hide {
					font-size: 14px;
					color: $mainColor;
					i {
						display: inline-block;
						width: 14px;
						height: 14px;
						background: url("./images/hide-icon.png") no-repeat;
						background-size: cover;
						cursor: pointer;
					}
				}
			}
		}
		//添加根产品
		.add-parent {
			padding-left: 30px;
			//头部
			.l-d-header {
				padding-top: 10px;
				i {
					float: left;
					width: 14px;
					height: 14px;
					margin-top: 4px;
					margin-right: 10px;
					background: url("./images/add-icon.png") no-repeat;
					background-size: cover;
				}
				span {
					color: #222222;
					font-size: 16px;
				}
				button {
					float: right;
					width: 60px;
					height: 30px;
					margin-right: 50px;
					border: none;
					outline: none;
					font-size: 12px;
					color: white;
					background-color: $mainColor;
					border-radius: 4px;
					cursor: pointer;
				}
			}
			//选择产品
			.search {
				span {
					color: #222222;
					font-size: 14px;
				}
				/*下拉框*/
				.select {
					display: inline-block;
					width: 200px;
					margin-right: 10px;
					z-index: 2;
				}
				button {
					width: 60px;
					height: 30px;
					margin-right: 50px;
					border: none;
					outline: none;
					font-size: 12px;
					color: white;
					background-color: $mainColor;
					border-radius: 4px;
					cursor: pointer;
				}
			}
			/*tab导航*/
			.nav-tab {
				padding-top: 10px;
				font-size: 0; //去除空隙
				span {
					display: inline-block;
					width: 80px;
					height: 30px;
					color: #999999;
					line-height: 30px;
					text-align: center;
					font-size: 12px;
					cursor: pointer;
				}
				.active {
					position: relative;
					top: 3px;
					z-index: 1;
					border: solid 1px #f0f0f0;
					border-bottom: none;
					border-top: solid 2px $mainColor;
					color: $mainColor;
					background-color: white;
				}
			}
			//导航列表盒子
			.nav-box {
				padding: 10px;
				border: solid 1px #f0f0f0;
				//添加按钮
				//加载更多
				.add-more {
					width: 100%;
					margin-top: 6px;
					text-align: center;
					span {
						font-size: 14px;
						color: $mainColor;
						cursor: pointer;
					}
				}
				.base-info {
					padding-top: 20px;
				}
				//一次性费用
				.once-money {
					//最新价格
					.col {
						input {
							width: 50%;
							height: 24px;
							outline: none;
						}
					}
				}
			}
		}
		//添加限制构称信息弹框
		.add-limit,
		.add-flow,
		.add-once-money,
		.add-attr2 {
			.title-select {
				width: 100%;
				font-size: 14px;
				color: #a0d468;
				margin-bottom: 10px;
			}
			.col {
				.select {
					width: 50%;
					margin-left: 25%;
					/deep/ .select-input {
						height: 24px;
					}
				}
				i.add {
					display: inline-block;
					width: 16px;
					height: 16px;
					background: url("./images/dialog-add.png") no-repeat;
					background-size: cover;
					cursor: pointer;
				}
				i.del {
					display: inline-block;
					width: 16px;
					height: 16px;
					background: url("./images/dialog-del.png") no-repeat;
					background-size: cover;
					cursor: pointer;
				}
			}
		}

		
	}
	
	.tabcol {
		text-align: center;
		margin: 30px 0;
		.tabbtn {
			width: 185px;
			height: 40px;
			height: 40px;
			background-color: #fff;
			color: #777;
			font-family: MicrosoftYaHei-Bold;
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			border: solid 1px #f6f7f9;
			text-align: center;
			outline: none;
			cursor: pointer;
			&.active {
				background-color: $mainColor;
				color: #fff;
			}
			&:hover {
				background-color: $mainColor;
				color: #fff;
			}
			&.active:hover {
				opacity: .8;
			}
		}
	}
	
	.span {
		padding: 0 5px;
		cursor: pointer;
	}
	
	.basic-info {
		padding: 20px 0;
	}
	
	
	.item_icon_delete {
		position: absolute;
		top: -5px;
		right: 20px;
		cursor: pointer;
		font-style: normal;
	}
	
	em {
		margin-right: 5px;
		color: #eb4a1e;
		font-size: 12px;
		font-weight: bold;
		vertical-align: middle;
	}
	
	
	
	.scroll.moreScroll {
		height: calc(100% - 135px);
	}
	
	.offCol {
		position: relative;
		background-color: #f6f7f9;
		margin-left: 10px;
		margin-top: 10px;
		cursor: pointer;
		.offIndex {
			position: absolute;
			top: -10px;
			left: -10px;
			width: 40px;
			height: 40px;
			text-align: center;
			background-color: $mainColor;
			font-family: MicrosoftYaHei-Bold;
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 40px;
			letter-spacing: 0px;
			color: #ffffff;
		}
		.offProdname {
			font-family: MicrosoftYaHei-Bold;
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 40px;
			letter-spacing: 0px;
			color: #333333;
			text-indent: 40px;
		}
		.offToggle {
			position: absolute;
			top: 10px;
			right: 20px;
			width: 10px;
			height: 10px;
			background: url(images/zhankai.png) no-repeat center;
			background-size: 10px 10px;
			&.active {
				background: url(images/shousuo.png) no-repeat center;
				background-size: 10px 10px;
			}
		}
	}
	
	.offColcontent {
		padding: 20px;
	}
	
	.moreleafRowcol {
		border-bottom: 2px solid $mainColor;
	}
	
	.moreleafcol {
		cursor: pointer;
		width: 100px;
		background-color: #dff1fc;
		border-radius: 6px 6px 0px 0px;
		margin-right: 10px;
		.moreleafIndex {
			width: 16px;
			height: 16px;
			background-color: #ffffff;
			border-radius: 50%;
			font-family: MicrosoftYaHei-Bold;
			font-size: 12px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 16px;
			margin: 12px 5px 12px 15px;
			letter-spacing: 0px;
			color: $mainColor;
			text-align: center;
			float: left;
		}
		.moreleafname {
			float: left;
			width: 48px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-family: MicrosoftYaHei-Bold;
			font-size: 12px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 40px;
			letter-spacing: 0px;
			color: $mainColor;
		}
		&.active {
			background-color: $mainColor;
			.moreleafIndex {
				background-color: #ffffff;
				color: $mainColor;
			}
			.moreleafname {
				color: #ffffff;
			}
		}
	}
	
	.moreleafcolcon {
		padding-top: 20px;
	}
	.app__table__inner {
        .no-wrap {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
	
</style>