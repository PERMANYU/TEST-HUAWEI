<template>
	<div>
		<div class="user">
	        <Row>
	            <Col :span="2">
	                <img src="./images/kehu.png">
	            </Col>
	            <Col class="basic-info" :span="10">
	                <div>
	                    <span class="company">{{componentData.custName}}</span>
	                    <!-- <span class="ming">名</span> -->
	                    <span class="shi" v-if="componentData.isRealname === 1">实</span>
	                </div>
	                <div class="vip">
	                    <!-- <img src="./images/vip.png"> -->
	                    <img src="./images/zqkh.png">
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
            <span class="btn-mod" @click="handleModify" v-if="userRightBtnControl.basicUpdateBtn"><i class="iconfont iconbianjixinxi"></i></span>
			<Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户名称：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.custName">{{componentData.custName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6" v-if="componentData.certType == '3|外国公民护照'">
                    <span class="app__lt-label">国家/地区：</span>
                    <span class="app__lt-text overflow-style">{{componentData.nationality | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">主要证件类型：</span>
                    <span class="app__lt-text overflow-style">{{componentData.certType | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户子类型：</span>
                    <span class="app__lt-text  overflow-style">{{componentData.custSubType | filterName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6" v-if="componentData.certType != '3|外国公民护照'">
                    <span class="app__lt-label">实名标记：</span>
                    <span class="app__lt-text overflow-style">{{componentData.isRealname === 1 ? '已实名' : '未实名'}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">根客户标识：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.rootCustId">{{componentData.rootCustId}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">根客户名称：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.rootCustName">{{componentData.rootCustName}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户等级：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.customerLevel">{{componentData.customerLevel}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">主要证件号码：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.certNum">{{componentData.certNum}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">集团分群1：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.groupDivided1">{{componentData.groupDivided1}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">集团分群2：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.groupDivided2">{{componentData.groupDivided2}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">创建时间：</span>
                    <span class="app__lt-text overflow-style">{{componentData.createDate | getLocalTime}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户标识：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.custId">{{componentData.custId}}</span>
                </Col>
            </Row>
            <Row>
                <Col class="app__ellipsis" :span="6" v-if="componentData.certType == '3|外国公民护照'">
                    <span class="app__lt-label">实名标记：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.isRealname === 1 ? '已实名' : '未实名'">{{componentData.isRealname === 1 ? '已实名' : '未实名'}}</span>
                </Col>
                <Col class="app__ellipsis" :span="6">
                    <span class="app__lt-label">客户现地址：</span>
                    <span class="app__lt-text overflow-style" :title="componentData.custAddr">{{componentData.custAddr}}</span>
                </Col>
            </Row>			
		</div>

        <!-- 基本信息弹窗S -->
        <Dialog ref="modalType" :dialogTitle="basicDialog" :dialogSize="dialogSize" :initBtn="true">
            <div class="modal-content">
                <Scroll :isShowRight="true">
                    <Form labelWidth="120px" labelAlign="left">
                        <Row>
                            <Col :span="12">
                                <FormItem labelText="客户名称：" :requiredIcon="true" small>
                                    <Input disabled v-model="changeObjData.custName"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="10" :offset="2">
                                <FormItem labelText="根客户名称: " small>
                                    <Input disabled v-model="changeObjData.rootCustName"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="12">
                                <FormItem labelText="根客户标识：" small>
                                    <Input disabled v-model="changeObjData.rootCustId"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="10" :offset="2">
                                <FormItem labelText="主要证件类型：" :requiredIcon="true" small>
                                    <Select disabled
                                        :data="certTypeData"
                                        v-model="changeObjData.certType"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="12">
                                <FormItem labelText="主要证件号码：" :requiredIcon="true" small>
                                    <Input disabled v-model="changeObjData.certNum"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="10" :offset="2">
                                <FormItem labelText="客户类型：" :requiredIcon="true" small>
                                    <Select :data="custTypeData" v-model="changeObjData.custType" :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="12">
                                <FormItem labelText="客户子类型：" :requiredIcon="true" small>
                                    <Select
                                            :disabled="otherDisabled"
                                            :data="custSubTypeData"
                                            v-model.trim="changeObjData.custSubType"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="10" :offset="2">
                                <FormItem labelText="客户等级：" small>
                                    <Select :data="customerLevelData" v-model="changeObjData.customerLevel" :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="12">
                                <FormItem labelText="集团分群一层：" small>
                                    <Select :data="groupDivided1" v-model="changeObjData.groupDivided1"  dataValueStr="attrValueName" dataLabelStr="attrValueName" :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="10" :offset="2">
                                <FormItem labelText="集团分群二层：" small>
                                    <Select :data="groupDivided2" v-model="changeObjData.groupDivided2" dataValueStr="attrValueName" dataLabelStr="attrValueName" :isNullSel="false"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="12">
                                <FormItem labelText="客户资料新建时间：" small>
                                    <Input disabled :value="changeObjData.createDate | getLocalTime"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="10" :offset="2">
                                <FormItem labelText="客户标识：" small>
                                    <Input disabled v-model="changeObjData.custId"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="12">
                                <FormItem labelText="实名标记：" small>
                                    <Input disabled :value="changeObjData.isRealname === 1 ? '已实名' : '未实名' "></Input>
                                </FormItem>
                            </Col>
                            <Col :span="10" :offset="2" v-if="changeObjData.certType == '3'">
                                <FormItem labelText="国家/地区：" :requiredIcon="true" small>
                                    <Select disabled
                                            :data="nationalityData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            v-model="changeObjData.nationality"></Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col :span="24">
                                <FormItem labelText="客户现地址：" small>
                                    <Input disabled v-model="changeObjData.custAddr"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Scroll>
            </div>
            <div slot="btnBox">
                <span class="save" @click="handleSave">保存</span>
                <span class="back" @click="handleCancel">返回</span>
            </div>
        </Dialog>
        <!-- 基本信息弹窗E -->
	</div>
</template>

<script type="text/javascript">
    import mainData from '@/assets/json/main.json'
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
                isShowBasic: false, //是否显示常用信息
                changeObjData: {},     // 修改基本信息
                // 修改客户信息区域
                custTypeData: [             // 客户类型
                    {
                        label: '政企客户',
                        value: '1000'
                    }
                ],
                toggleText: '更多>>',             // 更多 | 收起
                certTypeData: mainData.certTypeData,
                custSubTypeData: mainData.custSubTypeData,        // 客户子类型
                customerLevelData: [            // 客户等级
                    {
                        label: 'A',
                        value: 'A'
                    },{
                        label: 'B',
                        value: 'B'
                    },{
                        label: 'C',
                        value: 'C'
                    },{
                        label: 'D',
                        value: 'D'
                    },{
                        label: 'E',
                        value: 'E'
                    },{
                        label: '银卡',
                        value: '银卡'
                    },{
                        label: '金卡',
                        value: '金卡'
                    },{
                        label: '白金卡',
                        value: '白金卡'
                    },{
                        label: '白金卡P',
                        value: '白金卡P'
                    },{
                        label: '高',
                        value: '高'
                    },
                ],
                groupDivided1: [],           // 集团分群1层
                groupDivided2: [],           // 集团分群2层
                nationalityData: [],         // 国家/地区 
                userRightBtnControl: {       // 权限按钮控制
                    basicUpdateBtn: false,
                },
                otherDisabled: false
			}
		},
		mounted(){
            this.getMainData();
            // 循环权限数据
            this.$user.getFuncComps().forEach((item) => {
                switch (item.compCode) {
                    case 'F-CMB-100606':
                        this.userRightBtnControl.basicUpdateBtn = true;
                        break;
                    default:
                        break;
                }
            })
        },
		methods:{
            // 主数据
            getMainData () {
                // 国家/地区
                this.$getjsons.getJson("PTY-0005").then(res => {
                    this.nationalityData = res.data.attrSpecDetail.attrValueList
                })
                // 集团分群一层
                this.$getjsons.getJson("CUS-SH-001").then(res => {
                    this.groupDivided1 = res.data.attrSpecDetail.attrValueList
                })
                // 集团分群二层
                this.$getjsons.getJson("CUS-SH-008").then(res => {
                    this.groupDivided2 = res.data.attrSpecDetail.attrValueList
                })
            },

            moreClick(){ //展开更多信息
                if (!this.isShowBasic) {
                    this.toggleText = '收起'
                } else {
                    this.toggleText = '更多>>'
                }
                this.isShowBasic = !this.isShowBasic
            },
            // 修改按钮
            handleModify () {
                this.$refs.modalType.show()
                this.modifyDataFlag = this.componentData
                this.changeObjData = Object.assign({}, this.componentData)
                /* 
                    集团分群一层属性标识    120011
                    集团分群二层属性标识    120012
                */
                let group1 = '120011',
                   group2 = '120012',
                   customerLevel = '120019';
                   
                this.changeObjData.custAttr.forEach(item => {
                    if(item.attrId == group1) {
                        this.changeObjData['groupDivided1Id'] = item.custAttrId
                    } else if (item.attrId == group2) {
                        this.changeObjData['groupDivided2Id'] = item.custAttrId
                    } else if (item.attrId == customerLevel) {
                        this.changeObjData['customerLevelId'] = item.custAttrId
                    }
                })
                
                switch (this.changeObjData.custType) {
                    case '政企客户':
                        this.changeObjData.custType = '1000';
                        break;
                    case '公众客户':
                        this.changeObjData.custType = '1100';
                        break;
                    case '转售客户':
                        this.changeObjData.custType = '1200';
                        break;
                    case '其他客户':
                        this.changeObjData.custType = '9900';
                        break;
                    default:
                        break;
                }

                Object.keys(this.changeObjData).forEach((key) => {
                    if (typeof this.changeObjData[key] === 'string' && this.changeObjData[key].indexOf('|') !== -1) {
                        this.changeObjData[key] =  this.changeObjData[key].split('|')[0]
                    }
                });

                // 禁用客户子类型
                let changeCertType = this.changeObjData.certType
                if (changeCertType == '15' || changeCertType == '39' || changeCertType == '34' || changeCertType == '43' || changeCertType == '41') {
                    this.otherDisabled = true
                }
            },
            // 保存
            handleSave () {
                let otherObj = {},
                    allArr = [],
                    otherArr = ['customerLevel', 'groupDivided1', 'groupDivided2'];
                otherArr.forEach(item => {
                    if (this.modifyDataFlag[item] == null) {
                        otherObj = {
                            "op": this.modifyDataFlag[item] == null ? "ADD" : "replace",
                            "path": this.modifyDataFlag[item] == null ? "/custAttr" : "/custAttr/custAttrId=" + this.changeObjData[item + 'Id'],
                            "value": {
                                custId: this.changeObjData.custId,
                                attrId: item == 'customerLevel' ? 120019 : (item == 'groupDivided1' ? 120011 : (item == 'groupDivided2' ? 120012 : '')),
                                attrValue: this.changeObjData[item],
                                statusCd: '1000'
                            }
                        }
                    } else {
                        otherObj = {
                            "op": this.modifyDataFlag[item] == null ? "ADD" : "replace",
                            "path": this.modifyDataFlag[item] == null ? "/custAttr" : "/custAttr/custAttrId=" + this.changeObjData[item + 'Id'],
                            "value": {
                                attrValue: this.changeObjData[item]
                            }
                        }
                    }
                    allArr.push(otherObj)
                })
                allArr.push({
                    "op": this.modifyDataFlag.custType == null ? "ADD" : "replace",
                    "path":"/custType",
                    "value": this.changeObjData.custType
                },{
                    "op": this.modifyDataFlag.custSubType == null ? "ADD" : "replace",
                    "path": "/custSubType",
                    "value": this.changeObjData.custSubType
                })

                this.$axios.patch(this.$api.ModifyBasicInfomation + '/detail?custId=' + this.changeObjData.custId,
                    allArr
                )
                .then(res => {
                    if (res.data) {
                        this.$message.success({"message": "修改成功"})
                        this.$emit('getDetail',this.componentData);
                        this.$refs.modalType.hide()
                    } else {
                        this.$message.error({"message": "修改失败"})
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 返回
            handleCancel () {
                this.$refs.modalType.hide()
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

        .col{
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