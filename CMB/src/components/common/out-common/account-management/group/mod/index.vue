<template>
    <div class="addAcount">
        <Scroll>
            <div class="t-header">
                <i>帐单详情</i>
                <span class="close" @click="pageClose()"></span>
                <span></span>
            </div>

            <div class="a-v-title">
                <div class="app__title-1">
                    <span class="app__title-name">客户基本信息</span>
                </div>
                <span class="app__btn app__btn-mod" v-if="userRightBtnControl.updateBtn" @click.stop.self="handleAmend">修改</span>
            </div>

            <div class="detail-content">
                <Row>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">客户名称：</span>
                        <span class="app__lt-text" :title="custMation.custName ? custMation.custName : '无'">{{custMation.custName ? custMation.custName : '无'}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">客户标识：</span>
                        <span class="app__lt-text" :title="custMation.custId ? custMation.custId : '无'">{{custMation.custId ? custMation.custId : '无'}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">证件类型：</span>
                        <span class="app__lt-text" :title="custMation.certType ? custMation.certType : '无'">{{custMation.certType ? custMation.certType : '无'}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">证件号码：</span>
                        <span class="app__lt-text" :title="custMation.certNum ? custMation.certNum : '无'">{{custMation.certNum ? custMation.certNum : '无'}}</span>
                    </Col>
                </Row>
            </div>

            <div class="a-v-title">
                <div class="app__title-1">
                    <span class="app__title-name">账户基本信息</span>
                </div>
            </div>

            <div class="detail-content">
                <Row>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">帐户名称：</span>
                        <span class="app__lt-text" :title="accountMation.acctName ?　accountMation.acctName : ''">{{accountMation.acctName ?　accountMation.acctName : ''}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">帐单介质：</span>
                        <span class="app__lt-text" :title="getPostMethod('帐单介质',accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].postMethod : '')">{{getPostMethod('帐单介质',accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].postMethod : '')}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">是否发送短信帐单：</span>
                        <span class="app__lt-text" :title="getPostMethod('是否发送短信帐单',accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].ebillSmsNoticeFlg : '')">{{getPostMethod('是否发送短信帐单',accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].ebillSmsNoticeFlg : '')}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">接收应付额短信号码：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].ebillSmsServerId : '无'">{{accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].ebillSmsServerId : '无'}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">客户标识：</span>
                        <span class="app__lt-text" :title="accountMation.custId ?　accountMation.custId : '无'">{{accountMation.custId ?　accountMation.custId : '无'}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">帐户计费类型：</span>
                        <span class="app__lt-text" :title="accountMation.acctBillingTypeName">{{accountMation.acctBillingTypeName  || '无'}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">分帐序号：</span>
                        <span class="app__lt-text" :title="accountMation.acctCd">{{accountMation.acctCd}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">下次开帐日期：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? getPostMethod('下次开帐日期',accountMation.invFormatCustomizeRel[0].billEffectiveDate) : '无'">{{accountMation.invFormatCustomizeRel[0] ? getPostMethod('下次开帐日期',accountMation.invFormatCustomizeRel[0].billEffectiveDate) : '无'}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">帐户区局：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].firstbureau : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].firstbureau : '无' }}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">催欠标识：</span>
                        <span class="app__lt-text" :title="getPostMethod('催欠标识', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].collectionCd : '')">{{getPostMethod('催欠标识', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].collectionCd : '')}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">违约金标识：</span>
                        <span class="app__lt-text" :title="getPostMethod('违约金标识', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].lateFeeFlag : '' )">{{getPostMethod('违约金标识', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].lateFeeFlag : '' )}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">付费通电子邮件帐单接受地址：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].fftEmail : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].fftEmail : '无' }}</span>
                    </Col>
                </Row>
                <Row>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">付费通电子帐单：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].fftType : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].fftType : '无' }}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">是否可开具专票：</span>
                        <span class="app__lt-text" :title="getPostMethod('是否发送短信帐单', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].spcInvFlg : '')">{{getPostMethod('是否发送短信帐单', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].spcInvFlg : '')}}</span>
                    </Col>
                </Row>
            </div>

            <div class="a-v-title">
                <div class="app__title-1">
                    <span class="app__title-name">账单信息</span>
                </div>
            </div>

            <div class="detail-content">
                <Row>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">帐单寄达地址：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].contactAddr : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].contactAddr : '无' }}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">联系人eMail地址：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].eMail : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].eMail : '无' }}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">帐单联系人姓名：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].contactName : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].contactName : '无' }}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">帐单联系人传真：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].fax : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].fax : '无' }}</span>
                    </Col>
                </Row>
                <Row>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">帐单联系人电话：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].mobilePhone : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].mobilePhone : '无' }}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">打印电子发票：</span>
                        <span class="app__lt-text" :title="getPostMethod('是否发送短信帐单', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].einvoiceFlg : '' )">{{getPostMethod('是否发送短信帐单', accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].einvoiceFlg : '' )}}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">帐单打印格式：</span>
                        <!-- <span class="app__lt-text">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].billPrefCd : '无' }}</span> -->
                        <span class="app__lt-text" v-if="accountMation.invFormatCustomizeRel[0]">
                            {{accountMation.invFormatCustomizeRel[0].billPrefCd | filterName}}
                        </span>
                        <span class="app__lt-text" v-else>
                            {{'无'}}
                        </span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">出帐周期：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].postCycle + '个月' : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].postCycle + '个月' : '无' }}</span>
                    </Col>
                </Row>
                <Row>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">电子帐单发送格式：</span>
                        <span class="app__lt-text">帐单</span>
                    </Col>
                </Row>
            </div>

            <div class="a-v-title">
                <div class="app__title-1">
                    <span class="app__title-name">税务信息</span>
                </div>
            </div>

            <div class="detail-content">
                <Row>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">税务地址：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxAddress :  '无'">{{  accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxAddress :  '无'  }}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">税务开户银行名称：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxBankName : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxBankName : '无' }}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">税务开户银行帐户：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxBankNumber : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxBankNumber : '无' }}</span>
                    </Col>
                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">税务号：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxNumber : '无'">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxNumber : '无' }}</span>
                    </Col>

                    <Col class="app__ellipsis" :span="6">
                        <span class="app__lt-label">税务电话：</span>
                        <span class="app__lt-text" :title="accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxPhone : '无' ">{{ accountMation.invFormatCustomizeRel[0] ? accountMation.invFormatCustomizeRel[0].taxPhone : '无' }}</span>
                    </Col>
                </Row>
            </div>

            <div class="a-v-title">
                <div class="app__title-1">
                    <span class="app__title-name">支付方案</span>
                </div>
                <span class="app__btn app__btn-add" @click.stop.self="addPaymentPlan">添加支付方案</span>
            </div>

            <div class="a-v-content">
                <Scroll class="app__table" :isShowBottom="true" fixedTopClassName="app__table-thead" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
                    <Row class='app__table-thead' ref="width" :inline="true">
                        <Col :width='200'>付费方式</Col>
                        <Col :width='200'>托收银行帐号</Col>
                        <Col :width='200'>托收银行名称</Col>
                        <Col :width='200'>多方协议编号</Col>
                        <Col :width='200'>交换号</Col>
                        <Col :width='200'>支付行号</Col>
                        <Col :width='200'>帐务中心开户银行名称</Col>
                        <Col :width='200'>帐务中心开户银行帐号</Col>
                        <Col :width='200'>帐务中心户名</Col>
                        <Col :width="100" class="app__table-right">操作</Col>
                    </Row>
                    <Row :class="['app__table-item overflow-style']" :inline="true" v-for="(item,index) in addPaymentData" :key="index">
                        <Col :width='200'>
                        {{getPostMethod('付费方式',item.paymentMethod)}}
                        </Col>
                        <Col :width='200'>{{item.extAcctDTO && item.extAcctDTO.payAcctCode ? item.extAcctDTO.payAcctCode : '无'}}</Col>
                        <Col :width='200' :title="item.extAcctDTO &&　item.extAcctDTO.payAcctName ? item.extAcctDTO.payAcctName : ''">{{item.extAcctDTO && item.extAcctDTO.payAcctName ? item.extAcctDTO.payAcctName : '无'}}</Col>
                        <Col :width='200' :title="item.extAcctDTO &&　item.extAcctDTO.eftAgreeNum ? item.extAcctDTO.eftAgreeNum : ''">
                        {{item.extAcctDTO && item.extAcctDTO.eftAgreeNum ?  item.extAcctDTO.eftAgreeNum  : '无'}}
                        </Col>
                        <Col :width='200'>
                        {{item.extAcctDTO && item.extAcctDTO.exchgNum ?  item.extAcctDTO.exchgNum  : '无'}}
                        </Col>
                        <Col :width='200'>
                        {{item.extAcctDTO && item.extAcctDTO.paidBankNum ?  item.extAcctDTO.paidBankNum  : '无'}}
                        </Col>
                        <Col :width='200'>
                        {{item.extAcctDTO && item.extAcctDTO.eftZwzxBankName ?  item.extAcctDTO.eftZwzxBankName  : '无'}}
                        </Col>
                        <Col :width='200'>
                        {{item.extAcctDTO && item.extAcctDTO.eftZwzxBankNum ?  item.extAcctDTO.eftZwzxBankNum  : '无'}}
                        </Col>
                        <Col :width='200'>
                        {{item.extAcctDTO && item.extAcctDTO.eftZwzxName ?  item.extAcctDTO.eftZwzxName  : '无'}}
                        </Col>
                        <Col :width="100" class="app__table-right">
                        <span @click="modPayment(index,item)" v-if="userRightBtnControl.paymentSchemeModify">修改</span>
                        <span v-if="userRightBtnControl.paymentSchemeDelete" @click="delPayment(index,item)">删除</span>
                        </Col>
                    </Row>
                    <Row :class="['app__table-item']" :style="dynamicWidth" v-for="item in (5 - addPaymentData.length)" :key="item.id"></Row>
                </Scroll>
            </div>

        </Scroll>
        <div class="btnBox">
            <span class="app__btn app__btn-back" @click="back">返回</span>
            <span class="app__btn app__btn-save" @click="save">保存</span>
        </div>

        <!-- 添加支付方案弹窗 -->
        <Dialog :dialogSize="dialogSize" ref="paymentAddPlan" dialogTitle="添加支付方案" @confirm="paymentDialogAddConfirm()" @close="paymentDialogAddClose()">
            <Scroll :isShowRight="true">
                <Row class="paymentplan">
                    <Form labelWidth="120px" labelAlign="left" data-vv-scope="addPlanObj">
                        
                        <Col :span="10" :offset="1">
                        <FormItem labelText="付费方式：" :requiredIcon="true" :errorMessage="errors.first('addPlanObj.paymentMethod')">
                            <Select :data="paymentArray" name="paymentMethod" data-vv-as="付费方式" :isNullSel='true' v-validate="'required'" dataValueStr="attrValue" dataLabelStr="attrValueName" v-model="addPlanObj.paymentMethod"></Select>
                        </FormItem>
                        </Col>

                        <Col :span="10" :offset="2" >
                        <FormItem labelText="托收银行名称：" :requiredIcon="addPlanObj.paymentMethod == 110300" :errorMessage="errors.first('addPlanObj.payAcctName')">
                            <Input v-model="addPlanObj.payAcctName" :disabled="addPlanObj.paymentMethod == 100000" data-vv-as="托收银行名称" v-validate="addPlanObj.paymentMethod == 110300 ? 'required' : ''" maxlength="0" :placeholder="addPlanObj.paymentMethod == 100000 ? '' : '请选择托收银行'" @click.stop.native="showPayAcctName" name="payAcctName"></Input>
                        </FormItem>
                        </Col>
                        <!-- <Col :span="10" :offset="1">
                        <FormItem labelText="帐单打印格式：">
                            <Input v-model="addPlanObj.billPrefCd"></Input>
                        </FormItem>
                        </Col>             -->
                        <Col :span="10" :offset="1">
                        <FormItem labelText="托收银行帐号：" :requiredIcon="addPlanObj.paymentMethod == 110300" :errorMessage="errors.first('addPlanObj.payAcctCode')">
                            <Input v-model="addPlanObj.payAcctCode" disabled v-validate="addPlanObj.paymentMethod == 110300 ? 'required|isBankNum' : 'isBankNum'" data-vv-as="托收银行帐号" name="payAcctCode"></Input>
                        </FormItem>
                        </Col>

                        <Col :span="10" :offset="2">
                        <FormItem labelText="支付行号：" :requiredIcon="addPlanObj.paymentMethod == 110300" :errorMessage="errors.first('addPlanObj.paidBankNum')">
                            <Input v-model="addPlanObj.paidBankNum" disabled v-validate="addPlanObj.paymentMethod == 110300 ? 'required|numeric' : 'numeric'" data-vv-as="支付行号" name="paidBankNum"></Input>
                        </FormItem>
                        </Col>

                        <Col :span="10" :offset="1">
                        <FormItem labelText="交换号：" :errorMessage="errors.first('addPlanObj.exchgNum')">
                            <Input :disabled="addPlanObj.paymentMethod == 100000" v-model="addPlanObj.exchgNum"></Input>
                        </FormItem>
                        </Col>

                        <Col :span="10" :offset="2">
                        <FormItem labelText="多方协议编号：" :errorMessage="errors.first('addPlanObj.eftAgreeNum')">
                            <Input v-model="addPlanObj.eftAgreeNum"></Input>
                        </FormItem>
                        </Col>
                    </Form>
                </Row>
                <Row>
                    <Form labelWidth="120px" labelAlign="left">
                        <Col :span="10" :offset="1">
                        <FormItem labelText="帐务中心开户银行帐号：" :errorMessage="errors.first('addPlanObj.eftZwzxBankNum')">
                            <Input v-model="addPlanObj.eftZwzxBankNum" v-validate="'numeric'" data-vv-as="帐务中心开户银行帐号" name="eftZwzxBankNum"></Input>
                        </FormItem>
                        </Col>
                        <Col :span="10" :offset="2">
                        <FormItem labelText="帐务中心开户银行名称：" :errorMessage="errors.first('addPlanObj.eftZwzxBankName')">
                            <Input v-model="addPlanObj.eftZwzxBankName"></Input>
                        </FormItem>
                        </Col>
                        <Col :span="10" :offset="1">
                        <FormItem labelText="帐务中心户名：" :errorMessage="errors.first('addPlanObj.eftZwzxName')">
                            <Input v-model="addPlanObj.eftZwzxName"></Input>
                        </FormItem>
                        </Col>
                    </Form>
                </Row>
            </Scroll>
        </Dialog>

        <!-- 支付方案修改 -->
        <Dialog :dialogSize="dialogSize" ref="paymentModPlan" dialogTitle="修改支付方案" @confirm="paymentDialogModConfirm()" @close="paymentDialogModClose()">
            <Scroll :isShowRight="true">
                <Row class="paymentplan">
                    <Form labelWidth="120px" labelAlign="left">
                        <Col :span="10" :offset="1">
                        <FormItem labelText="付费方式：" :requiredIcon="true" :errorMessage="errors.first('paymentMethod')">
                            <Select :data="paymentArray" name="paymentMethod" data-vv-as="付费方式" :isNullSel='true' v-validate="'required'" dataValueStr="attrValue" dataLabelStr="attrValueName" v-model="modPlanObj.paymentMethod"></Select>
                        </FormItem>
                        </Col>

                        <Col :span="10" :offset="2">
                        <FormItem labelText="托收银行名称："  :requiredIcon="modPlanObj.paymentMethod == 110300"   :errorMessage="errors.first('payAcctName')">
                            <Input v-model="modPlanObj.payAcctName" :disabled="modPlanObj.paymentMethod == 100000" name="payAcctName" data-vv-as="托收银行名称" v-validate="modPlanObj.paymentMethod == 110300 ? 'required' : ''" maxlength="0" :placeholder="modPlanObj.paymentMethod == 100000 ? '' : '请选择托收银行'" @click.stop.native="showPayAcctMod"></Input>
                        </FormItem>
                        </Col>

                        <!-- <Col :span="10" :offset="1">
                        <FormItem labelText="帐单打印格式：" >
                            <Input v-model="modPlanObj.billPrefCd"></Input>
                        </FormItem>
                        </Col> -->

                        <Col :span="10" :offset="1">
                        <FormItem labelText="交换号：" :errorMessage="errors.first('exchgNum')">
                            <Input disabled v-model="modPlanObj.exchgNum"></Input>
                        </FormItem>
                        </Col>

                       

                        <Col :span="10" :offset="2">
                        <FormItem labelText="支付行号："  :requiredIcon="modPlanObj.paymentMethod == 110300"  :errorMessage="errors.first('paidBankNum')">
                            <Input disabled v-model="modPlanObj.paidBankNum" data-vv-as="支付行号" name="paidBankNum" v-validate="modPlanObj.paymentMethod == 110300 ? 'required|numeric' : 'numeric'"></Input>
                        </FormItem>
                        </Col>

                        <Col :span="10" :offset="1">
                        <FormItem labelText="托收银行帐号：" :requiredIcon="modPlanObj.paymentMethod == 110300" :errorMessage="errors.first('payAcctCode')">
                            <Input v-model="modPlanObj.payAcctCode" disabled v-validate="modPlanObj.paymentMethod == 110300 ? 'required|isBankNum' : 'isBankNum'" data-vv-as="托收银行帐号" name="payAcctCode"></Input>
                        </FormItem>
                        </Col>

                         <Col :span="10" :offset="2">
                        <FormItem labelText="多方协议编号：" :errorMessage="errors.first('eftAgreeNum')">
                            <Input  v-model="modPlanObj.eftAgreeNum"></Input>
                        </FormItem>
                        </Col>
                    </Form>
                </Row>
                <Row>
                    <Form labelWidth="120px" labelAlign="left">
                        <Col :span="10" :offset="1">
                        <FormItem labelText="帐务中心开户银行帐号：" :errorMessage="errors.first('eftZwzxBankNum')">
                            <Input disabled v-model="modPlanObj.eftZwzxBankNum" v-validate="'numeric'" data-vv-as="帐务中心开户银行帐号" name="eftZwzxBankNum"></Input>
                        </FormItem>
                        </Col>
                        <Col :span="10" :offset="2">
                        <FormItem labelText="帐务中心开户银行名称：" :errorMessage="errors.first('eftZwzxBankName')">
                            <Input disabled v-model="modPlanObj.eftZwzxBankName"></Input>
                        </FormItem>
                        </Col>
                        <Col :span="10" :offset="1">
                        <FormItem labelText="帐务中心户名：" :errorMessage="errors.first('eftZwzxName')">
                            <Input disabled v-model="modPlanObj.eftZwzxName"></Input>
                        </FormItem>
                        </Col>
                    </Form>
                </Row>
            </Scroll>
        </Dialog>

        <!-- 托收银行选择 -->
        <Dialog :dialogSize="dialogSize" ref="payAcctNameDialog" :dialogTitle="dialogTitle" @confirm="payAcctNameDialogConfirm()" @close="payAcctNameDialogClose()">
            <Scroll class="app__table">
                <div class="s-l-search">
                    <Search placeholder="请输入银行名称" @search="searchResources"></Search>
                </div>
                <div class="app__table">
                    <Row class="app__table-thead">
                        <Col :span="4" :offset="2">选择</Col>
                        <Col :span="6">托收银行名称</Col>
                        <Col :span="6">托收银行账号</Col>
                        <Col :span="6">支付行号</Col>
                    </Row>
                    <Row class="app__table-item" v-for="(item,index) in bankArray" :key="index">
                        <Col :span="4" :offset="2">
                        <Radio :name="item" :value="item" :label="item" v-model="radioBank"></Radio>
                        </Col>
                        <Col :span="6">{{item.bankBranchName ? item.bankBranchName : '无'}}</Col>
                        <Col :span="6">{{item.bankCode ? item.bankCode : '无'}}</Col>
                        <Col :span="6">{{item.bankAcct ? item.bankAcct : '无'}}</Col>
                    </Row>
                </div>
            </Scroll>
        </Dialog>

        <!-- 帐户基本信息修改 -->
        <Dialog :dialogSize="dialogSize" ref="accountInfoMod" dialogTitle="修改帐户" @confirm="accountDialogConfirm()" @close="accountDialogClose()">
            <Scroll :isShowRight="true">
                <Row class="dialog-main">
                    <div class="a-v-title">
                        <div class="app__title">
                            <i class="icon-left"></i>
                            <span class="dialog-title">基本信息</span>
                        </div>
                    </div>

                    <div class="a-v-content">
                        <Row>
                            <Form labelWidth="120px" labelAlign="left">
                                <Col :span="10" :offset="1">
                                <FormItem labelText="帐户名称：" :successMessageInline="false" :errorMessage="errors.first('acctName')" :requiredIcon="true">
                                    <Input v-model.trim="acctObj.acctName" data-vv-as="帐户名称" name="acctName" v-validate="'required'"></Input>
                                </FormItem>
                                </Col>

                                <!-- <Col :span="10" :offset="2">
                                <FormItem labelText="帐务服务信息邮件接收地址:" :errorMessage="errors.first('accounMail')">
                                    <Input v-model.trim="acctObj.accounMail" data-vv-as="帐务服务信息邮件接收地址" name="accounMail" v-validate="'email'"></Input>
                                </FormItem>
                                </Col> -->

                                <!-- <Col :span="10" :offset="1">
                                <FormItem labelText="帐务服务信息接收手机号码:" >
                                    <Input v-model.trim="acctObj.prodName" data-vv-as="帐务服务信息接收手机号码" name="" v-validate=""></Input>
                                </FormItem>
                                </Col> -->

                                <Col :span="10" :offset="2">
                                <FormItem labelText="接收应付额短信号码：" :requiredIcon="acctObj.ebillSmsNoticeFlg == 1" :errorMessage="errors.first('ebillSmsServerId')">
                                    <Input v-model.trim="acctObj.ebillSmsServerId" :disabled="acctObj.ebillSmsNoticeFlg == 0" data-vv-as="接收应付额短信号码" name="ebillSmsServerId" v-validate="acctObj.ebillSmsNoticeFlg == 1 ? 'required|mobile' : 'mobile'"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                <FormItem labelText="是否发送短信帐单：" :errorMessage="errors.first('ebillSmsNoticeFlg')">
                                    <RadioGroup v-validate="''" :data="ebillSmsNoticeFlgArray" name="ebillSmsNoticeFlg" data-vv-as="是否发送短信帐单" v-model="acctObj.ebillSmsNoticeFlg" @change=""></RadioGroup>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="2">
                                <FormItem labelText="催欠标识：" :errorMessage="errors.first('collectionCd')">
                                    <Select v-validate="''" :isNullSel='true' :data="collectionCdArray" dataValueStr="attrValue" dataLabelStr="attrValueName" name="collectionCd" data-vv-as="催欠标识" v-model="acctObj.collectionCd"></Select>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                <FormItem labelText="免违约金：" :errorMessage="errors.first('lateFeeFlag')">
                                    <RadioGroup v-validate="''" :data="ebillSmsNoticeFlgArray" name="lateFeeFlag" data-vv-as="免违约金" v-model="acctObj.lateFeeFlag" @change=""></RadioGroup>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="2">
                                <FormItem labelText="帐户计费类型:" :requiredIcon="true" :errorMessage="errors.first('acctBillingType')">
                                    <Select v-validate="'required'" :isNullSel='true' :data="acctBillingTypeArray" dataValueStr="attrValue" dataLabelStr="attrValueName" name="acctBillingType" data-vv-as="帐户计费类型" v-model="acctObj.acctBillingType"></Select>
                                </FormItem>
                                </Col>

                            </Form>
                        </Row>
                    </div>

                    <div class="a-v-title">
                        <div class="app__title">
                            <i class="icon-left"></i>
                            <span class="dialog-title">帐单信息</span>
                        </div>
                    </div>

                    <div class="a-v-content">
                        <Row>
                            <Form labelWidth="120px" labelAlign="left">
                                <Col :span="10" :offset="1">
                                <FormItem labelText="帐单寄达地址：" :requiredIcon="false" :errorMessage="errors.first('contactAddr')">
                                    <!-- <Input v-model.trim="acctObj.contactAddr" name="contactAddr" disabled @click.stop.native="showAddress()" data-vv-as="帐单寄达地址"  v-validate="''"></Input> -->
                                    <!-- <Input v-model.trim="acctObj.contactAddr" name="contactAddr" data-vv-as="帐单寄达地址"  v-validate="''"></Input> -->
                                    <Select name="contactAddr"
                                        :data="acctAddress"
                                        v-model.trim="acctObj.contactAddr"
                                        dataLabelStr="addressFull"
                                        dataValueStr="addressFull" 
                                    ></Select>
                                </FormItem>
                                </Col>

                                <!-- <Col :span="10" :offset="2">
                                <FormItem labelText="帐单地址邮编：" >
                                    <Input v-model.trim="acctObj.prodName" data-vv-as="帐单地址邮编" name="prodName" v-validate=""></Input>
                                </FormItem>
                                </Col> -->

                                <Col :span="10" :offset="2">
                                <FormItem labelText="帐单打印格式：">
                                    <Select v-validate="''" :isNullSel='true' :data="billPrefCdArray" name="billPrefCd" dataValueStr="attrValueName" dataLabelStr="attrValueName" data-vv-as="帐单打印格式" v-model="acctObj.billPrefCd"></Select>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                <FormItem labelText="帐单介质：">
                                    <Select v-validate="''" :isNullSel='true' dataValueStr="attrValue" dataLabelStr="attrValueName" :data="postMethodArray" name="postMethod" data-vv-as="帐单介质" v-model="acctObj.postMethod"></Select>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="2">
                                <FormItem labelText="帐单联系人姓名：">
                                    <Input v-model.trim="acctObj.contactName" data-vv-as="帐单联系人姓名" name="contactName" v-validate=""></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                <FormItem labelText="帐单联系人电话：" :errorMessage="errors.first('mobilePhone')">
                                    <Input v-model.trim="acctObj.mobilePhone" data-vv-as="帐单联系人电话" name="mobilePhone" v-validate="'mobile'"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="2">
                                <FormItem labelText="帐单联系人传真：" :requiredIcon="acctObj.postMethod == 2" :errorMessage="errors.first('fax')">
                                    <Input v-model.trim="acctObj.fax" data-vv-as="帐单联系人传真" name="fax" v-validate="acctObj.postMethod == 2 ? 'required' : ''"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                <FormItem labelText="联系人eMail地址：" :requiredIcon="acctObj.postMethod == 3" :errorMessage="errors.first('eMail')">
                                    <Input v-model.trim="acctObj.eMail" data-vv-as="联系人eMail地址" name="eMail" v-validate="acctObj.postMethod == 3 ? 'required|email' : 'email'"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="2">
                                <FormItem labelText="打印电子发票：">
                                    <RadioGroup v-validate="''" :data="ebillSmsNoticeFlgArray" name="einvoiceFlg" data-vv-as="打印电子发票  " v-model="acctObj.einvoiceFlg" @change=""></RadioGroup>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                    <FormItem labelText="下次开帐日期：" :errorMessage="errors.first('billEffectiveDate')" :successMessageInline="false" :requiredIcon="false">
                                        <DatePicker v-model.trim="acctObj.billEffectiveDate" name="effDate" data-vv-as="下次开帐日期" @input="handleDate" v-validate=""></DatePicker>
                                    </FormItem>
                                </Col>

                            </Form>
                        </Row>
                    </div>

                    <div class="a-v-title">
                        <div class="app__title">
                            <i class="icon-left"></i>
                            <span class="dialog-title">税务信息</span>
                        </div>
                    </div>

                    <div class="a-v-content">
                        <Row>
                            <Form labelWidth="120px" labelAlign="left">
                                <Col :span="10" :offset="1">
                                <FormItem labelText="税务地址:">
                                    <Input v-model.trim="acctObj.taxAddress" data-vv-as="税务地址" name="taxAddress" v-validate=""></Input>
                                </FormItem>
                                </Col>

                                <!-- <Col :span="10" :offset="2">
                                <FormItem labelText="税务开户银行名称：" >
                                    <Input v-model.trim="acctObj.prodName" data-vv-as="税务开户银行名称" name="" v-validate=""></Input>
                                </FormItem>
                                </Col> -->

                                <Col :span="10" :offset="2">
                                <FormItem labelText="税务号：" :errorMessage="errors.first('taxNumber')">
                                    <Input v-model.trim="acctObj.taxNumber" data-vv-as="税务号" name="taxNumber" v-validate="'isTax'"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                <FormItem labelText="税务开户银行帐户：" :errorMessage="errors.first('taxBankNumber')">
                                    <Input v-model.trim="acctObj.taxBankNumber" data-vv-as="税务开户银行帐户" name="taxBankNumber" v-validate="'numeric'"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="2">
                                <FormItem labelText="税务电话：" :errorMessage="errors.first('taxPhone')">
                                    <Input v-model.trim="acctObj.taxPhone" data-vv-as="税务电话" name="taxPhone" v-validate="'mobile'"></Input>
                                </FormItem>
                                </Col>

                            </Form>
                        </Row>
                    </div>
                </Row>
            </Scroll>
        </Dialog>

        <!-- 选择地址 -->
        <Dialog ref="chooseAddress" dialogTitle="选择地址" @confirm="chooseAddressConfirm()" @close="chooseAddressClose()">
            <Scroll class="app__table">
                <div class="s-l-search">
                    <Search placeholder="请输入地址名称" @search="searchResource"></Search>
                    <span class="app__btn app__btn-mod" @click="addAddress">新建地址</span>
                </div>

                <div class="app__table">
                    <Row class="app__table-thead">
                        <Col :span="6" :offset="2">选择</Col>
                        <Col :span="8">地址全称</Col>
                        <Col :span="6">综合地址Id</Col>
                    </Row>
                    <Row class="app__table-item" v-for="(item,index) in addressObj" :key="index">
                        <Col :span="6" :offset="2">
                        <Radio :name="item" :value="item" :label="item" v-model="radioData"></Radio>
                        </Col>
                        <Col :span="8">{{item.addressFull}}</Col>
                        <Col :span="6">{{item.addressId}}</Col>
                    </Row>
                </div>
            </Scroll>
        </Dialog>
        <Tip ref="tip" :tipObj="tipInfo" @confirm="tipConfirm()"></Tip>
    </div>
</template>

<script>
import filter from "@/filter/index.js";
export default {
    props: {
        currentData: {}
    },
    data() {
        return {
            dialogSize: {
                size: 80,
                min: 600,
                max: 800
            },
            dialogTitle: "",
            postMethodArray: [],
            collectionCdArray: [],
            ebillSmsNoticeFlgArray: [
                //是否发送短信帐单
                {
                    label: "是",
                    value: 1
                },
                {
                    label: "否",
                    value: 0
                }
            ],
            //帐单打印格式
            billPrefCdArray: [],
            tipInfo: {
                iconType: 1,
                msg: "",
                showBtn: {
                    clear: true,
                    save: true
                }
            },
            //帐户状态
            accountStatusCd: [],
            paymentArray: [],
            lateFeeFlagArray: [],
            addPaymentData: [],
            addPaymentArr: [],
            dynamicWidth: {},
            addPlanObj: {
            },
            modPlanObj: {
                extAcct: {}
            },
            //暂时绑定
            acctObj: {
                accounMail: "", //帐务服务信息邮件接收地址:
                acctName: "2", //帐户名称
                ebillSmsNoticeFlg: "2", //是否发送短信帐单
                ebillSmsServerId: "2", //接收应付额短信号码
                eMail: "2", //联系人eMail地址
                contactName: "2", //帐单联系人姓名
                fax: "2", //帐单联系人传真
                mobilePhone: "2", //帐单联系人电话
                einvoiceFlg: "1", //打印电子发票
                taxAddress: "2", //税务地址
                taxBankNumber: "1", //税务开户银行帐户
                taxNumber: "2", //税务号
                taxPhone: "2", //税务电话
                contactAddr: "" //dizhi
            },
            radioData:{
            },
            //客户信息
            custMation: "",
            accountMation: {
                invFormatCustomizeRel: [
                ]
            },
            delPaymentItem:'',
            bankArray: [],
            radioBank: {},
            modIndex: "",
            custId: "",
            addressObj: "",
            userRightBtnControl: {          // 权限按钮控制
                updateBtn: false,
                paymentSchemeAdd: false,            // 账户支付方案添加
                paymentSchemeModify: false,         // 账户支付方案修改
                paymentSchemeDelete: false,         // 账户支付方案删除
                accountReminderSign: false,         // 账户催欠标识
                accountLiquidatedDamages: false,    // 账户违约金
                accountElectronicInvoice: false,    // 账户打印电子发票
                accountNextBillDate: false,         // 账户下次开账日期 
            },
            bureauArr: ['松江','奉贤','青浦','嘉定','崇明','金山','南汇'],  //郊区定义
            paymentList: [],   //支付额度类型
            acctBillingTypeArray: [],  //帐户计费类型
            acctAddress: []         // 帐单寄达地址
        }
    },
    mounted() {
        this.$getjsons.getJson("ACC-C-0199").then(res => {
            this.postMethodArray = res.data.attrSpecDetail.attrValueList;
        });
        this.$getjsons.getJson("OTC-0001").then(res => {
            this.paymentArray = res.data.attrSpecDetail.attrValueList;
        });
        this.$getjsons.getJson("ACC-C-9001").then(res => {
            this.collectionCdArray = res.data.attrSpecDetail.attrValueList;
        });
        //帐户状态
        this.$getjsons.getJson("ACC-C-0203").then(res => {
            this.accountStatusCd = res.data.attrSpecDetail.attrValueList
        })
        //帐户付费类型
        this.$getjsons.getJson("ACC-C-0017").then(res => {
            this.acctBillingTypeArray = res.data.attrSpecDetail.attrValueList
        })
        //帐单打印格式
        this.$getjsons.getJson("ACC-SH-003").then(res => {
            this.billPrefCdArray = res.data.attrSpecDetail.attrValueList
        })

        if (this.currentData !== undefined) {
            this.custMation = this.currentData;
        }
        this.accountMation = this.currentData;
        this.getPayList();
        this.getDynamicWidth();
        this.getAcctAddress()
        
        // 循环权限数据     
        this.$user.getFuncComps().forEach((item) => {
            switch (item.compCode) {
                case 'F-CMB-200102':
                    this.userRightBtnControl.updateBtn = true;
                    break;
                case 'F-CMB-200103':
                    this.userRightBtnControl.paymentSchemeAdd = true;
                    break;
                case 'F-CMB-200104':
                    this.userRightBtnControl.paymentSchemeModify = true;
                    break;
                case 'F-CMB-200105':
                    this.userRightBtnControl.paymentSchemeDelete = true;
                    break;
                default:
                    break;
            }
        })
    },
    watch: {
        'acctObj.postMethod'(old,newValue) {
            if(this.acctObj.postMethod == '9') { 
                this.billPrefCdArray[2].disabled = true;
                this.billPrefCdArray[3].disabled = true;
                this.billPrefCdArray[4].disabled = true;
            } else {
                this.billPrefCdArray[2].disabled = false;
                this.billPrefCdArray[3].disabled = false;
                this.billPrefCdArray[4].disabled = false;
            }
        },
        "acctObj.ebillSmsNoticeFlg"(old,newValue) {
            if(this.acctObj.ebillSmsNoticeFlg == 0) {
                this.acctObj.ebillSmsServerId = ''
            }
        },
        "addPlanObj.paymentMethod"(old,newValue) {
            if(this.addPlanObj.paymentMethod == 100000) {
                this.addPlanObj.payAcctName = '';
                this.addPlanObj.payAcctCode = '';
                this.addPlanObj.paidBankNum = '';
            }
        },
        "modPlanObj.paymentMethod"(old,newValue) {
            if(this.modPlanObj.paymentMethod == 100000) {
                this.modPlanObj.payAcctName = '';
                this.modPlanObj.payAcctCode = '';
                this.modPlanObj.paidBankNum = '';
            }
        },
    },
    methods: {
        // 获取帐单寄达地址
        getAcctAddress () {
            this.$axios.get(this.$api.CustAddress, {
                params: {
                    addName: '',
                    custId: this.currentData.custId,
                    staffId: this.$user.getStaffId(),
                    sysRoleIds: this.$user.getSysRoleId(),
                    sysUserId: this.$user.getSysUserId(),
                    orgId: this.$user.getOrgId(),
                    xSubChannel: this.$user.getXSubChannel(),
                    source: 'VIEW'
                }
            }).then(res => {
                if (res.data.address.length) {
                    if(res.data.address != null){
                        this.acctAddress = res.data.address
                    }else{
                        this.acctAddress = []
                    }
                }
            }).catch(err => {
                this.$message.error({"message": err.response.data.message})
            })
        },
        //动态宽度
        getDynamicWidth() {
            let width = this.$refs.width.$el.clientWidth;
            this.dynamicWidth = {
                width: width + "px"
            };
        },

        //返回值转换
        getPostMethod(name, code) {
            if (name == "帐单介质") {
                let postMethod = this.postMethodArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return postMethod ? postMethod.attrValueName : "无";
            } else if (name == "是否发送短信帐单") {
                let ebillSmsNoticeFlg = this.ebillSmsNoticeFlgArray.filter(
                    item => {
                        return item.value == code;
                    }
                )[0];
                return ebillSmsNoticeFlg ? ebillSmsNoticeFlg.label : "无";
            } else if (name == "违约金标识") {
                let ebillSmsNoticeFlg = this.ebillSmsNoticeFlgArray.filter(
                    item => {
                        return item.value == code;
                    }
                )[0];
                return ebillSmsNoticeFlg ? ebillSmsNoticeFlg.label : "无";
            } else if (name == "催欠标识") {
                let collectionCdArray = this.collectionCdArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return collectionCdArray ? collectionCdArray.attrValueName : "无";
            } else if (name == "帐单打印格式") {
                let billPrefCdArray = this.billPrefCdArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return billPrefCdArray ? billPrefCdArray.attrValueName : "无";
            } else if (name == "帐户状态") {
                let accountStatusCd = this.accountStatusCd.filter(item => {
                    return item.attrValue == code;
                })[0];
                return accountStatusCd ? accountStatusCd.attrValueName : "无";
            } else if (name == "下次开帐日期") {
                return code ? filter.filters.getLocalTime(code) : "无";
            } else if (name == "付费方式") {
                let paymentArray = this.paymentArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return paymentArray ? paymentArray.attrValueName : "无";
            } else {
                return code ? code : "无";
            }
        },

        pageClose() {
            this.$emit("componentView", "list");
        },
        //返回按钮
        back() {
            this.$emit("componentView", "list");
        },
        //添加支付方案
        addPaymentPlan() {
            if(this.addPaymentData.length < 1){
                this.addPlanObj = {
                    paymentMethod:100000,
                    paymentLimitType: '1',
                    priority: '1',
                    upperAmount: '-1'
                };
                this.$refs.paymentAddPlan.show();
            } else {
                this.$message.warning({ message: "只能添加一个支付方案" });
            }
        },

        //支付方案dialog添加确认按钮
        paymentDialogAddConfirm() {
            this.$validator.validateAll('addPlanObj').then(result => {
                if (result) {
                    this.$axios
                        .post(this.$api.PaymentPlanAdd, {
                            createDate: "1",
                            createStaff: 1,
                            effDate: "1",
                            expDate: "1",
                            ifOnlinePay: "1",
                            payAcctType: 2,
                            paymentLimit: "1",
                            paymentLimitType: "1",
                            paymentMethod: this.addPlanObj.paymentMethod  ? this.addPlanObj.paymentMethod : '',
                            priority: "1",
                            statusCd: 1,
                            statusDate: "1",
                            updateDate: "1",
                            updateStaff: 1,
                            upperAmount: "1",
                            acctId: this.accountMation.acctId,
                            custId: this.accountMation.custId,
                            payAcctName: this.addPlanObj.payAcctName ? this.addPlanObj.payAcctName : '',
                            payAcctCode: this.addPlanObj.payAcctCode ? this.addPlanObj.payAcctCode : '',
                            exchgNum: this.addPlanObj.exchgNum ? this.addPlanObj.exchgNum : '',
                            eftAgreeNum: this.addPlanObj.eftAgreeNum ? this.addPlanObj.eftAgreeNum : '',
                            paidBankNum: this.addPlanObj.paidBankNum ? this.addPlanObj.paidBankNum : '',
                            eftZwzxBankName: this.addPlanObj.eftZwzxBankName ? this.addPlanObj.eftZwzxBankName : '',
                            eftZwzxBankNum: this.addPlanObj.eftZwzxBankNum ? this.addPlanObj.eftZwzxBankNum : '',
                            eftZwzxName: this.addPlanObj.eftZwzxName ? this.addPlanObj.eftZwzxName : '',
                            payChannel: "111",
                            ifContractQuickPay: 1
                        })
                        .then(res => {
                            if (res.data) {
                                this.$message.success({ message: "新增成功" });
                                this.$refs.paymentAddPlan.hide();
                                this.getPayList()
                                this.$refs.paymentAddPlan.hide();
                            } else {
                                this.$message.error({ message: "请求失败" });
                            }
                        })
                        .catch(err => {
                            this.$message.error({ message: err.response.data.message });
                        });
                }
            })
        },

        //支付方案dialog弹窗添加关闭
        paymentDialogAddClose() {
            this.$refs.paymentAddPlan.hide();
        },

        //支付方案dialog添加修改按钮
        paymentDialogModConfirm() {
             this.$validator.validateAll().then(result => {
                if (result) {
                    this.$axios
                        .patch(
                            this.$api.PaymentPlanMod.format({acctId:this.accountMation.acctId}),
                            {
                                acctId: this.accountMation.acctId,
                                createDate: this.modPlanObj.createDate,
                                createStaff: this.modPlanObj.createStaff,
                                custId: this.modPlanObj.custId,
                                effDate: this.modPlanObj.effDate,
                                errorcode: this.modPlanObj.errorcode,
                                errormessage: this.modPlanObj.errormessage,
                                expDate: this.modPlanObj.expDate,
                                ifOnlinePay: this.modPlanObj.ifOnlinePay,
                                payAcctId: this.modPlanObj.payAcctId,
                                payAcctType: this.modPlanObj.payAcctType,
                                paymentLimit: this.modPlanObj.paymentLimit,
                                paymentLimitType: this.modPlanObj.paymentLimitType,
                                paymentMethod: Number(this.modPlanObj.paymentMethod),
                                paymentPlanId: this.modPlanObj.paymentPlanId,
                                priority: this.modPlanObj.priority,
                                statusCd: this.modPlanObj.statusCd,
                                statusDate: this.modPlanObj.statusDate,
                                updateDate: this.modPlanObj.updateDate,
                                updateStaff: this.modPlanObj.updateStaff,
                                upperAmount: this.modPlanObj.upperAmount,
                                payAcctCode: this.modPlanObj.payAcctCode,
                                payAcctName: this.modPlanObj.payAcctName,
                                ifContractQuickPay: this.modPlanObj.ifContractQuickPay,
                                eftZwzxName: this.modPlanObj.eftZwzxName,
                                exchgNum: this.modPlanObj.exchgNum,
                                paidBankNum: this.modPlanObj.paidBankNum,
                                extAcctId: this.modPlanObj.extAcctId,
                                eftZwzxBankNum: this.modPlanObj.eftZwzxBankNum,
                                eftAgreeNum: this.modPlanObj.eftAgreeNum,
                                acctOwnerOrg: this.modPlanObj.acctOwnerOrg,
                                acctOwnerOrgBranch: this.modPlanObj.acctOwnerOrgBranch,
                                payChannel: this.modPlanObj.payChannel,
                                eftZwzxBankName: this.modPlanObj.eftZwzxBankName
                            }
                        )
                        .then(res => {
                            if (res.data) {
                                this.$refs.paymentModPlan.hide();
                                this.$message.success({ message: "修改成功" });
                                this.getPayList();
                            } else {
                                this.$message.error({ message: "请求失败" });
                            }
                        })
                        .catch(err => {
                            this.$message.error({ message: err.response.data.message });
                        });
                }
            })
        },

        //支付方案删除
        delPayment(index, item) {
            this.delPaymentItem = item;
            this.tipInfo.iconType = 3;
            this.tipInfo.msg = "确认要删除选择的记录吗？";
            this.tipInfo.showBtn.clear = true;
            this.tipInfo.showBtn.save = true;
            this.$refs.tip.show();
        },

        //修改支付方案
        modPayment(index, item) {
            this.modPlanObj = {
                createDate: item.createDate,
                createStaff: item.createStaff,
                effDate: item.effDate,
                expDate: item.expDate,
                ifOnlinePay: item.ifOnlinePay,
                payAcctType: item.payAcctType,
                paymentLimit: item.paymentLimit,
                paymentLimitType: item.paymentLimitType,
                paymentMethod: item.paymentMethod,
                priority: item.priority,
                statusCd: item.statusCd,
                statusDate: item.statusDate,
                updateDate: item.updateDate,
                updateStaff: item.updateStaff,
                upperAmount: item.upperAmount,
                acctId: item.acctId,
                custId: item.custId,
                payAcctName: item.extAcctDTO ? item.extAcctDTO.payAcctName : "",
                payAcctCode: item.extAcctDTO ? item.extAcctDTO.payAcctCode : "",
                exchgNum: item.extAcctDTO ? item.extAcctDTO.exchgNum : "",
                eftAgreeNum: item.extAcctDTO ? item.extAcctDTO.eftAgreeNum : "",
                paidBankNum: item.extAcctDTO ? item.extAcctDTO.paidBankNum : "",
                eftZwzxBankName: item.extAcctDTO
                    ? item.extAcctDTO.eftZwzxBankName
                    : "",
                eftZwzxBankNum: item.extAcctDTO
                    ? item.extAcctDTO.eftZwzxBankNum
                    : "",
                eftZwzxName: item.extAcctDTO ? item.extAcctDTO.eftZwzxName : "",
                errorcode: item.errorcode,
                errormessage: item.errormessage,
                payAcctId: item.payAcctId,
                paymentPlanId: item.paymentPlanId,
                ifContractQuickPay: item.extAcctDTO
                    ? item.extAcctDTO.ifContractQuickPay
                    : "",
                extAcctId: item.extAcctDTO ? item.extAcctDTO.extAcctId : "",
                acctOwnerOrg: item.extAcctDTO
                    ? item.extAcctDTO.acctOwnerOrg
                    : "",
                acctOwnerOrgBranch: item.extAcctDTO
                    ? item.extAcctDTO.acctOwnerOrgBranch
                    : "",
                payChannel: item.extAcctDTO ? item.extAcctDTO.payChannel : ""
            };
            this.$refs.paymentModPlan.show();
        },

        //支付方案dialog弹窗修改关闭
        paymentDialogModClose() {
            this.$refs.paymentModPlan.hide();
        },

        //托收银行点击
        showPayAcctName() {
            if(this.addPlanObj.paymentMethod == 100000) {
                return
            }
            this.radioBank = {};
            this.dialogTitle = "添加支付银行账号";
            this.$axios
                .get(this.$api.GetBankBranch, {
                    params: {
                        bankAcct:'',
                        bankAcctName:'',
                        bankBranchId:'',
                        bankBranchName: this.searchValue ? this.searchValue : "",
                        bankCode:'',
                        bankId:'',
                        lanId:'',
                        pageNum:'',
                        pageSize:'',
                        parBranchId:''
                    }
                })
                .then(res => {
                    if (res.data) {
                        this.bankArray = res.data;
                        this.$refs.payAcctNameDialog.show();
                    } else {
                        this.$message.error({ message: "请求失败" });
                    }
                })
                .catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
        },

        //地址选择确认按钮
        chooseAddressConfirm() {
            this.$set(
                this.acctObj,
                "contactAddr",
                this.radioData.addressFull
            );
            this.$refs.chooseAddress.hide();
        },

        //地址选择弹框回掉
        chooseAddressClose() {},

        // 地址信息列表
        showAddress() {
            this.$axios
                .get(this.$api.CustAddress, {
                    params: {
                        custId: this.custMation.custId,
                        staffId: this.$user.getStaffId(),
                        sysRoleIds: this.$user.getSysRoleId(),
                        sysUserId: this.$user.getSysUserId(),
                        orgId: this.$user.getOrgId(),
                        xSubChannel: this.$user.getXSubChannel()
                    }
                })
                .then(res => {
                    if (res.data) {
                        this.addressObj = res.data.address;
                        this.$refs.chooseAddress.show();
                    } else {
                        this.$message.error({ message: "请求失败" });
                    }
                })
                .catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
        },

        //时间控制
        handleDate(data) {
            let oDate = new Date(),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                currentDay = '';
            if (oMonth == 12) {
                oMonth = 1
                oYear += 1
            }
                currentDay = oYear + '-' + (oMonth < 10 ? '0' + (oMonth + 1) : (oMonth + 1)) + '-01'
            // 获取当前时间戳
            let currentTimestamp = oDate.getTime(),
            // 获取点击的时间
                clickTimestamp = this.$utils.time2TimeStap(data);
            
            if (clickTimestamp < currentTimestamp) {
                this.$message.warning({"message": "所选月份不能小于当前月份"})
                this.acctObj.billEffectiveDate = ''
                return
            } else {
                let time =  data.slice(0,8) + '01';
                this.acctObj.billEffectiveDate = currentDay;
            }
        },

        //托收银行确认按钮
        payAcctNameDialogConfirm() {
            if (this.dialogTitle == "添加支付银行账号") {
                this.addPlanObj = {
                    payAcctName:this.radioBank.bankBranchName,
                    payAcctCode:this.radioBank.bankAcct,
                    paidBankNum:this.radioBank.bankCode,
                    paymentMethod:this.addPlanObj.paymentMethod,
                    exchgNum:this.addPlanObj.exchgNum,
                    eftAgreeNum:this.addPlanObj.eftAgreeNum,
                    eftZwzxBankNum:this.addPlanObj.eftZwzxBankNum,
                    eftZwzxBankName:this.addPlanObj.eftZwzxBankName,
                    eftZwzxName:this.addPlanObj.eftZwzxName,
                    paymentLimitType: this.addPlanObj.paymentLimitType,
                    paymentMethod: this.addPlanObj.paymentMethod,
                    priority: this.addPlanObj.priority
                }
            } else if (this.dialogTitle == "修改支付银行账号") {
                this.$set(
                    this.modPlanObj,
                    "payAcctName",
                    this.radioBank.bankBranchName
                );
                this.$set(
                    this.modPlanObj,
                    "payAcctCode",
                    this.radioBank.bankAcct
                );
                this.$set(
                    this.modPlanObj,
                    "paidBankNum",
                    this.radioBank.bankCode
                );
            }
            this.$refs.payAcctNameDialog.hide();
        },

        //新建地址
        addAddressConfirm() {},
        //新建地址
        addAddress() {},

        //托收银行修改
        showPayAcctMod() {
            if(this.modPlanObj.paymentMethod == 100000 ) {
                return 
            }
            this.dialogTitle = "修改支付银行账号";
            this.$axios
                .get(this.$api.GetBankBranch, {
                    params: {
                        bankAcct:'',
                        bankAcctName:'',
                        bankBranchId:'',
                        bankBranchName: this.searchValue ? this.searchValue : "",
                        bankCode:'',
                        bankId:'',
                        lanId:'',
                        pageNum:'',
                        pageSize:'',
                        parBranchId:''
                    }
                })
                .then(res => {
                    if (res.data) {
                        this.bankArray = res.data;
                        this.$refs.payAcctNameDialog.show();
                    } else {
                        this.$message.error({ message: "请求失败" });
                    }
                })
                .catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
            this.radioBank = {
                bankBranchName: this.modPlanObj.payAcctName,
                bankAcct: this.modPlanObj.payAcctCode,
                bankCode: this.modPlanObj.paidBankNum
            };
        },

        //查询支付方案列表
        getPayList() {
            this.$axios
                .get(this.$api.PaymentPlanGet, {
                    params: {
                        acctId: this.accountMation.acctId
                    }
                })
                .then(res => {
                    if (res.data) {
                        this.addPaymentData = res.data;
                        this.addPaymentArr = Json.Parse(Json.Stringify(res.data));
                        this.$nextTick(() => {
                            this.$refs.listScroll.init();
                        });
                    } else {
                        this.$message.error({ message: "请求失败" });
                    }
                })
                .catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
        },

        //删除弹框确认
        tipConfirm() {
            let acctId = this.delPaymentItem.acctId;
            this.$axios
                .patch(
                    this.$api.PaymentPlanDel.format({acctId}),
                    {
                        acctId: acctId,
                        createDate: this.delPaymentItem.createDate,
                        createStaff: this.delPaymentItem.createStaff,
                        custId: this.accountMation.custId,
                        effDate: this.delPaymentItem.effDate,
                        errorcode: this.delPaymentItem.errorcode,
                        errormessage: this.delPaymentItem.errormessage,
                        expDate: this.delPaymentItem.expDate,
                        ifOnlinePay: this.delPaymentItem.ifOnlinePay,
                        payAcctId: this.delPaymentItem.payAcctId,
                        payAcctType: this.delPaymentItem.payAcctType,
                        paymentLimit: this.delPaymentItem.paymentLimit,
                        paymentLimitType: this.delPaymentItem.paymentLimitType,
                        paymentMethod: this.delPaymentItem.paymentMethod,
                        paymentPlanId: this.delPaymentItem.paymentPlanId,
                        priority: this.delPaymentItem.priority,
                        statusCd: 2,
                        statusDate: this.delPaymentItem.statusDate,
                        updateDate: this.delPaymentItem.updateDate,
                        updateStaff: this.delPaymentItem.updateStaff,
                        upperAmount: this.delPaymentItem.upperAmount,
                        payAcctCode: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.payAcctCode
                            : "",
                        payAcctName: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.payAcctName
                            : "",
                        ifContractQuickPay: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.ifContractQuickPay
                            : "",
                        eftZwzxName: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.eftZwzxName
                            : "",
                        exchgNum: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.exchgNum
                            : "",
                        paidBankNum: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.paidBankNum
                            : "",
                        extAcctId: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.extAcctId
                            : "",
                        eftZwzxBankNum: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.eftZwzxBankNum
                            : "",
                        eftAgreeNum: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.eftAgreeNum
                            : "",
                        acctOwnerOrg: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.acctOwnerOrg
                            : "",
                        acctOwnerOrgBranch: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.acctOwnerOrgBranch
                            : "",
                        payChannel: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.payChannel
                            : "",
                        eftZwzxBankName: this.delPaymentItem.extAcctDTO
                            ? this.delPaymentItem.extAcctDTO.eftZwzxBankName
                            : ""
                    }
                )
                .then(res => {
                    if (res.data) {
                        this.$message.success({ message: "删除成功" });
                        this.getPayList();
                    } else {
                        this.$message.error({ message: "请求失败" });
                    }
                })
                .catch(err => {
                    this.$message.error({ message: "请求失败" });
                });
            this.$refs.tip.hide();
        },

        //关闭回调
        payAcctNameDialogClose() {},


        save() {
            this.$emit('componentView','list')
        },
        searchResource() {},
        searchResources(data) { //托收银行
            this.searchValue = data;
            if(this.dialogTitle = "修改支付银行账号") {
                this.showPayAcctMod()
            } else {
                this.showPayAcctName()
            }
        },
        handleAmend() {
            if(this.accountMation.invFormatCustomizeRel[0]){
                this.acctObj = {
                    acctName: this.accountMation.acctName, //帐户名称
                    ebillSmsNoticeFlg: this.accountMation.invFormatCustomizeRel[0]
                        .ebillSmsNoticeFlg, //是否发送短信帐单
                    ebillSmsServerId: this.accountMation.invFormatCustomizeRel[0]
                        .ebillSmsServerId, //接收应付额短信号码
                    eMail: this.accountMation.invFormatCustomizeRel[0].eMail, //联系人eMail地址
                    contactName: this.accountMation.invFormatCustomizeRel[0]
                        .contactName, //帐单联系人姓名
                    fax: this.accountMation.invFormatCustomizeRel[0].fax, //帐单联系人传真
                    billEffectiveDate:this.accountMation.invFormatCustomizeRel[0].billEffectiveDate,
                    mobilePhone: this.accountMation.invFormatCustomizeRel[0]
                        .mobilePhone, //帐单联系人电话
                    einvoiceFlg: this.accountMation.invFormatCustomizeRel[0]
                        .einvoiceFlg, //打印电子发票
                    taxAddress: this.accountMation.invFormatCustomizeRel[0]
                        .taxAddress, //税务地址
                    taxBankNumber: this.accountMation.invFormatCustomizeRel[0]
                        .taxBankNumber, //税务开户银行帐户
                    taxNumber: this.accountMation.invFormatCustomizeRel[0]
                        .taxNumber, //税务号
                    taxPhone: this.accountMation.invFormatCustomizeRel[0].taxPhone, //税务电话
                    contactAddr: this.accountMation.invFormatCustomizeRel[0]
                        .contactAddr, //帐单寄达地址
                    collectionCd: this.accountMation.invFormatCustomizeRel[0]
                        .collectionCd, //催欠标识
                    lateFeeFlag: this.accountMation.invFormatCustomizeRel[0]
                        .lateFeeFlag, //违约金标识
                    billPrefCd: this.accountMation.invFormatCustomizeRel[0]
                        .billPrefCd, //帐单打印格式
                    postMethod: this.accountMation.invFormatCustomizeRel[0]
                        .postMethod, //帐单介质
                    // accounMail:this.accountMation.accounMail,//
                    acctBillingType: this.accountMation.acctBillingType,
                };
            } else {
                this.acctObj = {};
            }
            this.$refs.accountInfoMod.show();
        },
        accountDialogConfirm() {
            if(this.addPaymentArr.length > 0){
                this.addPaymentArr[0].extAcct = this.addPaymentArr[0].extAcctDTO;
                delete this.addPaymentArr[0].extAcctDTO;
            }
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.$axios
                    .patch(
                        this.$api.AccountInfoMod.format({acctId: this.accountMation.acctId}),
                        {
                            prodInstId: this.accountMation.prodInstId,
                            updateStaff: this.accountMation.updateStaff,
                            updateDate: this.accountMation.updateDate,
                            createStaff: this.accountMation.createStaff,
                            createDate: this.accountMation.createDate ? this.accountMation.createDate : '',
                            acctCd: this.accountMation.acctCd,
                            remark: this.accountMation.remark,
                            extAcctId: this.accountMation.extAcctId,
                            expDate: this.accountMation.expDate,
                            custId: this.accountMation.custId,
                            acctName: this.acctObj.acctName,
                            acctId: this.accountMation.acctId,
                            acctLoginName: this.accountMation.acctLoginName,
                            acctBillingType: this.acctObj.acctBillingType,
                            ext2AcctId: this.accountMation.ext2AcctId,
                            statusCd: this.accountMation.statusCd,
                            statusDate: this.accountMation.statusDate,
                            effDate: this.accountMation.effDate,
                            loginPassword: this.accountMation.loginPassword,
                            ext3AcctId: this.accountMation.ext3AcctId,
                            groupAcctId: this.accountMation.groupAcctId,
                            ext1AcctId: this.accountMation.ext1AcctId,
                            siebelRowId: this.accountMation.siebelRowId,
                            invFormatCustomizeRel: [
                                {
                                    acctId: this.accountMation.acctId,
                                    contactAddr: this.acctObj.contactAddr,
                                    contactName: this.acctObj.contactName,
                                    createDate: this.accountMation.invFormatCustomizeRel[0]
                                        .createDate,
                                    createStaff: this.accountMation.invFormatCustomizeRel[0]
                                        .createStaff,
                                    custOrderNbr: this.accountMation.invFormatCustomizeRel[0]
                                        .custOrderNbr,
                                    billEffectiveDate : this.acctObj.billEffectiveDate,
                                    eMail: this.acctObj.eMail,
                                    fax: this.acctObj.fax,
                                    invFormatCustomizeId: this.accountMation.invFormatCustomizeRel[0]
                                        .invFormatCustomizeId,
                                    invpayFlag: this.accountMation.invFormatCustomizeRel[0]
                                        .invpayFlag,
                                    mainPrdInstId: this.accountMation.invFormatCustomizeRel[0]
                                        .mainPrdInstId,
                                    mobilePhone: this.acctObj.mobilePhone,
                                    objId: this.accountMation.invFormatCustomizeRel[0].objId,
                                    objType: this.accountMation.invFormatCustomizeRel[0].objType,
                                    postCycle: this.accountMation.invFormatCustomizeRel[0].postCycle,
                                    postMethod: Number(this.acctObj.postMethod),
                                    postcode: this.accountMation.invFormatCustomizeRel[0].postcode,
                                    statusCd: this.accountMation.invFormatCustomizeRel[0].statusCd,
                                    statusDate: this.accountMation.invFormatCustomizeRel[0]
                                        .statusDate,
                                    updateDate: this.accountMation.invFormatCustomizeRel[0]
                                        .updateDate,
                                    updateStaff: this.accountMation.invFormatCustomizeRel[0]
                                        .updateStaff,
                                    custId: this.accountMation.invFormatCustomizeRel[0].custId,
                                    jtFlg: this.accountMation.invFormatCustomizeRel[0].jtFlg,
                                    linghuoFreq: this.accountMation.invFormatCustomizeRel[0]
                                        .linghuoFreq,
                                    taxAddress: this.acctObj.taxAddress,
                                    siebelRowId: this.accountMation.invFormatCustomizeRel[0]
                                        .siebelRowId,
                                    billPrefCd: this.acctObj.billPrefCd,
                                    taxBankNumber: this.acctObj.taxBankNumber,
                                    collectionCd: this.acctObj.collectionCd,
                                    bpType: this.accountMation.invFormatCustomizeRel[0].bpType,
                                    taxPhone: this.acctObj.taxPhone,
                                    agentId: this.accountMation.invFormatCustomizeRel[0].agentId,
                                    spcInvFlg: this.accountMation.invFormatCustomizeRel[0].spcInvFlg,
                                    taxNumber: this.acctObj.taxNumber,
                                    fftEmail: this.accountMation.invFormatCustomizeRel[0].fftEmail,
                                    einvoiceFlg: this.acctObj.einvoiceFlg,
                                    firstbureau: this.accountMation.invFormatCustomizeRel[0]
                                        .firstbureau,
                                    fftType: this.accountMation.invFormatCustomizeRel[0].fftType,
                                    ebillSmsFlg: this.accountMation.invFormatCustomizeRel[0]
                                        .ebillSmsFlg,
                                    ebillPhone: this.accountMation.invFormatCustomizeRel[0]
                                        .ebillPhone,
                                    ebillSmsServerId: this.acctObj.ebillSmsServerId,
                                    ebillSmsNoticeFlg: this.acctObj
                                        .ebillSmsNoticeFlg,
                                    lateFeeFlag: this.acctObj.lateFeeFlag
                                }
                            ],
                            prodInstAcctRel: [],
                            paymentPlans: this.addPaymentArr
                        }
                    )
                    .then(res => {
                        if (res.data) {
                            this.$message.success({ message: "修改成功" });
                            this.accountMation.acctName = this.acctObj.acctName;
                            this.accountMation.invFormatCustomizeRel[0].contactAddr = this.acctObj.contactAddr;
                            this.accountMation.invFormatCustomizeRel[0].contactName = this.acctObj.contactName;
                            this.accountMation.invFormatCustomizeRel[0].eMail = this.acctObj.eMail;
                            this.accountMation.invFormatCustomizeRel[0].fax = this.acctObj.fax;
                            this.accountMation.invFormatCustomizeRel[0].mobilePhone = this.acctObj.mobilePhone;
                            this.accountMation.invFormatCustomizeRel[0].postMethod = this.acctObj.postMethod;
                            this.accountMation.invFormatCustomizeRel[0].taxAddress = this.acctObj.taxAddress;
                            this.accountMation.invFormatCustomizeRel[0].billPrefCd = this.acctObj.billPrefCd;
                            this.accountMation.invFormatCustomizeRel[0].taxBankNumber = this.acctObj.taxBankNumber;
                            this.accountMation.invFormatCustomizeRel[0].collectionCd = this.acctObj.collectionCd;
                            this.accountMation.invFormatCustomizeRel[0].taxPhone = this.acctObj.taxPhone;
                            this.accountMation.invFormatCustomizeRel[0].taxNumber = this.acctObj.taxNumber;
                            this.accountMation.invFormatCustomizeRel[0].einvoiceFlg = this.acctObj.einvoiceFlg;
                            this.accountMation.invFormatCustomizeRel[0].ebillSmsServerId = this.acctObj.ebillSmsServerId;
                            this.accountMation.invFormatCustomizeRel[0].ebillSmsNoticeFlg = this.acctObj.ebillSmsNoticeFlg;
                            this.accountMation.invFormatCustomizeRel[0].lateFeeFlag = this.acctObj.lateFeeFlag;
                            this.accountMation.invFormatCustomizeRel[0].billEffectiveDate = this.acctObj.billEffectiveDate;
                            this.$refs.accountInfoMod.hide();
                        } else {
                            this.$message.error({ message: "请求失败" });
                        }
                    })
                    .catch(err => {
                        this.$message.error({ message: err.response.data.message });
                    });
                }
            })
        },
        accountDialogClose() {

        }
    }
};
</script>
<style lang="scss" scoped>

.addAcount {
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 20px 20px 40px;
    top: 0;
    left: 0;
    z-index: 202;
    overflow: auto;
    background-color: #fff;
    .t-header {
        height: 50px;
        text-align: center;
        border-bottom: 1px solid #f6f6f6;
        i {
            font-size: 16px;
            font-weight: bold;
        }
        .close {
            position: absolute;
            display: block;
            top: 0;
            right: 10px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            background: url("./images/close_page.png") no-repeat center;

            &:hover {
                opacity: 0.8;
            }
        }
    }

    .a-v-title {
        height: 50px;
        background-color: #fff;
        .app__title {
            line-height: 50px;
            font-size: 14px;
            i.icon-left {
                display: inline-block;
                width: 6px;
                height: 18px;
                vertical-align: text-bottom;
                background: $mainColor;
            }
            .dialog-title {
                font-size: 16px;
                color: #000;
            }
        }
        .app__btn {
            position: absolute;
            right: 30px;
            top: 12px;
        }
    }
    .app__title-1 {
         padding: 10px 0 0 30px;
    }
    
    .a-v-content {
        padding-left: 30px;
    }
    .detail-content {
        padding: 5px 30px 10px;

        .col {
            padding: 8px 0;
        }
    }
    .btnBox {
        width: 95%;
        height: 40px;
        position: absolute;
        bottom: 0;
        span {
            float: right;
            margin-left: 30px;
        }
    }
    .paymentplan {
        padding: 20px 20px 0px 0;
        margin-bottom: 10px;
        border-bottom: 1px solid #f6f6f6;
    }

    .app__table-right {
        span {
            cursor: pointer;
            color: $mainColor;
        }
    }
    .s-l-search {
        width: 50%;
        margin: 10px 0 10px 10px;
        span {
            position: absolute;
            top: 7px;
            right: -300px;
        }
    }
    .overflow-style {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>
