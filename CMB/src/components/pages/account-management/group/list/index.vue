<template>
    <div class="list">
        <div class="header">
            <div class="h-all">
                <div class="h-a-title">
                    <Row class="search-group">
                        <Col :span="22">
                            <ConditionSearch :data="conditionSearchData" @search="conditionSearch"></ConditionSearch>
                        </Col>
                        <Col :span="2" class="addcount">
                        <span class="app__btn app__btn-add" @click="addAccount" v-if="userRightBtnControl.addBtn">添加</span>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>

        <div class="main">
            <Scroll class="app__table" :isShowBottom="true" :isShowRight="true" fixedTopClassName="m-title" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
                <DragGroup ref="width" class="m-title app__table-thead" :inline="true" :titleList="tableTitleData" @dragchange="dragchange">
                    <Col class="m-i-name m-t-n app__table-left" :width='180'>
                    <span>帐户名称</span>
                    <!-- <ColSel class="col-search" :showOrder="false" @confirm="filterConfirm">
                        <Input placeholder="请输入帐户名称"></Input>
                    </ColSel> -->
                    </Col>
                    <DragItem :width="item.width" :value="item" v-for="(item,index) in tableTitleData" :key="index">
                        <span>{{item.name}}</span>
                        <ColSel class="" :showOrder="false" @confirm="filterConfirm(item)">
                        </ColSel>
                    </DragItem>
                </DragGroup>
                <Row :class="['app__table-item ']" :inline="true" v-for="(item,index) in tableItemData" :key="index">
                    <Col :width="180" @click.native.stop="userRightBtnControl.detailBtn ? detailClick(item) : ''" class="m-i-name app__table-left">{{item.acctName}}</Col>
                    <Col :inline="true" :width="tableItem.width" class="overflow-style" v-for="(tableItem,tableIndex) in tableTitleData" :key="tableIndex">
                    <span v-if="item[tableItem.param]" :title="getPostMethod(tableItem.name,item[tableItem.param])">
                        {{getPostMethod(tableItem.name,item[tableItem.param])}}
                    </span>
                    <span v-else-if="item.invFormatCustomizeRel && item.invFormatCustomizeRel.length" :title="getPostMethod(tableItem.name,item.invFormatCustomizeRel[0][tableItem.param])">
                        {{getPostMethod(tableItem.name,item.invFormatCustomizeRel[0][tableItem.param])}}
                    </span>
                    </Col>
                </Row>
                <Row class="empty-style" :style="dynamicWidth" :class="['m-item app__table-item']" v-for="item in (20 - tableItemData.length)" :key="item.id"></Row>
            </Scroll>
        </div>

        <div class="footer" v-if="tableItemData.length">
            <Pagination :pageIndex="pageInfo.pageIndex" @pageChange="pageChange"></Pagination>
        </div>

        <!-- 左边弹窗S -->
        <LeftDialog ref="leftDialog">
            <div class="dialog_header">
                <span class="title">帐户详情</span>
                <div class="dialog_header-bottom">

                    <Row class="box_right">
                        <Col :span="2">
                            <img src="./images/kehu.png">
                        </Col>
                        <Col :span="4">
                            <span class="h-name">{{leftDialogObj.acctName}}</span>
                        </Col>
                        <Col :span="2" class="h-line" >

                        </Col>
                        <Col :span="7">
                            <Row class="app__ellipsis">
                                <Col>
                                    <span class="app__lt-label">客户标识：</span>
                                    <span class="app__lt-text" :title="leftDialogObj.custId">{{leftDialogObj.custId}}</span>
                                </Col>
                            </Row>
                            <Row class="app__ellipsis">
                                <Col>
                                    <span class="app__lt-label">分帐序号：</span>
                                    <span class="app__lt-text" :title="leftDialogObj.acctCd">{{leftDialogObj.acctCd}}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col :span="7">
                            <Row class="app__ellipsis">
                                <Col>
                                    <span class="app__lt-label">帐户状态：</span>
                                    <span class="app__lt-text" :title="getPostMethod('帐户状态',leftDialogObj.statusCd)">{{getPostMethod('帐户状态',leftDialogObj.statusCd)}}</span>
                                </Col>
                            </Row>
                            <Row class="app__ellipsis">
                                <Col>
                                    <span class="app__lt-label">帐单介质：</span>
                                    <span class="app__lt-text" :title="getPostMethod('帐单介质',invFormatCustomizeRel.postMethod)">{{getPostMethod('帐单介质',invFormatCustomizeRel.postMethod)}}</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="dialog-content">

                <Scroll class="dialog-main">
                    <div class="a-v-title">
                        <div class="app__title-1">
                            <span class="app__title-name">基本信息</span>
                        </div>
                        <span class="app__btn app__btn-mod" @click.stop.self="handleAmend"  v-if="userRightBtnControl.updateBtn">修改</span>
                    </div>

                    <div class="info-container">
                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">账号名称：</span>
                                <span class="app__lt-text" :title="leftDialogObj.acctName || '无'">{{leftDialogObj.acctName || '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">账单介质：</span>
                                <span class="app__lt-text" :title="getPostMethod('帐单介质',invFormatCustomizeRel.postMethod)">{{getPostMethod('帐单介质',invFormatCustomizeRel.postMethod)}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">是否发送短信账单：</span>
                                <span class="app__lt-text" :title="getPostMethod('是否发送短信帐单',invFormatCustomizeRel.ebillSmsNoticeFlg)">{{getPostMethod('是否发送短信帐单',invFormatCustomizeRel.ebillSmsNoticeFlg)}}</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">接收应付额短信号码：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.ebillSmsServerId || '无'">{{invFormatCustomizeRel.ebillSmsServerId || '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">客户标识：</span>
                                <span class="app__lt-text" :title="leftDialogObj.custId || '无'">{{leftDialogObj.custId || '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">帐户计费类型：</span>
                                <span class="app__lt-text" :title="leftDialogObj.acctBillingTypeName || '无'">{{leftDialogObj.acctBillingTypeName || '无'}}</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">分帐序号：</span>
                                <span class="app__lt-text" :title="leftDialogObj.acctCd || '无'">{{leftDialogObj.acctCd || '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">下次开帐日期：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.billEffectiveDate ? getPostMethod('下次开帐日期',invFormatCustomizeRel.billEffectiveDate) : '无'">{{invFormatCustomizeRel.billEffectiveDate ? getPostMethod('下次开帐日期',invFormatCustomizeRel.billEffectiveDate) : '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">帐户区局：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.firstbureau || '无'">{{invFormatCustomizeRel.firstbureau || '无'}}</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">催欠标识：</span>
                                <span class="app__lt-text" :title="getPostMethod('催欠标识',invFormatCustomizeRel.collectionCd)">{{getPostMethod('催欠标识',invFormatCustomizeRel.collectionCd)}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">违约金标识：</span>
                                <span class="app__lt-text" :title="getPostMethod('违约金标识',invFormatCustomizeRel.lateFeeFlag)">{{getPostMethod('违约金标识',invFormatCustomizeRel.lateFeeFlag)}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">付费通电子邮件帐单接受地址：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.fftEmail || '无'">{{invFormatCustomizeRel.fftEmail || '无'}}</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">付费通电子帐单：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.fftType || '无'">{{invFormatCustomizeRel.fftType || '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">是否可开具专票：</span>
                                <span class="app__lt-text" :title="getPostMethod('是否发送短信帐单',invFormatCustomizeRel.spcInvFlg)">{{getPostMethod('是否发送短信帐单',invFormatCustomizeRel.spcInvFlg)}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">帐户状态：</span>
                                <span class="app__lt-text" :title="getPostMethod('帐户状态',leftDialogObj.statusCd)">{{getPostMethod('帐户状态',leftDialogObj.statusCd)}}</span>
                            </Col>
                        </Row>
                    </div>
                    
                    <!-- </div> -->

                    <div class="app__title-1">
                        <span class="app__title-name">帐单信息</span>
                    </div>

                    <div class="info-container">
                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">打印电子发票：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.einvoiceFlg">{{getPostMethod('是否发送短信帐单',invFormatCustomizeRel.einvoiceFlg)}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">联系人eMail地址：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.eMail">{{invFormatCustomizeRel.eMail || '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">帐单联系人姓名：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.contactName">{{invFormatCustomizeRel.contactName || '无'}}</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">帐单联系人传真：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.fax ">{{invFormatCustomizeRel.fax || '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">帐单联系人电话：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.mobilePhone">{{invFormatCustomizeRel.mobilePhone || '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">帐单寄达地址：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.contactAddr">{{invFormatCustomizeRel.contactAddr || '无'}}</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">帐单打印格式：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.billPrefCd">{{invFormatCustomizeRel.billPrefCd | filterName}}</span>
                            </Col>
                        </Row>
                    </div>
                    <!-- </div> -->

                    <!-- <div v-show="tabCode == 'tax'"> -->
                    <div class="app__title-1">
                        <span class="app__title-name">税务信息</span>
                    </div>

                    <div class="info-container">
                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">税务地址：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.taxAddress">{{invFormatCustomizeRel.taxAddress || '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">税务开户银行名称：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.taxBankName">{{invFormatCustomizeRel.taxBankName || '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">税务开户银行帐户：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.taxBankNumber">{{invFormatCustomizeRel.taxBankNumber || '无'}}</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">税务号：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.taxNumber">{{invFormatCustomizeRel.taxNumber || '无'}}</span>
                            </Col>
                            <Col class="app__ellipsis" :span="8">
                                <span class="app__lt-label">税务电话：</span>
                                <span class="app__lt-text" :title="invFormatCustomizeRel.taxPhone">{{invFormatCustomizeRel.taxPhone || '无'}}</span>
                            </Col>
                        </Row>
                    </div>
                    <!-- </S> -->

                    <!-- <div v-show="tabCode == 'payment'" class="payment"> -->
                    <div class="a-v-title app__table-thead">
                        <div class="app__title-1">
                            <span class="app__title-name">支付方案</span>
                        </div>
                        <span class="app__btn app__btn-add" @click.stop.self="addPaymentPlan" v-if="userRightBtnControl.addPayBtn">添加支付方案</span>
                    </div>

                    <div class="main">
                        <Scroll class="app__table" :isShowBottom="true" fixedTopClassName="app__table-thead" ref="listScroll" fixedLeftClassName='app__table-left' fixedRightClassName="app__table-right">
                            <Row class='app__table-thead' ref="wid" :inline="true">
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
                                {{item.paymentMethodName ? item.paymentMethodName : '空'}}
                                </Col>
                                <Col :width='200'>{{item.extAcctDTO && item.extAcctDTO.payAcctCode ? item.extAcctDTO.payAcctCode : '空'}}</Col>
                                <Col :width='200' :title="item.extAcctDTO && item.extAcctDTO.payAcctName ? item.extAcctDTO.payAcctName : ''">{{item.extAcctDTO && item.extAcctDTO.payAcctName ? item.extAcctDTO.payAcctName : '空'}}</Col>
                                <Col :width='200' :title="item.extAcctDTO && item.extAcctDTO.eftAgreeNum ? item.extAcctDTO.eftAgreeNum : ''">
                                {{item.extAcctDTO && item.extAcctDTO.eftAgreeNum　 ?　item.extAcctDTO.eftAgreeNum　: '空'}}
                                </Col>
                                <Col :width='200'>
                                {{item.extAcctDTO && item.extAcctDTO.exchgNum　 ?　item.extAcctDTO.exchgNum　: '空'}}
                                </Col>
                                <Col :width='200'>
                                {{item.extAcctDTO && item.extAcctDTO.paidBankNum　 ?　item.extAcctDTO.paidBankNum　: '空'}}
                                </Col>
                                <Col :width='200'>
                                {{item.extAcctDTO && item.extAcctDTO.eftZwzxBankName　 ?　item.extAcctDTO.eftZwzxBankName　: '空'}}
                                </Col>
                                <Col :width='200'>
                                {{item.extAcctDTO && item.extAcctDTO.eftZwzxBankNum　 ?　item.extAcctDTO.eftZwzxBankNum　: '空'}}
                                </Col>
                                <Col :width='200'>
                                {{item.extAcctDTO && item.extAcctDTO.eftZwzxName　 ?　item.extAcctDTO.eftZwzxName　: '空'}}
                                </Col>
                                <Col :width="100" class="app__table-right">
                                <span @click="modPayment(item)" v-if="userRightBtnControl.updatePayBtn">修改</span>
                                <span @click="delPayment(item)" v-if="userRightBtnControl.deletePayBtn">删除</span>
                                </Col>
                            </Row>
                            <Row :class="['app__table-item dyWidth']" v-for="item in (7 - addPaymentData.length)" :key="item.id"></Row>
                        </Scroll>
                    </div>
                    <!-- </div> -->
                </Scroll>
                <div class="page"></div>
            </div>
        </LeftDialog>
        <!-- 左边弹窗E -->

        <!-- 添加支付方案弹窗 -->
        <Dialog :dialogSize="dialogSize" ref="paymentAddPlan" dialogTitle="添加支付方案" @confirm="paymentDialogAddConfirm()" @close="paymentDialogAddClose()">
            <Scroll :isShowRight="true">
                <Row class="paymentplan">
                    <Form labelWidth="120px" labelAlign="left" data-vv-scope="addPlanObj">
                        <Col :span="10" :offset="1">
                        <FormItem labelText="付费方式：" :requiredIcon="true" :errorMessage="errors.first('addPlanObj.paymentMethod')">
                            <Select :disabled="leftDialogObj.acctBillingType == '40'" :data="paymentArray" data-vv-as="付费方式" v-validate="'required'" name="paymentMethod" :isNullSel='true' dataValueStr="attrValue" dataLabelStr="attrValueName" v-model="addPlanObj.paymentMethod"></Select>
                        </FormItem>
                        </Col>

                        <Col :span="10" :offset="2">
                        <FormItem labelText="托收银行名称：" :requiredIcon="addPlanObj.paymentMethod == 110300" :errorMessage="errors.first('addPlanObj.payAcctName')">
                            <Input v-model="addPlanObj.payAcctName" :disabled="addPlanObj.paymentMethod == 100000" v-validate="addPlanObj.paymentMethod == 110300 ? 'required' : ''" maxlength="0" :placeholder="addPlanObj.paymentMethod == 100000 ? '' : '请选择托收银行'" data-vv-as="托收银行名称" name="payAcctName" @click.stop.native="showPayAcctName"></Input>
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
                            <Input v-model="addPlanObj.exchgNum"></Input>
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
                    <Form labelWidth="120px" labelAlign="left" data-vv-scope="modPlanObj">

                        <Col :span="10" :offset="1">
                        <FormItem labelText="付费方式：" :requiredIcon="true" :errorMessage="errors.first('modPlanObj.paymentMethod')">
                            <Select :disabled="leftDialogObj.acctBillingType == '40'" :data="paymentArray" data-vv-as="付费方式" name="paymentMethod" v-validate="'required'" :isNullSel='true' dataValueStr="attrValue" dataLabelStr="attrValueName" v-model="modPlanObj.paymentMethod"></Select>
                        </FormItem>
                        </Col>

                        <Col :span="10" :offset="2">
                        <FormItem labelText="托收银行名称：" :requiredIcon="modPlanObj.paymentMethod == 110300" :errorMessage="errors.first('modPlanObj.payAcctName')">
                            <Input v-model="modPlanObj.payAcctName" :disabled="modPlanObj.paymentMethod == 100000" data-vv-as="托收银行名称" name="payAcctName" maxlength="0" :placeholder="modPlanObj.paymentMethod == 100000 ? '' :'请选择托收银行'" v-validate="modPlanObj.paymentMethod == 110300 ? 'required' : ''" @click.stop.native="showPayAcctMod"></Input>
                        </FormItem>
                        </Col>

                        <Col :span="10" :offset="1">
                        <FormItem labelText="托收银行帐号：" :requiredIcon="modPlanObj.paymentMethod == 110300" :errorMessage="errors.first('modPlanObj.payAcctCode')">
                            <Input v-model="modPlanObj.payAcctCode" disabled v-validate="modPlanObj.paymentMethod == 110300 ? 'required|isBankNum' : 'isBankNum'" data-vv-as="托收银行帐号" name="payAcctCode"></Input>
                        </FormItem>
                        </Col>

                        <!-- <Col :span="10" :offset="1">
                        <FormItem labelText="帐单打印格式：" >
                            <Input v-model="modPlanObj.billPrefCd"></Input>
                        </FormItem>
                        </Col> -->

                        <Col :span="10" :offset="2">
                        <FormItem labelText="交换号：" :errorMessage="errors.first('modPlanObj.exchgNum')">
                            <Input disabled v-model="modPlanObj.exchgNum"></Input>
                        </FormItem>
                        </Col>

                        <Col :span="10" :offset="1">
                        <FormItem labelText="支付行号：" :requiredIcon="modPlanObj.paymentMethod == 110300" :errorMessage="errors.first('modPlanObj.paidBankNum')">
                            <Input disabled v-model="modPlanObj.paidBankNum" name="paidBankNum" data-vv-as="支付行号" v-validate="modPlanObj.paymentMethod == 110300 ? 'required|numeric' : 'numeric'"></Input>
                        </FormItem>
                        </Col>

                        <Col :span="10" :offset="2">
                        <FormItem labelText="多方协议编号：" :errorMessage="errors.first('modPlanObj.eftAgreeNum')">
                            <Input v-model="modPlanObj.eftAgreeNum"></Input>
                        </FormItem>
                        </Col>

                    </Form>
                </Row>
                <Row>
                    <Form labelWidth="120px" labelAlign="left">
                        <Col :span="10" :offset="1">
                        <FormItem labelText="帐务中心开户银行帐号：" :errorMessage="errors.first('modPlanObj.eftZwzxBankNum')">
                            <Input disabled v-model="modPlanObj.eftZwzxBankNum" v-validate="'numeric'" data-vv-as="帐务中心开户银行帐号" name="eftZwzxBankNum"></Input>
                        </FormItem>
                        </Col>
                        <Col :span="10" :offset="2">
                        <FormItem labelText="帐务中心开户银行名称：" :errorMessage="errors.first('modPlanObj.eftZwzxBankName')">
                            <Input disabled v-model="modPlanObj.eftZwzxBankName"></Input>
                        </FormItem>
                        </Col>
                        <Col :span="10" :offset="1">
                        <FormItem labelText="帐务中心户名：" :errorMessage="errors.first('modPlanObj.eftZwzxName')">
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
                    <Search placeholder="请输入银行名称" @search="searchResource"></Search>
                </div>
                <div class="app__table">
                    <Row class="app__table-thead">
                        <Col :span="4" :offset="2">选择</Col>
                        <Col :span="6">托收银行名称</Col>
                        <Col :span="6">托收银行帐号</Col>
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
                            <Form labelWidth="120px" labelAlign="left" data-vv-scope="acctObj">
                                <Col :span="10" :offset="1">
                                <FormItem labelText="帐户名称：" :successMessageInline="false" :errorMessage="errors.first('acctObj.acctName')" :requiredIcon="true">
                                    <Input v-model.trim="acctObj.acctName" data-vv-as="帐户名称" name="acctName" v-validate="'required'"></Input>
                                </FormItem>
                                </Col>

                                <!-- <Col :span="10" :offset="1">
                                <FormItem labelText="帐务服务信息接收手机号码:" >
                                    <Input v-model.trim="acctObj.prodName" data-vv-as="帐务服务信息接收手机号码" name="" v-validate=""></Input>
                                </FormItem>
                                </Col> -->

                                <Col :span="10" :offset="2">
                                <FormItem labelText="是否发送短信帐单：" :errorMessage="errors.first('acctObj.ebillSmsNoticeFlg')">
                                    <RadioGroup v-validate="'required'" :data="ebillSmsNoticeFlgArray" name="ebillSmsNoticeFlg" data-vv-as="是否发送短信帐单" v-model="acctObj.ebillSmsNoticeFlg" @change=""></RadioGroup>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                <FormItem labelText="接收应付额短信号码：" :requiredIcon="acctObj.ebillSmsNoticeFlg == 1" :errorMessage="errors.first('acctObj.ebillSmsServerId')">
                                    <Input v-model.trim="acctObj.ebillSmsServerId" :disabled="acctObj.ebillSmsNoticeFlg == 0" data-vv-as="接收应付额短信号码" name="ebillSmsServerId" v-validate="acctObj.ebillSmsNoticeFlg == 1  ? 'required|mobile' : 'mobile'"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="2" v-if="userRightBtnControl.accountReminderSign">
                                <FormItem labelText="催欠标识：" :errorMessage="errors.first('acctObj.collectionCd')">
                                    <Select v-validate="'required'" :isNullSel='true' :data="collectionCdArray" dataValueStr="attrValue" dataLabelStr="attrValueName" name="collectionCd" data-vv-as="催欠标识" v-model="acctObj.collectionCd"></Select>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1" v-if="userRightBtnControl.accountLiquidatedDamages">
                                <FormItem labelText="免违约金：" :errorMessage="errors.first('acctObj.lateFeeFlag')">
                                    <RadioGroup v-validate="''" :data="ebillSmsNoticeFlgArray" name="lateFeeFlag" data-vv-as="免违约金" v-model="acctObj.lateFeeFlag"></RadioGroup>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="2">
                                <FormItem labelText="帐务服务信息邮件接收地址:" :requiredIcon="acctObj.postMethod ==11 ? true : false" :errorMessage="errors.first('acctObj.accounMail')">
                                    <Input v-model.trim="acctObj.accounMail" data-vv-as="帐务服务信息邮件接收地址" name="accounMail" v-validate="acctObj.postMethod ==11 ? 'required|email' : 'email'"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                <FormItem labelText="帐户计费类型:" :requiredIcon="true" :errorMessage="errors.first('acctObj.acctBillingType')">
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
                            <Form labelWidth="120px" labelAlign="left" data-vv-scope="acctObj">
                                <Col :span="10" :offset="1">
                                <FormItem labelText="帐单寄达地址：" :requiredIcon="false" :errorMessage="errors.first('acctObj.contactAddr')">
                                    <Select :data="addressData" dataLabelStr="addressFull" dataValueStr="addressFull" :isNullSel="true" v-model="acctObj.contactAddr"></Select>
                                </FormItem>
                                </Col>

                                <!-- <Col :span="10" :offset="2">
                                <FormItem labelText="帐单地址邮编：" >
                                    <Input v-model.trim="acctObj.prodName" data-vv-as="帐单地址邮编" name="prodName" v-validate=""></Input>
                                </FormItem>
                                </Col> -->

                                <Col :span="10" :offset="2">
                                <FormItem labelText="帐单打印格式：" :requiredIcon="true" :errorMessage="errors.first('acctObj.billPrefCd')">
                                    <Select v-validate="'required'" :isNullSel='true' :data="billPrefCdArray" name="billPrefCd" dataValueStr="attrValueName" dataLabelStr="attrValueName" data-vv-as="帐单打印格式" v-model="acctObj.billPrefCd"></Select>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                <FormItem labelText="帐单介质：" :requiredIcon="true" :errorMessage="errors.first('acctObj.postMethod')">
                                    <Select v-validate="'required'" :isNullSel='true' dataValueStr="attrValue" dataLabelStr="attrValueName" :data="postMethodArray" name="postMethod" data-vv-as="帐单介质" v-model="acctObj.postMethod"></Select>
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
                                <FormItem labelText="帐单联系人传真：" :requiredIcon="acctObj.postMethod == 2" :errorMessage="errors.first('acctObj.fax')">
                                    <Input v-model.trim="acctObj.fax" data-vv-as="帐单联系人传真" name="fax" v-validate="acctObj.postMethod == 2 ? 'required' : ''"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                <FormItem labelText="联系人eMail地址：" :requiredIcon="acctObj.postMethod == 3" :errorMessage="errors.first('acctObj.eMail')">
                                    <Input v-model.trim="acctObj.eMail" data-vv-as="联系人eMail地址" name="eMail" v-validate="acctObj.postMethod == 3 ? 'required|email' : 'email'"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="2" v-if="userRightBtnControl.accountElectronicInvoice">
                                <FormItem labelText="打印电子发票：">
                                    <RadioGroup v-validate="''" :data="ebillSmsNoticeFlgArray" name="einvoiceFlg" data-vv-as="打印电子发票  " v-model="acctObj.einvoiceFlg" @change=""></RadioGroup>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1" v-if="userRightBtnControl.accountNextBillDate">
                                <FormItem labelText="下次开帐日期：" :errorMessage="errors.first('acctObj.billEffectiveDate')" :successMessageInline="false" :requiredIcon="false">
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
                                <FormItem labelText="税务号：" :errorMessage="errors.first('acctObj.taxNumber')">
                                    <Input v-model.trim="acctObj.taxNumber" data-vv-as="税务号" name="taxNumber" v-validate="'isTax'"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="1">
                                <FormItem labelText="税务开户银行帐户：" :errorMessage="errors.first('acctObj.taxBankNumber')">
                                    <Input v-model.trim="acctObj.taxBankNumber" data-vv-as="税务开户银行帐户" name="taxBankNumber" v-validate="'numeric'"></Input>
                                </FormItem>
                                </Col>

                                <Col :span="10" :offset="2">
                                <FormItem labelText="税务电话：" :errorMessage="errors.first('acctObj.taxPhone')">
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

                    <Row v-show="!addressObj.length" class="app__data-none">
                        <Col :span="24">
                            暂无数据
                        </Col>
                    </Row>
                </div>
            </Scroll>
        </Dialog>

        <!-- 新增地址 -->
        <Dialog ref="addAddress" dialogTilte="新建地址" @confirm="addAddressConfirm()" @close="addAddressClose()">
            <Row>
                <Col>
                </Col>
            </Row>
        </Dialog>

        <Dialog ref="custChoose" :dialogSize="dialogSize" dialogTitle="选择客户" @confirm="custDialogConfirm()" @close="custDialogClose()">
            <Scroll class="app__table padding_content">
                <div class="s-l-search">
                    <Search placeholder="请输入客户名称" @search="searchResources"></Search>
                </div>
                <div class="app__table">
                    <Row class="app__table-thead">
                        <Col :span="2" :offset="1">选择</Col>
                        <Col :span="4">客户名称</Col>
                        <Col :span="4">客户标识</Col>
                        <Col :span="4">客户管理编码</Col>
                        <Col :span="4">证件类型</Col>
                        <Col :span="5">证件号码</Col>
                    </Row>
                    <Row class="app__table-item" v-for="(item,index) in custObj" :key="index">
                        <Col :span="2" :offset="1">
                        <Radio :name="item" :value="item" :label="item" v-model="radioCustData"></Radio>
                        </Col>
                        <Col class="overflow-style" :title="item.custName" :span="4">{{item.custName ? item.custName : '空'}}</Col>
                        <Col class="overflow-style" :title="item.custId" :span="4">{{item.custId ? item.custId : '空'}}</Col>
                        <Col class="overflow-style" :title="item.custNumber" :span="4">{{item.custNumber && item.custNumber != 'null' ? item.custNumber : '空'}}</Col>
                        <Col class="overflow-style" :title="item.certType" :span="4">{{item.certType && item.certType != 'null' ? item.certType : '空'}}</Col>
                        <Col class="overflow-style" :title="item.certNum" :span="5">{{item.certNum && item.certNum != 'null' ? item.certNum : '空'}}</Col>
                    </Row>
                    <Row v-show="!custObj.length" class="app__data-none">
                        <span>暂无数据</span>
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
        componentData: {}
    },
    data() {
        return {
            pageInfo: {
                pageIndex: 1, // 当前页
                pageSize: 20, // 每页条数
            },
            conditionSearchData:[{
                iconfont: 'iconkhbs',
                placeholder:'输入检索',
                param: 'num',
                options: [{ label: "设备号", value: "accNum" },
                    { label: "帐户名称", value: "acctName" },
                    { label: "分帐序号", value: "acctCd" },
                    { label: "客户标识", value: "custNumber" }],
                optionParam: 'selectUp',
                optionValue: 'acctCd'
            }],
            tipInfo: {
                iconType: 1,
                msg: "",
                showBtn: {
                    clear: true,
                    save: true
                }
            },
            dialogTitle: "添加支付银行帐号",
            radioData: "",
            tabData: [
                {
                    code: "info",
                    name: "基本信息"
                },
                {
                    code: "account",
                    name: "帐单信息"
                },
                {
                    code: "tax",
                    name: "税务信息"
                },
                {
                    code: "payment",
                    name: "支付方案"
                }
            ],
            //客户列表
            custObj: [],
            //选择客户
            radioCustData: "",
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
            //托收银行数组
            bankArray: [],
            //托收银行选中
            radioBank: {},
            //新增支付
            addPlanObj: {},
            //修改支付
            modPlanObj: {},
            //付费方式
            paymentArray: [],
            leftDialogObj: {}, //弹框内的基本信息
            invFormatCustomizeRel: {},
            paymentPlans: {},
            dialogSize: {
                size: 80,
                min: 600,
                max: 800
            },
            searchObj: {
                accNum: "",
                acctId: "",
                acctName: "",
                custNumber: ""
            },
            acctBillingTypeArray: [],  //帐户付费类型
            postMethodArray: [
                // {
                //     label: "现金",
                //     value: 100000
                // },
                // {
                //     label: "平安万里通现金",
                //     value: 100001
                // },
                // {
                //     label: "银行",
                //     value: 110000
                // },
                // {
                //     label: "POS(含信用卡/借记卡)",
                //     value: 110100
                // },
                // {
                //     label: "离线POS",
                //     value: 110101
                // },
                // {
                //     label: "在线POS",
                //     value: 110102
                // },
                // {
                //     label: "网银",
                //     value: 110200
                // }
            ], //帐单介质
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
            collectionCdArray: [
                {
                    label: "免催欠",
                    value: "免催欠"
                },
                {
                    label: "临时免催欠",
                    value: "临时免催欠"
                }
            ],
            //帐单打印格式
            billPrefCdArray: [],
            tableItemData: [],
            //帐户状态
            accountStatusCd: [],
            addressObj: [], //选择地址
            tableTitleData: [
                // {
                //     name: "帐单地址邮编",
                //     param: "",
                //     span: 2,
                //     width: 120
                // },
                {
                    name: "分账序号",
                    param: "acctCd",
                    span: 2,
                    width: 180
                },{
                    name: "帐单寄达地址",
                    param: "contactAddr",
                    span: 2,
                    width: 180
                },
                {
                    name: "帐单联系人电话",
                    param: "mobilePhone",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐单联系人姓名",
                    param: "contactName",
                    span: 2,
                    width: 120
                },
                {
                    name: "催欠标识",
                    param: "collectionCd",
                    span: 2,
                    width: 120
                },
                {
                    name: "违约金标识",
                    param: "lateFeeFlag",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐户状态",
                    param: "statusCd",
                    span: 2,
                    width: 120
                },
                // {
                //     name: "是否发送成功",
                //     param: "",
                //     span: 2,
                //     width: 120
                // },
                // {
                //     name: "出帐周期",
                //     param: "",
                //     span: 2,
                //     width: 120
                // },
                {
                    name: "下次开帐日期",
                    param: "billEffectiveDate",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐单介质",
                    param: "postMethod",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐单联系人传真",
                    param: "fax",
                    span: 2,
                    width: 120
                },
                {
                    name: "联系人EMAlIL地址",
                    param: "eMail",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐务服务信息邮件接收地址",
                    param: "accounMail",
                    span: 2,
                    width: 180
                },
                {
                    name: "帐户计费类型",
                    param: "acctBillingType",
                    span: 2,
                    width: 120
                },
                // {
                //     name: "代理商名称",
                //     param: "",
                //     span: 2,
                //     width: 120
                // },
                // {
                //     name: "代理商编号",
                //     param: "",
                //     span: 2,
                //     width: 120
                // },
                {
                    name: "客户标识",
                    param: "custId",
                    span: 2,
                    width: 120
                },
                {
                    name: "帐户区局",
                    param: "firstbureau",
                    span: 2,
                    width: 120
                },
                // {
                //     name: "客户属性",
                //     param: "",
                //     span: 2,
                //     width: 120
                // },
                // {
                //     name: "证件号码",
                //     param: "certNum",
                //     span: 2,
                //     width: 120
                // },
                // {
                //     name: "客户名称",
                //     param: "",
                //     span: 2,
                //     width: 120
                // },
                // {
                //     name: "证件类型",
                //     param: "certType",
                //     span: 2,
                //     width: 120
                // },
                // {
                //     name: "集团需求",
                //     param: "",
                //     span: 2,
                //     width: 120
                // },
                // {
                //     name: "电子帐单详单类型",
                //     param: "",
                //     span: 2,
                //     width: 120
                // },
                {
                    name: "是否发送短信帐单",
                    param: "ebillSmsNoticeFlg",
                    span: 2,
                    width: 120
                },
                {
                    name: "接收应付额短信号码",
                    param: "ebillSmsServerId",
                    span: 2,
                    width: 180
                },
                {
                    name: "打印电子发票",
                    param: "einvoiceFlg",
                    span: 2,
                    width: 120
                },
                // {
                //     name: "电子帐单受理/更新渠道",
                //     param: "",
                //     span: 2,
                //     width: 180
                // },
                // {
                //     name: "电子帐单受理/更新时间",
                //     param: "",
                //     span: 2,
                //     width: 180
                // },
                {
                    name: "是否可开具专票",
                    param: "spcInvFlg",
                    span: 2,
                    width: 120
                },
                // {
                //     name: "帐务服务信息接受手机号码",
                //     param: "",
                //     span: 2,
                //     width: 180
                // },
                {
                    name: "帐务中心开户行支付行号",
                    param: "paidBankNum",
                    span: 2,
                    width: 180
                },
                {
                    name: "税务号",
                    param: "taxNumber",
                    span: 2,
                    width: 120
                },
                {
                    name: "税务地址",
                    param: "taxAddress",
                    span: 2,
                    width: 120
                },
                {
                    name: "税务电话",
                    param: "taxPhone",
                    span: 2,
                    width: 120
                },
                {
                    name: "税务开户银行名称",
                    param: "taxBankName",
                    span: 2,
                    width: 120
                },
                {
                    name: "付费通电子邮件帐单接收地址",
                    param: "fftEmail",
                    span: 2,
                    width: 180
                },
                {
                    name: "付费通电子帐单",
                    param: "fftType",
                    span: 2,
                    width: 130
                },
                {
                    name: "税务开户银行帐户",
                    param: "taxBankNumber",
                    span: 2,
                    width: 120
                }
            ],
            addPaymentData: [], //支付方案
            addPaymentArr: [], // 支付方案
            addressData: [],  //帐单寄达地址
            dynamicWidth: "", //动态宽度
            acctId: "", //帐户标识
            tabCode: "info",
            delPaymentItem: "", //删除新增方案
            searchValue: "",
            custId: "",
            userRightBtnControl: {          // 权限按钮控制
                addBtn: false,
                detailBtn: false,                   // 账户详情
                updateBtn: false,                   // 账户修改
                addPayBtn: false,                   // 账户支付方案添加
                updatePayBtn: false,                // 账户支付方案修改
                deletePayBtn: false,                // 账户支付方案删除
                accountReminderSign: false,         // 账户催欠标识
                accountLiquidatedDamages: false,    // 账户违约金标识
                accountElectronicInvoice: false,    // 账户打印电子发票
                accountNextBillDate: false,         // 账户下次开账日期 
            },
        };
    },
    beforeCreate() {
        this.$getjsons.getJson("ACC-C-0199").then(res => {
            this.postMethodArray = res.data.attrSpecDetail.attrValueList;
        });
        this.$getjsons.getJson("OTC-0001").then(res => {
            this.paymentArray = res.data.attrSpecDetail.attrValueList;
        });
        this.$getjsons.getJson("ACC-C-9001").then(res => {
            this.collectionCdArray = res.data.attrSpecDetail.attrValueList;
        });
        //帐户付费类型
        this.$getjsons.getJson("ACC-C-0017").then(res => {
            this.acctBillingTypeArray = res.data.attrSpecDetail.attrValueList
        })
        //帐户状态
        this.$getjsons.getJson("ACC-C-0203").then(res => {
            this.accountStatusCd = res.data.attrSpecDetail.attrValueList
        })
        //帐单打印格式
        this.$getjsons.getJson("ACC-SH-003").then(res => {
            this.billPrefCdArray = res.data.attrSpecDetail.attrValueList
        })
        //证件类型
        // this.$getjsons.getJson("PTY-0004").then(res => {
        //     this.certTypeArray = res.data.attrSpecDetail.attrValueList
        // })
    },
    watch: {
        "acctObj.postMethod"(old, newValue) {
            if (this.acctObj.postMethod == "9") {
                this.billPrefCdArray[2].disabled = true;
                this.billPrefCdArray[3].disabled = true;
                this.billPrefCdArray[4].disabled = true;
            } else {
                this.billPrefCdArray[2].disabled = false;
                this.billPrefCdArray[3].disabled = false;
                this.billPrefCdArray[4].disabled = false;
            }
        },
        "acctObj.ebillSmsNoticeFlg"(old, newValue) {
            if (this.acctObj.ebillSmsNoticeFlg == 0) {
                this.acctObj.ebillSmsServerId = "";
            }
        },
        "addPlanObj.paymentMethod"(old, newValue) {
            if (this.addPlanObj.paymentMethod == 100000) {
                this.addPlanObj.payAcctName = "";
                this.addPlanObj.payAcctCode = "";
                this.addPlanObj.paidBankNum = "";
                this.addPlanObj.exchgNum = ''
            }
        },
        "modPlanObj.paymentMethod"(old, newValue) {
            if (this.modPlanObj.paymentMethod == 100000) {
                this.modPlanObj.payAcctName = "";
                this.modPlanObj.payAcctCode = "";
                this.modPlanObj.paidBankNum = "";
            }
        }
    },
    mounted() {
        this.getDynamicWidth();
        //this.getTableItemData();
        // 循环权限数据     
        this.$user.getFuncComps().forEach((item) => {
            switch (item.compCode) {
                case 'F-CMB-200101':
                    this.userRightBtnControl.addBtn = true;
                    break;
                case 'F-CMB-200106':
                    this.userRightBtnControl.detailBtn = true;
                    break;
                case 'F-CMB-200102':
                    this.userRightBtnControl.updateBtn = true;
                    break;
                case 'F-CMB-200103':
                    this.userRightBtnControl.addPayBtn = true;
                    break;
                case 'F-CMB-200104':
                    this.userRightBtnControl.updatePayBtn = true;
                    break;
                case 'F-CMB-200105':
                    this.userRightBtnControl.deletePayBtn = true;
                    break;
                case 'F-CMB-200107':
                    this.userRightBtnControl.accountReminderSign = true;
                    break;
                case 'F-CMB-200108':
                    this.userRightBtnControl.accountLiquidatedDamages = true;
                    break;
                case 'F-CMB-200109':
                    this.userRightBtnControl.accountElectronicInvoice = true;
                    break;
                case 'F-CMB-200111':
                    this.userRightBtnControl.accountNextBillDate = true;
                    break;
                default:
                    break;
            }
        })
    },
    methods: {
        conditionSearch(obj){
            this.searchObj = obj;
            this.handleSearch();
        },
        //动态宽度
        getDynamicWidth() {
            let width1 = this.$refs.width.$el.clientWidth;
            this.dynamicWidth = {
                width: width1 + "px"
            };
        },

        changeTab(code) {
            this.tabCode = code;
        },

        //返回值转换
        getPostMethod(name, code) {
            if (name == "帐单介质") {
                let postMethod = this.postMethodArray.filter(item => {
                    return item.attrValue == code;
                })[0];
                return postMethod ? postMethod.attrValueName : "";
            } else if (
                name == "是否发送短信帐单" ||
                name == "违约金标识" ||
                name == "打印电子发票" ||
                name == "是否可开具专票"
            ) {
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
            } else if (name == "帐户状态") {
                let accountStatusCd = this.accountStatusCd.filter(item => {
                    return item.attrValue == code;
                })[0];
                return accountStatusCd ? accountStatusCd.attrValueName : "无";
            } else if (name == "下次开帐日期") {
                return code ? filter.filters.getLocalTime(code) : "无";
            }else {
                return code ? code : "空";
            }
        },

        //托收银行点击
        showPayAcctName() {
            if (this.addPlanObj.paymentMethod == 100000) {
                return;
            }
            this.radioBank = {};
            this.dialogTitle = "添加支付银行帐号";
            this.$axios.get(this.$api.GetBankBranch, {
                    params: {
                        bankAcct: "",
                        bankAcctName: "",
                        bankBranchId: "",
                        bankBranchName: this.searchValue
                            ? this.searchValue
                            : "",
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

        //托收银行修改
        showPayAcctMod() {
            if (this.modPlanObj.paymentMethod == 100000) {
                return;
            }
            this.dialogTitle = "修改支付银行帐号";
            this.$axios
                .get(this.$api.GetBankBranch, {
                    params: {
                        bankAcct: "",
                        bankAcctName: "",
                        bankBranchId: "",
                        bankBranchName: this.searchValue
                            ? this.searchValue
                            : "",
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

        //选择客户查询列表
        addAccount() {
            this.radioCustData = "";
            this.custObj = [];
            this.$refs.custChoose.show();
        },

        //查询列表
        getTableItemData(pageIndex = 1) {
            let params = {
                custId: this.custId ? this.custId : "",
                contactAddr: '',
                pageNum: pageIndex,
                pageSize: this.pageInfo.pageSize,
                sort: 'acctId',
                sortType: 'ASC'
            };
            params[this.searchObj.selectUp] = this.searchObj.num;

            this.$axios.get(this.$api.AccountGetList, {
                    params
                }).then(res => {
                    if (res.data.result.length) {
                        if(pageIndex > res.data.countPage){
                            this.pageInfo.pageIndex = pageIndex - 1;
                            this.$message.warning({message: '暂无数据'})
                        } else {
                            this.pageInfo.pageIndex = pageIndex
                            this.tableItemData = res.data.result;
                        }
                    } else {
                        this.$message.warning({message: '暂无数据'})
                    }
                }).catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
        },

        //模糊查询
        handleSearch() {
            this.custId = "";
            if(this.searchObj.accNum != '' || this.searchObj.acctName != '' || (this.searchObj.acctCd != '' && this.searchObj.acctCd != undefined)){
                this.getTableItemData();
            }
        },

        dragchange() {},

        filterConfirm() {},

        //详情
        detailClick(item) {
            this.acctId = item.acctId;
            this.custId = item.custId;
            this.tabCode = "info";
            this.getAccountDetail();
            this.getPayList();
            this.showAddress();
        },
        // detailClick(item) {
        //     this.$emit('componentView','mod',item)
        // },

        getAccountDetail() {
            this.$axios
                .get(this.$api.AccountInfo, {
                    params: {
                        custId: "",
                        accNum: "",
                        contactAddr: "",
                        acctId: this.acctId
                    }
                })
                .then(res => {
                    if (res.data) {
                        this.leftDialogObj = res.data[0];
                        this.invFormatCustomizeRel =
                            res.data[0].invFormatCustomizeRel[0];
                        this.paymentPlans = res.data[0].paymentPlans[0];
                        this.$refs.leftDialog.show();
                    } else {
                        this.$message.error({ message: "请求失败" });
                    }
                })
                .catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
        },

        //查询支付方案列表
        getPayList() {
            this.$axios.get(this.$api.PaymentPlanGet, {
                    params: {
                        acctId: this.acctId
                    }
                }).then(res => {
                    this.addPaymentData = res.data;
                    this.addPaymentArr = Json.Parse(Json.Stringify(res.data));  
                    this.$nextTick(() => {
                        this.$refs.listScroll.init();
                    });
                }).catch(err => {
                    this.$message.error({ message: err.response.data.message });
                });
        },

        pageChange(val) {
            this.getTableItemData(val);
        },

        //时间控制
        handleDate(data) {
            let oDate = new Date(),
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
            // 获取当前时间戳
            let currentTimestamp = oDate.getTime(),
                // 获取点击的时间
                clickTimestamp = this.$utils.time2TimeStap(data);

            if (clickTimestamp < currentTimestamp) {
                this.$message.warning({ message: "所选月份不能小于当前月份" });
                this.acctObj.billEffectiveDate = "";
                return;
            } else {
                let time = data.slice(0, 8) + "01";
                this.acctObj.billEffectiveDate = currentDay;
            }
        },

        //基本信息修改
        handleAmend() {
            this.acctObj = {
                acctName: this.leftDialogObj.acctName, //帐户名称
                ebillSmsNoticeFlg: this.leftDialogObj.invFormatCustomizeRel[0]
                    .ebillSmsNoticeFlg, //是否发送短信帐单
                ebillSmsServerId: this.leftDialogObj.invFormatCustomizeRel[0]
                    .ebillSmsServerId, //接收应付额短信号码
                eMail: this.leftDialogObj.invFormatCustomizeRel[0].eMail, //联系人eMail地址
                billEffectiveDate: this.leftDialogObj.invFormatCustomizeRel[0]
                    .billEffectiveDate,
                contactName: this.leftDialogObj.invFormatCustomizeRel[0]
                    .contactName, //帐单联系人姓名
                fax: this.leftDialogObj.invFormatCustomizeRel[0].fax, //帐单联系人传真
                mobilePhone: this.leftDialogObj.invFormatCustomizeRel[0]
                    .mobilePhone, //帐单联系人电话
                einvoiceFlg: this.leftDialogObj.invFormatCustomizeRel[0]
                    .einvoiceFlg, //打印电子发票
                taxAddress: this.leftDialogObj.invFormatCustomizeRel[0]
                    .taxAddress, //税务地址
                taxBankNumber: this.leftDialogObj.invFormatCustomizeRel[0]
                    .taxBankNumber, //税务开户银行帐户
                taxNumber: this.leftDialogObj.invFormatCustomizeRel[0]
                    .taxNumber, //税务号
                taxPhone: this.leftDialogObj.invFormatCustomizeRel[0].taxPhone, //税务电话
                contactAddr: this.leftDialogObj.invFormatCustomizeRel[0]
                    .contactAddr, //帐单寄达地址
                collectionCd: this.leftDialogObj.invFormatCustomizeRel[0]
                    .collectionCd, //催欠标识
                lateFeeFlag: this.leftDialogObj.invFormatCustomizeRel[0]
                    .lateFeeFlag, //违约金标识
                billPrefCd: this.leftDialogObj.invFormatCustomizeRel[0]
                    .billPrefCd, //帐单打印格式
                postMethod: this.leftDialogObj.invFormatCustomizeRel[0]
                    .postMethod, //帐单介质
                accounMail:this.leftDialogObj.accounMail,   //  账务服务信息邮件接收地址
                acctBillingType: this.leftDialogObj.acctBillingType,
            };
            this.$refs.accountInfoMod.show();
        },

        //添加支付方案
        addPaymentPlan() {
            if(this.addPaymentData.length < 1){
                this.addPlanObj = {
                    paymentMethod: 100000
                };
                this.$refs.paymentAddPlan.show();
            } else {
                this.$message.warning({ message: "只能添加一个支付方案" });
            }
        },

        //修改支付方案
        modPayment(item) {
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

        //删除支付方案
        delPayment(item) {
            this.delPaymentItem = item;
            this.tipInfo.iconType = 3;
            this.tipInfo.msg = "确认要删除选择的记录吗？";
            this.tipInfo.showBtn.clear = true;
            this.tipInfo.showBtn.save = true;
            this.$refs.tip.show();
        },

        //支付方案dialog弹窗添加关闭
        paymentDialogAddClose() {
            this.$refs.paymentAddPlan.hide();
        },

        //支付方案dialog添加确认按钮
        paymentDialogAddConfirm() {
            this.$validator.validateAll("addPlanObj").then(result => {
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
                            paymentMethod: this.addPlanObj.paymentMethod ? this.addPlanObj.paymentMethod : "",
                            priority: "1",
                            statusCd: 1,
                            statusDate: "1",
                            updateDate: "1",
                            updateStaff: 1,
                            upperAmount: "1",
                            acctId: this.acctId,
                            custId: this.custId,
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
                            payChannel: "111",
                            ifContractQuickPay: 1
                        })
                        .then(res => {
                            if (res.data) {
                                this.$message.success({ message: "新增成功" });
                                this.$refs.paymentAddPlan.hide();
                                this.getAccountDetail();
                                this.getPayList();
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

        //支付方案dialog弹窗修改关闭
        paymentDialogModClose() {
            this.$refs.paymentModPlan.hide();
        },

        //支付方案dialog修改按钮
        paymentDialogModConfirm() {
            this.$validator.validateAll("modPlanObj").then(result => {
                if (result) {
                    this.$axios.patch(this.$api.PaymentPlanMod.format({acctId:this.acctId}),{
                        acctId: this.modPlanObj.acctId,
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
                        paymentLimitType: this.modPlanObj
                            .paymentLimitType,
                        paymentMethod: Number(
                            this.modPlanObj.paymentMethod
                        ),
                        paymentPlanId: this.modPlanObj.paymentPlanId,
                        priority: this.modPlanObj.priority,
                        statusCd: this.modPlanObj.statusCd,
                        statusDate: this.modPlanObj.statusDate,
                        updateDate: this.modPlanObj.updateDate,
                        updateStaff: this.modPlanObj.updateStaff,
                        upperAmount: this.modPlanObj.upperAmount,
                        payAcctCode: this.modPlanObj.payAcctCode,
                        payAcctName: this.modPlanObj.payAcctName,
                        ifContractQuickPay: this.modPlanObj
                            .ifContractQuickPay,
                        eftZwzxName: this.modPlanObj.eftZwzxName,
                        exchgNum: this.modPlanObj.exchgNum,
                        paidBankNum: this.modPlanObj.paidBankNum,
                        extAcctId: this.modPlanObj.extAcctId,
                        eftZwzxBankNum: this.modPlanObj.eftZwzxBankNum,
                        eftAgreeNum: this.modPlanObj.eftAgreeNum,
                        acctOwnerOrg: this.modPlanObj.acctOwnerOrg,
                        acctOwnerOrgBranch: this.modPlanObj
                            .acctOwnerOrgBranch,
                        payChannel: this.modPlanObj.payChannel,
                        eftZwzxBankName: this.modPlanObj.eftZwzxBankName
                    }).then(res => {
                        if (res.data) {
                            this.$refs.paymentModPlan.hide();
                            this.$message.success({ message: "修改成功" });
                            this.getAccountDetail();
                            this.getPayList();
                            this.$nextTick(() => {
                                this.$refs.listScroll.init();
                            });
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

        //帐户基本信息修改确认按钮
        accountDialogConfirm() {
            if(this.addPaymentArr.length > 0){
                this.addPaymentArr[0].extAcct = this.addPaymentArr[0].extAcctDTO;
                delete this.addPaymentArr[0].extAcctDTO;
            }
            this.$validator.validateAll("acctObj").then(result => {
                if (result) {
                    this.$axios.patch(this.$api.AccountInfoMod.format({acctId:this.acctId}),{
                        prodInstId: this.leftDialogObj.prodInstId,
                        updateStaff: this.leftDialogObj.updateStaff,
                        updateDate: this.leftDialogObj.updateDate,
                        createStaff: this.leftDialogObj.createStaff,
                        createDate: this.leftDialogObj.createDate,
                        acctCd: this.leftDialogObj.acctCd,
                        remark: this.leftDialogObj.remark,
                        extAcctId: this.leftDialogObj.extAcctId,
                        expDate: this.leftDialogObj.expDate,
                        custId: this.leftDialogObj.custId,
                        acctName: this.acctObj.acctName,
                        acctId: this.leftDialogObj.acctId,
                        acctLoginName: this.leftDialogObj.acctLoginName,
                        acctBillingType: this.acctObj.acctBillingType,
                        ext2AcctId: this.leftDialogObj.ext2AcctId,
                        statusCd: this.leftDialogObj.statusCd,
                        statusDate: this.leftDialogObj.statusDate,
                        effDate: this.leftDialogObj.effDate,
                        loginPassword: this.leftDialogObj.loginPassword,
                        ext3AcctId: this.leftDialogObj.ext3AcctId,
                        groupAcctId: this.leftDialogObj.groupAcctId,
                        ext1AcctId: this.leftDialogObj.ext1AcctId,
                        siebelRowId: this.leftDialogObj.siebelRowId,
                        invFormatCustomizeRel: [
                            {
                                acctId: this.invFormatCustomizeRel
                                    .acctId,
                                contactAddr: this.acctObj.contactAddr,
                                contactName: this.acctObj.contactName,
                                createDate: this.invFormatCustomizeRel
                                    .createDate,
                                billEffectiveDate: this.acctObj
                                    .billEffectiveDate,
                                createStaff: this.invFormatCustomizeRel
                                    .createStaff,
                                custOrderNbr: this.invFormatCustomizeRel
                                    .custOrderNbr,
                                eMail: this.acctObj.eMail,
                                fax: this.acctObj.fax,
                                invFormatCustomizeId: this
                                    .invFormatCustomizeRel
                                    .invFormatCustomizeId,
                                invpayFlag: this.invFormatCustomizeRel
                                    .invpayFlag,
                                mainPrdInstId: this
                                    .invFormatCustomizeRel
                                    .mainPrdInstId,
                                mobilePhone: this.acctObj.mobilePhone,
                                objId: this.invFormatCustomizeRel.objId,
                                objType: this.invFormatCustomizeRel
                                    .objType,
                                postCycle: this.invFormatCustomizeRel
                                    .postCycle,
                                postMethod: Number(
                                    this.acctObj.postMethod
                                ),
                                postcode: this.invFormatCustomizeRel
                                    .postcode,
                                statusCd: this.invFormatCustomizeRel
                                    .statusCd,
                                statusDate: this.invFormatCustomizeRel
                                    .statusDate,
                                updateDate: this.invFormatCustomizeRel
                                    .updateDate,
                                updateStaff: this.invFormatCustomizeRel
                                    .updateStaff,
                                custId: this.invFormatCustomizeRel
                                    .custId,
                                jtFlg: this.invFormatCustomizeRel.jtFlg,
                                linghuoFreq: this.invFormatCustomizeRel
                                    .linghuoFreq,
                                taxAddress: this.acctObj.taxAddress,
                                siebelRowId: this.invFormatCustomizeRel
                                    .siebelRowId,
                                billPrefCd: this.acctObj.billPrefCd,
                                taxBankNumber: this.acctObj
                                    .taxBankNumber,
                                collectionCd: this.acctObj.collectionCd,
                                bpType: '',
                                taxPhone: this.acctObj.taxPhone,
                                agentId: this.invFormatCustomizeRel
                                    .agentId,
                                spcInvFlg: this.invFormatCustomizeRel
                                    .spcInvFlg,
                                taxNumber: this.acctObj.taxNumber,
                                fftEmail: this.invFormatCustomizeRel
                                    .fftEmail,
                                einvoiceFlg: this.acctObj.einvoiceFlg,
                                firstbureau: this.invFormatCustomizeRel
                                    .firstbureau,
                                fftType: this.invFormatCustomizeRel
                                    .fftType,
                                ebillSmsFlg: this.invFormatCustomizeRel
                                    .ebillSmsFlg,
                                ebillPhone: this.invFormatCustomizeRel
                                    .ebillPhone,
                                ebillSmsServerId: this.acctObj
                                    .ebillSmsServerId,
                                ebillSmsNoticeFlg: this.acctObj
                                    .ebillSmsNoticeFlg,
                                lateFeeFlag: this.acctObj.lateFeeFlag
                            }
                        ],
                        prodInstAcctRel: [],
                        paymentPlans: this.addPaymentArr
                    }).then(res => {
                        if (res.data) {
                            this.$message.success({ message: "修改成功" });
                            this.getTableItemData();
                            this.$refs.leftDialog.hide();
                            this.$refs.accountInfoMod.hide();
                        } else {
                            this.$message.error({ message: "请求失败" });
                        }
                    }).catch(err => {
                        this.$message.error({
                            message: err.response.data.message
                        });
                    });
                }
            });
        },

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
                        this.addressData = res.data.address
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

        //帐户基本信息修改关闭回调
        accountDialogClose() {
            this.$refs.accountInfoMod.hide();
        },

        //删除弹框确认
        tipConfirm() {
            let acctId = this.delPaymentItem.acctId;
            this.$axios.patch(
                this.$api.PaymentPlanDel.format({acctId}),
                {
                    acctId: acctId,
                    createDate: this.delPaymentItem.createDate,
                    createStaff: this.delPaymentItem.createStaff,
                    custId: this.custId,
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
            ).then(res => {
                if (res.data) {
                    this.$message.success({ message: "删除成功" });
                    this.getAccountDetail();
                    this.getPayList();
                } else {
                    this.$message.error({ message: "请求失败" });
                }
            }).catch(err => {
                this.$message.error({ message: "请求失败" });
            });
            this.$refs.tip.hide();
        },

        //地址选择确认按钮
        chooseAddressConfirm() {
            this.$set(this.acctObj, "contactAddr", this.radioData.addressFull);
            this.$refs.chooseAddress.hide();
        },

        //新建地址
        addAddressConfirm() {},

        //新建地址回调
        addAddressClose() {},

        //托收银行确认按钮
        payAcctNameDialogConfirm() {
            if (this.dialogTitle == "添加支付银行帐号") {
                this.addPlanObj = {
                    payAcctName: this.radioBank.bankBranchName,
                    payAcctCode: this.radioBank.bankAcct,
                    paidBankNum: this.radioBank.bankCode,
                    paymentMethod: this.addPlanObj.paymentMethod,
                    exchgNum: this.addPlanObj.exchgNum,
                    eftAgreeNum: this.addPlanObj.eftAgreeNum,
                    eftZwzxBankNum: this.addPlanObj.eftZwzxBankNum,
                    eftZwzxBankName: this.addPlanObj.eftZwzxBankName,
                    eftZwzxName: this.addPlanObj.eftZwzxName
                };
            } else if (this.dialogTitle == "修改支付银行帐号") {
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

        //托收银行弹框回调
        payAcctNameDialogClose() {},

        searchResource(data) {
            this.searchValue = data;
            if ((this.dialogTitle = "修改支付银行账号")) {
                this.showPayAcctMod();
            } else {
                this.showPayAcctName();
            }
        },

        //地址选择弹框回掉
        chooseAddressClose() {},
        //选择客户
        custDialogConfirm() {
            if (this.radioCustData == "") {
                this.$message.error({ message: "请先选择客户" });
                return;
            } else {
                this.$refs.custChoose.hide();
                this.$emit("componentView", "add", this.radioCustData);
            }
        },

        //新建地址
        addAddress() {},

        //选择客户弹框回调
        custDialogClose() {},

        //模糊查询
        searchResources(data) {
            this.radioCustData = "";
            this.$axios.get(this.$api.CustomerList, {
                params: {
                    certNum: "",
                    custName: data ? data : "",
                    custNumber: "",
                    custType: ""
                }
            })
            .then(res => {
                if (res.data) {
                    this.custObj = [...res.data];
                } else {
                    this.$message.error({ message: "查询错误" });
                }
            })
            .catch(err => {
                this.$message.error({ message: err.response.data.message });
            });
        }
    }
};
</script>

<style lang="scss" scoped>

.list {
    padding: 80px 0 50px;
    width: 100%;
    height: 100%;
    .header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        .h-all {
            padding: 20px 20px;
            .h-a-title {
                .left-title {
                    float: left;
                    p:first-child {
                        font-size: 24px;
                        color: #373f45;
                    }
                    p:last-child {
                        padding-top: 4px;
                        font-size: 12px;
                        color: #373f45;

                        span {
                            color: $mainColor;
                        }
                    }
                }
                .search-group {
                    .s-up{
                        padding-right: 20px;
                    }
                    .search_first {
                        margin-left: 20px;
                        padding-top: 2px;
                    }
                    .distance {
                        margin-left: 20px;
                    }
                    .search {
                        display: inline-block;
                        height: 30px;
                        line-height: 30px;
                        margin: 7px 0 0 20px;
                        padding: 0 20px;
                        border-radius: 5px;
                        background: $mainColor;
                        font-size: 14px;
                        color: #fff;
                        cursor: pointer;
                        &:hover {
                            opacity: 0.8;
                        }
                    }
                    .addcount {
                        span {
                            margin-top: 7px;
                            float: right;
                        }
                    }
                }
            }
        }
    }
    .main {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        .col {
            &:hover {
                .col-search {
                    display: block;
                }
            }
        }
        .dyWidth {
            width: 1900px;
        }

        .m-title{
            span{
                font-weight: bold;
                color: $mainColor;
            }
        }

        .m-i-name {
            cursor: pointer;
            border-right: 1px solid #a6c2ff;
            color: $mainColor;
            &.m-t-n {
                color: #000;
            }
            &.rightborder_none {
                border-right: 0;
            }
        }
    }
    .dialog_header {
        height: 190px;
        padding-left: 20px;
        background-color: #f7fbfd;
        .title {
            line-height: 50px;
            font-size: 16px;
            font-weight: bold;
            color: $mainColor;
        }
        .dialog_header-bottom {
            .box_right {
                padding: 20px 0 10px 20px;
                background-color: #fff;

                .col{
                    padding: 8px 0;
                }

                .h-name{
                    font-size: 20px;
                    font-weight: bold;
                    color: $mainColor;
                }

                .h-line{
                    height: 80px;
                    border-left: 1px dashed #cccccc;
                }
            }
        }
    }
    .dialog-content {
        padding: 0 0 40px 20px;
        width: 100%;
        height: calc(100% - 160px);
        background-color: #f7fbfd;

        .dialog-main {
            height: 100%;
            padding: 20px 0 20px 20px;
            background-color: #fff;

            .main {
                padding: 0 30px 0 0;
            }
            .payment {
                height: 100%;
                .main {
                    height: calc(100% - 100px);
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
            .a-v-content {
                padding-left: 20px;
            }
            .app__table-right {
                span {
                    color: $mainColor;
                    cursor: pointer;
                }
            }
        }
        .dialog_tab {
            position: absolute;
            left: 0;
            height: 100%;
            background-color: #f7fbfd;
            li {
                width: 200px;
                height: 50px;
                margin-left: 20px;
                cursor: pointer;
                text-align: center;
                line-height: 50px;
                color: #647283;
                font-size: 14px;
            }
            li:nth-child(1) {
                background: url("./images/info.png") no-repeat 30px;
                &.active {
                    background: url("./images/info_hover.png") no-repeat 30px;
                    background-color: #fff;
                    color: #1296db;
                }
            }
            li:nth-child(2) {
                background: url("./images/money.png") no-repeat 30px;
                &.active {
                    background: url("./images/money_hover.png") no-repeat 30px;
                    background-color: #fff;
                    color: #1296db;
                }
            }
            li:nth-child(3) {
                background: url("./images/tax.png") no-repeat 30px;
                &.active {
                    background: url("./images/tax_hover.png") no-repeat 30px;
                    background-color: #fff;
                    color: #1296db;
                }
            }
            li:nth-child(4) {
                background: url("./images/pay.png") no-repeat 30px;
                &.active {
                    background: url("./images/pay_hover.png") no-repeat 30px;
                    background-color: #fff;
                    color: #1296db;
                }
            }
        }
        .page {
            height: 10px;
        }
    }
    .padding_content {
        padding: 0 10px;
    }

    .paymentplan {
        padding: 20px 20px 0px 0;
        margin-bottom: 10px;
        border-bottom: 1px solid #f6f6f6;
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

    .info-container{
        padding: 5px 20px;
        margin-bottom: 20px;
        background-color: #fbfdff;

        .col{
            padding: 8px 0;
        }
    }

}
</style>

