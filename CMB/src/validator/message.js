
// 自定义验证错误信息

export default{
	name: 'ch',
	messages:{
		required: (field ) => `请输入${field}`,
		numeric: (field) => `请输入纯数字`,
		max:(field,number) => `请输入小于${number}的字符`,
		max_value:(field,number) =>`请输入正确的${field}`,
		min_value:(field,number) =>`请输入正确的${field}`,
		between:(field,number) =>`请输入正确的${field}`,
	},
	attributes:{
		name: '名称',
		type: '类型',
		desc: '描述',
		status: '状态'
	}
}
