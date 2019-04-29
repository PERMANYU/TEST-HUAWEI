<template>
	<div class="wrap">
		<div class="login-bg" v-if="isLogin">
			<div class="login-container">
				<h3>Welcome!</h3>
				<h2>上海电信CPCP系统</h2>
				<div class="errtipBox">
					<div :class="['errtip',errorFlag?'active':'']" v-show="errorMessage">
						<span class="message">
							<span class="icon"></span>
							{{errorMessage}}
						</span>
					</div>
				</div>
				<div :class="['formBox',isNameError ? 'error' : '',isNameFocus ? 'focus' : '']">
					<span class="i-name">账号</span>
					<input type="text" v-model="name" @keydown="inputKey($event)" @keyup="inputKeyup($event,'name')" @focus="inputFocus('name')" @blur="inputBlur('name')" />
					<div class="focus-line"></div>
				</div>
				<div :class="['formBox',isPsdError ? 'error' : '',isPsdFocus ? 'focus' : '']">
					<span class="i-name">密码</span>
					<input type="password" v-model="psd" @keydown="inputKey($event)" @keyup="inputKeyup($event,'psd')" @focus="inputFocus('psd')" @blur="inputBlur('psd')" />
					<div class="focus-line"></div>
				</div>
				<div class="form-bottom">
					<div :class="[ 'check-psd',isRemember ? 'active' : '']" @click="rememberClick()"></div>
					<div class="rem-psd" @click="rememberClick()">记住密码</div>
					<div class="login-btn" @click="submitClick()">登录</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import userinfo from '@/assets/js/userinfo';

	export default {
		data() {
			return {
				name: "",
				isNameError: false,
				isNameFocus: false,
				psd: "",
				isPsdError: false,
				isPsdFocus: false,
				isRemember: false,
				id: '123',
				errorMessage: "",
				errorFlag: false,
				isLogin: false,
				loginURL: "",
				loginParams: {}
			}
		},
		mounted() {
			this.getUrl();
		},
		methods: {
			// 获取url 参数   
			// http://10.4.31.205:9889/#/login?CPC-SID=d3994e7f-d946-49a3-8b9b-bd04f1bcf2bc
			getUrl() {
                let sid = '';
				let url = location.href;
				let theRequest = new Object(); 
				if (url.indexOf("?") != -1) { 
					let str = url.split("?")[1],
                    strs = str.split("&"); 
                    for(let i = 0; i < strs.length; i ++) { 
                        sid = strs[i].split("=")[1]
                    }
                    theRequest['CPC-SID'] = sid;
				}
				if(theRequest['CPC-SID'] == undefined){
					this.isLogin = true;
				}else{
					this.isLogin = false;
					this.submitClick(theRequest['CPC-SID']);
				}
			},
			rememberClick() {
				this.isRemember = !this.isRemember
			},
			inputKey(event,type) {
				// 回车登录
				event.keyCode == 13 ? this.submitClick() : '';
			},
			inputKeyup(event,type){
				// this.checkUser();
			},
			//登录
			submitClick(val) {
				if(!this.checkLogin() && this.isLogin == true) return;
				if(this.isLogin == true){
					this.loginURL = this.$api.GetUserStorage;
					this.loginParams = {
						params: {
							"sysUserCode": this.name,
	                        "systemInfoId": 138
						}
					}
				}else{
					this.loginURL = this.$api.GetUserStorageCache;
					this.loginParams = {
						headers: {
	                        sid: val
	                    }
	                }
				}

				// 权限查询
                this.$axios.get(this.loginURL,this.loginParams).then((res) => {
                    if (res.data.success || true) {
                        let userObj = res.data.systemUser,
							userString = JSON.stringify(userObj);
							// console.log(userinfo);
							// userinfo.userStorage = userObj;
                        localStorage.setItem(userinfo.userStorage, userString);

                        //保存用户信息
                        localStorage.setItem(userinfo.userNameKey, this.name);
                        localStorage.setItem(userinfo.userRememberKey, this.isRemember ? 1 : 0);


                        if(this.isRemember) {
                            localStorage.setItem(userinfo.userIdKey, userObj.staffId);
                            localStorage.setItem(userinfo.userPwKey, this.psd);
                        } else {
                            sessionStorage.setItem(userinfo.userIdKey, userObj.staffId);
                            localStorage.removeItem(userinfo.userIdKey);
                            localStorage.removeItem(userinfo.userPwKey);
                        }

                        this.$router.push({ 'path': `/` })
                    } else {
                        this.$message.warning({"message": "当前用户没有权限！"});
                    }               
                }).catch(err => {
                    this.$message.warning({"message": "帐号密码错误！"})
                })
			},
			checkLogin(){
				this.isNameError = false;
				this.isPsdError = false;
				if(this.name === ""){
					this.errorMessage = '请输入账号';
					this.isNameError = true;
					return false;
				} else if(this.psd === "") {
					this.errorMessage = '请输入密码';
					this.isPsdError = true;
					return false;
				} else if(this.psd != '138'){
					this.$message.error({ message: "密码错误！" });
				}else{
					this.errorMessage = '';
					return true;
				}
			},
			inputFocus(type) {
				if(type === 'name'){
					this.isNameFocus = true;
				}else{
					this.isPsdFocus = true;
				}
			},
			inputBlur(type) {
				if(type === 'name'){
					this.isNameFocus = false;
				}else{
					this.isPsdFocus = false;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		height: 100%;
		.login-bg {
			width: 100%;
			height: 100%;
			background: url(images/loginbg.jpg) no-repeat center;
			background-size: 100% 100%;
			position: relative;
			.login-container {
				position: absolute;
				width: 310px;
				height: 290px;
				top: 50%;
				left: 50%;
				margin-left: -155px;
				margin-top: -145px;
				h3 {
					font-family: Humanist521BT-Light;
					font-size: 30px;
					font-weight: 200;
					font-stretch: normal;
					letter-spacing: 0px;
					color: #ffffff;
					margin-bottom: 10px;
				}
				h2 {
					font-family: Humanist521BT-Light;
					font-size: 30px;
					font-weight: 200;
					font-stretch: normal;
					letter-spacing: 0px;
					color: #ffffff;
					margin-bottom: 50px;
				}
				.errtipBox{
					height: 50px;
					.errtip{
						margin: 10px auto;
						width: 200px;
						height: 30px;
						line-height: 30px;
						box-sizing: border-box;
						border: none;
						background-color: #3A8EE6;
						border-radius: 15px;
						text-align: center;
						color: #ffd800;

						.message{
							display: inline-block;

							.icon{
								position: absolute;
								display: inline-block;
								left: -20px;
								width: 12px;
								height: 100%;
								background: url(./images/error_message.png) no-repeat center;
							}
						}
					}
				}
				.formBox {
					width: 100%;
					height: 30px;
					line-height: 30px;
					margin-bottom: 20px;
					padding-left: 40px; 
					font-family: MicrosoftYaHeiLight;
					font-size: 14px;
					font-weight: normal;
					font-stretch: normal;
					letter-spacing: 0px;
					color: #ffffff;
					border-bottom: 1px solid #fff;

					&.error{
						color: #ffd800;
						border-bottom: 1px solid #ffd800;

						&:after{
							content: '';
							position: absolute;
							display: block;
							right: 5px;
							width: 12px;
							height: 100%;
							background: url(./images/error_input.png) no-repeat center;
						}
					}

					&.focus{
						border-color: transparent;
						.focus-line{
							position: absolute;
							display: block;
							width: 100%;
							height: 16px;
							left: 0;
							bottom: -11px;
							background-image: url(./images/input_focus.png);
						}

						
					}

					.i-name{
						position: absolute;
						display: inline-block;
						left: 0;
						top: 0;
						width: 40px;
						height: 30px;
						line-height: 30px;
						padding-left: 10px;


					}

					input {
						float: left;
						width: 100%;
						height: 30px;
						line-height: 30px;
						padding: 0 20px 0 0;
						border: none;
						background-color: transparent;
						outline: none;
						text-indent: 10px;
						color: #ffffff;
					}
				}
				.check-psd {
					width: 12px;
					height: 12px;
					float: left;
					margin-top: 9px;
					margin-right: 9px;
					background: url(images/no_sel.png) no-repeat;
					background-position: center;
					background-size: 100% 100%;
					cursor: pointer;
					&.active {
						background: url(images/sel.png) no-repeat;
						background-size: 100% 100%;
					}
				}
			}
			.rem-psd {
				display: inline-block;
				float: left;
				height: 30px;
				line-height: 30px;
				font-family: MicrosoftYaHeiLight;
				font-size: 12px;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0px;
				color: #ffffff;
				cursor: pointer;
			}
			.login-btn {
				float: right;
				width: 114px;
				height: 30px;
				line-height: 30px;
				border: 1px solid #fff;
				border-radius: 15px;
				text-align: center;
				color: #fff;
				font-family: MicrosoftYaHeiLight;
				font-size: 14px;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0px;
				cursor: pointer;
			}
		}
	}
</style>