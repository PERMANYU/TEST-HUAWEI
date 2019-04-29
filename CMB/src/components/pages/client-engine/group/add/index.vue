<template>
	<transition name="fade">
		<div class="add">
			<Scroll :isShowRight="true" ref="scroll" class="self-adaption">
				<div class="a-header">
					<div class="a-title">添加客户</div>
					<div class="a-close" @click="handleCancel"></div>
				</div>

                <div class="client-wrap">
                    <div class="app__title-1">
                        <span class="app__title-name">基本信息</span>
                    </div>

                    <div class="basic-info">
                        <Row>
                            <Form labelWidth="120px" labelAlign="left" data-vv-scope="revises">
                                <Col :span="7" :offset="1">
                                    <FormItem labelText="客户名称：" :requiredIcon="true" :errorMessage="errors.first('revises.custName')">
                                        <Input name="custName" data-vv-as="客户名称" v-validate="'required|custName'" v-model.trim="clientObj.custName"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="7" :offset="1">
                                    <FormItem labelText="客户类型：" :requiredIcon="true" :errorMessage="errors.first('revises.custType')">
                                        <Select
                                            disabled
                                            name="custType"
                                            v-validate=" isHidden == 3 ? 'required' : ''"
                                            :data="custTypeData"
                                            v-model="clientObj.custType"
                                            :isNullSel="false"></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="7" :offset="1" v-show="isHidden == 3">
                                    <FormItem labelText="国家/地区：" :requiredIcon="true" :errorMessage="errors.first('revises.nationality')">
                                        <Select
                                            name="nationality"
                                            :data="nationalityData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            v-validate="isHidden == 3 ? 'required' : ''"
                                            data-vv-as="国家/地区"
                                            v-model="clientObj.nationality">
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col :span="7" :offset="1">
                                    <FormItem labelText="证件类型：" :requiredIcon="true" :errorMessage="errors.first('revises.certType')">
                                        <Select
                                            name="certType"
                                            :data="certTypeData"
                                            v-validate="'required'"
                                            data-vv-as="证件类型"
                                            v-model="clientObj.certType"></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="7" :offset="1" v-show="isHidden == 49">
                                    <FormItem labelText="证件子类型：" :requiredIcon="true" :errorMessage="errors.first('revises.certSubType')">
                                        <Select
                                            name="certSubType"
                                            data-vv-as="证件子类型"
                                            v-validate="isHidden == 49 ? 'required' : ''"
                                            :data="certSubTypeData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            v-model="clientObj.certSubType"></Select>
                                    </FormItem>
                                </Col>                              
                                <Col :span="7" :offset="1">
                                    <FormItem labelText="客户子类型：" :requiredIcon="true" :errorMessage="errors.first('revises.custSubType')">
                                        <Select
                                            :disabled="otherDisabled"
                                            name="custSubType"
                                            data-vv-as="客户子类型"
                                            v-validate="clientObj.custSubType == '' ? 'required' : ''"
                                            :data="custSubTypeData"
                                            v-model="clientObj.custSubType"></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="7" :offset="1">
                                    <FormItem labelText="证件号码：" :requiredIcon="true" :errorMessage="errors.first('revises.certNum')">
                                        <Input name="certNum" :readonly="isHidden == 7 ? true : false" data-vv-as="证件号码" v-validate="'required|isCard'" v-model.trim="clientObj.certNum"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="7" :offset="1">
                                    <FormItem labelText="证件地址：">
                                        <Input v-model="clientObj.certAddr"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="7" :offset="1">
                                    <FormItem labelText="客户地址：" :requiredIcon="true" :errorMessage="errors.first('revises.custAddr')">
                                        <Input name="custAddr" readonly data-vv-as="地址" :isNullSel="false" v-validate="!clientObj.custAddr ? 'required' : ''" v-model="clientObj.custAddr" @focus="inputFocus"></Input>
                                    </FormItem>
                                </Col>
                            </Form>
                        </Row>
                    </div>

                    <div class="more">
                        <span @click="handleToggle">{{moreText}}</span>
                    </div>

                    <!-- 扩展信息 -->
                    <div v-show="!toggleFlag" class="identical-wrap">
                        <div class="app__title-1">
                            <span class="app__title-name">客户扩展信息</span>
                        </div>
                        <div class="app__title-2">
                            <span class="app__title-name">行业信息</span>
                        </div>

                        <Row>
                            <Form class="expand-style" labelWidth="120px" labelAlign="left">
                                <Col :span="6">
                                    <FormItem labelText="国标行业门类：">
                                        <Select
                                            :data="nationalClassData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            :saveObject="true"
                                            v-model="clientObj.nationalClass"
                                            ></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="6" :offset="3">
                                    <FormItem labelText="国标行业大类：">
                                        <Select
                                            :data="nationalLargeClassData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            :saveObject="true"
                                            v-model="clientObj.nationalLargeClass"
                                            ></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="6" :offset="3">
                                    <FormItem labelText="国标行业中类：">
                                        <Select
                                            :data="nationalMidClassData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            :saveObject="true"
                                            v-model="clientObj.nationalMidClass"
                                            ></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="6">
                                    <FormItem labelText="国标行业小类：">
                                        <Select
                                            :data="nationalSmallClassData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            :saveObject="true"
                                            v-model="clientObj.nationalSmallClass"
                                        ></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="6" :offset="3">
                                    <FormItem labelText="营销行业第一层：">
                                        <Select
                                            :data="marketFirstLayerData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            :saveObject="true"
                                            v-model="clientObj.marketFirstLayer"
                                            ></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="6" :offset="3">
                                    <FormItem labelText="营销行业第二层：">
                                        <Select
                                            :data="marketSecondLayerData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            :saveObject="true"
                                            v-model="clientObj.marketSecondLayer"
                                            ></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="6">
                                    <FormItem labelText="营销行业第三层：">
                                        <Select
                                            :data="marketThirdLayerData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            :saveObject="true"
                                            v-model="clientObj.marketThirdLayer"
                                            ></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="6" :offset="3">
                                    <FormItem labelText="营销行业第四层：">
                                        <Select
                                            :data="marketFourthLayerData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            :saveObject="true"
                                            v-model="clientObj.marketFourthLayer"
                                            ></Select>
                                    </FormItem>
                                </Col>
                            </Form>
                        </Row>

                        <div class="app__title-2">
                            <span class="app__title-name">用户信息</span>
                        </div>

                        <Row>
                            <Form class="expand-style" labelWidth="120px" labelAlign="left">
                                <Col :span="6">
                                    <FormItem labelText="集团客户编号：">
                                        <Input v-model="clientObj.groupCustId"></Input>
                                    </FormItem>
                                </Col>
                                <!-- <Col :span="6" :offset="3">
                                    <FormItem labelText="先票后款标志：">
                                        <Select></Select>
                                    </FormItem>
                                </Col> -->
                                <Col :span="6" :offset="3">
                                    <FormItem labelText="客户管控级别：">
                                        <Select
                                            :data="custControlLevelData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            v-model="clientObj.custControlLevel"
                                            ></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="6" :offset="3">
                                    <FormItem labelText="保密等级：">
                                        <Select
                                            :data="secrecyLevelData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            v-model="clientObj.secrecyLevel"
                                            ></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="6">
                                    <FormItem labelText="客户级别：">
                                        <Select 
                                            :data="custLevelData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            :saveObject="true"
                                            v-model="clientObj.custLevel"
                                        ></Select>
                                    </FormItem>
                                </Col>
                            </Form>
                        </Row>
                    </div>

                    <!-- 联系人信息 -->
                    <div class="identical-wrap">
                        <div class="app__title-1">
                            <span class="app__title-name">联系人信息</span>
                            <span class="contact-add" @click="handleAdd">添加</span>
                        </div>

                        <Scroll ref="listScroll" class="app__table mgtop10 export-content" :isShowRight="true" :isShowBottom="true" fixedTopClassName="m-title" fixedRightClassName="app__table-right">
                            <DragGroup ref="titleWidth" class="m-title app__table-thead" :titleList="tableTitleData">
                                <DragItem :span="item.span" 
                                    :value="item"
                                    v-for="(item,index) in tableTitleData"
                                    :key="index">
                                    <span>{{item.name}}</span>
                                </DragItem>
                                <Col :span="2" class="app__table-right">
                                    <span>操作</span>
                                </Col>
                            </DragGroup>
                            <Row :class="['m-item app__table-item']" v-for="(table,index) in tableItemData" :key="index">
                                <Col :title="table.contactName" :span="2"><span>{{table.contactName}}</span></Col>
                                <Col :span="1"><span>{{table.contactGender == '1' ? '男' : '女'}}</span></Col>
                                <Col :title="table.contactType" :span="2"><span>{{changType(table.contactType)}}</span></Col>
                                <Col :title="table.mobilePhone" :span="3"><span>{{table.mobilePhone}}</span></Col>
                                <Col :title="table.homePhone" :span="2"><span>{{table.homePhone}}</span></Col>
                                <Col :title="table.fax" :span="3"><span>{{table.fax}}</span></Col>
                                <Col :title="table.eMail" :span="2"><span>{{table.eMail}}</span></Col>
                                <Col :title="table.contactCert" :span="3"><span>{{table.contactCert}}</span></Col>
                                <Col :title="table.qqCode" :span="2"><span>{{table.qqCode}}</span></Col>
                                <Col :title="table.wxCode" :span="2"><span>{{table.wxCode}}</span></Col>
                                <Col :span="2" class="app__table-right">
                                    <span class="review" @click="modifyContact(table, index)">修改</span>
                                    <span class="review" @click="removeContact(index)">删除</span>
                                </Col>    
                            </Row>
                            <Row :class="['m-item app__table-item']" v-for="empty in 5 - tableItemData.length" :key="empty + '-label'">	
                            </Row>
                        </Scroll>
                    </div>
                </div>
			</Scroll>
			<div class="a-operation">
				<div class="btn-page-box">
					<span class="app__btn app__btn-back" @click="handleCancel">返回</span>
					<span class="app__btn app__btn-save" @click="handleSave">确定添加</span>
				</div>
			</div>

            <!-- 联系人信息新增S -->
            <Dialog ref="contactModalType" :dialogTitle="contactDialogTitle" :dialogSize="dialogSize" :initBtn="true">
                <div class="modal-content">
                    <Scroll :isShowRight="true">
                        <Row>
                            <Form labelWidth="120px" labelAlign="left" data-vv-scope="revise">
                                <Col :span="11">
                                    <FormItem labelText="姓名：" :requiredIcon="true" :errorMessage="errors.first('revise.contactName')">
                                        <Input name="contactName" data-vv-as="姓名" v-validate="'required'" v-model.trim="contactOperateData.contactName"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="11" :offset="2">
                                    <FormItem labelText="性别: ">
                                        <RadioGroup :data="sexArray" name="contactGender" v-model="contactOperateData.contactGender"></RadioGroup>
                                    </FormItem>
                                </Col>
                                <Col :span="11">
                                    <FormItem labelText="联系人类型：">
                                        <Select
                                            name="contactType"
                                            :data="contactTypeData"
                                            dataLabelStr="attrValueName"
                                            dataValueStr="attrValue"
                                            v-model="contactOperateData.contactType"></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="11" :offset="2">
                                    <FormItem labelText="工作电话号码: " :requiredIcon="true" :errorMessage="errors.first('revise.mobilePhone')">
                                        <Input name="mobilePhone" data-vv-as="工作电话号码" v-validate="'required|isPhone'" v-model.trim="contactOperateData.mobilePhone"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="11">
                                    <FormItem labelText="QQ号：" :errorMessage="errors.first('revise.qqCode')">
                                        <Input name="qqCode" v-validate="'isQQ'" v-model.trim="contactOperateData.qqCode"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="11" :offset="2">
                                    <FormItem labelText="微信号：" :errorMessage="errors.first('revise.wxCode')">
                                        <Input name="wxCode" v-validate="'isCard'" v-model.trim="contactOperateData.wxCode"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="11">
                                    <FormItem labelText="家庭电话号码：" :errorMessage="errors.first('revise.homePhone')">
                                        <Input name="homePhone" v-validate="'isHomeNum'" v-model.trim="contactOperateData.homePhone"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="11" :offset="2">
                                    <FormItem labelText="办公传真号码: " :errorMessage="errors.first('revise.fax')">
                                        <Input name="fax" v-validate="'isfax'" v-model.trim="contactOperateData.fax"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="11">
                                    <FormItem labelText="Email：" :errorMessage="errors.first('revise.email')">
                                        <Input name="email" data-vv-as="Email" v-validate="'email'"  v-model.trim="contactOperateData.eMail"></Input>
                                    </FormItem>
                                </Col>
                                <Col :span="11" :offset="2">
                                    <FormItem labelText="证件类型：" :requiredIcon="true" :errorMessage="errors.first('revise.contactCertType')">
                                        <Select name="contactCertType" :data="certTypeData" data-vv-as="证件类型" v-validate="'required'" v-model="contactOperateData.contactCertType"></Select>
                                    </FormItem>
                                </Col>
                                <Col :span="11">
                                    <FormItem labelText="证件号码：" :requiredIcon="true" :errorMessage="errors.first('revise.contactCert')">
                                        <Input v-validate="'required|isCard'" name="contactCert" v-model.trim="contactOperateData.contactCert" data-vv-as="证件号码"></Input>
                                    </FormItem>
                                </Col>
                                
                                <!-- <Col :span="11">
                                    <FormItem labelText="投诉电话：">
                                        <Input v-model="contactOperateData.complaintPhone"></Input>
                                    </FormItem>
                                </Col> -->
                                <Col :span="24">
                                    <FormItem labelText="联系人地址：" :requiredIcon="true" :errorMessage="errors.first('revise.contactAddr')">
                                        <Input name="contactAddr" data-vv-as="联系人地址" v-validate="'required'" v-model.trim="contactOperateData.contactAddr"></Input>
                                    </FormItem>
                                </Col>
                            </Form>
                        </Row>
                    </Scroll>
                </div>
                <div slot="btnBox">
                    <span class="save" @click="clickFlag ? contactSave() : ''">保存</span>
                    <span class="back" @click="contactCancel">返回</span>
                </div>
            </Dialog>
            <!-- 联系人信息新增E -->
            <!-- 地址选择S -->
            <Dialog ref="modalType" :dialogTitle="addressDialogTitle" :dialogSize="addressDialogSize" :initBtn="true">
                <Scroll :isShowRight="true">
                <div class="address-content">
                    <Row>
                        <Col :span="8">
                            <div class="searchBox">
                                <Select :data="addressData" dataLabelStr="addrFull" dataValueStr="addrId" :isMore="true" :isNullSel="false" v-model="addressObj" :saveObject="true" :placeholder="placeholder" :isSearch="true" @load="getSelAddress" :lazyTime="600"></Select>
                                <p v-show="showAddBtn" @click="setAddress">找不到地址，我要创建</p>
                            </div>
                        </Col>
                        <Col :span="3">
                            <Input v-model.trim="addressDetail.building"></Input>
                        </Col>
                        <Col :span="2">
                            <Select :data="buildingData" v-model="addressDetail.buildingName"  :isNullSel='false'></Select>
                        </Col>
                        <Col :span="3">
                            <Input v-model.trim="addressDetail.floor"></Input>
                        </Col>
                        <Col :span="2">
                            <Select :data="floorData" v-model="addressDetail.floorName" :isNullSel='false'></Select>
                        </Col>
                        <Col :span="3">
                            <Input v-model.trim="addressDetail.room"></Input>
                        </Col>
                        <Col :span="2">
                            <span class="room">室</span>
                        </Col>
                    </Row>
                </div>
                </Scroll>
                <div slot="btnBox">
                    <span class="save" @click="btnSave">保存</span>
                    <span class="back" @click="btnClose">返回</span>
                </div>
            </Dialog>
            <!-- 地址选择E -->
             <!-- 地址新增S -->
            <Dialog ref="modalTypeAdd" :dialogTitle="addressDialogTitle" :dialogSize="addressDialogSize" :initBtn="true">
                <Scroll :isShowRight="true">
                <div class="address-content">
                    <Row>
                        <Col :span="2">
                            <Select :data="provinceData" v-model.trim="province" :isNullSel='false'></Select>
                        </Col>
                        <Col :span="3">
                            <div class="searchBox">
                                <Input v-model.trim="setObj.road" :isSearch="true"></Input>
                            </div>
                        </Col>
                        <Col :span="2">
                            <Input v-model.trim="setObj.lane"></Input>
                        </Col>
                        <Col :span="2">
                            <Select :data="laneData" v-model="setObj.laneName" :isNullSel='false'></Select>
                        </Col>
                        <Col :span="2">
                            <Input v-model.trim="setObj.sublang"></Input>
                        </Col>
                        <Col :span="2">
                            <Select :data="sublangData" v-model="setObj.sublangName" :isNullSel='false'></Select>
                        </Col>
                        <Col :span="2">
                            <Input v-model.trim="setObj.building"></Input>
                        </Col>
                        <Col :span="2">
                            <Select :data="buildingData" v-model="setObj.buildingName" :isNullSel='false'></Select>
                        </Col>
                        <Col :span="2">
                            <Input v-model.trim="setObj.floor"></Input>
                        </Col>
                        <Col :span="2">
                            <Select :data="floorData" v-model="setObj.floorName" :isNullSel='false'></Select>
                        </Col>
                        <Col :span="2">
                            <Input v-model.trim="setObj.room"></Input>
                        </Col>
                        <Col :span="1">
                            <span class="room">室</span>
                        </Col>
                    </Row>
                </div>
                </Scroll>
                <div slot="btnBox">
                    <span class="save" @click="btnAdd">保存</span>
                    <span class="back" @click="btnBack">返回</span>
                </div>
            </Dialog>
            <!-- 地址新增E -->

            <Tip ref="tip" :tipObj="tipObj" @confirm="confirm" @back="close"></Tip>
		</div>
	</transition>
</template>

<script type="text/javascript">
    import mainData from '@/assets/json/main.json'
	export default{
		data(){
			return{
                clientObj: {
                    custType: '1000',
                    custSubType: '999900002',
                    certType: '1',
                    nationalClass: {},
                    nationalLargeClass: {},
                    nationalMidClass: {},
                    nationalSmallClass: {},
                    custLevel: {},
                    marketFirstLayer: {},
                    marketSecondLayer: {},
                    marketThirdLayer: {},
                    marketFourthLayer: {}
                },
                moreText: '更多信息>>',
                placeholder: "请输入",
                toggleFlag: true,
                tableTitleData:[{
                        name: '姓名',
                        param: 'contactName',
                        span: 2
                    },{
                        name: '性别',
                        param: 'contactGender',
                        span: 1
                    },{
                        name: '联系人类型',
                        param: 'contactType',
                        span: 2,
                    },{
                        name: '工作电话号码',
                        param: 'mobilePhone',
                        span: 3
                    },{
                        name: '家庭电话号码',
                        param: 'homePhone',
                        span: 2
                    },{
                        name: '办公传真号码',
                        param: 'fax',
                        span: 3
                    },{
                        name: '电子邮件',
                        param: 'eMail',
                        span: 2
                    },{
                        name: '证件号码',
                        param: 'certNum',
                        span: 3
                    },{
                        name: 'QQ号',
                        param: 'qqCode',
                        span: 2
                    },{
                        name: '微信号',
                        param: 'wxCode',
                        span: 2
                    }
                ],
                tableItemData: [],
                dynamicWidth: '',       // 动态计算表格空行的宽度
                contactOperateData: {},
                contactDialogTitle: '新增联系人',
                contactTypeData: [],        // 联系人类型
                custTypeData: [             // 客户类型
                    {
                        label: '政企客户',
                        value: '1000'
                    }
                ],
                nationalityData: [],            // 国家/地区
                custSubTypeData: mainData.custSubTypeData,        // 客户子类型
                certTypeData: mainData.certTypeData,         // 证件类型
                // certTypeData2: [],          // 添加联系人的证件类型
                certSubTypeData: [],   // 证件子类型
                sexArray: [
                    {
                        label: '男',
                        value: '1'
                    },{
                        label: '女',
                        value: '0'
                    }
                ],
                nationalClassData: [],        // 国标行业门类
                nationalLargeClassData: [], // 国标行业大类
                nationalMidClassData: [],   // 国标行业中类
                nationalSmallClassData: [], // 国标行业小类
                marketFirstLayerData: [],   // 营销行业第一层
                marketSecondLayerData: [],   // 营销行业第二层
                marketThirdLayerData: [],   // 营销行业第三层
                marketFourthLayerData: [],   // 营销行业第四层
                custControlLevelData: [],   // 客户管控级别
                custLevelData: [],          // 客户级别
                secrecyLevelData: [],       // 保密等级
                dialogSize: {
                    max: 800
                },
                operateFlag: false,     // 添加或删除状态
                changeIndex: '',
                isAddSuccess: false,
                clickFlag: true,
                isHidden: '',         // 控制证件子类型
                tipObj: {
                    iconType: 3,
                    msg: '该证件仅能用于党政军且须加盖公章，是否确认？',
                    showBtn: {
                        clear: true,
                        save: true
                    }
                },
                addressDialogTitle: '添加地址',
                showAddBtn: false,
                addressDialogSize: {
                    max: 1000
                },
                province: '上海市',
                addressData: [],
                provinceData: [
                    {
                        label: '上海市',
                        value: '上海市'
                    },
                    {
                        label: '其他',
                        value: '其他'
                    },
                ],
                buildingData: [
                    {
                        label: '号楼',
                        value: '号楼' 
                    },{
                        label: '幢',
                        value: '幢' 
                    },{
                        label: '栋',
                        value: '栋' 
                    },{
                        label: '座',
                        value: '座' 
                    },{
                        label: '楼',
                        value: '楼' 
                    },{
                        label: '号库',
                        value: '号库' 
                    },{
                        label: '单体',
                        value: '单体' 
                    },{
                        label: '单元',
                        value: '单元' 
                    },{
                        label: '峰',
                        value: '峰' 
                    },{
                        label: '阁',
                        value: '阁' 
                    },{
                        label: '库',
                        value: '库' 
                    },{
                        label: '管',
                        value: '管' 
                    },{
                        label: '片',
                        value: '片' 
                    }
                ],
                floorData: [
                    {
                        label: '层',
                        value: '层' 
                    },{
                        label: '层半',
                        value: '层半' 
                    }
                ],
                laneData: [
                    {
                        label: '临号',
                        value: '临号' 
                    },{
                        label: '弄',
                        value: '弄' 
                    },{
                        label: '号',
                        value: '号' 
                    },
                ],
                sublangData: [
                    {
                        label: '支弄',
                        value: '支弄' 
                    },{
                        label: '区',
                        value: '区' 
                    },{
                        label: '块',
                        value: '块' 
                    },{
                        label: '街',
                        value: '街' 
                    },{
                        label: '道',
                        value: '道' 
                    },{
                        label: '路',
                        value: '路' 
                    }
                ],
                addressObj: {},
                custIptObj: {
                    addrId: '',
                    addrName: '',
                    createStaff: this.$user.getStaffId(),
                    custId: '',
                    primaryFlag: 1,
                    remark: '',
                    statusCd: '',
                    subBureauCode: '',
                    bureauCode: '',
                    bureauName: '',
                    subBureauName: '',
                    subBureauId: '',
                    bureauId: '',
                    addrPostcode: ''
                },
                addressZongzi: {},
                setObj: {
                    road: '',
                    lane: '',    //临号
                    sublang: '',   //支弄
                    building: '',  //楼号
                    floor: '',    //层
                    laneName: '临号',   
                    sublangName: '支弄',
                    buildingName: '号楼',
                    floorName: '层',
                    room: '',   //室
                },
                addressDetail: {
                    building: '',
                    floor: '',
                    room: '',
                    buildingName: '号楼',
                    floorName: '层'
                },
                custAddrObj: {},
                otherDisabled: true
			}
        },
        created () {
            this.getMainData()
        },
        mounted () {
            this.getDynamicWidth()
            this.opCertMainData()
        },
        watch: {
            // 监听证件类型的数据变化
            'clientObj.certType' (oldVal, newVal){
                if(oldVal != '49' && newVal == '49'){
                    this.clientObj.certSubType = ''
                }
                this.isHidden = oldVal
                switch (oldVal) {                       
                    case '6':       // 营业执照
                        this.clientObj.custSubType = '999900004';
                        // this.custSubTypeData[12].disabled = true
                        this.otherDisabled = false
                        this.clientObj.certNum = ''
                        break;
                    case '99':   // 其它证件
                        this.clientObj.custSubType = '';
                        // this.custSubTypeData[12].disabled = true
                        this.otherDisabled = false
                        this.clientObj.certNum = ''
                        break;
                    case '7':           // 单位介绍信/公函+公章（仅用于党政军客户）
                        this.clientObj.custSubType = '';
                        // this.custSubTypeData[12].disabled = true
                        this.otherDisabled = false
                        this.clientObj.certNum = '000000'
                        this.$refs.tip.show()
                        break;
                    case '15':          // 组织机构代码证
                        this.clientObj.custSubType = '999900006';
                        this.otherDisabled = true
                        this.clientObj.certNum = ''
                        break;
                    case '39':          // 税务登记号
                        this.clientObj.custSubType = '';
                        // this.custSubTypeData[12].disabled = true
                        this.otherDisabled = false
                        this.clientObj.certNum = ''
                        break;
                    case '34':          // 事业单位法人证
                        this.clientObj.custSubType = '999900006';
                        this.otherDisabled = true
                        this.clientObj.certNum = ''
                        break;
                    case '43':          // 社会团体法人登记证书
                        this.clientObj.custSubType = '999900006';
                        this.otherDisabled = true
                        this.clientObj.certNum = ''
                        break;
                    case '49':          // 统一信用代码
                        // this.clientObj.custSubType = ''
                        // this.custSubTypeData[12].disabled = true
                        this.otherDisabled = false
                        this.clientObj.certNum = ''
                        break;
                    case '1':           // 居民身份证
                        this.clientObj.custSubType = '999900002';
                        this.otherDisabled = true
                        this.clientObj.certNum = ''
                        break;
                    case '3':           // 外国公民护照
                        this.clientObj.custSubType = '999900002';
                        this.otherDisabled = false
                        this.clientObj.certNum = ''
                        break;
                    case '4':           // 港澳居民来往内地通行证
                        this.clientObj.custSubType = '999900002';
                        this.otherDisabled = false
                        this.clientObj.certNum = ''
                        break;
                    case '51':           // 现役军人居民身份证
                        this.clientObj.custSubType = '999900002';
                        this.otherDisabled = false
                        this.clientObj.certNum = ''                
                        break;
                    case '52':           // 人民武装警察居民身份证
                        this.clientObj.custSubType = '999900002';
                        this.otherDisabled = false
                        this.clientObj.certNum = ''
                        break;
                    case '50':           // 外国人永久居留身份证
                        this.clientObj.custSubType = '999900002';
                        this.otherDisabled = false
                        this.clientObj.certNum = ''
                        break;
                    case '41':           // 临时居民身份证
                        this.clientObj.custSubType = '999900002';
                        this.otherDisabled = true
                        this.clientObj.certNum = ''
                        break;
                    default:
                        break;
                }
            },

            'clientObj.certSubType' (old){
                switch (old) {
                    case '74':  // 上海市农村集体经济组织登记证书
                        this.clientObj.custSubType = '999900026';
                        break;
                    case '77':  // 基层群众性自治组织特别法人统一社会信用代码证书
                        this.clientObj.custSubType = '999900025';
                        break;
                    case '78':  // 基金会法人登记证
                        this.clientObj.custSubType = '999900022';
                        break;
                    case '72':  // 境外非政府组织代表机构登记证书
                        this.clientObj.custSubType = '999900027';
                        break;
                    case '73':  // 外国律师事务所驻华代表处执业许可证
                        this.clientObj.custSubType = '999900024';
                        break;
                    case '76':  // 外国驻华新闻机构证
                        this.clientObj.custSubType = '';
                        break;
                    case '75':  // 宗教活动场所登记证
                        this.clientObj.custSubType = '999900028';
                        break;
                    case '71':  // 工会法人资格证书
                        this.clientObj.custSubType = '999900023';
                        break;
                    case '70':  // 律师事务所执业许可证
                        this.clientObj.custSubType = '999900024';
                        break;
                    case '79':  // 民办非企业单位登记证
                        this.clientObj.custSubType = '999900021';
                        break;
                    case '80':  // 统一社会信用代码证
                        this.clientObj.custSubType = '999900020';
                        break;
                    default:
                        break;
                }
            }
        },
		methods:{
            // 单独操作证件类型中的主数据
            opCertMainData () {
                // 由于响应式原理，数据会影响到其它组件调用，使用深拷贝
                this.certTypeData = JSON.parse(JSON.stringify(this.certTypeData))
                this.certTypeData[9].disabled = true
            },

            // 返回
            handleCancel () {
                this.$emit("componentView", "list")
            },

            // confirm 
            confirm () {
                this.$refs.tip.hide()
            },

            // close
            close () {
                this.clientObj.certType = '1'
                this.clientObj.certNum = ''
            },

            // 更多
            handleToggle () {
                this.toggleFlag = !this.toggleFlag
                if (!this.toggleFlag) {
                    this.moreText = '收起'
                } else {
                    this.moreText = '更多信息>>'
                }
                
            },

            // 获取表格标题宽度，动态计算空余行的宽度
            getDynamicWidth () {
                this.dynamicWidth = {
                    width: this.$refs.titleWidth.$el.clientWidth + 'px'
                }
            },

            // 主数据
            getMainData () {
                // 国家/地区
                this.$getjsons.getJson("PTY-0005").then(res => {
                    this.nationalityData = res.data.attrSpecDetail.attrValueList
                })
                // 国标行业门类
                this.$getjsons.getJson("CUST_ATTR.GB_INDUSTRY_01").then(res => {
                    this.nationalClassData = res.data.attrSpecDetail.attrValueList
                })

                // 国标行业大类
                this.$getjsons.getJson("CUST_ATTR.GB_INDUSTRY_02").then(res => {
                    this.nationalLargeClassData = res.data.attrSpecDetail.attrValueList
                })

                // 国标行业中类
                this.$getjsons.getJson("CUST_ATTR.GB_INDUSTRY_03").then(res => {
                    this.nationalMidClassData = res.data.attrSpecDetail.attrValueList
                })

                // 国标行业小类
                this.$getjsons.getJson("CUST_ATTR.GB_INDUSTRY_04").then(res => {
                    this.nationalSmallClassData = res.data.attrSpecDetail.attrValueList
                })

                // 营销行业第一层
                this.$getjsons.getJson("CUS-SH-002").then(res => {
                    if (res.data) {
                        this.marketFirstLayerData = res.data.attrSpecDetail.attrValueList
                    }
                })

                // 营销行业第二层
                this.$getjsons.getJson("CUS-SH-003").then(res => {
                    if (res.data) {
                        this.marketSecondLayerData = res.data.attrSpecDetail.attrValueList
                    }
                })

                // 营销行业第三层
                this.$getjsons.getJson("CUS-SH-004").then(res => {
                    if (res.data) {
                        this.marketThirdLayerData = res.data.attrSpecDetail.attrValueList
                    }
                })

                // 营销行业第四层
                this.$getjsons.getJson("CUS-SH-005").then(res => {
                    if (res.data) {
                        this.marketFourthLayerData = res.data.attrSpecDetail.attrValueList
                    }
                })

                // 客户管控级别
                this.$getjsons.getJson("CUS-C-0017").then(res => {
                    this.custControlLevelData = res.data.attrSpecDetail.attrValueList
                })

                // 客户级别
                this.$getjsons.getJson("CUS-0004").then(res => {
                    this.custLevelData = res.data.attrSpecDetail.attrValueList
                })

                // 保密等级
                this.$getjsons.getJson("CUS-C-0001").then(res => {
                    this.secrecyLevelData = res.data.attrSpecDetail.attrValueList
                })

                // 联系人类型
                this.$getjsons.getJson("PTY-SH-0001").then(res => {
                    this.contactTypeData = res.data.attrSpecDetail.attrValueList
                })

                // 证件子类型
                this.$getjsons.getJson("PTY-SH-0004").then(res => {
                    this.certSubTypeData = res.data.attrSpecDetail.attrValueList
                })

            },

            // 联系人新增按钮
            handleAdd () {
                this.contactOperateData = {
                    contactCertType: '1',
                    contactGender: '1'
                }
                this.$refs.contactModalType.show()
                this.operateFlag = true
                this.clickFlag = true
            },

            // 联系人类型
            changType (val) {
                let obj = this.contactTypeData.find(item => item.attrValue == val);
                if(obj != undefined){
                    return obj.attrValueName
                }else{
                    return ''
                }
            },

            // 联系人列表修改
            modifyContact (data, index) {
                this.$refs.contactModalType.show()
                this.changeIndex = index
                this.operateFlag = false
                this.clickFlag = true
                this.contactOperateData['contactCertType'] = '1'
                this.contactOperateData = Object.assign({}, data)
            },

            // 联系人列表删除
            removeContact (index) {
                this.tableItemData.splice(index, 1)
            },

            // 联系人弹窗保存
            contactSave () {
                if (this.clickFlag) {
                    this.$validator.validateAll('revise').then((result) => {
                        if (!result) {
                            return
                        } else {
                            if(this.contactOperateData.contactCertType == '1'){
                                if(!this.$utils.isCardId(this.contactOperateData.contactCert)){
                                    this.$message.warning({"message":"请输入正确的身份证号码"});
                                    return
                                }
                            }else if (this.contactOperateData.certType == '2') {
                                if(!this.$utils.isSoldier(this.contactOperateData.contactCert)){
                                    this.$message.warning({"message":"请输入正确的军人证号码"});
                                    return
                                }
                            } else if (this.contactOperateData.contactCertType == '15'){
                                if(!this.$utils.isOrg(this.contactOperateData.contactCert)){
                                    this.$message.warning({"message":"请输入正确的组织机构代码证"});
                                    return
                                }
                            } else if(this.contactOperateData.contactCertType == '3'){
                                if(!this.$utils.isPassPort(this.contactOperateData.contactCert)){
                                    this.$message.warning({"message":"请输入正确的护照号码"});
                                    return
                                }
                            }else if(this.contactOperateData.contactCertType == '4'){
                                if(!this.$utils.isPassCard(this.contactOperateData.contactCert)){
                                    this.$message.warning({"message":"请输入正确的港澳台通行证"});
                                    return
                                }
                            }
                            
                            if (this.operateFlag) {
                                this.tableItemData.push(this.contactOperateData)
                            } else {
                                this.tableItemData.splice(this.changeIndex, 1)
                                this.tableItemData.unshift(this.contactOperateData)
                            }
                            this.clickFlag = false
                            this.$refs.contactModalType.hide()
                            this.contactOperateData = {}
                        }
                    })
                }
                
            },

            // 联系人弹窗返回
            contactCancel () {
                this.$refs.contactModalType.hide()
            },           

            // 确定添加
            handleSave () {
                if (!this.tableItemData.length) {
                    this.$message.warning({"message": "请添加联系人"})
                } else {
                    this.$validator.validateAll('revises').then((result) => {
                        if (!result) {
                            return
                        }  else {
                            if(this.clientObj.certType == '1'){
                                if(!this.$utils.isCardId(this.clientObj.certNum)){
                                    this.$message.warning({"message":"请输入正确的身份证号码"});
                                    return
                                }
                            }else if(this.clientObj.certType == '3'){
                                if(!this.$utils.isPassPort(this.clientObj.certNum)){
                                    this.$message.warning({"message":"请输入正确的护照号码"});
                                    return
                                }
                            } else if (this.clientObj.certType == '15'){
                                if(!this.$utils.isOrg(this.clientObj.certNum)){
                                    this.$message.warning({"message":"请输入正确的组织机构代码证"});
                                    return
                                }
                            } else if(this.clientObj.certType == '4'){
                                if(!this.$utils.isPassCard(this.clientObj.certNum)){
                                    this.$message.warning({"message":"请输入正确的港澳台通行证"});
                                    return
                                }
                            }else if(this.clientObj.certSubType == '76'){
                                if(!this.$utils.isCheckCard1(this.clientObj.certNum)){
                                    this.getWarm();
                                    return
                                }
                            }else if(this.clientObj.certSubType == '75'){
                                if(!this.$utils.isCheckCard2(this.clientObj.certNum)){
                                    this.getWarm();
                                    return
                                }
                            }else if(this.clientObj.certSubType == '79'){
                                if(!this.$utils.isCheckCard3(this.clientObj.certNum)){
                                    this.getWarm();
                                    return
                                }
                            }else if(this.clientObj.certSubType == '78'){
                                if(!this.$utils.isCheckCard4(this.clientObj.certNum)){
                                    this.getWarm();
                                    return
                                }
                            }else if(this.clientObj.certSubType == '71'){
                                if(!this.$utils.isCheckCard5(this.clientObj.certNum)){
                                    this.getWarm();
                                    return
                                }
                            }else if(this.clientObj.certSubType == '70'){
                                if(!this.$utils.isCheckCard6(this.clientObj.certNum)){
                                    this.getWarm();
                                    return
                                }
                            }else if(this.clientObj.certSubType == '73'){
                                if(!this.$utils.isCheckCard7(this.clientObj.certNum)){
                                    this.getWarm();
                                    return
                                }
                            }else if(this.clientObj.certSubType == '77'){
                                if(!this.$utils.isCheckCard8(this.clientObj.certNum)){
                                    this.getWarm();
                                    return
                                }
                            }else if(this.clientObj.certSubType == '74'){
                                if(!this.$utils.isCheckCard9(this.clientObj.certNum)){
                                    this.getWarm();
                                    return
                                }
                            }else if(this.clientObj.certSubType == '72'){
                                if(!this.$utils.isCheckCard10(this.clientObj.certNum)){
                                    this.getWarm();
                                    return
                                }
                            }
                            this.saveCustomer()
                        }
                    })
                }
            },
            
            getWarm() {
                this.$message.warning({"message":"请输入正确的统一社会信用代码证"});
            },

            inputFocus(item){
                this.$refs.modalType.show()
            },

            // 新建综资地址
            setAddress() {
                this.$refs.modalTypeAdd.show();
            },
            //新建综资地址保存
            btnAdd() {
                this.$axios.post(this.$api.NewAddress, {
                    "address_province": this.province,
                    "address_road_code": this.setObj.road,
                    "address_lane": this.setObj.lane,
                    "address_sub_lane": this.setObj.sublang,
                    "address_house_no": '',
                    "address_building": this.setObj.building,
                    "address_floor": this.setObj.floor,
                    "address_room_no": this.setObj.room,
                    "address_add": ""
                }).then((res) => {
                    if(res.data){
                        this.custIptObj = {
                            addrId: res.data.address_id,
                            addrName: res.data.address_full,
                            createStaff: this.$user.getStaffId(),
                            primaryFlag: 1,
                            remark: '',
                            statusCd: '',
                            subBureauCode: res.data.sub_bureau_code,
                            bureauCode: res.data.bureau_code,
                            bureauName: res.data.bureau_name,
                            subBureauName: res.data.sub_bureau_name,
                            subBureauId: res.data.subBureauid,
                            bureauId: res.data.bureauid,
                            addrPostcode: ''
                        }
                        this.$set(this.clientObj,"custAddr",res.data.address_full)
                        this.$refs.modalType.hide();
                        this.$refs.modalTypeAdd.hide();
                        this.$message.success({"message": "地址新建成功"})
                    }else{
                        this.$message.error({"message": "地址新建失败"})
                    }
                    
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            // 关闭综资地址新增窗口
            btnBack() {
                this.$refs.modalTypeAdd.hide();
            },
            // 关闭客户列表新增窗口
            btnClose() {
                this.$refs.modalType.hide()
            },
            // 添加客户地址
            btnSave() {
                this.getAddress();
            },
            // 综资地址下拉信息查询
            getSelAddress (addressName){
                if(addressName == '') return
                this.$axios.get(this.$api.SelectAddress + addressName).then((res) => {
                    if(res.data && res.data.length){
                        this.addressData = res.data;
                        this.showAddBtn = false;
                    }else{
                        this.addressData = [];
                        if(addressName != ''){
                            this.showAddBtn = true;
                        }else{
                            this.showAddBtn = false;
                        }
                    }
                    
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },
            // 综资地址信息查询
            getAddress (){
                if(this.addressObj.addrFull == undefined){
                    this.$message.warning({"message": '请选择地址'})
                    return
                }
                this.$axios.post(this.$api.GetAddress, {
                  "address_full": this.addressObj.addrFull,
                  "contact_id": this.$utils.getFullTime(),
                  "employee_id": '0-1',
                  "address_id": ""
                }).then((res) => {
                    // 综资地址
                    let addurl = '';
                    if(this.addressDetail.building != ''){
                        addurl = addurl + this.addressDetail.building+this.addressDetail.buildingName;
                    }
                    if(this.addressDetail.floor != ''){
                        addurl = addurl + this.addressDetail.floor+this.addressDetail.floorName;
                    }
                    if(this.addressDetail.room != ''){
                        addurl = addurl + this.addressDetail.room+'室';
                    }

                    if(res.data.errorCode == '0'){
                        this.addressZongzi = res.data.result;
                        this.custIptObj = {
                            addrId: this.addressZongzi.address_id,
                            addrName: this.addressZongzi.address_full + addurl,
                            createStaff: this.$user.getStaffId(),
                            primaryFlag: 1,
                            remark: '',
                            statusCd: '',
                            subBureauCode: this.addressZongzi.sub_bureau_code,
                            bureauCode: this.addressZongzi.bureau_code,
                            bureauName: this.addressZongzi.bureau_name,
                            subBureauName: this.addressZongzi.sub_bureau_name,
                            subBureauId: this.addressZongzi.subBureauid,
                            bureauId: this.addressZongzi.bureauid,
                            addrPostcode: ''
                        }
                        this.$set(this.clientObj,"custAddr",this.addressZongzi.address_full + addurl);
                    }else{  // 综资查询没有数据，用索引地址信息
                       this.addressZongzi = this.addressObj
                       this.custIptObj = {
                            addrId: this.addressZongzi.addrId,
                            addrName: this.addressZongzi.addrFull + addurl,
                            createStaff: this.$user.getStaffId(),
                            primaryFlag: 1,
                            remark: '',
                            statusCd: '',
                            subBureauCode: '',
                            bureauCode: '',
                            bureauName: this.addressZongzi.qj,
                            subBureauName: this.addressZongzi.jf,
                            subBureauId: this.addressZongzi.fj_crmid,
                            bureauId: this.addressZongzi.qj_crmid,
                            addrPostcode: ''
                        }
                        this.$set(this.clientObj,"custAddr",this.addressZongzi.addrFull + addurl);
                    }
                    this.$refs.modalType.hide();
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            },

            // 新增客户
            saveCustomer (num = "0") {
                let custAttr = [],
                    hasArr = ['nationalClass','nationalLargeClass','nationalMidClass','nationalSmallClass','marketFirstLayer','marketSecondLayer','marketThirdLayer','marketFourthLayer','custLevel'];
                  
                hasArr.forEach(item => {
                    if(this.clientObj[item].attrId){
                        custAttr.push({
                            attrId: this.clientObj[item].attrId,
                            attrValue: this.clientObj[item].attrValue,
                            remark: '',
                            statusCd: '1100'
                        })
                    }
                });

                let custObj = {
                    "customer": {
                        "createDate": new Date().getTime(),
                        "createStaff": this.$user.getStaffId(),
                        "custAddr": this.clientObj.custAddr,
                        "custName": this.clientObj.custName,
                        "custType": this.clientObj.custType,
                        "regionId": this.$user.getUserStorage().regionId,
                        "statusCd": "1100",
                        "groupCustId": "-1",
                        "custSubType": this.clientObj.custSubType,
                        "custNumber": this.clientObj.custManageNum,
                        "extCustId": this.clientObj.extCustId,
                        "custControlLevel": this.clientObj.custControlLevel,
                        "secrecyLevel": this.clientObj.secrecyLevel
                    },
                    "partyInd": [{
                        "nationality": this.clientObj.nationality
                    }],
                    "partyCert":[
                        {
                            "certAddr": this.clientObj.certAddr,
                            "certCheckResult": "",
                            "certNum": this.clientObj.certNum,
                            "certType": this.clientObj.certType,
                            "certSubType": this.clientObj.certSubType,
                            "checkTime": 1,
                            "checker": 1,
                            "createDate": 1,
                            "createStaff": this.$user.getStaffId(),
                            "effDate": 1,
                            "expDate": 1,
                            "isMainCert": "",
                            "partyId": '',
                            "remark": "",
                            "statusCd": "1000",
                            "updateDate": 1,
                            "updateStaff": this.$user.getStaffId()
                        }
                    ],
                    "contactsInfos": this.tableItemData,
                    "custAttr": custAttr,
                    "custAddrRel": this.custIptObj
                }              

                this.$axios.post(this.$api.FullDoseAddCustomer, custObj).then(res => {
                    if (res.data) {
                        this.$message.success({"message": "新增成功"})
                        this.$emit("componentView", "list")
                        this.isAddSuccess = true
                    }
                }).catch(err => {
                    this.$message.error({"message": err.response.data.message})
                })
            }
		}
	}
</script>

<style scoped lang="scss">
	$color-gray: #f6f6f6;
    
	.fade-enter-active, .fade-leave-active{
		transition: all .3s ease;
	}

	.fade-enter, .fade-leave-to{
		top: -100% !important;
	}

	.add{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding-bottom: 50px;
		z-index: 201;
		background-color: #fff;
		.self-adaption {
			padding: 20px 40px 0 !important;
		}
		.a-header{
			width: 100%;
			height: 50px;
			line-height: 50px;
			border: 1px solid #fafafa;
			text-align: center;
			color: #333940;

			.a-title{
				display: inline-block;
				padding-left: 30px;
				font-size: 16px;
			}

			.a-close{
				position: absolute;
				width: 30px;
				height: 30px;
				top: 11px;
				right: 11px;
				cursor: pointer;
				background: url(./images/close.png) no-repeat center;
			}
		}


        .client-wrap{
            padding: 20px 0;
            font-size: 14px;
            .identical-header {
                padding: 0 0 10px 0;
                .identical-title {
                    position: relative;
                    padding-left: 10px;
                    color: $mainColor;
                    &:before {
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 2px;
                        display: block;
                        width: 5px;
                        height: 16px;
                        background: $mainColor;
                    }
                }
                
            }
            .contact-add {
                float: right; 
                width: 60px;
                padding: 4px 0;                  
                border-radius: 4px;
                background: #5a8af2;
                color: #fff;
                text-align: center;
                font-size: 12px;
                cursor: pointer;
                &:hover {
                    background-color: #4e80ec;
                }
            }
            .mgtop10 {
                margin-top: 10px;
            }

            .expand-wrap {
                padding: 10px;
                color: $mainColor;
                .expand-title {
                    position: relative;
                    padding-left: 10px;
                    font-size: 12px;
                    &:before {
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        display: block;
                        width: 5px;
                        height: 16px;
                        background: $mainColor;
                    }
                }
            }
            .expand-style {
                padding: 0 20px;
                font-size: 12px;
            }

            .basic-info {
                margin-top: 20px;
                padding: 0 20px 0 0;
                font-size: 12px;
            }

            .more {
                text-align: right;
                cursor: pointer;
                color: $mainColor;
            }
        }
        .identical-wrap  {
            padding: 20px 0;
            .review {
                color: $mainColor;
                cursor: pointer;
            }
            .overflow-style {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .export-content {
                font-size: 12px;
            }
        }
		

        .modal-content {
            padding: 10px 20px;
        }
        .address-content {
            padding: 20px 20px 220px 30px;

            .searchBox {
                position: relative;

                p{
                    position: absolute;
                    top: 35px;
                    left: 0;
                    width: 100%;
                    height: 24px;
                    line-height: 24px;
                    background-color: #5a8af2;
                    color: #ffffff;
                    text-align: center;
                    cursor: pointer;
                }
            }
            .col {
                padding-left: 4px;

                .room {
                    line-height: 30px;
                }
            }
        }

		.a-operation{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #fff;
			box-shadow: 0 -2px 1px #f1f5fa;

			.btn-page-box{
				text-align: right;
				padding-right: 20px;

				span{
					margin-left: 20px;
				}
			}
		}
	}
</style>