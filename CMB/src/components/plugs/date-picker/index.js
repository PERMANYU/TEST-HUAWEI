import Calendar from './src/calendar';
import DatePicker from './src/main';

DatePicker.install = function(Vue) {
	Vue.component(Calendar.name, Calendar);
	Vue.component(DatePicker.name, DatePicker);
};

export default DatePicker;
