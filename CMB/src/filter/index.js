const filters = {
	// 年月日，时分秒
	getLocalTime: (timestamp) => {
		if (timestamp) {
            let date = new Date(timestamp),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                Y = date.getFullYear() + '-',
                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
                D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ',
                h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':',
                m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':',
                s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
		    return Y + M + D + h + m + s
        } else {
            return ''
        }
	},

	// 年月日
	getTime: (time) => {
        if(time == null){
            return ''
        }
		let date = new Date(time),
			Y = date.getFullYear() + '-',
			M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
			D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
		return Y + M + D
    },
    
    date: (val) => {
        if(!val) return;
		let newDate = new Date(val),
			dateYear = newDate.getFullYear(),
			dateMonth = newDate.getMonth() + 1,
			dateDay = newDate.getDate(),
			dateArray = [dateYear,dateMonth,dateDay];

		dateArray = dateArray.map(val => {
			return val > 9 ? val : `0${val}`;
		})

		return dateArray.join('-');
    },

    // 字段值竖线过滤
    filterName: (val) =>{
    	if(!val) return;
        if(val == 'null' || val == null || val == 'null|null'){
            return ''
        }else{
        	let arr = val.split('|');
            if(arr[0] == 'null' || arr[1] == 'null'){
                return ''
            }else{
        	   return arr[1]
            }
        }
    },
    filterNum: (val) =>{
        if(!val) return;
        let arr = val.split('|');
        return arr[0]
    }
}

const install = function(Vue, opts = {}) {
	Object.keys(filters).forEach(key => {
		Vue.filter(key, filters[key])
	})
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default { install, filters };