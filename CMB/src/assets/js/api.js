import {serverConfig} from './server.js';

const apiPath = serverConfig.apiPath,
	apiGeneralInterface = serverConfig.apiGeneralInterface,
	cpcMainServer = serverConfig.cpcMainServer,
	fileServer = serverConfig.fileServer;

export default {
	//getJon文件用到的主数据
	mainView: `${apiGeneralInterface}/${cpcMainServer}/cpcbizmetadata`, 
	// 权限
	GetUserStorage: apiGeneralInterface + '/bas/bizqueryprivapp/basiccenter/queryservice/systemUser',
	// 权限-中间层
	GetPermission: apiPath + '/cmbAuthentication/{sysUserCode}',
	// 收藏菜单查询
	GetMenuCollection: apiPath + '/menuCollection/findAllMenuCollection',
	// 收藏菜单新增
	AddMenuCollection: apiPath + '/menuCollection/save',
	// 收藏菜单删除
	DeleteMenuCollection: apiPath + '/menuCollection/delete/{menuId}/{menuPerson}',

	// 客户经理
	CustomerManage: apiGeneralInterface + '/bas/bizqueryprivapp/basiccenter/queryservice/systemUserInfo',

	//申请单列表、详情、保存
	ApplicationForm: apiGeneralInterface + '/cus/custbizrelmng/applyOrder',

	// 申请单导入模板下载--直连
	ClientApplicationForm: `${apiPath}/cus/${fileServer}/applyOrder`,
	// --申请单模板（下载）单独的
    ApplicationFormDownFile: `${apiPath}/generalInterfaceDowFile/cus/${fileServer}/applyOrder`,

	//批量导入下载模板--直连
	ClientManagerList: `${apiPath}/cus/${fileServer}/custOrgStaffRel`,
	// --批量导入模板（下载）单独的
	ClientDownFile: `${apiPath}/generalInterfaceDowFile/cus/${fileServer}/custOrgStaffRel`,

	//审核人详情
	staffDetail: apiPath + '/audit/findAllAudit',
	//审核人新增
	staffAdd: apiPath + '/audit/saveOne',
	//审核人删除
	staffDelete: apiPath + '/audit/delete/7',

	// 客户分配管理列表、提交客户分配
	clientDistributionManagerList: apiGeneralInterface + '/cus/custbizrelmng/custOrgStaffRel',
	
	// 查询客户列表服务
	adddClientDistribution: apiGeneralInterface + '/cus/custbizrelmng/customer',

	// 客户下载模板--直连
	ClientDistribution: `${apiPath}/generalInterfaceDowFile/cus/${fileServer}/customer`,
	// 客户信息模板--获取 单独配置
	GetClientTemp: `${apiGeneralInterface}/cus/${fileServer}/customer`,
	// 客户信息模板--导入 单独配置
	ImportClientTemp: `${apiPath}/cus/${fileServer}/customer`,

	// 账户批量下载模板--直连
	AccounBatchDownload: `${apiPath}/generalInterfaceDowFile/cus/${fileServer}/account`,

	// 账户批量导入
	AccounBatchImport: `${apiPath}/cus/${fileServer}/account`,

	// 客户树子节点
	clientTreeChildNode: apiGeneralInterface + '/cus/custbizrelmng/shctCustTreeNode',

	// 重点客户
	keyCustomer: apiGeneralInterface + '/cus/custbizrelmng/custVip',

	// 重要客户--导入
	GetkeyCustomerImport: `${apiPath}/cus/${fileServer}/custVip`,
	// 重要客户--下载
	GetkeyCustomerDown: `${apiPath}/generalInterfaceDowFile/cus/${fileServer}/custVip`,

	// 客户树
	clientTree: apiGeneralInterface + '/cus/custbizrelmng/shctCustTree',

	// 历史记录
	History: apiGeneralInterface + '/cus/custbizrelmng/iHistory',

	// 账户历史记录
	AccountHistory: apiGeneralInterface + '/cus/cusbizcustrelmng/batchImportAttr',

	// 历史记录文件下载--直连
	GetHistory: `${apiPath}/cus/${fileServer}/iHistory`,
	// --历史记录文件（下载）单独的
	GetHistoryDownFile: apiPath + '/generalInterfaceDowFile/cus/cusbizcustrelmng/iHistory',

	// 政企关键人
	keyPerson: apiGeneralInterface + '/cus/custbizrelmng/keyPerson',

	// 常用信息
	BasicInfo: apiGeneralInterface + '/cus/custbizrelmng/contactsInfo',

	// 修改基本信息
	ModifyBasicInfomation: apiGeneralInterface + '/cus/customerorder/customer',

	// 全量新增客户
	FullDoseAddCustomer: apiGeneralInterface + '/cus/customerorder/inscustomer',

	// 联系人
	Contact: apiGeneralInterface + '/cus/customerorder/contactsInfo',

	//账户列表信息查询
	AccountGetList : apiPath + '/generalInterfacePage/cus/viewservice/account',

	//账户新增
	AccountAdd : apiGeneralInterface + '/cus/customerorder/account',

	//账户基本信息查询
	AccountInfo : apiGeneralInterface + '/cus/viewservice/account',

	//账户基本信息修改
	AccountInfoMod : apiGeneralInterface + '/cus/customerorder/account/{acctId}',

	//账户支付方案查询
	PaymentPlanGet : apiGeneralInterface + '/cus/viewservice/paymentPlan',

	//账户支付方案新增
	PaymentPlanAdd : apiGeneralInterface + '/cus/customerorder/paymentPlan',

	//账户支付方案修改
	PaymentPlanMod : apiGeneralInterface + '/cus/customerorder/paymentPlan/{acctId}',

	//账户支付方案删除
	PaymentPlanDel : apiGeneralInterface + '/cus/customerorder/paymentPlan/{acctId}',

	// 查询公客客户列表服务
	CustomerList: apiGeneralInterface + '/cus/custbizrelmng/customer/custCert',
	// 公客客户定位
	CustomerPosition: apiGeneralInterface + '/cus/viewservice/customer/customerPosition',
	// 公客客户详情
	CustomerPublicDetail: apiGeneralInterface + '/cus/viewservice/customer/{custId}',
	// 公客客户详情修改
	CustomerPublicUpdate: apiGeneralInterface + '/cus/customerorder/customer/detail',
	// 证件保存、修改
	CusPartyCert: apiGeneralInterface + '/cus/customerorder/partyCert',
	// 证件信息查询
	CustCert: apiGeneralInterface + '/cus/viewservice/customer/cert',
	// 证件详情
	CustCertDetail: apiGeneralInterface + '/cus/viewservice/customer/',
	// 删除证件
	DeleteIdInformation: apiGeneralInterface + '/cus/customerorder/partyCert',
	// 联系人列表查询
	CustContacts: apiGeneralInterface + '/cus/viewservice/contactsInfo',
	// 联系人核查
	CheckContacts: apiGeneralInterface + '/cus/customerorder/checker',
	// 地址列表查询
	CustAddress: apiGeneralInterface + '/cus/viewservice/address',
	// 特殊名单
	CustSpecial: apiGeneralInterface + '/cus/viewservice/special',
	// 新增特殊名单
	CustSpecialAdd: apiGeneralInterface + '/cus/customerorder/special',
	// 删除特殊名单
	CustSpecialDel: apiGeneralInterface + '/cus/customerorder/special/{specialListId}',
	// 特殊名单历史查询
	CustSpecialBook: apiGeneralInterface + '/cus/viewservice/special',
	// 客户星级
	CustStar: apiGeneralInterface + '/cus/viewservice/custstar',

	// 地址新增、删除、修改
	CusAddress: apiGeneralInterface + '/cus/customerorder/custAddrRel',
	// 信用度列表查询
	CustCredit: apiGeneralInterface + '/cus/viewservice/credit',
	// 新增信用度
	AddCredit: apiGeneralInterface + '/cus/customerorder/credit',

	// 纳税人
	ClientTaxpayer: apiGeneralInterface + '/cus/viewservice/taxPayer',
	// 修改纳税人
	ModifyTaxpayer: apiGeneralInterface + '/cus/customerorder/taxPayer',

	//外部支付账号查询
	GetExtAcct : apiGeneralInterface + '/cus/viewservice/extAcct',

	//银行分行API
	GetBankBranch : apiGeneralInterface + '/cus/custbizrelmng/bankBranch',

	//查询产品资产列表
	AssetProdInst: apiGeneralInterface + '/cus/orderassetservice/assetProdInst',
	//查询销售品资产列表
	AssetOfferInst: apiGeneralInterface + '/cus/orderassetservice/assetOfferInst',
	//查询资产详情
	Asset: apiGeneralInterface + '/cus/orderassetservice/asset',
	//查询资产订单列表
	QryCustomerOrderList: apiGeneralInterface + '/ord/ordbizqueryapp/query/biz/qryCustomerOrderList',
	//查询资产订单详情
	QryCustomerOrderAllDetail: apiGeneralInterface + '/ord/ordbizqueryapp/query/biz/qryCustomerOrderAllDetail',
	//资产销售品产品关系详情
	QueryAssertInfo: apiPath + '/queryAssertInfo',
	//查询二级群产品信息
	SecondaryGroup: apiGeneralInterface + '/cus/orderassetservice/secondaryGroup',
	//查询二级群产品信息
	SecondaryGroupMember: apiGeneralInterface + '/cus/orderassetservice/secondaryGroupMember',
	//查询二级群产品信息
	SubProdInst: apiGeneralInterface + '/cus/orderassetservice/subProdInst',
	//资产群设备列表
	GroupProdInstList: apiGeneralInterface + '/cus/orderassetservice/groupProdInstList',
	//资产群设备详情
	GroupProdInst: apiGeneralInterface + '/cus/orderassetservice/groupProdInst',

	// 一证五号核实查询
	ProdInstCheckLog: apiGeneralInterface + '/cus/orderassetservice/prodInstCheckLog',

	// 综资地址下拉查询
	SelectAddress: apiPath + '/queryRoad/',
	// 综资地址查询
	GetAddress: apiGeneralInterface + '/zz/queryAddressForWebNew/QueryAddressForWebNew',
	// 综资地址新增
	NewAddress: apiGeneralInterface + '/zz/queryAddressForPortal/QueryAddressForPortal',

	//接触单列表
	ContactOrder: apiGeneralInterface + '/msc/contactorderbizapp/contactOrder',
	//接触单认领
	ContactOrderClaim: apiGeneralInterface + '/msc/contactorderbizapp/contactOrder/claim',
	//接触单办结
	ContactOrderDeal: apiGeneralInterface + '/msc/contactorderbizapp/contactOrder/deal',
	//接触单批量办结
	ContactOrderBatchDeal: apiGeneralInterface + '/msc/contactorderbizapp/contactOrder/batchDeal',
	//接触单详情
	ContactOrderBatchDetail: apiGeneralInterface + '/msc/contactorderbizapp/contactOrder/{contactOrderId}',
	//主表审计追踪查询
	auditMaster: apiGeneralInterface + '/audittrial/audit/master',

	//资产子产品信息
	subGroupProd: apiPath + '/subProdInst/{prodInstId}',

	//查询产品实例扩展表详情
	ProdInstExt: apiGeneralInterface + '/cus/orderassetservice/prodInstExt/{prodInstId}',
	//操作产品实例扩展表详情
	HandleProdInstExt: apiGeneralInterface + '/cus/orderassetservice/prodInstExt',
	
	

}