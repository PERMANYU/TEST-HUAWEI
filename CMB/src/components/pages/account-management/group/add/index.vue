<template>
    <transition name="fade">

        <div class="addAcount">
            <Scroll>
                <div class="t-header">
                    <i>添加帐户</i>
                    <span class="close" @click="pageClose()"></span>
                    <span></span>
                </div>

                <div class="app__title-1">
                    <span class="app__title-name">客户基本信息</span>
                </div>

                <div class="a-v-content">
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="7">
                            <FormItem labelText="客户名称：" :successMessageInline="false" :errorMessage="errors.first('custName')" :requiredIcon="true">
                                <Input v-model.trim="acctAddObj.custName" disabled data-vv-as="帐户名称" name="custName" v-validate="'required'"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="客户标识：" :errorMessage="errors.first('custId')">
                                <Input v-model.trim="acctAddObj.custId" disabled data-vv-as="客户标识" name="custId" v-validate="'numeric'"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="证件类型：" :errorMessage="errors.first('certType')">
                                <Input v-model.trim="acctAddObj.certType" disabled data-vv-as="证件类型" name="certType" v-validate=""></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="0">
                            <FormItem labelText="证件号码：" :errorMessage="errors.first('certNum')">
                                <Input v-model.trim="acctAddObj.certNum" disabled data-vv-as="证件号码" name="certNum" v-validate="''"></Input>
                            </FormItem>
                            </Col>
                        </Form>
                    </Row>
                </div>

                <div class="app__title-1">
                    <span class="app__title-name">帐户基本信息</span>
                </div>

                <div class="a-v-content">
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="7">
                            <FormItem labelText="帐户名称：" :successMessageInline="false" :errorMessage="errors.first('acctName')" :requiredIcon="true">
                                <Input v-model.trim="acctAddObj.acctName" data-vv-as="帐户名称" name="acctName" v-validate="'required'"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="是否可开具专票：" :errorMessage="errors.first('spcInvFlg')">
                                <RadioGroup v-validate="''" :data="ebillSmsNoticeFlgArray" name="spcInvFlg" data-vv-as="是否发送短信帐单" v-model="acctAddObj.spcInvFlg" @change=""></RadioGroup>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="是否发送短信帐单：" :errorMessage="errors.first('ebillSmsNoticeFlg')">
                                <RadioGroup v-validate="''" :data="ebillSmsNoticeFlgArray" name="ebillSmsNoticeFlg" data-vv-as="是否发送短信帐单" v-model="acctAddObj.ebillSmsNoticeFlg" @change=""></RadioGroup>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="0">
                            <FormItem labelText="接收应付额短信号码：" :requiredIcon="acctAddObj.ebillSmsNoticeFlg == 1" :errorMessage="errors.first('ebillSmsServerId')">
                                <Input v-model.trim="acctAddObj.ebillSmsServerId" :disabled="acctAddObj.ebillSmsNoticeFlg == 0"  data-vv-as="接收应付额短信号码" name="ebillSmsServerId" v-validate="acctAddObj.ebillSmsNoticeFlg == 1 ? 'required|mobile' : 'mobile'"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                                <FormItem labelText="帐户计费类型：" :errorMessage="errors.first('acctBillingType')" :requiredIcon="true">
                                    <Select v-validate="'required'" :isNullSel='true' :data="acctBillingTypeArray" dataValueStr="attrValue" dataLabelStr="attrValueName" name="acctBillingType" data-vv-as="帐户计费类型" v-model="acctAddObj.acctBillingType"></Select>
                                </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="下次开帐日期：" :errorMessage="errors.first('billEffectiveDate')" :successMessageInline="false" :requiredIcon="false">
                                <DatePicker v-model.trim="acctAddObj.billEffectiveDate" name="effDate" data-vv-as="下次开帐日期" @input="handleDate" v-validate="" :disabled="!userRightBtnControl.accountNextBillDate"></DatePicker>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="0">
                            <FormItem labelText="帐户区局：" :errorMessage="errors.first('firstbureau')">
                                <Select :isNullSel='true' :data="targetRcArr" name="firstbureau" data-vv-as="帐户区局" v-model="acctAddObj.firstbureau" dataLabelStr="attrValueName" dataValueStr="attrValue"></Select>
                            </FormItem>
                            </Col>
                            <Col :span="7" :offset="1">
                            <FormItem labelText="催欠标识：" :errorMessage="errors.first('collectionCd')">
                                <Select v-validate="''" :isNullSel='true' :data="collectionCdArray" dataValueStr="attrValue" dataLabelStr="attrValueName" name="collectionCd" data-vv-as="催欠标识" v-model="acctAddObj.collectionCd"></Select>
                            </FormItem>
                            </Col>
                            <Col :span="7" :offset="1">
                            <FormItem labelText="违约金标识：" :errorMessage="errors.first('lateFeeFlag')">
                                <RadioGroup v-validate="''" :data="ebillSmsNoticeFlgArray" name="lateFeeFlag" data-vv-as="是否发送短信帐单" v-model="acctAddObj.lateFeeFlag" @change=""></RadioGroup>
                            </FormItem>
                            </Col>
                            <Col :span="7" :offset="0">
                            <FormItem labelText="付费通电子邮件帐单接受地址：" :errorMessage="errors.first('fftEmail')">
                                <Input v-model.trim="acctAddObj.fftEmail" data-vv-as="付费通电子邮件帐单接受地址" name="fftEmail" v-validate=""></Input>
                            </FormItem>
                            </Col>
                            <Col :span="7" :offset="1">
                            <FormItem labelText="付费通电子帐单：" :errorMessage="errors.first('fftType')">
                                <Input v-model.trim="acctAddObj.fftType" data-vv-as="付费通电子帐单" name="fftType" v-validate=""></Input>
                            </FormItem>
                            </Col>
                            <Col :span="7" :offset="1">
                                <FormItem labelText="帐户状态：">
                                    <Select :isNullSel='true' :data="statusArray" dataValueStr="attrValue" dataLabelStr="attrValueName" name="statusCd" v-model="acctAddObj.statusCd"></Select>
                                </FormItem>
                            </Col>
                            <Col :span="7" v-if="!isRequiredIcon">
                                <FormItem labelText="账务服务信息邮件接收地址：">
                                    <Input v-model.trim="acctAddObj.accounMail" name="accounMail"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="7" v-if="isRequiredIcon">
                                <FormItem labelText="账务服务信息邮件接收地址："  :successMessageInline="false" :errorMessage="errors.first('accounMail')" :requiredIcon="true">
                                    <Input v-model.trim="acctAddObj.accounMail" name="accounMail" data-vv-as="账务服务信息邮件接收地址" v-validate="'required'"></Input>
                                </FormItem>
                            </Col>
                            <Col :span="7" :offset="1">
                                <FormItem labelText="处理时间：">
                                    <Input :value="acctAddObj.workTime | date" name="workTime" disabled></Input>
                                </FormItem>
                            </Col>
                        </Form>
                    </Row>
                </div>

                <div class="app__title-1">
                    <span class="app__title-name">帐单信息</span>
                </div>

                <div class="a-v-content">
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="7">
                            <FormItem labelText="帐单寄达地址：" :requiredIcon="false" :errorMessage="errors.first('contactAddr')">
                                <Select :data="addressData" dataLabelStr="addressFull" dataValueStr="addressFull" :isNullSel="true" v-model="acctAddObj.contactAddr"></Select>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="联系人eMail地址：" :requiredIcon="acctAddObj.postMethod == 3" :errorMessage="errors.first('eMail')">
                                <Input v-model.trim="acctAddObj.eMail" data-vv-as="联系人eMail地址" name="eMail" v-validate="acctAddObj.postMethod == 3 ? 'required|email' : 'email'"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1" v-if="!isFax">
                            <FormItem labelText="帐单联系人姓名：">
                                <Input v-model.trim="acctAddObj.contactName" data-vv-as="帐单联系人姓名" name="contactName" v-validate=""></Input>
                            </FormItem>
                            </Col>
                            <Col :span="7" :offset="1" v-if="isFax">
                                <FormItem labelText="帐单联系人姓名："  :successMessageInline="false" :errorMessage="errors.first('contactName')" :requiredIcon="true">
                                    <Input v-model.trim="acctAddObj.contactName" name="contactName" data-vv-as="帐单联系人姓名" v-validate="'required'"></Input>
                                </FormItem>
                            </Col>

                            <Col :span="7" :offset="0">
                            <FormItem labelText="帐单联系人传真：" :requiredIcon="acctAddObj.postMethod == 2" :errorMessage="errors.first('fax')">
                                <Input v-model.trim="acctAddObj.fax" data-vv-as="帐单联系人传真" name="fax" v-validate="acctAddObj.postMethod == 2 ? 'required' : ''"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="帐单联系人电话：" :errorMessage="errors.first('mobilePhone')">
                                <Input v-model.trim="acctAddObj.mobilePhone" data-vv-as="帐单联系人电话" name="mobilePhone" v-validate="'mobile'"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="打印电子发票：">
                                <RadioGroup v-validate="''" :data="ebillSmsNoticeFlgArray" name="einvoiceflg" data-vv-as="打印电子发票  " v-model="acctAddObj.einvoiceFlg" @change=""></RadioGroup>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="0">
                            <FormItem labelText="帐单介质：" :requiredIcon="true" :errorMessage="errors.first('postMethod')">
                                <Select v-validate="'required'" :isNullSel='true' data-vv-as="帐单介质" dataValueStr="attrValue" dataLabelStr="attrValueName" :data="postMethodArray" name="postMethod" v-model="acctAddObj.postMethod"></Select>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="帐单打印格式：" :requiredIcon="true" :errorMessage="errors.first('billPrefCd')">
                                <Select v-validate="'required'" :isNullSel='true' :data="billPrefCdArray" name="billPrefCd" dataValueStr="attrValueName" dataLabelStr="attrValueName" data-vv-as="帐单打印格式" v-model="acctAddObj.billPrefCd"></Select>
                            </FormItem>
                            </Col>
                            <Col :span="7" :offset="1">
                            <FormItem labelText="出帐周期：">
                                <Input :disabled="isPostCycle" v-model.trim="acctAddObj.postCycle" name="postCycle"></Input>
                            </FormItem>
                            </Col>

                        </Form>
                    </Row>
                </div>

                <div class="app__title-1">
                    <span class="app__title-name">税务信息</span>
                </div>

                <div class="a-v-content">
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="7">
                            <FormItem labelText="税务地址:">
                                <Input v-model.trim="acctAddObj.taxAddress" data-vv-as="税务地址" name="taxAddress" v-validate=""></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="税务开户银行帐户：" :errorMessage="errors.first('taxBankNumber')">
                                <Input v-model.trim="acctAddObj.taxBankNumber" data-vv-as="税务开户银行帐户" name="taxBankNumber" v-validate="'numeric'"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="税务号：" :errorMessage="errors.first('taxNumber')">
                                <Input v-model.trim="acctAddObj.taxNumber" data-vv-as="税务号" name="taxNumber" v-validate="'isTax'"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="0">
                            <FormItem labelText="税务电话：" :errorMessage="errors.first('taxPhone')">
                                <Input v-model.trim="acctAddObj.taxPhone" data-vv-as="税务电话" name="taxPhone" v-validate="'mobile'"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="7" :offset="1">
                            <FormItem labelText="税务开户银行名称：" :errorMessage="errors.first('taxBankName')">
                                <Input v-model.trim="acctAddObj.taxBankName" data-vv-as="税务开户银行名称" name="taxBankName" v-validate="''"></Input>
                            </FormItem>
                            </Col>

                        </Form>
                    </Row>
                </div>

                <div class="a-v-title">
                    <div class="app__title-1">
                        <span class="app__title-name">支付方案</span>
                    </div>
                    <span class="app__btn app__btn-add" @click.stop.self="addPaymentPlan" v-if="userRightBtnControl.addPayBtn">添加支付方案</span>
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
                            <Col :width='100'>优先级</Col>
                            <Col :width='200'>支付额度类型</Col>
                            <Col :width='100'>额度上限</Col>
                            <Col :width='200'>帐务中心开户银行名称</Col>
                            <Col :width='200'>帐务中心开户银行帐号</Col>
                            <Col :width='200'>帐务中心户名</Col>
                            <Col :width="100" class="app__table-right">操作</Col>
                        </Row>
                        <Row :class="['app__table-item overflow-style']" :inline="true" v-for="(item,index) in addPaymentData" :key="index">
                            <Col :width='200'>
                            {{getPostMethod('付费方式',item.paymentMethod)}}
                            </Col>
                            <Col :width='200'>{{item.extAcct.payAcctCode}}</Col>
                            <Col :width='200' :title="item.extAcct && item.extAcct.payAcctName ? item.extAcct.payAcctName : ''">{{item.extAcct.payAcctName}}</Col>
                            <Col :width='200' :title="item.extAcct && item.extAcct.eftAgreeNum ? item.extAcct.eftAgreeNum : ''">
                            {{item.extAcct.eftAgreeNum}}
                            </Col>
                            <Col :width='200'>
                            {{item.extAcct.exchgNum}}
                            </Col>
                            <Col :width='200'>
                            {{item.extAcct.paidBankNum}}
                            </Col>
                            <Col :width='100'>
                            {{item.priority}}
                            </Col>
                            <Col :width='200'>
                            {{changeType(item.paymentLimitType)}}
                            </Col>
                            <Col :width='100'>
                            {{item.upperAmount}}
                            </Col>
                            <Col :width='200'>
                            {{item.extAcct.eftZwzxBankName}}
                            </Col>
                            <Col :width='200'>
                            {{item.extAcct.eftZwzxBankNum}}
                            </Col>
                            <Col :width='200'>
                            {{item.extAcct.eftZwzxName}}
                            </Col>
                            <Col :width="100" class="app__table-right">
                            <span @click="modPayment(index,item)" v-if="userRightBtnControl.updatePayBtn">修改</span>
                            <span @click="delPayment(index,item)" v-if="userRightBtnControl.deletePayBtn">删除</span>
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
            <Dialog :dialogSize="dialogSize" ref="paymentAddPlan" dialogTitle="添加支付方案" @confirm="clickFlag ? paymentDialogAddConfirm() : ''" @close="paymentDialogAddClose()">
                <Scroll :isShowRight="true">
                    <Row class="paymentplan">
                        <Form labelWidth="120px" labelAlign="left" data-vv-scope="addPlanObj">
                            <Col :span="10" :offset="1">
                            <FormItem labelText="付费方式：" :requiredIcon="true" :errorMessage="errors.first('addPlanObj.paymentMethod')">
                                <Select :data="paymentArray" :disabled="acctAddObj.acctBillingType == '40'" v-validate="'required'" data-vv-as="付费方式" name="paymentMethod" :isNullSel='true' dataValueStr="attrValue" dataLabelStr="attrValueName" v-model="addPlanObj.paymentMethod"></Select>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="2">
                            <FormItem labelText="托收银行名称：" :requiredIcon="addPlanObj.paymentMethod == 110300" :errorMessage="errors.first('addPlanObj.payAcctName')">
                                <Input v-model="addPlanObj.payAcctName" name="payAcctName" data-vv-as="托收银行名称" v-validate="addPlanObj.paymentMethod == 110300 ? 'required' : ''" maxlength="0" :disabled="addPlanObj.paymentMethod == 100000" :placeholder="addPlanObj.paymentMethod == 100000 ? '' : '请选择托收银行'" @click.stop.native="showPayAcctName"></Input>
                            </FormItem>
                            </Col>
                            <!-- <Col :span="10" :offset="1">
                        <FormItem labelText="帐单打印格式：">
                            <Input v-model="addPlanObj.billPrefCd"></Input>
                        </FormItem>
                        </Col>             -->
                            <Col :span="10" :offset="1">
                            <FormItem labelText="托收银行帐号：" :requiredIcon="addPlanObj.paymentMethod == 110300" :errorMessage="errors.first('addPlanObj.payAcctCode')">
                                <Input v-model="addPlanObj.payAcctCode" v-validate="addPlanObj.paymentMethod == 110300 ? 'required|isBankNum' : 'isBankNum'" disabled data-vv-as="托收银行帐号" name="payAcctCode"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="2">
                            <FormItem labelText="支付行号：" :requiredIcon="addPlanObj.paymentMethod == 110300" :errorMessage="errors.first('addPlanObj.paidBankNum')">
                                <Input v-model="addPlanObj.paidBankNum" disabled v-validate="addPlanObj.paymentMethod == 110300 ? 'required|numeric' : 'numeric'" data-vv-as="支付行号" name="paidBankNum"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="1">
                            <FormItem labelText="交换号：" :errorMessage="errors.first('addPlanObj.exchgNum')">
                                <Input v-model="addPlanObj.exchgNum" :disabled="addPlanObj.paymentMethod == 100000"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="2">
                            <FormItem labelText="多方协议编号：" :errorMessage="errors.first('addPlanObj.eftAgreeNum')">
                                <Input v-model="addPlanObj.eftAgreeNum"></Input>
                            </FormItem>
                            </Col>
                            
                            <Col :span="10" :offset="1">
                            <FormItem labelText="优先级：">
                                <Input v-model="addPlanObj.priority" disabled></Input>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="2">
                            <FormItem labelText="支付额度类型：">
                                
                                <Select :data="paymentList" name="paymentLimitType" :isNullSel='false' dataValueStr="attrValue" dataLabelStr="attrValueName" v-model="addPlanObj.paymentLimitType"></Select>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="1">
                            <FormItem labelText="额度上限：">
                                <Input v-model="addPlanObj.upperAmount" disabled></Input>
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
            <Dialog :dialogSize="dialogSize" ref="paymentModPlan" dialogTitle="修改支付方案" @confirm="clickFlag ? paymentDialogModConfirm() : ''" @close="paymentDialogModClose()">
                <Scroll :isShowRight="true">
                    <Row class="paymentplan">
                        <Form labelWidth="120px" labelAlign="left" data-vv-scope="modPlanObj">

                            <Col :span="10" :offset="1">
                            <FormItem labelText="付费方式：" :requiredIcon="true" :errorMessage="errors.first('modPlanObj.paymentMethod')">
                                <Select :data="paymentArray" :disabled="acctAddObj.acctBillingType == '40'" v-validate="'required'" data-vv-as="付费方式" name="paymentMethod" :isNullSel='true' dataValueStr="attrValue" dataLabelStr="attrValueName" v-model="modPlanObj.paymentMethod"></Select>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="2">
                            <FormItem labelText="托收银行名称：" :requiredIcon="modPlanObj.paymentMethod == 110300" :errorMessage="errors.first('modPlanObj.payAcctName')">
                                <Input v-model="modPlanObj.extAcct.payAcctName" data-vv-as="托收银行名称" name="payAcctName" v-validate="modPlanObj.paymentMethod == 110300 ? 'required' : ''" @click.stop.native="showPayAcctMod" maxlength="0" :disabled="addPlanObj.paymentMethod == 100000" :placeholder="modPlanObj.paymentMethod == 100000 ? '' : '请选择托收银行'"></Input>
                            </FormItem>
                            </Col>
                            <!-- <Col :span="10" :offset="1">
                        <FormItem labelText="帐单打印格式：" >
                            <Input v-model="modPlanObj.billPrefCd"></Input>
                        </FormItem>
                        </Col> -->
                            <Col :span="10" :offset="1">
                            <FormItem labelText="多方协议编号：" :errorMessage="errors.first('modPlanObj.eftAgreeNum')">
                                <Input disabled v-model="modPlanObj.extAcct.eftAgreeNum"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="2">
                            <FormItem labelText="支付行号：" :requiredIcon="modPlanObj.paymentMethod == 110300" :errorMessage="errors.first('modPlanObj.paidBankNum')">
                                <Input disabled name="paidBankNum" data-vv-as="支付行号" v-validate="modPlanObj.paymentMethod == 110300 ? 'required|numeric' : 'numeric'" v-model="modPlanObj.extAcct.paidBankNum"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="1">
                            <FormItem labelText="交换号：" :errorMessage="errors.first('modPlanObj.exchgNum')">
                                <Input disabled v-model="modPlanObj.extAcct.exchgNum" :disabled="modPlanObj.paymentMethod == 100000"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="2">
                            <FormItem labelText="托收银行帐号：" :requiredIcon="modPlanObj.paymentMethod == 110300" :errorMessage="errors.first('modPlanObj.payAcctCode')">
                                <Input v-model="modPlanObj.extAcct.payAcctCode" disabled v-validate="modPlanObj.paymentMethod == 110300 ? 'required|isBankNum' : 'isBankNum'" data-vv-as="托收银行帐号" name="payAcctCode"></Input>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="1">
                            <FormItem labelText="优先级：">
                                <Input v-model="modPlanObj.priority" disabled></Input>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="2">
                            <FormItem labelText="支付额度类型：">
                                <Select :data="paymentList" name="paymentLimitType" :isNullSel='false' dataValueStr="attrValue" dataLabelStr="attrValueName" v-model="modPlanObj.paymentLimitType"></Select>
                            </FormItem>
                            </Col>

                            <Col :span="10" :offset="1">
                            <FormItem labelText="额度上限：">
                                <Input v-model="modPlanObj.upperAmount" disabled></Input>
                            </FormItem>
                            </Col>

                        </Form>
                    </Row>
                    <Row>
                        <Form labelWidth="120px" labelAlign="left">
                            <Col :span="10" :offset="1">
                            <FormItem labelText="帐务中心开户银行帐号：" :errorMessage="errors.first('modPlanObj.eftZwzxBankNum')">
                                <Input disabled v-model="modPlanObj.extAcct.eftZwzxBankNum" v-validate="'numeric'" data-vv-as="帐务中心开户银行帐号" name="eftZwzxBankNum"></Input>
                            </FormItem>
                            </Col>
                            <Col :span="10" :offset="2">
                            <FormItem labelText="帐务中心开户银行名称：" :errorMessage="errors.first('modPlanObj.eftZwzxBankName')">
                                <Input disabled v-model="modPlanObj.extAcct.eftZwzxBankName"></Input>
                            </FormItem>
                            </Col>
                            <Col :span="10" :offset="1">
                            <FormItem labelText="帐务中心户名：" :errorMessage="errors.first('modPlanObj.eftZwzxName')">
                                <Input disabled v-model="modPlanObj.extAcct.eftZwzxName"></Input>
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
                        <Row v-show="!bankArray.length" class="app__data-none">
                            <Col :span="24">
                                <span>暂无数据</span>
                            </Col>
                        </Row>
                    </div>
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
                        <Row v-show="!addressObj.length" class="app__data-none">
                            <Col :span="24">
                                <span>暂无数据</span>
                            </Col>
                        </Row>
                    </div>
                </Scroll>
            </Dialog>

        </div>

    </transition>
</template>

<script>
export default {
    props: {
        componentData: {}
    },
    data() {
        return {
            dialogSize: {
                size: 80,
                min: 600,
                max: 800
            },
            dialogTitle: "",
            acctAddObj: {
                collectionCd: "1000",
                ebillSmsNoticeFlg: "0",
                acctName: "",
                accounMail: "",
                statusCd: "1",
                workTime: this.$utils.getLocalTime(),
                lateFeeFlag: "1",
                fftEmail: "",
                billEffectiveDate: this.getNextDate(),
                postMethod: "",
                contactAddr: "",
                postCycle: "一个月",
                contactName: '联系人'
            },
            postMethodArray: [],
            collectionCdArray: [],
            ebillSmsNoticeFlgArray: [
                //是否发送短信帐单
                {
                    label: "是",
                    value: "1"
                },
                {
                    label: "否",
                    value: "0"
                }
            ],
            targetRcArr: [],                 // 目标区局
            statusArray:[],
            clickFlag:'',
            billPrefCdArray: [
                //帐单打印格式
                {
                    attrValueName: "不邮寄帐单（无附件）",
                    attrValue: "不邮寄帐单（无附件）"
                },
                {
                    attrValueName: "不邮寄帐单（有附件）",
                    attrValue: "不邮寄帐单（有附件）"
                },
                {
                    attrValueName: "邮寄帐单（无附件）",
                    attrValue: "邮寄帐单（无附件）",
                    disabled: false
                },
                {
                    attrValueName: "邮寄帐单（有附件）",
                    attrValue: "邮寄帐单（有附件）",
                    disabled: false
                },
                {
                    attrValueName: "邮寄帐单（IDC清单）",
                    attrValue: "邮寄帐单（IDC清单）",
                    disabled: false
                },
                {
                    attrValueName: "简打（无附件）、简打（有附件）",
                    attrValue: "不邮寄帐单（无附件）"
                },
                {
                    attrValueName: "二级科目帐单（无附件）",
                    attrValue: "二级科目帐单（无附件）"
                },
                {
                    attrValueName: "二级科目帐单（有附件）",
                    attrValue: "二级科目帐单（有附件）"
                }
            ],
            paymentArray: [],
            lateFeeFlagArray: [],
            addPaymentData: [],
            addressData: [],
            dynamicWidth: {},
            addPlanObj: {},
            modPlanObj: {
                extAcct: {}
            },
            bankArray: [],
            radioBank: {},
            modIndex: "",
            custId: "",
            addressObj: "",
            searchValue:'',//托收银行
            userRightBtnControl: {          // 权限按钮控制
                addPayBtn: false,           // 支付方案新增
                updatePayBtn: false,        // 支付方案修改
                deletePayBtn: false,        // 支付方案删除
                accountReminderSign: false,         // 账户催欠标识
                accountLiquidatedDamages: false,    // 账户违约金
                accountElectronicInvoice: false,    // 账户打印电子发票
                accountNextBillDate: false,         // 账户下次开账日期 
            },
            bureauArr: ['松江','奉贤','青浦','嘉定','崇明','金山','南汇'],  //郊区定义
            paymentList: [],   //支付额度类型
            isRequiredIcon: false,   //帐务服务信息邮件接收地址是否必填
            isFax: false,   //帐单介质为传真，帐单联系人必填
            isPostCycle: true,   // 判断是否为班长权限
            acctBillingTypeArray: [],  //帐户计费类型
        };
    },
    mounted() {
        this.getMatch();
        this.setCust();
        this.getDynamicWidth();
        this.GetAge(this.componentData.certNum);
        this.checkRole();
        this.showAddress();
        
        // 循环权限数据     
        this.$user.getFuncComps().forEach((item) => {
            switch (item.compCode) {
                case 'F-CMB-200103':
                    this.userRightBtnControl.addPayBtn = true;
                    break;
                case 'F-CMB-200104':
                    this.userRightBtnControl.updatePayBtn = true;
                    break;
                case 'F-CMB-200105':
                    this.userRightBtnControl.deletePayBtn = true;
                    break;
                case 'F-CMB-200111':
                    this.userRightBtnControl.accountNextBillDate = true;
                    break;
                default:
                    break;
            }
        })
    },
    watch: {
        "acctAddObj.postMethod"(newValue) {
            if (newValue == "9") {
                this.billPrefCdArray[2].disabled = true;
                this.billPrefCdArray[3].disabled = true;
                this.billPrefCdArray[4].disabled = true;
            } else {
                this.billPrefCdArray[2].disabled = false;
                this.billPrefCdArray[3].disabled = false;
                this.billPrefCdArray[4].disabled = false;
            }
            if (newValue == "11" || newValue == "8" ||newValue == "9" || newValue == "12") {
                this.isRequiredIcon = true;
            }else{
                this.isRequiredIcon = false;
            }
            if(newValue == '2'){
                this.isFax = true;
            }else{
                this.isFax = false;
            }

        },
        "acctAddObj.ebillSmsNoticeFlg"(old,newValue) {
            if(this.acctAddObj.ebillSmsNoticeFlg == 0) {
                this.acctAddObj.ebillSmsServerId = ''
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
                this.modPlanObj.extAcct.payAcctName = '';
                this.modPlanObj.extAcct.payAcctCode = '';
                this.modPlanObj.extAcct.paidBankNum = '';
            }
        },
    },
    methods: {
        //判断是否有班长权限
        checkRole() {
            let userOrgs = this.$user.getUserStorage().userOrgs;
            userOrgs.forEach(item => {
                item.sysRoles.forEach(itemList => {
                    if(itemList.sysRoleCode == 'cmb_accAdmin_manager'){
                        this.isPostCycle = false;
                    }
                })
            })
        },
        //帐单介质主数据
        getMatch() {
            this.$getjsons.getJson("ACC-C-0199").then(res => {
                this.postMethodArray = res.data.attrSpecDetail.attrValueList;
            })
            this.$getjsons.getJson("OTC-0001").then(res => {
                this.paymentArray = res.data.attrSpecDetail.attrValueList;
            });
            this.$getjsons.getJson("ACC-C-9001").then(res => {
                this.collectionCdArray = res.data.attrSpecDetail.attrValueList;
            });
            this.$getjsons.getJson("ACC-C-0210").then(res => {
                this.paymentList = res.data.attrSpecDetail.attrValueList;
            });
            this.$getjsons.getJson("ACC-C-0203").then(res => {
                this.statusArray = res.data.attrSpecDetail.attrValueList;
            });
            //帐户付费类型
            this.$getjsons.getJson("ACC-C-0017").then(res => {
                this.acctBillingTypeArray = res.data.attrSpecDetail.attrValueList
            })
            // 区局
            this.$getjsons.getJson("CHN-SH-0003").then(res => {
                this.targetRcArr = res.data.attrSpecDetail.attrValueList
            })
            // this.$getjsons.getJson("Y").then(res => {
            //     this.billPrefCdArray = res.data.attrSpecDetail.attrValueList
            // })
        },
        setCust() {
            this.custId = this.componentData.custId;
            this.$set(this.acctAddObj, "custName", this.componentData.custName);
            this.$set(this.acctAddObj, "custId", this.componentData.custId);
            this.$set(this.acctAddObj, "certType", this.componentData.certType);
            this.$set(this.acctAddObj, "certNum", this.componentData.certNum);
            this.$set(this.acctAddObj, "contactAddr", this.componentData.custAddr);
            this.$set(this.acctAddObj, "accounMail", this.componentData.eMail);
            this.$set(this.acctAddObj, "acctName", this.componentData.custName);
        },
        //动态宽度
        getDynamicWidth() {
            let width = this.$refs.width.$el.clientWidth;
            this.dynamicWidth = {
                width: width + "px"
            };
        },

        changeType(code) {
            //获取支付额度类型
            let obj = this.paymentList.find(item => item.attrValue == code);
            return obj.attrValueName ? obj.attrValueName : '';
        },

        GetAge(identityCard) {
            //根据身份证获取年龄
            var len = (identityCard + "").length;
            if (len == 0) {
                return 0;
            } else {
                if (len != 15 && len != 18) {
                    //身份证号码只能为15位或18位其它不合法
                    return 0;
                }
            }
            var strBirthday = "";
            if (len == 18) {
                //处理18位的身份证号码从号码中得到生日和性别代码
                strBirthday =
                    identityCard.substr(6, 4) +
                    "/" +
                    identityCard.substr(10, 2) +
                    "/" +
                    identityCard.substr(12, 2);
            }
            if (len == 15) {
                strBirthday =
                    "19" +
                    identityCard.substr(6, 2) +
                    "/" +
                    identityCard.substr(8, 2) +
                    "/" +
                    identityCard.substr(10, 2);
            }
            //时间字符串里，必须是“/”
            var birthDate = new Date(strBirthday);
            var nowDateTime = new Date();
            var age = nowDateTime.getFullYear() - birthDate.getFullYear();
            //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
            if (
                nowDateTime.getMonth() < birthDate.getMonth() ||
                (nowDateTime.getMonth() == birthDate.getMonth() &&
                    nowDateTime.getDate() < birthDate.getDate())
            ) {
                age--;
            }
            if (age > 60) {
                this.acctAddObj.billPrefCd = "邮寄帐单（有附件）";
            } else {
                this.acctAddObj.billPrefCd = "";
            }
        },

        //返回值转换
        getPostMethod(name, code) {
            if (name == "帐单介质") {
                let postMethod = this.postMethodArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return postMethod ? postMethod.attrValueName : "";
            } else if (name == "是否发送短信帐单") {
                let ebillSmsNoticeFlg = this.ebillSmsNoticeFlgArray.filter(
                    item => {
                        return item.value == code;
                    }
                )[0];
                return ebillSmsNoticeFlg ? ebillSmsNoticeFlg.label : "";
            } else if (name == "违约金标识") {
                let ebillSmsNoticeFlg = this.ebillSmsNoticeFlgArray.filter(
                    item => {
                        return item.value == code;
                    }
                )[0];
                return ebillSmsNoticeFlg ? ebillSmsNoticeFlg.label : "";
            } else if (name == "催欠标识") {
                let collectionCdArray = this.collectionCdArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return collectionCdArray ? collectionCdArray.attrValueName : "";
            } else if (name == "帐单打印格式") {
                let billPrefCdArray = this.billPrefCdArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return billPrefCdArray ? billPrefCdArray.attrValueName : "";
            } else if (name == "付费方式") {
                let paymentArray = this.paymentArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return paymentArray ? paymentArray.attrValueName : "无";
            } else {
                return code ? code : "空";
            }
        },

        pageClose() {
            this.$emit("componentView", "list");
        },
        //返回按钮
        back() {
            this.$emit("componentView", "list");
        },
        //save  保存按钮
        save() {
            // let checkGroupName = this.$utils.isGroupName(this.acctAddObj.acctName,this.componentData.custName);
            // if(!checkGroupName) {
            //     this.$message.warning({message: '帐户名称必须以客户名称开头'});
            //     return
            // }
            this.addData = {
                prodInstId: 10539,
                updateStaff: 111,
                updateDate: 1536310530000,
                createStaff: 1111,
                createDate: 1536310530000,
                acctCd: "",
                remark: "测试",
                extAcctId: "",
                expDate: 1536310530000,
                custId: this.custId,
                acctName: this.acctAddObj.acctName,
                accounMail: this.acctAddObj.accounMail,
                acctLoginName: "9.4客户测试的账户",
                acctBillingType: this.acctAddObj.acctBillingType,
                ext2AcctId: "1",
                statusCd: this.acctAddObj.statusCd,
                statusDate: 1536310530000,
                effDate: 1536310530000,
                loginPassword: "123456",
                ext3AcctId: "-1",
                groupAcctId: "1",
                ext1AcctId: "1",
                billingMedia: "邮寄",
                isSms: "1",
                paymentPhone: "18988088808",
                dropRegion: "31311",
                accounPhone: "18988088809",
                bankAccount: "88888",
                card: "13123",
                zipCode: "200124",
                noElectronicBill: 1,
                notStopSing: 1,
                notVoicePrompt: 1,
                notVoiceReminder: 1,
                billContactsFax: "123456789@qq.com",
                breakContractAurum: 1,
                isSend: 0,
                invFormatCustomizeRel: [
                    {
                        acctId: "",
                        contactAddr: this.acctAddObj.contactAddr
                            ? this.acctAddObj.contactAddr
                            : "",
                        contactName: this.acctAddObj.contactName
                            ? this.acctAddObj.contactName
                            : "",
                        createDate: "1",
                        createStaff: "1",
                        custOrderNbr: "1",
                        eMail: this.acctAddObj.eMail
                            ? this.acctAddObj.eMail
                            : "",
                        fax: this.acctAddObj.fax ? this.acctAddObj.fax : "",
                        invpayFlag: "1",
                        mainPrdInstId: "1",
                        mobilePhone: this.acctAddObj.mobilePhone
                            ? this.acctAddObj.mobilePhone
                            : "",
                        objId: "1",
                        objType: "1",
                        postCycle: "1",
                        postMethod: this.acctAddObj.postMethod
                            ? Number(this.acctAddObj.postMethod)
                            : "",
                        postcode: "",
                        statusCd: Number(this.acctAddObj.statusCd),
                        statusDate: "1",
                        updateDate: "1",
                        updateStaff: "1",
                        custId: this.custId,
                        jtFlg: "1",
                        linghuoFreq: "1",
                        taxAddress: this.acctAddObj.taxAddress
                            ? this.acctAddObj.taxAddress
                            : "",
                        siebelRowId: "1",
                        billPrefCd: this.acctAddObj.billPrefCd
                            ? this.acctAddObj.billPrefCd
                            : "",
                        taxBankName: this.acctAddObj.taxBankName
                            ? this.acctAddObj.taxBankName
                            : "",
                        taxBankNumber: this.acctAddObj.taxBankNumber
                            ? this.acctAddObj.taxBankNumber
                            : "",
                        collectionCd: this.acctAddObj.collectionCd
                            ? this.acctAddObj.collectionCd
                            : "",
                        taxPhone: this.acctAddObj.taxPhone
                            ? this.acctAddObj.taxPhone
                            : "",
                        agentId: "1",
                        spcInvFlg: this.acctAddObj.spcInvFlg
                            ? this.acctAddObj.spcInvFlg
                            : "",
                        taxNumber: this.acctAddObj.taxNumber
                            ? this.acctAddObj.taxNumber
                            : "",
                        fftEmail: this.acctAddObj.fftEmail
                            ? this.acctAddObj.fftEmail
                            : "",
                        einvoiceFlg: this.acctAddObj.einvoiceFlg
                            ? this.acctAddObj.einvoiceFlg
                            : "",
                        firstbureau: this.acctAddObj.firstbureau
                            ? this.acctAddObj.firstbureau
                            : "",
                        fftType: this.acctAddObj.fftType
                            ? this.acctAddObj.fftType
                            : "",
                        billEffectiveDate: this.acctAddObj.billEffectiveDate
                            ? this.$utils.time2TimeStap(
                                  this.acctAddObj.billEffectiveDate
                              )
                            : "",
                        ebillSmsFlg: "1",
                        ebillPhone: "1",
                        ebillSmsServerId: this.acctAddObj.ebillSmsServerId
                            ? this.acctAddObj.ebillSmsServerId
                            : "",
                        ebillSmsNoticeFlg: this.acctAddObj.ebillSmsNoticeFlg
                            ? this.acctAddObj.ebillSmsNoticeFlg
                            : "",
                        lateFeeFlag: this.acctAddObj.lateFeeFlag
                            ? this.acctAddObj.lateFeeFlag
                            : ""
                    }
                ],
                paymentPlans: this.addPaymentData
            };
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.$axios
                        .post(this.$api.AccountAdd, this.addData)
                        .then(res => {
                            if (res.data) {
                                this.$message.success({ message: "新增成功" });
                                this.$emit("componentView", "list", res.data);
                            } else {
                                this.$message.error({ message: "请求失败" });
                            }
                        })
                        .catch(err => {
                            this.$message.error({
                                message: err.response.data.message
                            });
                        });
                }
            });
        },
        //添加支付方案
        addPaymentPlan() {
            if(this.addPaymentData.length < 1){
                this.addPlanObj = {
                    paymentMethod: 100000,
                    paymentLimitType: '1',
                    priority: '1',
                    upperAmount: '-1'
                };
                this.clickFlag = true;
                this.$refs.paymentAddPlan.show();
            } else {
                this.$message.warning({ message: "只能添加一个支付方案" });
            }
        },

        getNextDate() {
            var oDate = new Date(),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                currentDay = "";

            if (oMonth == 12) {
                oMonth = 1;
                oYear += 1;
            }
            currentDay =
                oYear +
                "-" +
                (oMonth < 10 ? "0" + (oMonth + 1) : oMonth + 1) +
                "-01";
            return currentDay;
        },

        //支付方案dialog添加确认按钮
        paymentDialogAddConfirm() {
            if(this.clickFlag) {
                this.$validator.validateAll("addPlanObj").then(result => {
                    if (result) {
                        let obj = {
                            createDate: "1",
                            createStaff: 1,
                            effDate: "1",
                            expDate: "1",
                            ifOnlinePay: "1",
                            payAcctType: "2",
                            paymentLimit: "1",
                            paymentLimitType: this.addPlanObj.paymentLimitType
                                ? this.addPlanObj.paymentLimitType
                                : "",
                            paymentMethod: this.addPlanObj.paymentMethod ? this.addPlanObj.paymentMethod : "",
                            priority: this.addPlanObj.priority
                                ? this.addPlanObj.priority
                                : "",
                            statusCd: 1,
                            statusDate: "1",
                            updateDate: "1",
                            updateStaff: 1,
                            upperAmount: this.addPlanObj.upperAmount
                                ? this.addPlanObj.upperAmount
                                : "",
                            custId: this.custId,
                            extAcct: {
                                acctOwnerOrg: 1,
                                acctOwnerOrgBranch: 1,
                                createDate: 1536147797262,
                                createStaff: 1,
                                custId: this.custId,
                                effDate: 1536147797262,
                                expDate: 1536147797262,
                                ifContractQuickPay: 1,
                                payAcctName: this.addPlanObj.payAcctName
                                    ? this.addPlanObj.payAcctName
                                    : "",
                                payAcctCode: this.addPlanObj.payAcctCode
                                    ? this.addPlanObj.payAcctCode
                                    : "",
                                exchgNum: this.addPlanObj.exchgNum
                                    ? this.addPlanObj.exchgNum
                                    : "",
                                eftAgreeNum: this.addPlanObj.eftAgreeNum
                                    ? this.addPlanObj.eftAgreeNum
                                    : "",
                                paidBankNum: this.addPlanObj.paidBankNum
                                    ? this.addPlanObj.paidBankNum
                                    : "",
                                eftZwzxBankName: this.addPlanObj.eftZwzxBankName
                                    ? this.addPlanObj.eftZwzxBankName
                                    : "",
                                eftZwzxBankNum: this.addPlanObj.eftZwzxBankNum
                                    ? this.addPlanObj.eftZwzxBankNum
                                    : "",
                                eftZwzxName: this.addPlanObj.eftZwzxName
                                    ? this.addPlanObj.eftZwzxName
                                    : "",
                                payChannel: 1,
                                statusCd: "1",
                                statusDate: 1536147797262,
                                updateDate: 1536147797262,
                                updateStaff: 1,
                                siebelRowId: 1
                            }
                        };
                        this.addPaymentData.push(obj);
                        this.clickFlag = false;
                        // 校验规则：
                        // a)式修改为托收时，帐单打印格式设置为不邮寄帐单（有附件）
                        // b)付款方式修改为现金且帐户区局为郊区且帐户产品类型不是实时预付费且帐户产品类型不是准实时预付费时，设置为不邮寄帐单（无附件）；
                        if(this.addPlanObj.paymentMethod == '110300'){
                            this.acctAddObj.billPrefCd = '不邮寄帐单（有附件）';
                        }else if(this.addPlanObj.paymentMethod == '100000' && this.bureauArr.indexOf(this.acctAddObj.firstbureau) > -1 && this.acctAddObj.acctBillingType != '18' && this.acctAddObj.acctBillingType != '40'){
                            this.acctAddObj.billPrefCd = '不邮寄帐单（无附件）';
                        }
                        this.$refs.paymentAddPlan.hide();
                        this.$nextTick(() => {
                            this.$refs.listScroll.init();
                        });
                    }
                });
            }
        },

        //支付方案dialog弹窗添加关闭
        paymentDialogAddClose() {
            this.$refs.paymentAddPlan.hide();
        },

        //支付方案dialog添加修改按钮
        paymentDialogModConfirm() {
            if(this.clickFlag) {
                this.$validator.validateAll("modPlanObj").then(result => {
                    if (result) {
                        let modeObj = {
                            createDate: this.modPlanObj.createDate,
                            createStaff: this.modPlanObj.createStaff,
                            effDate: this.modPlanObj.effDate,
                            expDate: this.modPlanObj.expDate,
                            ifOnlinePay: this.modPlanObj.ifOnlinePay,
                            payAcctType: this.modPlanObj.payAcctType,
                            paymentLimit: this.modPlanObj.paymentLimit,
                            paymentLimitType: this.modPlanObj.paymentLimitType,
                            paymentMethod: this.modPlanObj.paymentMethod,
                            priority: this.modPlanObj.priority,
                            statusCd: this.modPlanObj.statusCd,
                            statusDate: this.modPlanObj.statusDate,
                            updateDate: this.modPlanObj.updateDate,
                            updateStaff: this.modPlanObj.updateStaff,
                            upperAmount: this.modPlanObj.upperAmount,
                            custId: this.custId,
                            extAcct: {
                                acctOwnerOrg: this.modPlanObj.extAcct.createDate,
                                acctOwnerOrgBranch: this.modPlanObj.extAcct
                                    .createDate,
                                createDate: this.modPlanObj.extAcct.createDate,
                                createStaff: this.modPlanObj.extAcct.createDate,
                                custId: this.custId,
                                effDate: this.modPlanObj.extAcct.effDate,
                                expDate: this.modPlanObj.extAcct.expDate,
                                ifContractQuickPay: this.modPlanObj.extAcct
                                    .ifContractQuickPay,
                                payAcctName: this.modPlanObj.extAcct.payAcctName,
                                payAcctCode: this.modPlanObj.extAcct.payAcctCode,
                                exchgNum: this.modPlanObj.extAcct.exchgNum,
                                eftAgreeNum: this.modPlanObj.extAcct.eftAgreeNum,
                                paidBankNum: this.modPlanObj.extAcct.paidBankNum,
                                eftZwzxBankName: this.modPlanObj.extAcct
                                    .eftZwzxBankName,
                                eftZwzxBankNum: this.modPlanObj.extAcct
                                    .eftZwzxBankNum,
                                eftZwzxName: this.modPlanObj.extAcct.eftZwzxName,
                                payChannel: this.modPlanObj.extAcct.payChannel,
                                statusCd: this.modPlanObj.extAcct.statusCd,
                                statusDate: this.modPlanObj.extAcct.statusDate,
                                updateDate: this.modPlanObj.extAcct.updateDate,
                                updateStaff: this.modPlanObj.extAcct.updateStaff,
                                siebelRowId: this.modPlanObj.extAcct.siebelRowId
                            }
                        };
                        this.addPaymentData.splice(this.modIndex, 1);
                        this.addPaymentData.push(modeObj);
                        this.clickFlag = false;
                        // 校验规则：
                        // a)式修改为托收时，帐单打印格式设置为不邮寄帐单（有附件）
                        // b)付款方式修改为现金且帐户区局为郊区且帐户产品类型不是实时预付费且帐户产品类型不是准实时预付费时，设置为不邮寄帐单（无附件）；
                        if(this.modPlanObj.paymentMethod == '110300'){
                            this.acctAddObj.billPrefCd = '不邮寄帐单（有附件）';
                        }else if(this.modPlanObj.paymentMethod == '100000' && this.bureauArr.indexOf(this.acctAddObj.firstbureau) > -1 && this.acctAddObj.acctBillingType != '18' && this.acctAddObj.acctBillingType != '40'){
                            this.acctAddObj.billPrefCd = '不邮寄帐单（无附件）';
                        }
                        this.$refs.paymentModPlan.hide();
                        this.$nextTick(() => {
                            this.$refs.listScroll.init();
                        });
                    }
                });
            }
            
        },

        //支付方案删除
        delPayment(index, item) {
            this.addPaymentData.splice(index, 1);
        },

        //修改支付方案
        modPayment(index, item) {
            this.modIndex = index;
            this.modPlanObj = {
                createDate: item.createDate,
                createStaff: item.createStaff,
                effDate: item.effDate,
                expDate: item.expDate,
                ifOnlinePay: item.ifOnlinePay,
                payAcctType: item.payAcctType,
                paymentLimit: item.paymentLimit,
                paymentLimitType: item.paymentLimitType,
                paymentMethod: this.acctAddObj.acctBillingType=='40'?'100000':item.paymentMethod,
                priority: item.priority,
                statusCd: item.statusCd,
                statusDate: item.statusDate,
                updateDate: item.updateDate,
                updateStaff: item.updateStaff,
                upperAmount: item.upperAmount,
                custId: this.custId,
                extAcct: {
                    acctOwnerOrg: item.extAcct.createDate,
                    acctOwnerOrgBranch: item.extAcct.createDate,
                    createDate: item.extAcct.createDate,
                    createStaff: item.extAcct.createDate,
                    custId: this.custId,
                    effDate: item.extAcct.effDate,
                    expDate: item.extAcct.expDate,
                    ifContractQuickPay: item.extAcct.ifContractQuickPay,
                    payAcctName: item.extAcct.payAcctName,
                    payAcctCode: item.extAcct.payAcctCode,
                    exchgNum: item.extAcct.exchgNum,
                    eftAgreeNum: item.extAcct.eftAgreeNum,
                    paidBankNum: item.extAcct.paidBankNum,
                    eftZwzxBankName: item.extAcct.eftZwzxBankName,
                    eftZwzxBankNum: item.extAcct.eftZwzxBankNum,
                    eftZwzxName: item.extAcct.eftZwzxName,
                    payChannel: item.extAcct.payChannel,
                    statusCd: item.extAcct.statusCd,
                    statusDate: item.extAcct.statusDate,
                    updateDate: item.extAcct.updateDate,
                    updateStaff: item.extAcct.updateStaff,
                    siebelRowId: item.extAcct.siebelRowId
                }
            };
            this.clickFlag = true;
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
                        bankAcct: "",
                        bankAcctName: "",
                        bankBranchId: "",
                        bankBranchName: this.searchValue ? this.searchValue : "",
                        bankCode: "",
                        bankId: "",
                        lanId: "",
                        pageNum: "",
                        pageSize: "",
                        parBranchId: ""
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
                this.acctAddObj,
                "contactAddr",
                this.radioData.addressFull
            );
            this.$refs.chooseAddress.hide();
        },

        //时间控制
        handleDate(data) {
            // 获取当前时间戳
            let currentTimestamp = new Date().getTime();
            // 获取点击的时间
            let clickTimestamp = this.$utils.time2TimeStap(data);

            if (clickTimestamp < currentTimestamp) {
                this.$message.warning({ message: "所选时间不能小于当前时间" });
                this.acctAddObj.billEffectiveDate = "";
                return;
            } else {
                this.acctAddObj.billEffectiveDate = data;
            }
        },

        //地址选择弹框回掉
        chooseAddressClose() {},

        // 地址信息列表
        showAddress() {
            this.$axios.get(this.$api.CustAddress, {
                params: {
                    custId: this.custId,
                    staffId: this.$user.getStaffId(),
                    sysRoleIds: this.$user.getSysRoleId(),
                    sysUserId: this.$user.getSysUserId(),
                    orgId: this.$user.getOrgId(),
                    xSubChannel: this.$user.getXSubChannel(),
                    source: 'VIEW'
                }
            }).then(res => {
                if (res.data) {
                    if(res.data.address != null){
                        this.addressData = res.data.address;
                    }else{
                        this.addressData = []
                    }
                } else {
                    this.$message.error({ message: "请求失败" });
                }
            }).catch(err => {
                this.$message.error({ message: err.response.data.message });
            });
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
                    this.modPlanObj.extAcct,
                    "payAcctName",
                    this.radioBank.bankBranchName
                );
                this.$set(
                    this.modPlanObj.extAcct,
                    "payAcctCode",
                    this.radioBank.bankAcct
                );
                this.$set(
                    this.modPlanObj.extAcct,
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
            if(this.modPlanObj.paymentMethod == 100000) {
                return
            }
            this.dialogTitle = "修改支付银行账号";
            this.$axios
                .get(this.$api.GetBankBranch, {
                    params: {
                        bankAcct: "",
                        bankAcctName: "",
                        bankBranchId: "",
                        bankBranchName: this.searchValue ? this.searchValue : "",
                        bankCode: "",
                        bankId: "",
                        lanId: "",
                        pageNum: "",
                        pageSize: "",
                        parBranchId: ""
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

        //关闭回调
        payAcctNameDialogClose() {},

        searchResource() { //地址
        },
        searchResources(data) { //托收银行
            this.searchValue = data;
            if(this.dialogTitle = "修改支付银行账号") {
                this.showPayAcctMod()
            } else {
                this.showPayAcctName()
            }
        }
    }
};
</script>
<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    top: -100% !important;
}
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
    color: #8e9aae;
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
        padding: 10px 30px;
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
        padding: 20px 0 0 0;
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
