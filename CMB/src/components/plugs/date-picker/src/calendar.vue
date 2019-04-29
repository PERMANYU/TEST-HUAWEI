<template>
	<div class="app__calendar calendar" ref="calendar" >
		<div class="title" @click.stop>
			<span class="double-left" @click="prevYear()"></span>
			<span class="left" @click="prevMonth()"></span>
			<span class="year" @click="yearClick()" v-if="calendarType != 'y'">{{y}}年</span>
			<span class="year" @click="yearClick()" v-else>{{startY}}年-{{startY + 9}}年</span>
			<span class="month" v-if="calendarType == 'd'" @click="monthClick()">{{m+1}}月</span>
			<span class="double-right" @click="nextYear()"></span>
			<span class="right" @click="nextMonth()"></span>
		</div>
		<div>
			<table ref="tableDay" @click.stop="calendarDayClick($event)">

			</table>
			<table class="table-month" v-show="calendarType == 'm'" ref="tableMonth"  @click.stop="calendarMonthClick($event)">

			</table>
			<table class="table-year" v-show="calendarType == 'y'" ref="tableYear"  @click.stop="calendarYearClick($event)">
				
			</table>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'Calendar',
		props:{
			value:{},
			startDate:'',
			endDate:'',
			initType:{
				type: String,
				default: 'd' //d/天 m/月 y/年
			}
		},
		data(){
			return{
				date:null,
				y:null,
				m:null,
				d:null,
				w:null,
				startY: 0,
				mCount:null,
				monthArr:[],
				tableDayEl:null,
				tableMonthEl:null,
				tableYearEl:null,
				calendarType: '' //日历显示的类型 d/天 m/月 y/年
			}
		},
		watch:{
			calendarType(val,old){
				if(val == 'd'){
					this.init();
				}else if(val == 'm'){
					this.drawMonthCalendar();
				}else if(val == 'y'){
					this.drawYearCalendar();
				}
			},
			value(val,old){
				this.reInit();
			},
			startDate(val,old){
				this.reInit();
			},
			endDate(val,old){
				this.reInit();
			}
		},
		computed:{
			model:{
				get(){
					return this.value;
				},
				set(val){
					this.$emit('input', val);
				}
			}
		},
		mounted(){
			this.calendarType = this.initType;

			if(this.model){
				this.date = new Date(this.model);
				this.init();
			}else{
				this.reInit();
			}
		},
		methods:{
			init(){
				this.resetDateInfo();
				this.drawDayCalendar();
			},
			reInit(){
				this.date = null;
				this.init();
			},
			resetDateInfo(date){
				let modelOrNew = new Date();
				if(this.model){
					modelOrNew = new Date(this.model)
				}

				this.date = date || this.date || modelOrNew;
				this.y = this.date.getFullYear();
				this.m = this.date.getMonth();
				this.d = this.date.getDate();
				this.w = this.date.getDay();
				this.monthArr = [31,this.getFubuary(),31,30,31,30,31,31,30,31,30,31];
				this.mCount = this.monthArr[this.m];

				this.tableDayEl = this.$refs.tableDay;
				this.tableMonthEl = this.$refs.tableMonth;
				this.tableYearEl = this.$refs.tableYear;
			},
			drawDayCalendar(){
				if(!this.date) this.resetDateInfo();
				this.tableDayEl.innerHTML = '<tr><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>';
				//获取第一天是周几
				let firstDay = new Date(this.y,this.m,1).getDay();
				// 计算每月显示几周
				// let weekCount = Math.ceil((firstDay + this.mCount) / 7);
				//最小显示几周
				let minWeekCount = 6; 

				//1号是周末显示上一星期的七天
				if(firstDay === 0){
					let dayId,tableStr='<tr>';

					for(let i = 0; i < 7; i++){
						dayId = this.getPrevEndMonth(i-6);
						tableStr += `<td class="day prev" ><span>${dayId}</span></td>`;
					}
					this.tableDayEl.innerHTML = this.tableDayEl.innerHTML + tableStr;
					minWeekCount -= 1;
				}

				//循环每月的周次数
				for(let i = 0; i < minWeekCount; i++){
					let dayId,tableStr='<tr>';
					//循环一周7天
					for(let j = 0; j < 7; j++){
						dayId = 7 * i + j - firstDay + 1;
						let dayType = '';

						if(new Date(this.model).getFullYear() == this.y 
							&& new Date(this.model).getMonth() == this.m 
							&& new Date(this.model).getDate() == dayId){
							dayType = 'active';
						}

						//前一月 || 后一月
						if(dayId <= 0){
							dayId = this.getPrevEndMonth(dayId);
							dayType = 'prev';
						}else if(dayId > this.mCount){
							dayId = this.getNextStartMonth(dayId);
							dayType = 'next';
						}else{
							//是否当天
							if(new Date().getFullYear() == this.y 
								&& new Date().getMonth() == this.m 
								&& new Date().getDate() == dayId){
								dayType += ' today';
							}
						}

						

						//计算开始、结束时间的经过日期
						dayType = this.adjustViaDayType(dayId,dayType);

						tableStr += `<td class="day ${dayType}"><span>${dayId}</span></td>`;
					}
					tableStr+='</tr>';

					this.tableDayEl.innerHTML = this.tableDayEl.innerHTML + tableStr;
				}
				this.isShow = true;
			},
			drawMonthCalendar(){
				if(this.calendarType != 'm') return;
				let tableStr = '';

				tableStr += `<tr><td data-m-id='1'>一月</td><td  data-m-id='2'>二月</td><td  data-m-id='3'>三月</td></tr>`;
				tableStr += `<tr><td  data-m-id='4'>四月</td><td  data-m-id='5'>五月</td><td  data-m-id='6'>六月</td></tr>`;
				tableStr += `<tr><td  data-m-id='7'>七月</td><td  data-m-id='8'>八月</td><td  data-m-id='9'>九月</td></tr>`;
				tableStr += `<tr><td  data-m-id='10'>十月</td><td  data-m-id='11'>十一月</td><td  data-m-id='12'>十二月</td></tr>`;

				this.tableMonthEl.innerHTML = tableStr;

			},
			drawYearCalendar(){
				if(this.calendarType != 'y') return;
				let tableStr = '';

				this.startY = parseInt(Math.floor(this.y/10) + '0');

				for(let i = 0; i < 3; i++){
					tableStr += `<tr><td>${this.startY + i * 3 + 0}</td><td>${this.startY + i * 3 + 1}</td><td>${this.startY + i * 3 + 2}</td></tr>`;
				}

				tableStr += `<tr><td>${this.startY + 9}</td></tr>`;
				this.tableYearEl.innerHTML = tableStr;
				
			},
			getFubuary(y){
				let year = y || this.y;
				if(!year) return 28;
				//计算2月天数
				if(year % 100 === 0 && year % 400 === 0){
					return 29;
				}else if(year % 4 === 0 && year % 100 !== 0){
					return 29;
				}else{
					return 28;
				}
			},
			getPrevEndMonth(num){
				let tDate = new Date(this.date);
				tDate.setMonth(tDate.getMonth() - 1);
				return this.monthArr[tDate.getMonth()] + num;
			},
			getNextStartMonth(num){
				return num - this.mCount;
			},
			prevYear(){
				//上一年
				if(this.calendarType == 'y'){
					this.y -= 100;
					if(this.y < 0) this.y = 0;
					this.drawYearCalendar();
				}else if(this.calendarType == 'm'){
					this.y -= 10;
					if(this.y < 0) this.y = 0;
					this.date.setYear(this.y);
				}else{
					this.date.setYear(this.date.getFullYear() - 1);
					this.init();
				}
			},
			prevMonth(){
				//上一月
				if(this.calendarType == 'y'){
					this.y -= 10;
					if(this.y < 0) this.y = 0;
					this.drawYearCalendar();
				}else if(this.calendarType == 'm'){
					this.y -= 1;
					if(this.y < 0) this.y = 0;
					this.date.setYear(this.y);
				}else{
					this.date.setMonth(this.date.getMonth() - 1);
					this.init();
				}
			},
			yearClick(){
				this.calendarType = 'y';
			},
			monthClick(){
				this.calendarType = 'm';
			},
			nextYear(){
				//下一年
				if(this.calendarType == 'y'){
					this.y += 100;
					this.drawYearCalendar();
				}else if(this.calendarType == 'm'){
					this.y += 10;
					this.date.setYear(this.y);
				}else{
					this.date.setYear(this.date.getFullYear() + 1);
					this.init();
				}
			},
			nextMonth(){
				//下一月
				if(this.calendarType == 'y'){
					this.y += 10;
					this.drawYearCalendar();
				}else if(this.calendarType == 'm'){
					this.y += 1;
					this.date.setYear(this.y);
				}else{
					this.date.setMonth(this.date.getMonth() + 1);
					this.init();
				}
			},
			calendarDayClick(event){
				//日历天点击
				let day = 0;
				let dayEl = null;
				let selM = this.m + 1;
				if(event.target.tagName == 'SPAN'){
					dayEl = event.target.parentNode;
					day = event.target.innerText;
				}else if(event.target.className.indexOf('day') >= 0){
					dayEl = event.target;
					day = event.target.innerText;
				}else{
					return;
				}

				if(dayEl.className.indexOf('next') >= 0){
					selM += 1;
				}else if(dayEl.className.indexOf('prev') >= 0){
					selM -= 1;
				}

				if(selM === 0){
					this.y -= 1;
					selM = 12;
				}else if(selM === 13){
					this.y += 1;
					selM = 1;
				}

				let modelDay = `${this.y}-${selM > 9 ? selM : '0'+selM}-${day > 9 ? day : '0'+day}`;

				if(this.startDate){
					if(new Date(modelDay).getTime() < new Date(this.startDate).getTime()){
						this.$message.error({message:'结束时间比开始时间小'})
						return;
					}
				}else if(this.endDate){
					if(new Date(modelDay).getTime() > new Date(this.endDate).getTime()){
						this.$message.error({message:'开始时间比结束时间大'});
						return;
					}
				}

				this.model = modelDay;
				this.isShow = false;
			},
			calendarMonthClick(event){
				//日历月点击
				let month = 0;
				if(event.target.tagName == 'TD'){
					month = event.target.getAttribute('data-m-id');
				}else{
					return;
				}
				this.m = month - 1;
				this.date.setMonth(month - 1);

				if(this.initType == 'm'){
					this.model = `${this.y}-${month > 9 ? month : '0'+month}`;
					this.isShow = false;
					return;
				}

				this.calendarType = 'd';
			},
			calendarYearClick(event){
				//日历年点击
				let year = 0;
				if(event.target.tagName == 'TD'){
					year = event.target.innerText;
				}else{
					return;
				}
				this.y = parseInt(year);
				this.date.setYear(year);
				this.calendarType = 'm';
			},
			adjustViaDayType(dayId,dayType){
				//计算开始-结束经过时间
				if(this.startDate && this.model){
					let newDate = new Date(`${this.y}-${this.m + 1}-${dayId}`);
					let sDate = new Date(this.startDate).getTime();
					let eDate = new Date(this.model).getTime();
					if(dayType == 'prev'){
						newDate.setMonth(newDate.getMonth() - 1);
					}else if(dayType == 'next'){
						newDate.setMonth(newDate.getMonth() + 1);
					}
					newDate = newDate.getTime();

					if(sDate <= newDate && newDate <= eDate){
						dayType += ' via';
					}
				}else if(this.endDate && this.model){
					let newDate = new Date(`${this.y}-${this.m + 1}-${dayId}`);
					let eDate = new Date(this.endDate).getTime();
					let sDate = new Date(this.model).getTime();
					if(dayType == 'prev'){
						newDate.setMonth(newDate.getMonth() - 1);
					}else if(dayType == 'next'){
						newDate.setMonth(newDate.getMonth() + 1);
					}
					newDate = newDate.getTime();

					if(sDate <= newDate && newDate <= eDate){
						dayType += ' via';
					}
				}
				return dayType;
			}
		}
	}
</script>

<style lang="scss">
	.app__calendar{
		display: inline-block;
		width: 200px;
		color: #606266;
		
		.table-month{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 184px;
			background-color: #fff;
			z-index: 1;

			td{
				cursor: pointer;

				&:hover{
					color: $mainColor;
				}
			}
		}
		.table-year{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 184px;
			background-color: #fff;
			z-index: 2;

			td{
				cursor: pointer;

				&:hover{
					color: $mainColor;
				}
			}
		}

		table{
			margin: 0 auto;

			td{
				width: 24px;
				height: 24px;
				line-height: 24px;
				text-align: center;

				span{
					display: block;
					width: 100%;
					height: 100%;
				}
			}

			.day{
				cursor: pointer;

				&:hover,&.active{
					span{
						background-color: $mainColor;
						color: #fff;
						border-radius: 50%;
					}
				}
			}

			.prev,.next{
				color: #c0c4cc;
			}

			.via{
				background-color: #a8eaff;
				color: #fff;
				border-radius: 50%;
			}

			.today{
				color: $mainColor;
			}
		}


		.title{
			height: 30px;
			line-height: 30px;
			padding: 0 20px;
			text-align: center;
			background-color: #f8f9fb;

			.double-left,.left{
				display: inline-block;
				width: 12px;
				height: 30px;
				float: left;
				cursor: pointer;
			}

			.double-right,.right{
				display: inline-block;
				width: 12px;
				height: 30px;
				float: right;
				cursor: pointer;
			}

			.double-left{
				background: url(./../images/double_left.png) no-repeat center;

				&:hover{
					background: url(./../images/double_left_hover.png) no-repeat center;
				}
			}

			.left{
				margin-left: 5px;
				background: url(./../images/left.png) no-repeat center;

				&:hover{
					background: url(./../images/left_hover.png) no-repeat center;
				}
			}

			.double-right{
				background: url(./../images/double_right.png) no-repeat center;

				&:hover{
					background: url(./../images/double_right_hover.png) no-repeat center;
				}
			}

			.right{
				margin-right: 5px;
				background: url(./../images/right.png) no-repeat center;

				&:hover{
					background: url(./../images/right_hover.png) no-repeat center;
				}
			}


			.year,.month{
				cursor: pointer;

				&:hover{
					color: $mainColor;
				}
			}
		}
	}
</style>