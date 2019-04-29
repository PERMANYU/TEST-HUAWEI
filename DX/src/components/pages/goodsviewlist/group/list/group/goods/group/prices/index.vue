<template>
    <div class="prices">
        <div>
            <div class="app__top">
				<span class="app__top-left">资费定价</span>
			</div>
        </div>
        <div class="app__table">
            <Row :class="['app__table-item']" v-for="(item,index) in tariffSelList" :key="index">
                <!--<Col :span="2" class="local-code"><span class="span-local">{{index+1}}</span></Col>-->
                <Col :span="6" class="local-tit">{{item.templateInstName}}</Col>
                <Col :span="16" :offset="6">
                    <Row :class="item.classItem==null?'item-active':''">
                        <Col :span="11" v-for="(itemList,index) in item.templateParamInsts" :key="index">
                            <FormItem v-if="itemList.isRequired == '1'" :labelWidth="labelWidth" :labelText="itemList.templateParamName+'：'" :requiredIcon="true" :errorMessage="errors.first(itemList.templateParamName)">
                                <Input v-if="itemList.typeName == '输入' && itemList.templateParamName == '定向RG'" v-model="itemList.paramValue" @click.native="addRg(item)" :name="itemList.templateParamName" v-validate="'required'" :data-vv-as="itemList.templateParamName" disabled></Input>
                                <Input v-else-if="itemList.typeName == '输入'" v-model="itemList.paramValue" :name="itemList.templateParamName" v-validate="'required'" :data-vv-as="itemList.templateParamName" disabled></Input>
                                <Select v-else :name="itemList.templateParamName" v-validate="'required'" :data-vv-as="itemList.templateParamName" :data="itemList.attrValues==null?[]:itemList.attrValues" v-model="itemList.paramValue" dataValueStr="attrValue" dataLabelStr="attrValueName" @change="changeItem(arguments[0],item)" disabled></Select>
                            </FormItem>
                            <FormItem v-else :labelWidth="labelWidth" :labelText="itemList.templateParamName+'：'">
                                <Input v-if="itemList.typeName == '输入' && itemList.templateParamName == '定向RG'" v-model="itemList.paramValue" @click.native="addRg(itemList)" disabled></Input>
                                <Input v-else-if="itemList.typeName == '输入'" v-model="itemList.paramValue" disabled></Input>
                                <Select v-else :data="itemList.attrValues==null?[]:itemList.attrValues" v-model="itemList.paramValue" dataValueStr="attrValue" dataLabelStr="attrValueName" @change="changeItem(arguments[0],item)" disabled></Select>
                            </FormItem>
                        </Col>
                    </Row>
                </Col>
                
                <div :class="item.classItem==null?'item-open':'item-close'" @click="openClick(item)"></div>
            </Row>
            <Row v-if="!tariffSelList.length" class="app__data-none">
                <Col>
                    <span>当前无数据 请先选择资费模板</span>
                </Col>
            </Row>
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
                labelWidth: "120px",
                offerTariffItem: [],
                offerChannel: [],
                priceData: {},
                tariffSelList: [],
                tariffSelListSave: [],
                tariffSelListoll: [],
                templateObj: {
                    templateNbr: "",
                    templateName: "",
                    templateTypeId: "",
                },
                pageInfo: {
                    pageSize: 5,
                    pageIndex: 1,
                    rowCount: 0,
                },
                moduleArray: [{
                	label: '套餐费(X)元',
                	value: '10000001'
                },{
                	label: '附属产品功能费(X)元',
                	value: '10000002'
                },{
                	label: '套内流量(X)(M/K/G)',
                	value: '10000003'
                },{
                	label: '套内语音(X)分钟',
                	value: '10000004'
                },{
                	label: '套内短彩信(X)条',
                	value: '10000005'
                }],
                checkboxId: []
            }
        },
        mounted() {
            this.getOfferTariff();
        },
        methods: {
            // 查询资费模板实例
            getOfferTariff() {
                this.$axios.get(this.$api.replace(this.$api.TariffTemplateSave, ['{offerId}'], [this.componentData.offerId]), {
                    params: {
                        
                    }
                }).then((res) => {
                    console.log(res,'资费模板')
                    if (res.data.code == this.$api.successCode) {
                        if(res.data.tariffTemplateInst != null){
                            this.tariffSelList = [...res.data.tariffTemplateInst];
	                        for(let ele of this.tariffSelList){
	                        	for(let val of this.moduleArray) {
	                        		if(ele.tariffTemplateId == val.value){
	                        			this.checkboxId.push(val.value)
	                        		}
	                        	}
	                        }
                            this.tariffSelListoll = [...res.data.tariffTemplateInst];
                        }else{
                            this.tariffSelList = [];
                            this.tariffSelListoll = [];
                        }
                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },

            // 资费模板列表查询
            getOfferTable(val) {
                this.offerTariffItem = [];
                if(val=="all"){
                    this.templateObj.templateTypeId = '';
                }
                this.$axios.get(this.$api.TariffTemplateList,{
                    params: {
                        "templateNbr": this.templateObj.templateNbr,
                        "templateName": this.templateObj.templateName,
                        "templateTypeId": this.templateObj.templateTypeId,
                        "limit": this.pageInfo.pageSize,
                        "page": this.pageInfo.pageIndex
                    }
                }).then((res) => {
                    if (res.data.code == this.$api.successCode) {
                        this.offerTariffItem = res.data.tariffTemplateDTOPaasPage.content;
                        this.pageInfo.rowCount = res.data.tariffTemplateDTOPaasPage.total;

                        //判断是否选中
                        this.offerChannel.find(item => {
                            this.offerTariffItem.find(itemList => {
                                if(item.tariffTemplateId == itemList.tariffTemplateId){
                                    this.$set(itemList,'flag','Y');
                                }
                            })
                        })
                        this.tariffSelList.find(item => {
                            this.offerTariffItem.find(itemList => {
                                if(item.tariffTemplateId == itemList.tariffTemplateId){
                                    this.$set(itemList,'flag','Y');
                                }
                            })
                        })
                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },

            // 资费模板详情
            getofferDetail(val) {
                this.$axios.get(this.$api.replace(this.$api.TariffTemplateDetail,['{tariffTemplateId}'],[val]),{
                	params: {
                    	offerId: this.componentData.offerId
                	}
                }).then((res) => {
                    if (res.data.code == this.$api.successCode) {
                        this.priceData = res.data.tariffTemplate;
                        //展示数组
                        let temArr = [];
                        this.priceData.templateParameterRel.forEach(item =>{
                            let ObjList = {
                                "templateParamInstId": "",
                                "tariffTemplateInstId": "",    //空
                                "templateParameterRelId": item.templateParameterRelId,
                                "templateParamName": item.parameterDesc,
                                "attrValues": item.attrValues,
                                "createStaff": 123,   //固定
                                "updateStaff": 123,   //固定
                                "statusCd": "1000",
                                "createDate": "",    //空
                                "updateDate": "",    //空
                                "typeName": item.typeName,
                                "isRequired": item.isRequired,
                                "defaultValue": item.defaultValue
                            }
                            temArr.push(ObjList)
                        })
                        let Obj = {
                            "tariffTemplateInstId": "",    //空
                            "tariffTemplateId": this.priceData.tariffTemplateId,
                            "templateInstName": this.priceData.templateName,
                            "offerId": this.componentData.offerId,      //待传
                            "statusCd": "1000",  
                            "createDate": "",     //空
                            "updateDate": "",     //空
                            "templateParamInsts": temArr
                        }
                        this.tariffSelList.push(Obj);
                        for(let ele of this.tariffSelList) {
                        	for(let val of ele.templateParamInsts){
                        		if(val.typeName === '单选'){
                        			this.$set(val,'paramValue',val.defaultValue);
                        		}else{
                        			this.$set(val,'paramValue',val.defaultValue);
                        		}
                        	}
                        }
                        this.tariffSelListoll.push(Obj);
                    }else{
                        this.$message.error({message: res.data.msg})
                    }
                }).catch(error => {
                    this.$message.error({ message: error.response.data.msg })
                })
            },
            // 展开更多数据
            openClick(item) {
                if(item.classItem == null){
                    this.$set(item,'classItem','Y');
                }else{
                    item.classItem = null;
                }                
            },
        }
    }
</script>

<style scoped lang="scss">
    .prices{
        width: 100%;
        padding-top: 20px;
        .app__table{
            margin-bottom: 20px;
			.app__table-item {
				background: #ffffff;
				margin-bottom: 20px;
			}
        }
        .prices-module{
        	padding: 20px;
        	background: #f5f6fa;
        	margin-bottom: 20px;
        	.col{
        		text-align: center;
        	}
        }
    }
    
    .selectbtn{
       margin: 0 10px 10px 0;
    }
    .app__table{
        position: relative;
        padding:15px 0;

        .item-open{
            position: absolute;
            bottom: -18px;
            left: 0; 
            width: 100%;
            height: 30px;
            background: url(./images/expand.png) no-repeat center;
            cursor: pointer;
        }
        .item-close{
            position: absolute;
            bottom: 0;
            left: 0; 
            width: 100%;
            height: 30px;
            background: url(./images/expand_2.png) no-repeat center;
            cursor: pointer;
        }

        .local-code{
            position: absolute;
            top: 50%;
            left: 0;
            margin-left: -10px;
            margin-top: -10px;
            .span-local{
                display: block;
                margin:0 auto;
                width: 20px;
                height: 20px;
                line-height: 20px;
                border-radius: 10px;
                background: #00c0fd;
                color: #ffffff;
                text-align: center;
                text-indent: 0px;
            }
        }
        .local-tit{
            position: absolute;
            top: 50%;
            left: 9.5%;
            margin-left: -10px;
            margin-top: -20px;
        }
        .local-icon{
            position: absolute;
            top: 50%;
            right: 0;
            margin-left: -10px;
            margin-top: -18px;
        }
        .item-active{
            max-height: 160px;
            overflow: hidden;
        }
    }
    .icon-shanchu{
        display: block;
        margin: 0 auto;
        vertical-align: middle;
        cursor: pointer;

    }
    .main {
        padding: 20px;
        .sel-box{
            padding-bottom: 20px;
            width: 50%;
        }
        .rg {
        	width: 60%;
        	.c_btn {
				    position: absolute;
				    right: -46px;
				    top: 3px;
				    padding: 5px 10px;
				    border-radius: 5px;
				    background: #59bffd;
				    color: #ffffff;
				    cursor: pointer;
				}
			}
        .top {
            width: 100%;
            height: 300px;
            .t-left {
                width: 30%;
                height: 100%;
                float: left;
                border: 1px solid gainsboro;
            }
            .t-right {
                width: 65%;
                height: 100%;
                float: right;
            }
        }
        
        .y-span {
            display: block;
            margin: 10px 0;
            color: #b6de8f;
        }
    }


</style>