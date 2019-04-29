export default{
	//判断两个对象是否相等
	isEqual(objA,objB){
		//相等
		if(objA === objB) return objA !== 0 || 1/objA === 1/objB;
		//空判断
		if(objA == null || objB == null) return objA === objB;
		//类型判断
		if(Object.prototype.toString.call(objA) !== Object.prototype.toString.call(objB)) return false;

		switch(Object.prototype.toString.call(objA)){
			case '[object RegExp]':
			case '[object String]':
				//字符串转换比较
				return '' + objA ==='' + objB;
			case '[object Number]':
				//数字转换比较,判断是否为NaN
				if(+objA !== +objA){
					return +objB !== +objB;
				}

				return +objA === 0?1/ +objA === 1/objB : +objA === +objB;
			case '[object Date]':
			case '[object Boolean]':
				return +objA === +objB;
			case '[object Array]':
				//判断数组
				for(let i = 0; i < objA.length; i++){
					if (!this.isEqual(objA[i],objB[i])) return false;
				}
				return true;
			case '[object Object]':
				//判断对象
				let keys = Object.keys(objA);
				for(let i = 0; i < keys.length; i++){
					if (!this.isEqual(objA[keys[i]],objB[keys[i]])) return false;
				}

				keys = Object.keys(objB);
				for(let i = 0; i < keys.length; i++){
					if (!this.isEqual(objA[keys[i]],objB[keys[i]])) return false;
				}

				return true;
			default :
				return false;
		}
	},

    // 年月日，时分秒
    getFullTime() {
        let date = new Date(),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            Y = date.getFullYear(),
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1),
            D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()),
            h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()),
            m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()),
            s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
        return Y + M + D + h + m + s
    },

	// 获取当前时间戳
	getLocalTime() {
		return new Date().getTime();
    },
    
    // 过滤掉符号"|"
    filteSymbol (arr) {
        arr.map(item => {
            Object.keys(item).forEach((key) => {
                if (typeof item[key] === 'string' && item[key].indexOf('|') !== -1) {
                    item[key] =  item[key].split('|')[1]
                }
            })
        })
        return arr
    },

	// 时间戳
    time2TimeStap (timer) {
        return new Date(timer).getTime();
	},

    // 身份证15位转18位
    checkCardID (cardID) {
        let v = new Array();
        let vs = "10X98765432";
        let cardObj = {
            code:'',
            val: ''
        }
        v.push(2, 4, 8, 5, 10, 9, 7, 3, 6, 1, 2, 4, 8, 5, 10, 9, 7);
        if (cardID.length != 15) {
            cardObj.code = '0';
            cardObj.val = "请输入15位身份证号码！";
            return cardObj;
        }
        let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        if (reg.test(cardID) === false) {
            cardObj.code = '0';
            cardObj.val = "请输入正确的身份证信息"
            return cardObj;
        }
        //将15位的号码转换位17位
        let cardIDcardID17 = cardID.substring(0, 6) + "19" + cardID.substring(6);
        let N = 0;
        let R = -1;
        let T = '0';//储存最后一个数字
        let j = 0;
        //计数出第18位数字
        for (let i = 16; i >= 0; i--) {
            N += parseInt(cardIDcardID17.substring(i, i + 1)) * v[j];
            j++;
        }
        R = N % 11;
        T = vs.charAt(R);
        cardObj.code = '1';
        cardObj.val = cardIDcardID17 + T;
        return cardObj;
    },
    //判断输入的月份是否正确
    checkMonth(month) {
        if (month < 1 || month > 12) {
            return false;
        }
        return true;
    },
    /**
    **检查你输入的天数是否正确
    **yean为年
    **month为月
    **day为日
    **/
    checkDay (year, month, day) {
        let Mday = 0;
        if (day < 1 || day > 31) {
            return false;
        }
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            Mday = 31;
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            Mday = 30;
        }
        if (month == 2) {
            Mday = isLeapYear(year);
        }
        if (day > Mday) {
            return false;
        }
        return true;
    },
    //判断你输入的年是否位闰年
    isLeapYear(year) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0) ? 29 : 28;
    },

    // 身份证判断
    isCardId(card) {
        let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        return reg.test(card);
    },

    // 护照判断
    isPassPort(card) {
        let reg = /^([a-zA-z]|[0-9]){6,64}$/;
        return reg.test(card);
    },

    // 港澳台通行证
    isPassCard(card) {
        let reg = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
        let reg1 = /^[0-9]{8}$/;
        let reg2 = /^[0-9]{10}$/;
        return reg.test(card) || reg1.test(card) || reg2.test(card);
    },

    // 军人证件
    isSoldier (card) {
        // 样本： 军字第2001988号, 士字第P011816X号
        let reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
        return reg.test(card) 
    },

    // 组织机构代码证
    isOrg (card) {
        let reg = /^[A-Za-z0-9]{9}$/;
        return reg.test(card)
    },

    // 工商登记证
    isBusiness (card) {
        let reg = /^([A-Za-z0-9]{15}|[A-Za-z0-9]{18})$/;
        return reg.test(card)
    },

    // 税务登记证
    isTaxAdministration (card) {
        let reg = /^([A-Z0-9]{15}|[A-Z0-9]{17}|[A-Z0-9]{20})$/;
        return reg.test(card)
    },

    // 事业单位法人证
    isInstitution (card) {
        let reg = /^12[\d\w\W]{16}$/;
        return reg.test(card)
    },

    // 社会团体法人登记证
    isSocialOrganization (card) {
        let reg = /^51[\d\w\W]{16}$/;
        return reg.test(card)
    },

    // 18为证件号码校验
    isEighteen (card){
        let reg = /^[A-Za-z0-9]{18}$/;
        return reg.test(card)
    },

    // 外国人永久居留居住证
    isForeign(card) {
        let reg = /^[A-Za-z0-9]{15}$/;
        return reg.test(card)
    },

    // 户口本校验
    isAccountCard(card) {
        // 户口本
        // 规则： 15位数字, 18位数字, 17位数字 + X
        // 样本： 441421999707223115
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(card)
    },

    // 统一社会信用代码证
    isSocialCredit (card) {
        let reg = /^[A-Za-z0-9]{18}$/;
        return reg.test(card)
    },

    /**证件子类型**/
    //外国驻华新闻机构证 21
    isCheckCard1 (card){
        let reg = /^21[A-Za-z0-9]{16}$/;
        return reg.test(card)
    },
    isCheckCard789 (card){
        let reg = /^21[A-Za-z0-9]{16}$/;
        return reg.test(card)
    },
    //宗教活动场所登记证 71
    isCheckCard2 (card){
        let reg = /^71[A-Za-z0-9]{16}$/;
        return reg.test(card)
    },
    //民办非企业单位登记证 52
    isCheckCard3 (card){
        let reg = /^52[A-Za-z0-9]{16}$/;
        return reg.test(card)
    },
    //基金会法人登记证 53
    isCheckCard4 (card){
        let reg = /^53[A-Za-z0-9]{16}$/;
        return reg.test(card)
    },
    //工会法人资格证书 8
    isCheckCard5 (card){
        let reg = /^8[A-Za-z0-9]{17}$/;
        return reg.test(card)
    },
    //律师事务所执业许可证 3
    isCheckCard6 (card){
        let reg = /^3[A-Za-z0-9]{17}$/;
        return reg.test(card)
    },
    //外国律师事务所驻华代表处执业许可证 3
    isCheckCard7 (card){
        let reg = /^3[A-Za-z0-9]{17}$/;
        return reg.test(card)
    },
    //基层群众性自治组织特别法人统一社会信用代码证书 55
    isCheckCard8 (card){
        let reg = /^55[A-Za-z0-9]{16}$/;
        return reg.test(card)
    },
    //上海市农村集体经济组织登记证书 N
    isCheckCard9 (card){
        let reg = /^N[A-Za-z0-9]{17}$/;
        return reg.test(card)
    },
    //境外非政府组织代表机构登记证书 G
    isCheckCard10 (card){
        let reg = /^G[A-Za-z0-9]{17}$/;
        return reg.test(card)
    },
    // 帐户以客户名称开头
    isGroupName (val,custName){
        let a = val.indexOf(custName);
        return a == 0 
    },
}