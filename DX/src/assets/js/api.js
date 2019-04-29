//测试环境接口前缀
import serverConfig from './server.js';

let curServer = BUILD_SERVICE_CONFIG ? serverConfig[BUILD_SERVICE_CONFIG] : serverConfig['default'],
	apiServer = curServer.apiServer,
	flowImgServer = curServer.flowImgServer,
	windowOpenServer = curServer.windowOpenServer,

	//销售品组 | 目录 | 服务提供 | 渠道 | 标签 | 营销资源 | 资费模板
	apiBasic = `${apiServer}/cpcbizbasic`,
	//需求单 | 流程
	apiRequirement = `${apiServer}/cpcbizrequirement`,
	//权限
	apiStorage = `${apiServer}/cpcweb`,
	//cpc
	apiCpc = `${apiServer}/cpcbiz`,
	//产品列表相关
	apiProd = `${apiServer}/cpcbizproduct`,
	//销售品列表相关
	apiGoods = `${apiServer}/cpcbizoffer`,
	//销售品视图列表相关
	apiGoodsView = `${apiServer}/cpcbizofferview`,
	//标签
	apiGoods1 = `${apiServer}/cpcbizlabel`,
	//主数据相关
	apiCpcdata = `${apiServer}/cpcbizmetadata`,
	//  商品导出
	apiCpcweb = `${apiServer}/cpcweb`,
	//同步
    apiGroup = `${apiServer}/cpcbizgroup`,
    //流程
    apiProcess = `${apiServer}/bpmn`;

//接口成功返回状态码
let successCode = '';

export default {
	replace(Url, val1, val2) {
		for(let i = 0; i < val1.length; i++) {
			Url = Url.replace(val1[i], val2[i])
		}
		return Url
	},
	//公共路径
	url: '../',
	//流程图地址
	FlowImgPath: flowImgServer,
	//打开新窗口
	WindowOpenServer: windowOpenServer,
	//功能临时路径
	funPath: `${window.location.origin}/oldpages/pages/`,
	// 权限
	GetUserStorage: apiStorage + '/userAuth/systemUserAuthentication',
	// OA权限
	GetUserStorageCache: apiStorage + '/userAuth/systemUserAuthenticationCache',
	//销售品标签配置列表查询
	GetObjectLabelRel: apiGoods + "/ordOffer/{offerId}/objectLabelRel",
	//标签列表查询
	GetLabel: apiBasic + "/label/getLabelPageList",
	//**************************************组合销售品*********************************************//
	//	组合销售品成员销售品查询
	GrpOfferMember: apiGoods + "/ordOffer/{offerId}/grpOfferMember",
	//组合销售品成员销售品视图查询
	SeeGrpOfferMember: apiGoodsView + "/offer/{offerId}/grpOfferMember",
	//	2.1.销售品配置列表查询
	OrdOffer: apiGoods + "/ordOffer",

	//	2.1.销售品配置列表查询(包含工作流状态)
	OfferManage: apiGoods + '/ordOffer/offerManage',

    //	销售品复制接口
    OfferCopy: apiGoods + "/ordOffer/offerCopy",
    //	销售品升版和绑定
    OfferUpgrade: apiGoods + "/offer/offerUpgrade",

	// 新增需求单成员

	//	销售品组列表查询(分页)
	OfferGrp: apiBasic + "/offerGrp",
	//*************************************关联包***********************************************//
	//	关联包关联销售品查询
	RelationOfferRel: apiGoods + "/ordOffer/{offerId}/relationOfferRel",
	//关联包关联销售品视图查询
	SeeRelationOfferRel: apiGoodsView + "/offer/{offerId}/relationOfferRel",
	//关联关系导入模板下载
	OfferRelDownload: apiCpcweb + "/offerRelDownload",
	//关联关系导入
	OfferRelImport: apiCpcweb + "/offerRelImport",
	//属性全视图-查询属性列表
	QryAttrSpecList: apiCpc + "/cpccenter/bizservice/attrspec/qryAttrSpecList",
	//2.4.新增属性
	AttrSpecCFG: apiCpc + "/cpccenter/bizservice/attrspec/createOrdAttrSpec",
	// 2.2.查询属性过程表详情 
	AttrSpecCFGDetail: apiCpc + "/cpccenter/bizservice/attrspec/qryOrdAttrSpecDetail",
	//属性发布
//	ReleaseAttrSpec: apiCpc + "/cpccenter/bizservice/attrspec/releaseAttrSpec",

	//*********************目录******************************************//

	//目录全视图详情
	QryCatalogDetail: apiCpc + "/cpccenter/bizservice/catalog/qryCatalogDetail",

	//*********************需求单******************************************//
	//需求单列表查询
	QureyRequirementList: apiRequirement + "/requirement",
	//需求单详情查询/修改/删除
	QureyRequirementTask: apiRequirement + "/requirement/{requirementId}",
	// 给销售品关联一条需求单
	AddRequirementMem: apiRequirement + "/requirement/{requirementId}/requestMember",
	// 需求单成员列表查询
	GetRequestMemberList: apiRequirement + "/requirement/{requirementId}/requestMember/getRequestMemberList",
	// 删除需求单成员
	DelRequirementRow: apiRequirement + "/requirement/{requirementId}/requestMember/{requestMemberId}",
	//删除需求单成员（产品）
    DelRequirementProduct: apiRequirement + '/requirement/{requirementId}/requestMember/delRequestMember',
    //拆分需求单
    SplitRequirement : apiRequirement + '/requirement/requirementSplit',
    //无需求单反馈
    AutomaticFeedback : apiRequirement + '/requirement/automaticFeedback',
	// 新增需求单成员
	// AddRequirement: apiRequirement + "/requirement/{requirementId}/requestMember",

	//*********************销售品基本信息******************************************//
	//销售品配置基本信息查询
	OfferBasic: apiGoods + "/ordOffer/{offerId}/offerBasic",
	//销售品配置新建销售品
	NewProperty: apiGoods + "/ordOffer",

	//*********************配置营销资源******************************************//
	//*********************销售品测试验证******************************************//
	//销售品业务测试记录查询
	OfferBussTest: apiGoods + "/ordOffer/{offerId}/offerBussTest",

	//2.63. 销售品关联营销资源配置列表查询
	GetOfferResRel: apiGoods + "/ordOffer/{offerId}/offerResRel",
	//2.1.  营销资源列表查询(分页)
	GetMktResource: apiBasic + "/mktResource",
	//2.2.  营销资源组列表查询(分页)
	GetMktResGrp: apiBasic + "/mktResGrp",
	// 2.3.	营销资源类别树查询:
	GetMktResTypeTree: apiBasic + "/mktResTypeTree",
	//2.63. 销售品关联营销资源配置
	PostOfferResRel: apiGoods + "/ordOffer/{offerId}/offerResRel",

	//****************************资费定价**********************************//
	// 模板类别树状查询
	TemplateTypeTree: apiBasic + "/templateTypeTree",
	// 资费模板列表查询
	TariffTemplateList: apiBasic + "/tariffTemplate",
	// 资费模板详情
	TariffTemplateDetail: apiBasic + "/tariffTemplate/{tariffTemplateId}",
	// 销售品资费模板实例配置
	TariffTemplateSave: apiGoods + "/ordOffer/{offerId}/offerTariff",

	//资费模板弹框单选内容列表查询
	GetClickDetail: apiBasic + "/tariffTemplate/getClickDetail",

	//  2.58.销售品关联销售品组关系配置查询
	OfferGrpRela: apiGoods + "/ordOffer/{offerId}/offerGrpRela",

	//  2.58.销售品关联销售品组关系配置查询
	OfferGrpRela: apiGoods + "/ordOffer/{offerId}/offerGrpRela",

	//	2.71.销售品关联渠道查询
	OfferChannelRel: apiGoods + "/ordOffer/{offerId}/offerChannelRel",
	//	2.3.渠道点分类树查询
	SalesType: apiBasic + "/salesType",
	//	2.4.渠道列表查询（分页）
	Channel: apiBasic + "/channel",
	//	销售品限制配置（包括关联渠道，上市系统及销售品约束的保存配置均使用这个接口）
	OfferRestrict: apiGoods + "/ordOffer/{offerId}/offerRestrict",
	// 2.81.商品渠道策略查询及配置
	OfferChannelStrategy: apiGoods + '/ordOffer/{offerId}/offerChannelStrategy',
	//3.7佣金模板列表查询
	PolicyTemplate: apiGoods + '/policyTemplate',
	//3.8.	佣金规则列表查询
	PolicyRule: apiGoods + '/policyRule',
	//**********************************************************************************/
	//******************************主数据相关**************************************** */
	//组织列表查询
	Organization: 'http://bas.te.sh.ctc.com:8085/bas/manageprivbizapp/basicmancenter/bizservice/organization',
	//业务大类列表查询
	BusiType: apiCpcdata + '/ordBusiType',
	//新增业务大类
	OrdBusiType: apiCpcdata + '/ordBusiType',
	//配置业务大类（修改和删除）
	OrdBusiTypeDo: apiCpcdata + '/ordBusiType/{busiTypeId}',
	//业务大类发布
	ReleaseBusiType: apiCpcdata + '/ordBusiType/{busiTypeId}/releaseBusiType',
	//业务大类下架
	DownlineBusiType: apiCpcdata + '/busiType/{busiTypeId}/downlineBusiType',
	//业务大类升版
	RiseBusiType: apiCpcdata + '/ordBusiType/{busiTypeId}/riseBusiType',
	//查询业务大类历史
	GetOrdBusiTypeHistory: apiCpcdata + '/ordBusiType/{busiTypePublishId}/getOrdBusiTypeHistory',
	//主题域过程表列表查询
	OrdSysDomain: apiCpcdata + '/ordSysDomain',
	//主题域新增
	AddOrdSysDomain: apiCpcdata + '/ordSysDomain',
	//主题域配置
	OrdSysDomainDo: apiCpcdata + '/ordSysDomain/{domainId}',
	//主题域发布
	ReleaseSysDomain: apiCpcdata + '/ordSysDomain/{domainId}/releaseSysDomain',
	//主题域升版
	RiseSysDomain: apiCpcdata + '/ordSysDomain/{domainId}/riseSysDomain',
	//查询主题域历史
	GetOrdSysDomainHistory: apiCpcdata + '/ordSysDomain/{sysDomainPublishId}/getOrdSysDomainHistory',
	//主题域列表查询
	SysDomain: apiCpcdata + '/sysDomain',
	//主题域下架
	DownlineSysDomain: apiCpcdata + '/sysDomain/{domainId}/downlineSysDomain',
	//主题域树查询过程
	GetOrdSysDomainTree: apiCpcdata + '/ordSysDomain/getSysDomainTree',
	//主题域树查询正式
	GetSysDomainTree: apiCpcdata + '/sysDomain/getSysDomainTree',
	//服务提供配置（查询过程列表，新增，修改）
	OrdServiceOffer: apiBasic + '/ordServiceOffer',
	//过程表服务提供列表查询
	GetServiceOfferList: apiBasic + '/ordServiceOffer/getServiceOfferList',
	//删除服务提供
	DelServiceOffer: apiBasic + '/ordServiceOffer/{serviceOfferId}',
	//升版服务提供
	TopServiceOffer: apiBasic + '/ordServiceOffer/{serviceOfferId}/upgrede',
	//服务提供历史查询
	GethistoryOrdServiceOffer: apiBasic + '/ordServiceOffer/historyOrdServiceOffer',
	//服务提供列表查询
	ServiceOffer: apiBasic + '/serviceOffer',
	//根据服务提供ID查询服务
	GetIdServiceOffer: apiBasic + '/serviceOffer/{serviceOfferId}',
	//服务提供下架
	OfflineService: apiBasic + '/serviceOffer/{serviceOfferId}/offline',
	//发布服务提供
	ReleaseService: apiBasic + '/serviceOffer/{serviceOfferId}/release',
	//根据服务编码号查询
	GetNbrService: apiBasic + '/serviceOffer/serviceOfferNbr',

	//正式表
	//查询业务对象
	GetbusiObj: apiCpcdata + '/busiObj',
	//获取单个业务对象
	GetOnlybusiObj: apiCpcdata + '/busiObj/{busiObjId}',
	//业务对象下架
	OfflinebusiObj: apiCpcdata + '/busiObj/{busiObjId}/offline',
	//发布业务对象
	ReleasebusiObj: apiCpcdata + '/busiObj/{busiObjId}/release',
	//批量查询业务对象
	QuerybusiObj: apiCpcdata + '/busiObj/query',
	//查询业务对象属性
	GetbusAttr: apiCpcdata + '/busiObjAttr',
	//通过属性ID集合查询业务对象属性组合信息
	GetbusiObjAttrDetails: apiCpcdata + '/busiObjAttr/busiObjAttrDetails',
	//查询业务对象属性值
	GetbusiObjAttrValue: apiCpcdata + '/busiObjAttrValue',
	//通过属性值ID集合查询业务对象属性值组合信息
	GetbusiObjAttrValueDetails: apiCpcdata + '/busiObjAttrValue/busiObjAttrValueDetails',
	//业务对象属性详情
	GetBusiObjAttr: apiCpcdata + '/ordBusiObj/{busiObjId}',
	//过程表
	//配置业务对象属性（删增改查）
	OrdBusiObjAttr: apiCpcdata + '/ordBusiObjAttr',
	//配置业务对象属性值（删增改查）
	OrdBusiObjAttrValue: apiCpcdata + '/ordBusiObjAttrValue',
	//配置业务对象（查，增，改）
	OrdBusiObj: apiCpcdata + '/ordBusiObj',
	//删除业务对象
	DelBusiObj: apiCpcdata + '/ordBusiObj/{busiObjId}',
	//升版业务对象
	UpgredeBusiObj: apiCpcdata + '/ordBusiObj/{busiObjId}/upgrede',
	//业务对象树查询
	GetOrdBusiObjTree: apiCpcdata + '/ordBusiObj/getOrdBusiObjTree',
	//属性列表查询
	Attrspec: apiCpcdata + '/attrspec',
	//属性详情查询
	AttrSpecMore: apiCpcdata + '/attrspec/{attrId}',
	//业务对象属性详情配置
	AddOrdBusiObjAttrDetail: apiCpcdata + '/ordBusiObjAttr/addOrdBusiObjAttrDetail',

	//属性配置接口
	//属性新增和查询
	OrdAttrSpec: apiCpcdata + '/ordAttrSpec',
	//属性详情查询 修改  删除
	OrdAttrSpecDo: apiCpcdata + '/ordAttrSpec/{attrId}',
	//属性发布
	ReleaseAttrSpec: apiCpcdata + '/ordAttrSpec/{attrId}/releaseAttrSpec',
	//属性升版
	RiseCatalog: apiCpcdata + '/ordAttrSpec/{attrId}/riseCatalog',
	//属性下架
	DownlineAttrSpec: apiCpcdata + '/attrspec/{attrId}/downlineAttrSpec',
	//属性详情配置
	AddOrdAttrSpecDetailA: apiCpcdata + '/ordAttrSpec/addOrdAttrSpecDetail',
	//属性值列表查询和新增
	OrdAttrValue: apiCpcdata + '/ordAttrSpec/{attrId}/ordAttrValue',
	//属性值修改和删除
	OrdAttrValueDo: apiCpcdata + '/ordAttrSpec/{attrId}/ordAttrValue/{attrValueId}',
	//属性详情配置
	AddOrdAttrSpecDetail: apiCpcdata + '/ordAttrSpec/addOrdAttrSpecDetail',

	//************************************************************************************************* */

	//********************************销售品服务事件********************************** */
	//2.3.2.	图表根据事件场景ID查询详情接口
	OfferEvtSceChartDetail: apiGoods + '/ordOffer/offerEvtSceChartDetail',
	//2.2.1.	页面查询全量目录分类接口
	OfferCatalogRel: apiGoods + '/offerCatalogRel',
	//2.3.1.	图表查询已选服务事件映射接口
	OfferEvtSceChartRel: apiGoods + '/ordOffer/{offerId}/offerEvtSceChartRel',
	//2.1.1.	销售品服务事件关联列表接口
	OfferEvtSceRel: apiGoods + '/ordOffer/{offerId}/offerEvtSceRel',
	//2.2.2.	页面查询服务事件列表接口
	OfferEvtSceQry: apiGoods + '/offerEvtSceQry',
    //2.1.	服务提供配置目录
    QueryServiceOffer:apiGoods + '/ordOffer/queryServiceOffer',
    //
	//********************************************************************************/

	//*********************************销售品标签*************************************//
	//销售品标签配置列表查询
	ObjectLabelRel: apiGoods + "/ordOffer/{offerId}/objectLabelRel",
	ModObjectLabelRelJt:  apiGoods + "/ordOffer/{offerId}/modObjectLabelRelJt",
	OrdObjectLabelRelView: apiGroup + '/ordOffer/{offerId}/OrdObjectLabelRelView',

	//	2.2.标签模板详情
	Label: apiBasic + "/label/{labelId}",
	LabelValue: apiGoods + "/ordOffer/labelValue",
	
    GetRelationOfferRel: apiGoods + "/ordOffer/{offerId}/getObjectLabelRelList",
    
    //根据销售品查询成员角色
    OfferObjRelRoleName : apiGoods + '/offer/{offerId}/offerObjRelRoleName',

	// 客户标签列表
	LabelList: apiBasic + "/label",
	// 业务规则列表(分页)
	BusinessList: apiGoods + "/ordOffer/busiRule",
	// 业务规则实例列表查询 / 新增
	BusinessRule: apiGoods + "/ordOffer/{offerId}/offerRuleRel",
	// 业务规则删除
	BusinessRuleDel: apiGoods + "/ordOffer/{offerId}/offerRuleRel/{offerRuleRelId}",

	//  销售品视图列表查询
	OfferGetList: apiGoodsView + "/offer",
	//  销售品视图外延参数信息查询
	OfferViewEpSt: apiGoodsView + "/offer/offerViewEpitaxialParameterStatistics",
	//  销售品视图外延参数信息查询
	OfferViewEpSt2: apiGoodsView + "/offer/offerViewEpitaxialParameterStatistics2",
	//  销售品视图外延分渠道统计查询
    OfferViewChSt: apiGoodsView + "/offer/offerViewChannelStatistics",
    //1.1.	销售品视图按区局统计
    OfferViewAreaStatistics:apiGoodsView + '/offer/offerViewAreaStatistics',
	//*********************************销售品标签*************************************//
	//销售品标签配置列表查询
	GetRelationOfferRel: apiGoods + "/ordOffer/{offerId}/objectLabelRel",
	//*****************************销售品构成成员信息*********************************//
	//构成关系页面查询
    GetOffeProdRel: apiGoods + "/ordOffer/{offerId}/offerProdRel",
    //构成关系页面查询（全视图）
    GetOffeProdRelView: apiGoodsView + "/offer/{offerId}/offerProdRel",
	//销售品信息基本查询销售品视图
	OfferBasicView: apiGoodsView + "/offer/{offerId}/offerBasic",
	//新增销售品配置构成成员
	PostOfferProdRel: apiGoods + "/ordOffer/{offerId}/offerProdRel",
	//修改销售品配置构成成员
	PutOfferProdRel: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}",
	//删除销售品配置构成成员
	DeleteOfferProdRel: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}",
	//产品树查询
	GetOfferObjRelRole: apiGoods + "/offer/{offerId}/offerObjRelRole",
	//销售品配置构成成员业务流程约束查询
	OfferProdServiceRstr: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdServiceRstr",
	//	OfferProdServiceRstr: apiGoods2 + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdServiceRstr",
	//销售品配置构成成员业务流程约束配置
	PostOfferProdServiceRstr: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdServiceRstr",
	//	PostOfferProdServiceRstr: apiGoods2 + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdServiceRstr",
	//删除商品配置构成排除的业务流程约束
	DelOfferProdServiceRstr: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdServiceRstr/{offerProdServiceRstrCfgId}",
	//	DelOfferProdServiceRstr:apiGoods2 + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdServiceRstr/{offerProdServiceRstrCfgId}",
	//一次性费用列表查询
	DisposableFee: apiGoods + "/disposableFee",
	//销售品配置构成关系列表查询
	OfferProdRelPage: apiGoods + "/ordOffer/{offerId}/offerProdRelPage",
	//销售品配置构成成员一次性费用配置查询
	GetOfferProdDisposableFee: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdDisposableFee",
	//2.18.	配置销售品配置构成成员一次性费用配置
	PostOfferProdDisposableFee: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdDisposableFee",
	//  查询产品列表
	QureyProdList: apiProd + "/product",
	// 配置虚拟产品组
	UpdateOfferProdRelCfg : apiGoods + "/ordOffer/{offerId}/updateOfferProdRelCfg",

	//***********************构成信息***********************************//
	//产品查询根产品列表
	QureyOrdParProdList: apiProd + "/ordProduct/{prodId}/parProduct",
	//基础销售品资费定价保存
	QueryBaseOfferTariff: apiGoods + "/ordOffer/{prodId}/baseOfferTariff",
	//基础销售品资费定价配置
	ConfigBaseOfferTariff: apiGoods + "/ordOffer/{prodId}/baseOfferTariff",
	//模板类别树状查询
	templateTypeTree: apiBasic + "/templateTypeTree",
	//资费模板列表查询(分页)
	tariffTemplateList: apiBasic + "/tariffTemplate",
	//资费模板详情
	QueryTarifftemplate: apiBasic + "/tariffTemplate/{tariffTemplateId}",
	//需求单产品树
	QureyOrdProdTree: apiProd + "/ordProdTree",
	//查询产品过程列表
	QureyOrdRequirementProdList: apiProd + "/ordProduct",
	//查询产品基本信息（过程表）
	QryOrdProductBasicInfo: apiProd + "/ordProduct/{prodId}",
	//新建需求单产品
	AddRequirementProduct: apiProd + "/ordProduct",
	//需求单产品关系详情查询
	QryOrdProdRelDetail: apiProd + "/ordProduct/qryOrdProdRelDetail",
	//需求单产品属性详情查询
	QryOrdProductAttrDetail: apiProd + "/ordProduct/{prodId}/prodAttr",
	//保存需求单产品关系
	ModRequirementProductRel: apiProd + "/ordProduct/{prodId}/prodRel",
	//产品关系角色树状产线
	QryProdRelRoleTree: apiProd + "/cpccenter/bizservice/product/qryProdRelRoleTree",
	//需求单产品属性保存
	ModRequirementProductAttr: apiProd + "/ordProduct/{prodId}/ordProdAttr",
	//需求单产品服务提供关系详情查询
	QryOrdProdServiceOfferRel: apiProd + "/ordProduct/qryOrdProdServiceOfferRel",
	//保存需求单产品服务提供关系
	ModProductServiceOfferRel: apiProd + "/ordProduct/{prodId}/prodServiceOfferRel",
	// 保存需求单产品基本信息
	ModProductBasicInfo2: apiProd + "/ordProduct/{prodId}",
	// 上架平台信息列表查询
	QryPlatInfo: apiProd + "/platInfo",
	// 需求单产品服务标准查询（外部）
	QryOrdProdServiceStandard: apiProd + "/ordProduct/{prodId}/ProdServiceStandard",
	// 需求单产品服务标准配置（保存）
	ModProdServiceStandard: apiProd + "/ordProduct/{prodId}/prodServiceStandard",
	// 服务标准列表查询（弹框内）
	QrySericeStandard: apiProd + "/sericeStandard",
	//服务过程提供列表查询(全视图)
	QryServiceOfferList: apiCpc + "/cpccenter/bizservice/serviceOffer/qryServiceOfferList",
	//服务过程提供列表查询(配置)
	QryOrdServiceOfferList: apiCpc + "/cpccenter/bizservice/serviceOffer/qryOrdServiceOfferList",
	//查询属性过程表列表
	AttrSpecCFGList: apiCpc + "/cpccenter/bizservice/attrspec/qryOrdAttrSpecList",

	//  产品基本信息查询
	QryProductBasicInfo: apiProd + "/porduct/{prodId}",
	//  产品关系详情查询
	QryProdRelDetail: apiProd + "/porduct/qryOrdProdRelDetail",
	//  产品服务提供（业务流程）关系详情查询
	QryProdServiceOfferRel: apiProd + "/product/qryOrdProdServiceOfferRel",
	//  产品服务标准查询
	QryProdServiceStandard: apiProd + "/porduct/{prodId}/ProdServiceStandard",
	//  产品树状展示查询
	QureyProdTree: apiProd + "/prodTree",
	//需求单产品成员列表
	QureyOrdProdMember: apiProd + '/ordProduct/qureyOrdProdMember',

	//2.49.	销售品促销优惠配置界面查询
	Promotion: apiGoods + "/ordOffer/{offerId}/promotion",
	//3.5.	配置能力模板列表查询
	procModePage: apiGoods + "/procModePage",
	//3.6.	配置能力模板详情查询
	ProcMode: apiGoods + "/procMode/{procModeId}",
	//2.51.	销售品促销优惠配置界面新增
	AddPromotion: apiGoods + "/ordOffer/{offerId}/promotion",
	//2.50.	销售品促销优惠实例详情查询
	PromotionDetail: apiGoods + "/ordOffer/{offerId}/promotion/{procModeInstId}",
	//2.52.	销售品促销优惠配置界面修改
	EditPromotion: apiGoods + "/ordOffer/{offerId}/promotion/{procModeInstId}",
	//	2.53.删除销售品促销优惠实例
	DeletePromotion: apiGoods + "/ordOffer/{offerId}/promotion/{procModeInstId}",

	//	销售品配置规则页面查询
	OfferRule: apiGoods + "/ordOffer/{offerId}/offerRule",
	//	销售品配置关联服务提供（业务流程）列表查询
	OfferServiceRel: apiGoods + "/ordOffer/{offerId}/offerServiceRel",
	//	业务流程列表
	QryServiceList: apiCpc + "/cpccenter/bizservice/serviceOffer/qryServiceOfferList",
	//	同步CRM
	QryToPpm: apiGroup + "/offerToPpm",
	//	同步计费
	QryToAbp: apiGroup + "/createOfferToAbp",

	//	销售品配置关系列表查询
	OfferRel: apiGoods + "/ordOffer/{offerId}/offerRel",
	//	销售品配置关系视图列表查询
	SeeOfferRel: apiGoodsView + "/offer/{offerId}/offerRel",
	//	销售品配置列表查询
	Offer: apiGoods + "/ordOffer",
	//	配置销售品关系
	ConfigOfferRel: apiGoods + "/ordOffer/{offerId}/offerRel",
	//	删除销售品关系
	DeleteOfferRel: apiGoods + "/ordOffer/{offerId}/offerRel/{offerRelId}",
	//批量删除销售品关系
	DeleteOfferRelMore: apiGoods + "/ordOffer/{offerId}/offerRel",
	//	销售品配置关系详情查询
	OfferRelDetail: apiGoods + "/ordOffer/{offerId}/offerRel/{offerRelId}",
	//导出
	OfferRelExport: apiCpcweb + "/ordOffer/{offerId}/exportOrdOfferRel?statusCd=1000",

	/************************销售品属性**************************/
	// 销售品配置属性列表查询
	QueryAttribute: apiGoods + "/ordOffer/{offerId}/offerAttr",
	// 删除属性列表
	DelAttrbuteList: apiGoods + "/ordOffer/{offerId}/offerAttr/{offerAttrId}",
	//新增销售品配置构成约束配置
	PostOfferRstrGrp: apiGoods + "/ordOffer/{offerId}/offerRstrGrp",
	//销售品配置构成约束配置详情查询
	OfferRstrGrp: apiGoods + "/ordOffer/{offerId}/offerRstrGrp/{offerRstrGrpId}",
	//修改销售品配置构成约束配置
	PutOfferRstrGrp: apiGoods + "/ordOffer/{offerId}/offerRstrGrp/{offerRstrGrpId}",
	//删除销售品配置构成约束配置
	DeleteOfferRstrGrp: apiGoods + "/ordOffer/{offerId}/offerRstrGrp/{offerRstrGrpId}",
    //产品属性列表详情查询
    QryProdAttrList:apiProd + '/product/{prodId}/prodAttr',
    //产品属性详情查询
    QryProductAttrDetail:apiProd + '/product/{prodId}/prodAttr/{prodAttrId}',
	//2.14.	商品构成成员属性限制列表查询
	GetOfferProdAttrValRest: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdAttrValRest",
	//	GetOfferProdAttrValRest: apiGoods2 + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdAttrValRest",
	//2.14.	商品构成成员属性限制详情查询
	GetOfferProdAttrValRestDetail: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdAttrValRest/{restrictId}",
	//	GetOfferProdAttrValRestDetail: apiGoods2 + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdAttrValRest/{restrictId}",
	//新增销售品配置成员属性限制约束
	PostOfferProdAttrValRest: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdAttrValRest",
	//	PostOfferProdAttrValRest: apiGoods2 + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdAttrValRest",
	//删除销售品配置成员属性限制约束
	DelOfferProdAttrValRest: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdAttrValRest/{restrictId}",
	//	DelOfferProdAttrValRest: apiGoods2 + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}/offerProdAttrValRest/{restrictId}",

	//删除销售品配置构成成员
	DeleteOfferProdRel: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}",

	//	2.72.销售品约束信息查询
	OfferRestricts: apiGoods + "/ordOffer/{offerId}/offerRestricts",
	//	2.72.销售品约束信息删除
	OfferRestrict: apiGoods + "/ordOffer/{offerId}/offerRestrict",
	//	销售品约束模板下载
	TemplateDownload: apiCpcweb + "/ordOffer/offerRestrict/templateDownload",
	//	2.82.销售品约束文件上传
	TemplateUpload: apiCpcweb + "/ordOffer/{offerId}/offerRestrict/templateUpload",

	//销售品配置构成关系详情查询
	offerProdRelDetail: apiGoods + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}",
	//	offerProdRelDetail: apiGoods2 + "/ordOffer/{offerId}/offerProdRel/{offerProdRelId}",
	// 查询已选上市系统2018-11-17
	OfferReleaseSysRel: apiGoods + "/ordOffer/{offerId}/offerReleaseSysRel",
	// 获取系统测试信息&&保存系统测试2018-11-17
	OfferSysTestScene: apiGoods + "/ordOffer/{offerId}/offerSysTestScene",

	//************* 工作流 *************//
	// 需求单成员列表查询
    RequirementList: apiRequirement + "/offer/list",
    // 需求单成员列表查询（分页）
    RequirementListPage: apiRequirement + "/requirement/{requirementId}/list",
	// 进度追踪列表
	FlowScheduleList: apiRequirement + '/offer/trace',
	// 办结查询节点
	TakeFlowSchedule: apiRequirement +'/task/nextTaskDetail',
	// 办结提交
	HandleSub: apiRequirement + '/task/complete',
	GetTaskDetail: apiRequirement + '/task/getTaskDetail',
	//流程图查询接口
    ShowPic: apiRequirement + '/showPic/{tenantId}/{processInstanceId}',
    
	//*********************************发布上市*************************************//
	//上市审批
	ReleaseApprovalInfo: apiGoods + '/ordOffer/{offerId}/releaseApprovalInfo',
	/**********************待办需求单***************************************/
	Dairequirement: apiRequirement + '/requirement/list',
	//销售品配置情况
	ConfigDetail: apiGoods + "/ordOffer/{offerId}/configDetail",
	//	附件上传接口
	PushDocumentObj: apiCpcweb + '/documentRel/pushDocumentObj',
	//	附件查询接口
    GetDocumentObjList: apiCpcweb + '/documentRel/getDocumentObjList',
    // 附件查询分页版本
    AttachmentUploadQueryPage:apiCpcweb + '/documentRel/attachmentUploadQueryPage',
	//	附件下载接口
	Shtelpaasstorage: apiCpcweb + '/documentRel/getDocumentFile?documentId=',
	//	附件删除接口
	DeleteDocumentRels: apiCpcweb + '/documentRel/deleteDocumentRels',
	//	商品导出
	ExportTemplate: apiCpcweb + '/ordOffer/exportTemplate?offerId=',

	//	需求单序列查询
	Seq: apiRequirement + '/requirement/getSequence',
	//*********************************目录配置*************************************//
	//目录列表接口、目录添加接口
	OrdCatalog: apiBasic + '/ordCatalog',
	//目录修改接口、目录删除接口、查询目录树
	OpeOrdCatalog: apiBasic + '/ordCatalog/{catalogId}',
	//目录发布接口
	ReleaseCatalog: apiBasic + '/ordCatalog/{catalogId}/releaseCatalog',
	//目录下架接口
	DownlineCatalog: apiBasic + '/catalog/{catalogId}/downlineCatalog',
	//目录升版接口
	RiseCatalog2: apiBasic + '/ordCatalog/{catalogId}/riseCatalog',
	//节点添加接口
	OrdCatalogItem: apiBasic + '/ordCatalog/{catalogId}/ordCatalogItem',
	//节点修改接口、节点删除接口
	ModOrdCatalogItem: apiBasic + '/ordCatalog/{catalogId}/ordCatalogItem/{catalogItemId}',
	//节点发布接口
	ReleaseCatalogItem: apiBasic + '/ordCatalog/{catalogId}/ordCatalogItem/{catalogItemId}/releaseCatalogItem',
	//节点下架接口
	DownlineCatalogItem: apiBasic + '/catalog/{catalogId}/catalogItem/{catalogItemId}/downlineCatalogItem',
	//节点升版接口
	RiseCatalogItem: apiBasic + '/ordCatalog/{catalogId}/ordCatalogItem/{catalogItemId}/riseCatalogItem',
	//*********************************目录配置end*************************************//
	//其他模块调用的正式表目录树接口
	Catalog: apiBasic + '/catalog',
	//	查询节点和组件数据
	GetNodeAndComponent: apiRequirement + '/flowNode/getNodeAndComponent',
	//销售品统计数量查询
    OfferCount: apiGoods + '/offerCount',
    //	查询节点附件类型控制（新增）
    GetNodeFile : apiRequirement + '/flowNode/getNodeFile',
    //查询销售品和产品分类类型控制
    GetAllNodeFile  : apiRequirement + '/flowNode/getAllNodeFile',
	//需求单角色接口
    GetRequirementRole:apiStorage + '/requirementRole',
    //需求单导出功能
    ExportTemplateForReq: apiStorage + '/ordOffer/exportTemplateForReq',
//*********************************流程定义*************************************//

    //获取流程定义分页数据
    GetPageProcessDefineList: apiProcess + '/processManage/processDefine/getPageProcessDefineList',
    //查询一个流程定义的所有的节点（包括自定义属性）
    QryProcessDefinitionUserTaskLisQ:apiProcess + '/processManage/processDefine/qryProcessDefinitionUserTaskList',
    //平台名称下拉列表（获取平台列表）
    GetPlatformList : apiProcess + '/basicManage/platform/getPlatformList',
    //中心名称下拉列表（获取中心列表）
    GetCenterList : apiProcess + '/basicManage/center/getCenterList',
    //业务类型下拉列表（获取业务类型列表）
    GetBusinessTypeList : apiProcess + '/basicManage/businessType/getBusinessTypeList',
    //流程定义分页列表
    GetPageMaxProcessDefinitionList: apiProcess + '/processManage/processDefine/getPageMaxProcessDefinitionList',
    //设置分类(发布流程批量设置分类)
    UpdateBatchBusinessType: apiProcess + '/processManage/processDefine/updateBatchBusinessType',
    //(批量)删除流程定义
    DeleteBatchProcessDefinitions : apiProcess + '/processManage/processDefine/deleteBatchProcessDefinitions',
    //挂起或者激活一个流程定义
    ActionProcessDefinitionDetail : apiProcess + '/processManage/processDefine/actionProcessDefinitionDetail',
    //获取流程定义详情数据
    GetProcessDefineList: apiProcess +  '/processManage/processDefine/getProcessDefineList',
    //查询一个流程的图片
    QryProcessDefinitionImage : apiProcess + '/processManage/processDefine/qryProcessDefinitionImage',
    //流程实例环形图-获取流程实例状态概况
    GetProcInstOverview : apiProcess + '/processManage/processDefine/getProcInstOverview',
    //查询一个流程定义的所有的节点（包括自定义属性）任务列表
    QryProcessDefinitionUserTaskListQ: apiProcess + '/processManage/processDefine/qryProcessDefinitionUserTaskList',
    //模型分页列表（获取模型分页数据）
    GetPageModelList : apiProcess + '/processManage/model/getPageModelList',
    //设置分类（流程管理-模型管理）
    SetBusinessType : apiProcess + '/processManage/model/setBusinessType',
    //(批量)删除模型
    DeleteBatchModel: apiProcess + '/processManage/model/deleteBatchModel',
    //导出model
    ExportModel : apiProcess + '/processManage/model/exportModel',
    //部署model
    DeployModel : apiProcess + '/processManage/model/deployModel',
    //获取流程实例分页列表
    GetPageProcessInstanceList : apiProcess +　'/processManage/processInstance/getPageProcessInstanceList',
    //挂起或激活一个流程实例
    ActionProcessInstance : apiProcess + '/processManage/processInstance/actionProcessInstance',
    //终止一个流程实例
    EndProcessInstance : apiProcess + '/processManage/processInstance/endProcessInstance?processInstanceId=processInstanceId',
    //(批量)删除流程实例
    DeleteBatchProcessInstance : apiProcess + '/processManage/processInstance/deleteBatchProcessInstance',
    //获取流程实例详情
    GetProcessInstanceDetail : apiProcess + '/processManage/processInstance/getProcessInstanceDetail',
    //根据实例ID获取变量列表(流程信息-变量分页列表)
    GetVariableList : apiProcess + '/processManage/processInstance/getVariableList',
    //获取流程示例图片
    GetProcessInstanceImage : apiProcess + '/processManage/processInstance/getProcessInstanceImage',
    //获取审批历史分页列表（审核历史）
    GetApprovalHistoryList : apiProcess + '/processManage/taskCenter/getApprovalHistoryList',
    //获取流程审计分页列表(任务已超期/任务长期未处理"流程审计分页列表（异常状态为：任务已超期/任务长期未处理时调用）")
    GetPageProcessAuditList : apiProcess +  '/processManage/processAudit/getPageProcessAuditList',
    //"流程审计分页列表（异常状态为：远程调用异常时调用）"
    GetPageProcessAuditListByLogException : apiProcess + '/processManage/processAudit/getPageProcessAuditListByLogException',
    //终止一个流程实例
    EndProcessInstance : apiProcess + '/processManage/processInstance/endProcessInstance?processInstanceId=',
    //远程调用接口错误日志
    GetPageProcessAuditDetailByLogException: apiProcess + '/processManage/processAudit/getPageProcessAuditDetailByLogException',
    //获取业务类型分页列表
    GetPageBusinessTypeList : apiProcess + '/basicManage/businessType/getPageBusinessTypeList',
    //删除业务类型
    DeleteBusinessType : apiProcess + '/basicManage/businessType/deleteBusinessType',
    //获取业务类型详情(查看详情/编辑详情)
    GetBusinessTypeDetail : apiProcess + '/basicManage/businessType/getBusinessTypeDetail',
    //业务类型名称唯一性校验（校验业务类型名称）
    ValidateBusinessTypeName : apiProcess + '/basicManage/businessType/validateBusinessTypeName',
    //  业务类型编码唯一性校验
    ValidateBusinessTypeCode : apiProcess + '/basicManage/businessType/validateBusinessTypeCode',
    //修改业务类型(编辑  保存)
    UpdateBusinessType : apiProcess + '/basicManage/businessType/updateBusinessType',
    //新增业务类型  新增 保存
    AddBusinessType : apiProcess + '/basicManage/businessType/addBusinessType',
    //3.5.获取租户id和bpms-auth-code（新增）
    GetBpmsAuthCode: apiRequirement + '/bpmsAuth/getBpmsAuthCode',

	//销售品组列表查询(我的)
	QureyOfferGroupList: apiBasic + '/ordOfferGrpPage',
	//销售品组列表查询(已上架的)
	QureyAllOfferGroupList: apiBasic + '/offerGrpPage',
	//销售品组成员查询(未上架的)
	OfferGroupMember: apiBasic + '/ordOfferGrpMemberPage',
	//销售品组关系查询(未上架的)
	OfferGroupRel: apiBasic + '/ordOfferGrpRelaPage',

	//销售品组下架
	DropOfferGroup: apiBasic + '/offerGrp',
	//销售品组升版
	UpVersionOfferGroup: apiBasic + '/ordOfferGrpUpGrade',
	//销售品组发布
	PublishOfferGroup: apiBasic + '/ordOfferGrpRelease',
	
	//销售品组删除、销售品组修改、销售品组新建
	OfferGroupTask: apiBasic + '/ordOfferGrp',
	//销售品组成员删除、销售品组成员新建
	OfferGrpMemberTask: apiBasic + '/ordOfferGrpMember',
	//销售品组关系删除、销售品组关联关系新建、销售品组关联关系修改
	OfferGrpRelaTask: apiBasic + '/ordOfferGrpRela',

	//已生效销售品组成员
    EffectedOfferGrpMember: apiBasic + '/offerGrpMemberPage',
    //已生效销售品关联组关系
    EffectedOfferGrpRela: apiBasic + '/offerGrpRelaPage',
	//业务登记单
	OrdSalesAtomicAgreement: apiGoods + '/ordSalesAtomicAgreement',
    //	变更需求单下销售品发布
    OfferRelease:apiGoods + '/ordOffer/offerRelease',
	
//	销售品清退规则查询
	RepayRule:apiGoods + '/repayRule',
//	清退规则修改
	EditRepayRule:apiGoods + '/repayRule/{repayRuleId}',
//	清退规则删除
	DeleteRepayRule:apiGoods + "/repayRule/{repayRuleId}",
//	清退需求单销售品列表
	RepayOffer:apiGoods + "/repayOffer",
//	销售品清退查询(分页)
	RepayOfferPage:apiGoods + "/repayOffer/repayOfferPage",
//	市场清退接口人查询
	SystemRole:apiGoods + '/systemRole',
//	需求单办结,销售品清退需求单提交
	repayRequirement:apiRequirement + '/requirement/{requirementId}',
//	销售品清退列表修改
	editRepayOffer:apiGoods + '/repayOffer',
//	销售品清退列表导出
	ExcelDownload:apiCpcweb + '/repayOffer/excelDownload',


/**********************可见性管理***************************************/
	// 访问组列表查询
	QueryAccessGroupList: apiBasic + '/accessGroup',
	// 访问组基本信息新增
	AddAccessGroup: apiBasic + '/accessGroup',
	// 访问组基本信息修改/详情/删除/下架
	QueryAccessGroupTask: apiBasic + '/accessGroup/{groupId}',
	// 访问组发布
	ReleaseAccessGroup: apiBasic + '/accessGroup/publish/{groupId}',
	// 访问组升版
	RiseAccessGroup: apiBasic + '/accessGroup/ascend/{groupId}',

	// 渠道成员列表分页
	QueryChannelMemberList: apiBasic + '/accessGroupMember/channelMember',
	// 渠道成员新增
	AddChannelMember: apiBasic + '/accessGroupMember',
	// 渠道成员详情
	QueryChannelMemberDetail: apiBasic + '/accessGroupMember/channelMember/{groupMemberId}',
	// 渠道成员修改/移除
	QueryChannelMemberTask: apiBasic + '/accessGroupMember/{groupMemberId}',
	// 渠道成员导入
	ChannelMemberImport: apiBasic + '/accessGroupMember/importChannelMember', 

	// 经营主体成员列表分页
	QueryOperatorsMemberList: apiBasic + '/accessGroupMember/operatorsMember',
	// 经营主体成员新增
	AddOperatorsMember: apiBasic + '/accessGroupMember',
	// 经营主体成员详情
	QueryOperatorsMemberDetail: apiBasic + '/accessGroupMember/operatorsMember/{groupMemberId}',
	// 经营主体成员修改/移除
	QueryOperatorsMemberTask: apiBasic + '/accessGroupMember/{groupMemberId}',
	// 经营主体成员导入
	OperatorsMemberImport: apiBasic + '/accessGroupMember/importOperatorsMember',


	// 员工成员列表分页
	QueryStaffMemberList: apiBasic + '/accessGroupMember/staffMember',
	// 员工成员新增
	AddStaffMember: apiBasic + '/accessGroupMember',
	// 员工成员详情
	QueryStaffMemberDetail: apiBasic + '/accessGroupMember/staffMember/{groupMemberId}',
	// 员工成员修改/移除
	QueryStaffMemberTask: apiBasic + '/accessGroupMember/{groupMemberId}',
	// 员工成员导入
    StaffMemberImport: apiBasic + '/accessGroupMember/importstaffMemberByStaffCode',
    //下载模板
    GetTemplateDocumentFile: apiStorage + '/documentRel/getTemplateDocumentFile?documentType=',
	
	// 渠道列表
	QueryChannelList: apiBasic + '/accessGroupMember/channel',
	// 经营主体列表
	QueryOperatorsList: apiBasic + '/accessGroupMember/operators',
	// 员工列表
	QueryStaffList: apiBasic + '/accessGroupMember/staff',

	// 销售品配置访问组
	// 获取已选访问组
	OfferAccessRel: apiGoods + '/accessGroupRel/accessGroupRelList',
	// 关联访问组新增
	AddOfferAccessGroup: apiGoods + '/accessGroupRel',
	// 关联访问组移除
	DelOfferAccessGroup: apiGoods + '/accessGroupRel/deleteAccessGroupRel',
	
	
//	查询分摊成员
	Offerapportionmember: apiGoods + '/offerapportionmember/{offerId}/offerApportMemberList',
//	修改分摊成员
	saveOfferapportionmember: apiGoods + '/offerapportionmember/offerApportMemberList',

	/**********************公允价值***************************************/
	// 公允树查询/所属目录
	GetFairTree: apiBasic + '/catalog/100070003',
	// 公允列表查询(分页)
	QueryFairList: apiBasic + '/fair/fairPageList',
	// 新增公允基本信息
	AddFairBase: apiBasic + '/fair/fairBase' ,
	
	// 修改公允基本信息
	EditFairBase: apiBasic + '/fair/{fairValueId}/fairBase',
	// 公允基本信息详情
	QueryFairTask: apiBasic + '/fair/{fairValueId}/baseFairDetail',
	// 删除公允信息
	DelFair: apiBasic + '/fair/{fairValueId}',
	// 公允发布
	ReleaseFair: apiBasic + '/fair/{fairValueId}/releaseFairValue',
	// 公允下架
	DownFair: apiBasic + '/fair/{fairValueId}/offFairValue',

	// 公允产品信息列表(功能类)
	QueryProductList: apiBasic + '/fairobjrel/productList',
	// 添加产品配置(功能类)
	AddProduct: apiBasic + '/fairobjrel/{fairValueId}/product', 
	// 删除产品配置(功能类)
	DelProduct: apiBasic + '/fairobjrel/{fairChrgRelId}',
	// 添加收入费用项(功能类)
	AddFeeItem: apiBasic + '/fairchrgrel/{fairValueId}/fairChrgRel', 

	// 添加收入费用项 产品 + 付费方式
	AddFeeConfig: apiBasic + '/fairchrgrel/{fairValueId}/fairChrgRel',
	// 修改收入费用项 产品 + 付费方式
	EditFeeConfig: apiBasic + '/fairchrgrel/{fairValueId}/updatefairChrgRel',
	// 删除收入费用项(功能类)
	DelFeeItem: apiBasic + '/fairchrgrel/{fairChrgRelId}',
	
	// 公允费用关系信息列表
	QueryFairChrgRelList: apiBasic + '/fairchrgrel/{fairValueId}/fairChrgRelList',
	// 费用信息列表
	QueryChrgItem: apiBasic + '/chrgitem/chrgItemPageList',
	
	
	// 公允资费模板信息列表(通信类)
	QueryTariffList: apiBasic + '/fairobjrel/tariffList', 
	// 添加资费模板配置	(通信类)
	AddTariff: apiBasic + '/fairobjrel/{fairValueId}/tariff',
	// 删除资费资费配置 (通信类)
	DelTariff: apiBasic + '/fairobjrel/{fairChrgRelId}',
	// 添加收入费用项(通信类)
	AddFeeItem: apiBasic + '/fairchrgrel/{fairValueId}/fairChrgRel',
	// 删除收入费用项(通信类)
	DelFeeItem: apiBasic + '/fairchrgrel/{fairChrgRelId}',

	/**********************礼包管理***************************************/ 
	// 礼包管理列表/新增/修改/删除
	QueryOfferPackageList: apiGoods + '/offerPackage',
	// 配置礼包列表删除
	DelPkgObjRel: apiGoods + '/pkgObjRel',
	// 礼包管理详情
	QueryOfferPackageDetail: apiGoods + '/offerPackageConfig',
	// 礼包管理发布
	OfferGrpRelease: apiGoods + '/offerGrpRelease',
	// 商品子
	QueryLeafList: apiGoodsView + '/offer/{offerId}/offerRel',
	// 商品组子
	QueryLeafGrpList: apiGoodsView + '/offer'  ,// offerType=12,13
	// 销售品临时下线列表
	DownOfferList: apiGoodsView + '/offer'  ,
	// 销售品下架
	DownOffer: apiGoodsView + '/offer/{offerId}/downOffer?updateStaff=11'  ,
	

	/**********************委托管理***************************************/ 
	// 委托任务分页列表
	QueryDelegatePageList: apiBasic + '/delegate/getFlowTaskDelegatePageList',
	// 新增委派任务
	AddDelegate: apiBasic + '/delegate',
	// 修改/删除 委派任务
	TaskDelegate: apiBasic + '/delegate/{taskDelegateId}',
}