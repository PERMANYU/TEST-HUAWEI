//string.format
// '我是{0},来自{1}'.format('张三','李家庄') => '我是张三，来自李家庄'
// '我是{name},来自{addr}'.format({'name':'张三','addr':'李家庄'}) => '我是张三，来自李家庄'

String.prototype.format = function(args){
	if (arguments.length > 0){

		var result = this;
		if (arguments.length == 1 && typeof (args) == "object"){
			for (var key in args){
				var reg = new RegExp("({" + key + "})", "g");
				result = result.replace(reg, args[key]);
			}
		}else{
			for (var i = 0; i < arguments.length; i++){
				if (arguments[i] == undefined){
					return "";
				}else{
					var reg = new RegExp("({[" + i + "]})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
		return result;
	}else{
		return this;
	}
}