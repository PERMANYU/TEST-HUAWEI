<template>
	<div>
		<div class="user">
	        <Row>
	            <Col :span="2" class="kehu">
	                <img src="./images/kehu.png">
	            </Col>
	            <Col class="basic-info" :span="10">
	                <div>
	                    <span class="company">{{componentData.custName}}</span>
	                    <!-- <span class="ming">名</span> -->
	                    <span class="shi" v-if="basicData.isRealname == 1">实</span>
	                </div>
	                <div class="vip">
	                    <!-- <img src="./images/vip.png"> -->
	                    <img src="./images/gkkh.png">
	                </div>
	            </Col>
	            <Col class="main-info" :span="12">
                    <Row class="app__ellipsis">
                        <Col>
                            <span class="app__lt-label">客户名称：</span>
                            <span class="app__lt-text">{{componentData.custName}}</span>
                        </Col>
                    </Row>
                    <Row class="app__ellipsis">
                        <Col>
                            <span class="app__lt-label">客户标识：</span>
                            <span class="app__lt-text">{{componentData.custNumber || '未知'}}</span>
                            <span class="more" @click="moreClick">{{toggleText}}</span>
                        </Col>
                    </Row>
	            </Col>
	        </Row>
	    </div>

		<div class="user-basic" v-show="isShowBasic">
			<div class="app__title-1">
				<span class="app__title-name">客户基本信息</span>
            </div>
            <span class="btn-mod" @click="basicUpdate" v-if="userRightBtnControl.basicUpdateBtn"><i class="iconfont iconbianjixinxi"></i></span>
			<Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户名称：</span>
                    <span class="app__lt-text" :title="basicData.custName">{{basicData.custName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户标识：</span>
                    <span class="app__lt-text" :title="basicData.custId">{{basicData.custId}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户类型：</span>
                    <span class="app__lt-text" :title="basicData.custType | filterName">{{basicData.custType | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户子类型：</span>
                    <span class="app__lt-text" :title="basicData.custSubType | filterName">{{basicData.custSubType | filterName}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">主要证件类型：</span>
                    <span class="app__lt-text" :title="partyCert.certType">{{partyCert.certType}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">主要证件号码：</span>
                    <span class="app__lt-text" :title="partyCert.certNum">{{partyCert.certNum}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户星级：</span>
                    <span class="app__lt-text">{{basicStar.starCustomer}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">实名标记：</span>
                    <span>{{basicData.isRealname == 1 ? '已实名' : '未实名'}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户现地址：</span>
                    <span :title="basicData.custAddr" class="app__lt-text overflow-style">{{basicData.custAddr}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">失效时间：</span>
                    <span class="app__lt-text" :title="basicData.prodExpDate">{{basicData.prodExpDate || '未知'}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">联系电话：</span>
                    <span class="app__lt-text" :title="basicData.contactsInfo ? basicData.contactsInfo.mobilePhone : '空' ">{{basicData.contactsInfo ? basicData.contactsInfo.mobilePhone : '空' }}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">邮箱：</span>
                    <span class="app__lt-text" :title="basicData.contactsInfo ? basicData.contactsInfo.eMail : '空' ">{{basicData.contactsInfo ? basicData.contactsInfo.eMail : '空' }}</span>
                </Col>
            </Row>
			
		</div>

        <!-- 基本信息弹窗E -->
        <Dialog ref="basicModalType" :dialogTitle="basicDialog" :dialogSize="dialogSize" :initBtn="true">
            <Scroll :isShowRight="true">
                <div class="modal-content">
                    <Form labelWidth="120px" labelAlign="left" data-vv-scope="revise">
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="客户名称：" :requiredIcon="true" :errorMessage="errors.first('revise.custName')">
                                    <Input name="custName" v-validate="'required'" data-vv-as="客户名称" v-model="basicDataUp.custName"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="客户标识：">
                                    <Input v-model="basicDataUp.custId" disabled></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="客户类型：" :requiredIcon="true" :errorMessage="errors.first('revise.custType')">
                                    <Input name="custType" v-validate="'required'" data-vv-as="客户类型" v-model="basicDataUp.custType" disabled></Input>     
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="客户子类型：" :requiredIcon="true" :errorMessage="errors.first('revise.custSubType')">
                                    <Select v-validate="'required'" data-vv-as="客户子类型" :data="custSubTypeArr" v-model="basicDataUp.custSubType" name="custSubType"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="主要证件类型：" :requiredIcon="true" :errorMessage="errors.first('revise.certType')">
                                     <Select :data="certTypeArr" v-model="basicPartyCert.certType" name="certType" v-validate="'required'" data-vv-as="主要证件类型"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="主要证件号码：" :requiredIcon="true" :errorMessage="errors.first('revise.certNum')">
                                    <Input v-model="basicPartyCert.certNum" name="certNum" v-validate="'required'" data-vv-as="主要证件号码"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="实名标记：">
                                    <Input v-bind:value="basicDataUp.isRealname=='1'?'已实名':'未实名'" disabled></Input>
                                </FormItem>
                            </Col>
                            <Col :span="11" :offset="2">
                                <FormItem labelText="联系电话：" :requiredIcon="true" :errorMessage="errors.first('revise.mobilePhone')">
                                    <Input v-model="contactsInfo.mobilePhone" name="mobilePhone" v-validate="'required|mobile'" data-vv-as="联系电话"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="11">
                                <FormItem labelText="邮箱：" :requiredIcon="true" :errorMessage="errors.first('revise.eMail')">
                                    <Input v-validate="'required|email'" data-vv-as="邮箱" name="custAddr" v-model="contactsInfo.eMail"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="24">
                                <FormItem labelText="客户现地址：" :requiredIcon="true" :errorMessage="errors.first('revise.custType')">
                                    <Input v-validate="'required'" data-vv-as="客户现地址" name="custAddr" v-model="basicDataUp.custAddr"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Scroll>
            <div slot="btnBox">
                <span class="save" @click="basicHandleConfirm">保存</span>
                <span class="back" @click="basicHandleBack">返回</span>
            </div>
        </Dialog>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
            componentData:{}
        },
		data(){
			return{
                basicDialog: '修改基本信息',
                dialogSize: {
                    max: 820
                },
                basicData: {},    // 客户基本信息
                partyCert: {},    // 证件信息
                basicStar: {},      // 客户星级单独的对象
                basicDataUp: {},    // 客户基本信息
                basicPartyCert: {},  // 主要证件信息
                contactsInfo: {},  // 客户联系信息
				isShowBasic: false, //是否显示常用信息
                custSubTypeArr: [
                    {
                        label: '外事住宅',
                        value: '999900016'
                    },{
                        label: '普通住宅',
                        value: '999900001'
                    },{
                        label: '专用',
                        value: '999900012'
                    },{
                        label: '公用',
                        value: '100000000'
                    },
                ],
                toggleText: '更多>>',             // 更多 | 收起
                certTypeArr: [
                    {
                        label: '居民身份证',
                        value: '1'
                    },{
                        label: '外国公民护照',
                        value: '3'
                    },{
                        label: '军人身份证件',
                        value: '2'
                    },{
                        label: '户口薄',
                        value: '12'
                    },{
                        label: '人民武装警察居民身份证',
                        value: '52'
                    },{
                        label: '外国人永久居留身份证',
                        value: '50'
                    },{
                        label: '港澳台通行证',
                        value: '4'
                    },{
                        label: '港澳居民居住证',
                        value: '54'
                    },{
                        "label": "其它有效证件",
                        "value": "99"
                    }
                ],
                userRightBtnControl: {          // 权限按钮控制
                    basicUpdateBtn: false,
                },

			}
		},
		mounted(){
            this.getUserInfo();
            this.getCustStar();
            // 循环权限数据
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100701':
                        this.userRightBtnControl.basicUpdateBtn = true;
                        break;
                    default:
                        break;
                }
            })
        },
        watch: {
            componentData(newVal){
                this.basicData = JSON.parse(JSON.stringify(newVal));
                let obj = this.basicData.partyCert.find(item => item.isMainCert == '1');
                if(obj == undefined){
                    this.partyCert = {};
                }else{
                    this.partyCert = obj;
                    this.partyCert.certType = this.partyCert.certType.split('|')[1];
                }
            }
        },
		methods:{
			getUserInfo(){ //获取客户信息
                this.basicData = JSON.parse(JSON.stringify(this.componentData));
                let obj = this.basicData.partyCert.find(item => item.isMainCert == '1');
                if(obj == undefined){
                    this.partyCert = {};
                }else{
                    this.partyCert = obj;
                    this.partyCert.certType = this.partyCert.certType.split('|')[1];
                }
            },
            moreClick(){ //展开更多信息
            	if (!this.isShowBasic) {
                    this.toggleText = '收起'
                } else {
                    this.toggleText = '更多>>'
                }
                this.isShowBasic = !this.isShowBasic
            },
            // 公客基本信息(单独的客户星级字段接口)
            getCustStar () {
                this.$axios.get(this.$api.CustStar, {
                    params: {
                        custCode: '',
                        custId: this.componentData.custId
                    }
                }).then(res=> {
                    if (res.data) {
                        this.basicStar = res.data
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            // 修改基本信息
            basicUpdate () {
                this.basicDataUp = {};
                this.basicPartyCert = {};
                this.basicDataUp = JSON.parse(JSON.stringify(this.componentData));
                this.contactsInfo = this.basicDataUp.contactsInfo;
                if(this.basicDataUp.custType!=null && this.basicDataUp.custType!=undefined){
                    this.basicDataUp.custType = this.basicDataUp.custType.split('|')[1];
                }
                if(this.basicDataUp.custSubType!=null && this.basicDataUp.custSubType!=undefined){
                    this.basicDataUp.custSubType = this.basicDataUp.custSubType.split('|')[0];
                }
                if(this.basicDataUp.partyCert.length > 0){
                    let obj = this.componentData.partyCert.find(item => item.isMainCert == '1');
                    if(obj == undefined){
                        this.basicPartyCert = {};
                    }else{
                        this.basicPartyCert = obj;
                        if(this.basicPartyCert.certNum.indexOf('**') != -1){
                            this.basicPartyCert.certNum = '';
                        }
                        this.basicPartyCert.certType = this.basicPartyCert.certType.split('|')[0]
                    }
                }
                this.$refs.basicModalType.show();
            },
            // 弹框关闭
            basicHandleBack() {
                this.$refs.basicModalType.hide();
            },
            // 弹框信息保存
            basicHandleConfirm () {
                if(this.basicPartyCert.certType == '1'){
                    if(this.basicPartyCert.certNum != '' && !this.$utils.isCardId(this.basicPartyCert.certNum)){
                        this.$message.warning({"message":"请输入正确的身份证"});
                        return
                    }
                }else if(this.basicPartyCert.certType == undefined && this.basicPartyCert.certNum != undefined){
                    this.$message.warning({"message":"请选择证件类型"});
                    return
                }else if(this.basicPartyCert.certType != undefined && this.basicPartyCert.certType != '1' && this.basicPartyCert.certNum == undefined){
                    this.$message.warning({"message":"请输入证件号码"});
                    return
                }
                let arr = [
                    {
                        op:"replace",
                        path:"/custName",
                        value: this.basicDataUp.custName
                    },{
                        op:"replace",
                        path:"/custSubType",
                        value: this.basicDataUp.custSubType
                    },{
                        op:"replace",
                        path:"/custAddr",
                        value: this.basicDataUp.custAddr
                    }
                ];
                if(this.basicPartyCert.partyCertId != undefined){
                    let partyCertObj = {
                        op:"replace",
                        path:"/partyCert/partyCertId=" + this.basicPartyCert.partyCertId,
                        value: {
                            certType: this.basicPartyCert.certType,
                            certNum: this.basicPartyCert.certNum,
                            isRealnameCert: this.basicPartyCert.isRealnameCert,
                        }
                    }
                    arr.push(partyCertObj);
                }else if(this.basicPartyCert.partyCertId == undefined && (this.basicPartyCert.certType != undefined || this.basicPartyCert.isRealnameCert != undefined)){
                    let partyCertObj = {
                        op:"ADD",
                        path:"/partyCert",
                        value: {
                            isMainCert: "1",
                            statusCd: '1000',
                            certType: this.basicPartyCert.certType,
                            certNum: this.basicPartyCert.certNum,
                            isRealnameCert: this.basicPartyCert.isRealnameCert
                        }
                    }
                    arr.push(partyCertObj);
                }
                if(this.contactsInfo.contactId != undefined && this.contactsInfo.contactId != null){
                    let contactsInfo = {
                        op:"replace",
                        path:"/contactsInfo/contactId=" + this.contactsInfo.contactId,
                        value: {
                            mobilePhone: this.contactsInfo.mobilePhone,
                            eMail: this.contactsInfo.eMail
                        }
                    }
                    arr.push(contactsInfo);
                }else if(this.contactsInfo.contactId  == null || this.contactsInfo.contactId == undefined){
                    let contactsInfo = {
                        op:"ADD",
                        path:"/contactsInfo",
                        value: {
                            mobilePhone: this.contactsInfo.mobilePhone,
                            eMail: this.contactsInfo.eMail
                        }
                    }
                    arr.push(contactsInfo);
                }
                this.$validator.validateAll('revise').then((result) => {
                    if(result) {
                        this.$axios.patch(this.$api.CustomerPublicUpdate + '?custId='+ this.componentData.custId, arr).then(res => {
                            if (res.data) {
                                this.$message.success({"message": "修改成功"});
                                this.$emit('getDetail',this.componentData);
                                this.$refs.basicModalType.hide()
                            } else {
                                this.$message.error({"message": "修改失败"})
                            }
                        }).catch(err => {
                            this.$message.error({"message": err.response.data.message})
                        })
                    }
                })
            },
		}
	}
</script>

<style scoped lang="scss">
	.user{
        height: 140px;
        padding: 30px 20px;
        background-color: #fff;
        box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);
        
        .kehu{

            img{
                width: 98%;
                max-width: 80px;
                height: auto;
            }
        }

        .basic-info{
            .company{
                color: #647283;
                font-size: 18px;
            }

            .vip{
                margin-top: 20px;
            }

            .ming{
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-left: 10px;
                line-height: 20px;
                text-align: center;
                color: #fff;
                border-radius: 4px;
                background-color: #ff7e39;
                vertical-align: text-bottom;
            }

            .shi{
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-left: 10px;
                line-height: 20px;
                text-align: center;
                color: #fff;
                border-radius: 4px;
                background-color: #6cdbc9;
                vertical-align: text-bottom;
            }

            img{
                vertical-align: top;
                margin-left: 10px;
            }
        }

        .main-info{
            height: 80px;
            padding-left: 10%;
            border-left: 1px dashed #cccccc;

            .more{
                margin-left: 20px;
                color: #00c0ff;
                cursor: pointer;
            }
        }
    }

	.user-basic {
		padding: 20px;
		background-color: #fff;
		margin-top: 10px;
		box-shadow: 0px 0px 5px 0px rgba(102, 102, 102, 0.1);

        .btn-mod {
            display: block;
            padding: 3px 0 0 22px;
            position: absolute;
            top: 24px;
            right: 0;
            z-index: 99;
            background-color: #5a8af2;
            width: 50px;
            height: 24px;
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px;
            color: #ffffff;
            cursor: pointer;

            &:hover {
                background-color: #4e80ec;
            }

            i {
                color: #ffffff;
                font-size: 13px;
            }
        }

        .col {
            padding: 8px 0;
        }
	}
    .overflow-style {
        display: inline-block;
        width: 160px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: text-bottom;
    }
    // 基本信息
    .modal-content {
        padding: 20px 30px;
    }
    .col{
        padding: 8px 0;
    }
</style>