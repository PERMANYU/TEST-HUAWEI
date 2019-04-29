<template>
	<div class="num">
        <div class="container">
            <div :class="['phone',getPhoneTypeClass]">
                <div class="info" v-show="sType == 3">
                    <div>手机号码：{{numObj.deviceId}}</div>
                    <div>属地：{{numObj.city}}</div>
                    <div>公司：{{numObj.company}}</div>
                    <div>模式：{{numObj.pattern}}</div>
                </div>
            </div>
            <div class="search">
                <div class="s-1">
                    <span>号码快捷查询</span>
                </div>
                <div class="s-2">
                    <span>为您提供最全面/精准的号码查询服务</span>
                </div>
                <div class="s-3" v-show = "sType == 1 || sType == 2">
                    <input placeholder="请输入要查询的号码" @keydown="searchKeydown" v-model="numObj.deviceId" :readonly="sType == 2">
                    <span class="msg">{{errorMsg}}</span>
                </div>

                <div class="s-4" v-show="sType == 3 || sType == 4">
                    <div class="success" v-show="sType == 3">查询成功（结果见左侧）</div>
                    <div class="error" v-show="sType == 4">查询失败（请核对手机号码重新查询）</div>
                </div>

                <div class="s-5">
                    <span class="btn" @click="searchClick">{{sType == 3 || sType == 4 ? '重新查询' : '查询'}}</span>
                </div>
            </div>
        </div>
        
    </div>
	
</template>

<script type="text/javascript">
	export default{
        props:{
            componentData:{}
        },
		data(){
			return{
                sType: 1, //查询状态 1:开始 2:查询中 3:查询成功 4:查询失败
                numObj:{}, //归属地详情
                errorMsg: '', //查询验证错误
			}
		},
        computed:{
            getPhoneTypeClass(){ //根据当前查询状态获取className
                return {
                    '1': '',
                    '2': 'loading',
                    '3': 'success',
                    '4': ''
                }[this.sType];
            }
        },
        mounted(){
            
        },
        methods:{
            searchKeydown(e){ //键盘按下
                if(e.keyCode == 13) this.searchClick();
            },
            searchClick(){ //查询
                if(this.sType == 2) return;

                if(this.sType == 3){
                    this.sType = 1;
                    this.numObj = {};
                    return;
                }

                if(this.sType == 4){
                    this.sType = 1;
                    return;
                }

                if(/^((13|14|15|17|18|19)[0-9]{1}\d{8})$/.test(this.numObj.deviceId)){
                    this.errorMsg = '';
                    this.sType = 2;
                    this.getNumObj();
                }else{
                    this.errorMsg = '请输入正确的手机号！';
                    return;
                }
            },
            getNumObj(){
                this.$axios.create().get(`http://10.145.209.146:8065/cmb/cmbdatainterfaceconvert/queryVPHCode/${this.numObj.deviceId}`).then(res => {
                    this.sType = 3;
                    this.numObj = res.data;
                }).catch(err => {
                    this.sType = 4;
                })
            }
        }
	}
</script>

<style scoped lang="scss">
	.num{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-image: url(./images/bg.png);
        background-size: cover;

        .container{
            position: absolute;
            display: block;
            width: 650px;
            height: 490px;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }

        .phone{
            float: left;
            width: 296px;
            height: 609px;
            zoom: .8;
            background-image: url(./images/cxq.png);
            background-size: cover;

            &.loading{
                animation: Shake .3s linear infinite;
            }

            &.success{
                background-image: url(./images/cxh.png);
            }

            .info{
                margin-top: 300px;
                margin-left: 48px;
                line-height: 40px;
                width: 200px;
                font-size: 14px;
                color: #fff;

                div{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }

        @keyframes Shake {
            0%{
                transform:rotate(0deg);
            }

            20%{
                transform:rotate(-5deg);
            }

            50%{
                transform:rotate(0deg);
            }

            80%{
                transform:rotate(5deg);
            }

            100%{
                transform:rotate(0deg);
            }
        }

        .search{
            float: left;
            width: 300px;
            margin-left: 50px;
            padding-top: 58px;

            .s-1{
                font-size: 42px;
                color: #5a8af2;
            }

            .s-2{
                margin-top: 14px;
                font-size: 18px;
                color: #5a8af2;
            }

            .s-3{
                margin-top: 26px;
                height: 40px;

                input{
                    width: 100%;
                    height: 40px;
                    border: 1px solid #e5e5e5;
                    padding: 0 10px;
                    outline: 0;

                    &:focus{
                        border: 1px solid #00c0ff;
                    }
                }

                .msg{
                    color: #e60012; 
                }
            }

            .s-4{
                margin-top: 26px;
                height: 40px;
                line-height: 40px;
                font-size: 14px;

                .success{
                    color: #7bcc8a;
                    padding-left: 40px;

                    &:after{
                        content: '';
                        position: absolute;
                        width: 26px;
                        height: 26px;
                        left: 0;
                        top: 6px;
                        background-image: url(./images/success.png);
                        background-size: cover;
                    }
                }

                .error{
                    color: #e60012;
                    padding-left: 40px;

                    &:after{
                        content: '';
                        position: absolute;
                        width: 26px;
                        height: 26px;
                        left: 0;
                        top: 6px;
                        background-image: url(./images/error.png);
                        background-size: cover;
                    }
                }
            }

            .s-5{
                margin-top: 19px;

                .btn{
                    display: block;
                    width: 100px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    background-color: #5a8af2;
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;
                }
            }

        }
	}
</style>