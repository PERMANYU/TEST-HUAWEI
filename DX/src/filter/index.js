const filters = {
	date(val){
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
	datetime(val){
		if(!val) return;
		let newDate = new Date(val),
			dateYear = newDate.getFullYear(),
			dateMonth = newDate.getMonth() + 1,
			dateDay = newDate.getDate(),
			dateHours = newDate.getHours(),
			dateMinutes = newDate.getMinutes(),
			dateSeconds = newDate.getSeconds(),
			dateArray = [dateYear,dateMonth,dateDay],
			timeArray = [dateHours,dateMinutes,dateSeconds];

		dateArray = dateArray.map(val => {
			return val > 9 ? val : `0${val}`;
		})

		timeArray = timeArray.map(val => {
			return val > 9 ? val : `0${val}`;
		})

		return `${dateArray.join('-')} ${timeArray.join(':')}`;
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

export default { install };