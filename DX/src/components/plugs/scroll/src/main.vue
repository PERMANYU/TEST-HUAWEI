<template>
	<div class="scroll" @wheel="mousewheel($event)" :style="scrollStyle">
		<div class="src-content" ref="content" >
			<div ref="contentContainer" @DOMSubtreeModified="DOMSubtreeModified">
				<slot></slot>
			</div>
		</div>
		<div class="s-h" v-if="isShowRight && !isHeightSame" :style="{width: scrollWidth,backgroundColor: scrollBgColor}" onselectstart="return false">
			<div class="s-h-s" 
				:style="scrollHeightStyle"
				@mousedown="hMousedown" 
				@mouseup="hMouseup"></div>
		</div>
		<div class="s-w" v-if="isShowBottom && !isWidthSame" :style="{height: scrollWidth,backgroundColor: scrollBgColor}" onselectstart="return false">
			<div class="s-w-s" 
				:style="scrollWidthStyle"
				@mousedown="wMousedown" 
				@mouseup="wMouseup" ></div>
		</div>
		
	</div>
</template>

<script type="text/javascript">
	export default{
		name: 'Scroll',
		props: {
			scrollBgColor:{
				type: String,
				default: '#ececec'
			},
			scrollColor:{
				type: String,
				default: '#cbcbcb'
			},
			scrollWidth:{
				type: String,
				default: '10px'
			},
			isShowBottom:{
				type: Boolean,
				default: false
			},
			isShowRight:{
				type: Boolean,
				default: false
			},
			fixedLeftClassName:{
				type: String,
				default: ''
			},
			fixedRightClassName:{
				type: String,
				default: ''
			},
			fixedTopClassName:{
				type: String,
				default: ''
			},
			fixedBottomClassName:{
				type: String,
				default: ''
			},
			bottomLoadRange:{
				type: Number,
				default:10
			},
			watchData:null
		},
		data(){
			return{
				maxHeight: 0,
				maxWidth: 0,
				srcHeight: 0,
				srcWidth: 0,
				isHeightDown: false,
				isWidthDown: false,
				scrollHeightStyle: {
					height: '0px',
					top: '0'
				},
				scrollWidthStyle: {
					width: '0px',
					left: '0'
				},
				scrollStyle:{

				},
				mouseClient:{
					x: 0,
					y: 0
				},
				scrollRect:{
					x: 0,
					y: 0
				},
				isHeightSame: false,
				isWidthSame: false,
				isDestroyed: false,
				scrollTopTimer: null,
				maxMove: 0
			}
		},
		watch:{
			watchData:{
				handler(val,oldval){
					this.init();
				},
				deep: true
			}
		},
		computed:{

		},
		mounted(){
			setTimeout(() => {
				if(this.isDestroyed) return;
				this.initEvent();
				this.init();
			},300)
		},
		activated(){
			this.$refs.content.scrollTop = this.scrollRect.x;
			this.$refs.content.scrollLeft = this.scrollRect.y;
		},
		destroyed(){
			this.isDestroyed = true;
			if(this.scrollTopTimer) clearInterval(this.scrollTopTimer);
			document.removeEventListener('mouseup', this.mouseupEvent);
			document.removeEventListener('mousemove', this.mousemoveEvent);
			window.removeEventListener('resize', this.init);
		},
		methods:{
			initEvent(){
				document.addEventListener('mouseup',this.mouseupEvent);
				document.addEventListener('mousemove',this.mousemoveEvent);
				window.addEventListener('resize',this.init);
			},
			mouseupEvent(){
				this.isHeightDown = false;
				this.isWidthDown = false;
			},
			mousemoveEvent(e){
				if(this.isHeightDown){
					this.hMousemove(e);
					e.preventDefault();
				}

				if(this.isWidthDown){
					this.wMousemove(e);
					e.preventDefault();
				}
			},
			initScroll(){
				let contentRect = this.$refs.content.getBoundingClientRect();
				let elRect = this.$el.getBoundingClientRect();
				//内容宽高

				let elCurrentStyle = {}
				if(this.$el.currentStyle){
					elCurrentStyle = this.$el.currentStyle;
				}else{
					elCurrentStyle = document.defaultView.getComputedStyle(this.$el,null)
				}

				this.srcHeight = this.$refs.content.scrollHeight + parseInt(elCurrentStyle['paddingTop']) + parseInt(elCurrentStyle['paddingBottom']);
				this.srcWidth = this.$refs.content.scrollWidth + parseInt(elCurrentStyle['paddingLeft']) + parseInt(elCurrentStyle['paddingRight']);

				this.srcHeight = this.srcHeight - (this.isShowBottom ? parseInt(this.scrollWidth) : 0);
				this.srcWidth = this.srcWidth - (this.isShowRight ? parseInt(this.scrollWidth) : 0);

				//容器的宽高
				this.maxHeight = elRect.height - (this.isShowBottom ? parseInt(this.scrollWidth) : 0);
				this.maxWidth = elRect.width - (this.isShowRight ? parseInt(this.scrollWidth) : 0);

				//计算高度滚动条
				if(Math.ceil(this.srcHeight) > Math.ceil(this.maxHeight) && 
					Math.floor(this.srcHeight) > Math.floor(this.maxHeight)){
					this.isHeightSame = false;
					let scrollH = Math.floor(this.maxHeight / this.srcHeight * this.maxHeight);
					this.scrollHeightStyle.height = `${scrollH}px`;
					this.scrollHeightStyle.width = this.scrollWidth;
					this.scrollHeightStyle.backgroundColor = this.scrollColor;

					if(this.isShowRight){
						this.scrollStyle.paddingRight = this.scrollWidth;
					}
				}else{
					this.isHeightSame = true;
					this.scrollHeightStyle.height = `${this.maxHeight}px`
				}
				//计算宽度滚动条
				if(Math.ceil(this.srcWidth) > Math.ceil(this.maxWidth) && 
					Math.floor(this.srcWidth) > Math.floor(this.maxWidth)){
					this.isWidthSame = false;
					let scrollW = Math.floor(this.maxWidth / this.srcWidth * this.maxWidth);
					this.scrollWidthStyle.width = `${scrollW}px`;
					this.scrollWidthStyle.height = this.scrollWidth;
					this.scrollWidthStyle.backgroundColor = this.scrollColor;

					if(this.isShowBottom){
						this.scrollStyle.paddingBottom = this.scrollWidth;
					}
				}else{
					this.isWidthSame = true;
					this.scrollWidthStyle.width = `${this.maxWidth}px`
				}
			},
			init(){
				this.initScroll();

				this.$refs.content.scrollTop = 0;
				this.$refs.content.scrollLeft = 0;
				this.scrollHeightStyle.top = 0;
				this.scrollWidthStyle.left = 0;
				this.fixedWidth(0);
				this.fixedHeight(0);
			},
			checkRect(){
				let elRect = this.$el.getBoundingClientRect();
				let elWidth = elRect.width - (this.isShowRight ? parseInt(this.scrollWidth) : 0),
					elHeight = elRect.height - (this.isShowBottom ? parseInt(this.scrollWidth) : 0);

				let elCurrentStyle = {}
				if(this.$el.currentStyle){
					elCurrentStyle = this.$el.currentStyle;
				}else{
					elCurrentStyle = document.defaultView.getComputedStyle(this.$el,null)
				}

				let scrollHeight = this.$refs.content.scrollHeight + parseInt(elCurrentStyle['paddingTop']) + parseInt(elCurrentStyle['paddingBottom']);
				let scrollWidth = this.$refs.content.scrollWidth + parseInt(elCurrentStyle['paddingLeft']) + parseInt(elCurrentStyle['paddingRight']);

				scrollHeight = scrollHeight - (this.isShowBottom ? parseInt(this.scrollWidth) : 0);
				scrollWidth = scrollWidth - (this.isShowRight ? parseInt(this.scrollWidth) : 0);

				if(this.srcHeight == scrollHeight && 
					this.srcWidth == scrollWidth && 
					this.maxHeight == elHeight && 
					this.maxWidth == elWidth){
					return;
				}else{
					if(this.fixedTopClassName || this.fixedRightClassName || this.fixedBottomClassName || this.fixedLeftClassName){
						this.init();
					}else{
						this.initScroll();
					}
				}
			},
			hMousedown(e){
				this.mouseClient.x = e.clientX;
				this.mouseClient.y = e.clientY;
				this.checkRect();
				this.isHeightDown = true;
			},
			hMouseup(){
				this.isHeightDown = false;
			},
			hMousemove(e){
				let movementY = e.clientY - this.mouseClient.y;
				this.mouseClient.y = e.clientY;

				this.bottomLoad(movementY);

				if(movementY > 0 && parseFloat(this.scrollHeightStyle.height) + parseFloat(this.scrollHeightStyle.top) >= this.maxHeight) return;
				if(movementY < 0 && parseFloat(this.scrollHeightStyle.top) <= 0) return;
				
				//高滚动
				this.hightMove(movementY);
			},
			mousewheel(e){
				this.checkRect();

				// if(e.deltaY < 0 && this.maxMove === 0){
				// 	this.maxMove = -100;
				// }else if(e.deltaY > 0 && this.maxMove === 0){
				// 	this.maxMove = 100;
				// }

				// this.maxMove += e.deltaY > 0 ? 30 : -30;

				// if(this.maxMove < -200){
				// 	this.maxMove = -200;
				// }else if(this.maxMove > 200){
				// 	this.maxMove = 200;
				// }

				if(e.deltaY > 0){
					this.maxMove = this.maxMove > 0 ? this.maxMove + 5 : 150;
				}else{
					this.maxMove = this.maxMove < 0 ? this.maxMove - 5 : -150;
				}

				//let deltaY = e.deltaY > 0 ? this.maxMove + 100 : -100 - this.maxMove;
				

				this.bottomLoad(this.maxMove);

				if(e.deltaY > 0 && parseFloat(this.scrollHeightStyle.height) + parseFloat(this.scrollHeightStyle.top) >= this.maxHeight) return;
				if(e.deltaY < 0 && parseFloat(this.scrollHeightStyle.top) <= 0) return;

				e.preventDefault();
				e.stopPropagation();
				//高滚动
				let h = parseInt(this.$refs.content.scrollTop) + this.maxMove;

				this.scrollSmooth(h)

				
				this.$emit('hightMove',h);
			},
			hightMove(range){
				//高滚动
				let h = parseInt(this.scrollHeightStyle.top) + range;
				if(h < 0) h = 0;
				if(h + parseInt(this.scrollHeightStyle.height) > this.maxHeight) h = this.maxHeight - parseInt(this.scrollHeightStyle.height);
				this.scrollHeightStyle.top = h + 'px';

				let sh = (this.srcHeight - this.maxHeight) / (this.maxHeight - parseInt(this.scrollHeightStyle.height));
				this.$refs.content.scrollTop = h * sh;
				this.scrollRect.x = h * sh;

				this.fixedHeight(h * sh);
				this.$emit('hightMove',h * sh);
			},
			bottomLoad(range){
				//验证是否底部进行加载
				if(range > 0 && parseFloat(this.scrollHeightStyle.height) + parseFloat(this.scrollHeightStyle.top) >= this.maxHeight - this.bottomLoadRange){
					this.$emit('bottomLoad');
				}
			},
			wMousedown(e){
				this.mouseClient.x = e.clientX;
				this.mouseClient.y = e.clientY;
				this.checkRect();
				this.isWidthDown = true;
			},
			wMouseup(){
				this.isWidthDown = false;
			},
			wMousemove(e){
				let movementX = e.clientX - this.mouseClient.x;
				this.mouseClient.x = e.clientX;

				if(movementX > 0 && parseFloat(this.scrollWidthStyle.width) + parseFloat(this.scrollWidthStyle.left) >= this.maxWidth) return;
				if(movementX < 0 && parseFloat(this.scrollWidthStyle.left) <= 0) return;
				e.preventDefault();
				e.stopPropagation();

				//宽滚动
				let w = parseInt(this.scrollWidthStyle.left) + movementX;
				if(w < 0) w = 0;
				if(w + parseInt(this.scrollWidthStyle.width) > this.maxWidth) w = this.maxWidth - parseInt(this.scrollWidthStyle.width);

				this.scrollWidthStyle.left = w + 'px';

				let sw = (this.srcWidth - this.maxWidth) / (this.maxWidth - parseInt(this.scrollWidthStyle.width));
				this.$refs.content.scrollLeft = w * sw;
				this.scrollRect.y = w * sw;

				this.fixedWidth(w * sw);
			},
			fixedWidth(w){
				let fixedLeftArray = this.$refs.content.getElementsByClassName(this.fixedLeftClassName);
				for(let i = 0; i < fixedLeftArray.length; i++){
					let f = fixedLeftArray[i];
					if(w === 0){
						f.classList.remove('app__scroll-l-shadow');
					}else{
						f.classList.add('app__scroll-l-shadow');
					}
					f.style.zIndex = 1;
					f.style.left = `${Math.floor(w)}px`;
				}

				let fixedRightArray = this.$refs.content.getElementsByClassName(this.fixedRightClassName);
				for(let i = 0; i < fixedRightArray.length; i++){
					let f = fixedRightArray[i];
					// f.style.position = 'absolute';
					f.style.zIndex = 1;
					f.style.right = `${this.srcWidth - this.maxWidth - w}px`;
				}
			},
			fixedHeight(h){
				let fixedTopArray = this.$refs.content.getElementsByClassName(this.fixedTopClassName);
				for(let i = 0; i < fixedTopArray.length; i++){
					let f = fixedTopArray[i];
					if(h === 0){
						f.classList.remove('app__scroll-t-shadow');
					}else{
						f.classList.add('app__scroll-t-shadow');
					}
					f.style.zIndex = 2;
					f.style.top = `${Math.floor(h)}px`;
				}

				let fixedBottomArray = this.$refs.content.getElementsByClassName(this.fixedTopClassName);
				for(let i = 0; i < fixedBottomArray.length; i++){
					let f = fixedBottomArray[i];
					let fRect = f.getBoundingClientRect();
					// f.style.position = 'absolute';
					f.style.zIndex = 2;
					f.style.bottom = `0`;
				}
			},
			getHeightScrollTop(){
				return this.$refs.content.scrollTop;
			},
			setHeightScrollTop(val){
				this.scrollSmooth(val);
			},
			scrollSmooth(position){
				setTimeout( () =>{
					if(this.moveing){
						clearInterval(this.scrollTopTimer);
					}else{
						this.moveing = true;
					}
					
					if(position < 0){
						position = 0;
					}else if(position > this.srcHeight - this.maxHeight){
						position = this.srcHeight - this.maxHeight;
					}else{
						position = Math.ceil(position);
					}

					let curPosition = Math.ceil(this.$refs.content.scrollTop),
						bool = curPosition - position > 0 ? -1 : 1,
						speed = 0;

					this.scrollTopTimer = setInterval( () => {
						curPosition = Math.ceil(this.$refs.content.scrollTop);
						speed=Math.ceil(Math.abs(position - curPosition)/10);

						if(position == curPosition){
							this.moveing = false;
							this.maxMove = 0;
							clearInterval(this.scrollTopTimer);
						}

						let t = curPosition + speed * bool;
						this.fixedHeight(t);
						this.$refs.content.scrollTop = t;
						this.scrollRect.x = t;
						


						let sh = (this.srcHeight - this.maxHeight) / (this.maxHeight - parseInt(this.scrollHeightStyle.height)),
							elRect = this.$el.getBoundingClientRect(),
							newTop = t/sh + parseInt(this.scrollHeightStyle.height);

						if(newTop > elRect.height){
							newTop = elRect.height - parseInt(this.scrollHeightStyle.height);
						}else{
							newTop = t/sh;
						}
						this.scrollHeightStyle.top = `${newTop}px`;

					},8)
				},17)

				
			},
			DOMSubtreeModified(){
				// this.checkRect();
			}
		}
	}
</script>

<style scoped lang="scss">
	.scroll{
		width: 100%;
		height: 100%;

		&:hover{
			.s-h,.s-w{
				opacity: 1;
			}
		}

		.src-content{
			/*display: inline-block;*/
			width: 100%;
			height: 100%;
			overflow: hidden;
			/*scroll-behavior: smooth;*/

			/deep/ .app__scroll-t-shadow{
				box-shadow: 0 1px 6px #c2d4ee;
			}

			/deep/ .app__scroll-l-shadow{
				box-shadow: 1px 0 6px #c2d4ee;
			}
		}

		.s-h{
			position: absolute;
			height: 100%;
			right: 0;
			top: 0;
			opacity: .3;
			cursor: pointer;
			z-index: 0;

			.s-h-s{
				position: absolute;
				top: 0;
				right: 0;
				height: 10px;
				border-radius: 5px;
			}
			
		}

		.s-w{
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 0;
			opacity: .3;
			cursor: pointer;
			z-index: 0;

			.s-w-s{
				position: absolute;
				left: 0;
				top: 0;
				width: 50px;
				border-radius: 5px;
			}
			
		}
	}
</style>