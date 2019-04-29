<template>
    <div class="agreement">
        <Form labelWidth="130px">
            <Row>
                <Col :span="5">
                    <FormItem labelText="是否打印：">
                        <RadioGroup :data="boolRadioArray" v-model="basicData.isCopyFlag" name="isCopyFlag"></RadioGroup>
                    </FormItem>
                </Col>
                <Col :span="5" :offset="3">
                    <FormItem labelText="是否优先打印：">
                        <RadioGroup :data="boolRadioArray" v-model="basicData.copyFlag" name="copyFlag"></RadioGroup>
                    </FormItem>
                </Col>
                <Col :span="8" :offset="3">
                    <FormItem labelText="移宽固：">
                        {{getSalesAtomicAgreementType(basicData.salesAtomicAgreementType)}}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :span="5">
                    <FormItem labelText="是否电信品牌：">
                        <RadioGroup :data="boolRadioArray" v-model="basicData.isTelecom" name="isTelecom"></RadioGroup>
                    </FormItem>
                </Col>
                <Col :span="5" :offset="3">
                    <FormItem labelText="品牌信息：" v-show="basicData.isTelecom == '0'">
                        <Select :data="otherBrandArray" v-model="basicData.otherBrand" placeholder="请选择"></Select>
                    </FormItem>
                </Col>
                <Col :span="8" :offset="3">
                    <FormItem labelText="是否覆盖原价：">
                        <RadioGroup :data="boolRadioArray" v-model="basicData.isFeeFlag" name="isFeeFlag"></RadioGroup>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        
        <div :class="['items']" ref="dragItems">
            <div :class="['item',
                        item.isDragenter ? 'dragenter' : '',
                        ePosition.d > 0 ? 'down' : 'top']" 
                v-for="(item,index) in itemArray" 
                :key="index"
                :ref="item.isDrag ? 'drag' : ''" 
                :style="item.isDrag ? dragStyle : {}"
                @mouseenter="mouseenter($event,item)"
                @mouseleave="mouseleave($event,item)">
                <div :class="['app__top']"
                    @mousedown="mousedown($event,item,index)">
                    <div class="container" @mousedown.stop>
                        <span class="app__top-left">{{getTypeName(item.typeCode)}}</span>
                        <span v-show='!isDrag'>打印是否显示：</span>
                        <RadioGroup :data="boolRadioArray" v-model="item.isCopyFlag" :name="'isCopyFlag' + index" v-show='!isDrag'></RadioGroup>
                    </div>
                    
                </div>

                <div v-show='!isDrag'>
                    <div class="container">
                        <div class="c-item" v-for="(elItem,elIndex) in item.atomicFactorElements" :key="elIndex">
                            <!-- 1 复选框 -->
                            <template v-if="elItem.elementHandel == '1'">   
                                <Checkbox :name="'elSelected' + index" label="1" v-model="elItem.selected">{{elItem.elementName}}</Checkbox>
                            </template>
                            <!-- 2 元素名称（可修改）+中文冒号+元素值（不可修改） -->
                            <template v-else-if="elItem.elementHandel == '2'">
                                <Input v-model="elItem.elementName" v-show="elItem.elementName"></Input><span v-show="elItem.elementName">：{{elItem.elementValue}}；</span>
                                <Input v-model="elItem.elementValue" v-show="!elItem.elementName" class="c-noname"></Input><span v-show="!elItem.elementName">；</span>
                            </template>
                            
                            <!-- 3 元素名称（不可修改）+中文冒号+元素值（可修改） -->
                            <template v-else-if="elItem.elementHandel == '3'">
                                <span>{{elItem.elementName}}：</span><Input v-model="elItem.elementValue"></Input>；
                            </template>
                            <!-- 4 元素名称（不可修改）+中文冒号+元素值（不可修改） -->
                             <template v-else-if="elItem.elementHandel == '4'">
                                <span v-show="elItem.elementValue">{{elItem.elementName}}：{{timefilter(elItem.elementName,elItem.elementValue)}}；</span>
                            </template>
                            
                            <!-- 5 元素名称（不可修改）+元素值（不可修改） -->
                            <template v-else-if="elItem.elementHandel == '5'">
                                <span>{{elItem.elementName}}{{elItem.elementValue}}；</span>
                            </template>
                            <!-- 6 元素名称（不可修改）+元素值（必须修改） -->
                            <template v-else-if="elItem.elementHandel == '6'">
                                <span>{{elItem.elementName}}</span><Input :class="[errors.first('elementHandel6'+elIndex) ? 'error-input' : '' ]" v-validate="'required'" :name="'elementHandel6'+elIndex" v-model="elItem.elementValue"></Input>；
                            </template>

                            <template v-else-if="elItem.elementHandel == '8'">
                                <Checkbox :name="'elSelected' + index" label="1" v-model="elItem.selected"  v-show="elItem.elementValue">
                                  {{elItem.elementName}}：{{timefilter(elItem.elementName,elItem.elementValue)}}；
                                </Checkbox>
                            </template>
                        </div>

                        <!-- 其他说明 可修改-->
                        <template v-if="item.typeCode == '6'">
                            <Input type="textarea" v-model.trim="basicData.replenishDesc" data-vv-as="补充说明"></Input>
                        </template>
                    </div>

                    
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
        data() {
            return {
                isDrag: false, //是否移动状态
                dragenterItem:'', //移动进入对象
                dragstartItem:'', //移动对象
                itemArray:[],
                ePosition:{ //移动位置
                    x:0,
                    y:0,
                    d:1
                },
                dragStyle:{ //移动对象的样式
                    position: 'fixed',
                    marginLeft: '20px',
                    zIndex: 1
                },
                boolRadioArray: [{ //单选数组
                    label: '是',
                    value: '1'
                }, {
                    label: '否',
                    value: '0'
                }],
                otherBrandArray: [{
                    label: '宽频',
                    value: '宽频'
                }],
                basicData:{} //主数据对象
            }
        },
        mounted(){
            this.getInfo();

            document.addEventListener('mousemove',this.mousemove);
            document.addEventListener('mouseup',this.mouseup);
        },
        destroyed(){
            document.removeEventListener('mousemove', this.mousemove);
            document.removeEventListener('mouseup', this.mouseup);
        },
        methods:{
            getInfo(){ //获取数据
                this.$axios.get(this.$api.OrdSalesAtomicAgreement, {
                    params:{
                        offerId:this.componentData.offerId,
                        staff: this.$user.getInfo().id
                    }
                }).then(res => {
                    let tempBasicData = res.data.salesAtomicAgreement;

                    this.basicData = res.data.salesAtomicAgreement;

                    let tempItemArray = res.data.salesAtomicAgreement.atomicFactors || [];

                    tempItemArray.filter(item => {
                        item.atomicFactorElements.filter( elItem => {
                            elItem.selected = elItem.selected === '1' ? true : false;
                        })
                    })

                    this.itemArray = tempItemArray;

                }).catch( error => {
                    this.$message.error({message: error.response.data.msg})
                })
            },
            getTypeName(val){ //获取要素名称
                return {
                    '0':'月基本费',
                    '1':'套内免费量',
                    '2':'超出资费',
                    '3':'订购当月资费',
                    '4':'赠送业务',
                    '5':'协议期说明',
                    '6':'其他说明'
                }[val];
            },
            save(callback){
                this.$validator.validateAll().then((result) => {
                    if(result) {
                        let saveObj = {
                            staff: this.$user.getInfo().id,
                            salesAtomicAgreementId: this.basicData.salesAtomicAgreementId,
                            copyFlag: this.basicData.copyFlag,
                            isCopyFlag: this.basicData.isCopyFlag,
                            isFeeFlag: this.basicData.isFeeFlag,
                            isTelecom: this.basicData.isTelecom,
                            otherBrand: this.basicData.otherBrand,
                            replenishDesc: this.basicData.replenishDesc,
                            atomicFactors: this.basicData.atomicFactors.map( (item,index) => {
                                return {
                                    atomicFactorId: item.atomicFactorId,
                                    priority: index,
                                    isCopyFlag: item.isCopyFlag,
                                    statusCd: item.statusCd,
                                    atomicFactorElements: item.atomicFactorElements.map( (elItem,elIndex) => {
                                        return {
                                            atomicFactorElementId: elItem.atomicFactorElementId,
                                            elementName: elItem.elementName,
                                            elementValue: elItem.elementValue,
                                            priority: elItem.priority,
                                            selected: elItem.selected === true ? '1' : elItem.selected === false ? '0' : elItem.selected
                                        }
                                    })
                                }
                            })
                        }

                        if(saveObj.isTelecom == '1'){ //是电信品牌时 初始品牌信息
                            saveObj.otherBrand = '';
                        }


                        this.$axios.post(this.$api.OrdSalesAtomicAgreement, saveObj).then(res => {
                            if(res.data.success) {
                                this.$message.success({message: '保存成功'})
                                callback(true);
                            }else{
                                this.$message.success({message: '保存失败'})
                                callback(false);
                            }

                        }).catch( error => {
                            this.$message.error({message: error.response.data.msg});
                            callback(false);
                        })
                    }else{
                        this.$message.error({message: '保存失败，存在必须填写内容'})
                        callback(false);
                    }

                })

                
            },
            mousedown(e,item,index){ //鼠标按下
                this.isDrag = true;
                item.isDrag = true;

                this.ePosition.x = e.clientX;
                this.ePosition.y = e.clientY;

                this.dragItemsRect = this.$refs.dragItems.getBoundingClientRect();
                this.$set(this.dragStyle,'top',`${e.clientY - 15}px`);
            },
            mouseup(e){ //鼠标放开
                this.isDrag = false;
                delete this.dragStyle.top

                this.adjustItemArray(); 
            },
            mouseenter(e,item){ //鼠标进入
                if(!this.isDrag) return;
                item.isDragenter = true;
            },
            mouseleave(e,item){ //鼠标离开
                if(!this.isDrag) return;
                item.isDragenter = false;
            },
            mousemove(e){ //鼠标移动
                if(!this.isDrag) return;

                this.$set(this.dragStyle,'top',`${parseInt(this.dragStyle.top) + e.clientY - this.ePosition.y }px`);

                if(e.clientY - this.ePosition.y > 0){
                    this.ePosition.d = 1;
                }else if(e.clientY - this.ePosition.y < 0){
                    this.ePosition.d = -1;
                }

                this.ePosition.x = e.clientX;
                this.ePosition.y = e.clientY;
                
                e.preventDefault(); 
            },
            adjustItemArray(){ //计算位置
                let dragenterItem = this.itemArray.find(item => item.isDragenter && !item.isDrag);

                if(!dragenterItem){
                    this.itemArray.filter( item => {
                        item.isDrag = false;
                        item.isDragenter = false;
                    })
                    return;
                }
                let dragItem = this.itemArray.find(item => item.isDrag);
                let tempArray = this.itemArray.filter( item => !item.isDrag);
                dragItem.isDrag = false;
                let newArray = []

                tempArray.filter( item => {
                    if(item.isDragenter){
                        item.isDragenter = false;

                        if(this.ePosition.d > 0){
                            newArray.push(item);
                            newArray.push(dragItem);
                        }else{
                            newArray.push(dragItem);
                            newArray.push(item);
                        }
                    }else{
                        newArray.push(item);
                    }
                })

                this.basicData.atomicFactors = [...newArray];

                this.itemArray = [...newArray];
            },
            getSalesAtomicAgreementType(val){
                if(val == '') return;
                return {
                    '10000': '其他',
                    '10001': '单C',
                    '10002': '单宽',
                    '10003': '单固',
                    '10004': '单云',
                    '10005': '宽+C',
                    '10006': '固+C',
                    '10007': '固+宽',
                    '10008': '固+宽+C'
                }[val];
            },
            timefilter(type,val) {
                switch (type) {
                    case '协议有效期':
                        return val.slice(0,4) == '2050' ? '长期有效' : val.slice(0,10);
                        break;
                    case '资费有效期':
                        return val.slice(0,4) == '2050' ? '长期有效' : val.slice(0,10);
                        break;
                    default:
                        return val
                        break;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .agreement{
        padding: 20px;

        .item{
            padding-top: 0;
            transition: all .3s ease;

            &.dragenter.top{
                padding-top: 50px;
            }

            &.dragenter.down{
                padding-bottom: 50px;
            }

            .app__top{
                .container{
                    display: inline-block;
                }

                .app__top-left{
                    display: inline-block;
                }

                .radio-group{
                    width: auto;
                }
            }

            
        }

        .container{
            padding: 0 20px 20px;

            .c-noname {
                // width: 100%;
                min-width: 1000px;
            }

            .c-item{
                display: inline-block;
                white-space: nowrap;
                margin-top: 20px;
                padding-right: 20px;
                .input{
                    display: inline-block;
                }

                .error-input{
                    /deep/ input{
                        border-color: #eb7c78;
                    }
                }
            }
        }
    }
</style>