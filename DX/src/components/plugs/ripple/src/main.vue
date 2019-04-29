<template>
	<div class="ripple" @click="btnClick()">
		<slot></slot>
	</div>
	
</template>

<script type="text/javascript">
	export default{
		name: 'Ripple',
		props:{
			bgColor: {
				type: String,
				default: '' //主色调
			},
			rippleColor: {
				type: String,
				default: '#fff' //波纹颜色
			},
			rippleOpacity: {
				type: String,
				default: '0.3' //波纹透明度
			},
			isMax: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return{

			}
		},
		mounted(){
			this.bgColor ? this.$el.style.backgroundColor = this.bgColor : '';

			if(this.isMax) this.$el.style.width = this.$el.scrollWidth + 'px';
		},
		methods:{
			btnClick(){
				let pDiv = this.$el;

				let cDiv = document.createElement('div');
				pDiv.appendChild(cDiv);

				let rectObj = this.forRect(pDiv);

				let _height = event.pageY - rectObj.top,
				_left = event.pageX - rectObj.left,
				_scale = 'scale(' + pDiv.clientWidth / 10 + ')';

				let position = {
					top:_height+'px',
					left:_left+'px',
					background: this.hex2Rgb()
				};

				cDiv.className = cDiv.className + " ripple-animation";
				cDiv.setAttribute("style", this.forStyle(position)),

				position.transform = _scale;
				position.opacity = "1";
				

				cDiv.setAttribute("style", this.forStyle(position));

				let finishStyle = {
					opacity: 0,
					transform:_scale,
					top:_height+'px',
					left:_left+'px',
					background: this.hex2Rgb()
				}

				setTimeout(() => {
					cDiv.setAttribute("style",this.forStyle(finishStyle));
					setTimeout(() => {
						pDiv.removeChild(cDiv);
					},750);
				},100)

			},
			forRect(target){
				let position = {
					top:0,
					left:0
				}, ele = document.documentElement;
				'undefined' != typeof target.getBoundingClientRect && (position = target.getBoundingClientRect());
				return {
					top: position.top + window.pageYOffset - ele.clientTop,
					left: position.left + window.pageXOffset - ele.clientLeft
				}
			},
			forStyle(position){
				let cssStr = '';
				for( let key in position){
					if(position.hasOwnProperty(key)) cssStr += key+':'+position[key]+';';
				};
				return cssStr;
			},
			hex2Rgb(){
				let rgb = []; // 定义rgb数组
				let sixHex = '#';
				let hex = this.rippleColor;

				if(this.rippleColor.length < 6){
					hex.replace(/[0-9A-F]/ig, kw => {
						sixHex += kw + kw;
					});
					hex = sixHex;
				}
				
				hex.replace(/[0-9A-F]{2}/ig, kw => {
					rgb.push(eval('0x' + kw));
				});
				return `rgba(${rgb.join(',')},${this.rippleOpacity})`;
			}
		}
	}
</script>

<style scoped lang="scss">
	.ripple{
		overflow: hidden;
		z-index: 0;
	}

	
</style>

<style type="text/css">
	.ripple-animation{
		position:absolute;
		border-radius: 50%;
		transition:all 0.7s ease-out;
		transition-property:transform, opacity, -webkit-transform;
		transform:scale(0);
		opacity:0;
		width: 25px;
		height: 25px;
		pointer-events:none;
		z-index: 1;
	}
</style>